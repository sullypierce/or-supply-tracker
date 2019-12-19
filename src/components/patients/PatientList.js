import React, { Component } from 'react'
import PatientCard from './PatientCard'
import APIManager from '../modules/APIManager'
import "bootstrap/dist/css/bootstrap.min.css"


export default class PatientList extends Component {
    state = {
        patients: []
    }

    componentDidMount() {
        APIManager.get("patients")
        .then(patients => this.setState({
            patients: patients
        }))
    }
    
handleClick = () => {
    this.props.history.push("/patients/add")
}

    render() {
        return (
            <>
            <button className="btn" onClick={this.handleClick}>
                Add Patient
            </button>
            <h2>Users:</h2>
            { this.state.patients.map(patient => <PatientCard key={patient.id} patient={patient} {...this.props}/>)}
            </>
        )
    }
}
