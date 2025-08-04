"use client"

import { useState } from "react"
import {client} from "@/lib/client"  // Importation du client TRPC pour effectuer des appels à l'API.
import { useMutation } from "@tanstack/react-query"  // Importation   
import { Card } from "@/components/ui/card"  // Importation du composant Card pour afficher des cartes.
import { Label } from "@/components/ui/label"  // Importation du composant Label
import { Input } from "@/components/ui/input"  // Importation du composant Input pour les champs de saisie.
import  Link  from "next/link"  // Importation du composant Link de Next.js pour la navigation.
import { Button } from "@/components/ui/button"  // Importation du composant Button pour les boutons stylisés.

export const AccountSettings = ({
    discordId: initialDiscordId, 
}: {
    discordId: string }) => {
    const [discordId, setDiscordId] = useState(initialDiscordId)  // État local pour stocker l'ID Discord de l'utilisateur.

    const {mutate, isPending} = useMutation({
        mutationFn: async (discordId: string) => {
            const res = await client.project.setDiscordId.$post({ discordId })
            return await res.json()  // Appel à l'API pour mettre à jour l
        },
    })

    return (
         <Card className="max-w-xl w-full space-y-4">
            <div> 
                <Label>Discord ID</Label>
                <Input 
                className="mt-1" 
                value={discordId} 
                onChange={(e) => setDiscordId(e.target.value)}
                placeholder="Enter your Discord ID"
                />     
            </div>

            <p className="mt-2 text-sm/6 text-gray-600"> 
               Don't know how to find your Discord ID?{" "}
               <Link href ="#" className="text-brand-600 hover:text-brand-500">
                 Learn how to obtain it here 
               </Link>
               .
            </p>

            <div className="pt-4">
                <Button onClick={() => mutate(discordId)} disabled={isPending}> 
                    {isPending ? "Saving..." : "Save Changes"}  {/* Affichage d'un texte différent selon l'état de la requête. Ainsi, si la requête est en cours, le texte affiché sera "Saving...", sinon ce sera "Save Changes". */}
                </Button>
            </div>
         </Card>
    )
}