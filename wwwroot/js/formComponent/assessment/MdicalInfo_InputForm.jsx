import getDisplayDate from '/js/shared/getDisplayDate.js';
const HandleAfterSubmit_toast = React.lazy(() => import('/js/shared/HandleAfterSubmit_toast.jsx'));
const GetDatalist = React.lazy(() => import('/js/shared/GetDatalist.jsx'));

export default class Medical_Information_InputForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            RefId: this.props.pid,
            SeatNo: this.props.seatNo ? this.props.seatNo : '',
            Date: '',
            medi_age: '',
            PendingSurgery: '',
            SurgeryInfo: '',
            Seizures: '',
            PressureSores: '',
            ExistingSores: '',
            PainDiscomfort: '',
            Sensation: '',
            Hearing: '',
            Vision: '',
            RespiratoryStatus: '',
            Notes: ''
        };
        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleFieldChange(e) {
        this.setState({ [e.target.name]: e.target.value }, (d) => { this.props.handleFormUpdate_parent(this.GetState()) });
        this.props.resetSubmit(this.constructor.name);
    }
    handleToggle = ({ target }) => {
        this.setState(s => ({ ...s, [target.name]: !s[target.name] }), (d) => { this.props.handleFormUpdate_parent(this.GetState()) })
    }
    async componentDidMount() {
        if (this.props.isFormUpdate() && this.props.pid)
            this.props.getData({ Controller: this.constructor.name }).then(
                () => {
                    let data = this.props.fetchedData;
                    for (let prop in data) {
                        if (prop == 'Date' && data[prop]) {
                            this.setState({ [prop]: getDisplayDate(data[prop]) });
                        }
                        else {
                            if (data[prop])
                                this.setState({ [prop]: data[prop] });
                        }
                    }
                    if (data['SeatNo'])
                        this.props.getFormAge(data['SeatNo'], data['Date']);
                }
            ); 
    }
    GetState() {
        return {
            Controller: this.constructor.name,
            RefId: parseInt(this.state.RefId),
            SeatNo: this.state.SeatNo,
            Date: this.state.Date,
            PendingSurgery: this.state.PendingSurgery,
            SurgeryInfo: this.state.SurgeryInfo,
            Seizures: this.state.Seizures,
            PressureSores: this.state.PressureSores,
            ExistingSores: this.state.ExistingSores,
            PainDiscomfort: this.state.PainDiscomfort,
            Sensation: this.state.Sensation,
            Hearing: this.state.Hearing,
            Vision: this.state.Vision,
            RespiratoryStatus: this.state.RespiratoryStatus,
            Notes: this.state.Notes === '' ? null : this.state.Notes
        };
    }
    handleSubmit(e) {
        e.preventDefault();
        // update or create
        if (this.props.isFormUpdate()) {
            this.props.onFormModify(this.GetState());
        } else {
            this.props.onFormCreate(this.GetState()).then((serverReturn) => this.setState({ RefId: JSON.parse(serverReturn).refId }));
        }
    }
    render() {
        return (
            <div className="container">
                <form className="Form" onSubmit={this.handleSubmit}>
                    <Suspense fallback={<div>Loading...</div>}>
                        <GetDatalist requiredType="none" />
                        <GetDatalist requiredType="Medical_Information_type1" />
                        <GetDatalist requiredType="Medical_Information_type2" />
                        <GetDatalist requiredType="Medical_Information_type3" />
                    </Suspense>

                    <div className="row">
                        <div className="col-3 p-2">
                            Age / Seat_No:
						</div>
                        <div className="col-1 p-2">
                            <input className="box_short" value={this.props.age} type="number" name="age" disabled />
                        </div>
                        <div className="col-8 p-2">
                            <input value={this.state.SeatNo} type="text" maxLength=" 50 " onChange={this.handleFieldChange} disabled={this.props.isFormUpdate()} name="SeatNo" required />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3 p-2">
                            Date:
						</div>
                        <div className="col-9 p-2">
                            <input value={this.state.Date} type="date" onChange={this.handleFieldChange} name="Date" required />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3 p-1">
                            &nbsp;
						</div>
                        <div className="col-3 p-1">
                            History of:
                        </div>
                        <div className="col-3 p-1">
                            &nbsp;
						</div>
                        <div className="col-3 p-1">
                            &nbsp;
						</div>
                    </div>
                    <div className="row">
                        <div className="col-sm-3 p-1">
                            Surgical Info:
						</div>
                        <div className="col-sm-3 p-1">
                            <input type="text" list="none" name="SurgeryInfo" value={this.state.SurgeryInfo} onChange={this.handleFieldChange} />

                        </div>
                        <div className="col-sm-3 p-1">
                            Pending Surgical Info:
						</div>
                        <div className="col-sm-3 p-1">
                            <input type="text" name="PendingSurgery" value={this.state.PendingSurgery} onChange={this.handleFieldChange} />

                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-3 p-1">
                            Seizures:
						</div>
                        <div className="col-sm-3 p-1">
                            <input type="text" list="none" name="Seizures" value={this.state.Seizures} onChange={this.handleFieldChange} />
                        </div>
                        <div className="col-sm-3 p-1">
                            &nbsp;
						</div>
                        <div className="col-sm-3 p-1">
                            &nbsp;
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-sm-3 p-1">
                            Pressure Sores:
                        </div>
                        <div className="col-sm-3 p-1">
                            <input type="text" list="none" name="PressureSores" value={this.state.PressureSores} onChange={this.handleFieldChange} />
                        </div>
                        <div className="col-sm-3 p-1">
                            Existing Pressure Sores:
                        </div>
                        <div className="col-sm-3 p-1">
                            <input type="text" name="ExistingSores" value={this.state.ExistingSores} onChange={this.handleFieldChange} />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-3 p-1">
                            Pain / Discomfort:
                        </div>
                        <div className="col-9 p-1">
                            <input className="xtralongBox" type="text" list="Medical_Information_type4" name="PainDiscomfort" value={this.state.PainDiscomfort} onChange={this.handleFieldChange} />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-3 p-1">
                            Sensation:
                        </div>
                        <div className="col-9 p-1">
                            <input className="xtralongBox" type="text" list="Medical_Information_type1" name="Sensation" value={this.state.Sensation} onChange={this.handleFieldChange} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3 p-1">
                            Hearing:
                        </div>
                        <div className="col-9 p-1">
                            <input className="xtralongBox" type="text" list="Medical_Information_type2" name="Hearing" value={this.state.Hearing} onChange={this.handleFieldChange} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3 p-1">
                            Vision:
                        </div>
                        <div className="col-9 p-1">
                            <input className="xtralongBox" type="text" list="Medical_Information_type2" name="Vision" value={this.state.Vision} onChange={this.handleFieldChange} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3 p-1">
                            Respiratory Status:
	                        </div>
                        <div className="col-9 p-1">
                            <input className="xtralongBox" type="text" list="Medical_Information_type3" name="RespiratoryStatus" value={this.state.RespiratoryStatus} onChange={this.handleFieldChange} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3 p-1">
                            Notes:
                        </div>
                        <div className="col-9 p-1">
                            <textarea name="Notes" form="Form" value={this.state.Notes} onChange={this.handleFieldChange} ></textarea>
                        </div>
                    </div>
                   
                    <div className="form-group row">

                        {!this.props.isSubmitSuccess && <div className="col-lg-2"><button type="submit" className="btn btn-block btn-primary" value="" ><i className="fas fa-save"></i> Submit</button></div>}
                        <div className="col-lg-2"><button onClick={(e) => { e.preventDefault(); this.props.pageEmitter("Accessment_all", false, this.state.SeatNo, String(this.constructor.name).replace("_InputForm", "")) }} className="btn btn-block btn-warning"><i className="fas fa-arrow-left"></i> Back to index</button></div>

                    </div>

                </form>
                {this.props.isSubmited && <div>
                    <div className="centralContainerToast" >
                        <Suspense fallback={<div>Loading...</div>}>
                            <HandleAfterSubmit_toast
                                origin_form={this.constructor.name} close_handle={this.props.handle_closeToastBox} submitMessage_header={this.props.isSubmitSuccess ? "Success" : "Fail"}>
                                <p className="" type="complex_message">{this.props.submitMessage} </p>
                                {this.props.isSubmitSuccess && <button on_click={() => this.props.pageEmitter("Accessment_index", false, this.state.SeatNo, String(this.constructor.name).replace("_InputForm", ""), "update", this.state.RefId)} className="ContainerToastCloseHalfButton">View</button>}

                                {this.props.isSubmitSuccess && <button on_click={() => this.props.pageEmitter("Accessment_all", false, this.state.SeatNo, String(this.constructor.name).replace("_InputForm", ""))} className="ContainerToastCloseHalfButton">Go to index</button>}
                            </HandleAfterSubmit_toast>
                        </Suspense>
                    </div>
                    <div id="opaque" style={this.props.isSubmited ? { display: "block" } : { display: "none" }}></div>
                </div>
                }
                <br />
            </div>
        );
    }
}