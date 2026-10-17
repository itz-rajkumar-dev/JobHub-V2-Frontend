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
  ChevronDown,
  ChevronRight,
  Clock3,
  FileCheck2,
  Globe2,
  HeartPulse,
  Lightbulb,
  Megaphone,
  MapPin,
  Search,
  ShieldCheck,
  Sparkles,
  UserRound,
} from "lucide-react";

function AdditionalDetails() {


  return (

    <>
    <div className="min-h-screen bg-[#f7faf8] text-[#101b2e]">

      {/* =====================================================
          ANIMATIONS
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

        .jobhub-reveal {
          opacity: 0;
          animation: jobhubReveal .8s cubic-bezier(.22,1,.36,1) forwards;
        }

        .jobhub-scale {
          opacity: 0;
          animation: jobhubScale .8s cubic-bezier(.22,1,.36,1) forwards;
        }

        .delay-1 {
          animation-delay: .25s;
        }

        .delay-2 {
          animation-delay: .5s;
        }

        .delay-3 {
          animation-delay: .8s;
        }

        .delay-4 {
          animation-delay: 1.1s;
        }

        .delay-5 {
          animation-delay: 1.4s;
        }

        .jobhub-input:hover {
          border-color: #b9cbc2;
        }

        @media (prefers-reduced-motion: reduce) {
          .jobhub-reveal,
          .jobhub-scale {
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

      <div className="jobhub-reveal delay-1 mx-auto flex w-[94%] max-w-[1450px] items-center gap-2 overflow-hidden whitespace-nowrap py-4 text-[12px] text-[#68746f]">

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

        <span className="font-semibold text-[#17241f]">
          Apply
        </span>

      </div>



      {/* =====================================================
          MAIN LAYOUT
      ===================================================== */}

      <main className="mx-auto grid w-[94%] max-w-[1450px] grid-cols-1 gap-4 pb-8 lg:grid-cols-[380px_minmax(0,1fr)]">


        {/* ===================================================
            LEFT SIDEBAR
        =================================================== */}

        <aside className="space-y-4">


          {/* =================================================
              JOB CARD
          ================================================= */}

          <section className="jobhub-reveal delay-1 rounded-[15px] border border-[#e1e8e4] bg-white p-5 shadow-[0_5px_25px_rgba(20,60,40,.025)]">


            {/* COMPANY */}

            <div className="flex items-center gap-4">

              <div className="flex h-[70px] w-[70px] shrink-0 items-center justify-center rounded-[13px] border border-[#e0e7e3] bg-white text-[43px] font-bold shadow-sm">
                G
              </div>


              <div className="min-w-0">

                <div className="flex flex-wrap items-center gap-2">

                  <h2 className="text-[19px] font-bold">
                    Google
                  </h2>


                  <span className="flex items-center gap-1 rounded-full bg-[#e2f7e8] px-2.5 py-1 text-[10px] font-semibold text-[#197343]">

                    <Check size={11} />

                    Verified Employer

                  </span>

                </div>


                <p className="mt-2 text-[13px] leading-[1.45] text-[#6d7975]">
                  Build for everyone. Make the world more helpful.
                </p>

              </div>

            </div>



            {/* TITLE */}

            <h1 className="mt-5 text-[28px] font-bold leading-[1.08] tracking-[-1.3px]">
              Senior Frontend Developer
            </h1>



            {/* JOB DETAILS */}

            <div className="mt-5 space-y-3 text-[13px] text-[#66736e]">

              <div className="flex items-center gap-3">

                <MapPin
                  size={18}
                  className="text-[#08704b]"
                />

                Bangalore, India

              </div>


              <div className="flex items-center gap-3">

                <BriefcaseBusiness
                  size={18}
                  className="text-[#08704b]"
                />

                Full-time

              </div>


              <div className="flex items-center gap-3">

                <span className="h-4 w-4 rounded-[3px] border-2 border-[#08704b]" />

                On-site

              </div>


              <div className="flex items-center gap-3">

                <BarChart3
                  size={18}
                  className="text-[#08704b]"
                />

                Senior Level

              </div>

            </div>



            {/* SALARY */}

            <div className="mt-5 flex flex-wrap items-center gap-3 border-b border-[#e5eae7] pb-5">

              <span className="text-[15px] font-bold">
                ₹25L – 40L per annum
              </span>


              <span className="rounded-full bg-[#ddf6df] px-3 py-1.5 text-[10px] font-semibold text-[#287443]">
                ↗ Market Range
              </span>

            </div>



            {/* SKILLS */}

            <h3 className="mt-4 text-[15px] font-bold">
              Skills Required
            </h3>


            <div className="mt-3 flex flex-wrap gap-2">

              <Skill name="React" />
              <Skill name="TypeScript" />
              <Skill name="Next.js" />
              <Skill name="JavaScript" />
              <Skill name="CSS" />
              <Skill name="HTML" />
              <Skill name="Frontend" />
              <Skill name="UI/UX" />

            </div>

          </section>



          {/* =================================================
              GREEN OPPORTUNITY CARD
          ================================================= */}

          <section className="jobhub-reveal delay-2 rounded-[15px] bg-gradient-to-br from-[#effced] to-[#e2f8e6] p-5">

            <div className="flex items-center gap-4">

              <div className="flex h-[82px] w-[82px] shrink-0 items-center justify-center rounded-full bg-white/70">

                <div className="relative flex h-14 w-14 items-center justify-center rounded-[11px] bg-[#08704b] text-white">

                  <FileCheck2 size={28} />

                  <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-[#b8f27b] text-[#0d553d]">

                    <Check size={14} />

                  </span>

                </div>

              </div>


              <div>

                <h3 className="text-[16px] font-bold leading-[1.35] text-[#086344]">
                  You're one step closer to an amazing opportunity!
                </h3>

                <p className="mt-2 text-[13px] leading-[1.45] text-[#60716a]">
                  Complete your application and showcase your potential.
                </p>

              </div>

            </div>

          </section>



          {/* =================================================
              APPLICATION PROCESS
          ================================================= */}

          <section className="jobhub-reveal delay-3 rounded-[15px] border border-[#e1e8e4] bg-white p-5">

            <h2 className="text-[16px] font-bold">
              Application Process
            </h2>


            <div className="mt-5 space-y-5">


              {/* STEP 1 */}

              <ProcessStep
                number="✓"
                active
                title="Personal Information"
                description="Basic details about you"
              />


              {/* STEP 2 */}

              <ProcessStep
                number="✓"
                active
                title="Resume & Documents"
                description="Upload your resume and cover letter"
              />


              {/* STEP 3 */}

              <ProcessStep
                number="3"
                current
                title="Additional Details"
                description="Provide more information"
              />


              {/* STEP 4 */}

              <ProcessStep
                number="4"
                title="Review & Submit"
                description="Check your details and submit"
              />

            </div>

          </section>

        </aside>



        {/* ===================================================
            RIGHT SIDE
        =================================================== */}

        <section className="min-w-0">


          {/* =================================================
              AUTO SAVE MESSAGE
          ================================================= */}

          <div className="jobhub-reveal delay-1 mb-2 flex justify-end">

            <div className="flex items-center gap-2 rounded-full bg-[#e6f7e7] px-4 py-2 text-[11px] font-medium text-[#28734a]">

              <ShieldCheck size={15} />

              Your progress is saved automatically.

            </div>

          </div>



          {/* =================================================
              STEPPER
          ================================================= */}

          <div className="jobhub-scale delay-2 rounded-[15px] border border-[#e1e8e4] bg-white px-7 py-6">


            <div className="grid grid-cols-4">


              {/* 1 */}

              <Step
                number="✓"
                title="Personal Info"
                completed
              />


              {/* 2 */}

              <Step
                number="✓"
                title="Resume & Documents"
                completed
              />


              {/* 3 */}

              <Step
                number="3"
                title="Additional Details"
                active
              />


              {/* 4 */}

              <Step
                number="4"
                title="Review & Submit"
              />

            </div>

          </div>



          {/* =================================================
              ADDITIONAL DETAILS CARD
          ================================================= */}

          <section className="jobhub-reveal delay-3 mt-3 overflow-hidden rounded-[15px] border border-[#e1e8e4] bg-white">


            {/* ===============================================
                HEADER
            =============================================== */}

            <div className="px-7 pt-7 sm:px-8">


              <div className="flex items-start gap-4">


                <div className="flex h-[58px] w-[58px] shrink-0 items-center justify-center rounded-[14px] bg-[#eaf8e9] text-[#08704b]">

                  <FileCheck2 size={29} />

                </div>


                <div>

                  <p className="text-[13px] text-[#68746f]">
                    Step 3 of 4
                  </p>


                  <h2 className="text-[28px] font-bold tracking-[-1.1px]">
                    Additional Details
                  </h2>


                  <p className="mt-1 text-[14px] text-[#6f7b77]">
                    Help us understand more about your profile and preferences.
                  </p>

                </div>

              </div>

            </div>



            {/* ===============================================
                FORM AREA
            =============================================== */}

            <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_280px]">


              {/* =============================================
                  LEFT FORM
              ============================================= */}

              <div className="px-7 pb-7 pt-6 sm:px-8">


                <div className="grid grid-cols-1 gap-x-7 md:grid-cols-2">


                  {/* =========================================
                      LEFT COLUMN
                  ========================================= */}

                  <div className="space-y-5">


                    {/* KEY SKILLS */}

                    <div>

                      <label className="mb-2 block text-[14px] font-bold">

                        Key Skills

                        <span className="text-red-500">
                          *
                        </span>

                      </label>


                      <div className="jobhub-input flex h-[43px] items-center gap-2 rounded-[9px] border border-[#dbe3df] px-3 transition">

                        <Search
                          size={18}
                          className="text-[#64736d]"
                        />

                        <span className="text-[12px] text-[#6e7a76]">
                          Search and add skills (e.g. React, Java, AWS)
                        </span>

                      </div>


                      {/* SELECTED SKILLS */}

                      <div className="mt-2.5 flex flex-wrap gap-2">


                        <SelectedSkill name="React" />
                        <SelectedSkill name="JavaScript" />
                        <SelectedSkill name="TypeScript" />
                        <SelectedSkill name="Next.js" />
                        <SelectedSkill name="HTML" />
                        <SelectedSkill name="CSS" />

                      </div>

                    </div>



                    {/* EXPECTED SALARY */}

                    <div>

                      <label className="mb-2 block text-[14px] font-bold">

                        Expected Salary (Annual)

                        <span className="text-red-500">
                          *
                        </span>

                      </label>


                      <SelectBox
                        icon={<span className="text-[19px] font-semibold">₹</span>}
                        text="Select expected salary range"
                      />

                    </div>



                    {/* NOTICE PERIOD */}

                    <div>

                      <label className="mb-2 block text-[14px] font-bold">

                        Notice Period

                        <span className="text-red-500">
                          *
                        </span>

                      </label>


                      <SelectBox
                        icon={<Clock3 size={18} />}
                        text="Select notice period"
                      />

                    </div>



                    {/* RELOCATION */}

                    <div>

                      <label className="mb-3 block text-[14px] font-bold">

                        Willing to Relocate?

                        <span className="text-red-500">
                          *
                        </span>

                      </label>


                      <div className="flex flex-wrap items-center gap-7">


                        <RadioOption
                          selected
                          text="Yes"
                        />


                        <RadioOption
                          text="No"
                        />


                        <RadioOption
                          text="Maybe"
                        />

                      </div>

                    </div>



                    {/* HOW HEARD */}

                    <div>

                      <label className="mb-2 block text-[14px] font-bold">

                        How did you hear about this job?

                        <span className="text-red-500">
                          *
                        </span>

                      </label>


                      <SelectBox
                        icon={<Megaphone size={18} />}
                        text="Select an option"
                      />

                    </div>

                  </div>



                  {/* =========================================
                      RIGHT COLUMN
                  ========================================= */}

                  <div className="mt-6 space-y-5 border-t border-[#edf0ef] pt-6 md:mt-0 md:border-l md:border-t-0 md:pl-7 md:pt-0">


                    {/* EXPERIENCE */}

                    <div>

                      <label className="mb-2 block text-[14px] font-bold">

                        Years of Experience

                        <span className="text-red-500">
                          *
                        </span>

                      </label>


                      <SelectBox
                        icon={<BriefcaseBusiness size={18} />}
                        text="Select experience"
                      />

                    </div>



                    {/* LOCATION */}

                    <div>

                      <label className="mb-2 block text-[14px] font-bold">

                        Current Location

                        <span className="text-red-500">
                          *
                        </span>

                      </label>


                      <div className="jobhub-input flex h-[43px] items-center gap-3 rounded-[9px] border border-[#dbe3df] px-3 transition">

                        <MapPin
                          size={18}
                          className="text-[#53615c]"
                        />

                        <span className="text-[12px] text-[#45534e]">
                          Bangalore, India
                        </span>

                      </div>

                    </div>



                    {/* WORK AUTHORIZATION */}

                    <div>

                      <label className="mb-2 block text-[14px] font-bold">

                        Work Authorization

                        <span className="text-red-500">
                          *
                        </span>

                      </label>


                      <SelectBox
                        icon={<ShieldCheck size={18} />}
                        text="Select option"
                      />

                    </div>



                    {/* PREFERRED JOB TYPE */}

                    <div>

                      <label className="mb-3 block text-[14px] font-bold">

                        Preferred Job Type

                        <span className="text-red-500">
                          *
                        </span>

                      </label>


                      <div className="space-y-3">


                        <JobType
                          selected
                          text="Full-time"
                        />


                        <JobType
                          text="Part-time"
                        />


                        <JobType
                          text="Contract"
                        />


                        <JobType
                          green
                          text="Internship"
                        />

                      </div>

                    </div>



                    {/* ADDITIONAL INFORMATION */}

                    <div>

                      <label className="mb-2 block text-[14px] font-bold">

                        Additional Information

                        <span className="font-normal text-[#737e7a]">
                          {" "} (Optional)
                        </span>

                      </label>


                      <div className="relative">

                        <textarea
                          className="h-[86px] w-full resize-none rounded-[9px] border border-[#dbe3df] p-3 text-[12px] outline-none placeholder:text-[#84908b] focus:border-[#08704b]"
                          placeholder="Is there anything else you'd like us to know?"
                        />


                        <span className="absolute bottom-2 right-3 text-[10px] text-[#7c8783]">
                          0/500
                        </span>

                      </div>

                    </div>

                  </div>

                </div>

              </div>



              {/* =============================================
                  RIGHT TIPS
              ============================================= */}

              <aside className="border-l border-[#e7ece9] bg-white p-6">


                {/* TIPS CARD */}

                <div className="rounded-[12px] bg-gradient-to-br from-[#effaf0] to-[#f5fcf2] p-5">


                  <div className="flex items-center gap-3">

                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#dcf5df] text-[#08704b]">

                      <Lightbulb size={19} />

                    </div>


                    <h3 className="text-[14px] font-bold text-[#09613f]">
                      Tips for a stronger application
                    </h3>

                  </div>


                  <div className="mt-4 space-y-3">

                    <Tip text="Add relevant skills and technologies" />

                    <Tip text="Be realistic with your salary expectations" />

                    <Tip text="Mention your notice period" />

                    <Tip text="Complete all required fields" />

                  </div>

                </div>



                {/* QUOTE */}

                <div className="mt-5 rounded-[12px] bg-[#fafcfb] p-6">

                  <p className="font-serif text-[16px] italic leading-[1.55] text-[#68766f]">

                    “Great opportunities happen when preparation meets action.”

                  </p>


                  <div className="mt-4 h-1 w-12 rounded-full bg-[#08704b]" />

                </div>



                {/* SECURITY */}

                <div className="mt-5 rounded-[12px] bg-gradient-to-br from-[#effaf0] to-[#f5fcf2] p-5">


                  <div className="flex items-start gap-3">


                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#dcf5df] text-[#08704b]">

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

                </div>

              </aside>

            </div>



            {/* ===============================================
                FOOTER BUTTONS
            =============================================== */}

            <div className="flex flex-col-reverse justify-between gap-4 border-t border-[#e5eae8] px-7 py-5 sm:flex-row sm:items-center sm:px-8">


              <Link
                to="/jobs/8/apply/resume"
                className="flex w-fit items-center gap-2 rounded-[9px] border border-[#d2dcd7] bg-white px-5 py-3 text-[14px] font-semibold text-[#27342f] no-underline transition duration-300 hover:bg-[#f3f7f5]"
              >

                <ArrowLeft size={18} />

                Back

              </Link>



              <Link
                to="/jobs/8/apply/review"
                className="flex items-center justify-center gap-3 rounded-[9px] bg-[#00634b] px-7 py-3.5 text-[14px] font-bold text-white no-underline shadow-[0_8px_20px_rgba(0,90,65,.18)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#074b3b]"
              >

                Save & Continue

                <ArrowRight size={18} />

              </Link>

            </div>

          </section>

        </section>

      </main>

    </div>
    </>
  );
}



