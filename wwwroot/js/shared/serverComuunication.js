export default { handleServerCommunication_type1, handleServerCommunication_type2, handleServerCommunication_type3, handleServerCommunication_type4, handleServerCommunication_type5, handleInternalServerPageRedirect, handleInternalServerPageRedirect_newPage }
const serverBase = window.location.origin;
function getController(c) {
    return formControllerMapping[Object.keys(formControllerMapping).find(key => formControllerMapping[key].toString().includes(c))];
}
function getControllerByKey(c) {
    // get the content by whole string ; cater for legacy add tertiary handling 
    return formControllerMapping[c] ? formControllerMapping[c] : formControllerMapping[Object.keys(formControllerMapping).find(key => formControllerMapping[key].toString().includes(c))];
}
function handleAuthentication(controller, isWarning) {
    if (localStorage.getItem('createDt') !== null) {
        const diffTime = Math.abs(new Date() - new Date(localStorage.getItem('createDt')));
        const diffMins = Math.ceil(diffTime / (1000 * 60));
        if (isWarning && diffMins > 25 && !(localStorage.getItem('isWarnedExpirey') === 'true')) {
            alert('Session soon expires');
            localStorage.setItem('isWarnedExpirey', true);
        }
        if (!String(controller).trim().toLocaleLowerCase().includes('login'))
            return 'Bearer ' + localStorage.getItem('token');
        else
            return '';
    }
}
export function handleServerCommunication_type1(action, controller, content) {
    let restCont = getControllerByKey(controller);
    let locationURL = new URL('api/' + restCont, serverBase);
    let isChkExpired = restCont === 'LoginJWT' ? false : true;
    let isLoggingIn = restCont === 'LoginJWT' ? true : false;
    let inputHeader = { 'Content-Type': 'application/json', 'Authorization': handleAuthentication(controller, isChkExpired) };
    return makeServerCallAndHandleError(locationURL, action, inputHeader, content, isLoggingIn);
}
function makeServerCallAndHandleError(pLocationURL, pAction, pHeader, pBody, isLoggingIn) {
    console.log(pLocationURL);
    console.log(pAction);
    console.log(pBody);

    let sendObj = { method: pAction };
    if (pHeader && pHeader != '') sendObj["headers"] = pHeader;
    if (pBody && pBody != '') sendObj["body"] = pBody;
    return fetch(pLocationURL.href, sendObj).then(res => {
        if (res.status == 422 || res.status == 400) {
            console.log("throw 1 ");
            throw { "status": res.status, "content": res.json() };
        }else if (res.status == 401) {
            console.log("throw 2 ");
            if (localStorage.getItem('lastTimePopLogin') === null) {
                localStorage.setItem('lastTimePopLogin', new Date());
                if (!isLoggingIn) {
                    alert('Session expired, please re-login.');
                    handleInternalServerPageRedirect_newPage("login", { redirect: false }); 
                }
            }
            else if (localStorage.getItem('lastTimePopLogin') !== null) {
                const diffTime = Math.abs(new Date() - new Date(localStorage.getItem('lastTimePopLogin')));
                const diffSec = Math.ceil(diffTime / 1000);
                if (diffSec > 3) {//localStorage.clear();
                    localStorage.setItem('lastTimePopLogin', new Date()); 
                    if (!isLoggingIn) {
                        alert('Session expired, please re-login.');
                        handleInternalServerPageRedirect_newPage("login", { redirect: false });
                    }
                }
            }
            else
                alert('No login session, please login.'); 
            throw { "status": res.status, "content": res.text() };
        }else if (res.status > 204) {
            console.log("throw 3 ");
            throw { "status": res.status, "content": res.text() };
        }else {
            return res;
        }
    });
}
export function handleServerCommunication_type5(action, controller, content, queryString) {
    let restCont = getControllerByKey(controller);
    let isChkExpired = restCont === 'LoginJWT' ? false : true;
    let inputHeader = { 'Content-Type': 'application/json', 'Authorization': handleAuthentication(controller, isChkExpired) };
    let locationURL = new URL('api/' + restCont, serverBase);
    locationURL.search = new URLSearchParams(queryString);
    return makeServerCallAndHandleError(locationURL, action, inputHeader, content)
}
/**
 * Get a promises from server with URI Parameter as input
 * @param   {string} action  GET
 * @param   {string} controller   controller of the Restful API 
 * @param   {string} payload   URI Parameter
 * @return  {promises}          server result as promises
*/
export function handleServerCommunication_type2(action, controller, payload) {
    let restCont = getControllerByKey(controller);
    let locationURL = new URL('api/' + restCont + '/' + encodeURIComponent(payload), serverBase);
    let isChkExpired = restCont === 'LoginJWT' ? false : true;
    return makeServerCallAndHandleError(locationURL, action, { 'Authorization': handleAuthentication(controller, isChkExpired) }, "");
}
export function handleServerCommunication_type3(action, controller) {
    let restCont = getControllerByKey(controller);
    let locationURL = new URL('api/' + restCont, serverBase);
    let isChkExpired = restCont === 'LoginJWT' ? false : true;
    return makeServerCallAndHandleError(locationURL, action, { 'Authorization': handleAuthentication(controller, isChkExpired) }, "");
}
export function handleServerCommunication_type4(action, controller, payload, queryString) {
    let searchParams = new URLSearchParams(queryString);
    let restCont = getControllerByKey(controller);
    let locationURL = new URL('api/' + restCont + '/' + payload + '?' + searchParams, serverBase);
    let isChkExpired = restCont === 'LoginJWT' ? false : true;
    return makeServerCallAndHandleError(locationURL, action, { 'Authorization': handleAuthentication(controller, isChkExpired) }, "");
}
export function handleInternalServerPageRedirect(controller, queryString) {
    let searchParams = new URLSearchParams(queryString);
    let locationURL = new URL(controller + '?' + searchParams, serverBase);
    //  console.trace(); 
    //location.replace(locationURL.href);  // store no history
    location.href = locationURL.href; // can enable last page 
}
export function handleInternalServerPageRedirect_newPage(controller, queryString) {
    let searchParams = new URLSearchParams(queryString);
    let locationURL = new URL(controller + '?' + searchParams, serverBase);
    window.open(locationURL.href, "_blank", "height=800,width=1200") || window.location.replace(locationURL.href);
}
// setting here
const formControllerMapping = {
    'Medical_Information': 'MedicalInformationsrRestful',
    'Client_Information': 'ClientInformationsRestful',
    'Client_Information_age': 'ClientInformationsRestful/age',
    'Client_Information_dob': 'ClientInformationsRestful/dob',
    'Progress_Note': 'ProgressNotesRestful',
    'Wheelchair_Dimension': 'WheelchairDimensionsRestful',
    'Body_Dimension': 'BodyDimensionsRestful',
    'Seating_System_Prescription': 'SeatingSystemPrescriptionsRestful',
    'Problem_Objective_List': 'ProblemObjectiveListsRestful',
    'Physical_Examination': 'PhysicalExaminationsRestful',
    'Social_Information': 'SocialInformationsRestful',
    'ClientSearch_search_Client_By_Client': 'ClientInformationsSearchRestful/SearchClientByClient',
    'ClientSearch_search_Loan': 'ClientInformationsSearchRestful/SearchLoan',
    'ClientSearch_search_wheelchairs': 'ClientInformationsSearchRestful/SearchWheelChair',
    'ClientSearch_search_wheelchairs_bySpec': 'ClientInformationsSearchRestful/SearchWheelChairBySpec',
    'Functional_Skills': 'FunctionalSkillsRestful',
    'ClientAttendances_single': 'ClientAttendancesRestful',
    'ClientAttendances_list': 'ClientAttendancesRestful/seatNoRoute',
    'WheelchairDimensions_list': 'WheelchairDimensionsRestful/seatNoRoute',
    'Body_Dimension_list': 'BodyDimensionsRestful/seatNoRoute',
    'Medical_Information_list': 'MedicalInformationsrRestful/seatNoRoute',
    'Social_Information_list': 'SocialInformationsRestful/seatNoRoute',
    'Functional_Skills_list': 'FunctionalSkillsRestful/seatNoRoute',
    'Physical_Examination_list': 'PhysicalExaminationsRestful/seatNoRoute',
    'Problem_Objective_list': 'ProblemObjectiveListsRestful/seatNoRoute',
    'Seating_System_Prescription_list': 'SeatingSystemPrescriptionsRestful/seatNoRoute',
    'Progress_Note_list': 'ProgressNotesRestful/seatNoRoute',
    'Loan_information_list': 'LoanInformationsRestful/seatNoRoute',
    'Loaned_articles_list': 'LoanedArticlesRestful/loanFormRoute',
    'Loaned_articles_list_revamp': 'LoanedArticlesRestful/GetAsync',
    'Loaned_articles': 'LoanedArticlesRestful',
    'Loaned_articles_burst_insert': 'LoanedArticlesRestful/multipleInsertRoute',
    'Loaned_integrate_submit': 'LoanSubmitRestful',
    'Secured_login': 'LoginJWT',
    'Work_order_list': 'WorkOrdersRestful/seatNoRoute',
    'Work_Order': 'WorkOrdersRestful',
    'Work_order_item_list': 'WorkOrderItemsRestful/CompleteOrderRoute',
    'Work_Order_Items_burst_insert': 'WorkOrderItemsRestful/multipleInsertRoute',
    'Work_Order_Items': 'WorkOrderItemsRestful',
    'PPMI': 'PpmisRestful',
    'PPMI_list': 'PpmisRestful/seatNoRoute',
    'PPMI_item': 'PpmiItemsRestful',
    'PPMI_item_burst_insert': 'PpmiItemsRestful/multipleInsertRoute',
    'PPMI_item_list': 'PpmiItemsRestful/CompletePPMIRoute',
    'Supplier_Information_InputForm': 'SuppliersRestful',
    'Supplier_Information': 'SuppliersRestful',
    'School_list': 'SchoolLists',
    'Common': 'Common',
    'Common_async': 'Common/GetAsync/Data',
    'WheelChair_Information_InputForm': 'WheelchairInformationsRestful',
    'WheelChair_Information': 'WheelchairInformationsRestful',
    'WheelChair_Information_mapping': 'WheelchairInformationsRestful/wheelchairMappingList',
    'Part_Information_InputForm': 'PartsInformationsRestful',
    'Part_Information': 'PartsInformationsRestful',
    'Part_Information_Available_PartNo': 'PartsInformationsRestful/availablePartList',
    'Part_Information_GetByPartNo': 'PartsInformationsRestful/GetPartByPartNo',
    'WheelChair_Specification_InputForm': 'WheelchairSpecificationsRestful',
    'WheelChair_Specification': 'WheelChairSpecificationsRestful',
    'Wheelchair_Specification': 'WheelChairSpecificationsRestful',
    'Maintenance_log_inputForm': 'MaintenanceLogsRestful',
    'Maintenance_log': 'MaintenanceLogsRestful',
    'Maintenance_log_specific': 'MaintenanceLogsRestful/filterByStrRoute',
    'Loan_record_inputForm': 'LoanInformationsRestful',
    'Loan_record': 'LoanInformationsRestful',
    'Additional': 'Additional',
    'Account_Information': 'Account',
    'Account_Information_InputForm': 'Account',
};
