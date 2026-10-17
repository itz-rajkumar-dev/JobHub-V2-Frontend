import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

import {
  ArrowUpRight,
  Eye,
  EyeOff,
  User,
  Mail,
  LockKeyhole,
  BriefcaseBusiness,
  Building2,
  Phone,
  MapPin,
  Check,
} from "lucide-react";

import NavBar from "../component/NavBar";
import api from "../Service/Api";

function Register() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");

  const navigate=useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [role, setRole] = useState("JOB_SEEKER");
  const [agreeTerms, setAgreeTerms] = useState(false);

const [otp, setOtp] = useState("");
const [otpSent, setOtpSent] = useState(false);
const [registrationToken, setRegistrationToken] = useState("");
const [verifiedEmail, setVerifiedEmail] = useState("");
const [loading, setLoading] = useState(false);

 const handleRegister = async (e) => {

  e.preventDefault();

  const normalizedEmail = email.trim().toLowerCase();

   const errors = {};

  if (!fullName.trim()) {
    errors.fullName = "Full name is required";
  }

  if (!phone.trim()) {
    errors.phone = "Phone number is required";
  }

  if (!email.trim()) {
    errors.email = "Email is required";
  } else if (
  !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)
) {
  errors.email = "Enter a valid email address";
}

  if (!location.trim()) {
    errors.location = "Location is required";
  }
 
  if (!password) {
    errors.password = "Password is required";
  }

  if (!confirmPassword) {
    errors.confirmPassword = "Please confirm your password";
  } else if (password !== confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
  }

  if (!agreeTerms) {
    errors.agreeTerms = "Please accept the Terms and Privacy Policy";
  }

  setFiledError(errors);

  if (Object.keys(errors).length > 0) {
    return;
  }

  setLoading(true);


  try {

     if (!otpSent) {
      await api.post("/otp/send", null, {
        params: { email: normalizedEmail },
      });

       setOtpSent(true);
      setVerifiedEmail(normalizedEmail);
      toast.success("OTP sent to your email");
      return;
    }

      // STEP 3: Verify OTP
    if (!registrationToken) {
      if (!otp.trim()) {
        toast.error("Please enter the OTP");
        return;
      }

      const response = await api.post("/otp/verify", null, {
        params: {
          email: normalizedEmail,
          otp: otp.trim(),
        },
      });

      const token = response.data?.registrationToken;

      if (!token) {
        toast.error("Registration token was not returned");
        return;
      }

      setRegistrationToken(token);
      setVerifiedEmail(normalizedEmail);
      toast.success("Email verified! Create your account now.");
      return;
    }


     // STEP 4: Ensure the verified email hasn't changed
    if (normalizedEmail !== verifiedEmail) {
      toast.error("Email changed. Please verify it again.");
      setOtpSent(false);
      setRegistrationToken("");
      setOtp("");
      return;
    }

  const registerResponse = await api.post("/auth/register", {
  fullname: fullName.trim(),
  email: normalizedEmail,
  phone: phone.trim(),
  location: location.trim(),
  password,
  role,
  profileImage: null,
  registrationToken,
});

console.log("Register Successfully");
console.log(registerResponse.data);

toast.success("Account Created Successfully");
navigate("/login");

  } catch (error) {

    console.log(error);

    if (error.response?.status === 409) {

      toast.error("Email Already Registered");

    } else if (error.response?.data?.message) {

      toast.error(error.response.data.message);

    } else {

      toast.error("Registration failed. Please try again.");

    }
  }finally {
    setLoading(false);
  }
};
 const [filedError, setFiledError] = useState({});

  return (
    <>
      <NavBar />

      <div className="min-h-screen bg-[#162727] p-4 text-white md:p-8">
        <div className="mx-auto grid min-h-[760px] w-full max-w-6xl grid-cols-1 overflow-hidden rounded-[32px] border border-white/10 bg-[#0D201E] shadow-2xl lg:grid-cols-2">

          {/* ==================== LEFT SIDE ==================== */}
          <div className="relative hidden flex-col justify-between overflow-hidden p-12 lg:flex">

            <div className="absolute -left-40 -top-40 h-[550px] w-[550px] rounded-full bg-[#C8FF4D]/5 blur-[130px]" />

            <div className="absolute -bottom-[200px] -right-[150px] h-[450px] w-[450px] rounded-full bg-emerald-400/5 blur-[120px]" />

            {/* Logo */}
            <div className="relative z-10 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-lg font-bold text-black">
                J
              </div>

              <div>
                <h2 className="text-xl font-semibold leading-none">
                  JobHub
                </h2>

                <p className="mt-1 text-[9px] tracking-[0.25em] text-white/35">
                  FIND YOUR NEXT MOVE
                </p>
              </div>
            </div>

            {/* Main Content */}
            <div className="relative z-10">
              <p className="mb-6 text-xs uppercase tracking-[0.25em] text-[#C8FF4D]/60">
                Start your journey
              </p>

              <h1 className="text-5xl font-semibold leading-[0.95] tracking-[-0.05em] xl:text-6xl">
                Your next move

                <span className="block italic text-white/35">
                  starts here.
                </span>
              </h1>

              <p className="mt-7 max-w-md leading-7 text-white/45">
                Create your JobHub account and discover opportunities
                that match your skills, goals and ambitions.
              </p>

              {/* Benefits */}
              <div className="mt-10 space-y-4">

                <div className="flex items-center gap-3 text-sm text-white/55">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#C8FF4D]/10">
                    <Check
                      size={14}
                      className="text-[#C8FF4D]"
                    />
                  </div>
                  Discover jobs that match your skills
                </div>

                <div className="flex items-center gap-3 text-sm text-white/55">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#C8FF4D]/10">
                    <Check
                      size={14}
                      className="text-[#C8FF4D]"
                    />
                  </div>
                  Save jobs and track applications
                </div>

                <div className="flex items-center gap-3 text-sm text-white/55">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#C8FF4D]/10">
                    <Check
                      size={14}
                      className="text-[#C8FF4D]"
                    />
                  </div>
                  Connect with ambitious companies
                </div>

              </div>
            </div>

            <div className="relative z-10 text-xs text-white/25">
              Build your career. Find your next move.
            </div>
          </div>

          {/* ==================== RIGHT SIDE ==================== */}
          <div className="flex bg-[#F5F6F3] p-7 text-[#101414] sm:p-10 lg:p-12">
            <div className="mx-auto flex w-full max-w-[520px] flex-col justify-center">

              {/* Mobile Logo */}
              <div className="mb-8 flex items-center gap-3 lg:hidden">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#080B0B] font-bold text-white">
                  J
                </div>

                <div>
                  <h2 className="text-lg font-semibold">
                    JobHub
                  </h2>

                  <p className="text-[8px] tracking-[0.2em] text-black/40">
                    FIND YOUR NEXT MOVE
                  </p>
                </div>
              </div>

              {/* Heading */}
              <p className="mb-4 text-xs uppercase tracking-[0.22em] text-black/35">
                Create your account
              </p>

              <h2 className="text-4xl font-semibold tracking-[-0.05em] sm:text-5xl">
                Join JobHub
              </h2>

              <p className="mt-3 text-sm text-black/45">
                Take the first step towards your next opportunity.
              </p>

              {/* ==================== FORM ==================== */}
              <form
                onSubmit={handleRegister}
                 noValidate
                className="mt-8 space-y-4"
              >

                {/* Full Name */}
                <div>
                  <label className="text-sm font-medium">
                    Full name
                  </label>

                  <div className="relative mt-2">
                    <User
                      size={17}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-black/30 "
                    />

                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Enter your full name"
                      required
                    className={`h-13 w-full rounded-xl border bg-white pl-11 pr-4 text-sm outline-none transition
  ${
    filedError.fullName
      ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-100"
      : "border-black/10 focus:border-black/30 focus:ring-2 focus:ring-[#C8FF4D]/20"
  }`}
                    />

                    {filedError.fullName && (
  <p className="mt-1.5 text-xs font-medium text-red-500">
    {filedError.fullName}
  </p>
)}
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="text-sm font-medium">
                    Email address
                  </label>

                  <div className="relative mt-2">
                    <Mail
                      size={17}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-black/30"
                    />

                    <input
                      type="email"
                      value={email}
                     onChange={(e) => {
    setEmail(e.target.value);

    if (
      e.target.value.trim().toLowerCase() !== verifiedEmail
    ) {
      setRegistrationToken("");
      setOtpSent(false);
      setOtp("");
      setVerifiedEmail("");
    }
  }}

    disabled={!!registrationToken || loading}

                      
                      placeholder="you@example.com"
                      required
                     className={`h-13 w-full rounded-xl border bg-white pl-11 pr-4 text-sm outline-none transition
  ${
    filedError.email
      ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-100"
      : "border-black/10 focus:border-black/30 focus:ring-2 focus:ring-[#C8FF4D]/20"
  }`}
                    />

                    {filedError.email && (
  <p className="mt-1.5 text-xs font-medium text-red-500">
    {filedError.email}
  </p>
)}
                  </div>
                </div>

                
{otpSent && (
  <div className="mt-4 space-y-3">
    <label className="text-sm font-medium">
      Email verification code
    </label>

    <input
      type="text"
      inputMode="numeric"
      autoComplete="one-time-code"
      maxLength={6}
      value={otp}
      onChange={(e) =>
        setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
      }
      placeholder="Enter 6-digit OTP"
      disabled={!!registrationToken || loading}
      className="h-13 w-full rounded-xl border border-black/10 bg-white px-4 text-sm outline-none focus:border-black/30 focus:ring-2 focus:ring-[#C8FF4D]/20"
    />

    {registrationToken && (
      <p className="text-sm font-medium text-emerald-700">
        ✓ Email verified successfully
      </p>
    )}
  </div>
)}


                {/* Phone + Location */}
                <div className="grid gap-4 sm:grid-cols-2">

                  {/* Phone */}
                  <div>
                    <label className="text-sm font-medium">
                      Phone number
                    </label>

                    <div className="relative mt-2">
                      <Phone
                        size={17}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-black/30"
                      />

                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="9876543210"
                        maxLength={10}
                        required
                       className={`h-13 w-full rounded-xl border bg-white pl-11 pr-4 text-sm outline-none transition
  ${
    filedError.phone
      ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-100"
      : "border-black/10 focus:border-black/30 focus:ring-2 focus:ring-[#C8FF4D]/20"
  }`}

                   />

                        {filedError.phone && (
  <p className="mt-1.5 text-xs font-medium text-red-500">
    {filedError.phone}
  </p>
)}
     
                    </div>
                  </div>

                  {/* Location */}
                  <div>
                    <label className="text-sm font-medium">
                      Location
                    </label>

                    <div className="relative mt-2">
                      <MapPin
                        size={17}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-black/30"
                      />

                      <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="Delhi, India"
                        required
                          className={`h-13 w-full rounded-xl border bg-white pl-11 pr-4 text-sm outline-none transition
  ${
    filedError.location
      ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-100"
      : "border-black/10 focus:border-black/30 focus:ring-2 focus:ring-[#C8FF4D]/20"
  }`}


                   />

                       {filedError.location && (
  <p className="mt-1.5 text-xs font-medium text-red-500">
    {filedError.location}
  </p>
)}
     
                    </div>
                  </div>

                </div>

                {/* Password */}
                <div>
                  <label className="text-sm font-medium">
                    Password
                  </label>

                  <div className="relative mt-2">
                    <LockKeyhole
                      size={17}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-black/30"
                    />

                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Create a strong password"
                      required
                       className={`h-13 w-full rounded-xl border bg-white pl-11 pr-4 text-sm outline-none transition
  ${
    filedError.password
      ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-100"
      : "border-black/10 focus:border-black/30 focus:ring-2 focus:ring-[#C8FF4D]/20"
  }`}

                   />

                       {filedError.password && (
  <p className="mt-1.5 text-xs font-medium text-red-500">
    {filedError.password}
  </p>
)}
     

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword(!showPassword)
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-black/30 transition hover:text-black"
                    >
                      {showPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="text-sm font-medium">
                    Confirm password
                  </label>

                  <div className="relative mt-2">
                    <LockKeyhole
                      size={17}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-black/30"
                    />

                    <input
                      type={
                        showConfirmPassword
                          ? "text"
                          : "password"
                      }
                      value={confirmPassword}
                      onChange={(e) =>
                        setConfirmPassword(e.target.value)
                      }
                      placeholder="Re-enter your password"
                      required
                      className="h-13 w-full rounded-xl border border-black/10 bg-white pl-11 pr-12 text-sm outline-none transition placeholder:text-black/30 focus:border-black/30 focus:ring-2 focus:ring-[#C8FF4D]/20"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(
                          !showConfirmPassword
                        )
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-black/30 transition hover:text-black"
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>

                  {confirmPassword && (
                    <p
                      className={`mt-2 text-xs font-medium ${
                        password === confirmPassword
                          ? "text-emerald-600"
                          : "text-red-500"
                      }`}
                    >
                      {password === confirmPassword
                        ? "Passwords match"
                        : "Passwords do not match"}
                    </p>
                  )}
                </div>

                {/* Role */}
                <div>
                  <label className="text-sm font-medium">
                    I am joining as
                  </label>

                  <div className="mt-2 grid grid-cols-2 gap-3">

                    {/* Job Seeker */}
                    <button
                      type="button"
                      onClick={() => setRole("JOB_SEEKER")}
                      className={`flex h-16 items-center gap-3 rounded-xl border px-4 text-left transition-all ${
                        role === "JOB_SEEKER"
                          ? "border-[#9dcc35] bg-[#C8FF4D]/15"
                          : "border-black/10 bg-white hover:border-black/20"
                      }`}
                    >
                      <BriefcaseBusiness
                        size={18}
                        className={
                          role === "JOB_SEEKER"
                            ? "text-[#6f9200]"
                            : "text-black/35"
                        }
                      />

                      <div>
                        <p className="text-sm font-medium">
                          Job Seeker
                        </p>

                        <p className="text-[10px] text-black/35">
                          Find opportunities
                        </p>
                      </div>
                    </button>

                    {/* Employer */}
                    <button
                      type="button"
                      onClick={() => setRole("EMPLOYER")}
                      className={`flex h-16 items-center gap-3 rounded-xl border px-4 text-left transition-all ${
                        role === "EMPLOYER"
                          ? "border-[#9dcc35] bg-[#C8FF4D]/15"
                          : "border-black/10 bg-white hover:border-black/20"
                      }`}
                    >
                      <Building2
                        size={18}
                        className={
                          role === "EMPLOYER"
                            ? "text-[#6f9200]"
                            : "text-black/35"
                        }
                      />

                      <div>
                        <p className="text-sm font-medium">
                          Employer
                        </p>

                        <p className="text-[10px] text-black/35">
                          Hire great talent
                        </p>
                      </div>
                    </button>

                  </div>
                </div>

                {/* Terms */}
                <label className="flex cursor-pointer items-start gap-3 text-xs text-black/45">

                  <input
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(e) =>
                      setAgreeTerms(e.target.checked)
                    }
                    className="mt-0.5 accent-[#9dcc35]"
                  />
                  {filedError.agreeTerms && (
  <p className="mt-1.5 text-xs font-medium text-red-500">
    {filedError.agreeTerms}
  </p>
)}

                  <span>
                    I agree to JobHub's{" "}
                    <span className="font-medium text-black">
                      Terms of Service
                    </span>{" "}
                    and{" "}
                    <span className="font-medium text-black">
                      Privacy Policy
                    </span>
                    .
                  </span>

                </label>

                {/* Create Account */}
               
                 <button
  type="submit"
  disabled={loading || !!registrationToken && email.trim().toLowerCase() !== verifiedEmail}
  className="w-full rounded-xl bg-[#C8FF4D] px-5 py-4 font-semibold text-black transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-60"
>
  {loading
    ? "Please wait..."
    : registrationToken
      ? "Create Account"
      : otpSent
        ? "Verify OTP"
        : "Send Verification Code"}

         <ArrowUpRight size={18} />
</button>


              </form>

              {/* Login */}
              <p className="mt-7 text-center text-sm text-black/45">
                Already have an account?

                <Link
                  to="/login"
                  className="ml-1 font-medium text-black hover:underline"
                >
                  Sign in
                </Link>
              </p>

              {/* Security Note */}
              <div className="mt-7 border-t border-black/10 pt-5 text-center">
                <p className="text-[11px] text-black/30">
                  Your information is securely handled by JobHub.
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </>
  );
}

export default Register;
