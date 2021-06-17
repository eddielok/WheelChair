import getDisplayDate from '/js/shared/getDisplayDate.js';
import GetSelectList from '/js/shared/GetSelectList.jsx';

export default class Work_Order_InputForm extends React.Component {
    constructor(props) {
        super(props);
        //gen
        this.state = {
            OrderNo: '',
            OrderDate: '',
            SeatNo: '',
            isSubmitted: false,
            resetSubmit_p_func: this.props.resetSubmit
        };
        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleFieldChange(e) {
        this.setState({ [e.target.name]: e.target.value }, (d) => { this.props.handleFormUpdate_parent(this.GetState()) });
    }
    handleToggle = ({ target }) => {
        this.setState(s => ({ ...s, [target.name]: !s[target.name] }), (d) => { this.props.handleFormUpdate_parent(this.GetState()) })
    }
    componentDidMount() {
        if (this.props.seatNo) this.setState({ SeatNo: this.props.seatNo });
        if (this.props.isFormUpdate() && this.props.pid)
            this.props.getData({ Controller: this.constructor.name }).then((data) => {
                for (let prop in data) {
                    if (String(prop).toLowerCase().includes('date') && data[prop])
                        this.setState({ [prop]: getDisplayDate(data[prop]) });
                    else
                        if (data[prop])
                            this.setState({ [prop]: data[prop] });
                }
            }
            );
    }
    GetState() {
        return {
            Controller: this.constructor.name,
            OrderNo: parseInt(this.state.OrderNo),
            OrderDate: this.state.OrderDate === '' ? null : this.state.OrderDate,
            SeatNo: this.state.SeatNo
        };
    }
    handleSubmit(e) {
        e.preventDefault();
        this.setState({ isSubmitted: true });
        // update or create
        if (this.props.isFormUpdate()) {
            this.props.onFormModify(this.GetState());
        } else {
            this.props.onFormCreate(this.GetState()).then((serverReturn) => this.setState({ OrderNo: serverReturn.orderNo }));
        }
    }
    render() {
        return (
            <div className="container">
                <form className="Form" onSubmit={this.handleSubmit}>
                    {/* gen */}
                    <div className="row">
                        <div className="col-3">
                            OrderNo:
                                 </div>
                        <div className="col-9 p-1">
                            <input value={this.state.OrderNo} type="number" min="-2147483648" max="2147483647" onChange={this.handleFieldChange} name="OrderNo" disabled={this.props.isFormUpdate()} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3">
                            OrderDate:
                                 </div>
                        <div className="col-9 p-1">
                            <input value={this.state.OrderDate} type="date" onChange={this.handleFieldChange} name="OrderDate" required disabled={this.props.isFormUpdate()} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3">
                            SeatNo:
                                 </div>
                        <div className="col-9 p-1">
                            {this.props.SeatNoList.length > 0 && <GetSelectList selectedValue={this.state.SeatNo} data={this.props.SeatNoList} name={"SeatNo"} handleFieldChange={this.handleFieldChange} requiredType={"SeatNoList"} displayField={"Name"} valueField={"Name"} />}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            *** In create, order number available after submit
                      </div>
                    </div>
                    {!this.state.isSubmitted && <button type="submit" className="col-lg-3 btn btn-block btn-primary" > Submit</button>}
                    {this.state.isSubmitted && <button className="col-lg-2 btn btn-block btn-warning" onClick={(e) => { e.preventDefault(); this.props.gotoPage() }}><i className="fas fa-arrow-left"></i>Back</button>}

                </form>
            </div>
        );
    }
} 