import React, { Component } from 'react'
import APIManager from '../modules/APIManager'


export default class PicklistCard extends Component {
    state = {
        doctor: {},
        patient: {}
    }

    componentDidMount() {
        Promise.all([APIManager.get(`doctors/${this.props.list.surgery.doctorId}`)
            .then((doctor) => this.setState({ doctor: doctor })),
        APIManager.get(`patients/${this.props.list.surgery.patientId}`)
            .then((patient) => this.setState({ patient: patient }))])


    }


    pickThisList = (evt) => {
        evt.preventDefault();
        this.props.history.push(`/supply/${this.props.list.id}/picklist`)
    }

    render() {
        return (
            <>
                <div className="w3-card w3-round w3-border w3-margin">
                    <h2> Date: {this.props.list.surgery.date}</h2>
                    <h3> Doctor: {this.state.doctor.name}</h3>
                    <h3> Patient Name: {this.state.patient.fullName} </h3>
                    <h3> Surgery Type: {this.props.list.surgery.surgeryType}</h3>
                    <button className="w3-button-small w3-round w3-center" onClick={this.pickThisList} >Fulfill </button>
                </div>
            </>
        )
    }
}

