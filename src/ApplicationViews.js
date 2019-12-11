import React, { Component } from 'react'
import Login from './components/auth/login'
import { Route } from 'react-router-dom'
import ScheduleSurgeryForm from './components/forms/ScheduleSurgeryForm'
import UserForm from './components/forms/UserForm'

export default class ApplicationViews extends Component {
    render() {
        return (
            <React.Fragment>
                <Route
                    exact path="/" render={props => {
                        return <Login setUser={this.props.setUser} {...props} />

                    }}
                />
                <Route
                    exact path="/surgery/schedule" render={props => {
                        return <ScheduleSurgeryForm  {...props} />

                    }}
                />
                <Route
                    exact path="/user/add" render={props => {
                        return <UserForm  {...props} isNew={true}/>

                    }}
                />
                <Route
                    exact path="/user/:userId(\d+)/edit" render={props => {
                        return <UserForm  {...props} isNew={true}/>

                    }}
                />
            </React.Fragment>
        )
    }
}
