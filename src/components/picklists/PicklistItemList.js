import React, { Component } from 'react'
import APIManager from '../modules/APIManager'
import PicklistItemCard from './PicklistItemCard'


export default class PicklistItemList extends Component {
    state = {
        items: []
    }

    componentDidMount() {
        APIManager.get(`pickListItems?pickListId=${this.props.match.params.pickListId}`)
            .then((items) => this.setState({ items: items }))
        


    }

    goBack = (evt) => {
        evt.preventDefault();
        this.props.history.push("/supply/picklists")
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
            </>
        )
    }
}

