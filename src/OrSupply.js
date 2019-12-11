import React, { Component } from 'react'

import { BrowserRouter as Router } from "react-router-dom"
import ApplicationViews from './ApplicationViews'

export default class OrSupply extends Component {
    render() {
        return (
           <Router>
               < ApplicationViews  />
           </Router>
        )
    }
}

