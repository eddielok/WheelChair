import Login_Main from '/js/consumerComponent/login/login_Main.jsx';
import HandleAfterSubmit from '/js/shared/HandleAfterSubmit.jsx';
class Login_Input_Form extends React.Component {
    render() {
        return (
            <Login_Main pRedirect={qRedirect}
                render={({ user_name, password, isSubmited, isSubmitSuccess, submitMessage, handleServerSubmit, handleFieldChange }) => {
                    return (
                        <div>
                            <form className="Form" onSubmit={e => {
                                e.preventDefault();
                                handleServerSubmit();
                            }}>
                                <h1>Seat Database</h1>
                                <div className="row" >
                                    <div className="col-3">User Name:</div>
                                    <div className="col-9 p-1">
                                        <input value={user_name} type="text" name="user_name" maxLength=" 255 " onChange={e => {
                                            e.preventDefault();
                                            handleFieldChange(e);
                                        }} />
                                    </div>
                                </div >
                                <div className="row">
                                    <div className="col-3">Password:</div>
                                    <div className="col-9 p-1">
                                        <input value={password} type="password" name="password" maxLength=" 255 " onChange={e => {
                                            e.preventDefault();
                                            handleFieldChange(e);
                                        }} />
                                    </div>
                                </div>
                                <input type="submit" value="Submit" />
                                {isSubmited && <HandleAfterSubmit isSubmited={isSubmited} isSubmitSuccess={isSubmitSuccess} submitMessage={submitMessage} />}
                            </form>
                        </div>
                    );
                }}
            />
        );
    }
}
ReactDOM.render(<Login_Input_Form qRedirect={qRedirect}/>, document.getElementById('loginForm'));