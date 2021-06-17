export default class HandleAfterSubmit extends React.Component
{
    // perform shallow compare 
    shouldComponentUpdate(nextProps, nextState)
    { 
        return nextProps.isSubmitSuccess != this.props.isSubmitSuccess;
    }
    handleMessage()
    { 
        return String(this.props.submitMessage).split('>').map((m, k) => <p key={k}>{m}</p>);
    }
    render()
    { 
        return (
            <div className="submitStatus" style={this.props.isSubmited ? { display: "block" } : { display: "none" }}>
                <br />
                <Alert variant={this.props.isSubmitSuccess ? "success" : "danger"}>
                    <Alert.Heading>{this.props.isSubmitSuccess ? "Submit success" : "Submit fail"} </Alert.Heading> 
                        {this.handleMessage()} 
                </Alert>
            </div>);
    }
}
