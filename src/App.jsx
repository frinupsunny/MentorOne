import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// =========================
// Layouts
// =========================
import CoordinatorLayout from "./layouts/CoordinatorLayout";
import MentorLayout from "./layouts/MentorLayout";
import HODLayout from "./layouts/HODLayout";

// =========================
// Coordinator Pages
// =========================
import Dashboard from "./pages/Coordinator/Dashboard";
import MyMentors from "./pages/Coordinator/MyMentors";
import AssignMentees from "./pages/Coordinator/AssignMentees";
import Notifications from "./pages/Coordinator/Notifications";
import HODNotices from "./pages/Coordinator/HODNotices";
import Remarks from "./pages/Coordinator/Remarks";
import Feedback from "./pages/Coordinator/Feedback";
import Reports from "./pages/Coordinator/Reports";
import Calendar from "./pages/Coordinator/Calendar";

// =========================
// HOD Pages
// =========================
import HODDashboard from "./pages/hod/Dashboard";
import AssignCoordinator from "./pages/hod/AssignCoordinator";
import MenteeAllocation from "./pages/hod/MenteeAllocation";
import MentorCapacity from "./pages/hod/MentorCapacity";
import SessionCompliance from "./pages/hod/SessionCompliance";
import MentoringDiaries from "./pages/hod/MentoringDiaries";
import CriticalIssues from "./pages/hod/CriticalIssues";
import DepartmentNotice from "./pages/hod/DepartmentNotice";
import PeerMentoring from "./pages/hod/PeerMentoring";

// =========================
// Login
// =========================
import Login from "./pages/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* =========================
            LOGIN
        ========================= */}
        <Route path="/login" element={<Login />} />

        {/* =========================
            COORDINATOR
        ========================= */}
        <Route
          path="/coordinator"
          element={
            <CoordinatorLayout>
              <Dashboard />
            </CoordinatorLayout>
          }
        />

        <Route
          path="/coordinator/mentors"
          element={
            <CoordinatorLayout>
              <MyMentors />
            </CoordinatorLayout>
          }
        />

        <Route
          path="/coordinator/assign-mentees"
          element={
            <CoordinatorLayout>
              <AssignMentees />
            </CoordinatorLayout>
          }
        />

        <Route
          path="/coordinator/notifications"
          element={
            <CoordinatorLayout>
              <Notifications />
            </CoordinatorLayout>
          }
        />

        <Route
          path="/coordinator/hod-notices"
          element={
            <CoordinatorLayout>
              <HODNotices />
            </CoordinatorLayout>
          }
        />

        <Route
          path="/coordinator/remarks"
          element={
            <CoordinatorLayout>
              <Remarks />
            </CoordinatorLayout>
          }
        />

        <Route
          path="/coordinator/feedback"
          element={
            <CoordinatorLayout>
              <Feedback />
            </CoordinatorLayout>
          }
        />

        <Route
          path="/coordinator/reports"
          element={
            <CoordinatorLayout>
              <Reports />
            </CoordinatorLayout>
          }
        />

        <Route
          path="/coordinator/calendar"
          element={
            <CoordinatorLayout>
              <Calendar />
            </CoordinatorLayout>
          }
        />


        {/* ==================================================
    HOD
================================================== */}

<Route
  path="/hod"
  element={
    <HODLayout>
      <HODDashboard />
    </HODLayout>
  }
/>

<Route
  path="/hod/assign-coordinator"
  element={
    <HODLayout>
      <AssignCoordinator />
    </HODLayout>
  }
/>

<Route
  path="/hod/allocation"
  element={
    <HODLayout>
      <MenteeAllocation />
    </HODLayout>
  }
/>

<Route
  path="/hod/capacity"
  element={
    <HODLayout>
      <MentorCapacity />
    </HODLayout>
  }
/>

<Route
  path="/hod/sessions"
  element={
    <HODLayout>
      <SessionCompliance />
    </HODLayout>
  }
/>

<Route
  path="/hod/diaries"
  element={
    <HODLayout>
      <MentoringDiaries />
    </HODLayout>
  }
/>

<Route
  path="/hod/issues"
  element={
    <HODLayout>
      <CriticalIssues />
    </HODLayout>
  }
/>

<Route
  path="/hod/notices"
  element={
    <HODLayout>
      <DepartmentNotice />
    </HODLayout>
  }
/>

<Route
  path="/hod/peer"
  element={
    <HODLayout>
      <PeerMentoring />
    </HODLayout>
  }
/>

        
        {/* =========================
            MENTOR
        ========================= */}
        <Route
          path="/mentor"
          element={
            <MentorLayout>
              <div className="flex min-h-full items-center justify-center bg-[#080C14] p-6">
                <div className="text-center">
                  <h1 className="text-3xl font-bold text-white">
                    Mentor Dashboard
                  </h1>

                  <p className="mt-2 text-slate-500">
                    Mentor module is under development.
                  </p>
                </div>
              </div>
            </MentorLayout>
          }
        />

        {/* =========================
            DEFAULT ROUTE
        ========================= */}
        <Route
          path="/"
          element={<Navigate to="/login" replace />}
        />

        {/* =========================
            UNKNOWN URL
        ========================= */}
        <Route
          path="*"
          element={<Navigate to="/login" replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;