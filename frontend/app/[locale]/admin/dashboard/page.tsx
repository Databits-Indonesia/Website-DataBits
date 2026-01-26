'use client';

import { useEffect, useState } from 'react';
import { APIClient } from '@/lib/api-client';
import { Card } from '@/components/ui/card';
import {
    Users,
    FileText,
    Package,
    FolderKanban,
    Briefcase,
    Mail,
    GraduationCap,
    TrendingUp
} from 'lucide-react';

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

            setActivities(activityData.slice(0, 10)); // Show latest 10 activities
        } catch (error) {
            console.error('Failed to load dashboard data:', error);
        } finally {
            setLoading(false);
        }
    };

    const statCards = [
        { label: 'Total Users', value: stats.users, icon: Users, color: 'from-blue-500 to-blue-600' },
        { label: 'Blog Posts', value: stats.blogs, icon: FileText, color: 'from-purple-500 to-purple-600' },
        { label: 'Products', value: stats.products, icon: Package, color: 'from-green-500 to-green-600' },
        { label: 'Projects', value: stats.projects, icon: FolderKanban, color: 'from-orange-500 to-orange-600' },
        { label: 'Open Positions', value: stats.careers, icon: Briefcase, color: 'from-pink-500 to-pink-600' },
        { label: 'Messages', value: stats.messages, icon: Mail, color: 'from-red-500 to-red-600' },
        { label: 'Publications', value: stats.publications, icon: GraduationCap, color: 'from-indigo-500 to-indigo-600' },
        { label: 'Research', value: stats.research, icon: TrendingUp, color: 'from-teal-500 to-teal-600' },
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
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Dashboard</h1>
                <p className="text-slate-600 dark:text-slate-400 mt-1">Welcome back! Here's what's happening.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((stat) => (
                    <Card key={stat.label} className="p-6 hover:shadow-lg transition-shadow">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">{stat.label}</p>
                                <p className="text-3xl font-bold text-slate-900 dark:text-white mt-2">{stat.value}</p>
                            </div>
                            <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                                <stat.icon className="w-6 h-6 text-white" />
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            {/* Activity Log */}
            <Card className="p-6">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Recent Activity</h2>
                <div className="space-y-4">
                    {activities.length === 0 ? (
                        <p className="text-slate-500 dark:text-slate-400 text-center py-8">No recent activity</p>
                    ) : (
                        activities.map((activity) => (
                            <div
                                key={activity.id}
                                className="flex items-start space-x-4 p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                            >
                                <div className="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-blue-600"></div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-slate-900 dark:text-white">
                                        {activity.description}
                                    </p>
                                    <div className="flex items-center space-x-2 mt-1">
                                        <span className="text-xs text-slate-500 dark:text-slate-400">
                                            {activity.user || 'System'}
                                        </span>
                                        <span className="text-xs text-slate-400 dark:text-slate-500">•</span>
                                        <span className="text-xs text-slate-500 dark:text-slate-400">
                                            {new Date(activity.created_at).toLocaleString()}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex-shrink-0">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${activity.action === 'create' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                                            activity.action === 'update' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' :
                                                'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                                        }`}>
                                        {activity.action}
                                    </span>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </Card>
        </div>
    );
}
