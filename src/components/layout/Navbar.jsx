import {
  FiMenu,
  FiSearch,
  FiBell,
  FiSettings,
  FiSun,
} from "react-icons/fi";

function Navbar({ onMenuClick }) {
  return (
    <header className="h-16 min-h-16 w-full flex items-center justify-between px-4 sm:px-6 bg-[#0D1220] border-b border-slate-800/80 sticky top-0 z-30">
      
      {/* LEFT */}
      <div className="flex items-center gap-3 min-w-0">
        {/* MOBILE MENU */}
        <button
          onClick={onMenuClick}
          className="lg:hidden w-9 h-9 flex-shrink-0 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition"
          aria-label="Open menu"
        >
          <FiMenu className="text-xl" />
        </button>

        {/* TITLE */}
        <div className="min-w-0">
          <h1 className="text-base sm:text-lg font-semibold text-white truncate">
            Coordinator Dashboard
          </h1>

          <p className="hidden sm:block text-xs text-slate-500 truncate">
            MentorOne Management System
          </p>
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">

        {/* SEARCH */}
        <div className="hidden md:flex items-center w-48 lg:w-64 h-10 px-3 gap-2 rounded-lg bg-slate-800/60 border border-slate-700/60">
          <FiSearch className="text-slate-500 flex-shrink-0" />

          <input
            type="text"
            placeholder="Search mentors, mentees..."
            className="w-full min-w-0 bg-transparent outline-none text-sm text-slate-200 placeholder:text-slate-500"
          />
        </div>

        {/* NOTIFICATIONS */}
        <button
          className="relative w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition"
          aria-label="Notifications"
        >
          <FiBell className="text-lg" />

          <span className="absolute top-0.5 right-0.5 sm:top-1.5 sm:right-1.5 w-4 h-4 rounded-full bg-red-500 text-[9px] font-bold text-white flex items-center justify-center">
            3
          </span>
        </button>

        {/* SETTINGS */}
        <button
          className="hidden sm:flex w-10 h-10 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition"
          aria-label="Settings"
        >
          <FiSettings className="text-lg" />
        </button>

        {/* THEME */}
        <button
          className="hidden sm:flex w-10 h-10 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition"
          aria-label="Toggle theme"
        >
          <FiSun className="text-lg" />
        </button>

        {/* PROFILE */}
        <div className="flex items-center gap-2 ml-1 sm:ml-2 pl-2 sm:pl-3 border-l border-slate-700/70">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-br from-teal-400 to-emerald-500 flex items-center justify-center text-white text-[10px] sm:text-xs font-bold flex-shrink-0">
            MS
          </div>

          <div className="hidden lg:block text-left leading-tight">
            <p className="text-sm font-semibold text-white whitespace-nowrap">
              Dr. Meena S
            </p>

            <p className="text-[11px] text-slate-500">
              Coordinator
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;