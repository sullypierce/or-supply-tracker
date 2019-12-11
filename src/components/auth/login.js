import React, { Component } from "react"
import APIManager from "../modules/APIManager"

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
                            password: this.state.password,
                            userId: userInfo[0].id,
                            accountType: userInfo[0].accountType
                        }
                        // this.props.setUser(authObj)
                        this.props.history.push("/surgery/schedule");
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
            <form className="" onSubmit={this.handleLogin}>
                <h3>Please sign in</h3>
                <fieldset>
                    <label htmlFor="inputEmail" className="">Username</label>
                    <input
                        className=""
                        onChange={this.handleFieldChange}
                        type="username"
                        id="username"
                        placeholder="Username"
                        required="" autoFocus="" />
                </fieldset>
                <fieldset>
                    <label htmlFor="inputPassword" className="">Password</label>
                    <input
                        className=""
                        onChange={this.handleFieldChange}
                        type="password"
                        id="password"
                        placeholder="Password"
                        required="" />
                </fieldset>
                <button
                    className=""
                    type="submit">
                    Sign in
        </button>
            </form>
        )
    }

}

export default Login