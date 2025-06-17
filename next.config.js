/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "images.unsplash.com",
      "unsplash.com",
      "plus.unsplash.com",
      "source.unsplash.com",
      "images.pexels.com",
      "images.pixabay.com",
      "res.cloudinary.com",
      "lh3.googleusercontent.com", // For Google profile images
    ],
  },
};

module.exports = nextConfig;
