import HandleAfterSubmit from '/js/shared/HandleAfterSubmit.jsx';
import getDisplayDate from '/js/shared/getDisplayDate.js';
import GetSelectList from '/js/shared/GetSelectList.jsx';

export default class Client_Attendance_InputForm extends React.Component {
    constructor(props) {
        super(props);
        //gen
        this.state = {
            RefId: '0',
            SeatNo: '',
            Date: '',
            Attendance: false,
            Session: '',
            Remarks: '',
            Picture: '',
            Video: '',
            Xray: '',
            Pressure: '',
            Progress: '',
            MoNotes: '',
            SeatingNotes: '',
            view_name: 'ClientAttendances_single',
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
        if (this.props.seatNo) this.setState({ SeatNo: this.props.seatNo });
        if (this.props.isFormUpdate())
            this.props.getData({ Controller: this.state.view_name }).then(
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
                }
            );
    }
    GetState() {
        return {
            Controller: this.state.view_name,
            RefId: parseInt(this.state.RefId),
            SeatNo: this.state.SeatNo,
            Date: this.state.Date,
            Attendance: this.state.Attendance,
            Session: this.state.Session,
            Remarks: this.state.Remarks === '' ? null : this.state.Remarks,
            Picture: this.state.Picture === '' ? null : this.state.Picture,
            Video: this.state.Video === '' ? null : this.state.Video,
            Xray: this.state.Xray === '' ? null : this.state.Xray,
            Pressure: this.state.Pressure === '' ? null : this.state.Pressure,
            Progress: this.state.Progress === '' ? null : this.state.Progress,
            MoNotes: this.state.MoNotes === '' ? null : this.state.MoNotes,
            SeatingNotes: this.state.SeatingNotes === '' ? null : this.state.SeatingNotes
        };
    }
    handleSubmit(e) {
        e.preventDefault();
        // update or create
        if (this.props.isFormUpdate()) {
            this.props.onFormModify(this.GetState());
        } else {
            this.props.onFormCreate(this.GetState()).then((serverReturn) => {
                this.setState({ RefId: serverReturn.refId });
            });
        }
    }
    render() {
        const sessionLst = [{ val: "" }, { val: "Clinic" }, { val: "Workshop" }, { val: "Visit" }, { val: "WC-Services" }];
        const RemarksLst = [{ val: "" }, { val: "S-AM" }, { val: "S-PM" }, { val: "AT" }, { val: "Walk-in" }, { val: "InP-PM" }];
        return (
            <div>
                <p>&nbsp;</p>
                <form onSubmit={this.handleSubmit}>

                    <div className="card card-primary card-outline">
                        <div className="card-header">
                            <h3 className="card-title"><i className="fas fa-road"></i>&nbsp;Attendance</h3>
                            <div className="form-group row float-right">
                                <button type="button" className="btn btn-block btn-danger" onClick={() => window.close()} ><i className="fas fa-window-close"></i>Close</button>
                            </div>
                        </div>

                        <div className="card-body">
                            <div className="form-group row ">
                                <div className="col-lg-3">
                                    SeatNo:
                                 </div>
                                <div className="col-lg-3">
                                    <input value={this.state.SeatNo} type="text" maxLength=" 50 " onChange={this.handleFieldChange} name="SeatNo" readOnly={this.props.isFormUpdate()} required />
                                </div>
                                <div className="col-lg-3">
                                    Date:
                        </div>
                                <div className="col-lg-3">
                                    <input value={this.state.Date} type="date" onChange={this.handleFieldChange} name="Date" required />
                                </div>
                            </div>
                            <div className="form-group row ">

                                <div className="col-lg-3">
                                    Attendance:
                            </div>
                                <div className="col-lg-3">
                                    <input type="checkbox" onChange={this.handleToggle} checked={this.state.Attendance} name="Attendance" />
                                </div>
                                <div className="col-lg-3">
                                    Session:
                            </div>
                                <div className="col-lg-3">
                                    <GetSelectList data={sessionLst} selectedValue={this.state.Session} name={"Session"} handleFieldChange={this.handleFieldChange} requiredType={"Session"} displayField={"val"} valueField={"val"} />
                                </div>
                            </div>
                            <div className="form-group row ">

                                <div className="col-lg-3">
                                    Remarks:
                            </div>
                                <div className="col-lg-3">
                                    <GetSelectList data={RemarksLst} selectedValue={this.state.Remarks} name={"Remarks"} handleFieldChange={this.handleFieldChange} requiredType={"Remarks"} displayField={"val"} valueField={"val"} />
                                </div>
                                <div className="col-lg-3">
                                    Picture:
                            </div>
                                <div className="col-lg-3">
                                    <input value={this.state.Picture} type="text" maxLength="  " onChange={this.handleFieldChange} name="Picture" />
                                </div>
                            </div>
                            <div className="form-group row ">

                                <div className="col-lg-3">
                                    Video:
                            </div>
                                <div className="col-lg-3">
                                    <input value={this.state.Video} type="text" maxLength="  " onChange={this.handleFieldChange} name="Video" />
                                </div>
                                <div className="col-lg-3">
                                    Xray:
                            </div>
                                <div className="col-lg-3">
                                    <input value={this.state.Xray} type="text" maxLength="  " onChange={this.handleFieldChange} name="Xray" />
                                </div>
                            </div>
                            <div className="form-group row ">
                                <div className="col-lg-3">
                                    Pressure:
                            </div>
                                <div className="col-lg-3">
                                    <input value={this.state.Pressure} type="text" maxLength="  " onChange={this.handleFieldChange} name="Pressure" />
                                </div>
                                <div className="col-lg-3">
                                    Progress:
                            </div>
                                <div className="col-lg-3">
                                    <input value={this.state.Progress} type="text" maxLength="  " onChange={this.handleFieldChange} name="Progress" />
                                </div>
                            </div>

                            <div className="form-group row ">
                                <div className="col-lg-3">
                                    MoNotes:
                            </div>
                                <div className="col-lg-3">
                                    <input value={this.state.MoNotes} type="text" maxLength="  " onChange={this.handleFieldChange} name="MoNotes" />
                                </div>
                                <div className="col-lg-3">
                                    SeatingNotes:
                            </div>
                                <div className="col-lg-3">
                                    <input value={this.state.SeatingNotes} type="text" maxLength="  " onChange={this.handleFieldChange} name="SeatingNotes" />
                                </div>
                            </div>
                            <div className="form-group row">
                                <div className="col-lg-2"> <button type="submit" className="btn btn-block btn-primary" ><i className="fas fa-save"></i> &nbsp; Submit</button>   </div>
                                <div className="col-lg-2"> <button type="button" className="btn btn-block btn-warning" onClick={() => window.history.back()} ><i className="fas fa-arrow-left"></i>Back</button>     </div>
                            </div>
                        </div>
                    </div>
                </form>
                {this.props.isSubmited && <HandleAfterSubmit isSubmited={this.props.isSubmited} isSubmitSuccess={this.props.isSubmitSuccess} submitMessage={this.props.submitMessage} />}



            </div>
        );
    }
} 