import React, { Component } from 'react'

import { Link} from "react-router-dom"

import './NavBar.css'


export default class NavBar extends Component {
    render() {
        return (
            <>
            <h1 className="w3-panel w3-text-green w3-amber title"><i className="fas fa-bolt"></i>SurgeTracker</h1>
            
            <nav className="w3-bar w3-teal">
                <ul className="nav nav-pills nav-fill">
                {this.props.userType === "admin" ?
                <>
                    <li className="w3-bar-item w3-button w3-mobile w3-border">
                        <Link className="nav-link" to="/users">Users</Link>
                    </li>

                    <li className="w3-bar-item w3-button w3-mobile w3-border">
                        <Link className="nav-link" to="/surgery">Surgery</Link>
                    </li>
                    <li className="w3-bar-item w3-button w3-mobile w3-border">
                        <Link className="nav-link" to="/patients">Patients</Link>
                    </li>
                    <li className="w3-bar-item w3-button w3-mobile w3-border">
                        <Link className="nav-link" to="/preferencecards/doctorlist">Preference Cards</Link>
                    </li>
                    {this.props.isAuthenticated() ? <li className="w3-bar-item w3-button w3-mobile w3-border">
                        <Link className="nav-link" to="/login" onClick={this.props.logout}>Logout</Link>
                    </li> : null}
                    </>
                
            : null}
            
            { this.props.userType === "supply" || this.props.userType === "clerical" ? <li className="w3-bar-item w3-button w3-mobile w3-border">
            <Link className="nav-link" to="/login" onClick={this.props.logout}>Logout</Link> </li> : null}
            </ul>
            </nav>
            </>
        )
    }
}
