const mongoose = require('mongoose')
const Schema = mongoose.Schema

// User Model Setup
const userSchema = new Schema({
	username: {
		type: String,
		unique: true,
		required: true,
		lowercase: true
	},
	password: {
		type: String,
		required: true
	}

})

module.exports = mongoose.model("User", userSchema)