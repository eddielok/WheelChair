export default function isNeededContent(field, filterStr) {
    return function (e) {
        if (filterStr && field) {
            switch (field) {
                case "date":
                    return true;
                default:
                    return String(e[field]).toLowerCase().includes(filterStr.toLowerCase());
            }
        } else {
            return true;
        }
    }
}