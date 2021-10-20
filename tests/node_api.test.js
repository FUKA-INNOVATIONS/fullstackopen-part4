const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Post = require('../models/postModel')

beforeEach(async () => {
  await Post.deleteMany({})
  await Post.insertMany(helper.initialPosts)
})

test('Blog posts are returned as json', async () => {
  await api
  .get('/api/posts')
  .expect(200)
  .expect('Content-Type', /application\/json/)
})

test('Object identifier field is named id', async () => {
  const response = await api.get('/api/posts')
  response.body.map(p => {
    expect(p.id).toBeDefined()
  })
})

test('all blog posts are returned', async () => {
  const response = await api.get('/api/posts')
  expect(response.body).toHaveLength(helper.initialPosts.length)
})

test('a specific post is within the returned posts', async () => {
  const response = await api.get('/api/posts')
  const contents = response.body.map(p => p.title)
  expect(contents).toContain(
      'Fourth Blog post'
  )
})

test('a valid post can be added ', async () => {
  const newPost = {
    title: 'Dream big, achieve bigger',
    author: 'Fuad Kalhori',
    url: 'fuka-innovations.io'
  }

  await api
  .post('/api/posts')
  .send(newPost)
  .expect(200)
  .expect('Content-Type', /application\/json/)

  const postsAtEnd = await helper.postsInDb()
  expect(postsAtEnd).toHaveLength(helper.initialPosts.length + 1)

  const contents = postsAtEnd.map(p => p.title)
  expect(contents).toContain(
      'Dream big, achieve bigger'
  )
})

test('default value of likes is set to zero', async () => {
  const newPost = {
    title: 'Dream big, achieve bigger',
    author: 'Fuad Kalhori',
    url: 'fuka-innovations.io'
  }

  await api
  .post('/api/posts')
  .send(newPost)
  .expect(200)
  .expect((res) => {
    expect(res.body.likes).toBe(0)
  })

})


test('post without (title, url) is not added and returns 400', async () => {
  const newPost = {
    likes: 1
  }

  await api
  .post('/api/posts')
  .send(newPost)
  .expect(400)

  const postsAtEnd = await helper.postsInDb()
  expect(postsAtEnd).toHaveLength(helper.initialPosts.length)
})


test('a specific post can be viewed', async () => {
  const postsAtStart = await helper.postsInDb()

  const postToView = postsAtStart[0]

  const resultPost = await api
  .get(`/api/posts/${postToView.id}`)
  .expect(200)
  .expect('Content-Type', /application\/json/)

  // To enable date comparison, parse the object
  //const processedPostToView = JSON.parse(JSON.stringify(postToView))

  expect(resultPost.body).toEqual(postToView)
})

test('a post can be deleted', async () => {
  const postsAtStart = await helper.postsInDb()
  const postToDelete = postsAtStart[0]

  await api
  .delete(`/api/posts/${postToDelete.id}`)
  .expect(204)

  const postsAtEnd = await helper.postsInDb()

  expect(postsAtEnd).toHaveLength(
      helper.initialPosts.length - 1
  )

  const contents = postsAtEnd.map(p => p.title)
  expect(contents).not.toContain(postToDelete.title)
})

test('the first post title is correct', async () => {
  const response = await api.get('/api/posts')
  expect(response.body[0].title).toBe(helper.initialPosts[0].title)
})

/*test('there are six posts', async () => {
  const response = await api.get('/api/posts')
  expect(response.body).toHaveLength(6)
})*/


afterAll(() => {
  mongoose.connection.close()
})