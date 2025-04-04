
import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Database,
  Newspaper,
  ShoppingBag,
  Ticket,
  Users,
  LayoutDashboard,
  Tags,
  Tv2,
  CircleUser,
  Store,
  LogOut,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { Button } from "../ui/button";
import { useAuth } from "@/hooks/useAuth";

type AdminLayoutProps = {
  children: ReactNode;
};

export default function AdminLayout({ children }: AdminLayoutProps) {
  const location = useLocation();
  const { signOut } = useAuth();
  
  const menuItems = [
    { 
      title: "Dashboard", 
      path: "/admin", 
      icon: LayoutDashboard 
    },
    { 
      title: "Actualités", 
      path: "/admin/news", 
      icon: Newspaper 
    },
    { 
      title: "Figurines", 
      path: "/admin/figurines", 
      icon: ShoppingBag
    },
    { 
      title: "Fabricants", 
      path: "/admin/manufacturers", 
      icon: Store
    },
    { 
      title: "Séries", 
      path: "/admin/series", 
      icon: Tv2
    },
    { 
      title: "Personnages", 
      path: "/admin/characters", 
      icon: CircleUser
    },
    { 
      title: "Licences", 
      path: "/admin/licenses", 
      icon: Ticket
    },
    { 
      title: "Gammes", 
      path: "/admin/lines", 
      icon: Tags
    },
    { 
      title: "Boutiques", 
      path: "/admin/shops", 
      icon: Store
    },
    { 
      title: "Utilisateurs", 
      path: "/admin/users", 
      icon: Users 
    },
  ];

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <Sidebar>
          <SidebarHeader className="flex items-center justify-center py-6">
            <Link to="/" className="flex items-center gap-2">
              <Database className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">FigureNews Admin</span>
            </Link>
          </SidebarHeader>

          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Administration</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {menuItems.map((item) => (
                    <SidebarMenuItem key={item.path}>
                      <SidebarMenuButton
                        asChild
                        tooltip={item.title}
                        isActive={location.pathname === item.path}
                      >
                        <Link to={item.path}>
                          <item.icon />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarSeparator />
          
          <SidebarFooter className="p-4">
            <Button 
              variant="outline" 
              className="w-full flex justify-start" 
              onClick={signOut}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Déconnexion
            </Button>
          </SidebarFooter>
        </Sidebar>

        <div className="flex flex-col flex-1 overflow-hidden">
          <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
