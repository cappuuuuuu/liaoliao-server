const express = require('express')
const router = express.Router()

router.get('/', async (req, res) => {
  const data = { name: 'json', age: 87 }
  console.log(req.body)
  res.status(201).json(data)
})

router.delete('/', async (req, res) => {
  const data = { name: 'json', age: 87 }

  res.status(201).json(data)
})

module.exports = router
