import { useMemo, useState } from "react";
import {
  FiSearch,
  FiBookOpen,
  FiUser,
  FiCalendar,
  FiMessageSquare,
  FiChevronDown,
  FiChevronUp,
  FiFilter,
} from "react-icons/fi";

function Remarks() {
  const [search, setSearch] = useState("");
  const [mentorFilter, setMentorFilter] = useState("All");
  const [expandedId, setExpandedId] = useState(null);

  /* =====================================================
     REMARK / Q&A DATA
  ===================================================== */

  const remarks = [
    {
      id: 1,
      mentor: "Dr. Ramesh Kumar",
      initials: "RK",
      mentee: "Jasmine A",
      department: "Computer Science",
      className: "MSc Data Science - Sem 3",
      date: "23 July 2026",
      time: "10:30 AM",
      questions: [
        {
          question: "How is your research paper progressing?",
          answer:
            "I've finished the literature review and started on the methodology section.",
        },
        {
          question: "Any blockers I can help with?",
          answer:
            "Not yet, but I may need help finding a dataset for the experiments.",
        },
      ],
    },

    {
      id: 2,
      mentor: "Mr. Arun Joseph",
      initials: "AJ",
      mentee: "Akhil Thomas",
      department: "Computer Science",
      className: "B.Tech CSE - Sem 2",
      date: "21 July 2026",
      time: "02:00 PM",
      questions: [
        {
          question: "How are your classes going this semester?",
          answer:
            "Going well, though I'm finding the DBMS course a bit heavy.",
        },
        {
          question: "Are you facing any academic difficulties?",
          answer:
            "I need some additional practice with database queries and normalization.",
        },
      ],
    },

    {
      id: 3,
      mentor: "Dr. Meena S",
      initials: "MS",
      mentee: "Rahul Kumar",
      department: "Data Science",
      className: "MSc Data Science - Sem 1",
      date: "18 July 2026",
      time: "11:30 AM",
      questions: [
        {
          question: "How are you adjusting to the new semester?",
          answer:
            "The transition has been good. I am getting familiar with the new subjects.",
        },
        {
          question: "How is your attendance?",
          answer:
            "My attendance is regular and I have been attending all major classes.",
        },
      ],
    },

    {
      id: 4,
      mentor: "Dr. Anitha Joseph",
      initials: "AJ",
      mentee: "Ananya S",
      department: "Data Science",
      className: "MSc Data Science - Sem 3",
      date: "16 July 2026",
      time: "03:30 PM",
      questions: [
        {
          question: "How is your project work progressing?",
          answer:
            "The project topic has been finalized and I have started collecting the required data.",
        },
        {
          question: "Do you need any support from the department?",
          answer:
            "I may need guidance regarding the tools required for the project implementation.",
        },
      ],
    },

    {
      id: 5,
      mentor: "Dr. Arun Mathew",
      initials: "AM",
      mentee: "Arjun P",
      department: "Computer Science",
      className: "B.Tech CSE - Sem 2",
      date: "14 July 2026",
      time: "10:00 AM",
      questions: [
        {
          question: "How are your academic activities progressing?",
          answer:
            "Everything is progressing normally and I am keeping up with the coursework.",
        },
        {
          question: "Any personal or academic concerns?",
          answer:
            "No major concerns at the moment.",
        },
      ],
    },
  ];

  /* =====================================================
     MENTOR FILTER OPTIONS
  ===================================================== */

  const mentorOptions = [
    "All",
    ...new Set(remarks.map((item) => item.mentor)),
  ];

  /* =====================================================
     SEARCH + FILTER
  ===================================================== */

  const filteredRemarks = useMemo(() => {
    const query = search.toLowerCase().trim();

    return remarks.filter((item) => {
      const matchesSearch =
        item.mentor.toLowerCase().includes(query) ||
        item.mentee.toLowerCase().includes(query) ||
        item.department.toLowerCase().includes(query) ||
        item.className.toLowerCase().includes(query) ||
        item.questions.some(
          (qa) =>
            qa.question.toLowerCase().includes(query) ||
            qa.answer.toLowerCase().includes(query)
        );

      const matchesMentor =
        mentorFilter === "All" ||
        item.mentor === mentorFilter;

      return matchesSearch && matchesMentor;
    });
  }, [search, mentorFilter]);

  /* =====================================================
     TOGGLE
  ===================================================== */

  const toggleRemark = (id) => {
    setExpandedId((current) =>
      current === id ? null : id
    );
  };

  return (
    <div className="min-h-full bg-[#080C14] p-6">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <section className="mb-6">

        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

          <div>

            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span>Coordinator</span>

              <span>→</span>

              <span className="text-slate-300">
                Remarks
              </span>
            </div>

            <h1 className="mt-3 text-2xl font-bold tracking-tight text-white">
              Remarks
            </h1>

            <p className="mt-1 text-sm text-slate-400">
              Read-only view of mentor question-and-answer session logs.
            </p>

          </div>

        </div>

      </section>


      {/* =====================================================
          SUMMARY
      ===================================================== */}

      <section>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">

          <SummaryCard
            icon={<FiBookOpen />}
            title="Session Records"
            value={remarks.length}
            description="Recorded mentoring sessions"
            iconClass="bg-indigo-500/10 text-indigo-400"
          />

          <SummaryCard
            icon={<FiUser />}
            title="Mentors"
            value={mentorOptions.length - 1}
            description="Mentors with recorded remarks"
            iconClass="bg-purple-500/10 text-purple-400"
          />

          <SummaryCard
            icon={<FiMessageSquare />}
            title="Q&A Entries"
            value={remarks.reduce(
              (total, item) =>
                total + item.questions.length,
              0
            )}
            description="Questions and answers recorded"
            iconClass="bg-emerald-500/10 text-emerald-400"
          />

        </div>

      </section>


      {/* =====================================================
          SEARCH + FILTER
      ===================================================== */}

      <section className="mt-6 rounded-2xl border border-slate-800 bg-[#0D1422] p-5">

        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

          {/* Search */}
          <div className="relative w-full lg:max-w-xl">

            <FiSearch
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
            />

            <input
              type="text"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search mentor, mentee, class or remarks..."
              className="h-11 w-full rounded-xl border border-slate-800 bg-slate-900/60 pl-11 pr-4 text-sm text-slate-200 outline-none transition placeholder:text-slate-600 focus:border-indigo-500/50"
            />

          </div>


          {/* Mentor filter */}
          <div className="relative">

            <FiFilter
              size={15}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
            />

            <select
              value={mentorFilter}
              onChange={(e) =>
                setMentorFilter(e.target.value)
              }
              className="h-11 min-w-[220px] appearance-none rounded-xl border border-slate-800 bg-slate-900/60 pl-9 pr-9 text-sm text-slate-300 outline-none focus:border-indigo-500/50"
            >
              {mentorOptions.map((mentor) => (
                <option
                  key={mentor}
                  value={mentor}
                  className="bg-[#0D1422]"
                >
                  {mentor === "All"
                    ? "All Mentors"
                    : mentor}
                </option>
              ))}
            </select>

            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">
              ▼
            </span>

          </div>

        </div>

      </section>


      {/* =====================================================
          REMARK DIRECTORY
      ===================================================== */}

      <section className="mt-6 overflow-hidden rounded-2xl border border-slate-800 bg-[#0D1422]">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 p-5">

          <div>

            <h2 className="font-semibold text-white">
              Mentoring Remarks
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              {filteredRemarks.length} session record
              {filteredRemarks.length !== 1
                ? "s"
                : ""}{" "}
              found
            </p>

          </div>

          <FiBookOpen className="text-indigo-400" />

        </div>


        {/* Records */}
        {filteredRemarks.length > 0 ? (

          <div className="divide-y divide-slate-800">

            {filteredRemarks.map((remark) => {

              const expanded =
                expandedId === remark.id;

              return (
                <div
                  key={remark.id}
                  className="transition hover:bg-slate-900/40"
                >

                  {/* =================================================
                      RECORD HEADER
                  ================================================= */}

                  <button
                    onClick={() =>
                      toggleRemark(remark.id)
                    }
                    className="w-full p-5 text-left"
                  >

                    <div className="flex items-start gap-4">

                      {/* Avatar */}
                      <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-indigo-500/10 text-sm font-bold text-indigo-400">
                        {remark.initials}
                      </div>


                      {/* Main */}
                      <div className="min-w-0 flex-1">

                        <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">

                          <div>

                            <h3 className="text-sm font-semibold text-white">
                              {remark.mentor}
                            </h3>

                            <p className="mt-1 text-xs text-slate-500">
                              with{" "}
                              <span className="text-slate-300">
                                {remark.mentee}
                              </span>
                            </p>

                          </div>


                          <div className="flex items-center gap-2 text-xs text-slate-500">

                            <FiCalendar size={13} />

                            <span>
                              {remark.date}
                            </span>

                            <span>•</span>

                            <span>
                              {remark.time}
                            </span>

                          </div>

                        </div>


                        {/* Class */}
                        <div className="mt-3 flex flex-wrap items-center gap-2">

                          <span className="rounded-full bg-slate-800 px-2.5 py-1 text-[10px] font-medium text-slate-400">
                            {remark.department}
                          </span>

                          <span className="rounded-full bg-indigo-500/10 px-2.5 py-1 text-[10px] font-medium text-indigo-400">
                            {remark.className}
                          </span>

                          <span className="rounded-full bg-slate-800 px-2.5 py-1 text-[10px] font-medium text-slate-400">
                            {remark.questions.length} Q&A
                          </span>

                        </div>

                      </div>


                      {/* Expand */}
                      <div className="mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg text-slate-500 transition group-hover:text-white">

                        {expanded ? (
                          <FiChevronUp />
                        ) : (
                          <FiChevronDown />
                        )}

                      </div>

                    </div>

                  </button>


                  {/* =================================================
                      EXPANDED Q&A
                  ================================================= */}

                  {expanded && (

                    <div className="border-t border-slate-800 bg-slate-950/30 px-5 pb-5 pt-4">

                      <div className="ml-0 space-y-3 lg:ml-[60px]">

                        {remark.questions.map(
                          (qa, index) => (

                            <div
                              key={index}
                              className="overflow-hidden rounded-xl border border-slate-800"
                            >

                              {/* Question */}
                              <div className="flex gap-3 bg-indigo-500/[0.04] p-4">

                                <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-indigo-500/10 text-[10px] font-bold text-indigo-400">
                                  Q{index + 1}
                                </div>

                                <p className="text-sm leading-6 text-slate-300">
                                  {qa.question}
                                </p>

                              </div>


                              {/* Answer */}
                              <div className="flex gap-3 border-t border-slate-800 bg-slate-900/30 p-4">

                                <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-[10px] font-bold text-emerald-400">
                                  A{index + 1}
                                </div>

                                <p className="text-sm leading-6 text-slate-400">
                                  {qa.answer}
                                </p>

                              </div>

                            </div>

                          )
                        )}

                      </div>

                    </div>

                  )}

                </div>
              );
            })}

          </div>

        ) : (

          /* Empty state */
          <div className="px-6 py-16 text-center">

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-900 text-slate-600">
              <FiMessageSquare size={22} />
            </div>

            <h3 className="mt-4 text-sm font-semibold text-white">
              No remarks found
            </h3>

            <p className="mx-auto mt-1 max-w-sm text-xs leading-5 text-slate-500">
              Try changing your search or mentor filter.
            </p>

          </div>

        )}

      </section>


      {/* =====================================================
          INFORMATION NOTE
      ===================================================== */}

      <div className="mt-5 rounded-xl border border-indigo-500/20 bg-indigo-500/[0.04] p-4">

        <div className="flex items-start gap-3">

          <div className="mt-0.5 text-indigo-400">
            <FiBookOpen size={16} />
          </div>

          <div>

            <p className="text-xs font-semibold text-indigo-400">
              Coordinator View
            </p>

            <p className="mt-1 text-xs leading-5 text-slate-500">
              These records are displayed as a read-only reflection
              of mentor mentoring-session Q&A logs.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}


/* =========================================================
   SUMMARY CARD
========================================================= */

function SummaryCard({
  icon,
  title,
  value,
  description,
  iconClass,
}) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-[#0D1422] p-5">

      <div className="flex items-start justify-between">

        <div>

          <p className="text-xs text-slate-500">
            {title}
          </p>

          <p className="mt-2 text-2xl font-bold text-white">
            {value}
          </p>

          <p className="mt-1 text-[11px] text-slate-500">
            {description}
          </p>

        </div>

        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl ${iconClass}`}
        >
          {icon}
        </div>

      </div>

    </div>
  );
}

export default Remarks;