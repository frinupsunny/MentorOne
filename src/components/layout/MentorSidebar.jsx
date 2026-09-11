import { useLocation, useNavigate } from "react-router-dom";

import {
  FiGrid,
  FiUsers,
  FiSearch,
  FiCalendar,
  FiUserPlus,
  FiShield,
  FiEdit3,
  FiAlertTriangle,
  FiVolume2,
  FiMessageSquare,
  FiUser,
  FiX,
  FiLogOut,
} from "react-icons/fi";

function MentorSidebar({ mobileOpen, setMobileOpen }) {
  const navigate = useNavigate();
  const location = useLocation();

  const items = [
    {
      label: "Dashboard",
      icon: FiGrid,
      path: "/mentor",
    },
    {
      label: "My Mentees",
      icon: FiUsers,
      path: "/mentor/mentees",
    },
    {
      label: "Find Mentor-Mentee",
      icon: FiSearch,
      path: "/mentor/connect",
    },
    {
      label: "Sessions",
      icon: FiCalendar,
      path: "/mentor/sessions",
    },
    {
      label: "Group Meetings",
      icon: FiUsers,
      path: "/mentor/group-meetings",
    },
    {
      label: "OTP Verification",
      icon: FiShield,
      path: "/mentor/otp",
    },
    {
      label: "Remarks",
      icon: FiEdit3,
      path: "/mentor/remarks",
    },
    {
      label: "Report Issue",
      icon: FiAlertTriangle,
      path: "/mentor/report-issue",
    },
    {
      label: "HOD Notices",
      icon: FiVolume2,
      path: "/mentor/hod-notices",
    },
    {
      label: "Feedback",
      icon: FiMessageSquare,
      path: "/mentor/feedback",
    },
    {
      label: "Profile",
      icon: FiUser,
      path: "/mentor/profile",
    },
  ];

  // =========================
  // ACTIVE MENU
  // =========================
  const isActive = (path) => {
    if (path === "/mentor") {
      return location.pathname === "/mentor";
    }

    return (
      location.pathname === path ||
      location.pathname.startsWith(`${path}/`)
    );
  };

  // =========================
  // NAVIGATION
  // =========================
  const handleNavigation = (path) => {
    navigate(path);

    if (setMobileOpen) {
      setMobileOpen(false);
    }
  };

  // =========================
  // SIGN OUT
  // =========================
  const handleSignOut = () => {
    localStorage.removeItem("mentorOneUser");

    navigate("/login", {
      replace: true,
    });

    if (setMobileOpen) {
      setMobileOpen(false);
    }
  };

  return (
    <>
      {/* MOBILE OVERLAY */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* SIDEBAR */}
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

          {/* =========================
              UNIVERSITY
          ========================= */}
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

              {/* MOBILE CLOSE */}
              <button
                onClick={() => setMobileOpen(false)}
                className="ml-auto flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white lg:hidden"
                aria-label="Close menu"
              >
                <FiX />
              </button>
            </div>
          </div>

          {/* =========================
              BRAND
          ========================= */}
          <div className="px-5 py-6">
            <div className="flex items-center gap-3">

              <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-xl shadow-lg shadow-indigo-500/20">
                <FiUsers className="text-white" />
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

          {/* =========================
              SECTION
          ========================= */}
          <div className="px-5 mb-3">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">
              Mentor
            </p>
          </div>

          {/* =========================
              NAVIGATION
          ========================= */}
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
                      group
                      flex
                      w-full
                      items-center
                      gap-3
                      rounded-xl
                      px-3
                      py-3
                      text-left
                      text-sm
                      transition-all
                      duration-200

                      ${
                        active
                          ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg shadow-indigo-500/20"
                          : "text-slate-400 hover:bg-slate-800/70 hover:text-white"
                      }
                    `}
                  >
                    <Icon
                      className={`
                        flex-shrink-0
                        text-lg

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

          {/* =========================
              USER + SIGN OUT
          ========================= */}
          <div className="border-t border-slate-800/80 p-4">

            {/* PROFILE */}
            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-xs font-bold text-white">
                AM
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-white">
                  Dr. Anjali Menon
                </p>

                <p className="truncate text-[11px] text-slate-500">
                  Mentor · Data Science
                </p>
              </div>

            </div>

            {/* SIGN OUT */}
            <button
              onClick={handleSignOut}
              className="
                mt-3
                flex
                h-11
                w-full
                items-center
                gap-3
                rounded-lg
                px-3
                text-sm
                font-medium
                text-slate-400
                transition-all
                duration-200
                hover:bg-red-500/10
                hover:text-red-400
              "
            >
              <FiLogOut className="flex-shrink-0 text-lg" />

              <span>
                Sign Out
              </span>
            </button>

          </div>
        </div>
      </aside>
    </>
  );
}

export default MentorSidebar;