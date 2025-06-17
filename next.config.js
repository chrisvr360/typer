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
      "accommodation.south-africa.net", // Our domain
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ["image/webp"],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  // Enable static file serving
  async headers() {
    return [
      {
        source: "/uploads/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
          {
            key: "Content-Type",
            value: "image/jpeg",
          },
        ],
      },
    ];
  },
  // Configure static file serving
  async rewrites() {
    return [
      {
        source: "/uploads/:path*",
        destination: "/api/static/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
