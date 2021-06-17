export default class FilterMe extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filterStrA: this.props.filterStr1,
            parentFunc: this.props.changeFilter,
            selectedfield: ''
        };
    }
    render() {
        return (
            <div className="row"> 
                <div className="col-sm">
                    <select
                        value={this.state.selectedItem}
                        onChange={e => {
                            this.setState({
                                selectedfield: e.target.value
                            })
                            if (!e.target.value) {
                                this.state.parentFunc('', '');
                            }
                        }
                        }>
                        {this.props.itemList.map(e => (
                            <option key={e.value} value={e.value} >
                                {e.display}
                            </option>
                        ))}
                    </select>

                </div>
                <div className="col-sm ">
                    &nbsp; contains  &nbsp; 
                    </div>
                <div className="col-sm ">
                    <input type="text" name="filterStrA" value={this.state.filterStrA}
                        onChange={(e) => {
                            this.setState({ [e.target.name]: e.target.value });
                            this.state.parentFunc(e.target.value, this.state.selectedfield);
                        }
                        }
                    />
                </div>
            </div>
        );
    }
}