/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env:{
    NEXT_PUBLIC_ZEGO_APP_ID:1497659919,
    NEXT_PUBLIC_ZEGO_SERVER_ID:"13187b3f9403e9ed57e5690956557506",
  },
  images:{
    domains:["localhost"]
  }
};

module.exports = nextConfig;
