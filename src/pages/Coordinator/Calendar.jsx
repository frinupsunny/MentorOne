import { useMemo, useState } from "react";
import {
  FiCalendar,
  FiChevronLeft,
  FiChevronRight,
  FiClock,
  FiMapPin,
  FiPlus,
  FiUsers,
  FiX,
} from "react-icons/fi";

function Calendar() {
  const [currentDate, setCurrentDate] = useState(
    new Date(2025, 7, 1)
  );

  const [selectedDate, setSelectedDate] = useState(
    new Date(2025, 7, 12)
  );

  const [showModal, setShowModal] = useState(false);

  const [events, setEvents] = useState([
    {
      id: 1,
      date: "2025-08-05",
      title: "Mentoring Session",
      mentor: "Dr. Ramesh Kumar",
      mentee: "Jasmine A",
      time: "10:00 AM - 10:45 AM",
      location: "Room 204",
      type: "session",
    },
    {
      id: 2,
      date: "2025-08-08",
      title: "Mentoring Session",
      mentor: "Dr. Meena S",
      mentee: "Rahul Kumar",
      time: "11:00 AM - 11:45 AM",
      location: "Room 302",
      type: "session",
    },
    {
      id: 3,
      date: "2025-08-12",
      title: "Mentoring Session",
      mentor: "Dr. Ramesh Kumar",
      mentee: "Jasmine A",
      time: "10:00 AM - 10:45 AM",
      location: "Room 204",
      type: "session",
    },
    {
      id: 4,
      date: "2025-08-12",
      title: "Department Meeting",
      mentor: "Coordinator",
      mentee: "All Mentors",
      time: "2:00 PM - 3:00 PM",
      location: "Conference Room",
      type: "meeting",
    },
    {
      id: 5,
      date: "2025-08-14",
      title: "Mentoring Session",
      mentor: "Dr. Anitha Joseph",
      mentee: "Ananya S",
      time: "9:30 AM - 10:15 AM",
      location: "Room 105",
      type: "session",
    },
    {
      id: 6,
      date: "2025-08-18",
      title: "Mentoring Session",
      mentor: "Dr. Arun Mathew",
      mentee: "Arjun P",
      time: "11:30 AM - 12:15 PM",
      location: "Room 210",
      type: "session",
    },
    {
      id: 7,
      date: "2025-08-20",
      title: "Mentor Review Meeting",
      mentor: "Coordinator",
      mentee: "All Mentors",
      time: "3:00 PM - 4:00 PM",
      location: "Seminar Hall",
      type: "meeting",
    },
    {
      id: 8,
      date: "2025-08-22",
      title: "Mentoring Session",
      mentor: "Mr. Arun Joseph",
      mentee: "Akhil Thomas",
      time: "10:30 AM - 11:15 AM",
      location: "Room 112",
      type: "session",
    },
    {
      id: 9,
      date: "2025-08-26",
      title: "Mentoring Session",
      mentor: "Dr. Sunita Pillai",
      mentee: "Priya S",
      time: "12:00 PM - 12:45 PM",
      location: "Room 201",
      type: "session",
    },
  ]);

  const monthName = currentDate.toLocaleString("en-US", {
    month: "long",
  });

  const year = currentDate.getFullYear();

  const getDateKey = (date) => {
    return `${date.getFullYear()}-${String(
      date.getMonth() + 1
    ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
  };

  const selectedDateKey = getDateKey(selectedDate);

  const selectedEvents = events.filter(
    (event) => event.date === selectedDateKey
  );

  const changeMonth = (amount) => {
    setCurrentDate(
      new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + amount,
        1
      )
    );
  };

  const goToToday = () => {
    const today = new Date();

    setCurrentDate(
      new Date(today.getFullYear(), today.getMonth(), 1)
    );

    setSelectedDate(today);
  };

  const calendarDays = useMemo(() => {
    const firstDay = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    );

    const lastDay = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    );

    const startDay = firstDay.getDay();
    const totalDays = lastDay.getDate();

    const days = [];

    for (let i = 0; i < startDay; i++) {
      days.push(null);
    }

    for (let day = 1; day <= totalDays; day++) {
      days.push(
        new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          day
        )
      );
    }

    return days;
  }, [currentDate]);

  const addEvent = (event) => {
    setEvents((prev) => [
      ...prev,
      {
        ...event,
        id: Date.now(),
      },
    ]);

    setShowModal(false);
  };

  return (
    <div className="min-h-full bg-[#080C14] p-6 text-white">
      {/* HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
              <FiCalendar className="text-indigo-400 text-xl" />
            </div>

            <div>
              <h1 className="text-2xl font-bold">
                Calendar
              </h1>

              <p className="text-sm text-slate-400 mt-1">
                Manage mentoring sessions and department events
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="h-10 px-4 rounded-lg bg-indigo-600 hover:bg-indigo-500 transition flex items-center justify-center gap-2 text-sm font-medium"
        >
          <FiPlus />
          Add Event
        </button>
      </div>

      {/* CALENDAR + SIDEBAR */}
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_350px] gap-6">
        {/* CALENDAR */}
        <div className="rounded-2xl border border-slate-800 bg-[#0D1422] overflow-hidden">
          {/* CALENDAR HEADER */}
          <div className="p-5 border-b border-slate-800">
            <div className="flex items-center justify-between">
              <button
                onClick={() => changeMonth(-1)}
                className="w-9 h-9 rounded-lg border border-slate-700 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 transition"
              >
                <FiChevronLeft />
              </button>

              <div className="text-center">
                <h2 className="text-lg font-semibold">
                  {monthName} {year}
                </h2>

                <button
                  onClick={goToToday}
                  className="text-xs text-indigo-400 hover:text-indigo-300 mt-1"
                >
                  Go to today
                </button>
              </div>

              <button
                onClick={() => changeMonth(1)}
                className="w-9 h-9 rounded-lg border border-slate-700 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 transition"
              >
                <FiChevronRight />
              </button>
            </div>
          </div>

          {/* WEEK DAYS */}
          <div className="grid grid-cols-7 border-b border-slate-800">
            {[
              "Sun",
              "Mon",
              "Tue",
              "Wed",
              "Thu",
              "Fri",
              "Sat",
            ].map((day) => (
              <div
                key={day}
                className="py-3 text-center text-xs font-medium text-slate-500"
              >
                {day}
              </div>
            ))}
          </div>

          {/* DAYS */}
          <div className="grid grid-cols-7">
            {calendarDays.map((date, index) => {
              if (!date) {
                return (
                  <div
                    key={`empty-${index}`}
                    className="min-h-[120px] border-b border-r border-slate-800/70"
                  />
                );
              }

              const dateKey = getDateKey(date);

              const dayEvents = events.filter(
                (event) => event.date === dateKey
              );

              const isSelected =
                selectedDateKey === dateKey;

              const isToday =
                getDateKey(new Date()) === dateKey;

              return (
                <button
                  key={dateKey}
                  onClick={() => setSelectedDate(date)}
                  className={`min-h-[120px] text-left p-2 border-b border-r border-slate-800/70 hover:bg-slate-800/30 transition ${
                    isSelected
                      ? "bg-indigo-500/5 ring-1 ring-inset ring-indigo-500/40"
                      : ""
                  }`}
                >
                  <div className="flex justify-between items-center mb-2">
                    <span
                      className={`w-7 h-7 flex items-center justify-center rounded-full text-xs font-medium ${
                        isToday
                          ? "bg-indigo-600 text-white"
                          : isSelected
                          ? "bg-indigo-500/20 text-indigo-300"
                          : "text-slate-400"
                      }`}
                    >
                      {date.getDate()}
                    </span>

                    {dayEvents.length > 0 && (
                      <span className="text-[10px] text-slate-600">
                        {dayEvents.length}
                      </span>
                    )}
                  </div>

                  <div className="space-y-1">
                    {dayEvents.slice(0, 2).map((event) => (
                      <div
                        key={event.id}
                        className={`px-2 py-1 rounded text-[10px] truncate ${
                          event.type === "meeting"
                            ? "bg-purple-500/10 text-purple-300 border border-purple-500/20"
                            : "bg-indigo-500/10 text-indigo-300 border border-indigo-500/20"
                        }`}
                      >
                        {event.title}
                      </div>
                    ))}

                    {dayEvents.length > 2 && (
                      <p className="text-[10px] text-slate-500 px-1">
                        +{dayEvents.length - 2} more
                      </p>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="space-y-6">
          {/* SELECTED DAY */}
          <div className="rounded-2xl border border-slate-800 bg-[#0D1422] p-5">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-base font-semibold">
                  {selectedDate.toLocaleDateString("en-US", {
                    weekday: "long",
                  })}
                </h2>

                <p className="text-xs text-slate-500 mt-1">
                  {selectedDate.toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </div>

              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center">
                <FiCalendar className="text-indigo-400" />
              </div>
            </div>

            {selectedEvents.length === 0 ? (
              <div className="py-8 text-center">
                <FiCalendar className="mx-auto text-2xl text-slate-600 mb-3" />

                <p className="text-sm text-slate-400">
                  No events scheduled
                </p>

                <button
                  onClick={() => setShowModal(true)}
                  className="text-xs text-indigo-400 hover:text-indigo-300 mt-2"
                >
                  Add an event
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {selectedEvents.map((event) => (
                  <EventCard
                    key={event.id}
                    event={event}
                  />
                ))}
              </div>
            )}
          </div>

          {/* LEGEND */}
          <div className="rounded-2xl border border-slate-800 bg-[#0D1422] p-5">
            <h2 className="text-sm font-semibold mb-4">
              Calendar Legend
            </h2>

            <div className="space-y-3">
              <LegendItem
                label="Mentoring Session"
                className="bg-indigo-500"
              />

              <LegendItem
                label="Department Meeting"
                className="bg-purple-500"
              />
            </div>
          </div>

          {/* MONTH SUMMARY */}
          <div className="rounded-2xl border border-slate-800 bg-[#0D1422] p-5">
            <h2 className="text-sm font-semibold mb-4">
              Monthly Summary
            </h2>

            <div className="space-y-4">
              <SummaryRow
                icon={FiCalendar}
                label="Total Events"
                value={events.filter((event) =>
                  event.date.startsWith(
                    `${year}-${String(
                      currentDate.getMonth() + 1
                    ).padStart(2, "0")}`
                  )
                ).length}
              />

              <SummaryRow
                icon={FiUsers}
                label="Mentoring Sessions"
                value={
                  events.filter(
                    (event) =>
                      event.type === "session" &&
                      event.date.startsWith(
                        `${year}-${String(
                          currentDate.getMonth() + 1
                        ).padStart(2, "0")}`
                      )
                  ).length
                }
              />

              <SummaryRow
                icon={FiClock}
                label="Department Meetings"
                value={
                  events.filter(
                    (event) =>
                      event.type === "meeting" &&
                      event.date.startsWith(
                        `${year}-${String(
                          currentDate.getMonth() + 1
                        ).padStart(2, "0")}`
                      )
                  ).length
                }
              />
            </div>
          </div>
        </div>
      </div>

      {/* ADD EVENT MODAL */}
      {showModal && (
        <AddEventModal
          selectedDate={selectedDate}
          onClose={() => setShowModal(false)}
          onAdd={addEvent}
        />
      )}
    </div>
  );
}

/* EVENT CARD */
function EventCard({ event }) {
  return (
    <div
      className={`rounded-xl border p-4 ${
        event.type === "meeting"
          ? "bg-purple-500/5 border-purple-500/20"
          : "bg-indigo-500/5 border-indigo-500/20"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-white">
            {event.title}
          </p>

          <p className="text-xs text-slate-500 mt-1">
            {event.mentor}
          </p>
        </div>

        <span
          className={`text-[10px] px-2 py-1 rounded-md ${
            event.type === "meeting"
              ? "bg-purple-500/10 text-purple-300"
              : "bg-indigo-500/10 text-indigo-300"
          }`}
        >
          {event.type === "meeting"
            ? "Meeting"
            : "Session"}
        </span>
      </div>

      <div className="mt-4 space-y-2">
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <FiClock className="text-slate-500" />
          {event.time}
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-400">
          <FiMapPin className="text-slate-500" />
          {event.location}
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-400">
          <FiUsers className="text-slate-500" />
          {event.mentee}
        </div>
      </div>
    </div>
  );
}

/* LEGEND */
function LegendItem({ label, className }) {
  return (
    <div className="flex items-center gap-3">
      <span
        className={`w-3 h-3 rounded-full ${className}`}
      />

      <span className="text-xs text-slate-400">
        {label}
      </span>
    </div>
  );
}

/* SUMMARY ROW */
function SummaryRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-slate-800/70 flex items-center justify-center">
          <Icon className="text-slate-400 text-sm" />
        </div>

        <span className="text-xs text-slate-400">
          {label}
        </span>
      </div>

      <span className="text-sm font-semibold text-white">
        {value}
      </span>
    </div>
  );
}

