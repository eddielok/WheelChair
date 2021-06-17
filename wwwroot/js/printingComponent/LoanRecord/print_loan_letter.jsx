import Print_loan_record_get from '/js/consumerComponent/LoanRecord/print_loan_record_get.jsx';
import getDisplayDate from '/js/shared/getDisplayDate.js';

class Loan_print_letter extends React.Component {
    isNonEmptyObject(o) {
        return typeof o === 'object' && Object.keys(o).length !== 0 && o.constructor === Object;
    }
    getTableRow(arr) {
        return arr.map((v, i) => <tr key={i}><td>{v["PartNo"]}</td><td>{v["Description"]}</td><td>{v["Price"]}</td><td>{v["Remarks"]}</td></tr>);
    }
    getMassgedPhone(p1, p2, p3) {
        if (!p1 && !p2 && !p3) return "--";
        else return (p1 === null ? '' : p1 + "/") + (p2 === null ? '' : p2 + "/") + (p3 === null ? '' : p3);
    }
    getWCDisplay(wcNo, wc_info) {
        if (wcNo && wcNo != undefined && wcNo != "") return wcNo + "/" + wc_info.WheelchairModel + "," + wc_info.Color + "," + wc_info.SeatWidth + " x " + wc_info.SeatDepth + "," + wc_info.PandaSize;
        else return "--";
    }
    get1stLine(template, loan_info) {
        if (template !== '' && this.isNonEmptyObject(loan_info)) return template.replace('@BorrowerName', loan_info.BorrowerName).replace('@Idno', loan_info.Idno);
        else return "";
    }
    getNoteSection(arr) {
        return arr.map((v, i) => <li key={i}>{v}</li>);
    }
    render() {
        return (
            <Print_loan_record_get pLoanNo={qLoanNumber} pLanguage={qLanguage}
                render={({ report_setting, loan_article_info, loan_info, wc_info, report_setting_note }) => {
                    return (
                        <div className="TSectionContainer">
                            {this.isNonEmptyObject(report_setting) && this.isNonEmptyObject(loan_info) && <div>
                                <div className="upperLeft" id="noBorder">{report_setting.receiver}</div >
                                <div className="upperRight" id="noBorder">{report_setting.formNo + this.props.qLoanNumber}</div>
                                <div className="bottom" style={{ fontSize: 18 }}>
                                    <div className="centralOuter" >
                                        <h2><u>{report_setting.loanLetterTitle}</u></h2></div>
                                    <p>
                                        {this.get1stLine(report_setting.loanLetter_sec1_1stLine, loan_info)}
                                        <br /> {report_setting.loanLetter_sec1_Residing}  {loan_info.Address}
                                        <br /> {report_setting.loanLetter_sec1_Telephone}  {this.getMassgedPhone(loan_info.TelHome, loan_info.TelOffice, loan_info.TelMobile)}
                                        <br /> {report_setting.loanLetter_sec1_Guardian} {loan_info.PatientName} / {loan_info.SeatNo} {report_setting.loanLetter_sec1_receive}
                                        <br /> {report_setting.loanLetter_sec1_detail}
                                        <br /> <b>{report_setting.loanLetter_sec1_wcDetail} </b> {this.getWCDisplay(loan_info.WheelchairNo, wc_info)}
                                        <br />
                                    </p>

                                    <h4>{report_setting.adaptivePartsSectionTitle} </h4>
                                    <table className="printItemTable" >
                                        <thead>
                                            <tr>
                                                <th id="noPadding" style={{width:'12%'}}> {report_setting.adaptivePartsSection_ArticleNo}</th>
                                                <th id="noPadding" style={{width:'58%'}}> {report_setting.adaptivePartsSection_Description}</th>
                                                <th id="noPadding" style={{width:'5%'}}> {report_setting.adaptivePartsSection_Price}</th>
                                                <th id="noPadding" style={{width:'25%'}}> {report_setting.adaptivePartsSection_Remarks} </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {loan_article_info.length > 0 && this.getTableRow(JSON.parse(loan_article_info))}
                                        </tbody>
                                    </table>
                                    <p> &nbsp;</p>
                                    <p>
                                        {report_setting.depositeAgree}
                                    </p>
                                    <p>{report_setting.agreement}</p>
                                    <div className="row">
                                        <div className="col-3">{report_setting.guardianDate}</div>
                                        <div className="col-1">&nbsp;</div>
                                        <div className="col-3">{report_setting.guardianSignature}</div>
                                    </div>
                                    <div className="row">
                                        <div className="col-3">{report_setting.witness}{loan_info && loan_info.Witness === null ? '' : loan_info.Witness}</div>
                                        <div className="col-1">&nbsp;</div>
                                        <div className="col-3">{report_setting.witnessSignature}</div>
                                    </div>
                                    <div className="row">
                                        <div className="col-9">{report_setting.returnDate} {loan_info && loan_info.ReturnDate === null ? '' : getDisplayDate(loan_info.ReturnDate)}</div>
                                    </div>
                                    <hr />
                                    <p>{report_setting.footerNotes}</p>
                                    {report_setting_note.length > 0 && this.getNoteSection(report_setting_note)}
                                </div>
                            </div>}
                        </div>
                    );
                }
                }
            />
        );
    }
}
ReactDOM.render(<Loan_print_letter qLoanNumber={qLoanNumber} qLanguage={qLanguage} />, document.getElementById('loanPrinting'));