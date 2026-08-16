import { useMemo, useState } from "react";
import {
  FiUserPlus,
  FiUsers,
  FiCheckCircle,
  FiAlertCircle,
  FiSearch,
  FiLayers,
  FiX,
  FiMessageSquare,
} from "react-icons/fi";

const mentors = [
  {
    id: 1,
    name: "Dr. Rajesh R",
    department: "Computer Science",
    currentMentees: 5,
    capacity: 8,
  },
  {
    id: 2,
    name: "Dr. Anitha",
    department: "Data Science",
    currentMentees: 4,
    capacity: 8,
  },
  {
    id: 3,
    name: "Dr. Vivek",
    department: "Computer Science",
    currentMentees: 6,
    capacity: 8,
  },
  {
    id: 4,
    name: "Dr. Ramesh",
    department: "Information Technology",
    currentMentees: 5,
    capacity: 8,
  },
  {
    id: 5,
    name: "Dr. Sunita",
    department: "Data Science",
    currentMentees: 3,
    capacity: 8,
  },
];

const mentees = [
  {
    id: 1,
    name: "Jasmine A",
    department: "Computer Science",
    classYear: "MSc Computer Science - 2nd Year",
    assigned: true,
  },
  {
    id: 2,
    name: "Frinu P",
    department: "Data Science",
    classYear: "MSc Data Science - 2nd Year",
    assigned: true,
  },
  {
    id: 3,
    name: "Sanjay K",
    department: "Computer Science",
    classYear: "MSc Computer Science - 2nd Year",
    assigned: false,
  },
  {
    id: 4,
    name: "Akhil T",
    department: "Information Technology",
    classYear: "MSc Information Technology - 1st Year",
    assigned: false,
  },
  {
    id: 5,
    name: "Sandra Joseph",
    department: "Data Science",
    classYear: "MSc Data Science - 2nd Year",
    assigned: true,
  },
  {
    id: 6,
    name: "Alan Mathew",
    department: "Computer Science",
    classYear: "MSc Computer Science - 1st Year",
    assigned: true,
  },
  {
    id: 7,
    name: "Megha S",
    department: "Data Science",
    classYear: "MSc Data Science - 1st Year",
    assigned: false,
  },
  {
    id: 8,
    name: "Arjun P",
    department: "Computer Science",
    classYear: "MSc Computer Science - 1st Year",
    assigned: false,
  },
];

const initialRequests = [
  {
    id: 1,
    mentor: "Dr. Vivek",
    mentee: "Sanjay K",
    department: "Computer Science",
    date: "16 Aug 2026",
    message: "Interested in project and career guidance.",
  },
  {
    id: 2,
    mentor: "Dr. Anitha",
    mentee: "Megha S",
    department: "Data Science",
    date: "15 Aug 2026",
    message: "Looking for guidance in data analytics projects.",
  },
  {
    id: 3,
    mentor: "Dr. Ramesh",
    mentee: "Akhil T",
    department: "Information Technology",
    date: "14 Aug 2026",
    message: "Would like support with academic planning.",
  },
];