/* ADD EVENT MODAL */
function AddEventModal({
  selectedDate,
  onClose,
  onAdd,
}) {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("session");
  const [mentor, setMentor] = useState("Dr. Ramesh Kumar");
  const [mentee, setMentee] = useState("Jasmine A");
  const [time, setTime] = useState("10:00 AM - 10:45 AM");
  const [location, setLocation] = useState("Room 204");

  const submit = (e) => {
    e.preventDefault();

    if (!title.trim()) return;

    const date = `${selectedDate.getFullYear()}-${String(
      selectedDate.getMonth() + 1
    ).padStart(2, "0")}-${String(
      selectedDate.getDate()
    ).padStart(2, "0")}`;

    onAdd({
      date,
      title,
      type,
      mentor,
      mentee,
      time,
      location,
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-lg rounded-2xl border border-slate-800 bg-[#0D1422] shadow-2xl">
        {/* MODAL HEADER */}
        <div className="flex items-center justify-between p-5 border-b border-slate-800">
          <div>
            <h2 className="text-lg font-semibold">
              Add Calendar Event
            </h2>

            <p className="text-xs text-slate-500 mt-1">
              {selectedDate.toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <FiX />
          </button>
        </div>

        {/* FORM */}
        <form onSubmit={submit} className="p-5 space-y-4">
          <div>
            <label className="text-xs text-slate-400">
              Event Title
            </label>

            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter event title"
              className="mt-2 w-full h-10 px-3 rounded-lg bg-slate-900/60 border border-slate-700 text-sm text-white outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="text-xs text-slate-400">
              Event Type
            </label>

            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="mt-2 w-full h-10 px-3 rounded-lg bg-slate-900/60 border border-slate-700 text-sm text-white outline-none focus:border-indigo-500"
            >
              <option value="session">
                Mentoring Session
              </option>

              <option value="meeting">
                Department Meeting
              </option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-slate-400">
                Mentor
              </label>

              <select
                value={mentor}
                onChange={(e) => setMentor(e.target.value)}
                className="mt-2 w-full h-10 px-3 rounded-lg bg-slate-900/60 border border-slate-700 text-sm text-white outline-none focus:border-indigo-500"
              >
                <option>Dr. Ramesh Kumar</option>
                <option>Dr. Sunita Pillai</option>
                <option>Dr. Meena S</option>
                <option>Dr. Anitha Joseph</option>
                <option>Dr. Arun Mathew</option>
                <option>Mr. Arun Joseph</option>
              </select>
            </div>

            <div>
              <label className="text-xs text-slate-400">
                Mentee
              </label>

              <input
                value={mentee}
                onChange={(e) => setMentee(e.target.value)}
                className="mt-2 w-full h-10 px-3 rounded-lg bg-slate-900/60 border border-slate-700 text-sm text-white outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-slate-400">
                Time
              </label>

              <input
                value={time}
                onChange={(e) => setTime(e.target.value)}
                placeholder="10:00 AM - 10:45 AM"
                className="mt-2 w-full h-10 px-3 rounded-lg bg-slate-900/60 border border-slate-700 text-sm text-white outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="text-xs text-slate-400">
                Location
              </label>

              <input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Room 204"
                className="mt-2 w-full h-10 px-3 rounded-lg bg-slate-900/60 border border-slate-700 text-sm text-white outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          {/* BUTTONS */}
          <div className="flex justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 h-10 rounded-lg border border-slate-700 text-sm text-slate-300 hover:bg-slate-800"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 h-10 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-sm font-medium"
            >
              Add Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Calendar;