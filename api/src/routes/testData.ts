import express from 'express'

export const TestDataRoutes = express.Router()

TestDataRoutes.get('/', (req, res, next) => {
  res.send([1, 2, 3, 4, 5])
})

TestDataRoutes.post('/', (req, res, next) => {
  res.send(`Data created ${req.body.data}`)
})

TestDataRoutes.patch('/:id', (req, res, next) => {
  res.send('User updated')
})

TestDataRoutes.delete('/:id', (req, res, next) => {
  res.send('User deleted')
})
