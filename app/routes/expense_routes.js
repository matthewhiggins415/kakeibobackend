const express = require('express')
const router = express.Router()

const passport = require('passport')
const requireToken = passport.authenticate('bearer', { session: false })

const errors = require('../../lib/custom_errors')
const BadParamsError = errors.BadParamsError
const BadCredentialsError = errors.BadCredentialsError

const User = require('../models/user.js')
const Expense = require('../models/expense.js')

// create an expense 
router.post('/expense', requireToken, (req, res, next) => {
    let userID = req.user.id
    let expense = req.body.expense
    expense.owner = userID

    Expense.create(expense)
      .then(expense => {
        res.json({ expense })
      })
      .catch(next)
})


// read all expenses 
router.get('/expenses', requireToken, (req, res, next) => {
    let userID = req.user.id
    Expense.find({ 'owner': userID })
      .populate('owner')
      .then(expenses => {
        res.json({ expenses })
      })
})

// read a single expense 
router.get('/expense/:id', requireToken, (req, res, next) => {
    let id = req.params.id
    Expense.findById(id)
      .then(expense => {
        res.json({ expense })
      })
      .catch(next)
})

// edit an expense 
router.patch('/expense/:id', requireToken, (req, res, next) => {
    let id = req.params.id
    let data = req.body.expense
    Expense.findById(id) 
      .then(expense => {
        expense.set(data)
        return expense.save()
      })
      .then(expense => {
        res.json({ expense })
      })
      .catch(next)
})

// delete an expense 
router.delete('/expense/:id', requireToken, (req, res, next) => {
    let id = req.params.id
    Expense.findById(id)
      .then(expense => {
        expense.deleteOne()
      })
      .then(() => res.sendStatus(204))
      .catch(next)
})

// delete all expenses 
router.delete('/expenses', requireToken, (req, res, next) => {
  let userID = req.user.id
  Expense.deleteMany({ owner: userID })
  .then(() => res.sendStatus(204))
  .catch(next)
})


module.exports = router 
