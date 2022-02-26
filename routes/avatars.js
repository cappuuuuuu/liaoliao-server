const express = require('express')
const router = express.Router()
const AvatarsModel = require('../models/avatars')

router.get('/', async (req, res, next) => {
  // const avatars = await AvatarsModel.find()
  // const q = new Error('aaa')
  // res.send(avatars)
  next(new Error('XDDD'))
})

module.exports = router
