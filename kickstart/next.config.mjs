/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },
  // i18n: {
  //   locales: ["en-US", "fi", "fi-fi", "bn"],
  //   defaultLocale: "en-US",
  // },
};

export default nextConfig;
