export default class Work_Order_Items_InputForm extends React.Component {
    constructor(props) {
        super(props);
        //gen
        this.state = {
            RefId: '',
            OrderNo: '',
            OrderDate: '',
            Item: '',
            Completed: false,
            Staff: '',
            CompletionDate: '',
            isSubmitted: false,
            lastSubmitIndx: 0,
            resetSubmit_p_func: this.props.resetSubmit
        };
        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleFieldChange(e) {
        this.setState({ [e.target.name]: e.target.value, isSubmitted: true }, (d) => { this.props.handleFormUpdate_parent(this.GetState()) });
        this.setState({ isSubmitted: false });
    }
    handleToggle = ({ target }) => {
        this.setState(s => ({ ...s, [target.name]: !s[target.name] }));
        this.setState({ isSubmitted: false });
    }
    componentDidMount() {
        if (this.props.isFormUpdate() && this.props.pid)
            this.props.getData({ Controller: 'Work_order_item_list' });
    }
    GetState() {
        return {
            Controller: this.constructor.name,
            RefId: 'new' + this.state.lastSubmitIndx,
            OrderNo: parseInt(this.state.OrderNo),
            OrderDate: this.state.OrderDate === '' ? null : this.state.OrderDate,
            Item: this.state.Item,
            Completed: this.state.Completed,
            Staff: this.state.Staff,
            CompletionDate: this.state.CompletionDate === '' ? null : this.state.CompletionDate
        };
    }
    handleSubmit(e) {
        e.preventDefault();
        this.setState({ lastSubmitIndx: this.state.lastSubmitIndx + 1 }, () => this.props.onFormCreate(this.GetState()));
        this.setState({ isSubmitted: true });
    }
    gotoListBottom() {
        this.props.on_click_parent_scroll_bottom(this.props.parent_ref_bottom);
    }
    render() {
        return (
            <div className="container">
                <form className="Form" onSubmit={this.handleSubmit}>
                    {/* gen */}
                    <div className="row">
                        <div className="col-4">
                            OrderDate:
                                 </div>
                        <div className="col-8 p-1">
                            <input value={this.state.OrderDate} type="date" onChange={this.handleFieldChange} name="OrderDate" required />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-4">
                            Item:
                                 </div>
                        <div className="col-8 p-1">
                            <input value={this.state.Item} type="text" maxLength=" 255 " onChange={this.handleFieldChange} name="Item" required />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-4">
                            Staff:
                                 </div>
                        <div className="col-8 p-1">
                            <input value={this.state.Staff} type="text" maxLength=" 50 " onChange={this.handleFieldChange} name="Staff" required />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-4">
                            Completion Date:
                                 </div>
                        <div className="col-8 p-1">
                            <input value={this.state.CompletionDate} type="date" onChange={this.handleFieldChange} name="CompletionDate" />
                            &nbsp; &nbsp; <label>
                                <input type="checkbox" onChange={this.handleToggle} checked={this.state.Completed} name="Completed" />
                               &nbsp; Completed   &nbsp;
                         </label >
                        </div>
                    </div> 
                        <button type="submit" className="col-lg-3 btn btn-block btn-primary"> Add to list</button> 
                            {this.state.isSubmitted && <div>Please <a className="inlineLink" onClick={() => this.gotoListBottom()}> <u> click here  </u> </a>to review newly added item.</div>}
                </form>
            </div>
        );
    }
} 