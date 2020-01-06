import React, { Component } from 'react'
import APIManager from '../modules/APIManager'


export default class PicklistItemCard extends Component {
    state = {
        item: {
            name: "",
            serialNum: ""
        },
        numberPicked: "",
        numberUsed: "",
        isPicked: false,
        isUsed: false,
        userType: JSON.parse(localStorage.getItem("credentials")).accountType

        
    }

    handleFieldChange = evt => {
        const stateToChange = {};
        stateToChange[evt.target.id] = evt.target.value;
        this.setState(stateToChange)
        this.setState({ changeOccurred: true })
    }

    componentDidMount() {
        APIManager.get(`items/${this.props.item.itemId}`)
            .then((item) => {
                this.setState({ item: item })})
        


    }

    handlePickClick = (evt) => {
        console.log("click")
        evt.preventDefault()
        if (this.state.isPicked) {
            this.setState({isPicked: false})
        } else {
            this.setState({isPicked: true})
            let number = ""
            if (this.state.numberPicked === "") {
                number= this.props.item.quantityToBePicked
            } else {
                 number= this.state.numberPicked
            }
        APIManager.patch("pickListItems", this.props.item.id, {quantityPicked : Number(number)})
        }
    }

    handleUseClick = (evt) => {
        evt.preventDefault()
        if (this.state.isUsed) {
            this.setState({isUsed: false})
        } else {
            this.setState({isUsed: true})
        let number = ""
        if (this.state.numberUsed === "") {
            number= this.props.item.quantityPicked
        } else {
             number= this.state.numberUsed
        }
    APIManager.patch("pickListItems", this.props.item.id, {quantityUsed : Number(number)})
    }}

    render() {
        return (
            <>
    <h2> Item Name: {this.state.item.name}</h2>
       
        { this.state.userType === "supply" ? this.state.isPicked  ? 
        <>
         <h4> Location Number: {this.state.item.serialNum}</h4>
         <h4>Status: {this.state.isPicked? "Picked" : "Not Picked" }</h4>

        <button id="isPicked" onClick={this.handlePickClick}>Change</button></>
    :
    <>
     <h4> Location Number: {this.state.item.serialNum}</h4>
     <h4>Number needed: {this.props.item.quantityToBePicked}</h4>
     <h4>Status: {this.state.isPicked? "Picked" : "Not Picked" }</h4>

    <label htmlFor="numberPicked"> Enter Number picked if not full amount:</label>
        <input id="numberPicked" type="text" onChange={this.handleFieldChange}/>

        <button id="isPicked" onClick={this.handlePickClick}>Place In Case</button></>
    
    : 
    this.state.isUsed ? 
    <>
    <h4>Number supplied: {this.props.item.quantityPicked}</h4>

        <button id="isUsed" onClick={this.handleUseClick}>Change</button></>
    : <>
    <h4>Number supplied: {this.props.item.quantityPicked}</h4>

    <label htmlFor="numberUsed"> Enter Number used if not full amount:</label>
        <input id="numberUsed" type="text" onChange={this.handleFieldChange}/>

        <button id="isUsed" onClick={this.handleUseClick}>Mark Used</button></>
    }
        
        </>
        )
    }
}

