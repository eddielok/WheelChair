export default function parseValue(targetType, value)
{ 
    switch (targetType)
    {
        case "number":
            return parseInt(value);
        case "float":
            return parseFloat(value);
        case "checkbox":
            return value === "on" ? true : false;
        default:
            return value;
    }
}