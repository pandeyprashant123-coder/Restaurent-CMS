/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["res.cloudinary.com"],
  },
  env: {
    API_BASE_URL: "http://localhost:8000/api/v1",
  },
};

export default nextConfig;
