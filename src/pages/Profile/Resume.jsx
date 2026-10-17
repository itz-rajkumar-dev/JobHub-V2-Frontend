import React from "react";
import { Link } from "react-router-dom";
import {
  BriefcaseBusiness,
  Search,
  Bell,
  ChevronRight,
  UserRound,
  ClipboardCheck,
  Bookmark,
  FileText,
  Sparkles,
  CalendarDays,
  Settings,
  CircleHelp,
  Crown,
  Eye,
  Download,
  Mail,
  Phone,
  MapPin,
  Globe2,
  GraduationCap,
  FolderKanban,
  BarChart3,
  Award,
  CheckCircle2,
  ArrowRight,
  Plus,
  Pencil,
  Building2,
  ArrowUpRight,
  ChevronDown
} from "lucide-react";

const Resume = () => {
  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900">

      {/* =========================================================
          TOP NAVBAR
      ========================================================= */}
      
        {/* ================= NAVBAR ================= */}
      <nav className="sticky top-0 z-50 h-[72px] border-b border-slate-800 bg-[#0b111b] text-white">
        <div className="mx-auto flex h-full max-w-[1600px] items-center justify-between px-6">

          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-xl font-black text-[#111827]">
              J
            </div>

            <div>
              <div className="text-xl font-black tracking-tight">JobHub</div>
              <div className="text-[8px] font-semibold tracking-[0.28em] text-slate-400">
                FIND YOUR NEXT MOVE
              </div>
            </div>
          </Link>

          <div className="hidden items-center gap-9 lg:flex">
            <Link to="/jobs" className="flex items-center gap-2 text-sm font-semibold text-slate-200 hover:text-white">
              <Search size={17} />
              Find Jobs
            </Link>

            <Link to="/companies" className="flex items-center gap-2 text-sm font-semibold text-slate-200 hover:text-white">
              <Building2 size={17} />
              Companies
            </Link>

            <Link to="#" className="text-sm font-semibold text-slate-200 hover:text-white">
              Career Resources
            </Link>
          </div>

          <div className="hidden items-center gap-6 lg:flex">
            <Link to="#" className="flex items-center gap-2 text-sm font-semibold text-slate-200">
              <BriefcaseBusiness size={17} />
              For Employers
              <ArrowUpRight size={15} />
            </Link>

            <button className="relative rounded-xl p-2 hover:bg-white/10">
              <Bell size={20} />
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500" />
            </button>

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 font-bold text-slate-800">
                A
              </div>
              <span className="text-sm font-bold">Ankit</span>
              <ChevronDown size={16} />
            </div>
          </div>
        </div>
      </nav>

      {/* =========================================================
          MAIN PAGE LAYOUT
      ========================================================= */}
      <div className="mx-auto flex max-w-[1600px] gap-5 px-4 py-6 lg:px-5">

        {/* =======================================================
            LEFT PROFILE SIDEBAR
        ======================================================= */}
        <aside className="hidden w-[260px] shrink-0 border-r border-slate-200 bg-white px-5 py-7 lg:block">
       
                 <div className="mb-7 flex items-center gap-3 border-b border-slate-100 pb-6">
                   <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-blue-100 to-violet-100 text-lg font-black text-blue-700">
                     AK
                   </div>
       
                   <div>
                     <h3 className="font-black text-slate-950">Ankit Kumar</h3>
                     <p className="text-xs text-slate-500">Frontend Developer</p>
                     <Link to="/profile" className="mt-1 inline-block text-xs font-bold text-blue-600">
                       View Profile →
                     </Link>
                   </div>
                 </div>
       
                 <div className="space-y-1">
                   <Link to="/profile" className="flex items-center gap-4 rounded-xl px-4 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-50">
                     <UserRound size={19} />
                     My Profile
                   </Link>
       
                   <Link to="#" className="flex items-center gap-4 rounded-xl px-4 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-50">
                     <BriefcaseBusiness size={19} />
                     My Jobs
                   </Link>
       
                   <Link to="/applications" className="flex items-center justify-between rounded-xl border-l-4 border-emerald-500 bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-700">
                     <span className="flex items-center gap-4">
                       <ClipboardCheck size={19} />
                       Applications
                     </span>
                     <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs">12</span>
                   </Link>
       
                   <Link to="saved-jobs" className="flex items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-50">
                     <span className="flex items-center gap-4">
                       <Bookmark size={19} />
                       Saved Jobs
                     </span>
                     <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs">8</span>
                   </Link>
       
                   <Link to="resume" className="flex items-center gap-4 rounded-xl px-4 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-50">
                     <FileText size={19} />
                     Resume
                   </Link>
       
                   <Link to="#" className="flex items-center gap-4 rounded-xl px-4 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-50">
                     <Award size={19} />
                     Skills
                   </Link>
       
                   <Link to="#" className="flex items-center gap-4 rounded-xl px-4 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-50">
                     <CalendarDays size={19} />
                     Interviews
                   </Link>
       
                   <Link to="notifications" className="flex items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-50">
                     <span className="flex items-center gap-4">
                       <Bell size={19} />
                       Notifications
                     </span>
                     <span className="rounded-full bg-red-50 px-2 py-0.5 text-xs font-bold text-red-500">3</span>
                   </Link>
       
                   <Link to="#" className="flex items-center gap-4 rounded-xl px-4 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-50">
                     <Settings size={19} />
                     Settings
                   </Link>
                 </div>
       
                 <div className="mt-10 rounded-2xl bg-gradient-to-br from-violet-100 via-blue-50 to-white p-5 text-center">
                   <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-white text-violet-500 shadow-sm">
                     <Crown size={23} />
                   </div>
       
                   <h3 className="font-black text-slate-900">Upgrade to Pro</h3>
                   <p className="mt-2 text-xs leading-5 text-slate-500">
                     Get noticed by top companies and access exclusive opportunities.
                   </p>
       
                   <button className="mt-4 w-full rounded-xl bg-blue-600 px-4 py-3 text-sm font-black text-white shadow-lg shadow-blue-200 hover:bg-blue-700">
                     Upgrade Now →
                   </button>
                 </div>
               </aside>

        {/* =======================================================
            RESUME CONTENT AREA
        ======================================================= */}
        <main className="min-w-0 flex-1">

          {/* Page Heading */}
          <div className="mb-5 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">

            <div>
              <div className="mb-2 flex items-center gap-2 text-sm text-slate-400">
                <span>Home</span>
                <ChevronRight size={15} />
                <span>Profile</span>
                <ChevronRight size={15} />
                <span className="font-medium text-slate-600">
                  Resume
                </span>
              </div>

              <h1 className="text-3xl font-extrabold tracking-tight text-slate-950 md:text-4xl">
                My Resume
              </h1>

              <p className="mt-1 text-sm text-slate-500 md:text-base">
                Create, manage and showcase your professional resume
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button className="inline-flex items-center gap-2 rounded-xl border border-blue-200 bg-white px-5 py-3 text-sm font-bold text-blue-600 shadow-sm transition hover:bg-blue-50">
                <Eye size={18} />
                Preview Resume
              </button>

              <button className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700">
                <Download size={18} />
                Download Resume
              </button>
            </div>

          </div>

          {/* Resume Workspace */}
          <div className="grid gap-4 xl:grid-cols-[220px_minmax(0,1fr)]">

            {/* Resume Section Menu */}
            <aside className="hidden rounded-2xl border border-slate-200 bg-white p-3 shadow-sm md:block">

              {/* Preview Active */}
              <div className="mb-1 rounded-xl bg-blue-50 p-3 text-blue-600">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-100">
                    <Eye size={18} />
                  </div>

                  <div>
                    <div className="text-sm font-bold">
                      Preview
                    </div>

                    <div className="text-xs text-slate-500">
                      View your resume
                    </div>
                  </div>
                </div>
              </div>

              {/* Personal Info */}
              <button className="mb-1 flex w-full items-center gap-3 rounded-xl p-3 text-left transition hover:bg-slate-50">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-50 text-slate-500">
                  <UserRound size={18} />
                </div>

                <div>
                  <div className="text-sm font-semibold text-slate-800">
                    Personal Info
                  </div>

                  <div className="text-xs text-slate-400">
                    Basic details
                  </div>
                </div>
              </button>

              {/* Experience */}
              <button className="mb-1 flex w-full items-center gap-3 rounded-xl p-3 text-left transition hover:bg-slate-50">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-50 text-slate-500">
                  <BriefcaseBusiness size={18} />
                </div>

                <div>
                  <div className="text-sm font-semibold text-slate-800">
                    Experience
                  </div>

                  <div className="text-xs text-slate-400">
                    Work history
                  </div>
                </div>
              </button>

              {/* Education */}
              <button className="mb-1 flex w-full items-center gap-3 rounded-xl p-3 text-left transition hover:bg-slate-50">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-50 text-slate-500">
                  <GraduationCap size={18} />
                </div>

                <div>
                  <div className="text-sm font-semibold text-slate-800">
                    Education
                  </div>

                  <div className="text-xs text-slate-400">
                    Academic background
                  </div>
                </div>
              </button>

              {/* Skills */}
              <button className="mb-1 flex w-full items-center gap-3 rounded-xl p-3 text-left transition hover:bg-slate-50">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-50 text-slate-500">
                  <Sparkles size={18} />
                </div>

                <div>
                  <div className="text-sm font-semibold text-slate-800">
                    Skills
                  </div>

                  <div className="text-xs text-slate-400">
                    Technical & soft skills
                  </div>
                </div>
              </button>

              {/* Projects */}
              <button className="mb-1 flex w-full items-center gap-3 rounded-xl p-3 text-left transition hover:bg-slate-50">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-50 text-slate-500">
                  <FolderKanban size={18} />
                </div>

                <div>
                  <div className="text-sm font-semibold text-slate-800">
                    Projects
                  </div>

                  <div className="text-xs text-slate-400">
                    Your key projects
                  </div>
                </div>
              </button>

              {/* Certifications */}
              <button className="mb-1 flex w-full items-center gap-3 rounded-xl p-3 text-left transition hover:bg-slate-50">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-50 text-slate-500">
                  <Award size={18} />
                </div>

                <div>
                  <div className="text-sm font-semibold text-slate-800">
                    Certifications
                  </div>

                  <div className="text-xs text-slate-400">
                    Courses & certificates
                  </div>
                </div>
              </button>

              {/* Custom Sections */}
              <button className="flex w-full items-center gap-3 rounded-xl p-3 text-left transition hover:bg-slate-50">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-50 text-slate-500">
                  <Plus size={18} />
                </div>

                <div>
                  <div className="text-sm font-semibold text-slate-800">
                    Custom Sections
                  </div>

                  <div className="text-xs text-slate-400">
                    Add more sections
                  </div>
                </div>
              </button>

            </aside>

            {/* =====================================================
                RESUME PREVIEW
            ===================================================== */}
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:p-7">

              {/* Resume Header */}
              <div className="border-b border-slate-100 pb-5">

                <div className="flex flex-col gap-5 md:flex-row md:items-start">

                  {/* Photo */}
                  <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-full bg-slate-100 text-3xl font-black text-slate-700 ring-8 ring-slate-50">
                    AK
                  </div>

                  {/* Name */}
                  <div className="min-w-0 flex-1">

                    <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">

                      <div>
                        <h2 className="text-3xl font-black tracking-tight text-slate-950">
                          Ankit Kumar
                        </h2>

                        <h3 className="mt-1 text-xl font-bold text-blue-600">
                          Frontend Developer
                        </h3>
                      </div>

                      <button className="inline-flex w-fit items-center gap-1 rounded-lg border border-slate-200 px-3 py-2 text-xs font-bold text-slate-500 hover:bg-slate-50">
                        <Pencil size={13} />
                        Edit
                      </button>

                    </div>

                    <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
                      Passionate software developer with a strong foundation in web technologies.
                      I love building modern, responsive and user-friendly web applications.
                    </p>
                  </div>

                </div>

                {/* Contact Details */}
                <div className="mt-5 grid gap-x-8 gap-y-3 text-sm text-slate-500 sm:grid-cols-2 lg:grid-cols-3">

                  <div className="flex items-center gap-2">
                    <Mail size={16} className="text-slate-400" />
                    anitkumar@example.com
                  </div>

                  <div className="flex items-center gap-2">
                    <Phone size={16} className="text-slate-400" />
                    +91 98765 43210
                  </div>

                  <div className="flex items-center gap-2">
                    <MapPin size={16} className="text-slate-400" />
                    Delhi, India
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="flex h-4 w-4 items-center justify-center rounded-sm bg-blue-600 text-[9px] font-black text-white">
                      in
                    </span>
                    linkedin.com/in/ankitkumar
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="flex h-4 w-4 items-center justify-center rounded-sm bg-slate-800 text-[8px] font-black text-white">
                      GH
                    </span>
                    github.com/ankitkumar
                  </div>

                  <div className="flex items-center gap-2">
                    <Globe2 size={16} className="text-slate-500" />
                    portfolio.dev
                  </div>

                </div>
              </div>

              {/* ===================================================
                  EXPERIENCE
              =================================================== */}
              <div className="border-b border-slate-100 py-6">

                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                    <BriefcaseBusiness size={17} />
                  </div>

                  <h3 className="text-base font-black uppercase tracking-wide text-slate-900">
                    Experience
                  </h3>
                </div>

                <div className="relative pl-8">

                  <div className="absolute left-[9px] top-1 h-[calc(100%-15px)] w-px bg-slate-200" />

                  <div className="absolute left-[4px] top-1 h-3 w-3 rounded-full border-2 border-white bg-blue-600 shadow-sm" />

                  <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                    <div>
                      <h4 className="text-base font-extrabold text-slate-900">
                        Frontend Developer Intern
                      </h4>

                      <p className="mt-1 text-sm font-semibold text-blue-600">
                        TechCorp Solutions
                      </p>
                    </div>

                    <div className="text-left text-xs font-medium text-slate-500 md:text-right">
                      <div>Jun 2024 – Aug 2024</div>
                      <div className="mt-1">Remote</div>
                    </div>
                  </div>

                  <ul className="mt-3 space-y-1.5 text-sm leading-5 text-slate-600">
                    <li>• Developed responsive web interfaces using React.js and Tailwind CSS.</li>
                    <li>• Collaborated with designers to implement modern UI/UX.</li>
                    <li>• Improved website performance by 30%.</li>
                  </ul>

                </div>
              </div>

              {/* ===================================================
                  EDUCATION
              =================================================== */}
              <div className="border-b border-slate-100 py-6">

                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                    <GraduationCap size={17} />
                  </div>

                  <h3 className="text-base font-black uppercase tracking-wide text-slate-900">
                    Education
                  </h3>
                </div>

                <div className="relative pl-8">

                  <div className="absolute left-[4px] top-1 h-3 w-3 rounded-full border-2 border-white bg-blue-600 shadow-sm" />

                  <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">

                    <div>
                      <h4 className="text-base font-extrabold text-slate-900">
                        B.Tech in Computer Science and Engineering
                      </h4>

                      <p className="mt-1 text-sm font-semibold text-blue-600">
                        Inderprastha Engineering College (AKTU)
                      </p>

                      <p className="mt-1 text-sm text-slate-500">
                        CGPA: 8.2/10 (Upto 4th Sem)
                      </p>
                    </div>

                    <div className="text-left text-xs font-medium text-slate-500 md:text-right">
                      <div>2022 – 2026</div>
                      <div className="mt-1">Delhi, India</div>
                    </div>

                  </div>
                </div>
              </div>

              {/* ===================================================
                  SKILLS
              =================================================== */}
              <div className="border-b border-slate-100 py-6">

                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                    <BarChart3 size={17} />
                  </div>

                  <h3 className="text-base font-black uppercase tracking-wide text-slate-900">
                    Skills
                  </h3>
                </div>

                <div className="flex flex-wrap gap-2">

                  <span className="rounded-full bg-blue-50 px-4 py-2 text-xs font-semibold text-slate-600">
                    HTML
                  </span>

                  <span className="rounded-full bg-blue-50 px-4 py-2 text-xs font-semibold text-slate-600">
                    CSS
                  </span>

                  <span className="rounded-full bg-blue-50 px-4 py-2 text-xs font-semibold text-slate-600">
                    JavaScript
                  </span>

                  <span className="rounded-full bg-blue-50 px-4 py-2 text-xs font-semibold text-slate-600">
                    React.js
                  </span>

                  <span className="rounded-full bg-blue-50 px-4 py-2 text-xs font-semibold text-slate-600">
                    Tailwind CSS
                  </span>

                  <span className="rounded-full bg-blue-50 px-4 py-2 text-xs font-semibold text-slate-600">
                    Java
                  </span>

                  <span className="rounded-full bg-blue-50 px-4 py-2 text-xs font-semibold text-slate-600">
                    Spring Boot
                  </span>

                  <span className="rounded-full bg-blue-50 px-4 py-2 text-xs font-semibold text-slate-600">
                    MySQL
                  </span>

                  <span className="rounded-full bg-blue-50 px-4 py-2 text-xs font-semibold text-slate-600">
                    Git & GitHub
                  </span>

                  <span className="rounded-full bg-blue-50 px-4 py-2 text-xs font-semibold text-slate-600">
                    DSA
                  </span>

                  <span className="rounded-full bg-blue-50 px-4 py-2 text-xs font-semibold text-slate-600">
                    Problem Solving
                  </span>

                  <span className="rounded-full bg-blue-50 px-4 py-2 text-xs font-semibold text-slate-600">
                    Communication
                  </span>

                </div>
              </div>

              {/* ===================================================
                  PROJECTS
              =================================================== */}
              <div className="pt-6">

                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                    <FolderKanban size={17} />
                  </div>

                  <h3 className="text-base font-black uppercase tracking-wide text-slate-900">
                    Projects
                  </h3>
                </div>

                <div className="relative pl-8">

                  <div className="absolute left-[4px] top-1 h-3 w-3 rounded-full border-2 border-white bg-blue-600 shadow-sm" />

                  <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">

                    <div>
                      <h4 className="text-base font-extrabold text-slate-900">
                        JobHub – Job Portal
                      </h4>

                      <ul className="mt-2 space-y-1.5 text-sm leading-5 text-slate-600">
                        <li>• A full-featured job portal with authentication, search, and application tracking.</li>
                        <li>• Built using React, Spring Boot and MySQL.</li>
                        <li>• Implemented JWT authentication and responsive UI.</li>
                      </ul>
                    </div>

                    <div className="shrink-0 text-left text-xs font-medium text-slate-500 md:text-right">
                      Feb 2025 – Apr 2025
                    </div>

                  </div>
                </div>
              </div>

            </section>
          </div>
        </main>

        {/* =======================================================
            RIGHT SIDEBAR
        ======================================================= */}
        <aside className="hidden w-[300px] shrink-0 xl:block">
          <div className="sticky top-[94px] space-y-4">

            {/* Resume Completion */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

              <h2 className="text-base font-extrabold text-slate-900">
                Resume Completion
              </h2>

              <div className="mt-4 flex items-center gap-4">

                <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-[conic-gradient(#159f75_85%,#e2e8f0_85%)]">
                  <div className="flex h-[62px] w-[62px] items-center justify-center rounded-full bg-white">
                    <span className="text-xl font-black text-slate-800">
                      85%
                    </span>
                  </div>
                </div>

                <div>
                  <div className="font-extrabold text-emerald-600">
                    Great progress!
                  </div>

                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    Complete remaining sections to make your resume stronger.
                  </p>
                </div>

              </div>

              <div className="mt-5 space-y-3">

                <div className="flex items-center gap-3 text-sm text-slate-700">
                  <CheckCircle2 size={19} className="text-emerald-500" />
                  Personal Information
                </div>

                <div className="flex items-center gap-3 text-sm text-slate-700">
                  <CheckCircle2 size={19} className="text-emerald-500" />
                  Education
                </div>

                <div className="flex items-center gap-3 text-sm text-slate-700">
                  <CheckCircle2 size={19} className="text-emerald-500" />
                  Skills
                </div>

                <div className="flex items-center gap-3 text-sm text-slate-700">
                  <CheckCircle2 size={19} className="text-emerald-500" />
                  Projects
                </div>

                <div className="flex items-center justify-between text-sm text-slate-700">
                  <div className="flex items-center gap-3">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-blue-500" />
                    Work Experience
                  </div>

                  <ChevronRight size={16} className="text-blue-600" />
                </div>

                <div className="flex items-center gap-3 text-sm text-slate-700">
                  <CheckCircle2 size={19} className="text-emerald-500" />
                  Certifications
                </div>

              </div>
            </div>

            {/* Choose Template */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

              <div className="flex items-center justify-between">
                <h2 className="text-base font-extrabold text-slate-900">
                  Choose a Template
                </h2>

                <button className="text-xs font-bold text-blue-600">
                  View All →
                </button>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-2">

                <div>
                  <div className="relative overflow-hidden rounded-lg border-2 border-blue-600 bg-white p-1.5 shadow-sm">
                    <div className="h-[125px] rounded bg-slate-50 p-2">
                      <div className="flex gap-2">
                        <div className="h-5 w-5 rounded-full bg-slate-300" />
                        <div className="space-y-1">
                          <div className="h-1.5 w-14 rounded bg-slate-800" />
                          <div className="h-1.5 w-10 rounded bg-blue-500" />
                        </div>
                      </div>
                      <div className="mt-4 h-1.5 w-full rounded bg-slate-200" />
                      <div className="mt-2 h-1.5 w-4/5 rounded bg-slate-200" />
                      <div className="mt-2 h-1.5 w-full rounded bg-slate-200" />
                      <div className="mt-4 h-1.5 w-1/2 rounded bg-slate-300" />
                      <div className="mt-2 h-1.5 w-4/5 rounded bg-slate-200" />
                    </div>

                    <div className="absolute right-1.5 top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-white">
                      <CheckCircle2 size={12} />
                    </div>
                  </div>

                  <div className="mt-2 text-center text-xs font-bold text-slate-700">
                    Modern
                  </div>
                </div>

                <div>
                  <div className="overflow-hidden rounded-lg border border-slate-200 bg-white p-1.5">
                    <div className="h-[125px] rounded bg-slate-50 p-2">
                      <div className="flex h-full">
                        <div className="w-1/3 rounded-l bg-slate-800" />
                        <div className="flex-1 p-2">
                          <div className="h-1.5 w-4/5 rounded bg-slate-800" />
                          <div className="mt-2 h-1.5 w-3/5 rounded bg-slate-300" />
                          <div className="mt-5 h-1.5 w-full rounded bg-slate-200" />
                          <div className="mt-2 h-1.5 w-4/5 rounded bg-slate-200" />
                          <div className="mt-5 h-1.5 w-3/5 rounded bg-slate-300" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-2 text-center text-xs font-bold text-slate-700">
                    Professional
                  </div>
                </div>

                <div>
                  <div className="overflow-hidden rounded-lg border border-slate-200 bg-white p-1.5">
                    <div className="h-[125px] rounded bg-slate-50 p-2">
                      <div className="h-2 w-1/2 rounded bg-slate-800" />
                      <div className="mt-2 h-1.5 w-3/5 rounded bg-slate-300" />
                      <div className="mt-4 h-1.5 w-full rounded bg-slate-200" />
                      <div className="mt-2 h-1.5 w-4/5 rounded bg-slate-200" />
                      <div className="mt-2 h-1.5 w-full rounded bg-slate-200" />
                      <div className="mt-5 h-1.5 w-1/2 rounded bg-slate-300" />
                      <div className="mt-2 h-1.5 w-4/5 rounded bg-slate-200" />
                    </div>
                  </div>

                  <div className="mt-2 text-center text-xs font-bold text-slate-700">
                    Minimal
                  </div>
                </div>

              </div>
            </div>

            {/* Pro Tip */}
            <div className="rounded-2xl bg-gradient-to-br from-indigo-50 via-violet-50 to-blue-50 p-5">

              <div className="flex gap-3">

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-violet-500 shadow-sm">
                  <Sparkles size={21} />
                </div>

                <div>
                  <h3 className="font-extrabold text-slate-900">
                    Pro Tip
                  </h3>

                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    A well-crafted resume can 3x your chances of getting noticed by recruiters.
                  </p>
                </div>

              </div>
            </div>

            {/* Quick Resume Actions */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

              <h3 className="mb-3 text-sm font-extrabold text-slate-900">
                Quick Actions
              </h3>

              <button className="flex w-full items-center justify-between rounded-xl border border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-700 hover:bg-slate-50">
                <span className="flex items-center gap-3">
                  <Download size={17} className="text-blue-600" />
                  Download PDF
                </span>

                <ArrowRight size={16} className="text-slate-400" />
              </button>

              <button className="mt-2 flex w-full items-center justify-between rounded-xl border border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-700 hover:bg-slate-50">
                <span className="flex items-center gap-3">
                  <Eye size={17} className="text-violet-600" />
                  Preview Resume
                </span>

                <ArrowRight size={16} className="text-slate-400" />
              </button>

            </div>

          </div>
        </aside>

      </div>
    </div>
  );
};

export default Resume;
