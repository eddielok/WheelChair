/** 
 * All status codes defined in RFC1945 (HTTP/1.0, RFC2616 (HTTP/1.1),
 * RFC2518 (WebDAV), RFC6585 (Additional HTTP Status Codes), and
 * RFC7538 (Permanent Redirect) are supported.
 *
 * Based on the org.apache.commons.httpclient.HttpStatus Java API.
 *
 * Inspired by react-http-status-codes, wrapped by Ath
 */

class HttpReturnDTO {
    constructor(c, m, s) {
        this.code = c;
        this.message = m;
        this.isSuccess = s;
    }
}
const exports = {};
const statusCodes_complex = {};
statusCodes_complex[exports.ACCEPTED = 202] = "Update Successfully";
statusCodes_complex[exports.BAD_GATEWAY = 502] = "Bad Gateway";
statusCodes_complex[exports.BAD_REQUEST = 400] = "Bad Request";
statusCodes_complex[exports.CONFLICT = 409] = "Conflict";
statusCodes_complex[exports.CONTINUE = 100] = "Continue";
statusCodes_complex[exports.CREATED = 201] = "Create Successfully";
statusCodes_complex[exports.EXPECTATION_FAILED = 417] = "Expectation Failed";
statusCodes_complex[exports.FAILED_DEPENDENCY = 424] = "Failed Dependency";
statusCodes_complex[exports.FORBIDDEN = 403] = "Forbidden";
statusCodes_complex[exports.GATEWAY_TIMEOUT = 504] = "Gateway Timeout";
statusCodes_complex[exports.GONE = 410] = "Gone";
statusCodes_complex[exports.HTTP_VERSION_NOT_SUPPORTED = 505] = "HTTP Version Not Supported";
statusCodes_complex[exports.IM_A_TEAPOT = 418] = "I'm a teapot";
statusCodes_complex[exports.INSUFFICIENT_SPACE_ON_RESOURCE = 419] = "Insufficient Space on Resource";
statusCodes_complex[exports.INSUFFICIENT_STORAGE = 507] = "Insufficient Storage";
statusCodes_complex[exports.INTERNAL_SERVER_ERROR = 500] = "Server Error";
statusCodes_complex[exports.LENGTH_REQUIRED = 411] = "Length Required";
statusCodes_complex[exports.LOCKED = 423] = "Locked";
statusCodes_complex[exports.METHOD_FAILURE = 420] = "Method Failure";
statusCodes_complex[exports.METHOD_NOT_ALLOWED = 405] = "Method Not Allowed";
statusCodes_complex[exports.MOVED_PERMANENTLY = 301] = "Moved Permanently";
statusCodes_complex[exports.MOVED_TEMPORARILY = 302] = "Moved Temporarily";
statusCodes_complex[exports.MULTI_STATUS = 207] = "Multi-Status";
statusCodes_complex[exports.MULTIPLE_CHOICES = 300] = "Multiple Choices";
statusCodes_complex[exports.NETWORK_AUTHENTICATION_REQUIRED = 511] = "Network Authentication Required";
statusCodes_complex[exports.NO_CONTENT = 204] = "No Content";
statusCodes_complex[exports.NON_AUTHORITATIVE_INFORMATION = 203] = "Non Authoritative Information";
statusCodes_complex[exports.NOT_ACCEPTABLE = 406] = "Not Acceptable";
statusCodes_complex[exports.NOT_FOUND = 404] = "Not Found";
statusCodes_complex[exports.NOT_IMPLEMENTED = 501] = "Not Implemented";
statusCodes_complex[exports.NOT_MODIFIED = 304] = "Not Modified";
statusCodes_complex[exports.OK = 200] = "OK";
statusCodes_complex[exports.PARTIAL_CONTENT = 206] = "Partial Content";
statusCodes_complex[exports.PAYMENT_REQUIRED = 402] = "Payment Required";
statusCodes_complex[exports.PERMANENT_REDIRECT = 308] = "Permanent Redirect";
statusCodes_complex[exports.PRECONDITION_FAILED = 412] = "Precondition Failed";
statusCodes_complex[exports.PRECONDITION_REQUIRED = 428] = "Precondition Required";
statusCodes_complex[exports.PROCESSING = 102] = "Processing";
statusCodes_complex[exports.PROXY_AUTHENTICATION_REQUIRED = 407] = "Proxy Authentication Required";
statusCodes_complex[exports.REQUEST_HEADER_FIELDS_TOO_LARGE = 431] = "Request Header Fields Too Large";
statusCodes_complex[exports.REQUEST_TIMEOUT = 408] = "Request Timeout";
statusCodes_complex[exports.REQUEST_TOO_LONG = 413] = "Request Entity Too Large";
statusCodes_complex[exports.REQUEST_URI_TOO_LONG = 414] = "Request-URI Too Long";
statusCodes_complex[exports.REQUESTED_RANGE_NOT_SATISFIABLE = 416] = "Requested Range Not Satisfiable";
statusCodes_complex[exports.RESET_CONTENT = 205] = "Reset Content";
statusCodes_complex[exports.SEE_OTHER = 303] = "See Other";
statusCodes_complex[exports.SERVICE_UNAVAILABLE = 503] = "Service Unavailable";
statusCodes_complex[exports.SWITCHING_PROTOCOLS = 101] = "Switching Protocols";
statusCodes_complex[exports.TEMPORARY_REDIRECT = 307] = "Temporary Redirect";
statusCodes_complex[exports.TOO_MANY_REQUESTS = 429] = "Too Many Requests";
statusCodes_complex[exports.UNAUTHORIZED = 401] = "Unauthorized";
statusCodes_complex[exports.UNPROCESSABLE_ENTITY = 422] = "Unprocessable Entity";
statusCodes_complex[exports.UNSUPPORTED_MEDIA_TYPE = 415] = "Unsupported Media Type";
statusCodes_complex[exports.USE_PROXY = 305] = "Use Proxy";

