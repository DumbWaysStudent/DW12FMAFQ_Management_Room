const models = require('../models')
const customers = models.customers
const rooms = models.rooms
const orders = models.orders

exports.show = async (req, res) => {
  const result = await rooms.findAll()
  res.send(result)
}
exports.add = async (req, res) => {
  const data = req.body
  const result = await rooms.create({
    name: data.name,
    available: true
  })
  res.send(result)
}