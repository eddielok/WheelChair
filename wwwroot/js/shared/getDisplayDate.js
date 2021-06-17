export default function getDisplayDate(d) {
    if (d === null || d === undefined) {
        return "";
    } 
	let doo = new Date(d);
    let doo_r = new Date(doo.getTime() + Math.abs(doo.getTimezoneOffset() * 60000));
    return doo_r.toISOString().slice(0, 10);
}