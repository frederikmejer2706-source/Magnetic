import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import Index from "./pages/Index";
import Training from "./pages/Training";
import Missions from "./pages/Missions";
import Favorites from "./pages/Favorites";
import JokeMaker from "./pages/JokeMaker";
import ComingSoon from "./pages/ComingSoon";
import NotFound from "./pages/NotFound";
import Onboarding from "./pages/Onboarding";

const queryClient = new QueryClient();

const ProtectedHome = () => {
  const done = localStorage.getItem("onboarding-complete");
  return done ? <Index /> : <Navigate to="/onboarding" replace />;
};

const AppLayout = ({ children }: { children: React.ReactNode }) => (
  <SidebarProvider>
    <AppSidebar />
    <main className="flex-1 overflow-auto">
      <div className="p-2 md:hidden">
        <SidebarTrigger />
      </div>
      {children}
    </main>
  </SidebarProvider>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Routes>
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/training/:setId" element={<Training />} />
        <Route path="/" element={<AppLayout><ProtectedHome /></AppLayout>} />
        <Route path="/missions" element={<AppLayout><Missions /></AppLayout>} />
        <Route path="/favorites" element={<AppLayout><Favorites /></AppLayout>} />
        <Route path="/jokes" element={<AppLayout><JokeMaker /></AppLayout>} />
        <Route path="/quests" element={<AppLayout><ComingSoon title="Quests" /></AppLayout>} />
        <Route path="/shop" element={<AppLayout><ComingSoon title="Shop" /></AppLayout>} />
        <Route path="/leaderboard" element={<AppLayout><ComingSoon title="Leaderboard" /></AppLayout>} />
        <Route path="/profile" element={<AppLayout><ComingSoon title="Profile" /></AppLayout>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
