const jwt = require('jsonwebtoken')
const message = require('@static/messages')
const cookies = require('@static/cookies_key')
const response = require('@utils/response')

module.exports = function (req, res, next) {
  const token = req.cookies[cookies.ACCESS_TOKEN]

  if (!token) {
    res
      .status(401)
      .json(response.error({ code: 401, message: message.error.ACCESS_DENIED }))
  }

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET)
    req._id = decoded.payload._id
    next()
  } catch (err) {
    res
      .status(401)
      .json(response.error({ code: 401, message: err.name }))
  }
}
