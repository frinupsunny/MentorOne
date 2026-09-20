import { useEffect, useMemo, useState } from "react";
import {
  FiShield,
  FiCheckCircle,
  FiAlertCircle,
} from "react-icons/fi";
import { menteeApi, getApiError } from "./menteeApi";

function OTPVerification() {
  const [sessions, setSessions] = useState([]);
  const [selectedSessionId, setSelectedSessionId] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [otpStatus, setOtpStatus] = useState(null);

  const loadSessions = async () => {
    try {
      setError("");
      const response = await menteeApi.get("/api/mentee/sessions");
      setSessions(response.data || []);
    } catch (err) {
      setError(getApiError(err, "Unable to load sessions."));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSessions();
  }, []);

  const selectableSessions = useMemo(
    () =>
      sessions.filter(
        (session) => session.status !== "completed"
      ),
    [sessions]
  );

  useEffect(() => {
    const checkStatus = async () => {
      if (!selectedSessionId) {
        setOtpStatus(null);
        return;
      }

      try {
        const response = await menteeApi.get(
          `/api/mentee/otp/status/${selectedSessionId}`
        );

        setOtpStatus(response.data);
      } catch {
        setOtpStatus(null);
      }
    };

    checkStatus();
  }, [selectedSessionId]);

  const verifyOtp = async (event) => {
    event.preventDefault();

    if (!selectedSessionId || !code.trim()) {
      setError("Select a session and enter the OTP.");
      return;
    }

    try {
      setSubmitting(true);
      setError("");
      setMessage("");

      const response = await menteeApi.post(
        "/api/mentee/otp/verify",
        {
          sessionId: selectedSessionId,
          code: code.trim(),
        }
      );

      setMessage(
        response.data?.message ||
          "Attendance confirmed for this session."
      );

      setCode("");

      setSessions((current) =>
        current.map((session) =>
          session.id === selectedSessionId
            ? { ...session, status: "completed" }
            : session
        )
      );
    } catch (err) {
      setError(getApiError(err, "Unable to verify OTP."));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-full bg-[#080C14] p-4 text-white sm:p-6">
      <div className="mb-6">
        <p className="text-sm text-slate-400">
          Mentee Workspace
        </p>

        <h1 className="mt-2 text-3xl font-bold">
          OTP Verification
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Enter the OTP provided by your mentor to confirm attendance.
        </p>
      </div>

      {message && (
        <div className="mb-5 flex items-start gap-3 rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-sm text-emerald-300">
          <FiCheckCircle className="mt-0.5 flex-shrink-0" />
          <span>{message}</span>
        </div>
      )}

      {error && (
        <div className="mb-5 flex items-start gap-3 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-300">
          <FiAlertCircle className="mt-0.5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <section className="rounded-2xl border border-slate-800 bg-[#0D1422] p-6">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-500/10 text-violet-400">
              <FiShield />
            </div>

            <div>
              <h2 className="text-lg font-semibold">
                Confirm Session Attendance
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                One-time codes are valid only for their active session.
              </p>
            </div>
          </div>

          {loading ? (
            <div className="text-sm text-slate-400">
              Loading sessions...
            </div>
          ) : (
            <form onSubmit={verifyOtp} className="space-y-5">
              <div>
                <label className="mb-2 block text-sm text-slate-400">
                  Select session
                </label>

                <select
                  value={selectedSessionId}
                  onChange={(event) =>
                    setSelectedSessionId(event.target.value)
                  }
                  className="h-12 w-full rounded-xl border border-slate-700 bg-slate-800/50 px-3 text-sm text-slate-200 outline-none"
                >
                  <option value="">Select a session</option>

                  {selectableSessions.map((session) => (
                    <option key={session.id} value={session.id}>
                      {(session.title || "Mentoring Session") +
                        " — " +
                        (session.date || "No date") +
                        " " +
                        (session.timeLabel ||
                          session.time ||
                          "")}
                    </option>
                  ))}
                </select>
              </div>

              {otpStatus && (
                <div
                  className={`rounded-xl border p-4 text-sm ${
                    otpStatus.active
                      ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-300"
                      : "border-amber-500/20 bg-amber-500/10 text-amber-300"
                  }`}
                >
                  {otpStatus.active
                    ? "An active OTP exists for this session. Ask your mentor for the code."
                    : "No active OTP is available. Ask your mentor to generate one."}
                </div>
              )}

              <div>
                <label className="mb-2 block text-sm text-slate-400">
                  OTP Code
                </label>

                <input
                  value={code}
                  onChange={(event) =>
                    setCode(
                      event.target.value.replace(/\D/g, "").slice(0, 6)
                    )
                  }
                  inputMode="numeric"
                  placeholder="Enter 6-digit OTP"
                  className="h-14 w-full rounded-xl border border-slate-700 bg-slate-800/50 px-4 text-center text-xl font-bold tracking-[0.5em] text-white outline-none placeholder:text-slate-600"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full rounded-xl bg-violet-600 px-5 py-3.5 text-sm font-semibold text-white hover:bg-violet-500 disabled:cursor-not-allowed disabled:bg-slate-800"
              >
                {submitting ? "Verifying..." : "Verify OTP"}
              </button>
            </form>
          )}
        </section>

        <section className="rounded-2xl border border-slate-800 bg-[#0D1422] p-6">
          <h2 className="text-lg font-semibold">
            How it works
          </h2>

          <div className="mt-5 space-y-4">
            {[
              "Meet your mentor for the scheduled session.",
              "Ask your mentor for the OTP generated for that session.",
              "Enter the six-digit code here.",
              "The system marks the session as completed when the code is correct.",
            ].map((item, index) => (
              <div
                key={item}
                className="flex items-start gap-3"
              >
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-violet-500/10 text-xs font-bold text-violet-400">
                  {index + 1}
                </div>

                <p className="pt-1 text-sm leading-6 text-slate-400">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default OTPVerification;
