const HandleAfterSubmit_toast = React.lazy(() => import('/js/shared/HandleAfterSubmit_toast.jsx'));
const GetDatalist = React.lazy(() => import('/js/shared/GetDatalist.jsx'));
import getDisplayDate from '/js/shared/getDisplayDate.js';
import GetSelectList from '/js/shared/GetSelectList.jsx';

export default class Social_Information_InputForm extends React.Component {
	constructor(props) {
		super(props);
		//gen
		this.state = {
			RefId: this.props.pid,
			SeatNo: this.props.seatNo ? this.props.seatNo : '',
			Date: '',
			Accommodation: '',
			Area: '',
			DoorWidth: '',
			SmallRoomSpace: false,
			StepsOutside: '',
			KerbsOutside: '',
			RampsOutside: false,
			LiftLanding: false,
			Caretaker: '',
			SchoolName: '',
			Therapist: '',
			ContactNo: '',
			SchoolType: '',
			Residental: false,
			SchoolEquip1: '',
			SchoolEquip2: '',
			SchoolEquip3: '',
			OtherSchoolEquip: '',
			SchoolTableHeight: '',
			SchoolTableKneeClearance: '',
			LapTrayFor: '',
			Company: '',
			JobTask: '',
			CompanyTableHeight: '',
			CompanyTableKneeClearance: '',
			OtherAdaptiveEquipment: '',
			Notes: '',
			schoolList: [],
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
	GetState() {
		return {
			Controller: this.constructor.name,
			RefId: parseInt(this.state.RefId),
			SeatNo: this.state.SeatNo,
			Date: this.state.Date,
			Accommodation: this.state.Accommodation,
			Area: parseInt(this.state.Area),
			DoorWidth: parseInt(this.state.DoorWidth),
			SmallRoomSpace: this.state.SmallRoomSpace,
			StepsOutside: parseInt(this.state.StepsOutside),
			KerbsOutside: parseInt(this.state.KerbsOutside),
			RampsOutside: this.state.RampsOutside,
			LiftLanding: this.state.LiftLanding,
			Caretaker: this.state.Caretaker,
			SchoolName: this.state.SchoolName,
			Therapist: this.state.Therapist,
			ContactNo: parseFloat(this.state.ContactNo),
			SchoolType: this.state.SchoolType,
			Residental: this.state.Residental,
			SchoolEquip1: this.state.SchoolEquip1,
			SchoolEquip2: this.state.SchoolEquip2,
			SchoolEquip3: this.state.SchoolEquip3,
			OtherSchoolEquip: this.state.OtherSchoolEquip,
			SchoolTableHeight: parseInt(this.state.SchoolTableHeight),
			SchoolTableKneeClearance: parseInt(this.state.SchoolTableKneeClearance),
			LapTrayFor: this.state.LapTrayFor,
			Company: this.state.Company,
			JobTask: this.state.JobTask,
			CompanyTableHeight: parseInt(this.state.CompanyTableHeight),
			CompanyTableKneeClearance: parseInt(this.state.CompanyTableKneeClearance),
			OtherAdaptiveEquipment: this.state.OtherAdaptiveEquipment,
			Notes: this.state.Notes
		};
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
		this.props.getSchoolListSuggestion().then(x => this.setState({ schoolList: JSON.parse(x) }));
	}
	render() {
		return (
			<div className="container">
				<form className="Form" onSubmit={this.handleSubmit}>
					{this.state.schoolList.length > 0 &&
						<Suspense fallback={<div>Loading...</div>}>
						    <GetDatalist requiredType="school_list" useData={true} data={this.state.schoolList} useField={"schoolName"} /> 
						</Suspense>}
					<Suspense fallback={<div>Loading...</div>}>
						<GetDatalist requiredType="Social_Information_Accommodation" />
						<GetDatalist requiredType="Social_Information_Caretaker" />
						<GetDatalist requiredType="Social_Information_SchoolType" />
						<GetDatalist requiredType="Social_Information_SchoolEquip1" />
						<GetDatalist requiredType="Social_Information_SchoolEquip2" />
						<GetDatalist requiredType="Social_Information_SchoolEquip3" /> 
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
						<div className="col-3 p-1">
							Date:
						</div>
						<div className="col-8 p-1">
							<input value={this.state.Date} type="date" onChange={this.handleFieldChange} name="Date" required />
						</div>
					</div>
					<div className="row">
						<span className="borderedBox">
							<b>Living Environment</b>
						</span>
					</div>
					<div className="row">
						<div className="col-2">
							Type of Accommodation:
						</div>
						<div className="col-8">
							<input list="Social_Information_Accommodation" value={this.state.Accommodation} type="text" maxLength=" 255 " onChange={this.handleFieldChange} name="Accommodation" />
							&nbsp; area around  &nbsp;
						    <input className="underLined_medium" value={this.state.Area} type="number" min="-2147483648" max="2147483647" onChange={this.handleFieldChange} name="Area" />
							&nbsp; sq. ft.
						</div>
					</div>
					<div className="row">
						<div className="col-2">
							Architectural Features:
						</div>
						<div className="col-5 p-3">
							narrow door width  &nbsp;
						    <input className="underLined_short" value={this.state.DoorWidth} type="number" min="-2147483648" max="2147483647" onChange={this.handleFieldChange} name="DoorWidth" />
						</div>
						<div className="col-3 p-3">
							<label>  &nbsp; small room space  &nbsp;
					<input type="checkbox" onChange={this.handleToggle} checked={this.state.SmallRoomSpace} name="SmallRoomSpace" />
							</label>
						</div>
					</div>
					<div className="row">
						<div className="col-2">
							&nbsp;
						</div>
						<div className="col-9 p-3">
							<input className="underLined_short" value={this.state.StepsOutside} type="number" min="-2147483648" max="2147483647" onChange={this.handleFieldChange} name="StepsOutside" />
							steps outside
                            &nbsp;   &nbsp;  &nbsp;
						    <input className="underLined_short" value={this.state.KerbsOutside} type="number" min="-2147483648" max="2147483647" onChange={this.handleFieldChange} name="KerbsOutside" />
							kerbs outside

                            &nbsp; &nbsp;

						    <label>  &nbsp; ramps outside  &nbsp;
						    <input type="checkbox" onChange={this.handleToggle} checked={this.state.RampsOutside} name="RampsOutside" />
							</label>

							&nbsp; &nbsp;
						    <label>  &nbsp; Lift - landing  &nbsp;
						    <input type="checkbox" onChange={this.handleToggle} checked={this.state.LiftLanding} name="LiftLanding" />
							</label>
						</div>
					</div>

					<div className="row">
						<div className="col-2 p-3">
							Caretaker:
						</div>
						<div className="col-8 p-3">
							<input list="Social_Information_Caretaker" value={this.state.Caretaker} type="text" maxLength=" 50 " onChange={this.handleFieldChange} name="Caretaker" />
						</div>
					</div>
					<div className="row">
						<span className="borderedBox">
							<b>School / Day Program</b>
						</span>
					</div>
					<div className="row">
						<div className="col-2">
							School Name:
						</div>
						<div className="col-9">
							{this.state.schoolList.length > 0 && <GetSelectList data={this.state.schoolList} selectedValue={this.state.SchoolName} name={"SchoolName"} handleFieldChange={this.handleFieldChange} requiredType={"schoolList"} displayField={"schoolName"} valueField={"schoolName"} />}
						</div>
					</div>
					<div className="row">
						<div className="col-2 p-1">
							&nbsp;
					</div>
						<div className="col-4 p-1">
							Case Therapist:
						    <input className="underLined_long" value={this.state.Therapist} type="text" maxLength=" 50 " onChange={this.handleFieldChange} name="Therapist" />
						</div>
						<div className="col-4 p-1">
							Contact no:
						    <input className="underLined_long" value={this.state.ContactNo} type="number" step="0.0001" onChange={this.handleFieldChange} name="ContactNo" />

						</div>
					</div>
					<div className="row">
						<div className="col-2  p-1">
							Type of School  :
						</div>
						<div className="col-9 p-1">
							<input list="Social_Information_SchoolType" value={this.state.SchoolType} type="text" maxLength=" 50 " onChange={this.handleFieldChange} name="SchoolType" />
							<label>  &nbsp; Residental  &nbsp;
					<input type="checkbox" onChange={this.handleToggle} checked={this.state.Residental} name="Residental" />
							</label>
						</div>
					</div>
					<div className="row">
						<div className="col-2">
							Equipment:
						</div>
						<div className="col-2 p-2">
							Chair :
						</div>
						<div className="col-7 p-2">
							<input list="Social_Information_SchoolEquip1" value={this.state.SchoolEquip1} type="text" maxLength=" 255 " onChange={this.handleFieldChange} name="SchoolEquip1" />
						</div>
					</div>
					<div className="row">
						<div className="col-2">
							&nbsp;
						</div>
						<div className="col-2 p-2">
							Wheelchair :
						</div>
						<div className="col-7 p-2">
							<input list="Social_Information_SchoolEquip2" value={this.state.SchoolEquip2} type="text" maxLength=" 255 " onChange={this.handleFieldChange} name="SchoolEquip2" />
						</div>
					</div>
					<div className="row">
						<div className="col-2">
							&nbsp;
						</div>
						<div className="col-2 p-2">
							Cushion :
						</div>
						<div className="col-7 p-2">
							<input list="Social_Information_SchoolEquip3" value={this.state.SchoolEquip3} type="text" maxLength=" 255 " onChange={this.handleFieldChange} name="SchoolEquip3" />
						</div>
					</div>
					<div className="row">
						<div className="col-2">
							&nbsp;
						</div>
						<div className="col-2">
							Others
						</div>
						<div className="col-7">
							<input className="underLined_xtralong" value={this.state.OtherSchoolEquip} type="text" maxLength=" 255 " onChange={this.handleFieldChange} name="OtherSchoolEquip" />
						</div>
					</div>
					<div className="row">
						<div className="col-2">
							&nbsp;
						</div>
						<div className="col-9">
							table/desk surface height &nbsp;&nbsp;
					      	<input className="underLined_short" value={this.state.SchoolTableHeight} type="number" min="-2147483648" max="2147483647" onChange={this.handleFieldChange} name="SchoolTableHeight" />
							&quot;	 &nbsp;&nbsp;
						    <input className="underLined_short" value={this.state.SchoolTableKneeClearance} type="number" min="-2147483648" max="2147483647" onChange={this.handleFieldChange} name="SchoolTableKneeClearance" />
							&quot;	&nbsp;&nbsp;
						  knee clearance
						</div>
					</div>
					<div className="row">
						<div className="col-2">
							&nbsp;
						</div>
						<div className="col-9 p-2">
							lap tray used for activities including  &nbsp;&nbsp;
						    <input value={this.state.LapTrayFor} type="number" min="-2147483648" max="2147483647" onChange={this.handleFieldChange} name="LapTrayFor" />
						</div>
					</div>
					<div className="row">
						<span className="borderedBox">
							<b>Employment</b>
						</span>
					</div>
					<div className="row">
						<div className="col-2">
							Company :
 						</div>
						<div className="col-9">
							<input className="underLined_xtralong" value={this.state.Company} type="text" maxLength=" 255 " onChange={this.handleFieldChange} name="Company" />
						</div>
					</div>
					<div className="row">
						<div className="col-2">
							Job Task :
						</div>
						<div className="col-9">
							<input className="underLined_xtralong" value={this.state.JobTask} type="text" maxLength=" 255 " onChange={this.handleFieldChange} name="JobTask" />
						</div>
					</div>
					<div className="row">
						<div className="col-2">
							Equipment:
						</div>
						<div className="col-9">
							table/desk suface height
						<input className="underLined_short" value={this.state.CompanyTableHeight} type="number" min="-2147483648" max="2147483647" onChange={this.handleFieldChange} name="CompanyTableHeight" />
							&quot;	 &nbsp;
						<input className="underLined_short" value={this.state.CompanyTableKneeClearance} type="number" min="-2147483648" max="2147483647" onChange={this.handleFieldChange} name="CompanyTableKneeClearance" />
							&quot;	&nbsp;
						  knee clearance
						</div>
					</div>
					<div className="row">
						<div className="col-2">
							&nbsp;
						</div>
						<div className="col-9">
							other adaptive equipment: &nbsp;
						<input className="underLined_long" value={this.state.OtherAdaptiveEquipment} type="text" maxLength=" 255 " onChange={this.handleFieldChange} name="OtherAdaptiveEquipment" />
						</div>
					</div>
					<div className="row">
						<div className="col-3 ">
							Notes:
						</div>
						<div className="col-9 p-2">
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
