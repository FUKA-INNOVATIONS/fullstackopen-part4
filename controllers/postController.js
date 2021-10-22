const postsRouter = require('express').Router()
const Post = require('../models/postModel')
const User = require('../models/userModel')
const jwt = require('jsonwebtoken')


postsRouter.get('/', async (request, response) => {
  //console.log('req.user in postController get/: ', request.user)
  const posts = await Post.find({}).populate('user', {username: 1, name: 1})
  response.json(posts.map(post => post.toJSON()))
})

postsRouter.get('/:id', async (request, response) => {
    const post = await Post.findById(request.params.id)
    if (post) {
      response.json(post.toJSON())
    } else {
      response.status(404).end()
    }
})


postsRouter.post('/', async (request, response) => {
  const body = request.body

  console.log('req.user in postController: ', request.user)

  if(!request.user) {
    return response.status(400).json({error: 'user id is missing'})
  }

  //const token = getTokenFrom(request)
  //const decodedToken = jwt.verify(request.token, process.env.SECRET)
  /*if (!(request.token || decodedToken.id || request.user)) {
    console.log('req.user when token missing: ', request.user);
    return response.status(401).json({ error: 'token missing or invalid' })
  }*/
  const user = await User.findById(request.user.id)

  const post = new Post({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id
  })

  const savedPost = await post.save()
  user.posts = user.posts.concat(savedPost._id)
  await user.save()

  response.json(savedPost.toJSON())

})

postsRouter.delete('/:id', async (request, response) => {
  const postId = request.params.id
  const userIsAuthenticated = request.user

  // If user is not logged in
  if (!userIsAuthenticated) {
    response.status(401).send({error: 'User is not authorized!'})
  }

  // Authenticated user found
  if (userIsAuthenticated) {
    const authenticatedId = userIsAuthenticated.id
    const post = await Post.findById( postId )

    console.log('fetched post in delete controller :', post);

    // post doesnt exist
    if ( !post ) {
      response.status( 404 ).send( { error: 'post doesnt exist.' } )
    }

    // If user owns the post
    if ( authenticatedId.toString() === post.user.toString() ) {
      await Post.findByIdAndRemove( post._id )

      const user = await User.findById(request.user.id)
      //console.log('userposts in delete block 1: ', user.posts)
      user.posts = user.posts.filter(post => post.toString() !== postId)
      //console.log('userposts in delete block 2: ', user.posts)
      await user.save()

      response.status( 204 ).end()
    } else {
      // No permission to delte
      response.status( 403 ).
          send( { error: 'You dont have permission to delete!' } )
    }
  } else {
    // User is not authenticated
    response.status(403).send({error: 'You dont have permission to delete!'})
  }

})

postsRouter.put('/:id', async (request, response) => {
  const body = request.body

  const post = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  const updatedPost = await Post.findByIdAndUpdate(request.params.id, post, { new: true })
  response.json(updatedPost.toJSON())

})

module.exports = postsRouter