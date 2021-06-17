import GetDatalist from '/js/shared/GetDatalist.jsx';
import GetSelectList from '/js/shared/GetSelectList.jsx';
import GetDatalistRegion from '/js/shared/GetDatalistRegion.jsx';
import getDisplayDate from '/js/shared/getDisplayDate.js';
export default class Client_Information_InputForm_Revamp extends React.Component {
    constructor(props) {
        super(props);
        //gen
        this.state = {
            SeatNo: '(available after submit)',
            Hkid: '',
            LastName: '',
            FirstName: '',
            ChineseName: '',
            Sex: '',
            Age1stAtt: '',
            Dob: '',
            TelHome: '',
            TelDay: '',
            Address: '',
            District: '',
            Region: '',
            _1stDate: '',
            Diagnosis: '',
            Complications: '',
            MedicalHx: '',
            Reason: '',
            Alive: false,
            clientAge: '',
            submitMessage: ''
        };
    }
    handleFieldChange = ({ target }) => {
        this.setState({ [target.name]: target.value });
    }
    handleToggle = ({ target }) => {
        this.setState(s => ({ ...s, [target.name]: !s[target.name] }))
    }
    async componentDidMount() {
        if (this.props.isFormUpdate()) {
            //get Client Information
            this.props.getClientInformation().then(getData => {
                for (let prop in getData) {
                    if ((prop == 'Dob' || prop == '_1stDate') && getData[prop])
                        this.setState({ [prop]: getDisplayDate(getData[prop]) });
                    else
                        if (getData[prop])
                            this.setState({ [prop]: getData[prop] });
                }
            }).catch((response) => {
                throw response;
            });
            //get age 
            this.props.getAge().then(getData => {
                this.setState({ clientAge: getData })
            });
        }
    }
    GetState() {
        return {
            Controller: 'Client_Information',
            SeatNo: this.state.SeatNo,
            Hkid: this.state.Hkid.toUpperCase(),
            LastName: this.state.LastName.toUpperCase(),
            FirstName: this.state.FirstName.toUpperCase(),
            ChineseName: this.state.ChineseName,
            Sex: this.state.Sex ? this.state.Sex : " ",//cater for trans gender or miscellaneous
            Age1stAtt: parseInt(this.state.Age1stAtt),
            Dob: this.state.Dob === '' ? null : this.state.Dob,
            TelHome: parseInt(this.state.TelHome),
            TelDay: parseInt(this.state.TelDay),
            Address: this.state.Address,
            District: this.state.District,
            Region: this.state.Region,
            _1stDate: this.state._1stDate === '' ? null : this.state._1stDate,
            Diagnosis: this.state.Diagnosis,
            Complications: this.state.Complications,
            MedicalHx: this.state.MedicalHx,
            Reason: this.state.Reason,
            Alive: this.state.Alive
        };
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.handleSubmitAfterPosition();
        // update or create
        if (this.props.isFormUpdate()) {
            this.props.onFormModify(this.GetState());
        } else {
            this.props.onFormCreate(this.GetState()).then(r => this.setState({ SeatNo: JSON.parse(r).seatNo }));
        }
    }
    //20200811 Carlos Go to top
    handleSubmitAfterPosition() {
        console.log("handleSubmitAfterPosition")
        $('html,body').animate({
            scrollTop: $(".Form").offset().top
        }, 'slow');
    }
    render() {
        const sexList = [{ val: " " }, { val: "M" }, { val: "F" }];
        return (
            <div className="container">
                <form className="Form" onSubmit={this.handleSubmit}>
                    <GetDatalist requiredType="region" />
                    {/* gen */}
                    <div className="row">
                        <div className="col-lg-3 p-1">
                            Age / Seat number:
                        </div>
                        <div className="col-lg-1 p-1">
                            <input className="box_short" value={this.state.clientAge} type="number" name="age" disabled />
                        </div>
                        <div className="col-lg-3 p-1">
                            <input value={this.state.SeatNo} type="text" minLength=" 7 " maxLength=" 13 " onChange={this.handleFieldChange} name="SeatNo" disabled={this.props.isFormUpdate()} required />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-3 p-1">
                            HKID:
                        </div>
                        <div className="col-lg-3 p-1">
                            <input value={this.state.Hkid} type="text" maxLength=" 11 " onChange={this.handleFieldChange} name="Hkid" pattern="[A-Za-z]{1,2}[0-9]{6}\([Aa0-9]{1}\)" required />
                        </div>
                        <div className="col-lg-3 p-1">
                            Sex:
                        </div>
                        <div className="col-lg-3 p-1">
                            <GetSelectList data={sexList} selectedValue={this.state.Sex} name={"Sex"} handleFieldChange={this.handleFieldChange} requiredType={"Sex"} displayField={"val"} valueField={"val"} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-3 p-1">
                            Last Name:
                        </div>
                        <div className="col-lg-3 p-1">
                            <input value={this.state.LastName} type="text" maxLength=" 255 " onChange={this.handleFieldChange} name="LastName" required />
                        </div>
                        <div className="col-lg-3 p-1">
                            First Name:
                        </div>
                        <div className="col-lg-3 p-1">
                            <input value={this.state.FirstName} type="text" maxLength=" 255 " onChange={this.handleFieldChange} name="FirstName" required />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-3 p-1">
                            Chinese Name:
                        </div>
                        <div className="col-lg-3 p-1">
                            <input value={this.state.ChineseName} type="text" maxLength=" 50 " onChange={this.handleFieldChange} name="ChineseName" />
                        </div>
                        <div className="col-lg-3 p-1">
                            Is alive:
                        </div>
                        <div className="col-lg-3 p-1">
                            <label>  &nbsp;  Alive:  &nbsp;
                            <input type="checkbox" onChange={this.handleToggle} checked={this.state.Alive} name="Alive" />
                            </label >
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-3 p-1">
                            DOB:
                        </div>
                        <div className="col-6 p-1">
                            <input value={this.state.Dob} type="date" onChange={this.handleFieldChange} name="Dob" required />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-3 p-1">
                            Tel (H):
                            </div>
                        <div className="col-lg-3 p-1">
                            <input value={this.state.TelHome} type="number" min="-2147483648" max="2147483647" onChange={this.handleFieldChange} name="TelHome" />
                        </div>
                        <div className="col-lg-3 p-1">
                            Tel (D):
                            </div>
                        <div className="col-lg-3 p-1">
                            <input value={this.state.TelDay} type="number" min="-2147483648" max="2147483647" onChange={this.handleFieldChange} name="TelDay" />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-3 p-1">
                            Address:
                        </div>
                        <div className="col-lg-9 p-1">
                            <input className="underLined_xtralong" value={this.state.Address} type="text" maxLength=" 200 " onChange={this.handleFieldChange} name="Address" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-3 p-1">
                            &nbsp;
                        </div>
                        <div className="col-lg-1 p-1">
                            District:
                         </div>
                        <div className="col-4 p-1">
                            {<GetDatalistRegion requiredType="District" selected={this.state.District} onChangeHandler={this.handleFieldChange} name="District" />}

                        </div>
                        <div className="col-lg-1 p-1">
                            Region:
                        </div>
                        <div className="col-lg-3 p-1">
                            <input list="region" value={this.state.Region} type="text" maxLength=" 50 " onChange={this.handleFieldChange} name="Region" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-3 p-1">
                            First Attend Date:
                        </div>
                        <div className="col-lg-3 p-1">
                            <input value={this.state._1stDate} type="date" onChange={this.handleFieldChange} name="_1stDate" />
                        </div>
                        <div className="col-lg-3 p-1">
                            Age First Attend:
                        </div>
                        <div className="col-lg-3 p-1">
                            <input value={this.state.Age1stAtt} type="number" min="-32768" max="32767" onChange={this.handleFieldChange} name="Age1stAtt" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-3 p-1">
                            Diagnosis:
                        </div>
                        <div className="col-lg-9 p-1">
                            <input className="underLined_xtralong" value={this.state.Diagnosis} type="text" maxLength=" 255 " onChange={this.handleFieldChange} name="Diagnosis" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-3 p-1">
                            Complications:
                        </div>
                        <div className="col-lg-9 p-1">
                            <textarea name="Complications" form="Form" value={this.state.Complications} onChange={this.handleFieldChange} > </textarea>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-3 p-1">
                            Medical Hx:
                        </div>
                        <div className="col-lg-9 p-1">
                            <textarea name="MedicalHx" form="Form" value={this.state.MedicalHx} onChange={this.handleFieldChange} > </textarea>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-3 p-1">
                            Reason of Referral:
                        </div>
                        <div className="col-lg-9 p-1">
                            <textarea name="Reason" form="Form" value={this.state.Reason} onChange={this.handleFieldChange} > </textarea>
                        </div>
                    </div>
                    <div className="form-group row" >
                        <div className="col-lg-6">
                            &nbsp;
                        </div>
                        {!this.props.isSubmitSuccess && <div className="col-lg-2"><button type="submit" className="btn btn-block btn-primary" value="" ><i className="fas fa-save"></i> {this.props.isFormUpdate() ? "Update" : "Submit"}</button></div>} &nbsp;
                        {this.props.isSubmitSuccess && <div className="col-lg-2"><button type="button" className="btn btn-block btn-success " onClick={(e) => { e.preventDefault(); this.props.pageEmitter("view_client", false, this.state.SeatNo) }} ><i className="fas fa-clipboard-check"></i> View</button></div>} &nbsp;
                        {(this.props.isSubmitSuccess || this.props.isFormUpdate()) && <div className="col-lg-3"> <button type="button" className="btn btn-block btn-warning" value="" onClick={(e) => { e.preventDefault(); this.props.pageEmitter("new_attendence", true, this.state.SeatNo) }} ><i className="fas fa-plus"></i> Create new attendance</button></div>} &nbsp;
                    </div>
                </form>
            </div>
        );
    }
}