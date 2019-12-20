import React, { Component } from 'react'
import APIManager from '../modules/APIManager'
import "bootstrap/dist/css/bootstrap.min.css"
import PreferenceItemCard from './PreferenceItemCard'


export default class PreferenceCardList extends Component {
    state = {
        items: [],
        preferenceCards: []
    }

    componentDidMount() {
        APIManager.get(`preferenceCards?doctorId=${this.props.match.params.doctorId}`)
            .then(preferenceCards => this.setState({
                preferenceCards: preferenceCards
            }))
            .then(() => {
                const newItemList = []
                Promise.all(
                    this.state.preferenceCards.map(card => APIManager.get(`items/${card.itemId}`).then(item => newItemList.push(item))))

                    .then(() => {
                        this.setState({ items: newItemList })
                    })
            })
    }

    handleClick = () => {
        this.props.history.push("/patients/add")
    }

    deletePreferenceCardItem = (id) => {
        APIManager.delete("preferenceCards", id)
            .then(() =>
                APIManager.get(`preferenceCards?doctorId=${this.props.match.params.doctorId}`)
                    .then((cards) => {
                        this.setState({
                            preferenceCards: cards
                        })
                    })
            )
    }

    addItemPush = () => {
        console.log(this.state.preferenceCards[0].surgeryType)
        this.props.history.push(
           { pathname: `/${this.props.match.params.doctorId}/preferencecards/additem`, state: {
            surgeryType: this.state.preferenceCards[0].surgeryType
        }})
    }

    render() {
        return (
            <>
                <button onClick={this.addItemPush}>Add Item</button>
                <h2>Items:</h2>
                {this.state.preferenceCards.map(card => {
                    return <PreferenceItemCard key={card.id} itemId={card.itemId} cardId={card.id} amount={card.amount} deletePreferenceCardItem={this.deletePreferenceCardItem} />
                })}
            </>
        )
    }
}
