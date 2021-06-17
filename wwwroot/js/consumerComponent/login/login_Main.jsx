import handleServerFeedback from '/js/shared/handleServerFeedback.js';
import serverComuunication from '/js/shared/serverComuunication.js';
export default class Login_Main extends React.Component {
    constructor(props) {
        super(props);
        this.handleServerSubmit = this.handleServerSubmit.bind(this);
    }
    state = {
        user_name: '',
        password: '',
        isSubmited: false,
        isSubmitSuccess: false,
        submitMessage: ''
    };
    handleStateManagement_General_ServerFeedback = (serverFeedback) => {
        return handleServerFeedback(serverFeedback).then((massaged_feedback) => { 
            this.setState({ isSubmitSuccess: massaged_feedback.isSubmitSuccess, submitMessage: massaged_feedback.submitMessage, isSubmited: massaged_feedback.isSubmited });
            return massaged_feedback.content;
        }).catch(exx => {
            exx.submitMessage.then(x => this.setState({ submitMessage: x, isSubmitSuccess: exx.isSubmitSuccess, isSubmited: exx.isSubmited })); 
            throw exx;
        });
    }
    async authenticateUser(pName, pPwd) {
        let usrObj = {
            'UserName': pName,
            'Password': pPwd
        };
        var tmp = serverComuunication.handleServerCommunication_type1('POST', 'Secured_login', JSON.stringify(usrObj));
        return this.handleStateManagement_General_ServerFeedback(tmp);
    }
    async handleServerSubmit() {
        //later call server to authenticate the page
        if (this.state.user_name === "" || this.state.password === "") {
            this.setState({ isSubmited: true, isSubmitSuccess: false, submitMessage: "enter the user name and password" });
            return;
        }
        this.authenticateUser(this.state.user_name, this.state.password).then(res => {
            let response = JSON.parse(res);
            if (this.state.isSubmitSuccess) {
                localStorage.setItem('token', response.token);
                localStorage.setItem('user', response.userDetails.fullName);
                localStorage.setItem('createDt', new Date());
                localStorage.setItem('isWarnedExpirey', false); 
                if (this.props.pRedirect === 'false')
                    window.close();
               else 
                    this.pageEmitter("ClientSearch"); 
            }
        });
    }
    pageEmitter = (action) =>{
        serverComuunication.handleInternalServerPageRedirect(action, {}); 
    }
    handleFieldChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }
    async componentDidMount() {
        if (localStorage.getItem('createDt') !== null) {
            const diffTime = Math.abs(new Date() - new Date(localStorage.getItem('createDt')));
            const diffSec = Math.ceil(diffTime / 1000);
            if (diffSec < 300) {
                this.pageEmitter("ClientSearch"); 
            } else
                console.info("time almost up +++0")
        }
    }
    render() {
        return this.props.render({
            ...this.state,
            handleServerSubmit: this.handleServerSubmit,
            handleFieldChange: this.handleFieldChange 
        });
    }
}