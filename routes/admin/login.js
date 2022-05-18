const router = require('express').Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const operatorModel = require('@models/operator')

router.post('/login', async (req, res) => {
  const operator = await operatorModel.findOne({ account: req.body.account })
  if (!operator) {
    return res
      .status(400)
      .json({ message: 'Account is not found' })
  }

  const isValidPassword = await bcrypt.compare(req.body.password, operator.password)
  if (!isValidPassword) {
    return res
      .status(400)
      .json({ message: 'Invalid password' })
  }

  const payload = {
    _id: operator._id,
    account: operator.account
  }

  const token = jwt.sign({ payload }, process.env.TOKEN_SECRET, { expiresIn: '15m' })
  return res
    .cookie('access_token', token, { sameSite: 'none', secure: true })
    .json({ ...payload, token })
})

module.exports = router
