import serverComuunication from '/js/shared/serverComuunication.js';
import HandleUnsavedChangesDisplay from '/js/shared/HandleUnsavedChangesDisplay.jsx';
import Part_Information_InputForm from '/js/formComponent/PartInformation/part_Information_InputForm.jsx';
import handleServerFeedback from '/js/shared/handleServerFeedback.js';

class InputContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: {
                'part_Information_InputForm': {}
            },
            unsavedChanges: {
                'part_Information_InputForm': false
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
    handleStateManagement_General_ServerFeedback = (serverFeedback, isDisplay) => {
        return handleServerFeedback(serverFeedback).then((massaged_feedback) => {
            if (isDisplay) this.setState({ isSubmitSuccess: massaged_feedback.isSubmitSuccess, submitMessage: massaged_feedback.submitMessage, isSubmited: true });
            this.setState({ unsavedChanges: { ...this.state.unsavedChanges, [this.state.lastSubmittedForm]: false } });
            return massaged_feedback.content;
        }).catch(exx => {
            exx.submitMessage.then(x => this.setState({ submitMessage: x, isSubmitSuccess: exx.isSubmitSuccess, isSubmited: exx.isSubmited }));
            throw exx;
        });
    }
    handleFormCreate(ele) {
        this.setState({ lastSubmittedForm: ele.Controller });
        var tmp = serverComuunication.handleServerCommunication_type1('POST', ele.Controller, JSON.stringify(this.state.data[ele.Controller]));
        return this.handleStateManagement_General_ServerFeedback(tmp,true);
    }
    getDataType2 = (action, ctrller, payload) => {
        let tmp = serverComuunication.handleServerCommunication_type2(action, ctrller, payload);
        return this.handleStateManagement_General_ServerFeedback(tmp);
    }
    handleFormUpdate_local(ele) {
        this.setState({ data: { ...this.state.data, [ele.Controller]: ele }, isSubmited: false });
    }
    handleFormUpdate_Submit(ele) {
        //  console.log(ele)
        this.setState({ lastSubmittedForm: ele.Controller });
        var tmp = serverComuunication.handleServerCommunication_type1('Put', ele.Controller, JSON.stringify(this.state.data[ele.Controller]));
        return this.handleStateManagement_General_ServerFeedback(tmp, true);
    }
    // returns a Promise
    handleFormGetData(ele) {
        return this.getDataType2('GET', ele.Controller, this.props.pid)
            .then((getData) => {
                this.setState({ data: { ...this.state.data, [ele.Controller]: JSON.parse(getData) }, isSubmitSuccess: false, submitMessage: '', isSubmited: false });
            }).catch((response) => {
                this.setState({ isSubmitSuccess: false, submitMessage: 'Error occured:' + response, isSubmited: false });
                throw response;
            });
    }
    resetIsSubmited(c) {
        this.setState({ isSubmited: false, unsavedChanges: { ...this.state.unsavedChanges, [c]: true } });
    }
    prepareIsModify() {
        let warningMessage = "";
        let result = Object.values(this.state.unsavedChanges).some(function (isUnsaved) {
            return isUnsaved ? true : false;
        });
        if (result) {
            warningMessage = warningMessage.concat(this.state.unsavedChanges.part_Information_InputForm ? "part_Information_InputForm; " : "");
        }
        return warningMessage;
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
    handle_closeToastBox = () => {
        this.setState({ isSubmited: false });
    }
    render() {

        var warningMessage = this.prepareIsModify();
        return (
            <div className="PartInformation">
                {!this.state.isSubmitSuccess && warningMessage.length > 0 && <HandleUnsavedChangesDisplay isDisplay={warningMessage.length > 0 ? true : false} message={warningMessage} />}
                <Part_Information_InputForm
                    formaAction={this.props.pAction} seatNo={this.props.pSeatNo} isFormUpdate={this.isFormUpdate} lastSubmittedForm={this.state.lastSubmittedForm}
                    pid={this.getPId()} fetchedData={this.state.data.Part_Information_InputForm}
                    isSubmited={this.state.isSubmited} isSubmitSuccess={this.state.isSubmitSuccess} submitMessage={this.state.submitMessage}
                    handleFormUpdate_parent={this.handleFormUpdate_local}
                    resetSubmit={this.resetIsSubmited} getData={this.handleFormGetData} onFormCreate={this.handleFormCreate} onFormModify={this.handleFormUpdate_Submit}
                    getDataType2={this.getDataType2} handle_closeToastBox={this.handle_closeToastBox}
                />
            </div>
        );
    }
}
ReactDOM.render(<InputContainer pid={qId} pAction={qAction} pSeatNo={qSeatNo} pWorkingForm={qWorkingForm} />, document.getElementById('contentForm'));
