
"use client";

import { useState } from "react";
import { PlusCircle, MoreHorizontal, FileText, Trash2, Pencil, Eye } from "lucide-react";
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
import { useToast } from "@/hooks/use-toast";
import { ProposalForm } from "./ProposalForm";
import type { Proposal } from "@/app/actions/proposals-actions";
import { deleteProposal } from "@/app/actions/proposals-actions";
import { useRouter } from "next/navigation";

export function ProposalsClientPage({ initialProposals }: { initialProposals: Proposal[] }) {
  const [proposals, setProposals] = useState<Proposal[]>(initialProposals);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [selectedProposal, setSelectedProposal] = useState<Proposal | null>(null);
  const { toast } = useToast();
  const router = useRouter();

  const handleFormSubmit = (updatedProposals: Proposal[]) => {
    setProposals(updatedProposals);
    router.refresh();
  };

  const handleDeleteClick = (proposal: Proposal) => {
    setSelectedProposal(proposal);
    setIsAlertOpen(true);
  };

  const handleEditClick = (proposal: Proposal) => {
    setSelectedProposal(proposal);
    setIsFormOpen(true);
  };

  const handleViewClick = (proposal: Proposal) => {
    window.open(`/view-proposal/${proposal.id}`, '_blank');
  };

  const confirmDelete = async () => {
    if (!selectedProposal) return;

    const result = await deleteProposal(selectedProposal.id);

    if (result.success) {
      setProposals(proposals.filter((p) => p.id !== selectedProposal.id));
      toast({
        title: "Propuesta Eliminada",
        description: "La propuesta ha sido eliminada con éxito.",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Error al Eliminar",
        description: result.error || "No se pudo eliminar la propuesta.",
      });
    }
    setIsAlertOpen(false);
    setSelectedProposal(null);
  };

  return (
    <>
      <div className="flex justify-end mb-4">
        <Button onClick={() => {
          setSelectedProposal(null);
          setIsFormOpen(true);
        }}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Crear Propuesta
        </Button>
      </div>

      <ProposalForm
        isOpen={isFormOpen}
        setIsOpen={setIsFormOpen}
        onFormSubmit={handleFormSubmit}
        proposal={selectedProposal}
      />
      
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Título</TableHead>
              <TableHead>Código</TableHead>
              <TableHead>Fecha Creación</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {proposals.length > 0 ? (
              proposals.map((proposal) => (
                <TableRow key={proposal.id}>
                  <TableCell className="font-medium">{proposal.title}</TableCell>
                  <TableCell>{proposal.code}</TableCell>
                  <TableCell>{new Date(proposal.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Abrir menú</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleViewClick(proposal)}>
                          <Eye className="mr-2 h-4 w-4" />
                          Ver
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEditClick(proposal)}>
                          <Pencil className="mr-2 h-4 w-4" />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDeleteClick(proposal)} className="text-red-500">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Eliminar
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center">
                  <FileText className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-gray-200">No hay propuestas</h3>
                  <p className="mt-1 text-sm text-gray-500">Empieza por crear una nueva propuesta.</p>
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
            <AlertDialogDescription>
              Esta acción no se puede deshacer. Esto eliminará permanentemente la propuesta.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive hover:bg-destructive/90">
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
