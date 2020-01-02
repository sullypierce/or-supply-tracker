import React, { Component } from 'react'

import { BrowserRouter as Router } from "react-router-dom"
import ApplicationViews from './ApplicationViews'
import NavBar from './components/nav/NavBar'

export default class OrSupply extends Component {
    isAuthenticated = () => localStorage.getItem("credentials") !== null

    getUserType = () => {
        if (JSON.parse(localStorage.getItem("credentials")) !== null) {
            return JSON.parse(localStorage.getItem("credentials")).accountType;
        } else { return ""}
    }
   
    state = {
        user: this.isAuthenticated(),
        userType: this.getUserType()
        
    }


    

    setUser = (authObj) => {
        /*
          For now, just store the email and password that
          the customer enters into local storage.
        */
        localStorage.setItem(
            "credentials",
            JSON.stringify(authObj)
        )
        this.setState({
            user: this.isAuthenticated(),
            userType: authObj.accountType
        });
    }

    logout = () => {
        localStorage.clear()
        this.setState({
            user: this.isAuthenticated(),
            userType:""
        })
    }

    render() {
        return (
           <Router>
               <NavBar logout={this.logout} isAuthenticated={this.isAuthenticated} userType={this.state.userType}/>
               < ApplicationViews  isAuthenticated={this.isAuthenticated} userType={this.state.userType} setUser={this.setUser}/>
           </Router>
        )
    }
}

