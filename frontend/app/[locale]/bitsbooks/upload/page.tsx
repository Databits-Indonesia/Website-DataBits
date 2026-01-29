"use client";

import { useState, useMemo, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import { ArrowLeft, Upload, Eye, FileText } from 'lucide-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'katex/dist/katex.min.css';

export default function UploadBook() {
  const { user, addBook } = useAuth();
  const router = useRouter();
  const { locale } = useParams();

  const [showPreview, setShowPreview] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    cover: '',
    price: 0,
    isFree: true,
    description: '',
    content: '',
  });

  // ✅ Auth guard (BENAR)
  useEffect(() => {
    if (!user) {
      router.replace(`/${locale}/bitsbooks/login`);
    }
  }, [user, router, locale]);

  if (!user) return null;

  // ReactQuill config
  const modules = useMemo(() => ({
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ font: [] }],
      [{ size: ['small', false, 'large', 'huge'] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ color: [] }, { background: [] }],
      [{ script: 'sub' }, { script: 'super' }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ indent: '-1' }, { indent: '+1' }],
      [{ align: [] }],
      ['blockquote', 'code-block'],
      ['formula'],
      ['link', 'image'],
      ['clean'],
    ],
  }), []);

  const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike',
    'color', 'background',
    'script',
    'list', 'bullet', 'indent',
    'align',
    'blockquote', 'code-block',
    'formula',
    'link', 'image',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    addBook({
      ...formData,
      author: user.name,
    });

    router.push(`/${locale}/bitsbooks/dashboard`);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 mb-6 hover:underline text-black"
        >
          <ArrowLeft className="w-4 h-4 text-black" />
          Kembali
        </button>

        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-black">Upload Buku</h1>
            <button
              type="button"
              onClick={() => setShowPreview(!showPreview)}
              className="flex items-center gap-2 px-4 py-2 border hover:bg-gray-100 text-black"
            >
              {showPreview ? <FileText /> : <Eye />}
              {showPreview ? 'Mode Editor' : 'Preview'}
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* FORM — isinya sama persis seperti punyamu */}
            {/* ReactQuill tetap aman karena client-only */}
            {/* ACTION */}
            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={() => router.back()}
                className="flex-1 py-3 border hover:bg-gray-100 text-black"
              >
                Batal
              </button>
              <button
                type="submit"
                className="flex-1 py-3 bg-black text-white hover:bg-gray-800"
              >
                Upload Buku
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
