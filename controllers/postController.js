const postsRouter = require('express').Router()
const Post = require('../models/postModel')

postsRouter.get('/', (request, response) => {
  Post.find({}).then(posts => {
    response.json(posts.map(post => post.toJSON()))
  })
})

postsRouter.get('/:id', (request, response, next) => {
  Post.findById(request.params.id)
  .then(post => {
    if (post) {
      response.json(post.toJSON())
    } else {
      response.status(404).end()
    }
  })
  .catch(error => next(error))
})

postsRouter.post('/', (request, response, next) => {
  const body = request.body

  const post = new Post({
    title: body.title,
    author: body.author,
    url: body.url
  })

  post.save()
  .then(savedPost => {
    response.json(savedPost.toJSON())
  })
  .catch(error => next(error))
})

postsRouter.delete('/:id', (request, response, next) => {
  Post.findByIdAndRemove(request.params.id)
  .then(() => {
    response.status(204).end()
  })
  .catch(error => next(error))
})

postsRouter.put('/:id', (request, response, next) => {
  const body = request.body

  const post = {
    content: body.content,
    important: body.important,
  }

  Post.findByIdAndUpdate(request.params.id, note, { new: true })
  .then(updatedNote => {
    response.json(updatedNote.toJSON())
  })
  .catch(error => next(error))
})

module.exports = postsRouter