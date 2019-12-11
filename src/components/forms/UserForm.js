import React, { Component } from 'react'
import APIManager from '../modules/APIManager';

export default class UserForm extends Component {
    state = {
        username: "",
        password: "",
        accountType: "admin",
        loadingStatus: this.props.loadingStatus
    }

    handleFieldChange = evt => {
        const stateToChange = {};
        stateToChange[evt.target.id] = evt.target.value;
        this.setState(stateToChange)
    }

    createUser = (evt) => {
        evt.preventDefault()
        const newUser = {
            username: this.state.username,
        password: this.state.password,
        accountType: this.state.accountType
        }
        if (this.state.username !== "" || this.state.password !== ""){
        APIManager.post("users", newUser)
        } else {
            Window.alert("You must fill in every field.")
        }

    }

    componentDidMount() {
        if (!this.props.isNew) {
            APIManager.get(`users/${this.props.match.params.taskId}`)
                .then(task => {
                    this.setState({
                        username: task.username,
                        password: task.password,

                        loadingStatus: false,
                    });
                });
        }
    }

    render() {


        return (
            <>
                <form onSubmit={this.createUser}>
                    <fieldset id="userForm">
                        <legend htmlFor="userForm">Create User</legend>
                        <label htmlFor="username">Username</label>
                        <input type="text" id="username" onChange={this.handleFieldChange} value={this.state.username}/>
                        <label htmlFor="password">Password</label>
                        <input type="text" id="password" onChange={this.handleFieldChange} value={this.state.password}/>
                        <label htmlFor="accountType">Account Type</label>
                        <select id="accountType" onChange={this.handleFieldChange} value={this.state.accountType}>
                            <option value="admin">Admin</option>
                            <option value="supply">Supply Chain</option>
                            <option value="circTech">Circulating Tech</option>
                            <option value="billing">Billing</option>
                            <option value="nurse">Nurse</option>
                        </select>
                    <button disabled={this.state.loadingStatus}>Add</button>
                    </fieldset>
                </form>
            </>
        )
    }
}
