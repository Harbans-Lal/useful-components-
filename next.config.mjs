// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      't3.ftcdn.net',        // From your previous code
      'images.unsplash.com',  // From your previous code
      'media.istockphoto.com', // From your previous code
      'helpx.adobe.com',      // From your previous code
      'res.cloudinary.com',    // Add this line for Cloudinary
      'www.shutterstock.com',
    ],
  },
};

export default nextConfig;
