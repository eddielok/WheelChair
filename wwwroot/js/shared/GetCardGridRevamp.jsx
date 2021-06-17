import getDisplayDate from '/js/shared/getDisplayDate.js';
import DataList_base from '/js/shared/baseClasses/DataList_base.jsx'; 
/**
    * Renders a card grid system from data list input ; hidden fieds to be input with props:hidden_fields; item key is generated automatically
    * @param  props
    * @param  {string} props.a_card_header- optional, display header 
    * @param  {string} props.hidden_fields - optional, fields which should be hidden 
    * @param  {boolean} props.is_minimal_fields - optional, if yes, use minimal_fields to output field ignoring hidden fields
    * @param  {string} props.minimal_fields - optional, minimal fields display  
    * @param  {array} props.data - required, the data
    * @param  {html element} props.handlerList - optional, the button list to handle click; note, no biz logic in this module
    * @param  {string} props.filterStr - optional for filter input string
    * @param  {string} props.selectedField  - optional for filter select field
    * @return - card grid
    */
export default class GetCardGrid extends DataList_base {
    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.filterStr != this.props.filterStr;
    }
    render() {
        const { children } = this.props;
        var handlerList = [];
        if (children) {
            React.Children.map(children, child => { 
                if (child) handlerList.push(child.props);
            });
        } 
        return (
            <div className="cardContainer" id={this.props.container_id ? this.props.container_id : "defaultCardGrid"}>

                <TheGrid
                    a_card_header={this.props.a_card_header}
                    data={this.props.data}
                    hidden_fields={this.props.hidden_fields + ",selectedField,filterStr,handlerList,selected,minimal_fields,is_minimal_fields,hidden_fields,data,a_card_header"}
                    is_minimal_fields={this.props.is_minimal_fields}
                    minimal_fields={this.props.minimal_fields}
                    filterStr={this.props.filterStr}
                    selectedField={this.props.selectedField}
                    handlerList={handlerList} />
            </div>
        );
    }
}
class AFormattedCard extends React.Component {
    renderFromProps() {
        var hiddenFields = String(this.props.hidden_fields).split(",");
        var minimalFields = String(this.props.minimal_fields).split(",");
        var useMinimal = this.props.is_minimal_fields;
        let newObject;
        if (this.props.handlerList.length > 0) {
            let btnList = this.props.handlerList.map((aHanlder, k) => {
                const func = aHanlder.handler;
                return <button key={k} onClick={(btn) => func(this.props[aHanlder.uni_key], btn)} value={aHanlder.value} className={aHanlder.css_class_name}> {aHanlder.children}</button>
            });
            let tmp = { "mix": <div className="flexDiv" >{btnList}</div> };
            newObject = Object.assign({ selected: false }, this.props, tmp);
            minimalFields.push("mix");
        } 
        return Object.keys(newObject)
            .filter(function (propKey) {
                if (useMinimal)
                    return minimalFields.includes(propKey)
                else
                    return !hiddenFields.includes(propKey)
            })
            .map((propKey, k) => {
                if (String(propKey).toLowerCase().includes("mix"))
                    return <span key={k}> {newObject[propKey]} <br /></span>;
                else if (String(propKey).toLowerCase().includes(this.props.a_card_header.toLowerCase()))
                    return <div key={k} className="aCardHeader">{propKey} :  &nbsp; {newObject[propKey]} </div>
                else if (String(propKey).toLowerCase().includes("date"))
                    return <span key={k}> {propKey} : &nbsp; {getDisplayDate(newObject[propKey])} <br /></span>;
                else if (String(propKey).toLowerCase().includes("dob"))
                    return <span key={k}> {propKey} : &nbsp; {getDisplayDate(newObject[propKey])} <br /></span>;
                else if (typeof newObject[propKey] === 'boolean')
                    return <span key={k}> {propKey} : &nbsp; {newObject[propKey] ? 'Yes' : 'No'} <br /></span>;
                else if (newObject[propKey] === null || String(newObject[propKey]).trim() === '')
                    return <span key={k}> {propKey} : &nbsp; -- <br /></span>;
                else
                    return <span key={k}> {propKey} : &nbsp; {newObject[propKey]} <br /></span>;
            });
    }
    render() {
        return this.renderFromProps();
    }
}
class TheGrid extends React.Component {
    render() {
        var filterList;
        if (this.props.filterStr && this.props.selectedField &&
            String(this.props.filterStr).trim() !== "" &&
            String(this.props.selectedField).trim() !== "") {
            filterList = this.props.data.filter(e => String(e[this.props.selectedField]).trim().toLowerCase().includes(String(this.props.filterStr).trim().toLowerCase()));
        } else {
            filterList = this.props.data;
        } 
        return filterList.map((anItem, k) => (
            <div className="aCard" key={k}>
                <AFormattedCard
                    {...anItem}
                    a_card_header={this.props.a_card_header}
                    hidden_fields={this.props.hidden_fields + ",itemKey"}
                    is_minimal_fields={this.props.is_minimal_fields}
                    minimal_fields={this.props.minimal_fields}
                    itemKey={k}
                    handlerList={this.props.handlerList}
                    key={k} />
            </div>
        ));
    }
} 