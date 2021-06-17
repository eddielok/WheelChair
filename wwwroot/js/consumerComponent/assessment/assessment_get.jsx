import serverComuunication from '/js/shared/serverComuunication.js';
import handleServerFeedback from '/js/shared/handleServerFeedback.js';
import parseValue from '/js/shared/parseValue.js';
import GetCardGrid from '/js/shared/GetCardGridRevamp.jsx';
const WheelchairMeasureEditTable = React.lazy(() => import('/js/displayComponent/assessment/WheelchairMeasureEditTable.jsx'));
const BodyDimensionEditTable = React.lazy(() => import('/js/displayComponent/assessment/BodyDimensionEditTable.jsx'));

class InputContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                'Medical_Information_list': [],
                'Body_Dimension_list': [],
                'Social_Information_list': [],
                'Functional_Skills_list': [],
                'Physical_Examination_list': [],
                'Problem_Objective_list': [],
                'Seating_System_Prescription_list': [],
                'WheelchairDimensions_list': [],
                'Progress_Note_list': []
            },
            isShowWCSaveBtn: false,
            isShowBMSaveBtn: false,
            isSettingData: false,
            isFinalSettingDataReached: false,
            isSubmited: false,
            isSubmitSuccess: false,
            lastSubmittedForm: "",
            submitMessage: ''
        };

        this.editOneCard = this.editOneCard.bind(this);
        this.changeContent = this.changeContent.bind(this);
        this.markDeleteRow = this.markDeleteRow.bind(this);
        this.getClientData = this.getClientData.bind(this);
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
    editOneCard(e, btn) {
        var key = 0;
        var controller = "";
        if (e !== null && btn.target.value) {
            switch (btn.target.value) {
                case "Medical_Information_list": controller = "Medical_Information"; break;
                case "Social_Information_list": controller = "Social_Information"; break;
                case "Functional_Skills_list": controller = "Functional_Skills"; break;
                case "Physical_Examination_list": controller = "Physical_Examination"; break;
                case "Problem_Objective_list": controller = "Problem_Objective_List"; break;
                case "Seating_System_Prescription_list": controller = "Seating_System_Prescription"; break;
                case "WheelchairDimensions_list": controller = "Wheelchair_Dimension"; break;
                case "Progress_Note_list": controller = "Progress_Note"; break;
            }
            key = e;
        } else if (e !== null && typeof e === 'number') {
            controller = "Wheelchair_Dimension";
            key = e;
        }
        var queryString = {
            "id": [key],
            "pageAction": "update",
            "workingForm": [controller]
        };
        serverComuunication.handleInternalServerPageRedirect("Accessment", queryString);
    }
    // returns a Promise
    async handleFormGetData(seatNo, controller) {
        this.setState({ isSettingData: true });
        return serverComuunication.handleServerCommunication_type4('GET', controller, '', { "seat_no": seatNo })
            .then((response) => response.json())
            .then((getData) => {
                this.setState({ data: { ...this.state.data, [controller]: getData } }, () => this.setState({ isSettingData: false }));
            }).catch((response) => {
                console.log(response);
                this.setState({ isSubmitSuccess: false, submitMessage: 'Error occured:' + response, isSubmited: false, isSettingData: false });
                throw response;
            });
    }
    async getClientData() {
        const remotePromisesArr = [];
        Object.keys(this.state.data).forEach(f => remotePromisesArr.push(this.handleFormGetData(this.props.pSeatNo, f)));
        Promise.all(remotePromisesArr)
            .then(() => this.setState({ isFinalSettingDataReached: true }))
            .catch(ex => {
                window.addEventListener("focus", this.getClientData);
                throw ex;
            });
    }
    async componentDidMount() {
        if (this.props.pSeatNo) {
            this.getClientData();
        }
    }
    handlePageAfterLoad() {
        const checkAnyLength = (element) => element.length > 0;
        // redirect to create page
        if (!Object.values(this.state.data).some(checkAnyLength)) {
            var queryString = {
                "seatNo": this.props.pSeatNo,
                "pageAction": "create",
                "workingForm": "Medical_Information"
            };
            serverComuunication.handleInternalServerPageRedirect("Accessment", queryString);
        }
    }
    gotoCreatePage(p) {
        // goto to create page 
        var queryString = {
            "seatNo": this.props.pSeatNo,
            "pageAction": "create"
        };
        if (p) queryString["workingForm"] = p;
        serverComuunication.handleInternalServerPageRedirect("Accessment", queryString);
    }
    ////////////////////////////////////////////  
    gotoPreviousClientInformationPage() {
        var queryString = {};
        if (this.props.pSeatNo)
            queryString = { "seatNo": this.props.pSeatNo, 'pageAction': 'update' };
        else
            queryString = { 'pageAction': 'create' };
        serverComuunication.handleInternalServerPageRedirect(" ClientSearch/clientInformation", queryString);
    }
    getController(tbName) {
        switch (String(tbName).trim()) {
            case "Body_Dimension_list":
                return 'Body_Dimension';
            case "WheelchairDimensions_list":
                return 'Wheelchair_Dimension';
        }
    }
    getWhatActionDone(ed, de) {
        if (ed && de)
            return "edit and delete";
        else if (ed)
            return "edit";
        else if (de)
            return "delete";
        else
            return "";
    }
    //event for the editable table 
    handleSaveEditableTable(tbName) {
        let isContainsEdited = this.state.data[tbName].some(x => x.RefId > 0 && x.isEdited && !x.isDeleted);
        let isContainsDeleted = this.state.data[tbName].some(x => x.RefId > 0 && x.isDeleted);
        let editMsg = this.getWhatActionDone(isContainsEdited, isContainsDeleted);
        if (editMsg === "") {
            window.alert("Nothing to save");
            return;
        }
        let saveMsg = "You performed " + editMsg + ". Are you sure to save?"

        if (confirm(saveMsg)) {
            var ctrller = this.getController(tbName);
            var editItems = this.state.data[tbName].filter(x => x.RefId > 0 && x.isEdited && !x.isDeleted);
            if (editItems.length > 0)
                editItems.forEach((element) => {
                    let tmp = serverComuunication.handleServerCommunication_type1('PUT', ctrller, JSON.stringify(element));
                    this.handleStateManagement_General_ServerFeedback(tmp);
                });
            var deleteItems = this.state.data[tbName].filter(x => x.RefId > 0 && x.isDeleted);
            if (deleteItems.length > 0)
                deleteItems.forEach((element) => {
                    if (element.RefId !== '' && element.RefId !== 0) {
                        let tmp = serverComuunication.handleServerCommunication_type2('DELETE', ctrller, element.RefId);
                        this.handleStateManagement_General_ServerFeedback(tmp);
                    }
                });
            this.handleDisplayBtn(tbName, false);
        }
    }
    handleDisplayBtn = (tbName, val) => {
        switch (String(tbName).trim()) {
            case "Body_Dimension_list":
                this.setState({ isShowBMSaveBtn: val });
                break;
            case "WheelchairDimensions_list":
                this.setState({ isShowWCSaveBtn: val });
                break;
        }
    }
    changeContent(itemRowNo, e, tbName) {
        let parseType = e.target.step && e.target.step > 0 ? "float" : e.target.type;
        let tmpObj = this.state.data[tbName];
        let idx_ModifyingObj = tmpObj.findIndex(i => i.RefId == itemRowNo);
        tmpObj[idx_ModifyingObj][e.target.name] = parseValue(parseType, e.target.value);
        tmpObj[idx_ModifyingObj]["isEdited"] = true;
        this.setState({
            data: {
                ...this.state.data, [tbName]: tmpObj
            }
        });
        this.handleDisplayBtn(tbName, true);
    }
    //delete handle by calling module; this do not delete from the input object;  
    markDeleteRow(itemRowNo, e, tbName) {
        e.target.parentNode.parentNode.style.display = 'none';
        let tmpObj = this.state.data[tbName];
        let idx_ModifyingObj = tmpObj.findIndex(i => i.RefId == itemRowNo);
        tmpObj[idx_ModifyingObj]["isDeleted"] = true;
        this.setState({
            data: {
                ...this.state.data, [tbName]: tmpObj
            }
        });
        this.handleDisplayBtn(tbName, true);
    }
    //end
    ////////////////////////////////////////////
    render() {
        return (
            <div className="formWheelChair">
                <div className="card card-primary card-outline">
                    <div className="card-header">
                        <h3 className="card-title"><i className="fas fa-road"></i>&nbsp;Assessment</h3>
                    </div>
                    <div className="card-body">
                        <div className="form-group row float-right">
                            <button onClick={() => this.gotoPreviousClientInformationPage()} className="btn btn-warning frmBtn"> <i className="fas fa-arrow-left"></i>&nbsp; Back to client information</button>&nbsp;

                        </div>

                        <div className="form-group row">&nbsp;</div>

                        <div className="form-group row">

                            {!this.state.isSettingData && this.state.isFinalSettingDataReached && this.handlePageAfterLoad()}
                            <Tabs defaultActiveKey={this.props.pWorkingForm ? this.props.pWorkingForm : ""} onSelect={(k) => { if (k == "Add_Assessment") this.gotoCreatePage(); }}>

                                <Tab eventKey="Medical_Information" title="Medical Information" id={this.state.data.Medical_Information_list.length > 0 ? "data_avai_item" : "no_data_avai_item"}>
                                    <button onClick={() => this.gotoCreatePage("Medical_Information")} className="btn btn-warning frmBtn"> <i className="fas fa-plus"></i> Create a new record </button >
                                    {this.state.data.Medical_Information_list.length > 0 &&
                                        <GetCardGrid data={this.state.data.Medical_Information_list} a_card_header="SeatNo" hidden_fields="" is_minimal_fields={true} minimal_fields={"SeatNo,Notes,Date"}>
                                            <button handler={this.editOneCard} uni_key="RefId" css_class_name="" value="Medical_Information_list"> Edit </button>
                                        </GetCardGrid>}
                                </Tab>
                                <Tab eventKey="Social_Information" title="Social Information" id={this.state.data.Social_Information_list.length > 0 ? "data_avai_item" : "no_data_avai_item"}>
                                    <button onClick={() => this.gotoCreatePage("Social_Information")} className="btn btn-warning frmBtn"> <i className="fas fa-plus"></i> Create a new record </button >

                                    {this.state.data.Social_Information_list.length > 0 &&
                                        <GetCardGrid data={this.state.data.Social_Information_list} a_card_header="SeatNo" hidden_fields="" is_minimal_fields={true} minimal_fields={"SeatNo,Notes,Date"}>
                                            <button handler={this.editOneCard} uni_key="RefId" css_class_name="" value="Social_Information_list"> Edit </button>
                                        </GetCardGrid>}
                                </Tab>
                                <Tab eventKey="Functional_Skills" title="Functional Skills" id={this.state.data.Functional_Skills_list.length > 0 ? "data_avai_item" : "no_data_avai_item"}>
                                    <button onClick={() => this.gotoCreatePage("Functional_Skills")} className="btn btn-warning frmBtn"> <i className="fas fa-plus"></i> Create a new record </button >
                                    {this.state.data.Functional_Skills_list.length > 0 &&
                                        <GetCardGrid data={this.state.data.Functional_Skills_list} a_card_header="SeatNo" hidden_fields="" is_minimal_fields={true} minimal_fields={"SeatNo,Notes,Date"}>
                                            <button handler={this.editOneCard} uni_key="RefId" css_class_name="" value="Functional_Skills_list"> Edit </button>
                                        </GetCardGrid>}
                                </Tab>
                                <Tab eventKey="Physical_Examination" title="Physical Examination" id={this.state.data.Physical_Examination_list.length > 0 ? "data_avai_item" : "no_data_avai_item"}>
                                    <button onClick={() => this.gotoCreatePage("Physical_Examination")} className="btn btn-warning frmBtn"> <i className="fas fa-plus"></i> Create a new record </button >

                                    {this.state.data.Physical_Examination_list.length > 0 &&
                                        <GetCardGrid data={this.state.data.Physical_Examination_list} a_card_header="SeatNo" hidden_fields="" is_minimal_fields={true} minimal_fields={"SeatNo,Notes,Date"}>
                                            <button handler={this.editOneCard} uni_key="RefId" css_class_name="" value="Physical_Examination_list"> Edit </button>
                                        </GetCardGrid>}
                                </Tab>
                                <Tab eventKey="Problem_Objective_List" title="Problem Objective List" id={this.state.data.Problem_Objective_list.length > 0 ? "data_avai_item" : "no_data_avai_item"}>
                                    <button onClick={() => this.gotoCreatePage("Problem_Objective_List")} className="btn btn-warning frmBtn"> <i className="fas fa-plus"></i> Create a new record </button >
                                    {this.state.data.Problem_Objective_list.length > 0 &&
                                        <GetCardGrid data={this.state.data.Problem_Objective_list} a_card_header="SeatNo" hidden_fields="" is_minimal_fields={true} minimal_fields={"SeatNo,Notes,Date"}>
                                            <button handler={this.editOneCard} uni_key="RefId" css_class_name="" value="Problem_Objective_list"> Edit </button>
                                        </GetCardGrid>}
                                </Tab>
                                <Tab eventKey="Seating_System_Prescription" title="Seating System Prescription" id={this.state.data.Seating_System_Prescription_list.length > 0 ? "data_avai_item" : "no_data_avai_item"}>
                                    <button onClick={() => this.gotoCreatePage("Seating_System_Prescription")} className="btn btn-warning frmBtn"> <i className="fas fa-plus"></i> Create a new record </button >

                                    {this.state.data.Seating_System_Prescription_list.length > 0 &&
                                        <GetCardGrid data={this.state.data.Seating_System_Prescription_list} a_card_header="SeatNo" hidden_fields="" is_minimal_fields={true} minimal_fields={"SeatNo,Notes,Date"}>
                                            <button handler={this.editOneCard} uni_key="RefId" css_class_name="" value="Seating_System_Prescription_list"> Edit </button>
                                        </GetCardGrid>}
                                </Tab>
                                <Tab eventKey="Body_Dimension" title="Body Dimension" id={this.state.data.Body_Dimension_list.length > 0 ? "data_avai_item" : "no_data_avai_item"}>
                                    <button onClick={() => this.gotoCreatePage("Body_Dimension")} className="btn btn-warning frmBtn"> <i className="fas fa-plus"></i> Create a new record </button >

                                    {this.state.isShowBMSaveBtn &&
                                        <Button className="changingActiveBtn" onClick={() => this.handleSaveEditableTable("Body_Dimension_list")} >
                                            <Spinner as="span" animation="grow" aria-hidden="true" className="whiteSpinner" size="sm" role="status" />
                                Pending save
                            </Button>}
                                    {this.state.data.Body_Dimension_list.length > 0 &&
                                        <Suspense fallback={<div>Loading...</div>}>
                                            <BodyDimensionEditTable on_delete={this.markDeleteRow} on_change={this.changeContent} data={this.state.data.Body_Dimension_list} item_uni_id="RefId" />
                                        </Suspense>}
                                </Tab>
                                <Tab eventKey="Wheelchair_Dimension" title="Wheelchair Measurements" id={this.state.data.WheelchairDimensions_list.length > 0 ? "data_avai_item" : "no_data_avai_item"}>
                                    <button onClick={() => this.gotoCreatePage("Wheelchair_Dimension")} className="btn btn-warning frmBtn"> <i className="fas fa-plus"></i> Create a new record </button >
                                    {this.state.isShowWCSaveBtn &&
                                        <Button className="changingActiveBtn" onClick={() => this.handleSaveEditableTable("WheelchairDimensions_list")} >
                                            <Spinner as="span" animation="grow" aria-hidden="true" className="whiteSpinner" size="sm" role="status" />
                                Pending save
                            </Button>}
                                    {this.state.data.WheelchairDimensions_list.length > 0 &&
                                        <Suspense fallback={<div>Loading...</div>}>
                                            <WheelchairMeasureEditTable on_delete={this.markDeleteRow} on_change={this.changeContent} data={this.state.data.WheelchairDimensions_list} item_uni_id="RefId" />
                                        </Suspense>}
                                </Tab>
                                <Tab eventKey="Progress_Note" title="Progress Note" id={this.state.data.Progress_Note_list.length > 0 ? "data_avai_item" : "no_data_avai_item"}>
                                    <button onClick={() => this.gotoCreatePage("Progress_Note")} className="btn btn-warning frmBtn"> <i className="fas fa-plus"></i> Create a new record </button >
                                    {this.state.data.Progress_Note_list.length > 0 &&
                                        <GetCardGrid data={this.state.data.Progress_Note_list} a_card_header="SeatNo" hidden_fields="" is_minimal_fields={true} minimal_fields={"SeatNo,Therapist,Notes,Date"}>
                                            <button handler={this.editOneCard} uni_key="RefId" css_class_name="" value="Progress_Note_list"> Edit </button>
                                        </GetCardGrid>}
                                </Tab>
                                <Tab eventKey="Add_Assessment" title="New assessment record" id="grey_gradientBtn"></Tab>
                            </Tabs>

                        </div>

                    </div>
                </div>

            </div>
        );
    }
}
ReactDOM.render(<InputContainer pAction={qAction} pSeatNo={qSeatNo} pWorkingForm={qWorkingForm} />, document.getElementById('displayContent'));
