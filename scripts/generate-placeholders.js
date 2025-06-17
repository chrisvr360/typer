const fs = require("fs");
const path = require("path");

// Create placeholder images directory if it doesn't exist
const imagesDir = path.join(process.cwd(), "public", "images");
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

// Create placeholder avatar image
const placeholderAvatar = `
<svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="200" height="200" fill="#E5E7EB"/>
  <circle cx="100" cy="80" r="40" fill="#9CA3AF"/>
  <path d="M100 140C133.137 140 160 166.863 160 200H40C40 166.863 66.8629 140 100 140Z" fill="#9CA3AF"/>
</svg>
`;

// Create placeholder property image
const placeholderProperty = `
<svg width="400" height="300" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="400" height="300" fill="#E5E7EB"/>
  <rect x="100" y="100" width="200" height="150" fill="#9CA3AF"/>
  <rect x="150" y="150" width="100" height="100" fill="#6B7280"/>
  <path d="M100 100L200 50L300 100" stroke="#6B7280" stroke-width="4"/>
</svg>
`;

// Write placeholder images
fs.writeFileSync(
  path.join(imagesDir, "placeholder-avatar.jpg"),
  placeholderAvatar
);
fs.writeFileSync(
  path.join(imagesDir, "placeholder-property.jpg"),
  placeholderProperty
);

console.log("Placeholder images generated successfully!");
