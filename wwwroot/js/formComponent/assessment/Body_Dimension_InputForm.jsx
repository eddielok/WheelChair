const HandleAfterSubmit_toast = React.lazy(() => import('/js/shared/HandleAfterSubmit_toast.jsx'));
import getDisplayDate from '/js/shared/getDisplayDate.js';

export default class Body_Dimension_InputForm extends React.Component {
    constructor(props) {
        super(props);
        //gen
        this.state = {
            RefId: this.props.pid,
            SeatNo: this.props.seatNo ? this.props.seatNo : '',
            Date: '',
            Height: '',
            Weight: '',
            PelvicWidth: '',
            PelvicWbrace: '',
            ChestWidth: '',
            ChestWbrace: '',
            ShoulderWidth: '',
            HeadWidth: '',
            KneeWidth: '',
            LseatDepth: '',
            RseatDepth: '',
            SeatToOcciput: '',
            SeatToObrace: '',
            SeatToShoulder: '',
            SeatToSbrace: '',
            SeatToAxilla: '',
            SeatToPsis: '',
            BackToAntOfIt: '',
            LlegLength: '',
            RlegLength: '',
            LfootLength: '',
            RfootLength: '',
            resetSubmit_p_func: this.props.resetSubmit
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
    componentDidMount() {
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
    //20200811 Carlos Go to top
    handleSubmitAfterPosition() {
        console.log("handleSubmitAfterPosition")
        $('html,body').animate({
            scrollTop: $(".Form").offset().top
        }, 'slow');
    }
    GetState() {
        return {
            Controller: this.constructor.name,
            RefId: parseInt(this.state.RefId),
            SeatNo: this.state.SeatNo,
            Date: this.state.Date,
            Height: parseFloat(this.state.Height),
            Weight: parseFloat(this.state.Weight),
            PelvicWidth: parseFloat(this.state.PelvicWidth),
            PelvicWbrace: parseFloat(this.state.PelvicWbrace),
            ChestWidth: parseFloat(this.state.ChestWidth),
            ChestWbrace: parseFloat(this.state.ChestWbrace),
            ShoulderWidth: parseFloat(this.state.ShoulderWidth),
            HeadWidth: parseFloat(this.state.HeadWidth),
            KneeWidth: parseFloat(this.state.KneeWidth),
            LseatDepth: parseFloat(this.state.LseatDepth),
            RseatDepth: parseFloat(this.state.RseatDepth),
            SeatToOcciput: parseFloat(this.state.SeatToOcciput),
            SeatToObrace: parseFloat(this.state.SeatToObrace),
            SeatToShoulder: parseFloat(this.state.SeatToShoulder),
            SeatToSbrace: parseFloat(this.state.SeatToSbrace),
            SeatToAxilla: parseFloat(this.state.SeatToAxilla),
            SeatToPsis: parseFloat(this.state.SeatToPsis),
            BackToAntOfIt: parseFloat(this.state.BackToAntOfIt),
            LlegLength: parseFloat(this.state.LlegLength),
            RlegLength: parseFloat(this.state.RlegLength),
            LfootLength: parseFloat(this.state.LfootLength),
            RfootLength: parseFloat(this.state.RfootLength)
        };
    }
    handleSubmit(e) {
        e.preventDefault();
        //20200813 handleSubmitAfterPosition
        this.handleSubmitAfterPosition();
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
                    {/* gen */}
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
                        <div className="col-3">
                            Date:
                                 </div>
                        <div className="col-9 p-1">
                            <input value={this.state.Date} type="date" onChange={this.handleFieldChange} name="Date" required />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3">
                            Height:
                                 </div>
                        <div className="col-9 p-1">
                            <input value={this.state.Height} type="number" step="0.0001" onChange={this.handleFieldChange} name="Height" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3">
                            Weight:
                                 </div>
                        <div className="col-9 p-1">
                            <input value={this.state.Weight} type="number" step="0.0001" onChange={this.handleFieldChange} name="Weight" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3">
                            Pelvic Width:
                                 </div>
                        <div className="col-9 p-1">
                            <input value={this.state.PelvicWidth} type="number" step="0.0001" onChange={this.handleFieldChange} name="PelvicWidth" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3">
                            Pelvic W Brace:
                                 </div>
                        <div className="col-9 p-1">
                            <input value={this.state.PelvicWbrace} type="number" step="0.0001" onChange={this.handleFieldChange} name="PelvicWbrace" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3">
                            Chest Width:
                                 </div>
                        <div className="col-9 p-1">
                            <input value={this.state.ChestWidth} type="number" step="0.0001" onChange={this.handleFieldChange} name="ChestWidth" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3">
                            Chest W Brace:
                                 </div>
                        <div className="col-9 p-1">
                            <input value={this.state.ChestWbrace} type="number" step="0.0001" onChange={this.handleFieldChange} name="ChestWbrace" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3">
                            Shoulder Width:
                                 </div>
                        <div className="col-9 p-1">
                            <input value={this.state.ShoulderWidth} type="number" step="0.0001" onChange={this.handleFieldChange} name="ShoulderWidth" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3">
                            Head Width:
                                 </div>
                        <div className="col-9 p-1">
                            <input value={this.state.HeadWidth} type="number" step="0.0001" onChange={this.handleFieldChange} name="HeadWidth" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3">
                            Knee Width:
                                 </div>
                        <div className="col-9 p-1">
                            <input value={this.state.KneeWidth} type="number" step="0.0001" onChange={this.handleFieldChange} name="KneeWidth" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3">
                            L Seat Depth:
                                 </div>
                        <div className="col-9 p-1">
                            <input value={this.state.LseatDepth} type="number" step="0.0001" onChange={this.handleFieldChange} name="LseatDepth" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3">
                            R Seat Depth:
                                 </div>
                        <div className="col-9 p-1">
                            <input value={this.state.RseatDepth} type="number" step="0.0001" onChange={this.handleFieldChange} name="RseatDepth" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3">
                            Seat to occiput:
                                 </div>
                        <div className="col-9 p-1">
                            <input value={this.state.SeatToOcciput} type="number" step="0.0001" onChange={this.handleFieldChange} name="SeatToOcciput" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3">
                            Seat to oBrace:
                                 </div>
                        <div className="col-9 p-1">
                            <input value={this.state.SeatToObrace} type="number" step="0.0001" onChange={this.handleFieldChange} name="SeatToObrace" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3">
                            Seat to shoulder:
                                 </div>
                        <div className="col-9 p-1">
                            <input value={this.state.SeatToShoulder} type="number" step="0.0001" onChange={this.handleFieldChange} name="SeatToShoulder" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3">
                            Seat to S brace:
                                 </div>
                        <div className="col-9 p-1">
                            <input value={this.state.SeatToSbrace} type="number" step="0.0001" onChange={this.handleFieldChange} name="SeatToSbrace" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3">
                            Seat to axilla:
                                 </div>
                        <div className="col-9 p-1">
                            <input value={this.state.SeatToAxilla} type="number" step="0.0001" onChange={this.handleFieldChange} name="SeatToAxilla" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3">
                            Seat to PSIS:
                                 </div>
                        <div className="col-9 p-1">
                            <input value={this.state.SeatToPsis} type="number" step="0.0001" onChange={this.handleFieldChange} name="SeatToPsis" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3">
                            Back to AntofIT:
                                 </div>
                        <div className="col-9 p-1">
                            <input value={this.state.BackToAntOfIt} type="number" step="0.0001" onChange={this.handleFieldChange} name="BackToAntOfIt" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3">
                            L Leg Length:
                                 </div>
                        <div className="col-9 p-1">
                            <input value={this.state.LlegLength} type="number" step="0.0001" onChange={this.handleFieldChange} name="LlegLength" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3">
                            R Leg Length:
                                 </div>
                        <div className="col-9 p-1">
                            <input value={this.state.RlegLength} type="number" step="0.0001" onChange={this.handleFieldChange} name="RlegLength" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3">
                            L Foot Length:
                                 </div>
                        <div className="col-9 p-1">
                            <input value={this.state.LfootLength} type="number" step="0.0001" onChange={this.handleFieldChange} name="LfootLength" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3">
                            R Foot Length:
                                 </div>
                        <div className="col-9 p-1">
                            <input value={this.state.RfootLength} type="number" step="0.0001" onChange={this.handleFieldChange} name="RfootLength" />
                        </div>
                    </div>

                    <div className="form-group row">

                        {!this.props.isSubmitSuccess && <div className="col-lg-2"><button type="submit" className="btn btn-block btn-primary" value="" ><i className="fas fa-save"></i> Submit</button></div>}
                        <div className="col-lg-2"><button onClick={(e) => { e.preventDefault(); this.props.pageEmitter("Accessment_all", false, this.state.SeatNo, String(this.constructor.name).replace("_InputForm", "")) }} className="btn btn-block btn-warning"><i className="fas fa-arrow-left"></i> Back to index</button></div>

                    </div>

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
                </form>

            </div>
        );
    }
} 