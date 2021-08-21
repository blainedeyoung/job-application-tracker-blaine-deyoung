const express = require('express')
const leadRouter = express.Router()
const Lead = require('../models/lead.js')

// Post
leadRouter.post("/:_id", (req, res, next) => {
  const newLead = new Lead()
  newLead.user = req.params._id
  newLead.save((err, savedLead) => {
    if(err){
      res.status(500)
      return next(err)
    }
    return res.status(201).send(savedLead)
  })
})

// Get leads by requesting user
leadRouter.get("/:_id", (req, res, next) => {
  // Find the leads
  // that have .user that === the requesting.user's _id
  Lead.find({user: req.params._id}, (err, leads) => {
    if(err){
      res.status(500)
      return next(err)
    }
    return res.status(200).send(leads)
  })
})

// Edit lead
leadRouter.put("/:_id", (req, res, next) => {
  Lead.findOneAndUpdate({_id: req.params._id}, req.body,
    {new: true}, (err, updatedLead) => {
      if(err){
        res.status(500)
        return next(err)
      }
      return res.status(201).send(updatedLead)
    })
})

// Delete a lead belonging to logged in user
leadRouter.delete("/:_id", (req, res, next) => {
  Lead.findOneAndRemove(
    // find the lead with the req.params._id AND make sure it has the same user ._id as the user requesting removal
    {_id: req.params._id},
    (err, deletedLead) => {
      if(err){
        res.status(500)
        return next(err)
      }
      return res.status(200).send({msg: `The lead ${deletedLead._id} was deleted`, deletedLead: deletedLead})
    })
})

module.exports = leadRouter