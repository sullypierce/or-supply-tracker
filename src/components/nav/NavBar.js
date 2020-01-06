import React, { Component } from 'react'

import { Link} from "react-router-dom"

import "bootstrap/dist/css/bootstrap.min.css"

export default class NavBar extends Component {
    render() {
        return (
            <>
            <h1>SurgeTracker</h1>
            {this.props.userType === "admin" ?
            <nav>
                <ul className="nav nav-pills nav-fill">

                    <li className="nav-item">
                        <Link className="nav-link" to="/users">Users</Link>
                    </li>

                    <li className="nav-item">
                        <Link className="nav-link" to="/surgery">Surgery</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/patients">Patients</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/preferencecards/doctorlist">Preference Cards</Link>
                    </li>
                    {this.props.isAuthenticated() ? <li className="nav-item">
                        <Link className="nav-link" to="/login" onClick={this.props.logout}>Logout</Link>
                    </li> : null}
                    
                </ul>
            </nav>
            : null}
            
            { this.props.userType === "supply" || this.props.userType === "clerical" ? <li className="nav-item">
            <Link className="nav-link" to="/login" onClick={this.props.logout}>Logout</Link> </li> : null}
            </>
        )
    }
}