function AssignMentees() {
  const [assignmentMode, setAssignmentMode] = useState("manual");

  /* -------------------------------
     MANUAL ASSIGNMENT
  -------------------------------- */

  const [selectedMentor, setSelectedMentor] = useState("");
  const [selectedMentee, setSelectedMentee] = useState("");
  const [searchMentee, setSearchMentee] = useState("");

  /* -------------------------------
     DYNAMIC ASSIGNMENT
  -------------------------------- */

  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [dynamicMentor, setDynamicMentor] = useState("");
  const [selectedMentees, setSelectedMentees] = useState([]);

  /* -------------------------------
     CONNECT REQUESTS
  -------------------------------- */

  const [connectionRequests, setConnectionRequests] =
    useState(initialRequests);

  const [message, setMessage] = useState("");

  /* -------------------------------
     MANUAL DATA
  -------------------------------- */

  const selectedMentorData = mentors.find(
    (mentor) => mentor.id === Number(selectedMentor)
  );

  const availableMentees = useMemo(() => {
    return mentees.filter((mentee) => {
      const matchesSearch =
        mentee.name
          .toLowerCase()
          .includes(searchMentee.toLowerCase()) ||
        mentee.department
          .toLowerCase()
          .includes(searchMentee.toLowerCase());

      return !mentee.assigned && matchesSearch;
    });
  }, [searchMentee]);

  /* -------------------------------
     MANUAL ASSIGNMENT FUNCTION
  -------------------------------- */

  const handleManualAssignment = () => {
    setMessage("");

    if (!selectedMentor) {
      setMessage("Please select a mentor.");
      return;
    }

    if (!selectedMentee) {
      setMessage("Please select a mentee.");
      return;
    }

    if (
      selectedMentorData &&
      selectedMentorData.currentMentees >=
        selectedMentorData.capacity
    ) {
      setMessage(
        `${selectedMentorData.name} has reached the maximum mentee capacity.`
      );
      return;
    }

    setMessage(
      "Mentee assignment created successfully."
    );

    setSelectedMentor("");
    setSelectedMentee("");
  };

  /* -------------------------------
     DYNAMIC DATA
  -------------------------------- */

  const departments = [
    "Computer Science",
    "Data Science",
    "Information Technology",
  ];

  const classOptions = [
    "MSc Computer Science - 1st Year",
    "MSc Computer Science - 2nd Year",
    "MSc Data Science - 1st Year",
    "MSc Data Science - 2nd Year",
    "MSc Information Technology - 1st Year",
  ];

  const filteredDynamicMentees = useMemo(() => {
    return mentees.filter((mentee) => {
      const departmentMatch =
        !selectedDepartment ||
        mentee.department === selectedDepartment;

      const classMatch =
        !selectedClass ||
        mentee.classYear === selectedClass;

      return (
        !mentee.assigned &&
        departmentMatch &&
        classMatch
      );
    });
  }, [selectedDepartment, selectedClass]);

  const dynamicMentors = useMemo(() => {
    if (!selectedDepartment) {
      return mentors;
    }

    return mentors.filter(
      (mentor) =>
        mentor.department === selectedDepartment
    );
  }, [selectedDepartment]);

  /* -------------------------------
     SELECT DYNAMIC MENTEE
  -------------------------------- */

  const toggleMenteeSelection = (menteeId) => {
    setSelectedMentees((current) => {
      if (current.includes(menteeId)) {
        return current.filter(
          (id) => id !== menteeId
        );
      }

      return [...current, menteeId];
    });

    setMessage("");
  };

  /* -------------------------------
     DYNAMIC ASSIGNMENT FUNCTION
  -------------------------------- */

  const handleDynamicAssignment = () => {
    setMessage("");

    if (!selectedDepartment) {
      setMessage("Please select a department.");
      return;
    }

    if (!selectedClass) {
      setMessage("Please select a class or year.");
      return;
    }

    if (!dynamicMentor) {
      setMessage("Please select a mentor.");
      return;
    }

    if (selectedMentees.length === 0) {
      setMessage(
        "Please select at least one mentee."
      );
      return;
    }

    const mentor = mentors.find(
      (item) => item.id === Number(dynamicMentor)
    );

    if (!mentor) {
      setMessage(
        "Selected mentor could not be found."
      );
      return;
    }

    const remainingCapacity =
      mentor.capacity - mentor.currentMentees;

    if (
      selectedMentees.length >
      remainingCapacity
    ) {
      setMessage(
        `${mentor.name} has only ${remainingCapacity} available mentee slot(s).`
      );
      return;
    }

    setMessage(
      `${selectedMentees.length} mentee(s) assigned successfully.`
    );

    setSelectedMentees([]);
    setDynamicMentor("");
  };

  /* -------------------------------
     ACCEPT / REJECT REQUEST
  -------------------------------- */

  const handleRequest = (
    requestId,
    action
  ) => {
    setConnectionRequests((current) =>
      current.map((request) =>
        request.id === requestId
          ? {
              ...request,
              status:
                action === "accept"
                  ? "Accepted"
                  : "Rejected",
            }
          : request
      )
    );
  };

  const pendingRequests =
    connectionRequests.filter(
      (request) => !request.status
    ).length;

  return (
    <div className="p-5 sm:p-6 lg:p-7">

      {/* =================================
          PAGE HEADER
      ================================= */}

      <div className="mb-6">

        <h1 className="text-2xl font-semibold text-white">
          Assign Mentees
        </h1>

        <p className="mt-1 text-sm text-slate-400">
          Assign mentees to mentors under your coordination
        </p>

      </div>

      {/* =================================
          ASSIGNMENT METHOD CARDS
      ================================= */}

      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">

        {/* MANUAL */}

        <button
          type="button"
          onClick={() => {
            setAssignmentMode("manual");
            setMessage("");
          }}
          className={`rounded-2xl border p-5 text-left transition ${
            assignmentMode === "manual"
              ? "border-indigo-500/30 bg-indigo-500/10"
              : "border-slate-800 bg-slate-900/70 hover:border-slate-700"
          }`}
        >

          <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/15 text-indigo-400">

            <FiUserPlus className="text-lg" />

          </div>

          <h2 className="text-sm font-semibold text-white">
            Manual Assignment
          </h2>

          <p className="mt-1 text-xs leading-5 text-slate-400">
            Select a mentor and mentee and create an individual assignment.
          </p>

          {assignmentMode === "manual" && (
            <span className="mt-4 inline-block rounded-full border border-indigo-500/20 bg-indigo-500/10 px-2.5 py-1 text-[10px] font-medium text-indigo-400">
              Selected
            </span>
          )}

        </button>

        {/* DYNAMIC */}

        <button
          type="button"
          onClick={() => {
            setAssignmentMode("dynamic");
            setMessage("");
          }}
          className={`rounded-2xl border p-5 text-left transition ${
            assignmentMode === "dynamic"
              ? "border-purple-500/30 bg-purple-500/10"
              : "border-slate-800 bg-slate-900/70 hover:border-slate-700"
          }`}
        >

          <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/15 text-purple-400">

            <FiLayers className="text-lg" />

          </div>

          <h2 className="text-sm font-semibold text-white">
            Dynamic Assignment
          </h2>

          <p className="mt-1 text-xs leading-5 text-slate-400">
            Assign multiple mentees using department and class-based allocation.
          </p>

          {assignmentMode === "dynamic" && (
            <span className="mt-4 inline-block rounded-full border border-purple-500/20 bg-purple-500/10 px-2.5 py-1 text-[10px] font-medium text-purple-400">
              Selected
            </span>
          )}

        </button>

        {/* CONNECT */}

        <button
          type="button"
          onClick={() => {
            setAssignmentMode("connect");
            setMessage("");
          }}
          className={`rounded-2xl border p-5 text-left transition ${
            assignmentMode === "connect"
              ? "border-emerald-500/30 bg-emerald-500/10"
              : "border-slate-800 bg-slate-900/70 hover:border-slate-700"
          }`}
        >

          <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-400">

            <FiCheckCircle className="text-lg" />

          </div>

          <h2 className="text-sm font-semibold text-white">
            Mentor–Mentee Connect
          </h2>

          <p className="mt-1 text-xs leading-5 text-slate-400">
            Review open mentor–mentee connection requests.
          </p>

          {assignmentMode === "connect" ? (
            <span className="mt-4 inline-block rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-[10px] font-medium text-emerald-400">
              Selected
            </span>
          ) : (
            <span className="mt-4 inline-block rounded-full border border-slate-700 px-2.5 py-1 text-[10px] font-medium text-slate-500">
              {pendingRequests} Pending
            </span>
          )}

        </button>

      </div>

      {/* =================================
          MANUAL ASSIGNMENT
      ================================= */}

      {assignmentMode === "manual" && (

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

          {/* FORM */}

          <div className="lg:col-span-2 rounded-2xl border border-slate-800 bg-slate-900/70">

            <div className="border-b border-slate-800 px-5 py-4">

              <h2 className="text-base font-semibold text-white">
                Create Manual Assignment
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Select one mentor and one unassigned mentee.
              </p>

            </div>

            <div className="space-y-6 p-5">

              {/* MENTOR */}

              <div>

                <label className="mb-2 block text-xs font-medium text-slate-400">
                  Select Mentor
                </label>

                <select
                  value={selectedMentor}
                  onChange={(e) => {
                    setSelectedMentor(
                      e.target.value
                    );
                    setMessage("");
                  }}
                  className="w-full rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-3 text-sm text-white outline-none transition focus:border-indigo-500"
                >

                  <option value="">
                    Choose a mentor
                  </option>

                  {mentors.map((mentor) => (
                    <option
                      key={mentor.id}
                      value={mentor.id}
                    >
                      {mentor.name} —{" "}
                      {mentor.department}
                    </option>
                  ))}

                </select>

                {selectedMentorData && (

                  <div className="mt-3 flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/40 px-4 py-3">

                    <div className="flex items-center gap-2">

                      <FiUsers className="text-indigo-400" />

                      <span className="text-xs text-slate-400">
                        Current mentees
                      </span>

                    </div>

                    <span className="text-sm font-semibold text-white">

                      {selectedMentorData.currentMentees}

                      <span className="text-slate-500">
                        {" "}
                        /{" "}
                        {selectedMentorData.capacity}
                      </span>

                    </span>

                  </div>

                )}

              </div>

              {/* MENTEE */}

              <div>

                <label className="mb-2 block text-xs font-medium text-slate-400">
                  Select Mentee
                </label>

                <div className="relative mb-3">

                  <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />

                  <input
                    type="text"
                    value={searchMentee}
                    onChange={(e) =>
                      setSearchMentee(
                        e.target.value
                      )
                    }
                    placeholder="Search unassigned mentees..."
                    className="w-full rounded-xl border border-slate-800 bg-slate-950/60 py-3 pl-10 pr-4 text-sm text-white outline-none placeholder:text-slate-500 transition focus:border-indigo-500"
                  />

                </div>

                <div className="max-h-64 space-y-2 overflow-y-auto">

                  {availableMentees.length > 0 ? (

                    availableMentees.map(
                      (mentee) => (

                        <button
                          key={mentee.id}
                          type="button"
                          onClick={() => {
                            setSelectedMentee(
                              String(
                                mentee.id
                              )
                            );
                            setMessage("");
                          }}
                          className={`flex w-full items-center justify-between rounded-xl border p-3 text-left transition ${
                            selectedMentee ===
                            String(
                              mentee.id
                            )
                              ? "border-indigo-500/40 bg-indigo-500/10"
                              : "border-slate-800 bg-slate-950/30 hover:border-slate-700 hover:bg-slate-800/40"
                          }`}
                        >

                          <div className="flex items-center gap-3">

                            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-teal-400 to-emerald-500 text-xs font-semibold text-white">

                              {mentee.name
                                .split(" ")
                                .map(
                                  (word) =>
                                    word[0]
                                )
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

                          {selectedMentee ===
                            String(
                              mentee.id
                            ) && (

                            <FiCheckCircle className="text-indigo-400" />

                          )}

                        </button>

                      )
                    )

                  ) : (

                    <div className="rounded-xl border border-slate-800 bg-slate-950/30 p-6 text-center">

                      <FiUsers className="mx-auto text-2xl text-slate-700" />

                      <p className="mt-2 text-sm text-slate-400">
                        No unassigned mentees found
                      </p>

                    </div>

                  )}

                </div>

              </div>

              {/* MESSAGE */}

              {message && (

                <MessageBox
                  message={message}
                />

              )}

              {/* BUTTON */}

              <div className="flex justify-end border-t border-slate-800 pt-5">

                <button
                  type="button"
                  onClick={
                    handleManualAssignment
                  }
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 px-5 py-3 text-sm font-medium text-white shadow-lg shadow-indigo-500/20 transition hover:from-indigo-400 hover:to-purple-500"
                >

                  <FiUserPlus />

                  Assign Mentee

                </button>

              </div>

            </div>

          </div>

          <AssignmentGuidelines />

        </div>

      )}

      {/* =================================
          DYNAMIC ASSIGNMENT
      ================================= */}

      {assignmentMode === "dynamic" && (

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

          {/* FORM */}

          <div className="lg:col-span-2 rounded-2xl border border-slate-800 bg-slate-900/70">

            <div className="border-b border-slate-800 px-5 py-4">

              <h2 className="text-base font-semibold text-white">
                Dynamic / Class-wise Assignment
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Filter eligible mentees and assign multiple students to a mentor.
              </p>

            </div>

            <div className="space-y-6 p-5">

              {/* DEPARTMENT + CLASS */}

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

                <div>

                  <label className="mb-2 block text-xs font-medium text-slate-400">
                    Department
                  </label>

                  <select
                    value={
                      selectedDepartment
                    }
                    onChange={(e) => {

                      setSelectedDepartment(
                        e.target.value
                      );

                      setSelectedClass("");

                      setDynamicMentor("");

                      setSelectedMentees([]);

                      setMessage("");

                    }}
                    className="w-full rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-3 text-sm text-white outline-none transition focus:border-purple-500"
                  >

                    <option value="">
                      Select department
                    </option>

                    {departments.map(
                      (department) => (

                        <option
                          key={department}
                          value={department}
                        >
                          {department}
                        </option>

                      )
                    )}

                  </select>

                </div>

                <div>

                  <label className="mb-2 block text-xs font-medium text-slate-400">
                    Class / Year
                  </label>

                  <select
                    value={selectedClass}
                    onChange={(e) => {

                      setSelectedClass(
                        e.target.value
                      );

                      setSelectedMentees([]);

                      setMessage("");

                    }}
                    disabled={
                      !selectedDepartment
                    }
                    className="w-full rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-3 text-sm text-white outline-none transition focus:border-purple-500 disabled:cursor-not-allowed disabled:opacity-50"
                  >

                    <option value="">
                      {selectedDepartment
                        ? "Select class / year"
                        : "Select department first"}
                    </option>

                    {classOptions
                      .filter((className) =>
                        className.startsWith(
                          `MSc ${selectedDepartment}`
                        )
                      )
                      .map(
                        (className) => (

                          <option
                            key={className}
                            value={className}
                          >
                            {className}
                          </option>

                        )
                      )}

                  </select>

                </div>

              </div>

              {/* MENTOR */}

              <div>

                <label className="mb-2 block text-xs font-medium text-slate-400">
                  Assign To Mentor
                </label>

                <select
                  value={dynamicMentor}
                  onChange={(e) => {

                    setDynamicMentor(
                      e.target.value
                    );

                    setMessage("");

                  }}
                  disabled={
                    !selectedDepartment
                  }
                  className="w-full rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-3 text-sm text-white outline-none transition focus:border-purple-500 disabled:cursor-not-allowed disabled:opacity-50"
                >

                  <option value="">
                    {selectedDepartment
                      ? "Select mentor"
                      : "Select department first"}
                  </option>

                  {dynamicMentors.map(
                    (mentor) => (

                      <option
                        key={mentor.id}
                        value={mentor.id}
                      >
                        {mentor.name} —{" "}
                        {
                          mentor.currentMentees
                        }
                        /
                        {mentor.capacity} mentees
                      </option>

                    )
                  )}

                </select>

              </div>

              {/* ELIGIBLE MENTEES */}

              <div>

                <div className="mb-3 flex items-center justify-between">

                  <div>

                    <label className="block text-xs font-medium text-slate-400">
                      Eligible Mentees
                    </label>

                    <p className="mt-1 text-[11px] text-slate-600">
                      Select the students you want to assign.
                    </p>

                  </div>

                  <span className="rounded-full border border-purple-500/20 bg-purple-500/10 px-2.5 py-1 text-[10px] font-medium text-purple-400">
                    {selectedMentees.length}{" "}
                    selected
                  </span>

                </div>

                {!selectedDepartment ||
                !selectedClass ? (

                  <div className="rounded-xl border border-dashed border-slate-800 bg-slate-950/30 p-8 text-center">

                    <FiLayers className="mx-auto text-3xl text-slate-700" />

                    <p className="mt-3 text-sm text-slate-400">
                      Select a department and class
                    </p>

                    <p className="mt-1 text-xs text-slate-600">
                      Eligible mentees will appear here.
                    </p>

                  </div>

                ) : filteredDynamicMentees.length >
                  0 ? (

                  <div className="max-h-72 space-y-2 overflow-y-auto">

                    {filteredDynamicMentees.map(
                      (mentee) => {

                        const isSelected =
                          selectedMentees.includes(
                            mentee.id
                          );

                        return (

                          <button
                            key={mentee.id}
                            type="button"
                            onClick={() =>
                              toggleMenteeSelection(
                                mentee.id
                              )
                            }
                            className={`flex w-full items-center justify-between rounded-xl border p-3 text-left transition ${
                              isSelected
                                ? "border-purple-500/40 bg-purple-500/10"
                                : "border-slate-800 bg-slate-950/30 hover:border-slate-700 hover:bg-slate-800/40"
                            }`}
                          >

                            <div className="flex items-center gap-3">

                              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-teal-400 to-emerald-500 text-xs font-semibold text-white">

                                {mentee.name
                                  .split(" ")
                                  .map(
                                    (word) =>
                                      word[0]
                                  )
                                  .join("")
                                  .slice(
                                    0,
                                    2
                                  )}

                              </div>

                              <div>

                                <p className="text-sm font-medium text-white">
                                  {mentee.name}
                                </p>

                                <p className="mt-0.5 text-xs text-slate-500">
                                  {
                                    mentee.classYear
                                  }
                                </p>

                              </div>

                            </div>

                            <div
                              className={`flex h-5 w-5 items-center justify-center rounded-md border ${
                                isSelected
                                  ? "border-purple-500 bg-purple-500 text-white"
                                  : "border-slate-700"
                              }`}
                            >

                              {isSelected && (
                                <FiCheckCircle className="text-xs" />
                              )}

                            </div>

                          </button>

                        );
                      }
                    )}

                  </div>

                ) : (

                  <div className="rounded-xl border border-slate-800 bg-slate-950/30 p-8 text-center">

                    <FiUsers className="mx-auto text-3xl text-slate-700" />

                    <p className="mt-3 text-sm text-slate-400">
                      No unassigned mentees found
                    </p>

                    <p className="mt-1 text-xs text-slate-600">
                      Try another department or class.
                    </p>

                  </div>

                )}

              </div>

              {/* MESSAGE */}

              {message && (
                <MessageBox
                  message={message}
                />
              )}

              {/* BUTTON */}

              <div className="flex flex-col gap-3 border-t border-slate-800 pt-5 sm:flex-row sm:items-center sm:justify-between">

                <p className="text-xs text-slate-500">

                  {selectedMentees.length >
                  0
                    ? `${selectedMentees.length} mentee(s) ready for assignment`
                    : "Select mentees to continue"}

                </p>

                <button
                  type="button"
                  onClick={
                    handleDynamicAssignment
                  }
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 px-5 py-3 text-sm font-medium text-white shadow-lg shadow-purple-500/20 transition hover:from-purple-400 hover:to-indigo-500"
                >

                  <FiUserPlus />

                  Assign Selected Mentees

                </button>

              </div>

            </div>

          </div>

          <DynamicGuidelines />

        </div>

      )}

      {/* =================================
          MENTOR–MENTEE CONNECT
      ================================= */}

      {assignmentMode === "connect" && (

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

          {/* REQUESTS */}

          <div className="lg:col-span-2 rounded-2xl border border-slate-800 bg-slate-900/70">

            <div className="flex items-center justify-between border-b border-slate-800 px-5 py-4">

              <div>

                <h2 className="text-base font-semibold text-white">
                  Connection Requests
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  Review mentor–mentee connection requests.
                </p>

              </div>

              <span className="rounded-full border border-amber-500/20 bg-amber-500/10 px-2.5 py-1 text-[10px] font-medium text-amber-400">

                {pendingRequests}{" "}
                Pending

              </span>

            </div>

            <div className="divide-y divide-slate-800">

              {connectionRequests.length >
              0 ? (

                connectionRequests.map(
                  (request) => (

                    <div
                      key={request.id}
                      className="p-5 transition hover:bg-slate-800/30"
                    >

                      <div className="flex flex-col gap-4">

                        {/* PEOPLE */}

                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                          <div className="flex items-center gap-3">

                            {/* MENTOR */}

                            <div className="flex items-center gap-2">

                              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-[10px] font-semibold text-white">

                                {request.mentor
                                  .replace(
                                    "Dr. ",
                                    ""
                                  )
                                  .split(" ")
                                  .map(
                                    (word) =>
                                      word[0]
                                  )
                                  .join("")
                                  .slice(
                                    0,
                                    2
                                  )}

                              </div>

                              <div>

                                <p className="text-sm font-medium text-white">
                                  {
                                    request.mentor
                                  }
                                </p>

                                <p className="text-[11px] text-slate-500">
                                  Mentor
                                </p>

                              </div>

                            </div>

                            <span className="text-slate-600">
                              →
                            </span>

                            {/* MENTEE */}

                            <div className="flex items-center gap-2">

                              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-teal-400 to-emerald-500 text-[10px] font-semibold text-white">

                                {request.mentee
                                  .split(" ")
                                  .map(
                                    (word) =>
                                      word[0]
                                  )
                                  .join("")
                                  .slice(
                                    0,
                                    2
                                  )}

                              </div>

                              <div>

                                <p className="text-sm font-medium text-white">
                                  {
                                    request.mentee
                                  }
                                </p>

                                <p className="text-[11px] text-slate-500">
                                  Mentee
                                </p>

                              </div>

                            </div>

                          </div>

                          {/* STATUS */}

                          {request.status && (

                            <span
                              className={`w-fit rounded-full border px-2.5 py-1 text-[10px] font-medium ${
                                request.status ===
                                "Accepted"
                                  ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-400"
                                  : "border-red-500/20 bg-red-500/10 text-red-400"
                              }`}
                            >
                              {
                                request.status
                              }
                            </span>

                          )}

                        </div>

                        {/* REQUEST MESSAGE */}

                        <div className="rounded-xl border border-slate-800 bg-slate-950/30 p-4">

                          <div className="flex items-start gap-3">

                            <FiMessageSquare className="mt-0.5 shrink-0 text-slate-500" />

                            <div>

                              <p className="text-xs text-slate-400">
                                Request Message
                              </p>

                              <p className="mt-1 text-sm leading-6 text-slate-300">
                                {
                                  request.message
                                }
                              </p>

                            </div>

                          </div>

                          <div className="mt-3 flex flex-wrap gap-4 text-[11px] text-slate-500">

                            <span>

                              Department:{" "}

                              <span className="text-slate-400">
                                {
                                  request.department
                                }
                              </span>

                            </span>

                            <span>

                              Requested:{" "}

                              <span className="text-slate-400">
                                {
                                  request.date
                                }
                              </span>

                            </span>

                          </div>

                        </div>

                        {/* ACTIONS */}

                        {!request.status && (

                          <div className="flex justify-end gap-2">

                            <button
                              type="button"
                              onClick={() =>
                                handleRequest(
                                  request.id,
                                  "reject"
                                )
                              }
                              className="inline-flex items-center gap-2 rounded-lg border border-slate-700 px-3 py-2 text-xs font-medium text-slate-400 transition hover:border-red-500/30 hover:bg-red-500/10 hover:text-red-400"
                            >

                              <FiX />

                              Reject

                            </button>

                            <button
                              type="button"
                              onClick={() =>
                                handleRequest(
                                  request.id,
                                  "accept"
                                )
                              }
                              className="inline-flex items-center gap-2 rounded-lg bg-emerald-500/10 px-3 py-2 text-xs font-medium text-emerald-400 transition hover:bg-emerald-500/20"
                            >

                              <FiCheckCircle />

                              Accept

                            </button>

                          </div>

                        )}

                      </div>

                    </div>

                  )
                )

              ) : (

                <div className="px-5 py-12 text-center">

                  <FiCheckCircle className="mx-auto text-3xl text-emerald-500/50" />

                  <p className="mt-3 text-sm font-medium text-slate-300">
                    No connection requests
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    There are currently no pending mentor–mentee requests.
                  </p>

                </div>

              )}

            </div>

          </div>

          {/* REVIEW GUIDELINES */}

          <div className="rounded-2xl border border-slate-800 bg-slate-900/70">

            <div className="border-b border-slate-800 px-5 py-4">

              <h2 className="text-base font-semibold text-white">
                Review Requests
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Coordinator approval workflow
              </p>

            </div>

            <div className="space-y-5 p-5">

              <Guideline
                number="1"
                title="Review the request"
                description="Check the mentor, mentee, department and request message."
                color="blue"
              />

              <Guideline
                number="2"
                title="Accept or reject"
                description="Approve suitable requests or reject requests that need changes."
                color="emerald"
              />

              <Guideline
                number="3"
                title="Monitor the pairing"
                description="Accepted requests can later be tracked through the mentor–mentee relationship."
                color="purple"
              />

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

/* =================================
   MESSAGE BOX
================================= */

function MessageBox({ message }) {
  const success =
    message.includes("successfully");

  return (
    <div
      className={`flex items-start gap-3 rounded-xl border p-4 ${
        success
          ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-400"
          : "border-red-500/20 bg-red-500/10 text-red-400"
      }`}
    >

      {success ? (
        <FiCheckCircle className="mt-0.5 shrink-0" />
      ) : (
        <FiAlertCircle className="mt-0.5 shrink-0" />
      )}

      <p className="text-xs">
        {message}
      </p>

    </div>
  );
}

/* =================================
   GUIDELINE
================================= */

function Guideline({
  number,
  title,
  description,
  color,
}) {
  const colorClasses = {
    blue: "bg-blue-500/10 text-blue-400",
    purple: "bg-purple-500/10 text-purple-400",
    indigo: "bg-indigo-500/10 text-indigo-400",
    emerald:
      "bg-emerald-500/10 text-emerald-400",
  };

  return (
    <div className="flex gap-3">

      <div
        className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs font-medium ${colorClasses[color]}`}
      >
        {number}
      </div>

      <div>

        <p className="text-sm font-medium text-white">
          {title}
        </p>

        <p className="mt-1 text-xs leading-5 text-slate-500">
          {description}
        </p>

      </div>

    </div>
  );
}

/* =================================
   MANUAL GUIDELINES
================================= */

function AssignmentGuidelines() {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/70">

      <div className="border-b border-slate-800 px-5 py-4">

        <h2 className="text-base font-semibold text-white">
          Assignment Guidelines
        </h2>

        <p className="mt-1 text-xs text-slate-500">
          Before creating an assignment
        </p>

      </div>

      <div className="space-y-4 p-5">

        <Guideline
          number="1"
          title="Select a mentor"
          description="Check the mentor's current workload before assigning a mentee."
          color="blue"
        />

        <Guideline
          number="2"
          title="Choose an unassigned mentee"
          description="Only mentees who are currently unassigned are shown."
          color="purple"
        />

        <Guideline
          number="3"
          title="Confirm assignment"
          description="Review the selected mentor and mentee before submitting."
          color="emerald"
        />

      </div>

    </div>
  );
}

/* =================================
   DYNAMIC GUIDELINES
================================= */

function DynamicGuidelines() {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/70">

      <div className="border-b border-slate-800 px-5 py-4">

        <h2 className="text-base font-semibold text-white">
          Dynamic Assignment
        </h2>

        <p className="mt-1 text-xs text-slate-500">
          How class-wise assignment works
        </p>

      </div>

      <div className="space-y-5 p-5">

        <Guideline
          number="1"
          title="Choose department"
          description="Select the academic department whose mentees need assignment."
          color="blue"
        />

        <Guideline
          number="2"
          title="Choose class / year"
          description="Narrow the list to a specific programme and academic year."
          color="purple"
        />

        <Guideline
          number="3"
          title="Select mentor"
          description="Choose an appropriate mentor from the selected department."
          color="indigo"
        />

        <Guideline
          number="4"
          title="Select mentees"
          description="Select one or multiple unassigned students from the filtered list."
          color="emerald"
        />

      </div>

    </div>
  );
}

export default AssignMentees;