const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/userModel')

usersRouter.get('/', async (request, response) => {
  // .find({}).populate('posts', { likes: 1, id: 1 })
  const users = await User.find({}).populate('posts')
  response.json(users.map(u => u))
})

usersRouter.get('/:id', async (request, response) => {
  const user = await User.findById(request.params.id)
  if (user) {
    response.json(user.toJSON())
  } else {
    response.status(404).end()
  }
})

usersRouter.post('/', async (request, response) => {
  const body = request.body

  if (!(body.password && body.password.length >= 3)) {
    response.status(400).send({error: 'bad password'}).end()
  } else {
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash
    })


    const savedUser = await user.save()

    response.json(savedUser)
  }

})

module.exports = usersRouter