import React, { Component } from 'react'
import Login from './components/auth/login'
import { Route } from 'react-router-dom'
import SurgeryForm from './components/forms/SurgeryForm'
import UserForm from './components/forms/UserForm'
import UserList from './components/users/UserList'
import PatientForm from './components/forms/PatientForm'
import PatientList from './components/patients/PatientList'
import SurgeryList from './components/surgery/SurgeryList'
import PreferenceCardDoctorList from './components/preference cards/PreferenceCardDoctorList'
import PreferenceCardList from './components/preference cards/PreferenceCardList'
import PreferenceCardAddItem from './components/preference cards/PreferenceCardAddItem'

import { Redirect } from "react-router-dom"
import PicklistList from './components/picklists/PicklistList'
import PicklistItemList from './components/picklists/PicklistItemList'

export default class ApplicationViews extends Component {
    render() {
        return (
            <React.Fragment>
                <Route
                    exact path="/login" render={props => {
                        
                        return <Login setUser={this.props.setUser} {...props} />

                    }}
                />
                <Route
                    exact path="/surgery/schedule" render={props => {
                        if (this.props.isAuthenticated()) {
                            return <SurgeryForm  {...props} isNew={true} />
                          } else { return <Redirect to="/login" /> }
                        }}
                />
                <Route
                    exact path="/surgery/:surgeryId(\d+)/update" render={props => {
                        if (this.props.isAuthenticated()) {
                            return <SurgeryForm  {...props} isNew={false}/>
                          } else { return <Redirect to="/login" /> }
                        

                    }}
                />
                <Route
                    exact path="/users/add" render={props => {
                        if (this.props.isAuthenticated()) {
                            return <UserForm  {...props} isNew={true}/>
                          } else { return <Redirect to="/login" /> }
                        

                    }}
                />
                <Route
                    exact path="/users/:userId(\d+)/edit" render={props => {
                        if (this.props.isAuthenticated()) {
                            return <UserForm  {...props} isNew={false}/>
                          } else { return <Redirect to="/login" /> }
                        

                    }}
                />
                <Route
                    exact path="/users" render={props => {
                        if (this.props.isAuthenticated()) {
                            return <UserList  {...props} />
                          } else { return <Redirect to="/login" /> }
                        

                    }}
                />
                <Route
                    exact path="/patients/add" render={props => {
                        if (this.props.isAuthenticated()) {
                            return <PatientForm  {...props} isNew={true}/>
                          } else { return <Redirect to="/login" /> }
                        

                    }}
                />
                <Route
                    exact path="/patients/:patientId(\d+)/edit" render={props => {
                        if (this.props.isAuthenticated()) {
                            return <PatientForm  {...props} isNew={false}/>
                          } else { return <Redirect to="/login" /> }
                        

                    }}
                />
                <Route
                    exact path="/patients" render={props => {
                        if (this.props.isAuthenticated()) {
                            return <PatientList  {...props} />
                          } else { return <Redirect to="/login" /> }
                        

                    }}
                />
                <Route
                    exact path="/surgery" render={props => {
                        if (this.props.isAuthenticated()) {
                            return <SurgeryList  {...props} />
                          } else { return <Redirect to="/login" /> }
                        

                    }}
                />
                <Route
                    exact path="/preferencecards/doctorlist" render={props => {
                        if (this.props.isAuthenticated()) {
                            return <PreferenceCardDoctorList  {...props} />
                          } else { return <Redirect to="/login" /> }
                        

                    }}
                />
                <Route
                    exact path="/:doctorId(\d+)/preferencecards" render={props => {
                        if (this.props.isAuthenticated()) {
                            return <PreferenceCardList  {...props} />
                          } else { return <Redirect to="/login" /> }
                        

                    }}
                />
                <Route
                    exact path="/:doctorId(\d+)/preferencecards/additem" render={props => {
                        if (this.props.isAuthenticated()) {
                            return <PreferenceCardAddItem  {...props} />
                          } else { return <Redirect to="/login" /> }
                        

                    }}
                />
                <Route
                    exact path="/supply/picklists" render={props => {
                        if (this.props.isAuthenticated() && this.props.userType === "supply") {
                            return < PicklistList {...props}/>
                          } else { return <Redirect to="/login" /> }
                        

                    }}
                />
                <Route
                    exact path="/supply/:pickListId(\d+)/picklist" render={props => {
                        if (this.props.isAuthenticated() && this.props.userType === "supply") {
                            return < PicklistItemList {...props}/>
                          } else { return <Redirect to="/login" /> }
                        

                    }}
                />
                <Route
                    exact path="/surgery/:surgeryId(\d+)/record" render={props => {
                        if (this.props.isAuthenticated() && this.props.userType === "clerical") {
                            return < PicklistItemList {...props}/>
                          } else { return <Redirect to="/login" /> }
                        

                    }}
                />
            </React.Fragment>
        )
    }
}
