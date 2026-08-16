import { useNavigate, useParams } from "react-router-dom";
import {
  FiArrowLeft,
  FiUser,
  FiBookOpen,
  FiUsers,
  FiCalendar,
  FiCheckCircle,
  FiAlertTriangle,
  FiClock,
  FiMail,
  FiPhone,
  FiUserCheck,
} from "react-icons/fi";

const mentees = [
  {
    id: 1,
    name: "Jasmine A",
    department: "Computer Science",
    email: "jasmine.a@christuniversity.in",
    phone: "+91 98765 44001",
    mentor: "Dr. Rajesh R",
    sessions: 4,
    status: "On Track",
    compliance: "Good",
    joined: "June 2025",
  },
  {
    id: 2,
    name: "Frinu P",
    department: "Data Science",
    email: "frinu.p@christuniversity.in",
    phone: "+91 98765 44002",
    mentor: "Dr. Rajesh R",
    sessions: 3,
    status: "On Track",
    compliance: "Good",
    joined: "July 2025",
  },
  {
    id: 3,
    name: "Sanjay K",
    department: "Computer Science",
    email: "sanjay.k@christuniversity.in",
    phone: "+91 98765 44003",
    mentor: "Dr. Sunita",
    sessions: 0,
    status: "Needs Attention",
    compliance: "Needs Attention",
    joined: "August 2025",
  },
  {
    id: 4,
    name: "Akhil T",
    department: "Information Technology",
    email: "akhil.t@christuniversity.in",
    phone: "+91 98765 44004",
    mentor: "Mr. Arun",
    sessions: 0,
    status: "Needs Attention",
    compliance: "Needs Attention",
    joined: "August 2025",
  },
  {
    id: 5,
    name: "Sandra Joseph",
    department: "Data Science",
    email: "sandra.j@christuniversity.in",
    phone: "+91 98765 44005",
    mentor: "Dr. Anitha",
    sessions: 3,
    status: "On Track",
    compliance: "Good",
    joined: "June 2025",
  },
  {
    id: 6,
    name: "Alan Mathew",
    department: "Computer Science",
    email: "alan.m@christuniversity.in",
    phone: "+91 98765 44006",
    mentor: "Dr. Vivek",
    sessions: 2,
    status: "On Track",
    compliance: "Good",
    joined: "July 2025",
  },
];

const recentSessions = [
  {
    date: "16 Aug 2026",
    mentor: "Dr. Rajesh R",
    topic: "Academic Progress",
    status: "Completed",
  },
  {
    date: "09 Aug 2026",
    mentor: "Dr. Rajesh R",
    topic: "Career Guidance",
    status: "Completed",
  },
  {
    date: "02 Aug 2026",
    mentor: "Dr. Rajesh R",
    topic: "Project Discussion",
    status: "Completed",
  },
];

