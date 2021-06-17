import getDisplayDate from '/js/shared/getDisplayDate.js';
import GetSelectList from '/js/shared/GetSelectList.jsx';
import GetDatalist from '/js/shared/GetDatalist.jsx';
export default class Loan_record_inputForm extends React.Component {
    constructor(props) {
        super(props);
        //gen
        this.state = {
            LoanFormNo: '(available after submit)',
            SeatNo: '',
            PatientName: '',
            BorrowerName: '',
            Idno: '',
            TelHome: '',
            TelMobile: '',
            TelOffice: '',
            Address: '',
            LoanDate: '',
            ReturnDate: '',
            WheelchairNo: '',
            WheelchairModel: '',
            Remarks: '',
            Witness: '',
            Rank: '',
            isEnableReturnAll: false,
            WheelchairModels: [],
            SeatNoList: []
        };
    }
    handleFieldChange = (e) => {
        this.setState({ [e.target.name]: e.target.value }, (d) => { this.props.handleFormUpdate_parent(this.GetState()) });
        if (e.target.name === "WheelchairNo")
            this.setState({ WheelchairModel: this.state.WheelchairModels.filter(c => c.WheelchairNo == e.target.value)[0].WheelchairModel });
        else if (e.target.name === "ReturnDate")
            this.setState({ isEnableReturnAll: true });
    }
    validateInput = (e) => {
        if (!e.target.checkValidity()) {
            alert('invalid input');
            this.setState({ [e.target.name]: "" }, (d) => { this.props.handleFormUpdate_parent(this.GetState()) });
        }
    }
    handleToggle = ({ target }) => {
        this.setState(s => ({ ...s, [target.name]: !s[target.name] }), (d) => { this.props.handleFormUpdate_parent(this.GetState()) })
    }
    async componentDidMount() {
        this.props.uniGetData('Common', 'SeatNoList').then(res => this.setState({ SeatNoList: res }));
        let qs = { filterAvailable: false };
        await this.props.uniGetData('WheelChair_Information_mapping', "", qs).then(res => {
            //    console.log(res);
            this.setState({ WheelchairModels: res })
        });
        if (this.props.seatNo)
            this.setState({ SeatNo: this.props.seatNo });
        if (this.props.isFormUpdate() && this.props.pid)
            this.props.getData({ Controller: this.constructor.name }).then(
                () => {
                    let data = this.props.fetchedData;
                    for (let prop in data) {
                        if (String(prop).toLowerCase().includes('date') && data[prop])
                            this.setState({ [prop]: getDisplayDate(data[prop]) });
                        else
                            if (data[prop])
                                this.setState({ [prop]: data[prop] });
                        if (String(prop) === "WheelchairNo") {
                            let tmp = this.state.WheelchairModels.filter(c => c.WheelchairNo == data[prop])[0];
                            tmp.Availability = true;
                            this.setState({ WheelchairModel: tmp.WheelchairModel, WheelchairNo: '' });
                            this.setState({ WheelchairModels: this.state.WheelchairModels.concat(tmp), WheelchairNo: tmp.WheelchairNo });
                        }
                    }
                }
            );
    }
    GetState() {
        return {
            Controller: this.constructor.name,
            LoanFormNo: this.state.LoanFormNo === "(available after submit)" ? '0' : this.state.LoanFormNo,
            SeatNo: this.state.SeatNo,
            PatientName: this.state.PatientName,
            BorrowerName: this.state.BorrowerName,
            Idno: String(this.state.Idno).toUpperCase(),
            TelHome: parseInt(this.state.TelHome),
            TelMobile: parseInt(this.state.TelMobile),
            TelOffice: parseInt(this.state.TelOffice),
            Address: this.state.Address,
            LoanDate: this.state.LoanDate === '' ? null : this.state.LoanDate,
            ReturnDate: this.state.ReturnDate === '' ? null : this.state.ReturnDate,
            WheelchairNo: this.state.WheelchairNo,
            Remarks: this.state.Remarks,
            Witness: this.state.Witness,
            Rank: this.state.Rank
        };
    }
    clearDateValue(dateField) {
        if (dateField === "ReturnDate")
            this.setState({ ReturnDate: '', isEnableReturnAll: false });
    }

