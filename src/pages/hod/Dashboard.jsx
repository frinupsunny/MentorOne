import {
  FiUsers,
  FiUserCheck,
  FiBookOpen,
  FiCalendar,
  FiAlertTriangle,
  FiArrowUpRight,
  FiArrowRight,
  FiCheckCircle,
  FiClock,
  FiActivity,
  FiBell,
  FiUserPlus,
  FiBarChart2,
  FiRepeat,
  FiVolume2,
} from "react-icons/fi";

function Dashboard() {
  const stats = [
    {
      title: "Mentors",
      value: "24",
      subtitle: "Department mentors",
      icon: FiUsers,
      iconBg: "bg-purple-500/10",
      iconColor: "text-purple-400",
    },
    {
      title: "Mentees",
      value: "186",
      subtitle: "Active mentees",
      icon: FiUserCheck,
      iconBg: "bg-indigo-500/10",
      iconColor: "text-indigo-400",
    },
    {
      title: "Active Pairs",
      value: "172",
      subtitle: "Mentor-mentee pairs",
      icon: FiBookOpen,
      iconBg: "bg-emerald-500/10",
      iconColor: "text-emerald-400",
    },
    {
      title: "Sessions",
      value: "38",
      subtitle: "This month",
      icon: FiCalendar,
      iconBg: "bg-orange-500/10",
      iconColor: "text-orange-400",
    },
    {
      title: "Critical Issues",
      value: "5",
      subtitle: "Require attention",
      icon: FiAlertTriangle,
      iconBg: "bg-red-500/10",
      iconColor: "text-red-400",
    },
  ];

  const complianceData = [
    {
      label: "Session Compliance",
      value: 88,
      description: "Sessions completed as scheduled",
    },
    {
      label: "Mentoring Diary",
      value: 76,
      description: "Diaries updated by mentors",
    },
    {
      label: "Mentee Allocation",
      value: 93,
      description: "Mentees assigned to mentors",
    },
  ];

  const recentActivities = [
    {
      title: "New coordinator assigned",
      description: "Dr. Meena S assigned as department coordinator",
      time: "25 min ago",
      icon: FiUserPlus,
      iconBg: "bg-purple-500/10",
      iconColor: "text-purple-400",
    },
    {
      title: "Mentoring session completed",
      description: "Dr. Ramesh Kumar completed 4 sessions",
      time: "1 hour ago",
      icon: FiCheckCircle,
      iconBg: "bg-emerald-500/10",
      iconColor: "text-emerald-400",
    },
    {
      title: "Critical issue reported",
      description: "Mentee support issue requires coordinator review",
      time: "2 hours ago",
      icon: FiAlertTriangle,
      iconBg: "bg-red-500/10",
      iconColor: "text-red-400",
    },
    {
      title: "Department notice published",
      description: "Monthly mentoring review notice published",
      time: "Yesterday",
      icon: FiBell,
      iconBg: "bg-indigo-500/10",
      iconColor: "text-indigo-400",
    },
  ];

  const upcomingSessions = [
    {
      mentor: "Dr. Ramesh Kumar",
      mentee: "Jasmine A",
      time: "10:30 AM",
      date: "Today",
      status: "Upcoming",
    },
    {
      mentor: "Dr. Meena S",
      mentee: "Rahul Kumar",
      time: "12:00 PM",
      date: "Today",
      status: "Upcoming",
    },
    {
      mentor: "Dr. Anitha Joseph",
      mentee: "Ananya S",
      time: "2:30 PM",
      date: "Today",
      status: "Upcoming",
    },
  ];

  const issues = [
    {
      title: "Mentee has missed 3 sessions",
      person: "Rahul Kumar",
      mentor: "Dr. Meena S",
      priority: "High",
    },
    {
      title: "Mentoring diary not updated",
      person: "Arjun P",
      mentor: "Dr. Arun Mathew",
      priority: "Medium",
    },
    {
      title: "Mentor capacity nearing limit",
      person: "Dr. Sunita Pillai",
      mentor: "8 / 10 mentees",
      priority: "Medium",
    },
  ];

  return (
    <div className="min-h-full bg-[#080C14] p-4 text-white sm:p-6">

      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium text-purple-400">
            Head of Department
          </p>

          <h1 className="mt-1 text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Welcome back, Dr. Helen
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Here is an overview of your department's mentoring activities.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-500">
          <FiCalendar />
          <span>Monday, 7 September 2026</span>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="rounded-2xl border border-slate-800/80 bg-[#0D1422] p-4 transition hover:border-slate-700"
            >
              <div className="flex items-start justify-between">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-xl ${stat.iconBg}`}
                >
                  <Icon className={`text-lg ${stat.iconColor}`} />
                </div>

                <FiArrowUpRight className="text-slate-700" />
              </div>

              <p className="mt-4 text-2xl font-bold text-white">
                {stat.value}
              </p>

              <p className="mt-1 text-sm font-medium text-slate-300">
                {stat.title}
              </p>

              <p className="mt-1 text-[11px] text-slate-600">
                {stat.subtitle}
              </p>
            </div>
          );
        })}
      </div>

      {/* Main Grid */}
      <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-3">

        {/* Department Overview */}
        <div className="xl:col-span-2 rounded-2xl border border-slate-800/80 bg-[#0D1422] p-5">

          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-semibold text-white">
                Department Overview
              </h2>
              <p className="mt-1 text-xs text-slate-500">
                Current mentoring performance
              </p>
            </div>

            <FiBarChart2 className="text-lg text-purple-400" />
          </div>

          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-3">
            <OverviewItem
              title="Mentors"
              value="24"
              detail="22 active"
              percentage={92}
            />

            <OverviewItem
              title="Mentees"
              value="186"
              detail="172 allocated"
              percentage={93}
            />

            <OverviewItem
              title="Sessions"
              value="38"
              detail="34 completed"
              percentage={89}
            />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="rounded-2xl border border-slate-800/80 bg-[#0D1422] p-5">

          <h2 className="text-base font-semibold text-white">
            Quick Actions
          </h2>

          <p className="mt-1 text-xs text-slate-500">
            Frequently used department actions
          </p>

          <div className="mt-5 space-y-2">
            <QuickAction
              icon={FiUserPlus}
              title="Assign Coordinator"
              description="Manage department coordinator"
            />

            <QuickAction
              icon={FiRepeat}
              title="Mentee Allocation"
              description="Review mentor assignments"
            />

            <QuickAction
              icon={FiVolume2}
              title="Department Notice"
              description="Publish a new notice"
            />

            <QuickAction
              icon={FiAlertTriangle}
              title="Review Issues"
              description="Check critical issues"
            />
          </div>
        </div>
      </div>

      {/* Compliance + Issues */}
      <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-2">

        {/* Compliance */}
        <div className="rounded-2xl border border-slate-800/80 bg-[#0D1422] p-5">

          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-semibold text-white">
                Mentoring Compliance
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Department-level compliance indicators
              </p>
            </div>

            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/10">
              <FiActivity className="text-emerald-400" />
            </div>
          </div>

          <div className="mt-6 space-y-6">
            {complianceData.map((item) => (
              <div key={item.label}>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-300">
                      {item.label}
                    </p>

                    <p className="mt-1 text-[11px] text-slate-600">
                      {item.description}
                    </p>
                  </div>

                  <span className="text-sm font-semibold text-white">
                    {item.value}%
                  </span>
                </div>

                <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-800">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-purple-500 to-indigo-500"
                    style={{ width: `${item.value}%` }}
                  />
                </div>

              </div>
            ))}
          </div>
        </div>

        {/* Critical Issues */}
        <div className="rounded-2xl border border-slate-800/80 bg-[#0D1422] p-5">

          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-semibold text-white">
                Critical Issues
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Items requiring attention
              </p>
            </div>

            <span className="rounded-full bg-red-500/10 px-2.5 py-1 text-[10px] font-semibold text-red-400">
              5 Open
            </span>
          </div>

          <div className="mt-5 space-y-3">
            {issues.map((issue) => (
              <div
                key={issue.title}
                className="rounded-xl border border-slate-800/70 bg-slate-900/30 p-3"
              >
                <div className="flex items-start gap-3">

                  <div className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-red-500/10">
                    <FiAlertTriangle className="text-sm text-red-400" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                      <p className="text-sm font-medium text-slate-200">
                        {issue.title}
                      </p>

                      <span
                        className={`w-fit rounded-full px-2 py-0.5 text-[9px] font-semibold ${
                          issue.priority === "High"
                            ? "bg-red-500/10 text-red-400"
                            : "bg-orange-500/10 text-orange-400"
                        }`}
                      >
                        {issue.priority}
                      </span>
                    </div>

                    <p className="mt-1 text-[11px] text-slate-600">
                      {issue.person} · {issue.mentor}
                    </p>
                  </div>

                </div>
              </div>
            ))}
          </div>

          <button className="mt-4 flex items-center gap-2 text-xs font-medium text-purple-400 hover:text-purple-300">
            View all issues
            <FiArrowRight />
          </button>
        </div>
      </div>

      {/* Bottom Grid */}
      <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-2">

        {/* Recent Activity */}
        <div className="rounded-2xl border border-slate-800/80 bg-[#0D1422] p-5">

          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-semibold text-white">
                Recent Activity
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Latest department updates
              </p>
            </div>

            <button className="text-xs font-medium text-purple-400 hover:text-purple-300">
              View all
            </button>
          </div>

          <div className="mt-5 space-y-4">
            {recentActivities.map((activity) => {
              const Icon = activity.icon;

              return (
                <div
                  key={activity.title}
                  className="flex gap-3"
                >
                  <div
                    className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg ${activity.iconBg}`}
                  >
                    <Icon className={`text-sm ${activity.iconColor}`} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-slate-300">
                      {activity.title}
                    </p>

                    <p className="mt-1 text-[11px] leading-5 text-slate-600">
                      {activity.description}
                    </p>

                    <div className="mt-1 flex items-center gap-1 text-[10px] text-slate-700">
                      <FiClock />
                      {activity.time}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Upcoming Sessions */}
        <div className="rounded-2xl border border-slate-800/80 bg-[#0D1422] p-5">

          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-semibold text-white">
                Upcoming Sessions
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Today's mentoring sessions
              </p>
            </div>

            <FiCalendar className="text-lg text-purple-400" />
          </div>

          <div className="mt-5 space-y-3">
            {upcomingSessions.map((session) => (
              <div
                key={`${session.mentor}-${session.mentee}`}
                className="rounded-xl border border-slate-800/70 bg-slate-900/30 p-3"
              >
                <div className="flex items-center justify-between gap-3">

                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-slate-200">
                      {session.mentor}
                    </p>

                    <p className="mt-1 text-[11px] text-slate-600">
                      Mentee: {session.mentee}
                    </p>
                  </div>

                  <div className="flex-shrink-0 text-right">
                    <p className="text-sm font-semibold text-white">
                      {session.time}
                    </p>

                    <span className="text-[10px] text-emerald-400">
                      {session.status}
                    </span>
                  </div>

                </div>
              </div>
            ))}
          </div>

          <button className="mt-4 flex items-center gap-2 text-xs font-medium text-purple-400 hover:text-purple-300">
            View calendar
            <FiArrowRight />
          </button>
        </div>
      </div>

    </div>
  );
}

function OverviewItem({ title, value, detail, percentage }) {
  return (
    <div className="rounded-xl border border-slate-800/70 bg-slate-900/30 p-4">
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium text-slate-500">
          {title}
        </p>

        <span className="text-xs font-semibold text-emerald-400">
          {percentage}%
        </span>
      </div>

      <p className="mt-3 text-2xl font-bold text-white">
        {value}
      </p>

      <p className="mt-1 text-[11px] text-slate-600">
        {detail}
      </p>

      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-800">
        <div
          className="h-full rounded-full bg-gradient-to-r from-purple-500 to-indigo-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

function QuickAction({ icon: Icon, title, description }) {
  return (
    <button className="group flex w-full items-center gap-3 rounded-xl border border-slate-800/70 bg-slate-900/30 p-3 text-left transition hover:border-purple-500/30 hover:bg-slate-800/50">

      <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-purple-500/10 text-purple-400">
        <Icon />
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-slate-300 group-hover:text-white">
          {title}
        </p>

        <p className="mt-1 truncate text-[10px] text-slate-600">
          {description}
        </p>
      </div>

      <FiArrowRight className="flex-shrink-0 text-slate-700 group-hover:text-purple-400" />
    </button>
  );
}


export default Dashboard;