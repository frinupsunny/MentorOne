import { useEffect, useState } from "react";
import {
  FiVolume2,
  FiAlertCircle,
  FiCalendar,
} from "react-icons/fi";
import { menteeApi, getApiError } from "./menteeApi";

function HODNotices() {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        setError("");

        const response = await menteeApi.get(
          "/api/mentee/hod-notices"
        );

        setNotices(response.data || []);
      } catch (err) {
        setError(
          getApiError(err, "Unable to load HOD notices.")
        );
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return (
    <div className="min-h-full bg-[#080C14] p-4 text-white sm:p-6">
      <div className="mb-6">
        <p className="text-sm text-slate-400">
          Mentee Workspace
        </p>

        <h1 className="mt-2 text-3xl font-bold">
          HOD Notices
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Department announcements and mentoring notices from the HOD.
        </p>
      </div>

      {error && (
        <div className="mb-5 flex items-start gap-3 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-300">
          <FiAlertCircle className="mt-0.5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {loading ? (
        <div className="text-sm text-slate-400">
          Loading notices...
        </div>
      ) : notices.length === 0 ? (
        <div className="rounded-2xl border border-slate-800 bg-[#0D1422] p-6 text-sm text-slate-500">
          No HOD notices are available for you.
        </div>
      ) : (
        <div className="space-y-4">
          {notices
            .slice()
            .reverse()
            .map((notice) => (
              <article
                key={notice.id}
                className="rounded-2xl border border-slate-800 bg-[#0D1422] p-5"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-violet-500/10 text-violet-400">
                    <FiVolume2 />
                  </div>

                  <div className="min-w-0 flex-1">
                    <h2 className="text-lg font-semibold">
                      {notice.title || "Departmental Notice"}
                    </h2>

                    <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-slate-500">
                      <span>{notice.from || "HOD"}</span>

                      <span className="inline-flex items-center gap-1">
                        <FiCalendar />
                        {notice.date || "Recent"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-5 rounded-xl border border-slate-800 bg-[#0B111D] p-4">
                  <p className="whitespace-pre-wrap text-sm leading-6 text-slate-300">
                    {notice.message}
                  </p>
                </div>
              </article>
            ))}
        </div>
      )}
    </div>
  );
}

export default HODNotices;
