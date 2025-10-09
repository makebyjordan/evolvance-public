
"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter, usePathname } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  officeCode: string | null;
  setOfficeCode: (code: string | null) => void;
}

const AuthContext = createContext<AuthContextType>({ 
  user: null, 
  loading: true,
  officeCode: null,
  setOfficeCode: () => {} 
});


export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [officeCode, setOfficeCodeState] = useState<string | null>(null);
  const router = useRouter();
  const pathname = usePathname();
  
  useEffect(() => {
    const storedCode = sessionStorage.getItem('office-code');
    if (storedCode) {
      setOfficeCodeState(storedCode);
    }
  }, []);

  const setOfficeCode = (code: string | null) => {
    setOfficeCodeState(code);
    if (code) {
      sessionStorage.setItem('office-code', code);
    } else {
      sessionStorage.removeItem('office-code');
    }
  };

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

    if (isDashboardRoute && !user) {
        router.push('/login');
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

  const isDashboardRoute = pathname.startsWith('/dashboard');
  if (isDashboardRoute && !user) {
    return null; // Don't render protected content while redirecting
  }

  return (
    <AuthContext.Provider value={{ user, loading, officeCode, setOfficeCode }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
