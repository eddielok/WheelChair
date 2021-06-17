import MyEditableTable from '/js/shared/MyEditableTable.jsx';
export default function LoanEditTable(props) {
    const props_collection = function (pIsDisabled, type) {
        return {
            "className": "cell_element",
            "isDisabled": pIsDisabled,
            "input_type": type,
            "on_change": props.on_change
        };
    };
    return (<div id="myTable">
        <MyEditableTable data={props.data} showHeader={true} item_uni_id={props.item_uni_id}>
            <button className="cell_element" handler={props.on_delete}>Delete</button>
            <td name="PartNo" displayName="Part No" {...props_collection(true, "text")} />
            <td name="PartType" displayName="Part Type" {...props_collection(true, "text")} />
            <td name="Price" displayName="Price (HKD)"  {...props_collection(true, "text")} />
            <td name="Consumable" displayName="Is Consumable" {...props_collection(true, "checkbox")} />
            <td name="Remarks" displayName="Remarks"  {...props_collection(false, "text")} />
            <tfoot>
                <td func="sum" name="Price" />  
            </tfoot>
        </MyEditableTable>
    </div>);
}