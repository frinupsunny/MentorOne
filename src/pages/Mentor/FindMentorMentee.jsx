import { useState } from "react";

function FindMentorMentee() {
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("All");
  const [selectedPerson, setSelectedPerson] = useState(null);

  const people = [
    {
      id: 1,
      name: "Dr. Rahul Mathew",
      role: "Mentor",
      department: "Data Science",
      designation: "Assistant Professor",
      email: "rahul.mathew@christuniversity.in",
      availability: "Available",
      initials: "RM",
    },
    {
      id: 2,
      name: "Dr. Priya Thomas",
      role: "Mentor",
      department: "Computer Science",
      designation: "Associate Professor",
      email: "priya.thomas@christuniversity.in",
      availability: "Available",
      initials: "PT",
    },
    {
      id: 3,
      name: "Arjun Kumar",
      role: "Mentee",
      department: "Data Science",
      designation: "MSc Data Science",
      email: "arjun.kumar@christuniversity.in",
      availability: "Assigned",
      initials: "AK",
    },
    {
      id: 4,
      name: "Ananya Joseph",
      role: "Mentee",
      department: "Computer Applications",
      designation: "BCA",
      email: "ananya.joseph@christuniversity.in",
      availability: "Available",
      initials: "AJ",
    },
    {
      id: 5,
      name: "Dr. Sneha George",
      role: "Mentor",
      department: "Business Administration",
      designation: "Assistant Professor",
      email: "sneha.george@christuniversity.in",
      availability: "Available",
      initials: "SG",
    },
    {
      id: 6,
      name: "Rahul Sharma",
      role: "Mentee",
      department: "Data Science",
      designation: "MSc Data Science",
      email: "rahul.sharma@christuniversity.in",
      availability: "Available",
      initials: "RS",
    },
  ];

  const filteredPeople = people.filter((person) => {
    const matchesSearch =
      person.name.toLowerCase().includes(search.toLowerCase()) ||
      person.department.toLowerCase().includes(search.toLowerCase()) ||
      person.designation.toLowerCase().includes(search.toLowerCase());

    const matchesDepartment =
      department === "All" || person.department === department;

    return matchesSearch && matchesDepartment;
  });

  const mentorCount = people.filter(
    (person) => person.role === "Mentor"
  ).length;

  const menteeCount = people.filter(
    (person) => person.role === "Mentee"
  ).length;

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
          Search and connect with mentors and mentees across departments.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-3">
        <div className="rounded-2xl border border-[#27334A] bg-[#101624] p-5">
          <p className="text-sm text-slate-400">
            Total People
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            {people.length}
          </h2>

          <p className="mt-2 text-xs text-slate-500">
            Available in directory
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
            Faculty mentors
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
            Student mentees
          </p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="mb-6 flex flex-col gap-4 rounded-2xl border border-[#27334A] bg-[#101624] p-5 md:flex-row">
        <input
          type="text"
          placeholder="Search by name, department or designation..."
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
          <option value="Data Science">Data Science</option>
          <option value="Computer Science">Computer Science</option>
          <option value="Computer Applications">
            Computer Applications
          </option>
          <option value="Business Administration">
            Business Administration
          </option>
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

              <span
                className={`rounded-full px-3 py-1 text-xs font-medium ${
                  person.role === "Mentor"
                    ? "bg-blue-500/10 text-blue-400"
                    : "bg-emerald-500/10 text-emerald-400"
                }`}
              >
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

              <a
                href={`mailto:${person.email}`}
                className="flex-1 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 px-4 py-3 text-center text-sm font-semibold text-white transition hover:opacity-90"
              >
                Contact
              </a>
            </div>
          </div>
        ))}
      </div>

      {filteredPeople.length === 0 && (
        <div className="rounded-2xl border border-[#27334A] bg-[#101624] px-6 py-12 text-center text-sm text-slate-500">
          No people found.
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
                  Designation
                </p>

                <p className="mt-1 text-slate-200">
                  {selectedPerson.designation}
                </p>
              </div>

              <div>
                <p className="text-slate-500">
                  Department
                </p>

                <p className="mt-1 text-slate-200">
                  {selectedPerson.department}
                </p>
              </div>

              <div>
                <p className="text-slate-500">
                  Email
                </p>

                <p className="mt-1 break-all text-slate-200">
                  {selectedPerson.email}
                </p>
              </div>

              <div>
                <p className="text-slate-500">
                  Availability
                </p>

                <p className="mt-1 text-emerald-400">
                  {selectedPerson.availability}
                </p>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <a
                href={`mailto:${selectedPerson.email}`}
                className="flex-1 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 px-4 py-3 text-center text-sm font-semibold text-white"
              >
                Contact Person
              </a>

              <button
                onClick={() => setSelectedPerson(null)}
                className="rounded-xl border border-[#33415C] px-4 py-3 text-sm font-medium text-slate-300 hover:bg-slate-800"
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