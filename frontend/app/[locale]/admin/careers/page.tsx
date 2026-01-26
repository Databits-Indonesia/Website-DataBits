'use client';

import { useEffect, useState } from 'react';
import { APIClient } from '@/lib/api-client';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Search, Plus, Edit, Trash2 } from 'lucide-react';

interface Career {
    id: number;
    position: string;
    work_mode: string;
    job_type: string;
    desc: string;
    apply_link: string;
    category: number;
}

export default function CareerManagementPage() {
    const [careers, setCareers] = useState<Career[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const data = await APIClient.getCareers();
            setCareers(data);
        } catch (error) {
            console.error('Failed to load career data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (careerId: number) => {
        if (!confirm('Are you sure you want to delete this position?')) return;

        try {
            await APIClient.deleteCareer(careerId);
            setCareers(careers.filter((career) => career.id !== careerId));
        } catch (error) {
            console.error('Failed to delete career:', error);
            alert('Failed to delete position');
        }
    };

    const filteredCareers = careers.filter((career) =>
        career.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
        career.work_mode.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (loading) {
        return (
            <div className="flex items-center justify-center h-96">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Career Management</h1>
                    <p className="text-slate-600 dark:text-slate-400 mt-1">Manage open positions</p>
                </div>
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    <Plus className="w-4 h-4 mr-2" />
                    New Position
                </Button>
            </div>

            <Card className="p-4">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <Input
                        type="text"
                        placeholder="Search positions..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                    />
                </div>
            </Card>

            <Card>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Position</TableHead>
                            <TableHead>Work Mode</TableHead>
                            <TableHead>Job Type</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredCareers.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center py-8 text-slate-500">
                                    No positions found
                                </TableCell>
                            </TableRow>
                        ) : (
                            filteredCareers.map((career) => (
                                <TableRow key={career.id}>
                                    <TableCell className="font-medium">{career.position}</TableCell>
                                    <TableCell>
                                        <Badge variant="secondary">{career.work_mode}</Badge>
                                    </TableCell>
                                    <TableCell>
                                        <Badge>{career.job_type}</Badge>
                                    </TableCell>
                                    <TableCell className="max-w-xs truncate">{career.desc}</TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex items-center justify-end space-x-2">
                                            <Button variant="ghost" size="sm">
                                                <Edit className="w-4 h-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => handleDelete(career.id)}
                                                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </Card>
        </div>
    );
}
