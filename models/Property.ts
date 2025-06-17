import mongoose from 'mongoose'

const propertySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    maxlength: 20
  },
  tagline: {
    type: String,
    required: true,
    maxlength: 30
  },
  description: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 1000
  },
  location: {
    type: String,
    required: true
  },
  coordinates: {
    type: {
      lat: Number,
      lng: Number
    },
    default: { lat: 0, lng: 0 }
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  reviewCount: {
    type: Number,
    default: 0
  },
  images: [{
    type: String,
    required: true
  }],
  category: {
    type: String,
    required: true,
    enum: ['eastern-cape', 'free-state', 'gauteng', 'kwazulu-natal', 'limpopo', 'mpumalanga', 'northern-cape', 'north-west', 'western-cape']
  },
  amenities: [{
    type: String
  }],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  guests: {
    type: Number,
    required: true,
    min: 0
  },
  bedrooms: {
    type: Number,
    required: true,
    min: 0
  },
  beds: {
    type: Number,
    required: true,
    min: 0
  },
  baths: {
    type: Number,
    required: true,
    min: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
})

// Update the updatedAt timestamp before saving
propertySchema.pre('save', function(next) {
  this.updatedAt = new Date()
  next()
})

export default mongoose.models.Property || mongoose.model('Property', propertySchema) 