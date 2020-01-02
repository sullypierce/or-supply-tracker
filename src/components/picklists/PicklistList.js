import React, { Component } from 'react'
import APIManager from '../modules/APIManager'
import PicklistCard from './PicklistCard'


export default class PicklistList extends Component {
    state = {
        pickLists: []
    }

componentDidMount() {
    APIManager.get(`pickLists?_expand=surgery`)
    .then(pickLists => this.setState( {pickLists: pickLists}))
}

    
    render() {
        return (
           <>
           {this.state.pickLists.map((list) => {
           return <PicklistCard key={list.id} list={list} {...this.props}/>
        }
           )}
           </>
        )
    }
}

