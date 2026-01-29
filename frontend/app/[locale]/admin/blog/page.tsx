'use client';

import { useEffect, useState } from 'react';
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
import { Search, Plus, Edit, Trash2, Eye, Upload } from 'lucide-react';

interface Blog {
    id: number;
    title: string;
    content: string;
    cover_url: string;
    views: number;
    created_at: string;
    user: string;
    category: string;
    category_id?: number;
}

interface Category {
    id: number;
    name: string;
    type: 'project' | 'blog' | 'research' | 'career';
}

interface BlogFormData {
    title: string;
    content: string;
    cover_url: string;
    category_id: number;
}

export default function BlogManagementPage() {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
    const [formData, setFormData] = useState<BlogFormData>({
        title: '',
        content: '',
        cover_url: '',
        category_id: 0,
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const [blogsData, categoriesData] = await Promise.all([
                APIClient.getBlogs(),
                APIClient.getCategoriesByType('blog'),
            ]);
            setBlogs(blogsData);
            setCategories(categoriesData);
        } catch (error) {
            console.error('Failed to load blog data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (blogId: number) => {
        if (!confirm('Are you sure you want to delete this blog post?')) return;

        try {
            await APIClient.deleteBlog(blogId);
            setBlogs(blogs.filter((blog) => blog.id !== blogId));
        } catch (error) {
            console.error('Failed to delete blog:', error);
            alert('Failed to delete blog post');
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
    const handleOpenModal = (blog?: Blog) => {
        if (blog) {
            setEditingBlog(blog);
            setFormData({
                title: blog.title,
                content: blog.content,
                cover_url: blog.cover_url,
                category_id: blog.category_id || 0,
            });
        } else {
            setEditingBlog(null);
            setFormData({
                title: '',
                content: '',
                cover_url: '',
                category_id: categories[0]?.id || 0,
            });
        }
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingBlog(null);
        setFormData({
            title: '',
            content: '',
            cover_url: '',
            category_id: 0,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            if (editingBlog) {
                await APIClient.updateBlog(editingBlog.id, formData);
            } else {
                await APIClient.createBlog(formData);
            }
            await loadData();
            handleCloseModal();
        } catch (error) {
            console.error('Failed to save blog:', error);
            alert('Failed to save blog post');
        } finally {
            setIsSubmitting(false);
        }
    };
    const filteredBlogs = blogs.filter((blog) =>
        blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.category.toLowerCase().includes(searchQuery.toLowerCase())
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
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Blog Management</h1>
                    <p className="text-slate-600 dark:text-slate-400 mt-1">Manage your blog posts and categories</p>
                </div>
                <Button className="bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700" onClick={() => handleOpenModal()}>
                    <Plus className="w-4 h-4 mr-2" />
                    New Post
                </Button>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="articles" className="space-y-6">
                <TabsList>
                    <TabsTrigger value="articles">Articles ({blogs.length})</TabsTrigger>
                    <TabsTrigger value="categories">Categories ({categories.length})</TabsTrigger>
                </TabsList>

                {/* Articles Tab */}
                <TabsContent value="articles" className="space-y-4">
                    {/* Search */}
                    <Card className="p-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                            <Input
                                type="text"
                                placeholder="Search blog posts..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                    </Card>

                    {/* Blog Table */}
                    <Card>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Title</TableHead>
                                    <TableHead>Category</TableHead>
                                    <TableHead>Author</TableHead>
                                    <TableHead>Views</TableHead>
                                    <TableHead>Created</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredBlogs.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={6} className="text-center py-8 text-slate-500">
                                            No blog posts found
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    filteredBlogs.map((blog) => (
                                        <TableRow key={blog.id}>
                                            <TableCell className="font-medium">
                                                <div className="flex items-center space-x-3">
                                                    <img
                                                        src={blog.cover_url}
                                                        alt={blog.title}
                                                        className="w-10 h-10 rounded object-cover"
                                                    />
                                                    <span className="max-w-xs truncate">{blog.title}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant="secondary">{blog.category}</Badge>
                                            </TableCell>
                                            <TableCell>{blog.user}</TableCell>
                                            <TableCell>
                                                <div className="flex items-center space-x-1">
                                                    <Eye className="w-4 h-4 text-slate-400" />
                                                    <span>{blog.views.toLocaleString()}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                {new Date(blog.created_at).toLocaleDateString()}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex items-center justify-end space-x-2">
                                                    <Button variant="ghost" size="sm">
                                                        <Edit className="w-4 h-4" />
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => handleDelete(blog.id)}
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

                {/* Categories Tab */}
                <TabsContent value="categories" className="space-y-4">
                    <div className="flex justify-end">
                        <Button className="bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
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

            {/* Add/Edit Blog Modal */}
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent className="sm:max-w-175 max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold">
                            {editingBlog ? 'Edit Blog Post' : 'Create New Blog Post'}
                        </DialogTitle>
                        <DialogDescription>
                            {editingBlog
                                ? 'Update your blog post content and settings'
                                : 'Create a new blog post to share with your audience'}
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit}>
                        <div className="space-y-4 py-4">
                            {/* Title */}
                            <div className="space-y-2">
                                <Label htmlFor="title" className="text-sm font-medium">
                                    Title
                                </Label>
                                <Input
                                    id="title"
                                    type="text"
                                    placeholder="Enter blog post title"
                                    value={formData.title}
                                    onChange={(e) =>
                                        setFormData({ ...formData, title: e.target.value })
                                    }
                                    required
                                    className="w-full"
                                />
                            </div>

                            {/* Category */}
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

                            {/* Cover Image URL */}
                            <div className="space-y-2">
                                <Label htmlFor="cover_url" className="text-sm font-medium">
                                    Cover Image URL
                                </Label>
                                <div className="flex gap-2">
                                    <Input
                                        id="cover_url"
                                        type="url"
                                        placeholder="https://example.com/image.jpg"
                                        value={formData.cover_url}
                                        onChange={(e) =>
                                            setFormData({ ...formData, cover_url: e.target.value })
                                        }
                                        required
                                        className="flex-1"
                                    />
                                    <Button type="button" variant="outline" size="icon">
                                        <Upload className="w-4 h-4" />
                                    </Button>
                                </div>
                                {formData.cover_url && (
                                    <div className="mt-2 relative w-full h-40 rounded border overflow-hidden">
                                        <img
                                            src={formData.cover_url}
                                            alt="Preview"
                                            className="w-full h-full object-cover"
                                            onError={(e) => {
                                                e.currentTarget.src = 'https://via.placeholder.com/400x200?text=Invalid+Image';
                                            }}
                                        />
                                    </div>
                                )}
                            </div>

                            {/* Content */}
                            <div className="space-y-2">
                                <Label htmlFor="content" className="text-sm font-medium">
                                    Content
                                </Label>
                                <textarea
                                    id="content"
                                    placeholder="Write your blog post content here..."
                                    value={formData.content}
                                    onChange={(e) =>
                                        setFormData({ ...formData, content: e.target.value })
                                    }
                                    required
                                    rows={10}
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-vertical"
                                />
                                <p className="text-xs text-slate-500">
                                    Supports Markdown formatting
                                </p>
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
                                className="bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                            >
                                {isSubmitting
                                    ? 'Saving...'
                                    : editingBlog
                                    ? 'Update Post'
                                    : 'Create Post'}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}
