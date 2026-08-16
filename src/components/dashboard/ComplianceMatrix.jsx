const complianceData = [
  {
    mentor: "Dr. Ramesh",
    mentee: "Jasmine A",
    sessions: 2,
    status: "Met",
  },
  {
    mentor: "Dr. Ramesh",
    mentee: "Frinu P",
    sessions: 1,
    status: "Met",
  },
  {
    mentor: "Dr. Sunita",
    mentee: "Sanjay K",
    sessions: 0,
    status: "Unmet",
  },
  {
    mentor: "Mr. Arun",
    mentee: "Akhil T",
    sessions: 0,
    status: "Unmet",
  },
];

const ComplianceMatrix = () => {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
      
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-white">
          Compliance Matrix
        </h2>

        <p className="mt-1 text-sm text-slate-400">
          Mentor–mentee session compliance
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px] text-left">
          <thead>
            <tr className="border-b border-slate-800">
              <th className="pb-3 text-xs font-medium uppercase tracking-wide text-slate-500">
                Mentor
              </th>

              <th className="pb-3 text-xs font-medium uppercase tracking-wide text-slate-500">
                Mentee
              </th>

              <th className="pb-3 text-xs font-medium uppercase tracking-wide text-slate-500">
                Sessions
              </th>

              <th className="pb-3 text-xs font-medium uppercase tracking-wide text-slate-500">
                Compliance
              </th>
            </tr>
          </thead>

          <tbody>
            {complianceData.map((item) => (
              <tr
                key={`${item.mentor}-${item.mentee}`}
                className="border-b border-slate-800/70 last:border-0"
              >
                <td className="py-4 text-sm font-medium text-white">
                  {item.mentor}
                </td>

                <td className="py-4 text-sm text-slate-300">
                  {item.mentee}
                </td>

                <td className="py-4 text-sm text-slate-300">
                  {item.sessions}
                </td>

                <td className="py-4">
                  {item.status === "Met" ? (
                    <span className="rounded-full border border-green-500/20 bg-green-500/10 px-3 py-1 text-xs font-medium text-green-400">
                      Met
                    </span>
                  ) : (
                    <span className="rounded-full border border-red-500/20 bg-red-500/10 px-3 py-1 text-xs font-medium text-red-400">
                      Unmet ⚠
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ComplianceMatrix;