//this is the actual lead itself with all the model fields in state

import React, { Component } from 'react'
import '../styles.css'
import { withJobs } from '../context/JobsProvider.js'

class Lead extends Component {
    constructor(props) {
        super()
        this.state = {
            jobTitle: props.jobTitle,
            companyName: props.companyName,
            contact: props.contact,
            phone: props.phone,
            email: props.email,
            website: props.website,
            source: props.source,
            notes: props.notes,
            applicationDate: props.applicationDate,
            callbackDate: props.callbackDate,
            interviewDate: props.interviewDate,
            offerDetails: props.offerDetails,
            user: props.user,
            id: props._id,
            expand: false
        }
    }

    //determines which information is most important to display by looking at which fields have been filled out
    findDisplay = () => {
        if (this.state.jobTitle === "" && this.state.applicationDate === "") { 
           return (             <div>
                                    <h2 className="readoutLine" id="newEntry">New Entry</h2>
                                    <h3 className="readoutLine">Click me!</h3>
                                </div> )
        } else if (this.state.callbackDate === "" && this.state.applicationDate === "") {
            return (            <div>
                                    <h3 className="readoutLine">{this.state.jobTitle}</h3>
                                    <h3 className="readoutLine">{this.state.companyName}</h3>
                                </div> ) 
        } else if (this.state.applicationDate !== "" && this.state.callbackDate === "") {
            return (            <div>
                                    <h3 className="readoutLine">{this.state.jobTitle}</h3>
                                    <h3 className="readoutLine">{this.state.companyName}</h3>
                                    <h3 className="readoutLine">applied {this.state.applicationDate}</h3>
                                </div> ) 
        } else if (this.state.callbackDate !== "" && this.state.interviewDate === "") {
            return (            <div>
                                    <h3 className="readoutLine">{this.state.jobTitle}</h3>
                                    <h3 className="readoutLine">{this.state.companyName}</h3>
                                    <h3 className="readoutLine">called {this.state.callbackDate}</h3>
                                </div> )
        } else if (this.state.interviewDate !== "" && this.state.offerDetails === "") {
            return (            <div>
                                    <h3 className="readoutLine">{this.state.jobTitle}</h3>
                                    <h3 className="readoutLine">{this.state.companyName}</h3>
                                    <h3 className="readoutLine">interview {this.state.interviewDate}</h3>
                                </div> )
        } else if (this.state.offerDetails !== "") {
            return (            <div>
                                    <h3 className="readoutLine">{this.state.jobTitle}</h3>
                                    <h3 className="readoutLine">{this.state.companyName}</h3>
                                    <h3 className="readoutLine">{this.state.offerDetails}</h3>
                                </div> )
        }
    }

    //displays all the information about the lead when expanded
    toggleExpand = () => {
        this.setState(prevState => ({
            expand: !prevState.expand
        }))
    }

    handleFormChange = e => {
        const { name, value } = e.target
        this.setState({ [name]: value })
    }

    //updates the lead in the database
    makeUpdates = () => {
        const updates = {
            jobTitle: this.state.jobTitle,
            companyName: this.state.companyName,
            contact: this.state.contact,
            phone: this.state.phone,
            email: this.state.email,
            website: this.state.website,
            source: this.state.source,
            notes: this.state.notes,
            applicationDate: this.state.applicationDate,
            callbackDate: this.state.callbackDate,
            interviewDate: this.state.interviewDate,
            offerDetails: this.state.offerDetails,
            user: this.state.user
        }
        this.props.editLead(this.state.id, updates)
        this.toggleExpand()
    }

    render() {
        //do I ever wish I could have destructured this at the top
        const { jobTitle, companyName, contact, phone, email, website, source, notes, applicationDate, callbackDate, interviewDate, offerDetails } = this.state

        return(
            //only shows the most important information unless expanded
            this.state.expand === false ?

                <div className="leadBody" onClick={ () => this.toggleExpand() }>
                      { this.findDisplay() }
                </div>

            :

                <div className="leadBody expandedLeadBody">
                    <input className="formInputs" name="jobTitle" value={ jobTitle } placeholder="job title" onChange={ this.handleFormChange }/>
                    <input className="formInputs" name="companyName" value={ companyName } placeholder="company name" onChange={ this.handleFormChange }/>
                    <input className="formInputs" name="contact" value={ contact } placeholder="contact" onChange={ this.handleFormChange }/>
                    <input className="formInputs" name="phone" value={ phone } placeholder="phone" onChange={ this.handleFormChange }/>
                    <input className="formInputs" name="email" value={ email } placeholder="email" onChange={ this.handleFormChange }/>
                    <input className="formInputs" name="website" value={ website } placeholder="website" onChange={ this.handleFormChange }/>
                    <input className="formInputs" name="source" value={ source } placeholder="source" onChange={ this.handleFormChange }/>
                    <textarea className="formInputs" name="notes" value={ notes } placeholder="notes" onChange={ this.handleFormChange }/>
                    <input className="formInputs" name="applicationDate" value={ applicationDate } placeholder="applicationDate" onChange={ this.handleFormChange }/>
                    <input className="formInputs" name="callbackDate" value={ callbackDate } placeholder="callbackDate" onChange={ this.handleFormChange }/>
                    <input className="formInputs" name="interviewDate" value={ interviewDate } placeholder="interviewDate" onChange={ this.handleFormChange }/>
                    <textarea className="formInputs" name="offerDetails" value={ offerDetails } placeholder="offerDetails" onChange={ this.handleFormChange }/>
                    <div>
                        <button className="leadButtons" onClick={ () => this.props.deleteLead(this.state.id) }>Delete</button>
                        <button className="leadButtons" onClick={ () => this.toggleExpand() }>Collapse</button>
                        <button className="leadButtons"  onClick={ () => this.makeUpdates() }>Save</button>
                    </div>
                </div>

        )
    }
}

export default withJobs(Lead)