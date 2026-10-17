import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  Bookmark,
  BriefcaseBusiness,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Code2,
  GraduationCap,
  Heart,
  HeartPulse,
  Laptop,
  MapPin,
  Menu,
  MessageCircle,
  Play,
  Share2,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
  WalletCards,
  X,
  Zap,
} from "lucide-react";
import Footer from "../component/Footer";
import NavBar from "../component/NavBar";

function JobDetails() {
  return (

    <>
    <div className="min-h-screen bg-[#f7faf8] text-[#101b2e]">

      {/* =====================================================
          NAVBAR
      ===================================================== */}
<NavBar/>


      {/* =====================================================
          PAGE CONTAINER
      ===================================================== */}

      <main className="mx-auto w-[91%] max-w-[1440px]">

        {/* Breadcrumb */}

        <div className="flex flex-wrap items-center gap-2 py-4 text-[13px] text-[#697571]">

          <Link to="/" className="no-underline text-inherit">
            Home
          </Link>

          <ChevronRight size={13} />

          <Link to="/jobs" className="no-underline text-inherit">
            Jobs
          </Link>

          <ChevronRight size={13} />

          <span>Software Engineering</span>

          <ChevronRight size={13} />

          <span className="text-[#26332f]">
            Senior Frontend Developer
          </span>

        </div>


        {/* =====================================================
            TOP GRID
        ===================================================== */}

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,2.2fr)_minmax(320px,1fr)]">

          {/* JOB HEADER */}

          <section className="rounded-[15px] border border-[#e2e8e5] bg-white p-6 shadow-[0_4px_20px_rgba(20,50,35,0.025)] sm:p-7">

            <div className="flex flex-col justify-between gap-5 sm:flex-row">

              <div className="flex gap-5">

                <div className="flex h-[78px] w-[78px] shrink-0 items-center justify-center rounded-[13px] border border-[#dfe6e2] bg-white text-[46px] font-bold shadow-sm">
                  G
                </div>

                <div>

                  <div className="flex flex-wrap items-center gap-2">

                    <h2 className="text-[19px] font-bold">
                      Google
                    </h2>

                    <span className="flex items-center gap-1 rounded-full bg-[#e7f7e7] px-2 py-1 text-[11px] font-semibold text-[#23743e]">
                      <ShieldCheck size={11} />
                      Verified Employer
                    </span>

                  </div>

                  <p className="mt-2 text-[14px] text-[#707c78]">
                    Build for everyone. Make the world more helpful.
                  </p>

                </div>

              </div>


              <div className="flex items-start gap-2">

                <button className="flex h-10 w-10 items-center justify-center rounded-full border border-[#e0e6e3] bg-white transition hover:bg-[#f4f8f5]">
                  <Share2 size={17} />
                </button>

                <button className="flex h-10 w-10 items-center justify-center rounded-full border border-[#e0e6e3] bg-white transition hover:bg-[#f4f8f5]">
                  <Heart size={17} />
                </button>

              </div>

            </div>


            <h1 className="mt-5 text-[38px] font-bold leading-[1.08] tracking-[-1.8px] sm:text-[44px]">
              Senior Frontend Developer
            </h1>


            <div className="mt-5 flex flex-wrap gap-x-9 gap-y-3.5 text-[14px] text-[#6d7875]">

              <span className="flex items-center gap-2">
                <MapPin size={17} className="text-[#08704b]" />
                Bangalore, India
              </span>

              <span className="flex items-center gap-2">
                <BriefcaseBusiness size={17} className="text-[#08704b]" />
                Full-time
              </span>

              <span className="flex items-center gap-2">
                <Laptop size={17} className="text-[#08704b]" />
                On-site
              </span>

              <span className="flex items-center gap-2">
                <Users size={17} className="text-[#08704b]" />
                Senior Level
              </span>

            </div>


            <div className="mt-5 flex flex-wrap items-center justify-between gap-5">

              <div className="flex flex-wrap items-center gap-3">

                <span className="flex items-center gap-2 text-[15px] font-bold text-[#172131]">
                  <WalletCards size={18} className="text-[#08704b]" />
                  ₹25L – 40L per annum
                </span>

                <span className="rounded-full bg-[#e1f7d1] px-3 py-1.5 text-[11px] font-semibold text-[#39753d]">
                  ✓ Market Range
                </span>

              </div>

              <span className="text-[12px] text-[#8a9490]">
                Posted 2 days ago
              </span>

            </div>


            {/* SKILLS */}

            <div className="mt-5 flex flex-wrap gap-2">

              {[
                "React",
                "TypeScript",
                "Next.js",
                "JavaScript",
                "CSS",
                "HTML",
                "Frontend",
                "UI/UX",
              ].map((skill) => (
                <span
                  key={skill}
                  className="rounded-full bg-[#f0f3f2] px-4 py-2 text-[12px] font-medium text-[#44504c]"
                >
                  {skill}
                </span>
              ))}

            </div>

          </section>


          {/* APPLY SIDEBAR */}

          <aside className="rounded-[15px] border border-[#e2e8e5] bg-white p-6 shadow-[0_4px_20px_rgba(20,50,35,0.025)]">

            <button className="flex w-full items-center justify-center gap-3 rounded-[9px] bg-[#00553f] py-4 text-[15px] font-bold text-white transition hover:bg-[#073e31]">
              Apply Now
              <ArrowRight size={18} />
            </button>

            <button className="mt-2 flex w-full items-center justify-center gap-3 rounded-[9px] border border-[#08704b] bg-white py-4 text-[14px] font-semibold text-[#08704b] transition hover:bg-[#f2faf4]">
              <Bookmark size={18} />
              Save Job
            </button>


            <div className="mt-4 rounded-[12px] bg-[#eef8e9] p-5">

              <div className="flex items-center">

                <div className="flex">

                  <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-[#c8ad9a] text-[9px] font-bold">
                    A
                  </div>

                  <div className="-ml-2 flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-[#8fa9a0] text-[9px] font-bold">
                    R
                  </div>

                  <div className="-ml-2 flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-[#cba89b] text-[9px] font-bold">
                    S
                  </div>

                  <div className="-ml-2 flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-[#879db5] text-[9px] font-bold">
                    M
                  </div>

                  <div className="-ml-2 flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-white text-[9px] font-bold">
                    +12K
                  </div>

                </div>

              </div>

              <h3 className="mt-3 text-[15px] font-bold">
                Join 12,000+ applicants
              </h3>

              <p className="mt-1 text-[12px] leading-[1.55] text-[#6e7b76]">
                Companies usually respond within 3–5 days
              </p>

            </div>

          </aside>

        </div>


        {/* =====================================================
            CONTENT + RIGHT SIDEBAR
        ===================================================== */}

        <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,2.2fr)_minmax(320px,1fr)]">

          {/* MAIN CONTENT */}

          <section className="rounded-[15px] border border-[#e2e8e5] bg-white p-6 sm:p-7">

            {/* TABS */}

            <div className="flex gap-7 overflow-x-auto border-b border-[#e4e9e7] text-[13px] font-medium">

              <button className="whitespace-nowrap border-b-[3px] border-[#08704b] pb-4.5 font-bold text-[#124f3e]">
                Job Overview
              </button>

              <button className="whitespace-nowrap pb-4.5 text-[#65716d]">
                About Company
              </button>

              <button className="whitespace-nowrap pb-4.5 text-[#65716d]">
                Reviews
              </button>

              <button className="whitespace-nowrap pb-4.5 text-[#65716d]">
                Q&A
              </button>

            </div>


            {/* JOB DESCRIPTION */}

            <div className="pt-7">

              <h2 className="flex items-center gap-3 text-[19px] font-bold">
                <Code2 size={20} />
                Job Description
              </h2>

              <p className="mt-4 text-[14px] leading-[1.7] text-[#6b7773]">

                We are looking for a Senior Frontend Developer to join our
                dynamic team. You will be responsible for building
                high-quality, scalable, and performant user interfaces that
                deliver exceptional user experiences for millions of users
                worldwide. You will work closely with designers, product
                managers, and backend engineers to bring innovative ideas to life.

              </p>

            </div>


            {/* RESPONSIBILITIES */}

            <div className="mt-7">

              <h2 className="text-[19px] font-bold">
                Key Responsibilities
              </h2>

              <div className="mt-4 space-y-2.5">

                {[
                  "Design, develop, and maintain scalable frontend applications using React, Next.js, and TypeScript.",
                  "Collaborate with cross-functional teams to define, design, and ship new features.",
                  "Ensure high performance, accessibility, and responsiveness across devices.",
                  "Write clean, maintainable, and well-tested code.",
                  "Mentor junior developers and contribute to the growth of the engineering team.",
                  "Participate in code reviews and architectural discussions.",
                  "Stay up-to-date with the latest frontend technologies and industry best practices.",
                ].map((item) => (
                  <div key={item} className="flex gap-3 text-[13px] leading-[1.6] text-[#6c7874]">
                    <CheckCircle2 size={16} className="mt-0.5 shrink-0 fill-[#68ad4f] text-white" />
                    <span>{item}</span>
                  </div>
                ))}

              </div>

            </div>


            {/* QUALIFICATIONS */}

            <div className="mt-8">

              <h2 className="flex items-center gap-3 text-[19px] font-bold">
                <GraduationCap size={21} />
                Qualifications
              </h2>

              <div className="mt-4 space-y-2.5">

                {[
                  "5+ years of experience in frontend development.",
                  "Strong proficiency in React, TypeScript, HTML, CSS, and modern JavaScript.",
                  "Experience with Next.js or similar frameworks.",
                  "Good understanding of web performance, accessibility, and responsive design.",
                  "Excellent problem-solving and communication skills.",
                  "Bachelor’s or Master’s degree in Computer Science or a related field (or equivalent experience).",
                ].map((item) => (
                  <div key={item} className="flex gap-3 text-[13px] leading-[1.6] text-[#6c7874]">
                    <CheckCircle2 size={16} className="mt-0.5 shrink-0 fill-[#68ad4f] text-white" />
                    <span>{item}</span>
                  </div>
                ))}

              </div>

            </div>


            {/* NICE TO HAVE */}

            <div className="mt-8">

              <h2 className="flex items-center gap-3 text-[19px] font-bold">
                <Star size={20} />
                Nice to Have
              </h2>

              <div className="mt-4 space-y-2.5">

                {[
                  "Experience with design systems.",
                  "Familiarity with backend technologies (Node.js, Python, etc.).",
                  "Open source contributions.",
                ].map((item) => (
                  <div key={item} className="flex gap-3 text-[13px] leading-[1.6] text-[#6c7874]">
                    <CheckCircle2 size={16} className="mt-0.5 shrink-0 fill-[#68ad4f] text-white" />
                    <span>{item}</span>
                  </div>
                ))}

              </div>

            </div>


            {/* BENEFITS */}

            <div className="mt-9 border-t border-[#e5e9e7] pt-7">

              <h2 className="flex items-center gap-3 text-[19px] font-bold">
                <GiftIcon />
                Perks & Benefits
              </h2>


              <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">

                <Benefit
                  icon={<HeartPulse size={20} />}
                  title="Health Insurance"
                  text="Comprehensive coverage for you and your family"
                />

                <Benefit
                  icon={<Laptop size={20} />}
                  title="Flexible Work"
                  text="Hybrid work model"
                />

                <Benefit
                  icon={<GraduationCap size={20} />}
                  title="Learning Budget"
                  text="Annual budget for courses and certifications"
                />

                <Benefit
                  icon={<LeafIcon />}
                  title="Wellness Programs"
                  text="Mental & physical health support"
                />

                <Benefit
                  icon={<WalletCards size={20} />}
                  title="Stock Options"
                  text="Be a part of our success"
                />

                <Benefit
                  icon={<Users size={20} />}
                  title="Great Culture"
                  text="Inclusive, diverse, and collaborative"
                />

              </div>

            </div>

          </section>


          {/* RIGHT SIDEBAR */}

          <aside className="space-y-4">

            {/* OTHER OPENINGS */}

            <div className="rounded-[15px] border border-[#e2e8e5] bg-white p-5">

              <div className="flex items-center justify-between">

                <h2 className="text-[15px] font-bold">
                  Other Openings at Google
                </h2>

                <a href="#jobs" className="flex items-center gap-1 text-[12px] font-semibold text-[#08704b]">
                  View all
                  <ArrowRight size={14} />
                </a>

              </div>


              <div className="mt-4 space-y-2.5">

                <Opening title="UI/UX Designer" location="Bangalore, India" time="2 days ago" />
                <Opening title="Backend Developer" location="Hyderabad, India" time="3 days ago" />
                <Opening title="Product Manager" location="Bangalore, India" time="5 days ago" />

              </div>

            </div>


            {/* ABOUT COMPANY */}

            <div className="rounded-[15px] border border-[#e2e8e5] bg-white p-5">

              <div className="flex items-center justify-between">

                <h2 className="text-[15px] font-bold">
                  About Google
                </h2>

                <a href="#career" className="flex items-center gap-1 text-[12px] font-semibold text-[#08704b]">
                  Visit Career Page
                  <ArrowRight size={14} />
                </a>

              </div>


              <div className="mt-4 flex items-center gap-3">

                <div className="flex h-[62px] w-[62px] items-center justify-center rounded-[12px] border border-[#e1e7e4] text-[36px] font-bold">
                  G
                </div>

                <span className="text-[21px] font-bold">
                  Google
                </span>

              </div>


              <p className="mt-4 text-[12px] leading-[1.6] text-[#6e7976]">

                Google's mission is to organize the world's information
                and make it universally accessible and useful. We build
                products that help billions of people every day.

              </p>


              <div className="mt-4 space-y-3 text-[12px] text-[#596661]">

                <div className="flex items-center gap-3">
                  <BriefcaseBusiness size={16} />
                  Technology
                </div>

                <div className="flex items-center gap-3">
                  <Users size={16} />
                  10,000+ employees
                </div>

                <div className="flex items-center gap-3">
                  <MapPin size={16} />
                  Mountain View, CA (Global)
                </div>

              </div>


              <a
                href="#company"
                className="mt-4 flex items-center gap-2 text-[13px] font-medium text-[#08704b]"
              >
                https://careers.google.com
                <ArrowRight size={14} />
              </a>


              {/* Company video card */}

              <div className="mt-5 overflow-hidden rounded-[10px] border border-[#e2e8e5]">

                <div className="relative flex h-[145px] items-center justify-center bg-gradient-to-br from-[#d8e8df] via-[#aec9ba] to-[#6e8d7d]">

                  <div className="text-[42px] font-bold tracking-[-3px] text-white drop-shadow-lg">
                    Google
                  </div>

                  <button className="absolute flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#08704b] shadow-lg">
                    <Play size={18} fill="currentColor" />
                  </button>

                </div>

                <div className="flex items-center justify-between p-4">

                  <div>
                    <h3 className="text-[13px] font-bold">
                      Life at Google
                    </h3>

                    <p className="mt-1 text-[12px] text-[#7b8581]">
                      See what it's like to work here
                    </p>
                  </div>

                  <ArrowRight size={17} />

                </div>

              </div>

            </div>

          </aside>

        </div>

      </main>


      {/* =====================================================
          FOOTER
      ===================================================== */}
