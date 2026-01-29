'use client';

import { useEffect, useRef, useState } from 'react';
import { APIClient } from '@/lib/api-client';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
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
import { Search, Plus, Edit, Trash2, ExternalLink, Upload } from 'lucide-react';

interface Project {
    id: number;
    title: string;
    desc: string;
    link: string;
    cover_url: string;
    category: number;
}

interface Category {
    id: number;
    name: string;
    type: 'project' | 'blog' | 'research' | 'career';
}

interface ProjectFormData {
    title: string;
    desc: string;
    link: string;
    category_id: number;
    image: File | null;
}

export default function ProjectManagementPage() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProject, setEditingProject] = useState<Project | null>(null);
    const [formData, setFormData] = useState<ProjectFormData>({
        title: '',
        desc: '',
        link: '',
        category_id: 0,
        image: null,
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [imagePreview, setImagePreview] = useState<string>('');
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const [projectsData, categoriesData] = await Promise.all([
                APIClient.getProjects(),
                APIClient.getCategoriesByType('project'),
            ]);
            setProjects(projectsData);
            setCategories(categoriesData);
        } catch (error) {
            console.error('Failed to load project data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (projectId: number) => {
        if (!confirm('Are you sure you want to delete this project?')) return;

        try {
            await APIClient.deleteProject(projectId);
            setProjects(projects.filter((project) => project.id !== projectId));
        } catch (error) {
            console.error('Failed to delete project:', error);
            alert('Failed to delete project');
        }
    };

    const handleDeleteCategory = async (categoryId: number) => {
        if (!confirm('Are you sure you want to delete this category?')) return;

        try {
            await APIClient.deleteCategory(categoryId);
            setCategories(categories.filter((cat) => cat.id !== categoryId));
        } catch (error) {
            console.error('Failed to delete category:', error);
            alert('Failed to delete category');
        }
    };

    const handleOpenModal = (project?: Project) => {
        if (project) {
            setEditingProject(project);
            setFormData({
                title: project.title,
                desc: project.desc,
                link: project.link,
                category_id: project.category,
                image: null,
            });
            setImagePreview(project.cover_url);
        } else {
            setEditingProject(null);
            setFormData({
                title: '',
                desc: '',
                link: '',
                category_id: categories[0]?.id || 0,
                image: null,
            });
            setImagePreview('');
        }
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingProject(null);
        setFormData({
            title: '',
            desc: '',
            link: '',
            category_id: 0,
            image: null,
        });
        setImagePreview('');
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            alert('Please select a valid image file');
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            alert('File size must be less than 5MB');
            return;
        }

        setFormData({ ...formData, image: file });
        setImagePreview(URL.createObjectURL(file));
    };

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            if (!editingProject && !formData.image) {
                alert('Please select a cover image');
                setIsSubmitting(false);
                return;
            }

            if (editingProject) {
                await APIClient.updateProject(editingProject.id, {
                    title: formData.title,
                    desc: formData.desc,
                    link: formData.link,
                    category_id: formData.category_id,
                    image: formData.image || undefined,
                });
            } else if (formData.image) {
                await APIClient.createProject({
                    title: formData.title,
                    desc: formData.desc,
                    link: formData.link,
                    category_id: formData.category_id,
                    image: formData.image,
                });
            }

            await loadData();
            handleCloseModal();
        } catch (error) {
            console.error('Failed to save project:', error);
            alert('Failed to save project');
        } finally {
            setIsSubmitting(false);
        }
    };

    const filteredProjects = projects.filter((project) =>
        project.title.toLowerCase().includes(searchQuery.toLowerCase())
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
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Project Management</h1>
                    <p className="text-slate-600 dark:text-slate-400 mt-1">Manage your projects and categories</p>
                </div>
                <Button
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    onClick={() => handleOpenModal()}
                >
                    <Plus className="w-4 h-4 mr-2" />
                    New Project
                </Button>
            </div>

            <Tabs defaultValue="projects" className="space-y-6">
                <TabsList>
                    <TabsTrigger value="projects">Projects ({projects.length})</TabsTrigger>
                    <TabsTrigger value="categories">Categories ({categories.length})</TabsTrigger>
                </TabsList>

                <TabsContent value="projects" className="space-y-4">
                    <Card className="p-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                            <Input
                                type="text"
                                placeholder="Search projects..."
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
                                    <TableHead>Project</TableHead>
                                    <TableHead>Description</TableHead>
                                    <TableHead>Link</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredProjects.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={4} className="text-center py-8 text-slate-500">
                                            No projects found
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    filteredProjects.map((project) => (
                                        <TableRow key={project.id}>
                                            <TableCell className="font-medium">
                                                <div className="flex items-center space-x-3">
                                                    <img
                                                        src={project.cover_url}
                                                        alt={project.title}
                                                        className="w-10 h-10 rounded object-cover"
                                                    />
                                                    <span>{project.title}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="max-w-md truncate">{project.desc}</TableCell>
                                            <TableCell>
                                                <a
                                                    href={project.link}
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
                                                        onClick={() => handleOpenModal(project)}
                                                    >
                                                        <Edit className="w-4 h-4" />
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => handleDelete(project.id)}
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

                <TabsContent value="categories" className="space-y-4">
                    <div className="flex justify-end">
                        <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                            <Plus className="w-4 h-4 mr-2" />
                            New Category
                        </Button>
                    </div>

                    <Card>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Category Name</TableHead>
                                    <TableHead>Type</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {categories.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={3} className="text-center py-8 text-slate-500">
                                            No categories found
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    categories.map((category) => (
                                        <TableRow key={category.id}>
                                            <TableCell className="font-medium">{category.name}</TableCell>
                                            <TableCell>
                                                <Badge>{category.type}</Badge>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex items-center justify-end space-x-2">
                                                    <Button variant="ghost" size="sm">
                                                        <Edit className="w-4 h-4" />
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => handleDeleteCategory(category.id)}
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

            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent className="sm:max-w-150 max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold">
                            {editingProject ? 'Edit Project' : 'Create New Project'}
                        </DialogTitle>
                        <DialogDescription>
                            {editingProject
                                ? 'Update project details and cover image'
                                : 'Add a new project to showcase your work'}
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit}>
                        <div className="space-y-4 py-4">
                            <div className="space-y-2">
                                <Label htmlFor="title" className="text-sm font-medium">
                                    Project Title
                                </Label>
                                <Input
                                    id="title"
                                    type="text"
                                    placeholder="Enter project title"
                                    value={formData.title}
                                    onChange={(e) =>
                                        setFormData({ ...formData, title: e.target.value })
                                    }
                                    required
                                    className="w-full"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="link" className="text-sm font-medium">
                                    Project Link
                                </Label>
                                <Input
                                    id="link"
                                    type="url"
                                    placeholder="https://example.com"
                                    value={formData.link}
                                    onChange={(e) =>
                                        setFormData({ ...formData, link: e.target.value })
                                    }
                                    required
                                    className="w-full"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="category" className="text-sm font-medium">
                                    Category
                                </Label>
                                <Select
                                    value={formData.category_id.toString()}
                                    onValueChange={(value) =>
                                        setFormData({ ...formData, category_id: parseInt(value) })
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
                                <Label htmlFor="desc" className="text-sm font-medium">
                                    Description
                                </Label>
                                <textarea
                                    id="desc"
                                    placeholder="Describe your project"
                                    value={formData.desc}
                                    onChange={(e) =>
                                        setFormData({ ...formData, desc: e.target.value })
                                    }
                                    required
                                    rows={5}
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-vertical"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="image" className="text-sm font-medium">
                                    Cover Image
                                </Label>
                                <div className="flex gap-2">
                                    <Input
                                        id="image"
                                        type="text"
                                        readOnly
                                        placeholder={
                                            formData.image ? formData.image.name : 'Select an image file'
                                        }
                                        className="flex-1"
                                    />
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="icon"
                                        onClick={handleUploadClick}
                                    >
                                        <Upload className="w-4 h-4" />
                                    </Button>
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="hidden"
                                    />
                                </div>
                                {imagePreview && (
                                    <div className="mt-2 relative w-full h-40 rounded border overflow-hidden">
                                        <img
                                            src={imagePreview}
                                            alt="Project cover preview"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                )}
                                {!editingProject && (
                                    <p className="text-xs text-slate-500">
                                        Required for new projects. Max size 5MB.
                                    </p>
                                )}
                            </div>
                        </div>

                        <DialogFooter className="gap-2">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={handleCloseModal}
                                disabled={isSubmitting}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                            >
                                {isSubmitting
                                    ? 'Saving...'
                                    : editingProject
                                    ? 'Update Project'
                                    : 'Create Project'}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}
