
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Database, ShoppingBag, Store, Users } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import AdminLayout from "@/components/admin/AdminLayout";
import { Separator } from "@/components/ui/separator";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    newsCount: 0,
    figurinesCount: 0,
    manufacturersCount: 0,
    usersCount: 0,
  });
  
  const [chartData, setChartData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("news");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Get counts from different tables
        const [newsResult, figurinesResult, manufacturersResult] = await Promise.all([
          supabase.from('news').select('id', { count: 'exact', head: true }),
          supabase.from('figurines').select('id', { count: 'exact', head: true }),
          supabase.from('manufacturers').select('id', { count: 'exact', head: true })
        ]);
        
        setStats({
          newsCount: newsResult.count || 0,
          figurinesCount: figurinesResult.count || 0,
          manufacturersCount: manufacturersResult.count || 0,
          usersCount: 0, // Would be connected to auth.users when auth is implemented
        });
      } catch (error) {
        toast({
          title: "Erreur",
          description: "Impossible de charger les statistiques",
          variant: "destructive",
        });
        console.error("Error fetching stats:", error);
      }
    };

    const fetchChartData = async () => {
      setIsLoading(true);
      try {
        // Get recent news with created_at dates
        const { data: newsData, error: newsError } = await supabase
          .from('news')
          .select('created_at')
          .order('created_at', { ascending: false })
          .limit(10);

        if (newsError) throw newsError;
        
        // Get recent figurines with release_date
        const { data: figurinesData, error: figurinesError } = await supabase
          .from('figurines')
          .select('release_date')
          .not('release_date', 'is', null)
          .order('release_date', { ascending: false })
          .limit(10);
          
        if (figurinesError) throw figurinesError;
        
        // Process news data for chart
        const newsChartData = processNewsData(newsData || []);
        // Process figurines data for chart
        const figurinesChartData = processFigurinesData(figurinesData || []);
        
        setChartData(activeTab === "news" ? newsChartData : figurinesChartData);
      } catch (error) {
        toast({
          title: "Erreur",
          description: "Impossible de charger les données du graphique",
          variant: "destructive",
        });
        console.error("Error fetching chart data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
    fetchChartData();
  }, [activeTab]);

  // Process news data for chart
  const processNewsData = (data: any[]) => {
    const grouped: {[key: string]: number} = {};
    
    // Group by day
    data.forEach(item => {
      const date = format(new Date(item.created_at), 'dd MMM', { locale: fr });
      grouped[date] = (grouped[date] || 0) + 1;
    });
    
    // Convert to array for chart
    return Object.keys(grouped).map(date => ({
      date,
      count: grouped[date]
    })).reverse();
  };
  
  // Process figurines data for chart
  const processFigurinesData = (data: any[]) => {
    const grouped: {[key: string]: number} = {};
    
    // Group by month for release dates
    data.forEach(item => {
      if (item.release_date) {
        const date = format(new Date(item.release_date), 'MMM yyyy', { locale: fr });
        grouped[date] = (grouped[date] || 0) + 1;
      }
    });
    
    // Convert to array for chart
    return Object.keys(grouped).map(date => ({
      date,
      count: grouped[date]
    })).reverse();
  };

  const statCards = [
    {
      title: "Actualités",
      value: stats.newsCount,
      description: "Articles publiés",
      icon: Database,
      color: "text-blue-500",
    },
    {
      title: "Figurines",
      value: stats.figurinesCount,
      description: "Figurines enregistrées",
      icon: ShoppingBag,
      color: "text-green-500",
    },
    {
      title: "Fabricants",
      value: stats.manufacturersCount,
      description: "Fabricants actifs",
      icon: Store,
      color: "text-yellow-500",
    },
    {
      title: "Utilisateurs",
      value: stats.usersCount,
      description: "Comptes enregistrés",
      icon: Users,
      color: "text-purple-500",
    },
  ];

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">
            Bienvenue sur le tableau de bord d'administration FigureNews.
          </p>
        </div>
        
        <Separator />
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {statCards.map((card, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {card.title}
                </CardTitle>
                <card.icon className={`h-4 w-4 ${card.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{card.value}</div>
                <p className="text-xs text-muted-foreground">
                  {card.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Statistiques récentes</CardTitle>
            <Tabs defaultValue="news" onValueChange={handleTabChange}>
              <TabsList>
                <TabsTrigger value="news">Actualités</TabsTrigger>
                <TabsTrigger value="figurines">Figurines</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <p>Chargement...</p>
              </div>
            ) : chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Bar 
                    dataKey="count" 
                    fill={activeTab === "news" ? "#3b82f6" : "#22c55e"} 
                    name={activeTab === "news" ? "Actualités" : "Figurines"} 
                  />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex justify-center items-center h-64">
                <p>Aucune donnée disponible</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
