const postsRouter = require('express').Router()
const Post = require('../models/post')
const Comment = require('../models/comment')
const Post_liked_User = require('../models/post_liked_user')
const tokenExtractor = require('../middleware/tokenExtractor')

postsRouter.get('/', tokenExtractor, async (request, response) => {
  const { userId } = request
  let posts = await Post
    .find({})
    .populate('user', { username: 1, name: 1 })

  const promiseArray = posts.map( async post => {
    post.likedByUser = Boolean(await Post_liked_User.exists({ post: post.id, user: userId }))
    return post
  })
  posts = await Promise.all(promiseArray)
  response.json(posts)
})

postsRouter.get('/:id', async (request, response) => {
  const post = await Post.findById(request.params.id)
  if (post) response.json(post)
  response.status(404).end()

})

postsRouter.post('/', tokenExtractor, async (request, response) => {
  const body = request.body

  const post = new Post({
    content: body.content,
    author: body.author,
    likes: body.likes || 0,
    user: request.userId
  })

  await post.save()
  response.status(201).json(post)
})

postsRouter.delete('/:id', tokenExtractor, async (request, response) => {

  const post = await Post.findById(request.params.id)

  if ( post.user.toString() === request.userId.toString() ) {
    await Post.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } else {
    response.status(401).end()
  }

})

postsRouter.put('/:id', tokenExtractor, async (request, response) => {

  const body = request.body
  const post = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  const updatedPost = await Post.findByIdAndUpdate(request.params.id, post, { new: true })
  response.json(updatedPost)
})

postsRouter.put('/:id/like', tokenExtractor, async (request, response) => {

  const post = request.body.postId
  const user = request.userId
  const postToUpdate = await Post.findById(post)
  const exists = await Post_liked_User.exists({ post, user })

  if (exists) {
    await Post_liked_User.deleteOne({ post, user })
    postToUpdate.likes--
  } else {
    await Post_liked_User.create({ post, user })
    postToUpdate.likes++
  }
  postToUpdate.save()
  response.status(200).end()
})

postsRouter.get('/:id/comments', async (request, response) => {
  const comments = await Comment.find({ post: request.params.id })
  if (comments) response.json(comments)
  response.status(404).end()
})

postsRouter.post('/:id/comments', tokenExtractor, async (request, response) => {

  const body = request.body
  const comment = new Comment({
    text: body.text,
    post: body.post,
    user: request.userId
  })

  await comment.save()
  response.status(201).json(comment)
})
module.exports = postsRouter