import React, { Component } from 'react'
import axios from 'axios'

const JobsContext = React.createContext()

export default class JobsProvider extends Component {
    constructor() {
        super()
        this.state = {
            users: [],
            leads: [],
            user: {},
            username: "",
            password: "",
            id: "",
            redirect: ""
        }
    }

    //loads the entire list of users into context when the site loads
    getUsers = () => {
        axios.get("/user")
            .then(res => {
                    this.setState({ users: res.data })
                })
            .catch(err => console.log(err.response.data.errMsg))
    }

    componentDidMount() {
        this.getUsers()
    }

    //login methods
    login = async () => {
        const usersWithName = this.state.users.filter(user => user.username === this.state.username)
        if(usersWithName.length >= 1) {
            for(let i = 0; i < usersWithName.length; i++) {
                if(usersWithName[i].password === this.state.password) {
                    await this.setState({
                        id: usersWithName[i]._id
                    })
                } 
            }
        }
        if(this.state.id === "" && usersWithName.length >= 1) {
            alert("password is incorrect")
        } else if(this.state.id === "") {
            alert("username not found")
        } else {
            axios.get(`/lead/${this.state.id}`)
                .then(res => {
                    this.setState({
                        leads: res.data,
                        redirect: "main"
                    })
                })
                .catch(err => console.log(err.response.data.errMsg))
        }
    }

    signup = async () => {
        const usersWithName = this.state.users.filter(user => user.username === this.state.username)
        if(usersWithName.length >= 1) {
            alert("username already exists")
        } else {
            await this.setState({
                user: {
                    username: this.state.username,
                    password: this.state.password
                }
            }) 
            axios.post("/user", this.state.user)
                .then (res => {
                    this.setState({
                        user: res.data
                    })
                }).catch(err => console.log(err.response.data.errMsg))
            this.setState({
                username: this.state.user.username,
                password: this.state.user.password,
                id: this.state.user._id,
                redirect: "main"
            })
        }
    }

    logout = () => {
        this.setState({
            leads: [],
            user: {},
            username: "",
            password: "",
            id: "",
            redirect: ""
        })
    }

    //form method
    handleChange = e => {
        const { name, value } = e.target
        this.setState({ [name]: value })
    }

    //lead methods
    addLead = () => {
        axios.post(`/lead/${this.state.id}`)
        .then(res => {
            this.setState(prevState => ({
                leads: [...prevState.leads, res.data]
            }))
        })
        .catch(err => console.log(err.response.data.errMsg))
    }

    getUserLeads = () => {
        axios.get(`/lead/${this.state.id}`)
        .then(res => {
            this.setState({
                leads: res.data
            })
        })
        .catch(err => console.log(err.response.data.errMsg))
    }

    deleteLead = id => {
        axios.delete(`/lead/${id}`)
        .then(res => {
            this.setState( prevState => ({
                leads: prevState.leads.filter(
                    lead => lead._id !== id
            )}))
        })
        .catch(err => console.log(err.response.data.errMsg))
    }

    editLead = (id, updates) => {
        axios.put(`/lead/${id}`, updates)
        .then(res => {
            this.setState( prevState => ({
                leads: prevState.leads.map(
                    lead => lead._id === id ? res.data : lead
                )}))
        })
        .catch(err => console.log(err.response.data.errMsg))
    }

render(){
    return(
        <JobsContext.Provider
            value={{
                ...this.state,
                signup: this.signup,
                login: this.login,
                logout: this.logout,
                handleChange: this.handleChange,
                addLead: this.addLead,
                getUserLeads: this.getUserLeads,
                deleteLead: this.deleteLead,
                editLead: this.editLead
            }}>
            { this.props.children }
        </JobsContext.Provider>
    )
}
}

//high-order component allows consumption of context without wrapping every component in tags
export const withJobs = C => props => (
<JobsContext.Consumer>
    { (value) =>  <C {...value} {...props}/> }
</JobsContext.Consumer>
)
