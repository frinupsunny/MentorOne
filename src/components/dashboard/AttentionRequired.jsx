import {
  FiAlertTriangle,
  FiClock,
  FiUsers,
  FiArrowRight,
} from "react-icons/fi";

const alerts = [
  {
    title: "Non-compliant mentor–mentee pairs",
    description: "3 pairs have not completed the required sessions.",
    count: "3",
    type: "danger",
    icon: FiAlertTriangle,
  },
  {
    title: "Pending sessions",
    description: "5 mentoring sessions are still pending this month.",
    count: "5",
    type: "warning",
    icon: FiClock,
  },
  {
    title: "Pending assignments",
    description: "2 mentor–mentee assignments need attention.",
    count: "2",
    type: "info",
    icon: FiUsers,
  },
];

const styles = {
  danger: {
    icon: "bg-red-500/15 text-red-400",
    count: "text-red-400",
    button:
      "border-red-500/20 text-red-400 hover:bg-red-500/10",
  },

  warning: {
    icon: "bg-amber-500/15 text-amber-400",
    count: "text-amber-400",
    button:
      "border-amber-500/20 text-amber-400 hover:bg-amber-500/10",
  },

  info: {
    icon: "bg-blue-500/15 text-blue-400",
    count: "text-blue-400",
    button:
      "border-blue-500/20 text-blue-400 hover:bg-blue-500/10",
  },
};

const AttentionRequired = () => {
  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">

      <div className="mb-5">
        <div className="flex items-center gap-2">
          <FiAlertTriangle className="text-amber-400" />

          <h2 className="text-lg font-semibold text-white">
            Attention Required
          </h2>
        </div>

        <p className="mt-1 text-sm text-slate-400">
          Items that may need your attention
        </p>
      </div>

      <div className="space-y-3">

        {alerts.map((alert) => {
          const Icon = alert.icon;
          const style = styles[alert.type];

          return (
            <div
              key={alert.title}
              className="flex flex-col gap-4 rounded-xl border border-slate-800 bg-slate-950/40 p-4 sm:flex-row sm:items-center"
            >

              {/* Icon */}
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${style.icon}`}
              >
                <Icon className="text-lg" />
              </div>

              {/* Content */}
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-medium text-white">
                    {alert.title}
                  </h3>

                  <span className={`text-sm font-semibold ${style.count}`}>
                    {alert.count}
                  </span>
                </div>

                <p className="mt-1 text-xs text-slate-400">
                  {alert.description}
                </p>
              </div>

              {/* Action */}
              <button
                className={`flex shrink-0 items-center justify-center gap-2 rounded-lg border px-3 py-2 text-xs font-medium transition ${style.button}`}
              >
                View
                <FiArrowRight />
              </button>

            </div>
          );
        })}

      </div>
    </section>
  );
};

export default AttentionRequired;