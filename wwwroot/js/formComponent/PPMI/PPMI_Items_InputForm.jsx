import GetDatalist from '/js/shared/GetDatalist.jsx';
export default class PPMI_Items_InputForm extends React.Component {
    constructor(props) {
        super(props);
        //gen
        this.state = {
            RefId: '',
            PpmiRegNo: '',
            Item: '',
            Specification: '',
            Supplier: '',
            QuotationNo: '',
            Quantity: '',
            Amount: '',
            isSubmitted: false,
            lastSubmitIndx: 0,
            PatientSelected: false,
            resetSubmit_p_func: this.props.resetSubmit
        };
        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleFieldChange(e) {
        this.setState({ isSubmitted: false });
        this.setState({ [e.target.name]: e.target.value }, (d) => { this.props.handleFormUpdate_parent(this.GetState()) });
        this.props.resetSubmit(this.constructor.name);
    }
    handleToggle = ({ target }) => {
        this.setState(s => ({ ...s, [target.name]: !s[target.name] }), (d) => { this.props.handleFormUpdate_parent(this.GetState()) })
    }
    GetState() {
        return {
            Controller: this.constructor.name,
            RefId: 'new' + this.state.lastSubmitIndx,
            PpmiRegNo: parseInt(this.state.PpmiRegNo),
            Item: this.state.Item,
            Specification: this.state.Specification,
            Supplier: this.state.Supplier,
            QuotationNo: this.state.QuotationNo,
            Quantity: this.state.Quantity === '' ? null : parseInt(this.state.Quantity),
            Amount: this.state.Amount === '' ? null : parseFloat(this.state.Amount),
            PatientSelected: this.state.PatientSelected
        };
    }
    handleSubmit(e) {
        e.preventDefault();
        this.setState({ isSubmitted: true });
        this.setState({ lastSubmitIndx: this.state.lastSubmitIndx + 1 }, () => {
            this.props.onFormCreate(this.GetState());
            this.clearInputBox();
        });
    }
    clearInputBox = () => {
        this.setState({
            Item: '',
            Specification: '',
            Supplier: '',
            QuotationNo: '',
            Quantity: '',
            Amount: '',
            PatientSelected: false
        });
    }
    gotoListBottom() {
        this.props.on_click_parent_scroll_bottom(this.props.parent_ref_bottom);
    }
    render() {
        return (
            <div className="container">
                {this.props.Suppliers.length > 0 && <GetDatalist data={this.props.Suppliers} useData={true} requiredType={"Suppliers"} useField="Name" />}
                <form className="Form" onSubmit={this.handleSubmit}>
                    {/* gen */}
                    <div className="row">
                        <div className="col-3 p-1">
                            Quotation number:
                                 </div>
                        <div className="col-3 p-1">
                            <input value={this.state.QuotationNo} type="text" maxLength=" 50 " onChange={this.handleFieldChange} name="QuotationNo" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3 p-1">
                            Item:
                        </div>
                        <div className="col-3 p-1">
                            <input value={this.state.Item} type="text" maxLength=" 155 " onChange={this.handleFieldChange} name="Item" />
                        </div>
                        <div className="col-3 p-1">
                            Specification:
                                 </div>
                        <div className="col-3 p-1">
                            <input value={this.state.Specification} type="text" maxLength=" 100 " onChange={this.handleFieldChange} name="Specification" />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-3 p-1">
                            Supplier:
                        </div>
                        <div className="col-3 p-1">
                            <input list="Suppliers" value={this.state.Supplier} type="text" maxLength="255" onChange={this.handleFieldChange} name="Supplier" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3 p-1">
                            Quantity:
                        </div>
                        <div className="col-3 p-1">
                            <input value={this.state.Quantity} type="number" min="-2147483648" max="2147483647" onChange={this.handleFieldChange} name="Quantity" />
                        </div>
                        <div className="col-3 p-1">
                            Amount:
                                 </div>
                        <div className="col-3 p-1">
                            <input value={this.state.Amount} type="number" step="0.01" onChange={this.handleFieldChange} name="Amount" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3 p-1">
                            Is patient selected item?
                        </div>
                        <div className="col-9 p-1">
                            <input type="checkbox" onChange={this.handleToggle} checked={this.state.PatientSelected} name="PatientSelected" />
                        </div>
                    </div>
                    <div className="form-group row">
                        <button type="submit" className="col-lg-2 btn btn-block btn-primary" ><i className="fas fa-add"></i>Add to list</button>
                        <div className="col-lg-9">
                            {this.state.isSubmitted && <div>Please <a className="inlineLink" onClick={() => this.gotoListBottom()}> <u> click here  </u> </a>to review newly added item.</div>}
                        </div>
                    </div>

                </form>
            </div >
        );
    }
} 