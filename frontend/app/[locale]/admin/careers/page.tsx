'use client';

import { useEffect, useState } from 'react';
import { APIClient } from '@/lib/api-client';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from '@/components/ui/tabs';
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
import { Search, Plus, Edit, Trash2 } from 'lucide-react';

interface Career {
    id: number;
    position: string;
    work_mode: string;
    job_type: string;
    desc: string;
    apply_link: string;
    category: string;
}

interface Category {
    id: number;
    name: string;
    type: 'project' | 'blog' | 'research' | 'career';
}

interface CareerFormData {
    position: string;
    work_mode: string;
    job_type: string;
    desc: string;
    apply_link: string;
    category_id: number;
}

interface CategoryFormData {
    name: string;
    type: 'project' | 'blog' | 'research' | 'career';
}

export default function CareerManagementPage() {
    const [careers, setCareers] = useState<Career[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCareer, setEditingCareer] = useState<Career | null>(null);
    const [formData, setFormData] = useState<CareerFormData>({
        position: '',
        work_mode: '',
        job_type: '',
        desc: '',
        apply_link: '',
        category_id: 0,
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState<Category | null>(null);
    const [categoryForm, setCategoryForm] = useState<CategoryFormData>({
        name: '',
        type: 'career',
    });
    const [isCategorySubmitting, setIsCategorySubmitting] = useState(false);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const [careerData, categoryData] = await Promise.all([
                APIClient.getCareers(),
                APIClient.getCategoriesByType('career'),
            ]);
            setCareers(careerData);
            setCategories(categoryData);
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

    const handleDeleteCategory = async (categoryId: number) => {
        if (!confirm('Are you sure you want to delete this category?')) return;

        try {
            await APIClient.deleteCategory(categoryId);
            setCategories(categories.filter((category) => category.id !== categoryId));
        } catch (error) {
            console.error('Failed to delete category:', error);
            alert('Failed to delete category');
        }
    };

    const handleOpenModal = (career?: Career) => {
        if (career) {
            const matchedCategory = categories.find((cat) => cat.name === career.category);
            setEditingCareer(career);
            setFormData({
                position: career.position,
                work_mode: career.work_mode,
                job_type: career.job_type,
                desc: career.desc,
                apply_link: career.apply_link,
                category_id: matchedCategory?.id || categories[0]?.id || 0,
            });
        } else {
            setEditingCareer(null);
            setFormData({
                position: '',
                work_mode: '',
                job_type: '',
                desc: '',
                apply_link: '',
                category_id: categories[0]?.id || 0,
            });
        }
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingCareer(null);
        setFormData({
            position: '',
            work_mode: '',
            job_type: '',
            desc: '',
            apply_link: '',
            category_id: 0,
        });
    };

    const handleOpenCategoryModal = (category?: Category) => {
        if (category) {
            setEditingCategory(category);
            setCategoryForm({
                name: category.name,
                type: category.type,
            });
        } else {
            setEditingCategory(null);
            setCategoryForm({
                name: '',
                type: 'career',
            });
        }
        setIsCategoryModalOpen(true);
    };

    const handleCloseCategoryModal = () => {
        setIsCategoryModalOpen(false);
        setEditingCategory(null);
        setCategoryForm({
            name: '',
            type: 'career',
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            if (editingCareer) {
                await APIClient.updateCareer(editingCareer.id, formData);
            } else {
                await APIClient.createCareer(formData);
            }
            await loadData();
            handleCloseModal();
        } catch (error) {
            console.error('Failed to save career:', error);
            alert('Failed to save career');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCategorySubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsCategorySubmitting(true);

        try {
            if (editingCategory) {
                await APIClient.updateCategory(editingCategory.id, {
                    name: categoryForm.name,
                });
            } else {
                await APIClient.createCategory({
                    name: categoryForm.name,
                    type: 'career',
                });
            }
            await loadData();
            handleCloseCategoryModal();
        } catch (error) {
            console.error('Failed to save category:', error);
            alert('Failed to save category');
        } finally {
            setIsCategorySubmitting(false);
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
                <Button
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    onClick={() => handleOpenModal()}
                >
                    <Plus className="w-4 h-4 mr-2" />
                    New Position
                </Button>
            </div>

            <Tabs defaultValue="positions" className="space-y-6">
                <TabsList>
                    <TabsTrigger value="positions">Positions ({careers.length})</TabsTrigger>
                    <TabsTrigger value="categories">Categories ({categories.length})</TabsTrigger>
                </TabsList>

                <TabsContent value="positions" className="space-y-4">
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
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => handleOpenModal(career)}
                                                    >
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
                </TabsContent>

                <TabsContent value="categories" className="space-y-4">
                    <div className="flex justify-end">
                        <Button
                            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                            onClick={() => handleOpenCategoryModal()}
                        >
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
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => handleOpenCategoryModal(category)}
                                                    >
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
                <DialogContent className="sm:max-w-175 max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold">
                            {editingCareer ? 'Edit Position' : 'Create New Position'}
                        </DialogTitle>
                        <DialogDescription>
                            {editingCareer
                                ? 'Update the role details'
                                : 'Add a new career opportunity'}
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit}>
                        <div className="space-y-4 py-4">
                            <div className="space-y-2">
                                <Label htmlFor="position" className="text-sm font-medium">
                                    Position Title
                                </Label>
                                <Input
                                    id="position"
                                    type="text"
                                    placeholder="e.g. Frontend Engineer"
                                    value={formData.position}
                                    onChange={(e) =>
                                        setFormData({ ...formData, position: e.target.value })
                                    }
                                    required
                                    className="w-full"
                                />
                            </div>

                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="work_mode" className="text-sm font-medium">
                                        Work Mode
                                    </Label>
                                    <Select
                                        value={formData.work_mode}
                                        onValueChange={(value) =>
                                            setFormData({ ...formData, work_mode: value })
                                        }
                                    >
                                        <SelectTrigger id="work_mode" className="w-full">
                                            <SelectValue placeholder="Select work mode" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Remote">Remote</SelectItem>
                                            <SelectItem value="On-site">On-site</SelectItem>
                                            <SelectItem value="Hybrid">Hybrid</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="job_type" className="text-sm font-medium">
                                        Job Type
                                    </Label>
                                    <Select
                                        value={formData.job_type}
                                        onValueChange={(value) =>
                                            setFormData({ ...formData, job_type: value })
                                        }
                                    >
                                        <SelectTrigger id="job_type" className="w-full">
                                            <SelectValue placeholder="Select job type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Full-time">Full-time</SelectItem>
                                            <SelectItem value="Part-time">Part-time</SelectItem>
                                            <SelectItem value="Contract">Contract</SelectItem>
                                            <SelectItem value="Internship">Internship</SelectItem>
                                            <SelectItem value="Freelance">Freelance</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="apply_link" className="text-sm font-medium">
                                    Apply Link
                                </Label>
                                <Input
                                    id="apply_link"
                                    type="url"
                                    placeholder="https://example.com/apply"
                                    value={formData.apply_link}
                                    onChange={(e) =>
                                        setFormData({ ...formData, apply_link: e.target.value })
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
                                    placeholder="Describe responsibilities, requirements, and benefits"
                                    value={formData.desc}
                                    onChange={(e) =>
                                        setFormData({ ...formData, desc: e.target.value })
                                    }
                                    required
                                    rows={6}
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-vertical"
                                />
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
                                    : editingCareer
                                    ? 'Update Position'
                                    : 'Create Position'}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            <Dialog open={isCategoryModalOpen} onOpenChange={setIsCategoryModalOpen}>
                <DialogContent className="sm:max-w-125">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold">
                            {editingCategory ? 'Edit Category' : 'Create New Category'}
                        </DialogTitle>
                        <DialogDescription>
                            {editingCategory
                                ? 'Update the category name'
                                : 'Add a new category for careers'}
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleCategorySubmit}>
                        <div className="space-y-4 py-4">
                            <div className="space-y-2">
                                <Label htmlFor="category_name" className="text-sm font-medium">
                                    Category Name
                                </Label>
                                <Input
                                    id="category_name"
                                    type="text"
                                    placeholder="e.g. Engineering"
                                    value={categoryForm.name}
                                    onChange={(e) =>
                                        setCategoryForm({ ...categoryForm, name: e.target.value })
                                    }
                                    required
                                    className="w-full"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label className="text-sm font-medium">Type</Label>
                                <Input value="career" readOnly className="w-full" />
                            </div>
                        </div>

                        <DialogFooter className="gap-2">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={handleCloseCategoryModal}
                                disabled={isCategorySubmitting}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                disabled={isCategorySubmitting}
                                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                            >
                                {isCategorySubmitting
                                    ? 'Saving...'
                                    : editingCategory
                                    ? 'Update Category'
                                    : 'Create Category'}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}
