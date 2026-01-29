import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-4xl font-bold mb-4">404</h1>
      <p className="text-gray-600 mb-8">Halaman tidak ditemukan</p>
      <Link href="/" className="px-6 py-3 bg-black text-white hover:bg-gray-800 transition-colors inline-block">
        Kembali ke Beranda
      </Link>
    </div>
  );
}
