/** @type {import('next').NextConfig} */

import path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const nextConfig = {
  images: {
    domains: [
      "credithaatimages.s3.ap-south-1.amazonaws.com",
      "chdocsusers.s3.ap-south-1.amazonaws.com",
      "a.krdt.be",
      "hicredit-loan.oss-ap-south-1.aliyuncs.com",
    ],
  },

  turbopack: {
    resolveAlias: {
      "@components": path.join(__dirname, "components"), // ✅ Turbopack version of alias
    },
  },
};

export default nextConfig;
