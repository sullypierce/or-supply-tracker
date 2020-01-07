import React, { Component } from 'react'

export default class PatientCard extends Component {

handleUpdateClick = () => {
    this.props.history.push(`/patients/${this.props.patient.id}/edit`)
}

handleViewClick = () => {
    
}

    render() {
        return (
            <div className="w3-card w3-round w3-margin">
                <h3>Name: {this.props.patient.fullName}</h3>
        <p>Date Of Birth: {this.props.patient.dateOfBirth}</p>
        <button className="w3-button-small w3-round w3-border" onClick={this.handleUpdateClick}>Update</button>
        {/* <button onClick={this.handleViewClick}>View Records</button> */}

            </div>
        )
    }
}
