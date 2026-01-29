"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  balance: number;
}

interface Book {
  id: string;
  title: string;
  author: string;
  cover: string;
  price: number;
  isFree: boolean;
  description: string;
  content: string;
  authorId: string;
}

interface Transaction {
  id: string;
  bookId: string;
  amount: number;
  type: 'sale' | 'adsense';
  date: Date;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => void;
  logout: () => void;
  register: (name: string, email: string, password: string) => void;
  updateBalance: (amount: number) => void;
  books: Book[];
  userBooks: Book[];
  favorites: string[];
  toggleFavorite: (bookId: string) => void;
  addBook: (book: Omit<Book, 'id' | 'authorId'>) => void;
  updateBook: (bookId: string, book: Partial<Book>) => void;
  deleteBook: (bookId: string) => void;
  transactions: Transaction[];
  addTransaction: (transaction: Omit<Transaction, 'id' | 'date'>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock data buku-buku
const initialBooks: Book[] = [
  {
    id: '1',
    title: 'Panduan JavaScript Modern',
    author: 'Ahmad Santoso',
    cover: 'https://images.unsplash.com/photo-1532012197267-da84d127e765',
    price: 50000,
    isFree: false,
    description: 'Belajar JavaScript dari dasar hingga mahir dengan pendekatan modern.',
    content: 'Konten buku tentang JavaScript...',
    authorId: 'author1',
  },
  {
    id: '2',
    title: 'React untuk Pemula',
    author: 'Budi Pratama',
    cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f',
    price: 0,
    isFree: true,
    description: 'Panduan lengkap belajar React.js untuk pemula.',
    content: 'Konten buku tentang React...',
    authorId: 'author2',
  },
  {
    id: '3',
    title: 'Desain UI/UX Profesional',
    author: 'Citra Dewi',
    cover: 'https://images.unsplash.com/photo-1523961131990-5ea7c61b2107',
    price: 75000,
    isFree: false,
    description: 'Pelajari prinsip desain UI/UX yang profesional.',
    content: 'Konten buku tentang UI/UX...',
    authorId: 'author3',
  },
  {
    id: '4',
    title: 'Python untuk Data Science',
    author: 'Dewi Lestari',
    cover: 'https://images.unsplash.com/photo-1509228468518-180dd4864904',
    price: 0,
    isFree: true,
    description: 'Analisis data menggunakan Python untuk pemula.',
    content: 'Konten buku tentang Python...',
    authorId: 'author4',
  },
  {
    id: '5',
    title: 'Node.js Backend Development',
    author: 'Eko Nugroho',
    cover: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f',
    price: 60000,
    isFree: false,
    description: 'Membangun backend yang scalable dengan Node.js.',
    content: 'Konten buku tentang Node.js...',
    authorId: 'author5',
  },
  {
    id: '6',
    title: 'CSS Grid & Flexbox',
    author: 'Fitri Handayani',
    cover: 'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2',
    price: 0,
    isFree: true,
    description: 'Master layout modern dengan CSS Grid dan Flexbox.',
    content: 'Konten buku tentang CSS...',
    authorId: 'author6',
  },
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [books, setBooks] = useState<Book[]>(initialBooks);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  // Load dari localStorage saat mount
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const savedFavorites = localStorage.getItem('favorites');
    const savedBooks = localStorage.getItem('books');
    const savedTransactions = localStorage.getItem('transactions');

    if (savedUser) setUser(JSON.parse(savedUser));
    if (savedFavorites) setFavorites(JSON.parse(savedFavorites));
    if (savedBooks) setBooks(JSON.parse(savedBooks));
    if (savedTransactions) setTransactions(JSON.parse(savedTransactions));
  }, []);

  // Save ke localStorage saat data berubah
  useEffect(() => {
    if (user) localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('books', JSON.stringify(books));
  }, [books]);

  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  const login = (email: string, password: string) => {
    // Mock login - dalam produksi gunakan API
    const mockUser: User = {
      id: '1',
      name: 'User Demo',
      email,
      balance: 100000,
    };
    setUser(mockUser);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const register = (name: string, email: string, password: string) => {
    // Mock register - dalam produksi gunakan API
    const mockUser: User = {
      id: Math.random().toString(),
      name,
      email,
      balance: 0,
    };
    setUser(mockUser);
  };

  const updateBalance = (amount: number) => {
    if (user) {
      setUser({ ...user, balance: user.balance + amount });
    }
  };

  const toggleFavorite = (bookId: string) => {
    setFavorites((prev) =>
      prev.includes(bookId) ? prev.filter((id) => id !== bookId) : [...prev, bookId]
    );
  };

  const addBook = (book: Omit<Book, 'id' | 'authorId'>) => {
    if (!user) return;
    const newBook: Book = {
      ...book,
      id: Math.random().toString(),
      authorId: user.id,
    };
    setBooks((prev) => [...prev, newBook]);
  };

  const updateBook = (bookId: string, updatedData: Partial<Book>) => {
    setBooks((prev) =>
      prev.map((book) => (book.id === bookId ? { ...book, ...updatedData } : book))
    );
  };

  const deleteBook = (bookId: string) => {
    setBooks((prev) => prev.filter((book) => book.id !== bookId));
  };

  const addTransaction = (transaction: Omit<Transaction, 'id' | 'date'>) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: Math.random().toString(),
      date: new Date(),
    };
    setTransactions((prev) => [...prev, newTransaction]);
    updateBalance(transaction.amount);
  };

  const userBooks = books.filter((book) => book.authorId === user?.id);

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        register,
        updateBalance,
        books,
        userBooks,
        favorites,
        toggleFavorite,
        addBook,
        updateBook,
        deleteBook,
        transactions,
        addTransaction,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
