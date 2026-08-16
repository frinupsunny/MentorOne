import { useState } from "react";
import {
  FiUser,
  FiBell,
  FiCalendar,
  FiShield,
  FiMoon,
  FiSave,
  FiCheckCircle,
  FiLock,
} from "react-icons/fi";

function Settings() {
  const [activeSection, setActiveSection] =
    useState("profile");

  const [profile, setProfile] = useState({
    name: "Dr. Meena S",
    email: "meena.s@christuniversity.in",
    department: "Computer Science",
    phone: "+91 98765 43210",
  });

  const [notifications, setNotifications] = useState({
    sessionReminders: true,
    assignmentAlerts: true,
    feedbackAlerts: true,
    complianceAlerts: true,
  });

  const [sessionSettings, setSessionSettings] =
    useState({
      reminderTime: "30",
      defaultDuration: "45",
      autoMarkCompleted: false,
    });

  const [security, setSecurity] = useState({
    twoFactor: false,
    loginAlerts: true,
  });

  const [message, setMessage] = useState("");

  const sections = [
    {
      id: "profile",
      label: "Profile",
      icon: FiUser,
    },
    {
      id: "notifications",
      label: "Notifications",
      icon: FiBell,
    },
    {
      id: "sessions",
      label: "Session Preferences",
      icon: FiCalendar,
    },
    {
      id: "security",
      label: "Security",
      icon: FiShield,
    },
    {
      id: "appearance",
      label: "Appearance",
      icon: FiMoon,
    },
  ];

  const handleSave = () => {
    setMessage("Settings saved successfully.");

    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  const updateNotification = (key) => {
    setNotifications((current) => ({
      ...current,
      [key]: !current[key],
    }));
  };

  return (
    <div className="p-5 sm:p-6 lg:p-7">

      {/* HEADER */}

      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-white">
          Settings
        </h1>

        <p className="mt-1 text-sm text-slate-400">
          Manage your Coordinator account and MentorOne preferences
        </p>
      </div>

      {/* SUCCESS MESSAGE */}

      {message && (
        <div className="mb-5 flex items-center gap-3 rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-emerald-400">

          <FiCheckCircle />

          <span className="text-xs">
            {message}
          </span>

        </div>
      )}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[240px_minmax(0,1fr)]">

        {/* SETTINGS NAVIGATION */}

        <div className="h-fit rounded-2xl border border-slate-800 bg-slate-900/70 p-2">

          {sections.map((section) => {
            const Icon = section.icon;

            return (
              <button
                key={section.id}
                type="button"
                onClick={() =>
                  setActiveSection(section.id)
                }
                className={`mb-1 flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-xs font-medium transition ${
                  activeSection === section.id
                    ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/20"
                    : "text-slate-400 hover:bg-slate-800/60 hover:text-white"
                }`}
              >
                <Icon className="text-[16px]" />

                <span>{section.label}</span>
              </button>
            );
          })}

        </div>

        {/* SETTINGS CONTENT */}

        <div className="rounded-2xl border border-slate-800 bg-slate-900/70">

          {/* PROFILE */}

          {activeSection === "profile" && (
            <section>

              <SettingsHeader
                title="Profile Information"
                description="Update your Coordinator account information."
              />

              <div className="space-y-6 p-5">

                <div className="flex items-center gap-4 rounded-xl border border-slate-800 bg-slate-950/30 p-4">

                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-teal-400 to-emerald-500 text-lg font-bold text-white">
                    MS
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-white">
                      {profile.name}
                    </h3>

                    <p className="mt-1 text-xs text-slate-500">
                      Coordinator
                    </p>
                  </div>

                </div>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                  <InputField
                    label="Full Name"
                    value={profile.name}
                    onChange={(value) =>
                      setProfile({
                        ...profile,
                        name: value,
                      })
                    }
                  />

                  <InputField
                    label="Email Address"
                    value={profile.email}
                    onChange={(value) =>
                      setProfile({
                        ...profile,
                        email: value,
                      })
                    }
                  />

                  <InputField
                    label="Department"
                    value={profile.department}
                    onChange={(value) =>
                      setProfile({
                        ...profile,
                        department: value,
                      })
                    }
                  />

                  <InputField
                    label="Phone Number"
                    value={profile.phone}
                    onChange={(value) =>
                      setProfile({
                        ...profile,
                        phone: value,
                      })
                    }
                  />

                </div>

                <SaveButton
                  onClick={handleSave}
                />

              </div>

            </section>
          )}

          {/* NOTIFICATIONS */}

          {activeSection === "notifications" && (
            <section>

              <SettingsHeader
                title="Notification Preferences"
                description="Choose which MentorOne notifications you want to receive."
              />

              <div className="divide-y divide-slate-800">

                <ToggleRow
                  title="Session Reminders"
                  description="Receive reminders before mentoring sessions."
                  checked={
                    notifications.sessionReminders
                  }
                  onChange={() =>
                    updateNotification(
                      "sessionReminders"
                    )
                  }
                />

                <ToggleRow
                  title="Assignment Alerts"
                  description="Get notified when mentor-mentee assignments need attention."
                  checked={
                    notifications.assignmentAlerts
                  }
                  onChange={() =>
                    updateNotification(
                      "assignmentAlerts"
                    )
                  }
                />

                <ToggleRow
                  title="Feedback Alerts"
                  description="Receive notifications when new feedback is submitted."
                  checked={
                    notifications.feedbackAlerts
                  }
                  onChange={() =>
                    updateNotification(
                      "feedbackAlerts"
                    )
                  }
                />

                <ToggleRow
                  title="Compliance Alerts"
                  description="Get alerts when mentoring pairs become non-compliant."
                  checked={
                    notifications.complianceAlerts
                  }
                  onChange={() =>
                    updateNotification(
                      "complianceAlerts"
                    )
                  }
                />

              </div>

              <div className="p-5">
                <SaveButton
                  onClick={handleSave}
                />
              </div>

            </section>
          )}

          {/* SESSION PREFERENCES */}

          {activeSection === "sessions" && (
            <section>

              <SettingsHeader
                title="Session Preferences"
                description="Configure default mentoring session behaviour."
              />

              <div className="space-y-6 p-5">

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                  <SelectField
                    label="Reminder Before Session"
                    value={
                      sessionSettings.reminderTime
                    }
                    onChange={(value) =>
                      setSessionSettings({
                        ...sessionSettings,
                        reminderTime: value,
                      })
                    }
                    options={[
                      {
                        value: "15",
                        label: "15 minutes",
                      },
                      {
                        value: "30",
                        label: "30 minutes",
                      },
                      {
                        value: "45",
                        label: "45 minutes",
                      },
                      {
                        value: "60",
                        label: "1 hour",
                      },
                    ]}
                  />

                  <SelectField
                    label="Default Session Duration"
                    value={
                      sessionSettings.defaultDuration
                    }
                    onChange={(value) =>
                      setSessionSettings({
                        ...sessionSettings,
                        defaultDuration: value,
                      })
                    }
                    options={[
                      {
                        value: "30",
                        label: "30 minutes",
                      },
                      {
                        value: "45",
                        label: "45 minutes",
                      },
                      {
                        value: "60",
                        label: "1 hour",
                      },
                    ]}
                  />

                </div>

                <ToggleRow
                  title="Automatically Mark Completed"
                  description="Automatically mark a session as completed after its scheduled end time."
                  checked={
                    sessionSettings.autoMarkCompleted
                  }
                  onChange={() =>
                    setSessionSettings({
                      ...sessionSettings,
                      autoMarkCompleted:
                        !sessionSettings.autoMarkCompleted,
                    })
                  }
                />

                <SaveButton
                  onClick={handleSave}
                />

              </div>

            </section>
          )}

          {/* SECURITY */}

          {activeSection === "security" && (
            <section>

              <SettingsHeader
                title="Security"
                description="Manage your account security preferences."
              />

              <div className="space-y-1">

                <ToggleRow
                  title="Two-Factor Authentication"
                  description="Add an additional verification step when signing in."
                  checked={
                    security.twoFactor
                  }
                  onChange={() =>
                    setSecurity({
                      ...security,
                      twoFactor:
                        !security.twoFactor,
                    })
                  }
                />

                <ToggleRow
                  title="Login Alerts"
                  description="Receive an alert when your account is accessed from a new device."
                  checked={
                    security.loginAlerts
                  }
                  onChange={() =>
                    setSecurity({
                      ...security,
                      loginAlerts:
                        !security.loginAlerts,
                    })
                  }
                />

              </div>

              <div className="border-t border-slate-800 p-5">

                <div className="mb-4 flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/10 text-red-400">
                    <FiLock />
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-white">
                      Password
                    </h3>

                    <p className="mt-1 text-xs text-slate-500">
                      Keep your account secure with a strong password.
                    </p>
                  </div>

                </div>

                <button
                  type="button"
                  onClick={() =>
                    setMessage(
                      "Password change option selected."
                    )
                  }
                  className="rounded-xl border border-slate-800 px-4 py-2.5 text-xs font-medium text-slate-400 transition hover:border-slate-700 hover:text-white"
                >
                  Change Password
                </button>

              </div>

              <div className="p-5">
                <SaveButton
                  onClick={handleSave}
                />
              </div>

            </section>
          )}

          {/* APPEARANCE */}

          {activeSection === "appearance" && (
            <section>

              <SettingsHeader
                title="Appearance"
                description="Customize how MentorOne looks on your screen."
              />

              <div className="space-y-5 p-5">

                <div>

                  <p className="text-xs font-medium text-slate-400">
                    Theme
                  </p>

                  <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">

                    <ThemeCard
                      title="Dark"
                      active
                      description="Current theme"
                    />

                    <ThemeCard
                      title="Light"
                      description="Light interface"
                    />

                    <ThemeCard
                      title="System"
                      description="Follow device"
                    />

                  </div>

                </div>

                <div className="rounded-xl border border-indigo-500/20 bg-indigo-500/5 p-4">

                  <div className="flex items-start gap-3">

                    <FiMoon className="mt-0.5 text-indigo-400" />

                    <div>

                      <p className="text-xs font-medium text-indigo-300">
                        Dark mode enabled
                      </p>

                      <p className="mt-1 text-[11px] leading-5 text-slate-500">
                        MentorOne is currently optimized for the dark dashboard interface.
                      </p>

                    </div>

                  </div>

                </div>

                <SaveButton
                  onClick={handleSave}
                />

              </div>

            </section>
          )}

        </div>

      </div>

    </div>
  );
}

/* =================================
   SETTINGS HEADER
================================= */

function SettingsHeader({
  title,
  description,
}) {
  return (
    <div className="border-b border-slate-800 px-5 py-5">

      <h2 className="text-base font-semibold text-white">
        {title}
      </h2>

      <p className="mt-1 text-xs text-slate-500">
        {description}
      </p>

    </div>
  );
}

/* =================================
   INPUT FIELD
================================= */

function InputField({
  label,
  value,
  onChange,
}) {
  return (
    <div>

      <label className="mb-2 block text-[11px] font-medium text-slate-500">
        {label}
      </label>

      <input
        type="text"
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        className="w-full rounded-xl border border-slate-800 bg-slate-950/50 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-indigo-500"
      />

    </div>
  );
}

/* =================================
   SELECT FIELD
================================= */

function SelectField({
  label,
  value,
  onChange,
  options,
}) {
  return (
    <div>

      <label className="mb-2 block text-[11px] font-medium text-slate-500">
        {label}
      </label>

      <select
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        className="w-full rounded-xl border border-slate-800 bg-slate-950/50 px-4 py-3 text-xs text-white outline-none focus:border-indigo-500"
      >

        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}

      </select>

    </div>
  );
}

