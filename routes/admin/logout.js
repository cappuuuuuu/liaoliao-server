const router = require('express').Router()
const operatorModel = require('@models/operator')

router.post('/logout', async (req, res) => {
  const operator = await operatorModel.findOne({ _id: req.body._id })
  if (!operator) {
    return res
      .status(400)
      .json({ message: 'Account is not found' })
  }

  return res
    .clearCookie('access_token')
    .json({ message: 'OK' })
})

module.exports = router
