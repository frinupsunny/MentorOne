import {
  FiMessageSquare,
  FiStar,
  FiUsers,
  FiTrendingUp,
  FiPlus,
} from "react-icons/fi";

function MentorFeedback() {
  const feedbacks = [
    {
      id: 1,
      name: "Rahul Kumar",
      department: "Computer Science",
      rating: 5,
      feedback:
        "The mentoring sessions are helpful and easy to understand.",
      date: "12 Sep 2026",
    },
    {
      id: 2,
      name: "Sneha Thomas",
      department: "Data Science",
      rating: 4,
      feedback:
        "The mentor provides useful guidance for academic projects.",
      date: "10 Sep 2026",
    },
    {
      id: 3,
      name: "Arjun Nair",
      department: "Computer Applications",
      rating: 5,
      feedback:
        "The sessions helped me improve my confidence and skills.",
      date: "08 Sep 2026",
    },
  ];

  return (
    <div className="min-h-full bg-[#080C14] px-6 py-8 text-white lg:px-10">
      {/* HEADER */}
      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="mb-2 text-sm text-blue-400">
            MentorOne / Communication
          </p>

          <h1 className="text-3xl font-bold tracking-tight">
            Feedback
          </h1>

          <p className="mt-2 text-sm text-slate-400">
            Review feedback received from your mentees.
          </p>
        </div>

        <button
          type="button"
          className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:from-blue-600 hover:to-indigo-700"
        >
          <FiPlus />
          Request Feedback
        </button>
      </div>

      {/* SUMMARY CARDS */}
      <div className="mb-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border border-[#27334A] bg-[#101624] p-5">
          <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10">
            <FiMessageSquare className="text-xl text-blue-400" />
          </div>

          <p className="text-3xl font-bold">36</p>
          <p className="mt-1 text-sm text-slate-400">
            Total Feedback
          </p>
        </div>

        <div className="rounded-2xl border border-[#27334A] bg-[#101624] p-5">
          <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500/10">
            <FiStar className="text-xl text-amber-400" />
          </div>

          <p className="text-3xl font-bold">4.8</p>
          <p className="mt-1 text-sm text-slate-400">
            Average Rating
          </p>
        </div>

        <div className="rounded-2xl border border-[#27334A] bg-[#101624] p-5">
          <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-purple-500/10">
            <FiUsers className="text-xl text-purple-400" />
          </div>

          <p className="text-3xl font-bold">24</p>
          <p className="mt-1 text-sm text-slate-400">
            Mentees Responded
          </p>
        </div>

        <div className="rounded-2xl border border-[#27334A] bg-[#101624] p-5">
          <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10">
            <FiTrendingUp className="text-xl text-emerald-400" />
          </div>

          <p className="text-3xl font-bold">92%</p>
          <p className="mt-1 text-sm text-slate-400">
            Positive Feedback
          </p>
        </div>
      </div>

      {/* RATING OVERVIEW */}
      <div className="mb-8 rounded-2xl border border-[#27334A] bg-[#101624] p-6">
        <h2 className="text-lg font-semibold">
          Feedback Overview
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Overall rating based on mentee responses.
        </p>

        <div className="mt-6 flex flex-col gap-6 md:flex-row md:items-center">
          <div className="text-center md:w-40">
            <p className="text-5xl font-bold text-white">
              4.8
            </p>

            <div className="mt-2 flex justify-center gap-1 text-amber-400">
              {[1, 2, 3, 4, 5].map((star) => (
                <FiStar key={star} className="fill-current" />
              ))}
            </div>

            <p className="mt-2 text-xs text-slate-500">
              Based on 36 responses
            </p>
          </div>

          <div className="flex-1 space-y-4">
            {[
              { label: "5 Stars", value: "90%", width: "w-[90%]" },
              { label: "4 Stars", value: "75%", width: "w-[75%]" },
              { label: "3 Stars", value: "35%", width: "w-[35%]" },
              { label: "2 Stars", value: "15%", width: "w-[15%]" },
              { label: "1 Star", value: "5%", width: "w-[5%]" },
            ].map((rating) => (
              <div
                key={rating.label}
                className="flex items-center gap-3"
              >
                <span className="w-14 text-xs text-slate-500">
                  {rating.label}
                </span>

                <div className="h-2 flex-1 rounded-full bg-slate-800">
                  <div
                    className={`h-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 ${rating.width}`}
                  />
                </div>

                <span className="w-10 text-right text-xs text-slate-500">
                  {rating.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FEEDBACK LIST */}
      <div>
        <div className="mb-4">
          <h2 className="text-xl font-semibold">
            Recent Feedback
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Feedback shared by your mentees.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          {feedbacks.map((feedback) => (
            <div
              key={feedback.id}
              className="rounded-2xl border border-[#27334A] bg-[#101624] p-5 transition hover:border-blue-500/40"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-blue-600 text-sm font-bold">
                    {feedback.name
                      .split(" ")
                      .map((name) => name[0])
                      .join("")
                      .slice(0, 2)}
                  </div>

                  <div>
                    <h3 className="font-semibold text-white">
                      {feedback.name}
                    </h3>

                    <p className="text-xs text-slate-500">
                      {feedback.department}
                    </p>
                  </div>
                </div>

                <span className="text-xs text-slate-500">
                  {feedback.date}
                </span>
              </div>

              <div className="mt-5 flex gap-1 text-amber-400">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FiStar
                    key={star}
                    className={
                      star <= feedback.rating
                        ? "fill-current"
                        : "text-slate-700"
                    }
                  />
                ))}
              </div>

              <p className="mt-4 text-sm leading-6 text-slate-400">
                “{feedback.feedback}”
              </p>

              <div className="mt-5 border-t border-[#27334A] pt-4">
                <span className="text-xs text-emerald-400">
                  Feedback received
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MentorFeedback;