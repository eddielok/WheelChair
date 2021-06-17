import MyEditableTable from '/js/shared/MyEditableTable.jsx';
export default function BodyDimensionEditTable(props) {
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
                <MyEditableTable data={props.data} showHeader={true} tableId="Body_Dimension_list" item_uni_id={props.item_uni_id}>
                    <button className="cell_element" handler={props.on_delete}>Delete</button>
                    <td name="SeatNo" displayName="Seat Number" {...props_collection} />
                    <td name="Date" displayName="Date" {...props_collection} />
                    <td name="Height" displayName="Height" {...props_collection_step} />
                    <td name="Weight" displayName="Weight" {...props_collection_step} />
                    <td name="PelvicWidth" displayName="Pelvic Width" {...props_collection_inchBox} />
                    <td name="PelvicWbrace" displayName="Pelvic Wbrace" {...props_collection_inchBox} />
                    <td name="ChestWidth" displayName="Chest Width" {...props_collection_step} />
                    <td name="ChestWbrace" displayName="ChestWbrace" {...props_collection_step} />
                    <td name="ShoulderWidth" displayName="Shoulder Width" {...props_collection_step} />
                    <td name="HeadWidth" displayName="Head Width" {...props_collection_step} />
                    <td name="KneeWidth" displayName="Knee Width" {...props_collection_inchBox} />
                    <td name="LseatDepth" displayName="L Seat Depth" {...props_collection_inchBox} />
                    <td name="RseatDepth" displayName="R Seat Depth" {...props_collection_inchBox} />
                    <td name="SeatToOcciput" displayName="Seat To Occiput" {...props_collection_step} />
                    <td name="SeatToObrace" displayName="Seat To Obrace" {...props_collection_step} />
                    <td name="SeatToShoulder" displayName="Seat To Shoulder" {...props_collection_inchBox} />
                    <td name="SeatToSbrace" displayName="Seat To Shoulder Brace" {...props_collection_inchBox} />
                    <td name="SeatToAxilla" displayName="Seat To Axilla" {...props_collection_inchBox} />
                    <td name="SeatToPsis" displayName="Seat To Psis" {...props_collection_step} />
                    <td name="BackToAntOfIt" displayName="Back To AntOfIt" {...props_collection_step} />
                    <td name="LlegLength" displayName="L Leg Length" {...props_collection_inchBox} />
                    <td name="RlegLength" displayName="R Leg Length" {...props_collection_inchBox} />
                    <td name="LfootLength" displayName="L Foot Length" {...props_collection_step} />
                    <td name="RfootLength" displayName="R Foot Length" {...props_collection_step} />
                </MyEditableTable>
            </div>
        </div>
    );
}