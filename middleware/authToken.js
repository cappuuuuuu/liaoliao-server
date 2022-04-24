const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
  const token = req.cookies.access_token

  if (!token) {
    res
      .status(401)
      .json({ message: 'Access Denied' })
  }

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET)
    req._id = decoded.payload._id
    next()
  } catch (err) {
    res
      .status(401)
      .json({ message: err.name })
  }
}
