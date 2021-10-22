const Post = require('../models/postModel')
const User = require('../models/userModel')

const initialPosts = [
  {
    "title": "First Blog post",
    "author": "Fuad K.",
    "url": "fullstackopen.com",
  },
  {
    "title": "Second Blog post",
    "author": "Minna Ranta",
    "url": "fullstackopen.com",
  },
  {
    "title": "Third Blog post",
    "author": "Robert Newton.",
    "url": "fullstackopen.com",
  },
  {
    "title": "Fourth Blog post",
    "author": "Fuad Kalhori.",
    "url": "fullstackopen.com",
  },
  {
    "title": "Fifth Blog post",
    "author": "Kalle Penttinen.",
    "url": "fullstackopen.com",
  },
  {
    "title": "Sixth Blog post",
    "author": "Adam Knights",
    "url": "fullstackopen.com",
  }
]

const nonExistingId = async () => {
  const post = new Post({ title: 'willremovethissoon', author: 'FUKA KA', url: 'fukaka.com' })
  await post.save()
  await post.remove()

  return post._id.toString()
}

const postsInDb = async () => {
  const posts = await Post.find({})
  return posts.map(post => post.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  initialPosts, nonExistingId, postsInDb, usersInDb
}