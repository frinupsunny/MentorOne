import { useLocation, useNavigate } from "react-router-dom";
import {
  FiGrid,
  FiSearch,
  FiCalendar,
  FiShield,
  FiVolume2,
  FiMessageSquare,
  FiX,
  FiLogOut,
} from "react-icons/fi";

function MenteeSidebar({ mobileOpen, setMobileOpen }) {
  const navigate = useNavigate();
  const location = useLocation();

  const items = [
    {
      label: "Dashboard",
      icon: FiGrid,
      path: "/mentee",
    },
    {
      label: "Find Mentor",
      icon: FiSearch,
      path: "/mentee/find-mentor",
    },
    {
      label: "Sessions",
      icon: FiCalendar,
      path: "/mentee/sessions",
    },
    {
      label: "OTP Verification",
      icon: FiShield,
      path: "/mentee/otp",
    },
    {
      label: "HOD Notices",
      icon: FiVolume2,
      path: "/mentee/hod-notices",
    },
    {
      label: "Feedback",
      icon: FiMessageSquare,
      path: "/mentee/feedback",
    },
  ];

  const isActive = (path) => {
    if (path === "/mentee") {
      return location.pathname === "/mentee";
    }

    return (
      location.pathname === path ||
      location.pathname.startsWith(`${path}/`)
    );
  };

  const handleNavigation = (path) => {
    navigate(path);

    if (setMobileOpen) {
      setMobileOpen(false);
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem("mentorOneToken");
    localStorage.removeItem("mentorOneRole");
    localStorage.removeItem("mentorOneUser");
    localStorage.removeItem("mentorOneMentee");

    navigate("/login", { replace: true });

    if (setMobileOpen) {
      setMobileOpen(false);
    }
  };

  return (
    <>
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={`
          fixed inset-y-0 left-0 z-50 w-72
          transform border-r border-slate-800/80 bg-[#0D1220]
          transition-transform duration-300
          lg:static lg:z-auto lg:translate-x-0
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="flex h-full flex-col">
          {/* UNIVERSITY */}
          <div className="border-b border-slate-800/80 px-5 py-5">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-white text-lg font-bold text-[#0D1220]">
                C
              </div>

              <div className="min-w-0">
                <p className="text-sm font-semibold text-white">
                  CHRIST University
                </p>
                <p className="text-[10px] text-slate-500">
                  Deemed to be University
                </p>
              </div>

              <button
                onClick={() => setMobileOpen(false)}
                className="ml-auto flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white lg:hidden"
                aria-label="Close menu"
              >
                <FiX />
              </button>
            </div>
          </div>

          {/* BRAND */}
          <div className="px-5 py-6">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 text-xl shadow-lg shadow-purple-500/20">
                <span className="text-white">👥</span>
              </div>

              <div>
                <h2 className="text-xl font-bold tracking-tight text-white">
                  MentorOne
                </h2>
                <p className="text-[10px] tracking-wide text-slate-500">
                  MENTORING SYSTEM
                </p>
              </div>
            </div>
          </div>

          {/* SECTION */}
          <div className="px-5 mb-3">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">
              Mentee
            </p>
          </div>

          {/* NAVIGATION */}
          <div className="flex-1 overflow-y-auto px-3">
            <nav className="space-y-1">
              {items.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.path);

                return (
                  <button
                    key={item.path}
                    onClick={() => handleNavigation(item.path)}
                    className={`
                      group flex w-full items-center gap-3
                      rounded-xl px-3 py-3
                      text-left text-sm
                      transition-all duration-200
                      ${
                        active
                          ? "bg-gradient-to-r from-violet-500 to-purple-600 text-white shadow-lg shadow-purple-500/20"
                          : "text-slate-400 hover:bg-slate-800/70 hover:text-white"
                      }
                    `}
                  >
                    <Icon
                      className={`
                        flex-shrink-0 text-lg
                        ${
                          active
                            ? "text-white"
                            : "text-slate-500 group-hover:text-slate-300"
                        }
                      `}
                    />
                    <span className="truncate">
                      {item.label}
                    </span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* PROFILE + SIGN OUT */}
          <div className="border-t border-slate-800/80 p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-purple-600 text-xs font-bold text-white">
                FS
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-white">
                  Mentee
                </p>
                <p className="truncate text-[11px] text-slate-500">
                  Student
                </p>
              </div>
            </div>

            <button
              onClick={handleSignOut}
              className="
                mt-3 flex h-11 w-full items-center gap-3
                rounded-lg px-3 text-sm font-medium
                text-slate-400 transition-all duration-200
                hover:bg-red-500/10 hover:text-red-400
              "
            >
              <FiLogOut className="flex-shrink-0 text-lg" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}

export default MenteeSidebar;
