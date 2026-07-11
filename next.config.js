/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Aset hero sudah WebP. AVIF didahulukan karena biasanya 20-30% lebih kecil
    // lagi; browser yang tidak mendukungnya otomatis jatuh balik ke WebP.
    formats: ['image/avif', 'image/webp'],
    // Hero memakai <Image fill sizes="100vw">, jadi Next hanya perlu membangun
    // varian selebar viewport — bukan seluruh tangga bawaan.
    deviceSizes: [640, 828, 1080, 1200, 1920, 2048],
  },
}

module.exports = nextConfig