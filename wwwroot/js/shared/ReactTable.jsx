import getDisplayDate from '/js/shared/getDisplayDate.js';
import DataList_base from '/js/shared/baseClasses/DataList_base.jsx';

/****
 * TODO: ADD DELETE BTN function
 * */
/**
    * Renders table component; this component does not actually delete an element, it just hide. For actual delete, handle using delete handler;
    * @param  props
    * @param  {array} props.headerList - required, display header
    * @param  {string} props.hiddenFields - required, fields which should be hidden
    * @param  {string} props.filterStr - optional for filter input string
    * @param  {string} props.selectedField  - optional for filter select field
    * @param  {boolean} props.isEnableEditButton - is edit btn need? if yes, pass in handler
    * @param  {Function} props.editHandler - optional, the btn onClick handler
    * @param  {string} props.editKey - optional, the reference field to identify resources uniquely
    * @param  {boolean} props.isEnableDeleteButton - is delete btn need? if yes, pass in handler
    * @param  {Function} props.deleteHandler - optional, the btn onClick handler
    * @param  {string} props.deleteKey - optional, the reference field to identify resources uniquely;
    * @param  {string} props.filterStr - optional, the string used in the string includes
    * @param  {string} props.selectedField - optional, field used for filtering
    * @param  {array} props.data - required, the data
    * @return  { table} display table 
    */
export default class ReactTable extends DataList_base
{
    shouldComponentUpdate(nextProps, nextState)
    {
        return nextProps.filterStr != this.props.filterStr;
    }
    getNewHeader()
    {
        var newObject = { 0: "Action" }
        this.props.headerList.forEach((element, k) =>
        {
            Object.assign(newObject, { [++k]: element })
        });
        return newObject;
    }
    render()
    {
        var headerList = this.props.isEnableEditButton ? this.getNewHeader() : { ...this.props.headerList };
        return (
            <table id="reactTable">
                <thead>
                    <AnFormattedHeader  {...headerList} hiddenFields={this.props.hiddenFields + ",hiddenFields,isEnableEditButton"} isEnableEditButton={this.props.isEnableEditButton} />
                </thead>
                <tbody>  
                    <RowList data={this.props.data} hiddenFields={this.props.hiddenFields + ",isEnableDeleteButton,deleteHandler,deleteKey,filterStr,selectedField,hiddenFields,data,editKey,editHandler,isEnableEditButton"}
                        editKey={this.props.editKey} editHandler={this.props.editHandler} isEnableEditButton={this.props.isEnableEditButton}
                        deleteKey={this.props.deleteKey} deleteHandler={this.props.deleteHandler} isEnableDeleteButton={this.props.isEnableDeleteButton}
                        filterStr={this.props.filterStr} selectedField={this.props.selectedField} />
                </tbody>
            </table>
        );
    }
}
function handleTableValueDisplay(v)
{
    return typeof v === 'boolean' ? (v ? "Yes" : "No") : v;
}
class AnFormattedRow extends React.Component
{
    renderFromProps()
    {
        var hiddenFields = String(this.props.hiddenFields).split(",");
        var btnOject;
        var newObject;
         
        if (this.props.isEnableEditButton || this.props.isEnableDeleteButton)
        {
            if (this.props.isEnableDeleteButton && this.props.isEnableEditButton)
            {
                var mixObject = {
                    "mix": <div className="flexDiv">
                                <button onClick={() => this.props.editHandler(this.props[this.props.editKey])}> Edit </button> &nbsp;
                                <button onClick={(e) => {
                                                           e.target.parentNode.parentNode.parentNode.style.display = 'none';
                                                           this.props.deleteHandler(this.props[this.props.deleteKey])
                                                         }}> Delete </button>
                          </div>
                };
                btnOject = Object.assign(mixObject, btnOject); 
            }
            else if (this.props.isEnableEditButton)
            { 
                var editObject = {
                    "edit": <button onClick={() => this.props.editHandler(this.props[this.props.editKey])}> Edit </button>
                };
                btnOject = Object.assign(editObject, btnOject);
            }
            else if (this.props.isEnableDeleteButton)
            { 
                var deleteObject = {
                    "delete": <button onClick={() => this.props.deleteHandler(this.props[this.props.deleteKey])}> Delete </button>
                };
                btnOject = Object.assign(deleteObject, btnOject);
            } 
            newObject = Object.assign(btnOject, this.props);
        } else
            newObject = this.props;
        
        return Object.keys(newObject)
            .filter(propKey => !hiddenFields.includes(propKey))
            .map((propKey, k) =>
            {
                if (String(propKey).toLowerCase().includes("date"))
                    return <td key={k}> {getDisplayDate(newObject[propKey])} </td>;
                else
                    return <td key={k}> {handleTableValueDisplay(newObject[propKey])} </td>;
            });
    }
    render()
    {
        return (
            <tr>
                {this.renderFromProps()}
            </tr>
        );
    }
}
class RowList extends React.Component
{
    render()
    {
        var filterList;
        if (this.props.filterStr && this.props.selectedField &&
            String(this.props.filterStr).trim() !== "" &&
            String(this.props.selectedField).trim() !== "")
        {
            filterList = this.props.data.filter(e => String(e[this.props.selectedField]).trim().toLowerCase().includes(String(this.props.filterStr).trim().toLowerCase()));
        } else
        {
            filterList = this.props.data;
        }
        return filterList.map((anItem, k) => (
            <AnFormattedRow
                {...anItem}
                hiddenFields={this.props.hiddenFields}
                editHandler={this.props.editHandler}
                isEnableEditButton={this.props.isEnableEditButton}
                editKey={this.props.editKey}
                deleteHandler={this.props.deleteHandler}
                isEnableDeleteButton={this.props.isEnableDeleteButton}
                deleteKey={this.props.deleteKey}
                key={k} />)); 
    }
}
class AnFormattedHeader extends React.Component
{
    renderFromProps()
    {
        var hiddenFields = String(this.props.hiddenFields).split(",");
        hiddenFields.push(this.props.hiddenFields);
        return Object.keys(this.props)
            .filter(propKey => !hiddenFields.includes(this.props[propKey]) && !hiddenFields.includes(propKey))
            .map((propKey, k) => <th key={k}> {this.props[propKey]} </th>);
    }
    render()
    {
        return (
            <tr>
                {this.renderFromProps()}
            </tr>
        );
    }
}