function MenteeDetails() {
  const navigate = useNavigate();
  const { menteeId } = useParams();

  const mentee = mentees.find(
    (item) => item.id === Number(menteeId)
  );

  if (!mentee) {
    return (
      <div className="p-6">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-8 text-center">
          <h1 className="text-xl font-semibold text-white">
            Mentee not found
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            The mentee you are looking for does not exist.
          </p>

          <button
            onClick={() => navigate("/coordinator/mentees")}
            className="mt-5 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-500"
          >
            Back to My Mentees
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-5 sm:p-6 lg:p-7">

      {/* Back Button */}
      <button
        onClick={() => navigate("/coordinator/mentees")}
        className="mb-5 flex items-center gap-2 text-sm text-slate-400 transition hover:text-white"
      >
        <FiArrowLeft />
        Back to My Mentees
      </button>

      {/* Profile Header */}
      <div className="mb-6 rounded-2xl border border-slate-800 bg-slate-900/70 p-6">

        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

          <div className="flex items-center gap-4">

            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-400 to-emerald-500 text-lg font-bold text-white shadow-lg shadow-emerald-500/10">
              {mentee.name
                .split(" ")
                .map((word) => word[0])
                .join("")
                .slice(0, 2)}
            </div>

            <div>
              <h1 className="text-2xl font-semibold text-white">
                {mentee.name}
              </h1>

              <p className="mt-1 text-sm text-slate-400">
                Student Mentee • {mentee.department}
              </p>

              <div className="mt-3 flex flex-wrap gap-2">

                {mentee.status === "On Track" ? (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-[11px] font-medium text-emerald-400">
                    <FiCheckCircle />
                    On Track
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/20 bg-amber-500/10 px-2.5 py-1 text-[11px] font-medium text-amber-400">
                    <FiAlertTriangle />
                    Needs Attention
                  </span>
                )}

                {mentee.compliance === "Good" ? (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-[11px] font-medium text-emerald-400">
                    <FiCheckCircle />
                    Good Compliance
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/20 bg-amber-500/10 px-2.5 py-1 text-[11px] font-medium text-amber-400">
                    <FiAlertTriangle />
                    Needs Attention
                  </span>
                )}

              </div>
            </div>

          </div>

          <div className="rounded-xl border border-teal-500/20 bg-teal-500/5 px-5 py-4">

            <p className="text-xs text-slate-500">
              Mentee since
            </p>

            <p className="mt-1 text-sm font-medium text-teal-400">
              {mentee.joined}
            </p>

          </div>

        </div>

      </div>

      {/* Statistics */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

        {/* Mentor */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">

          <div className="flex items-center justify-between">

            <div className="min-w-0">
              <p className="text-sm text-slate-400">
                Assigned Mentor
              </p>

              <p className="mt-2 truncate text-sm font-semibold text-white">
                {mentee.mentor}
              </p>
            </div>

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-500/15 text-blue-400">
              <FiUserCheck />
            </div>

          </div>

        </div>

        {/* Sessions */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-slate-400">
                Sessions This Month
              </p>

              <p className="mt-2 text-2xl font-semibold text-white">
                {mentee.sessions}
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/15 text-purple-400">
              <FiCalendar />
            </div>

          </div>

        </div>

        {/* Status */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-slate-400">
                Current Status
              </p>

              <p className="mt-2 text-lg font-semibold text-white">
                {mentee.status}
              </p>
            </div>

            <div
              className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                mentee.status === "On Track"
                  ? "bg-emerald-500/15 text-emerald-400"
                  : "bg-amber-500/15 text-amber-400"
              }`}
            >
              {mentee.status === "On Track" ? (
                <FiCheckCircle />
              ) : (
                <FiAlertTriangle />
              )}
            </div>

          </div>

        </div>

        {/* Department */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">

          <div className="flex items-center justify-between">

            <div className="min-w-0">
              <p className="text-sm text-slate-400">
                Department
              </p>

              <p className="mt-2 truncate text-sm font-semibold text-white">
                {mentee.department}
              </p>
            </div>

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-500/15 text-orange-400">
              <FiBookOpen />
            </div>

          </div>

        </div>

      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

        {/* Recent Sessions */}
        <div className="lg:col-span-2 rounded-2xl border border-slate-800 bg-slate-900/70">

          <div className="border-b border-slate-800 px-5 py-4">

            <h2 className="text-base font-semibold text-white">
              Recent Sessions
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              Recent mentoring sessions for this mentee
            </p>

          </div>

          <div className="divide-y divide-slate-800">

            {recentSessions.map((session, index) => (

              <div
                key={index}
                className="flex flex-col gap-3 px-5 py-4 transition hover:bg-slate-800/30 sm:flex-row sm:items-center sm:justify-between"
              >

                <div className="flex items-center gap-3">

                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-800 text-slate-400">
                    <FiCalendar />
                  </div>

                  <div>
                    <p className="text-sm font-medium text-white">
                      {session.topic}
                    </p>

                    <p className="mt-0.5 text-xs text-slate-500">
                      {session.mentor} • {session.date}
                    </p>
                  </div>

                </div>

                <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-[11px] font-medium text-emerald-400">
                  <FiCheckCircle />
                  {session.status}
                </span>

              </div>

            ))}

          </div>

        </div>

        {/* Mentee Information */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/70">

          <div className="border-b border-slate-800 px-5 py-4">

            <h2 className="text-base font-semibold text-white">
              Mentee Information
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              Student profile information
            </p>

          </div>

          <div className="space-y-5 p-5">

            <div className="flex items-start gap-3">

              <div className="mt-0.5 text-teal-400">
                <FiUser />
              </div>

              <div>
                <p className="text-xs text-slate-500">
                  Full Name
                </p>

                <p className="mt-1 text-sm text-white">
                  {mentee.name}
                </p>
              </div>

            </div>

            <div className="flex items-start gap-3">

              <div className="mt-0.5 text-teal-400">
                <FiBookOpen />
              </div>

              <div>
                <p className="text-xs text-slate-500">
                  Department
                </p>

                <p className="mt-1 text-sm text-white">
                  {mentee.department}
                </p>
              </div>

            </div>

            <div className="flex items-start gap-3">

              <div className="mt-0.5 text-teal-400">
                <FiUserCheck />
              </div>

              <div>
                <p className="text-xs text-slate-500">
                  Assigned Mentor
                </p>

                <p className="mt-1 text-sm text-white">
                  {mentee.mentor}
                </p>
              </div>

            </div>

            <div className="flex items-start gap-3">

              <div className="mt-0.5 text-teal-400">
                <FiMail />
              </div>

              <div className="min-w-0">
                <p className="text-xs text-slate-500">
                  Email
                </p>

                <p className="mt-1 break-all text-sm text-white">
                  {mentee.email}
                </p>
              </div>

            </div>

            <div className="flex items-start gap-3">

              <div className="mt-0.5 text-teal-400">
                <FiPhone />
              </div>

              <div>
                <p className="text-xs text-slate-500">
                  Phone
                </p>

                <p className="mt-1 text-sm text-white">
                  {mentee.phone}
                </p>
              </div>

            </div>

            <div className="flex items-start gap-3">

              <div className="mt-0.5 text-teal-400">
                <FiClock />
              </div>

              <div>
                <p className="text-xs text-slate-500">
                  Mentee Since
                </p>

                <p className="mt-1 text-sm text-white">
                  {mentee.joined}
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default MenteeDetails;