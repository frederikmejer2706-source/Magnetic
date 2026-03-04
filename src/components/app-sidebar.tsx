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
import { BookOpen, Laugh, Scroll, ShoppingBag, Medal, User } from "lucide-react";

const navItems = [
  { title: "MAIN COURSE", url: "/", icon: BookOpen },
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
          <h1 className="text-2xl font-black text-[#FF9F43] tracking-tight">Charisma</h1>
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
                        isActive
                          ? "bg-[#FF9F43]/10 text-[#FF9F43]"
                          : ""
                      }`}
                    >
                      <Link to={item.url} data-testid={`nav-${item.title.toLowerCase().replace(/\s+/g, '-')}`}>
                        <item.icon className={`w-6 h-6 ${isActive ? "text-[#FF9F43]" : ""}`} />
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
