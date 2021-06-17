import MyEditableTable from '/js/shared/MyEditableTable.jsx';
export default function WheelchairMeasureEditTable(props) {
    const props_collection = {
        "className": "cell_element",
        "input_type": "displayString",
        "on_change": props.on_change
    };
    const props_collection_step = {
        "className": "underLined_short",
        "input_type": "number",
        "on_change": props.on_change,
        "step": "0.01"
    };
    const props_collection_inchBox = {
        "className": "underLined_short",
        "input_type": "inchBox",
        "on_change": props.on_change,
        "step": "0.01"
    };
    return (
        <div id="table-wrapper" style={{ width: "60%" }}>
            <div id="table-scroll">
                <MyEditableTable data={props.data} showHeader={true} tableId="WheelchairDimensions_list" item_uni_id={props.item_uni_id}>
                    <button className="cell_element" handler={props.on_delete}>Delete</button>
                    <td name="SeatNo" displayName="Seat Number"  {...props_collection} />
                    <td name="Date" displayName="Date"  {...props_collection} />
                    <td name="PandaSize" displayName="Panda Size" {...props_collection_step} />
                    <td name="BackHeight" displayName="Back Height" {...props_collection_inchBox} />
                    <td name="WcseatWidth" displayName="WC Seat Width" {...props_collection_inchBox} />
                    <td name="WclseatDepth" displayName="WC L Seat Depth" {...props_collection_inchBox} />
                    <td name="WcseatHeight" displayName="WC Seat Height" {...props_collection_inchBox} />
                    <td name="SeatToBackAngle" displayName="Seat To Back Angle" {...props_collection_step} />
                    <td name="SystemTiltAngle" displayName="System Tilt Angle" {...props_collection_step} />
                    <td name="LlateralSupportHeight" displayName=" L lateral Support Height" {...props_collection_step} />
                    <td name="RlateralSupportHeight" displayName=" R lateral Support Height" {...props_collection_step} />
                    <td name="LarmrestHeight" displayName=" L Arm Rest Height" {...props_collection_step} />
                    <td name="RarmrestHeight" displayName=" R Arm Rest Height" {...props_collection_step} />
                    <td name="LseatToLegrestAngle" displayName="L Seat To Leg Rest Angle" {...props_collection_step} />
                    <td name="RseatToLegrestAngle" displayName="R Seat To Leg Rest Angle" {...props_collection_step} />
                    <td name="LlegrestFootrestAngle" displayName="L Leg Rest Foot Rest Angle" {...props_collection_step} />
                    <td name="RlegrestFootrestAngle" displayName="R Leg Rest Foot Rest Angle" {...props_collection_step} />
                    <td name="LlegrestLength" displayName="L Leg Rest Rest Length" {...props_collection_step} />
                    <td name="RlegrestLength" displayName="R Leg Rest Rest Length" {...props_collection_step} />
                    <td name="DropRaiseSeatHeight" displayName="Drop Raise Seat Height" {...props_collection_step} />
                </MyEditableTable>
            </div>
        </div>
    );
}