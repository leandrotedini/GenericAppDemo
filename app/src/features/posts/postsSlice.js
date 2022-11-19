import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import postService from '../../services/posts'

const initialState = {
  posts: [],
  status: 'idle',
  error: null
}

export const fetchPosts = createAsyncThunk('posts/fetchPosts',
  async () => await postService.getAll())

export const createPosts = createAsyncThunk('posts/create',
  async newPost => await postService.create(newPost))

export const deletePosts = createAsyncThunk('posts/delete',
  async id => {
    await postService.deletePost(id)
    return id
  })

export const fetchPostsComments = createAsyncThunk('posts/fetchPostsComments',
  async postId => {
    const comments = await postService.getAllComments(postId)
    return { postId, comments }
  })

export const createPostsComments = createAsyncThunk('posts/createPostsComments',
  async newComment => await postService.createComment(newComment))

export const likePosts = createAsyncThunk('posts/like',
  async postId => {
    await postService.likePost(postId)
    return postId
  })

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.posts = action.payload
      })
      .addCase(createPosts.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(createPosts.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.posts = state.posts.concat(action.payload)
      })
      .addCase(deletePosts.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(deletePosts.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.posts = state.posts.filter(post => post.id !== action.payload)
      })
      .addCase(fetchPostsComments.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchPostsComments.fulfilled, (state, action) => {
        state.status = 'succeeded'
        const { postId, comments } = action.payload
        state.posts = state.posts.map(post => {
          if (post.id === postId) {
            post.comments = comments
          }
          return post
        })
      })
      .addCase(createPostsComments.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(createPostsComments.fulfilled, (state, action) => {
        state.status = 'succeeded'
        const postId = action.payload.post
        state.posts = state.posts.map(post => {
          if (post.id === postId) {
            post.comments.push(action.payload)
          }
          return post
        })
      })
      .addCase(likePosts.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(likePosts.fulfilled, (state, action) => {
        state.status = 'succeeded'
        const postToUpdate = state.posts.find((post) => post.id === action.payload)
        postToUpdate.likedByUser
          ? postToUpdate.likes--
          : postToUpdate.likes++

        postToUpdate.likedByUser = !postToUpdate.likedByUser
      })
      .addCase(likePosts.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }
})

export const selectAllPosts = state => state.posts.posts
export const selectPostById = (state, id) => state.posts.posts.find((post) => post.id === id)
export const selectPostByUserId = (state, id) => state.posts.posts.filter((post) => post.user.id === id)
export const { getPosts } = postsSlice.actions
export default postsSlice.reducer