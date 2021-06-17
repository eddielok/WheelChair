﻿import httpResults from '/js/shared/httpCodes.js';
import serverComuunication from '/js/shared/serverComuunication.js'; 
import Account_Information_InputForm from '/js/formComponent/accountInfomation/Account_Information_InputForm.jsx';
import reduceComplexValidationMessage from '/js/shared/reduceComplexValidationMessage.js'; 

class InputContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: {
                'Account_Information_InputForm': {}
            }, 
            isSubmited: false,
            isSubmitSuccess: false,
            lastSubmittedForm: "",
            submitMessage: ''
        };
        this.handleFormCreate = this.handleFormCreate.bind(this);
        this.handleFormUpdate_Submit = this.handleFormUpdate_Submit.bind(this);
        this.handleFormGetData = this.handleFormGetData.bind(this);
        this.resetIsSubmited = this.resetIsSubmited.bind(this);
        this.handleFormUpdate_local = this.handleFormUpdate_local.bind(this);
        this.isFormUpdate = this.isFormUpdate.bind(this);
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
    handleFormCreate(ele) {
        // console.log(ele) 
        this.setState({ lastSubmittedForm: ele.Controller });
        var tmp = serverComuunication.handleServerCommunication_type1('POST', ele.Controller, JSON.stringify(this.state.data[ele.Controller]));
        return this.handleStateManagement_General_ServerFeedback(tmp);
    }
    handleFormUpdate_local(ele) {
        this.setState({ data: { ...this.state.data, [ele.Controller]: ele }, isSubmitSuccess: false });
    }
    handleFormUpdate_Submit(ele) {
        //  console.log(ele)
        this.setState({ lastSubmittedForm: ele.Controller });
        var tmp = serverComuunication.handleServerCommunication_type1('Put', ele.Controller, JSON.stringify(this.state.data[ele.Controller]));
        return this.handleStateManagement_General_ServerFeedback(tmp);
    }
    // returns a Promise
    handleFormGetData(ele) {
        var tmp = serverComuunication.handleServerCommunication_type2('GET', ele.Controller, this.props.pid);
        return this.handleStateManagement_General_ServerFeedback(tmp)
            .then((getData) => {
                this.setState({ data: { ...this.state.data, [ele.Controller]: JSON.parse(getData) }, isSubmitSuccess: false, submitMessage: '', isSubmited: false });
            }).catch((response) => {
                console.log(response);
                this.setState({ isSubmitSuccess: false, submitMessage: 'Error occured:' + response, isSubmited: false });
            });
    }
    resetIsSubmited(c) {
        this.setState({ isSubmited: false, unsavedChanges: { ...this.state.unsavedChanges, [c]: true } });
    } 
    isFormUpdate() {
        return String(this.props.pAction).toLowerCase().trim() == 'update';
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
    render() { 
        return (
            <div className="formWheelChair">
               
                <Tabs defaultActiveKey={this.props.pWorkingForm} id="uncontrolled-tab-example">

                    <Tab eventKey="Account_Information" title="Account Information" disabled={!this.isRenderForm("Account_Information")} >

                        {this.isRenderForm("Account_Information") &&
                            <Account_Information_InputForm
                                formaAction={this.props.pAction} seatNo={this.props.pSeatNo} isFormUpdate={this.isFormUpdate} lastSubmittedForm={this.state.lastSubmittedForm}
                                pid={this.getPId()} fetchedData={this.state.data.Account_Information_InputForm}
                                isSubmited={this.state.isSubmited} isSubmitSuccess={this.state.isSubmitSuccess} submitMessage={this.state.submitMessage}
                                handleFormUpdate_parent={this.handleFormUpdate_local}
                                resetSubmit={this.resetIsSubmited} getData={this.handleFormGetData} onFormCreate={this.handleFormCreate} onFormModify={this.handleFormUpdate_Submit}
                            />}

                    </Tab>


                </Tabs>
            </div>
        );
    }
}
ReactDOM.render(<InputContainer pid={qId} pAction={qAction} pSeatNo={qSeatNo} pWorkingForm={qWorkingForm} />, document.getElementById('contentForm'));