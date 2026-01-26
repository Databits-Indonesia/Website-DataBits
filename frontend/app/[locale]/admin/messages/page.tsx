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
import { Search, Trash2, Mail } from 'lucide-react';

interface Message {
    id: number;
    name: string;
    email: string;
    subject: string;
    company: string;
    message_content: string;
}

export default function MessageManagementPage() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const data = await APIClient.getMessages();
            setMessages(data);
        } catch (error) {
            console.error('Failed to load messages:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (messageId: number) => {
        if (!confirm('Are you sure you want to delete this message?')) return;

        try {
            await APIClient.deleteMessage(messageId);
            setMessages(messages.filter((msg) => msg.id !== messageId));
            if (selectedMessage?.id === messageId) {
                setSelectedMessage(null);
            }
        } catch (error) {
            console.error('Failed to delete message:', error);
            alert('Failed to delete message');
        }
    };

    const filteredMessages = messages.filter((msg) =>
        msg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        msg.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        msg.subject.toLowerCase().includes(searchQuery.toLowerCase())
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
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Messages</h1>
                    <p className="text-slate-600 dark:text-slate-400 mt-1">View and manage contact messages</p>
                </div>
                <Badge variant="secondary" className="text-lg px-4 py-2">
                    {messages.length} Total
                </Badge>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Messages List */}
                <div className="lg:col-span-2 space-y-4">
                    <Card className="p-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                            <Input
                                type="text"
                                placeholder="Search messages..."
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
                                    <TableHead>From</TableHead>
                                    <TableHead>Subject</TableHead>
                                    <TableHead>Company</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredMessages.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={4} className="text-center py-8 text-slate-500">
                                            No messages found
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    filteredMessages.map((msg) => (
                                        <TableRow
                                            key={msg.id}
                                            className={`cursor-pointer ${selectedMessage?.id === msg.id ? 'bg-blue-50 dark:bg-blue-900/20' : ''}`}
                                            onClick={() => setSelectedMessage(msg)}
                                        >
                                            <TableCell>
                                                <div>
                                                    <p className="font-medium">{msg.name}</p>
                                                    <p className="text-sm text-slate-500">{msg.email}</p>
                                                </div>
                                            </TableCell>
                                            <TableCell className="max-w-xs truncate">{msg.subject}</TableCell>
                                            <TableCell>{msg.company}</TableCell>
                                            <TableCell className="text-right">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleDelete(msg.id);
                                                    }}
                                                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </Card>
                </div>

                {/* Message Detail */}
                <div className="lg:col-span-1">
                    <Card className="p-6 sticky top-6">
                        {selectedMessage ? (
                            <div className="space-y-4">
                                <div className="flex items-center space-x-3 pb-4 border-b border-slate-200 dark:border-slate-700">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                                        <Mail className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-slate-900 dark:text-white">{selectedMessage.name}</h3>
                                        <p className="text-sm text-slate-500">{selectedMessage.email}</p>
                                    </div>
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Subject</label>
                                    <p className="mt-1 text-slate-900 dark:text-white">{selectedMessage.subject}</p>
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Company</label>
                                    <p className="mt-1 text-slate-900 dark:text-white">{selectedMessage.company}</p>
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Message</label>
                                    <p className="mt-1 text-slate-900 dark:text-white whitespace-pre-wrap">{selectedMessage.message_content}</p>
                                </div>

                                <div className="pt-4 border-t border-slate-200 dark:border-slate-700 space-y-2">
                                    <Button className="w-full" asChild>
                                        <a href={`mailto:${selectedMessage.email}`}>
                                            <Mail className="w-4 h-4 mr-2" />
                                            Reply via Email
                                        </a>
                                    </Button>
                                    <Button
                                        variant="outline"
                                        className="w-full text-red-600 hover:text-red-700 hover:bg-red-50"
                                        onClick={() => handleDelete(selectedMessage.id)}
                                    >
                                        <Trash2 className="w-4 h-4 mr-2" />
                                        Delete Message
                                    </Button>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center py-12 text-slate-500">
                                <Mail className="w-12 h-12 mx-auto mb-3 opacity-50" />
                                <p>Select a message to view details</p>
                            </div>
                        )}
                    </Card>
                </div>
            </div>
        </div>
    );
}
