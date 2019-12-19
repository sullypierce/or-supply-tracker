import React, { Component } from 'react'
import APIManager from '../modules/APIManager';

export default class PatientForm extends Component {
    state = {
        fullName: "",
        dateOfBirth: "",
        userId: 1,
        loadingStatus: this.props.loadingStatus,
        changeOccurred: false
    }

    handleFieldChange = evt => {
        const stateToChange = {};
        stateToChange[evt.target.id] = evt.target.value;
        this.setState(stateToChange)
        this.setState({changeOccurred: true})
    }

    createUser = (evt) => {
        evt.preventDefault()
        const newPatient = {
            fullName: this.state.fullName,
            dateOfBirth: this.state.dateOfBirth,
            userId: this.state.userId
        }
        if (this.state.username !== "" || this.state.dateOfBirth !== ""){
        APIManager.post("patients", newPatient)
        .then(() => {this.props.history.push("/patients")})
        } else {
            Window.alert("You must fill in every field.")
        }

    }

    updateUser = (evt) => {
        evt.preventDefault()
        const updatedPatient = {
            fullName: this.state.fullName,
            dateOfBirth: this.state.dateOfBirth,
            userId: this.state.userId
        }
        APIManager.patch("patients", this.props.match.params.patientId, updatedPatient)
        .then(() => {this.props.history.push("/patients")})
    }
    

    componentDidMount() {
        if (!this.props.isNew) {
            APIManager.get(`patients/${this.props.match.params.patientId}`)
                .then(patient => {
                    this.setState({
                        fullName: patient.fullName,
                        dateOfBirth: patient.dateOfBirth,
                        userId: patient.userId,
                        loadingStatus: false,
                    });
                });
        }
    }

    render() {


        return (
            <>
                <form onSubmit={
                    this.props.isNew ?
                    this.createUser
                    : this.updateUser}>
                    <fieldset>
                        <legend>Add New Patient</legend>
                        <label htmlFor="fullName">Full Name</label>
                        <input type="text" id="fullName" onChange={this.handleFieldChange} value={this.state.fullName}/>
                        <label htmlFor="dateOfBirth">Date Of Birth</label>
                        <input type="date" id="dateOfBirth" onChange={this.handleFieldChange} value={this.state.dateOfBirth}/>
                        
                    <button disabled={this.state.loadingStatus}>Save</button>
                    </fieldset>
                </form>
            </>
        )
    }
}
