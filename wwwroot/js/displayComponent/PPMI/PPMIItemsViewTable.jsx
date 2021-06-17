import MyEditableTable from '/js/shared/MyEditableTable.jsx';
export default function PPMIItemsViewTable(props) {
    const props_collection = function (cssClass) {
        return {
            "className": cssClass,
            "input_type": "displayString"
        };
    }
    return (
        <div id="myTable">
            <MyEditableTable data={props.data} showHeader={true}>
                <button className="cell_element" handler={props.on_delete}>Delete</button>
                <td name="Item" displayName="Item"  {...props_collection("cell_element")} />
                <td name="Specification" displayName="Specification"  {...props_collection("cell_element")} />
                <td name="Supplier" displayName="Supplier" {...props_collection("cell_element")} />
                <td name="QuotationNo" displayName="Quotation Number"   {...props_collection("box_medium")} />
                <td name="Quantity" displayName="Quantity" {...props_collection("box_short")} />
                <td name="Amount" displayName="Amount" {...props_collection("box_medium")} />
                <td name="PatientSelected" displayName="PSI"  {...props_collection("cell_element")}
                input_type="displayString" on_toggle_change={props.on_change} positiveDisplay="Yes" negativeDisplay="No" />
        </MyEditableTable>
        </div>);
}