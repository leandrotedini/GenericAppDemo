const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const Comment = require('../models/comment')
const Blog_liked_User = require('../models/blog_liked_user')
const tokenExtractor = require('../middleware/tokenExtractor')

blogsRouter.get('/', tokenExtractor, async (request, response) => {
  const { userId } = request
  let blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1 })

  const promiseArray = blogs.map( async blog => {
    blog.likedByUser = Boolean(await Blog_liked_User.exists({ blog: blog.id, user: userId }))
    return blog
  })
  blogs = await Promise.all(promiseArray)
  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) response.json(blog)
  response.status(404).end()

})

blogsRouter.post('/', tokenExtractor, async (request, response) => {
  const body = request.body

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: request.userId
  })

  await blog.save()
  const user = await User.findById(request.userId)
  if (user) {
    user.blogs.push(blog)
    await user.save()
  }
  const savedBlog = await blog.populate('user', { username: 1, name: 1 })
  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', tokenExtractor, async (request, response) => {

  const blog = await Blog.findById(request.params.id)

  if ( blog.user.toString() === request.userId.toString() ) {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } else {
    response.status(401).end()
  }

})

blogsRouter.put('/:id', tokenExtractor, async (request, response) => {

  const body = request.body
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.json(updatedBlog)
})

blogsRouter.put('/:id/like', tokenExtractor, async (request, response) => {

  const blog = request.body.blogId
  const user = request.userId
  const blogToUpdate = await Blog.findById(blog)
  const exists = await Blog_liked_User.exists({ blog, user })

  if (exists) {
    await Blog_liked_User.deleteOne({ blog, user })
    blogToUpdate.likes--
  } else {
    await Blog_liked_User.create({ blog, user })
    blogToUpdate.likes++
  }
  blogToUpdate.save()
  response.status(200).end()
})

blogsRouter.get('/:id/comments', async (request, response) => {
  const comments = await Comment.find({ blog: request.params.id })
  if (comments) response.json(comments)
  response.status(404).end()
})

blogsRouter.post('/:id/comments', tokenExtractor, async (request, response) => {

  const body = request.body
  const comment = new Comment({
    text: body.text,
    blog: body.blog,
    user: request.userId
  })

  await comment.save()
  response.status(201).json(comment)
})
module.exports = blogsRouter