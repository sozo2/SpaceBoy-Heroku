import React, { Component } from 'react';
import { handleLogin } from "./../services/auth-service"
import axios from 'axios';

class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            first_name: '',
            is_admin: false
        }
    }

    handleUpdate = event => {
        this.setState({
            [event.target.name]: event.target.value,
        })
    }

    handleSubmit = event => {
        event.preventDefault()
        axios.post(process.env.MONGODB_URI+ '/api/user/validate-login', {username:this.state.username, password:this.state.password})
        .then((res) => {
            if(res.data.valid) {
                console.log("LOGIN USER DATA");
                console.log(res.data);
                this.setState({first_name:res.data.first_name, is_admin:res.data.is_admin});
                handleLogin(this.state);
                this.props.updateStateAfterLogin();
                this.props.history.push("/");
            } else {
                console.log("login credentials not valid. please try again.")
            }
        })
    }
        
    render(props) {
      return (
        <div className="loginFormContainer"> 
            <div id="login-form-container">
            <h2>Login</h2>
            <form
                className="login-form"
                method="post"
                onSubmit={event => {
                    this.handleSubmit(event);
                }}>
                <label className="login-form-section">Username:
                    <input type="text" name="username" onChange={this.handleUpdate} />
                </label>
                <label className="login-form-section">Password:
                <input
                    type="password"
                    name="password"
                    onChange={this.handleUpdate}
                />
                </label>
                <input id="login-submit-button" type="submit" value="Log In" />
            </form>
            </div>
        </div>
    )
  }
}

export default Login;