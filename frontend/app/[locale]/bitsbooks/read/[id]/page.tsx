"use client";

import { useParams, useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import { ArrowLeft, X } from "lucide-react";
import { useState, useEffect } from "react";
import "react-quill/dist/quill.snow.css";
import "katex/dist/katex.min.css";

export default function ReadBook() {
  const { id } = useParams();
  const router = useRouter();
  const { books, addTransaction } = useAuth();
  const [showAd, setShowAd] = useState(false);
  const [adRevenue, setAdRevenue] = useState(0);

  const book = books.find((b) => b.id === id);

  useEffect(() => {
    // Tampilkan iklan setiap 30 detik untuk buku gratis
    if (book?.isFree) {
      const interval = setInterval(() => {
        setShowAd(true);

        // Simulasi pendapatan iklan
        const revenue = Math.floor(Math.random() * 500) + 100; // Rp 100-600
        setAdRevenue(revenue);

        // Catat transaksi adsense ke author
        if (book.authorId) {
          addTransaction({
            bookId: book.id,
            amount: revenue,
            type: "adsense",
          });
        }
      }, 30000); // 30 detik

      return () => clearInterval(interval);
    }
  }, [book, addTransaction]);

  if (!book) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <p className="text-gray-600">Buku tidak ditemukan</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => router.back()}
              className="flex items-center text-black gap-2 hover:underline"
            >
              <ArrowLeft className="w-4 h-4 text-black" />
              Kembali
            </button>
            <h1 className="font-bold text-lg text-black truncate max-w-md">{book.title}</h1>
            <div className="w-20"></div> {/* Spacer untuk centering */}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="bg-white p-8 md:p-12 shadow-sm">
          <h1 className="text-3xl font-bold mb-2 text-black">{book.title}</h1>
          <p className="text-gray-600 mb-8 text-black">oleh {book.author}</p>

          <div className="book-content ql-editor text-black prose max-w-none">
            <div dangerouslySetInnerHTML={{ __html: book.content }} />
          </div>
        </div>
      </div>

      {/* Modal Iklan untuk Buku Gratis */}
      {showAd && book.isFree && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white max-w-md w-full p-6 relative">
            <button
              onClick={() => setShowAd(false)}
              className="absolute top-4 right-4 p-1 hover:bg-gray-100 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center">
              <div className="mb-4 p-8 bg-gray-100">
                <div className="text-gray-400 mb-2">📢 Iklan</div>
                <h3 className="font-bold text-xl mb-2">Produk/Layanan Sponsor</h3>
                <p className="text-gray-600">Deskripsi iklan produk atau layanan...</p>
              </div>

              <p className="text-sm text-gray-500 mb-4">
                Pendapatan iklan: Rp {adRevenue.toLocaleString("id-ID")} untuk penulis
              </p>

              <button
                onClick={() => setShowAd(false)}
                className="px-6 py-2 bg-black text-white hover:bg-gray-800 transition-colors"
              >
                Tutup Iklan
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .book-content {
          font-family: 'Georgia', serif;
          font-size: 16px;
          line-height: 1.8;
        }

        .book-content h1 { font-size: 2em; margin: 0.67em 0; }
        .book-content h2 { font-size: 1.5em; margin: 0.75em 0; }
        .book-content h3 { font-size: 1.17em; margin: 0.83em 0; }
        .book-content p { margin: 1em 0; }
        .book-content ul, .book-content ol { margin: 1em 0; padding-left: 2em; }
        .book-content blockquote {
          border-left: 4px solid #e5e7eb;
          padding-left: 1em;
          margin: 1em 0;
          color: #6b7280;
        }
        .book-content code {
          background: #f3f4f6;
          padding: 0.2em 0.4em;
          border-radius: 3px;
          font-size: 0.9em;
        }
        .book-content pre {
          background: #1f2937;
          color: #f9fafb;
          padding: 1em;
          border-radius: 4px;
          overflow-x: auto;
        }
      `}</style>
    </div>
  );
}
