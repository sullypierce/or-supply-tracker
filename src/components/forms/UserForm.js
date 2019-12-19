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
                <form onSubmit={
                    this.props.isNew ?
                        this.createUser
                        : this.updateUser}>
                    <fieldset id="userForm">
                        <legend htmlFor="userForm">Create User</legend>
                        <label htmlFor="fullName">Full Name</label>
                        <input type="text" id="fullName" onChange={this.handleFieldChange} value={this.state.fullName} />
                        <label htmlFor="username">Username</label>
                        <input type="text" id="username" onChange={this.handleFieldChange} value={this.state.username} />
                        <label htmlFor="password">Password</label>
                        <input type="text" id="password" onChange={this.handleFieldChange} value={this.state.password} />
                        <label htmlFor="accountType">Account Type</label>
                        <select id="accountType" onChange={this.handleFieldChange} value={this.state.accountType}>
                            <option value="admin">Admin</option>
                            <option value="supply">Supply Chain</option>
                            <option value="circTech">Circulating Tech</option>
                            <option value="billing">Billing</option>
                            <option value="nurse">Nurse</option>
                        </select>
                        <button disabled={this.state.loadingStatus}>Save</button>
                        {!this.props.isNew ? <button onClick={this.removeUser}>Remove User</button>
                            : null}
                    </fieldset>
                </form>
            </>
        )
    }
}
