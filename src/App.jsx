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
import Documents from "./pages/Coordinator/Documents";
import Settings from "./pages/Coordinator/Settings";

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

        <Route
          path="/coordinator/documents"
          element={
            <CoordinatorLayout>
              <Documents />
            </CoordinatorLayout>
          }
        />

        <Route
          path="/coordinator/settings"
          element={
            <CoordinatorLayout>
              <Settings />
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