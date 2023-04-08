const router = require('express').Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const operatorModel = require('@models/operator')
const cookies = require('@static/cookies_key')
const message = require('@static/messages')
const response = require('@utils/response')

router.post('/login', async (req, res) => {
  const operator = await operatorModel.findOne({ account: req.body.account })
  if (!operator) {
    return res
      .status(400)
      .json(response.error({ message: message.error.ACCOUNT_NOT_FOUND }))
  }

  const isValidPassword = await bcrypt.compare(req.body.password, operator.password)
  if (!isValidPassword) {
    return res
      .status(400)
      .json(response.error({ message: message.error.INVALID_PASSWORD }))
  }

  const payload = {
    _id: operator._id,
    account: operator.account
  }

  const token = jwt.sign({ payload }, process.env.TOKEN_SECRET, { expiresIn: '15m' })
  return res
    .cookie(cookies.ACCESS_TOKEN, token, { sameSite: 'none', secure: true })
    .json(response.success({ data: payload }))
})

module.exports = router
