import { useLocation, useNavigate } from "react-router-dom";

import {
  FiGrid,
  FiBookOpen,
  FiRepeat,
  FiBell,
  FiVolume2,
  FiEdit3,
  FiStar,
  FiBarChart2,
  FiCalendar,
  FiX,
  FiLogOut,
} from "react-icons/fi";

function Sidebar({ isOpen, onClose }) {
  const navigate = useNavigate();
  const location = useLocation();

  const items = [
    {
      label: "Dashboard",
      icon: FiGrid,
      path: "/coordinator",
    },
    {
      label: "My Mentors",
      icon: FiBookOpen,
      path: "/coordinator/mentors",
    },
    {
      label: "Assign Mentees",
      icon: FiRepeat,
      path: "/coordinator/assign-mentees",
    },
    {
      label: "Notifications",
      icon: FiBell,
      path: "/coordinator/notifications",
      badge: 4,
    },
    {
      label: "HOD Notices",
      icon: FiVolume2,
      path: "/coordinator/hod-notices",
      badge: 0,
    },
    {
      label: "Remarks",
      icon: FiEdit3,
      path: "/coordinator/remarks",
    },
    {
      label: "Feedback",
      icon: FiStar,
      path: "/coordinator/feedback",
    },
    {
      label: "Reports",
      icon: FiBarChart2,
      path: "/coordinator/reports",
    },
    {
      label: "Calendar",
      icon: FiCalendar,
      path: "/coordinator/calendar",
    },
  ];

  const isActive = (path) => {
    if (path === "/coordinator") {
      return location.pathname === "/coordinator";
    }

    return (
      location.pathname === path ||
      location.pathname.startsWith(`${path}/`)
    );
  };

  const handleNavigate = (path) => {
    navigate(path);
    onClose?.();
  };

  const handleSignOut = () => {
    // Remove saved login information
    localStorage.removeItem("mentorOneUser");

    // Close mobile sidebar
    onClose?.();

    // Redirect to login page
    navigate("/login", { replace: true });
  };

  return (
    <>
      {/* MOBILE OVERLAY */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed inset-y-0 left-0 z-50
          flex w-[270px] flex-shrink-0 flex-col
          border-r border-slate-800/80
          bg-[#0D1220]
          transform transition-transform duration-300 ease-in-out
          lg:static lg:translate-x-0
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* MOBILE CLOSE BUTTON */}
        <div className="absolute right-4 top-4 z-10 lg:hidden">
          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-800 hover:text-white"
            aria-label="Close menu"
          >
            <FiX />
          </button>
        </div>

        {/* UNIVERSITY */}
        <div className="flex h-[72px] min-h-[72px] items-center border-b border-slate-800/80 px-5">
          <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-white text-lg font-bold text-[#0D1220]">
            C
          </div>

          <div className="ml-3 min-w-0">
            <p className="truncate text-sm font-medium text-white">
              CHRIST University
            </p>

            <p className="truncate text-[10px] text-slate-500">
              Deemed to be University
            </p>
          </div>
        </div>

        {/* BRAND */}
        <div className="px-5 pb-5 pt-6">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 text-xl shadow-lg shadow-purple-500/20">
              <span className="text-white">👥</span>
            </div>

            <div className="min-w-0">
              <h2 className="text-xl font-bold text-white">
                MentorOne
              </h2>

              <p className="text-[10px] tracking-wide text-slate-500">
                MENTORING SYSTEM
              </p>
            </div>
          </div>
        </div>

        {/* SECTION TITLE */}
        <div className="mb-2 px-5">
          <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500">
            Coordinator
          </p>
        </div>

        {/* NAVIGATION */}
        <nav className="flex-1 overflow-y-auto px-3">
          <div className="space-y-1">
            {items.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);

              return (
                <button
                  key={item.path}
                  onClick={() => handleNavigate(item.path)}
                  className={`
                    flex h-11 w-full items-center gap-3
                    rounded-lg px-3 text-sm transition
                    ${
                      active
                        ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-purple-500/10"
                        : "text-slate-400 hover:bg-slate-800/70 hover:text-white"
                    }
                  `}
                >
                  <Icon className="flex-shrink-0 text-lg" />

                  <span className="flex-1 truncate text-left">
                    {item.label}
                  </span>

                  {typeof item.badge === "number" && (
                    <span
                      className={`
                        flex h-5 min-w-5 items-center justify-center
                        rounded-full px-1.5 text-[9px] font-bold
                        ${
                          item.badge > 0
                            ? "bg-red-500/20 text-red-400"
                            : "bg-slate-700 text-slate-400"
                        }
                      `}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </nav>

        {/* USER AND SIGN OUT */}
        <div className="border-t border-slate-800/80 p-4">
          {/* USER PROFILE */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-purple-600 text-xs font-semibold text-white">
              MS
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-white">
                Dr. Meena S
              </p>

              <p className="text-[11px] text-slate-500">
                Coordinator
              </p>
            </div>
          </div>

          {/* SIGN OUT BUTTON */}
          <button
            onClick={handleSignOut}
            className="
              mt-4 flex h-11 w-full items-center gap-3
              rounded-lg px-3 text-sm
              text-slate-400 transition
              hover:bg-red-500/10 hover:text-red-400
            "
          >
            <FiLogOut className="text-lg" />

            <span>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;