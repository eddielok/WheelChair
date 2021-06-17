import getDisplayDate from '/js/shared/getDisplayDate.js';
import DataList_base from '/js/shared/baseClasses/DataList_base.jsx';

/**
    * Renders a card grid system from data list input ; hidden fieds to be input with props:hidden_fields; item key is generated automatically
    * @param  props
    * @param  {string} props.a_card_header- optional, display header 
    * @param  {string} props.hidden_fields - optional, fields which should be hidden
    * @param  {string} props.btn_display_string - optional, word show on the btn
    * @param  {string} props.handle_controller - optional, the controller of the btn handling 
    * @param  {boolean} props.is_enable_edit_btn - optional, is edit btn need? if yes, pass in handler
    * @param  {boolean} props.is_minimal_fields - optional, if yes, use minimal_fields to output field ignoring hidden fields
    * @param  {string} props.minimal_fields - optional, minimal fields display
    * @param  {Function} props.btn_handler - optional, the btn onClick handler
    * @param  {Function} props.btn_key - optional, the reference field to identify resources uniquely
    * @param  {array} props.data - required, the data
    * @return - card grid
    */
export default class GetCardGrid extends DataList_base
{ 
    render()
    {
        return (
            <div className="cardContainer">
                <TheGrid
                    a_card_header={this.props.a_card_header}
                    data={this.props.data}
                    hidden_fields={this.props.hidden_fields + ",selected,minimal_fields,is_minimal_fields,handle_controller,hidden_fields,data,btn_display_string,btn_key,btn_handler,is_enable_edit_btn,a_card_header"}
                    btn_handler={this.props.btn_handler}
                    btn_display_string={this.props.btn_display_string}
                    handle_controller={this.props.handle_controller}
                    btn_key={this.props.btn_key}
                    is_minimal_fields={this.props.is_minimal_fields}
                    minimal_fields={this.props.minimal_fields}
                    is_enable_edit_btn={this.props.is_enable_edit_btn} />
            </div>
        );
    }
}
class AFormattedCard extends React.Component
{
    renderFromProps()
    { 
        var hiddenFields = String(this.props.hidden_fields).split(",");
        var minimalFields = String(this.props.minimal_fields).split(","); 
        var useMinimal = this.props.is_minimal_fields;
        if (this.props.is_enable_edit_btn)
        {
            var editObject = {
                "edit": <button onClick={() => this.props.btn_handler({ "key": this.props[this.props.btn_key], "controller": this.props.handle_controller })}> {this.props.btn_display_string} </button>
            };
            minimalFields.push("edit"); 
        }
           
        var tmpObj = this.props;
        var newObject = this.props.is_enable_edit_btn ? Object.assign({ selected: false }, tmpObj, editObject) : this.props;
        return Object.keys(newObject)
            .filter(function (propKey)
            {  
                if (useMinimal)
                    return minimalFields.includes(propKey)
                else
                    return !hiddenFields.includes(propKey)
            }
            )
            .map((propKey, k) =>
            {
                if (String(propKey).toLowerCase().includes("edit"))
                    return <span key={k}> {newObject[propKey]} <br /></span>;
                else if (String(propKey).toLowerCase().includes(this.props.a_card_header.toLowerCase()))
                    return <div key={k} className="aCardHeader">{propKey} :  &nbsp; {newObject[propKey]} </div>
                else if (String(propKey).toLowerCase().includes("date"))
                    return <span key={k}> {propKey} : &nbsp; {getDisplayDate(newObject[propKey])} <br /></span>;
                else
                    return <span key={k}> {propKey} : &nbsp; {newObject[propKey]} <br /></span>;
            });
    }
    render()
    {
        return this.renderFromProps();
    }
}
class TheGrid extends React.Component
{
    render()
    {
        return this.props.data.map((anItem, k) => (
            <div className="aCard" key={k}>
                <AFormattedCard
                    {...anItem}
                    a_card_header={this.props.a_card_header}
                    btn_key={this.props.btn_key}
                    btn_handler={this.props.btn_handler}
                    btn_display_string={this.props.btn_display_string}
                    hidden_fields={this.props.hidden_fields + ",itemKey"}
                    is_enable_edit_btn={this.props.is_enable_edit_btn}
                    handle_controller={this.props.handle_controller}
                    is_minimal_fields={this.props.is_minimal_fields}
                    minimal_fields={this.props.minimal_fields}
                    itemKey={k}
                    key={k} />
            </div>
        ));
    }
} 