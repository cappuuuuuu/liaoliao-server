const router = require('express').Router()
const operatorModel = require('@models/operator')
const authToken = require('@middleware/authToken')
const errorMessage = require('@static/error_message')

router.get('/operator', authToken, async (req, res) => {
  const operator = await operatorModel.findOne({ _id: req._id })

  if (!operator) {
    return res
      .status(400)
      .json({ message: errorMessage.ACCOUNT_NOT_FOUND })
  }

  const payload = {
    _id: operator._id,
    account: operator.account
  }

  return res
    .json(payload)
})

module.exports = router
