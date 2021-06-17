import MyEditableTable from '/js/shared/MyEditableTable.jsx';
export default function WorkOrderEditTable(props) {
    const props_collection = function (type) {
        return {
            "className": "cell_element",
            "input_type": type,
            "on_change": props.on_change
        };
    };
    const props_collection_chkBox = {
        "className": "cell_element",
        "input_type": "checkbox",
        "on_toggle_change": props.on_toggle_change
    };
    return (<div id="myTable">
        <MyEditableTable data={props.data} showHeader={true} key_seed={props.key_seed} item_uni_id={props.item_uni_id}>
            <button className="cell_element" handler={props.on_delete}>Delete</button>
            <td name="OrderDate" displayName="Order Date" {...props_collection("displayString")} />
            <td name="Item" displayName="Item" {...props_collection("text")} />
            <td name="Completed" displayName="Completed" {...props_collection_chkBox} />
            <td name="CompletionDate" displayName="Completion Date"  {...props_collection("date")} />
            <td name="Staff" displayName="Staff"  {...props_collection("text")} />
        </MyEditableTable>
    </div>);
}