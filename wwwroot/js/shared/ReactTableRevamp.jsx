import getDisplayDate from '/js/shared/getDisplayDate.js'; 
 
/**
    * Renders table component; for btn, please inject; please dun add biz logic inside component , these are juz container;
    * @param  props
    * @param  {array} props.headerList - required, display header
    * @param  {string} props.hiddenFields - required, fields which should be hidden
    * @param  {string} props.filterStr - optional for filter input string
    * @param  {string} props.selectedField  - optional for filter select field 
    * @param  {props} props.button  - optional, you can select to input button
    * @param  {function} props.button.handler  - optional, handler for the btn, include biz handle in calling function
    * @param  {string} props.button.uni_key  - optional, case-sensitive key in the data , pass back for handler 
    * @param  {string} props.button.css_class_name  - optional, css class for the button
    * @param  {array} props.data - required, the data
    * @return {table} display table 
    */
export default class ReactTable extends React.Component
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
        const { children } = this.props;
        var handlerList = [];
        if (children) {
            React.Children.map(children, child => {
                if (child) handlerList.push(child.props);
            }); 
        } 
        var headerList = handlerList.length > 0 ? this.getNewHeader() : { ...this.props.headerList };
        return (
            <table id="reactTable">
                <thead>
                    <AnFormattedHeader  {...headerList} hiddenFields={this.props.hiddenFields + ",hiddenField"} />
                </thead>
                <tbody>
                    <RowList data={this.props.data} handlerList={handlerList} hiddenFields={this.props.hiddenFields + ",cellLength,hiddenFields,data,handlerList,filterStr,selectedField"} filterStr={this.props.filterStr} cellLength={this.props.cellLength} selectedField={this.props.selectedField}/>
                </tbody>
            </table>
        );
    }
}
function handleTableValueDisplay(v,l)
{
    let returnValue = "";
    if (l)
    {
        let lengthLimit = parseInt(l);
        returnValue = lengthLimit > 0 && String(v).length > lengthLimit ?
            String(v).substr(0, lengthLimit) + " (more...)" : v;

    } else if (typeof v === 'boolean')
    {
        returnValue = v ? "Yes" : "No";
    } else
        returnValue = v;
    return returnValue;
}
class AnFormattedRow extends React.Component
{
    renderFromProps()
    {
        var tmpObj;
        // for the buttons
        if (this.props.handlerList.length > 0)
        {
            let btnList = this.props.handlerList.map((aHanlder, k) =>
            {
                const fun = aHanlder.handler;
                return  <button key={k} onClick={(btn) => fun(this.props[aHanlder.uni_key], btn)} value={aHanlder.value} className={aHanlder.css_class_name}>{aHanlder.children}</button> 
            });
            let tmp = { "mix": <div className="flexDiv" >{btnList}</div> };
            tmpObj = Object.assign(tmp, tmpObj);
        }

        var hiddenFields = String(this.props.hiddenFields).split(",");
        var newObject = this.props.handlerList.length > 0 ? Object.assign(tmpObj, this.props) : this.props;
        return Object.keys(newObject)
            .filter(propKey => !hiddenFields.includes(propKey))
            .map((propKey, k) =>
            {
                if (String(propKey).toLowerCase().includes("date"))
                    return <td key={k}> {getDisplayDate(newObject[propKey])} </td>;
                else
                    return <td key={k}> {handleTableValueDisplay(newObject[propKey], this.props.cellLength)} </td>;
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
                handlerList={this.props.handlerList}
                cellLength={this.props.cellLength}
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