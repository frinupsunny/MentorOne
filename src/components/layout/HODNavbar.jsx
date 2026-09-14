import {
  FiMenu,
  FiSearch,
  FiBell,
  FiSettings,
  FiSun,
} from "react-icons/fi";

function HODNavbar({ onMenuClick }) {
  return (
    <header className="sticky top-0 z-30 flex h-16 w-full flex-shrink-0 items-center justify-between gap-4 border-b border-slate-800/80 bg-[#0D1220] px-4 sm:px-6">
      {/* LEFT SECTION */}
      <div className="flex min-w-0 items-center gap-3">
        {/* MOBILE MENU BUTTON */}
        <button
          type="button"
          onClick={onMenuClick}
          className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-800 hover:text-white lg:hidden"
          aria-label="Open menu"
        >
          <FiMenu className="text-xl" />
        </button>

        {/* PAGE TITLE */}
        <div className="min-w-0">
          <h1 className="truncate text-base font-semibold text-white sm:text-lg">
            HOD Dashboard
          </h1>

          <p className="hidden truncate text-[11px] text-slate-500 sm:block">
            MentorOne Management System
          </p>
        </div>
      </div>

      {/* RIGHT SECTION */}
      <div className="flex flex-shrink-0 items-center gap-1.5 sm:gap-2">
        {/* SEARCH */}
        <div className="hidden h-10 w-48 items-center gap-2 rounded-lg border border-slate-700/60 bg-slate-800/60 px-3 md:flex lg:w-64">
          <FiSearch className="flex-shrink-0 text-slate-500" />

          <input
            type="text"
            placeholder="Search..."
            className="w-full min-w-0 bg-transparent text-sm text-slate-200 outline-none placeholder:text-slate-500"
          />
        </div>

        {/* NOTIFICATIONS */}
        <button
          type="button"
          className="relative flex h-10 w-10 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-800 hover:text-white"
          aria-label="Notifications"
        >
          <FiBell className="text-lg" />

          <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white">
            3
          </span>
        </button>

        {/* SETTINGS */}
        <button
          type="button"
          className="hidden h-10 w-10 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-800 hover:text-white sm:flex"
          aria-label="Settings"
        >
          <FiSettings className="text-lg" />
        </button>

        {/* THEME */}
        <button
          type="button"
          className="hidden h-10 w-10 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-800 hover:text-white sm:flex"
          aria-label="Toggle theme"
        >
          <FiSun className="text-lg" />
        </button>

        {/* DIVIDER */}
        <div className="mx-1 hidden h-7 border-l border-slate-700/70 sm:block" />

        {/* USER PROFILE */}
        <div className="flex items-center gap-2 pl-1">
          <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 text-[11px] font-bold text-white">
            HM
          </div>

          <div className="hidden max-w-[170px] leading-tight lg:block">
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