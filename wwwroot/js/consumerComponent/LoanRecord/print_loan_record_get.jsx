import handleServerFeedback from '/js/shared/handleServerFeedback.js'; 
import serverComuunication from '/js/shared/serverComuunication.js';
export default class Print_loan_record_get extends React.Component {
    constructor(props) {
        super(props);
    }
    state = {
        report_setting: {},
        loan_article_info: [],
        report_setting_note: [],
        wc_info: {},
        loan_info: {}
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
    async getReportSetting() {
         var tmp = serverComuunication.handleServerCommunication_type4('GET', 'Common_async', 'loan', { param: "dummy", lang: this.props.pLanguage });
        return this.handleStateManagement_General_ServerFeedback(tmp).then(
            (res) => {
                if (res !== null && res !== 'null' && res !== '') this.setState({ report_setting: JSON.parse(res) });
            })
    }
    async getReportSetting_note() {
        var tmp = serverComuunication.handleServerCommunication_type4('GET', 'Common_async', 'getReportList', { param: 'loan_note', lang: this.props.pLanguage });
        return this.handleStateManagement_General_ServerFeedback(tmp).then(
            (res) => {
                if (res !== null && res !== 'null' && res !== '') this.setState({ report_setting_note: res.split('(@BR)').filter(function (i) { return i }) }); 
            })
    }
    async getLoanArticleDetail() {
        var tmp = serverComuunication.handleServerCommunication_type4('GET', 'Loaned_articles_list_revamp', 'loan_detail', { param: this.props.pLoanNo });
        return this.handleStateManagement_General_ServerFeedback(tmp).then(
            (res) => {
                if (res !== null && res !== 'null' && res !== '') this.setState({ loan_article_info: res });
            });
    }
    async getLoanDetail() {
        var tmp = serverComuunication.handleServerCommunication_type2('GET', 'Loan_record_inputForm', this.props.pLoanNo);
        return this.handleStateManagement_General_ServerFeedback(tmp).then(
            (res) => {
                if (res !== null && res !== 'null' && res !== '') this.setState({ loan_info: JSON.parse(res) })
            }
        );
    }
    async componentDidMount() {
        const remotePromisesArr = [];
        remotePromisesArr.push(this.getReportSetting());
        remotePromisesArr.push(this.getLoanDetail());
        remotePromisesArr.push(this.getLoanArticleDetail());
        remotePromisesArr.push(this.getReportSetting_note());
        Promise.all(remotePromisesArr)
            .then(() => {
                if (this.state.loan_info && this.state.loan_info.WheelchairNo != "") {
                    let tmp = serverComuunication.handleServerCommunication_type2('GET', 'WheelChair_Information_InputForm', this.state.loan_info.WheelchairNo);
                    this.handleStateManagement_General_ServerFeedback(tmp).then(
                        (res) => this.setState({ wc_info: JSON.parse(res) })
                    );
                }
            }).catch(ex => { throw ex; });
    }
    render() {
        return this.props.render({
            ...this.state
        });
    }
}