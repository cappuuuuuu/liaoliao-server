const router = require('express').Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const operatorModel = require('@models/operator')
const errorMessage = require('@static/error_message')
const cookies = require('@static/cookies_key')

router.post('/login', async (req, res) => {
  const operator = await operatorModel.findOne({ account: req.body.account })
  if (!operator) {
    return res
      .status(400)
      .json({ message: errorMessage.ACCOUNT_NOT_FOUND })
  }

  const isValidPassword = await bcrypt.compare(req.body.password, operator.password)
  if (!isValidPassword) {
    return res
      .status(400)
      .json({ message: errorMessage.INVALID_PASSWORD })
  }

  const payload = {
    _id: operator._id,
    account: operator.account
  }

  const token = jwt.sign({ payload }, process.env.TOKEN_SECRET, { expiresIn: '15m' })
  return res
    .cookie(cookies.ACCESS_TOKEN, token, { sameSite: 'none', secure: true })
    .json(payload)
})

module.exports = router
