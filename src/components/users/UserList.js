import React, { Component } from 'react'
import UserCard from './UserCard'
import APIManager from '../modules/APIManager'
import "bootstrap/dist/css/bootstrap.min.css"


export default class UserList extends Component {
    state = {
        users: []
    }

    componentDidMount() {
        APIManager.get("users")
        .then(users => this.setState({
            users: users
        }))
    }
    
handleClick = () => {
    this.props.history.push("/users/add")
}

    render() {
        return (
            <>
            <button className="btn" onClick={this.handleClick}>
                Register User
            </button>
            <h2>Users:</h2>
            { this.state.users.map(user => <UserCard key={user.id} user={user} {...this.props}/>)}
            </>
        )
    }
}
