const router = require('express').Router()
// const jwt = require('jsonwebtoken')
// const AdminAuthModel = require('../models/adminAuth')
const authToken = require('../middleware/authToken')

router.get('/', authToken, async (req, res) => {
  return res.send('auth success')
})

module.exports = router
