import {
  FiShield,
  FiLock,
  FiCheckCircle,
  FiClock,
  FiInfo,
} from "react-icons/fi";

function OTPVerification() {
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
          Verify your account using a one-time password.
        </p>
      </div>

      {/* MAIN CONTENT */}
      <div className="grid gap-6 xl:grid-cols-[1.4fr_1fr]">
        {/* VERIFICATION CARD */}
        <div className="rounded-2xl border border-[#27334A] bg-[#101624] p-6">
          <div className="mb-6 flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/10">
              <FiShield className="text-2xl text-blue-400" />
            </div>

            <div>
              <h2 className="text-xl font-semibold">
                Verify your identity
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Enter the OTP sent to your registered email.
              </p>
            </div>
          </div>

          {/* EMAIL DISPLAY */}
          <div className="mb-6 rounded-xl border border-[#27334A] bg-[#080C14] p-4">
            <p className="text-xs uppercase tracking-wider text-slate-500">
              Registered Email
            </p>

            <p className="mt-2 text-sm font-medium text-slate-200">
              anjali.menon@christuniversity.in
            </p>
          </div>

          {/* OTP BOXES */}
          <div className="mb-6">
            <label className="mb-3 block text-sm font-medium text-slate-300">
              Enter OTP
            </label>

            <div className="grid grid-cols-6 gap-2">
              {[1, 2, 3, 4, 5, 6].map((number) => (
                <input
                  key={number}
                  type="text"
                  maxLength="1"
                  className="h-14 w-full rounded-xl border border-[#33415C] bg-[#080C14] text-center text-xl font-bold text-white outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                />
              ))}
            </div>
          </div>

          {/* VERIFY BUTTON */}
          <button
            type="button"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 py-3 text-sm font-semibold text-white transition hover:from-blue-600 hover:to-indigo-700"
          >
            <FiCheckCircle />
            Verify OTP
          </button>

          {/* RESEND */}
          <div className="mt-5 flex items-center justify-between text-sm">
            <span className="flex items-center gap-2 text-slate-500">
              <FiClock />
              OTP expires in 02:00
            </span>

            <button
              type="button"
              className="font-medium text-blue-400 transition hover:text-blue-300"
            >
              Resend OTP
            </button>
          </div>
        </div>

        {/* INFORMATION CARD */}
        <div className="rounded-2xl border border-[#27334A] bg-[#101624] p-6">
          <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10">
            <FiLock className="text-xl text-emerald-400" />
          </div>

          <h2 className="text-xl font-semibold">
            Keep your account secure
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-400">
            OTP verification adds an extra layer of protection to your
            MentorOne account.
          </p>

          <div className="mt-6 space-y-4">
            <div className="flex gap-3">
              <FiCheckCircle className="mt-1 flex-shrink-0 text-emerald-400" />

              <p className="text-sm text-slate-300">
                Never share your OTP with anyone.
              </p>
            </div>

            <div className="flex gap-3">
              <FiCheckCircle className="mt-1 flex-shrink-0 text-emerald-400" />

              <p className="text-sm text-slate-300">
                Use the latest OTP received in your email.
              </p>
            </div>

            <div className="flex gap-3">
              <FiCheckCircle className="mt-1 flex-shrink-0 text-emerald-400" />

              <p className="text-sm text-slate-300">
                Contact the administrator if you cannot access your email.
              </p>
            </div>
          </div>

          <div className="mt-7 rounded-xl border border-blue-500/20 bg-blue-500/5 p-4">
            <div className="flex gap-3">
              <FiInfo className="mt-1 flex-shrink-0 text-blue-400" />

              <p className="text-xs leading-5 text-slate-400">
                This is a static interface for now. OTP generation,
                verification, and email delivery will be added later.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OTPVerification;