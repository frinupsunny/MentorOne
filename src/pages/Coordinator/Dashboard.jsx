import StatCard from "../../components/cards/StatCard";
import SessionOverview from "../../components/dashboard/SessionOverview";
import TodaysSessions from "../../components/dashboard/TodaysSessions";
import ComplianceMatrix from "../../components/dashboard/ComplianceMatrix";
import AttentionRequired from "../../components/dashboard/AttentionRequired";
import QuickActions from "../../components/dashboard/QuickActions";

function Dashboard() {
  return (
    <div className="min-h-full bg-[#080C14] p-6">

      {/* Welcome Section */}
      <section className="rounded-2xl border border-slate-800 bg-[#0D1422] p-6">

        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

          <div>
            <p className="text-sm font-medium text-indigo-400">
              Friday, 14 August 2026
            </p>

            <h1 className="mt-2 text-3xl font-bold tracking-tight text-white">
              Hello, Dr. Meena S 👋
            </h1>

            <p className="mt-2 text-sm text-slate-400">
              Welcome back to MentorOne. Here's what's happening today.
            </p>
          </div>

          <div className="rounded-xl border border-indigo-500/20 bg-indigo-500/10 px-5 py-4">
            <p className="text-xs text-slate-500">
              Role
            </p>

            <p className="mt-1 text-sm font-semibold text-indigo-400">
              Coordinator
            </p>
          </div>

        </div>

      </section>


      {/* Statistics */}
      <section className="mt-6">

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">

          {/* Total Mentors */}
          <StatCard
            type="mentors"
            title="Total mentors"
            value="86"
            change="↑ 8 this month"
            color="blue"
            data={[30, 45, 35, 55, 42, 60, 48, 70, 52, 66, 58, 75, 62]}
          />

          {/* Total Mentees */}
          <StatCard
            type="mentees"
            title="Total mentees"
            value="240"
            change="↑ 12 this month"
            color="green"
            data={[35, 55, 42, 70, 50, 65, 45, 78, 58, 70, 60, 82, 72]}
          />

          {/* Sessions This Month */}
          <StatCard
            type="sessions"
            title="Sessions this month"
            value="45"
            change="↑ 6 this month"
            color="purple"
            data={[50, 35, 55, 42, 62, 38, 58, 45, 68, 50, 72, 55, 75]}
          />

          {/* Active Sessions */}
          <StatCard
            type="active"
            title="Active sessions"
            value="18"
            change="On track"
            color="orange"
            data={[55, 40, 60, 45, 50, 38, 62, 48, 70, 52, 45, 65, 50]}
          />

          {/* Non-compliant Pairs */}
          <StatCard
            type="problems"
            title="Non-compliant pairs"
            value="7"
            change="↑ 2 this month"
            changeType="negative"
            color="red"
            data={[60, 55, 62, 50, 45, 52, 40, 48, 35, 50, 30, 42, 28]}
          />

        </div>

      </section>


      {/* Dashboard Sections */}

<div className="mt-6 grid grid-cols-1 gap-5 xl:grid-cols-2">
  <SessionOverview />
  <TodaysSessions />
</div>

<div className="mt-5">
  <ComplianceMatrix />
</div>

<div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-2">
  <AttentionRequired />
  <QuickActions />
</div>

    </div>
  );
}

export default Dashboard;