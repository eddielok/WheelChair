import handleServerFeedback from '/js/shared/handleServerFeedback.js';
import serverComuunication from '/js/shared/serverComuunication.js';
import ReactTable from '/js/shared/ReactTableRevamp.jsx';

class InputContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            'ppmi_list': [],
            filterStrA: "",
            selectedField: "",
            isSettingData: false,
            isFinalSettingDataReached: false,
            isSubmited: false,
            isSubmitSuccess: false,
            lastSubmittedForm: "",
            submitMessage: ''
        };

        this.editOneCard = this.editOneCard.bind(this);
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
        this.componentDidMount();
        window.removeEventListener("focus", this.onFocus)
    }
    gotoCreatePage() {
        var queryString = { "seatNo": this.props.pSeatNo, 'pageAction': 'create' };
        serverComuunication.handleInternalServerPageRedirect("PPMIPage/Edit", queryString);
    }
    editOneCard(e) {
        var queryString = {
            "id": [e],
            "pageAction": "update"
        };
        serverComuunication.handleInternalServerPageRedirect("PPMIPage/edit", queryString);
    }
    // returns a Promise
    async handleFormGetData(seatNo, controller) {
        let tmp = serverComuunication.handleServerCommunication_type4('GET', controller, '', { "seat_no": seatNo })
        this.handleStateManagement_General_ServerFeedback(tmp)
            .then((getData) => {
                this.setState({ isSubmitSuccess: true, submitMessage: '', isSubmited: true, ppmi_list: JSON.parse(getData) });
            }).catch((response) => {
                this.setState({ isSubmitSuccess: false, submitMessage: 'Error occured:' + response, isSubmited: false });
                throw response;
            });
    }
    async componentDidMount() {
        if (this.props.pSeatNo)
            await this.handleFormGetData(this.props.pSeatNo, "PPMI_list");
        else
            await this.handleFormGetData(this.props.pSeatNo, "PPMI");
    }
    handleSubmitItems2local(ele) {
        // need to have full order item then add items
        if ((this.state.Work_Order_InputForm.OrderDate === '' && this.state.Work_Order_InputForm.SeatNo !== undefined) ||
            (this.state.Work_Order_InputForm.SeatNo === '' && this.state.Work_Order_InputForm.OrderDate !== undefined) ||
            (this.state.Work_Order_InputForm.OrderDate === undefined && this.state.Work_Order_InputForm.SeatNo === undefined)) {
            alert('please input all order information first');
            return;
        }
        this.setState({ Work_Order_Items: this.state.Work_Order_Items.concat([ele]) }, () => console.log(this.state.Work_Order_Items));
    }
    gotoPage() {
        var queryString = {};
        if (this.props.pSeatNo)
            queryString = { "seatNo": this.props.pSeatNo, 'pageAction': 'update' };
        else
            queryString = { 'pageAction': 'create' };
        serverComuunication.handleInternalServerPageRedirect(" ClientSearch/clientInformation", queryString);
    }
    render() {
        return (
            <div className="formWheelChair">
                <div className="card card-primary card-outline">
                    <div className="card-header">
                        <h3 className="card-title"><i className="fas fa-road"></i>&nbsp;PPMI</h3>
                        <div className="form-group row float-right">
                            <button onClick={() => this.gotoPage()} className="btn btn-warning frmBtn"> <i className="fas fa-arrow-left"></i>&nbsp; Back to client information</button>&nbsp;
                            <button onClick={() => this.gotoCreatePage()} className="btn btn-primary frmBtn"> <i className="fas fa-plus"></i>&nbsp; Create New PPMI</button>
                        </div>
                    </div>
                    <div className="card-body">

                        <div className="form-group row">
                            &nbsp;
                        </div>

                        <div className="form-group row">
                            {this.state.isSubmitSuccess && this.state.isSubmited && this.state.ppmi_list.length == 0 && <div className="col-lg-12">
                                <label className="col-lg-12 col-form-label"> No PPMI records found </label></div>}
                        </div>

                        <div id="table-wrapper">
                            <div id="table-scroll">
                                {this.state.ppmi_list.length > 0 && <ReactTable headerList={Object.keys(this.state.ppmi_list[0])} data={this.state.ppmi_list} hiddenFields={"PpmiRegNo"} filterStr={this.state.filterStrA} selectedField={this.state.selectedField}>
                                    <button handler={this.editOneCard} uni_key="PpmiRegNo" css_class_name="btn btn-secondary"> <i className="far fa-edit"></i> </button>
                                </ReactTable>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
ReactDOM.render(<InputContainer pAction={qAction} pSeatNo={qSeatNo} pWorkingForm={qWorkingForm} />, document.getElementById('contentForm'));