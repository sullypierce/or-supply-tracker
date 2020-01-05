import React, { Component } from 'react'
import APIManager from '../modules/APIManager'


export default class PicklistItemCard extends Component {
    state = {
        item: {}
    }

    componentDidMount() {
        APIManager.get(`items?id=${this.props.item.itemId}`)
            .then((item) => this.setState({ item: item[0] }))
        


    }

   
   

    render() {
        return (
            <>
    <h2> Item Name: {this.state.item.name}</h2>
        <h3> Location Number: {this.state.item.serialNum}</h3>
        <label htmlFor="isPicked">Picked</label>
        <input id="isPicked" type="checkbox" />
        <label htmlFor="numberPicked"> Enter Number picked if not full amount:</label>
        <input id="numberPicked" type="text" />
            </>
        )
    }
}

