import { Link } from "react-router-dom";
import NavBar from "../../component/NavBar";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Bell,
  BriefcaseBusiness,
  Check,
  ChevronRight,
  Clock3,
  Edit3,
  FileCheck2,
  FileText,
  Globe2,
  Link2,
  LockKeyhole,
  Mail,
  MapPin,
  Paperclip,
  Send,
  ShieldCheck,
  Sparkles,
  UserRound,
} from "lucide-react";

function ReviewSubmit() {
  return (
    <>
    <div className="min-h-screen bg-[#f7faf8] text-[#101b2e]">

      {/* =====================================================
          ANIMATION
      ===================================================== */}

      <style>{`
        @keyframes jobhubReveal {
          0% {
            opacity: 0;
            transform: translateY(28px);
          }

          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes jobhubScale {
          0% {
            opacity: 0;
            transform: scale(.97);
          }

          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes softPulse {
          0%, 100% {
            transform: scale(1);
          }

          50% {
            transform: scale(1.04);
          }
        }

        .jobhub-reveal {
          opacity: 0;
          animation: jobhubReveal .8s cubic-bezier(.22,1,.36,1) forwards;
        }

        .jobhub-scale {
          opacity: 0;
          animation: jobhubScale .8s cubic-bezier(.22,1,.36,1) forwards;
        }

        .jobhub-pulse {
          animation: softPulse 2.8s ease-in-out infinite;
        }

        .delay-1 {
          animation-delay: .2s;
        }

        .delay-2 {
          animation-delay: .4s;
        }

        .delay-3 {
          animation-delay: .6s;
        }

        .delay-4 {
          animation-delay: .8s;
        }

        .delay-5 {
          animation-delay: 1s;
        }

        @media (prefers-reduced-motion: reduce) {
          .jobhub-reveal,
          .jobhub-scale,
          .jobhub-pulse {
            animation: none;
            opacity: 1;
            transform: none;
          }
        }
      `}</style>


      {/* =====================================================
          NAVBAR
      ===================================================== */}
<NavBar/>



      {/* =====================================================
          BREADCRUMB
      ===================================================== */}

      <div className="jobhub-reveal delay-1 mx-auto flex w-[94%] max-w-[1450px] items-center gap-2 overflow-hidden whitespace-nowrap py-4 text-[12px] text-[#697570]">

        <Link
          to="/"
          className="text-inherit no-underline"
        >
          Home
        </Link>

        <ChevronRight size={14} />

        <Link
          to="/jobs"
          className="text-inherit no-underline"
        >
          Jobs
        </Link>

        <ChevronRight size={14} />

        <span>
          Senior Frontend Developer
        </span>

        <ChevronRight size={14} />

        <span className="font-semibold text-[#17231f]">
          Apply
        </span>

      </div>



      {/* =====================================================
          MAIN
      ===================================================== */}

      <main className="mx-auto grid w-[94%] max-w-[1450px] grid-cols-1 gap-4 pb-8 xl:grid-cols-[380px_minmax(0,1fr)_250px]">


        {/* ===================================================
            LEFT SIDEBAR
        =================================================== */}

        <aside className="space-y-4">


          {/* JOB CARD */}

          <section className="jobhub-reveal delay-1 rounded-[15px] border border-[#e0e8e4] bg-white p-5">

            <div className="flex items-center gap-4">

              <div className="flex h-[68px] w-[68px] items-center justify-center rounded-[13px] border border-[#e0e7e3] text-[42px] font-bold shadow-sm">
                G
              </div>


              <div>

                <div className="flex flex-wrap items-center gap-2">

                  <h2 className="text-[19px] font-bold">
                    Google
                  </h2>

                  <span className="flex items-center gap-1 rounded-full bg-[#e0f6e5] px-2.5 py-1 text-[10px] font-semibold text-[#197444]">

                    <Check size={11} />

                    Verified Employer

                  </span>

                </div>


                <p className="mt-2 text-[13px] text-[#68756f]">
                  Build for everyone. Make the world more helpful.
                </p>

              </div>

            </div>


            <h1 className="mt-5 text-[27px] font-bold leading-[1.08] tracking-[-1.2px]">
              Senior Frontend Developer
            </h1>


            <div className="mt-5 space-y-3 text-[13px] text-[#53615c]">

              <JobInfo
                icon={<MapPin size={18} />}
                text="Bangalore, India"
              />

              <JobInfo
                icon={<BriefcaseBusiness size={18} />}
                text="Full-time"
              />

              <JobInfo
                icon={<span className="h-4 w-4 rounded-[3px] border-2 border-[#08704b]" />}
                text="On-site"
              />

              <JobInfo
                icon={<BarChart3 size={18} />}
                text="Senior Level"
              />

            </div>


            <div className="mt-5 flex flex-wrap items-center gap-3 border-b border-[#e5ebe8] pb-5">

              <span className="text-[15px] font-bold">
                ₹25L – 40L per annum
              </span>

              <span className="rounded-full bg-[#def5df] px-3 py-1.5 text-[10px] font-semibold text-[#277342]">
                ↗ Market Range
              </span>

            </div>


            <h3 className="mt-4 text-[15px] font-bold">
              Skills Required
            </h3>


            <div className="mt-3 flex flex-wrap gap-2">

              <Skill text="React" />
              <Skill text="TypeScript" />
              <Skill text="Next.js" />
              <Skill text="JavaScript" />
              <Skill text="CSS" />
              <Skill text="HTML" />
              <Skill text="Frontend" />
              <Skill text="UI/UX" />

            </div>

          </section>



          {/* GREEN MESSAGE */}

          <section className="jobhub-reveal delay-2 rounded-[15px] bg-gradient-to-br from-[#effced] to-[#e3f8e7] p-5">

            <div className="flex items-center gap-4">

              <div className="jobhub-pulse flex h-[78px] w-[78px] shrink-0 items-center justify-center rounded-full bg-white/70">

                <div className="flex h-14 w-14 items-center justify-center rounded-[11px] bg-[#08704b] text-white">

                  <FileCheck2 size={27} />

                </div>

              </div>


              <div>

                <h3 className="text-[16px] font-bold leading-[1.35] text-[#096443]">
                  You're almost there!
                </h3>

                <p className="mt-2 text-[13px] leading-[1.45] text-[#63716b]">
                  Review your details and submit your application.
                </p>

              </div>

            </div>

          </section>



          {/* APPLICATION PROCESS */}

          <section className="jobhub-reveal delay-3 rounded-[15px] border border-[#e0e8e4] bg-white p-5">

            <h2 className="text-[16px] font-bold">
              Application Process
            </h2>


            <div className="mt-5 space-y-5">


              <ProcessStep
                number="✓"
                active
                title="Personal Information"
                description="Basic details about you"
              />


              <ProcessStep
                number="✓"
                active
                title="Resume & Documents"
                description="Upload your resume and cover letter"
              />


              <ProcessStep
                number="✓"
                active
                title="Additional Details"
                description="Provide more information"
              />


              <ProcessStep
                number="4"
                current
                title="Review & Submit"
                description="Check your details and submit"
              />

            </div>

          </section>

        </aside>



        {/* ===================================================
            CENTER
        =================================================== */}

        <section className="min-w-0">


          {/* =================================================
              STEPPER
          ================================================= */}

          <div className="jobhub-scale delay-1 rounded-[15px] border border-[#e0e8e4] bg-white px-6 py-5">

            <div className="grid grid-cols-4">


              <TopStep
                number="✓"
                title="Personal Info"
                completed
              />


              <TopStep
                number="✓"
                title="Resume & Documents"
                completed
              />


              <TopStep
                number="✓"
                title="Additional Details"
                completed
              />


              <TopStep
                number="4"
                title="Review & Submit"
                active
              />

            </div>

          </div>



          {/* =================================================
              REVIEW CARD
          ================================================= */}

          <section className="jobhub-reveal delay-2 mt-3 overflow-hidden rounded-[15px] border border-[#e0e8e4] bg-white">


            {/* HEADER */}

            <div className="flex items-center gap-4 px-7 pb-5 pt-7">

              <div className="flex h-[58px] w-[58px] shrink-0 items-center justify-center rounded-[14px] bg-[#e9f8e8] text-[#08704b]">

                <FileCheck2 size={29} />

              </div>


              <div>

                <p className="text-[13px] text-[#6c7974]">
                  Step 4 of 4
                </p>

                <h2 className="text-[27px] font-bold tracking-[-1px]">
                  Review & Submit
                </h2>

                <p className="mt-1 text-[13px] text-[#697670]">
                  Please review your application details before submitting.
                </p>

              </div>

            </div>



            {/* REVIEW GRID */}

            <div className="grid grid-cols-1 gap-3 px-4 pb-4 sm:px-5 lg:grid-cols-2">


              {/* =============================================
                  PERSONAL INFORMATION
              ============================================= */}

              <ReviewCard
                icon={<UserRound size={19} />}
                title="Personal Information"
              >

                <ReviewRow
                  icon={<UserRound size={16} />}
                  label="Full Name"
                  value="Ankit Kumar"
                />

                <ReviewRow
                  icon={<Mail size={16} />}
                  label="Email"
                  value="ankit@example.com"
                />

                <ReviewRow
                  icon={<span className="text-[16px]">⌕</span>}
                  label="Phone"
                  value="+91 98765 43210"
                />

                <ReviewRow
                  icon={<MapPin size={16} />}
                  label="Location"
                  value="Bangalore, India"
                />

                <ReviewRow
                  icon={<BriefcaseBusiness size={16} />}
                  label="LinkedIn"
                  value="https://linkedin.com/in/ankitkumar"
                  blue
                />

                <ReviewRow
                  icon={<Link2 size={16} />}
                  label="Portfolio"
                  value="https://ankit.dev"
                  blue
                />

              </ReviewCard>



              {/* =============================================
                  RESUME
              ============================================= */}

              <ReviewCard
                icon={<FileText size={19} />}
                title="Resume & Documents"
              >

                <DocumentRow
                  icon={<FileText size={17} />}
                  label="Resume"
                  value="Ankit_Kumar_Resume.pdf"
                  extra="2.4 MB"
                />

                <DocumentRow
                  icon={<FileText size={17} />}
                  label="Cover Letter"
                  value="Provided"
                />

                <DocumentRow
                  icon={<Paperclip size={17} />}
                  label="Additional Documents"
                  value="1 file"
                />

              </ReviewCard>



              {/* =============================================
                  ADDITIONAL DETAILS
              ============================================= */}

              <ReviewCard
                icon={<Sparkles size={19} />}
                title="Additional Details"
              >

                <ReviewRow
                  icon={<BarChart3 size={16} />}
                  label="Key Skills"
                  value="React, JavaScript, TypeScript, Next.js,..."
                />

                <ReviewRow
                  icon={<BarChart3 size={16} />}
                  label="Experience"
                  value="5 - 7 years"
                />

                <ReviewRow
                  icon={<span className="font-bold">₹</span>}
                  label="Expected Salary"
                  value="₹25L – 35L per annum"
                />

                <ReviewRow
                  icon={<Clock3 size={16} />}
                  label="Notice Period"
                  value="30 days"
                />

                <ReviewRow
                  icon={<BriefcaseBusiness size={16} />}
                  label="Preferred Job Type"
                  value="Full-time"
                />

                <ReviewRow
                  icon={<Globe2 size={16} />}
                  label="Work Authorization"
                  value="Open to work"
                />

                <ReviewRow
                  icon={<ArrowUpRight size={16} />}
                  label="Willing to Relocate"
                  value="Yes"
                />

                <ReviewRow
                  icon={<span className="text-[16px]">⌁</span>}
                  label="How did you hear?"
                  value="LinkedIn"
                />

                <ReviewRow
                  icon={<span className="text-[16px]">○</span>}
                  label="Additional Info"
                  value="Looking forward to contributing..."
                />

              </ReviewCard>



              {/* =============================================
                  JOB DETAILS
              ============================================= */}

              <ReviewCard
                icon={<BriefcaseBusiness size={19} />}
                title="Job Details"
              >

                <ReviewRow
                  icon={<BriefcaseBusiness size={16} />}
                  label="Company"
                  value="Google"
                />

                <ReviewRow
                  icon={<FileCheck2 size={16} />}
                  label="Position"
                  value="Senior Frontend Developer"
                />

                <ReviewRow
                  icon={<MapPin size={16} />}
                  label="Location"
                  value="Bangalore, India"
                />

                <ReviewRow
                  icon={<Clock3 size={16} />}
                  label="Job Type"
                  value="Full-time (On-site)"
                />

                <ReviewRow
                  icon={<BarChart3 size={16} />}
                  label="Experience Level"
                  value="Senior Level"
                />

                <ReviewRow
                  icon={<span className="font-bold">₹</span>}
                  label="Salary Range"
                  value="₹25L – 40L per annum"
                />

              </ReviewCard>

            </div>



            {/* =================================================
                CONFIRMATION
            ================================================= */}

            <div className="mx-4 mb-4 flex items-start gap-3 rounded-[11px] bg-[#eaf9eb] px-4 py-3 sm:mx-5">

              <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-[4px] bg-[#08704b] text-white">

                <Check size={13} />

              </div>


              <p className="text-[11px] leading-[1.55] text-[#4c6358]">

                I confirm that all the information provided is accurate and complete to the best of my knowledge.
                I understand that providing false information may result in the rejection of my application.

              </p>


              <a
                href="#terms"
                className="hidden shrink-0 text-[11px] font-semibold text-[#096443] underline lg:block"
              >
                View Terms & Conditions
              </a>

            </div>



            {/* =================================================
                BUTTONS
            ================================================= */}

            <div className="flex flex-col-reverse justify-between gap-4 border-t border-[#e5ebe8] px-5 py-5 sm:flex-row sm:items-center">

              <Link
                to="/jobs/8/apply/additional"
                className="flex w-fit items-center gap-2 rounded-[9px] border border-[#d0dad5] bg-white px-5 py-3 text-[14px] font-semibold text-[#27342f] no-underline transition hover:bg-[#f3f7f5]"
              >

                <ArrowLeft size={18} />

                Back

              </Link>


              <button
                type="button"
                className="flex items-center justify-center gap-3 rounded-[9px] bg-[#00634b] px-7 py-3.5 text-[14px] font-bold text-white shadow-[0_8px_22px_rgba(0,90,65,.18)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#074b3b]"
              >

                <Send size={17} />

                Submit Application

                <ArrowRight size={18} />

              </button>

            </div>

          </section>

        </section>



        {/* ===================================================
            RIGHT SIDEBAR
        =================================================== */}

        <aside className="space-y-4">


          {/* READY CARD */}

          <section className="jobhub-reveal delay-3 rounded-[15px] border border-[#e1e8e4] bg-white p-6 text-center">

            <div className="jobhub-pulse mx-auto flex h-[115px] w-[115px] items-center justify-center rounded-full bg-[#eef9ec]">

              <div className="flex h-[68px] w-[68px] flex-col items-center justify-center rounded-[11px] bg-[#dff6df] text-[#08704b]">

                <FileCheck2 size={34} />

                <Check
                  size={14}
                  className="-mt-1"
                />

              </div>

            </div>


            <h2 className="mt-5 text-[22px] font-bold">
              You're ready!
            </h2>


            <p className="mt-2 text-[13px] leading-[1.45] text-[#6e7b76]">
              Take the next step towards your dream career at Google.
            </p>

          </section>



          {/* WHAT HAPPENS NEXT */}

          <section className="jobhub-reveal delay-4 rounded-[15px] bg-gradient-to-br from-[#effaf0] to-[#e8f7e9] p-5">

            <h2 className="text-[16px] font-bold">
              What happens next?
            </h2>


            <div className="mt-5 space-y-5">


              <NextStep
                icon={<Mail size={18} />}
                title="Application Submitted"
                description="You'll receive a confirmation email shortly."
              />


              <NextStep
                icon={<UserRound size={18} />}
                title="Application Review"
                description="Our team will review your application."
              />


              <NextStep
                icon={<BriefcaseBusiness size={18} />}
                title="Interview Process"
                description="If shortlisted, you'll be invited for an interview."
              />


              <NextStep
                icon={<Bell size={18} />}
                title="Final Decision"
                description="We'll notify you of the final status."
              />

            </div>

          </section>



          {/* QUOTE */}

          <section className="jobhub-reveal delay-4 rounded-[15px] border border-[#e2e8e5] bg-white p-6">

            <p className="font-serif text-[18px] italic leading-[1.5] text-[#66736e]">
              “Great things happen when the right people come together.”
            </p>


            <p className="mt-3 text-[13px] font-semibold text-[#68756f]">
              — Google
            </p>

          </section>



          {/* SECURITY */}

          <section className="jobhub-reveal delay-5 rounded-[15px] bg-gradient-to-br from-[#effaf0] to-[#f5fcf3] p-5">

            <div className="flex items-start gap-3">

              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#ddf5df] text-[#08704b]">

                <ShieldCheck size={21} />

              </div>


              <div>

                <h3 className="text-[13px] font-bold text-[#09613f]">
                  Your information is secure
                </h3>


                <p className="mt-2 text-[11px] leading-[1.5] text-[#68766f]">
                  We use industry-standard encryption to keep your data safe.
                </p>

              </div>

            </div>

          </section>

        </aside>

      </main>

    </div>

    </>
  );
}



/* ============================================================
   JOB INFO
============================================================ */

function JobInfo({ icon, text }) {
  return (
    <div className="flex items-center gap-3">

      <span className="text-[#08704b]">
        {icon}
      </span>

      <span>
        {text}
      </span>

    </div>
  );
}



/* ============================================================
   SKILL
============================================================ */

function Skill({ text }) {
  return (
    <span className="rounded-full bg-[#f0f3f2] px-3.5 py-1.5 text-[11px] text-[#263631]">
      {text}
    </span>
  );
}



/* ============================================================
   PROCESS STEP
============================================================ */

function ProcessStep({
  number,
  title,
  description,
  active,
  current,
}) {
  return (
    <div className="flex gap-4">

      <div
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[13px] font-bold ${
          active || current
            ? "bg-[#08704b] text-white"
            : "bg-[#edf1ef] text-[#45534e]"
        }`}
      >
        {number}
      </div>


      <div>

        <h3
          className={`text-[13px] font-bold ${
            active || current
              ? "text-[#08704b]"
              : "text-[#45534e]"
          }`}
        >
          {title}
        </h3>


        <p className="mt-1 text-[11px] leading-[1.4] text-[#78847f]">
          {description}
        </p>

      </div>

    </div>
  );
}



/* ============================================================
   TOP STEP
============================================================ */

function TopStep({
  number,
  title,
  completed,
  active,
}) {
  return (
    <div className="relative flex flex-col items-center text-center">

      <div
        className={`flex h-9 w-9 items-center justify-center rounded-full text-[13px] font-bold ${
          completed || active
            ? "bg-[#08704b] text-white shadow-[0_0_0_5px_#e9f5eb]"
            : "bg-[#edf1ef] text-[#45534e]"
        }`}
      >

        {completed ? (
          <Check size={17} />
        ) : (
          number
        )}

      </div>


      <span
        className={`mt-3 text-[11px] ${
          completed || active
            ? "font-semibold text-[#08704b]"
            : "text-[#697570]"
        }`}
      >
        {title}
      </span>

    </div>
  );
}



/* ============================================================
   REVIEW CARD
============================================================ */

function ReviewCard({
  icon,
  title,
  children,
}) {
  return (
    <div className="rounded-[12px] border border-[#e1e8e4] bg-white p-4">

      <div className="mb-4 flex items-center justify-between">

        <div className="flex items-center gap-3">

          <div className="flex h-8 w-8 items-center justify-center rounded-[9px] bg-[#eaf8e9] text-[#08704b]">
            {icon}
          </div>


          <h3 className="text-[14px] font-bold">
            {title}
          </h3>

        </div>


        <button
          type="button"
          className="flex items-center gap-2 rounded-[8px] border border-[#dce4e0] px-3 py-1.5 text-[11px] font-semibold text-[#40504a] transition hover:bg-[#f3f7f5]"
        >

          <Edit3 size={13} />

          Edit

        </button>

      </div>


      <div className="space-y-3">
        {children}
      </div>

    </div>
  );
}



/* ============================================================
   REVIEW ROW
============================================================ */

function ReviewRow({
  icon,
  label,
  value,
  blue,
}) {
  return (
    <div className="grid grid-cols-[18px_90px_minmax(0,1fr)] items-start gap-2 text-[11px]">

      <span className="mt-0.5 text-[#596861]">
        {icon}
      </span>


      <span className="text-[#56645f]">
        {label}
      </span>


      <span
        className={`min-w-0 truncate ${
          blue
            ? "text-[#006fc0]"
            : "text-[#293832]"
        }`}
      >
        {value}
      </span>

    </div>
  );
}



/* ============================================================
   DOCUMENT ROW
============================================================ */

function DocumentRow({
  icon,
  label,
  value,
  extra,
}) {
  return (
    <div className="grid grid-cols-[18px_90px_minmax(0,1fr)] items-center gap-2 text-[11px]">

      <span className="text-[#56645f]">
        {icon}
      </span>


      <span className="text-[#56645f]">
        {label}
      </span>


      <div className="flex min-w-0 items-center justify-between rounded-[9px] bg-[#f6f8f7] px-3 py-2">

        <div className="min-w-0">

          <p className="truncate text-[11px] text-[#3e4c47]">
            {value}
          </p>

          {extra && (
            <p className="mt-0.5 text-[9px] text-[#7b8682]">
              {extra}
            </p>
          )}

        </div>


        <span className="ml-2 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#08704b] text-white">

          <Check size={11} />

        </span>

      </div>

    </div>
  );
}



/* ============================================================
   NEXT STEP
============================================================ */

function NextStep({
  icon,
  title,
  description,
}) {
  return (
    <div className="flex items-start gap-3">

      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-[#08704b] shadow-sm">

        {icon}

      </div>


      <div>

        <h3 className="text-[12px] font-bold text-[#14633f]">
          {title}
        </h3>


        <p className="mt-1 text-[10px] leading-[1.45] text-[#61716a]">
          {description}
        </p>

      </div>

    </div>
  );
}


export default ReviewSubmit;