/* ============================================================
   SKILL
============================================================ */

function Skill({ name }) {
  return (
    <span className="rounded-full bg-[#f0f3f2] px-3.5 py-1.5 text-[11px]">
      {name}
    </span>
  );
}



/* ============================================================
   SELECTED SKILL
============================================================ */

function SelectedSkill({ name }) {
  return (
    <span className="flex items-center gap-1 rounded-[8px] bg-[#edf2f0] px-2.5 py-1.5 text-[11px] text-[#33423d]">

      {name}

      <span className="text-[#718079]">
        ×
      </span>

    </span>
  );
}



/* ============================================================
   SELECT BOX
============================================================ */

function SelectBox({ icon, text }) {
  return (
    <div className="jobhub-input flex h-[43px] items-center justify-between rounded-[9px] border border-[#dbe3df] px-3 transition">

      <div className="flex items-center gap-3">

        <span className="text-[#53615c]">
          {icon}
        </span>

        <span className="text-[12px] text-[#596761]">
          {text}
        </span>

      </div>


      <ChevronDown
        size={16}
        className="text-[#26332f]"
      />

    </div>
  );
}



/* ============================================================
   RADIO
============================================================ */

function RadioOption({ selected, text }) {
  return (
    <div className="flex items-center gap-2 text-[13px] text-[#4c5a55]">

      <span
        className={`flex h-[19px] w-[19px] items-center justify-center rounded-full border ${
          selected
            ? "border-[#08704b] bg-[#08704b]"
            : "border-[#c9d4cf] bg-white"
        }`}
      >

        {selected && (
          <Check
            size={12}
            className="text-white"
          />
        )}

      </span>

      {text}

    </div>
  );
}



