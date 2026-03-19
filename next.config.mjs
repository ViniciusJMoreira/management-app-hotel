/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "kcnhnlzcqjmhbpensobk.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/cabin-images/**",
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "5mb", // metti > 5mb
    },
  },
};

export default nextConfig;
