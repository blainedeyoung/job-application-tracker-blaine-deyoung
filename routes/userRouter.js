const express = require('express')
const userRouter = express.Router()
const User = require('../models/user.js')

// GET ALL - with async - await
userRouter.get("/", async (req, res, next) => {
  try {
      const users = await User.find()
      return res.status(200).send(users)
  }
  catch(err){
      res.status(500)
      return next(err)
  }
})

// POST One
userRouter.post("/", (req, res, next) => {
  const newUser = new User(req.body)
  newUser.save((err, newSavedUser) => {
      if(err){
          res.status(500)
          return next(err)
      }
      return res.status(201).send(newSavedUser)
  })
})  


module.exports = userRouter