/* ============================================================
   JOB TYPE
============================================================ */

function JobType({ selected, green, text }) {
  return (
    <div className="flex items-center gap-3 text-[13px] text-[#56645f]">

      <span
        className={`flex h-[19px] w-[19px] items-center justify-center rounded-full border ${
          selected
            ? "border-[#08704b] bg-[#08704b]"
            : green
            ? "border-[#08704b] bg-white"
            : "border-[#ccd6d1] bg-white"
        }`}
      >

        {selected && (
          <Check
            size={12}
            className="text-white"
          />
        )}

      </span>

      {text}

    </div>
  );
}



/* ============================================================
   TIP
============================================================ */

function Tip({ text }) {
  return (
    <div className="flex items-start gap-2">

      <span className="mt-0.5 flex h-[17px] w-[17px] shrink-0 items-center justify-center rounded-full bg-[#168653] text-white">

        <Check size={10} />

      </span>


      <span className="text-[11px] leading-[1.45] text-[#56665f]">
        {text}
      </span>

    </div>
  );
}



/* ============================================================
   PROCESS STEP
============================================================ */

function ProcessStep({
  number,
  active,
  current,
  title,
  description,
}) {
  return (
    <div className="flex gap-4">

      <div
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[13px] font-bold ${
          active
            ? "bg-[#08704b] text-white"
            : current
            ? "bg-[#08704b] text-white shadow-[0_0_0_4px_#e8f5eb]"
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
              : "text-[#47544f]"
          }`}
        >
          {title}
        </h3>


        <p className="mt-1 text-[11px] leading-[1.45] text-[#7a8581]">
          {description}
        </p>

      </div>

    </div>
  );
}



/* ============================================================
   TOP STEPPER
============================================================ */

function Step({
  number,
  title,
  completed,
  active,
}) {
  return (
    <div className="flex flex-col items-center text-center">

      <div
        className={`flex h-9 w-9 items-center justify-center rounded-full text-[13px] font-bold ${
          completed || active
            ? "bg-[#08704b] text-white shadow-[0_0_0_5px_#e8f5eb]"
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
        className={`mt-3 text-[12px] ${
          completed || active
            ? "font-bold text-[#08704b]"
            : "text-[#697570]"
        }`}
      >
        {title}
      </span>

    </div>
  );
}


export default AdditionalDetails;