import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiShield,
  FiUsers,
  FiBookOpen,
  FiUser,
  FiArrowRight,
} from "react-icons/fi";

function Login() {
  const navigate = useNavigate();

  const [selectedRole, setSelectedRole] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const roles = [
    {
      id: "hod",
      label: "HOD",
      description: "Department Head",
      icon: FiShield,
      color: "purple",
    },
    {
      id: "coordinator",
      label: "Coordinator",
      description: "Manage mentors & mentees",
      icon: FiUsers,
      color: "indigo",
    },
    {
      id: "mentor",
      label: "Mentor",
      description: "Guide assigned mentees",
      icon: FiBookOpen,
      color: "emerald",
    },
    {
      id: "mentee",
      label: "Mentee",
      description: "View mentoring activities",
      icon: FiUser,
      color: "orange",
    },
  ];

  const handleLogin = (e) => {
    e.preventDefault();

    if (!selectedRole) {
      alert("Please select your role.");
      return;
    }

    if (!email || !password) {
      alert("Please enter your email and password.");
      return;
    }

    // Temporary demo navigation
    if (selectedRole === "hod") {
      navigate("/hod");
    } else if (selectedRole === "coordinator") {
      navigate("/coordinator");
    } else if (selectedRole === "mentor") {
      navigate("/mentor");
    } else if (selectedRole === "mentee") {
      navigate("/mentee");
    }
  };

  return (
    <div className="min-h-screen bg-[#080C14] text-white">

      <div className="grid min-h-screen lg:grid-cols-2">

        {/* =====================================================
            LEFT SIDE - BRANDING
        ===================================================== */}
        <div className="hidden lg:flex relative overflow-hidden bg-gradient-to-br from-[#0D1422] via-[#0B1020] to-[#080C14]">

          <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-purple-600/10 blur-3xl" />
          <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-indigo-600/10 blur-3xl" />

          <div className="relative z-10 flex w-full flex-col justify-between p-12 xl:p-16">

            {/* Logo */}
            <div className="flex items-center gap-4">

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 shadow-lg shadow-purple-500/20">
                <FiUsers className="text-2xl text-white" />
              </div>

              <div>
                <h1 className="text-xl font-bold text-white">
                  MentorOne
                </h1>

                <p className="text-xs tracking-wide text-slate-500">
                  MENTORING MANAGEMENT SYSTEM
                </p>
              </div>

            </div>


            {/* Main Content */}
            <div className="max-w-xl">

              <p className="text-sm font-medium text-purple-400">
                CHRIST (Deemed to be University)
              </p>

              <h2 className="mt-4 text-4xl font-bold leading-tight text-white xl:text-5xl">
                Empowering meaningful
                <span className="block text-purple-400">
                  mentoring relationships.
                </span>
              </h2>

              <p className="mt-6 max-w-lg text-sm leading-6 text-slate-400">
                A centralized mentoring management platform for
                HODs, coordinators, mentors and mentees.
              </p>


              {/* Feature Cards */}
              <div className="mt-8 grid grid-cols-2 gap-3">

                <Feature
                  icon={<FiShield />}
                  title="Department"
                  text="HOD oversight"
                />

                <Feature
                  icon={<FiUsers />}
                  title="Coordination"
                  text="Manage allocations"
                />

                <Feature
                  icon={<FiBookOpen />}
                  title="Mentoring"
                  text="Track sessions"
                />

                <Feature
                  icon={<FiUser />}
                  title="Student"
                  text="Mentee support"
                />

              </div>

            </div>


            {/* Footer */}
            <p className="text-xs text-slate-600">
              © 2026 MentorOne · CHRIST (Deemed to be University)
            </p>

          </div>

        </div>


        {/* =====================================================
            RIGHT SIDE - LOGIN
        ===================================================== */}
        <div className="flex items-center justify-center px-5 py-10 sm:px-8">

          <div className="w-full max-w-md">

            {/* Mobile Logo */}
            <div className="mb-8 flex items-center gap-3 lg:hidden">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600">
                <FiUsers className="text-xl text-white" />
              </div>

              <div>
                <h1 className="font-bold text-white">
                  MentorOne
                </h1>

                <p className="text-[10px] text-slate-500">
                  MENTORING MANAGEMENT SYSTEM
                </p>
              </div>

            </div>


            {/* Heading */}
            <div>

              <h2 className="text-2xl font-bold text-white sm:text-3xl">
                Welcome back
              </h2>

              <p className="mt-2 text-sm text-slate-400">
                Sign in to access your mentoring dashboard.
              </p>

            </div>


            {/* Login Card */}
            <form
              onSubmit={handleLogin}
              className="mt-8 rounded-2xl border border-slate-800 bg-[#0D1422] p-5 sm:p-6"
            >

              {/* Role */}
              <div>

                <label className="text-sm font-medium text-slate-300">
                  Select your role
                </label>

                <div className="mt-3 grid grid-cols-2 gap-3">

                  {roles.map((role) => {

                    const Icon = role.icon;

                    const active =
                      selectedRole === role.id;

                    return (
                      <button
                        key={role.id}
                        type="button"
                        onClick={() =>
                          setSelectedRole(role.id)
                        }
                        className={`group rounded-xl border p-3 text-left transition ${
                          active
                            ? "border-purple-500 bg-purple-500/10"
                            : "border-slate-800 bg-slate-900/40 hover:border-slate-700 hover:bg-slate-800/60"
                        }`}
                      >

                        <div
                          className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                            active
                              ? "bg-purple-500/20 text-purple-400"
                              : "bg-slate-800 text-slate-400 group-hover:text-white"
                          }`}
                        >
                          <Icon />
                        </div>

                        <p className="mt-3 text-sm font-semibold text-white">
                          {role.label}
                        </p>

                        <p className="mt-1 text-[10px] leading-4 text-slate-500">
                          {role.description}
                        </p>

                      </button>
                    );
                  })}

                </div>

              </div>


              {/* Email */}
              <div className="mt-5">

                <label className="text-sm font-medium text-slate-300">
                  Email address
                </label>

                <div className="mt-2 flex h-11 items-center gap-3 rounded-lg border border-slate-800 bg-slate-900/50 px-3 focus-within:border-purple-500/50">

                  <FiMail className="flex-shrink-0 text-slate-500" />

                  <input
                    type="email"
                    value={email}
                    onChange={(e) =>
                      setEmail(e.target.value)
                    }
                    placeholder="Enter your email"
                    className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-600"
                  />

                </div>

              </div>


              {/* Password */}
              <div className="mt-4">

                <div className="flex items-center justify-between">

                  <label className="text-sm font-medium text-slate-300">
                    Password
                  </label>

                  <button
                    type="button"
                    className="text-xs font-medium text-purple-400 hover:text-purple-300"
                  >
                    Forgot password?
                  </button>

                </div>

                <div className="mt-2 flex h-11 items-center gap-3 rounded-lg border border-slate-800 bg-slate-900/50 px-3 focus-within:border-purple-500/50">

                  <FiLock className="flex-shrink-0 text-slate-500" />

                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) =>
                      setPassword(e.target.value)
                    }
                    placeholder="Enter your password"
                    className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-600"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                    className="flex-shrink-0 text-slate-500 hover:text-white"
                  >
                    {showPassword ? (
                      <FiEyeOff />
                    ) : (
                      <FiEye />
                    )}
                  </button>

                </div>

              </div>


              {/* Login Button */}
              <button
                type="submit"
                className="mt-6 flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 text-sm font-semibold text-white shadow-lg shadow-purple-600/10 transition hover:from-purple-500 hover:to-indigo-500"
              >
                Sign in
                <FiArrowRight />
              </button>


              {/* Demo note */}
              <div className="mt-5 rounded-lg border border-indigo-500/10 bg-indigo-500/5 p-3">

                <p className="text-center text-[11px] leading-5 text-slate-500">
                  Demo login — select a role and enter any
                  email and password to continue.
                </p>

              </div>

            </form>

          </div>

        </div>

      </div>

    </div>
  );
}


/* =========================================================
   FEATURE
========================================================= */

function Feature({ icon, title, text }) {
  return (
    <div className="rounded-xl border border-slate-800/80 bg-slate-900/30 p-3">

      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-500/10 text-purple-400">
        {icon}
      </div>

      <p className="mt-2 text-xs font-semibold text-slate-300">
        {title}
      </p>

      <p className="mt-1 text-[10px] text-slate-600">
        {text}
      </p>

    </div>
  );
}

export default Login;