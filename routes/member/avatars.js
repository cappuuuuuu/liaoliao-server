const express = require('express')
const router = express.Router()
const AvatarModel = require('@root/models/avatar')

router.get('/avatar', async (req, res, next) => {
  const avatar = await AvatarModel.find()
  res.send(avatar)
})

module.exports = router
