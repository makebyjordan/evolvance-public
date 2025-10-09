"use client";

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle, KeyRound } from 'lucide-react';

export default function OfficeAccessPage() {
  const { officeCode, setOfficeCode } = useAuth();
  const [inputCode, setInputCode] = useState('');
  const [error, setError] = useState('');

  const handleCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputCode === 'evolteam') {
      setOfficeCode(inputCode);
      setError('');
    } else {
      setError('El código de acceso no es correcto.');
    }
  };

  // If code is correct, AuthProvider will show the dashboard via layout.tsx
  // This component will only render the access form if the code is not set.
  if (officeCode) {
    return null; 
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="mx-auto max-w-sm w-full">
        <CardHeader className="text-center">
          <KeyRound className="mx-auto h-12 w-12 text-primary mb-4" />
          <CardTitle className="text-2xl font-headline text-primary">Acceso a Oficina</CardTitle>
          <CardDescription>
            Introduce el código de acceso para continuar.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleCodeSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="office-code">Código de Acceso</Label>
              <Input
                id="office-code"
                type="password"
                placeholder="********"
                value={inputCode}
                onChange={(e) => setInputCode(e.target.value)}
                required
              />
            </div>
            {error && (
                <Alert variant="destructive" className="mt-4">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>
                        {error}
                    </AlertDescription>
                </Alert>
            )}
            <Button type="submit" className="w-full">
              Entrar
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
