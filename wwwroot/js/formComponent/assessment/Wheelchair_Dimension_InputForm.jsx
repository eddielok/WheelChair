const HandleAfterSubmit_toast = React.lazy(() => import('/js/shared/HandleAfterSubmit_toast.jsx'));
import getDisplayDate from '/js/shared/getDisplayDate.js'; 

//Wheelchair_Measurement = wheelchair_Dimension

export default class Wheelchair_Dimension_InputForm extends React.Component {
    constructor(props) {
        super(props);
        //gen
        this.state = {
            RefId:  this.props.pid  ,
            SeatNo: this.props.seatNo ? this.props.seatNo : '',
            Date: '',
            PandaSize: '',
            BackHeight: '',
            WcseatWidth: '',
            WclseatDepth: '',
            WcrseatDepth: '',
            WcseatHeight: '',
            SeatToBackAngle: '',
            SystemTiltAngle: '',
            LlateralSupportHeight: '',
            RlateralSupportHeight: '',
            LarmrestHeight: '',
            RarmrestHeight: '',
            LseatToLegrestAngle: '',
            RseatToLegrestAngle: '',
            LlegrestFootrestAngle: '',
            RlegrestFootrestAngle: '',
            LlegrestLength: '',
            RlegrestLength: '',
            DropRaiseSeatHeight: '', 
            resetSubmit_p_func: this.props.resetSubmit
        };
        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this); 
    }
    handleFieldChange(e) {
        this.setState({ [e.target.name]: e.target.value }, (d) => { this.props.handleFormUpdate_parent(this.GetState()) });
        this.props.resetSubmit(this.constructor.name);
    }
    //20200811 Carlos Go to top
    handleSubmitAfterPosition() {
        console.log("handleSubmitAfterPosition")
        $('html,body').animate({
            scrollTop: $(".Form").offset().top
        }, 'slow');
    }
    handleToggle = ({ target }) => {
        this.setState(s => ({ ...s, [target.name]: !s[target.name] }), (d) => { this.props.handleFormUpdate_parent(this.GetState()) })
    }
    componentDidMount(){ 
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
            PandaSize: parseFloat(this.state.PandaSize),
            BackHeight: parseFloat(this.state.BackHeight),
            WcseatWidth: parseFloat(this.state.WcseatWidth),
            WclseatDepth: parseFloat(this.state.WclseatDepth),
            WcrseatDepth: parseFloat(this.state.WcrseatDepth),
            WcseatHeight: parseFloat(this.state.WcseatHeight),
            SeatToBackAngle: parseFloat(this.state.SeatToBackAngle),
            SystemTiltAngle: parseFloat(this.state.SystemTiltAngle),
            LlateralSupportHeight: parseInt(this.state.LlateralSupportHeight),
            RlateralSupportHeight: parseFloat(this.state.RlateralSupportHeight),
            LarmrestHeight: parseFloat(this.state.LarmrestHeight),
            RarmrestHeight: parseFloat(this.state.RarmrestHeight),
            LseatToLegrestAngle: parseFloat(this.state.LseatToLegrestAngle),
            RseatToLegrestAngle: parseFloat(this.state.RseatToLegrestAngle),
            LlegrestFootrestAngle: parseFloat(this.state.LlegrestFootrestAngle),
            RlegrestFootrestAngle: parseFloat(this.state.RlegrestFootrestAngle),
            LlegrestLength: parseFloat(this.state.LlegrestLength),
            RlegrestLength: parseFloat(this.state.RlegrestLength),
            DropRaiseSeatHeight: parseFloat(this.state.DropRaiseSeatHeight)
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
                        <div className="col-2 ">
                            Age / Seat_No:
                                 </div>
                        <div className="col-1">
                            <input className="box_short" value={this.props.age} type="number" name="age" disabled />
                        </div>
                        <div className="col-8">
                            <input value={this.state.SeatNo} type="text" maxLength=" 50 " onChange={this.handleFieldChange} disabled={this.props.isFormUpdate()} name="SeatNo" required />
                        </div>
                    </div>

                    <div className="row">&nbsp;</div>

                    <div className="row">
                        <div className="col-2">
                            Date:
                                 </div>
                        <div className="col-10">
                            <input value={this.state.Date} type="date" onChange={this.handleFieldChange} name="Date" required/>
                        </div>
                    </div>

                    <div className="row"> <div className="col-12"> <u>Measurements</u>   </div> </div>

                    <div className="row">
                        <div className="col-2">
                            Panda Size:
                                 </div>
                        <div className="col-2">
                            <input value={this.state.PandaSize} type="number" step="0.0001" onChange={this.handleFieldChange} name="PandaSize" style={{ width: '100%' }}/>
                        </div>

                        <div className="col-2">
                            Back Height:
                                 </div>
                        <div className="col-2">
                            <input value={this.state.BackHeight} type="number" step="0.0001" onChange={this.handleFieldChange} name="BackHeight" style={{ width: '100%' }}/>
                        </div>

                        <div className="col-2">
                            Seat Width:
                                 </div>
                        <div className="col-2">
                            <input value={this.state.WcseatWidth} type="number" step="0.0001" onChange={this.handleFieldChange} name="WcseatWidth" style={{ width: '100%' }} />
                        </div>

                    </div>
                    <div className="row">&nbsp;</div>

                    <div className="row">
                        <div className="col-2">
                            Seat Depth:
                                 </div>
                        <div className="col-2">
                            <input value={this.state.WclseatDepth} type="number" step="0.0001" onChange={this.handleFieldChange} name="WclseatDepth" style={{ width: '100%' }}/>
                        </div>

                        <div className="col-2">
                            Seat Height:
                                 </div>
                        <div className="col-2">
                            <input value={this.state.WcseatHeight} type="number" step="0.0001" onChange={this.handleFieldChange} name="WcseatHeight" style={{ width: '100%' }}/>
                        </div>

                        <div className="col-2">
                            Seat To Back Angle:
                                 </div>
                        <div className="col-2">
                            <input value={this.state.SeatToBackAngle} type="number" step="0.0001" onChange={this.handleFieldChange} name="SeatToBackAngle" style={{ width: '100%' }} />
                        </div>
                    </div>

                    <div className="row">&nbsp;</div>

                    <div className="row">

                        <div className="col-2">
                            System Tilt Angle:
                                 </div>
                        <div className="col-2">
                            <input value={this.state.SystemTiltAngle} type="number" step="0.0001" onChange={this.handleFieldChange} name="SystemTiltAngle" style={{ width: '100%' }}/>
                        </div>

                        <div className="col-2">
                            Lateral Support Height:
                                 </div>
                        <div className="col-2">
                            <input value={this.state.LlateralSupportHeight} type="number" min="-2147483648" max="2147483647" onChange={this.handleFieldChange} name="LlateralSupportHeight" style={{ width: '50%' }}/>
                            <input value={this.state.RlateralSupportHeight} type="number" min="-2147483648" max="2147483647" onChange={this.handleFieldChange} name="RlateralSupportHeight" style={{ width: '50%' }}/>
                        </div>

                        <div className="col-2">
                            Armrest Height:
                                 </div>
                        <div className="col-2">
                            <input value={this.state.LarmrestHeight} type="number" step="0.0001" onChange={this.handleFieldChange} name="LarmrestHeight" style={{ width: '50%' }} />
                            <input value={this.state.RarmrestHeight} type="number" step="0.0001" onChange={this.handleFieldChange} name="RarmrestHeight" style={{ width: '50%' }} />

                        </div>


                    </div>

                    <div className="row">&nbsp;</div>
                    <div className="row">
                       

                        <div className="col-2">
                            Seat To Legrest Angle:
                                 </div>
                        <div className="col-2">
                            <input value={this.state.LseatToLegrestAngle} type="number" step="0.0001" onChange={this.handleFieldChange} name="LseatToLegrestAngle" style={{ width: '50%' }}/>
                            <input value={this.state.RseatToLegrestAngle} type="number" step="0.0001" onChange={this.handleFieldChange} name="RseatToLegrestAngle" style={{ width: '50%' }} />
                        </div>

                        <div className="col-2">
                            Legrest to Footrest Angle:
                                 </div>
                        <div className="col-2">
                            <input value={this.state.LlegrestFootrestAngle} type="number" step="0.0001" onChange={this.handleFieldChange} name="LlegrestFootrestAngle" style={{ width: '50%' }}/> 
                            <input value={this.state.RlegrestFootrestAngle} type="number" step="0.0001" onChange={this.handleFieldChange} name="RlegrestFootrestAngle" style={{ width: '50%' }}/>
                        </div>

                        <div className="col-2">
                            Legrest Length:
                                 </div>
                        <div className="col-2">
                            <input value={this.state.LlegrestLength} type="number" step="0.0001" onChange={this.handleFieldChange} name="LlegrestLength" style={{ width: '50%' }} />
                            <input value={this.state.RlegrestLength} type="number" step="0.0001" onChange={this.handleFieldChange} name="RlegrestLength" style={{ width: '50%' }} />

                        </div>
                    </div>

                    <div className="row">&nbsp;</div>
                    <div className="row">
                      

                        <div className="col-2">
                            Drop/Raise Seat Height:
                                 </div>
                        <div className="col-2">
                            <input value={this.state.DropRaiseSeatHeight} type="number" step="0.0001" onChange={this.handleFieldChange} name="DropRaiseSeatHeight" style={{ width: '100%' }}/>
                        </div>

                    </div>

                    <div className="row">&nbsp;</div>

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