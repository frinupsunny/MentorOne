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
} from "react-icons/fi";

const mentors = [
  {
    id: 1,
    name: "Dr. Rajesh R",
    department: "Computer Science",
    email: "rajesh.r@christuniversity.in",
    phone: "+91 98765 43210",
    mentees: 5,
    sessions: 12,
    status: "Active",
    compliance: "Good",
    joined: "June 2024",
  },
  {
    id: 2,
    name: "Dr. Anitha",
    department: "Data Science",
    email: "anitha@christuniversity.in",
    phone: "+91 98765 43211",
    mentees: 4,
    sessions: 10,
    status: "Active",
    compliance: "Good",
    joined: "July 2024",
  },
  {
    id: 3,
    name: "Dr. Vivek",
    department: "Computer Science",
    email: "vivek@christuniversity.in",
    phone: "+91 98765 43212",
    mentees: 6,
    sessions: 8,
    status: "Active",
    compliance: "Needs Attention",
    joined: "August 2024",
  },
  {
    id: 4,
    name: "Dr. Ramesh",
    department: "Information Technology",
    email: "ramesh@christuniversity.in",
    phone: "+91 98765 43213",
    mentees: 5,
    sessions: 11,
    status: "Active",
    compliance: "Good",
    joined: "May 2024",
  },
  {
    id: 5,
    name: "Dr. Sunita",
    department: "Data Science",
    email: "sunita@christuniversity.in",
    phone: "+91 98765 43214",
    mentees: 3,
    sessions: 6,
    status: "Active",
    compliance: "Needs Attention",
    joined: "September 2024",
  },
];

const mentees = [
  {
    name: "Jasmine A",
    department: "Computer Science",
    sessions: 2,
    status: "On Track",
  },
  {
    name: "Frinu P",
    department: "Data Science",
    sessions: 1,
    status: "On Track",
  },
  {
    name: "Sanjay K",
    department: "Computer Science",
    sessions: 0,
    status: "Needs Attention",
  },
];