///////////////////////

export default function httpResults(input) {
    if (typeof input === 'number') {
        return getByCode(input);
    } else if (typeof input === 'string') {
        return getByText(input);
    }
}
function isTheCallSuccess(statusCode) {
    return statusCode > 199 && statusCode < 208 ? true : false;
}
function getByCode(statusCode) {
    // if (statusCodes_complex.hasOwnProperty(statusCode)) { 

    if (statusCode in statusCodes_complex) {
        // return {code:parseInt(statusCode, 10), message:statusCodes_complex[statusCode] , isSuccess : isTheCallSuccess(statusCode)};
        return new HttpReturnDTO(parseInt(statusCode, 10), statusCodes_complex[statusCode], isTheCallSuccess(statusCode))
    } else {
        return new HttpReturnDTO(999, 'not recognized : ' + statusCode, false)
    }
}
function getByText(reasonPhrase) {

    // if (exports.hasOwnProperty(reasonPhrase)) {
    if (reasonPhrase in exports) {
        //return {code:parseInt(exports[reasonPhrase], 10), message:statusCodes_complex[exports[reasonPhrase]] ,isSuccess : isTheCallSuccess(exports[reasonPhrase])};
        return new HttpReturnDTO(parseInt(exports[reasonPhrase], 10), statusCodes_complex[exports[reasonPhrase]], isTheCallSuccess(exports[reasonPhrase]))
    }
    for (let key in statusCodes_complex) {
        if (statusCodes_complex[key].toLowerCase() === reasonPhrase.toLowerCase()) {
            // return {code:parseInt(key, 10), message:statusCodes_complex[key] , isSuccess :isTheCallSuccess(key)};
            return new HttpReturnDTO(parseInt(key, 10), statusCodes_complex[key], isTheCallSuccess(key))
        }
    }
    return new HttpReturnDTO(999, 'not recognized : ' + reasonPhrase, false)
}