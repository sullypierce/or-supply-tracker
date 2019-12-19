import React, { Component } from 'react'

export default class UserCard extends Component {

handleClick = () => {
    this.props.history.push(`/users/${this.props.user.id}/edit`)
}

    render() {
        return (
            <div className="card">
                <h3>Name: {this.props.user.fullName}</h3>
        <p>username: {this.props.user.username}</p>
        <p>password: {this.props.user.password}</p>
        <p>Account Type: {this.props.user.accountType}</p>
        <button onClick={this.handleClick}>Update</button>


            </div>
        )
    }
}
