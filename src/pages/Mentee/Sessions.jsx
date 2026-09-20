import { useEffect, useMemo, useState } from "react";
import {
  FiCalendar,
  FiClock,
  FiRefreshCw,
  FiPlus,
  FiAlertCircle,
  FiCheckCircle,
  FiMapPin,
  FiVideo,
} from "react-icons/fi";
import { menteeApi, getApiError } from "./menteeApi";

function Sessions() {
  const [sessions, setSessions] = useState([]);
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const [showBooking, setShowBooking] = useState(false);
  const [booking, setBooking] = useState({
    date: "",
    label: "",
    time: "",
    timeLabel: "",
    duration: "30 minutes",
    mode: "In-person",
    agenda: "",
    afterClass: false,
    afterClassTime: "",
  });

  const [rescheduleId, setRescheduleId] = useState("");
  const [reschedule, setReschedule] = useState({
    date: "",
    label: "",
    time: "",
    timeLabel: "",
    reason: "",
    afterClass: false,
  });

  const load = async () => {
    try {
      setError("");

      const [sessionsRes, slotsRes] = await Promise.all([
        menteeApi.get("/api/mentee/sessions"),
        menteeApi.get("/api/mentee/slots"),
      ]);

      setSessions(sessionsRes.data || []);
      setSlots(slotsRes.data || []);
    } catch (err) {
      setError(getApiError(err, "Unable to load sessions."));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const normalizedSlots = useMemo(() => {
    if (Array.isArray(slots)) {
      return slots;
    }

    if (slots && typeof slots === "object") {
      const result = [];

      Object.entries(slots).forEach(([day, daySlots]) => {
        if (Array.isArray(daySlots)) {
          daySlots.forEach((item) => {
            result.push(
              typeof item === "string"
                ? {
                    day,
                    time: item,
                    label: `${day} · ${item}`,
                    free: true,
                  }
                : { ...item, day }
            );
          });
        }
      });

      return result;
    }

    return [];
  }, [slots]);

  const bookSession = async (event) => {
    event.preventDefault();

    try {
      setError("");
      setMessage("");

      const useAfterClass = booking.afterClass;
      const selectedTime = useAfterClass
        ? ""
        : booking.time;
      const selectedTimeLabel = useAfterClass
        ? "After class"
        : booking.timeLabel;

      const response = await menteeApi.post("/api/mentee/sessions", {
        date: booking.date,
        label: booking.label,
        time: selectedTime,
        timeLabel: selectedTimeLabel,
        duration: booking.duration,
        mode: booking.mode,
        agenda: booking.agenda,
        afterClass: useAfterClass,
      });

      setMessage("Session request sent successfully.");
      setSessions((current) => [...current, response.data.session]);

      setBooking({
        date: "",
        label: "",
        time: "",
        timeLabel: "",
        duration: "30 minutes",
        mode: "In-person",
        agenda: "",
        afterClass: false,
        afterClassTime: "",
      });

      setShowBooking(false);
    } catch (err) {
      setError(getApiError(err, "Unable to book session."));
    }
  };

  const startReschedule = (session) => {
    setError("");
    setMessage("");

    setRescheduleId(session.id);
    setReschedule({
      date: session.date || "",
      label: session.label || "",
      time: session.time || "",
      timeLabel: session.timeLabel || "",
      reason: "",
      afterClass: Boolean(session.afterClass),
    });
  };

  const saveReschedule = async (event) => {
    event.preventDefault();

    if (!rescheduleId) {
      return;
    }

    try {
      setError("");
      setMessage("");

      const response = await menteeApi.put(
        `/api/mentee/sessions/${rescheduleId}/reschedule`,
        reschedule
      );

      setSessions((current) =>
        current.map((session) =>
          session.id === rescheduleId
            ? response.data.session
            : session
        )
      );

      setMessage("Reschedule request sent.");
      setRescheduleId("");
    } catch (err) {
      setError(getApiError(err, "Unable to reschedule session."));
    }
  };

  const handleSlotSelect = (slot) => {
    setBooking((current) => ({
      ...current,
      date: slot.date || current.date,
      label: slot.label || `${slot.day || ""}`.trim(),
      time: slot.time || slot.value || "",
      timeLabel:
        slot.timeLabel ||
        slot.label ||
        slot.time ||
        "",
      afterClass: false,
    }));
  };

  return (
    <div className="min-h-full bg-[#080C14] p-4 text-white sm:p-6">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm text-slate-400">Mentee Workspace</p>

          <h1 className="mt-2 text-3xl font-bold">
            Sessions
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Book, view, and reschedule your mentoring sessions.
          </p>
        </div>

        <button
          onClick={() => setShowBooking((value) => !value)}
          className="inline-flex w-fit items-center gap-2 rounded-xl bg-violet-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-violet-500"
        >
          <FiPlus />
          {showBooking ? "Close Booking" : "Book Session"}
        </button>
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

      {showBooking && (
        <section className="mb-6 rounded-2xl border border-slate-800 bg-[#0D1422] p-6">
          <div className="mb-5">
            <h2 className="text-lg font-semibold">Book a Session</h2>
            <p className="mt-1 text-sm text-slate-500">
              Choose an available slot or request an after-class time.
            </p>
          </div>

          <form onSubmit={bookSession} className="space-y-5">
            {normalizedSlots.length > 0 && (
              <div>
                <p className="mb-3 text-sm font-medium text-slate-300">
                  Available slots
                </p>

                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                  {normalizedSlots.slice(0, 16).map((slot, index) => {
                    const free =
                      slot.free !== false &&
                      slot.status !== "busy";

                    return (
                      <button
                        type="button"
                        key={`${slot.day || "slot"}-${slot.time || index}`}
                        disabled={!free}
                        onClick={() => free && handleSlotSelect(slot)}
                        className={`
                          rounded-xl border p-3 text-left transition
                          ${
                            free
                              ? "border-emerald-500/20 bg-emerald-500/10 hover:border-emerald-400/40"
                              : "cursor-not-allowed border-slate-800 bg-slate-900/60 opacity-50"
                          }
                        `}
                      >
                        <p className="text-sm font-semibold text-white">
                          {slot.timeLabel ||
                            slot.time ||
                            slot.label ||
                            "Slot"}
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          {free ? "Available" : "Busy"}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm text-slate-400">
                  Date
                </label>

                <input
                  type="date"
                  value={booking.date}
                  onChange={(event) =>
                    setBooking((current) => ({
                      ...current,
                      date: event.target.value,
                    }))
                  }
                  className="h-11 w-full rounded-xl border border-slate-700 bg-slate-800/50 px-3 text-sm text-slate-200 outline-none"
                  required={!booking.afterClass}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-slate-400">
                  Duration
                </label>

                <select
                  value={booking.duration}
                  onChange={(event) =>
                    setBooking((current) => ({
                      ...current,
                      duration: event.target.value,
                    }))
                  }
                  className="h-11 w-full rounded-xl border border-slate-700 bg-slate-800/50 px-3 text-sm text-slate-200 outline-none"
                >
                  <option>30 minutes</option>
                  <option>45 minutes</option>
                  <option>60 minutes</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm text-slate-400">
                  Selected time
                </label>

                <input
                  value={
                    booking.timeLabel ||
                    booking.time ||
                    "Choose an available slot"
                  }
                  readOnly
                  className="h-11 w-full rounded-xl border border-slate-700 bg-slate-800/50 px-3 text-sm text-slate-200 outline-none"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-slate-400">
                  Mode
                </label>

                <select
                  value={booking.mode}
                  onChange={(event) =>
                    setBooking((current) => ({
                      ...current,
                      mode: event.target.value,
                    }))
                  }
                  className="h-11 w-full rounded-xl border border-slate-700 bg-slate-800/50 px-3 text-sm text-slate-200 outline-none"
                >
                  <option>In-person</option>
                  <option>Online</option>
                </select>
              </div>
            </div>

            <label className="flex items-start gap-3 rounded-xl border border-slate-800 bg-[#0B111D] p-4">
              <input
                type="checkbox"
                checked={booking.afterClass}
                onChange={(event) =>
                  setBooking((current) => ({
                    ...current,
                    afterClass: event.target.checked,
                    time: event.target.checked ? "" : current.time,
                    timeLabel: event.target.checked
                      ? "After class"
                      : current.timeLabel,
                  }))
                }
                className="mt-1"
              />

              <span>
                <span className="block text-sm font-medium text-slate-200">
                  After class
                </span>
                <span className="mt-1 block text-xs text-slate-500">
                  Request a custom time instead of a matched slot.
                </span>
              </span>
            </label>

            <div>
              <label className="mb-2 block text-sm text-slate-400">
                Agenda
              </label>

              <textarea
                value={booking.agenda}
                onChange={(event) =>
                  setBooking((current) => ({
                    ...current,
                    agenda: event.target.value,
                  }))
                }
                rows={4}
                placeholder="What would you like to discuss?"
                className="w-full rounded-xl border border-slate-700 bg-slate-800/50 px-3 py-3 text-sm text-slate-200 outline-none placeholder:text-slate-500"
              />
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                type="submit"
                className="rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white hover:bg-violet-500"
              >
                Send Session Request
              </button>

              <button
                type="button"
                onClick={() => setShowBooking(false)}
                className="rounded-xl border border-slate-700 px-5 py-3 text-sm font-semibold text-slate-300 hover:bg-slate-800"
              >
                Cancel
              </button>
            </div>
          </form>
        </section>
      )}

      {rescheduleId && (
        <section className="mb-6 rounded-2xl border border-violet-500/20 bg-violet-500/5 p-6">
          <div className="mb-5">
            <h2 className="text-lg font-semibold">
              Reschedule Session
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Submit a new time request to your mentor.
            </p>
          </div>

          <form onSubmit={saveReschedule} className="space-y-5">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <input
                type="date"
                value={reschedule.date}
                onChange={(event) =>
                  setReschedule((current) => ({
                    ...current,
                    date: event.target.value,
                  }))
                }
                className="h-11 rounded-xl border border-slate-700 bg-slate-800/50 px-3 text-sm text-slate-200 outline-none"
                required={!reschedule.afterClass}
              />

              <input
                value={reschedule.timeLabel}
                onChange={(event) =>
                  setReschedule((current) => ({
                    ...current,
                    timeLabel: event.target.value,
                    time: event.target.value,
                  }))
                }
                placeholder="New time"
                className="h-11 rounded-xl border border-slate-700 bg-slate-800/50 px-3 text-sm text-slate-200 outline-none placeholder:text-slate-500"
                required={!reschedule.afterClass}
              />

              <input
                value={reschedule.reason}
                onChange={(event) =>
                  setReschedule((current) => ({
                    ...current,
                    reason: event.target.value,
                  }))
                }
                placeholder="Reason"
                className="h-11 rounded-xl border border-slate-700 bg-slate-800/50 px-3 text-sm text-slate-200 outline-none placeholder:text-slate-500"
              />
            </div>

            <label className="flex items-center gap-3 text-sm text-slate-300">
              <input
                type="checkbox"
                checked={reschedule.afterClass}
                onChange={(event) =>
                  setReschedule((current) => ({
                    ...current,
                    afterClass: event.target.checked,
                    time: event.target.checked
                      ? ""
                      : current.time,
                    timeLabel: event.target.checked
                      ? "After class"
                      : current.timeLabel,
                  }))
                }
              />
              After class
            </label>

            <div className="flex gap-3">
              <button
                type="submit"
                className="rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white hover:bg-violet-500"
              >
                Confirm Reschedule
              </button>

              <button
                type="button"
                onClick={() => setRescheduleId("")}
                className="rounded-xl border border-slate-700 px-5 py-3 text-sm font-semibold text-slate-300 hover:bg-slate-800"
              >
                Cancel
              </button>
            </div>
          </form>
        </section>
      )}

      <section className="rounded-2xl border border-slate-800 bg-[#0D1422]">
        <div className="border-b border-slate-800 px-5 py-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold">
                My Sessions
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Session requests and mentoring history
              </p>
            </div>

            <button
              onClick={load}
              className="flex h-10 w-10 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white"
              aria-label="Refresh"
            >
              <FiRefreshCw />
            </button>
          </div>
        </div>

        {loading ? (
          <div className="p-6 text-sm text-slate-400">
            Loading sessions...
          </div>
        ) : sessions.length === 0 ? (
          <div className="p-6 text-sm text-slate-500">
            No sessions found.
          </div>
        ) : (
          <div className="divide-y divide-slate-800">
            {sessions.map((session) => (
              <div key={session.id} className="p-5">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <h3 className="font-semibold text-white">
                      {session.title || "Mentoring Session"}
                    </h3>

                    <div className="mt-2 flex flex-wrap gap-3 text-xs text-slate-500">
                      <span className="inline-flex items-center gap-1">
                        <FiCalendar />
                        {session.date || "Not set"}
                      </span>

                      <span className="inline-flex items-center gap-1">
                        <FiClock />
                        {session.timeLabel ||
                          session.time ||
                          "Not set"}
                      </span>

                      <span className="inline-flex items-center gap-1">
                        {session.mode === "Online" ? (
                          <FiVideo />
                        ) : (
                          <FiMapPin />
                        )}
                        {session.mode || "In-person"}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <span className="rounded-full bg-slate-800 px-3 py-1 text-xs font-semibold capitalize text-slate-300">
                      {session.status}
                    </span>

                    {session.status !== "completed" && (
                      <button
                        onClick={() => startReschedule(session)}
                        className="inline-flex items-center gap-2 rounded-lg border border-slate-700 px-3 py-2 text-xs font-semibold text-slate-300 hover:bg-slate-800"
                      >
                        <FiRefreshCw />
                        Reschedule
                      </button>
                    )}
                  </div>
                </div>

                {session.agenda && (
                  <div className="mt-4 rounded-xl border border-slate-800 bg-[#0B111D] p-4">
                    <p className="text-xs uppercase tracking-wide text-slate-500">
                      Agenda
                    </p>

                    <p className="mt-2 text-sm text-slate-300">
                      {session.agenda}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default Sessions;
