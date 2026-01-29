"use client";

import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { login, register } = useAuth();
  const router = useRouter();
  const { locale } = useParams();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isLogin) {
      login(email, password);
    } else {
      register(name, email, password);
    }

    // redirect tetap pakai locale
    router.push(`/${locale}/bitsbooks`);
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-md mx-auto border border-gray-200 p-8">
        <h1 className="text-2xl font-bold mb-6">
          {isLogin ? 'Login' : 'Daftar'}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block mb-2 font-medium">Nama Lengkap</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:border-black"
                required
              />
            </div>
          )}

          <div>
            <label className="block mb-2 font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:border-black"
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:border-black"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-black text-white hover:bg-gray-800 transition-colors"
          >
            {isLogin ? 'Login' : 'Daftar'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-gray-600 hover:underline"
          >
            {isLogin ? 'Belum punya akun? Daftar' : 'Sudah punya akun? Login'}
          </button>
        </div>
      </div>
    </div>
  );
}
