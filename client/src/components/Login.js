import React from 'react'
import '../styles.css'
import { withJobs } from '../context/JobsProvider.js'
import { Redirect } from 'react-router-dom'

const Login = props => {

    return(

        props.redirect === "" ?

        <div className="loginScreen">
            <h1 className="title">Job Application Tracker</h1>
            <div>
                <input className="formInputs" placeholder="username" name="username" onChange={props.handleChange}></input>
                <input className="formInputs" placeholder="password" name="password" onChange={props.handleChange}></input>
            </div>
            <div>
                <button className="formButtons" onClick={props.login}>login</button>
                or
                <button className="formButtons" onClick={props.signup}>signup</button>
            </div>
        </div>

        : 

        <Redirect to={"/main"} />

    )
}

export default withJobs(Login)