'use client';

import { useEffect, useState } from 'react';
import { APIClient } from '@/lib/api-client';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
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

interface PublicationFormData {
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

interface Category {
    id: number;
    name: string;
    type: 'project' | 'blog' | 'research' | 'career';
}

interface ResearchFormData {
    title: string;
    desc: string;
    link: string;
    category_id: number;
}

export default function ResearchManagementPage() {
    const [publications, setPublications] = useState<Publication[]>([]);
    const [research, setResearch] = useState<Research[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [isPublicationModalOpen, setIsPublicationModalOpen] = useState(false);
    const [editingPublication, setEditingPublication] = useState<Publication | null>(null);
    const [publicationFormData, setPublicationFormData] = useState<PublicationFormData>({
        title: '',
        writer: '',
        journal: '',
        desc: '',
        link: '',
        publication_date: '',
    });
    const [isPublicationSubmitting, setIsPublicationSubmitting] = useState(false);
    const [isResearchModalOpen, setIsResearchModalOpen] = useState(false);
    const [editingResearch, setEditingResearch] = useState<Research | null>(null);
    const [researchFormData, setResearchFormData] = useState<ResearchFormData>({
        title: '',
        desc: '',
        link: '',
        category_id: 0,
    });
    const [isResearchSubmitting, setIsResearchSubmitting] = useState(false);

    const formatDateInputValue = (value: string) => {
        if (!value) return '';
        if (value.length >= 10) return value.slice(0, 10);
        const date = new Date(value);
        if (Number.isNaN(date.getTime())) return '';
        return date.toISOString().slice(0, 10);
    };

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const [publicationsData, researchData, categoriesData] = await Promise.all([
                APIClient.getPublications(),
                APIClient.getResearch(),
                APIClient.getCategoriesByType('research'),
            ]);
            setPublications(publicationsData);
            setResearch(researchData);
            setCategories(categoriesData);
        } catch (error) {
            console.error('Failed to load research data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleOpenResearchModal = (researchItem?: Research) => {
        if (researchItem) {
            setEditingResearch(researchItem);
            setResearchFormData({
                title: researchItem.title,
                desc: researchItem.desc,
                link: researchItem.link,
                category_id: researchItem.category_id,
            });
        } else {
            setEditingResearch(null);
            setResearchFormData({
                title: '',
                desc: '',
                link: '',
                category_id: categories[0]?.id || 0,
            });
        }
        setIsResearchModalOpen(true);
    };

    const handleOpenPublicationModal = (publicationItem?: Publication) => {
        if (publicationItem) {
            setEditingPublication(publicationItem);
            setPublicationFormData({
                title: publicationItem.title,
                writer: publicationItem.writer,
                journal: publicationItem.journal,
                desc: publicationItem.desc,
                link: publicationItem.link,
                publication_date: formatDateInputValue(publicationItem.publication_date),
            });
        } else {
            setEditingPublication(null);
            setPublicationFormData({
                title: '',
                writer: '',
                journal: '',
                desc: '',
                link: '',
                publication_date: '',
            });
        }
        setIsPublicationModalOpen(true);
    };

    const handleClosePublicationModal = () => {
        setIsPublicationModalOpen(false);
        setEditingPublication(null);
        setPublicationFormData({
            title: '',
            writer: '',
            journal: '',
            desc: '',
            link: '',
            publication_date: '',
        });
    };

    const handleCloseResearchModal = () => {
        setIsResearchModalOpen(false);
        setEditingResearch(null);
        setResearchFormData({
            title: '',
            desc: '',
            link: '',
            category_id: 0,
        });
    };

    const handleSubmitResearch = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsResearchSubmitting(true);

        try {
            if (editingResearch) {
                await APIClient.updateResearch(editingResearch.id, {
                    title: researchFormData.title,
                    desc: researchFormData.desc,
                    link: researchFormData.link,
                    category_id: researchFormData.category_id,
                });
            } else {
                await APIClient.createResearch({
                    title: researchFormData.title,
                    desc: researchFormData.desc,
                    link: researchFormData.link,
                    category_id: researchFormData.category_id,
                });
            }

            await loadData();
            handleCloseResearchModal();
        } catch (error) {
            console.error('Failed to save research:', error);
            alert('Failed to save research');
        } finally {
            setIsResearchSubmitting(false);
        }
    };

    const handleSubmitPublication = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsPublicationSubmitting(true);

        try {
            if (editingPublication) {
                await APIClient.updatePublication(editingPublication.id, {
                    title: publicationFormData.title,
                    writer: publicationFormData.writer,
                    journal: publicationFormData.journal,
                    desc: publicationFormData.desc,
                    link: publicationFormData.link,
                    publication_date: publicationFormData.publication_date,
                });
            } else {
                await APIClient.createPublication({
                    title: publicationFormData.title,
                    writer: publicationFormData.writer,
                    journal: publicationFormData.journal,
                    desc: publicationFormData.desc,
                    link: publicationFormData.link,
                    publication_date: publicationFormData.publication_date,
                });
            }

            await loadData();
            handleClosePublicationModal();
        } catch (error) {
            console.error('Failed to save publication:', error);
            alert('Failed to save publication');
        } finally {
            setIsPublicationSubmitting(false);
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
                <Button className="btn btn-primary" onClick={() => handleOpenResearchModal()}>
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
                    <div className="flex justify-end">
                        <Button className="btn btn-primary" onClick={() => handleOpenPublicationModal()}>
                            <Plus className="w-4 h-4 mr-2" />
                            New Publication
                        </Button>
                    </div>
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
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => handleOpenPublicationModal(pub)}
                                                    >
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
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => handleOpenResearchModal(res)}
                                                    >
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

