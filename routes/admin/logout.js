const router = require('express').Router()
const operatorModel = require('@models/operator')
const authToken = require('@middleware/authToken')
const message = require('@static/messages')
const cookies = require('@static/cookies_key')
const response = require('@utils/response')

router.post('/logout', authToken, async (req, res) => {
  const operator = await operatorModel.findOne({ _id: req.body._id })
  if (!operator) {
    return res
      .json(response.error({ message: message.error.ACCOUNT_NOT_FOUND }))
  }

  return res
    .clearCookie(cookies.ACCESS_TOKEN)
    .json(response.success({ message: message.error.LOGOUT_SUCCESS }))
})

module.exports = router
