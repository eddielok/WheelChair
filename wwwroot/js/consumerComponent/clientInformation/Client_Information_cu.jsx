const HandleAfterSubmit_toast = React.lazy(() => import('/js/shared/HandleAfterSubmit_toast.jsx'));
const ReactTable = React.lazy(() => import('/js/shared/ReactTableRevamp.jsx'));
import serverComuunication from '/js/shared/serverComuunication.js';
import Client_Information_InputForm_Revamp from '/js/formComponent/clientInformation/Client_Information_InputForm_Revamp.jsx';
import handleServerFeedback from '/js/shared/handleServerFeedback.js';
export default class Client_Information_InputForm extends React.Component {
    constructor(props) {
        super(props);
        //gen
        this.state = {
            attendance: [],
            isSubmited: false,
            isSubmitSuccess: false,
            lastSubmittedForm: "",
            submitMessage: ''
        };
        this.isFormUpdate = this.isFormUpdate.bind(this);
        this.getClientInformation = this.getClientInformation.bind(this);
        this.getAge = this.getAge.bind(this);
        this.handleFormUpdate_Submit = this.handleFormUpdate_Submit.bind(this);
        this.handleFormCreate = this.handleFormCreate.bind(this);
    }
    handle_closeToastBox = () => {
        this.setState({ isSubmited: false });
    }
    isFormUpdate() {
        return String(this.props.pageAction).toLowerCase().trim() == 'update';
    }
    pageEmitter = (action, isNewPage, param1) => {
        let queryString = { seatNo: [this.props.seatNo] };
        var path = "";
        switch (action) {
            case "loan_search":
                path = "LoanInformationPage/Search";
                break;
            case "accessment_all":
                path = "Accessment/AllAspect";
                break;
            case "client_work_order":
                path = "WorkOrderPage/Index";
                break;
            case "client_ppmi":
                path = "PPMIPage/Index";
                break;
            case "new_attendence":
                queryString["pageAction"] = "create";
                queryString["workingForm"] = "Client_Attendance";
                if (param1 && param1 != '')
                    queryString["seatNo"] = param1;
                path = "ClientAttendancePage/Index";
                window.addEventListener("focus", this.onFocus);
                break;
            case "view_client":
                if (param1 && param1 != '') {
                    queryString["pageAction"] = "update";
                } else {
                    queryString["pageAction"] = "create";
                }
                queryString["seatNo"] = param1;
                path = "ClientSearch/clientInformation";
                break;
        }
        if (isNewPage)
            serverComuunication.handleInternalServerPageRedirect_newPage(path, queryString);
        else
            serverComuunication.handleInternalServerPageRedirect(path, queryString);
    }
    editOneRow(e) {
        var queryString = {
            "Id": [e],
            "pageAction": "update",
            "workingForm": "Client_Attendance"
        };
        serverComuunication.handleInternalServerPageRedirect("ClientAttendancePage", queryString)
    }
    async getAttendanceRecords() {
        let tmp = serverComuunication.handleServerCommunication_type4('GET', "ClientAttendances_list", '', { "seat_no": this.props.seatNo });
        this.handleStateManagement_General_ServerFeedback(tmp,true)
            .then((response) => JSON.parse(response)).then((getData) => {
                if (getData.length == 1)
                    this.setState({ attendance: [getData[0]] });
                else
                    this.setState({ attendance: getData });
            }).catch((response) => {
                console.log("catch in getAttendanceRecords");
                this.setState({ isSubmitSuccess: false, submitMessage: 'Error occured:' + response, isSubmited: false });
                throw response;
            });
    }
    async getClientInformation() {
        let tmp = serverComuunication.handleServerCommunication_type2('GET', String(this.constructor.name).replace("_InputForm", ""), this.props.seatNo);
        return this.handleStateManagement_General_ServerFeedback(tmp, true)
            .then((response) => JSON.parse(response))
            .catch((response) => {
                console.log("catch in getClientInformation");
                this.setState({ isSubmitSuccess: false, submitMessage: 'Error occured:' + response, isSubmited: false });
                throw response;
            });
    }
    async getAge() {
        let tmp = serverComuunication.handleServerCommunication_type2('GET', 'Client_Information_age', this.props.seatNo);
        return this.handleStateManagement_General_ServerFeedback(tmp, true)
            .then((response) => JSON.parse(response))
            .catch((response) => {
                console.log("catch in getAge");
                throw response;
            });
    }
    onFocus = () => { 
        this.getAttendanceRecords();
        window.removeEventListener("focus", this.onFocus);
    }
    async componentDidMount() {
        // if update => existing patient, fetch the data
        if (this.isFormUpdate() && this.props.seatNo) {
            // fetch what they did
            await this.getAttendanceRecords();
        }
    }
    handleStateManagement_General_ServerFeedback = (serverFeedback,isSuppress) => { 
        return handleServerFeedback(serverFeedback).then((massaged_feedback) => {
            let local_isSuppress = isSuppress ? false : true;
            this.setState({ isSubmitSuccess: isSuppress ? local_isSuppress:massaged_feedback.isSubmitSuccess, submitMessage: massaged_feedback.submitMessage, isSubmited: local_isSuppress });
            return massaged_feedback.content;
        }).catch(exx => {
            // 20210123
            if (exx.httpStatusCode !== null && exx.httpStatusCode == 401) { 
                window.addEventListener("focus", this.onFocusRefreshPage);
            }
            exx.submitMessage.then(x => this.setState({ submitMessage: x, isSubmitSuccess: exx.isSubmitSuccess, isSubmited: exx.isSubmited }));
            throw exx;
        });
    }
    onFocusRefreshPage = () => { 
        console.error("onFocusRefreshPage now!")
        location.reload();
        window.removeEventListener("focus", this.onFocusRefreshPage)
    }
    handleFormUpdate_Submit(ele) {
        var tmp = serverComuunication.handleServerCommunication_type1('Put', String(ele.Controller).replace("_InputForm", ""), JSON.stringify(ele));
        return this.handleStateManagement_General_ServerFeedback(tmp);
    }
    handleFormCreate(ele) {
        var tmp = serverComuunication.handleServerCommunication_type1('POST', String(ele.Controller).replace("_InputForm", ""), JSON.stringify(ele));
        return this.handleStateManagement_General_ServerFeedback(tmp);
    }
    render() {
        return (
            <div className="container">
                {this.isFormUpdate() && <div className="row ghostHeader">
                    <button className="ghostButton" onClick={() => this.pageEmitter("accessment_all", false, "")} > Assessment </button>
                    <button className="ghostButton" onClick={() => this.pageEmitter("loan_search", false, "")}> Loan Record </button>
                    <button className="ghostButton" onClick={() => this.pageEmitter("client_work_order", false, "")}> Work Order </button>
                    <button className="ghostButton" onClick={() => this.pageEmitter("client_ppmi", false, "")}> PPMI Record </button>
                    <button className="ghostButton"> Print this record </button>
                </div>}
                <Client_Information_InputForm_Revamp
                    isFormUpdate={this.isFormUpdate} onFormCreate={this.handleFormCreate} onFormModify={this.handleFormUpdate_Submit}
                    getAge={this.getAge} isSubmitSuccess={this.state.isSubmitSuccess}
                    pageEmitter={this.pageEmitter} getClientInformation={this.getClientInformation}
                />
                {this.state.attendance.length > 0 && <div> <hr />
                    <h2> Attendance Records</h2>
                    <Suspense fallback={<div>Loading...</div>}>
                        <div id="table-wrapper">
                            <div id="table-scroll">
                                <ReactTable headerList={Object.keys(this.state.attendance[0])} hiddenFields="RefId,MoNotes,SeatingNotes,SeatNo" data={getMassagedList(this.state.attendance)} >
                                    <button handler={this.editOneRow} uni_key="RefId" css_class_name="btn btn-secondary margin2px"> <i className="far fa-edit"></i> </button>
                                </ReactTable></div> </div>
                    </Suspense>
                </div>}
                {this.state.isSubmited &&
                    <div className="centralContainerToast" >
                        <Suspense fallback={<div>Loading...</div>}>
                            <HandleAfterSubmit_toast
                                origin_form={this.constructor.name}
                                close_handle={this.handle_closeToastBox}
                                submitMessage_header={this.state.isSubmitSuccess ? "Success" : "Fail"}>
                                <p className="" type="complex_message">{this.state.submitMessage} </p>
                                <button on_click={() => this.handle_closeToastBox()} className="ContainerToastCloseButton">Close</button>
                            </HandleAfterSubmit_toast>
                        </Suspense>

                    </div>}
                {this.state.isSubmited && <div id="opaque" >&nbsp;</div>}
                <br />
            </div>
        );
    }
}
function getMassagedList(input) {
    return input.map(item => {
        const obj = Object.assign({}, item);
        obj["Progress"] = item.Progress ? "Yes" : "No";
        obj["Picture"] = item.Picture ? "Yes" : "No";
        obj["Video"] = item.Video ? "Yes" : "No";
        obj["Xray"] = item.Xray ? "Yes" : "No";
        return obj;
    });
}
ReactDOM.render(<Client_Information_InputForm seatNo={seatNo} pageAction={pageAction} />, document.getElementById('clienInformationForm'));