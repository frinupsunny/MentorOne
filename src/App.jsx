import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import CoordinatorLayout from "./layouts/CoordinatorLayout";

import Dashboard from "./pages/Coordinator/Dashboard";
import MyMentors from "./pages/Coordinator/MyMentors";
import MentorDetails from "./pages/Coordinator/MentorDetails";
import MyMentees from "./pages/Coordinator/MyMentees";
import MenteeDetails from "./pages/Coordinator/MenteeDetails";
import AssignMentees from "./pages/Coordinator/AssignMentees";

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