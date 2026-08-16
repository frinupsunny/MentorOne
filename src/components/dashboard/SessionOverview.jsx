const SessionOverview = () => {
  const completed = 18;
  const pending = 5;
  const unmet = 3;

  const total = completed + pending + unmet;
  const percentage = Math.round((completed / total) * 100);

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
      
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-white">
          Sessions Done vs Pending
        </h2>

        <p className="mt-1 text-sm text-slate-400">
          This month
        </p>
      </div>

      <div className="flex flex-col items-center gap-6 sm:flex-row">
        
        {/* Donut */}
        <div
          className="relative flex h-36 w-36 shrink-0 items-center justify-center rounded-full"
          style={{
            background: `conic-gradient(
              #22c55e 0% ${percentage}%,
              #f59e0b ${percentage}% 100%
            )`,
          }}
        >
          <div className="flex h-24 w-24 flex-col items-center justify-center rounded-full bg-slate-900">
            <span className="text-2xl font-bold text-white">
              {percentage}%
            </span>

            <span className="text-xs text-slate-400">
              completed
            </span>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-1 flex-col gap-4">
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-green-500" />
              <span className="text-sm text-slate-300">
                Completed
              </span>
            </div>

            <span className="font-semibold text-white">
              {completed}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-amber-500" />
              <span className="text-sm text-slate-300">
                Pending
              </span>
            </div>

            <span className="font-semibold text-white">
              {pending}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-red-500" />
              <span className="text-sm text-slate-300">
                Unmet pairs
              </span>
            </div>

            <span className="font-semibold text-red-400">
              {unmet}
            </span>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SessionOverview;