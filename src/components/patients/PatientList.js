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
            <button className="w3-button w3-card w3-border w3-round" onClick={this.handleClick}>
                Add Patient
            </button>
            <h2 className="title w3-panel w3-blue-grey w3-text-white w3-border w3-round">Patients:</h2>
            { this.state.patients.map(patient => <PatientCard key={patient.id} patient={patient} {...this.props}/>)}
            </>
        )
    }
}
