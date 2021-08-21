const express = require('express')
const app = express()
require('dotenv').config()
const morgan = require('morgan')
const mongoose = require("mongoose")
const PORT = process.env.PORT || 8000
const path = require("path")

// Middlewares for every request
app.use(express.json())
app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, "client", "build")))

// DB connection
mongoose.connect( process.env.MONGODB_URI ||
	"mongodb://localhost:27017/bd-job-application-tracker",
	{
		useNewUrlParser:  true,
		useUnifiedTopology: true,
		useFindAndModify: false,
		useCreateIndex:   true
	},
	() => console.log("Connected to the DB")
)

// Routes
app.use("/user", require('./routes/userRouter.js'))
app.use("/lead", require('./routes/leadRouter.js'))

// Global server err handler
app.use((err, req, res, next) => {
	console.error(err)
	if(err.name === "UnauthorizedError"){
		res.status(err.status)
	}
	return res.send({errMsg: err.message})
})

// Server Setup
app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "client", "build", "index.html"))
})
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))