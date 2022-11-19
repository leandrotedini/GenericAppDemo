import axios from 'axios'
import { userToken } from '../utils/login_helper'
const baseUrl = '/api/posts/'

const getAll = () => {
  const config = {
    headers: { Authorization: userToken },
  }
  const request = axios.get(baseUrl, config)
  return request.then(response => response.data)
}

const create = (newPost) => {
  const config = {
    headers: { Authorization: userToken },
  }
  const request = axios.post(baseUrl, newPost, config)
  return request.then(response => response.data)
}

const update = (post) => {
  const config = {
    headers: { Authorization: userToken },
  }
  const request = axios
    .put(baseUrl+post.id, post, config)
  return request.then(response => response.data)
}

const likePost = (postId) => {
  const config = {
    headers: { Authorization: userToken },
  }
  const request = axios
    .put(`${baseUrl}/${postId}/like`, { postId }, config)
  return request.then(response => response.data)
}

const deletePost = (id) => {
  const config = {
    headers: { Authorization: userToken },
  }
  const request = axios
    .delete(baseUrl+id, config)
  return request.then(response => response.data)
}

const getAllComments = (postId) => {
  const request = axios.get(`${baseUrl}/${postId}/comments`)
  return request.then(response => response.data)
}

const createComment = (newComment) => {
  const config = {
    headers: { Authorization: userToken },
  }
  const request = axios.post(`${baseUrl}/${newComment.postId}/comments`, newComment, config)
  return request.then(response => response.data)
}

export default {
  getAll,
  create,
  update,
  deletePost,
  getAllComments,
  likePost,
  createComment
}