function MentorDetails() {
  const navigate = useNavigate();
  const { mentorId } = useParams();

  const mentor = mentors.find(
    (item) => item.id === Number(mentorId)
  );

  if (!mentor) {
    return (
      <div className="p-6">

        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-8 text-center">

          <h1 className="text-xl font-semibold text-white">
            Mentor not found
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            The mentor you are looking for does not exist.
          </p>

          <button
            onClick={() => navigate("/coordinator/mentors")}
            className="mt-5 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-500"
          >
            Back to My Mentors
          </button>

        </div>

      </div>
    );
  }

  return (
    <div className="p-5 sm:p-6 lg:p-7">

      {/* Back Button */}
      <button
        onClick={() => navigate("/coordinator/mentors")}
        className="mb-5 flex items-center gap-2 text-sm text-slate-400 transition hover:text-white"
      >
        <FiArrowLeft />
        Back to My Mentors
      </button>

      {/* Header */}
      <div className="mb-6 rounded-2xl border border-slate-800 bg-slate-900/70 p-6">

        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

          <div className="flex items-center gap-4">

            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-lg font-bold text-white shadow-lg shadow-indigo-500/20">
              {mentor.name
                .replace("Dr. ", "")
                .split(" ")
                .map((word) => word[0])
                .join("")
                .slice(0, 2)}
            </div>

            <div>
              <h1 className="text-2xl font-semibold text-white">
                {mentor.name}
              </h1>

              <p className="mt-1 text-sm text-slate-400">
                Faculty Mentor • {mentor.department}
              </p>

              <div className="mt-3 flex flex-wrap gap-2">

                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-[11px] font-medium text-emerald-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  {mentor.status}
                </span>

                {mentor.compliance === "Good" ? (
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

          <div className="rounded-xl border border-indigo-500/20 bg-indigo-500/5 px-5 py-4">

            <p className="text-xs text-slate-500">
              Mentor since
            </p>

            <p className="mt-1 text-sm font-medium text-indigo-400">
              {mentor.joined}
            </p>

          </div>

        </div>

      </div>

      {/* Statistics */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

        {/* Mentees */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-slate-400">
                Assigned Mentees
              </p>

              <p className="mt-2 text-2xl font-semibold text-white">
                {mentor.mentees}
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/15 text-blue-400">
              <FiUsers />
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
                {mentor.sessions}
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/15 text-purple-400">
              <FiCalendar />
            </div>

          </div>

        </div>

        {/* Compliance */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-slate-400">
                Compliance
              </p>

              <p className="mt-2 text-lg font-semibold text-white">
                {mentor.compliance}
              </p>
            </div>

            <div
              className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                mentor.compliance === "Good"
                  ? "bg-emerald-500/15 text-emerald-400"
                  : "bg-amber-500/15 text-amber-400"
              }`}
            >
              {mentor.compliance === "Good" ? (
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

            <div>
              <p className="text-sm text-slate-400">
                Department
              </p>

              <p className="mt-2 text-sm font-semibold text-white">
                {mentor.department}
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/15 text-orange-400">
              <FiBookOpen />
            </div>

          </div>

        </div>

      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

        {/* Mentee List */}
        <div className="lg:col-span-2 rounded-2xl border border-slate-800 bg-slate-900/70">

          <div className="border-b border-slate-800 px-5 py-4">

            <h2 className="text-base font-semibold text-white">
              Assigned Mentees
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              Students currently assigned to this mentor
            </p>

          </div>

          <div className="divide-y divide-slate-800">

            {mentees.map((mentee, index) => (

              <div
                key={index}
                className="flex flex-col gap-3 px-5 py-4 transition hover:bg-slate-800/30 sm:flex-row sm:items-center sm:justify-between"
              >

                <div className="flex items-center gap-3">

                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-800 text-xs font-semibold text-slate-300">
                    {mentee.name
                      .split(" ")
                      .map((word) => word[0])
                      .join("")
                      .slice(0, 2)}
                  </div>

                  <div>
                    <p className="text-sm font-medium text-white">
                      {mentee.name}
                    </p>

                    <p className="mt-0.5 text-xs text-slate-500">
                      {mentee.department}
                    </p>
                  </div>

                </div>

                <div className="flex items-center gap-4">

                  <div className="text-right">
                    <p className="text-xs text-slate-500">
                      Sessions
                    </p>

                    <p className="text-sm font-medium text-white">
                      {mentee.sessions}
                    </p>
                  </div>

                  <span
                    className={`rounded-full border px-2.5 py-1 text-[11px] font-medium ${
                      mentee.status === "On Track"
                        ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-400"
                        : "border-amber-500/20 bg-amber-500/10 text-amber-400"
                    }`}
                  >
                    {mentee.status}
                  </span>

                </div>

              </div>

            ))}

          </div>

        </div>

        {/* Contact Information */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/70">

          <div className="border-b border-slate-800 px-5 py-4">

            <h2 className="text-base font-semibold text-white">
              Mentor Information
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              Contact and profile information
            </p>

          </div>

          <div className="space-y-5 p-5">

            <div className="flex items-start gap-3">

              <div className="mt-0.5 text-indigo-400">
                <FiUser />
              </div>

              <div>
                <p className="text-xs text-slate-500">
                  Full Name
                </p>

                <p className="mt-1 text-sm text-white">
                  {mentor.name}
                </p>
              </div>

            </div>

            <div className="flex items-start gap-3">

              <div className="mt-0.5 text-indigo-400">
                <FiBookOpen />
              </div>

              <div>
                <p className="text-xs text-slate-500">
                  Department
                </p>

                <p className="mt-1 text-sm text-white">
                  {mentor.department}
                </p>
              </div>

            </div>

            <div className="flex items-start gap-3">

              <div className="mt-0.5 text-indigo-400">
                <FiMail />
              </div>

              <div className="min-w-0">
                <p className="text-xs text-slate-500">
                  Email
                </p>

                <p className="mt-1 break-all text-sm text-white">
                  {mentor.email}
                </p>
              </div>

            </div>

            <div className="flex items-start gap-3">

              <div className="mt-0.5 text-indigo-400">
                <FiPhone />
              </div>

              <div>
                <p className="text-xs text-slate-500">
                  Phone
                </p>

                <p className="mt-1 text-sm text-white">
                  {mentor.phone}
                </p>
              </div>

            </div>

            <div className="flex items-start gap-3">

              <div className="mt-0.5 text-indigo-400">
                <FiClock />
              </div>

              <div>
                <p className="text-xs text-slate-500">
                  Mentor Since
                </p>

                <p className="mt-1 text-sm text-white">
                  {mentor.joined}
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default MentorDetails;