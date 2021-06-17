import FilterMe from '/js/shared/FilterMe.jsx';
import httpResults from '/js/shared/httpCodes.js';
import serverComuunication from '/js/shared/serverComuunication.js';
import ReactTable from '/js/shared/ReactTable.jsx';
import React_table_in_ddl from '/js/shared/React_table_in_ddl.jsx';

export default class Wheelchair_Dimension_tableView extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            data: [],
            selectedField: "",
            fields: [],
            filterStrA: "",
            viewName: "WheelchairDimensions_list",
            isSubmited: false,
            isSubmitSuccess: false,
            tmpTextBox: "",
            submitMessage: ''
        };
        this.loadDataFromServer = this.loadDataFromServer.bind(this);
        this.setChangeFilter = this.setChangeFilter.bind(this);
        this.editOneRow = this.editOneRow.bind(this);
        this.selectOneRow = this.selectOneRow.bind(this);
    }
    loadDataFromServer(controller, payload)
    {
        serverComuunication.handleServerCommunication_type4('GET', controller, '', { "seat_no": payload }) 
            .then((response) =>
            {
                let r = httpResults(response.status);
                this.setState({ isSubmitSuccess: r.isSuccess, submitMessage: r.message, isSubmited: true });
                return response.json();
            })
            .then((tmpData) =>
            {
                this.setState({ data: tmpData });
                this.getFilterItemsList(tmpData);
            })
            .catch((response) => console.log(response));
    }
    getFilterItemsList(tmpData)
    {
        if (Array.isArray(tmpData) && tmpData.length)
        {
            let tmpElement = [];
            for (let prop in tmpData[0])
            {
                //skip the date
                if (String(prop).toLowerCase().includes('date')) continue;
                tmpElement.push(prop);
            }
            let elementsFromApi = tmpElement.map(t =>
            {
                return { value: t, display: t };
            });
            this.setState({
                fields: [
                    {
                        value: "",
                        display: "(Select a filter)"
                    }
                ].concat(elementsFromApi)
            });
        }
    }
    selectOneRow(e)
    {
        this.setState({ tmpTextBox: e }); 
    }
    editOneRow(e)
    {
        console.log(e)
        var queryString = {
            "Id": [e],
            "pageAction": "update",
            "workingForm": "Wheelchair_Dimension"
        };
        serverComuunication.handleInternalServerPageRedirect("Accessment", queryString)
    }
    setChangeFilter(str, aField)
    {
        this.setState({ filterStrA: str, selectedField: aField });
    }
    componentDidMount()
    {
        if (this.props.seatNo) this.loadDataFromServer(this.state.viewName, this.props.seatNo);
    }
    render()
    {
        return (
            <div>
                <div className="headerContainer"><h1> Wheelchair Measurements </h1></div>
                <div className="filter">
                    <FilterMe changeFilter={this.setChangeFilter} itemList={this.state.fields} filterStr1={this.state.filterStrA} />
                </div>

                {this.state.data.length > 0 && <ReactTable headerList={Object.keys(this.state.data[0])}
                    data={this.state.data} hiddenFields={"RefId"}
                    isEnableEditButton={true} editKey={"RefId"} editHandler={this.editOneRow} />}

                <input value={this.state.tmpTextBox} type="text" onChange={this.selectOneRow} name="tmpTextBox" />
                {this.state.data.length > 0 && <React_table_in_ddl headerList={Object.keys(this.state.data[0])} word_on_btn="&nabla;"
                    data={this.state.data} hiddenFields={"RefId"} selectHandler={this.selectOneRow} selectFieldKey={"RefId"} />}
                  
            </div>

        );
    }
}   
