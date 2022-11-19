const mongoose = require('mongoose')
const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }


const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  url: { type: String, required: true },
  likes: Number,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true, virtuals: { likedByUser: false } }
)

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    returnedObject.createdAt = returnedObject.createdAt.toLocaleDateString('en-US', options)
    delete returnedObject._id
    delete returnedObject.__v
  },
  virtuals: true
})

module.exports = mongoose.model('Blog', blogSchema)