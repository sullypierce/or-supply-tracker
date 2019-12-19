import React, { Component } from 'react'

import { BrowserRouter as Router } from "react-router-dom"
import ApplicationViews from './ApplicationViews'
import NavBar from './components/nav/NavBar'

export default class OrSupply extends Component {
    render() {
        return (
           <Router>
               <NavBar />
               < ApplicationViews  />
           </Router>
        )
    }
}