/* =================================
   TOGGLE
================================= */

function ToggleRow({
  title,
  description,
  checked,
  onChange,
}) {
  return (
    <div className="flex items-center justify-between gap-5 px-5 py-5">

      <div>

        <p className="text-sm font-medium text-white">
          {title}
        </p>

        <p className="mt-1 max-w-xl text-xs leading-5 text-slate-500">
          {description}
        </p>

      </div>

      <button
        type="button"
        onClick={onChange}
        className={`relative h-6 w-11 shrink-0 rounded-full transition ${
          checked
            ? "bg-indigo-500"
            : "bg-slate-700"
        }`}
      >

        <span
          className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${
            checked
              ? "left-6"
              : "left-1"
          }`}
        />

      </button>

    </div>
  );
}

/* =================================
   SAVE BUTTON
================================= */

function SaveButton({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 px-4 py-2.5 text-xs font-medium text-white shadow-lg shadow-indigo-500/20 transition hover:from-indigo-400 hover:to-purple-500"
    >
      <FiSave />

      Save Changes
    </button>
  );
}

/* =================================
   THEME CARD
================================= */

function ThemeCard({
  title,
  description,
  active = false,
}) {
  return (
    <button
      type="button"
      className={`rounded-xl border p-4 text-left transition ${
        active
          ? "border-indigo-500/50 bg-indigo-500/10"
          : "border-slate-800 bg-slate-950/30 hover:border-slate-700"
      }`}
    >

      <div
        className={`mb-3 h-12 rounded-lg ${
          active
            ? "bg-[#0D1220]"
            : "bg-slate-800"
        }`}
      />

      <p className="text-xs font-medium text-white">
        {title}
      </p>

      <p className="mt-1 text-[10px] text-slate-600">
        {description}
      </p>

    </button>
  );
}

export default Settings;