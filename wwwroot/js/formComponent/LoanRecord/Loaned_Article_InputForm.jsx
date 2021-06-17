import GetSelectList from '/js/shared/GetSelectList.jsx';
export default class Loaned_Article_InputForm extends React.Component {
    constructor(props) {
        super(props);
        //gen
        this.state = {
            RefId: '',
            LoanFormNo: '',
            PartNo: '',
            PartNo_str: '',
            Remarks: '',
            Consumable: false,
            Description: '',
            UnitPrice: '',
            PartType: '',
            lastSubmitIndx: 0,
            isActiveBtn: false,
            availablePartList: []
        };
    }
    handleFieldChange = (e) => {
        if (e.target.name === "PartNo") {
            if (String(e.target.value).trim() !== "0") {
                this.props.uniGetData('Part_Information', e.target.value).then((result) =>
                    this.setState({ PartNo_str: result.PartNo, PartType: result.PartType, UnitPrice: result.Price ? result.Price : '', Consumable: result.Consumable, Description: result.Description })
                );
            } else
                this.setState({ PartNo_str: '', PartType: '', UnitPrice: '', Consumable: false });
        }

        //trigger animated button 
        this.setState({ [e.target.name]: e.target.value, isActiveBtn: true }, (d) => { this.props.handleFormUpdate_parent(this.GetState()) });
    }
    handleToggle = ({ target }) => {
        this.setState(s => ({ ...s, [target.name]: !s[target.name] }), (d) => { this.props.handleFormUpdate_parent(this.GetState()) })
    }
    async componentDidMount() {
        if (this.props.isFormUpdate() && this.props.pid)
            this.props.getData({ Controller: 'Loaned_articles_list' });
        await this.props.uniGetData('Part_Information_Available_PartNo').then(res => this.setState({ availablePartList: res }));
    }
    GetState() {
        return {
            Controller: this.constructor.name,
            RefId: 'new' + this.state.lastSubmitIndx,
            LoanFormNo: this.state.LoanFormNo,
            PartNo: this.state.PartNo_str,
            Consumable: this.state.Consumable,
            UnitPrice: this.state.UnitPrice,
            PartType: this.state.PartType,
            Remarks: this.state.Remarks
        };
    }
    clearInputFields = () => {
        this.setState({
            PartNo: '',
            Consumable: false,
            UnitPrice: '',
            PartType: '',
            Remarks: '',
            Description:''
        });
    }
    handleSubmit = (e) => {
        e.preventDefault();
        if (this.state.PartNo === "")
            alert("Please choose one part item.");
        else
            this.setState({ lastSubmitIndx: this.state.lastSubmitIndx + 1 }, () => {
                this.props.onFormCreate(this.GetState());
                this.clearInputFields();
                this.setState({ isSubmitted: true });
            });

        this.setState({ isActiveBtn: false });
    }
    gotoListBottom() {
        this.props.on_click_parent_scroll_bottom(this.props.parent_ref_bottom);
    }
    render() {
        return (
            <div className="container">
                <h2>Loan Items</h2>
                <form className="Form" onSubmit={this.handleSubmit}>
                    {/* gen */}
                    <div className="row">
                        <div className="col-2 p-1">
                            Part No:
                        </div>
                        <div className="col-3 p-1">
                            {this.state.availablePartList.length > 0 && <GetSelectList isRequired={true} selectedValue={this.state.PartNo} data={this.state.availablePartList} name={"PartNo"} handleFieldChange={this.handleFieldChange} requiredType={"PartNo"} displayField={"PartNo"} valueField={"RefId"} />}
                            &nbsp;
                            <button type="button" onClick={() => this.props.pageEmitter("PartsInfo", true, this.state.PartNo)}>i</button>
                        </div>
                        <div className="col-2 p-1">
                            Unit Price:
                                 </div>
                        <div className="col-2 p-1">
                            <input value={this.state.UnitPrice} type="text" maxLength=" 50 " onChange={this.handleFieldChange} name="UnitPrice" disabled />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-2 p-1">
                            Part Type:
                        </div>
                        <div className="col-3 p-1">
                            <input value={this.state.PartType} type="text" maxLength=" 50 " onChange={this.handleFieldChange} name="PartType" disabled />
                        </div>

                        <div className="col-2 p-1">
                            <label>   Is consumable:  &nbsp;
                                     <input type="checkbox" onChange={this.handleToggle} checked={this.state.Consumable} name="Consumable" />
                            </label >
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-2 p-1">
                            Description:
                        </div>
                        <div className="col-10 p-1">
                            <textarea value={this.state.Description} form="Form" name="Description" disabled > </textarea>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-2 p-1">
                            Remarks:
                        </div>
                        <div className="col-9 p-1">
                            <textarea name="Remarks" form="Form" value={this.state.Remarks} onChange={this.handleFieldChange} > </textarea>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 p-1">
                            {this.state.isActiveBtn && <Button className="changingActiveBtn" onClick={(e) => this.handleSubmit(e)} >
                                <Spinner as="span" animation="grow" aria-hidden="true" className="whiteSpinner" size="sm" role="status" />
                                Add to list
                            </Button>}
                            {!this.state.isActiveBtn && <input type="submit" value="Add to list" />}
                            &nbsp;
                            {this.state.isSubmitted && <div>Please <a className="inlineLink" onClick={() => this.gotoListBottom()}> <u> click here  </u> </a>to review newly added item.</div>}
                        </div>
                    </div>
                </form>
            </div>
        );
    }
} 