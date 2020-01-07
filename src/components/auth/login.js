import React, { Component } from "react"
import APIManager from "../modules/APIManager"
import '../nav/NavBar.css'

class Login extends Component {

    // Set initial state
    state = {
        username: "",
        password: ""
    }

    // Update state whenever an input field is edited
    handleFieldChange = (evt) => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }


    handleLogin = (evt) => {
        evt.preventDefault()
        APIManager.get(`users?username=${this.state.username}`)
            .then((userInfo) => {
                if (userInfo.length !== 0) {
                    if (this.state.password === userInfo[0].password) {
                        const authObj = {
                            username: this.state.username,
                            userId: userInfo[0].id,
                            accountType: userInfo[0].accountType
                        }
                        // this.props.setUser(authObj)
                        this.props.setUser(authObj)
                        if (authObj.accountType === "admin") {

                            this.props.history.push("/surgery/schedule");
                        } else if (authObj.accountType === "supply") {
                            this.props.history.push("/supply/picklists")
                        } else {

                            this.props.history.push("/surgery")
                        }
                    } else {
                        window.alert("This password does not match this email!")
                    }
                } else {
                    window.alert("This email does not have an account.")
                }
            })


    }



    render() {
        return (
            <form className="w3-container w3-border w3-margin w3-round" onSubmit={this.handleLogin}>
                <h3 className="title">Sign In</h3>
                <fieldset>
                    <input
                        className="w3-input center-50 w3-center"
                        onChange={this.handleFieldChange}
                        type="username"
                        id="username"
                        placeholder="Username"
                        required="" autoFocus="" />
                </fieldset>
                <fieldset>
                    <input
                        className="w3-input center-50 w3-center"
                        onChange={this.handleFieldChange}
                        type="password"
                        id="password"
                        placeholder="Password"
                        required="" />
                </fieldset>
                <button
                    className="w3-button w3-border w3-round"
                    type="submit">
                    Sign in
        </button>
            </form>
        )
    }

}

export default Login