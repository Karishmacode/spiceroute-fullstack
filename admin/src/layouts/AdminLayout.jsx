import { useState } from "react";
import Sidebar from "../components/layout/Sidebar";
import MiniTopbar from "../components/layout/MiniTopbar";

const AdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    // <div className="min-h-screen text-white bg-[radial-gradient(circle_at_top,#0f1f46_0%,#070b14_45%,#050816_100%)]">
    <div className="min-h-screen admin-root">
      <MiniTopbar onMenuClick={() => setSidebarOpen(true)} />

      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
        />
      )}

      <main className="lg:pl-[220px] px-3 lg:pr-4 py-3">
        <div className="max-w-[1720px] mx-auto">{children}</div>
      </main>
    </div>
  );
};

export default AdminLayout;