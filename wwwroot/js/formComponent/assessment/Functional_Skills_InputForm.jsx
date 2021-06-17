import getDisplayDate from '/js/shared/getDisplayDate.js';
const HandleAfterSubmit_toast = React.lazy(() => import('/js/shared/HandleAfterSubmit_toast.jsx'));
const GetDatalist = React.lazy(() => import('/js/shared/GetDatalist.jsx'));

export default class Functional_Skills_InputForm extends React.Component {
    constructor(props) {
        super(props);
        //gen
        this.state = {
            RefId: this.props.pid,
            SeatNo: this.props.seatNo ? this.props.seatNo : '',
            Date: '',
            Dressing: '',
            Feeding: '',
            FeedingPosition: '',
            FeedingTime: '',
            AspirationFrequency: '',
            VomittingFrequency: '',
            Toiletting: '',
            Bathing: '',
            Splints: false,
            BathCommodeChair: false,
            CommunicationAids: false,
            Switches: false,
            ComputerAids: false,
            EnvironmentalControls: false,
            OtherAtds: '',
            MobilitySkills: '',
            Stand: '',
            StandDuration: '',
            StandFrequency: '',
            Transfer: '',
            WalkingAds: '',
            WalkingFrame: '',
            CurrentSeatHome: '',
            CurrentSeatTransport: '',
            TotalTimeUsed: '',
            UseFrequency: '',
            WeightShift: '',
            SelfPropel: '',
            Surfaces: '',
            Wctransport: '',
            WctransportBy: '',
            AccessibilityProblems: '',
            Notes: '',
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
    //20200811 Carlos Go to top
    handleSubmitAfterPosition() {
        console.log("handleSubmitAfterPosition")
        $('html,body').animate({
            scrollTop: $(".Form").offset().top
        }, 'slow');
    }
    componentDidMount() {
        //handle default create age

        if (this.props.isFormUpdate() && this.props.pid)
            this.props.getData({ Controller: this.constructor.name }).then(
                () => {
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
                    //handle form create age
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
            Dressing: this.state.Dressing,
            Feeding: this.state.Feeding,
            FeedingPosition: this.state.FeedingPosition,
            FeedingTime: parseFloat(this.state.FeedingTime),
            AspirationFrequency: this.state.AspirationFrequency,
            VomittingFrequency: this.state.VomittingFrequency,
            Toiletting: this.state.Toiletting,
            Bathing: this.state.Bathing,
            Splints: this.state.Splints,
            BathCommodeChair: this.state.BathCommodeChair,
            CommunicationAids: this.state.CommunicationAids,
            Switches: this.state.Switches,
            ComputerAids: this.state.ComputerAids,
            EnvironmentalControls: this.state.EnvironmentalControls,
            OtherAtds: this.state.OtherAtds,
            MobilitySkills: this.state.MobilitySkills,
            Stand: this.state.Stand,
            StandDuration: parseFloat(this.state.StandDuration),
            StandFrequency: parseFloat(this.state.StandFrequency),
            Transfer: this.state.Transfer,
            WalkingAds: this.state.WalkingAds,
            WalkingFrame: this.state.WalkingFrame,
            CurrentSeatHome: this.state.CurrentSeatHome,
            CurrentSeatTransport: this.state.CurrentSeatTransport,
            TotalTimeUsed: parseInt(this.state.TotalTimeUsed),
            UseFrequency: this.state.UseFrequency,
            WeightShift: this.state.WeightShift,
            SelfPropel: this.state.SelfPropel,
            Surfaces: this.state.Surfaces,
            Wctransport: this.state.Wctransport,
            WctransportBy: this.state.WctransportBy,
            AccessibilityProblems: this.state.AccessibilityProblems,
            Notes: this.state.Notes
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

                    <Suspense fallback={<div>Loading...</div>}>
                        <GetDatalist requiredType="Functional_Skills_type1" />
                        <GetDatalist requiredType="Functional_Skills_type2" />
                        <GetDatalist requiredType="Functional_Skills_type3" />
                        <GetDatalist requiredType="Functional_Skills_type4" />
                        <GetDatalist requiredType="Functional_Skills_type5" />
                        <GetDatalist requiredType="Functional_Skills_type6" />
                        <GetDatalist requiredType="Functional_Skills_type7" />
                        <GetDatalist requiredType="Functional_Skills_type8" />
                        <GetDatalist requiredType="Functional_Skills_type9" />
                        <GetDatalist requiredType="Functional_Skills_type10" />
                        <GetDatalist requiredType="Functional_Skills_type11" />
                        <GetDatalist requiredType="Functional_Skills_type12" />
                        <GetDatalist requiredType="Functional_Skills_type13" />

                        <GetDatalist requiredType="Functional_Skills_FeedingPosition" />
                        <GetDatalist requiredType="Functional_Skills_AspirationFrequency" />
                        <GetDatalist requiredType="Functional_Skills_OtherATDs" />
                    </Suspense>
                    {/* gen */}
                    <div className="row">
                        <span className="borderedBox">
                            <b>Self Care Skills</b>
                        </span>
                    </div>
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
                            Dressing:
                        </div>
                        <div className="col-9 p-1">
                            <input list="Functional_Skills_type1" value={this.state.Dressing} type="text" maxLength=" 50 " onChange={this.handleFieldChange} name="Dressing" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3">
                            Feeding:
                                 </div>
                        <div className="col-9 p-1">
                            <input list="Functional_Skills_type1" value={this.state.Feeding} type="text" maxLength=" 50 " onChange={this.handleFieldChange} name="Feeding" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-4">
                            &#8594; diet and preferred position:
                        </div>
                        <div className="col-7 p-1">
                            <input className="underLined_long" list="Functional_Skills_FeedingPosition" value={this.state.FeedingPosition} type="text" maxLength=" 255 " onChange={this.handleFieldChange} name="FeedingPosition" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-4">
                            &#8594; time needed to finish average meal:
                        </div>
                        <div className="col-7 p-1">
                            <input className="underLined_short" value={this.state.FeedingTime} type="number" step="0.0001" onChange={this.handleFieldChange} name="FeedingTime" />
                            mins.
                        </div>
                    </div>
                    <div className="row">

                        <div className="col-4">
                            &#8594; frequency of aspiration
                        </div>
                        <div className="col-7 p-1">
                            <input className="underLined_long" list="Functional_Skills_AspirationFrequency" value={this.state.AspirationFrequency} type="text" maxLength=" 50 " onChange={this.handleFieldChange} name="AspirationFrequency" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-4">
                            &#8594; frequency of vomitting
                        </div>
                        <div className="col-7 p-1">
                            <input className="underLined_long" value={this.state.VomittingFrequency} type="text" maxLength=" 50 " onChange={this.handleFieldChange} name="VomittingFrequency" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3">
                            Toiletting:
                        </div>
                        <div className="col-9 p-1">
                            <input list="Functional_Skills_type2" value={this.state.Toiletting} type="text" maxLength=" 50 " onChange={this.handleFieldChange} name="Toiletting" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3">
                            Bathing:
                        </div>
                        <div className="col-9 p-1">
                            <input list="Functional_Skills_type1" value={this.state.Bathing} type="text" maxLength=" 50 " onChange={this.handleFieldChange} name="Bathing" />
                        </div>
                    </div>
                    <div className="row">
                        <span className="borderedBox">
                            <b> Assistive Equipment</b>
                        </span>
                    </div>
                    <div className="row">

                        <div className="col-3 p-1">
                            <label>  &nbsp; splints  &nbsp;
                                <input type="checkbox" onChange={this.handleToggle} checked={this.state.Splints} name="Splints" />
                            </label>
                        </div>
                        <div className="col-3 p-1">
                            <label>  &nbsp; bath / commode chair  &nbsp;
                                <input type="checkbox" onChange={this.handleToggle} checked={this.state.BathCommodeChair} name="BathCommodeChair" />
                            </label>
                        </div>
                        <div className="col-3 p-1">
                            <label>  &nbsp; communication aids  &nbsp;
                                <input type="checkbox" onChange={this.handleToggle} checked={this.state.CommunicationAids} name="CommunicationAids" />
                            </label>
                        </div>
                    </div>

                    <div className="row">

                        <div className="col-3 p-1">
                            <label>  &nbsp; switches  &nbsp;
                                <input type="checkbox" onChange={this.handleToggle} checked={this.state.Switches} name="Switches" />
                            </label>
                        </div>
                        <div className="col-3 p-1">
                            <label>  &nbsp; computer aids  &nbsp;
                                 <input type="checkbox" onChange={this.handleToggle} checked={this.state.ComputerAids} name="ComputerAids" />
                            </label>
                        </div>
                        <div className="col-3 p-1">
                            <label>  &nbsp; environmental controls &nbsp;
                                 <input type="checkbox" onChange={this.handleToggle} checked={this.state.EnvironmentalControls} name="EnvironmentalControls" />
                            </label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3">
                            others:
                        </div>
                        <div className="col-9 p-1">
                            <input className="underLined_xtralong" list="Functional_Skills_OtherATDs" value={this.state.OtherAtds} type="text" maxLength=" 255 " onChange={this.handleFieldChange} name="OtherAtds" />
                        </div>
                    </div>

                    <div className="row">
                        <span className="borderedBox">
                            <b> Functional Mobility Skills</b>
                        </span>
                    </div>
                    <div className="row">
                        <div className="col-3">
                            Mobility Skills:
                                 </div>
                        <div className="col-9 p-1">
                            <input list="Functional_Skills_type3" className="underLined_xtralong" value={this.state.MobilitySkills} type="text" maxLength=" 50 " onChange={this.handleFieldChange} name="MobilitySkills" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3">
                            Stands:
                        </div>
                        <input list="Functional_Skills_type4" value={this.state.Stand} type="text" maxLength=" 50 " onChange={this.handleFieldChange} name="Stand" />
                        &nbsp; for &nbsp;
                             <input className="underLined_short" value={this.state.StandDuration} type="number" step="0.0001" onChange={this.handleFieldChange} name="StandDuration" />
                        &nbsp; mins.&nbsp; , &nbsp;
                              <input value={this.state.StandFrequency} type="number" step="0.0001" onChange={this.handleFieldChange} name="StandFrequency" />
                        &nbsp; day/week
                    </div>
                    <div className="row">
                        <div className="col-3">
                            Transfer:
                        </div>
                        <div className="col-9 p-1">
                            <input list="Functional_Skills_type1" value={this.state.Transfer} type="text" maxLength=" 50 " onChange={this.handleFieldChange} name="Transfer" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3">
                            Walking assistive devices:
                        </div>
                        <div className="col-9 p-1">
                            <input list="Functional_Skills_type5" value={this.state.WalkingAds} type="text" maxLength=" 50 " onChange={this.handleFieldChange} name="WalkingAds" />
                            &nbsp; and/or &nbsp;
                            <input list="Functional_Skills_type6" value={this.state.WalkingFrame} type="text" maxLength=" 50 " onChange={this.handleFieldChange} name="WalkingFrame" />
                        </div>
                    </div>

                    <div className="row">
                        <span className="borderedBox">
                            <b> Mobility Aids/Adaptive Seats</b>
                        </span>
                    </div>

                    <div className="row">
                        <div className="col-3">
                            Current aids / seats for :
                        </div>
                        <div className="col-9 p-1">
                            <input list="Functional_Skills_type7" value={this.state.CurrentSeatHome} type="text" maxLength=" 50 " onChange={this.handleFieldChange} name="CurrentSeatHome" />
                            &nbsp; transport &nbsp;
                            <input list="Functional_Skills_type7" value={this.state.CurrentSeatTransport} type="text" maxLength=" 50 " onChange={this.handleFieldChange} name="CurrentSeatTransport" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3">
                            Total time used:
                        </div>
                        <div className="col-9 p-1">
                            <input value={this.state.TotalTimeUsed} type="number" min="-2147483648" max="2147483647" onChange={this.handleFieldChange} name="TotalTimeUsed" />
                            &nbsp;  hrs./day &nbsp;
                            <input list="Functional_Skills_type9" value={this.state.UseFrequency} type="text" maxLength=" 50 " onChange={this.handleFieldChange} name="UseFrequency" />

                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3">
                            Weight shifts:
                        </div>
                        <div className="col-9 p-1">
                            <input list="Functional_Skills_type8" value={this.state.WeightShift} type="text" maxLength=" 50 " onChange={this.handleFieldChange} name="WeightShift" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3">
                            Self propel:
                        </div>
                        <div className="col-9 p-1">
                            <input list="Functional_Skills_type10" value={this.state.SelfPropel} type="text" maxLength=" 50 " onChange={this.handleFieldChange} name="SelfPropel" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3">
                            Surfaces:
                        </div>
                        <div className="col-9 p-1">
                            <input list="Functional_Skills_type11" value={this.state.Surfaces} type="text" maxLength=" 50 " onChange={this.handleFieldChange} name="Surfaces" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3">
                            Wheelchair is transported:
                        </div>
                        <div className="col-9 p-1">
                            <input list="Functional_Skills_type12" value={this.state.Wctransport} type="text" maxLength=" 50 " onChange={this.handleFieldChange} name="Wctransport" />
                            &nbsp; by &nbsp;
                              <input list="Functional_Skills_type13" className="underLined_long" value={this.state.WctransportBy} type="text" maxLength=" 50 " onChange={this.handleFieldChange} name="WctransportBy" />

                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3">
                            Accessibility problems:
                        </div>
                        <div className="col-9 p-1">
                            <input className="underLined_xtralong" value={this.state.AccessibilityProblems} type="text" maxLength=" 255 " onChange={this.handleFieldChange} name="AccessibilityProblems" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3">
                            Notes:
                                 </div>
                        <div className="col-9 p-1">
                            <textarea name="Notes" form="Form" value={this.state.Notes} onChange={this.handleFieldChange} > </textarea>
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