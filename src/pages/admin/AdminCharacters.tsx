
import { useEffect, useState } from "react";
import { PlusCircle, Search, Edit, Trash2, Tv } from "lucide-react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import AdminLayout from "@/components/admin/AdminLayout";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/use-toast";

type Character = {
  id: string;
  name: string;
  description: string | null;
  series_id: string | null;
  series_name?: string;
  created_at: string;
};

type Series = {
  id: string;
  name: string;
};

export default function AdminCharacters() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [series, setSeries] = useState<Series[]>([]);
  const [loading, setLoading] = useState(true);
  const [seriesLoading, setSeriesLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentCharacter, setCurrentCharacter] = useState<Character | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    series_id: "",
  });

  useEffect(() => {
    fetchCharacters();
    fetchSeries();
  }, []);

  const fetchCharacters = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("characters")
        .select(`
          *,
          series:series_id (
            id,
            name
          )
        `)
        .order("name");

      if (error) throw error;
      
      const formattedData = data.map(char => ({
        ...char,
        series_name: char.series?.name
      }));
      
      setCharacters(formattedData || []);
    } catch (error) {
      console.error("Error fetching characters:", error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les personnages.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchSeries = async () => {
    setSeriesLoading(true);
    try {
      const { data, error } = await supabase
        .from("series")
        .select("id, name")
        .order("name");

      if (error) throw error;
      setSeries(data || []);
    } catch (error) {
      console.error("Error fetching series:", error);
    } finally {
      setSeriesLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer ce personnage?")) return;

    try {
      const { error } = await supabase.from("characters").delete().eq("id", id);
      if (error) throw error;
      
      setCharacters(characters.filter(item => item.id !== id));
      toast({
        title: "Succès",
        description: "Le personnage a été supprimé avec succès.",
      });
    } catch (error) {
      console.error("Error deleting character:", error);
      toast({
        title: "Erreur",
        description: "Impossible de supprimer le personnage.",
        variant: "destructive",
      });
    }
  };

  const handleOpenCreateDialog = () => {
    setFormData({
      name: "",
      description: "",
      series_id: "",
    });
    setIsCreateDialogOpen(true);
  };

  const handleOpenEditDialog = (item: Character) => {
    setCurrentCharacter(item);
    setFormData({
      name: item.name,
      description: item.description || "",
      series_id: item.series_id || "",
    });
    setIsEditDialogOpen(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({ ...prev, series_id: value }));
  };

  const handleCreateCharacter = async () => {
    try {      
      const { error } = await supabase.from("characters").insert({
        name: formData.name,
        description: formData.description || null,
        series_id: formData.series_id || null,
      });
      
      if (error) throw error;
      
      toast({
        title: "Succès",
        description: "Le personnage a été créé avec succès.",
      });
      
      fetchCharacters();
      setIsCreateDialogOpen(false);
    } catch (error) {
      console.error("Error creating character:", error);
      toast({
        title: "Erreur",
        description: "Impossible de créer le personnage.",
        variant: "destructive",
      });
    }
  };

  const handleUpdateCharacter = async () => {
    if (!currentCharacter) return;
    
    try {
      const { error } = await supabase
        .from("characters")
        .update({
          name: formData.name,
          description: formData.description || null,
          series_id: formData.series_id || null,
        })
        .eq("id", currentCharacter.id);
      
      if (error) throw error;
      
      toast({
        title: "Succès",
        description: "Le personnage a été mis à jour avec succès.",
      });
      
      fetchCharacters();
      setIsEditDialogOpen(false);
    } catch (error) {
      console.error("Error updating character:", error);
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour le personnage.",
        variant: "destructive",
      });
    }
  };

  const filteredCharacters = characters.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (item.description?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
    (item.series_name?.toLowerCase() || "").includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Gestion des Personnages</h2>
            <p className="text-muted-foreground">
              Gérez les personnages de figurines
            </p>
          </div>
          <Button onClick={handleOpenCreateDialog}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Ajouter un personnage
          </Button>
        </div>

        <Separator />

        <div className="flex items-center py-4">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher des personnages..."
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
                <TableHead>Série</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-10">
                    Chargement des personnages...
                  </TableCell>
                </TableRow>
              ) : filteredCharacters.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-10">
                    Aucun personnage trouvé
                  </TableCell>
                </TableRow>
              ) : (
                filteredCharacters.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell>
                      {item.series_name ? (
                        <div className="flex items-center gap-1">
                          <Tv className="h-4 w-4 text-muted-foreground" />
                          <span>{item.series_name}</span>
                        </div>
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
            <DialogTitle>Ajouter un personnage</DialogTitle>
            <DialogDescription>
              Créez un nouveau personnage
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
                placeholder="Nom du personnage"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="series">Série</Label>
              <Select value={formData.series_id} onValueChange={handleSelectChange}>
                <SelectTrigger id="series">
                  <SelectValue placeholder="Sélectionnez une série" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Aucune série</SelectItem>
                  {series.map((s) => (
                    <SelectItem key={s.id} value={s.id}>
                      {s.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Description du personnage"
                className="min-h-[120px]"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
              Annuler
            </Button>
            <Button onClick={handleCreateCharacter}>
              Créer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Modifier le personnage</DialogTitle>
            <DialogDescription>
              Modifiez les informations du personnage
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
                placeholder="Nom du personnage"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-series">Série</Label>
              <Select value={formData.series_id} onValueChange={handleSelectChange}>
                <SelectTrigger id="edit-series">
                  <SelectValue placeholder="Sélectionnez une série" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Aucune série</SelectItem>
                  {series.map((s) => (
                    <SelectItem key={s.id} value={s.id}>
                      {s.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-description">Description</Label>
              <Textarea
                id="edit-description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Description du personnage"
                className="min-h-[120px]"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Annuler
            </Button>
            <Button onClick={handleUpdateCharacter}>
              Mettre à jour
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
