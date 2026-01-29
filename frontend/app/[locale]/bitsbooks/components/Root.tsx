import { Outlet } from 'react-router';
import { AuthProvider } from '@/app/context/AuthContext';
import Header from '@/app/components/Header';

export default function Root() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-white text-black">
        <Header />
        <main>
          <Outlet />
        </main>
      </div>
    </AuthProvider>
  );
}
