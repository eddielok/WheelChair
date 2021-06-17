export default class DataList_base extends React.Component{
    // perform shallow compare 
    shouldComponentUpdate(nextProps, nextState)
    { 
        return nextProps.data != this.props.data;
    }
}
