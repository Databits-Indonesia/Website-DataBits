'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { APIClient } from '@/lib/api-client';
import { getCurrentLocale, localizePath } from '@/lib/i18n';
import {
    LayoutDashboard,
    FileText,
    Briefcase,
    Package,
    FolderKanban,
    GraduationCap,
    Mail,
    Users,
    ChevronDown,
    ChevronRight,
} from 'lucide-react';

interface NavItem {
    name: string;
    href: string;
    icon: React.ElementType;
    subItems?: { name: string; href: string }[];
}

interface AdminSidebarProps {
    isOpen: boolean;
    onClose: () => void;
    isCollapsed: boolean;
}

const navigation: NavItem[] = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Blog', href: '/admin/blog', icon: FileText },
    { name: 'Career', href: '/admin/careers', icon: Briefcase },
    { name: 'Products', href: '/admin/products', icon: Package },
    { name: 'Projects', href: '/admin/projects', icon: FolderKanban },
    { name: 'Research', href: '/admin/research', icon: GraduationCap },
    { name: 'Messages', href: '/admin/messages', icon: Mail },
    { name: 'Users', href: '/admin/users', icon: Users },
];

export default function AdminSidebar({ isOpen, onClose, isCollapsed }: AdminSidebarProps) {
    const router = useRouter();
    const pathname = usePathname();
    const locale = getCurrentLocale(pathname);
    const [expandedItems, setExpandedItems] = React.useState<string[]>([]);

    const toggleExpanded = (name: string) => {
        setExpandedItems((prev) =>
            prev.includes(name) ? prev.filter((item) => item !== name) : [...prev, name]
        );
    };

    return (
        <>
            {/* Mobile backdrop */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/50 lg:hidden"
                    onClick={onClose}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed left-0 top-0 z-50 flex h-screen flex-col overflow-y-auto bg-white duration-300 ease-linear dark:bg-gray-900 lg:static lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'
                    } ${isCollapsed ? 'lg:w-20' : 'lg:w-72'} w-72`}
            >
                {/* Sidebar Header */}
                <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
                    <div
                        className={`flex items-center gap-4 cursor-pointer ${isCollapsed ? 'justify-center w-full' : ''}`}
                        onClick={() => router.push(localizePath(locale, '/'))}
                    >
                        <img src="/logo.jpeg" alt="DataBits Logo" className="h-8" />
                    </div>

                    <button
                        onClick={onClose}
                        className="block lg:hidden"
                        aria-label="Close sidebar"
                    >
                        <svg
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>

                {/* Sidebar Menu */}
                <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
                    <nav className="px-4 py-4 lg:px-6">
                        <div>
                            {!isCollapsed && (
                                <h3 className="mb-4 ml-4 text-sm font-semibold text-gray-500 dark:text-gray-400">
                                    MENU
                                </h3>
                            )}

                            <ul className="mb-6 flex flex-col gap-1.5">
                                {navigation.map((item) => {
                                    const isActive = pathname?.startsWith(item.href);
                                    const Icon = item.icon;
                                    const isExpanded = expandedItems.includes(item.name);

                                    return (
                                        <li key={item.name}>
                                            {item.subItems ? (
                                                <>
                                                    <button
                                                        onClick={() => toggleExpanded(item.name)}
                                                        className={`group relative flex w-full items-center gap-2.5 rounded-lg px-4 py-2.5 font-medium duration-300 ease-in-out hover:bg-gray-100 dark:hover:bg-gray-800 ${isActive
                                                            ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400'
                                                            : 'text-gray-700 dark:text-gray-300'
                                                            } ${isCollapsed ? 'justify-center px-2' : ''}`}
                                                    >
                                                        <Icon className="h-5 w-5 flex-shrink-0" />
                                                        {!isCollapsed && (
                                                            <>
                                                                <span className="flex-1 text-left">{item.name}</span>
                                                                {isExpanded ? (
                                                                    <ChevronDown className="h-4 w-4" />
                                                                ) : (
                                                                    <ChevronRight className="h-4 w-4" />
                                                                )}
                                                            </>
                                                        )}
                                                    </button>

                                                    {!isCollapsed && isExpanded && item.subItems && (
                                                        <ul className="mt-1 flex flex-col gap-1 pl-6">
                                                            {item.subItems.map((subItem) => (
                                                                <li key={subItem.name}>
                                                                    <Link
                                                                        href={subItem.href}
                                                                        className="block rounded-md px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
                                                                    >
                                                                        {subItem.name}
                                                                    </Link>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    )}
                                                </>
                                            ) : (
                                                <Link
                                                    href={item.href}
                                                    className={`group relative flex items-center gap-2.5 rounded-lg px-4 py-2.5 font-medium duration-300 ease-in-out hover:bg-gray-100 dark:hover:bg-gray-800 ${isActive
                                                        ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400'
                                                        : 'text-gray-700 dark:text-gray-300'
                                                        } ${isCollapsed ? 'justify-center px-2' : ''}`}
                                                >
                                                    <Icon className="h-5 w-5 flex-shrink-0" />
                                                    {!isCollapsed && <span>{item.name}</span>}
                                                </Link>
                                            )}
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    </nav>
                </div>

                {/* Sidebar Footer */}
                <div className="mt-auto border-t border-gray-200 p-4 dark:border-gray-800">
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
                        className={`flex w-full items-center gap-2.5 rounded-lg px-4 py-2.5 font-medium text-red-600 duration-300 ease-in-out hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20 ${isCollapsed ? 'justify-center px-2' : ''}`}
                    >
                        <svg
                            className="h-5 w-5 flex-shrink-0"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                            />
                        </svg>
                        {!isCollapsed && <span>Logout</span>}
                    </button>
                </div>
            </aside>
        </>
    );
}
