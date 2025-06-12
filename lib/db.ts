declare global {
  // eslint-disable-next-line no-var
  var mongoose: {
    conn: typeof import("mongoose") | null;
    promise: Promise<typeof import("mongoose")> | null;
  } | undefined;
}

import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/sa-stays'

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env')
}

let cached = global.mongoose

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}
// Ensure cached is always defined
cached = cached || { conn: null, promise: null }

async function connectDB() {
  const c = cached!;
  if (c.conn) {
    return c.conn
  }

  if (!c.promise) {
    const opts = {
      bufferCommands: false,
    }

    c.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose
    })
  }

  try {
    c.conn = await c.promise
  } catch (e) {
    c.promise = null
    throw e
  }

  return c.conn
}

export default connectDB 