import GetDatalist from '/js/shared/GetDatalist.jsx';
import getDisplayDate from '/js/shared/getDisplayDate.js';
import GetSelectList from '/js/shared/GetSelectList.jsx';

export default class PPMI_InputForm extends React.Component
{
    constructor(props)
    {
        super(props);
        //gen
        this.state = {
            PpmiRegNo: '',
            Date: '',
            SeatNo: '',
            Reason: '',
            Funding: '',
            Status: '',
            Quotation: '',
            ResStaff: '',
            CounterSign: '',
            isEdited: false,
            resetSubmit_p_func: this.props.resetSubmit
        };
        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleFieldChange(e)
    {
        this.setState({ [e.target.name]: e.target.value, isEdited: true }, (d) => { this.props.handleFormUpdate_parent(this.GetState()) });
        this.props.resetSubmit(this.constructor.name); 
    }
    handleToggle = ({ target }) =>
    {
        this.setState(s => ({ ...s, [target.name]: !s[target.name] }), (d) => { this.props.handleFormUpdate_parent(this.GetState()) })
    }
    componentDidMount()
    {
        if (this.props.seatNo) this.setState({ SeatNo: this.props.seatNo });
        if (this.props.isFormUpdate() && this.props.pid)
            this.props.getData({ Controller: this.constructor.name }).then(() =>{
                    let data = this.props.fetchedData;
                    for (let prop in data)
                    {
                        if (String(prop).toLowerCase().includes('date') && data[prop])
                        {
                            this.setState({ [prop]: getDisplayDate(data[prop]) });
                        }
                        else
                        {
                            if (data[prop])
                                this.setState({ [prop]: data[prop] });
                        }
                    }
                }
            );
    }
    GetState()
    {
        return {
            Controller: this.constructor.name,
            PpmiRegNo: this.state.PpmiRegNo === '' ? 0 : parseInt(this.state.PpmiRegNo),
            Date: this.state.Date === '' ? null : this.state.Date,
            SeatNo: this.state.SeatNo,
            Reason: this.state.Reason,
            Funding: this.state.Funding,
            Status: this.state.Status,
            Quotation: this.state.Quotation,
            ResStaff: this.state.ResStaff,
            CounterSign: this.state.CounterSign,
            isEdited: this.state.isEdited
        };
    }
    handleSubmit(e)
    {
        e.preventDefault();
        this.props.on_click_parent_scroll(this.props.parent_ref);
    } 
    render()
    {
        const statusList = [
            { val: "" }
            , { val: "Seeking Quotation" }
            , { val: "Awaiting client's decision" }
            , { val: "Awaiting approval of funding" }
            , { val: "Awaiting delivary" }
            , { val: "Completed with purchase" }
            , { val: "Completed without purchase" }];
        const reasonList = [
            { val: "Self - purchase of" }
            , { val: "Compensate for broken / lost parts" }
            , { val: "Purchase own wheelchair" }];
        return (

            <div className="container">
                {this.props.Fundings.length > 0 && <GetDatalist data={this.props.Fundings} useData={true} requiredType={"Fundings"} useField="Name" />}
                <GetDatalist data={reasonList} useData={true} requiredType={"reasonList"} useField="val" />
                <form className="Form" id="ppmi_input_form" onSubmit={this.handleSubmit}>
                    {/* gen */}
                    <div className="row">
                        &nbsp;
                    </div>
                    <div className="row">
                        <div className="col-2 p-2">
                            PPMI Reg. No.:
                                 </div>
                        <div className="col-3 p-2">
                            <input value={this.state.PpmiRegNo} type="number" min="-2147483648" max="2147483647" onChange={this.handleFieldChange} name="PpmiRegNo" disabled /> 
                        </div>
                        <div className="col-1 p-2">
                            &nbsp;
                        </div>
                        <div className="col-2 p-2">
                            Date:
                        </div>
                        <div className="col-2 p-2">
                            <input value={this.state.Date} type="date" onChange={this.handleFieldChange} name="Date" required />
                        </div>

                        <div className="col-2 p-2">
                            <input type="button" value="Print this record" />
                        </div>
                    </div> 
                    <div className="row">
                        <div className="col-2 p-2">
                            Seat No:
                        </div>
                        <div className="col-3 p-2">
                            {this.props.SeatNoList.length > 0 && <GetSelectList selectedValue={this.state.SeatNo} data={this.props.SeatNoList} name={"SeatNo"} handleFieldChange={this.handleFieldChange} requiredType={"SeatNoList"} displayField={"Name"} valueField={"Name"} />}
                        </div>
                        <div className="col-1 p-2">
                            &nbsp;
                        </div>
                        <div className="col-2  p-2">
                            Responsible Staff:
                                 </div>
                        <div className="col-2  p-2 text-right">
                            <input value={this.state.ResStaff} type="text" maxLength=" 50 " onChange={this.handleFieldChange} name="ResStaff" required />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-2  p-2">
                            Funding:
                                 </div>
                        <div className="col-3 p-1">
                            <input list="Fundings" value={this.state.Funding} type="text" maxLength=" 255 " onChange={this.handleFieldChange} name="Funding" />
                        </div>
                        <div className="col-1 p-2">
                            &nbsp;
                        </div>
                        <div className="col-2  p-2">
                            Status:
                        </div>
                        <div className="col-3 p-1">
                            <GetSelectList selectedValue={this.state.Status} data={statusList} name={"Status"} handleFieldChange={this.handleFieldChange} requiredType={"Status"} displayField={"val"} valueField={"val"} />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-2  p-2">
                            Reason:
                                 </div>
                        <div className="col-9 p-1">
                            <input list="reasonList" className="xtralongBox" value={this.state.Reason} type="text" maxLength="255" onChange={this.handleFieldChange} name="Reason" required />

                        </div>

                    </div>

                    <div className="row">
                        <div className="col-2  p-2">
                            CounterSign:
                                 </div>
                        <div className="col-3  p-1">
                            <input value={this.state.CounterSign} type="text" maxLength=" 50 " onChange={this.handleFieldChange} name="CounterSign" />
                        </div>
                        <div className="col-2 p-2">
                            &nbsp;
                        </div>
                    </div>
                    <div className="form-group row">
                            <button type="submit" className="col-lg-1 btn btn-block btn-primary" ><i className="fas fa-arrow-right"></i>Next</button>
                    </div>
                </form>
            </div >
        );
    }
} 