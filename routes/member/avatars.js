const express = require('express')
const router = express.Router()
const AvatarsModel = require('../../models/avatars')

router.get('/avatars', async (req, res, next) => {
  const avatars = await AvatarsModel.find()
  res.send(avatars)
})

module.exports = router
