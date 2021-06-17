import GetDatalist from '/js/shared/GetDatalist.jsx';
import GetSelectList from '/js/shared/GetSelectList.jsx';
import HandleAfterSubmit from '/js/shared/HandleAfterSubmit.jsx';
import getDisplayDate from '/js/shared/getDisplayDate.js';

//20200812 add toast
import HandleAfterSubmit_toast from '/js/shared/HandleAfterSubmit_toast.jsx';

export default class Part_Information_InputForm extends React.Component {
    constructor(props) {
        super(props);
        //gen
        this.state = {
            RefId: this.props.RefId ? this.props.RefId : '',
            PartNo: '',
            Description: '',
            PartType: '',
            Consumable: false,
            Manufacturer: '',
            Suppliers: [],
            Supplier: '',
            TotalQuantity: '',
            OutQuantity: '0',
            PicLink: '',
            Price: '',
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
    async componentDidMount() {
        if (this.props.isFormUpdate() && this.props.pid)
            this.props.getData({ Controller: this.constructor.name }).then(() => {
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
            });
        if (this.state.Suppliers.length <= 0) {
            await this.getSuppliersSuggestion();
        }
    }
    async getSuppliersSuggestion() {
        this.props.getDataType2('GET', 'Common', 'Suppliers')
            .then((getData) => {
                this.setState({ Suppliers: JSON.parse(getData) });
            }).catch((response) => {
                throw response;
            });
    }
    GetState() {
        return {
            Controller: this.constructor.name,
            RefId: this.state.RefId === '' ? 0 : parseInt(this.state.RefId),
            PartNo: this.state.PartNo,
            Description: this.state.Description,
            PartType: this.state.PartType ? this.state.PartType : " ",
            Consumable: this.state.Consumable,
            Manufacturer: this.state.Manufacturer,
            Supplier: this.state.Supplier,
            TotalQuantity: parseFloat(this.state.TotalQuantity),
            OutQuantity: parseFloat(this.state.OutQuantity),
            PicLink: this.state.PicLink,
            Price: parseFloat(this.state.Price)
        };
    }
    handleSubmit(e) {
        e.preventDefault();
        // update or create
        if (this.props.isFormUpdate()) {
            this.props.onFormModify(this.GetState());
        } else {
            // give a temporary id ; in the call back, call server; update back the fetched created RefId to state 
            this.props.onFormCreate(this.GetState()).then((serverReturn) => {
                this.setState({ RefId: JSON.parse(serverReturn).RefId });
            });
        }
    }
    render() {
        return (
            <div className="container">
                <div className="flexDiv">
                    &nbsp;  <h1>Part Information</h1><br />
                </div>
                <form className="Form" onSubmit={this.handleSubmit}>
                    {/* gen */}
                    <div className="row">
                        <div className="col-3">
                            <input type="button" value="Print Barcode" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3">Part Barcode:</div>
                        <div className="col-3 p-1">
                            <label>
                                <input value={this.state.PartNo} type="text" maxLength="255" onChange={this.handleFieldChange} name="PartNo" required />
                            </label>
                        </div>
                    </div>

                    <GetDatalist requiredType="PartTypeList" />
                    <div className="row">
                        <div className="col-3">Part Type:</div>
                        <div className="col-9 p-1">
                            <input list="PartTypeList" value={this.state.PartType} type="text" onChange={this.handleFieldChange} name="PartType" />
                        </div>

                    </div>

                    <div className="row">
                        <div className="col-3">Manufacturer:</div>
                        <div className="col-9 p-1">
                            <input className="xtralongBox" value={this.state.Manufacturer} type="text" maxLength="100" onChange={this.handleFieldChange} name="Manufacturer" />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-3">Description:</div>
                        <div className="col-9 p-1">
                            <label>
                                <input className="xtralongBox" value={this.state.Description} type="text" maxLength="255" onChange={this.handleFieldChange} name="Description" required />
                            </label>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-3">Consumable:</div>
                        <div className="col-3 p-1">
                            <input type="checkbox" onChange={this.handleToggle} checked={this.state.Consumable} name="Consumable" />
                        </div>

                    </div>

                    <div className="row">
                        <div className="col-3">Supplier:</div>
                        <div className="col-6 p-1">
                            {this.state.Suppliers.length > 0 && <GetSelectList data={this.state.Suppliers} name={"Supplier"} handleFieldChange={this.handleFieldChange} selectedValue={this.state.Supplier} requiredType={"Suppliers"} displayField={"Name"} valueField={"Name"} style={{ width: '100%' }} />}
                        </div>

                    </div>

                    <div className="row">
                        <div className="col-3">Price:</div>
                        <div className="col-9 p-1">
                            <label>
                                <input value={this.state.Price} type="number" step="1" onChange={this.handleFieldChange} name="Price" />
                            </label>
                        </div>

                    </div>
                    <div className="row">
                        <div className="col-3">PicLink:</div>
                        <div className="col-6 p-1">
                            <label>
                                <input className="xtralongBox" value={this.state.PicLink} type="text" onChange={this.handleFieldChange} name="PicLink" />
                            </label>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-2">Total Quantity:</div>
                        <div className="col-2 p-1">Out Quantity:</div>
                        <div className="col-2 p-1">Stock:</div>
                    </div>

                    <div className="row">
                        <div className="col-2">
                            <input value={this.state.TotalQuantity} type="number" step="1" onChange={this.handleFieldChange} name="TotalQuantity" style={{ width: '100%' }} required />
                        </div>
                        <div className="col-2 p-1">
                            <input value={this.state.OutQuantity} type="number" step="1" onChange={this.handleFieldChange} name="OutQuantity" style={{ width: '100%' }} />
                        </div>

                        <div className="col-2 p-1">
                            <input value={this.state.Stock} type="number" name="OutQuantity" style={{ width: '100%' }} readOnly />
                        </div>
                    </div>
                    <div className="form-group row" >
                        {!this.props.isSubmitSuccess && <div className="col-lg-2"><button type="submit" className="btn btn-block btn-primary"><i className="fas fa-save"></i> Submit</button></div>}
                        <div className="col-lg-2"> <button type="button" className="btn btn-block btn-warning" value="" onClick={() => window.close()}><i className="fas fa-window-close"></i> Close</button></div>

                    </div>

                    <div className="centralContainerToast" >
                        {this.props.isSubmited &&
                            <HandleAfterSubmit_toast
                                origin_form={this.constructor.name}
                                close_handle={this.props.handle_closeToastBox}
                                submitMessage_header="Message">
                                <p className="" type="complex_message">{this.props.submitMessage} </p>

                                <button on_click={() => this.props.handle_closeToastBox()} className="ContainerToastCloseButton">Close</button>

                            </HandleAfterSubmit_toast>
                        }
                    </div>
                    {this.props.isSubmited && <div id="opaque" >&nbsp;</div>}
                </form>
            </div >

        );
    }
}

