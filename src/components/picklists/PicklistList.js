import React, { Component } from 'react'
import APIManager from '../modules/APIManager'
import PicklistCard from './PicklistCard'


export default class PicklistList extends Component {
    state = {
        pickLists: [],
        userType: JSON.parse(localStorage.getItem("credentials")).accountType

    }

componentDidMount() {
    
    APIManager.get(`pickLists?isPicked=false&_expand=surgery`)
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

