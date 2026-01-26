'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import AdminSidebar from '@/components/admin/Sidebar';
import AdminHeader from '@/components/admin/Header';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const [sidebarOpen, setSidebarOpen] = React.useState(false);
    const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);

    // Don't show layout on login page
    if (pathname === '/admin' || pathname?.endsWith('/admin')) {
        return <>{children}</>;
    }

    const toggleSidebar = () => {
        // Simple breakpoint check for large screens (lg in Typescript)
        // Adjust 1024 to match your Tailwind lg breakpoint
        if (window.innerWidth >= 1024) {
            setSidebarCollapsed(!sidebarCollapsed);
        } else {
            setSidebarOpen(!sidebarOpen);
        }
    };

    return (
        <div className="dark:bg-gray-900 dark:text-white">
            {/* Page Wrapper */}
            <div className="flex h-screen overflow-hidden">
                {/* Sidebar */}
                <AdminSidebar
                    isOpen={sidebarOpen}
                    onClose={() => setSidebarOpen(false)}
                    isCollapsed={sidebarCollapsed}
                />

                {/* Content Area */}
                <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
                    {/* Header */}
                    <AdminHeader onMenuClick={toggleSidebar} />

                    {/* Main Content */}
                    <main className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                        {children}
                    </main>
                </div>
            </div>
        </div>
    );
}
