import DataList_base from '/js/shared/baseClasses/DataList_base.jsx';
const ddlItems = {
    'Medical_Information_type1': ["Intact", "Absent", "Imparied"],
    'Medical_Information_type2': ["Intact", "Imparied"],
    'Medical_Information_type3': ["No signfix hx", "Frequent RTI", "Pneumonia"],
    'Medical_Information_type4': ["Complains of ", "No complaint", "None "],
    'Functional_Skills_type1': ["Need assistance", "Independent", "Dependent"],
    'Functional_Skills_type2': ["Need assistance", "Independent", "Dependent", "Diapered", "Catheter"],
    'Functional_Skills_type3': ["walks for few steps with manual support", "non-ambulatory", "crawls for mobility indoors"],
    'Functional_Skills_type4': ["in stander", "with manual assistance"],
    'Functional_Skills_type5': ["N/A", "AFO", "GR-AFO", "RGO"],
    'Functional_Skills_type6': ["N/A", "Walking Frame", "Kaye Walker", "Rolator", "Crutches"],
    'Functional_Skills_type7': ["none", "buggy", "push chair", "manual w/c", "power-assist w/c", "power w/c", "car seat"],
    'Functional_Skills_type8': ["Uses arms", "Uses tilt-in-space", "Dependent", "Other skills/ devices"],
    'Functional_Skills_type9': ["continuous", "intermittent", "primarily for some activities only"],
    'Functional_Skills_type10': ["Manual-hands", "Hand & Foot", "Power-assist", "Power", "Dependent"],
    'Functional_Skills_type11': ["Indoor", "Rural (grass,gravel)", "Urban (sidewalks & pavements)"],
    'Functional_Skills_type12': ["Whole", "Folded and Dismantled"],
    'Functional_Skills_type13': ["Rehab Bus", "School Bus", "Taxi", "Private Car", "Bus"],
    'Physical_Examination_SkinCondition': ["Normal", "Frail (prone to breakdown)", "Tissue Breakdown noted"],
    'Physical_Examination_MatHeadPosition': ["Neutral", "Flexed Forwared", "Extended Backward", "Flexed to L", "Flexed to R"],
    'Physical_Examination_MatHeadRot': ["Rotate to L", "Rotate to R"],
    'Physical_Examination_Mobility': ["Mobile", "Tight", "Limited"],
    'Physical_Examination_Range': ["full", "mid", "end"],
    'Physical_Examination_MatHipFlex': ["Both 90º", "L 90º/ R __º", "L __º/ R 90º", "L __º/ R __º"],
    'Physical_Examination_MatHipAbdAdd': ["Both neutral", "L neutral/ R in add. __º", "L neutral/ R in abd. __º", "L in add. __º/ R neutral", "L in abd. __º/ R neutral", "L in add. __º/ R in add. __º", "L in abd. __º/ R in add. __º", "L in add. __º/ R in abd. __º", "L in abd. __º/ R in abd. __º"],
    'Physical_Examination_MatHipRotate': ["Both neutral", "L neutral/ R in int. rot. __º", "L neutral/ R in ext. rot. __º", "L in int. rot. __º/ R neutral", "L in ext. rot. __º/ R neutral", "L in int. rot. __º/ R in int. rot. __º", "L in ext. rot. __º/ R in int. rot. __º", "L in int. rot. __º/ R in ext. rot. __º", "L in ext. rot. __º/ R in ext. rot. __º"],
    'Physical_Examination_MatHipIntegrity': ["Both neutral", "L neutral, R dislocated", "L neutral, R sublux", "L dislocated, R neutral", "L sublux, R neutral", "L dislocated, R sublux", "L sublux, R dislocated", "Both dislocated", "Both sublux"],
    'Physical_Examination_MatKneePopliteal': ["Both full", "L fullº/ R __º", "L __º/ R full", "L __º/ R __º"],
    'Physical_Examination_Contracture': ["Both neutral", "L neutral/ R __º", "L __º/ R neutral", "L __º/ R __º"],
    'Physical_Examination_MatAnkle': ["Both plantegrade", "L plantegrade/ R __º", "L __º/ R plantegrade", "L __º/ R __º"],
    'Physical_Examination_CurveShape': ["Normal", "C-curve", "S-curve"],
    'Physical_Examination_MatSpine1': ["Lt. Tx", "Rt. Tx", "Lt. TL", "Rt. TL", "Lt. Lx", "Rt. Lx"],
    'Physical_Examination_SitHeadControl': ["Good", "Fair", "No Control"],
    'Physical_Examination_SitHeadFlex': ["Neutral", "Flex forward", "Thrust back", "Flex to L", "Flex to R"],
    'Physical_Examination_SitHeadPreferToTurn': ["Neutral", "L", "R"],
    'Physical_Examination_SitHeadDrop': ["Neutral", "Forward", "Backward", "to L", "to R", "L forward", "R forward", "L backward", "R backward"],
    'Physical_Examination_SitHeadTilt': ["None", "Lt.", "Rt."],
    'Physical_Examination_Severity': ["Mild", "Moderate", "Severe"],
    'Physical_Examination_Flexibility1': ["Fixed", "Flexible"],
    'Physical_Examination_Convexity': ["Neutral", "Lt.", "Rt."],
    'Physical_Examination_SitHumpLevel': ["Thoracic", "Thoraco-lumbar", "Lumbar"],
    'Physical_Examination_SitKyphosis': ["Neutral", "Thoracic", "Lumbar", "Whole"],
    'Physical_Examination_Kyphotic_Lordosis': ["Neutral", "Thoracic", "Lumbar", "Whole"],
    'Physical_Examination_SitSpineRotation': ["Neutral", "to Lt.", "to Rt."],
    'Physical_Examination_Flexibility2': ["Fixed", "Flexible", "Limited"],
    'Physical_Examination_SitPelvicFlexibility': ["Pelvis can be moved into neutral", "Limited Flexibility", "Pelvis can be moved into neutral with limited flexibility"],
    'Physical_Examination_SitPelvicFlexibilityTilt': ["Pelvis begins to tilt after Lt. __/ Rt. __ hip flex/ rot/ abd"],
    'Physical_Examination_SitPelvicTilt': ["Neutral", "anterior + fixed", "anterior + flexible", "posterior + fixed", "posterior + flexible"],
    'Physical_Examination_SitPelvicObliquity': ["Neutral", "Lt. side down + fixed", "Rt. side down + fixed", "Lt. side down + flexible", "Rt. side down + flexible"],
    'Physical_Examination_SitPelvicRotation': ["Neutral", "Lt. side forward + fixed", "Rt. side forward + fixed", "Lt. side forward + flexible", "Rt. side forward + flexible"],
    'Physical_Examination_SitThighsWindswept': ["Neutral", "to Lt. + fixed", "to Rt. + fixed", "to Lt. + flexible", "to Rt. + flexible"],
    'Physical_Examination_SitThighsAdducted': ["Neutral", "Both fixed", "Both flexible", "Lt. fixed, Rt. flexible", "Lt. flexible, Rt. fixed", "Lt. flexible", "Rt. flexible"],
    'Physical_Examination_Tone': ["Normal", "Flaccid", "Hypotonic", "Hypertonic", "Dystonic"],
    'Physical_Examination_Reflexes': ["normal", "abn postural reflexes", "ATNR", "STNR", "tonic lab", "dominated by associated reactions", "poor righting reactions"],
    'Physical_Examination_Movement': ["functional + purposeful", "functional + purposeful + poorly coordinated", "non-functional + purposeful", "non-functional + purposeful + poorly coordinated", "non-functional + non-purposeful", "non-functional + non-purposeful + poorly coordinated", "Athetoid"],
    'Physical_Examination_LL_UL_Strength': ["Normal", "Impaired", "L proximal _/5, L distal _/5, R proximal _/5, R distal _/5"],
    'Physical_Examination_HandFunction': ["Normal", "Impaired", "Normal, Preference of L", "Normal, Preference of R", "Impaired, Preference of L", "Impaired, Preference of R"],
    'Physical_Examination_ULFunction': ["Normal", "Impaired", "Impaired, crosses midline", "Impaired, crosses midline + reaches shoulder height", "Impaired, crosses midline + reaches overhead", "Impaired, reaches shoulder height", "Impaired, reaches overhead"],
    'Physical_Examination_SittingBalance': ["unplaceable", "supported from head downward", "supported from shoulder downward", "supported at pelvis", "maintain position propped with own hands", "maintain position without support but cannot move", "fair balance without support, trunk shift & re-erect in < than 20 degree inclination", "maintain position without support and can reach out"],
    'Social_Information_Accommodation': ["Public housing estate", "Self-owned flat", "House (1 or 2 stories)", "Residential facilities"],
    'Social_Information_Caretaker': ["Parents", "Staff", "Attendant", "Others"],
    'Social_Information_SchoolType': ["Normal", "Special", "No schooling"],
    'Social_Information_SchoolEquip1': ["none", "plywood chair", "low stool", "ordinary chair", "plywood chair + low stool", "low stool + ordinary chair", "others"],
    'Social_Information_SchoolEquip2': ["none", "buggy", "push chair", "manual w/c", "power w/c"],
    'Social_Information_SchoolEquip3': ["none", "polyfoam padded", "gel", "air floatation", "contoured/ molded seat"],
    'Seating_System_Prescription_type1': ["1", "2", "1+3", "2+3", "1+4", "2+4", "5"],
    'Seating_System_Prescription_type2': ["1", "2", "2+3", "2+4", "2+5"],
    'Seating_System_Prescription_type3': ["1", "2", "3", "1+2", "1+3", "2+3", "1+2+3"],
    'Seating_System_Prescription_type4': ["2", "3", "5", "1+2", "1+3", "1+4"],
    'Seating_System_Prescription_type5': ["1+3", "1+4", "2+3", "2+4"],
    'Seating_System_Prescription_type6': ["1", "2", "3", "4", "1+5", "2+5", "3+5", "4+5"],
    'Seating_System_Prescription_type7': ["1", "2", "3", "4", "6", "4+5"],
    'Seating_System_Prescription_type8': ["1", "2", "3", "1+4", "2+4", "3+4"],
    'region': ["China", "Hong Kong", "Kowloon", "New Territories", "Philippine"],
    'sexList': ["M", "F"],
    'none': ["none"],
    'Wheelchair_Information_Color': ["BLACK", "BLUE", "GREEN", "Metallic", "PURPLE", "Red", "Yellow"],
    'Wheelchair_Information_status': ["Condemn", "For Assessment Only", "Normal", "To Be Repaired", "Sold", "N/A"],
    'Wheelchair_Information_RearWheelSize': ["L", "M", "S"],
    "Loan_Information_Rank": ["DM(OT)", "JRA", "OT-I", "PO-I", "Project Coordinator", "PT-I", "SPT"],
    "Functional_Skills_FeedingPosition": ["sitting up-right", "up-right"],
    "Functional_Skills_AspirationFrequency": ["occasionally"],
    "Functional_Skills_OtherATDs": ["bil. AFO"],
    "PartTypeList": ["Armrest", "Backrest", "Caster", "Chest Strap", "Cushion Cover", "Footrest", "Footstrap", "Frame", "Grib Bar", "Headrest", "Knee Support", "Lap Tray", "Neckrest", "Pelvic belt", "Pommel", "Power Add-on", "Power Assist", "Push Handle", "Rear Wheel", "Seat", "Seat Cushion", "Shoulder Support", "Side support", "Wheel Lock"],
    "loan_remarks_suggest_list": ['Wrong item', 'Returned on', 'Returned ', 'Loan on ', 'Lost by patient ', 'Temperary loan for ', 'Temperary return on  ', 'Wrong input ', 'Break ', 'Not return ']
};

function getListDataFromInputData(data, useField) {
    if (!data) {
        console.error("no data find - item1");
        if (!data.length <= 0) {
            console.error("no data find - item2");
        }
    }
    if (!(useField in data[1])) {
        console.error("not exist useField:: input useField:" + useField);
        console.info("please note the input is case sensitive. below, the sample check value:");
        console.info(data[1]);
        return false;
    } else {
        return data.map((e, k) => <option value={e[useField]} key={k} />);
    }
}
function GetListData(props) {
    if (props.useData) {
        if (props.data)
            return getListDataFromInputData(props.data, props.useField);
        else
            return null
    }
    else
        return ddlItems[props.requiredType].map((e, k) => <option value={e} key={k} />);
}
export default class GetDatalist extends DataList_base {
    render() {
        return (
            <datalist id={this.props.requiredType}>
                <GetListData requiredType={this.props.requiredType} useData={this.props.useData} data={this.props.data} useField={this.props.useField} />
            </datalist>
        );
    }
}
