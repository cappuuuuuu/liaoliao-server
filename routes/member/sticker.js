const express = require('express')
const router = express.Router()
const StickerModel = require('@models/sticker')
const response = require('@utils/response')

router.get('/sticker', async (_, res) => {
  const sticker = await StickerModel.find()
  return res.json(response.success({ data: sticker }))
})

module.exports = router
