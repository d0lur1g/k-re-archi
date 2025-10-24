/** @type {import('next').NextConfig} */
const nextConfig = {
  // Optimisation du cache des polices
  async headers() {
    return [
      {
        source: "/assets/fonts/:path*",
        headers: [
          {
            key: "Cache-Control",
            // Cache immutable pendant 1 an (31536000 secondes)
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },

  // Optimisation de la compression
  compress: true,

  // Optimisation des images (si besoin)
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
