import React, { Component } from 'react'

import { BrowserRouter as Router } from "react-router-dom"
import ApplicationViews from './ApplicationViews'
import NavBar from './components/nav/NavBar'

export default class OrSupply extends Component {
    state = {
        user: false
    }


    isAuthenticated = () => localStorage.getItem("credentials") !== null

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
            user: this.isAuthenticated()
        });
    }

    logout = () => {
        localStorage.clear()
        this.setState({
            user: this.isAuthenticated()
        })
    }

    render() {
        return (
           <Router>
               <NavBar logout={this.logout} isAuthenticated={this.isAuthenticated}/>
               < ApplicationViews  isAuthenticated={this.isAuthenticated} setUser={this.setUser}/>
           </Router>
        )
    }
}

