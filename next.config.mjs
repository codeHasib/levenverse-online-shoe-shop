/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/dhvqoegn5/**",
      },
    ],
  },
  reactCompiler: true,
};

export default nextConfig;
