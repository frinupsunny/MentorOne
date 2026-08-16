const sessions = [
  {
    student: "Akhil Thomas",
    mentor: "Dr. Rajesh R",
    time: "09:30 AM",
    status: "Scheduled",
  },
  {
    student: "Sandra Joseph",
    mentor: "Dr. Anitha",
    time: "11:00 AM",
    status: "Ongoing",
  },
  {
    student: "Alan Mathew",
    mentor: "Dr. Vivek",
    time: "02:00 PM",
    status: "Completed",
  },
];

const statusStyles = {
  Scheduled: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  Ongoing: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  Completed: "bg-green-500/10 text-green-400 border-green-500/20",
};

const TodaysSessions = () => {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
      
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-white">
            Today's Mentoring Sessions
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            Friday's scheduled sessions
          </p>
        </div>

        <button className="rounded-lg border border-slate-700 px-3 py-2 text-xs font-medium text-slate-300 transition hover:border-purple-500 hover:text-white">
          View All
        </button>
      </div>

      <div className="space-y-3">
        {sessions.map((session) => (
          <div
            key={`${session.student}-${session.time}`}
            className="flex flex-col gap-3 rounded-xl border border-slate-800 bg-slate-950/40 p-4 sm:flex-row sm:items-center sm:justify-between"
          >
            
            <div>
              <p className="font-medium text-white">
                {session.student}
              </p>

              <p className="mt-1 text-sm text-slate-400">
                Mentor: {session.mentor}
              </p>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-sm text-slate-300">
                {session.time}
              </span>

              <span
                className={`rounded-full border px-3 py-1 text-xs font-medium ${
                  statusStyles[session.status]
                }`}
              >
                {session.status}
              </span>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default TodaysSessions;