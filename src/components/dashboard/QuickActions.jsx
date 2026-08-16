import {
  FiUserPlus,
  FiUsers,
  FiRepeat,
  FiBarChart2,
} from "react-icons/fi";

const actions = [
  {
    label: "Assign Mentee",
    description: "Assign a mentee to a mentor",
    icon: FiUserPlus,
    iconStyle: "bg-blue-500/15 text-blue-400",
  },
  {
    label: "View Mentors",
    description: "Manage mentors under you",
    icon: FiUsers,
    iconStyle: "bg-emerald-500/15 text-emerald-400",
  },
  {
    label: "Review Requests",
    description: "Check mentor–mentee requests",
    icon: FiRepeat,
    iconStyle: "bg-purple-500/15 text-purple-400",
  },
  {
    label: "View Reports",
    description: "Open mentoring reports",
    icon: FiBarChart2,
    iconStyle: "bg-orange-500/15 text-orange-400",
  },
];

const QuickActions = () => {
  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">

      <div className="mb-5">
        <h2 className="text-lg font-semibold text-white">
          Quick Actions
        </h2>

        <p className="mt-1 text-sm text-slate-400">
          Frequently used Coordinator actions
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">

        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <button
              key={action.label}
              className="group rounded-xl border border-slate-800 bg-slate-950/40 p-4 text-left transition hover:-translate-y-0.5 hover:border-slate-700 hover:bg-slate-800/60"
            >

              <div
                className={`mb-4 flex h-10 w-10 items-center justify-center rounded-xl ${action.iconStyle}`}
              >
                <Icon className="text-lg" />
              </div>

              <h3 className="text-sm font-medium text-white group-hover:text-white">
                {action.label}
              </h3>

              <p className="mt-1 text-xs leading-5 text-slate-500">
                {action.description}
              </p>

            </button>
          );
        })}

      </div>
    </section>
  );
};

export default QuickActions;