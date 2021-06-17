import FilterMe from '/js/shared/FilterMe.jsx';
import httpResults from '/js/shared/httpCodes.js';
import serverComuunication from '/js/shared/serverComuunication.js';
import getDisplayDate from '/js/shared/getDisplayDate.js';
import isNeededContent from '/js/shared/isNeededContent.js';
import HandleAfterSubmit from '/js/shared/HandleAfterSubmit.jsx';

class DisplayContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            selectedField: "",
            fields: [],
            filterStrA: "",
            viewName: "Medical_Information",
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
                this.getFilterItemsList(tmpData);
            })
            .catch((response) => console.log(response));
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
        serverComuunication.handleServerCommunication_type2('delete', this.state.viewName, id)
            .then((response) => {
                let r = httpResults(response.status);
                this.setState({ isSubmitSuccess: r.isSuccess, submitMessage: r.message, isSubmited: true });
            }).then(() => {
                this.loadDataFromServer(this.state.viewName);
            }).catch((response) => console.log(response));
    }
    editOneRow(e) {
        //needs rethink
        location.replace(window.location.origin + "/MedicalInformations/MedicalInformationPage?pid=" + e)
    }
    setChangeFilter(str, aField) {
        this.setState({ filterStrA: str, selectedField: aField });
    }
    componentDidMount() {
        this.loadDataFromServer(this.state.viewName);
    }
    render() {
        return (
            <div className="card card-primary card-outline">
                <div className="card-header">
                    <h3 className="card-title"><i className="fas fa-road"></i>&nbsp;MEDICAL INFOMATION PATIENT</h3>
                </div>
                <div className="card-body">
                    {!this.state.isSubmitSuccess && <HandleAfterSubmit isSubmited={this.state.isSubmited} isSubmitSuccess={this.state.isSubmitSuccess} submitMessage={this.state.submitMessage} />}
                    <div className="filter">
                        <FilterMe changeFilter={this.setChangeFilter} itemList={this.state.fields} filterStr1={this.state.filterStrA} />
                    </div>

                    <table>
                        <thead>
                            <tr>
                                <th>SeatNo </th>
                                <th>RefId </th>
                                <th>Date </th>
                                <th>PendingSurgery </th>
                                <th>SurgeryInfo </th>
                                <th>Seizures </th>
                                <th>PressureSores </th>
                                <th>ExistingSores </th>
                                <th>PainDiscomfort </th>
                                <th>Sensation </th>
                                <th>Hearing </th>
                                <th>Vision </th>
                                <th>RespiratoryStatus </th>
                                <th>Notes </th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <ItemList data={this.state.data} filterStr1={this.state.filterStrA} filterField={this.state.selectedField} getUrl={this.props.getUrl} reloadData={this.loadDataFromServer} deleteData={this.deleteDataFromServer} editData={this.editOneRow} />
                        </tbody>

                    </table>
                </div>
            </div>
        );
    }
}
class AnFormattedItem extends React.Component {
    render() {
        return (
            <tr>
                <td>{this.props.SeatNo} </td>
                <td>{this.props.RefId} </td>
                <td>{getDisplayDate(this.props.Date)} </td>
                <td>{this.props.PendingSurgery} </td>
                <td>{this.props.SurgeryInfo} </td>
                <td>{this.props.Seizures} </td>
                <td>{this.props.PressureSores} </td>
                <td>{this.props.ExistingSores} </td>
                <td>{this.props.PainDiscomfort} </td>
                <td>{this.props.Sensation} </td>
                <td>{this.props.Hearing} </td>
                <td>{this.props.Vision} </td>
                <td>{this.props.RespiratoryStatus} </td>
                <td>{this.props.Notes} </td>
                <td>
                    <button type="button" onClick={() => this.props.editData(this.props.RefId)}>Edit</button>
                    <button type="button" onClick={() => this.props.deleteData(this.props.RefId)}>Delete</button>
                </td>
            </tr>
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
                    SeatNo={anItem.SeatNo}
                    Date={anItem.Date}
                    RefId={anItem.RefId}
                    PendingSurgery={anItem.PendingSurgery2}
                    SurgeryInfo={anItem.SurgeryInfo}
                    Seizures={anItem.Seizures}
                    PressureSores={anItem.PressureSores}
                    ExistingSores={anItem.ExistingSores}
                    PainDiscomfort={anItem.PainDiscomfort}
                    Sensation={anItem.Sensation}
                    Hearing={anItem.Hearing}
                    Vision={anItem.Vision}
                    RespiratoryStatus={anItem.RespiratoryStatus}
                    Notes={anItem.Notes}
                    getUrl={this.props.getUrl}
                    reloadData={this.props.reloadData}
                    deleteData={this.props.deleteData}
                    editData={this.props.editData}
                    key={x++}>
                </AnFormattedItem>
            ));
        const commentNodes = commentNodes_tmp;
        return commentNodes;
    }
}
ReactDOM.render(<DisplayContainer pid={queryPatientID} />, document.getElementById('displayContent'));