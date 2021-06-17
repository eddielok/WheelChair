import handleServerFeedback from '/js/shared/handleServerFeedback.js';
import serverComuunication from '/js/shared/serverComuunication.js';
import WheelChair_Information_InputForm from '/js/formComponent/wheelChairInformation/WheelChair_Information_InputForm.jsx';
 
class InputContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: {
                'WheelChair_Information_InputForm': {}
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
    getDataType2 = (action, ctrller, payload) => {
        let tmp = serverComuunication.handleServerCommunication_type2(action, ctrller, payload);
        return this.handleStateManagement_General_ServerFeedback(tmp);
    }
    getDataType4 = (action, ctrller, payload, queryStr) => {
        let tmp = serverComuunication.handleServerCommunication_type4(action, ctrller, payload, queryStr);
        return this.handleStateManagement_General_ServerFeedback(tmp);
    }
    handleFormCreate(ele) {
        this.setState({ lastSubmittedForm: ele.Controller });
        var tmp = serverComuunication.handleServerCommunication_type1('POST', ele.Controller, JSON.stringify(this.state.data[ele.Controller]));
        return this.handleStateManagement_General_ServerFeedback(tmp, true);
    }
    handleFormUpdate_local(ele) {
        this.setState({ data: { ...this.state.data, [ele.Controller]: ele } });
    }
    handle_closeToastBox = () => {
        this.setState({ isSubmited: false });
    }
    handleFormUpdate_Submit(ele) {
        this.setState({ lastSubmittedForm: ele.Controller });
        var tmp = serverComuunication.handleServerCommunication_type1('Put', ele.Controller, JSON.stringify(this.state.data[ele.Controller]));
        return this.handleStateManagement_General_ServerFeedback(tmp, true);
    }
    // returns a Promise
    handleFormGetData(ele) {
        var tmp = serverComuunication.handleServerCommunication_type2('GET', ele.Controller, this.props.pSeatNo);
        return this.handleStateManagement_General_ServerFeedback(tmp)
            .then((getData) => {
                this.setState({ data: { ...this.state.data, [ele.Controller]: JSON.parse(getData) }, isSubmitSuccess: false, submitMessage: '', isSubmited: false });
            }).catch((response) => {
                console.log(response);
                this.setState({ isSubmitSuccess: false, submitMessage: 'Error occured:' + response, isSubmited: false });
            });
    }
    getMaintainaceShowing(wc_no) {
        serverComuunication.handleInternalServerPageRedirect_newPage('MaintenanceLogsPage/Search', { filterString: [wc_no] });
    }
    isFormUpdate() {
        return String(this.props.pAction).toLowerCase().trim() == 'update';
    }
    getPId() {
        return Number.isInteger(parseInt(this.props.pid)) ? this.props.pid : '0';
    }
    isRenderForm(formName) {
        return String(this.props.pAction).toLowerCase().trim() == 'create' ||
            (this.isFormUpdate() && Boolean(this.props.pSeatNo) &&
                String(this.props.pWorkingForm).toLowerCase().trim() == formName.toLowerCase().trim()
            );
    }
    render() {
        return (
            <div className="formWheelChair">
                {this.isRenderForm("WheelChair_Information") &&
                    <WheelChair_Information_InputForm
                        formaAction={this.props.pAction} WheelchairNo={this.props.pSeatNo} isFormUpdate={this.isFormUpdate} lastSubmittedForm={this.state.lastSubmittedForm}
                        pid={this.getPId()} fetchedData={this.state.data.WheelChair_Information_InputForm}
                        isSubmited={this.state.isSubmited} isSubmitSuccess={this.state.isSubmitSuccess} submitMessage={this.state.submitMessage}
                        handleFormUpdate_parent={this.handleFormUpdate_local}
                        getData={this.handleFormGetData} onFormCreate={this.handleFormCreate} onFormModify={this.handleFormUpdate_Submit}
                        getDataType2={this.getDataType2} getDataType4={this.getDataType4}
                        getMaintainaceShowing={this.getMaintainaceShowing} handle_closeToastBox={this.handle_closeToastBox}
                    />}
            </div>
        );
    }
}
ReactDOM.render(<InputContainer pid={qId} pAction={qAction} pSeatNo={qSeatNo} pWorkingForm={qWorkingForm} />, document.getElementById('contentForm'));
