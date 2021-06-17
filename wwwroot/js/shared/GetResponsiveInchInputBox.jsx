export default class GetResponsiveInchInputBox extends React.Component {
    state = { value: this.props.value === null ? 0 : this.props.value, inch: (this.props.value / 2.54).toFixed(2) };
    //shouldComponentUpdate(nextProps, nextState) {
    //    return nextProps.value != this.props.value;
    //}
    getInch = (e) => {
        this.setState({ inch: (e.target.value / 2.54).toFixed(2), value: e.target.value });
        this.props.stateHnadler(this.props.rowID, e, this.props.tableName);
    }
    render() {
        return (
            <span>
                <input value={this.state.value} type="number" step={this.props.step}
                    onChange={this.getInch} name={this.props.name} className={this.props.className} />
                &nbsp;{this.state.inch}"
            </span>
        );
    }
}
