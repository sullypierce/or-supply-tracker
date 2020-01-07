import React, { Component } from 'react'
import UserCard from './UserCard'
import APIManager from '../modules/APIManager'
import '../nav/NavBar.css'


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
            <button className="w3-button w3-card w3-border w3-round" onClick={this.handleClick}>
                Register User
            </button>
            <h2 className="w3-panel w3-blue-grey w3-text-white title">Users:</h2>
            { this.state.users.map(user => <UserCard key={user.id} user={user} {...this.props}/>)}
            </>
        )
    }
}
