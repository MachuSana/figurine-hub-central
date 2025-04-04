
import { useEffect, useState } from "react";
import { PlusCircle, Search, Edit, Trash2, Globe } from "lucide-react";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import AdminLayout from "@/components/admin/AdminLayout";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Manufacturer = {
  id: string;
  name: string;
  description: string | null;
  website: string | null;
  created_at: string;
};

export default function AdminManufacturers() {
  const [manufacturers, setManufacturers] = useState<Manufacturer[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentManufacturer, setCurrentManufacturer] = useState<Manufacturer | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    website: "",
  });

  useEffect(() => {
    fetchManufacturers();
  }, []);

  const fetchManufacturers = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("manufacturers")
        .select("*")
        .order("name");

      if (error) throw error;
      setManufacturers(data || []);
    } catch (error) {
      console.error("Error fetching manufacturers:", error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les fabricants.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer ce fabricant?")) return;

    try {
      const { error } = await supabase.from("manufacturers").delete().eq("id", id);
      if (error) throw error;
      
      setManufacturers(manufacturers.filter(item => item.id !== id));
      toast({
        title: "Succès",
        description: "Le fabricant a été supprimé avec succès.",
      });
    } catch (error) {
      console.error("Error deleting manufacturer:", error);
      toast({
        title: "Erreur",
        description: "Impossible de supprimer le fabricant.",
        variant: "destructive",
      });
    }
  };

  const handleOpenCreateDialog = () => {
    setFormData({
      name: "",
      description: "",
      website: "",
    });
    setIsCreateDialogOpen(true);
  };

  const handleOpenEditDialog = (item: Manufacturer) => {
    setCurrentManufacturer(item);
    setFormData({
      name: item.name,
      description: item.description || "",
      website: item.website || "",
    });
    setIsEditDialogOpen(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCreateManufacturer = async () => {
    try {      
      const { error } = await supabase.from("manufacturers").insert({
        name: formData.name,
        description: formData.description || null,
        website: formData.website || null,
      });
      
      if (error) throw error;
      
      toast({
        title: "Succès",
        description: "Le fabricant a été créé avec succès.",
      });
      
      fetchManufacturers();
      setIsCreateDialogOpen(false);
    } catch (error) {
      console.error("Error creating manufacturer:", error);
      toast({
        title: "Erreur",
        description: "Impossible de créer le fabricant.",
        variant: "destructive",
      });
    }
  };

  const handleUpdateManufacturer = async () => {
    if (!currentManufacturer) return;
    
    try {
      const { error } = await supabase
        .from("manufacturers")
        .update({
          name: formData.name,
          description: formData.description || null,
          website: formData.website || null,
        })
        .eq("id", currentManufacturer.id);
      
      if (error) throw error;
      
      toast({
        title: "Succès",
        description: "Le fabricant a été mis à jour avec succès.",
      });
      
      fetchManufacturers();
      setIsEditDialogOpen(false);
    } catch (error) {
      console.error("Error updating manufacturer:", error);
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour le fabricant.",
        variant: "destructive",
      });
    }
  };

  const filteredManufacturers = manufacturers.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (item.description?.toLowerCase() || "").includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Gestion des Fabricants</h2>
            <p className="text-muted-foreground">
              Gérez les fabricants de figurines
            </p>
          </div>
          <Button onClick={handleOpenCreateDialog}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Ajouter un fabricant
          </Button>
        </div>

        <Separator />

        <div className="flex items-center py-4">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher des fabricants..."
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
                <TableHead>Site Web</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-10">
                    Chargement des fabricants...
                  </TableCell>
                </TableRow>
              ) : filteredManufacturers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-10">
                    Aucun fabricant trouvé
                  </TableCell>
                </TableRow>
              ) : (
                filteredManufacturers.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell>
                      {item.website ? (
                        <a 
                          href={item.website} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-primary flex items-center gap-1 hover:underline"
                        >
                          <Globe className="h-4 w-4" />
                          Site web
                        </a>
                      ) : (
                        <span className="text-gray-500">-</span>
                      )}
                    </TableCell>
                    <TableCell className="max-w-xs truncate">
                      {item.description || <span className="text-gray-500">-</span>}
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => handleOpenEditDialog(item)}
                        >
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

      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Ajouter un fabricant</DialogTitle>
            <DialogDescription>
              Créez un nouveau fabricant de figurines
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Nom</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Nom du fabricant"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="website">Site Web</Label>
              <Input
                id="website"
                name="website"
                value={formData.website}
                onChange={handleInputChange}
                placeholder="https://exemple.com"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Description du fabricant"
                className="min-h-[120px]"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
              Annuler
            </Button>
            <Button onClick={handleCreateManufacturer}>
              Créer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Modifier le fabricant</DialogTitle>
            <DialogDescription>
              Modifiez les informations du fabricant
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-name">Nom</Label>
              <Input
                id="edit-name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Nom du fabricant"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-website">Site Web</Label>
              <Input
                id="edit-website"
                name="website"
                value={formData.website}
                onChange={handleInputChange}
                placeholder="https://exemple.com"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-description">Description</Label>
              <Textarea
                id="edit-description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Description du fabricant"
                className="min-h-[120px]"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Annuler
            </Button>
            <Button onClick={handleUpdateManufacturer}>
              Mettre à jour
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
