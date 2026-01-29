"use client";

import { useState, useMemo, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import { ArrowLeft, Eye, FileText } from "lucide-react";
import dynamic from "next/dynamic";
import "katex/dist/katex.min.css";
// 1. Ganti import CSS ke react-quill-new
import "react-quill-new/dist/quill.snow.css";

// 2. Ganti dynamic import ke react-quill-new
const ReactQuill = dynamic(() => import("react-quill-new"), { 
  ssr: false,
  loading: () => <div className="h-[500px] bg-gray-50 animate-pulse flex items-center justify-center border">Loading Editor...</div>
});

export default function WriteBook() {
    const { user, addBook } = useAuth();
    const router = useRouter();
    const { locale } = useParams();

    const [showPreview, setShowPreview] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        cover: "",
        price: 0,
        isFree: true,
        description: "",
        content: "",
    });

    // Auth guard
    useEffect(() => {
        if (!user) {
            router.replace(`/${locale}/bitsbooks/login`);
        }
    }, [user, router, locale]);

    const modules = useMemo(
        () => ({
            toolbar: [
                [{ header: [1, 2, 3, 4, 5, 6, false] }],
                [{ font: [] }],
                [{ size: ["small", false, "large", "huge"] }],
                ["bold", "italic", "underline", "strike"],
                [{ color: [] }, { background: [] }],
                [{ script: "sub" }, { script: "super" }],
                [{ list: "ordered" }, { list: "bullet" }],
                [{ indent: "-1" }, { indent: "+1" }],
                [{ align: [] }],
                ["blockquote", "code-block"],
                ["formula"],
                ["link", "image"],
                ["clean"],
            ],
        }),
        []
    );

    const formats = [
        "header", "font", "size", "bold", "italic", "underline", "strike",
        "color", "background", "script", "list", "indent",
        "align", "blockquote", "code-block", "formula", "link", "image",
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;
        addBook({ ...formData, author: user.name });
        router.push(`/${locale}/bitsbooks/dashboard`);
    };

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p>Redirecting to login...</p>
            </div>
        );
    }

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
                        <h1 className="text-3xl font-bold text-black">Tulis Buku Baru</h1>
                        <button
                            type="button"
                            onClick={() => setShowPreview(!showPreview)}
                            className="flex text-black items-center gap-2 px-4 py-2 border hover:bg-gray-100 transition-colors"
                        >
                            {showPreview ? <FileText className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            {showPreview ? "Mode Editor" : "Preview"}
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Informasi Dasar */}
                        <div className="bg-gray-50 p-6 border border-gray-200">
                            <h2 className="text-xl font-semibold mb-4 text-black">Informasi Dasar</h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block mb-2 text-black font-medium">Judul Buku</label>
                                    <input
                                        type="text"
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:border-black bg-white"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block mb-2 text-black font-medium">URL Cover Buku</label>
                                    <input
                                        type="url"
                                        value={formData.cover}
                                        onChange={(e) => setFormData({ ...formData, cover: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:border-black bg-white"
                                        placeholder="https://example.com/cover.jpg"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block mb-2 text-black font-medium">Deskripsi Singkat</label>
                                    <textarea
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:border-black min-h-[100px] bg-white"
                                        required
                                    />
                                </div>
                                <div className="border border-gray-300 p-4 bg-white">
                                    <label className="flex items-center gap-2 mb-4 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={formData.isFree}
                                            onChange={(e) => setFormData({
                                                ...formData,
                                                isFree: e.target.checked,
                                                price: e.target.checked ? 0 : formData.price,
                                            })}
                                            className="w-5 h-5"
                                        />
                                        <span className="text-black font-medium">Buku Gratis (dengan iklan)</span>
                                    </label>
                                    {!formData.isFree && (
                                        <div>
                                            <label className="text-black block mb-2 font-medium">Harga (Rp)</label>
                                            <input
                                                type="number"
                                                value={formData.price}
                                                onChange={(e) => setFormData({
                                                    ...formData,
                                                    price: parseInt(e.target.value) || 0,
                                                })}
                                                className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:border-black"
                                                min={0}
                                                required={!formData.isFree}
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Editor Section */}
                        <div>
                            <label className="block mb-2 font-medium text-lg text-black">Konten Buku</label>
                            <p className="text-sm text-gray-600 mb-4">
                                Gunakan toolbar di bawah untuk memformat teks.
                            </p>

                            {!showPreview ? (
                                <div className="book-editor-wrapper border border-gray-300 bg-white">
                                    <ReactQuill
                                        theme="snow"
                                        value={formData.content}
                                        onChange={(content) => setFormData({ ...formData, content })}
                                        modules={modules}
                                        formats={formats}
                                        placeholder="Mulai tulis buku Anda..."
                                        className="min-h-[500px]"
                                    />
                                </div>
                            ) : (
                                <div className="border border-gray-300 bg-white p-8 min-h-[500px] prose max-w-none">
                                    <h2 className="text-2xl font-bold mb-4 text-black">Preview</h2>
                                    <div
                                        className="ql-editor"
                                        dangerouslySetInnerHTML={{
                                            __html: formData.content || '<p class="text-gray-400">Belum ada konten...</p>',
                                        }}
                                    />
                                </div>
                            )}
                        </div>

                        {/* Actions */}
                        <div className="flex gap-4 pt-4">
                            <button
                                type="button"
                                onClick={() => router.back()}
                                className="flex-1 py-3 text-black border border-gray-300 hover:bg-gray-100 transition-colors"
                            >
                                Batal
                            </button>
                            <button
                                type="submit"
                                className="flex-1 py-3 bg-black text-white hover:bg-gray-800 transition-colors"
                            >
                                Publish Buku
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            
            {/* Custom Styling untuk memperbaiki tampilan editor */}
            <style jsx global>{`
                .ql-container {
                    font-size: 16px;
                    min-height: 450px;
                }
                .ql-editor {
                    min-height: 450px;
                }
            `}</style>
        </div>
    );
}