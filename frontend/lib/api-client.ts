// API Base URL
export const API_BASE_URL = 'http://127.0.0.1:8000';

// API Client with authentication
export class APIClient {
    private static getAuthToken(): string | null {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('auth_token');
        }
        return null;
    }

    private static async request<T>(
        endpoint: string,
        options: RequestInit = {}
    ): Promise<T> {
        const token = this.getAuthToken();
        const headers: Record<string, string> = {
            'Content-Type': 'application/json',
            ...(options.headers as Record<string, string>),
        };

        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            ...options,
            headers,
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.statusText}`);
        }

        return response.json();
    }

    // Auth endpoints
    static async login(email_username: string, password: string) {
        const response = await this.request<{ message: string }>('/auth/login', {
            method: 'POST',
            body: JSON.stringify({ email_username, password }),
        });
        return response;
    }

    static async logout() {
        const response = await this.request<{ message: string }>('/auth/logout', {
            method: 'POST',
        });
        localStorage.removeItem('auth_token');
        return response;
    }

    static async getMe() {
        return this.request<{
            sub: string;
            email: string;
            username: string;
            role: string;
        }>('/auth/me');
    }

    // Stats endpoints
    static async getUserCount() {
        return this.request<{ total_users: number }>('/users/stats/count');
    }

    static async getBlogCount() {
        return this.request<{ total_blogs: number }>('/blogs/stats/count');
    }

    static async getProductCount() {
        return this.request<{ total_product: number }>('/product/stats/count');
    }

    static async getProjectCount() {
        return this.request<{ total_projects: number }>('/projects/stats/count');
    }

    static async getCareerCount() {
        return this.request<{ total_careers: number }>('/career/stats/count');
    }

    static async getMessageCount() {
        return this.request<{ total_messages: number }>('/messages/count');
    }

    static async getPublicationCount() {
        return this.request<{ total_publications: number }>('/publication/stats/count');
    }

    static async getResearchCount() {
        return this.request<{ total_research: number }>('/research/stats/count');
    }

    // Activity logs
    static async getActivities(target_lang: 'id' | 'en' = 'id') {
        return this.request<Array<{
            id: number;
            user: string | null;
            module: string;
            action: string;
            object_id: number;
            description: string;
            created_at: string;
        }>>(`/activities?target_lang=${target_lang}`);
    }

    // Users
    static async getUsers() {
        return this.request<Array<{
            id: number;
            email: string;
            username: string;
            role: 'admin' | 'owner';
        }>>('/users');
    }

    static async createUser(data: {
        email: string;
        username: string;
        role: 'admin' | 'owner';
        password: string;
    }) {
        return this.request('/users', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    }

    static async updateUser(userId: number, data: Partial<{
        email: string;
        username: string;
        role: 'admin' | 'owner';
        password: string;
    }>) {
        return this.request(`/users/${userId}`, {
            method: 'PUT',
            body: JSON.stringify(data),
        });
    }

    static async deleteUser(userId: number) {
        return this.request(`/users/${userId}`, {
            method: 'DELETE',
        });
    }

    // Blogs
    static async getBlogs(target_lang: 'id' | 'en' = 'id') {
        return this.request<Array<{
            id: number;
            title: string;
            content: string;
            cover_url: string;
            views: number;
            created_at: string;
            user: string;
            category: string;
        }>>(`/blogs?target_lang=${target_lang}`);
    }

    static async deleteBlog(blogId: number) {
        return this.request(`/blogs/${blogId}`, {
            method: 'DELETE',
        });
    }

    // Career
    static async getCareers(target_lang: 'id' | 'en' = 'id') {
        return this.request<Array<{
            id: number;
            position: string;
            work_mode: string;
            job_type: string;
            desc: string;
            apply_link: string;
            category: number;
        }>>(`/career?target_lang=${target_lang}`);
    }

    static async deleteCareer(careerId: number) {
        return this.request(`/career/${careerId}`, {
            method: 'DELETE',
        });
    }

    // Products
    static async getProducts(target_lang: 'id' | 'en' = 'id') {
        return this.request<Array<{
            id: number;
            name: string;
            desc: string;
            link: string;
            icon: string;
        }>>(`/product?target_lang=${target_lang}`);
    }

    static async deleteProduct(productId: number) {
        return this.request(`/product/${productId}`, {
            method: 'DELETE',
        });
    }

    // Projects
    static async getProjects(target_lang: 'id' | 'en' = 'id') {
        return this.request<Array<{
            id: number;
            title: string;
            desc: string;
            link: string;
            cover_url: string;
            category: number;
        }>>(`/projects?target_lang=${target_lang}`);
    }

    static async deleteProject(projectId: number) {
        return this.request(`/projects/${projectId}`, {
            method: 'DELETE',
        });
    }

    // Publications
    static async getPublications(target_lang: 'id' | 'en' = 'id') {
        return this.request<Array<{
            id: number;
            title: string;
            writer: string;
            journal: string;
            desc: string;
            link: string;
            publication_date: string;
        }>>(`/publication?target_lang=${target_lang}`);
    }

    static async deletePublication(publicationId: number) {
        return this.request(`/publication/${publicationId}`, {
            method: 'DELETE',
        });
    }

    // Research
    static async getResearch(target_lang: 'id' | 'en' = 'id') {
        return this.request<Array<{
            id: number;
            title: string;
            desc: string;
            link: string;
            category_id: number;
        }>>(`/research?target_lang=${target_lang}`);
    }

    static async deleteResearch(researchId: number) {
        return this.request(`/research/${researchId}`, {
            method: 'DELETE',
        });
    }

    // Messages
    static async getMessages(target_lang: 'id' | 'en' = 'id') {
        return this.request<Array<{
            id: number;
            name: string;
            email: string;
            subject: string;
            company: string;
            message_content: string;
        }>>(`/messages?target_lang=${target_lang}`);
    }

    static async deleteMessage(messageId: number) {
        return this.request(`/messages/${messageId}`, {
            method: 'DELETE',
        });
    }

    // Categories
    static async getCategories() {
        return this.request<Array<{
            id: number;
            name: string;
            type: 'project' | 'blog' | 'research' | 'career';
        }>>('/categories');
    }

    static async getCategoriesByType(type: 'project' | 'blog' | 'research' | 'career') {
        return this.request<Array<{
            id: number;
            name: string;
            type: 'project' | 'blog' | 'research' | 'career';
        }>>(`/categories/${type}`);
    }

    static async deleteCategory(categoryId: number) {
        return this.request(`/categories/${categoryId}`, {
            method: 'DELETE',
        });
    }
}
