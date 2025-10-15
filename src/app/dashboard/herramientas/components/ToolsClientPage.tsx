
"use client";

import { useState, useEffect } from "react";
import { PlusCircle, MoreHorizontal, FileText, Trash2, Pencil, AlertTriangle, ExternalLink } from "lucide-react";
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
import { ToolForm } from "./ToolForm";
import type { Tool } from "@/app/actions/tools-actions";
import { deleteTool } from "@/app/actions/tools-actions";
import { db } from "@/lib/firebase";
import { collection, onSnapshot, query, orderBy, Timestamp } from "firebase/firestore";
import { Skeleton } from "@/components/ui/skeleton";

export function ToolsClientPage() {
  const [tools, setTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const q = query(collection(db, "tools"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, 
      (querySnapshot) => {
        const toolsData: Tool[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          toolsData.push({
            id: doc.id,
            ...data
          } as Tool);
        });
        setTools(toolsData);
        setLoading(false);
      }, 
      (err) => {
        console.error("Error fetching tools in real-time: ", err);
        setError("No se pudieron cargar las herramientas en tiempo real.");
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const handleFormSubmit = () => {
    // Real-time listener will handle the update
  };

  const handleDeleteClick = (tool: Tool) => {
    setSelectedTool(tool);
    setIsAlertOpen(true);
  };

  const handleEditClick = (tool: Tool) => {
    setSelectedTool(tool);
    setIsFormOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedTool) return;
    const result = await deleteTool(selectedTool.id);
    if (result.success) {
      toast({ title: "Herramienta Eliminada", description: "La herramienta ha sido eliminada." });
    } else {
      toast({ variant: "destructive", title: "Error al Eliminar", description: result.error });
    }
    setIsAlertOpen(false);
    setSelectedTool(null);
  };

  if (loading) {
     return (
      <div>
        <div className="flex justify-end mb-4"><Skeleton className="h-10 w-44" /></div>
        <div className="border rounded-lg p-4 space-y-2"><Skeleton className="h-12 w-full" /><Skeleton className="h-10 w-full" /><Skeleton className="h-10 w-full" /></div>
      </div>
    );
  }

  if (error) {
     return (
        <Alert variant="destructive" className="max-w-2xl mx-auto">
            <AlertTriangle className="h-4 w-4" /><AlertTitle>Error</AlertTitle>
            <AlertDescription><p>{error}</p></AlertDescription>
        </Alert>
    );
  }

  return (
    <>
      <div className="flex justify-end mb-4">
        <Button onClick={() => { setSelectedTool(null); setIsFormOpen(true); }}>
          <PlusCircle className="mr-2 h-4 w-4" />Crear Herramienta
        </Button>
      </div>

      <ToolForm isOpen={isFormOpen} setIsOpen={setIsFormOpen} onFormSubmit={handleFormSubmit} tool={selectedTool} />
      
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Título</TableHead>
              <TableHead>Descripción</TableHead>
              <TableHead>URL</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tools.length > 0 ? (
              tools.map((tool) => (
                <TableRow key={tool.id}>
                  <TableCell className="font-medium">{tool.title}</TableCell>
                  <TableCell className="text-muted-foreground max-w-xs truncate">{tool.description}</TableCell>
                  <TableCell>
                    <a href={tool.url} target="_blank" rel="noopener noreferrer" className="flex items-center text-primary hover:underline">
                      <ExternalLink className="mr-1 h-4 w-4" /> Visitar
                    </a>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild><Button variant="ghost" className="h-8 w-8 p-0"><span className="sr-only">Abrir menú</span><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEditClick(tool)}><Pencil className="mr-2 h-4 w-4" />Editar</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDeleteClick(tool)} className="text-red-500"><Trash2 className="mr-2 h-4 w-4" />Eliminar</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center">
                  <FileText className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium">No hay herramientas</h3>
                  <p className="mt-1 text-sm text-gray-500">Empieza por crear una nueva herramienta.</p>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
            <AlertDialogDescription>Esta acción no se puede deshacer. Se eliminará permanentemente la herramienta.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive hover:bg-destructive/90">Eliminar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