            <Dialog open={isPublicationModalOpen} onOpenChange={setIsPublicationModalOpen}>
                <DialogContent className="sm:max-w-150 max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold">
                            {editingPublication ? 'Edit Publication' : 'Create New Publication'}
                        </DialogTitle>
                        <DialogDescription>
                            {editingPublication
                                ? 'Update publication details'
                                : 'Add a new publication'}
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmitPublication}>
                        <div className="space-y-4 py-4">
                            <div className="space-y-2">
                                <Label htmlFor="publication-title" className="text-sm font-medium">
                                    Title
                                </Label>
                                <Input
                                    id="publication-title"
                                    type="text"
                                    placeholder="Enter publication title"
                                    value={publicationFormData.title}
                                    onChange={(e) =>
                                        setPublicationFormData({
                                            ...publicationFormData,
                                            title: e.target.value,
                                        })
                                    }
                                    required
                                    className="w-full"
                                />
                            </div>

                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="publication-writer" className="text-sm font-medium">
                                        Writer
                                    </Label>
                                    <Input
                                        id="publication-writer"
                                        type="text"
                                        placeholder="Enter writer name"
                                        value={publicationFormData.writer}
                                        onChange={(e) =>
                                            setPublicationFormData({
                                                ...publicationFormData,
                                                writer: e.target.value,
                                            })
                                        }
                                        required
                                        className="w-full"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="publication-journal" className="text-sm font-medium">
                                        Journal
                                    </Label>
                                    <Input
                                        id="publication-journal"
                                        type="text"
                                        placeholder="Enter journal name"
                                        value={publicationFormData.journal}
                                        onChange={(e) =>
                                            setPublicationFormData({
                                                ...publicationFormData,
                                                journal: e.target.value,
                                            })
                                        }
                                        required
                                        className="w-full"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="publication-link" className="text-sm font-medium">
                                    Link
                                </Label>
                                <Input
                                    id="publication-link"
                                    type="url"
                                    placeholder="https://example.com"
                                    value={publicationFormData.link}
                                    onChange={(e) =>
                                        setPublicationFormData({
                                            ...publicationFormData,
                                            link: e.target.value,
                                        })
                                    }
                                    required
                                    className="w-full"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="publication-date" className="text-sm font-medium">
                                    Publication Date
                                </Label>
                                <Input
                                    id="publication-date"
                                    type="date"
                                    value={publicationFormData.publication_date}
                                    onChange={(e) =>
                                        setPublicationFormData({
                                            ...publicationFormData,
                                            publication_date: e.target.value,
                                        })
                                    }
                                    required
                                    className="w-full"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="publication-desc" className="text-sm font-medium">
                                    Description
                                </Label>
                                <textarea
                                    id="publication-desc"
                                    placeholder="Describe the publication"
                                    value={publicationFormData.desc}
                                    onChange={(e) =>
                                        setPublicationFormData({
                                            ...publicationFormData,
                                            desc: e.target.value,
                                        })
                                    }
                                    required
                                    rows={5}
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-vertical"
                                />
                            </div>
                        </div>

                        <DialogFooter className="gap-2">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={handleClosePublicationModal}
                                disabled={isPublicationSubmitting}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                disabled={isPublicationSubmitting}
                                className="btn btn-primary"
                            >
                                {isPublicationSubmitting
                                    ? 'Saving...'
                                    : editingPublication
                                    ? 'Update Publication'
                                    : 'Create Publication'}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            <Dialog open={isResearchModalOpen} onOpenChange={setIsResearchModalOpen}>
                <DialogContent className="sm:max-w-150 max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold">
                            {editingResearch ? 'Edit Research' : 'Create New Research'}
                        </DialogTitle>
                        <DialogDescription>
                            {editingResearch
                                ? 'Update research details'
                                : 'Add a new research project'}
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmitResearch}>
                        <div className="space-y-4 py-4">
                            <div className="space-y-2">
                                <Label htmlFor="research-title" className="text-sm font-medium">
                                    Title
                                </Label>
                                <Input
                                    id="research-title"
                                    type="text"
                                    placeholder="Enter research title"
                                    value={researchFormData.title}
                                    onChange={(e) =>
                                        setResearchFormData({
                                            ...researchFormData,
                                            title: e.target.value,
                                        })
                                    }
                                    required
                                    className="w-full"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="research-link" className="text-sm font-medium">
                                    Link
                                </Label>
                                <Input
                                    id="research-link"
                                    type="url"
                                    placeholder="https://example.com"
                                    value={researchFormData.link}
                                    onChange={(e) =>
                                        setResearchFormData({
                                            ...researchFormData,
                                            link: e.target.value,
                                        })
                                    }
                                    required
                                    className="w-full"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="research-category" className="text-sm font-medium">
                                    Category
                                </Label>
                                <Select
                                    value={researchFormData.category_id.toString()}
                                    onValueChange={(value) =>
                                        setResearchFormData({
                                            ...researchFormData,
                                            category_id: parseInt(value),
                                        })
                                    }
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {categories.map((category) => (
                                            <SelectItem key={category.id} value={category.id.toString()}>
                                                {category.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="research-desc" className="text-sm font-medium">
                                    Description
                                </Label>
                                <textarea
                                    id="research-desc"
                                    placeholder="Describe your research"
                                    value={researchFormData.desc}
                                    onChange={(e) =>
                                        setResearchFormData({
                                            ...researchFormData,
                                            desc: e.target.value,
                                        })
                                    }
                                    required
                                    rows={5}
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-vertical"
                                />
                            </div>
                        </div>

                        <DialogFooter className="gap-2">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={handleCloseResearchModal}
                                disabled={isResearchSubmitting}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                disabled={isResearchSubmitting}
                                className="btn btn-primary"
                            >
                                {isResearchSubmitting
                                    ? 'Saving...'
                                    : editingResearch
                                    ? 'Update Research'
                                    : 'Create Research'}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}
