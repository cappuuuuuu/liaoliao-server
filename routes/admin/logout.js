const router = require('express').Router()
const operatorModel = require('@models/operator')
const errorMessage = require('@static/error_message')
const cookies = require('@static/cookies_key')

router.post('/logout', async (req, res) => {
  const operator = await operatorModel.findOne({ _id: req.body._id })
  if (!operator) {
    return res
      .status(400)
      .json({ message: errorMessage.ACCOUNT_NOT_FOUND })
  }

  return res
    .clearCookie(cookies.ACCESS_TOKEN)
    .json({ message: errorMessage.LOGOUT_SUCCESS })
})

module.exports = router
