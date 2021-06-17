import FilterMe from '/js/shared/FilterMe.jsx';
import httpResults from '/js/shared/httpCodes.js';
import serverComuunication from '/js/shared/serverComuunication.js';
import getDisplayDate from '/js/shared/getDisplayDate.js';
import isNeededContent from '/js/shared/isNeededContent.js';
import HandleAfterSubmit from '/js/shared/HandleAfterSubmit.jsx';
import reduceComplexValidationMessage from '/js/shared/reduceComplexValidationMessage.js';

class DisplayContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            selectedField: "",
            fields: [],
            filterStrA: "",
            viewName: "Account_Information",
            isSubmited: false,
            isSubmitSuccess: false,
            submitMessage: ''
        };
        this.loadDataFromServer = this.loadDataFromServer.bind(this);
        this.deleteDataFromServer = this.deleteDataFromServer.bind(this);
        this.setChangeFilter = this.setChangeFilter.bind(this);
        this.editOneRow = this.editOneRow.bind(this);
    }
    loadDataFromServer(controller) {
        serverComuunication.handleServerCommunication_type3('GET', controller)
            .then((response) => {
                let r = httpResults(response.status);
                this.setState({ isSubmitSuccess: r.isSuccess, submitMessage: r.message, isSubmited: true });
                return response.json();
            })
            .then((tmpData) => {
                this.setState({ data: tmpData });
                this.getFilterList(tmpData);
            }).catch((response) => {
                if (response.status == 422 || response.status == 400)
                    response.content.then(ex => {
                        this.setState({ isSubmitSuccess: false, submitMessage: reduceComplexValidationMessage(ex), isSubmited: true });
                    });
                else if (response.status == 401)
                    this.setState({ isSubmitSuccess: false, submitMessage: 'Unauthorized, wrong login credential', isSubmited: true });
                else {
                    if (response.content)
                        response.content.then(ex => console.error(ex));
                    else
                        console.error(response)
                    this.setState({ isSubmitSuccess: false, submitMessage: 'Error occured: unknown error', isSubmited: true });
                }
                throw "catch handleStateManagement_General_ServerFeedback";
            });
    }
    getFilterList(tmpData) {
        if (Array.isArray(tmpData) && tmpData.length) {
            let tmpElement = [];
            for (let prop in tmpData[0]) {
                //skip the date
                if (String(prop).toLowerCase().includes('date')) continue;
                tmpElement.push(prop);
            }
            let elementsFromApi = tmpElement.map(t => {
                return { value: t, display: t };
            });
            this.setState({
                fields: [
                    {
                        value: "",
                        display: "(Select a filter)"
                    }
                ].concat(elementsFromApi)
            });
        }
    }
    deleteDataFromServer(id) {
        serverComuunication.handleServerCommunication_type2('delete', this.state.viewName, id)
            .then((response) => {
                let r = httpResults(response.status);
                this.setState({ isSubmitSuccess: r.isSuccess, submitMessage: r.message, isSubmited: true });
            }).then(() => {
                this.loadDataFromServer(this.state.viewName);
            }).catch((response) => console.log(response));
    }
    editOneRow(e) {
        var queryString = {
            "id": [e],
            "pageAction": "update",
            "workingForm": "Account_Information"
        };
        serverComuunication.handleInternalServerPageRedirect_newPage("AccountPage", queryString)
    }
    setChangeFilter(str, aField) {
        this.setState({ filterStrA: str, selectedField: aField });
    }
    componentDidMount() {
        this.loadDataFromServer(this.state.viewName);
    }
    render() {
        return (
            <div>
                <div className="headerContainer"><h1>Account Information</h1></div>
                <div className="filter">
                    <FilterMe changeFilter={this.setChangeFilter} itemList={this.state.fields} filterStr1={this.state.filterStrA} />
                </div>

                {!this.state.isSubmitSuccess && <HandleAfterSubmit isSubmited={this.state.isSubmited} isSubmitSuccess={this.state.isSubmitSuccess} submitMessage={this.state.submitMessage} />}

                <ItemList data={this.state.data} filterStr1={this.state.filterStrA} filterField={this.state.selectedField} getUrl={this.props.getUrl} reloadData={this.loadDataFromServer} deleteData={this.deleteDataFromServer} editData={this.editOneRow} />
            </div>
        );
    }
}
class AnFormattedItem extends React.Component {
    render() {
        return (<div className="aCard">
            <div className="aCardHeader"> RefId : {this.props.RefId} </div>
            <br />
            UserName : {this.props.UserName} <br />
            Role : {this.props.Role} <br />
            CreatedBy : {this.props.CreatedBy} <br />
            CreatedDate : {this.props.CreatedDate} <br />
            ModifiedBy : {this.props.ModifiedBy} <br />
            ModifiedDate : {this.props.ModifiedDate} <br />
            <button type="button" onClick={() => this.props.editData(this.props.UserName)}>Edit</button>
            <button type="button" onClick={() => this.props.deleteData(this.props.UserName)}>Delete</button>

        </div>
        );
    }
}
class ItemList extends React.Component {
    render() {
        var x = 0;
        var commentNodes_tmp = [];
        commentNodes_tmp = this.props.data.filter(isNeededContent(this.props.filterField, this.props.filterStr1))
            .map(anItem => (
                <AnFormattedItem
                    UserName={anItem.UserName}
                    Role={anItem.Role}
                    CreatedBy={anItem.CreatedBy}
                    CreatedDate={anItem.CreatedDate}
                    ModifiedBy={anItem.ModifiedBy}
                    ModifiedDate={anItem.ModifiedDate}
                    getUrl={this.props.getUrl}
                    reloadData={this.props.reloadData}
                    deleteData={this.props.deleteData}
                    editData={this.props.editData}
                    key={x++}>
                </AnFormattedItem>
            ));
        const commentNodes = commentNodes_tmp;
        return <div className="cardContainer">{commentNodes}</div>;
    }
}
ReactDOM.render(<DisplayContainer pid={queryPatientID} />, document.getElementById('displayContent'));
