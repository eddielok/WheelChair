export default function reduceComplexValidationMessage(data) {
    // cater for 400 return 
    if (data.errors) {
        let reduceMapping = (acc, cur) => acc + tryMapMessage(cur) + "; ";
        let m = Object.keys(data.errors).map(k => ">" + k + ":" + data.errors[k].reduce(reduceMapping, '')); 
        return (m.reduce((acc, cur) => acc + cur));
    }
    // cater for 422 return
    let msgObj = [];
    Object.values(data).forEach(m => m.forEach(subM => {
        msgObj.push(subM)
    }));
    let aggragatedRturn = msgObj.reduce((acc, curr) => { return acc + ">" + curr.MemberNames + ":" + curr.ErrorMessage }, "");
    return aggragatedRturn;
}
function tryMapMessage(msg) { 
    if (msg.includes("could not be converted to System.Nullable"))
        return " missing input / input is wrong say out-of-range";
    else if (msg.includes("could not be converted to System.Int32"))
        return " wrong number format";
    else if (msg.includes("invalid start of a value") || msg.includes("could not be converted to System.String"))
        return " invalid input";
    else
        return msg;
}