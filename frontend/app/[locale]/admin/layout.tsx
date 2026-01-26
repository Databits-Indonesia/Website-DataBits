'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    FileText,
    Briefcase,
    Package,
    FolderKanban,
    GraduationCap,
    Mail,
    Users,
    LogOut,
} from 'lucide-react';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarInset,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider,
    SidebarRail,
    SidebarTrigger,
} from '@/components/ui/sidebar';

const navigation = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Blog', href: '/admin/blog', icon: FileText },
    { name: 'Career', href: '/admin/careers', icon: Briefcase },
    { name: 'Products', href: '/admin/products', icon: Package },
    { name: 'Projects', href: '/admin/projects', icon: FolderKanban },
    { name: 'Research', href: '/admin/research', icon: GraduationCap },
    { name: 'Messages', href: '/admin/messages', icon: Mail },
    { name: 'Users', href: '/admin/users', icon: Users },
];

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    // Don't show layout on login page
    if (pathname === '/admin' || pathname?.endsWith('/admin')) {
        return <>{children}</>;
    }

    return (
        <SidebarProvider>
            <Sidebar>
                <SidebarHeader>
                    <Link href="/admin/dashboard" className="flex items-center space-x-2 px-2">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                            <span className="text-white font-bold text-sm">DB</span>
                        </div>
                        <span className="font-bold text-lg">DataBits</span>
                    </Link>
                </SidebarHeader>

                <SidebarContent>
                    <SidebarGroup>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {navigation.map((item) => {
                                    const isActive = pathname?.startsWith(item.href);
                                    return (
                                        <SidebarMenuItem key={item.name}>
                                            <SidebarMenuButton asChild isActive={isActive}>
                                                <Link href={item.href}>
                                                    <item.icon />
                                                    <span>{item.name}</span>
                                                </Link>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    );
                                })}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>

                <SidebarFooter>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton
                                onClick={() => {
                                    // Handle logout
                                    window.location.href = '/admin';
                                }}
                                className="text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                            >
                                <LogOut />
                                <span>Logout</span>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarFooter>

                <SidebarRail />
            </Sidebar>

            <SidebarInset>
                <div className="flex flex-col min-h-screen">
                    <header className="sticky top-0 z-30 h-16 bg-background border-b flex items-center gap-4 px-6">
                        <SidebarTrigger />

                        <div className="flex items-center space-x-4 ml-auto">
                            <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                                    <span className="text-white text-sm font-medium">A</span>
                                </div>
                                <div className="hidden sm:block">
                                    <p className="text-sm font-medium">Admin</p>
                                    <p className="text-xs text-muted-foreground">Administrator</p>
                                </div>
                            </div>
                        </div>
                    </header>

                    <main className="flex-1 p-6">
                        {children}
                    </main>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
