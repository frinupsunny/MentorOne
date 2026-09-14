import { useState } from "react";

import HODSidebar from "../components/layout/HODSidebar";
import HODNavbar from "../components/layout/HODNavbar";

function HODLayout({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-[#080C14] text-white">
      <HODSidebar
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      <div className="flex min-w-0 min-h-0 flex-1 flex-col">
        <HODNavbar
          onMenuClick={() => setMobileOpen(true)}
        />

        <main className="min-h-0 flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

export default HODLayout;