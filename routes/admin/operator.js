const router = require('express').Router()
const operatorModel = require('@models/operator')
const authToken = require('@middleware/authToken')
const errorMessage = require('@static/error_message')
const response = require('@utils/response')

router.get('/operator', authToken, async (req, res) => {
  const operator = await operatorModel.findOne({ _id: req._id })

  if (!operator) {
    return res
      .status(400)
      .json(response.error({ message: errorMessage.ACCOUNT_NOT_FOUND }))
  }

  const payload = {
    _id: operator._id,
    account: operator.account
  }

  return res
    .json(response.success({ data: payload }))
})

module.exports = router
