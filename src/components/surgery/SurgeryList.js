import React, { Component } from 'react'
import SurgeryCard from '../surgery/SurgeryCard'
import APIManager from '../modules/APIManager'
import "bootstrap/dist/css/bootstrap.min.css"


export default class SurgeryList extends Component {
    state = {
        surgeries: []
    }

    componentDidMount() {
        APIManager.get("surgeries?_expand=patient&_expand=doctor")
        .then(surgeries => this.setState({
            surgeries: surgeries
        }))
    }
    
handleClick = () => {
    this.props.history.push("/surgery/schedule")
}

    render() {
        return (
            <>
            <button className="btn" onClick={this.handleClick}>
                Schedule Surgery
            </button>
            <h2>Scheduled Surgeries:</h2>
            { this.state.surgeries.map(surgery => <SurgeryCard key={surgery.id} surgery={surgery} {...this.props}/>)}
            </>
        )
    }
}
