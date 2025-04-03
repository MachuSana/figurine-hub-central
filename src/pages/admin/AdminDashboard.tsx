
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Database, ShoppingBag, Store, Users } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import AdminLayout from "@/components/admin/AdminLayout";
import { Separator } from "@/components/ui/separator";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    newsCount: 0,
    figurinesCount: 0,
    manufacturersCount: 0,
    usersCount: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
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
    };

    fetchStats();
  }, []);

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
      </div>
    </AdminLayout>
  );
}
