import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";

function CoordinatorLayout({ children }) {
  return (
    <div className="h-screen overflow-hidden bg-[#080C14] text-white flex">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Area */}
      <div className="flex-1 min-w-0 min-h-0 flex flex-col">

        {/* Navbar */}
        <Navbar />

        {/* Page Content */}
        <main className="flex-1 min-h-0 overflow-y-auto">
          {children}
        </main>

      </div>

    </div>
  );
}

export default CoordinatorLayout;