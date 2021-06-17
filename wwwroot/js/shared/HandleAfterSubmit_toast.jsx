export default class HandleAfterSubmit_toast extends React.Component {
    constructor(props) {
        super(props);
        this.state = { show: true }
    }
    handleDisplayMessage(list) {
        return list.map((m, out_k) => {
            if (m.type && m.type === "complex_message")
                return <ul key={out_k}>  {
                    String(m.children).split('>').filter(i => String(i).trim() !== '').map((m, k) => <li key={k}>{m}</li>)
                } </ul>;
            else
                return <p key={out_k} className={m.className}>{m.children}</p>;
        });
    }
    handleButtonList(list) {
        return list.map((btn, k) =>
            <button className={btn.className} onClick={(e) => { e.preventDefault(); btn.on_click(this.props.origin_form); }} key={k}>
                {btn.children}
            </button>)
    }
    render() {
        const { children } = this.props;
        var btnList = [];
        var paragraphList = [];
        React.Children.forEach(children, child => {
            if (child) {
                if (child.type === "button") btnList.push(child.props);
                else if (child.type === "p") paragraphList.push(child.props);
            }
        });
        return (
            <Toast show={this.state.show} onClose={() => { this.setState({ show: false }); this.props.close_handle() }}>
                {this.props.submitMessage_header && (
                    <Toast.Header closeButton={true} >
                        <strong className="mr-auto">
                            {this.props.submitMessage_header}
                        </strong>
                    </Toast.Header>
                )}
                <Toast.Body>
                    {paragraphList.length > 0 && this.handleDisplayMessage(paragraphList)}
                    {btnList.length > 0 && this.handleButtonList(btnList)}
                </Toast.Body>
            </Toast>
        );
    }
} 