import FilterMe from '/js/shared/FilterMe.jsx';
import handleServerFeedback from '/js/shared/handleServerFeedback.js';
import serverComuunication from '/js/shared/serverComuunication.js';
import HandleAfterSubmit from '/js/shared/HandleAfterSubmit.jsx';
import ReactTable from '/js/shared/ReactTableRevamp.jsx';

class DisplayContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            selectedField: "",
            fields: [],
            filterStrA: "",
            viewName: "WheelChair_Information",
            isSubmited: false,
            isSubmitSuccess: false,
            submitMessage: ''
        };
        this.loadDataFromServer = this.loadDataFromServer.bind(this);
        this.deleteDataFromServer = this.deleteDataFromServer.bind(this);
        this.setChangeFilter = this.setChangeFilter.bind(this);
        this.editOneRow = this.editOneRow.bind(this);
    }
    handleStateManagement_General_ServerFeedback = (serverFeedback) => {
        return handleServerFeedback(serverFeedback).then((massaged_feedback) => {
            this.setState({ isSubmitSuccess: massaged_feedback.isSubmitSuccess, submitMessage: massaged_feedback.submitMessage, isSubmited: massaged_feedback.isSubmited });
            return massaged_feedback.content;
        }).catch(exx => {
            exx.submitMessage.then(x => this.setState({ submitMessage: x, isSubmitSuccess: exx.isSubmitSuccess, isSubmited: exx.isSubmited }));
            throw exx;
        });
    }
    loadDataFromServer(controller) {
        let tmp = serverComuunication.handleServerCommunication_type3('GET', controller);
        this.handleStateManagement_General_ServerFeedback(tmp)
            .then((raw) => {
                let tmpData = JSON.parse(raw);
                this.setState({ data: tmpData });
                this.getFilterItemsList(tmpData);
            }).catch((response) => {
                throw response;
            });
    }
    onFocus = () => {
        this.componentDidMount();
        window.removeEventListener("focus", this.onFocus)
    }
    getFilterItemsList(tmpData) {
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
        let tmp = serverComuunication.handleServerCommunication_type2('delete', this.state.viewName, id);
        this.handleStateManagement_General_ServerFeedback(tmp)
            .then(() => {
                this.loadDataFromServer(this.state.viewName);
            }).catch((response) => { throw response });
    }
    editOneRow(e) {
        var queryString = {
            "seatno": [e],
            "pageAction": "update",
            "workingForm": "WheelChair_Information"
        };
        serverComuunication.handleInternalServerPageRedirect_newPage("WheelChairInformationPage", queryString)
    }
    setChangeFilter(str, aField) {
        this.setState({ filterStrA: str, selectedField: aField });
    }
    componentDidMount() {
        this.loadDataFromServer(this.state.viewName);
    }
    gotoCreateWC() {
        var queryString = {
            "pageAction": "create",
            "workingForm": "WheelChair_Information"
        };
        serverComuunication.handleInternalServerPageRedirect_newPage("WheelChairInformationPage", queryString)
    }
    render() {
        return (
            <div>
                <div className="headerContainer"><h1>WheelChair Information</h1></div>
                <div className="col-lg-12">
                    {!this.state.isSubmitSuccess && <HandleAfterSubmit isSubmited={this.state.isSubmited} isSubmitSuccess={this.state.isSubmitSuccess} submitMessage={this.state.submitMessage} />}
                </div>

                <button onClick={() => this.gotoCreateWC()} className="btn btn-warning frmBtn"> <i className="fas fa-plus"></i> Create a new wheelchair </button >
                <div className="filter">
                    <FilterMe changeFilter={this.setChangeFilter} itemList={this.state.fields} filterStr1={this.state.filterStrA} />

                </div>
                {this.state.data.length > 0 &&
                    <ReactTable headerList={Object.keys(this.state.data[0])} hiddenFields="" data={this.state.data} filterStr={this.state.filterStrA} selectedField={this.state.selectedField}>
                        <button handler={this.editOneRow} uni_key="WheelchairNo" display_string="Edit" css_class_name="reactTbBtn" />
                    </ReactTable>}

            </div>

        );
    }
}
ReactDOM.render(<DisplayContainer pid={queryPatientID} />, document.getElementById('displayContent'));
