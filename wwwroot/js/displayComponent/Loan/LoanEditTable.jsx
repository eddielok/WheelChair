import MyEditableTable from '/js/shared/MyEditableTable.jsx';
export default function LoanEditTable(props) {
    const props_collection = function (pIsDisabled, type, styleClassName) {
        return {
            "className": styleClassName,
            "isDisabled": pIsDisabled,
            "input_type": type,
            "on_change": props.on_change
        };
    };
    return (<div id="myTable">
        <MyEditableTable data={props.data} showHeader={true} item_uni_id={props.item_uni_id}>
            <button className="cell_element" handler={props.on_delete}>Delete</button>
            <td name="PartNo" displayName="Part No" {...props_collection(false, "displayString", "cell_element")} />
            <td name="PartType" displayName="Part Type" {...props_collection(false, "displayString", "cell_element")} />
            <td name="Price" displayName="Price (HKD)"  {...props_collection(false, "displayString", "cell_element")} />
            <td name="Consumable" displayName="Is Consumable" {...props_collection(true, "checkbox", "cell_html_element")} />
            <td name="Remarks" displayName="Remarks" suggest_btn_list={props.suggest_btn_list}
                suggest_list_name={props.suggest_list_name} {...props_collection(false, "suggBox", "")} />
        </MyEditableTable>
    </div>);
}