<Footer/>

    </div>

    </>
  );
}


/* =========================================================
   STATIC BENEFIT CARD
========================================================= */

function Benefit({ icon, title, text }) {
  return (
    <div className="rounded-[12px] border border-[#e2e9e5] bg-[#fbfdfc] p-4">

      <div className="flex items-start gap-3">

        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px] bg-[#eef8e8] text-[#08704b]">
          {icon}
        </div>

        <div>

          <h3 className="text-[12px] font-bold">
            {title}
          </h3>

          <p className="mt-1 text-[11px] leading-[1.45] text-[#74807c]">
            {text}
          </p>

        </div>

      </div>

    </div>
  );
}


/* =========================================================
   STATIC OPENING CARD
========================================================= */

function Opening({ title, location, time }) {
  return (
    <div className="rounded-[11px] border border-[#e2e8e5] p-4 transition hover:border-[#b9d7c7] hover:bg-[#fbfdfc]">

      <div className="flex items-start justify-between gap-3">

        <div>

          <h3 className="text-[12px] font-bold">
            {title}
          </h3>

          <p className="mt-1.5 flex items-center gap-1 text-[11px] text-[#75817d]">
            <MapPin size={12} />
            {location}
          </p>

        </div>

        <span className="whitespace-nowrap text-[11px] text-[#8a9490]">
          {time}
        </span>

      </div>

    </div>
  );
}


/* =========================================================
   SMALL ICON COMPONENTS
========================================================= */

function GiftIcon() {
  return (
    <svg
      width="21"
      height="21"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="8" width="18" height="13" rx="2" />
      <path d="M12 8v13" />
      <path d="M3 12h18" />
      <path d="M12 8H8.5a2.5 2.5 0 1 1 0-5C11 3 12 8 12 8Z" />
      <path d="M12 8h3.5a2.5 2.5 0 1 0 0-5C13 3 12 8 12 8Z" />
    </svg>
  );
}

function LeafIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 4C11 4 5 7 5 13c0 3.5 2.5 6 6 6 6 0 9-6 9-15Z" />
      <path d="M4 20c3-4 6-7 11-9" />
    </svg>

    
  );
}

export default JobDetails;