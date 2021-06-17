import getDisplayDate from '/js/shared/getDisplayDate.js'; 
import DataList_base from '/js/shared/baseClasses/DataList_base.jsx';

/**
   * Renders table component in a btn
   * @param  props
   * @param  {array} props.headerList - required, display header
   * @param  {string} props.hiddenFields - required, fields which should be hidden
   * @param  {string} props.word_on_btn - required, word display on the generated button
   * @param  {Function} props.selectHandler - optional, the handler for clicking a selected row
   * @param  {Function} props.selectFieldKey - optional, the key returned after clicking a row
   * @param  {array} props.data - required, the data
   * @return  {table} display btn and a hidden table
   */
export default class React_table_in_ddl extends DataList_base { 
    getNewHeader() {
        var newObject = { 0: "Action" }
        this.props.headerList.forEach((element, k) => {
            Object.assign(newObject, { [++k]: element })
        });
        return newObject;
    }
    render() {
         
        return (
            <div className="dropdown" >
                <button className="dropbtn">{this.props.word_on_btn}</button>
                <div className="dropdown-content">
                    <table>
                        <thead>
                            <AnFormattedHeader  {...this.props.headerList} hiddenFields={this.props.hiddenFields + ",hiddenFields"} />
                        </thead>
                        <tbody>
                            <RowList data={this.props.data}
                                hiddenFields={this.props.hiddenFields + ",hiddenFields,data,selectHandler,selectFieldKey"}
                                selectHandler={this.props.selectHandler} selectFieldKey={this.props.selectFieldKey} />
                        </tbody>
                    </table>
                </div>
            </div >
        );
    }
}
function getHiddenFieldsArray(field_string) {
    var hiddenFields = String(field_string).split(",");
    hiddenFields.push(field_string)
    return hiddenFields;
} 
class AnFormattedRow extends React.Component {
    renderFromProps() { 
        var hiddenFields = getHiddenFieldsArray(this.props.hiddenFields);
        var newObject = this.props;
        return Object.keys(newObject)
            .filter(propKey => !hiddenFields.includes(propKey))
            .map((propKey, k) => {
                if (String(propKey).toLowerCase().includes("date"))
                    return <td key={k}> {getDisplayDate(newObject[propKey])} </td>;
                else
                    return <td key={k} onClick={() => this.props.selectHandler(newObject[this.props.selectFieldKey])}> {newObject[propKey]} </td>;
            });
    }
    render() {
        return (
            <tr>
                {this.renderFromProps()}
            </tr>
        );
    }
}
class RowList extends React.Component {
    render() {
        const commentNodes = this.props.data.map((anItem, k) => (
            <AnFormattedRow
                {...anItem}
                hiddenFields={this.props.hiddenFields}
                selectHandler={this.props.selectHandler}
                selectFieldKey={this.props.selectFieldKey}
                key={k} />
        ));
        return commentNodes;
    }
}
class AnFormattedHeader extends React.Component {
    renderFromProps() { 
        var hiddenFields = getHiddenFieldsArray(this.props.hiddenFields);
        return Object.keys(this.props)
            .filter(propKey => !hiddenFields.includes(this.props[propKey]) && !hiddenFields.includes(propKey))
            .map((propKey, k) => <th key={k}> {this.props[propKey]} </th>);
    }
    render() {
        return (
            <tr>
                {this.renderFromProps()}
            </tr>
        );
    }
}