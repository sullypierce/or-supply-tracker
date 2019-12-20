import React, { Component } from 'react'

export default class SurgeryCard extends Component {

handleUpdateClick = () => {
    this.props.history.push(`/surgery/${this.props.surgery.id}/update`)
}

handleViewClick = () => {
    
}

    render() {
        return (
            <div className="card">
                <h3>Patient Name: {this.props.surgery.patient.fullName}</h3>
        <p>Doctor: {this.props.surgery.doctor.name}</p>
        <p>Scheduled Date: {this.props.surgery.date}</p>
        <p>Scheduled Time: {this.props.surgery.time}</p>
        <p>Surgery Type: {this.props.surgery.surgeryType}</p>
        <p>Operating Room: {this.props.surgery.orRoomNumber}</p>

        <button onClick={this.handleUpdateClick}>Update</button>
        {/* <button onClick={this.handleViewClick}>View Records</button> */}

            </div>
        )
    }
}
