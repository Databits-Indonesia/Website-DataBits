'use client';

import React from 'react';
import { Search, Bell, Moon, Sun, Menu } from 'lucide-react';
import { APIClient } from '@/lib/api-client';

interface AdminHeaderProps {
    onMenuClick: () => void;
}

export default function AdminHeader({ onMenuClick }: AdminHeaderProps) {
    const [darkMode, setDarkMode] = React.useState(false);
    const [showNotifications, setShowNotifications] = React.useState(false);
    const [showProfile, setShowProfile] = React.useState(false);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        document.documentElement.classList.toggle('dark');
    };

    return (
        <header className="sticky top-0 z-30 flex w-full bg-white drop-shadow-sm dark:bg-gray-900 dark:drop-shadow-none">
            <div className="flex flex-grow items-center justify-between px-4 py-4 shadow-sm md:px-6 2xl:px-11">
                {/* Left side - Menu button and Search */}
                <div className="flex items-center gap-2 sm:gap-4">
                    {/* Hamburger Toggle */}
                    <button
                        onClick={onMenuClick}
                        className="block rounded-lg border border-gray-200 bg-white p-1.5 shadow-sm hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-900 dark:hover:bg-gray-800"
                        aria-label="Toggle menu"
                    >
                        <Menu className="h-5 w-5" />
                    </button>

                    {/* Search Form */}
                    <form className="hidden sm:block">
                        <div className="relative">
                            <button className="absolute left-0 top-1/2 -translate-y-1/2 pl-3">
                                <Search className="h-5 w-5 text-gray-400" />
                            </button>
                            <input
                                type="text"
                                placeholder="Type to search..."
                                className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-4 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-800 dark:bg-gray-800 dark:text-white xl:w-96"
                            />
                        </div>
                    </form>
                </div>

                {/* Right side - Dark mode, Notifications, Profile */}
                <div className="flex items-center gap-3 2xl:gap-7">
                    {/* Dark Mode Toggle */}
                    <button
                        onClick={toggleDarkMode}
                        className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 hover:bg-gray-100 dark:border-gray-800 dark:hover:bg-gray-800"
                        aria-label="Toggle dark mode"
                    >
                        {darkMode ? (
                            <Sun className="h-5 w-5 text-yellow-500" />
                        ) : (
                            <Moon className="h-5 w-5 text-gray-600" />
                        )}
                    </button>

                    {/* Notification */}
                    <div className="relative">
                        <button
                            onClick={() => setShowNotifications(!showNotifications)}
                            className="relative flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 hover:bg-gray-100 dark:border-gray-800 dark:hover:bg-gray-800"
                            aria-label="Notifications"
                        >
                            <Bell className="h-5 w-5" />
                            <span className="absolute -right-0.5 -top-0.5 z-1 h-2 w-2 rounded-full bg-red-500">
                                <span className="absolute -z-1 inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
                            </span>
                        </button>

                        {/* Notification Dropdown */}
                        {showNotifications && (
                            <div className="absolute -right-16 mt-2.5 w-80 rounded-lg border border-gray-200 bg-white shadow-lg dark:border-gray-800 dark:bg-gray-900 sm:right-0 sm:w-96">
                                <div className="px-4.5 py-3">
                                    <h5 className="text-sm font-medium text-gray-900 dark:text-white">
                                        Notifications
                                    </h5>
                                </div>

                                <ul className="flex flex-col overflow-y-auto max-h-96">
                                    <li>
                                        <div className="flex gap-3 border-t border-gray-200 px-4.5 py-3 hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-800">
                                            <div className="h-11 w-11 rounded-full bg-blue-100 dark:bg-blue-900/20">
                                                <div className="flex h-full w-full items-center justify-center">
                                                    <Bell className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                                </div>
                                            </div>

                                            <div className="flex-1">
                                                <h6 className="text-sm font-medium text-gray-900 dark:text-white">
                                                    New message received
                                                </h6>
                                                <p className="text-xs text-gray-500">2 min ago</p>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>

                    {/* User Profile */}
                    <div className="relative">
                        <button
                            onClick={() => setShowProfile(!showProfile)}
                            className="flex items-center gap-3"
                        >
                            <span className="hidden text-right lg:block">
                                <span className="block text-sm font-medium text-gray-900 dark:text-white">
                                    Admin User
                                </span>
                                <span className="block text-xs text-gray-500">Administrator</span>
                            </span>

                            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-600 to-purple-600">
                                <div className="flex h-full w-full items-center justify-center">
                                    <span className="text-sm font-medium text-white">A</span>
                                </div>
                            </div>

                            <svg
                                className="hidden fill-current sm:block"
                                width="12"
                                height="8"
                                viewBox="0 0 12 8"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M0.410765 0.910734C0.736202 0.585297 1.26384 0.585297 1.58928 0.910734L6.00002 5.32148L10.4108 0.910734C10.7362 0.585297 11.2638 0.585297 11.5893 0.910734C11.9147 1.23617 11.9147 1.76381 11.5893 2.08924L6.58928 7.08924C6.26384 7.41468 5.7362 7.41468 5.41077 7.08924L0.410765 2.08924C0.0853277 1.76381 0.0853277 1.23617 0.410765 0.910734Z"
                                    fill=""
                                />
                            </svg>
                        </button>

                        {/* Profile Dropdown */}
                        {showProfile && (
                            <div className="absolute right-0 mt-4 w-62.5 rounded-lg border border-gray-200 bg-white shadow-lg dark:border-gray-800 dark:bg-gray-900">
                                <ul className="flex flex-col gap-5 border-b border-gray-200 px-6 py-7.5 dark:border-gray-800">
                                    <li>
                                        <a
                                            href="#"
                                            className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-blue-600 lg:text-base"
                                        >
                                            My Profile
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#"
                                            className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-blue-600 lg:text-base"
                                        >
                                            Settings
                                        </a>
                                    </li>
                                </ul>
                                <button
                                    onClick={async () => {
                                        try {
                                            await APIClient.logout();
                                        } catch (error) {
                                            console.error('Logout failed:', error);
                                        } finally {
                                            window.location.href = '/admin';
                                        }
                                    }}
                                    className="flex w-full items-center gap-3.5 px-6 py-4 text-sm font-medium duration-300 ease-in-out hover:text-red-600 lg:text-base"
                                >
                                    Log Out
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}
