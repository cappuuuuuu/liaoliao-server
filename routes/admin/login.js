const router = require('express').Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const AdminAuthModel = require('../../models/adminAuth')

router.post('/login', async (req, res) => {
  const admin = await AdminAuthModel.findOne({ account: req.body.account })
  if (!admin) {
    return res
      .status(400)
      .json({ message: 'Account is not found' })
  }

  const isValidPassword = await bcrypt.compare(req.body.password, admin.password)
  if (!isValidPassword) {
    return res
      .status(401)
      .json({ message: 'Invalid password' })
  }

  const payload = {
    _id: admin._id,
    account: admin.account
  }

  const token = jwt.sign({ payload }, process.env.TOKEN_SECRET, { expiresIn: '1h' })
  return res
    .cookie('access_token', token)
    .json({ ...payload, token })
})

module.exports = router