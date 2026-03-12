import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { BookOpen, Target, Heart, Laugh, Scroll, ShoppingBag, Medal, User } from "lucide-react";

const navItems = [
  { title: "MAIN COURSE", url: "/", icon: BookOpen },
  { title: "MISSIONS", url: "/missions", icon: Target },
  { title: "FAVOURITES", url: "/favorites", icon: Heart },
  { title: "JOKE MAKER", url: "/jokes", icon: Laugh },
  { title: "QUESTS", url: "/quests", icon: Scroll },
  { title: "SHOP", url: "/shop", icon: ShoppingBag },
  { title: "LEADERBOARD", url: "/leaderboard", icon: Medal },
  { title: "PROFILE", url: "/profile", icon: User },
];

export function AppSidebar() {
  const location = useLocation();

  return (
    <Sidebar>
      <SidebarContent className="pt-6">
        <div className="px-6 pb-6">
          <h1 className="text-2xl font-black text-[#58CC02] tracking-tight">Magnetic</h1>
        </div>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => {
                const isActive = location.pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      className={`py-4 px-5 rounded-xl text-base font-black tracking-wide ${
                        isActive ? "bg-[#58CC02]/10 text-[#58CC02]" : ""
                      }`}
                    >
                      <Link to={item.url} data-testid={`nav-${item.title.toLowerCase().replace(/\s+/g, '-')}`}>
                        <item.icon className={`w-6 h-6 ${isActive ? "text-[#58CC02]" : ""}`} />
                        <span className="text-base font-black uppercase tracking-wide">{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
