import handleServerFeedback from '/js/shared/handleServerFeedback.js';
import serverComuunication from '/js/shared/serverComuunication.js';
import PPMI_InputForm from '/js/formComponent/PPMI/PPMI_InputForm.jsx';
import PPMI_Items_InputForm from '/js/formComponent/PPMI/PPMI_Items_InputForm.jsx';
import PPMIItemsEditTable from '/js/displayComponent/PPMI/PPMIItemsEditTable.jsx';
import PPMIItemsViewTable from '/js/displayComponent/PPMI/PPMIItemsViewTable.jsx';
import parseValue from '/js/shared/parseValue.js';
import scrollToReference from '/js/shared/scrollToReference.js';
import HandleAfterSubmit_toast from '/js/shared/HandleAfterSubmit_toast.jsx';
class InputContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            PPMI_InputForm: {},
            PPMI_item_list: [],
            SeatNoList: [],
            Fundings: [],
            Suppliers: [],
            PPMI_No: 0,
            isPart1Valid: false,
            isSubmited: false,
            isSubmitSuccess: false,
            lastSubmittedForm: "",
            submitMessage: ''
        };
        this.middleRef = React.createRef();
        this.bottomRef = React.createRef();
        this.handleFormCreate = this.handleFormCreate.bind(this);
        this.handleFormUpdate_Submit = this.handleFormUpdate_Submit.bind(this);
        this.handleFormGetData = this.handleFormGetData.bind(this);
        this.resetIsSubmited = this.resetIsSubmited.bind(this);
        this.handleFormUpdate_local = this.handleFormUpdate_local.bind(this);
        this.isFormUpdate = this.isFormUpdate.bind(this);
        this.handleSubmitItems2local = this.handleSubmitItems2local.bind(this);
        this.changeContent = this.changeContent.bind(this);
        this.markDeleteRow = this.markDeleteRow.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.changeToggleContent = this.changeToggleContent.bind(this);
    }
    handleStateManagement_General_ServerFeedback = (serverFeedback, in_isSuppressBox) => {
        return handleServerFeedback(serverFeedback).then((massaged_feedback) => { 
            let isSuppressBox = in_isSuppressBox ? false :  true;
            this.setState({ isSubmitSuccess: massaged_feedback.isSubmitSuccess, submitMessage: massaged_feedback.submitMessage, isSubmited: isSuppressBox });
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
    handleSubmit() {
        this.handleSubmitAfterPosition();

        if (this.isFormUpdate() || this.state.isSubmitSuccess)
            this.handleFormUpdate_Submit();
        else this.handleFormCreate();
    }
    //20200811 Carlos Go to top
    handleSubmitAfterPosition() {
        console.log("handleSubmitAfterPosition")
        $('html,body').animate({
            scrollTop: $(".container").offset().top
        }, 'slow');
    }
    handleFormCreate() {
        this.setState({ lastSubmittedForm: "PPMI_InputForm" });
        var tmp = serverComuunication.handleServerCommunication_type1('POST', "PPMI", JSON.stringify(this.state.PPMI_InputForm));
        return this.handleStateManagement_General_ServerFeedback(tmp, false).then(e => {
            let returnObj = JSON.parse(e);
            returnObj['isEdited'] = false;
            this.setState({ PPMI_InputForm: returnObj });
            if (this.state.PPMI_item_list.length > 0) {
                let tmp = this.state.PPMI_item_list.filter(x => String(x.RefId).includes("new") && !x.isDeleted);
                tmp.forEach((element) => {
                    element.RefId = 0;
                    element.PpmiRegNo = returnObj.ppmiRegNo;
                });
                serverComuunication.handleServerCommunication_type1('POST', 'PPMI_item_burst_insert', JSON.stringify(tmp));
            }
            this.setState({ PPMI_No: returnObj.ppmiRegNo })
            return returnObj;
        });
    }
    handleFormUpdate_local(ele) {
        this.setState({ [ele.Controller]: ele, isSubmitSuccess: false });
    }
    handleSubmitItems2local(ele) {
        // need to have full order item then add items
        if (this.state.PPMI_InputForm.Date === '' || this.state.PPMI_InputForm.Date === undefined) {
            alert('please input date first');
            return;
        }
        this.setState({ PPMI_item_list: this.state.PPMI_item_list.concat([ele]) });
    }
    handleAfterPart1Valid = () => {
        this.setState({ isPart1Valid: true });
        scrollToReference(this.middleRef);
    }
    async getType2Response(action, ctrl, urlParam) {
        let tmp = serverComuunication.handleServerCommunication_type2(action, ctrl, urlParam);
        this.handleStateManagement_General_ServerFeedback(tmp, true)
            .then((getData) => {
                this.setState({ [urlParam]: JSON.parse(getData) });
            }).catch((response) => {
                console.error("catch in getType2Response :" + ctrl + ":" + urlParam);
                throw response;
            });
    }
    handleFormUpdate_Submit() {
        this.setState({ lastSubmittedForm: 'PPMI' });
        if (this.state.PPMI_InputForm.isEdited) {
            let tmp = serverComuunication.handleServerCommunication_type1('Put', 'PPMI', JSON.stringify(this.state.PPMI_InputForm));
            this.handleStateManagement_General_ServerFeedback(tmp, false);
        }
        if (this.state.PPMI_item_list.length > 0) {
            // using the 3 flags created , we have three handles : 
            // 1) insert new record; 2) put the updated record; 3) delete the record;

            //1) insert new row(s) 
            var newCreateItems = this.state.PPMI_item_list.filter(x => (String(x.RefId).includes("new")) && !x.isDeleted);
            if (newCreateItems.length > 0) {
                newCreateItems.forEach(element => { element.PpmiRegNo = this.state.PPMI_InputForm.PpmiRegNo; element.RefId = 0 });
                let tmp = serverComuunication.handleServerCommunication_type1('POST', 'PPMI_item_burst_insert', JSON.stringify(newCreateItems));
                this.handleStateManagement_General_ServerFeedback(tmp, false);
            }
            // 2) put the updated record;
            var editItems = this.state.PPMI_item_list.filter(x => typeof x.RefId === "number" && x.RefId > 0 && x.isEdited && !x.isDeleted && x.RefId > 0);
            if (editItems.length > 0)
                editItems.forEach((element) => {
                    let tmp = serverComuunication.handleServerCommunication_type1('PUT', 'PPMI_item', JSON.stringify(element));
                    this.handleStateManagement_General_ServerFeedback(tmp, false);
                });
            //  3) delete the record;
            var deleteItems = this.state.PPMI_item_list.filter(x => typeof x.RefId === "number" && x.RefId > 0 && x.isDeleted && x.RefId > 0);
            if (deleteItems.length > 0) {
                deleteItems.forEach((element) => {
                    if (element.RefId !== '' && element.RefId !== 0) {
                        let tmp = serverComuunication.handleServerCommunication_type2('DELETE', 'PPMI_item', element.RefId);
                        this.handleStateManagement_General_ServerFeedback(tmp, false);
                    }
                });
                for (var i = 0; i < this.state.PPMI_item_list.length; i++) {
                    let item = this.state.PPMI_item_list[i];
                    if (item.isDeleted && item.RefId !== '' && item.RefId > 0) {
                        this.state.PPMI_item_list.splice(i, 1); i--;
                    }
                }
            }
            this.setState({ isSubmited: true, submitMessage: "PPMI Save Successfully.", isSubmitSuccess: true });
        }
    }
    // returns a Promise
    async handleFormGetData(ele) {
        let tmp;
        if (ele.Controller === "PPMI_item_list")
            tmp = serverComuunication.handleServerCommunication_type4('GET', ele.Controller, '', { 'PPMINo': this.props.pid })
        else
            tmp = serverComuunication.handleServerCommunication_type2('GET', ele.Controller.replace("_InputForm", ""), this.props.pid)
        return this.handleStateManagement_General_ServerFeedback(tmp, true)
            .then((getData) => this.setState({ [ele.Controller]: JSON.parse(getData), isSubmitSuccess: false, submitMessage: '', isSubmited: false })).catch((response) => {
                this.setState({ isSubmitSuccess: false, submitMessage: 'Error occured:' + response, isSubmited: false });
                throw response;
            });
    }
    resetIsSubmited(c) {
        this.setState({ isSubmited: false });
    }
    isFormUpdate() {
        return String(this.props.pAction).toLowerCase().trim() == 'update';
    }
    getPId() {
        return Number.isInteger(parseInt(this.props.pid)) ? this.props.pid : '0';
    }
    async componentDidMount() {
        // fetch remote data
        if (this.props.pid && this.isFormUpdate())
            this.handleFormGetData({ Controller: "PPMI_item_list" });
        this.getType2Response('GET', 'Common', 'Suppliers');
        this.getType2Response('GET', 'Common', 'Funding');
        this.getType2Response('GET', 'Common', 'SeatNoList');
        if (this.isFormUpdate()) this.setState({ isPart1Valid: true });
    }
    pageEmitter = (action, isNewPage, param1) => {
        let queryString = {};
        var path = "";
        switch (action) {
            case "edit":
                queryString["id"] = this.state.PPMI_No;
                queryString["pageAction"] = param1;
                path = "PPMIPage/Edit";
                break;
            case "create":
                queryString["seatNo"] = this.state.PPMI_InputForm.SeatNo;
                queryString["pageAction"] = param1;
                path = "PPMIPage/Edit";
                break;
            case "show_all": {
                let local_seatNo = '';
                if (this.state.PPMI_InputForm.SeatNo)
                    local_seatNo = this.state.PPMI_InputForm.SeatNo;
                else if (this.props.pSeatNo)
                    local_seatNo = this.props.pSeatNo;
                queryString["SeatNo"] = local_seatNo;
                path = "PPMIPage/Index";
                break;
            }
        }
        if (isNewPage)
            serverComuunication.handleInternalServerPageRedirect_newPage(path, queryString);
        else
            serverComuunication.handleInternalServerPageRedirect(path, queryString);
    }
    ////////////////////////////////////////////  
    //event for the editable table 
    changeContent(itemRowNo, e) {
        let parseType = e.target.step && e.target.step > 0 ? "float" : e.target.type;
        let tmpObj = this.state.PPMI_item_list;
        let idx_ModifyingObj = this.state.PPMI_item_list.findIndex(i => i.RefId == itemRowNo);
        tmpObj[idx_ModifyingObj][e.target.name] = parseValue(parseType, e.target.value);
        tmpObj[idx_ModifyingObj]["isEdited"] = true;
        this.setState({
            data: {
                ...this.state.data, PPMI_item_list: tmpObj
            }
        });
    }
    changeToggleContent(itemRowNo, e) {
        let tmpObj = this.state.PPMI_item_list;
        let idx_ModifyingObj = this.state.PPMI_item_list.findIndex(i => i.RefId == itemRowNo);
        tmpObj[idx_ModifyingObj][e.target.name] = e.target.checked;
        tmpObj[idx_ModifyingObj]["isEdited"] = true;
        this.setState({
            data: {
                ...this.state.data, PPMI_item_list: tmpObj
            }
        });
    }
    //delete handle by calling module; this do not delete from the input object; 
    markDeleteRow(itemRowNo, btn) {
        btn.target.parentNode.parentNode.style.display = 'none';
        btn.preventDefault();
        let tmpObj = this.state.PPMI_item_list;
        let idx_ModifyingObj = this.state.PPMI_item_list.findIndex(i => i.RefId == itemRowNo);
        tmpObj[idx_ModifyingObj]["isDeleted"] = true;
        this.setState({
            data: {
                ...this.state.data, PPMI_item_list: tmpObj
            }
        });
    }
    handle_closeToastBox = () => {
        this.setState({ isSubmited: false });
    }
    //end
    //////////////////////////////////////////// 
    render() {
        return (
            <div className="card card-primary card-outline">
                <div className="card-header">
                    <h3 className="card-title"><i className="fas fa-road"></i>&nbsp;Manipulate PPMI</h3>
                    <div className="form-group row float-right">
                        <button onClick={() => this.pageEmitter("show_all", false, "")} className="btn btn-warning frmBtn"> <i className="fas fa-arrow-left"></i>&nbsp; Back to index</button>&nbsp;
                    </div>
                </div>
                <div className="card-body">
                    <div className="TSectionContainer">
                        <PPMI_InputForm
                            seatNo={this.props.pSeatNo} isFormUpdate={this.isFormUpdate}
                            pid={this.getPId()} fetchedData={this.state.PPMI_InputForm}
                            handleFormUpdate_parent={this.handleFormUpdate_local}
                            resetSubmit={this.resetIsSubmited} getData={this.handleFormGetData}
                            on_click_parent_scroll={this.handleAfterPart1Valid} parent_ref={this.middleRef}
                            SeatNoList={this.state.SeatNoList} Fundings={this.state.Fundings}
                        />
                        <div ref={this.middleRef}> &nbsp;</div>
                        {this.state.isPart1Valid && <div>
                            <hr />
                            <h1 >Manipulate PPMI Items</h1>
                            <PPMI_Items_InputForm
                                handleFormUpdate_parent={this.handleFormUpdate_local}
                                resetSubmit={this.resetIsSubmited} onFormCreate={this.handleSubmitItems2local}
                                on_click_parent_scroll_bottom={scrollToReference} parent_ref_bottom={this.bottomRef}
                                Suppliers={this.state.Suppliers}
                            />
                            <hr />
                            {this.state.PPMI_item_list.length === 0 && <div>No PPMI items data.</div>}
                            {this.state.PPMI_item_list.length > 0 &&
                                <div id="table-wrapper">
                                    <div id="table-scroll">
                                        <PPMIItemsEditTable isEnableDelete={true} on_delete={this.markDeleteRow} on_change={this.changeContent} on_toggle_change={this.changeToggleContent} data={this.state.PPMI_item_list} item_uni_id="RefId" />
                                    </div>
                                </div>}
                            <div>&nbsp;</div>
                            <div className="form-group row" >
                                {!this.state.isSubmitSuccess && <div className="col-lg-2"><button type="button" className="btn btn-block btn-primary" onClick={() => this.handleSubmit()} ><i className="fas fa-save"></i> Submit </button></div>} &nbsp;
                                {this.state.isSubmitSuccess && <div className="col-lg-2"><button type="button" className="btn btn-block btn-success " onClick={(e) => { e.preventDefault(); this.pageEmitter("show_all", false, "") }} ><i className="fas fa-arrow-left"></i> Back</button></div>} &nbsp;
                                <div className="col-lg-2"> <button type="button" className="btn btn-block btn-warning" value="" onClick={() => window.close()} ref={this.bottomRef}  ><i className="fas fa-window-close"></i>Close</button></div>
                            </div>

                            <div className="centralContainerToast" >
                                {this.state.isSubmited &&
                                    <HandleAfterSubmit_toast
                                        origin_form={this.constructor.name} close_handle={this.handle_closeToastBox} submitMessage_header={this.state.isSubmitSuccess ? "Success" : "Fail"}>
                                        <p className="" type="complex_message">{this.state.submitMessage} </p> 
                                        {this.state.isSubmitSuccess && <button on_click={() => this.pageEmitter("show_all", false, "")} className="ContainerToastCloseButton">Back to index</button>}
                                        {!this.state.isSubmitSuccess && <button on_click={() => this.handle_closeToastBox()} className="ContainerToastCloseButton">Close</button>}

                                    </HandleAfterSubmit_toast>
                                }
                            </div>
                            {this.state.isSubmited && <div id="opaque" >&nbsp;</div>}
                        </div>}
                    </div>

                </div>
            </div>
        );
    }
}
ReactDOM.render(<InputContainer pid={qId} pAction={qAction} pSeatNo={qSeatNo} pWorkingForm={qWorkingForm} />, document.getElementById('contentForm'));