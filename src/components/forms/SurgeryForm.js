import React, { Component } from 'react'
import APIManager from '../modules/APIManager'

export default class SurgeryForm extends Component {
    state = {
        patients: [],
        doctors: [],
        patientId: 1,
        doctorId: 1,
        orRoomNumber: "",
        surgeryType: "",
        date: "",
        time: "",
        userId: JSON.parse(localStorage.getItem("credentials")).userId,
        loadingstatus: true,
        changeOccurred: false
    }

    handleFieldChange = evt => {
        const stateToChange = {};
        stateToChange[evt.target.id] = evt.target.value;
        this.setState(stateToChange)
        this.setState({ changeOccurred: true })
    }

    componentDidMount() {
        APIManager.get("doctors")
            .then((doctors => this.setState({
                doctors: doctors
            })))
            .then(() => {
                return APIManager.get("patients")
            })
            .then(patients => {
                this.setState({
                    patients: patients
                })
                if (!this.props.isNew) {
                    APIManager.get(`surgeries/${this.props.match.params.surgeryId}?_expand=patient&_expand=doctor`)
                        .then(surgery => {
                            this.setState({
                                patientId: Number(surgery.patient.id),
                                doctorId: Number(surgery.doctor.id),
                                orRoomNumber: surgery.orRoomNumber,
                                surgeryType: surgery.surgeryType,
                                date: surgery.date,
                                time: surgery.time,
                                loadingstatus: false
                            })
                        })
                } else {
                    this.setState({
                        loadingstatus: false
                    })
                }
            })
    }

    createNewPickList = (surgeryId) => {
        const newPickList = {
            isPicked: false,
            surgeryId: surgeryId
        }
        APIManager.post("pickLists", newPickList)
            .then((newList) => {
                APIManager.get(`preferenceCards?doctorId=${this.state.doctorId}`)
                    .then((preferenceCardItems) => {
                        preferenceCardItems.map((item) => {
                            const newPickItem = {
                                "itemId": item.id,
                                "quantityToBePicked": Number(item.amount),
                                "quantityPicked": "",
                                "quantityUsed": "",
                                "pickListId": newList.id
                            }
                            APIManager.post("pickListItems", newPickItem)
                        })
                    })
            })
    }

    handleFormSubmit = (evt) => {
        evt.preventDefault()
        const surgery = {
            patientId: this.state.patientId,
            doctorId: this.state.doctorId,
            orRoomNumber: this.state.orRoomNumber,
            surgeryType: this.state.surgeryType,
            date: this.state.date,
            time: this.state.time,
            userId: this.state.userId,
        }
        console.log(surgery)
        if (this.props.isNew) {

            APIManager.post("surgeries", surgery)
                .then((results) => {
                    this.props.history.push("/surgery")
                    this.createNewPickList(results.id)
                })
        } else {
            APIManager.patch("surgeries", this.props.match.params.surgeryId, surgery)
                .then(() => {
                    this.props.history.push("/surgery")
                    this.createNewPickList(this.props.match.params.surgeryId)
                })
        }

    }

    render() {
        return (
            <>
                <fieldset >
                    <label htmlFor="patientId">Patient</label>
                    <select id="patientId" onChange={this.handleFieldChange} value={this.state.patientId}>
                        {this.state.patients.map((patient) => {
                            return <option key={patient.id} value={patient.id}>{patient.fullName}, {patient.dateOfBirth}</option>
                        })}
                    </select>
                    <label htmlFor="doctorId">Doctor</label>
                    <select id="doctorId" onChange={this.handleFieldChange} value={this.state.doctorId}>
                        {this.state.doctors.map((doctor) => {
                            return <option key={doctor.id} value={doctor.id}>{doctor.name}</option>
                        })}
                    </select>
                    <label htmlFor="date" >Date</label>
                    <input type="date" id="date" onChange={this.handleFieldChange} value={this.state.date} />
                    <label htmlFor="time" >Time</label>
                    <input type="time" id="time" onChange={this.handleFieldChange} value={this.state.time} />
                    <label htmlFor="orRoomNumber"> Operating Room Number</label>
                    <input type="text" id="orRoomNumber" value={this.state.orRoomNumber} onChange={this.handleFieldChange} />
                    <label htmlFor="surgeryType">Surgery Type</label>
                    <input type="text" id="surgeryType" value={this.state.surgeryType} onChange={this.handleFieldChange} />
                    {this.props.isNew ? <button onClick={this.handleFormSubmit}>Schedule</button>
                        : <button onClick={this.handleFormSubmit}>Update</button>}

                </fieldset>
            </>
        )
    }
}
