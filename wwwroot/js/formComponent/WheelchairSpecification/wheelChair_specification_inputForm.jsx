import handlePicture from '/js/shared/handlePicture.js';
//20200812 add toast
import HandleAfterSubmit_toast from '/js/shared/HandleAfterSubmit_toast.jsx';

export default class WheelChair_Specification_InputForm extends React.Component {
    constructor(props) {
        super(props);
        //gen
        this.state = {
            RefId: this.props.RefId ? this.props.RefId : '',
            WheelchairModel: '',
            WheelchairManufacturer: '',
            Description: '',
            Power: false,
            TiltInSpace: false,
            Foldable: false,
            WcPicLink: '',
            CatalogLink: '',
            curPrice: '',
            picLink_CatalogLink: '',
            picLink_WcPicLink: '',
            uploadImg: 'N',
            imgFileName: '',
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
            this.props.getData({ Controller: this.constructor.name }).then(
                () => {
                    let data = this.props.fetchedData;
                    console.log(data)
                    for (let prop in data) {
                        if (String(prop).toLowerCase().includes('date') && data[prop]) {
                            var doo = new Date(data[prop]);
                            var doo_r = new Date(doo.getTime() + Math.abs(doo.getTimezoneOffset() * 60000));
                            this.setState({ [prop]: doo_r.toISOString().slice(0, 10) });
                        }
                        else {
                            if (data[prop])
                                this.setState({ [prop]: data[prop] });
                        }
                    }

                    handlePicture(this.state.WcPicLink, "R", 'picLink_WcPicLink', this.setImage);
                    handlePicture(this.state.CatalogLink, "R", 'picLink_CatalogLink', this.setImage);
                }
            );
    }
    GetState() {
        return {
            Controller: this.constructor.name,
            RefId: this.state.RefId === '' ? 0 : parseInt(this.state.RefId),
            WheelchairModel: this.state.WheelchairModel,
            WheelchairManufacturer: this.state.WheelchairManufacturer,
            Description: this.state.Description,
            Power: this.state.Power,
            TiltInSpace: this.state.TiltInSpace,
            Foldable: this.state.Foldable,
            WcPicLink: this.state.WcPicLink,
            CatalogLink: this.state.CatalogLink
        };
    }
    setImage = (stateName, pic) => { this.setState({ [stateName]: [pic] }) }
    handleSubmit() {
        // update or create
        if (this.props.isFormUpdate()) {
            this.props.onFormModify(this.GetState());
        } else {
            // give a temporary id ; in the call back, call server; update back the fetched created ref_id to state 
            this.props.onFormCreate(this.GetState()).then((serverReturn) => {
                this.setState({ WheelchairNo: JSON.parse(serverReturn).RefId });
            });
        }
    }
    chgUploadImg = (e) => {
        //    console.log(this.state.uploadImg)
        this.setState({ [e.target.name]: e.target.value });
    }
    handleUploadFiles = (e) => {
        // console.log(this.state.uploadImg)
        //for (let i = 0; i < files.length; i++) { 
        // if (!file.type.startsWith('image/')) { continue }
        if (this.state.uploadImg === 'N' || this.state.uploadImg === '') return;

        const reader = new FileReader();
        reader.onload = function (e) {
            // console.log("on upload")
            if (this.state.uploadImg === 'P')
                this.setState({
                    picLink_WcPicLink: [reader.result]
                });
            else if (this.state.uploadImg === 'C')
                this.setState({
                    picLink_CatalogLink: [reader.result]
                });
            this.setState({ imgFileName: '' });
        }.bind(this);
        reader.onloadstart = (e) => { console.log("reader onloadstart " + e.total) };
        reader.onerror = (e) => { console.error("reader error " + e) };
        reader.onabort = (e) => { console.error("reader abort " + e) };
        reader.readAsDataURL(e.target.files[0]);
        //}
    }
    prepareImages() {
        let imagePathLst = ['/image/sample_image_1.jpg', '/image/sample_image_2.jpg', '/image/sample_image_3.jpg', '/image/sample_image_4.jpg'];
        let imagePathLst_thumb = ['/image/sample_image_1_thumb.jpg', '/image/sample_image_2_thumb.jpg', '/image/sample_image_3_thumb.jpg', '/image/sample_image_4_thumb.jpg'];
        return (
            <div id="my_thumb_slider">
                <div className="slides">
                    {imagePathLst.map((i, k) => {
                        return <div className="slide"> <img src={i} key={k} alt={i} /></div>
                    })};
                </div>
                <hr />
                <div className="controls">
                    {imagePathLst_thumb.map((i, k) => {
                        return <span className="control"><img src={i} key={k} alt={i} /></span>
                    })};
                </div>
            </div>
        );
    }
    render() {
        return (
            <div className="container">

                <div className="flexDiv">
                    &nbsp;  <h1>WheelChair Specification</h1><br />
                </div>

                <form className="Form">
                    <input value={this.state.RefId} type="hidden" maxLength="6" onChange={this.handleFieldChange} name="RefId" required />
                    {/* gen */}
                    <div className="TSectionContainer">
                        <div className="upperLeft" id="noBorder">
                            <div className="row">
                                <div className="col-6">Wheelchair Model:</div>
                                <div className="col-6 p-1">
                                    <input value={this.state.WheelchairModel} type="text" maxLength="12" onChange={this.handleFieldChange} name="WheelchairModel" />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6">Wheelchair Manufacturer:</div>
                                <div className="col-6 p-1">
                                    <label>
                                        <input value={this.state.WheelchairManufacturer} type="text" maxLength="12" onChange={this.handleFieldChange} name="WheelchairManufacturer" />
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="upperRight" id="noBorder">
                            <div className="row">
                                <div className="col-3">Power:</div>
                                <div className="col-3 p-1">
                                    <input type="checkbox" onChange={this.handleToggle} checked={this.state.Power} name="Power" />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-3">Tilt-in-space:</div>
                                <div className="col-3 p-1">
                                    <input type="checkbox" onChange={this.handleToggle} checked={this.state.TiltInSpace} name="TiltInSpace" />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-3">Foldable:</div>
                                <div className="col-3 p-1">
                                    <input type="checkbox" onChange={this.handleToggle} checked={this.state.Foldable} name="Foldable" />
                                </div>
                            </div>
                        </div>
                        <div className="bottom">
                            <div className="row">
                                <div className="col-3">Features:</div>
                                <div className="col-9 p-1">
                                    <textarea name="Description" form="Form" value={this.state.Description} rows="10" cols="50" onChange={this.handleFieldChange} > </textarea>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-3">Catalog:</div>
                                <div className="col-9 p-1">
                                    <input value={this.state.CatalogLink} style={{ width: '80%' }} type="text" maxLength="50" onChange={this.handleFieldChange} name="CatalogLink" />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-3">Picture Link:</div>
                                <div className="col-9 p-1">
                                    <input value={this.state.WcPicLink} style={{ width: '80%' }} type="text" maxLength="50" onChange={this.handleFieldChange} name="WcPicLink" />
                                </div>
                            </div>
                            <div className="row" >
                                <img src={this.state.picLink_WcPicLink} className="bigImg" />
                            </div>
                            <div className="row" >
                                {this.props.isFormUpdate() && this.prepareImages()}
                            </div>
                            <div className="row">
                                <div className="col-3">Upload image:</div>
                                <div className="col-9 p-1">
                                    <label>
                                        <input type="radio" id="pict" value="P" name="uploadImg" onChange={this.chgUploadImg} />
                                        &nbsp; picture link &nbsp;
                                    </label>
                                    <label>
                                        <input type="radio" id="none" value="N" name="uploadImg" defaultChecked onChange={this.chgUploadImg} />
                                        &nbsp; none &nbsp;
                                    </label>
                                    <input type="file" name="fileUploader" value={this.state.imgFileName} onChange={this.handleUploadFiles}
                                        accept="image/png, image/jpeg" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="form-group row" >
                        {!this.props.isSubmitSuccess && <div className="col-lg-2"><button type="submit" onClick={(e) => { e.preventDefault(); this.handleSubmit(); }} className="btn btn-block btn-primary"><i className="fas fa-save"></i> Submit</button></div>}
                        <div className="col-lg-2"> <button type="button" className="btn btn-block btn-warning" value="" onClick={() => window.close()}><i className="fas fa-window-close"></i> Close</button></div>
                    </div>

                    {this.props.isSubmited &&
                        <div className="centralContainerToast" >
                            <HandleAfterSubmit_toast
                                origin_form={this.constructor.name}
                                close_handle={this.props.handle_closeToastBox}
                                submitMessage_header="Message">
                                <p className="" type="complex_message">{this.props.submitMessage} </p>
                                {this.props.isSubmitSuccess && <button on_click={() => this.props.handle_closeToastBox()} className="ContainerToastCloseButton">Close</button>}
                            </HandleAfterSubmit_toast>
                        </div>
                    }
                    {this.props.isSubmited && <div id="opaque" >&nbsp;</div>}
                </form>
            </div >
        );
    }
} 