
import { useEffect, useState } from "react";
import { PlusCircle, Search, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { supabase } from "@/integrations/supabase/client";
import AdminLayout from "@/components/admin/AdminLayout";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/use-toast";

type Figurine = {
  id: string;
  name: string;
  scale?: string;
  release_date?: string;
  manufacturer_name?: string;
};

export default function AdminFigurines() {
  const [figurines, setFigurines] = useState<Figurine[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchFigurines();
  }, []);

  const fetchFigurines = async () => {
    setLoading(true);
    try {
      // Join with manufacturers to get manufacturer names
      const { data, error } = await supabase
        .from("figurines")
        .select(`
          id, 
          name, 
          scale, 
          release_date,
          manufacturers!inner (
            name
          )
        `)
        .order("release_date", { ascending: false });

      if (error) throw error;

      // Format the data to include manufacturer name
      const formattedData = data?.map(item => ({
        id: item.id,
        name: item.name,
        scale: item.scale,
        release_date: item.release_date,
        manufacturer_name: item.manufacturers?.name
      })) || [];

      setFigurines(formattedData);
    } catch (error) {
      console.error("Error fetching figurines:", error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les figurines.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer cette figurine?")) return;

    try {
      const { error } = await supabase.from("figurines").delete().eq("id", id);
      if (error) throw error;
      
      setFigurines(figurines.filter(item => item.id !== id));
      toast({
        title: "Succès",
        description: "La figurine a été supprimée avec succès.",
      });
    } catch (error) {
      console.error("Error deleting figurine:", error);
      toast({
        title: "Erreur",
        description: "Impossible de supprimer la figurine.",
        variant: "destructive",
      });
    }
  };

  const filteredFigurines = figurines.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (item.manufacturer_name && item.manufacturer_name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const formatDate = (dateString?: string) => {
    if (!dateString) return "Non définie";
    return new Date(dateString).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
    });
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Gestion des Figurines</h2>
            <p className="text-muted-foreground">
              Gérez les figurines présentes sur le site
            </p>
          </div>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Ajouter une figurine
          </Button>
        </div>

        <Separator />

        <div className="flex items-center py-4">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher des figurines..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-8"
            />
          </div>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom</TableHead>
                <TableHead>Fabricant</TableHead>
                <TableHead>Échelle</TableHead>
                <TableHead>Date de sortie</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-10">
                    Chargement des figurines...
                  </TableCell>
                </TableRow>
              ) : filteredFigurines.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-10">
                    Aucune figurine trouvée
                  </TableCell>
                </TableRow>
              ) : (
                filteredFigurines.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell>{item.manufacturer_name || "Non défini"}</TableCell>
                    <TableCell>{item.scale || "Non définie"}</TableCell>
                    <TableCell>{formatDate(item.release_date)}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="text-red-500 hover:text-red-700"
                          onClick={() => handleDelete(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </AdminLayout>
  );
}
