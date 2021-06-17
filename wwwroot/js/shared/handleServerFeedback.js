import reduceComplexValidationMessage from '/js/shared/reduceComplexValidationMessage.js';
import httpResults from '/js/shared/httpCodes.js';

export default function handleServerFeedback(serverFeedback) { 
    return serverFeedback.then((response) => {
        console.log(response)
        if (response.status) { 
            let r = httpResults(response.status); 
            return { isSubmitSuccess: r.isSuccess, submitMessage: r.message, isSubmited: true, content: response.text() }; 
        } 
    }).catch((ex_outer) => { 
        if (ex_outer.status) {
            let ex_obj = {};
            ex_obj['isSubmitSuccess'] = false;
            ex_obj['isSubmited'] = true;
        //    20210123
            ex_obj['httpStatusCode'] = ex_outer.status; 
            if (ex_outer.status == 422 || ex_outer.status == 400) { 
                ex_obj['submitMessage'] = ex_outer.content.then(ex => reduceComplexValidationMessage(ex) ); 
            }
            else if (ex_outer.status == 401) {
                ex_obj['submitMessage'] = getCustomizedPromise('Unauthorized, wrong login credential');
            }
            else {
                if (ex_outer.content)
                    ex_outer.content.then(ex => console.error(ex));
                else
                    console.error(ex_outer.content)
                ex_obj['submitMessage'] = getCustomizedPromise('Error occured: unknown error'); 
            }
            throw ex_obj;
        }
        else throw ex_outer;
    });
}
function getCustomizedPromise(msg) {
    return new Promise(function (resolve, reject) {
        resolve(msg);
        reject('Error');
    });
}