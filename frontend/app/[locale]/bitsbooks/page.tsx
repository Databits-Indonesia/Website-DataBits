"use client"

import { useState } from "react"
import Link from "next/link"
import { useParams } from 'next/navigation';
import { useAuth } from "./context/AuthContext"
import { Heart, DollarSign } from "lucide-react"

export default function HomePage() {
  const params = useParams();
  const locale = params?.locale as string;
  const { books, favorites, toggleFavorite, user } = useAuth()
  const [filter, setFilter] = useState<"all" | "free" | "paid">("all")

  const filteredBooks = books.filter((book) => {
    if (filter === "free") return book.isFree
    if (filter === "paid") return !book.isFree
    return true
  })

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          Perpustakaan Digital
        </h1>
        <p className="text-gray-400 mb-6">
          Temukan buku-buku terbaik untuk meningkatkan pengetahuan Anda
        </p>

        {/* Filter */}
        <div className="flex gap-2">
          {(["all", "free", "paid"] as const).map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-4 py-2 border transition-colors ${
                filter === type
                  ? "bg-black text-white border-black"
                  : "bg-white text-black border-gray-300 hover:border-black"
              }`}
            >
              {type === "all"
                ? "Semua Buku"
                : type === "free"
                ? "Gratis"
                : "Berbayar"}
            </button>
          ))}
        </div>
      </div>

      {/* Books Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBooks.map((book) => {
          const isFavorite = favorites.includes(book.id)

          return (
            <div
              key={book.id}
              className="border border-gray-200 hover:shadow-lg transition-shadow"
            >
              <Link href={`/${locale}/bitsbooks/book/${book.id}`}>
                <img
                  src={book.cover}
                  alt={book.title}
                  className="w-full h-64 object-cover"
                />
              </Link>

              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <Link href={`/${locale}/bitsbooks/book/${book.id}`} className="flex-1">
                    <h3 className="font-bold text-lg hover:underline">
                      {book.title}
                    </h3>
                    <p className="text-sm text-gray-600">{book.author}</p>
                  </Link>

                  {user && (
                    <button
                      onClick={() => toggleFavorite(book.id)}
                      className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                      title={
                        isFavorite
                          ? "Hapus dari favorit"
                          : "Tambah ke favorit"
                      }
                    >
                      <Heart
                        className={`w-5 h-5 ${
                          isFavorite
                            ? "fill-red-500 text-red-500"
                            : "text-gray-400"
                        }`}
                      />
                    </button>
                  )}
                </div>

                <p className="text-sm text-gray-700 mb-4 line-clamp-2">
                  {book.description}
                </p>

                <div className="flex items-center justify-between">
                  {book.isFree ? (
                    <span className="text-green-600 font-semibold">
                      Gratis
                    </span>
                  ) : (
                    <span className="font-semibold flex items-center gap-1">
                      <DollarSign className="w-4 h-4" />
                      Rp {book.price.toLocaleString("id-ID")}
                    </span>
                  )}

                  <Link
                    href={`/${locale}/bitsbooks/book/${book.id}`}
                    className="px-4 py-2 bg-black text-white hover:bg-gray-800 transition-colors text-sm"
                  >
                    Lihat Detail
                  </Link>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {filteredBooks.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <p>Tidak ada buku yang sesuai dengan filter.</p>
        </div>
      )}
    </div>
  )
}
