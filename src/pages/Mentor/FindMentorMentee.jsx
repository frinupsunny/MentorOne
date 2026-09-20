import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_BASE_URL = "http://localhost:4000";

function FindMentorMentee() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("All");
  const [selectedPerson, setSelectedPerson] = useState(null);

  const [people, setPeople] = useState([]);
  const [currentMentor, setCurrentMentor] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const getToken = () => {
    return localStorage.getItem("mentorOneToken");
  };

  const getInitials = (name = "") => {
    return name
      .split(" ")
      .filter(Boolean)
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  const handleAuthError = (err) => {
    if (
      err.response?.status === 401 ||
      err.response?.status === 403
    ) {
      localStorage.removeItem("mentorOneToken");
      localStorage.removeItem("mentorOneRole");
      localStorage.removeItem("mentorOneUser");

      navigate("/login");
      return true;
    }

    return false;
  };

  useEffect(() => {
    const fetchFindData = async () => {
      const token = getToken();

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const [menteesResponse, dashboardResponse] =
          await Promise.all([
            axios.get(
              `${API_BASE_URL}/api/mentor/find-mentees`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            ),

            axios.get(
              `${API_BASE_URL}/api/mentor/dashboard`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            ),
          ]);

        const unassignedMentees = menteesResponse.data;

        const mappedPeople = unassignedMentees.map((mentee) => ({
          id: mentee.id,
          name: mentee.name,
          role: "Mentee",
          department: "Not specified",
          designation: mentee.programme,
          email: "",
          availability: "Available",
          initials: getInitials(mentee.name),

          // Keep backend information for the profile modal
          registerNo: mentee.registerNo,
          semester: mentee.semester,
          section: mentee.section,
          attendance: mentee.attendance,
          cgpa: mentee.cgpa,
          backlogs: mentee.backlogs,
          backendStatus: mentee.status,
        }));

        setPeople(mappedPeople);
        setCurrentMentor(dashboardResponse.data.mentor);
      } catch (err) {
        console.error("Find Mentor-Mentee API error:", err);

        if (handleAuthError(err)) {
          return;
        }

        setError(
          err.response?.data?.error ||
            "Unable to load available mentees."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchFindData();
  }, [navigate]);

  const filteredPeople = people.filter((person) => {
    const matchesSearch =
      person.name.toLowerCase().includes(search.toLowerCase()) ||
      person.department.toLowerCase().includes(search.toLowerCase()) ||
      person.designation.toLowerCase().includes(search.toLowerCase());

    const matchesDepartment =
      department === "All" ||
      person.department === department;

    return matchesSearch && matchesDepartment;
  });

  const mentorCount = currentMentor ? 1 : 0;
  const menteeCount = people.length;
  const totalPeople = mentorCount + menteeCount;

  if (loading) {
    return (
      <div className="min-h-full bg-[#080C14] p-6 text-white">
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="text-center">
            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-slate-700 border-t-purple-500" />

            <p className="mt-4 text-sm text-slate-400">
              Loading available mentees...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-full bg-[#080C14] p-6 text-white">
        <div className="rounded-2xl border border-red-500/20 bg-[#101624] p-6">
          <h2 className="text-lg font-semibold text-red-400">
            Unable to load available mentees
          </h2>

          <p className="mt-2 text-sm text-slate-400">
            {error}
          </p>

          <button
            onClick={() => window.location.reload()}
            className="mt-4 rounded-lg bg-red-500/10 px-4 py-2 text-sm font-medium text-red-400 transition hover:bg-red-500/20"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full bg-[#080C14] p-6 text-white">
      {/* Header */}
      <div className="mb-8">
        <p className="mb-2 text-sm text-slate-400">
          Mentor Workspace
        </p>

        <h1 className="text-3xl font-bold">
          Find Mentor-Mentee
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Search and connect with currently unassigned mentees.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-3">
        <div className="rounded-2xl border border-[#27334A] bg-[#101624] p-5">
          <p className="text-sm text-slate-400">
            Total People
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            {totalPeople}
          </h2>

          <p className="mt-2 text-xs text-slate-500">
            Available in this workspace
          </p>
        </div>

        <div className="rounded-2xl border border-[#27334A] bg-[#101624] p-5">
          <p className="text-sm text-slate-400">
            Mentors
          </p>

          <h2 className="mt-2 text-3xl font-bold text-blue-400">
            {mentorCount}
          </h2>

          <p className="mt-2 text-xs text-slate-500">
            You
          </p>
        </div>

        <div className="rounded-2xl border border-[#27334A] bg-[#101624] p-5">
          <p className="text-sm text-slate-400">
            Mentees
          </p>

          <h2 className="mt-2 text-3xl font-bold text-emerald-400">
            {menteeCount}
          </h2>

          <p className="mt-2 text-xs text-slate-500">
            Currently unassigned
          </p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="mb-6 flex flex-col gap-4 rounded-2xl border border-[#27334A] bg-[#101624] p-5 md:flex-row">
        <input
          type="text"
          placeholder="Search by name, department or programme..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className="flex-1 rounded-xl border border-[#33415C] bg-[#0B111D] px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-blue-500"
        />

        <select
          value={department}
          onChange={(event) => setDepartment(event.target.value)}
          className="rounded-xl border border-[#33415C] bg-[#0B111D] px-4 py-3 text-sm text-slate-300 outline-none focus:border-blue-500"
        >
          <option value="All">All Departments</option>
          <option value="Not specified">Not specified</option>
        </select>
      </div>

      {/* People Grid */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {filteredPeople.map((person) => (
          <div
            key={person.id}
            className="rounded-2xl border border-[#27334A] bg-[#101624] p-6 transition hover:-translate-y-1 hover:border-blue-500/40"
          >
            <div className="mb-5 flex items-start justify-between">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-blue-600 text-lg font-bold">
                {person.initials}
              </div>

              <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
                {person.role}
              </span>
            </div>

            <h2 className="text-lg font-semibold text-white">
              {person.name}
            </h2>

            <p className="mt-2 text-sm text-slate-400">
              {person.designation}
            </p>

            <div className="mt-4 space-y-2 text-sm">
              <p className="text-slate-500">
                Department:
                <span className="ml-2 text-slate-300">
                  {person.department}
                </span>
              </p>

              <p className="text-slate-500">
                Status:
                <span className="ml-2 text-emerald-400">
                  {person.availability}
                </span>
              </p>
            </div>

            <div className="mt-5 flex gap-3">
              <button
                onClick={() => setSelectedPerson(person)}
                className="flex-1 rounded-xl border border-[#33415C] px-4 py-3 text-sm font-medium text-slate-300 transition hover:border-blue-500 hover:bg-blue-500/10 hover:text-blue-400"
              >
                View Profile
              </button>

              <button
                type="button"
                disabled
                className="flex-1 cursor-not-allowed rounded-xl bg-slate-800 px-4 py-3 text-center text-sm font-semibold text-slate-500"
                title="Email address is not available in the current backend data"
              >
                Contact
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredPeople.length === 0 && (
        <div className="rounded-2xl border border-[#27334A] bg-[#101624] px-6 py-12 text-center text-sm text-slate-500">
          No unassigned mentees found.
        </div>
      )}

      {/* Profile Modal */}
      {selectedPerson && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-6">
          <div className="w-full max-w-md rounded-2xl border border-[#33415C] bg-[#101624] p-6 shadow-2xl">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-xl font-bold text-white">
                  {selectedPerson.name}
                </h2>

                <p className="mt-1 text-sm text-slate-400">
                  {selectedPerson.role}
                </p>
              </div>

              <button
                onClick={() => setSelectedPerson(null)}
                className="text-xl text-slate-400 hover:text-white"
              >
                ×
              </button>
            </div>

            <div className="mt-6 space-y-4 text-sm">
              <div>
                <p className="text-slate-500">
                  Register Number
                </p>

                <p className="mt-1 text-slate-200">
                  {selectedPerson.registerNo || "Not available"}
                </p>
              </div>

              <div>
                <p className="text-slate-500">
                  Programme
                </p>

                <p className="mt-1 text-slate-200">
                  {selectedPerson.designation}
                </p>
              </div>

              <div>
                <p className="text-slate-500">
                  Semester
                </p>

                <p className="mt-1 text-slate-200">
                  {selectedPerson.semester}
                </p>
              </div>

              <div>
                <p className="text-slate-500">
                  Section
                </p>

                <p className="mt-1 text-slate-200">
                  {selectedPerson.section}
                </p>
              </div>

              <div>
                <p className="text-slate-500">
                  Attendance
                </p>

                <p className="mt-1 text-blue-400">
                  {selectedPerson.attendance}%
                </p>
              </div>

              <div>
                <p className="text-slate-500">
                  CGPA
                </p>

                <p className="mt-1 text-slate-200">
                  {selectedPerson.cgpa}
                </p>
              </div>

              <div>
                <p className="text-slate-500">
                  Backlogs
                </p>

                <p className="mt-1 text-slate-200">
                  {selectedPerson.backlogs}
                </p>
              </div>

              <div>
                <p className="text-slate-500">
                  Academic Status
                </p>

                <p
                  className={`mt-1 ${
                    selectedPerson.backendStatus === "At risk"
                      ? "text-amber-400"
                      : "text-emerald-400"
                  }`}
                >
                  {selectedPerson.backendStatus}
                </p>
              </div>
            </div>

            <div className="mt-6">
              <button
                onClick={() => setSelectedPerson(null)}
                className="w-full rounded-xl border border-[#33415C] px-4 py-3 text-sm font-medium text-slate-300 hover:bg-slate-800"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FindMentorMentee;