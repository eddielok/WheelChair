import handleServerFeedback from '/js/shared/handleServerFeedback.js';
import serverComuunication from '/js/shared/serverComuunication.js';
import Maintenance_log_inputForm from '/js/formComponent/MaintenanceLog/maintenance_log_inputForm.jsx';
 
class InputContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: {
                'Maintenance_log_inputForm': {}
            },
            isSubmited: false,
            isSubmitSuccess: false,
            lastSubmittedForm: "",
            submitMessage: ''
        };
        this.handleFormCreate = this.handleFormCreate.bind(this);
        this.handleFormUpdate_Submit = this.handleFormUpdate_Submit.bind(this);
        this.handleFormGetData = this.handleFormGetData.bind(this);
        this.handleFormUpdate_local = this.handleFormUpdate_local.bind(this);
        this.isFormUpdate = this.isFormUpdate.bind(this);
    }
    handleStateManagement_General_ServerFeedback = (serverFeedback, isDisplay) => {  
        return handleServerFeedback(serverFeedback).then((massaged_feedback) => {
            if (isDisplay) this.setState({ isSubmitSuccess: massaged_feedback.isSubmitSuccess, submitMessage: massaged_feedback.submitMessage, isSubmited: true }); 
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
        return this.handleStateManagement_General_ServerFeedback(tmp, true);
    }
    handleFormUpdate_local(ele) {
        this.setState({ data: { ...this.state.data, [ele.Controller]: ele } });
    }
    handleFormUpdate_Submit(ele) {
        //  console.log(ele)
        this.setState({ lastSubmittedForm: ele.Controller });
        var tmp = serverComuunication.handleServerCommunication_type1('Put', ele.Controller, JSON.stringify(this.state.data[ele.Controller]));
        return this.handleStateManagement_General_ServerFeedback(tmp, true);
    }
    getDataType2 = (action, ctrller, payload) => {
        let tmp = serverComuunication.handleServerCommunication_type2(action, ctrller, payload);
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
    isFormUpdate() {
        return String(this.props.pAction).toLowerCase().trim() == 'update';
    }
    getPId() {
        return Number.isInteger(parseInt(this.props.pid)) ? this.props.pid : '0';
    }
    getRefId() {
        return Number.isInteger(parseInt(this.props.RefId)) ? this.props.RefId : '0';
    }
    handle_closeToastBox = () => {
        this.setState({ isSubmited: false });
    }
    isRenderForm(formName) {
        return String(this.props.pAction).toLowerCase().trim() == 'create' ||
            (this.isFormUpdate() && Boolean(this.props.pid) &&
                String(this.props.pWorkingForm).toLowerCase().trim() == formName.toLowerCase().trim()
            );
    }
    render() {

        return (
            <div className="MaintenanceLog">
                {this.isRenderForm("Maintenance_log") &&
                    <Maintenance_log_inputForm
                        formaAction={this.props.pAction} seatNo={this.props.pSeatNo} isFormUpdate={this.isFormUpdate} lastSubmittedForm={this.state.lastSubmittedForm}
                        pid={this.getPId()} fetchedData={this.state.data.Maintenance_log_inputForm}
                        isSubmited={this.state.isSubmited} isSubmitSuccess={this.state.isSubmitSuccess} submitMessage={this.state.submitMessage}
                        handleFormUpdate_parent={this.handleFormUpdate_local}
                        getData={this.handleFormGetData} onFormCreate={this.handleFormCreate} onFormModify={this.handleFormUpdate_Submit}
                        getDataType2={this.getDataType2} handle_closeToastBox={this.handle_closeToastBox}
                    />} 
            </div>
        );
    }
}
ReactDOM.render(<InputContainer pid={qId} pAction={qAction} pSeatNo={qSeatNo} pWorkingForm={qWorkingForm} />, document.getElementById('contentForm'));