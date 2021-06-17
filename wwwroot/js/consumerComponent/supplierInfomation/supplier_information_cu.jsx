import serverComuunication from '/js/shared/serverComuunication.js';
import Supplier_Information_InputForm from '/js/formComponent/supplierInfomation/Supplier_Information_InputForm.jsx';
import handleServerFeedback from '/js/shared/handleServerFeedback.js';
class InputContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: {
                'Supplier_Information_InputForm': {}
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
    handle_closeToastBox = () => {
        this.setState({ isSubmited: false });
    }
    handleFormCreate(ele) {
        this.setState({ lastSubmittedForm: ele.Controller });
        var tmp = serverComuunication.handleServerCommunication_type1('POST', ele.Controller, JSON.stringify(this.state.data[ele.Controller]));
        return this.handleStateManagement_General_ServerFeedback(tmp, true).then(res => {
            this.setState({ data: { ...this.state.data, Supplier_Information_InputForm: JSON.parse(res) } })
            return JSON.parse(res);
        });
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
    isRenderForm(formName) {
        return String(this.props.pAction).toLowerCase().trim() == 'create' ||
            (this.isFormUpdate() && Boolean(this.props.pid) &&
                String(this.props.pWorkingForm).toLowerCase().trim() == formName.toLowerCase().trim()
            );
    }
    routeEmitter = (action) => {
        const createObj = { 'pageAction': 'create', 'workingForm': 'Supplier_Information' };
        switch (action) {
            case 'gotoPage':
                serverComuunication.handleInternalServerPageRedirect("SupplierInformation/search", {});
                break;
            case 'createNew':
                serverComuunication.handleInternalServerPageRedirect(" SupplierInformation/Index", createObj);
                break;
            case 'editThisRow':
                var queryString = {};
                if (this.state.data.Supplier_Information_InputForm.refId || this.state.data.Supplier_Information_InputForm.RefId) {
                    var id;
                    if (this.state.data.Supplier_Information_InputForm.refId) id = this.state.data.Supplier_Information_InputForm.refId;
                    if (this.state.data.Supplier_Information_InputForm.RefId) id = this.state.data.Supplier_Information_InputForm.RefId;
                    queryString = { "id": id, 'pageAction': 'update', 'workingForm': 'Supplier_Information' };
                }
                else
                    queryString = createObj;
                serverComuunication.handleInternalServerPageRedirect(" SupplierInformation/Index", queryString);
                break;
        }
    }
    render() {
        return (
            <div className="formWheelChair">
                {this.isRenderForm("Supplier_Information") &&
                    <Supplier_Information_InputForm
                        formaAction={this.props.pAction} isFormUpdate={this.isFormUpdate}
                        pid={this.getPId()} fetchedData={this.state.data.Supplier_Information_InputForm}
                        isSubmited={this.state.isSubmited} isSubmitSuccess={this.state.isSubmitSuccess} submitMessage={this.state.submitMessage}
                        handleFormUpdate_parent={this.handleFormUpdate_local} getData={this.handleFormGetData} onFormCreate={this.handleFormCreate} onFormModify={this.handleFormUpdate_Submit}
                        handle_closeToastBox={this.handle_closeToastBox} routeEmitter={this.routeEmitter}
                    />}
            </div>
        );
    }
}
ReactDOM.render(<InputContainer pid={qId} pAction={qAction} pSeatNo={qSeatNo} pWorkingForm={qWorkingForm} />, document.getElementById('contentForm'));