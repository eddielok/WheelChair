const GetDatalistFromNumericRange = React.lazy(() => import('/js/shared/GetDatalistFromNumericRange.jsx'));
const GetDatalist = React.lazy(() => import('/js/shared/GetDatalist.jsx'));
const HandleAfterSubmit_toast = React.lazy(() => import('/js/shared/HandleAfterSubmit_toast.jsx'));
import getDisplayDate from '/js/shared/getDisplayDate.js'; 
 
export default class Seating_System_Prescription_InputForm extends React.Component {
	constructor(props) {
		super(props);
		//gen
		this.state = {
			RefId: this.props.pid,
			SeatNo: this.props.seatNo ? this.props.seatNo : '',
			Date: '',
			ChairType: '',
			FrameType: '',
			SeatBase: '',
			CushionType: '',
			CushionDensity: '',
			CushionModification: '',
			CushionCover: '',
			PelvicStablizer: '',
			PelvicSupport: '',
			AdductorWedge: '',
			AbductorWedge: '',
			KneeSupport: '',
			BackrestType: '',
			BackCushionType: '',
			BackCushionDensity: '',
			BackModification: '',
			SeatToBack: '',
			LateralSupport: '',
			SpinalBrace: '',
			LumbarSupport: '',
			ShoulderSupport: '',
			HeadSupport: '',
			SpecialItem1: '',
			SpecialItem2: '',
			SpecialItem3: '',
			SpecialItem4: '',
			SpecialItem5: '',
			SpecialItem6: '',
			SpecialItem7: '',
			Notes: '',
			FullSystemChanges: false,
			PtPruchaseWc: '',
			PtHaveWc: '', 
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
	componentDidMount()	{ 
		if (this.props.isFormUpdate() && this.props.pid)
			this.props.getData({ Controller: this.constructor.name }).then(
				() => {
					let data = this.props.fetchedData;
					for (let prop in data) {
						if (prop == 'Date' && data[prop]) {
							this.setState({ [prop]: getDisplayDate(data[prop]) });
						} else if (prop == 'FullSystemChanges' && data[prop])
						{
							this.setState({ [prop]: String(data[prop]).trim().toLowerCase() === 'yes' ? true:false });
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
			ChairType: this.state.ChairType,
			FrameType: this.state.FrameType,
			SeatBase: this.state.SeatBase,
			CushionType: this.state.CushionType,
			CushionDensity: this.state.CushionDensity,
			CushionModification: this.state.CushionModification,
			CushionCover: this.state.CushionCover,
			PelvicStablizer: this.state.PelvicStablizer,
			PelvicSupport: this.state.PelvicSupport,
			AdductorWedge: this.state.AdductorWedge,
			AbductorWedge: this.state.AbductorWedge,
			KneeSupport: this.state.KneeSupport,
			BackrestType: this.state.BackrestType,
			BackCushionType: this.state.BackCushionType,
			BackCushionDensity: this.state.BackCushionDensity,
			BackModification: this.state.BackModification,
			SeatToBack: this.state.SeatToBack,
			LateralSupport: this.state.LateralSupport,
			SpinalBrace: this.state.SpinalBrace,
			LumbarSupport: this.state.LumbarSupport,
			ShoulderSupport: this.state.ShoulderSupport,
			HeadSupport: this.state.HeadSupport,
			SpecialItem1: this.state.SpecialItem1,
			SpecialItem2: this.state.SpecialItem2,
			SpecialItem3: this.state.SpecialItem3,
			SpecialItem4: this.state.SpecialItem4,
			SpecialItem5: this.state.SpecialItem5,
			SpecialItem6: this.state.SpecialItem6,
			SpecialItem7: this.state.SpecialItem7,
			Notes: this.state.Notes,
			FullSystemChanges: this.state.FullSystemChanges ? 'Yes':'No',
			PtPruchaseWc: this.state.PtPruchaseWc,
			PtHaveWc: this.state.PtHaveWc
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
						<GetDatalistFromNumericRange name="one_one" start="1" end="1" />
						<GetDatalistFromNumericRange name="one_two" start="1" end="2" />
						<GetDatalistFromNumericRange name="one_three" start="1" end="3" />
						<GetDatalistFromNumericRange name="one_five" start="1" end="5" />
						<GetDatalistFromNumericRange name="one_seven" start="1" end="7" /> 
						<GetDatalist requiredType="Seating_System_Prescription_type1" />
						<GetDatalist requiredType="Seating_System_Prescription_type2" />
						<GetDatalist requiredType="Seating_System_Prescription_type3" />
						<GetDatalist requiredType="Seating_System_Prescription_type4" />
						<GetDatalist requiredType="Seating_System_Prescription_type5" />
						<GetDatalist requiredType="Seating_System_Prescription_type6" />
						<GetDatalist requiredType="Seating_System_Prescription_type7" />
						<GetDatalist requiredType="Seating_System_Prescription_type8" /> 
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
						<div className="col-3 p-2">
							Date:
						</div>
						<div className="col-9 p-2">
							<input value={this.state.Date} type="date" onChange={this.handleFieldChange} name="Date" required />
						</div>
					</div>
					<div className="row">
						<div className="col-12">
							<u> Wheelchair Frame </u>
						</div>
					</div>
					<div className="row">
						<div className="col-9">
							Wheelchair Type: 1) manual/ 2) power/ 3) power-assit 4) push chair/ 5) buggy
			</div>
						<div className="col-3 p-2 p-2">
							<input list="one_five"   value={this.state.ChairType} type="text" maxLength=" 10 " onChange={this.handleFieldChange} name="ChairType" />
						</div>
					</div>
					<div className="row">
						<div className="col-9">
							Frame Type:  1) rigid/  2) folding;  3) tilt-in-space  4) light weight frame  5) Panda
			</div>
						<div className="col-3 p-2 p-2">
							<input list="Seating_System_Prescription_type1"  value={this.state.FrameType} type="text" maxLength=" 50 " onChange={this.handleFieldChange} name="FrameType" />
						</div>
					</div>

					<div className="row">
						<div className="col-12">
							<u> Seat Base and Seat Cushion </u>
						</div>
					</div>
					<div className="row">
						<div className="col-9">
							Seat Base 1) sling/  2) solid;  3) dropped/  4) raised/  5) tilted seat base
			</div>
						<div className="col-3 p-2 p-2">
							<input list="Seating_System_Prescription_type2" value={this.state.SeatBase} type="text" maxLength=" 50 " onChange={this.handleFieldChange} name="SeatBase" />
						</div>
					</div>
					<div className="row">
						<div className="col-9">
							Cushion Type: 1) get/ 2) air floatation/  3) Jay2/  4) polyform pad/  5) contour/  6) custom molded/  7) memory
			</div>
						<div className="col-3 p-2 p-2">
							<input list="one_seven" value={this.state.CushionType} type="text" maxLength=" 50 " onChange={this.handleFieldChange} name="CushionType" />
						</div>
					</div>
					<div className="row">
						<div className="col-9">
							Cushion Density: 1) soft/  2) medium/  3) semi-rigid
			</div>
						<div className="col-3 p-2 p-2">
							<input list="one_three" value={this.state.CushionDensity} type="text" maxLength=" 50 " onChange={this.handleFieldChange} name="CushionDensity" />
						</div>
					</div>
					<div className="row">
						<div className="col-9">
							Cushion Modification: 1) wedged;  2) stepped;  3) cut-outs
			</div>
						<div className="col-3 p-2 p-2">
							<input list="Seating_System_Prescription_type3" value={this.state.CushionModification} type="text" maxLength=" 50 " onChange={this.handleFieldChange} name="CushionModification" />
						</div>
					</div>
					<div className="row">
						<div className="col-9">
							Cushion Cover: 1) cotton/ 2) vinyl/  3) artificial leather
			</div>
						<div className="col-3 p-2 p-2">
							<input list="one_three" value={this.state.CushionCover} type="text" maxLength=" 50 " onChange={this.handleFieldChange} name="CushionCover" />
						</div>
					</div>
					<div className="row">
						<div className="col-12">
							<u> Pelvic Stabilization </u>
						</div>
					</div>
					<div className="row">
						<div className="col-9">
							Pelvic Stablizer: 1) padded;  2) velcro/  3) buckle/flip-up pelvic belt/  4) sub ASIS bar  5) safety belt
			</div>
						<div className="col-3 p-2 p-2">
							<input list="Seating_System_Prescription_type4" value={this.state.PelvicStablizer} type="text" maxLength=" 50 " onChange={this.handleFieldChange} name="PelvicStablizer" />
						</div>
					</div>
					<div className="row">
						<div className="col-12">
							<u> Pelvic Thigh / Knee Support </u>
						</div>
					</div>
					<div className="row">
						<div className="col-9">
							Pelvic Support: 1) B  2) L  3) R pelvic support
			</div>
						<div className="col-3 p-2 p-2">
							<input list="one_three" value={this.state.PelvicSupport} type="text" maxLength=" 50 " onChange={this.handleFieldChange} name="PelvicSupport" />
						</div>
					</div>
					<div className="row">
						<div className="col-9">
							Adductor Wedge:  1) B  2) L  3) adductor wedge
			</div>
						<div className="col-3 p-2 p-2">
							<input list="one_three" value={this.state.AdductorWedge} type="text" maxLength=" 50 " onChange={this.handleFieldChange} name="AdductorWedge" />
						</div>
					</div>
					<div className="row">
						<div className="col-9">
							Abductor Wedge: 1) pommel  2) Y-strap
			</div>
						<div className="col-3 p-2 p-2">
							<input list="one_two"  value={this.state.AbductorWedge} type="text" maxLength=" 50 " onChange={this.handleFieldChange} name="AbductorWedge" />
						</div>
					</div>
					<div className="row">
						<div className="col-9">
							KneeSupport: 1) B;  2) L;  3) R;
			</div>
						<div className="col-3 p-2 p-2">
							<input list="one_three" value={this.state.KneeSupport} type="text" maxLength=" 50 " onChange={this.handleFieldChange} name="KneeSupport" />
						</div>
					</div>

					<div className="row">
						<div className="col-12">
							<u> Backrest and Back Cushion </u>
						</div>
					</div>

					<div className="row">
						<div className="col-9">
							Backrest Type: 1) low  2) high  3) sling  4) rigid back
			</div>
						<div className="col-3 p-2 p-2">
							<input list="Seating_System_Prescription_type5" value={this.state.BackrestType} type="text" maxLength=" 50 " onChange={this.handleFieldChange} name="BackrestType" />
						</div>
					</div>
					<div className="row">
						<div className="col-9">
							Back Cushion Type: 1) air floatation  2) dual flex  3) polyform pad  4) contour  5) custom molded
			</div>
						<div className="col-3 p-2 p-2">
							<input list="one_five" value={this.state.BackCushionType} type="text" maxLength=" 50 " onChange={this.handleFieldChange} name="BackCushionType" />
						</div>
					</div>
					<div className="row">
						<div className="col-9">
							Back Cushion Density: 1) soft  2) medium  3) semi-rigid
			</div>
						<div className="col-3 p-2 p-2">
							<input list="one_three" value={this.state.BackCushionDensity} type="text" maxLength=" 50 " onChange={this.handleFieldChange} name="BackCushionDensity" />
						</div>
					</div>
					<div className="row">
						<div className="col-9">
							BackModification: 1) scapular cut-outs
			</div>
						<div className="col-3 p-2 p-2">
							<input list="one_one"  value={this.state.BackModification} type="text" maxLength=" 50 " onChange={this.handleFieldChange} name="BackModification" />
						</div>
					</div>
					<div className="row">
						<div className="col-9">
							Seat to back: 1) fixed  2) adjustable
			</div>
						<div className="col-3 p-2 p-2">
							<input list="one_two" value={this.state.SeatToBack} type="text" maxLength=" 50 " onChange={this.handleFieldChange} name="SeatToBack" />
						</div>
					</div>
					<div className="row">
						<div className="col-12">
							<u> Trunk Shoulder Support </u>
						</div>
					</div>
					<div className="row">
						<div className="col-9">
							Lateral Support: 1) B; 2) L; 3) R;  4) 3pts;  5) swing-away
			</div>
						<div className="col-3 p-2 p-2">
							<input list="Seating_System_Prescription_type6"  value={this.state.LateralSupport} type="text" maxLength=" 50 " onChange={this.handleFieldChange} name="LateralSupport" />
						</div>
					</div>
					<div className="row">
						<div className="col-9">
							Spinal Brace:1) low;  2) high;  3) semi-rigid/  4)  rigid
			</div>
						<div className="col-3 p-2 p-2">
							<input list="Seating_System_Prescription_type5" value={this.state.SpinalBrace} type="text" maxLength=" 50 " onChange={this.handleFieldChange} name="SpinalBrace" />
						</div>
					</div>
					<div className="row">
						<div className="col-9">
							1 ) Lumbar roll
			</div>
						<div className="col-3 p-2 p-2">
							<input list="one_one"  value={this.state.LumbarSupport} type="text" maxLength=" 50 " onChange={this.handleFieldChange} name="LumbarSupport" />
						</div>
					</div>
					<div className="row">
						<div className="col-9">
							Shoulder Support: 1) H harness  2) butterfly chest pad/  3) cross-vest/   4) rigid shoulder stabilizers  5) swing-away;  6) chest strap
			</div>
						<div className="col-3 p-2 p-2">
							<input list="Seating_System_Prescription_type7" value={this.state.ShoulderSupport} type="text" maxLength=" 50 " onChange={this.handleFieldChange} name="ShoulderSupport" />
						</div>
					</div>

					<div className="row">
						<div className="col-12">
							<u> Head Support </u>
						</div>
					</div>
					<div className="row">
						<div className="col-9">
							Head Support: 1) occipital support  2) flat padded/  3) contour padded;  4) lateral support
			</div>
						<div className="col-3 p-2 p-2">
							<input list="Seating_System_Prescription_type8" value={this.state.HeadSupport} type="text" maxLength=" 50 " onChange={this.handleFieldChange} name="HeadSupport" />
						</div>
					</div>
					<div className="row">
						<div className="col-12">
							<u> Others </u>
						</div>
					</div>

					<div className="row">
						<div className="col-1">
							1)
			</div>
						<div className="col-11 p-2">
							<input className="underLined_xtralong" value={this.state.SpecialItem1} type="text" maxLength=" 50 " onChange={this.handleFieldChange} name="SpecialItem1" />
						</div>
					</div>
					<div className="row">
						<div className="col-1">
							2)
			</div>
						<div className="col-11 p-2">
							<input className="underLined_xtralong" value={this.state.SpecialItem2} type="text" maxLength=" 50 " onChange={this.handleFieldChange} name="SpecialItem2" />
						</div>
					</div>
					<div className="row">
						<div className="col-1">
							3)
			</div>
						<div className="col-11 p-2">
							<input className="underLined_xtralong" value={this.state.SpecialItem3} type="text" maxLength=" 50 " onChange={this.handleFieldChange} name="SpecialItem3" />
						</div>
					</div>
					<div className="row">
						<div className="col-1">
							4)
			</div>
						<div className="col-11 p-2">
							<input className="underLined_xtralong" value={this.state.SpecialItem4} type="text" maxLength=" 50 " onChange={this.handleFieldChange} name="SpecialItem4" />
						</div>
					</div>
					<div className="row">
						<div className="col-1">
							5)
			</div>
						<div className="col-11 p-2">
							<input className="underLined_xtralong" value={this.state.SpecialItem5} type="text" maxLength=" 50 " onChange={this.handleFieldChange} name="SpecialItem5" />
						</div>
					</div>
					<div className="row">
						<div className="col-1">
							6)
			</div>
						<div className="col-11 p-2">
							<input className="underLined_xtralong" value={this.state.SpecialItem6} type="text" maxLength=" 50 " onChange={this.handleFieldChange} name="SpecialItem6" />
						</div>
					</div>
					<div className="row">
						<div className="col-1">
							7)
			</div>
						<div className="col-11 p-2">
							<input className="underLined_xtralong" value={this.state.SpecialItem7} type="text" maxLength=" 50 " onChange={this.handleFieldChange} name="SpecialItem7" />
						</div>
					</div>

					<div className="row">
						<div className="col-12 p-2">
						 	<label>
								<input type="checkbox" onChange={this.handleToggle} checked={this.state.FullSystemChanges} name="FullSystemChanges" />
								&nbsp;  Full Seating System Prescription and Fabrication  &nbsp;
							</label >
						</div>
					</div>
					<div className="row">
						<div className="col-3 p-2">
							Notes:
			</div>
						<div className="col-9 p-2">
							<textarea name="Notes" form="Form" value={this.state.Notes} onChange={this.handleFieldChange} > </textarea>
						</div>
					</div>
					
					<div className="row">
						<div className="col-3 p-2">
							PtPruchaseWC:
			</div>
						<div className="col-9 p-2">
							<input value={this.state.PtPruchaseWc} type="text" maxLength=" 50 " onChange={this.handleFieldChange} name="PtPruchaseWc" />
						</div>
					</div>
					<div className="row">
						<div className="col-3 p-2">
							PtHaveWC:
			</div>
						<div className="col-9 p-2">
							<input value={this.state.PtHaveWc} type="text" maxLength=" 50 " onChange={this.handleFieldChange} name="PtHaveWc" />
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