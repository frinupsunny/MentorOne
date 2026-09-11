import { useLocation, useNavigate } from "react-router-dom";

import {
  FiGrid,
  FiUserPlus,
  FiRepeat,
  FiUsers,
  FiCalendar,
  FiBookOpen,
  FiAlertTriangle,
  FiVolume2,
  FiUserCheck,
  FiX,
  FiLogOut,
} from "react-icons/fi";

function HODSidebar({ mobileOpen, setMobileOpen }) {
  const navigate = useNavigate();
  const location = useLocation();

  const items = [
    {
      label: "Dashboard",
      icon: FiGrid,
      path: "/hod",
    },
    {
      label: "Assign Coordinator",
      icon: FiUserPlus,
      path: "/hod/assign-coordinator",
    },
    {
      label: "Mentee Allocation",
      icon: FiRepeat,
      path: "/hod/allocation",
    },
    {
      label: "Mentor Capacity",
      icon: FiUsers,
      path: "/hod/capacity",
    },
    {
      label: "Session Compliance",
      icon: FiCalendar,
      path: "/hod/sessions",
    },
    {
      label: "Mentoring Diaries",
      icon: FiBookOpen,
      path: "/hod/diaries",
    },
    {
      label: "Critical Issues",
      icon: FiAlertTriangle,
      path: "/hod/issues",
    },
    {
      label: "Department Notice",
      icon: FiVolume2,
      path: "/hod/notices",
    },
    {
      label: "Peer Mentoring",
      icon: FiUserCheck,
      path: "/hod/peer",
    },
  ];

  const isActive = (path) => {
    if (path === "/hod") {
      return location.pathname === "/hod";
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
    localStorage.removeItem("mentorOneUser");
    navigate("/login", { replace: true });
    
    if (setMobileOpen) {
      setMobileOpen(false);
    }
  };

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50
          w-72
          transform
          border-r border-slate-800/80
          bg-[#0D1220]
          transition-transform duration-300
          lg:static lg:z-auto lg:translate-x-0
          ${
            mobileOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }
        `}
      >
        <div className="flex h-full flex-col">

          {/* =================================================
              UNIVERSITY HEADER
          ================================================= */}
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

              {/* Mobile close */}
              <button
                onClick={() => setMobileOpen(false)}
                className="ml-auto flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white lg:hidden"
              >
                <FiX />
              </button>

            </div>

          </div>


          {/* =================================================
              BRAND
          ================================================= */}
          <div className="px-5 py-6">

            <div className="flex items-center gap-3">

              <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 text-xl text-white shadow-lg shadow-purple-500/20">
                <FiUsers />
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


          {/* =================================================
              NAVIGATION
          ================================================= */}
          <div className="flex-1 overflow-y-auto px-3">

            <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">
              Head of Department
            </p>

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


          {/* =================================================
              USER PROFILE
          ================================================= */}
          <div className="border-t border-slate-800/80 p-4">
  <div className="flex items-center gap-3 rounded-xl px-2 py-2">
    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 text-xs font-bold text-white">
      HM
    </div>

    <div className="min-w-0 flex-1">
      <p className="truncate text-sm font-semibold text-white">
        Dr. Helen Mathew
      </p>

      <p className="truncate text-[11px] text-slate-500">
        HOD · Data Science
      </p>
    </div>
  </div>

  <button
    onClick={handleSignOut}
    className="mt-3 flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-slate-400 transition hover:bg-red-500/10 hover:text-red-400"
  >
    <FiLogOut className="text-lg" />
    <span>Sign Out</span>
  </button>
</div>

        </div>
      </aside>
    </>
  );
}

export default HODSidebar;