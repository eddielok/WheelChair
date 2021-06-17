const HandleAfterSubmit_toast = React.lazy(() => import('/js/shared/HandleAfterSubmit_toast.jsx'));
const GetDatalist = React.lazy(() => import('/js/shared/GetDatalist.jsx'));
import getDisplayDate from '/js/shared/getDisplayDate.js';


export default class Physical_Examination_InputForm extends React.Component {
    constructor(props) {
        super(props);
        //gen
        this.state = {
            RefId: this.props.pid,
            SeatNo: this.props.seatNo ? this.props.seatNo : '',
            Date: '',
            SkinCondition: '',
            PressureMap: false,
            MatHeadPosition: '',
            MatHeadRot: '',
            MatPelvicAntTilt: '',
            MatPelvicAntTiltRange: '',
            MatPelvicPostTilt: '',
            MatPelvicPostTiltRange: '',
            MatPelvicSideFlexL: '',
            MatPelvicSideFlexRangeL: '',
            MatPelvicSideFlexR: '',
            MatPelvicSideFlexRangeR: '',
            MatPelvicRotL: '',
            MatPelvicRotRangeL: '',
            MatPelvicRotR: '',
            MatPelvicRotRangeR: '',
            MatHipFlex: '',
            MatHipContracture: '',
            MatHipAbdAdd: '',
            MatHipRotate: '',
            MatHipIntegrity: '',
            MatKneePopliteal: '',
            MatKneeContracture: '',
            MatAnkle: '',
            MatSpine: '',
            MatSpinePri: '',
            MatSpineSec: '',
            SittingBalance: '',
            SitHeadControl: '',
            SitHeadFlex: '',
            SitHeadPreferToTurn: '',
            SitHeadDrop: '',
            SitSpine: '',
            SitHeadTilt: '',
            SitHeadTiltSeverity: '',
            SitHeadTiltFlexibility: '',
            SitThoracicConvexity: '',
            SitThoracicSeverity: '',
            SitThoracicFlexibility: '',
            SitLumbarConvexity: '',
            SitLumbarSeverity: '',
            SitLumbarFlexibility: '',
            SitRibHump: '',
            SitHumpLevel: '',
            SitKyphosis: '',
            SitKyphoticFlexibility: '',
            SitLordosis: '',
            SitLordoticFlexibility: '',
            SitSpineRotation: '',
            SitLumbarFlexion: '',
            SitLumbarExtension: '',
            SitPelvicFlexibility: '',
            SitPelvicFlexibilityTilt: '',
            SitPelvicTilt: '',
            SitPelvicObliquity: '',
            SitPelvicRotation: '',
            SitThighsWindswept: '',
            SitThighsAdducted: '',
            Tone: '',
            Reflexes: '',
            Movement: '',
            Llstrength: '',
            Ulstrength: '',
            HandFunction: '',
            Ulfunction: '',
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

    GetState() {
        return {
            Controller: this.constructor.name,
            RefId: parseInt(this.state.RefId),
            SeatNo: this.state.SeatNo,
            Date: this.state.Date,
            SkinCondition: this.state.SkinCondition,
            PressureMap: this.state.PressureMap,
            MatHeadPosition: this.state.MatHeadPosition,
            MatHeadRot: this.state.MatHeadRot,
            MatPelvicAntTilt: this.state.MatPelvicAntTilt,
            MatPelvicAntTiltRange: this.state.MatPelvicAntTiltRange,
            MatPelvicPostTilt: this.state.MatPelvicPostTilt,
            MatPelvicPostTiltRange: this.state.MatPelvicPostTiltRange,
            MatPelvicSideFlexL: this.state.MatPelvicSideFlexL,
            MatPelvicSideFlexRangeL: this.state.MatPelvicSideFlexRangeL,
            MatPelvicSideFlexR: this.state.MatPelvicSideFlexR,
            MatPelvicSideFlexRangeR: this.state.MatPelvicSideFlexRangeR,
            MatPelvicRotL: this.state.MatPelvicRotL,
            MatPelvicRotRangeL: this.state.MatPelvicRotRangeL,
            MatPelvicRotR: this.state.MatPelvicRotR,
            MatPelvicRotRangeR: this.state.MatPelvicRotRangeR,
            MatHipFlex: this.state.MatHipFlex,
            MatHipContracture: this.state.MatHipContracture,
            MatHipAbdAdd: this.state.MatHipAbdAdd,
            MatHipRotate: this.state.MatHipRotate,
            MatHipIntegrity: this.state.MatHipIntegrity,
            MatKneePopliteal: this.state.MatKneePopliteal,
            MatKneeContracture: this.state.MatKneeContracture,
            MatAnkle: this.state.MatAnkle,
            MatSpine: this.state.MatSpine,
            MatSpinePri: this.state.MatSpinePri,
            MatSpineSec: this.state.MatSpineSec,
            SittingBalance: this.state.SittingBalance,
            SitHeadControl: this.state.SitHeadControl,
            SitHeadFlex: this.state.SitHeadFlex,
            SitHeadPreferToTurn: this.state.SitHeadPreferToTurn,
            SitHeadDrop: this.state.SitHeadDrop,
            SitSpine: this.state.SitSpine,
            SitHeadTilt: this.state.SitHeadTilt,
            SitHeadTiltSeverity: this.state.SitHeadTiltSeverity,
            SitHeadTiltFlexibility: this.state.SitHeadTiltFlexibility,
            SitThoracicConvexity: this.state.SitThoracicConvexity,
            SitThoracicSeverity: this.state.SitThoracicSeverity,
            SitThoracicFlexibility: this.state.SitThoracicFlexibility,
            SitLumbarConvexity: this.state.SitLumbarConvexity,
            SitLumbarSeverity: this.state.SitLumbarSeverity,
            SitLumbarFlexibility: this.state.SitLumbarFlexibility,
            SitRibHump: this.state.SitRibHump,
            SitHumpLevel: this.state.SitHumpLevel,
            SitKyphosis: this.state.SitKyphosis,
            SitKyphoticFlexibility: this.state.SitKyphoticFlexibility,
            SitLordosis: this.state.SitLordosis,
            SitLordoticFlexibility: this.state.SitLordoticFlexibility,
            SitSpineRotation: this.state.SitSpineRotation,
            SitLumbarFlexion: this.state.SitLumbarFlexion,
            SitLumbarExtension: this.state.SitLumbarExtension,
            SitPelvicFlexibility: this.state.SitPelvicFlexibility,
            SitPelvicFlexibilityTilt: this.state.SitPelvicFlexibilityTilt,
            SitPelvicTilt: this.state.SitPelvicTilt,
            SitPelvicObliquity: this.state.SitPelvicObliquity,
            SitPelvicRotation: this.state.SitPelvicRotation,
            SitThighsWindswept: this.state.SitThighsWindswept,
            SitThighsAdducted: this.state.SitThighsAdducted,
            Tone: this.state.Tone,
            Reflexes: this.state.Reflexes,
            Movement: this.state.Movement,
            Llstrength: this.state.Llstrength,
            Ulstrength: this.state.Ulstrength,
            HandFunction: this.state.HandFunction,
            Ulfunction: this.state.Ulfunction,
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
                        <GetDatalist requiredType="Physical_Examination_SkinCondition" />
                        <GetDatalist requiredType="Physical_Examination_MatHeadPosition" />
                        <GetDatalist requiredType="Physical_Examination_MatHeadRot" />
                        <GetDatalist requiredType="Physical_Examination_Mobility" />
                        <GetDatalist requiredType="Physical_Examination_Range" />
                        <GetDatalist requiredType="Physical_Examination_MatHipFlex" />
                        <GetDatalist requiredType="Physical_Examination_Contracture" />
                        <GetDatalist requiredType="Physical_Examination_MatHipAbdAdd" />
                        <GetDatalist requiredType="Physical_Examination_MatHipRotate" />
                        <GetDatalist requiredType="Physical_Examination_MatHipIntegrity" />
                        <GetDatalist requiredType="Physical_Examination_MatKneePopliteal" />
                        <GetDatalist requiredType="Physical_Examination_MatAnkle" />
                        <GetDatalist requiredType="Physical_Examination_CurveShape" />
                        <GetDatalist requiredType="Physical_Examination_MatSpine1" />
                        <GetDatalist requiredType="Physical_Examination_SitHeadControl" />
                        <GetDatalist requiredType="Physical_Examination_SitHeadFlex" />
                        <GetDatalist requiredType="Physical_Examination_SitHeadPreferToTurn" />
                        <GetDatalist requiredType="Physical_Examination_SitHeadDrop" />
                        <GetDatalist requiredType="Physical_Examination_SitHeadTilt" />
                        <GetDatalist requiredType="Physical_Examination_Severity" />
                        <GetDatalist requiredType="Physical_Examination_Flexibility1" />
                        <GetDatalist requiredType="Physical_Examination_Convexity" />
                        <GetDatalist requiredType="Physical_Examination_SitHumpLevel" />
                        <GetDatalist requiredType="Physical_Examination_SitKyphosis" />
                        <GetDatalist requiredType="Physical_Examination_Kyphotic_Lordosis" />
                        <GetDatalist requiredType="Physical_Examination_SitSpineRotation" />
                        <GetDatalist requiredType="Physical_Examination_Flexibility2" />
                        <GetDatalist requiredType="Physical_Examination_SitPelvicFlexibility" />
                        <GetDatalist requiredType="Physical_Examination_SitPelvicFlexibilityTilt" />
                        <GetDatalist requiredType="Physical_Examination_SitPelvicTilt" />
                        <GetDatalist requiredType="Physical_Examination_SitPelvicObliquity" />
                        <GetDatalist requiredType="Physical_Examination_SitPelvicRotation" />
                        <GetDatalist requiredType="Physical_Examination_SitThighsWindswept" />
                        <GetDatalist requiredType="Physical_Examination_SitThighsAdducted" />
                        <GetDatalist requiredType="Physical_Examination_Tone" />
                        <GetDatalist requiredType="Physical_Examination_Reflexes" />
                        <GetDatalist requiredType="Physical_Examination_Movement" />
                        <GetDatalist requiredType="Physical_Examination_LL_UL_Strength" />
                        <GetDatalist requiredType="Physical_Examination_HandFunction" />
                        <GetDatalist requiredType="Physical_Examination_ULFunction" />
                        <GetDatalist requiredType="Physical_Examination_SittingBalance" />
                    </Suspense>

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
                            Skin Condition:
                                 </div>
                        <div className="col-9 p-1">
                            <input list="Physical_Examination_SkinCondition" value={this.state.SkinCondition} type="text" maxLength=" 50 " onChange={this.handleFieldChange} name="SkinCondition" />

                            <label>  &nbsp; pressure mapping required  &nbsp;
                            <input type="checkbox" onChange={this.handleToggle} checked={this.state.PressureMap} name="PressureMap" />
                            </label>
                        </div>
                    </div>

                    <div className="row">
                        <span className="borderedBox">
                            <b>Mat Assessment</b>
                        </span>
                    </div>
                    <div className="row">
                        <u>Supine with Hip/Knee Flexed 90 deg</u>
                    </div>
                    <div className="row">
                        <div className="col-3">
                            Head Position:
                                 </div>
                        <div className="col-9 p-1">
                            <input list="Physical_Examination_MatHeadPosition" value={this.state.MatHeadPosition} type="text" maxLength=" 50 " onChange={this.handleFieldChange} name="MatHeadPosition" />
                            &nbsp; ; &nbsp;
                            <input list="Physical_Examination_MatHeadRot" value={this.state.MatHeadRot} type="text" maxLength=" 50 " onChange={this.handleFieldChange} name="MatHeadRot" />

                        </div>
                    </div>

                    <div className="row">
                        <div className="col-3">
                            Pelvis:
                        </div>
                        <div className="col-3">
                            Anterior tilt:
                               </div>
                        <div className="col-6 p-1">
                            <input list="Physical_Examination_Mobility" className="underLined_medium" value={this.state.MatPelvicAntTilt} type="text" maxLength=" 50 " onChange={this.handleFieldChange} name="MatPelvicAntTilt" />
                            &nbsp;  in &nbsp;
                                 <input list="Physical_Examination_Range" value={this.state.MatPelvicAntTiltRange} type="text" maxLength=" 50 " onChange={this.handleFieldChange} name="MatPelvicAntTiltRange" />
                            &nbsp; range  &nbsp;
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3">
                            &nbsp;
                        </div>
                        <div className="col-3">
                            Posterior tilt:
                        </div>
                        <div className="col-6 p-1">

                            <input list="Physical_Examination_Mobility" className="underLined_medium" value={this.state.MatPelvicPostTilt} type="text" maxLength=" 50 " onChange={this.handleFieldChange} name="MatPelvicPostTilt" />
                            &nbsp; in  &nbsp;
                            <input list="Physical_Examination_Range" value={this.state.MatPelvicPostTiltRange} type="text" maxLength=" 50 " onChange={this.handleFieldChange} name="MatPelvicPostTiltRange" />
                            &nbsp; range &nbsp;
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3">
                            &nbsp;
                        </div>
                        <div className="col-3">
                            Side flex to L:
                        </div>
                        <div className="col-6 p-1">

                            <input list="Physical_Examination_Mobility" value={this.state.MatPelvicSideFlexL} type="text" maxLength=" 50 " onChange={this.handleFieldChange} name="MatPelvicSideFlexL" />
                            &nbsp; in  &nbsp;
                              <input list="Physical_Examination_Range" value={this.state.MatPelvicSideFlexRangeL} type="text" maxLength=" 50 " onChange={this.handleFieldChange} name="MatPelvicSideFlexRangeL" />
                            &nbsp; range &nbsp;
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3">
                            &nbsp;
                        </div>
                        <div className="col-3">
                            Side flex to R:
                        </div>
                        <div className="col-6 p-1">

                            <input list="Physical_Examination_Mobility" value={this.state.MatPelvicSideFlexR} type="text" maxLength=" 50 " onChange={this.handleFieldChange} name="MatPelvicSideFlexR" />
                            &nbsp; in  &nbsp;
                               <input list="Physical_Examination_Range" value={this.state.MatPelvicSideFlexRangeR} type="text" maxLength=" 50 " onChange={this.handleFieldChange} name="MatPelvicSideFlexRangeR" />
                            &nbsp; range &nbsp;
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-3">
                            &nbsp;
                        </div>
                        <div className="col-3">
                            Rotate to L:
                        </div>
                        <div className="col-6 p-1">

                            <input list="Physical_Examination_Mobility" value={this.state.MatPelvicRotL} type="text" maxLength=" 50 " onChange={this.handleFieldChange} name="MatPelvicRotL" />
                            &nbsp; in  &nbsp;
                            <input list="Physical_Examination_Range" value={this.state.MatPelvicRotRangeL} type="text" maxLength=" 50 " onChange={this.handleFieldChange} name="MatPelvicRotRangeL" />
                            &nbsp; range &nbsp;
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3">
                            &nbsp;
                        </div>
                        <div className="col-3">
                            Rotate to R:
                        </div>
                        <div className="col-6 p-1">

                            <input list="Physical_Examination_Mobility" value={this.state.MatPelvicRotR} type="text" maxLength=" 50 " onChange={this.handleFieldChange} name="MatPelvicRotR" />
                            &nbsp; in  &nbsp;
                              <input list="Physical_Examination_Range" value={this.state.MatPelvicRotRangeR} type="text" maxLength=" 50 " onChange={this.handleFieldChange} name="MatPelvicRotRangeR" />
                            &nbsp; range &nbsp;
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3">
                            Hip:
                        </div>
                        <div className="col-3">
                            Flexion:
                        </div>
                        <div className="col-6 p-1">

                            <input list="Physical_Examination_MatHipFlex" value={this.state.MatHipFlex} type="text" maxLength=" 50 " onChange={this.handleFieldChange} name="MatHipFlex" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3">
                            &nbsp;
                        </div>
                        <div className="col-3">
                            Contracture:
                        </div>
                        <div className="col-6 p-1">

                            <input list="Physical_Examination_Contracture" value={this.state.MatHipContracture} type="text" maxLength=" 50 " onChange={this.handleFieldChange} name="MatHipContracture" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3">
                            &nbsp;
                        </div>
                        <div className="col-3">
                            Abd/Adduction:
                        </div>
                        <div className="col-6 p-1">

                            <input list="Physical_Examination_MatHipAbdAdd" value={this.state.MatHipAbdAdd} type="text" maxLength=" 50 " onChange={this.handleFieldChange} name="MatHipAbdAdd" />
                            &nbsp;  cause pevic mvt
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3">
                            &nbsp;
                        </div>
                        <div className="col-3">
                            Rotation
                        </div>
                        <div className="col-6 p-1">

                            <input list="Physical_Examination_MatHipRotate" value={this.state.MatHipRotate} type="text" maxLength=" 50 " onChange={this.handleFieldChange} name="MatHipRotate" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3">
                            &nbsp;
                        </div>
                        <div className="col-3">
                            Stability
                        </div>
                        <div className="col-6 p-1">

                            <input list="Physical_Examination_MatHipIntegrity" value={this.state.MatHipIntegrity} type="text" maxLength=" 50 " onChange={this.handleFieldChange} name="MatHipIntegrity" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3">
                            Knee:
                        </div>
                        <div className="col-3">
                            Popliteal angle
                        </div>
                        <div className="col-6 p-1">
                            <input list="Physical_Examination_MatKneePopliteal" value={this.state.MatKneePopliteal} type="text" maxLength=" 50 " onChange={this.handleFieldChange} name="MatKneePopliteal" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3">
                            &nbsp;
                        </div> <div className="col-3">
                            Contracture
                        </div>
                        <div className="col-6 p-1">

                            <input list="Physical_Examination_Contracture" value={this.state.MatKneeContracture} type="text" maxLength=" 50 " onChange={this.handleFieldChange} name="MatKneeContracture" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3">
                            Ankle:
                        </div>
                        <div className="col-9 p-1">
                            <input list="Physical_Examination_MatAnkle" value={this.state.MatAnkle} type="text" maxLength=" 50 " onChange={this.handleFieldChange} name="MatAnkle" />
                        </div>
                    </div>


                    <div className="row">
                        <div className="col-3">
                            Spine:
                        </div>
                        <div className="col-9 p-1">
                            <input list="Physical_Examination_CurveShape" className="underLined_long" value={this.state.MatSpine} type="text" maxLength=" 50 " onChange={this.handleFieldChange} name="MatSpine" />
                            &nbsp; Prl. &nbsp;
                            <input list="Physical_Examination_MatSpine1" className="underLined_medium" value={this.state.MatSpinePri} type="text" maxLength=" 50 " onChange={this.handleFieldChange} name="MatSpinePri" />
                            &nbsp; Sec. &nbsp;
                            <input list="Physical_Examination_MatSpine1" className="underLined_medium" value={this.state.MatSpineSec} type="text" maxLength=" 50 " onChange={this.handleFieldChange} name="MatSpineSec" />

                        </div>
                    </div>

                    <div className="row">
                        <u>Sitting</u>
                    </div>
                    <div className="row">
                        <div className="col-3">
                            Sitting Balance: <br />(tested on flat surface)
                                 </div>
                        <div className="col-9 p-1">
                            <input list="Physical_Examination_SittingBalance" className="underLined_xtralong" value={this.state.SittingBalance} type="text" maxLength=" 100 " onChange={this.handleFieldChange} name="SittingBalance" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3">
                            Head :
                        </div>
                        <div className="col-3">
                            Control
                        </div>
                        <div className="col-6 p-1">
                            <input list="Physical_Examination_SitHeadControl" value={this.state.SitHeadControl} type="text" maxLength=" 50 " onChange={this.handleFieldChange} name="SitHeadControl" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3">
                            &nbsp;
                        </div>
                        <div className="col-3">
                            Position
                        </div>
                        <div className="col-6 p-1">
                            Position &nbsp;
                            <input list="Physical_Examination_SitHeadFlex" value={this.state.SitHeadFlex} type="text" maxLength=" 50 " onChange={this.handleFieldChange} name="SitHeadFlex" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3">
                            &nbsp;
                        </div>
                        <div className="col-3">
                            &nbsp;
                        </div>
                        <div className="col-6 p-1">
                            prefer to turn  &nbsp; <input list="Physical_Examination_SitHeadPreferToTurn" value={this.state.SitHeadPreferToTurn} type="text" maxLength=" 50 " onChange={this.handleFieldChange} name="SitHeadPreferToTurn" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3">
                            &nbsp;
                        </div>
                        <div className="col-3">
                            &nbsp;
                        </div>
                        <div className="col-6 p-1">
                            drop &nbsp;<input list="Physical_Examination_SitHeadDrop" value={this.state.SitHeadDrop} type="text" maxLength=" 50 " onChange={this.handleFieldChange} name="SitHeadDrop" />
                            &nbsp; when moved
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3">
                            Spine:
                        </div>
                        <div className="col-9 p-1">
                            <input list="Physical_Examination_CurveShape" className="underLined_xtralong" value={this.state.SitSpine} type="text" maxLength=" 50 " onChange={this.handleFieldChange} name="SitSpine" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3">
                            &nbsp;
                        </div>
                        <div className="col-3">
                            Head tilt
                        </div>
                        <div className="col-6 p-1">
                            <input list="Physical_Examination_SitHeadTilt" className="underLined_medium" value={this.state.SitHeadTilt} type="text" maxLength=" 50 " onChange={this.handleFieldChange} name="SitHeadTilt" />
                            &nbsp;
                            <input list="Physical_Examination_Severity" className="underLined_medium" value={this.state.SitHeadTiltSeverity} type="text" maxLength=" 50 " onChange={this.handleFieldChange} name="SitHeadTiltSeverity" />
                            &nbsp;
                            <input list="Physical_Examination_Flexibility1" className="underLined_medium" value={this.state.SitHeadTiltFlexibility} type="text" maxLength=" 50 " onChange={this.handleFieldChange} name="SitHeadTiltFlexibility" />

                        </div>
                    </div>

                    <div className="row">
                        <div className="col-3">
                            &nbsp;
                        </div>
                        <div className="col-3">
                            Thoracic convexity
                        </div>
                        <div className="col-6 p-1">
                            <input list="Physical_Examination_Convexity" className="underLined_medium" value={this.state.SitThoracicConvexity} type="text" maxLength=" 50 " onChange={this.handleFieldChange} name="SitThoracicConvexity" />
                            &nbsp;
                            <input className="underLined_medium" value={this.state.SitThoracicSeverity} type="text" maxLength=" 50 " onChange={this.handleFieldChange} name="SitThoracicSeverity" />
                            &nbsp;
                            <input className="underLined_medium" value={this.state.SitThoracicFlexibility} type="text" maxLength=" 50 " onChange={this.handleFieldChange} name="SitThoracicFlexibility" />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-3">
                            &nbsp;
                        </div>
                        <div className="col-3">
                            Lumber convexity
                        </div>
                        <div className="col-6 p-1">
                            <input list="Physical_Examination_Convexity" className="underLined_medium" value={this.state.SitLumbarConvexity} type="text" maxLength=" 50 " onChange={this.handleFieldChange} name="SitLumbarConvexity" />
                            &nbsp;
                            <input className="underLined_medium" value={this.state.SitLumbarSeverity} type="text" maxLength=" 50 " onChange={this.handleFieldChange} name="SitLumbarSeverity" />
                            &nbsp;
                            <input className="underLined_medium" value={this.state.SitLumbarFlexibility} type="text" maxLength=" 50 " onChange={this.handleFieldChange} name="SitLumbarFlexibility" />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-3">
                            &nbsp;
                        </div>
                        <div className="col-3">
                            Rib Hump :
                                 </div>
                        <div className="col-6 p-1">
                            <input list="Physical_Examination_Convexity" value={this.state.SitRibHump} type="text" maxLength=" 50 " onChange={this.handleFieldChange} name="SitRibHump" />
                            &nbsp;
                            <input list="Physical_Examination_SitHumpLevel" value={this.state.SitHumpLevel} type="text" maxLength=" 50 " onChange={this.handleFieldChange} name="SitHumpLevel" />

                        </div>
                    </div>

                    <div className="row">
                        <div className="col-3">
                            &nbsp;
                        </div>
                        <div className="col-3">
                            Kyphosis:
                                 </div>
                        <div className="col-6 p-1">
                            <input list="Physical_Examination_Kyphotic_Lordosis" value={this.state.SitKyphosis} type="text" maxLength=" 50 " onChange={this.handleFieldChange} name="SitKyphosis" />
                            &nbsp;
                            <input list="Physical_Examination_Flexibility1" value={this.state.SitKyphoticFlexibility} type="text" maxLength=" 50 " onChange={this.handleFieldChange} name="SitKyphoticFlexibility" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3">
                            &nbsp;
                        </div>
                        <div className="col-3">
                            Lordosis:
                                 </div>
                        <div className="col-6 p-1">
                            <input list="Physical_Examination_Kyphotic_Lordosis" value={this.state.SitLordosis} type="text" maxLength=" 50 " onChange={this.handleFieldChange} name="SitLordosis" />
                            &nbsp;
                            <input list="Physical_Examination_Flexibility1" value={this.state.SitLordoticFlexibility} type="text" maxLength=" 50 " onChange={this.handleFieldChange} name="SitLordoticFlexibility" />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-3">
                            &nbsp;
                        </div>
                        <div className="col-3">
                            Rotation of Spine:
                                 </div>
                        <div className="col-6 p-1">
                            <input list="Physical_Examination_Convexity" value={this.state.SitSpineRotation} type="text" maxLength=" 50 " onChange={this.handleFieldChange} name="SitSpineRotation" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3">
                            &nbsp;
                        </div>
                        <div className="col-3">
                            Lumbar spine:
                                 </div>
                        <div className="col-6 p-1">
                            flexion: &nbsp;
                            <input list="Physical_Examination_Flexibility2" className="underLined_medium" value={this.state.SitLumbarFlexion} type="text" maxLength=" 50 " onChange={this.handleFieldChange} name="SitLumbarFlexion" />
                            &nbsp; extension &nbsp;
                            <input list="Physical_Examination_Flexibility2" className="underLined_medium" value={this.state.SitLumbarExtension} type="text" maxLength=" 50 " onChange={this.handleFieldChange} name="SitLumbarExtension" />
                        </div>
                    </div>


                    <div className="row">
                        <div className="col-3">
                            Pelvis:
                        </div>
                        <div className="col-3">
                            Pelvic Flexibility:
                                 </div>
                        <div className="col-6 p-1">
                            <input className="xtralongBox" list="Physical_Examination_SitPelvicFlexibility" value={this.state.SitPelvicFlexibility} type="text" maxLength=" 255 " onChange={this.handleFieldChange} name="SitPelvicFlexibility" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3">
                            &nbsp;
                        </div>
                        <div className="col-3">
                            &nbsp;
                                 </div>
                        <div className="col-6 p-1">
                            <input className="xtralongBox" list="Physical_Examination_SitPelvicFlexibilityTilt" value={this.state.SitPelvicFlexibilityTilt} type="text" maxLength=" 255 " onChange={this.handleFieldChange} name="SitPelvicFlexibilityTilt" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3">
                            &nbsp;
                        </div>
                        <div className="col-3">
                            Pelvic tilt:
                                 </div>
                        <div className="col-6 p-1">
                            <input className="longBox" list="Physical_Examination_SitPelvicTilt" value={this.state.SitPelvicTilt} type="text" maxLength=" 50 " onChange={this.handleFieldChange} name="SitPelvicTilt" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3">
                            &nbsp;
                        </div>
                        <div className="col-3">
                            Pelvic obliquity:
                                 </div>
                        <div className="col-6 p-1">
                            <input className="longBox" list="Physical_Examination_SitPelvicObliquity" value={this.state.SitPelvicObliquity} type="text" maxLength=" 50 " onChange={this.handleFieldChange} name="SitPelvicObliquity" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3">
                            &nbsp;
                        </div>
                        <div className="col-3">
                            Pelvic rotation:
                                 </div>
                        <div className="col-6 p-1">
                            <input className="longBox" list="Physical_Examination_SitPelvicRotation" value={this.state.SitPelvicRotation} type="text" maxLength=" 50 " onChange={this.handleFieldChange} name="SitPelvicRotation" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3">
                            Thighs:
                        </div>
                        <div className="col-3">
                            Wind swept:
                                 </div>
                        <div className="col-6 p-1">
                            <input list="Physical_Examination_SitThighsWindswept" value={this.state.SitThighsWindswept} type="text" maxLength=" 50 " onChange={this.handleFieldChange} name="SitThighsWindswept" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3">
                            &nbsp;
                        </div>
                        <div className="col-3">
                            Adducted:
                                 </div>
                        <div className="col-6 p-1">
                            <input list="Physical_Examination_SitThighsAdducted" value={this.state.SitThighsAdducted} type="text" maxLength=" 50 " onChange={this.handleFieldChange} name="SitThighsAdducted" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3">
                            Motor Control
                        </div>
                        <div className="col-3">
                            Tone
                                 </div>
                        <div className="col-6 p-1">
                            <input list="Physical_Examination_Tone" value={this.state.Tone} type="text" maxLength=" 50 " onChange={this.handleFieldChange} name="Tone" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3">
                            &nbsp;
                        </div>
                        <div className="col-3">
                            Reflexes:
                                 </div>
                        <div className="col-6 p-1">
                            <input className="underLined_xtralong" list="Physical_Examination_Reflexes" value={this.state.Reflexes} type="text" maxLength=" 100 " onChange={this.handleFieldChange} name="Reflexes" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3">
                            &nbsp;
                        </div>
                        <div className="col-3">
                            Movement:
                                 </div>
                        <div className="col-6 p-1">
                            <input className="underLined_xtralong" list="Physical_Examination_Movement" value={this.state.Movement} type="text" maxLength=" 100 " onChange={this.handleFieldChange} name="Movement" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3">
                            &nbsp;
                        </div>
                        <div className="col-3">
                            L/L Strength:
                                 </div>
                        <div className="col-6 p-1">
                            <input className="underLined_xtralong" list="Physical_Examination_LL_UL_Strength" value={this.state.Llstrength} type="text" maxLength=" 100 " onChange={this.handleFieldChange} name="Llstrength" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3">
                            &nbsp;
                        </div>
                        <div className="col-3">
                            U/L Strength:
                                 </div>
                        <div className="col-6 p-1">
                            <input className="underLined_xtralong" list="Physical_Examination_LL_UL_Strength" value={this.state.Ulstrength} type="text" maxLength=" 100 " onChange={this.handleFieldChange} name="Ulstrength" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3">
                            &nbsp;
                        </div>
                        <div className="col-3">
                            Hand function:
                                 </div>
                        <div className="col-6 p-1">
                            <input className="underLined_xtralong" list="Physical_Examination_HandFunction" value={this.state.HandFunction} type="text" maxLength=" 100 " onChange={this.handleFieldChange} name="HandFunction" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3">
                            &nbsp;
                        </div>
                        <div className="col-3">
                            U/L function:
                                 </div>
                        <div className="col-6 p-1">
                            <input className="underLined_xtralong" list="Physical_Examination_ULFunction" value={this.state.Ulfunction} type="text" maxLength=" 100 " onChange={this.handleFieldChange} name="Ulfunction" />
                        </div>
                    </div>
                    <hr />
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
                             s
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