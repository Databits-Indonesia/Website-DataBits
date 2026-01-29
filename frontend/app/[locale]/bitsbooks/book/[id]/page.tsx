"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Heart, ArrowLeft } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function BookDetail() {
  const params = useParams();
  const locale = params?.locale as string;
  const { id } = useParams();
  const router = useRouter();
  const { books, favorites, toggleFavorite, user } = useAuth();

  const book = books.find((b) => b.id === id);

  if (!book) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <p className="text-gray-600 mb-4">Buku tidak ditemukan</p>
        <Link href="/" className="text-black hover:underline">
          Kembali ke Perpustakaan
        </Link>
      </div>
    );
  }

  const isFavorite = favorites.includes(book.id);

  const handleReadBook = () => {
    if (!book.isFree && !user) {
      router.push(`/${locale}/bitsbooks/login`);
      return;
    }
    router.push(`/${locale}/bitsbooks/read/${book.id}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 mb-6 hover:underline"
      >
        <ArrowLeft className="w-4 h-4" />
        Kembali
      </button>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Cover Buku */}
        <div>
          <img
            src={book.cover}
            alt={book.title}
            className="w-full h-auto object-cover border border-gray-200"
          />
        </div>

        {/* Detail Buku */}
        <div>
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">{book.title}</h1>
              <p className="text-lg text-gray-400">oleh {book.author}</p>
            </div>

            {user && (
              <button
                onClick={() => toggleFavorite(book.id)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                title={isFavorite ? "Hapus dari favorit" : "Tambah ke favorit"}
              >
                <Heart
                  className={`w-6 h-6 ${
                    isFavorite ? "fill-red-500 text-red-500" : "text-gray-400"
                  }`}
                />
              </button>
            )}
          </div>

          <div className="mb-6">
            {book.isFree ? (
              <div className="inline-block px-4 py-2 bg-green-100 text-green-700 font-semibold">
                Gratis
              </div>
            ) : (
              <div className="inline-block px-4 py-2 bg-gray-100 font-bold text-lg text-black">
                Rp {book.price.toLocaleString("id-ID")}
              </div>
            )}
          </div>

          <div className="mb-6">
            <h2 className="font-bold text-xl mb-2">Deskripsi</h2>
            <p className="text-gray-400 leading-relaxed">{book.description}</p>
          </div>

          <button
            onClick={handleReadBook}
            className="w-full py-3 bg-black text-white hover:bg-gray-800 transition-colors text-lg"
          >
            {book.isFree ? "Baca Sekarang" : "Beli Buku"}
          </button>

          {!book.isFree && (
            <p className="text-sm text-gray-500 mt-2 text-center">
              {!user ? "Login untuk membaca buku" : "Klik untuk membaca/membeli"}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
