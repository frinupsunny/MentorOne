import { useState } from "react";

import MentorSidebar from "../components/layout/MentorSidebar";
import MentorNavbar from "../components/layout/MentorNavbar";

function MentorLayout({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-[#080C14] text-white">
      <MentorSidebar
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      <div className="flex min-w-0 min-h-0 flex-1 flex-col">
        <MentorNavbar
          onMenuClick={() => setMobileOpen(true)}
        />

        <main className="min-h-0 flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

export default MentorLayout;