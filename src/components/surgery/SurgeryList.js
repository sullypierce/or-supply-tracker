import React, { Component } from 'react'
import SurgeryCard from '../surgery/SurgeryCard'
import APIManager from '../modules/APIManager'
import "bootstrap/dist/css/bootstrap.min.css"


export default class SurgeryList extends Component {
    state = {
        surgeries: [],
        userId: JSON.parse(localStorage.getItem("credentials")).userId,
        userType: JSON.parse(localStorage.getItem("credentials")).accountType

    }

    componentDidMount() {
        if (this.state.userType === "admin") {
            APIManager.get(`surgeries?userId=${this.state.userId}&_expand=patient&_expand=doctor`)
            .then(surgeries => this.setState({
                surgeries: surgeries
            }))
        } else {
            APIManager.get(`surgeries?_expand=patient&_expand=doctor&_embed=pickLists`)
        .then(surgeries => {
            let pickedSurgeries = surgeries.filter((surgery) => surgery.pickLists[0].isPicked)
            let unfinishedSurgeries = pickedSurgeries.filter((surgery) => !surgery.completed);
            this.setState({
            surgeries: unfinishedSurgeries
        })})
        }
        
    }
    
handleClick = () => {
    this.props.history.push("/surgery/schedule")
}

    render() {
        return (
            <>
            {this.state.userType === "admin" ? <button className="w3-button w3-card w3-border w3-round" onClick={this.handleClick}>
                Schedule Surgery
            </button>: null}
            <h2 className="w3-panel w3-blue-gray title">Scheduled Surgeries:</h2>
            { this.state.surgeries.map(surgery => <SurgeryCard key={surgery.id} surgery={surgery} {...this.props}/>)}
            </>
        )
    }
}
