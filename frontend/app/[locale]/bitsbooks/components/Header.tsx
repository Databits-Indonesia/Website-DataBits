'use client';

import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import { BookOpen, User, LogOut, LayoutDashboard } from 'lucide-react';

export default function Header() {
  const params = useParams();
  const locale = params?.locale as string;
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push(`/${locale}/bitsbooks/`);
  };

  return (
    <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <BookOpen className="w-8 h-8 text-black" />
            <span className="text-xl font-bold text-black">BitsBooks</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            <Link href={`/${locale}/bitsbooks/`} className="hover:underline text-black">
              Perpustakaan
            </Link>

            {user && (
              <>
                <Link href={`/${locale}/bitsbooks/write`} className="hover:underline text-black">
                  Tulis Buku
                </Link>
                <Link href={`/${locale}/bitsbooks/upload`} className="hover:underline text-black">
                  Upload Buku
                </Link>
                <Link href={`/${locale}/bitsbooks/dashboard`} className="hover:underline text-black">
                  Dashboard
                </Link>
              </>
            )}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <Link href={`/${locale}/bitsbooks/dashboard`} className="flex items-center text-black gap-2 hover:underline">
                  <User className="w-5 h-5" />
                  <span className="hidden sm:inline">{user.name}</span>
                </Link>

                <button
                  onClick={handleLogout}
                  className="p-2 hover:bg-gray-100 rounded-full text-black transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </>
            ) : (
              <Link
                href={`/${locale}/bitsbooks/login`}
                className="px-4 py-2 bg-black text-white hover:bg-gray-800 transition-colors"
              >
                Login
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {user && (
          <nav className="md:hidden flex gap-4 mt-4 text-sm">
            <Link href="/write" className="hover:underline">
              Tulis
            </Link>
            <Link href="/upload" className="hover:underline">
              Upload
            </Link>
            <Link
              href="/dashboard"
              className="hover:underline flex items-center gap-1"
            >
              <LayoutDashboard className="w-4 h-4" />
              Dashboard
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
