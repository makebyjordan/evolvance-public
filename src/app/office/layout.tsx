
"use client";

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Home, LogOut, Menu, AppWindow } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { auth, db } from '@/lib/firebase';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Image from 'next/image';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { useState, useEffect } from 'react';
import { collection, onSnapshot, query, orderBy, Timestamp } from "firebase/firestore";
import type { OfficeSection } from '@/app/actions/office-sections-actions';
import * as LucideIcons from 'lucide-react';


type IconName = keyof typeof LucideIcons;

function DynamicIcon({ name, ...props }: { name: IconName } & React.ComponentProps<"svg">) {
  const Icon = LucideIcons[name] as React.ElementType;
  if (!Icon) return <AppWindow {...props} />; // Fallback icon
  return <Icon {...props} />;
}


function NavLink({ href, icon: Icon, label, onClick, pathname }: { href: string, icon: React.ElementType, label: string, onClick: () => void, pathname: string }) {
    const isActive = pathname === href;
    return (
        <Link
            href={href}
            onClick={onClick}
            className={`flex items-center gap-3 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                isActive
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:bg-muted hover:text-foreground'
            }`}
            >
            <Icon className="h-5 w-5" />
            <span>{label}</span>
        </Link>
    );
}

function SidebarContent({pathname, closeSheet}: {pathname: string, closeSheet: () => void}) {
    const router = useRouter();
    const { user } = useAuth();
    const [navItems, setNavItems] = useState<OfficeSection[]>([]);
    
    useEffect(() => {
        const q = query(collection(db, "officeSections"), orderBy("createdAt", "asc"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const sections = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as OfficeSection));
            setNavItems(sections);
        });
        return () => unsubscribe();
    }, []);

    const handleLogout = async () => {
        await auth.signOut();
        router.push('/office/login');
    };

    const getInitials = (email: string | null | undefined) => {
        return email ? email.substring(0, 2).toUpperCase() : 'U';
    }

    return (
        <div className="flex h-full flex-col">
             <div className="h-20 flex items-center px-6 border-b border-border/20">
                <Link href="/" className="flex items-center gap-2" onClick={closeSheet}>
                    <Image src="https://iili.io/K78fXyb.png" alt="Evol-vance Logo" width={150} height={40} />
                </Link>
            </div>
            <nav className="flex-1 py-6 px-4 space-y-1 overflow-y-auto">
               <NavLink href="/office" icon={Home} label="Resumen" onClick={closeSheet} pathname={pathname} />
               {navItems.map((item) => <NavLink key={item.id} href={item.path} icon={(props) => <DynamicIcon name={item.icon as IconName} {...props} />} label={item.title} onClick={closeSheet} pathname={pathname} />)}
            </nav>
            <div className="p-4 border-t border-border/20">
               <div className="flex items-center gap-3 mb-4">
                <Avatar>
                    <AvatarImage src={user?.photoURL || undefined} />
                    <AvatarFallback>{getInitials(user?.email)}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                    <span className="text-sm font-medium">{user?.displayName || user?.email}</span>
                    <span className="text-xs text-muted-foreground">Miembro del equipo</span>
                </div>
                </div>
              <Button variant="ghost" className="w-full justify-start gap-3" onClick={handleLogout}>
                <LogOut className="h-5 w-5" />
                <span>Cerrar Sesión</span>
              </Button>
            </div>
        </div>
    )
}


export default function OfficeDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const closeSheet = () => setIsSheetOpen(false);
  const { user } = useAuth();
  const router = useRouter();

  const isAuthPage = pathname === '/office/login' || pathname === '/office/register';

  if (isAuthPage) {
    return <>{children}</>;
  }

  // If not authenticated, the AuthProvider will redirect. We can show a loader here.
  if (!user) {
    return <div className="flex h-screen items-center justify-center">Cargando...</div>
  }

  return (
    <div className="flex h-screen bg-background text-foreground">
      <aside className="w-64 flex-shrink-0 border-r bg-card border-border/20 hidden md:flex flex-col">
        <SidebarContent pathname={pathname} closeSheet={() => {}} />
      </aside>
      <div className="flex flex-col flex-1">
          <header className="md:hidden flex items-center justify-between h-16 px-4 border-b bg-card">
              <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                  <SheetTrigger asChild>
                      <Button variant="ghost" size="icon">
                          <Menu className="h-6 w-6" />
                          <span className="sr-only">Abrir menú</span>
                      </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="p-0 w-64">
                       <SheetHeader className="sr-only">
                          <SheetTitle>Menú Principal</SheetTitle>
                       </SheetHeader>
                       <SidebarContent pathname={pathname} closeSheet={closeSheet} />
                  </SheetContent>
              </Sheet>
              <Link href="/office">
                  <Image src="https://iili.io/K78fXyb.png" alt="Evol-vance Logo" width={100} height={26} />
              </Link>
          </header>
          <main className="flex-1 overflow-y-auto">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {children}
            </div>
          </main>
      </div>
    </div>
  );
}
