const HandleAfterSubmit_toast = React.lazy(() => import('/js/shared/HandleAfterSubmit_toast.jsx'));
import getDisplayDate from '/js/shared/getDisplayDate.js';


export default class Progress_Note_InputForm extends React.Component {
    constructor(props) {
        super(props);
        //gen
        this.state = {
            RefId: this.props.pid,
            SeatNo: this.props.seatNo ? this.props.seatNo : '',
            Date: '',
            Note: '',
            Therapist: '',
            Hardcopy: '',
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
                    for (let prop in data) {
                        if (prop == 'Date' && data[prop]) {
                            this.setState({ [prop]: getDisplayDate(data[prop]) });
                        }
                        else {
                            if (data[prop])
                                this.setState({ [prop]: data[prop] });
                        }
                    }
                    if (data['SeatNo'])
                        this.props.getFormAge(data['SeatNo'], data['Date']);
                }
            ); 
    }
    GetState() {
        return {
            Controller: this.constructor.name,
            RefId: parseInt(this.state.RefId),
            SeatNo: this.state.SeatNo,
            Date: this.state.Date,
            Note: this.state.Note ? this.state.Note : ' ',
            Therapist: this.state.Therapist,
            Hardcopy: this.state.Hardcopy
        };
    }
    //20200811 Carlos Go to top
    handleSubmitAfterPosition() {
        console.log("handleSubmitAfterPosition")
        $('html,body').animate({
            scrollTop: $(".Form").offset().top
        }, 'slow');
    }
    handleSubmit(e) {
        e.preventDefault();
        //20200813 handleSubmitAfterPosition
        this.handleSubmitAfterPosition();
        // update or create
        if (this.props.isFormUpdate()) {
            this.props.onFormModify(this.GetState());

        } else {
            this.props.onFormCreate(this.GetState()).then((serverReturn) => this.setState({ RefId: JSON.parse(serverReturn).refId }));
        }
    }
    render() {
        return (
            <div className="container">
                <form className="Form" onSubmit={this.handleSubmit}>
                    {/* gen */}
                    <div className="row">
                        <div className="col-3 p-2">
                            Age / Seat_No:
                                 </div>
                        <div className="col-1 p-2">
                            <input className="box_short" value={this.props.age} type="number" name="age" disabled />
                        </div>
                        <div className="col-8 p-2">
                            <input value={this.state.SeatNo} type="text" maxLength=" 50 " onChange={this.handleFieldChange} name="SeatNo" disabled={this.props.isFormUpdate()} required />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3">
                            Date:
                                 </div>
                        <div className="col-9 p-1">
                            <input value={this.state.Date} type="date" onChange={this.handleFieldChange} name="Date" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3">
                            Progress Note:
                                 </div>
                        <div className="col-9 p-1">
                            <textarea name="Note" form="Form" value={this.state.Note} onChange={this.handleFieldChange} > </textarea>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3">
                            Therapist:
                                 </div>
                        <div className="col-9 p-1">
                            <input value={this.state.Therapist} type="text" maxLength=" 255 " onChange={this.handleFieldChange} name="Therapist" required />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3">
                            Hardcopy:
                                 </div>
                        <div className="col-9 p-1">
                            <textarea name="Hardcopy" form="Form" value={this.state.Hardcopy} onChange={this.handleFieldChange} > </textarea>
                        </div>
                    </div>
                  
                    <div className="form-group row">
                        {!this.props.isSubmitSuccess && <div className="col-lg-2"><button type="submit" className="btn btn-block btn-primary" value="" ><i className="fas fa-save"></i> Submit</button></div>}
                        <div className="col-lg-2"><button onClick={(e) => { e.preventDefault(); this.props.pageEmitter("Accessment_all", false, this.state.SeatNo, String(this.constructor.name).replace("_InputForm", "")) }} className="btn btn-block btn-warning"><i className="fas fa-arrow-left"></i> Back to index</button></div>
                    </div>

                    {this.props.isSubmited && <div>
                        <div className="centralContainerToast" >
                            <Suspense fallback={<div>Loading...</div>}>
                                <HandleAfterSubmit_toast
                                    origin_form={this.constructor.name} close_handle={this.props.handle_closeToastBox} submitMessage_header={this.props.isSubmitSuccess ? "Success" : "Fail"}>
                                    <p className="" type="complex_message">{this.props.submitMessage} </p>
                                    {this.props.isSubmitSuccess && <button on_click={() => this.props.pageEmitter("Accessment_index", false, this.state.SeatNo, String(this.constructor.name).replace("_InputForm", ""), "update", this.state.RefId)} className="ContainerToastCloseHalfButton">View</button>}

                                    {this.props.isSubmitSuccess && <button on_click={() => this.props.pageEmitter("Accessment_all", false, this.state.SeatNo, String(this.constructor.name).replace("_InputForm", ""))} className="ContainerToastCloseHalfButton">Go to index</button>}
                                </HandleAfterSubmit_toast>
                            </Suspense>
                        </div>
                        <div id="opaque" style={this.props.isSubmited ? { display: "block" } : { display: "none" }}></div>
                    </div>
                    }
                    <br />
                </form>

            </div>
        );
    }
} 