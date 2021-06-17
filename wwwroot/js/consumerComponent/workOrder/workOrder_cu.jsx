import handleServerFeedback from '/js/shared/handleServerFeedback.js';
import serverComuunication from '/js/shared/serverComuunication.js';
import Work_Order_InputForm from '/js/formComponent/Workorder/Work_Order_InputForm.jsx';
import Work_Order_Items_InputForm from '/js/formComponent/Workorder/Work_Order_Items_InputForm.jsx';
import WorkOrderEditTable from '/js/displayComponent/Work_order/WorkOrderEditTable.jsx';
import parseValue from '/js/shared/parseValue.js';
import scrollToReference from '/js/shared/scrollToReference.js';
class InputContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Work_Order_InputForm: {},
            Work_Order_Items: [],
            SeatNoList: [],
            isSubmited: false,
            isSubmitSuccess: false,
            lastSubmittedForm: "",
            displayMode: "0",
            keySeed: 0,
            submitMessage: ''
        };
        this.bottomRef = React.createRef();
        this.handleFormCreate = this.handleFormCreate.bind(this);
        this.handleFormUpdate_Submit = this.handleFormUpdate_Submit.bind(this);
        this.handleFormGetData = this.handleFormGetData.bind(this);
        this.handleFormUpdate_local = this.handleFormUpdate_local.bind(this);
        this.isFormUpdate = this.isFormUpdate.bind(this);
        this.handleSubmitItems2local = this.handleSubmitItems2local.bind(this);
        this.changeContent = this.changeContent.bind(this);
        this.changeToggleContent = this.changeToggleContent.bind(this);
        this.markDeleteRow = this.markDeleteRow.bind(this);
        this.gotoPage = this.gotoPage.bind(this);
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
        location.reload();
        window.removeEventListener("focus", this.onFocus)
    }
    handleFormCreate(ele) {
        // console.log(ele) 
        this.setState({ lastSubmittedForm: ele.Controller });
        var tmp = serverComuunication.handleServerCommunication_type1('POST', ele.Controller.replace("_InputForm", ""), JSON.stringify(this.state[ele.Controller]));
        return this.handleStateManagement_General_ServerFeedback(tmp).then(e => {
            let returnObj = JSON.parse(e);
            if (this.state.Work_Order_Items.length > 0) {
                var tmp = this.state.Work_Order_Items.filter(x => String(x.RefId).includes("new") && !x.isDeleted);
                tmp.forEach((element) => {
                    element.RefId = 0;
                    element.OrderNo = returnObj.orderNo;
                });
                serverComuunication.handleServerCommunication_type1('POST', 'Work_Order_Items_burst_insert', JSON.stringify(tmp));
            }
            return returnObj;
        });
    }
    gotoPage() {
        var queryString = {};
        if (this.state.Work_Order_InputForm.SeatNo)
            queryString = { "seatNo": this.state.Work_Order_InputForm.SeatNo, 'pageAction': 'update' };
        else
            queryString = { 'pageAction': 'create' };
        serverComuunication.handleInternalServerPageRedirect(" workorderpage/Index", queryString);
    }
    handleFormUpdate_local(ele) {
        this.setState({ [ele.Controller]: ele, isSubmitSuccess: false });
    }
    handleSubmitItems2local(ele) {
        // need to have full order item then add items
        if ((this.state.Work_Order_InputForm.OrderDate === '' && this.state.Work_Order_InputForm.SeatNo !== undefined) ||
            (this.state.Work_Order_InputForm.SeatNo === '' && this.state.Work_Order_InputForm.OrderDate !== undefined) ||
            (this.state.Work_Order_InputForm.OrderDate === undefined && this.state.Work_Order_InputForm.SeatNo === undefined)) {
            alert('please input all order information first');
            return;
        }
        this.setState({ Work_Order_Items: this.state.Work_Order_Items.concat([ele]) });
    }
    handleFormUpdate_Submit(ele) {
        this.setState({ lastSubmittedForm: ele.Controller });
        var last_orderNo = ele.OrderNo;

        if (this.state.Work_Order_Items.length > 0) {
            // using the 3 flags created , we have three handles : 
            // 1) insert new record; 2) put the updated record; 3) delete the record;

            //1) insert new row(s)
            var newCreateItems = this.state.Work_Order_Items.filter(x => (String(x.RefId).includes("new")) && !x.isDeleted);
            if (newCreateItems.length > 0) {
                newCreateItems.forEach((element) => { element.OrderNo = last_orderNo; element.RefId = 0; });
                serverComuunication.handleServerCommunication_type1('POST', 'Work_Order_Items_burst_insert', JSON.stringify(newCreateItems));
            }
            // 2) put the updated record;
            var editItems = this.state.Work_Order_Items.filter(x => typeof x.RefId === "number" && x.RefId > 0 && x.isEdited && !x.isDeleted);
            if (editItems.length > 0)
                editItems.forEach((element) =>
                    serverComuunication.handleServerCommunication_type1('PUT', 'Work_Order_Items', JSON.stringify(element)));
            //  3) delete the record;
            var deleteItems = this.state.Work_Order_Items.filter(x => typeof x.RefId === "number" && x.RefId > 0 && x.isDeleted);
            if (deleteItems.length > 0)
                deleteItems.forEach((element) => {
                    if (element.RefId !== '' && element.RefId !== 0)
                        serverComuunication.handleServerCommunication_type2('DELETE', 'Work_Order_Items', element.RefId)
                });
        }
    }
    // returns a Promise
    handleFormGetData(ele) {
        if (ele.Controller === 'Work_Order_InputForm') {
            let tmp = serverComuunication.handleServerCommunication_type2('GET', ele.Controller.replace("_InputForm", ""), this.props.pid);
            return this.handleStateManagement_General_ServerFeedback(tmp).then((getData) => {
                let returnObj = JSON.parse(getData);
                this.setState({ [ele.Controller]: JSON.parse(getData), isSubmitSuccess: false, submitMessage: '', isSubmited: false });
                return returnObj
            });
        }
        else {
            let tmp = serverComuunication.handleServerCommunication_type4('GET', ele.Controller.replace("_InputForm", ""), '', { "OrderNo": this.props.pid });
            return this.handleStateManagement_General_ServerFeedback(tmp).then((getData) => {
                this.setState({ Work_Order_Items: JSON.parse(getData), isSubmitSuccess: false, submitMessage: '', isSubmited: false });
            });
        }
    }
    isFormUpdate() {
        return String(this.props.pAction).toLowerCase().trim() == 'update';
    }
    getPId() {
        return Number.isInteger(parseInt(this.props.pid)) ? this.props.pid : '0';
    }
    updateDisplayMode = (e) => {
        //ensure no duplicate key appears, force update - performance trade-off
        let newSeed = this.state.keySeed + this.state.Work_Order_Items.length + 1;
        this.setState({ [e.target.name]: e.target.value, keySeed: newSeed });
    }
    filterDataList = () => {
        return this.state.Work_Order_Items.filter(i => this.isNeeded(i, this.state.displayMode));
    }
    isNeeded(anItem, mode) {
        switch (mode) {
            case "0":
                return true;
            case "1":
                return anItem.Completed;
            case "2":
                return !anItem.Completed;
        }
    }
    ////////////////////////////////////////////  
    //event for the editable table 
    changeContent(itemRowNo, e) {
        let parseType = e.target.step && e.target.step > 0 ? "float" : e.target.type;
        let tmpObj = this.state.Work_Order_Items;
        let idx_ModifyingObj = this.state.Work_Order_Items.findIndex(i => i.RefId == itemRowNo);
        tmpObj[idx_ModifyingObj][e.target.name] = parseValue(parseType, e.target.value);
        tmpObj[idx_ModifyingObj]["isEdited"] = true;
        this.setState({
            data: {
                ...this.state.data, Work_Order_Items: tmpObj
            }
        });
    }
    changeToggleContent(itemRowNo, e) {
        let tmpObj = this.state.Work_Order_Items;
        let idx_ModifyingObj = this.state.Work_Order_Items.findIndex(i => i.RefId == itemRowNo);
        tmpObj[idx_ModifyingObj][e.target.name] = e.target.checked;
        tmpObj[idx_ModifyingObj]["isEdited"] = true;
        this.setState({
            data: {
                ...this.state.data, Work_Order_Items: tmpObj
            }
        });
    }
    //delete handle by calling module; this do not delete from the input object; 
    markDeleteRow(itemRowNo, btn) {
        btn.target.parentNode.parentNode.style.display = 'none';
        btn.preventDefault();
        let tmpObj = this.state.Work_Order_Items;
        let idx_ModifyingObj = this.state.Work_Order_Items.findIndex(i => i.RefId == itemRowNo);
        tmpObj[idx_ModifyingObj]["isDeleted"] = true;
        this.setState({
            data: {
                ...this.state.data, Work_Order_Items: tmpObj
            }
        });
    }
    async componentDidMount() {
        // fetch remote data 
        this.getType2Response('GET', 'Common', 'SeatNoList');
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
    //end 
    ////////////////////////////////////////////
    render() {
        return (
            <div className="TSectionContainer">
                <div className="card card-primary card-outline">
                    <div className="card-header">
                        <h3 className="card-title"><i className="fas fa-road"></i>&nbsp;Mainipulate work orders</h3>
                        <div className="form-group row float-right">
                            <button onClick={() => this.gotoPage()} className="btn btn-warning frmBtn"> <i className="fas fa-arrow-left"></i>&nbsp; Back to client information</button>&nbsp;
                        </div>

                    </div>
                    <div className="card-body">
                        <div className="form-group row">&nbsp;</div>
                        <div className="upperLeft">
                            <Work_Order_InputForm
                                seatNo={this.props.pSeatNo} isFormUpdate={this.isFormUpdate}
                                pid={this.getPId()}
                                handleFormUpdate_parent={this.handleFormUpdate_local}
                                getData={this.handleFormGetData} onFormCreate={this.handleFormCreate} onFormModify={this.handleFormUpdate_Submit}
                                gotoPage={this.gotoPage} SeatNoList={this.state.SeatNoList}
                            />
                        </div>
                        <div className="upperRight">
                            <Work_Order_Items_InputForm
                                isFormUpdate={this.isFormUpdate} pid={this.getPId()}
                                handleFormUpdate_parent={this.handleFormUpdate_local}
                                getData={this.handleFormGetData} onFormCreate={this.handleSubmitItems2local}
                                on_click_parent_scroll_bottom={scrollToReference} parent_ref_bottom={this.bottomRef}
                            />
                        </div>
                        <div className="bottom">
                            <div>
                                Filter work order items : &nbsp;
                         <label>
                                    <input type="radio" id="show_all" value="0" name="displayMode" onChange={this.updateDisplayMode} />
                            &nbsp; Show all  &nbsp;
                        </label>&nbsp;
                        <label>
                                    <input type="radio" id="show_completed" value="1" name="displayMode" onChange={this.updateDisplayMode} />
                           &nbsp; Show completed only &nbsp;
                        </label>&nbsp;
                        <label>
                                    <input type="radio" id="show_incomplete" value="2" name="displayMode" onChange={this.updateDisplayMode} />
                            &nbsp; Show incomplete only &nbsp;
                        </label>
                            </div>
                            {this.state.Work_Order_Items.length == 0 && <div>No work items..</div>}

                            {this.state.Work_Order_Items.length > 0 &&
                                <div id="table-wrapper">
                                    <div id="table-scroll">
                                    <WorkOrderEditTable isEnableDelete={true} on_delete={this.markDeleteRow} on_change={this.changeContent} on_toggle_change={this.changeToggleContent} data={this.filterDataList()} key_seed={this.state.keySeed} item_uni_id="RefId" /> </div> </div>}
                        </div>
                        <div ref={this.bottomRef}> &nbsp; </div>
                    </div>
                </div>



            </div>

        );
    }
}
ReactDOM.render(<InputContainer pid={qId} pSeatNo={qSeatNo} pAction={qAction} pWorkingForm={qWorkingForm} />, document.getElementById('contentForm'));