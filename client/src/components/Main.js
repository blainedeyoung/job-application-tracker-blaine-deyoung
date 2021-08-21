//this is the main screen where all the user's leads are displayed

import React from 'react'
import '../styles.css'
import { withJobs } from '../context/JobsProvider.js'
import { Redirect } from 'react-router-dom'
import Navbar from './Navbar.js'
import Lead from './Lead.js'

const Main = props => {

    //filter statements divide the leads up into categories based on which fields have been filled out
    const firstColLeads = props.leads.filter(lead => lead.applicationDate === "" && lead.callbackDate === "" 
        && lead.interviewDate === "" && lead.offerDetails === "").map(lead => {
        return (<Lead key={lead._id} {...lead} />)
    })

    const secondColLeads = props.leads.filter(lead => lead.applicationDate !== "" && lead.callbackDate === "").map(lead => {
        return (<Lead key={lead._id} {...lead} />)
    })

    const thirdColLeads = props.leads.filter(lead => lead.callbackDate !== "" && lead.interviewDate === "").map(lead => {
        return (<Lead key={lead._id} {...lead} />)
    })

    const fourthColLeads = props.leads.filter(lead => lead.interviewDate !== "" && lead.offerDetails === "").map(lead => {
        return (<Lead key={lead._id} {...lead} />)
    })

    const fifthColLeads = props.leads.filter(lead => lead.offerDetails !== "").map(lead => {
        return (<Lead key={lead._id} {...lead} />)
    })

    return (
        //displays the main screen if the user is logged in
        props.redirect === "main" ?
        
        <div className="mainScreenContainer">
        <Navbar />
        <div className="leadsArea">
            <div className="leadColumn">
                {firstColLeads}
            </div>
            <div className="leadColumn">
                {secondColLeads}
            </div>
            <div className="leadColumn">
                {thirdColLeads}
            </div>
            <div className="leadColumn">
                {fourthColLeads}
            </div>
            <div className="leadColumn">
                {fifthColLeads}
            </div>
        </div>
     </div>
     
         :

        <Redirect to="/" />
    )
}

export default withJobs(Main)



