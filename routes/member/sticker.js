const express = require('express')
const router = express.Router()
const StickerModel = require('@root/models/sticker')

router.get('/sticker', async (req, res) => {
  const sticker = await StickerModel.find()
  res.send(sticker)
})

module.exports = router
