import React, { Component } from 'react'

import { Link, withRouter } from "react-router-dom"

import "bootstrap/dist/css/bootstrap.min.css"

export default class NavBar extends Component {
    render() {
        return (
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
                        <Link className="nav-link" to="/preferencecards">Preference Cards</Link>
                    </li>

                </ul>
            </nav>
        )
    }
}
