import React, { Component } from 'react'
import APIManager from '../modules/APIManager'
import PicklistCard from './PicklistCard'
import '../nav/NavBar.css'


export default class PicklistList extends Component {
    state = {
        pickLists: [],
        userType: JSON.parse(localStorage.getItem("credentials")).accountType

    }

componentDidMount() {

    APIManager.get(`pickLists?_expand=surgery`)
    .then(pickLists => {
        let filteredLists = pickLists.filter((list) => list.isPicked===false)
        this.setState( {pickLists: filteredLists})})
}


    
    render() {
        return (
           <>
           <h3 className="w3-panel w3-text-white w3-blue-grey title">Picklists to Fulfill</h3>
           {this.state.pickLists.map((list) => {
           return <PicklistCard key={list.id} list={list} {...this.props}/>
        }
           )}
          
           </>
        )
    }
}

