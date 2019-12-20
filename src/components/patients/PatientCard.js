import React, { Component } from 'react'

export default class PatientCard extends Component {

handleUpdateClick = () => {
    this.props.history.push(`/patients/${this.props.patient.id}/edit`)
}

handleViewClick = () => {
    
}

    render() {
        return (
            <div className="card">
                <h3>Name: {this.props.patient.fullName}</h3>
        <p>Date Of Birth: {this.props.patient.dateOfBirth}</p>
        <button onClick={this.handleUpdateClick}>Update</button>
        {/* <button onClick={this.handleViewClick}>View Records</button> */}

            </div>
        )
    }
}
