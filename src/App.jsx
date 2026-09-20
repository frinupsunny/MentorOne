import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// =========================
// Layouts
// =========================
import CoordinatorLayout from "./layouts/CoordinatorLayout";
import MentorLayout from "./layouts/MentorLayout";

// =========================
// Coordinator Pages
// =========================
import Dashboard from "./pages/Coordinator/Dashboard";
import MyMentors from "./pages/Coordinator/MyMentors";
import MentorDetails from "./pages/Coordinator/MentorDetails";
import MyMentees from "./pages/Coordinator/MyMentees";
import MenteeDetails from "./pages/Coordinator/MenteeDetails";
import AssignMentees from "./pages/Coordinator/AssignMentees";
import Notifications from "./pages/Coordinator/Notifications";
import Remarks from "./pages/Coordinator/Remarks";
import Feedback from "./pages/Coordinator/Feedback";
import Reports from "./pages/Coordinator/Reports";
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
import HODNotices from "./pages/Mentor/HODNotices";
import MentorFeedback from "./pages/Mentor/MentorFeedback";

// =========================
// Login
// =========================
import Login from "./pages/Login";


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
              <MyMentees />
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
      <HODNotices />
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