import MyEditableTable from '/js/shared/MyEditableTable.jsx';
export default function PPMIItemsEditTable(props) {
    const props_collection = function (pIsDisabled, type, cssClass) {
        return {
            "className": cssClass,
            "isDisabled": pIsDisabled,
            "input_type": type,
            "on_change": props.on_change
        };
    };
    return (<div id="myTable">
        <MyEditableTable data={props.data} showHeader={true} item_uni_id={props.item_uni_id}>
            <button className="cell_element" handler={props.on_delete}>Delete</button>
            <td name="Item" displayName="Item" {...props_collection(false, "text", "cell_element")} />
            <td name="Specification" displayName="Specification"  {...props_collection(false, "text", "cell_element")} />
            <td name="Supplier" displayName="Supplier"  {...props_collection(false, "text", "cell_element")} />
            <td name="QuotationNo" displayName="Quotation Number"  {...props_collection(false, "text", "cell_element")} />
            <td name="Quantity" displayName="Quantity"  {...props_collection(false, "number", "box_short")} />
            <td name="Amount" displayName="Amount" {...props_collection(false, "number", "box_medium")} />
            <td className="cell_element" name="PatientSelected" displayName="PSI"
                input_type="checkbox" on_toggle_change={props.on_toggle_change} />
        </MyEditableTable>
    </div>);
}