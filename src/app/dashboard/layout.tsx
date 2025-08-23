
"use client";

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Home, FileText, Users, Briefcase, Settings, LogOut, Building, UserPlus, Handshake } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { auth } from '@/lib/firebase';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const navItems = [
  { href: '/dashboard', icon: Home, label: 'Resumen' },
  { href: '/dashboard/proposals', icon: FileText, label: 'Propuestas' },
  { href: '/dashboard/clients', icon: Building, label: 'Clientes' },
  { href: '/dashboard/collaborators', icon: Handshake, label: 'Colaboradores' },
  { href: '/dashboard/services', icon: Briefcase, label: 'Servicios' },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useAuth();

  const handleLogout = async () => {
    await auth.signOut();
    router.push('/login');
  };
  
  const getInitials = (email: string | null | undefined) => {
    return email ? email.substring(0, 2).toUpperCase() : 'U';
  }

  return (
    <div className="flex h-screen bg-background text-foreground">
      <aside className="w-64 flex-shrink-0 border-r border-border/20 flex flex-col">
        <div className="h-20 flex items-center px-6 border-b border-border/20">
           <Link href="/" className="flex items-center gap-2">
            <svg width="32" height="32" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 0L25.3301 14.6699L40 20L25.3301 25.3301L20 40L14.6699 25.3301L0 20L14.6699 14.6699L20 0Z" fill="url(#paint0_linear_layout)"/>
                <defs>
                <linearGradient id="paint0_linear_layout" x1="20" y1="0" x2="20" y2="40" gradientUnits="userSpaceOnUse">
                    <stop stopColor="hsl(var(--primary))"/>
                    <stop offset="1" stopColor="hsl(var(--accent))"/>
                </linearGradient>
                </defs>
            </svg>
            <span className="text-xl font-headline font-bold">Evol-vance</span>
          </Link>
        </div>
        <nav className="flex-1 py-6 px-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                pathname === item.href
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-border/20">
           <div className="flex items-center gap-3 mb-4">
            <Avatar>
                <AvatarImage src={user?.photoURL || undefined} />
                <AvatarFallback>{getInitials(user?.email)}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
                <span className="text-sm font-medium">{user?.displayName || user?.email}</span>
                <span className="text-xs text-muted-foreground">Admin</span>
            </div>
            </div>
          <Button variant="ghost" className="w-full justify-start gap-3" onClick={handleLogout}>
            <LogOut className="h-5 w-5" />
            <span>Cerrar Sesión</span>
          </Button>
        </div>
      </aside>
      <main className="flex-1 overflow-y-auto">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
        </div>
      </main>
    </div>
  );
}
