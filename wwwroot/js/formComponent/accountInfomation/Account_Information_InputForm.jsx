import GetDatalist from '/js/shared/GetDatalist.jsx';
import HandleAfterSubmit from '/js/shared/HandleAfterSubmit.jsx';

export default class Account_Information_InputForm extends React.Component {
    constructor(props) {
        super(props);
        //gen
        this.state = {
            Id: this.props.pid,
            UserName: '',
            Password: '',
            Role: '',
            CreatedBy: '',
            CreatedDate: '',
            ModifiedBy: '',
            ModifiedDate: '',
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
        if (this.props.isFormUpdate() && this.props.pid)
            this.props.getData({ Controller: this.constructor.name }).then(
                () => {
                    let data = this.props.fetchedData;
                    console.log(data)
                    for (let prop in data) {
                        if (prop == 'Date' && data[prop]) {
                            var doo = new Date(data[prop]);
                            var doo_r = new Date(doo.getTime() + Math.abs(doo.getTimezoneOffset() * 60000));
                            this.setState({ [prop]: doo_r.toISOString().slice(0, 10) });
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
            Id: parseInt(this.state.Id),
            UserName: this.state.UserName,
            Password: this.state.Password,
            Role: this.state.Role,
            CreatedBy: this.state.CreatedBy,
            CreatedDate: this.state.CreatedDate === '' ? null : this.state.CreatedDate,
            ModifiedBy: this.state.ModifiedBy,
            ModifiedDate: this.state.ModifiedDate === '' ? null : this.state.ModifiedDate
        };
    }
    handleSubmit(e) {
        e.preventDefault();
        // update or create
        if (this.props.isFormUpdate()) {
            this.props.onFormModify(this.GetState());
        } else {
            // give a temporary id ; in the call back, call server; update back the fetched created ref_id to state 
            this.props.onFormCreate(this.GetState()).then((serverReturn) => {
                this.setState({ RefId: serverReturn.refId });
            });
        }
    }
    render() {
        return (
            <div className="container">
                <form className="Form" onSubmit={this.handleSubmit}>
                    {this.props.lastSubmittedForm === this.constructor.name && this.props.isSubmited && <HandleAfterSubmit isSubmited={this.props.isSubmited} isSubmitSuccess={this.props.isSubmitSuccess} submitMessage={this.props.submitMessage} />}
                    {/* gen */}

                    <div className="row">&nbsp;</div>

                    <div className="row">
                        <div className="col-3">
                            <h4>User Name:</h4>
                        </div>
                        <div className="col-9 p-1">
                            <h4>{this.state.UserName}</h4>
                            <input value={this.state.UserName} type="hidden" style={{ width: '100%' }} maxLength="50" onChange={this.handleFieldChange} name="UserName" required />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3">
                            Password:
                                 </div>
                        <div className="col-9 p-1">
                            <input value={this.state.Password} type="password" onChange={this.handleFieldChange} name="Password" />
                        </div>
                    </div>
                    <div className="row" style={{ "display": "none" }}>
                        <div className="col-3">
                            Role:
                                 </div>
                        <div className="col-9 p-1">
                            <input value={this.state.Role} type="text" maxLength="50" onChange={this.handleFieldChange} name="Role" />
                        </div>
                    </div>


                    <div className="form-group row" >
                        <div className="col-lg-2"><button type="submit" className="btn btn-block btn-primary" ><i className="fas fa-save"></i> Submit</button></div>
                        <div className="col-lg-2"> <button type="button" className="btn btn-block btn-warning" value="" onClick={() => window.close()}><i className="fas fa-window-close"></i> Close</button></div>
                        {this.props.lastSubmittedForm === this.constructor.name && this.props.isSubmited && <HandleAfterSubmit isSubmited={this.props.isSubmited} isSubmitSuccess={this.props.isSubmitSuccess} submitMessage={this.props.submitMessage} />}
                    </div>

                </form>
            </div>
        );
    }
} 