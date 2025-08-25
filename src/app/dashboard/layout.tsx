
"use client";

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Home, FileText, Users, Briefcase, Settings, LogOut, Building, UserPlus, Handshake, ArrowDownCircle, ArrowUpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { auth } from '@/lib/firebase';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Image from 'next/image';

const navItems = [
  { href: '/dashboard', icon: Home, label: 'Resumen' },
  { href: '/dashboard/proposals', icon: FileText, label: 'Propuestas' },
  { href: '/dashboard/clients', icon: Building, label: 'Clientes' },
  { href: '/dashboard/collaborators', icon: Handshake, label: 'Colaboradores' },
  { href: '/dashboard/services', icon: Briefcase, label: 'Servicios' },
  { href: '/dashboard/invoices-in', icon: ArrowDownCircle, label: 'Facturas In' },
  { href: '/dashboard/invoices-out', icon: ArrowUpCircle, label: 'Facturas Out' },
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
            <Image src="https://placehold.co/40x40.png" alt="Evol-vance Logo" width={40} height={40} data-ai-hint="logo" />
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
