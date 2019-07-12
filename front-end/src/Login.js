import React, { Component } from 'react';

export default class Login extends Component {
    constructor(){
        super();
        this.state = { errorMessage: "", successMessage: "" };
    }
    login(event){
        event.preventDefault();

        const requestInfo = {
            method: 'POST',
            body: JSON.stringify({username: this.username.value, password: this.password.value}),
            headers: {
                'Content-type': 'application/json',
            }
        };

        fetch('http://localhost:8000/api/auth/token/', requestInfo)
            .then(response => {
                if (response.ok) {
                    return response.text();
                } else {
                    console.log(response);
                    throw new Error('Usuário ou senha inválidos, tente novamente');
                }
            })
            .then(token => {
                const token_list = JSON.parse(token);
                localStorage.setItem('auth-token-access', token_list["access"]);
                localStorage.setItem('auth-token-refresh', token_list["refresh"]);
                this.setState({ errorMessage: "", successMessage: "" });
            })
            .catch(error => {
                this.setState({ errorMessage:error.message });
            });
    }
    render() {
        return (
            <div className="content">
                <h4>Login</h4>
                <span style={{ color: "red" }}>{ this.state.errorMessage }</span>
                <span style={{ color: "green"}}>{ this.state.successMessage }</span>
                <form onSubmit={ this.login.bind(this) }>
                    <div className="form-group row">
                        <div className="col-md-2">
                            <label>User</label>
                        </div>
                        <div className="col-md-9">
                            <input type="text" className="form-control" ref={(input) => this.username = input}/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <div className="col-md-2">
                            <label>Password</label>
                        </div>
                        <div className="col-md-9">
                            <input type="password" className="form-control" ref={(input) => this.password = input}/>
                        </div>
                    </div>
                    <input type="submit" value="Submit"/>
                </form>
            </div>
        )
    }
}