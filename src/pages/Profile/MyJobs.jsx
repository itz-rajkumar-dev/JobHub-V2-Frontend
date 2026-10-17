import React, { useEffect, useState } from "react";
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
  MapPin,
  Wallet,
  CheckCircle2,
  Clock3,
  XCircle,
  Filter,
  MoreVertical,
  ArrowRight,
  SlidersHorizontal,
  TrendingUp,
  Users,
  Video,
  Award,
  Building2,
  ArrowUpRight,
  ChevronDown
} from "lucide-react";

const MyJobs = () => {

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
          PAGE LAYOUT
      ========================================================= */}
      <div className="mx-auto flex max-w-[1600px] gap-5 px-4 py-6 lg:px-5">

        {/* =======================================================
            LEFT SIDEBAR
        ======================================================= */}
            {/* ================= LEFT SIDEBAR ================= */}
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

            <Link to="my-jobs" className="flex items-center gap-4 rounded-xl px-4 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-50">
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
            CENTER CONTENT
        ======================================================= */}
        <main className="min-w-0 flex-1">

          {/* Heading */}
          <div className="mb-5 flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">

            <div>

              <div className="mb-2 flex items-center gap-2 text-sm text-slate-400">
                <span>Home</span>
                <ChevronRight size={15} />
                <span className="text-slate-600">My Jobs</span>
              </div>

              <h1 className="text-3xl font-extrabold tracking-tight text-slate-950 md:text-4xl">
                My Jobs
              </h1>

              <p className="mt-1 text-sm text-slate-500 md:text-base">
                Manage your job search, track your applications and find new opportunities.
              </p>

            </div>

            <Link
              to="/jobs"
              className="inline-flex w-fit items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700"
            >
              <Search size={18} />
              Find New Jobs
              <ArrowRight size={16} />
            </Link>

          </div>

          {/* =====================================================
              STATS
          ===================================================== */}
          <div className="mb-5 grid gap-3 md:grid-cols-2 xl:grid-cols-4">

            {/* Total Applications */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

              <div className="flex items-start justify-between">

                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                  <Users size={22} />
                </div>

                <span className="rounded-full bg-emerald-50 px-2 py-1 text-[11px] font-bold text-emerald-600">
                  ↗ +12%
                </span>

              </div>

              <div className="mt-4 text-3xl font-black text-slate-950">
                24
              </div>

              <div className="mt-1 text-sm font-medium text-slate-500">
                Total Applications
              </div>

              <div className="mt-2 text-xs text-slate-400">
                vs last month
              </div>

            </div>

            {/* In Progress */}
            <div className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm">

              <div className="flex items-start justify-between">

                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                  <CheckCircle2 size={22} />
                </div>

                <span className="rounded-full bg-emerald-50 px-2 py-1 text-[11px] font-bold text-emerald-600">
                  ↗ +5%
                </span>

              </div>

              <div className="mt-4 text-3xl font-black text-slate-950">
                8
              </div>

              <div className="mt-1 text-sm font-medium text-slate-500">
                In Progress
              </div>

              <div className="mt-2 text-xs text-slate-400">
                vs last month
              </div>

            </div>

            {/* Interviews */}
            <div className="rounded-2xl border border-blue-100 bg-white p-5 shadow-sm">

              <div className="flex items-start justify-between">

                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                  <Video size={22} />
                </div>

                <span className="rounded-full bg-emerald-50 px-2 py-1 text-[11px] font-bold text-emerald-600">
                  ↗ +100%
                </span>

              </div>

              <div className="mt-4 text-3xl font-black text-slate-950">
                6
              </div>

              <div className="mt-1 text-sm font-medium text-slate-500">
                Interviews
              </div>

              <div className="mt-2 text-xs text-slate-400">
                vs last month
              </div>

            </div>

            {/* Not Selected */}
            <div className="rounded-2xl border border-rose-100 bg-white p-5 shadow-sm">

              <div className="flex items-start justify-between">

                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-rose-50 text-rose-500">
                  <XCircle size={22} />
                </div>

                <span className="rounded-full bg-rose-50 px-2 py-1 text-[11px] font-bold text-rose-500">
                  ↗ -8%
                </span>

              </div>

              <div className="mt-4 text-3xl font-black text-slate-950">
                10
              </div>

              <div className="mt-1 text-sm font-medium text-slate-500">
                Not Selected
              </div>

              <div className="mt-2 text-xs text-slate-400">
                vs last month
              </div>

            </div>

          </div>

          {/* =====================================================
              FILTER BAR
          ===================================================== */}
          <div className="mb-4 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

            <div className="flex flex-col gap-3 p-3 xl:flex-row xl:items-center xl:justify-between">

              <div className="flex min-w-0 items-center overflow-x-auto">

                <button className="whitespace-nowrap border-b-2 border-blue-600 px-5 py-3 text-sm font-bold text-blue-600">
                  All Jobs (24)
                </button>

                <button className="whitespace-nowrap px-5 py-3 text-sm font-semibold text-slate-500 hover:text-slate-900">
                  In Progress (8)
                </button>

                <button className="whitespace-nowrap px-5 py-3 text-sm font-semibold text-slate-500 hover:text-slate-900">
                  Interviews (6)
                </button>

                <button className="whitespace-nowrap px-5 py-3 text-sm font-semibold text-slate-500 hover:text-slate-900">
                  Offers (2)
                </button>

                <button className="whitespace-nowrap px-5 py-3 text-sm font-semibold text-slate-500 hover:text-slate-900">
                  Not Selected (10)
                </button>

              </div>

              <div className="flex items-center gap-2">

                <button className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:bg-slate-50">
                  <SlidersHorizontal size={17} />
                  Filter
                </button>

                <button className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:bg-slate-50">
                  Sort by: Recent
                  <ChevronRight
                    size={15}
                    className="rotate-90"
                  />
                </button>

              </div>

            </div>
          </div>

          {/* =====================================================
              JOB CARD 1 - GOOGLE
          ===================================================== */}
          <div className="mb-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-blue-200 hover:shadow-md">

            <div className="grid gap-5 xl:grid-cols-[minmax(0,1.4fr)_170px_minmax(260px,1fr)_40px] xl:items-center">

              {/* Job Info */}
              <div>

                <div className="flex gap-4">

                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-2xl font-black text-red-500 shadow-sm">
                    G
                  </div>

                  <div className="min-w-0">

                    <h2 className="text-lg font-extrabold text-slate-950">
                      Frontend Developer
                    </h2>

                    <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs font-medium text-slate-500">

                      <span className="font-semibold text-slate-700">
                        Google
                      </span>

                      <span>•</span>

                      <span>
                        <MapPin size={13} className="mr-1 inline" />
                        Bangalore, India
                      </span>

                      <span>•</span>

                      <span>Full-time</span>

                      <span>•</span>

                      <span>
                        ₹18L – ₹25L
                      </span>

                    </div>

                  </div>
                </div>

                <div className="mt-3 flex flex-wrap gap-2 pl-[70px]">

                  <span className="rounded-full bg-blue-50 px-3 py-1 text-[11px] font-semibold text-blue-700">
                    React
                  </span>

                  <span className="rounded-full bg-blue-50 px-3 py-1 text-[11px] font-semibold text-blue-700">
                    Next.js
                  </span>

                  <span className="rounded-full bg-blue-50 px-3 py-1 text-[11px] font-semibold text-blue-700">
                    TypeScript
                  </span>

                  <span className="rounded-full bg-blue-50 px-3 py-1 text-[11px] font-semibold text-blue-700">
                    Tailwind CSS
                  </span>

                </div>

              </div>

              {/* Status */}
              <div className="xl:text-center">

                <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-xs font-bold text-emerald-600">
                  <Video size={14} />
                  Interview
                </span>

                <div className="mt-2 text-xs text-slate-400">
                  Applied on 12 Aug 2024
                </div>

              </div>

              {/* Progress */}
              <div>

                <div className="relative flex items-start justify-between">

                  <div className="absolute left-2 right-2 top-3 h-px bg-blue-200" />

                  <div className="relative z-10 flex flex-col items-center">

                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-white">
                      <CheckCircle2 size={15} />
                    </div>

                    <span className="mt-2 text-[10px] font-semibold text-slate-500">
                      Applied
                    </span>

                  </div>

                  <div className="relative z-10 flex flex-col items-center">

                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-white">
                      <CheckCircle2 size={15} />
                    </div>

                    <span className="mt-2 text-[10px] font-semibold text-slate-500">
                      Screening
                    </span>

                  </div>

                  <div className="relative z-10 flex flex-col items-center">

                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-white">
                      <Video size={13} />
                    </div>

                    <span className="mt-2 text-[10px] font-bold text-slate-800">
                      Interview
                    </span>

                  </div>

                  <div className="relative z-10 flex flex-col items-center">

                    <div className="h-6 w-6 rounded-full border-2 border-slate-300 bg-white" />

                    <span className="mt-2 text-[10px] font-semibold text-slate-400">
                      Offer
                    </span>

                  </div>

                </div>

              </div>

              {/* Menu */}
              <button className="hidden rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700 xl:block">
                <MoreVertical size={19} />
              </button>

            </div>

            <div className="mt-4 flex justify-end">

              <button className="rounded-xl border border-blue-200 px-4 py-2 text-xs font-bold text-blue-600 transition hover:bg-blue-50">
                View Details
              </button>

            </div>

          </div>

          {/* =====================================================
              JOB CARD 2 - MICROSOFT
          ===================================================== */}
          <div className="mb-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-blue-200 hover:shadow-md">

            <div className="grid gap-5 xl:grid-cols-[minmax(0,1.4fr)_170px_minmax(260px,1fr)_40px] xl:items-center">

              <div>

                <div className="flex gap-4">

                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-xl font-black text-blue-600 shadow-sm">
                    <span className="grid grid-cols-2 gap-1">
                      <span className="h-3 w-3 bg-red-500" />
                      <span className="h-3 w-3 bg-green-500" />
                      <span className="h-3 w-3 bg-blue-500" />
                      <span className="h-3 w-3 bg-yellow-400" />
                    </span>
                  </div>

                  <div className="min-w-0">

                    <h2 className="text-lg font-extrabold text-slate-950">
                      Software Engineer
                    </h2>

                    <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs font-medium text-slate-500">

                      <span className="font-semibold text-slate-700">
                        Microsoft
                      </span>

                      <span>•</span>

                      <span>
                        <MapPin size={13} className="mr-1 inline" />
                        Hyderabad, India
                      </span>

                      <span>•</span>

                      <span>Full-time</span>

                      <span>•</span>

                      <span>
                        ₹20L – ₹28L
                      </span>

                    </div>

                  </div>
                </div>

                <div className="mt-3 flex flex-wrap gap-2 pl-[70px]">

                  <span className="rounded-full bg-blue-50 px-3 py-1 text-[11px] font-semibold text-blue-700">
                    React
                  </span>

                  <span className="rounded-full bg-blue-50 px-3 py-1 text-[11px] font-semibold text-blue-700">
                    System Design
                  </span>

                  <span className="rounded-full bg-blue-50 px-3 py-1 text-[11px] font-semibold text-blue-700">
                    JavaScript
                  </span>

                  <span className="rounded-full bg-blue-50 px-3 py-1 text-[11px] font-semibold text-blue-700">
                    Node.js
                  </span>

                </div>

              </div>

              <div className="xl:text-center">

                <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-xs font-bold text-blue-600">
                  <Clock3 size={14} />
                  In Progress
                </span>

                <div className="mt-2 text-xs text-slate-400">
                  Applied on 10 Aug 2024
                </div>

              </div>

              <div>

                <div className="relative flex items-start justify-between">

                  <div className="absolute left-2 right-2 top-3 h-px bg-blue-200" />

                  <div className="relative z-10 flex flex-col items-center">

                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-white">
                      <CheckCircle2 size={15} />
                    </div>

                    <span className="mt-2 text-[10px] font-semibold text-slate-500">
                      Applied
                    </span>

                  </div>

                  <div className="relative z-10 flex flex-col items-center">

                    <div className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-blue-600 bg-white">
                      <span className="h-2 w-2 rounded-full bg-blue-600" />
                    </div>

                    <span className="mt-2 text-[10px] font-bold text-slate-800">
                      Screening
                    </span>

                  </div>

                  <div className="relative z-10 flex flex-col items-center">

                    <div className="h-6 w-6 rounded-full border-2 border-slate-300 bg-white" />

                    <span className="mt-2 text-[10px] font-semibold text-slate-400">
                      Interview
                    </span>

                  </div>

                  <div className="relative z-10 flex flex-col items-center">

                    <div className="h-6 w-6 rounded-full border-2 border-slate-300 bg-white" />

                    <span className="mt-2 text-[10px] font-semibold text-slate-400">
                      Offer
                    </span>

                  </div>

                </div>

              </div>

              <button className="hidden rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700 xl:block">
                <MoreVertical size={19} />
              </button>

            </div>

            <div className="mt-4 flex justify-end">

              <button className="rounded-xl border border-blue-200 px-4 py-2 text-xs font-bold text-blue-600 transition hover:bg-blue-50">
                View Details
              </button>

            </div>

          </div>

          {/* =====================================================
              JOB CARD 3 - AMAZON
          ===================================================== */}
          <div className="mb-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-violet-200 hover:shadow-md">

            <div className="grid gap-5 xl:grid-cols-[minmax(0,1.4fr)_170px_minmax(260px,1fr)_40px] xl:items-center">

              <div>

                <div className="flex gap-4">

                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-3xl font-black text-slate-900 shadow-sm">
                    a
                  </div>

                  <div className="min-w-0">

                    <h2 className="text-lg font-extrabold text-slate-950">
                      Frontend Developer
                    </h2>

                    <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs font-medium text-slate-500">

                      <span className="font-semibold text-slate-700">
                        Amazon
                      </span>

                      <span>•</span>

                      <span>
                        <MapPin size={13} className="mr-1 inline" />
                        Bangalore, India
                      </span>

                      <span>•</span>

                      <span>Full-time</span>

                      <span>•</span>

                      <span>
                        ₹16L – ₹24L
                      </span>

                    </div>

                  </div>

                </div>

                <div className="mt-3 flex flex-wrap gap-2 pl-[70px]">

                  <span className="rounded-full bg-blue-50 px-3 py-1 text-[11px] font-semibold text-blue-700">
                    React
                  </span>

                  <span className="rounded-full bg-blue-50 px-3 py-1 text-[11px] font-semibold text-blue-700">
                    Next.js
                  </span>

                  <span className="rounded-full bg-blue-50 px-3 py-1 text-[11px] font-semibold text-blue-700">
                    AWS
                  </span>

                  <span className="rounded-full bg-blue-50 px-3 py-1 text-[11px] font-semibold text-blue-700">
                    TypeScript
                  </span>

                </div>

              </div>

              <div className="xl:text-center">

                <span className="inline-flex items-center gap-2 rounded-full bg-violet-50 px-4 py-2 text-xs font-bold text-violet-600">
                  <Sparkles size={14} />
                  Offered
                </span>

                <div className="mt-2 text-xs text-slate-400">
                  Applied on 5 Aug 2024
                </div>

              </div>

              <div>

                <div className="relative flex items-start justify-between">

                  <div className="absolute left-2 right-2 top-3 h-px bg-violet-200" />

                  <div className="relative z-10 flex flex-col items-center">

                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-violet-600 text-white">
                      <CheckCircle2 size={15} />
                    </div>

                    <span className="mt-2 text-[10px] font-semibold text-slate-500">
                      Applied
                    </span>

                  </div>

                  <div className="relative z-10 flex flex-col items-center">

                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-violet-600 text-white">
                      <CheckCircle2 size={15} />
                    </div>

                    <span className="mt-2 text-[10px] font-semibold text-slate-500">
                      Screening
                    </span>

                  </div>

                  <div className="relative z-10 flex flex-col items-center">

                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-violet-600 text-white">
                      <CheckCircle2 size={15} />
                    </div>

                    <span className="mt-2 text-[10px] font-semibold text-slate-500">
                      Interview
                    </span>

                  </div>

                  <div className="relative z-10 flex flex-col items-center">

                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-violet-600 text-white">
                      <CheckCircle2 size={15} />
                    </div>

                    <span className="mt-2 text-[10px] font-bold text-slate-800">
                      Offer
                    </span>

                  </div>

                </div>

              </div>

              <button className="hidden rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700 xl:block">
                <MoreVertical size={19} />
              </button>

            </div>

            <div className="mt-4 flex justify-end">

              <button className="rounded-xl bg-violet-600 px-4 py-2 text-xs font-bold text-white shadow-md shadow-violet-100 transition hover:bg-violet-700">
                View Offer
              </button>

            </div>

          </div>

          {/* =====================================================
              JOB CARD 4 - TCS
          ===================================================== */}
          <div className="mb-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-rose-200 hover:shadow-md">

            <div className="grid gap-5 xl:grid-cols-[minmax(0,1.4fr)_170px_minmax(260px,1fr)_40px] xl:items-center">

              <div>

                <div className="flex gap-4">

                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-xl font-black text-pink-500 shadow-sm">
                    tcs
                  </div>

                  <div className="min-w-0">

                    <h2 className="text-lg font-extrabold text-slate-950">
                      UI/UX Developer
                    </h2>

                    <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs font-medium text-slate-500">

                      <span className="font-semibold text-slate-700">
                        Tata Consultancy Services
                      </span>

                      <span>•</span>

                      <span>
                        <MapPin size={13} className="mr-1 inline" />
                        Pune, India
                      </span>

                      <span>•</span>

                      <span>Full-time</span>

                      <span>•</span>

                      <span>
                        ₹7L – ₹12L
                      </span>

                    </div>

                  </div>
                </div>

                <div className="mt-3 flex flex-wrap gap-2 pl-[70px]">

                  <span className="rounded-full bg-blue-50 px-3 py-1 text-[11px] font-semibold text-blue-700">
                    Figma
                  </span>

                  <span className="rounded-full bg-blue-50 px-3 py-1 text-[11px] font-semibold text-blue-700">
                    UI/UX
                  </span>

                  <span className="rounded-full bg-blue-50 px-3 py-1 text-[11px] font-semibold text-blue-700">
                    React
                  </span>

                  <span className="rounded-full bg-blue-50 px-3 py-1 text-[11px] font-semibold text-blue-700">
                    Tailwind CSS
                  </span>

                </div>

              </div>

              <div className="xl:text-center">

                <span className="inline-flex items-center gap-2 rounded-full bg-rose-50 px-4 py-2 text-xs font-bold text-rose-600">
                  <XCircle size={14} />
                  Not Selected
                </span>

                <div className="mt-2 text-xs text-slate-400">
                  Applied on 1 Aug 2024
                </div>

              </div>

              <div>

                <div className="relative flex items-start justify-between">

                  <div className="absolute left-2 right-2 top-3 h-px bg-rose-200" />

                  <div className="relative z-10 flex flex-col items-center">

                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-violet-600 text-white">
                      <CheckCircle2 size={15} />
                    </div>

                    <span className="mt-2 text-[10px] font-semibold text-slate-500">
                      Applied
                    </span>

                  </div>

                  <div className="relative z-10 flex flex-col items-center">

                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-violet-600 text-white">
                      <CheckCircle2 size={15} />
                    </div>

                    <span className="mt-2 text-[10px] font-semibold text-slate-500">
                      Screening
                    </span>

                  </div>

                  <div className="relative z-10 flex flex-col items-center">

                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-rose-500 text-white">
                      <XCircle size={14} />
                    </div>

                    <span className="mt-2 text-[10px] font-bold text-rose-600">
                      Interview
                    </span>

                  </div>

                  <div className="relative z-10 flex flex-col items-center">

                    <div className="h-6 w-6 rounded-full border-2 border-slate-300 bg-white" />

                    <span className="mt-2 text-[10px] font-semibold text-slate-400">
                      Offer
                    </span>

                  </div>

                </div>

              </div>

              <button className="hidden rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700 xl:block">
                <MoreVertical size={19} />
              </button>

            </div>

            <div className="mt-4 flex justify-end">

              <button className="rounded-xl border border-blue-200 px-4 py-2 text-xs font-bold text-blue-600 transition hover:bg-blue-50">
                View Details
              </button>

            </div>

          </div>

          {/* =====================================================
              JOB CARD 5 - INFOSYS
          ===================================================== */}
          <div className="mb-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-blue-200 hover:shadow-md">

            <div className="grid gap-5 xl:grid-cols-[minmax(0,1.4fr)_170px_minmax(260px,1fr)_40px] xl:items-center">

              <div>

                <div className="flex gap-4">

                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-lg font-medium text-blue-500 shadow-sm">
                    Infosys
                  </div>

                  <div className="min-w-0">

                    <h2 className="text-lg font-extrabold text-slate-950">
                      React Developer
                    </h2>

                    <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs font-medium text-slate-500">

                      <span className="font-semibold text-slate-700">
                        Infosys
                      </span>

                      <span>•</span>

                      <span>
                        <MapPin size={13} className="mr-1 inline" />
                        Remote
                      </span>

                      <span>•</span>

                      <span>Full-time</span>

                      <span>•</span>

                      <span>
                        ₹6L – ₹10L
                      </span>

                    </div>

                  </div>
                </div>

                <div className="mt-3 flex flex-wrap gap-2 pl-[70px]">

                  <span className="rounded-full bg-blue-50 px-3 py-1 text-[11px] font-semibold text-blue-700">
                    React
                  </span>

                  <span className="rounded-full bg-blue-50 px-3 py-1 text-[11px] font-semibold text-blue-700">
                    JavaScript
                  </span>

                  <span className="rounded-full bg-blue-50 px-3 py-1 text-[11px] font-semibold text-blue-700">
                    HTML
                  </span>

                  <span className="rounded-full bg-blue-50 px-3 py-1 text-[11px] font-semibold text-blue-700">
                    CSS
                  </span>

                </div>

              </div>

              <div className="xl:text-center">

                <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-xs font-bold text-blue-600">
                  <Clock3 size={14} />
                  In Progress
                </span>

                <div className="mt-2 text-xs text-slate-400">
                  Applied on 28 Jul 2024
                </div>

              </div>

              <div>

                <div className="relative flex items-start justify-between">

                  <div className="absolute left-2 right-2 top-3 h-px bg-blue-200" />

                  <div className="relative z-10 flex flex-col items-center">

                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-white">
                      <CheckCircle2 size={15} />
                    </div>

                    <span className="mt-2 text-[10px] font-semibold text-slate-500">
                      Applied
                    </span>

                  </div>

                  <div className="relative z-10 flex flex-col items-center">

                    <div className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-blue-600 bg-white">
                      <span className="h-2 w-2 rounded-full bg-blue-600" />
                    </div>

                    <span className="mt-2 text-[10px] font-bold text-slate-800">
                      Screening
                    </span>

                  </div>

                  <div className="relative z-10 flex flex-col items-center">

                    <div className="h-6 w-6 rounded-full border-2 border-slate-300 bg-white" />

                    <span className="mt-2 text-[10px] font-semibold text-slate-400">
                      Interview
                    </span>

                  </div>

                  <div className="relative z-10 flex flex-col items-center">

                    <div className="h-6 w-6 rounded-full border-2 border-slate-300 bg-white" />

                    <span className="mt-2 text-[10px] font-semibold text-slate-400">
                      Offer
                    </span>

                  </div>

                </div>

              </div>

              <button className="hidden rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700 xl:block">
                <MoreVertical size={19} />
              </button>

            </div>

            <div className="mt-4 flex justify-end">

              <button className="rounded-xl border border-blue-200 px-4 py-2 text-xs font-bold text-blue-600 transition hover:bg-blue-50">
                View Details
              </button>

            </div>

          </div>

          {/* =====================================================
              END OF JOBS
          ===================================================== */}
        </main>

      </div>
    </div>
  );
};

export default MyJobs;
