import React, { Component } from 'react'
import APIManager from '../modules/APIManager'
import "bootstrap/dist/css/bootstrap.min.css"


export default class PreferenceCardDoctorList extends Component {
    state = {
        doctors: [],
        matchingDoctors:[]
    }

    componentDidMount() {
        APIManager.get("doctors")
        .then(doctors => this.setState({
            doctors: doctors,
            matchingDoctors: doctors
        }))
    }

    handleFieldChange = evt => {
        const stateToChange = {};
        stateToChange["matchingDoctors"] = this.state.doctors.filter((doctor) => doctor.name.includes(evt.target.value));
        this.setState(stateToChange)
    }
    
showPreferenceCards = (id) => {
    this.props.history.push(`/${id}/preferencecards`)
}

    render() {
        return (
            <>
            <input className="w3-input w3-margin w3-border w3-round" id="searchName" placeholder="Search Doctors" onChange={this.handleFieldChange}/>
            { this.state.matchingDoctors.map(doctor => <div  className="w3-card w3-round w3-margin"  key={doctor.id}>
            <p>Name: {doctor.name}</p>
            <button className="w3-button-small w3-border w3-round" onClick={() => {
                this.showPreferenceCards(doctor.id)
            }}>View Preference Cards</button>
            </div>)}
            </>
        )
    }
}
