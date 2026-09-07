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

  return (
    <aside
      className={`
        fixed lg:static
        inset-y-0 left-0
        z-50
        w-[270px]
        flex-shrink-0
        bg-[#0D1220]
        border-r border-slate-800/80
        flex flex-col
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0
      `}
    >
      {/* MOBILE CLOSE */}
      <div className="lg:hidden absolute top-4 right-4 z-10">
        <button
          onClick={onClose}
          className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 transition"
          aria-label="Close menu"
        >
          <FiX />
        </button>
      </div>

      {/* UNIVERSITY */}
      <div className="h-[72px] min-h-[72px] px-5 flex items-center border-b border-slate-800/80">
        <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center text-[#0D1220] font-bold text-lg flex-shrink-0">
          C
        </div>

        <div className="ml-3 min-w-0">
          <p className="text-sm font-medium text-white truncate">
            CHRIST University
          </p>

          <p className="text-[10px] text-slate-500 truncate">
            Deemed to be University
          </p>
        </div>
      </div>

      {/* BRAND */}
      <div className="px-5 pt-6 pb-5">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/20 flex-shrink-0">
            <span className="text-white text-xl">👥</span>
          </div>

          <div>
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
      <div className="px-5 mb-2">
        <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500">
          Coordinator
        </p>
      </div>

      {/* NAVIGATION */}
      <nav className="px-3 flex-1 overflow-y-auto">
        <div className="space-y-1">
          {items.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);

            return (
              <button
                key={item.path}
                onClick={() => handleNavigate(item.path)}
                className={`
                  w-full
                  h-11
                  px-3
                  rounded-lg
                  flex
                  items-center
                  gap-3
                  text-sm
                  transition
                  ${
                    active
                      ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-purple-500/10"
                      : "text-slate-400 hover:text-white hover:bg-slate-800/70"
                  }
                `}
              >
                <Icon className="text-lg flex-shrink-0" />

                <span className="flex-1 text-left truncate">
                  {item.label}
                </span>

                {typeof item.badge === "number" && (
                  <span
                    className={`
                      min-w-5 h-5 px-1.5 rounded-full
                      flex items-center justify-center
                      text-[9px] font-bold
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

      {/* USER */}
      <div className="border-t border-slate-800/80 p-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-xs font-semibold text-white flex-shrink-0">
            MS
          </div>

          <div className="min-w-0">
            <p className="text-sm font-semibold text-white truncate">
              Dr. Meena S
            </p>

            <p className="text-[11px] text-slate-500">
              Coordinator
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;