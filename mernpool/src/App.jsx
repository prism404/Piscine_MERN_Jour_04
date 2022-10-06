import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {
    constructor() {

        super()
        this.state = {
            login: '',
            email: '',
            password: ''
        };

        this.changeLogin = this.changeLogin.bind(this)
        this.changeEmailLogin = this.changeEmail.bind(this)
        this.changePassword = this.changePassword.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    changeLogin(event) {
        this.setState({
            login: event.target.value
        })
    }

    changeEmail(event) {
        this.setState({
            email: event.target.value
        })
    }

    changePassword(event) {
        this.setState({
            password: event.target.value
        })
    }

    onSubmit(event) {
        event.preventDefault()

        const registered = {
            login: this.state.login,
            email: this.state.email,
            password: this.state.password
        }

        axios.post('http://localhost:4242/app/register', registered)
             .then(res => console.log(res.data))

        // window.location = '/home'
        this.setState({
            login: '',
            email: '',
            password: ''
        })
    }

    render() {
        return (

            <div className="container col-8 mt-4">
                <form action="" method="POST" onSubmit={this.onSubmit}>
                    <fieldset>
                        <h1>Register</h1>
                        <div className="form-group row">
                            <div className="form-group">
                                <div className="form-group">
                                    <label className="col-form-label mt-4" for="login">Login</label>
                                    <input type="text" 
                                           className="form-control" 
                                           placeholder="Login" 
                                           id="login"
                                           onChange={this.changeLogin}
                                           value={this.state.login}></input>
                                </div>
                                <label for="inputEmail1" className="form-label mt-4">Email address</label>
                                <input
                                    type="text"
                                    id="inputEmail1"
                                    placeholder="Enter email"
                                    onChange={this.changeEmail}
                                    value={this.state.email}
                                    className="form-control form-group"
                                />
                                <small id="emailHelp" className="form-text text-muted"
                                >We'll never share your email with anyone else.</small>
                            </div>
                            <div className="form-group">
                                <label for="exampleInputPassword1" className="form-label mt-4">Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="exampleInputPassword1"
                                    placeholder="Password"
                                    onChange={this.changePassword}
                                    value={this.state.password}
                                />
                            </div>
                            <div className="form-group">
                                <label for="confirmPassword" className="form-label mt-4">Confirm Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="confirmPassword"
                                    placeholder="Password"/>
                                </div>
                            </div>
                    </fieldset>
                    <div className="d-flex">
                        <button type="button" className="btn btn-primary m-2"><a href="/login" className="text-light text-decoration-none">Login</a></button>
                        <button type="submit" className="btn btn-primary m-2" value="Submit">Submit</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default App;