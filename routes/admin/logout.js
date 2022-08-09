const router = require('express').Router()
const operatorModel = require('@models/operator')
const errorMessage = require('@static/error_message')
const cookies = require('@static/cookies_key')
const response = require('@utils/response')

router.post('/logout', async (req, res) => {
  const operator = await operatorModel.findOne({ _id: req.body._id })
  if (!operator) {
    return res
      .json(response.error({ message: errorMessage.ACCOUNT_NOT_FOUND }))
  }

  return res
    .clearCookie(cookies.ACCESS_TOKEN)
    .json(response.success({ message: errorMessage.LOGOUT_SUCCESS }))
})

module.exports = router
