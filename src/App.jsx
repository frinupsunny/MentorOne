import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// =========================
// Layouts
// =========================
import CoordinatorLayout from "./layouts/CoordinatorLayout";
import MentorLayout from "./layouts/MentorLayout";
import HODLayout from "./layouts/HODLayout";

// =========================
// Login
// =========================
import Login from "./pages/Login";

// =========================
// Coordinator Pages
// =========================
import CoordinatorDashboard from "./pages/Coordinator/Dashboard";
import MyMentors from "./pages/Coordinator/MyMentors";
import MentorDetails from "./pages/Coordinator/MentorDetails";
import CoordinatorMentees from "./pages/Coordinator/MyMentees";
import MenteeDetails from "./pages/Coordinator/MenteeDetails";
import AssignMentees from "./pages/Coordinator/AssignMentees";
import Notifications from "./pages/Coordinator/Notifications";
import CoordinatorRemarks from "./pages/Coordinator/Remarks";
import CoordinatorFeedback from "./pages/Coordinator/Feedback";
import CoordinatorReports from "./pages/Coordinator/Reports";
import Calendar from "./pages/Coordinator/Calendar";

// =========================
// Mentor Pages
// =========================
import MentorDashboard from "./pages/Mentor/Dashboard";
import MentorMentees from "./pages/Mentor/MyMentees";
import MentorSessions from "./pages/Mentor/Sessions";
import MentorGroupMeetings from "./pages/Mentor/GroupMeetings";
import FindMentorMentee from "./pages/Mentor/FindMentorMentee";
import OTPVerification from "./pages/Mentor/OTPVerification";
import MentorRemarks from "./pages/Mentor/MentorRemarks";
import ReportIssue from "./pages/Mentor/ReportIssue";
import MentorHODNotices from "./pages/Mentor/HODNotices";
import MentorFeedback from "./pages/Mentor/MentorFeedback";

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
// Mentee Pages
// =========================

import MenteeDashboard from "./pages/mentee/Dashboard";
import MenteeSessions from "./pages/mentee/Sessions";
import MenteeFindMentor from "./pages/mentee/FindMentorMentee";
import MenteeOTPVerification from "./pages/mentee/OTPVerification";
import MenteeHODNotices from "./pages/mentee/HODNotices";
import MenteeFeedback from "./pages/mentee/MenteeFeedback";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ==================================================
            LOGIN
        ================================================== */}
        <Route
          path="/login"
          element={<Login />}
        />

        {/* ==================================================
            COORDINATOR
        ================================================== */}

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
          path="/coordinator/mentors/:mentorId"
          element={
            <CoordinatorLayout>
              <MentorDetails />
            </CoordinatorLayout>
          }
        />

        <Route
          path="/coordinator/mentees"
          element={
            <CoordinatorLayout>
              <CoordinatorMentees />
            </CoordinatorLayout>
          }
        />

        <Route
          path="/coordinator/mentees/:menteeId"
          element={
            <CoordinatorLayout>
              <MenteeDetails />
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
              <CoordinatorRemarks />
            </CoordinatorLayout>
          }
        />

        <Route
          path="/coordinator/remarks"
          element={
            <CoordinatorLayout>
              <CoordinatorRemarks />
            </CoordinatorLayout>
          }
        />

        <Route
          path="/coordinator/feedback"
          element={
            <CoordinatorLayout>
              <CoordinatorFeedback />
            </CoordinatorLayout>
          }
        />

        <Route
          path="/coordinator/reports"
          element={
            <CoordinatorLayout>
              <CoordinatorReports />
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
            MENTOR
        ================================================== */}

        <Route
          path="/mentor"
          element={
            <MentorLayout>
              <MentorDashboard />
            </MentorLayout>
          }
        />

        <Route
          path="/mentor/mentees"
          element={
            <MentorLayout>
              <MentorMentees />
            </MentorLayout>
          }
        />

        <Route
          path="/mentor/sessions"
          element={
            <MentorLayout>
              <MentorSessions />
            </MentorLayout>
          }
        />

        <Route
          path="/mentor/group-meetings"
          element={
            <MentorLayout>
              <MentorGroupMeetings />
            </MentorLayout>
          }
        />

        <Route
          path="/mentor/find-mentor"
          element={
            <MentorLayout>
              <FindMentorMentee />
            </MentorLayout>
          }
        />

        <Route
          path="/mentor/otp"
          element={
            <MentorLayout>
              <OTPVerification />
            </MentorLayout>
          }
        />

        <Route
          path="/mentor/remarks"
          element={
            <MentorLayout>
              <MentorRemarks />
            </MentorLayout>
          }
        />

        <Route
          path="/mentor/report-issue"
          element={
            <MentorLayout>
              <ReportIssue />
            </MentorLayout>
          }
        />

        <Route
          path="/mentor/hod-notices"
          element={
            <MentorLayout>
              <MentorHODNotices />
            </MentorLayout>
          }
        />

        <Route
          path="/mentor/feedback"
          element={
            <MentorLayout>
              <MentorFeedback />
            </MentorLayout>
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

        {/* ==================================================
            MENTEE
        ================================================== */}

        <Route
          path="/mentee"
          element={
            <MenteeDashboard />
          }
        />  

        <Route
          path="/mentee/sessions"
          element={
            <MenteeSessions />
          }
        />  

        <Route
          path="/mentee/find-mentor"
          element={
            <MenteeFindMentorMentee />
          }
        />  

        <Route
          path="/mentee/otp"
          element={
            <MenteeOTPVerification />
          }
        />

        <Route
          path="/mentee/hod-notices"
          element={
            <MenteeHODNotices />
          }
        />

        <Route
          path="/mentee/feedback"
          element={
            <MenteeFeedback />
          }
        />

        {/* ==================================================
            DEFAULT
        ================================================== */}

        <Route
          path="/"
          element={
            <Navigate
              to="/login"
              replace
            />
          }
        />

        {/* ==================================================
            UNKNOWN URL
        ================================================== */}

        <Route
          path="*"
          element={
            <Navigate
              to="/login"
              replace
            />
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;