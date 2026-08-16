import {
  FiGrid,
  FiUsers,
  FiBell,
  FiBookOpen,
  FiStar,
  FiBarChart2,
  FiCalendar,
  FiFileText,
  FiSettings,
  FiChevronUp,
  FiRepeat,
} from "react-icons/fi";

import { useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();

  const overviewItems = [
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
    label: "My Mentees",
    icon: FiUsers,
    path: "/coordinator/mentees",
  },
  {
    label: "Assign Mentees",
    icon: FiRepeat,
    path: "/coordinator/assign-mentees",
  },
];

  const activityItems = [
  {
    label: "Notifications",
    icon: FiBell,
    badge: 3,
    path: "/coordinator/notifications",
  },
  {
    label: "Remarks",
    icon: FiBookOpen,
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
  ];

  const workspaceItems = [
    {
      label: "Calendar",
      icon: FiCalendar,
      path: "/coordinator/calendar",
    },
    {
      label: "Documents",
      icon: FiFileText,
      path: "/coordinator/documents",
    },
    {
      label: "Settings",
      icon: FiSettings,
      path: "/coordinator/settings",
    },
  ];

  const renderItems = (items) => {
    return items.map((item) => {
      const Icon = item.icon;

      return (
        <button
  key={item.label}
  onClick={() => item.path && navigate(item.path)}
  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
    item.path &&
    window.location.pathname === item.path
      ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/20"
      : "text-slate-400 hover:bg-slate-800/60 hover:text-white"
  }`}
>
          <Icon className="text-[17px] flex-shrink-0" />

          <span>{item.label}</span>

          {item.badge && (
            <span className="ml-auto text-[10px] font-bold bg-red-500/15 text-red-400 px-1.5 py-0.5 rounded-full">
              {item.badge}
            </span>
          )}
        </button>
      );
    });
  };

  return (
    <aside className="w-64 h-full min-h-0 flex-shrink-0 flex flex-col bg-[#0D1220] border-r border-slate-800/80 overflow-hidden">

      {/* University */}
      <div className="h-16 flex-shrink-0 flex items-center gap-2.5 px-5 border-b border-slate-800/80">

        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center flex-shrink-0">
          <span className="text-slate-900 font-bold text-xs">
            CU
          </span>
        </div>

        <div className="leading-tight">
          <div className="text-[13px] font-bold tracking-wide text-white">
            CHRIST
          </div>

          <div className="text-[9px] text-slate-500 tracking-wide">
            DEEMED TO BE UNIVERSITY
          </div>
        </div>

      </div>

      {/* MentorOne Branding */}
      <div className="px-5 py-4 flex-shrink-0 border-b border-slate-800/80">

        <div className="flex items-center gap-2">

          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <FiBookOpen className="text-white text-base" />
          </div>

          <span className="font-bold text-[17px] bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            MentorOne
          </span>

        </div>

        <div className="text-[11px] text-slate-500 mt-0.5 ml-[42px]">
          Mentoring Management System
        </div>

      </div>

      {/* Navigation */}
      <nav
  className="
    flex-1
    min-h-0
    overflow-hidden
    px-3
    py-3
    space-y-0.5
  "
>

        {/* Overview */}
        <div className="px-3 pb-1 text-[10px] font-semibold tracking-wider text-slate-600 uppercase">
          Overview
        </div>

        {renderItems(overviewItems)}

        {/* Activity */}
        <div className="px-3 pb-1 pt-3 text-[10px] font-semibold tracking-wider text-slate-600 uppercase">
          Activity
        </div>

        {renderItems(activityItems)}

        {/* Workspace */}
        <div className="px-3 pb-1 pt-3 text-[10px] font-semibold tracking-wider text-slate-600 uppercase">
          Workspace
        </div>

        {renderItems(workspaceItems)}

      </nav>

      {/* Coordinator Profile */}
      <div className="p-3 flex-shrink-0 border-t border-slate-800/80">

        <button className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg hover:bg-slate-800/60 transition">

          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-teal-400 to-emerald-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
            MS
          </div>

          <div className="text-left leading-tight flex-1 min-w-0">

            <div className="text-[13px] font-semibold text-white truncate">
              Dr. Meena S
            </div>

            <div className="text-[11px] text-slate-500 flex items-center gap-1">
              Coordinator

              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
            </div>

          </div>

          <FiChevronUp className="text-slate-400 text-sm" />

        </button>

      </div>

    </aside>
  );
}

export default Sidebar;