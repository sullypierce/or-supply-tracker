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
            <label htmlFor="searchName">Search</label>
            <input id="searchName" onChange={this.handleFieldChange}/>
            { this.state.matchingDoctors.map(doctor => <div key={doctor.id}>
            <p>Name: {doctor.name}</p>
            <button onClick={() => {
                this.showPreferenceCards(doctor.id)
            }}>View Preference Cards</button>
            </div>)}
            </>
        )
    }
}
