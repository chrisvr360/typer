import mongoose from 'mongoose'

const propertySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title for the property'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Please provide a description'],
  },
  location: {
    type: String,
    required: [true, 'Please provide a location'],
  },
  price: {
    type: Number,
    required: [true, 'Please provide a price'],
  },
  images: [{
    type: String,
    required: [true, 'Please provide at least one image'],
  }],
  category: {
    type: String,
    required: [true, 'Please provide a category'],
    enum: ['houses', 'mountain-view', 'beachfront', 'camping', 'apartments', 'luxury'],
  },
  amenities: [{
    type: String,
  }],
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },
  reviews: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: String,
    createdAt: {
      type: Date,
      default: Date.now,
    },
  }],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
})

// Update the updatedAt timestamp before saving
propertySchema.pre('save', function(next) {
  this.updatedAt = new Date()
  next()
})

export default mongoose.models.Property || mongoose.model('Property', propertySchema) 