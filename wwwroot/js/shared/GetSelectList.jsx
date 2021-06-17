// accepts object only; perform a sample check by with the first object if the key exists
// this component will perform shallow compare to determine if it needs to be updated 
function GetRemoteSelectListItem(props) { 
    if (!props.data) {
        console.error("no data find - item1");
        if (!props.data.length <= 0) {
            console.error("no data find - item2");
        }
    }
    if (!(props.valueField in props.data[1]) || !(props.displayField in props.data[1])) {
        console.error("not exist valueField or displayField:: input valueField:" + props.valueField + "; input displayField:" + props.displayField);
        console.info("please note the input is case sensitive. below, the sample check value:");
        console.info(props.data[1]);
        return false;
    } else {
        return props.data.map((e, k) => <option value={e[props.valueField]} key={k}>{e[props.displayField]}</option>);
    }
}  
export default class GetSelectList extends React.Component{
   // perform shallow compare 
   shouldComponentUpdate(nextProps, nextState) {
       return nextProps.selectedValue != this.props.selectedValue ||
           nextProps.data != this.props.data ||
           nextProps.data.length != this.props.data.length;
   }
    render() {
        return (
            <select name={this.props.name} onChange={this.props.handleFieldChange} value={this.props.selectedValue}> 
                <GetRemoteSelectListItem data={this.props.data} valueField={this.props.valueField} displayField={this.props.displayField} />
            </select>
        );
    }
}
