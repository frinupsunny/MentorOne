import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import CoordinatorLayout from "./layouts/CoordinatorLayout";

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
import Documents from "./pages/Coordinator/Documents";
import Settings from "./pages/Coordinator/Settings";

function App() {
  return (
    <BrowserRouter>
      <CoordinatorLayout>
        <Routes>

          {/* Coordinator Dashboard */}
          <Route
            path="/coordinator"
            element={<Dashboard />}
          />

          {/* My Mentors */}
          <Route
            path="/coordinator/mentors"
            element={<MyMentors />}
          />

          {/* Mentor Details */}
          <Route
            path="/coordinator/mentors/:mentorId"
            element={<MentorDetails />}
          />

          {/* My Mentees */}
          <Route
            path="/coordinator/mentees"
            element={<MyMentees />}
          />

          {/* Mentee Details */}
          <Route
            path="/coordinator/mentees/:menteeId"
            element={<MenteeDetails />}
          />

          {/* Assign Mentees */}
          <Route
            path="/coordinator/assign-mentees"
            element={<AssignMentees />}
          />

          {/* Notifications */}
          <Route
            path="/coordinator/notifications"
            element={<Notifications />}
          />

          {/* Remarks */}
          <Route
            path="/coordinator/remarks"
            element={<Remarks />}
          />

          {/* Feedback */}
          <Route
            path="/coordinator/feedback"
            element={<Feedback />}
          />

          {/* Reports */}
          <Route
            path="/coordinator/reports"
            element={<Reports />}
          />


          {/* Calendar */}
          <Route
            path="/coordinator/calendar"
            element={<Calendar />}
          />

          {/* Documents */}
          <Route
            path="/coordinator/documents"
            element={<Documents />}
          />

          {/* Settings */}
          <Route
            path="/coordinator/settings"
            element={<Settings />}
          />
          
          {/* Default */}
          <Route
            path="*"
            element={
              <Navigate
                to="/coordinator"
                replace
              />
            }
          />

        </Routes>
      </CoordinatorLayout>
    </BrowserRouter>
  );
}

export default App;