import React from 'react'
import '../styles.css'
import { withJobs } from '../context/JobsProvider.js'
import { Redirect } from 'react-router-dom'

const Navbar = (props) => {
    return (

        props.redirect === "main" ?

            <div className="navbar">
                <h2>Welcome, {props.username}</h2>
                <button className="formButtons logOutButton" onClick={ () => props.logout()}>Logout</button>
                <button className="formButtons newLeadButton" onClick={ () => props.addLead()}>New Lead</button>
            </div>

        :

            <Redirect to="/" />
    )
}

export default withJobs(Navbar)