﻿import FilterMe from '/js/shared/FilterMe.jsx';
import serverComuunication from '/js/shared/serverComuunication.js';
import HandleAfterSubmit from '/js/shared/HandleAfterSubmit.jsx';
import ReactTable from '/js/shared/ReactTableRevamp.jsx';
import handleServerFeedback from '/js/shared/handleServerFeedback.js';

class DisplayContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            selectedField: "",
            fields: [],
            filterStrA: "",
            viewName: "Wheelchair_Specification",
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
            // 20210123
            if (exx.httpStatusCode !== null && exx.httpStatusCode == 401) {
                window.addEventListener("focus", this.onFocus);
            }
            exx.submitMessage.then(x => this.setState({ submitMessage: x, isSubmitSuccess: exx.isSubmitSuccess, isSubmited: exx.isSubmited }));
            throw exx;
        });
    }
    onFocus = () => {
        this.componentDidMount();
        window.removeEventListener("focus", this.onFocus)
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
        this.handleStateManagement_General_ServerFeedback(tmp).then(() => {
            this.loadDataFromServer(this.state.viewName);
        }).catch((response) => { throw response });
    }
    editOneRow(e) {
        var queryString = {
            "Id": [e],
            "pageAction": "update",
            "workingForm": "wheelChair_Specification"
        };
        serverComuunication.handleInternalServerPageRedirect_newPage("WheelchairSpecificationsPage", queryString)
    }
    setChangeFilter(str, aField) {
        this.setState({ filterStrA: str, selectedField: aField });
    }
    componentDidMount() {
        this.loadDataFromServer(this.state.viewName);
    }
    gotoWCSpecPage() {
        var queryString = {
            "pageAction": "create",
            "workingForm": "wheelChair_Specification"
        };
        serverComuunication.handleInternalServerPageRedirect_newPage("WheelchairSpecificationsPage", queryString)
    }
    render() {
        return (<div>
            <p>&nbsp;</p>
            <div className="card card-primary card-outline">
                <div className="card-header">
                    <h3 className="card-title"><i className="fas fa-road"></i>&nbsp;Wheelchair Specification</h3>
                    <div className="form-group row float-right">
                        <button onClick={() => this.gotoWCSpecPage()} className="btn btn-warning frmBtn"> <i className="fas fa-plus"></i> Create a new wheelchair model </button >
                    </div>
                </div>
                <p>&nbsp;</p>
                {!this.state.isSubmitSuccess && <HandleAfterSubmit isSubmited={this.state.isSubmited} isSubmitSuccess={this.state.isSubmitSuccess} submitMessage={this.state.submitMessage} />}
                <div className="filter">
                    <FilterMe changeFilter={this.setChangeFilter} itemList={this.state.fields} refID={this.state.filterStrA} />
                </div>
                {this.state.data.length > 0 &&
                    <div id="table-wrapper">
                        <div id="table-scroll"> <ReactTable headerList={Object.keys(this.state.data[0])} hiddenFields="RefId,WcPicLink,CatalogLink" data={this.state.data} filterStr={this.state.filterStrA} selectedField={this.state.selectedField} cellLength={50}>
                            <button handler={this.editOneRow} uni_key="RefId" css_class_name="btn btn-secondary margin2px"> <i className="far fa-edit"></i> </button>
                        </ReactTable>
                        </div>
                    </div>}
            </div>
        </div>
        );
    }
}
ReactDOM.render(<DisplayContainer pid={queryPatientID} />, document.getElementById('displayContent'));
