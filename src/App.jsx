import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";

// =========================
// Coordinator
// =========================
import CoordinatorLayout from "./layouts/CoordinatorLayout";

import CoordinatorDashboard from "./pages/coordinator/Dashboard";
import MyMentors from "./pages/coordinator/MyMentors";
import AssignMentees from "./pages/coordinator/AssignMentees";
import Notifications from "./pages/coordinator/Notifications";
import HODNotices from "./pages/coordinator/HODNotices";
import Remarks from "./pages/coordinator/Remarks";
import Feedback from "./pages/coordinator/Feedback";
import Reports from "./pages/coordinator/Reports";
import Calendar from "./pages/coordinator/Calendar";



// =========================
// HOD
// =========================
import HODLayout from "./layouts/HODLayout";
import HODDashboard from "./pages/hod/Dashboard";
import AssignCoordinator from "./pages/hod/AssignCoordinator";
import MenteeAllocation from "./pages/hod/MenteeAllocation";
import MentorCapacity from "./pages/hod/MentorCapacity";
import SessionCompliance from "./pages/hod/SessionCompliance";
import MentoringDiaries from "./pages/hod/MentoringDiaries";
import CriticalIssues from "./pages/hod/CriticalIssues";
import DepartmentNotice from "./pages/hod/DepartmentNotice";
import PeerMentoring from "./pages/hod/PeerMentoring";


function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* =========================
            LOGIN
        ========================== */}
        <Route path="/login" element={<Login />} />

        {/* =========================
            DEFAULT → LOGIN
        ========================== */}
        <Route
          path="/"
          element={<Navigate to="/login" replace />}
        />

        {/* =========================
            COORDINATOR
        ========================== */}

        <Route
          path="/coordinator"
          element={
            <CoordinatorLayout>
              <CoordinatorDashboard />
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

        {/* =========================
            HOD
        ========================== */}


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
            UNKNOWN URL
        ========================== */}

        <Route
          path="*"
          element={<Navigate to="/login" replace />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;