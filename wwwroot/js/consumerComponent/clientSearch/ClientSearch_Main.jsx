import serverComuunication from '/js/shared/serverComuunication.js'; 
import Client_Search_Input_Form from '/js/formComponent/clientSearch/Client_Search_Input_Form.jsx';
import handleServerFeedback from '/js/shared/handleServerFeedback.js';
class ClientSearch_Main extends React.Component {
    constructor(props) {
        super(props);
        //gen
        this.state = {
            isSubmited: false,
            isSubmitSuccess: false,
            submitMessage: ''
        };
        this.handleServerSubmit = this.handleServerSubmit.bind(this);
    }
    pageEmitter = (action, isNewPage, param1) => {
        let queryString = {
            "pageAction": "update",
            "seatNo": [param1]
        };
        var path = "";
        switch (action) {
            case "client":
                path = "ClientSearch/clientInformation";
                break;
            case "wheelchair":
                queryString["workingForm"] = 'WheelChair_Information';
                path = "WheelChairInformationPage/index";
                break;
        }
        if (isNewPage)
            serverComuunication.handleInternalServerPageRedirect_newPage(path, queryString);
        else
            serverComuunication.handleInternalServerPageRedirect(path, queryString);
    }
    getCtrller(inputPart) {
        switch (inputPart) {
            case "part1":
                return 'ClientSearch_search_Client_By_Client';
            case "part2":
                return 'ClientSearch_search_Loan';
            case "part3":
                return 'ClientSearch_search_wheelchairs';
        }
    }
    handleStateManagement_General_ServerFeedback = (serverFeedback) => {
        return handleServerFeedback(serverFeedback).then((massaged_feedback) => {
            this.setState({ isSubmitSuccess: massaged_feedback.isSubmitSuccess, submitMessage: massaged_feedback.submitMessage, isSubmited: massaged_feedback.isSubmited });
            return massaged_feedback.content;
        }).catch(exx => {
            exx.submitMessage.then(x => this.setState({ submitMessage: x, isSubmitSuccess: exx.isSubmitSuccess, isSubmited: exx.isSubmited }));
            throw exx;
        });
    }
    async handleServerSubmit(action, part, inputCriteria) {
        let tmp = serverComuunication.handleServerCommunication_type1(action, this.getCtrller(part), inputCriteria);
        return this.handleStateManagement_General_ServerFeedback(tmp); 
    }
    render() {
        return (
            <div className="container">
                <Client_Search_Input_Form pageEmitter={this.pageEmitter} handleServerSubmit={this.handleServerSubmit}
                    isSubmited={this.state.isSubmited} isSubmitSuccess={this.state.isSubmitSuccess} submitMessage={this.state.submitMessage}
                />
            </div >
        );
    }
}
ReactDOM.render(<ClientSearch_Main />, document.getElementById('clientSearchForm'));