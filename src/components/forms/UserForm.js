import React, { Component } from 'react'
import APIManager from '../modules/APIManager';

export default class UserForm extends Component {
    state = {
        fullName: "",
        username: "",
        password: "",
        accountType: "admin",
        loadingStatus: this.props.loadingStatus,
        changeOccurred: false
    }

    handleFieldChange = evt => {
        const stateToChange = {};
        stateToChange[evt.target.id] = evt.target.value;
        this.setState(stateToChange)
        this.setState({ changeOccurred: true })
    }

    createUser = (evt) => {
        evt.preventDefault()
        const newUser = {
            fullName: this.state.fullName,
            username: this.state.username,
            password: this.state.password,
            accountType: this.state.accountType
        }
        if (this.state.username !== "" || this.state.password !== "") {
            APIManager.post("users", newUser)
                .then(() => { this.props.history.push("/users") })
        } else {
            Window.alert("You must fill in every field.")
        }

    }

    updateUser = (evt) => {
        evt.preventDefault()
        const updatedUser = {
            fullName: this.state.fullName,
            username: this.state.username,
            password: this.state.password,
            accountType: this.state.accountType
        }
        APIManager.patch("users", this.props.match.params.userId, updatedUser)
            .then(() => { this.props.history.push("/users") })
    }

    removeUser = (evt) => {
        evt.preventDefault()
        APIManager.delete("users", this.props.match.params.userId)
            .then(() => {
                this.props.history.push("/users")
            })
    }

    componentDidMount() {
        if (!this.props.isNew) {
            APIManager.get(`users/${this.props.match.params.userId}`)
                .then(user => {
                    this.setState({
                        fullName: user.fullName,
                        username: user.username,
                        password: user.password,
                        accountType: user.accountType,
                        loadingStatus: false,
                    });
                });
        }
    }

    render() {


        return (
            <>
                <form className="w3-container w3-border w3-margin w3-round" onSubmit={
                    this.props.isNew ?
                        this.createUser
                        : this.updateUser}>
                    <fieldset id="userForm">
                        <legend htmlFor="userForm">Create User</legend>
                        <input type="text" id="fullName" className="w3-input center-50 w3-center" placeholder="Full Name" onChange={this.handleFieldChange} value={this.state.fullName} />
                        <input type="text" id="username" className="w3-input center-50 w3-center" placeholder="Username" onChange={this.handleFieldChange} value={this.state.username} />
                        <input type="text" placeholder="Password" className="w3-input center-50 w3-center" id="password" onChange={this.handleFieldChange} value={this.state.password} />
                        <label htmlFor="accountType">Account Type</label>
                        <select id="accountType" className="w3-input center-50 w3-center" onChange={this.handleFieldChange} value={this.state.accountType}>
                            <option value="admin">Admin</option>
                            <option value="supply">Supply Chain</option>
                            <option value="circTech">Circulating Tech</option>
                            <option value="billing">Billing</option>
                            <option value="nurse">Nurse</option>
                        </select>
                        <button className="w3-button-small w3-border w3-round" disabled={this.state.loadingStatus}>Save</button>
                        {!this.props.isNew ? <button onClick={this.removeUser}>Remove User</button>
                            : null}
                    </fieldset>
                </form>
            </>
        )
    }
}
