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
        if (this.state.fullName !== "" && this.state.dateOfBirth !== ""){
        APIManager.post("patients", newPatient)
        .then(() => {this.props.history.push("/patients")})
        } else {
            window.alert("You must fill in every field.")
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
                <form className="w3-container w3-border w3-margin w3-round" onSubmit={
                    this.props.isNew ?
                    this.createUser
                    : this.updateUser}>
                    <fieldset>
                        {!this.props.isNew ? <legend>Edit Patient Data</legend>
                        : <legend>Add New Patient</legend>}
                        <input type="text" placeholder="Full Name" className=" w3-border w3-round w3-input center-50 w3-center" id="fullName" onChange={this.handleFieldChange} value={this.state.fullName}/>
                        <label htmlFor="dateOfBirth">Date Of Birth</label>
                        <input className="w3-border w3-round w3-input center-50 w3-center" type="date" id="dateOfBirth" onChange={this.handleFieldChange} value={this.state.dateOfBirth}/>
                        
                    <button disabled={this.state.loadingStatus}>Save</button>
                    </fieldset>
                </form>
            </>
        )
    }
}
