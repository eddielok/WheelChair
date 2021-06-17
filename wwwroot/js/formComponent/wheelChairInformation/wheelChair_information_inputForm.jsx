import GetDatalist from '/js/shared/GetDatalist.jsx';
import GetSelectList from '/js/shared/GetSelectList.jsx';

//20200811 add toast
import HandleAfterSubmit_toast from '/js/shared/HandleAfterSubmit_toast.jsx';

export default class WheelChair_Information_InputForm extends React.Component {
    constructor(props) {
        super(props);
        //gen
        this.state = {
            wheelchairNo: this.props.WheelchairNo ? this.props.WheelchairNo : '(avai. after submit)',
            WheelchairModel: '',
            WheelchairModels: [],
            Availability: false,
            Status: '',
            Supplier: '',
            Suppliers: [],
            Color: '',
            PandaSize: '',
            SeatWidth: '',
            SeatDepth: '',
            Recliner: false,
            ElevatingFr: false,
            RearWheelSize: '',
            Price: '',
            AcqusitionDate: '',
            Inventory: '',
            FundedBy: '',
            LabelPrinted: false,
            CondemnDate: '',
            TiltInSpace: false,
            Power: false,
            Foldable: false

        };
        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleFieldChange(e) {
        this.setState({ [e.target.name]: e.target.value }, (d) => { this.props.handleFormUpdate_parent(this.GetState()) });
        if (e.target.name == "WheelchairModel") {
            this.getWheelChairInfomationSuggestion(e.target.value);
        }
    }
    handleToggle = ({ target }) => {
        this.setState(s => ({ ...s, [target.name]: !s[target.name] }), (d) => { this.props.handleFormUpdate_parent(this.GetState()) })
    }
    getWCData = () => {
        this.props.getData({ Controller: this.constructor.name }).then(
            () => {
                let data = this.props.fetchedData;
                var wcModel = "";
                for (let prop in data) {
                    console.log(prop)
                    if (String(prop).toLowerCase().includes('date') && data[prop]) {
                        var doo = new Date(data[prop]);
                        var doo_r = new Date(doo.getTime() + Math.abs(doo.getTimezoneOffset() * 60000));
                        this.setState({ [prop]: doo_r.toISOString().slice(0, 10) });
                    }
                    else {
                        if (data[prop])
                            this.setState({ [prop]: data[prop] });
                        if (prop === "WheelchairModel") wcModel = data[prop]
                    }
                }
                if (wcModel !== "")
                    this.getWheelChairInfomationSuggestion(wcModel);
            }
        );
    }
    async componentDidMount() {
        const remotePromisesArr = [this.getWheelchairModelsSuggestion(), this.getSuppliersSuggestion()];
        if (this.props.isFormUpdate() && this.props.WheelchairNo)
            remotePromisesArr.push(this.getWCData());
        Promise.all(remotePromisesArr)
            .catch(ex => {
                throw ex;
            });
    }
    async getWheelchairModelsSuggestion() {
        this.props.getDataType2('GET', 'Common', 'WheelChairModel')
            .then((getData) => {
                this.setState({ WheelchairModels: JSON.parse(getData) });
            }).catch((response) => {
                console.log("catch in Common getWheelchairModelsSuggestion");
                console.log(response);
            });
    }
    async getSuppliersSuggestion() {
        this.props.getDataType2('GET', 'Common', 'Suppliers')
            .then((getData) => {
                this.setState({ Suppliers: JSON.parse(getData) });
            }).catch((response) => {
                console.log("catch in Common getSuppliersSuggestion");
                console.log(response);
            });
    }
    getWheelChairInfomationSuggestion(model) {
        this.props.getDataType4('GET', 'Additional', '', { "classType": "WheelChairInfomation", "classId": model })
            .then((tmpData) => {
                let tmpObj = JSON.parse(tmpData);
                if (tmpData) {
                    let t = JSON.parse(tmpData);
                    for (let prop in t)
                        if (tmpObj[prop])
                            this.setState({ [t[prop]["Key"]]: t[prop]["Value"].toLowerCase() == "true" });
                }
            }).catch((response) => {
                throw response;
            });
    }
    GetState() {
        return {
            Controller: this.constructor.name,
            WheelchairNo: this.state.wheelchairNo === '(avai. after submit)' ? '0' : this.state.wheelchairNo,
            WheelchairModel: this.state.WheelchairModel,
            Availability: this.state.Availability,
            Status: this.state.Status,
            Supplier: this.state.Supplier,
            Color: this.state.Color,
            PandaSize: parseFloat(this.state.PandaSize),
            SeatWidth: parseFloat(this.state.SeatWidth),
            SeatDepth: parseFloat(this.state.SeatDepth),
            Recliner: this.state.Recliner,
            ElevatingFr: this.state.ElevatingFr,
            RearWheelSize: this.state.RearWheelSize,
            Price: parseFloat(this.state.Price),
            AcqusitionDate: this.state.AcqusitionDate === '' ? null : this.state.AcqusitionDate,
            Inventory: parseInt(this.state.Inventory),
            FundedBy: this.state.FundedBy,
            LabelPrinted: this.state.LabelPrinted,
            CondemnDate: this.state.CondemnDate === '' ? null : this.state.CondemnDate
        };
    }
    handleSubmit(e) {
        e.preventDefault();
        // update or create
        if (this.props.isFormUpdate()) {
            this.props.onFormModify(this.GetState());
        } else {
            // give a temporary id ; in the call back, call server; update back the fetched  
            this.props.onFormCreate(this.GetState())
                .then((serverReturn) => this.setState({ wheelchairNo: JSON.parse(serverReturn).wheelchairNo }));
        }
    }
    handleGetMaintainRecords = (e) => {
        e.preventDefault();
        if (this.state.wheelchairNo != '') this.props.getMaintainaceShowing(this.state.wheelchairNo);
    }
    render() {
        return (
            <div className="container">
                <div className="flexDiv">
                    &nbsp;  <h1>WheelChair Information</h1><br />
                </div>
                <GetDatalist requiredType="Wheelchair_Information_Color" />
                <GetDatalist requiredType="Wheelchair_Information_RearWheelSize" />
                <GetDatalist requiredType="Wheelchair_Information_status" />

                <form className="Form" onSubmit={this.handleSubmit}>
                    <div className="TSectionContainer">
                        <div className="upperLeft" id="noBorder">
                            <div className="container">
                                <div className="row">
                                    <div className="col-3 p-1">Wheelchair No:</div>
                                    <div className="col-9 p-1">
                                        <input value={this.state.wheelchairNo} type="text" maxLength="6" onChange={this.handleFieldChange} name="wheelchairNo" required />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-3 p-1">Status:</div>
                                    <div className="col-9 p-1">
                                        <input list="Wheelchair_Information_status" value={this.state.Status} type="text" maxLength="50" onChange={this.handleFieldChange} name="Status" />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-9 p-1">
                                        <label> Availability &nbsp;
                                        <input type="checkbox" onChange={this.handleToggle} checked={this.state.Availability} name="Availability" />
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="upperRight" id="noBorder">
                            <div className="container">
                                <div className="row">
                                    <div className="col-12 p-1">
                                        <label> Label Printed  &nbsp;
                                    <input type="checkbox" onChange={this.handleToggle} checked={this.state.LabelPrinted} name="LabelPrinted" />
                                        </label>  &nbsp;
                                    <input type="button" value="Wheelchair Labels" />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12 p-1">
                                        <input type="button" value="Maintenance Record" onClick={this.handleGetMaintainRecords} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bottom">
                            <div className="container">
                                <div className="row">
                                    <h5>Sponsor information</h5>
                                </div>
                                <div className="row">
                                    <div className="col-3 p-1">Condemn Date:</div>
                                    <div className="col-3 p-1">
                                        <input value={this.state.CondemnDate} type="date" onChange={this.handleFieldChange} name="CondemnDate" />
                                    </div>
                                    <div className="col-3 p-1">Acqusition Date:</div>
                                    <div className="col-3 p-1">
                                        <input value={this.state.AcqusitionDate} type="date" onChange={this.handleFieldChange} name="AcqusitionDate" />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-3 p-1">Funded By:</div>
                                    <div className="col-3 p-1">
                                        <input type="text" list="FundedBy" name="FundedBy" value={this.state.FundedBy} onChange={this.handleFieldChange} />
                                    </div>
                                    <div className="col-3 p-1">CUHK Inventory:</div>
                                    <div className="col-3 p-1">
                                        <input value={this.state.Inventory} type="number" onChange={this.handleFieldChange} name="Inventory" />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-3 p-1">Price:</div>
                                    <div className="col-3 p-1">
                                        <input value={this.state.Price} type="number" onChange={this.handleFieldChange} name="Price" style={{ width: '100%' }} />
                                    </div>
                                </div>
                                <div className="row">
                                    <h5>Model and supplier</h5>
                                </div>
                                <div className="row">
                                    <div className="col-3 p-1">Wheelchair Model:</div>
                                    <div className="col-9 p-1">
                                        {this.state.WheelchairModels.length > 0 && <GetSelectList selectedValue={this.state.WheelchairModel} data={this.state.WheelchairModels} name={"WheelchairModel"} handleFieldChange={this.handleFieldChange} requiredType={"WheelchairModels"} displayField={"Name"} valueField={"Name"} />}
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-3 p-1">
                                        <label> Tilt-in-space   &nbsp;
                                            <input type="checkbox" onChange={this.handleToggle} checked={this.state.TiltInSpace} name="TiltInSpace" />
                                        </label>
                                    </div>
                                    <div className="col-3 p-1">
                                        <label> Power   &nbsp;
                                            <input type="checkbox" onChange={this.handleToggle} checked={this.state.Power} name="Power" readOnly />
                                        </label>
                                    </div>
                                    <div className="col-3 p-1">
                                        <label> Foldable  &nbsp;
                                            <input type="checkbox" onChange={this.handleToggle} checked={this.state.Foldable} name="Foldable" readOnly />
                                        </label>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-3 p-1">Supplier:</div>
                                    <div className="col-9 p-1">
                                        {this.state.Suppliers.length > 0 && <GetSelectList selectedValue={this.state.Supplier} data={this.state.Suppliers} name={"Supplier"} handleFieldChange={this.handleFieldChange} requiredType={"Supplier"} displayField={"Name"} valueField={"Name"} />}
                                    </div>
                                </div>
                                <div className="row">
                                    <h5>Specification</h5>
                                </div>
                                <div className="row">
                                    <div className="col-3 p-1">Color:</div>
                                    <div className="col-3 p-1">
                                        <input list="Wheelchair_Information_Color" value={this.state.Color} type="text" maxLength="12" onChange={this.handleFieldChange} name="Color" />
                                    </div>
                                    <div className="col-3 p-1">
                                        <label> Recliner &nbsp;
                                            <input type="checkbox" onChange={this.handleToggle} checked={this.state.Recliner} name="Recliner" />
                                        </label>
                                    </div>
                                    <div className="col-3 p-1">
                                        <label> Elevating Footrest &nbsp;
                                            <input type="checkbox" onChange={this.handleToggle} checked={this.state.ElevatingFr} name="ElevatingFr" />
                                        </label>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-3 p-1">Seat Width (in.):</div>
                                    <div className="col-3 p-1">
                                        <input value={this.state.SeatWidth} type="number" step="0.1" onChange={this.handleFieldChange} name="SeatWidth" />
                                    </div>

                                    <div className="col-3 p-1">Seat Depth (in.):</div>
                                    <div className="col-3 p-1">
                                        <input value={this.state.SeatDepth} type="number" step="0.1" onChange={this.handleFieldChange} name="SeatDepth" />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-3 p-1"> Rear Wheel Size </div>
                                    <div className="col-3 p-1">
                                        <input list="Wheelchair_Information_RearWheelSize" value={this.state.RearWheelSize} type="text" onChange={this.handleFieldChange} name="RearWheelSize" />
                                    </div>
                                    <div className="col-3 p-1">Panda Size  </div>
                                    <div className="col-3 p-1">
                                        <input value={this.state.PandaSize} type="number" step="0.1" onChange={this.handleFieldChange} name="PandaSize" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {this.props.isSubmited &&
                        <div className="centralContainerToast" >
                            <HandleAfterSubmit_toast
                                origin_form={this.constructor.name}
                                close_handle={this.props.handle_closeToastBox}
                                submitMessage_header="Message">
                                <p className="" type="complex_message">{this.props.submitMessage} </p>

                                <button on_click={() => this.props.handle_closeToastBox()} className="ContainerToastCloseButton">Close</button>

                            </HandleAfterSubmit_toast>
                        </div>
                    }

                    {this.props.isSubmited && <div id="opaque" >&nbsp;</div>}

                    <div className="form-group row" >
                        {!this.props.isSubmitSuccess && <div className="col-lg-2"><button type="submit" className="btn btn-block btn-primary" ><i className="fas fa-save"></i>Submit</button></div>}
                        <div className="col-lg-2"><button type="button" className="btn btn-block btn-danger" onClick={() => window.close()} ><i className="fas fa-window-close"></i>Close</button> </div>
                    </div>

                </form>
            </div >
        );
    }
} 
