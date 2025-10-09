
"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter, usePathname } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';

interface AuthContextType {
  user: User | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({ user: null, loading: true });

const protectedRoutes = ['/dashboard', '/office'];

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);
  
  useEffect(() => {
    if (loading) return;

    const isDashboardRoute = pathname.startsWith('/dashboard');
    const isOfficeRoute = pathname.startsWith('/office');

    if (!user && (isDashboardRoute || isOfficeRoute)) {
      if (isDashboardRoute) {
        router.push('/login');
      } else if (isOfficeRoute) {
        router.push('/office/login');
      }
    }
  }, [user, loading, router, pathname]);


  if (loading) {
     return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="w-full max-w-md space-y-4">
             <Skeleton className="h-12 w-full" />
             <Skeleton className="h-32 w-full" />
             <Skeleton className="h-8 w-1/2 mx-auto" />
          </div>
        </div>
    );
  }

  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
  if (isProtectedRoute && !user) {
    return null; // Don't render protected content while redirecting
  }

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

