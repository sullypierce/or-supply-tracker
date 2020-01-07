import React, { Component } from 'react'
import APIManager from '../modules/APIManager'
import "bootstrap/dist/css/bootstrap.min.css"
import PreferenceItemCard from './PreferenceItemCard'


export default class PreferenceCardAddItem extends Component {
    state = {
        items: [],
        matchingItems:[]
    }

    componentDidMount() {
        APIManager.get("items")
        .then(items => this.setState({
            items: items,
            matchingItems: items
        }))
    }

    handleFieldChange = evt => {
        const stateToChange = {};
        stateToChange["matchingItems"] = this.state.items.filter((item) => item.name.includes(evt.target.value));
        this.setState(stateToChange)
    }
    
showPreferenceCards = (id) => {
    this.props.history.push(`/${id}/preferencecards`)
}

addToPreferenceCard = (itemId, amount) => {
    const newCard = {
            "itemId": itemId,
            "doctorId": Number(this.props.match.params.doctorId),
            "surgeryType": this.props.location.state.surgeryType,
            amount: amount
    }
APIManager.get(`preferenceCards?itemId=${itemId}&doctorId=${Number(this.props.match.params.doctorId)}`)
.then((result) => {
    if (result.length !== 0 ) {
        window.alert("This item is already on this doctor's preference card")
    }else {
        if (amount === "") {
            window.alert("You must enter a value for the amount.")
        } else {
            APIManager.post("preferenceCards", newCard)
    .then(() => {
        this.props.history.push(`/${this.props.match.params.doctorId}/preferencecards`)
    })
        }
        
    }
})
} 

    render() {
        return (
            <div className="w3-card w3-round">
            <input className="w3-input w3-border w3-margin w3-round" placeholder="Search Items" id="searchItem" onChange={this.handleFieldChange}/>
            { this.state.matchingItems.map(item => 
                <PreferenceItemCard key={item.id} itemId={item.id} addList={true} addToPreferenceCard={this.addToPreferenceCard}/>
            )}
            </div>
        )
    }
}
