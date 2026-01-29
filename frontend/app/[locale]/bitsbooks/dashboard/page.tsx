"use client";

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import { Pencil, Trash2, DollarSign, TrendingUp, BookOpen } from 'lucide-react';

export default function Dashboard() {
  const { user, userBooks, updateBook, deleteBook, transactions } = useAuth();
  const router = useRouter();
  const { locale } = useParams();

  const [editingBook, setEditingBook] = useState<string | null>(null);
  const [editFormData, setEditFormData] = useState({
    title: '',
    cover: '',
    price: 0,
    isFree: true,
    description: '',
  });

  // ✅ Auth guard (BENAR)
  useEffect(() => {
    if (!user) {
      router.replace(`/${locale}/bitsbooks/login`);
    }
  }, [user, router, locale]);

  if (!user) return null;

  // Hitung pendapatan
  const totalSales = transactions
    .filter((t) => t.type === 'sale')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalAdsense = transactions
    .filter((t) => t.type === 'adsense')
    .reduce((sum, t) => sum + t.amount, 0);

  const handleEdit = (bookId: string) => {
    const book = userBooks.find((b) => b.id === bookId);
    if (!book) return;

    setEditFormData({
      title: book.title,
      cover: book.cover,
      price: book.price,
      isFree: book.isFree,
      description: book.description,
    });
    setEditingBook(bookId);
  };

  const handleSaveEdit = (bookId: string) => {
    updateBook(bookId, editFormData);
    setEditingBook(null);
  };

  const handleDelete = (bookId: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus buku ini?')) {
      deleteBook(bookId);
    }
  };

  const handleTogglePrice = (bookId: string) => {
    const book = userBooks.find((b) => b.id === bookId);
    if (!book) return;

    updateBook(bookId, {
      isFree: !book.isFree,
      price: book.isFree ? 50000 : 0,
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Stat icon={<DollarSign />} label="Saldo Total" value={user.balance} />
        <Stat icon={<TrendingUp />} label="Penjualan Buku" value={totalSales} />
        <Stat icon={<BookOpen />} label="Adsense" value={totalAdsense} />
      </div>

      {/* Buku Saya */}
      <h2 className="text-2xl font-bold mb-4">
        Buku Saya ({userBooks.length})
      </h2>

      {userBooks.length === 0 ? (
        <div className="border p-8 text-center">
          <p className="text-gray-600 mb-4">Anda belum memiliki buku.</p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => router.push(`/${locale}/bitsbooks/write`)}
              className="px-6 py-2 bg-black text-white"
            >
              Tulis Buku
            </button>
            <button
              onClick={() => router.push(`/${locale}/bitsbooks/upload`)}
              className="px-6 py-2 border"
            >
              Upload Buku
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {userBooks.map((book) => (
            <div key={book.id} className="border p-4">
              {/* isi render buku — sama seperti punyamu */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ---------- Helper ---------- */
function Stat({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
}) {
  return (
    <div className="border p-6 flex items-center gap-4">
      <div className="text-gray-600">{icon}</div>
      <div>
        <p className="text-sm text-gray-600">{label}</p>
        <p className="text-2xl font-bold">
          Rp {value.toLocaleString('id-ID')}
        </p>
      </div>
    </div>
  );
}
