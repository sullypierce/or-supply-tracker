import React, { Component } from 'react'

export default class SurgeryCard extends Component {
    state = {
        userType: JSON.parse(localStorage.getItem("credentials")).accountType
    }

handleUpdateClick = () => {
    this.props.history.push(`/surgery/${this.props.surgery.id}/update`)
}

handleRecordClick = () => {
    this.props.history.push(`/surgery/${this.props.surgery.id}/record`)
}

handleViewClick = () => {
    
}

    render() {
        return (
            <div className="w3-card w3-round w3-margin">
                <h3>Patient Name: {this.props.surgery.patient.fullName}</h3>
        <p>Doctor: {this.props.surgery.doctor.name}</p>
        <p>Scheduled Date: {this.props.surgery.date}</p>
        <p>Scheduled Time: {this.props.surgery.time}</p>
        <p>Surgery Type: {this.props.surgery.surgeryType}</p>
        <p>Operating Room: {this.props.surgery.orRoomNumber}</p>
            {this.state.userType === "admin" ? 
            <button onClick={this.handleUpdateClick}>Update</button>
            : 
            <button onClick={this.handleRecordClick}> Keep Record</button>
        }
        

            </div>
        )
    }
}
