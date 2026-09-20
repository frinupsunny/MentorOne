import { useState } from "react";
import MenteeSidebar from "./MenteeSidebar";
import MenteeNavbar from "./MenteeNavbar";

function MenteeLayout({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-[#080C14] text-white">
      <MenteeSidebar
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      <div className="flex min-w-0 min-h-0 flex-1 flex-col">
        <MenteeNavbar
          onMenuClick={() => setMobileOpen(true)}
        />

        <main className="min-h-0 flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

export default MenteeLayout;
