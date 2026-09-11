import {
  FiMenu,
  FiSearch,
  FiBell,
  FiSettings,
  FiSun,
} from "react-icons/fi";

function HODNavbar({ onMenuClick }) {
  return (
    <header className="h-16 w-full flex-shrink-0 flex items-center justify-between gap-4 px-4 sm:px-6 bg-[#0D1220] border-b border-slate-800/80 sticky top-0 z-30">

      {/* Left */}
      <div className="flex min-w-0 items-center gap-3">

        {/* Mobile menu */}
        <button
          onClick={onMenuClick}
          className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition lg:hidden"
          aria-label="Open menu"
        >
          <FiMenu className="text-xl" />
        </button>

        <div className="min-w-0">
          <h1 className="truncate text-base sm:text-lg font-semibold text-white">
            HOD Dashboard
          </h1>

          <p className="hidden sm:block truncate text-[11px] text-slate-500">
            MentorOne Management System
          </p>
        </div>

      </div>


      {/* Right */}
      <div className="flex flex-shrink-0 items-center gap-1.5 sm:gap-2">

        {/* Search */}
        <div className="hidden md:flex h-10 w-48 lg:w-64 items-center gap-2 rounded-lg border border-slate-700/60 bg-slate-800/60 px-3">

          <FiSearch className="flex-shrink-0 text-slate-500" />

          <input
            type="text"
            placeholder="Search..."
            className="w-full min-w-0 bg-transparent text-sm text-slate-200 outline-none placeholder:text-slate-500"
          />

        </div>


        {/* Notifications */}
        <button
          className="relative flex h-10 w-10 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition"
          aria-label="Notifications"
        >
          <FiBell className="text-lg" />

          <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white">
            3
          </span>
        </button>


        {/* Settings */}
        <button
          className="hidden sm:flex h-10 w-10 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition"
          aria-label="Settings"
        >
          <FiSettings className="text-lg" />
        </button>


        {/* Theme */}
        <button
          className="hidden sm:flex h-10 w-10 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition"
          aria-label="Toggle theme"
        >
          <FiSun className="text-lg" />
        </button>


        {/* Divider */}
        <div className="mx-1 hidden h-7 border-l border-slate-700/70 sm:block" />


        {/* User */}
        <div className="flex items-center gap-2 pl-1">

          <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 text-[11px] font-bold text-white">
            HM
          </div>

          <div className="hidden lg:block max-w-[170px] leading-tight">
            <p className="truncate text-sm font-semibold text-white">
              Dr. Helen Mathew
            </p>

            <p className="truncate text-[11px] text-slate-500">
              HOD · Data Science
            </p>
          </div>

        </div>

      </div>

    </header>
  );
}

export default HODNavbar;