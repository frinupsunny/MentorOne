import {
  FiMenu,
  FiSearch,
  FiBell,
  FiSettings,
  FiSun,
  FiUser,
} from "react-icons/fi";

function Navbar() {
  return (
    <header className="h-16 w-full flex items-center justify-between px-6 bg-[#0D1220] border-b border-slate-800/80 sticky top-0 z-40">

      {/* Left Section */}
      <div className="flex items-center gap-4">

        {/* Mobile Menu */}
        <button
          className="lg:hidden w-9 h-9 flex items-center justify-center rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition"
          aria-label="Open menu"
        >
          <FiMenu className="text-xl" />
        </button>

        <div>
          <h1 className="text-lg font-semibold text-white">
            Coordinator Dashboard
          </h1>

          <p className="text-xs text-slate-500">
            MentorOne Management System
          </p>
        </div>

      </div>

      {/* Right Section */}
      <div className="flex items-center gap-2">

        {/* Search */}
        <div className="hidden md:flex items-center w-64 h-10 px-3 gap-2 rounded-lg bg-slate-800/60 border border-slate-700/60">

          <FiSearch className="text-slate-500 flex-shrink-0" />

          <input
            type="text"
            placeholder="Search mentors, mentees..."
            className="w-full bg-transparent outline-none text-sm text-slate-200 placeholder:text-slate-500"
          />

        </div>

        {/* Notifications */}
        <button
          className="relative w-10 h-10 flex items-center justify-center rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition"
          aria-label="Notifications"
        >
          <FiBell className="text-lg" />

          <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-red-500 text-[9px] font-bold text-white flex items-center justify-center">
            3
          </span>
        </button>

        {/* Settings */}
        <button
          className="w-10 h-10 flex items-center justify-center rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition"
          aria-label="Settings"
        >
          <FiSettings className="text-lg" />
        </button>

        {/* Theme Button */}
        <button
          className="w-10 h-10 flex items-center justify-center rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition"
          aria-label="Toggle theme"
        >
          <FiSun className="text-lg" />
        </button>

        {/* Profile */}
        <button className="flex items-center gap-2 ml-2 pl-3 border-l border-slate-700/70">

          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-teal-400 to-emerald-500 flex items-center justify-center text-white text-xs font-bold">
            MS
          </div>

          <div className="hidden sm:block text-left leading-tight">

            <p className="text-sm font-semibold text-white">
              Dr. Meena S
            </p>

            <p className="text-[11px] text-slate-500">
              Coordinator
            </p>

          </div>

        </button>

      </div>

    </header>
  );
}

export default Navbar;