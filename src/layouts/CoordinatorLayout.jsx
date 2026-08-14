import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";

function CoordinatorLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#080C14] text-white flex">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Area */}
      <div className="flex-1 min-w-0 flex flex-col">

        {/* Navbar */}
        <Navbar />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>

      </div>

    </div>
  );
}

export default CoordinatorLayout;