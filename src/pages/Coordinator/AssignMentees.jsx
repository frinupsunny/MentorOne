import { useState } from "react";
import {
  FiUserPlus,
  FiUsers,
  FiShuffle,
  FiLink,
  FiSearch,
  FiCheckCircle,
  FiArrowRight,
  FiUser,
  FiBookOpen,
} from "react-icons/fi";

function AssignMentees() {
  const [mode, setMode] = useState("manual");

  const [search, setSearch] = useState("");
  const [selectedMentee, setSelectedMentee] = useState(null);
  const [selectedMentor, setSelectedMentor] = useState("");

  const [selectedClass, setSelectedClass] = useState("");
  const [selectedMentors, setSelectedMentors] = useState([]);

  const [connectEnabled, setConnectEnabled] = useState(false);
  const [success, setSuccess] = useState("");

  const mentees = [
    {
      id: 1,
      name: "Jasmine A",
      registerNo: "24MDS001",
      className: "MSc Data Science Sem 3",
    },
    {
      id: 2,
      name: "Rahul Kumar",
      registerNo: "24MDS002",
      className: "MSc Data Science Sem 3",
    },
    {
      id: 3,
      name: "Ananya S",
      registerNo: "24MDS003",
      className: "MSc Data Science Sem 3",
    },
    {
      id: 4,
      name: "Arjun P",
      registerNo: "24MDS004",
      className: "MSc Data Science Sem 3",
    },
  ];

  const mentors = [
    {
      id: 1,
      name: "Dr. Ramesh Kumar",
      department: "Data Science",
      currentMentees: 12,
    },
    {
      id: 2,
      name: "Dr. Meena S",
      department: "Data Science",
      currentMentees: 15,
    },
    {
      id: 3,
      name: "Dr. Anitha Joseph",
      department: "Computer Science",
      currentMentees: 10,
    },
    {
      id: 4,
      name: "Dr. Arun Mathew",
      department: "Data Science",
      currentMentees: 8,
    },
  ];

  const classes = [
    {
      id: 1,
      name: "MSc Data Science Sem 3",
      code: "4MDS",
      strength: 28,
    },
    {
      id: 2,
      name: "MSc Data Science Sem 1",
      code: "2MDS",
      strength: 32,
    },
    {
      id: 3,
      name: "B.Tech Computer Science Sem 2",
      code: "2CSE",
      strength: 24,
    },
  ];

  const filteredMentees = mentees.filter(
    (mentee) =>
      mentee.name.toLowerCase().includes(search.toLowerCase()) ||
      mentee.registerNo.toLowerCase().includes(search.toLowerCase())
  );

  const toggleMentor = (mentorId) => {
    setSelectedMentors((prev) =>
      prev.includes(mentorId)
        ? prev.filter((id) => id !== mentorId)
        : [...prev, mentorId]
    );
  };

  const handleManualAssign = () => {
    if (!selectedMentee || !selectedMentor) {
      setSuccess("");
      return;
    }

    setSuccess(
      `${selectedMentee.name} has been assigned successfully.`
    );
  };

  const handleDynamicAssign = () => {
    if (!selectedClass || selectedMentors.length === 0) {
      setSuccess("");
      return;
    }

    const classData = classes.find(
      (item) => item.id === Number(selectedClass)
    );

    const studentsPerMentor = Math.floor(
      classData.strength / selectedMentors.length
    );

    setSuccess(
      `${classData.name} (${classData.strength} students) will be divided among ${selectedMentors.length} mentors. Approximately ${studentsPerMentor} mentees per mentor.`
    );
  };

  const renderSuccess = () => {
    if (!success) return null;

    return (
      <div className="mb-6 flex items-start gap-3 rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-emerald-300">
        <FiCheckCircle className="mt-0.5 text-lg flex-shrink-0" />
        <p className="text-sm">{success}</p>
      </div>
    );
  };

  return (
    <div className="min-h-full bg-[#0B1020] text-white p-6 md:p-8">
      {/* Header */}
      <div className="mb-8">
        <p className="text-sm text-indigo-400 font-medium mb-2">
          Coordinator
        </p>

        <h1 className="text-3xl font-bold tracking-tight">
          Assign Mentees
        </h1>

        <p className="mt-2 text-sm text-slate-400">
          Manage mentor-mentee allocation using manual, dynamic, or direct
          connection methods.
        </p>
      </div>

      {/* Mode Selection */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {/* Manual */}
        <button
          onClick={() => {
            setMode("manual");
            setSuccess("");
          }}
          className={`text-left rounded-2xl border p-5 transition-all ${
            mode === "manual"
              ? "border-indigo-500 bg-indigo-500/10 shadow-lg shadow-indigo-500/10"
              : "border-slate-800 bg-[#111827] hover:border-slate-700"
          }`}
        >
          <div
            className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${
              mode === "manual"
                ? "bg-indigo-500 text-white"
                : "bg-slate-800 text-slate-300"
            }`}
          >
            <FiUserPlus className="text-xl" />
          </div>

          <h2 className="font-semibold text-lg">Manual Assign</h2>

          <p className="text-sm text-slate-400 mt-2">
            Search for a mentee and manually assign them to a mentor.
          </p>
        </button>

        {/* Dynamic */}
        <button
          onClick={() => {
            setMode("dynamic");
            setSuccess("");
          }}
          className={`text-left rounded-2xl border p-5 transition-all ${
            mode === "dynamic"
              ? "border-purple-500 bg-purple-500/10 shadow-lg shadow-purple-500/10"
              : "border-slate-800 bg-[#111827] hover:border-slate-700"
          }`}
        >
          <div
            className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${
              mode === "dynamic"
                ? "bg-purple-500 text-white"
                : "bg-slate-800 text-slate-300"
            }`}
          >
            <FiShuffle className="text-xl" />
          </div>

          <h2 className="font-semibold text-lg">Dynamic Change</h2>

          <p className="text-sm text-slate-400 mt-2">
            Select a class and mentors, then divide the class equally.
          </p>
        </button>

        {/* Connect */}
        <button
          onClick={() => {
            setMode("connect");
            setSuccess("");
          }}
          className={`text-left rounded-2xl border p-5 transition-all ${
            mode === "connect"
              ? "border-emerald-500 bg-emerald-500/10 shadow-lg shadow-emerald-500/10"
              : "border-slate-800 bg-[#111827] hover:border-slate-700"
          }`}
        >
          <div
            className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${
              mode === "connect"
                ? "bg-emerald-500 text-white"
                : "bg-slate-800 text-slate-300"
            }`}
          >
            <FiLink className="text-xl" />
          </div>

          <h2 className="font-semibold text-lg">
            Mentor ⇄ Mentee Connect
          </h2>

          <p className="text-sm text-slate-400 mt-2">
            Allow mentors and mentees to request and confirm connections.
          </p>
        </button>
      </div>

      {renderSuccess()}

      {/* Manual Assignment */}
      {mode === "manual" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Search Mentee */}
          <div className="rounded-2xl border border-slate-800 bg-[#111827] p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
                <FiUsers />
              </div>

              <div>
                <h2 className="font-semibold text-lg">
                  Select Mentee
                </h2>
                <p className="text-xs text-slate-500">
                  Search by name or register number
                </p>
              </div>
            </div>

            <div className="relative mb-4">
              <FiSearch className="absolute left-3 top-3.5 text-slate-500" />

              <input
                type="text"
                placeholder="Search mentee..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-900/70 py-3 pl-10 pr-4 text-sm text-white outline-none focus:border-indigo-500"
              />
            </div>

            <div className="space-y-2">
              {filteredMentees.map((mentee) => (
                <button
                  key={mentee.id}
                  onClick={() => setSelectedMentee(mentee)}
                  className={`w-full text-left rounded-xl border p-4 transition ${
                    selectedMentee?.id === mentee.id
                      ? "border-indigo-500 bg-indigo-500/10"
                      : "border-slate-800 hover:border-slate-700 bg-slate-900/40"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center">
                      <FiUser className="text-slate-400" />
                    </div>

                    <div className="flex-1">
                      <p className="font-medium text-sm">
                        {mentee.name}
                      </p>

                      <p className="text-xs text-slate-500 mt-1">
                        {mentee.registerNo} · {mentee.className}
                      </p>
                    </div>

                    {selectedMentee?.id === mentee.id && (
                      <FiCheckCircle className="text-indigo-400" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Select Mentor */}
          <div className="rounded-2xl border border-slate-800 bg-[#111827] p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center">
                <FiBookOpen />
              </div>

              <div>
                <h2 className="font-semibold text-lg">
                  Select Mentor
                </h2>
                <p className="text-xs text-slate-500">
                  Choose a mentor for the selected mentee
                </p>
              </div>
            </div>

            <div className="space-y-2">
              {mentors.map((mentor) => (
                <button
                  key={mentor.id}
                  onClick={() => setSelectedMentor(String(mentor.id))}
                  className={`w-full text-left rounded-xl border p-4 transition ${
                    selectedMentor === String(mentor.id)
                      ? "border-purple-500 bg-purple-500/10"
                      : "border-slate-800 hover:border-slate-700 bg-slate-900/40"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center">
                      <FiUser className="text-slate-400" />
                    </div>

                    <div className="flex-1">
                      <p className="font-medium text-sm">
                        {mentor.name}
                      </p>

                      <p className="text-xs text-slate-500 mt-1">
                        {mentor.department} · {mentor.currentMentees} mentees
                      </p>
                    </div>

                    {selectedMentor === String(mentor.id) && (
                      <FiCheckCircle className="text-purple-400" />
                    )}
                  </div>
                </button>
              ))}
            </div>

            <button
              onClick={handleManualAssign}
              disabled={!selectedMentee || !selectedMentor}
              className="w-full mt-6 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 py-3 text-sm font-semibold transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Assign Mentee
              <FiArrowRight />
            </button>
          </div>
        </div>
      )}

      {/* Dynamic Assignment */}
      {mode === "dynamic" && (
        <div className="rounded-2xl border border-slate-800 bg-[#111827] p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center">
              <FiShuffle />
            </div>

            <div>
              <h2 className="font-semibold text-lg">
                Dynamic Class Allocation
              </h2>

              <p className="text-sm text-slate-500">
                Reallocate students when the semester class list changes.
              </p>
            </div>
          </div>

          {/* Class */}
          <div className="mb-7">
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Select Class
            </label>

            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-white outline-none focus:border-purple-500"
            >
              <option value="">Select a class</option>

              {classes.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name} ({item.code}) — {item.strength} students
                </option>
              ))}
            </select>
          </div>

          {/* Mentors */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-3">
              Choose Mentors
            </label>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {mentors.map((mentor) => {
                const selected = selectedMentors.includes(mentor.id);

                return (
                  <button
                    key={mentor.id}
                    onClick={() => toggleMentor(mentor.id)}
                    className={`text-left rounded-xl border p-4 transition ${
                      selected
                        ? "border-purple-500 bg-purple-500/10"
                        : "border-slate-800 bg-slate-900/40 hover:border-slate-700"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center">
                        <FiUser className="text-slate-400" />
                      </div>

                      <div className="flex-1">
                        <p className="text-sm font-medium">
                          {mentor.name}
                        </p>

                        <p className="text-xs text-slate-500 mt-1">
                          {mentor.currentMentees} current mentees
                        </p>
                      </div>

                      {selected && (
                        <FiCheckCircle className="text-purple-400" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <button
            onClick={handleDynamicAssign}
            disabled={!selectedClass || selectedMentors.length === 0}
            className="mt-7 w-full md:w-auto flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 px-6 py-3 text-sm font-semibold hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <FiShuffle />
            Divide Class Equally Among Selected Mentors
          </button>

          <div className="mt-6 rounded-xl border border-amber-500/20 bg-amber-500/5 p-4">
            <p className="text-sm text-amber-300 font-medium">
              Allocation rule
            </p>

            <p className="text-xs text-slate-400 mt-1">
              The selected class strength will be divided as evenly as
              possible among the selected mentors.
            </p>
          </div>
        </div>
      )}

      {/* Mentor Mentee Connect */}
      {mode === "connect" && (
        <div className="rounded-2xl border border-slate-800 bg-[#111827] p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                <FiLink />
              </div>

              <div>
                <h2 className="font-semibold text-lg">
                  Mentor ⇄ Mentee Connect
                </h2>

                <p className="text-sm text-slate-500">
                  Allow users to request and confirm their own pairing.
                </p>
              </div>
            </div>

            <button
              onClick={() => setConnectEnabled(!connectEnabled)}
              className={`relative w-14 h-7 rounded-full transition ${
                connectEnabled ? "bg-emerald-500" : "bg-slate-700"
              }`}
            >
              <span
                className={`absolute top-1 w-5 h-5 rounded-full bg-white transition ${
                  connectEnabled ? "left-8" : "left-1"
                }`}
              />
            </button>
          </div>

          <div
            className={`mt-7 rounded-xl border p-5 ${
              connectEnabled
                ? "border-emerald-500/20 bg-emerald-500/5"
                : "border-slate-800 bg-slate-900/40"
            }`}
          >
            <h3 className="font-medium text-sm">
              {connectEnabled
                ? "Direct connection is enabled"
                : "Direct connection is disabled"}
            </h3>

            <p className="text-sm text-slate-400 mt-2 leading-6">
              {connectEnabled
                ? "Mentees and mentors can browse available profiles and send connection requests. The pairing is confirmed only after the other person accepts the request."
                : "When disabled, assignments can only be created through Manual Assign or Dynamic Change."}
            </p>
          </div>

          {connectEnabled && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-5">
                <FiUsers className="text-indigo-400 text-xl mb-3" />

                <h3 className="font-medium">
                  Mentee Requests
                </h3>

                <p className="text-xs text-slate-500 mt-2">
                  Mentees can browse mentors and send a connection request.
                </p>
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-5">
                <FiBookOpen className="text-purple-400 text-xl mb-3" />

                <h3 className="font-medium">
                  Mentor Requests
                </h3>

                <p className="text-xs text-slate-500 mt-2">
                  Mentors can browse mentees and accept or reject requests.
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default AssignMentees;