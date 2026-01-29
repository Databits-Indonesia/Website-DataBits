'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { APIClient } from '@/lib/api-client';
import StatCard from '@/components/admin/StatCard';
import {
    Users,
    FileText,
    Package,
    FolderKanban
} from 'lucide-react';

const ChartOne = dynamic(() => import('@/components/admin/Charts/ChartOne'), {
    ssr: false,
});

interface Stats {
    users: number;
    blogs: number;
    products: number;
    projects: number;
    careers: number;
    messages: number;
    publications: number;
    research: number;
}

interface Activity {
    id: number;
    user: string | null;
    module: string;
    action: string;
    object_id: number;
    description: string;
    created_at: string;
}

export default function AdminDashboard() {
    const [stats, setStats] = useState<Stats>({
        users: 0,
        blogs: 0,
        products: 0,
        projects: 0,
        careers: 0,
        messages: 0,
        publications: 0,
        research: 0,
    });
    const [prevStats, setPrevStats] = useState<Stats>({
        users: 0,
        blogs: 0,
        products: 0,
        projects: 0,
        careers: 0,
        messages: 0,
        publications: 0,
        research: 0,
    });
    const [activities, setActivities] = useState<Activity[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadDashboardData();
    }, []);

    const loadDashboardData = async () => {
        try {
            const [
                userCount,
                blogCount,
                productCount,
                projectCount,
                careerCount,
                messageCount,
                publicationCount,
                researchCount,
                activityData,
            ] = await Promise.all([
                APIClient.getUserCount(),
                APIClient.getBlogCount(),
                APIClient.getProductCount(),
                APIClient.getProjectCount(),
                APIClient.getCareerCount(),
                APIClient.getMessageCount(),
                APIClient.getPublicationCount(),
                APIClient.getResearchCount(),
                APIClient.getActivities(),
            ]);

            const nextStats = {
                users: userCount.total_users,
                blogs: blogCount.total_blogs,
                products: productCount.total_product,
                projects: projectCount.total_projects,
                careers: careerCount.total_careers,
                messages: messageCount.total_messages,
                publications: publicationCount.total_publications,
                research: researchCount.total_research,
            };

            setPrevStats(stats);
            setStats(nextStats);

            setActivities(activityData.slice(0, 10));
        } catch (error) {
            console.error('Failed to load dashboard data:', error);
        } finally {
            setLoading(false);
        }
    };

    const calculateTrend = (current: number, previous: number) => {
        if (previous === 0) {
            return {
                value: current === 0 ? 0 : 100,
                isPositive: current >= previous,
            };
        }

        const change = ((current - previous) / previous) * 100;
        return {
            value: Number(Math.abs(change).toFixed(2)),
            isPositive: change >= 0,
        };
    };

    const statCards = [
        { label: 'Total Users', value: stats.users, icon: Users, trend: calculateTrend(stats.users, prevStats.users) },
        { label: 'Blog Posts', value: stats.blogs, icon: FileText, trend: calculateTrend(stats.blogs, prevStats.blogs) },
        { label: 'Products', value: stats.products, icon: Package, trend: calculateTrend(stats.products, prevStats.products) },
        { label: 'Projects', value: stats.projects, icon: FolderKanban, trend: calculateTrend(stats.projects, prevStats.projects) },
    ];

    if (loading) {
        return (
            <div className="flex items-center justify-center h-96">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 xl:gap-8">
                {statCards.map((stat, index) => (
                    <StatCard
                        key={index}
                        title={stat.label}
                        value={stat.value.toString()}
                        icon={stat.icon}
                        trend={stat.trend}
                    />
                ))}
            </div>

            <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
                {/* <ChartOne /> */}

                {/* Activity Feed */}
                <div className="col-span-12 rounded-sm border border-stroke bg-white p-6 shadow-default dark:border-gray-800 dark:bg-gray-900">
                    <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
                        Recent Activity
                    </h4>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-200 dark:border-gray-800">
                                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-400">User</th>
                                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-400">Module</th>
                                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-400">Action</th>
                                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-400">Description</th>
                                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-400">Time</th>
                                </tr>
                            </thead>
                            <tbody>
                                {activities.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="px-4 py-6 text-center text-gray-500">
                                            No recent activity
                                        </td>
                                    </tr>
                                ) : (
                                    activities.slice(0, 10).map((activity) => (
                                        <tr key={activity.id} className="border-b border-gray-100 hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-800/50">
                                            <td className="px-4 py-3">
                                                <div className="flex items-center gap-2">
                                                    <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                                                        <span className="text-xs font-bold text-blue-600 dark:text-blue-400">
                                                            {activity.user ? activity.user.charAt(0).toUpperCase() : 'S'}
                                                        </span>
                                                    </div>
                                                    <span className="text-sm font-medium text-black dark:text-white">
                                                        {activity.user || 'System'}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3">
                                                <span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                                                    {activity.module}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3">
                                                <span className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${
                                                    activity.action === 'create' ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' :
                                                    activity.action === 'update' ? 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400' :
                                                    activity.action === 'delete' ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400' :
                                                    'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
                                                }`}>
                                                    {activity.action}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400 max-w-xs truncate">
                                                {activity.description}
                                            </td>
                                            <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
                                                {new Date(activity.created_at).toLocaleTimeString()}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
