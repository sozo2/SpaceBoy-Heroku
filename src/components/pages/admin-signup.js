import React, { Component } from 'react';
import { handleLogin } from "./../services/auth-service"
import axios from 'axios';

class AdminSignup extends Component {

    constructor(props) {
        super(props);

        this.state = {
            first_name: '',
            last_name: '',
            email: '',
            username: '',
            password: '',
            confirm_password: '',
            is_admin: true,
            admin_token: ''
        }
    }

    handleUpdate = event => {
        this.setState({
            [event.target.name]: event.target.value,
        })
    }

    ADMIN_TOKEN = process.env.ADMIN_TOKEN

    handleSubmit = event => {
        event.preventDefault()
        if (this.state.password==this.state.confirm_password && this.state.admin_token==this.ADMIN_TOKEN) {
            axios.post('/api/user/register', this.state)
            .then((res) => {
                if(res.data.valid) {
                    console.log(res.data.user.username + " signed up");
                    handleLogin({"username": res.data.user.username, "password": res.data.user.password, "first_name": res.data.user.first_name, "is_admin": res.data.user.is_admin});
                    this.props.updateStateAfterLogin();
                    this.props.history.push("/");
                } else {
                    console.log("signup failed. please try again.");
                }
            })
        } else {
            console.log("admin signup failed. please try again.");
        }
    }
        
    render(props) {
      return (
        <div className="signupFormContainer"> 
            <div id="admin-form-container">
            <h2>Signup</h2>
            <form
                id="admin-form"
                method="post"
                onSubmit={event => {
                    this.handleSubmit(event);
                }}>
                <label>First Name: 
                    <input type="text" name="first_name" onChange={this.handleUpdate} />
                </label>
                <label>Last Name:
                    <input type="text" name="last_name" onChange={this.handleUpdate} />
                </label>
                <label>Email: 
                    <input type="email" name="email" onChange={this.handleUpdate} />
                </label>
                <label>Username:
                    <input type="text" name="username" onChange={this.handleUpdate} />
                </label>
                <label>Password:
                    <input type="password" name="password" onChange={this.handleUpdate}/>
                </label>
                <label>Confirm Password:
                    <input type="password" name="confirm_password" onChange={this.handleUpdate}/>
                </label>
                <label>Admin Token: 
                    <input type="password" name="admin_token" onChange={this.handleUpdate}/>
                </label>
                <input type="submit" id="admin-submit" value="Sign Up" />
            </form>
            </div>
        </div>
    )
  }
}

export default AdminSignup;