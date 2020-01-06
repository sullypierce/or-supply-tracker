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
            APIManager.get(`surgeries?_expand=patient&_expand=doctor`)
        .then(surgeries => this.setState({
            surgeries: surgeries.filter((surgery) => !surgery.completed)
        }))
        }
        
    }
    
handleClick = () => {
    this.props.history.push("/surgery/schedule")
}

    render() {
        return (
            <>
            {this.state.userType === "admin" ? <button className="btn" onClick={this.handleClick}>
                Schedule Surgery
            </button>: null}
            <h2>Scheduled Surgeries:</h2>
            { this.state.surgeries.map(surgery => <SurgeryCard key={surgery.id} surgery={surgery} {...this.props}/>)}
            </>
        )
    }
}
