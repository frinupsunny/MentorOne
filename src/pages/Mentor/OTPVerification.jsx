import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import {
  FiShield,
  FiLock,
  FiCheckCircle,
  FiClock,
  FiInfo,
  FiRefreshCw,
} from "react-icons/fi";

const API_BASE_URL = "http://localhost:4000";

function OTPVerification() {
  const [mentees, setMentees] = useState([]);
  const [sessions, setSessions] = useState([]);

  const [selectedMenteeId, setSelectedMenteeId] =
    useState("");

  const [otp, setOtp] = useState("");
  const [otpExpiresAt, setOtpExpiresAt] =
    useState(null);

  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] =
    useState("success");

  const [currentOtp, setCurrentOtp] = useState("");

  const token = localStorage.getItem("mentorOneToken");

  const user = useMemo(() => {
    try {
      return JSON.parse(
        localStorage.getItem("mentorOneUser") || "null"
      );
    } catch {
      return null;
    }
  }, []);

  const mentorEmail =
    user?.email ||
    user?.collegeEmail ||
    user?.officialEmail ||
    "Registered email not available";

  const getAuthConfig = () => ({
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        const [menteesResponse, sessionsResponse] =
          await Promise.all([
            axios.get(
              `${API_BASE_URL}/api/mentor/mentees`,
              getAuthConfig()
            ),
            axios.get(
              `${API_BASE_URL}/api/mentor/sessions`,
              getAuthConfig()
            ),
          ]);

        const menteeList =
          menteesResponse.data?.mentees || [];

        const sessionList =
          sessionsResponse.data?.sessions ||
          sessionsResponse.data ||
          [];

        setMentees(menteeList);
        setSessions(
          Array.isArray(sessionList)
            ? sessionList
            : []
        );

        if (menteeList.length > 0) {
          setSelectedMenteeId(
            String(menteeList[0].id)
          );
        }
      } catch (error) {
        console.error(
          "Error loading OTP data:",
          error
        );

        if (error.response?.status === 401) {
          localStorage.removeItem("mentorOneToken");
          localStorage.removeItem("mentorOneRole");
          localStorage.removeItem("mentorOneUser");

          alert(
            "Session expired. Please login again."
          );
        } else {
          setMessage(
            "Unable to load your mentees and sessions."
          );
          setMessageType("error");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  const matchingSessions = useMemo(() => {
    if (!selectedMenteeId) {
      return [];
    }

    return sessions.filter((session) => {
      const sessionMenteeId =
        session?.menteeId ||
        session?.mentee_id ||
        session?.studentId;

      return (
        String(sessionMenteeId) ===
        String(selectedMenteeId)
      );
    });
  }, [sessions, selectedMenteeId]);

  const eligibleSession = useMemo(() => {
    if (matchingSessions.length === 0) {
      return null;
    }

    const priorityOrder = [
      "confirmed",
      "scheduled",
      "upcoming",
      "pending",
    ];

    const sorted = [...matchingSessions].sort(
      (a, b) => {
        const statusA = String(
          a?.status || ""
        ).toLowerCase();

        const statusB = String(
          b?.status || ""
        ).toLowerCase();

        const priorityA =
          priorityOrder.indexOf(statusA) === -1
            ? 99
            : priorityOrder.indexOf(statusA);

        const priorityB =
          priorityOrder.indexOf(statusB) === -1
            ? 99
            : priorityOrder.indexOf(statusB);

        if (priorityA !== priorityB) {
          return priorityA - priorityB;
        }

        const dateA = new Date(
          `${a?.date || ""} ${
            a?.time || ""
          }`
        ).getTime();

        const dateB = new Date(
          `${b?.date || ""} ${
            b?.time || ""
          }`
        ).getTime();

        return dateB - dateA;
      }
    );

    return sorted[0];
  }, [matchingSessions]);

  const selectedMentee = useMemo(() => {
    return mentees.find(
      (mentee) =>
        String(mentee.id) ===
        String(selectedMenteeId)
    );
  }, [mentees, selectedMenteeId]);

  const formatSessionDate = (session) => {
    if (!session?.date) {
      return "Session date not available";
    }

    const date = new Date(
      `${session.date}T00:00:00`
    );

    if (Number.isNaN(date.getTime())) {
      return session.date;
    }

    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatSessionTime = (session) => {
    if (!session?.time) {
      return "Time not available";
    }

    if (
      typeof session.time === "string" &&
      session.time.includes(":")
    ) {
      const [hour, minute] =
        session.time.split(":");

      const date = new Date();

      date.setHours(
        Number(hour),
        Number(minute),
        0,
        0
      );

      if (!Number.isNaN(date.getTime())) {
        return date.toLocaleTimeString(
          "en-US",
          {
            hour: "2-digit",
            minute: "2-digit",
          }
        );
      }
    }

    return session.time;
  };

  const getRemainingSeconds = () => {
    if (!otpExpiresAt) {
      return 0;
    }

    return Math.max(
      0,
      Math.floor(
        (otpExpiresAt - Date.now()) / 1000
      )
    );
  };

  const [remainingSeconds, setRemainingSeconds] =
    useState(0);

  useEffect(() => {
    if (!otpExpiresAt) {
      setRemainingSeconds(0);
      return;
    }

    const updateTimer = () => {
      const remaining =
        getRemainingSeconds();

      setRemainingSeconds(remaining);

      if (remaining <= 0) {
        setCurrentOtp("");
      }
    };

    updateTimer();

    const interval = setInterval(
      updateTimer,
      1000
    );

    return () => clearInterval(interval);
  }, [otpExpiresAt]);

  const formattedTimer = `${String(
    Math.floor(remainingSeconds / 60)
  ).padStart(2, "0")}:${String(
    remainingSeconds % 60
  ).padStart(2, "0")}`;

  const handleMenteeChange = (event) => {
    setSelectedMenteeId(
      event.target.value
    );

    setCurrentOtp("");
    setOtpExpiresAt(null);
    setMessage("");
  };

  const handleGenerateOtp = async () => {
    if (!token) {
      alert("Please login again.");
      return;
    }

    if (!selectedMenteeId) {
      setMessage("Please select a mentee.");
      setMessageType("error");
      return;
    }

    if (!eligibleSession?.id) {
      setMessage(
        "No suitable session was found for this mentee."
      );
      setMessageType("error");
      return;
    }

    try {
      setGenerating(true);
      setMessage("");

      const response = await axios.post(
        `${API_BASE_URL}/api/mentor/otp/generate`,
        {
          sessionId: eligibleSession.id,
        },
        getAuthConfig()
      );

      const returnedOtp =
        response.data?.otp ||
        response.data?.code ||
        response.data?.verificationCode ||
        "";

      const expiresIn =
        Number(
          response.data?.expiresIn ||
            response.data?.expires_in ||
            300
        ) || 300;

      setCurrentOtp(
        returnedOtp
          ? String(returnedOtp)
          : ""
      );

      setOtpExpiresAt(
        Date.now() + expiresIn * 1000
      );

      setOtp("");

      setMessage(
        returnedOtp
          ? "OTP generated successfully. Share this code with the selected mentee."
          : "OTP generated successfully."
      );

      setMessageType("success");
    } catch (error) {
      console.error(
        "OTP generation error:",
        error
      );

      if (error.response?.status === 401) {
        localStorage.removeItem("mentorOneToken");
        localStorage.removeItem("mentorOneRole");
        localStorage.removeItem("mentorOneUser");

        alert(
          "Session expired. Please login again."
        );
      } else {
        setMessage(
          error.response?.data?.message ||
            "Failed to generate OTP."
        );
        setMessageType("error");
      }
    } finally {
      setGenerating(false);
    }
  };

  const handleResendOtp = () => {
    handleGenerateOtp();
  };

  return (
    <div className="min-h-full bg-[#080C14] px-6 py-8 text-white lg:px-10">
      {/* HEADER */}
      <div className="mb-8">
        <p className="mb-2 text-sm text-blue-400">
          MentorOne / Security
        </p>

        <h1 className="text-3xl font-bold tracking-tight">
          OTP Verification
        </h1>

        <p className="mt-2 text-sm text-slate-400">
          Generate a one-time password to confirm a mentoring session.
        </p>
      </div>

      {/* MAIN CONTENT */}
      <div className="grid gap-6 xl:grid-cols-[1.4fr_1fr]">
        {/* VERIFICATION CARD */}
        <div className="rounded-2xl border border-slate-800 bg-[#0D1220] p-6">
          <div className="mb-6 flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/10">
              <FiShield className="text-2xl text-blue-400" />
            </div>

            <div>
              <h2 className="text-xl font-semibold">
                Generate session OTP
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Generate the OTP and share it with your mentee.
              </p>
            </div>
          </div>

          {/* EMAIL DISPLAY */}
          <div className="mb-6 rounded-xl border border-slate-800 bg-[#080C14] p-4">
            <p className="text-xs uppercase tracking-wider text-slate-500">
              Registered Email
            </p>

            <p className="mt-2 break-all text-sm font-medium text-slate-200">
              {mentorEmail}
            </p>
          </div>

          {/* MENTEE SELECT */}
          <div className="mb-5">
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Select Mentee
            </label>

            <select
              value={selectedMenteeId}
              onChange={handleMenteeChange}
              disabled={loading}
              className="w-full rounded-xl border border-slate-700 bg-[#080C14] px-4 py-3 text-sm text-slate-300 outline-none transition focus:border-blue-500 disabled:opacity-50"
            >
              <option value="">
                {loading
                  ? "Loading mentees..."
                  : "Select mentee"}
              </option>

              {mentees.map((mentee) => (
                <option
                  key={mentee.id}
                  value={mentee.id}
                >
                  {mentee.name} (
                  {mentee.registerNo})
                </option>
              ))}
            </select>
          </div>

          {/* SESSION DISPLAY */}
          <div className="mb-6 rounded-xl border border-slate-800 bg-[#080C14] p-4">
            <p className="text-xs uppercase tracking-wider text-slate-500">
              Session
            </p>

            {eligibleSession ? (
              <div className="mt-2">
                <p className="text-sm font-medium text-white">
                  {eligibleSession.label ||
                    eligibleSession.agenda ||
                    "Mentoring Session"}
                </p>

                <div className="mt-2 flex flex-wrap gap-3 text-xs text-slate-500">
                  <span>
                    📅{" "}
                    {formatSessionDate(
                      eligibleSession
                    )}
                  </span>

                  <span>
                    🕒{" "}
                    {formatSessionTime(
                      eligibleSession
                    )}
                  </span>

                  <span>
                    {eligibleSession.mode ||
                      "Session"}
                  </span>
                </div>
              </div>
            ) : (
              <p className="mt-2 text-sm text-slate-500">
                No session available for the selected mentee.
              </p>
            )}
          </div>

          {/* OTP DISPLAY */}
          {currentOtp &&
            remainingSeconds > 0 && (
              <div className="mb-6 rounded-xl border border-blue-500/20 bg-blue-500/5 p-5 text-center">
                <p className="text-xs text-slate-500">
                  Share this code with the mentee
                </p>

                <p className="mt-3 text-4xl font-bold tracking-[0.45em] text-blue-400">
                  {currentOtp}
                </p>

                <p className="mt-3 flex items-center justify-center gap-2 text-xs text-slate-500">
                  <FiClock />

                  Expires in{" "}
                  {formattedTimer}
                </p>
              </div>
            )}

          {/* GENERATE BUTTON */}
          <button
            type="button"
            onClick={
              currentOtp &&
              remainingSeconds > 0
                ? handleResendOtp
                : handleGenerateOtp
            }
            disabled={
              generating ||
              loading ||
              !selectedMenteeId ||
              !eligibleSession
            }
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 py-3 text-sm font-semibold text-white transition hover:from-blue-600 hover:to-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {generating ? (
              <>
                <FiRefreshCw className="animate-spin" />
                Generating...
              </>
            ) : currentOtp &&
              remainingSeconds > 0 ? (
              <>
                <FiRefreshCw />
                Generate New OTP
              </>
            ) : (
              <>
                <FiShield />
                Generate OTP
              </>
            )}
          </button>

          {/* MESSAGE */}
          {message && (
            <div
              className={`mt-5 rounded-xl border p-4 ${
                messageType === "success"
                  ? "border-emerald-500/20 bg-emerald-500/5 text-emerald-400"
                  : "border-red-500/20 bg-red-500/5 text-red-400"
              }`}
            >
              <div className="flex gap-3">
                {messageType === "success" ? (
                  <FiCheckCircle className="mt-0.5 flex-shrink-0" />
                ) : (
                  <FiInfo className="mt-0.5 flex-shrink-0" />
                )}

                <p className="text-sm leading-6">
                  {message}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* INFORMATION CARD */}
        <div className="rounded-2xl border border-slate-800 bg-[#0D1220] p-6">
          <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10">
            <FiLock className="text-xl text-emerald-400" />
          </div>

          <h2 className="text-xl font-semibold">
            Keep your account secure
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-400">
            OTP verification adds an extra layer of protection
            when confirming mentoring session attendance.
          </p>

          <div className="mt-6 space-y-4">
            <div className="flex gap-3">
              <FiCheckCircle className="mt-1 flex-shrink-0 text-emerald-400" />

              <p className="text-sm text-slate-300">
                Never share your OTP with anyone other than
                the intended mentee.
              </p>
            </div>

            <div className="flex gap-3">
              <FiCheckCircle className="mt-1 flex-shrink-0 text-emerald-400" />

              <p className="text-sm text-slate-300">
                Use the latest OTP generated for the session.
              </p>
            </div>

            <div className="flex gap-3">
              <FiCheckCircle className="mt-1 flex-shrink-0 text-emerald-400" />

              <p className="text-sm text-slate-300">
                Generate a new OTP when the previous code expires.
              </p>
            </div>
          </div>

          {/* SELECTED MENTEE */}
          {selectedMentee && (
            <div className="mt-7 rounded-xl border border-slate-800 bg-[#080C14] p-4">
              <p className="text-xs uppercase tracking-wider text-slate-500">
                Selected Mentee
              </p>

              <p className="mt-2 text-sm font-medium text-white">
                {selectedMentee.name}
              </p>

              <p className="mt-1 text-xs text-slate-500">
                {selectedMentee.registerNo}
              </p>
            </div>
          )}

          <div className="mt-7 rounded-xl border border-blue-500/20 bg-blue-500/5 p-4">
            <div className="flex gap-3">
              <FiInfo className="mt-1 flex-shrink-0 text-blue-400" />

              <p className="text-xs leading-5 text-slate-400">
                The OTP is generated by the backend for a
                mentoring session and has a limited validity
                period.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OTPVerification;