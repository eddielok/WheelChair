import GetSelectList from '/js/shared/GetSelectList.jsx';
import getDisplayDate from '/js/shared/getDisplayDate.js';
//20200812 add toast
import HandleAfterSubmit_toast from '/js/shared/HandleAfterSubmit_toast.jsx';

export default class Maintenance_log_inputForm extends React.Component {
    constructor(props) {
        super(props);
        //gen
        this.state = {
            RefId: this.props.pid,
            ItemNo: '',
            SeatNo: '',
            SeatNoList: [],
            Date: '',
            Problems: '',
            MaintenanceProcedures: '',
            CompletionDate: '',
            Staff: ''
        };
        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleFieldChange(e) {
        this.setState({ [e.target.name]: e.target.value }, (d) => { this.props.handleFormUpdate_parent(this.GetState()) });
    }
    handleToggle = ({ target }) => {
        this.setState(s => ({ ...s, [target.name]: !s[target.name] }), (d) => { this.props.handleFormUpdate_parent(this.GetState()) })
    }
    async componentDidMount() {
        if (this.props.isFormUpdate() && this.props.pid)
            this.props.getData({ Controller: this.constructor.name }).then(() => {
                let data = this.props.fetchedData;
                for (let prop in data) {
                    if (String(prop).toLowerCase().includes('date') && data[prop]) {
                        this.setState({ [prop]: getDisplayDate(data[prop]) });
                    }
                    else {
                        if (data[prop])
                            this.setState({ [prop]: data[prop] });
                    }
                }
            }
            );

        if (this.state.SeatNoList.length <= 0) {
            await this.getSeatNoSuggestion();
        }
    }
    async getSeatNoSuggestion() {
        this.props.getDataType2('GET', 'Common', 'SeatNoList')
            .then((getData) => {
                this.setState({ SeatNoList: JSON.parse(getData) });
            }).catch((response) => {
                console.log("catch in getSeatNoSuggestion");
                throw response;
            });
    }
    GetState() {
        return {
            Controller: this.constructor.name,
            RefId: parseInt(this.state.RefId),
            ItemNo: this.state.ItemNo,
            SeatNo: this.state.SeatNo,
            Date: this.state.Date === '' ? null : this.state.Date,
            Problems: this.state.Problems,
            MaintenanceProcedures: this.state.MaintenanceProcedures,
            CompletionDate: this.state.CompletionDate === '' ? null : this.state.CompletionDate,
            Staff: this.state.Staff
        };
    }
    handleSubmit() {
        // update or create
        if (this.props.isFormUpdate()) {
            this.props.onFormModify(this.GetState());
        } else {
            // give a temporary id ; in the call back, call server; update back the fetched created ref_id to state 
            this.props.onFormCreate(this.GetState()).then((serverReturn) => {
                this.setState({ RefId: JSON.parse(serverReturn).refId });
            });
        }
    }
    render() {
        return (
            <div className="container">

                <div className="flexDiv">
                    &nbsp;  <h1>Maintenance log</h1><br />
                </div>

                <form className="Form" onSubmit={this.handleSubmit}>
                    {/* gen */}
                    <div className="row">
                        <div className="col-3">
                            ItemNo:
                                 </div>
                        <div className="col-9 p-1">
                            <input value={this.state.ItemNo} type="text" maxLength="50" onChange={this.handleFieldChange} name="ItemNo" required />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-3">
                            SeatNo:
                                 </div>
                        <div className="col-9 p-1">
                            <input value={this.state.SeatNo} type="hidden" onChange={this.handleFieldChange} name="SeatNo" />
                            {this.state.SeatNoList.length > 0 && <GetSelectList selectedValue={this.state.SeatNo} data={this.state.SeatNoList} name={"SeatNo"} handleFieldChange={this.handleFieldChange} requiredType={"SeatNoList"} displayField={"Name"} valueField={"Name"} />}

                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3">
                            Date:
                                 </div>
                        <div className="col-9 p-1">
                            <input value={this.state.Date} type="date" onChange={this.handleFieldChange} name="Date" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3">
                            Problems:
                                 </div>
                        <div className="col-9 p-1">
                            <textarea name="Problems" form="Form" value={this.state.Problems} onChange={this.handleFieldChange} > </textarea>

                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3">
                            CompletionDate:
                                 </div>
                        <div className="col-9 p-1">
                            <input value={this.state.CompletionDate} type="date" onChange={this.handleFieldChange} name="CompletionDate" />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-3">
                            Staff:
                                 </div>
                        <div className="col-9 p-1">
                            <input value={this.state.Staff} type="text" onChange={this.handleFieldChange} name="Staff" />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-3">
                            Maintenance Procedures :
                                 </div>
                        <div className="col-9 p-1">
                            <textarea name="MaintenanceProcedures" form="Form" value={this.state.MaintenanceProcedures} onChange={this.handleFieldChange} > </textarea>

                        </div>
                    </div>

                    <div className="form-group row" >
                        {!this.props.isSubmitSuccess && <div className="col-lg-2"><button type="button" className="btn btn-block btn-primary" onClick={() => this.handleSubmit()}><i className="fas fa-save"></i> Submit</button></div>}
                        <div className="col-lg-2"> <button type="button" className="btn btn-block btn-warning" value="" onClick={() => window.close()}><i className="fas fa-window-close"></i> Close</button></div>
                    </div>
                    {this.props.isSubmited &&
                        <div className="centralContainerToast" >
                            <HandleAfterSubmit_toast
                                origin_form={this.constructor.name}
                                close_handle={this.props.handle_closeToastBox}
                                submitMessage_header={this.props.isSubmitSuccess ? "Success" : "Fail"}>
                                <p className="" type="complex_message">{this.props.submitMessage} </p>
                                <button on_click={() => this.props.handle_closeToastBox()} className="ContainerToastCloseButton">Close</button>
                            </HandleAfterSubmit_toast>
                        </div>
                    }
                    {this.props.isSubmited && <div id="opaque" >&nbsp;</div>}
                </form>
            </div>
        );
    }
} 