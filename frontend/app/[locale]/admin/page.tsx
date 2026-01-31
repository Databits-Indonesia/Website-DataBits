'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { APIClient } from '@/lib/api-client';
import { Button } from '@/components/ui/button';

export default function AdminLoginPage() {
    const router = useRouter();
    const [emailUsername, setEmailUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            console.log('Starting login process...');
            await APIClient.login(emailUsername, password);

            // Small delay to ensure token is saved to localStorage
            await new Promise(resolve => setTimeout(resolve, 100));

            // Verify token was saved
            const token = localStorage.getItem('auth_token');
            console.log('After login - token in localStorage:', token ? 'exists' : 'missing');

            // Use replace instead of push to prevent back navigation to login
            console.log('Navigating to dashboard...');
            router.replace('/admin/dashboard');
        } catch (err) {
            console.error('Login error:', err);
            setError('Invalid credentials. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>

            <div className="relative w-full max-w-md">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-25"></div>

                <div className="relative bg-slate-900/90 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-2xl p-8">
                    {/* Logo/Header */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 mb-4">
                            <svg
                                className="w-8 h-8 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                />
                            </svg>
                        </div>
                        <h1 className="text-2xl font-bold text-white mb-2">Admin Portal</h1>
                        <p className="text-slate-400">Sign in to access the dashboard</p>
                    </div>

                    {/* Login Form */}
                    <form onSubmit={handleLogin} className="space-y-6">
                        {error && (
                            <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-3 text-red-400 text-sm">
                                {error}
                            </div>
                        )}

                        <div className="space-y-2">
                            <label htmlFor="email-username" className="block text-sm font-medium text-slate-300">
                                Email or Username
                            </label>
                            <input
                                id="email-username"
                                type="text"
                                value={emailUsername}
                                onChange={(e) => setEmailUsername(e.target.value)}
                                className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                placeholder="Enter your email or username"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="password" className="block text-sm font-medium text-slate-300">
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                placeholder="Enter your password"
                                required
                            />
                        </div>

                        <Button
                            type="submit"
                            disabled={loading}
                            className="btn btn-primary w-full py-3 mt-4 flex items-center justify-center"
                        >
                            {loading ? (
                                <span className="flex items-center justify-center">
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Signing in...
                                </span>
                            ) : (
                                'Sign In'
                            )}
                        </Button>
                    </form>

                    {/* Footer */}
                    <div className="mt-6 text-center text-sm text-slate-500">
                        <p>DataBits Indonesia © 2026</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
