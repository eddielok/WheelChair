import FilterMe from '/js/shared/FilterMe.jsx';
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
            viewName: "Loan_record",
            isSubmited: false,
            isSubmitSuccess: false,
            submitMessage: ''
        };
        this.loadDataFromServer = this.loadDataFromServer.bind(this);
        this.loadSingleLoanFromServer = this.loadSingleLoanFromServer.bind(this);
    }
    async handleStateManagement_General_ServerFeedback(serverFeedback) {
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
    async loadSingleLoanFromServer() {
        let tmp = serverComuunication.handleServerCommunication_type4('GET', 'Loan_information_list', '', { "seat_no": this.props.pSeat_number, "loanNumber": this.props.pLoan_number });
        this.handleStateManagement_General_ServerFeedback(tmp)
            .then((tmpData) => {
                let t = JSON.parse(tmpData);
                this.setState({ data: t });
                this.getFilterItemsList(t);
            }).catch((response) => console.log(response));
    }
    async loadDataFromServer(controller) {
        let tmp = serverComuunication.handleServerCommunication_type3('GET', controller);
        this.handleStateManagement_General_ServerFeedback(tmp)
            .then((tmpData) => {
                let t = JSON.parse(tmpData);
                this.setState({ data: t });
                this.getFilterItemsList(t);
            }).catch((response) => console.log(response));
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
                fields: [{
                    value: "",
                    display: "(Select a filter)"
                }].concat(elementsFromApi)
            });
        }
    }
    editOneRow = (e) => {
        var queryString = {
            "Id": [e],
            "pageAction": "update",
            "workingForm": "Loan_Record"
        };
        serverComuunication.handleInternalServerPageRedirect_newPage("LoanInformationPage", queryString)
    }
    setChangeFilter = (str, aField) => {
        this.setState({ filterStrA: str, selectedField: aField });
    }
    async componentDidMount() {
        if (this.props.pSeat_number)
            await this.loadSingleLoanFromServer();
        else
            await this.loadDataFromServer(this.state.viewName);
    }
    createNew(n) {
        let queryString = {
            "seatNo": [n],
            "workingForm": 'Loan_Record',
            "pageAction": "create"
        };
        serverComuunication.handleInternalServerPageRedirect("LoanInformationPage/index", queryString);
    }
    ////////////////////////////////////////////  
    gotoPreviousClientInformationPage() {
        var queryString = {};
        if (this.props.pSeat_number)
            queryString = { "seatNo": this.props.pSeat_number, 'pageAction': 'update' };
        else
            queryString = { 'pageAction': 'create' };
        serverComuunication.handleInternalServerPageRedirect(" ClientSearch/clientInformation", queryString);
    }
    render() {
        return (
            <div>
                <p>&nbsp;</p>
                <div className="card card-primary card-outline">
                    <div className="card-header">
                        <h3 className="card-title"><i className="fas fa-road"></i>&nbsp;Loan Information</h3>
                        <div className="form-group row float-right">
                            <button onClick={() => this.gotoPreviousClientInformationPage()} className="btn btn-warning frmBtn"> <i className="fas fa-arrow-left"></i>&nbsp; Back to client information</button>&nbsp;
                            <button onClick={() => this.createNew(this.props.pSeat_number)} className="btn btn-primary frmBtn"> <i className="fas fa-plus"></i>&nbsp; New Loan Information</button>
                        </div>
                    </div>
                    <div className="card-body">
                        <div className="form-group row">
                            {this.state.isSubmitSuccess && this.state.isSubmited && this.state.data.length == 0 && <div> No loan information found </div>}
                            {!this.state.isSubmitSuccess && <HandleAfterSubmit isSubmited={this.state.isSubmited} isSubmitSuccess={this.state.isSubmitSuccess} submitMessage={this.state.submitMessage} />}
                            {this.state.data.length > 0 &&
                                <div className="filter">
                                    <FilterMe changeFilter={this.setChangeFilter} itemList={this.state.fields} filterStr1={this.state.filterStrA} />
                                </div>}
                        </div>

                        <div id="table-wrapper">
                            <div id="table-scroll">
                                {this.state.data.length > 0 &&
                                    <ReactTable headerList={Object.keys(this.state.data[0])} data={this.state.data} hiddenFields="Idno,TelOffice,Address,Witness,Rank,TelHome,TelMobile,Remarks" filterStr={this.state.filterStrA} selectedField={this.state.selectedField}>
                                    <button handler={this.editOneRow} uni_key="LoanFormNo" css_class_name="btn btn-secondary"> <i className="far fa-edit"></i> </button>
                                    </ReactTable>}
                            </div>
                        </div>
                    </div>
                </div>

                <div>&nbsp;</div>

            </div>
        );
    }
}
ReactDOM.render(<DisplayContainer pLoan_number={qLoanNumber} pSeat_number={qSeatNo} />, document.getElementById('displayContent'));