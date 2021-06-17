const HandleAfterSubmit_toast = React.lazy(() => import('/js/shared/HandleAfterSubmit_toast.jsx'));
import getDisplayDate from '/js/shared/getDisplayDate.js';


export default class Problem_Objective_List_InputForm extends React.Component {
    constructor(props) {
        super(props);
        //gen
        this.state = {
            RefId: this.props.pid,
            SeatNo: this.props.seatNo ? this.props.seatNo : '',
            Date: '',
            Deformity1: false,
            Deformity2: false,
            Deformity3: false,
            Deformity4: '',
            Deformity5: '',
            PressureArea1: false,
            PressureArea2: false,
            PressureArea3: '',
            PressureArea4: '',
            SitPosture1: false,
            SitPosture2: false,
            SitPosture3: '',
            SitPosture4: '',
            SitTolerance1: false,
            SitTolerance2: false,
            SitTolerance3: false,
            SitTolerance4: '',
            SitTolerance5: '',
            Ambulation1: false,
            Ambulation2: false,
            Ambulation3: false,
            Ambulation4: false,
            Ambulation5: '',
            Ambulation6: '',
            Ulfunction1: false,
            Ulfunction2: false,
            Ulfunction3: false,
            Ulfunction4: '',
            Ulfunction5: '',
            FunctionalSkills1: false,
            FunctionalSkills2: false,
            FunctionalSkills3: false,
            FunctionalSkills4: false,
            FunctionalSkills5: '',
            FunctionalSkills6: '',
            Notes: '',
            resetSubmit_p_func: this.props.resetSubmit
        };
        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    //20200811 Carlos Go to top
    handleSubmitAfterPosition() {
        console.log("handleSubmitAfterPosition")
        $('html,body').animate({
            scrollTop: $(".Form").offset().top
        }, 'slow');
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
    GetState() {
        return {
            Controller: this.constructor.name,
            RefId: parseInt(this.state.RefId),
            SeatNo: this.state.SeatNo,
            Date: this.state.Date,
            Deformity1: this.state.Deformity1,
            Deformity2: this.state.Deformity2,
            Deformity3: this.state.Deformity3,
            Deformity4: this.state.Deformity4,
            Deformity5: this.state.Deformity5,
            PressureArea1: this.state.PressureArea1,
            PressureArea2: this.state.PressureArea2,
            PressureArea3: this.state.PressureArea3,
            PressureArea4: this.state.PressureArea4,
            SitPosture1: this.state.SitPosture1,
            SitPosture2: this.state.SitPosture2,
            SitPosture3: this.state.SitPosture3,
            SitPosture4: this.state.SitPosture4,
            SitTolerance1: this.state.SitTolerance1,
            SitTolerance2: this.state.SitTolerance2,
            SitTolerance3: this.state.SitTolerance3,
            SitTolerance4: this.state.SitTolerance4,
            SitTolerance5: this.state.SitTolerance5,
            Ambulation1: this.state.Ambulation1,
            Ambulation2: this.state.Ambulation2,
            Ambulation3: this.state.Ambulation3,
            Ambulation4: this.state.Ambulation4,
            Ambulation5: this.state.Ambulation5,
            Ambulation6: this.state.Ambulation6,
            Ulfunction1: this.state.Ulfunction1,
            Ulfunction2: this.state.Ulfunction2,
            Ulfunction3: this.state.Ulfunction3,
            Ulfunction4: this.state.Ulfunction4,
            Ulfunction5: this.state.Ulfunction5,
            FunctionalSkills1: this.state.FunctionalSkills1,
            FunctionalSkills2: this.state.FunctionalSkills2,
            FunctionalSkills3: this.state.FunctionalSkills3,
            FunctionalSkills4: this.state.FunctionalSkills4,
            FunctionalSkills5: this.state.FunctionalSkills5,
            FunctionalSkills6: this.state.FunctionalSkills6,
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
                    {/* gen */}
                    <div className="row">
                        <div className="col-3 p-2">
                            Age / Seat_No:
						</div>
                        <div className="col-1 p-2">
                            <input className="box_short" value={this.props.age} type="number" name="age" disabled />
                        </div>
                        <div className="col-8 p-2">
                            <input value={this.state.SeatNo} type="text" maxLength=" 50 " onChange={this.handleFieldChange} name="SeatNo" disabled={this.props.isFormUpdate()} required />
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
                        <div className="col-3 p-2">
                            <h3>Problem</h3>
                        </div>
                        <div className="col-9 p-2">
                            <h3>Objectives</h3>
                        </div>
                    </div>
                    <hr />
                    <div className="row">
                        <div className="col-3">
                            Deformity
						</div>
                        <div className="col-9 p-1 largeChkBoxDiv">
                            <label>
                                <input type="checkbox" onChange={this.handleToggle} checked={this.state.Deformity1} name="Deformity1" />
								&nbsp;  to prevent deformity  &nbsp;
							</label >
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3">
                            &nbsp;
						</div>
                        <div className="col-9 p-1">
                            <label>
                                <input type="checkbox" onChange={this.handleToggle} checked={this.state.Deformity2} name="Deformity2" />
								&nbsp;  to correct deformity   &nbsp;
							</label >
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3">
                            &nbsp;
						</div>
                        <div className="col-9 p-1">
                            <label>
                                <input type="checkbox" onChange={this.handleToggle} checked={this.state.Deformity3} name="Deformity3" />
								&nbsp;   to accommodate deformity  &nbsp;
							</label >
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3">
                            &nbsp;
						</div>
                        <div className="col-9 p-1">
                            <input className="underLined_xtralong" value={this.state.Deformity4} type="text" maxLength=" 255 " onChange={this.handleFieldChange} name="Deformity4" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3">
                            &nbsp;
						</div>
                        <div className="col-9 p-1">
                            <input className="underLined_xtralong" value={this.state.Deformity5} type="text" maxLength=" 255 " onChange={this.handleFieldChange} name="Deformity5" />
                        </div>
                    </div>
                    <hr />
                    <div className="row">
                        <div className="col-3">
                            Pressure area / sore:
						</div>
                        <div className="col-9 p-1">
                            <label>

                                <input type="checkbox" onChange={this.handleToggle} checked={this.state.PressureArea1} name="PressureArea1" />
								&nbsp;  to reduce pressure area  &nbsp;
							</label >
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3">
                            &nbsp;
						</div>
                        <div className="col-9 p-1">
                            <label>
                                <input type="checkbox" onChange={this.handleToggle} checked={this.state.PressureArea2} name="PressureArea2" />
								&nbsp;  to reduce pressure sore  &nbsp;
							</label >
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3">
                            &nbsp;
						</div>
                        <div className="col-9 p-1">
                            <input className="underLined_xtralong" value={this.state.PressureArea3} type="text" maxLength=" 255 " onChange={this.handleFieldChange} name="PressureArea3" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3">
                            &nbsp;
						</div>
                        <div className="col-9 p-1">
                            <input className="underLined_xtralong" value={this.state.PressureArea4} type="text" maxLength=" 255 " onChange={this.handleFieldChange} name="PressureArea4" />
                        </div>
                    </div>
                    <hr />
                    <div className="row">
                        <div className="col-3">
                            Poor sitting posture
						</div>
                        <div className="col-9 p-1">
                            <label>
                                <input type="checkbox" onChange={this.handleToggle} checked={this.state.SitPosture1} name="SitPosture1" />
								&nbsp;  to position functionality at home  &nbsp;
							</label >
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3">
                            &nbsp;
						</div>
                        <div className="col-9 p-1">
                            <label>
                                <input type="checkbox" onChange={this.handleToggle} checked={this.state.SitPosture2} name="SitPosture2" />
								&nbsp; to position functionality at school/institution &nbsp;
							</label >
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3">
                            &nbsp;
						</div>
                        <div className="col-9 p-1">
                            <input className="underLined_xtralong" value={this.state.SitPosture3} type="text" maxLength=" 255 " onChange={this.handleFieldChange} name="SitPosture3" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3">
                            &nbsp;
						</div>
                        <div className="col-9 p-1">
                            <input className="underLined_xtralong" value={this.state.SitPosture4} type="text" maxLength=" 255 " onChange={this.handleFieldChange} name="SitPosture4" />
                        </div>
                    </div>
                    <hr />
                    <div className="row">
                        <div className="col-3">
                            Poor sitting tolerance
						</div>
                        <div className="col-9 p-1">
                            <label>
                                <input type="checkbox" onChange={this.handleToggle} checked={this.state.SitTolerance1} name="SitTolerance1" />
								&nbsp;  to improve sitting tolerance  &nbsp;
							</label >
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3">
                            &nbsp;
						</div>
                        <div className="col-9 p-1">
                            <label>
                                <input type="checkbox" onChange={this.handleToggle} checked={this.state.SitTolerance2} name="SitTolerance2" />
								&nbsp; to minimize sliding out from chair  &nbsp;
							</label >
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3">
                            &nbsp;
						</div>
                        <div className="col-9 p-1">
                            <label>
                                <input type="checkbox" onChange={this.handleToggle} checked={this.state.SitTolerance3} name="SitTolerance3" />
								&nbsp;  to minimize frequency for re-positioning &nbsp;
							</label >
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3">
                            &nbsp;
			</div>
                        <div className="col-9 p-1">
                            <input className="underLined_xtralong" value={this.state.SitTolerance4} type="text" maxLength=" 255 " onChange={this.handleFieldChange} name="SitTolerance4" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3">
                            &nbsp;
			</div>
                        <div className="col-9 p-1">
                            <input className="underLined_xtralong" value={this.state.SitTolerance5} type="text" maxLength=" 255 " onChange={this.handleFieldChange} name="SitTolerance5" />
                        </div>
                    </div>
                    <hr />
                    <div className="row">
                        <div className="col-3">
                            Impaired Ambulation
			</div>
                        <div className="col-9 p-1">
                            <label>
                                <input type="checkbox" onChange={this.handleToggle} checked={this.state.Ambulation1} name="Ambulation1" />
								&nbsp;  to encourage self ambulation  &nbsp;
							</label >
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3">
                            &nbsp;
			</div>
                        <div className="col-9 p-1">
                            <label>
                                <input type="checkbox" onChange={this.handleToggle} checked={this.state.Ambulation2} name="Ambulation2" />
								&nbsp;  to encourage assisted ambulation  &nbsp;
							</label >
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3">
                            &nbsp;
			</div>
                        <div className="col-9 p-1">
                            <label>
                                <input type="checkbox" onChange={this.handleToggle} checked={this.state.Ambulation3} name="Ambulation3" />
								&nbsp;  to facilitate outdoor transportation &nbsp;
							</label >
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3">
                            &nbsp;
			</div>
                        <div className="col-9 p-1">
                            <label>
                                <input type="checkbox" onChange={this.handleToggle} checked={this.state.Ambulation4} name="Ambulation4" />
								&nbsp;  to encourage powered mobility  &nbsp;
							</label >
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3">
                            &nbsp;
			</div>
                        <div className="col-9 p-1">
                            <input className="underLined_xtralong" value={this.state.Ambulation5} type="text" maxLength=" 255 " onChange={this.handleFieldChange} name="Ambulation5" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3">
                            &nbsp;
			</div>
                        <div className="col-9 p-1">
                            <input className="underLined_xtralong" value={this.state.Ambulation6} type="text" maxLength=" 255 " onChange={this.handleFieldChange} name="Ambulation6" />
                        </div>
                    </div>
                    <hr />
                    <div className="row">
                        <div className="col-3">
                            Impaired upper limb function
			</div>
                        <div className="col-9 p-1">
                            <label>
                                <input type="checkbox" onChange={this.handleToggle} checked={this.state.Ulfunction1} name="Ulfunction1" />
								&nbsp;  control spasticity &nbsp;
							</label >
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3">
                            &nbsp;
			</div>
                        <div className="col-9 p-1">
                            <label>
                                <input type="checkbox" onChange={this.handleToggle} checked={this.state.Ulfunction2} name="Ulfunction2" />
								&nbsp;  to improve upper limb reach  &nbsp;
							</label >
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3">
                            &nbsp;
			</div>
                        <div className="col-9 p-1">
                            <label>
                                <input type="checkbox" onChange={this.handleToggle} checked={this.state.Ulfunction3} name="Ulfunction3" />
								&nbsp;  to improve upper limb prehension  &nbsp;
							</label >
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3">
                            &nbsp;
			</div>
                        <div className="col-9 p-1">
                            <input className="underLined_xtralong" value={this.state.Ulfunction4} type="text" maxLength=" 255 " onChange={this.handleFieldChange} name="Ulfunction4" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3">
                            &nbsp;
			</div>
                        <div className="col-9 p-1">
                            <input className="underLined_xtralong" value={this.state.Ulfunction5} type="text" maxLength=" 255 " onChange={this.handleFieldChange} name="Ulfunction5" />
                        </div>
                    </div>
                    <hr />
                    <div className="row">
                        <div className="col-3">
                            Poor basic functional skills
			</div>
                        <div className="col-9 p-1">
                            <label>
                                <input type="checkbox" onChange={this.handleToggle} checked={this.state.FunctionalSkills1} name="FunctionalSkills1" />
								&nbsp;improve feeding  &nbsp;
							</label >
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3">
                            &nbsp;
			</div>
                        <div className="col-9 p-1">
                            <label>
                                <input type="checkbox" onChange={this.handleToggle} checked={this.state.FunctionalSkills2} name="FunctionalSkills2" />
								&nbsp;  to improve respiratory function  &nbsp;
							</label >
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3">
                            &nbsp;
			</div>
                        <div className="col-9 p-1">
                            <label>
                                <input type="checkbox" onChange={this.handleToggle} checked={this.state.FunctionalSkills3} name="FunctionalSkills3" />
								&nbsp;  to improve communication &nbsp;
							</label >
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3">
                            &nbsp;
			</div>
                        <div className="col-9 p-1">
                            <label>
                                <input type="checkbox" onChange={this.handleToggle} checked={this.state.FunctionalSkills4} name="FunctionalSkills4" />
								&nbsp;  to improve eye tracking &nbsp;
							</label >
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3">
                            &nbsp;
			</div>
                        <div className="col-9 p-1">
                            <input className="underLined_xtralong" value={this.state.FunctionalSkills5} type="text" maxLength=" 255 " onChange={this.handleFieldChange} name="FunctionalSkills5" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3">
                            &nbsp;
			</div>
                        <div className="col-9 p-1">
                            <input className="underLined_xtralong" value={this.state.FunctionalSkills6} type="text" maxLength=" 255 " onChange={this.handleFieldChange} name="FunctionalSkills6" />
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