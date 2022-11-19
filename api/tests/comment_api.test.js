const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')

const {
  getValidToken,
  getUserCreator,
  initialTextComment,
  initializeDB } = require('../utils/test_helper')

beforeEach(async () => {
  await initializeDB()
})

describe('Comments', () => {
  test('a valid blog can be added', async () => {
    const blog = await Blog.findOne()
    const user = await User.findOne()

    const newComment = {
      text: 'This is a comment test',
      blog: blog.id,
      user: user.id
    }

    const validUserToken = await getValidToken()

    const response = await api
      .post(`/api/blogs/${blog.id}/comments`)
      .set('Authorization', validUserToken)
      .send(newComment)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const commentCreated = response.body

    expect(commentCreated.text).toBe('This is a comment test')
    expect(commentCreated.blog).toBe(blog.id)
    expect(commentCreated.user).toBe(user.id)
  })

  test('get comments of a blog', async () => {
    const userCreator = await getUserCreator()
    const blog = await Blog.findOne({ user: userCreator.id })

    const response = await api
      .get(`/api/blogs/${blog.id}/comments`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const comments = response.body
    expect(comments).toHaveLength(initialTextComment.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
})