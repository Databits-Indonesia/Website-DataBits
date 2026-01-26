'use client';

import { useEffect, useState } from 'react';
import { APIClient } from '@/lib/api-client';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Search, Plus, Edit, Trash2, ExternalLink } from 'lucide-react';

interface Publication {
    id: number;
    title: string;
    writer: string;
    journal: string;
    desc: string;
    link: string;
    publication_date: string;
}

interface Research {
    id: number;
    title: string;
    desc: string;
    link: string;
    category_id: number;
}

export default function ResearchManagementPage() {
    const [publications, setPublications] = useState<Publication[]>([]);
    const [research, setResearch] = useState<Research[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const [publicationsData, researchData] = await Promise.all([
                APIClient.getPublications(),
                APIClient.getResearch(),
            ]);
            setPublications(publicationsData);
            setResearch(researchData);
        } catch (error) {
            console.error('Failed to load research data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDeletePublication = async (publicationId: number) => {
        if (!confirm('Are you sure you want to delete this publication?')) return;

        try {
            await APIClient.deletePublication(publicationId);
            setPublications(publications.filter((pub) => pub.id !== publicationId));
        } catch (error) {
            console.error('Failed to delete publication:', error);
            alert('Failed to delete publication');
        }
    };

    const handleDeleteResearch = async (researchId: number) => {
        if (!confirm('Are you sure you want to delete this research?')) return;

        try {
            await APIClient.deleteResearch(researchId);
            setResearch(research.filter((res) => res.id !== researchId));
        } catch (error) {
            console.error('Failed to delete research:', error);
            alert('Failed to delete research');
        }
    };

    const filteredPublications = publications.filter((pub) =>
        pub.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pub.writer.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const filteredResearch = research.filter((res) =>
        res.title.toLowerCase().includes(searchQuery.toLowerCase())
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
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Research Management</h1>
                    <p className="text-slate-600 dark:text-slate-400 mt-1">Manage publications and open source projects</p>
                </div>
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Add New
                </Button>
            </div>

            <Tabs defaultValue="publications" className="space-y-6">
                <TabsList>
                    <TabsTrigger value="publications">Publications ({publications.length})</TabsTrigger>
                    <TabsTrigger value="opensource">Open Source ({research.length})</TabsTrigger>
                </TabsList>

                <TabsContent value="publications" className="space-y-4">
                    <Card className="p-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                            <Input
                                type="text"
                                placeholder="Search publications..."
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
                                    <TableHead>Title</TableHead>
                                    <TableHead>Writer</TableHead>
                                    <TableHead>Journal</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredPublications.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={5} className="text-center py-8 text-slate-500">
                                            No publications found
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    filteredPublications.map((pub) => (
                                        <TableRow key={pub.id}>
                                            <TableCell className="font-medium max-w-xs truncate">{pub.title}</TableCell>
                                            <TableCell>{pub.writer}</TableCell>
                                            <TableCell>{pub.journal}</TableCell>
                                            <TableCell>{new Date(pub.publication_date).toLocaleDateString()}</TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex items-center justify-end space-x-2">
                                                    <Button variant="ghost" size="sm" asChild>
                                                        <a href={pub.link} target="_blank" rel="noopener noreferrer">
                                                            <ExternalLink className="w-4 h-4" />
                                                        </a>
                                                    </Button>
                                                    <Button variant="ghost" size="sm">
                                                        <Edit className="w-4 h-4" />
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => handleDeletePublication(pub.id)}
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
                </TabsContent>

                <TabsContent value="opensource" className="space-y-4">
                    <Card className="p-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                            <Input
                                type="text"
                                placeholder="Search open source projects..."
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
                                    <TableHead>Title</TableHead>
                                    <TableHead>Description</TableHead>
                                    <TableHead>Link</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredResearch.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={4} className="text-center py-8 text-slate-500">
                                            No open source projects found
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    filteredResearch.map((res) => (
                                        <TableRow key={res.id}>
                                            <TableCell className="font-medium">{res.title}</TableCell>
                                            <TableCell className="max-w-md truncate">{res.desc}</TableCell>
                                            <TableCell>
                                                <a
                                                    href={res.link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center space-x-1 text-blue-600 hover:text-blue-700"
                                                >
                                                    <span>View</span>
                                                    <ExternalLink className="w-3 h-3" />
                                                </a>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex items-center justify-end space-x-2">
                                                    <Button variant="ghost" size="sm">
                                                        <Edit className="w-4 h-4" />
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => handleDeleteResearch(res.id)}
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
                </TabsContent>
            </Tabs>
        </div>
    );
}
