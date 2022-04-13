const express = require('express')
const router = express.Router()
const StickersModel = require('../../models/stickers')

router.get('/stickers', async (req, res) => {
  const stickers = await StickersModel.find()
  res.send(stickers)
})

module.exports = router
