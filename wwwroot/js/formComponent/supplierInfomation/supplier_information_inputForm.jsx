import getDisplayDate from '/js/shared/getDisplayDate.js';
//20200812 add toast
import HandleAfterSubmit_toast from '/js/shared/HandleAfterSubmit_toast.jsx';


export default class Supplier_Information_InputForm extends React.Component {
    constructor(props) {
        super(props);
        //gen
        this.state = {
            RefId: this.props.pid,
            Supplier1: '',
            Last: '',
            TelWork: '',
            TelOffice: '',
            Fax: '',
            Email: '',
            Address: '',
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
        if (this.props.isFormUpdate() && this.props.pid)
            this.props.getData({ Controller: this.constructor.name }).then(
                () => {
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
                }
            );
    }
    GetState() {
        return {
            Controller: this.constructor.name,
            RefId: parseInt(this.state.RefId),
            Supplier1: this.state.Supplier1,
            Last: this.state.Last,
            TelWork: this.state.TelWork === '' ? null : parseInt(this.state.TelWork),
            TelOffice: this.state.TelOffice === '' ? null : parseInt(this.state.TelOffice),
            Fax: this.state.Fax === '' ? null : parseInt(this.state.Fax),
            Email: this.state.Email === '' ? null : this.state.Email,
            Address: this.state.Address === '' ? null : this.state.Address
        };
    }
    ////////////////////////////////////////////  
    handleSubmit() {
        // update or create 
        if (this.props.isFormUpdate()) {
            this.props.onFormModify(this.GetState());
        }
        else {
            this.props.onFormCreate(this.GetState()).then((serverReturn) => {
                console.log(serverReturn)
                this.setState({ RefId: serverReturn.RefId });
            });
        }
    }
    render() {
        return (
            <div className="container">
                <div className="flexDiv">
                    &nbsp;  <h1>Supplier Information</h1><br />
                </div>
                <form className="Form" >
                    <div className="row">&nbsp;</div>

                    <div className="row">
                        <div className="col-3">
                            Supplier:
                                 </div>
                        <div className="col-9 p-1">
                            <input value={this.state.Supplier1} type="text" style={{ width: '100%' }} maxLength="50" onChange={this.handleFieldChange} name="Supplier1" required />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3">
                            Contact Person:
                                 </div>
                        <div className="col-9 p-1">
                            <input value={this.state.Last} type="text" onChange={this.handleFieldChange} name="Last" />
                        </div>
                    </div>
                    <div className="row">

                        <div className="col-12"><u>Contact Information</u></div>
                    </div>

                    <div className="row">
                        <div className="col-3">
                            Mobile:
                                 </div>
                        <div className="col-9 p-1">
                            <input value={this.state.TelWork} type="number" step="1" onChange={this.handleFieldChange} name="TelWork" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3">
                            Office:
                                 </div>
                        <div className="col-9 p-1">
                            <input value={this.state.TelOffice} type="number" step="1" onChange={this.handleFieldChange} name="TelOffice" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3">
                            Fax:
                                 </div>
                        <div className="col-9 p-1">
                            <input value={this.state.Fax} type="number" step="1" onChange={this.handleFieldChange} name="Fax" />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-3">
                            e-Mail:
                                 </div>
                        <div className="col-9 p-1">
                            <input value={this.state.Email} type="text" onChange={this.handleFieldChange} name="Email" />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-3">
                            Address:
                                 </div>
                        <div className="col-9 p-1">
                            <textarea name="Address" form="Form" rows="4" cols="50" value={this.state.Address} onChange={this.handleFieldChange} > </textarea>
                        </div>
                    </div>
                    <div className="form-group row" >
                        {!this.props.isSubmitSuccess && <div className="col-lg-2"><button onClick={(e) => { e.preventDefault(); this.handleSubmit(); }} className="btn btn-block btn-primary"><i className="fas fa-save"></i> Submit </button></div>}
                        <div className="col-lg-2"> <button type="button" className="btn btn-block btn-warning" value="" onClick={() => window.close()}><i className="fas fa-window-close"></i> Close</button></div>
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

                </form>
            </div>
        );
    }
} 