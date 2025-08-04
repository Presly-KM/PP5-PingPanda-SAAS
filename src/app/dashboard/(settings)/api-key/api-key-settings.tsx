"use client"  

import { useState } from "react"  // Importation de useState pour gérer l'état local du composant.
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"  // Importation du composant Label
import { Card } from "@/components/ui/card"  // Importation du composant Card pour
import { Button } from "@/components/ui/button"  // Importation du composant Button pour les boutons stylisés.
import { CheckIcon } from "lucide-react"
import { ClipboardIcon } from "lucide-react"  // Importation de l'icône ClipboardIcon de Lucide pour afficher une icône de presse-papiers.

export const ApiKeySettings = ({ apiKey }: { apiKey: string }) => {
    const [copySuccess, setCopySuccess] = useState(false)  // État local pour gérer le succès de la copie de la clé API.

    const copyApiKey = () => {
        navigator.clipboard.writeText(apiKey)  // Utilisation de l'API Clipboard pour copier la clé API dans le presse-papiers.
        setCopySuccess(true)  // Mise à jour de l'état pour indiquer que la copie a réussi.
        setTimeout(() => setCopySuccess(false), 2000)  // Réinitialisation de l'état après 2 secondes.
    }

    return (
    <Card className="max-w-xl w-full">
        <div>
            <Label>Your API Key</Label>
            <div className="mt-1 relative">
                <Input type="password" value={apiKey} readOnly /> 
            <div className="absolute space-x-0.5 inset-y-0 right-0 flex items-center">
                <Button 
                variant="ghost" 
                onClick={copyApiKey}
                className="p-1 w-10 focus:outline-none focus:ring-2 focus:ring-brand-500"
                >
                    {copySuccess ? (
                    <CheckIcon className="size-4 text-brand-900" /> 
                ) : ( 
                        <ClipboardIcon className="size-4 text-brand-900" />
                        )}
                </Button>
            </div>
        </div>
        
        <p className="mt-2 text-sm/6 text-gray-600">
            Keep your key secret and do not share it with others.
        </p>
     </div>
    </Card>
    )
}

