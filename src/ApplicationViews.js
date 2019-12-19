import React, { Component } from 'react'
import Login from './components/auth/login'
import { Route } from 'react-router-dom'
import SurgeryForm from './components/forms/SurgeryForm'
import UserForm from './components/forms/UserForm'
import UserList from './components/users/UserList'
import PatientForm from './components/forms/PatientForm'
import PatientList from './components/patients/PatientList'
import SurgeryList from './components/surgery/SurgeryList'

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
                        return <SurgeryForm  {...props} isNew={true} />

                    }}
                />
                <Route
                    exact path="/surgery/:surgeryId(\d+)/update" render={props => {
                        return <SurgeryForm  {...props} isNew={false}/>

                    }}
                />
                <Route
                    exact path="/users/add" render={props => {
                        return <UserForm  {...props} isNew={true}/>

                    }}
                />
                <Route
                    exact path="/users/:userId(\d+)/edit" render={props => {
                        return <UserForm  {...props} isNew={false}/>

                    }}
                />
                <Route
                    exact path="/users" render={props => {
                        return <UserList  {...props} />

                    }}
                />
                <Route
                    exact path="/patients/add" render={props => {
                        return <PatientForm  {...props} isNew={true}/>

                    }}
                />
                <Route
                    exact path="/patients" render={props => {
                        return <PatientList  {...props} />

                    }}
                />
                <Route
                    exact path="/surgery" render={props => {
                        return <SurgeryList  {...props} />

                    }}
                />
            </React.Fragment>
        )
    }
}