    handleReturnAll() {
        if (confirm("Confirm to return all?")) {
            this.props.goReturnAll();
        }
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.on_click_parent_scroll();
    }
    fillClient = (e) => {
        e.preventDefault();
        if (this.state.SeatNo !== '')
            this.props.uniGetData('Client_Information', this.state.SeatNo).then(res => {
                this.setState({
                    PatientName: !this.isValidValue(res.LastName + res.FirstName) ? this.state.PatientName : res.LastName + res.FirstName,
                    Idno: !this.isValidValue(res.Hkid) ? this.state.Idno : res.Hkid,
                    TelHome: !this.isValidValue(res.TelDay) ? this.state.TelHome : res.TelHome,
                    TelMobile: !this.isValidValue(res.TelDay) ? this.state.TelMobile : res.TelDay,
                    Address: !this.isValidValue(res.Address) ? this.state.Address : res.Address
                });
            });
    }
    isValidValue(v) {
        return v !== null && v !== undefined && v !== '';
    }
    render() {
        return (
            <div className="container">
                <GetDatalist requiredType="Loan_Information_Rank" />
                <form className="Form" onSubmit={this.handleSubmit}>
                    {/* gen */}
                    <div className="row">
                        <div className="col-3">Loan form No:
                         </div>
                        <div className="col-3 p-1">
                            <input value={this.state.LoanFormNo} style={{ width: '80%' }} type="text" maxLength="6" onChange={this.handleFieldChange} name="LoanFormNo" required disabled={this.props.isFormUpdate()} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3">Seat No:
                       </div>
                        <div className="col-4  p-1">
                            {this.state.SeatNoList.length > 0 && <GetSelectList selectedValue={this.state.SeatNo} data={this.state.SeatNoList} name={"SeatNo"} handleFieldChange={this.handleFieldChange} requiredType={"SeatNoList"} displayField={"Name"} valueField={"Name"} />}
                            &nbsp;<button type="button" onClick={() => this.props.pageEmitter("ClientInfo", true, this.state.SeatNo)}>Client Rec.</button>
                            &nbsp;<button type="button" onClick={(e) => this.fillClient(e)}>Fill Client</button>
                        </div>
                        <div className="col-2">Client Name:</div>
                        <div className="col-3 p-1">
                            <input value={this.state.PatientName} style={{ width: '100%' }} type="text" maxLength=" 255 " onChange={this.handleFieldChange} name="PatientName" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3">
                            <u>Borrower &apos;	s Information</u>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-3">Name:</div>
                        <div className="col-4 p-1">
                            <input value={this.state.BorrowerName} type="text" maxLength=" 255 " onChange={this.handleFieldChange} name="BorrowerName" />
                        </div>

                        <div className="col-2">HKID:</div>
                        <div className="col-3 p-1">
                            <input value={this.state.Idno} type="text" onBlur={this.validateInput} onChange={this.handleFieldChange} name="Idno" pattern="[A-Za-z]{1,2}[0-9]{6}\([Aa0-9]{1}\)" />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col col-lg-6">
                            <div className="col-3 p-1">Address:</div>
                            <div className="col-12 p-1">
                                <textarea name="Address" form="Form" maxLength="255" value={this.state.Address} onChange={this.handleFieldChange} style={{ width: '100%' }}> </textarea>
                            </div>
                        </div>
                        <div className="col col-lg-4">
                            <div className="row">
                                Tel (H):
                                 <input value={this.state.TelHome} type="number" min="0" max="2147483647" style={{ width: '100%' }} onChange={this.handleFieldChange} name="TelHome" />
                            </div>

                            <div className="row">
                                Tel (M):
                                <input value={this.state.TelMobile} type="number" min="0" max="2147483647" style={{ width: '100%' }} onChange={this.handleFieldChange} name="TelMobile" />
                            </div>
                        </div>

                        <div className="col col-lg-2 ">
                            <div className="row" >&nbsp;</div>
                            <div className="row justify-content-md-center">
                                {this.props.isFormUpdate() && <button type="button" onClick={(e) => { e.preventDefault(); this.props.pageEmitter("PrintLoan", true, this.state.LoanFormNo, 'eng') }}>Print </button>}
                            </div>
                            <div className="row justify-content-md-center">
                                {this.props.isFormUpdate() && <button type="button" onClick={(e) => { e.preventDefault(); this.props.pageEmitter("PrintLoan", true, this.state.LoanFormNo, 'chi') }}>列印</button>}
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-3"><u>Loan Information</u></div>
                    </div>

                    <div className="row">
                        <div className="col-3">LoanDate:</div>
                        <div className="col-9 p-1">
                            <input value={this.state.LoanDate} type="date" onChange={this.handleFieldChange} name="LoanDate" required />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-3">Wheelchair No:</div>
                        <div className="col-9 p-1">
                            {this.state.WheelchairModels.length > 0 && this.state.ReturnDate === '' && <GetSelectList selectedValue={this.state.WheelchairNo} data={this.state.WheelchairModels.filter(x => x.Availability)} name={"WheelchairNo"} handleFieldChange={this.handleFieldChange} requiredType={"WheelchairNo"} displayField={"WheelchairNo"} valueField={"WheelchairNo"} />}
                            &nbsp;
                            <input value={this.state.WheelchairModel} type="text" onChange={this.handleFieldChange} name="WheelchairModel" disabled />
                            &nbsp;
                            <button type="button" onClick={() => this.props.pageEmitter("WCInfo_index", true, this.state.WheelchairNo)} >i</button>
                        </div>
                        <div className="col-3">Remarks:</div>
                        <div className="col-9 p-1">
                            <textarea name="Remarks" form="Form" value={this.state.Remarks} onChange={this.handleFieldChange} > </textarea>
                        </div>
                        <div className="col-3">Return Date:</div>
                        <div className="col-9 p-1">
                            <input value={this.state.ReturnDate} type="date" onChange={this.handleFieldChange} name="ReturnDate" disabled={!this.props.isFormUpdate() || this.state.ReturnDate !== ''} />
                            &nbsp;
                            <button onClick={(e) => { e.preventDefault(); this.clearDateValue("ReturnDate") }}  >Clear</button>
                             &nbsp;
                            <button onClick={(e) => { e.preventDefault(); this.handleReturnAll() }} disabled={!this.state.isEnableReturnAll}>Return All</button>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3">TelOffice:</div>
                        <div className="col-9 p-1">
                            <input value={this.state.TelOffice} type="number" min="0" max="2147483647" onChange={this.handleFieldChange} name="TelOffice" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3">Witness:</div>
                        <div className="col-3 p-1">
                            <input value={this.state.Witness} type="text" onChange={this.handleFieldChange} name="Witness" />
                        </div>

                        <div className="col-3">Rank:</div>
                        <div className="col-3 p-1">
                            <input list="Loan_Information_Rank" value={this.state.Rank} type="text" onChange={this.handleFieldChange} name="Rank" />
                        </div>
                    </div>

                    <div className="form-group row" >
                        <div className="col-lg-2"> <button type="submit" className="btn btn-block btn-success " >Next<i className="fas fa-arrow-right"></i></button>  </div>
                    </div>

                </form>
            </div>
        );
    }
} 