const cors = require('cors')
const express = require('express')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)
const morgan = require('morgan')
const socketHandler = require('./controllers/socketHandler')
const avatarsRoutes = require('./routes/avatars')
const stickersRoutes = require('./routes/stickers')
const adminRoutes = require('./routes/admin')
const testRoutes = require('./routes/test')
const dataRoutes = require('./routes/data')
require('./config/db.js')

const port = process.env.PORT || 5000
const corsOptions = {
  origin: process.env.CORS_ORIGIN
}

app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(morgan('dev'))

app.use('/avatars', avatarsRoutes)
app.use('/stickers', stickersRoutes)
app.use('/admin', adminRoutes)
app.use('/test', testRoutes)
app.use('/data', dataRoutes)

app.use((_req, _res, next) => {
  const error = new Error('Page Is Not Found')
  error.status = 404

  next(error)
})

app.use((error, _req, res, _next) => {
  res.status(error.status || 500)

  res.json({
    error: {
      message: error.message
    }
  })
})

io.on('connection', socket => socketHandler(io, socket))

http.listen(port, () => {
  console.log(`listening on *:${port}`)
})
