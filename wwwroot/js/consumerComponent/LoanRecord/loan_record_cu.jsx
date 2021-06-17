import handleServerFeedback from '/js/shared/handleServerFeedback.js';
import serverComuunication from '/js/shared/serverComuunication.js';
import Loan_record_inputForm from '/js/formComponent/LoanRecord/loan_record_inputForm.jsx';
import Loaned_Article_InputForm from '/js/formComponent/LoanRecord/Loaned_Article_InputForm.jsx';
import scrollToReference from '/js/shared/scrollToReference.js';
import LoanEditTable from '/js/displayComponent/Loan/LoanEditTable.jsx';
import parseValue from '/js/shared/parseValue.js';
import HandleAfterSubmit_toast from '/js/shared/HandleAfterSubmit_toast.jsx';
import GetDatalist from '/js/shared/GetDatalist.jsx';

class InputContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Loan_record_inputForm: {},
            Loaned_articles_list: [],
            suggestList: ['Returned ', 'Not return ', 'Wrong item', 'Lost by patient ', 'Break '],
            isPart1Valid: false,
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
        this.bottomRef = React.createRef();
        this.middleRef = React.createRef();
        this.changeContent = this.changeContent.bind(this);
        this.markDeleteRow = this.markDeleteRow.bind(this);
        this.handleSubmitItems2local = this.handleSubmitItems2local.bind(this);
        this.handleAfterPart1Valid = this.handleAfterPart1Valid.bind(this);
        this.uniGetData = this.uniGetData.bind(this);
    }
    handleStateManagement_General_ServerFeedback = (serverFeedback, isSuppress) => {
        return handleServerFeedback(serverFeedback).then((massaged_feedback) => {
            let local_isSubmited = isSuppress ? false : true;
            this.setState({ isSubmitSuccess: massaged_feedback.isSubmitSuccess, submitMessage: massaged_feedback.submitMessage, isSubmited: local_isSubmited });
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
    handleFormCreate() {
        var articleList;
        if (this.state.Loaned_articles_list.length > 0)
            articleList = this.state.Loaned_articles_list
                .filter(x => String(x.RefId).includes("new") && !x.isDeleted)
                .map((i, k) => this.submitIntegrateLoan_reducer(i, "add"));
        let inputObj = { "Loan": this.state.Loan_record_inputForm, "LoanedArticles": articleList };
        var tmp = serverComuunication.handleServerCommunication_type5('POST', 'Loaned_integrate_submit', JSON.stringify(inputObj), { "isValidate": true });
        return this.handleStateManagement_General_ServerFeedback(tmp).then(res => {
            this.setState({ submitMessage: this.state.submitMessage + " with loan form number: " + JSON.parse(res).loan.loanFormNo });
            this.setState({ Loan_record_inputForm: { ...this.state.Loan_record_inputForm, LoanFormNo: JSON.parse(res).loan.loanFormNo } });
        });
    }
    handleFormUpdate_local(ele) {
        this.setState({ [ele.Controller]: ele, isSubmitSuccess: false });
    }
    returnAllLoan = () => {
        if (this.state.Loaned_articles_list.length > 0) {
            let tmp = this.state.Loaned_articles_list;
            tmp.forEach(la => la["isDeleted"] = true);
            this.setState({
                Loaned_articles_list: tmp,
                Loan_record_inputForm: { ...this.state.Loan_record_inputForm, WheelchairNo: 'N/A' }
            }, () => {
                this.handleFormUpdate_Submit(true)
            });
        } else {
            this.setState({ Loan_record_inputForm: { ...this.state.Loan_record_inputForm, WheelchairNo: 'N/A' } }, () => this.handleFormUpdate_Submit(true));
        }
    }
    handleFormUpdate_Submit(byPassConfirm) {
        var articleList = [];
        if (this.state.Loaned_articles_list.length > 0) {
            //1) insert new row(s)
            var newCreateItems = this.state.Loaned_articles_list.filter(x => String(x.RefId).includes("new") && !x.isDeleted);
            if (newCreateItems.length > 0)
                newCreateItems.map((i, k) => this.submitIntegrateLoan_reducer(i, "add", this.state.Loan_record_inputForm.LoanFormNo))
                    .forEach(ele => articleList.push(ele));

            // 2) put the updated record;
            var editItems = this.state.Loaned_articles_list.filter(x => typeof x.RefId === "number" && x.RefId > 0 && x.isEdited && !x.isDeleted);
            if (editItems.length > 0)
                editItems.map((i, k) => this.submitIntegrateLoan_reducer(i, "update", this.state.Loan_record_inputForm.LoanFormNo)).forEach(ele => articleList.push(ele));

            //  3) delete the record;
            var deleteItems = this.state.Loaned_articles_list.filter(x => typeof x.RefId === "number" && x.RefId > 0 && x.isDeleted);
            if (deleteItems.length > 0)
                deleteItems.map((i, k) => this.submitIntegrateLoan_reducer(i, "delete", this.state.Loan_record_inputForm.LoanFormNo)).forEach(ele => articleList.push(ele));
        }
        if (this.state.Loan_record_inputForm.ReturnDate && this.state.Loan_record_inputForm.ReturnDate !== '' && !byPassConfirm) {
            if (confirm("Return date entered, return all? if no, clear the return date")) {
                this.state.Loaned_articles_list.map((i, k) => this.submitIntegrateLoan_reducer(i, "delete", this.state.Loan_record_inputForm.LoanFormNo)).forEach(ele => articleList.push(ele));
                this.setState({ Loan_record_inputForm: { ...this.state.Loan_record_inputForm, WheelchairNo: 'N/A' } }, () => this.saveUpdate2Server(articleList));
            }
        } else
            this.saveUpdate2Server(articleList);
    }
    saveUpdate2Server = (articleList) => {
        let inputObj = { "Loan": this.state.Loan_record_inputForm, "LoanedArticles": articleList };
        let tmp = serverComuunication.handleServerCommunication_type5('PUT', 'Loaned_integrate_submit', JSON.stringify(inputObj), { "isValidate": true });
        return this.handleStateManagement_General_ServerFeedback(tmp).then(res => {
            this.setState({ submitMessage: this.state.submitMessage + " with loan form number: " + JSON.parse(res).loan.loanFormNo });
        });
    }
    submitIntegrateLoan_reducer(item, action, loanNo) {
        var local_ArticleAction = "";
        var refID = typeof item.RefId === "number" ? item.RefId : 0;
        switch (action) {
            case "delete":
                local_ArticleAction = 0;
                break;
            case "add":
                local_ArticleAction = 1;
                break;
            case "update":
                local_ArticleAction = 2;
                break;
        }
        return {
            PartNo: item.PartNo, RefId: refID, Remarks: item.Remarks,
            ArticleAction: local_ArticleAction, LoanFormNo: loanNo ? loanNo : ""
        };
    }
    // returns a Promise
    async handleFormGetData(ele) {
        if (ele.Controller === 'Loaned_articles_list') {
            return this.uniGetData('Loaned_articles_list_revamp', 'loan_detail', { param: this.props.pid }).then(
                (res) => {
                    if (res !== '') this.setState({ Loaned_articles_list: res, isSubmitSuccess: false })
                }
            ).catch((response) => {
                this.setState({ isSubmitSuccess: false, submitMessage: 'Error occured:' + response, isSubmited: false });
                throw response;
            });
        }
        else
            return this.uniGetData(ele.Controller, this.props.pid)
                .then((getData) => {
                    this.setState({ Loan_record_inputForm: getData, isSubmitSuccess: false, submitMessage: '', isSubmited: false });
                }).catch((response) => {
                    this.setState({ isSubmitSuccess: false, submitMessage: 'Error occured:' + response, isSubmited: false });
                    throw response;
                });
    }
    isFormUpdate() {
        return String(this.props.pAction).toLowerCase().trim() == 'update';
    }
    getPId() {
        return this.props.pid;
    }
    isRenderForm(formName) {
        return String(this.props.pAction).toLowerCase().trim() == 'create' ||
            (this.isFormUpdate() && Boolean(this.props.pid) &&
                String(this.props.pWorkingForm).toLowerCase().trim() == formName.toLowerCase().trim()
            );
    }
    async uniGetData(controller, payload, queryString) {
        var tmp;
        if (controller && payload && queryString) {
            tmp = serverComuunication.handleServerCommunication_type4('GET', controller, payload, queryString)
        } else if (controller && payload) {
            tmp = serverComuunication.handleServerCommunication_type2('GET', controller, payload)
        } else if (controller) {
            tmp = serverComuunication.handleServerCommunication_type3('GET', controller)
        } else { return; }
        return this.handleStateManagement_General_ServerFeedback(tmp, true)
            .then((response) => {
                if (response !== '')
                    return JSON.parse(response);
                else
                    return response;
            })
            .catch((response) => {
                this.setState({ isSubmitSuccess: false, submitMessage: 'Error occured:' + response, isSubmited: false });
                throw response;
            });
    }
    pageEmitter = (action, isNewPage, param1, param2) => {
        let queryString = {};
        var path = "";
        switch (action) {
            case "PartsInfo":
                queryString["Id"] = param1;
                queryString["pageAction"] = "update";
                queryString["workingForm"] = "Part_Information";
                path = "PartsInformationsPage/index";
                break;
            case "loan_search":
                if (this.state.Loan_record_inputForm == null)
                    queryString["seatNo"] = this.props.pSeatNo;
                else if (this.state.Loan_record_inputForm != null && this.state.Loan_record_inputForm.SeatNo)
                    queryString["seatNo"] = this.state.Loan_record_inputForm.SeatNo;
                else
                    queryString["seatNo"] = '';
                path = "LoanInformationPage/Search";
                break;
            case "loan_index":
                queryString["seatNo"] = this.state.Loan_record_inputForm.SeatNo;
                queryString["id"] = this.state.Loan_record_inputForm.LoanFormNo,
                    queryString["workingForm"] = 'Loan_Record';
                queryString["pageAction"] = param1;
                path = "LoanInformationPage/index";
                break;
            case "WCInfo_index":
                queryString["seatno"] = param1;
                queryString["pageAction"] = "update";
                queryString["workingForm"] = "WheelChair_Information";
                path = "wheelChairInformationPage/index";
                break;
            case "ClientInfo":
                queryString["seatNo"] = param1;
                queryString["pageAction"] = "update";
                path = "ClientSearch/clientInformation";
                break;
            case "PrintLoan":
                queryString["loanNumber"] = param1;
                queryString["language"] = param2;
                path = "LoanInformationPage/PrintaLoan";
                break;
        }
        if (isNewPage)
            serverComuunication.handleInternalServerPageRedirect_newPage(path, queryString);
        else
            serverComuunication.handleInternalServerPageRedirect(path, queryString);
    }
    handleSubmitItems2local(ele) {
        // need to have full order item then add items
        if (this.state.Loan_record_inputForm.SeatNo === '' || this.state.Loan_record_inputForm.SeatNo === undefined) {
            alert('please choose seat number first');
            return;
        }
        this.setState({ Loaned_articles_list: this.state.Loaned_articles_list.concat([ele]), isSubmitSuccess: false });
    }
    handleSubmit() {
        this.handleSubmitAfterPosition();
        if (this.isFormUpdate() || this.state.isSubmitSuccess)
            this.handleFormUpdate_Submit();
        else
            this.handleFormCreate();
    }
    //20200811 Carlos Go to top
    handleSubmitAfterPosition() {
        console.log("handleSubmitAfterPosition")
        $('html,body').animate({
            scrollTop: $(".LoanRecord").offset().top
        }, 'slow');
    }
    ////////////////////////////////////////////
    //event for the editable table 
    changeContent(itemRowNo, e) {
        let parseType = e.target.step && e.target.step > 0 ? "float" : e.target.type;
        let tmpObj = this.state.Loaned_articles_list;
        let idx_ModifyingObj = tmpObj.findIndex(i => i.RefId == itemRowNo);
        tmpObj[idx_ModifyingObj][e.target.name] = parseValue(parseType, e.target.value);
        tmpObj[idx_ModifyingObj]["isEdited"] = true;
        this.setState({
            data: {
                ...this.state.data, Loaned_articles_list: tmpObj
            }
        });
    }
    //delete handle by calling module; this do not delete from the input object; 
    markDeleteRow(itemRowNo, btn) {
        btn.target.parentNode.parentNode.style.display = 'none';
        btn.preventDefault();
        let tmpObj = this.state.Loaned_articles_list;
        let idx_ModifyingObj = tmpObj.findIndex(i => i.RefId == itemRowNo);
        console.log(idx_ModifyingObj)
        tmpObj[idx_ModifyingObj]["isDeleted"] = true;
        this.setState({
            data: {
                ...this.state.data, Loaned_articles_list: tmpObj
            }
        });
    }
    //end
    ////////////////////////////////////////////
    handleAfterPart1Valid() {
        this.setState({ isPart1Valid: true });
        scrollToReference(this.middleRef);
    }
    componentDidMount() {
        if (this.isFormUpdate()) this.setState({ isPart1Valid: true });
    }
    handle_closeToastBox = () => {
        this.setState({ isSubmited: false });
    }
    render() {
        return (
            <div className="LoanRecord">
                <GetDatalist requiredType="loan_remarks_suggest_list" />
                <div className="flexDiv">
                    <div style={{ width: "80%" }}> &nbsp;  <h2>Loan Information</h2></div>
                    <div className="col-lg-2"> <button type="button" className="btn btn-block btn-warning" value="" onClick={() => window.close()}><i className="fas fa-window-close"></i> Close</button></div>
                 </div>
                <hr />
                {this.isRenderForm("Loan_Record") &&
                    <Loan_record_inputForm
                        seatNo={this.props.pSeatNo} isFormUpdate={this.isFormUpdate}
                        pid={this.getPId()} fetchedData={this.state.Loan_record_inputForm}
                        isSubmited={this.state.isSubmited} isSubmitSuccess={this.state.isSubmitSuccess} submitMessage={this.state.submitMessage}
                        handleFormUpdate_parent={this.handleFormUpdate_local}
                        getData={this.handleFormGetData} onFormCreate={this.handleFormCreate} onFormModify={this.handleFormUpdate_Submit}
                        on_click_parent_scroll={this.handleAfterPart1Valid} pageEmitter={this.pageEmitter}
                        uniGetData={this.uniGetData}
                        goReturnAll={this.returnAllLoan}
                    />}
                <hr ref={this.middleRef} />
                {this.state.isPart1Valid && <div>
                    <Loaned_Article_InputForm
                        isFormUpdate={this.isFormUpdate} pid={this.getPId()} handleFormUpdate_parent={this.handleFormUpdate_local}
                        getData={this.handleFormGetData} onFormCreate={this.handleSubmitItems2local} pageEmitter={this.pageEmitter}
                        on_click_parent_scroll_bottom={scrollToReference} parent_ref_bottom={this.bottomRef}
                        uniGetData={this.uniGetData}
                    />
                    <hr />
                    <div className="bottom">
                        {this.state.Loaned_articles_list.length == 0 && <div>No loan articles</div>}
                        {this.state.Loaned_articles_list.length > 0 &&
                            <LoanEditTable isEnableDelete={true} on_delete={this.markDeleteRow} on_change={this.changeContent} item_uni_id="RefId" data={this.state.Loaned_articles_list} suggest_list_name="loan_remarks_suggest_list" suggest_btn_list={this.state.suggestList} />}
                    </div>
                    <hr />
                    <div className="form-group row" >
                        <div className="col-lg-2"><button type="button" className="btn btn-block btn-success " onClick={(e) => { e.preventDefault(); this.pageEmitter("loan_search", false, "") }} ><i className="fas fa-arrow-left"></i> Back</button></div>
                        {!this.state.isSubmitSuccess && <div className="col-lg-2"><button type="button" id="SubmittedButton" className="btn btn-block btn-primary" value="" onClick={() => this.handleSubmit()}><i className="fas fa-save"></i> Submit</button></div>}
                        <div className="col-lg-2"> <button type="button" className="btn btn-block btn-warning" value="" onClick={() => window.close()} ref={this.bottomRef}  ><i className="fas fa-window-close"></i>Close</button></div>
                     </div>

                    <div className="centralContainerToast" >
                        {this.state.isSubmited &&
                            <HandleAfterSubmit_toast
                                origin_form={this.constructor.name} close_handle={this.handle_closeToastBox} submitMessage_header={this.state.isSubmitSuccess ? "Success" : "Fail"}>
                                <p className="" type="complex_message">{this.state.submitMessage} </p>
                                {this.state.isSubmitSuccess && <button on_click={() => this.pageEmitter("loan_index", false, "update")} className="ContainerToastCloseButton">Review this</button>}
                                {!this.state.isSubmitSuccess && <button on_click={() => this.handle_closeToastBox()} className="ContainerToastCloseButton">Close</button>}
                            </HandleAfterSubmit_toast>
                        }
                    </div>
                    {this.state.isSubmited && <div id="opaque" >&nbsp;</div>}
                    <br />
                </div>}
                <div ref={this.bottomRef}> &nbsp; </div>
            </div>
        );
    }
}
ReactDOM.render(<InputContainer pid={qId} pAction={qAction} pSeatNo={qSeatNo} pWorkingForm={qWorkingForm} />, document.getElementById('contentForm'));