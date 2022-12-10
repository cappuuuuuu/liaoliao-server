const express = require('express')
const router = express.Router()
const authToken = require('@middleware/authToken')
const MessageModel = require('@models/message')
const errorMessage = require('@static/error_message')
const response = require('@utils/response')
const { existFilterOption } = require('@utils/filter')

router.post('/message', authToken, async (req, res) => {
  const { page, count, startDate, endDate, ...rest } = req.body
  const filterOption = existFilterOption(rest)
  const sortOption = { time: 'desc' }
  const timeRange = {
    $gte: startDate || new Date(0).toISOString(),
    $lte: endDate || new Date().toISOString()
  }
  filterOption.time = timeRange

  const allMessage = await MessageModel
    .find(filterOption)
    .sort(sortOption)

  const sliceIndex = (page - 1) * count
  const singlePageMessage = allMessage.slice(sliceIndex, sliceIndex + count)

  const payload = {
    records: singlePageMessage,
    count: allMessage.length
  }

  return res.json(response.success({ data: payload }))
})

router.delete('/message', authToken, async (req, res) => {
  const { ids } = req.body
  const isDelete = await MessageModel.deleteMany({ _id: { $in: ids } })

  if (!isDelete) {
    return res
      .status(400)
      .json(response.error({
        message: errorMessage.MESSAGE_NOT_FOUND
      }))
  }

  const payload = {
    deletedCount: isDelete.deletedCount
  }
  return res.json(response.success({ data: payload }))
})

module.exports = router
