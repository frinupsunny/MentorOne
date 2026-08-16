import {
  FiUsers,
  FiUser,
  FiCalendar,
  FiPlayCircle,
  FiAlertTriangle,
} from "react-icons/fi";

const icons = {
  mentors: FiUsers,
  mentees: FiUser,
  sessions: FiCalendar,
  active: FiPlayCircle,
  problems: FiAlertTriangle,
};

const styles = {
  blue: {
    iconBg: "bg-blue-500/20",
    iconColor: "text-blue-400",
    line: "text-blue-500",
  },

  green: {
    iconBg: "bg-emerald-500/20",
    iconColor: "text-emerald-400",
    line: "text-emerald-400",
  },

  purple: {
    iconBg: "bg-purple-500/20",
    iconColor: "text-purple-400",
    line: "text-purple-400",
  },

  orange: {
    iconBg: "bg-orange-500/20",
    iconColor: "text-orange-400",
    line: "text-orange-400",
  },

  red: {
    iconBg: "bg-red-500/20",
    iconColor: "text-red-400",
    line: "text-red-500",
  },
};

function StatCard({
  type,
  title,
  value,
  change,
  changeType = "positive",
  color = "blue",
  data = [],
}) {
  const Icon = icons[type];
  const theme = styles[color];

  const points =
    data.length > 0
      ? data
          .map((point, index) => {
            const x = (index / (data.length - 1)) * 100;
            const max = Math.max(...data);
            const min = Math.min(...data);
            const range = max - min || 1;
            const y = 90 - ((point - min) / range) * 70;

            return `${x},${y}`;
          })
          .join(" ")
      : "0,70 10,60 20,75 30,45 40,65 50,40 60,55 70,35 80,50 90,30 100,40";

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-slate-800 bg-[#0D1422] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-slate-700 hover:shadow-xl hover:shadow-black/20">

      {/* Top glow */}
      <div
        className={`absolute -top-20 -right-20 h-32 w-32 rounded-full blur-3xl opacity-10 ${theme.iconBg}`}
      />

      {/* Header */}
      <div className="relative flex items-start justify-between">

        <div
          className={`flex h-12 w-12 items-center justify-center rounded-xl ${theme.iconBg}`}
        >
          <Icon className={`text-2xl ${theme.iconColor}`} />
        </div>

      </div>

      {/* Title */}
      <p className="mt-5 text-sm font-medium text-slate-400">
        {title}
      </p>

      {/* Value */}
      <h2 className="mt-1 text-3xl font-bold tracking-tight text-white">
        {value}
      </h2>

      {/* Change */}
      <div
        className={`mt-2 text-xs font-medium ${
          changeType === "negative"
            ? "text-red-400"
            : "text-emerald-400"
        }`}
      >
        {change}
      </div>

      {/* Sparkline */}
      <div className="mt-5 h-12 w-full">
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="h-full w-full overflow-visible"
        >
          {/* Glow line */}
          <polyline
            points={points}
            fill="none"
            stroke="currentColor"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`${theme.line} opacity-10 blur-[3px]`}
          />

          {/* Main line */}
          <polyline
            points={points}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={theme.line}
          />
        </svg>
      </div>

    </div>
  );
}

export default StatCard;