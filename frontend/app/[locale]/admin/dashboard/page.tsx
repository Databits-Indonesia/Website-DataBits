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

            setStats({
                users: userCount.total_users,
                blogs: blogCount.total_blogs,
                products: productCount.total_product,
                projects: projectCount.total_projects,
                careers: careerCount.total_careers,
                messages: messageCount.total_messages,
                publications: publicationCount.total_publications,
                research: researchCount.total_research,
            });

            setActivities(activityData.slice(0, 10));
        } catch (error) {
            console.error('Failed to load dashboard data:', error);
        } finally {
            setLoading(false);
        }
    };

    const statCards = [
        { label: 'Total Users', value: stats.users, icon: Users, trend: { value: 0.43, isPositive: true } },
        { label: 'Blog Posts', value: stats.blogs, icon: FileText, trend: { value: 4.35, isPositive: true } },
        { label: 'Products', value: stats.products, icon: Package, trend: { value: 2.59, isPositive: true } },
        { label: 'Projects', value: stats.projects, icon: FolderKanban, trend: { value: 0.95, isPositive: false } },
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
                <ChartOne />

                {/* Activity Feed reusing the space efficiently */}
                <div className="col-span-12 xl:col-span-4 rounded-sm border border-stroke bg-white p-6 shadow-default dark:border-strokedark dark:bg-boxdark">
                    <h4 className="mb-6 px-7.5 text-xl font-semibold text-black dark:text-white">
                        Recent Activity
                    </h4>

                    <div className="flex flex-col gap-5">
                        {activities.length === 0 ? (
                            <p className="text-gray-500 text-center py-4">No recent activity</p>
                        ) : (
                            activities.slice(0, 6).map((activity) => (
                                <div key={activity.id} className="flex items-center gap-3 px-7.5">
                                    <div className="relative h-10 w-10 rounded-full bg-meta-2 dark:bg-meta-4">
                                        <div className="absolute inset-0 flex items-center justify-center text-sm font-bold text-blue-600">
                                            {activity.user ? activity.user.charAt(0).toUpperCase() : 'S'}
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-black dark:text-white">
                                            {activity.description}
                                        </p>
                                        <span className="text-xs text-gray-500">
                                            {new Date(activity.created_at).toLocaleTimeString()}
                                        </span>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
