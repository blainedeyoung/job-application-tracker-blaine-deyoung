const mongoose = require('mongoose')
const Schema = mongoose.Schema

const leadSchema = new Schema({
	jobTitle: {
		type: String,
		default: ""
	},
	companyName: {
		type: String,
		default: ""
	},
	contact: {
		type: String,
		default: ""
	},
	phone: {
		type: String,
		default: ""
	},
	email: {
		type: String,
		default: ""
	},
	website: {
		type: String,
		default: ""
	},
	source: {
		type: String,
		default: ""
	},
	notes: {
		type: String,
		default: ""
	},
	applicationDate: {
		type: String,
		default: ""
	},
	callbackDate: {
		type: String,
		default: ""
	},
	interviewDate: {
		type: String,
		default: ""
	},
	offerDetails: {
		type: String,
		default: ""
	},
	user: {
		type: String,
		required: true,
		default: ""
	}
})

module.exports = mongoose.model("Lead", leadSchema)