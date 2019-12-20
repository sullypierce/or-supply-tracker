import React, { Component } from 'react'
import APIManager from '../modules/APIManager'

export default class PreferenceItemCard extends Component {


    state = {
        item: {},
        amount: ""
    }

    handleFieldChange = evt => {
        const stateToChange = {};
        stateToChange[evt.target.id] = evt.target.value;
        this.setState(stateToChange)
        this.setState({ changeOccurred: true })
    }

    componentDidMount() {
        APIManager.get(`items/${this.props.itemId}`)
            .then((item) => this.setState({ item: item }))
    }



    render() {

        return (
            <div className="card">
                <h3>Item Name: {this.state.item.name}</h3>
                <p>Serial Number: {this.state.item.serialNum}</p>
                {this.props.addList ? <input onChange={this.handleFieldChange} id="amount" type="text" />
                : <p>Amount: {this.props.amount}</p>}
                
                {this.props.addList ? <button onClick={() => this.props.addToPreferenceCard(this.state.item.id, this.state.amount)}>Add</button>
                : <button onClick={() => this.props.deletePreferenceCardItem(this.props.cardId)}>Remove</button>}
                
                {/* <button onClick={this.handleViewClick}>View Records</button> */}

            </div>
        )
    }
}