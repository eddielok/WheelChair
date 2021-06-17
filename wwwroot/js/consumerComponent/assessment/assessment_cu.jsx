import handleServerFeedback from '/js/shared/handleServerFeedback.js';
import serverComuunication from '/js/shared/serverComuunication.js';
import Medical_Information_InputForm from '/js/formComponent/assessment/MdicalInfo_InputForm.jsx';
import Social_Information_InputForm from '/js/formComponent/assessment/Social_Information_InputForm.jsx';
import Functional_Skills_InputForm from '/js/formComponent/assessment/Functional_Skills_InputForm.jsx';
import Physical_Examination_InputForm from '/js/formComponent/assessment/Physical_Examination_InputForm.jsx';
import Problem_Objective_List_InputForm from '/js/formComponent/assessment/Problem_Objective_List_InputForm.jsx';
import Seating_System_Prescription_InputForm from '/js/formComponent/assessment/Seating_System_Prescription_InputForm.jsx';
import Body_Dimension_InputForm from '/js/formComponent/assessment/Body_Dimension_InputForm.jsx';
import Wheelchair_Dimension_InputForm from '/js/formComponent/assessment/Wheelchair_Dimension_InputForm.jsx';
import Progress_Note_InputForm from '/js/formComponent/assessment/Progress_Note_InputForm.jsx';
class InputContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                'Medical_Information_InputForm': {},
                'Body_Dimension_InputForm': {},
                'Social_Information_InputForm': {},
                'Functional_Skills_InputForm': {},
                'Physical_Examination_InputForm': {},
                'Problem_Objective_List_InputForm': {},
                'Seating_System_Prescription_InputForm': {},
                'Wheelchair_Dimension_InputForm': {},
                'Progress_Note_InputForm': {}
            },
            clientAge: '',
            isSubmited: false,
            isSubmitSuccess: false,
            lastSubmittedForm: "",
            submitMessage: ''
        };
        this.getSchoolListSuggestion = this.getSchoolListSuggestion.bind(this);
        this.getAge = this.getAge.bind(this);
        this.getFormAge = this.getFormAge.bind(this);
    }
    handleStateManagement_General_ServerFeedback = (serverFeedback, isDisplay) => {
        return handleServerFeedback(serverFeedback).then((massaged_feedback) => {
            let local_isDisplay = isDisplay ? massaged_feedback.isSubmited : false;
            this.setState({ isSubmitSuccess: massaged_feedback.isSubmitSuccess, submitMessage: massaged_feedback.submitMessage, isSubmited: local_isDisplay });
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
        location.reload();
        window.removeEventListener("focus", this.onFocus)
    }
    handleFormCreate = (ele) => {
        // console.log(ele) 
        this.setState({ lastSubmittedForm: ele.Controller });
        var tmp = serverComuunication.handleServerCommunication_type1('POST', ele.Controller.replace("_InputForm", ""), JSON.stringify(this.state.data[ele.Controller]));
        return this.handleStateManagement_General_ServerFeedback(tmp, true);
    }
    handleFormUpdate_local = (ele) => {
        this.setState({ data: { ...this.state.data, [ele.Controller]: ele }, isSubmitSuccess: false });
    }
    handleFormUpdate_Submit = (ele) => {
        this.setState({ lastSubmittedForm: ele.Controller });
        var tmp = serverComuunication.handleServerCommunication_type1('Put', ele.Controller.replace("_InputForm", ""), JSON.stringify(this.state.data[ele.Controller]));
        return this.handleStateManagement_General_ServerFeedback(tmp, true);
    }
    // returns a Promise
    handleFormGetData = (ele) => {
        let tmp = serverComuunication.handleServerCommunication_type2('GET', ele.Controller.replace("_InputForm", ""), this.props.pid);
        return this.handleStateManagement_General_ServerFeedback(tmp)
            .then((getData) => {
                this.setState({ data: { ...this.state.data, [ele.Controller]: JSON.parse(getData) }, isSubmitSuccess: false, submitMessage: '', isSubmited: false });
            }).catch((response) => {
                this.setState({ isSubmitSuccess: false, submitMessage: 'Error occured:' + response, isSubmited: false });
                throw response;
            });
    }
    resetIsSubmited = (c) => {
        this.setState({ isSubmited: false });
    }
    isFormUpdate = () => {
        return String(this.props.pAction).toLowerCase().trim() === 'update';
    }
    getPId() {
        return Number.isInteger(parseInt(this.props.pid)) ? this.props.pid : '0';
    }
    isRenderForm(formName) {
        return String(this.props.pAction).toLowerCase().trim() == 'create' ||
            (this.isFormUpdate() && Boolean(this.props.pid) &&
                String(this.props.pWorkingForm).toLowerCase().trim() == formName.toLowerCase().trim()
            );
    }
    async getAge(seatNo) {
        let tmp = serverComuunication.handleServerCommunication_type2('GET', 'Client_Information_age', seatNo);
        this.handleStateManagement_General_ServerFeedback(tmp)
            .then((getData) => { 
                this.setState({ clientAge: getData });
            }).catch((response) => {
                this.setState({ isSubmitSuccess: false, submitMessage: 'Error occured:' + response, isSubmited: false });
                throw response;
            });
    }
    componentDidMount() {
        this.getAge(this.props.pSeatNo);
    }
    async getFormAge(seatNo, formDate) {
        let tmp = serverComuunication.handleServerCommunication_type2('GET', 'Client_Information_dob', seatNo);
        this.handleStateManagement_General_ServerFeedback(tmp)
            .then((getData) => {
                let d1 = new Date(formDate);
                let d2 = new Date(JSON.parse(getData));
                this.setState({ clientAge: d1.getFullYear() - d2.getFullYear() });
            }).catch((response) => {
                this.setState({ isSubmitSuccess: false, submitMessage: 'Error occured:' + response, isSubmited: false });
                throw response;
            });
    }
    async getSchoolListSuggestion() {
        let tmp = serverComuunication.handleServerCommunication_type2('GET', 'School_list', '')
        return this.handleStateManagement_General_ServerFeedback(tmp)
            .catch((response) => {
                this.setState({ isSubmitSuccess: false, submitMessage: 'Error occured:' + response, isSubmited: false });
                throw response;
            });
    }
    handle_closeToastBox = () => {
        this.setState({ isSubmited: false });
    }
    pageEmitter = (action, isNewPage, param1, param2, param3, param4) => {
        console.log("pageEmitter");
        let queryString = {};
        var path = "";
        switch (action) {
            case "Accessment_all":
                queryString["seatNo"] = param1;
                queryString["workingForm"] = param2;
                path = "Accessment/AllAspect";
                break;
            case "Accessment_index":
                queryString["seatNo"] = param1;
                queryString["workingForm"] = param2;
                queryString["pageAction"] = param3;
                queryString["id"] = param4;
                path = "Accessment/index";
                break;
            case "client_info":
                queryString["seatNo"] = param1;
                queryString["pageAction"] = param2;
                path = "ClientSearch/clientInformation";
                break;
        }
        if (isNewPage)
            serverComuunication.handleInternalServerPageRedirect_newPage(path, queryString);
        else
            serverComuunication.handleInternalServerPageRedirect(path, queryString);
    }
    render() {
        return (
            <div className="formWheelChair">
                <Tabs defaultActiveKey={this.props.pWorkingForm ? this.props.pWorkingForm : "Medical_Information"} onSelect={(k) => { if (k == "Back_Client_Info") this.pageEmitter("client_info", false, this.props.pSeatNo, "update"); } }>
                    {this.isRenderForm("Medical_Information") && <Tab eventKey="Medical_Information" title="Medical Information" disabled={!this.isRenderForm("Medical_Information")}>
                        {this.isRenderForm("Medical_Information") &&
                            <Medical_Information_InputForm
                                formaAction={this.props.pAction} seatNo={this.props.pSeatNo} isFormUpdate={this.isFormUpdate} lastSubmittedForm={this.state.lastSubmittedForm}
                                pid={this.getPId()} fetchedData={this.state.data.Medical_Information_InputForm}
                                isSubmited={this.state.isSubmited} isSubmitSuccess={this.state.isSubmitSuccess} submitMessage={this.state.submitMessage}
                                handleFormUpdate_parent={this.handleFormUpdate_local}
                                resetSubmit={this.resetIsSubmited} getData={this.handleFormGetData} onFormCreate={this.handleFormCreate} onFormModify={this.handleFormUpdate_Submit}
                                getAge={this.getAge} age={this.state.clientAge} getFormAge={this.getFormAge}
                                pageEmitter={this.pageEmitter} handle_closeToastBox={this.handle_closeToastBox}
                            />}
                    </Tab>
                    }
                    {this.isRenderForm("Social_Information") && <Tab eventKey="Social_Information" title="Social Information" disabled={!this.isRenderForm("Social_Information")}  >
                        {this.isRenderForm("Social_Information") &&
                            <Social_Information_InputForm
                                formaAction={this.props.pAction} seatNo={this.props.pSeatNo} isFormUpdate={this.isFormUpdate} lastSubmittedForm={this.state.lastSubmittedForm}
                                pid={this.getPId()} fetchedData={this.state.data.Social_Information_InputForm}
                                isSubmited={this.state.isSubmited} isSubmitSuccess={this.state.isSubmitSuccess} submitMessage={this.state.submitMessage}
                                handleFormUpdate_parent={this.handleFormUpdate_local}
                                resetSubmit={this.resetIsSubmited} getData={this.handleFormGetData} onFormCreate={this.handleFormCreate} onFormModify={this.handleFormUpdate_Submit}
                                getAge={this.getAge} age={this.state.clientAge} getFormAge={this.getFormAge}
                                pageEmitter={this.pageEmitter} handle_closeToastBox={this.handle_closeToastBox} getSchoolListSuggestion={this.getSchoolListSuggestion}
                            />}
                    </Tab>
                    }
                    {this.isRenderForm("Functional_Skills") && <Tab eventKey="Functional_Skills" title="Functional Skills" disabled={!this.isRenderForm("Functional_Skills")} >
                        {this.isRenderForm("Functional_Skills") &&
                            <Functional_Skills_InputForm
                                formaAction={this.props.pAction} seatNo={this.props.pSeatNo} isFormUpdate={this.isFormUpdate} lastSubmittedForm={this.state.lastSubmittedForm}
                                pid={this.getPId()} fetchedData={this.state.data.Functional_Skills_InputForm}
                                isSubmited={this.state.isSubmited} isSubmitSuccess={this.state.isSubmitSuccess} submitMessage={this.state.submitMessage}
                                handleFormUpdate_parent={this.handleFormUpdate_local}
                                resetSubmit={this.resetIsSubmited} getData={this.handleFormGetData} onFormCreate={this.handleFormCreate} onFormModify={this.handleFormUpdate_Submit}
                                getAge={this.getAge} age={this.state.clientAge} getFormAge={this.getFormAge}
                                pageEmitter={this.pageEmitter} handle_closeToastBox={this.handle_closeToastBox}
                            />}
                    </Tab>
                    }
                    {this.isRenderForm("Physical_Examination") &&
                        <Tab eventKey="Physical_Examination" title="Physical Examination" disabled={!this.isRenderForm("Physical_Examination")} >

                            {this.isRenderForm("Physical_Examination") &&
                                <Physical_Examination_InputForm
                                    formaAction={this.props.pAction} seatNo={this.props.pSeatNo} isFormUpdate={this.isFormUpdate} lastSubmittedForm={this.state.lastSubmittedForm}
                                    pid={this.getPId()} fetchedData={this.state.data.Physical_Examination_InputForm}
                                    isSubmited={this.state.isSubmited} isSubmitSuccess={this.state.isSubmitSuccess} submitMessage={this.state.submitMessage}
                                    handleFormUpdate_parent={this.handleFormUpdate_local}
                                    resetSubmit={this.resetIsSubmited} getData={this.handleFormGetData} onFormCreate={this.handleFormCreate} onFormModify={this.handleFormUpdate_Submit}
                                    getAge={this.getAge} age={this.state.clientAge} getFormAge={this.getFormAge}
                                    pageEmitter={this.pageEmitter} handle_closeToastBox={this.handle_closeToastBox}
                                />}
                        </Tab>
                    }
                    {this.isRenderForm("Problem_Objective_List") &&
                        <Tab eventKey="Problem_Objective_List" title="Problem and Objective" disabled={!this.isRenderForm("Problem_Objective_List")} >

                            {this.isRenderForm("Problem_Objective_List") &&
                                <Problem_Objective_List_InputForm
                                    formaAction={this.props.pAction} seatNo={this.props.pSeatNo} isFormUpdate={this.isFormUpdate} lastSubmittedForm={this.state.lastSubmittedForm}
                                    pid={this.getPId()} fetchedData={this.state.data.Problem_Objective_List_InputForm}
                                    isSubmited={this.state.isSubmited} isSubmitSuccess={this.state.isSubmitSuccess} submitMessage={this.state.submitMessage}
                                    handleFormUpdate_parent={this.handleFormUpdate_local}
                                    resetSubmit={this.resetIsSubmited} getData={this.handleFormGetData} onFormCreate={this.handleFormCreate} onFormModify={this.handleFormUpdate_Submit}
                                    getAge={this.getAge} age={this.state.clientAge} getFormAge={this.getFormAge}
                                    pageEmitter={this.pageEmitter} handle_closeToastBox={this.handle_closeToastBox}
                                />}
                        </Tab>
                    }
                    {this.isRenderForm("Seating_System_Prescription") &&
                        <Tab eventKey="Seating_System_Prescription" title="Seating System Prescription" disabled={!this.isRenderForm("Seating_System_Prescription")} >

                            {this.isRenderForm("Seating_System_Prescription") &&
                                <Seating_System_Prescription_InputForm
                                    formaAction={this.props.pAction} seatNo={this.props.pSeatNo} isFormUpdate={this.isFormUpdate} lastSubmittedForm={this.state.lastSubmittedForm}
                                    pid={this.getPId()} fetchedData={this.state.data.Seating_System_Prescription_InputForm}
                                    isSubmited={this.state.isSubmited} isSubmitSuccess={this.state.isSubmitSuccess} submitMessage={this.state.submitMessage}
                                    handleFormUpdate_parent={this.handleFormUpdate_local}
                                    resetSubmit={this.resetIsSubmited} getData={this.handleFormGetData} onFormCreate={this.handleFormCreate} onFormModify={this.handleFormUpdate_Submit}
                                    getAge={this.getAge} age={this.state.clientAge} getFormAge={this.getFormAge}
                                    pageEmitter={this.pageEmitter} handle_closeToastBox={this.handle_closeToastBox}
                                />}
                        </Tab>
                    }
                    {this.isRenderForm("Body_Dimension") &&
                        <Tab eventKey="Body_Dimension" title="Body Dimension " disabled={!this.isRenderForm("Body_Dimension")} >

                            {this.isRenderForm("Body_Dimension") &&
                                <Body_Dimension_InputForm
                                    formaAction={this.props.pAction} seatNo={this.props.pSeatNo} isFormUpdate={this.isFormUpdate} lastSubmittedForm={this.state.lastSubmittedForm}
                                    pid={this.getPId()} fetchedData={this.state.data.Body_Dimension_InputForm}
                                    isSubmited={this.state.isSubmited} isSubmitSuccess={this.state.isSubmitSuccess} submitMessage={this.state.submitMessage}
                                    handleFormUpdate_parent={this.handleFormUpdate_local}
                                    resetSubmit={this.resetIsSubmited} getData={this.handleFormGetData} onFormCreate={this.handleFormCreate} onFormModify={this.handleFormUpdate_Submit}
                                    getAge={this.getAge} age={this.state.clientAge} getFormAge={this.getFormAge}
                                    pageEmitter={this.pageEmitter} handle_closeToastBox={this.handle_closeToastBox}
                                />}
                        </Tab>
                    }
                    {this.isRenderForm("Wheelchair_Dimension") &&
                        <Tab eventKey="Wheelchair_Dimension" title="Wheelchair Measurements" disabled={!this.isRenderForm("Wheelchair_Dimension")} >

                            {this.isRenderForm("Wheelchair_Dimension") &&
                                <Wheelchair_Dimension_InputForm
                                    formaAction={this.props.pAction} seatNo={this.props.pSeatNo} isFormUpdate={this.isFormUpdate} lastSubmittedForm={this.state.lastSubmittedForm}
                                    pid={this.getPId()} fetchedData={this.state.data.Wheelchair_Dimension_InputForm}
                                    isSubmited={this.state.isSubmited} isSubmitSuccess={this.state.isSubmitSuccess} submitMessage={this.state.submitMessage}
                                    handleFormUpdate_parent={this.handleFormUpdate_local}
                                    resetSubmit={this.resetIsSubmited} getData={this.handleFormGetData} onFormCreate={this.handleFormCreate} onFormModify={this.handleFormUpdate_Submit}
                                    getAge={this.getAge} age={this.state.clientAge} getFormAge={this.getFormAge}
                                    pageEmitter={this.pageEmitter} handle_closeToastBox={this.handle_closeToastBox}
                                />}
                        </Tab>
                    }
                    {this.isRenderForm("Progress_Note") &&
                        <Tab eventKey="Progress_Note" title="Progress Note" disabled={!this.isRenderForm("Progress_Note")} >

                            {this.isRenderForm("Progress_Note") &&
                                <Progress_Note_InputForm
                                    formaAction={this.props.pAction} seatNo={this.props.pSeatNo} isFormUpdate={this.isFormUpdate} lastSubmittedForm={this.state.lastSubmittedForm}
                                    pid={this.getPId()} fetchedData={this.state.data.Progress_Note_InputForm}
                                    isSubmited={this.state.isSubmited} isSubmitSuccess={this.state.isSubmitSuccess} submitMessage={this.state.submitMessage}
                                    handleFormUpdate_parent={this.handleFormUpdate_local}
                                    resetSubmit={this.resetIsSubmited} getData={this.handleFormGetData} onFormCreate={this.handleFormCreate} onFormModify={this.handleFormUpdate_Submit}
                                    getAge={this.getAge} age={this.state.clientAge} getFormAge={this.getFormAge}
                                    pageEmitter={this.pageEmitter} handle_closeToastBox={this.handle_closeToastBox}
                                />}
                        </Tab>  
                    }
                    <Tab eventKey="Back_Client_Info" title="Back to client information" id="grey_gradientBtn"></Tab>
                </Tabs>
            </div>
        );
    }
}
ReactDOM.render(<InputContainer pid={qId} pAction={qAction} pSeatNo={qSeatNo} pWorkingForm={qWorkingForm} />, document.getElementById('contentForm'));