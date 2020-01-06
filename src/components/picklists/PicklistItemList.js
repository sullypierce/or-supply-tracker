import React, { Component } from 'react'
import APIManager from '../modules/APIManager'
import PicklistItemCard from './PicklistItemCard'


export default class PicklistItemList extends Component {
    state = {
        items: [],

        userType: JSON.parse(localStorage.getItem("credentials")).accountType
    }

    componentDidMount() {
        if (this.state.userType === "supply") {

            APIManager.get(`pickListItems?pickListId=${this.props.match.params.pickListId}`)
            .then((items) => this.setState({ items: items }))
        } else {
            APIManager.get(`pickLists?surgeryId=${this.props.match.params.surgeryId}`)
            .then((list) => 
            {
                APIManager.get(`pickListItems?pickListId=${list[0].id}`)
            .then((items) => {
                this.setState({ items: items })})})
            
        }
        


    }

    goBack = (evt) => {
        evt.preventDefault();
        if (this.state.userType === "supply") {
            this.props.history.push("/supply/picklists")

        } else {
            this.props.history.push("/surgery")

        }
    }
   
    handleClick = () => {
        if (this.state.userType === "supply") {
        APIManager.patch("pickLists", this.props.match.params.pickListId, {isPicked: true})
        .then(() => this.props.history.push("/supply/picklists"))
        } else {
            APIManager.patch("surgeries", this.props.match.param.surgeryId, {completed: true})
            .then(() => {
                this.props.history.push("/surgery")

            })
        }
    }

    render() {
        return (
            <>
            <button onClick={this.goBack}>Back to Lists</button>
                <div className="card">
                    {this.state.items.map((item) => {
                        return <PicklistItemCard key={item.id} item={item}/> 
                    })}
                
                </div>
                <button onClick={this.handleClick}>Finish</button>
            </>
        )
    }
}

