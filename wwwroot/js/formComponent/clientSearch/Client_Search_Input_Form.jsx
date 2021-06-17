import scrollToReference from '/js/shared/scrollToReference.js';
const GetCardGrid = React.lazy(() => import('/js/shared/GetCardGridRevamp.jsx'));

export default class Client_Search_Input_Form extends React.Component {
    constructor(props) {
        super(props);
        //gen
        this.state = {
            data: [],
            LastName: '',
            FirstName: '',
            ChineseName: '',
            SeatNo: '',
            Hkid: '',
            search_result_msg: '',
            isSubmitClicked: false,
            LoanNo: '',
            LoanWheelChairNo: '',
            WheelchairWidth: '',
            WheelchairDepth: '',
            WheelchairWidth_adjustment: '',
            WheelchairDepth_adjustment: '',
            PandaSize: '',
            WheelchairPandaSize_adjustment: '',
            IsShowAll: false,
            IsRearWheel_S: null,
            IsRearWheel_L: null,
            IsFoldable: null,
            IsPower: null,
            IsElevateFootrest: null,
            IsRecliner: null,
            IsTilt: null,
            IsFilterWCResultBySpec: false,
            IsWarning: false,
            IsError: false,
            activePart: 'part1'
        };
        this.searchRef = React.createRef();
        this.ShowMore = this.ShowMore.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleFieldChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }
    updateDisabledPart = (e) => {
        this.setState({ [e.target.name]: e.target.value, data: [], search_result_msg: '' });
    }
    handleToggle = ({ target }) => {
        this.setState(s => ({ ...s, [target.name]: !s[target.name] }))
    }
    GetClientState() {
        return {
            Controller: this.constructor.name,
            LastName: this.state.LastName.trim(),
            FirstName: this.state.FirstName.trim(),
            ChineseName: this.state.ChineseName.trim(),
            SeatNo: this.state.SeatNo.trim(),
            Hkid: this.state.Hkid.trim()
        };
    }
    GetLoanState() {
        return {
            Controller: this.constructor.name,
            SeatNo: this.state.SeatNo.trim(),
            LoanNo: this.state.LoanNo,
            LoanWheelChairNo: this.state.LoanWheelChairNo
        }
    }
    GetWCState() {
        return {
            Controller: this.constructor.name,
            WheelchairWidth_base: this.state.WheelchairWidth !== '' ? parseInt(this.state.WheelchairWidth) : null,
            WheelchairDepth_base: this.state.WheelchairDepth !== '' ? parseInt(this.state.WheelchairDepth) : null,
            WheelchairWidth_upper: this.state.WheelchairWidth !== '' ? this.getWCMeasureDimension_upperRange("w") : null,
            WheelchairDepth_upper: this.state.WheelchairDepth !== '' ? this.getWCMeasureDimension_upperRange("d") : null,
            PandaSize_base: this.state.PandaSize !== '' ? parseInt(this.state.PandaSize) : null,
            WheelchairPandaSize_upper: this.state.WheelchairPandaSize_adjustment !== '' ? this.getWCMeasureDimension_upperRange("p") : null,
            IsShowAll: this.state.IsShowAll,
            IsRearWheel_S: this.state.IsRearWheel_S,
            IsRearWheel_L: this.state.IsRearWheel_L,
            IsFoldable: this.state.IsFoldable,
            IsPower: this.state.IsPower,
            IsElevateFootrest: this.state.IsElevateFootrest,
            IsRecliner: this.state.IsRecliner,
            IsTilt: this.state.IsTilt,
            IsFilterWCResultBySpec: this.state.IsFilterWCResultBySpec
        }
    }
    getWCMeasureDimension_upperRange(filedName) {
        switch (filedName) {
            case "w": {
                let tmp_width = parseInt(this.state.WheelchairWidth);
                let tmp_width_adj = this.state.WheelchairWidth_adjustment === '' ? 0 : parseInt(this.state.WheelchairWidth_adjustment);
                return tmp_width + tmp_width_adj;
            }
            case "d": {
                let tmp_depth = parseInt(this.state.WheelchairDepth);
                let tmp_depth_adj = this.state.WheelchairDepth_adjustment === '' ? 0 : parseInt(this.state.WheelchairDepth_adjustment);
                return tmp_depth + tmp_depth_adj;
            }
            case "p": {
                let tmp_panda = parseInt(this.state.PandaSize);
                let tmp_panda_adj = this.state.WheelchairPandaSize_adjustment === '' ? 0 : parseInt(this.state.WheelchairPandaSize_adjustment);
                return tmp_panda + tmp_panda_adj;
            }
        }
    }
    ShowMore(input, btn) {
        btn.preventDefault();
        if (btn.target.value === "client") {
            this.props.pageEmitter("client", true, this.state.data[input].SeatNo);
        } else if (btn.target.value === "wheelchair") {
            this.props.pageEmitter("wheelchair", true, this.state.data[input].WheelchairNo);
        }
    }
    async handleSubmit(e) {
        e.preventDefault();
        let inputObject;
        if (this.state.activePart === 'part1')
            inputObject = this.GetClientState();
        else if (this.state.activePart === 'part2')
            inputObject = this.GetLoanState();
        else if (this.state.activePart === 'part3')
            inputObject = this.GetWCState();
        else
            return;
        let inputCriteria = Object.entries(inputObject).reduce((a, [k, v]) => (v ? (a[k] = v, a) : a), {});
        if (Object.keys(inputCriteria).length == 1) {
            this.setState({ search_result_msg: "Please input at least one filtering criteria", isSubmitClicked: true, IsWarning: true });
            return;
        }
        this.setState({ data: [] });
        var nonEmptyKeys = Object.keys(inputCriteria).filter(s => s !== "Controller");
        var displayMsg = "Your search with : " + nonEmptyKeys;
        this.props.handleServerSubmit('POST', this.state.activePart, JSON.stringify(inputCriteria)).then((raw) => {
            let resultLst = JSON.parse(raw);
            let searchResult_str = resultLst && resultLst.length > 0 ? displayMsg + " , record shows below: " : displayMsg + " has no record found";
            this.setState({ data: resultLst, search_result_msg: searchResult_str, isSubmitClicked: true, IsError: false, IsWarning: false });
        }).catch((response) => {
            this.setState({ search_result_msg: this.props.submitMessage, isSubmitClicked: true, IsError: true });
            throw response
        })
        scrollToReference(this.searchRef);
    }
    isNeedAlert = () => { return this.state.IsError || this.state.IsWarning; }
    render() {
        const disabledComponent = {
            pointerEvents: "none", opacity: "0.3"
        };
        return (
            <div className="card card-primary card-outline">
                <div className="card-header">
                    <h3 className="card-title"><i className="fas fa-search"></i> &nbsp; Quick Search Criteria</h3>
                </div>
                <div className="card-body">

                    <form className="Form" onSubmit={this.handleSubmit}>
                        <div className="row p-1">
                            <label>
                                <input type="radio" id="part1" value="part1" name="activePart" defaultChecked onChange={this.updateDisabledPart} />
                            &nbsp; Search Client
                        </label>
                        </div>

                        <div id="part1" style={this.state.activePart === 'part1' ? {} : disabledComponent}>

                            <div className="form-group row">
                                <label htmlFor="LastName" className="col-lg-2 col-form-label">Name &nbsp; (Last, First):</label>
                                <div className="col-lg-5">
                                    <input value={this.state.LastName} type="text" maxLength=" 255 " onChange={this.handleFieldChange} className="form-control" placeholder="Last Name" name="LastName" />
                                </div>
                                <div className="col-lg-5">
                                    <input value={this.state.FirstName} type="text" maxLength=" 255 " onChange={this.handleFieldChange} className="form-control" placeholder="First Name" name="FirstName" />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="ChineseName" className="col-lg-2 col-form-label">中文姓名:</label>
                                <div className="col-lg-10">
                                    <input value={this.state.ChineseName} type="text" maxLength=" 50 " onChange={this.handleFieldChange} className="form-control" placeholder="Chinese Name" name="ChineseName" />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="Hkid" className="col-lg-2 col-form-label">ID No:</label>
                                <div className="col-lg-4">
                                    <input value={this.state.Hkid} type="text" maxLength=" 11 " onChange={this.handleFieldChange} className="form-control" placeholder="HKID" name="Hkid" />
                                </div>
                                <label htmlFor="SeatNo" className="col-lg-2 col-form-label">Seat No:</label>
                                <div className="col-lg-4">
                                    <input value={this.state.SeatNo} type="text" maxLength=" 13 " onChange={this.handleFieldChange} className="form-control" placeholder="SeatNo" name="SeatNo" />
                                </div>
                            </div>
                        </div>
                        <div className="row p-1">
                            <label>
                                <input type="radio" id="part2" value="part2" name="activePart" onChange={this.updateDisabledPart} />
                            &nbsp; Search Loan Record
                        </label>
                        </div>
                        <div id="part2" style={this.state.activePart === 'part2' ? {} : disabledComponent}>

                            <div className="form-group row">
                                <label htmlFor="SeatNo" className="col-lg-2 col-form-label">Seat No:</label>
                                <div className="col-lg-4">
                                    <input value={this.state.SeatNo} type="text" maxLength=" 13 " onChange={this.handleFieldChange} className="form-control" placeholder="Seat No" name="SeatNo" />
                                </div>
                                <label htmlFor="LoanNo" className="col-lg-2 col-form-label">Loan From No:</label>
                                <div className="col-lg-4">
                                    <input value={this.state.LoanNo} type="text" maxLength=" 13 " onChange={this.handleFieldChange} className="form-control" placeholder="Loan No" name="LoanNo" />
                                </div>
                            </div>

                            <div className="form-group row">
                                <label htmlFor="LoanWheelChairNo" className="col-lg-2 col-form-label">WheelChair No:</label>
                                <div className="col-lg-4">
                                    <input value={this.state.LoanWheelChairNo} type="text" maxLength=" 13 " onChange={this.handleFieldChange} className="form-control" placeholder="WheelChair No" name="LoanWheelChairNo" />
                                </div>
                            </div>

                        </div>
                        <div className="row p-1">
                            <label>
                                <input type="radio" id="part3" value="part3" name="activePart" onChange={this.updateDisabledPart} />
                            &nbsp; Search Wheelchair
                            </label>
                        </div>
                        <div id="part3" style={this.state.activePart === 'part3' ? {} : disabledComponent}>

                            <div className="form-group row">
                                <label htmlFor="WheelchairWidth" className="col-lg-2 col-form-label"> Width(&apos;	&apos;	):</label>
                                <div className="col-lg-2">
                                    <input value={this.state.WheelchairWidth} type="number" maxLength="2" onChange={this.handleFieldChange} className="form-control" placeholder="0" name="WheelchairWidth" />
                                </div>
                                <label htmlFor="WheelchairWidth_adjustment" className="col-md-1 col-form-label">+</label>
                                <div className="col-lg-1">
                                    <select className="form-control" value={this.state.WheelchairWidth_adjustment} name="WheelchairWidth_adjustment" onChange={this.handleFieldChange}><option>0</option><option>1</option><option>2</option></select>
                                </div>
                            </div>

                            <div className="form-group row">
                                <label htmlFor="WheelchairDepth" className="col-lg-2 col-form-label"> Depth(&apos;	&apos;	):</label>
                                <div className="col-lg-2">
                                    <input value={this.state.WheelchairDepth} type="number" maxLength="2" onChange={this.handleFieldChange} className="form-control" placeholder="0" name="WheelchairDepth" />
                                </div>
                                <label htmlFor="WheelchairDepth_adjustment" className="col-md-1 col-form-label">+</label>
                                <div className="col-lg-1">
                                    <select className="form-control" value={this.state.WheelchairDepth_adjustment} name="WheelchairDepth_adjustment" onChange={this.handleFieldChange}><option>0</option><option>1</option><option>2</option></select>
                                </div>
                            </div>

                            <div className="form-group row">
                                <label htmlFor="PandaSize" className="col-lg-2 col-form-label"> Panda Size:</label>
                                <div className="col-lg-2">
                                    <input value={this.state.PandaSize} type="number" maxLength="2" onChange={this.handleFieldChange} className="form-control" placeholder="0" name="PandaSize" />
                                </div>
                                <label htmlFor="WheelchairPandaSize_adjustment" className="col-md-1 col-form-label">+</label>
                                <div className="col-lg-1">
                                    <select className="form-control" value={this.state.WheelchairPandaSize_adjustment} name="WheelchairPandaSize_adjustment" onChange={this.handleFieldChange}><option>0</option><option>1</option><option>2</option></select>
                                </div>
                            </div>

                            <div className="form-group row align-items-center ">

                                <label htmlFor="IsRearWheel_L" className="col-lg-2 col-form-label">Rear Wheel  : &nbsp;</label>

                                <div className="col-lg-1 form-check">
                                    <input type="checkbox" className="form-check-input" onChange={this.handleToggle} checked={this.state.IsRearWheel_L} name="IsRearWheel_L" />
                                    <label className="form-check-label" htmlFor="IsRearWheel_L">Large</label>
                                </div>
                                <div className="col-lg-1"> &nbsp;</div>
                                <div className="col-lg-1 form-check">
                                    <input type="checkbox" className="form-check-input" onChange={this.handleToggle} checked={this.state.IsRearWheel_S} name="IsRearWheel_S" />
                                    <label className="form-check-label" htmlFor="IsRearWheel_S">Small</label>
                                </div>

                            </div>

                            <div className="form-group row align-items-center">

                                <div className="col-lg-2"> &nbsp;</div>

                                <div className="col-lg-2 form-check">
                                    <input type="checkbox" className="form-check-input" onChange={this.handleToggle} checked={this.state.IsRecliner} name="IsRecliner" />
                                    <label className="form-check-label" htmlFor="IsRecliner">It can recline</label>
                                </div>
                                <div className="col-lg-3 form-check">
                                    <input type="checkbox" className="form-check-input" onChange={this.handleToggle} checked={this.state.IsElevateFootrest} name="IsElevateFootrest" />
                                    <label className="form-check-label" htmlFor="IsElevateFootrest">It can elevate footrest</label>
                                </div>

                            </div>

                            <div className="form-group row align-items-center">

                                <div className="col-lg-2"> &nbsp;</div>

                                <div className="col-lg-6 form-check">
                                    <input type="checkbox" className="form-check-input" onChange={this.handleToggle} checked={this.state.IsShowAll} name="IsShowAll" />
                                    <label className="form-check-label" htmlFor="IsShowAll">Also include unavaiable wheelchair</label>
                                </div>
                            </div>

                            <div className="form-group row align-items-center">
                                <div className="col-lg-2"> &nbsp;</div>
                                <div className="col-lg-6 form-check">
                                    <input type="checkbox" className="form-check-input" onChange={this.handleToggle} checked={this.state.IsFilterWCResultBySpec} name="IsFilterWCResultBySpec" />
                                    <label className="form-check-label" htmlFor="IsShowAll">Filter the wheelchair result by model specification</label>
                                </div>
                            </div>

                            <div className="form-group row align-items-center" style={this.state.IsFilterWCResultBySpec ? {} : disabledComponent}>
                                <div className="col-lg-2"> &nbsp;</div>
                                <div className="col-lg-2 form-check">
                                    <input type="checkbox" className="form-check-input" onChange={this.handleToggle} checked={this.state.IsTilt} name="IsTilt" />
                                    <label className="form-check-label" htmlFor="IsTilt">Is Tilt-in-space</label>
                                </div>
                                <div className="col-lg-2 form-check">
                                    <input type="checkbox" className="form-check-input" onChange={this.handleToggle} checked={this.state.IsPower} name="IsPower" />
                                    <label className="form-check-label" htmlFor="IsPower">Is Powered</label>
                                </div>
                                <div className="col-lg-2 form-check">
                                    <input type="checkbox" className="form-check-input" onChange={this.handleToggle} checked={this.state.IsFoldable} name="IsFoldable" />
                                    <label className="form-check-label" htmlFor="IsFoldable">Is Foldable</label>
                                </div>
                            </div>

                        </div>

                        <div className="row col-lg-2 col-sm-12 float-right">
                            <button type="submit" className="btn btn-info float-right" style={{ width :"100%"}}><i className="fas fa-search"></i> Search</button>
                        </div>
                        <p>&nbsp;</p>
                        {this.state.isSubmitClicked && <div> <span style={this.isNeedAlert() ? { color: 'red' } : {}}>{this.state.search_result_msg} </span><br /></div>}

                        <div ref={this.searchRef} ></div>
                        {this.state.data.length > 0 && this.state.activePart == 'part1' &&
                            <Suspense fallback={<div>Loading...</div>}>
                                <GetCardGrid data={this.state.data} a_card_header="SeatNo" hidden_fields="" is_minimal_fields={true} minimal_fields={"SeatNo,Hkid,LastName,FirstName,ChineseName,Sex,Dob"}>
                                    <button handler={this.ShowMore} uni_key="itemKey" css_class_name="" value="client" type="button" className="btn btn-secondary"><i className="fas fa-folder-open"></i> More...</button>
                                </GetCardGrid>
                            </Suspense>
                        }
                        {this.state.data.length > 0 && this.state.activePart == 'part2' &&
                            <Suspense fallback={<div>Loading...</div>}>
                                <GetCardGrid data={this.state.data} a_card_header="LoanFormNo" hidden_fields="TelOffice,Address,Witness,Rank" is_minimal_fields={false} minimal_fields="">
                                    <button handler={this.ShowMore} uni_key="itemKey" css_class_name="" value="client" type="button" className="btn btn-secondary"><i className="fas fa-folder-open"></i> More...</button>
                                </GetCardGrid>
                            </Suspense>
                        }
                        {this.state.data.length > 0 && this.state.activePart == 'part3' &&
                            <Suspense fallback={<div>Loading...</div>}>
                                <GetCardGrid data={this.state.data} a_card_header="WheelchairNo" hidden_fields="LabelPrinted" is_minimal_fields={false}>
                                    <button handler={this.ShowMore} uni_key="itemKey" css_class_name="" value="wheelchair" type="button" className="btn btn-secondary"><i className="fas fa-folder-open"></i> More...</button>
                                </GetCardGrid>
                            </Suspense>}
                    </form>
                </div >
            </div >
        );
    }
} 