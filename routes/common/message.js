const express = require('express')
const router = express.Router()
const authToken = require('@middleware/authToken')
const MessageModel = require('@models/message')
const errorMessage = require('@static/error_message')

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
  return res.json(payload)
})

router.delete('/message', authToken, async (req, res) => {
  const { _id } = req.body
  const isDelete = await MessageModel.deleteMany({ _id: { $in: _id } })

  if (!isDelete) {
    return res
      .status(400)
      .json({
        status: 'error',
        code: 404,
        data: null,
        message: errorMessage.MESSAGE_NOT_FOUND
      })
  }

  const payload = {
    status: 'success',
    data: { deletedCount: isDelete.deletedCount },
    message: null
  }
  return res.json(payload)
})

module.exports = router
