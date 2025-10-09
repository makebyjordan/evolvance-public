
"use client";

import { useState, useEffect } from "react";
import { PlusCircle, MoreHorizontal, FileText, Trash2, Pencil, AlertTriangle, Settings, AppWindow, Heading1 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { OfficeSectionForm } from "./OfficeSectionForm";
import type { OfficeSection } from "@/app/actions/office-sections-actions";
import { deleteOfficeSection } from "@/app/actions/office-sections-actions";
import { db } from "@/lib/firebase";
import { collection, onSnapshot, query, orderBy, Timestamp } from "firebase/firestore";
import { Skeleton } from "@/components/ui/skeleton";
import * as LucideIcons from 'lucide-react';
import { Badge } from "@/components/ui/badge";

type IconName = keyof typeof LucideIcons;

function DynamicIcon({ name }: { name: IconName }) {
  const Icon = LucideIcons[name] as React.ElementType;
  if (!Icon) return <AppWindow />; // Fallback icon
  return <Icon />;
}


export function OfficeSectionsClientPage() {
  const [sections, setSections] = useState<OfficeSection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState<OfficeSection | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const q = query(collection(db, "officeSections"), orderBy("createdAt", "asc"));
    const unsubscribe = onSnapshot(q, 
      (querySnapshot) => {
        const sectionsData: OfficeSection[] = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as OfficeSection));
        setSections(sectionsData);
        setLoading(false);
      }, 
      (err) => {
        console.error("Error fetching office sections in real-time: ", err);
        setError("No se pudieron cargar las secciones.");
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const handleFormSubmit = () => {
    // Real-time listener handles update
  };

  const handleDeleteClick = (section: OfficeSection) => {
    setSelectedSection(section);
    setIsAlertOpen(true);
  };

  const handleEditClick = (section: OfficeSection) => {
    setSelectedSection(section);
    setIsFormOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedSection) return;

    const result = await deleteOfficeSection(selectedSection.id);

    if (result.success) {
      toast({
        title: "Elemento Eliminado",
        description: "El elemento del menú ha sido eliminado con éxito.",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Error al Eliminar",
        description: result.error || "No se pudo eliminar el elemento.",
      });
    }
    setIsAlertOpen(false);
    setSelectedSection(null);
  };

  if (loading) {
     return (
      <div>
        <div className="flex justify-end mb-4"><Skeleton className="h-10 w-40" /></div>
        <div className="border rounded-lg p-4 space-y-2"><Skeleton className="h-12 w-full" /><Skeleton className="h-10 w-full" /><Skeleton className="h-10 w-full" /></div>
      </div>
    );
  }

  if (error) {
     return (
        <Alert variant="destructive" className="max-w-2xl mx-auto">
            <AlertTriangle className="h-4 w-4" /><AlertTitle>Error de Conexión</AlertTitle>
            <AlertDescription><p>{error}</p><p className="mt-2 text-xs">Comprueba tu conexión a internet y la configuración de Firebase.</p></AlertDescription>
        </Alert>
    );
  }

  return (
    <>
      <div className="flex justify-end mb-4">
        <Button onClick={() => { setSelectedSection(null); setIsFormOpen(true); }}>
          <PlusCircle className="mr-2 h-4 w-4" />Crear Elemento
        </Button>
      </div>

      <OfficeSectionForm isOpen={isFormOpen} setIsOpen={setIsFormOpen} onFormSubmit={handleFormSubmit} section={selectedSection} />
      
      <div className="border rounded-lg">
        <Table>
          <TableHeader><TableRow><TableHead>Título</TableHead><TableHead>Tipo</TableHead><TableHead>Ruta/Icono</TableHead><TableHead className="text-right">Acciones</TableHead></TableRow></TableHeader>
          <TableBody>
            {sections.length > 0 ? (
              sections.map((section) => (
                <TableRow key={section.id}>
                  <TableCell className="font-medium">{section.title}</TableCell>
                   <TableCell>
                    <Badge variant={section.type === 'title' ? 'secondary' : 'outline'}>
                        {section.type === 'title' ? 'Título' : 'Sección'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {section.type === 'link' ? (
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <DynamicIcon name={(section.icon || 'AppWindow') as IconName} />
                            <span>{section.path}</span>
                        </div>
                    ) : (
                        <span className="text-muted-foreground">-</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild><Button variant="ghost" className="h-8 w-8 p-0"><span className="sr-only">Abrir menú</span><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEditClick(section)}><Pencil className="mr-2 h-4 w-4" />Editar</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDeleteClick(section)} className="text-red-500"><Trash2 className="mr-2 h-4 w-4" />Eliminar</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow><TableCell colSpan={4} className="h-24 text-center"><Settings className="mx-auto h-12 w-12 text-gray-400" /><h3 className="mt-2 text-sm font-medium">No hay elementos</h3><p className="mt-1 text-sm text-gray-500">Empieza por crear un nuevo elemento para el menú de oficina.</p></TableCell></TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader><AlertDialogTitle>¿Estás seguro?</AlertDialogTitle><AlertDialogDescription>Esta acción no se puede deshacer. Esto eliminará permanentemente el elemento del menú.</AlertDialogDescription></AlertDialogHeader>
          <AlertDialogFooter><AlertDialogCancel>Cancelar</AlertDialogCancel><AlertDialogAction onClick={confirmDelete} className="bg-destructive hover:bg-destructive/90">Eliminar</AlertDialogAction></AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
