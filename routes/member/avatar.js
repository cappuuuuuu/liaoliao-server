const express = require('express')
const router = express.Router()
const AvatarModel = require('@models/avatar')
const response = require('@utils/response')

router.get('/avatar', async (_, res, next) => {
  const avatar = await AvatarModel.find()
  return res.json(response.success({ data: avatar }))
})

module.exports = router
