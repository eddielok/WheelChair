import Login_Main from '/js/consumerComponent/login/login_Main.jsx';
class Login_Input_Form extends React.Component {
    render() {
        return (
            <Login_Main pRedirect={qRedirect}
                render={({ user_name, password, isSubmited, isSubmitSuccess, submitMessage, handleServerSubmit, handleFieldChange }) => {
                    return (
                        <div className="login-box">
                            <div className="login-logo">
                                <div className="col-lg-12">
                                    <a href="#">
                                        <span className="fas fa-wheelchair"></span> &nbsp;
                                    <b>Seat</b>  Database
                                    </a>
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-body login-card-body">
                                    <p className="login-box-msg">{isSubmited ? submitMessage : "Please sign in"}</p>
                                </div>
                                <form className="Form" onSubmit={e => {
                                    e.preventDefault();
                                    handleServerSubmit();
                                }}>
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <input type="text" className="form-control" placeholder="User Name" value={user_name} name="user_name" maxLength=" 255 " onChange={e => {
                                                e.preventDefault();
                                                handleFieldChange(e);
                                            }} />
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <input type="password" className="form-control" placeholder="Password" value={password} name="password" maxLength=" 255 " onChange={e => {
                                                e.preventDefault();
                                                handleFieldChange(e);
                                            }} />
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <input type="submit" value="Submit" className="btn btn-block btn-primary" />
                                    </div>
                                    <div className="col-lg-12">&nbsp;</div>
                                </form>
                            </div>
                        </div>
                    );
                }}
            />
        );
    }
}
ReactDOM.render(<Login_Input_Form qRedirect={qRedirect} />, document.getElementById('loginForm'));