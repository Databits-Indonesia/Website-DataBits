'use client';

import { useEffect, useState } from 'react';
import { APIClient } from '@/lib/api-client';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Search, Plus, Edit, Trash2, ExternalLink } from 'lucide-react';

interface Product {
    id: number;
    name: string;
    desc: string;
    link: string;
    icon: string;
}

interface ProductFormData {
    name: string;
    desc: string;
    link: string;
    icon: string;
}

export default function ProductManagementPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [formData, setFormData] = useState<ProductFormData>({
        name: '',
        desc: '',
        link: '',
        icon: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const data = await APIClient.getProducts();
            setProducts(data);
        } catch (error) {
            console.error('Failed to load product data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (productId: number) => {
        if (!confirm('Are you sure you want to delete this product?')) return;

        try {
            await APIClient.deleteProduct(productId);
            setProducts(products.filter((product) => product.id !== productId));
        } catch (error) {
            console.error('Failed to delete product:', error);
            alert('Failed to delete product');
        }
    };

    const handleOpenModal = (product?: Product) => {
        if (product) {
            setEditingProduct(product);
            setFormData({
                name: product.name,
                desc: product.desc,
                link: product.link,
                icon: product.icon,
            });
        } else {
            setEditingProduct(null);
            setFormData({
                name: '',
                desc: '',
                link: '',
                icon: '',
            });
        }
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingProduct(null);
        setFormData({
            name: '',
            desc: '',
            link: '',
            icon: '',
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            if (editingProduct) {
                await APIClient.updateProduct(editingProduct.id, formData);
            } else {
                await APIClient.createProduct(formData);
            }
            await loadData();
            handleCloseModal();
        } catch (error) {
            console.error('Failed to save product:', error);
            alert('Failed to save product');
        } finally {
            setIsSubmitting(false);
        }
    };

    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
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
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Product Management</h1>
                    <p className="text-slate-600 dark:text-slate-400 mt-1">Manage your products</p>
                </div>
                <Button
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    onClick={() => handleOpenModal()}
                >
                    <Plus className="w-4 h-4 mr-2" />
                    New Product
                </Button>
            </div>

            <Card className="p-4">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <Input
                        type="text"
                        placeholder="Search products..."
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
                            <TableHead>Product Name</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead>Link</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredProducts.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center py-8 text-slate-500">
                                    No products found
                                </TableCell>
                            </TableRow>
                        ) : (
                            filteredProducts.map((product) => (
                                <TableRow key={product.id}>
                                    <TableCell className="font-medium">
                                        <div className="flex items-center space-x-2">
                                            <span className="material-symbols-outlined text-2xl leading-none">
                                                {product.icon}
                                            </span>
                                            <span>{product.name}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="max-w-md truncate">{product.desc}</TableCell>
                                    <TableCell>
                                        <a
                                            href={product.link}
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
                                                onClick={() => handleOpenModal(product)}
                                            >
                                                <Edit className="w-4 h-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => handleDelete(product.id)}
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

            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent className="sm:max-w-150 max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold">
                            {editingProduct ? 'Edit Product' : 'Create New Product'}
                        </DialogTitle>
                        <DialogDescription>
                            {editingProduct
                                ? 'Update product details'
                                : 'Add a new product to your catalog'}
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit}>
                        <div className="space-y-4 py-4">
                            <div className="space-y-2">
                                <Label htmlFor="name" className="text-sm font-medium">
                                    Product Name
                                </Label>
                                <Input
                                    id="name"
                                    type="text"
                                    placeholder="Enter product name"
                                    value={formData.name}
                                    onChange={(e) =>
                                        setFormData({ ...formData, name: e.target.value })
                                    }
                                    required
                                    className="w-full"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="link" className="text-sm font-medium">
                                    Product Link
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
                                <Label htmlFor="icon" className="text-sm font-medium">
                                    Icon (emoji)
                                </Label>
                                <div className="flex items-center gap-3">
                                    <Input
                                        id="icon"
                                        type="text"
                                        placeholder="🚀"
                                        value={formData.icon}
                                        onChange={(e) =>
                                            setFormData({ ...formData, icon: e.target.value })
                                        }
                                        required
                                        className="flex-1"
                                    />
                                    <div className="w-10 h-10 rounded border flex items-center justify-center text-2xl">
                                        <span className="material-symbols-outlined leading-none">
                                            {formData.icon || 'help'}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="desc" className="text-sm font-medium">
                                    Description
                                </Label>
                                <textarea
                                    id="desc"
                                    placeholder="Describe your product"
                                    value={formData.desc}
                                    onChange={(e) =>
                                        setFormData({ ...formData, desc: e.target.value })
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
                                    : editingProduct
                                    ? 'Update Product'
                                    : 'Create Product'}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}
