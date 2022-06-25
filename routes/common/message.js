const express = require('express')
const router = express.Router()
const authToken = require('@middleware/authToken')
const MessageModel = require('@models/message')

router.get('/message', authToken, async (req, res) => {
  let { page, count } = req.query
  page = parseInt(page)
  count = parseInt(count)

  const allMessage = await MessageModel.find()
  const sliceIndex = (page - 1) * count
  const singlePageMessage = allMessage.slice(sliceIndex, sliceIndex + count)
  const payload = {
    data: singlePageMessage,
    count: allMessage.length
  }
  res.send(payload)
})

module.exports = router
