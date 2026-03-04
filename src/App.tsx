import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import Index from "./pages/Index";
import Training from "./pages/Training";
import NotFound from "./pages/NotFound";
import ComingSoon from "./pages/ComingSoon";
import JokeMaker from "./pages/JokeMaker";
import { useProgress } from "@/hooks/useProgress";
import { Trophy, Zap } from "lucide-react";
import powerCharacter from "@/assets/power-character.png";

const queryClient = new QueryClient();

function AppHeader() {
  const { getProgress } = useProgress();
  const progress = getProgress();

  return (
    <header className="sticky top-0 z-40 w-full bg-white dark:bg-card border-b border-border px-4 py-3 flex items-center justify-between gap-4">
      <SidebarTrigger data-testid="button-sidebar-toggle" />
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-[#FFD93D] fill-[#FFD93D]" />
          <span className="text-base font-black text-muted-foreground">Lvl {progress.completedSets.length + 1}</span>
        </div>
        <div className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-[#FF9F43] fill-[#FF9F43]" />
          <span className="text-base font-black text-muted-foreground">{progress.xp}</span>
        </div>
        <div className="w-8 h-8 rounded-full bg-pink-400 border-2 border-white shadow-sm overflow-hidden">
          <img src={powerCharacter} alt="Avatar" className="w-full h-full object-cover" />
        </div>
      </div>
    </header>
  );
}

function Layout() {
  const location = useLocation();
  const isTraining = location.pathname.startsWith("/training/");

  if (isTraining) {
    return (
      <Routes>
        <Route path="/training/:setId" element={<Training />} />
      </Routes>
    );
  }

  const style = {
    "--sidebar-width": "16rem",
    "--sidebar-width-icon": "3rem",
  };

  return (
    <SidebarProvider style={style as React.CSSProperties}>
      <div className="flex h-screen w-full">
        <AppSidebar />
        <div className="flex flex-col flex-1 min-w-0">
          <AppHeader />
          <main className="flex-1 overflow-auto">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/jokes" element={<JokeMaker />} />
              <Route path="/quests" element={<ComingSoon title="Quests" />} />
              <Route path="/shop" element={<ComingSoon title="Shop" />} />
              <Route path="/leaderboard" element={<ComingSoon title="Leaderboard" />} />
              <Route path="/profile" element={<ComingSoon title="Profile" />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
