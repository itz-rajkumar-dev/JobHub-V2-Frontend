import React, { useEffect, useState } from "react";
import NavBar from "../component/NavBar";
import Footer from "../component/Footer";
import boy from "../assets/boy.png";
import api from "../Service/Api";
import { useNavigate } from "react-router-dom";
import momoBanner from "../assets/momo2.png";
import {
  MapPin,
  ArrowRight,
  Bookmark,
  Building2,
  BriefcaseBusiness,
  Users,
  BarChart3,
  Sparkles,
  Target,
  CheckCircle2,
  Clock3,
  Zap,
  ShieldCheck,
  Bell,
  Search,
  ChevronLeft,
  ChevronRight,
  BellRing,
  FileCheck2,
  FileText,
  MessageCircle,
  Bot,
   Star,
  Quote,
  MessageSquareQuote,
    Code2,
  Monitor,
  Cloud,
  BrainCircuit,
  Palette,
  Smartphone,
  UsersRound,
  TrendingUp,
  ArrowUpRight,
} from "lucide-react";
import toast from "react-hot-toast";

// ============================================================
// DATA
// ============================================================



// ============================================================
// HERO SLIDES
// ============================================================

const slides = [
  {
    title: "Find Jobs That Match",
    highlight: "Your Passion",
    description:
      "Explore thousands of jobs from top companies and build your future.",
    image: boy,
  },

  {
    title: "Build Your Career",
    highlight: "With Confidence",
    description:
      "Find the right opportunity and take the next step in your career.",
    video: "/job.mp4",
  },

  {
    title: "Discover Your",
    highlight: "Dream Job",
    description:
      "Connect with companies and discover exciting opportunities.",
    image: boy,
  },
];

// ============================================================
// JOB PICK CARD
// ============================================================

// ============================================================
// HOME
// ============================================================

const Home = () => {
  const [slide, setSlide] = useState(0);

  const [jobs, setJobs] = useState([]);

  const navigate = useNavigate();
useEffect(() => {
  api.get("/jobs")
    .then((response) => {
      console.log("Jobs:", response.data);
      setJobs(response.data);
      
    })
    .catch((error) => {
      console.log("API ERROR:", error);
    });
}, []);

const [companies, setCompanies] = useState([]);

useEffect(() => {
  api.get("/company")
    .then((response) => {
      console.log("Companies:", response.data);
      setCompanies(response.data);
    })
    .catch((error) => {
      console.log("COMPANY API ERROR:", error);
    });
}, []);
  // ==========================================================
  // AUTO SLIDER
  // ==========================================================

  useEffect(() => {
    const duration = slide === 1 ? 12000 : 5000;

    const timer = setTimeout(() => {
      setSlide((prev) => (prev + 1) % slides.length);
    }, duration);

    return () => clearTimeout(timer);
  }, [slide]);

  // ==========================================================
  // NEXT SLIDE
  // ==========================================================

  const nextSlide = () => {
    setSlide((prev) => (prev + 1) % slides.length);
  };

  // ==========================================================
  // PREVIOUS SLIDE
  // ==========================================================

  const previousSlide = () => {
    setSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

const [category, setCategory] = useState([]);

useEffect(() => {
  api.get("/category")
    .then((response) => {
      console.log(response.data);
      setCategory(response.data || []);
    })
    .catch((error) => {
      console.log("API error", error);
      toast.error(
        error.response?.data?.message || "Failed to load categories"
      );
    });
}, []);


const[company,setCompany]=useState([]);

useEffect(()=>{

  api.get("/company")
  .then((response)=>{

    console.log(response.data);
    setCompany(response.data || []);
  }).catch((error)=>{

    console.log("API ERROR",error);

     toast.error( error.response?.data?.message || "Failed to load company" );
  })

},[]);


  return (
    <div
      className="min-h-screen bg-white text-slate-900"
      style={{
        fontFamily:
          "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif",
      }}
    >
      <NavBar />

      {/* ======================================================
          HERO CAROUSEL
      ====================================================== */}

      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="mx-auto flex min-h-[540px] max-w-[1500px] items-center px-6 py-14 sm:px-10 lg:px-16">
          
          {/* LEFT */}

          <div className="z-10 w-full max-w-[650px]">
            <div className="mb-5 inline-flex items-center rounded-full border border-blue-100 bg-white px-4 py-2 text-[12px] font-bold text-blue-600 shadow-sm">
              <span className="mr-2 h-2 w-2 rounded-full bg-blue-600"></span>
              Find Your Dream Job
            </div>

            <h1 className="text-4xl font-black leading-[1.1] tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
              {slides[slide].title}

              <span className="block text-blue-600">
                {slides[slide].highlight}
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-7 text-slate-600 sm:text-lg">
              {slides[slide].description}
            </p>

            {/* HERO BUTTONS */}


          </div>

          {/* RIGHT IMAGE / VIDEO */}

          <div className="absolute right-[-40px] hidden h-[520px] w-[600px] items-center justify-center lg:flex xl:right-10">
            {slides[slide].video ? (
              <video
                src={slides[slide].video}
                autoPlay
                muted
                loop
                playsInline
                className="h-[500px] w-[560px] rounded-2xl object-contain"
              />
            ) : (
              <img
                src={slides[slide].image}
                alt="Job seeker"
                className="h-[500px] w-[540px] object-contain"
              />
            )}
          </div>

          {/* MOBILE IMAGE */}

          <div className="absolute bottom-0 right-0 opacity-10 lg:hidden">
            {slides[slide].video ? (
              <video
                src={slides[slide].video}
                autoPlay
                muted
                loop
                playsInline
                className="h-[250px] w-[280px] object-contain"
              />
            ) : (
              <img
                src={slides[slide].image}
                alt="Job seeker"
                className="h-[250px] w-[280px] object-contain"
              />
            )}
          </div>
        </div>

        {/* PREVIOUS */}

        <button
          type="button"
          onClick={previousSlide}
          aria-label="Previous slide"
          className="absolute left-4 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-lg transition hover:bg-blue-600 hover:text-white sm:left-6"
        >
          <ChevronLeft size={21} />
        </button>

        {/* NEXT */}

        <button
          type="button"
          onClick={nextSlide}
          aria-label="Next slide"
          className="absolute right-4 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-lg transition hover:bg-blue-600 hover:text-white sm:right-6"
        >
          <ChevronRight size={21} />
        </button>

        {/* DOTS */}

        <div className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 gap-2">
          {slides.map((_, index) => (
            <button
              type="button"
              key={index}
              onClick={() => setSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                slide === index
                  ? "w-8 bg-blue-600"
                  : "w-2.5 bg-slate-300 hover:bg-slate-400"
              }`}
            />
          ))}
        </div>
      </section>



      
        <section className="bg-slate-50 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">

        {/* Section Heading */}
        <div className="mb-10 text-center">
          <span className="inline-block rounded-full border
            border-blue-200 bg-blue-50 px-4 py-1.5
            text-xs font-bold tracking-widest text-blue-700">
            BUILD YOUR FUTURE
          </span>

          <h2 className="mt-4 text-3xl font-extrabold
            tracking-tight text-slate-900 sm:text-4xl">
            Your Next Career Move Starts Here
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-sm
            leading-6 text-slate-600 sm:text-base">
            Explore opportunities, discover great companies,
            and take control of your professional journey.
          </p>
        </div>

        {/* Static Cards */}
        <div className="grid grid-cols-1 gap-5
          sm:grid-cols-2 xl:grid-cols-4">

          {/* Explore Jobs */}
          <a href="/jobs"
            className="group relative overflow-hidden rounded-2xl
              border border-blue-200 bg-white p-6 shadow-sm
              transition-all duration-300
              hover:-translate-y-1 hover:border-blue-500
              hover:shadow-xl hover:shadow-blue-100/70">

            <div className="absolute left-0 top-0 h-1 w-full
              bg-blue-500" />

            <div className="flex items-center justify-between">
              <div className="flex h-14 w-14 items-center
                justify-center rounded-2xl border border-blue-100
                bg-blue-50 text-blue-600
                transition group-hover:bg-blue-600
                group-hover:text-white">
                <BriefcaseBusiness size={26} />
              </div>

              <ArrowUpRight size={21}
                className="text-slate-400 transition
                  group-hover:-translate-y-1
                  group-hover:translate-x-1
                  group-hover:text-blue-600" />
            </div>

            <p className="mt-6 text-xs font-bold uppercase
              tracking-widest text-blue-600">
              Find Your Fit
            </p>

            <h3 className="mt-2 text-xl font-bold text-slate-900
              group-hover:text-blue-700">
              Explore Jobs
            </h3>

            <p className="mt-3 text-sm leading-6 text-slate-600">
              Discover exciting opportunities that match
              your skills and career goals.
            </p>

            <div className="mt-6 flex items-center gap-2
              border-t border-blue-100 pt-4 text-sm
              font-semibold text-blue-700">
              Browse Opportunities
              <ArrowUpRight size={16} />
            </div>
          </a>

          {/* Top Companies */}
          <a href="/companies"
            className="group relative overflow-hidden rounded-2xl
              border border-violet-200 bg-white p-6 shadow-sm
              transition-all duration-300
              hover:-translate-y-1 hover:border-violet-500
              hover:shadow-xl hover:shadow-violet-100/70">

            <div className="absolute left-0 top-0 h-1 w-full
              bg-violet-500" />

            <div className="flex items-center justify-between">
              <div className="flex h-14 w-14 items-center
                justify-center rounded-2xl border border-violet-100
                bg-violet-50 text-violet-600
                transition group-hover:bg-violet-600
                group-hover:text-white">
                <Building2 size={26} />
              </div>

              <ArrowUpRight size={21}
                className="text-slate-400 transition
                  group-hover:-translate-y-1
                  group-hover:translate-x-1
                  group-hover:text-violet-600" />
            </div>

            <p className="mt-6 text-xs font-bold uppercase
              tracking-widest text-violet-600">
              Your Next Workplace
            </p>

            <h3 className="mt-2 text-xl font-bold text-slate-900
              group-hover:text-violet-700">
              Top Companies
            </h3>

            <p className="mt-3 text-sm leading-6 text-slate-600">
              Explore company profiles, learn about workplaces,
              and discover new career possibilities.
            </p>

            <div className="mt-6 flex items-center gap-2
              border-t border-violet-100 pt-4 text-sm
              font-semibold text-violet-700">
              Discover Companies
              <ArrowUpRight size={16} />
            </div>
          </a>

          {/* Career Community */}
          <a href="/profile"
            className="group relative overflow-hidden rounded-2xl
              border border-emerald-200 bg-white p-6 shadow-sm
              transition-all duration-300
              hover:-translate-y-1 hover:border-emerald-500
              hover:shadow-xl hover:shadow-emerald-100/70">

            <div className="absolute left-0 top-0 h-1 w-full
              bg-emerald-500" />

            <div className="flex items-center justify-between">
              <div className="flex h-14 w-14 items-center
                justify-center rounded-2xl border border-emerald-100
                bg-emerald-50 text-emerald-600
                transition group-hover:bg-emerald-600
                group-hover:text-white">
                <UsersRound size={26} />
              </div>

              <ArrowUpRight size={21}
                className="text-slate-400 transition
                  group-hover:-translate-y-1
                  group-hover:translate-x-1
                  group-hover:text-emerald-600" />
            </div>

            <p className="mt-6 text-xs font-bold uppercase
              tracking-widest text-emerald-600">
              Grow Together
            </p>

            <h3 className="mt-2 text-xl font-bold text-slate-900
              group-hover:text-emerald-700">
              Career Community
            </h3>

            <p className="mt-3 text-sm leading-6 text-slate-600">
              Build a strong professional profile and help
              recruiters discover your potential.
            </p>

            <div className="mt-6 flex items-center gap-2
              border-t border-emerald-100 pt-4 text-sm
              font-semibold text-emerald-700">
              Build Your Profile
              <ArrowUpRight size={16} />
            </div>
          </a>

          {/* Application Tracking */}
          <a href="/applications"
            className="group relative overflow-hidden rounded-2xl
              border border-amber-200 bg-white p-6 shadow-sm
              transition-all duration-300
              hover:-translate-y-1 hover:border-amber-500
              hover:shadow-xl hover:shadow-amber-100/70">

            <div className="absolute left-0 top-0 h-1 w-full
              bg-amber-500" />

            <div className="flex items-center justify-between">
              <div className="flex h-14 w-14 items-center
                justify-center rounded-2xl border border-amber-100
                bg-amber-50 text-amber-600
                transition group-hover:bg-amber-500
                group-hover:text-white">
                <TrendingUp size={26} />
              </div>

              <ArrowUpRight size={21}
                className="text-slate-400 transition
                  group-hover:-translate-y-1
                  group-hover:translate-x-1
                  group-hover:text-amber-600" />
            </div>

            <p className="mt-6 text-xs font-bold uppercase
              tracking-widest text-amber-600">
              Stay On Track
            </p>

            <h3 className="mt-2 text-xl font-bold text-slate-900
              group-hover:text-amber-700">
              My Applications
            </h3>

            <p className="mt-3 text-sm leading-6 text-slate-600">
              Keep your applications organized and follow
              your progress throughout the hiring process.
            </p>

            <div className="mt-6 flex items-center gap-2
              border-t border-amber-100 pt-4 text-sm
              font-semibold text-amber-700">
              Track Applications
              <ArrowUpRight size={16} />
            </div>
          </a>

        </div>

        {/* Bottom CTA */}
      

      </div>

       </section>

{/* ======================================================
    JOB PICKS — PREMIUM JOBHUB UI
====================================================== */}

<section className="relative overflow-hidden bg-gradient-to-b
  from-slate-50 via-white to-blue-50/40 px-5 py-20 sm:px-8 lg:px-10">

  {/* Background Decoration */}
  <div className="pointer-events-none absolute -left-32 top-20
    h-72 w-72 rounded-full bg-blue-100/40 blur-3xl" />

  <div className="pointer-events-none absolute -right-32 bottom-10
    h-72 w-72 rounded-full bg-indigo-100/40 blur-3xl" />

  <div className="relative mx-auto max-w-[1180px]">

    {/* Section Heading */}
    <div className="mb-12 flex flex-col items-center text-center">

      <span className="mb-4 inline-flex items-center gap-2
        rounded-full border border-blue-100 bg-white
        px-4 py-2 text-xs font-bold tracking-wide text-blue-700
        shadow-sm">
        <i className="fa-solid fa-sparkles" />
        HANDPICKED OPPORTUNITIES
      </span>

      <h2 className="text-3xl font-black tracking-tight
        text-slate-950 sm:text-4xl lg:text-[42px]">
        Job picks <span className="text-blue-600">for you.</span>
      </h2>

      <p className="mt-4 max-w-xl text-sm leading-7
        text-slate-500 sm:text-base">
        Explore exciting career opportunities from companies
        looking for talented professionals like you.
      </p>

      <div className="mt-6 flex flex-wrap items-center
        justify-center gap-3 text-xs font-semibold text-slate-500">

        <span className="flex items-center gap-2 rounded-full
          border border-slate-200 bg-white px-4 py-2">
          <i className="fa-solid fa-briefcase text-blue-600" />
          Latest opportunities
        </span>

        <span className="flex items-center gap-2 rounded-full
          border border-slate-200 bg-white px-4 py-2">
          <i className="fa-solid fa-building text-indigo-600" />
          Top companies
        </span>

      </div>
    </div>


    {/* Job Cards */}
    <div className="grid gap-6 md:grid-cols-2">

      {jobs.slice(0, 4).map((job) => (

        <div
          key={job.jobId}
          className="group relative flex flex-col overflow-hidden
            rounded-3xl border border-slate-200/80 bg-white
            shadow-sm transition-all duration-300
            hover:-translate-y-1.5 hover:border-blue-200
            hover:shadow-2xl hover:shadow-blue-100/60"
        >

          {/* Top Accent */}
          <div className="h-1 w-full bg-gradient-to-r
            from-blue-500 via-indigo-500 to-violet-500
            opacity-70 transition-opacity group-hover:opacity-100" />

          <div className="flex flex-1 flex-col p-5 sm:p-6">

            {/* Header */}
            <div className="flex items-start gap-4">

              {/* Company Logo */}
              <div className="flex h-16 w-16 shrink-0
                items-center justify-center overflow-hidden
                rounded-2xl border border-slate-200
                bg-white shadow-sm transition-all duration-300
                group-hover:border-blue-200 group-hover:shadow-md">

                {companies.find(
                  (company) => company.companyId === job.companyId
                )?.logoUrl ? (

                  <img
                    src={
                      companies.find(
                        (company) => company.companyId === job.companyId
                      )?.logoUrl
                    }
                    alt={`${job.companyName || "Company"} logo`}
                    className="h-full w-full object-contain p-2.5"
                  />

                ) : (

                  <span className="text-2xl font-black text-blue-600">
                    {job.companyName?.charAt(0)?.toUpperCase() || "C"}
                  </span>

                )}

              </div>


              {/* Job Title */}
              <div className="min-w-0 flex-1">

                <div className="mb-2 flex flex-wrap items-center gap-2">

                  {job.featured && (
                    <span className="inline-flex items-center gap-1
                      rounded-full border border-amber-200
                      bg-amber-50 px-2.5 py-1 text-[10px]
                      font-extrabold uppercase tracking-wide
                      text-amber-700">
                      <i className="fa-solid fa-star text-[9px]" />
                      Featured
                    </span>
                  )}

                  {job.workMode && (
                    <span className="rounded-full bg-blue-50
                      px-2.5 py-1 text-[10px] font-bold
                      uppercase tracking-wide text-blue-700">
                      {job.workMode}
                    </span>
                  )}

                </div>

                <h3 className="text-base font-extrabold leading-6
                  text-slate-900 transition-colors
                  group-hover:text-blue-700 sm:text-lg">
                  {job.title}
                </h3>

                <p className="mt-1.5 text-sm font-semibold text-slate-600">
                  {job.companyName || "Company"}
                </p>

                {job.categoryName && (
                  <p className="mt-1 text-xs font-medium text-slate-400">
                    {job.categoryName}
                  </p>
                )}

              </div>

            </div>


            {/* Job Details */}
            <div className="mt-6 grid grid-cols-2 gap-3">

              <div className="flex min-w-0 items-center gap-2.5
                rounded-xl border border-slate-100
                bg-slate-50/80 px-3 py-3
                transition group-hover:bg-blue-50/60">

                <i className="fa-solid fa-location-dot
                  text-sm text-blue-600" />

                <span className="truncate text-xs font-semibold text-slate-600">
                  {job.location || "Location not specified"}
                </span>

              </div>


              <div className="flex min-w-0 items-center gap-2.5
                rounded-xl border border-slate-100
                bg-slate-50/80 px-3 py-3
                transition group-hover:bg-blue-50/60">

                <i className="fa-solid fa-house-laptop
                  text-sm text-blue-600" />

                <span className="truncate text-xs font-semibold text-slate-600">
                  {job.workMode || "Not specified"}
                </span>

              </div>


              <div className="flex min-w-0 items-center gap-2.5
                rounded-xl border border-slate-100
                bg-slate-50/80 px-3 py-3
                transition group-hover:bg-blue-50/60">

                <i className="fa-solid fa-briefcase
                  text-sm text-blue-600" />

                <span className="truncate text-xs font-semibold text-slate-600">
                  {job.jobType || "Full Time"}
                </span>

              </div>


              <div className="flex min-w-0 items-center gap-2.5
                rounded-xl border border-slate-100
                bg-slate-50/80 px-3 py-3
                transition group-hover:bg-blue-50/60">

                <i className="fa-solid fa-user-tie
                  text-sm text-blue-600" />

                <span className="truncate text-xs font-semibold text-slate-600">
                  {job.experienceMin != null && job.experienceMax != null
                    ? `${job.experienceMin}-${job.experienceMax} Years`
                    : "Experience not specified"}
                </span>

              </div>

            </div>


            {/* Salary */}
            {(job.salaryMin != null || job.salaryMax != null) && (

              <div className="mt-5 flex items-center justify-between
                gap-3 rounded-2xl border border-emerald-100
                bg-gradient-to-r from-emerald-50 to-green-50/60
                px-4 py-3.5">

                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 shrink-0
                    items-center justify-center rounded-xl
                    bg-white text-emerald-600 shadow-sm">

                    <i className="fa-solid fa-money-bill-wave" />

                  </div>

                  <div>
                    <p className="text-[10px] font-bold uppercase
                      tracking-wider text-slate-400">
                      Salary
                    </p>

                    <p className="mt-0.5 text-xs font-semibold text-slate-600">
                      Compensation
                    </p>
                  </div>

                </div>

                <p className="text-right text-sm font-extrabold
                  text-emerald-700">

                  {job.salaryCurrency || "₹"}{" "}
                  {job.salaryMin != null
                    ? job.salaryMin.toLocaleString("en-IN")
                    : "—"}

                  {job.salaryMax != null
                    ? ` - ${job.salaryMax.toLocaleString("en-IN")}`
                    : ""}

                </p>

              </div>

            )}


            {/* Skills */}
            {job.skills?.length > 0 && (

              <div className="mt-6">

                <div className="mb-3 flex items-center justify-between">

                  <p className="text-[11px] font-extrabold
                    uppercase tracking-[0.12em] text-slate-400">
                    Required skills
                  </p>

                  <i className="fa-solid fa-code text-xs text-slate-300" />

                </div>

                <div className="flex flex-wrap gap-2">

                  {job.skills.slice(0, 5).map((skill, index) => (

                    <span
                      key={`${job.jobId}-${skill}-${index}`}
                      className="rounded-full border border-slate-200
                        bg-white px-3 py-1.5 text-[11px]
                        font-semibold text-slate-600
                        transition hover:border-blue-200
                        hover:bg-blue-50 hover:text-blue-700"
                    >
                      {skill}
                    </span>

                  ))}

                  {job.skills.length > 5 && (

                    <span className="rounded-full bg-slate-100
                      px-3 py-1.5 text-[11px] font-bold text-slate-500">
                      +{job.skills.length - 5} more
                    </span>

                  )}

                </div>

              </div>

            )}


            {/* Bottom Action */}
            <div className="mt-auto flex items-center justify-between
              gap-3 border-t border-slate-100 pt-5 mt-6">

              <div className="min-w-0">

                {job.vacancies != null && (

                  <p className="flex items-center gap-2
                    text-xs font-bold text-slate-600">

                    <i className="fa-solid fa-users text-blue-500" />

                    {job.vacancies} openings

                  </p>

                )}

                {job.applicationsCount != null && (

                  <p className="mt-1.5 text-[11px] text-slate-400">
                    {job.applicationsCount} applications
                  </p>

                )}

              </div>


              <button
                type="button"
                onClick={() => navigate(`/apply-job/${job.jobId}`)}
                className="inline-flex shrink-0 items-center
                  justify-center gap-2 rounded-xl
                  bg-slate-950 px-4 py-3 text-xs font-bold
                  text-white shadow-md transition-all duration-300
                  hover:-translate-y-0.5 hover:bg-blue-600
                  hover:shadow-lg hover:shadow-blue-200
                  active:translate-y-0 sm:px-5"
              >

                Apply Now

                <i className="fa-solid fa-arrow-right
                  transition-transform duration-300
                  group-hover:translate-x-1" />

              </button>

            </div>

          </div>

        </div>

      ))}

    </div>


    {/* More Opportunities */}
    <div className="mt-12 flex flex-col items-center">

      <p className="mb-4 text-sm text-slate-500">
        Still exploring? Find the right opportunity for you.
      </p>

      <button
        type="button"
        onClick={() => navigate("/jobs")}
        className="group inline-flex items-center gap-3
          rounded-xl border border-blue-200 bg-white
          px-7 py-3.5 text-sm font-bold text-blue-700
          shadow-sm transition-all duration-300
          hover:-translate-y-0.5 hover:border-blue-600
          hover:bg-blue-600 hover:text-white hover:shadow-lg"
      >

        Explore All Jobs

        <i className="fa-solid fa-arrow-right
          transition-transform group-hover:translate-x-1" />

      </button>

    </div>

  </div>

</section>




 <section className="relative overflow-hidden bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">

        {/* Heading */}
        <div className="mb-10 flex flex-col gap-5
          sm:flex-row sm:items-end sm:justify-between">

          <div>
            <div className="mb-4 inline-flex items-center gap-2
              rounded-full border border-blue-200 bg-blue-50
              px-4 py-2 text-xs font-bold tracking-wider
              text-blue-700">
              <Sparkles size={15} />
              COMPANY DIRECTORY
            </div>

            <h2 className="text-3xl font-extrabold
              tracking-tight text-slate-900 sm:text-4xl">
              Trusted by Leading
              <span className="block text-blue-600">
                Companies
              </span>
            </h2>

            <p className="mt-3 max-w-xl text-sm leading-6
              text-slate-600 sm:text-base">
              Discover leading brands, explore company profiles,
              and find opportunities to grow your career.
            </p>
          </div>

          <a
            href="/companies"
            className="group inline-flex w-fit items-center
              gap-2 rounded-xl border border-blue-200
              bg-white px-5 py-3 text-sm font-semibold
              text-blue-700 transition-all
              hover:border-blue-600 hover:bg-blue-50"
          >
            Explore Companies
            <ArrowUpRight size={17}
              className="transition-transform
                group-hover:-translate-y-0.5
                group-hover:translate-x-0.5" />
          </a>
        </div>

{/* Company Logo Grid */}
<div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">

  {company.map((companies) => (
    <a
      href="/companies"
      key={companies.id}
      className="group flex min-h-[130px] flex-col items-center
        justify-center rounded-2xl 
       p-5 shadow-sm transition-all duration-300
        hover:-translate-y-1
        hover:shadow-lg hover:shadow-orange-100/60"
    >

      {/* Company Logo */}
      <div className="flex h-14 w-full items-center justify-center
        overflow-hidden rounded-xl
        transition group-hover:bg-orange-50">

        {companies.logoUrl ? (
          <img
            src={companies.logoUrl}
            alt={`${companies.companyName} logo`}
            className="h-full w-full object-contain p-2"
          />
        ) : (
          <span className="text-2xl font-bold text-orange-600">
            {companies.companyName?.charAt(0)?.toUpperCase() || "C"}
          </span>
        )}

      </div>

      {/* Company Name */}
      <h3 className="mt-3 text-center text-sm font-bold text-slate-800
        transition group-hover:text-orange-600">
        {companies.companyName}
      </h3>

      {/* Industry */}
      <span className="mt-1 text-center text-xs text-slate-500">
        {companies.industry}
      </span>

    </a>
  ))}

</div>


        {/* Bottom CTA */}
       

      </div>
    </section>



     <section className="relative overflow-hidden bg-slate-50 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">

        {/* Section Heading */}
        <div className="mb-10 flex flex-col gap-5
          sm:flex-row sm:items-end sm:justify-between">

          <div>
            <span className="inline-flex items-center gap-2
              rounded-full border border-blue-200
              bg-blue-50 px-4 py-2 text-xs font-bold
              tracking-widest text-blue-700">
              <Sparkles size={15} />
              EXPLORE CAREER PATHS
            </span>

            <h2 className="mt-4 text-3xl font-extrabold
              tracking-tight text-slate-900 sm:text-4xl">
              Explore Jobs by
              <span className="text-blue-600"> Category</span>
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-6
              text-slate-600 sm:text-base">
              Discover exciting career opportunities across
              technology, design, data, and more.
            </p>
          </div>

          <a
            href="/jobs"
            className="group inline-flex w-fit items-center
              gap-2 rounded-xl border border-blue-200
              bg-white px-5 py-3 text-sm font-semibold
              text-blue-700 transition hover:border-blue-500
              hover:bg-blue-50"
          >
            View All Jobs
            <ArrowUpRight size={17}
              className="transition-transform
                group-hover:-translate-y-0.5
                group-hover:translate-x-0.5" />
          </a>
        </div>



{/* Category Cards */}
<div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">

  {category.map((catgories) => (
    <a
      key={catgories.id}
      href="/jobs"
      className="group relative overflow-hidden rounded-2xl
        border border-blue-200 bg-white p-6 shadow-sm
        transition-all duration-300 hover:-translate-y-1
        hover:border-blue-500 hover:shadow-xl
        hover:shadow-blue-100/70"
    >

      {/* Top Border */}
      <div className="absolute left-0 top-0 h-1 w-full bg-blue-500" />

      {/* Icon & Arrow */}
      <div className="flex items-center justify-between">

        <div className="flex h-14 w-14 items-center justify-center
          overflow-hidden rounded-2xl
         
         ">

          {catgories.iconUrl ? (
            <img
              src={catgories.iconUrl}
              alt={catgories.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <Code2 size={27} />
          )}

        </div>

        <ArrowUpRight
          size={20}
          className="text-slate-400 transition
            group-hover:-translate-y-1 group-hover:translate-x-1
            group-hover:text-blue-600"
        />

      </div>

      {/* Category Name */}
      <h3 className="mt-6 text-lg font-bold text-slate-900
        transition group-hover:text-blue-700">
        {catgories.name}
      </h3>

      {/* Description */}
      <p className="mt-2 text-sm leading-6 text-slate-600">
        {catgories.description}
      </p>

      {/* Explore Jobs */}
      <div className="mt-6 border-t border-blue-100
        pt-4 text-sm font-semibold text-blue-700">
        Explore Jobs <span className="ml-1">→</span>
      </div>

    </a>
  ))}

</div>


      </div>
    </section>



      {/* ======================================================
          LATEST JOB OPPORTUNITIES
 

      {/* ======================================================
          WHY JOBHUB
      ====================================================== */}

<section
  className="relative mt-10 overflow-hidden rounded-3xl
    border border-blue-100 shadow-sm"
  style={{
    backgroundImage: `url(${momoBanner})`,
    backgroundSize: "cover",
    backgroundPosition: "right center",
    backgroundRepeat: "no-repeat",
    minHeight: "620px",
  }}
>
  {/* Soft overlay */}
  <div className="absolute inset-0 -z-10 bg-white/10" />

  <div className="grid min-h-[590px] grid-cols-1 items-center
    px-6 py-8 sm:px-8 lg:grid-cols-[1.08fr_0.92fr]
    lg:px-10 lg:py-10">

    {/* LEFT CONTENT */}
    <div className="relative z-10 max-w-[660px]">

      {/* Badge */}
      <div className="inline-flex items-center gap-2 rounded-full
        border border-blue-200 bg-white/85 px-4 py-2
        text-sm font-semibold text-blue-600 shadow-sm">
        <Sparkles size={16} />
        AI-Powered Feature
      </div>

      {/* Heading */}
      <h2 className="mt-5 text-4xl font-extrabold
        leading-tight tracking-tight text-slate-900
        sm:text-5xl lg:text-[52px]">
        Meet{" "}
        <span className="bg-gradient-to-r from-blue-600
          to-purple-600 bg-clip-text text-transparent">
          Momo
        </span>
      </h2>

      <h3 className="mt-2 text-xl font-bold text-slate-800
        sm:text-2xl">
        Your AI Career Companion
      </h3>

      <p className="mt-3 max-w-lg text-sm leading-6
        text-slate-600 sm:text-base sm:leading-7">
        Get AI-powered resume analysis, career guidance
        and instant answers to all your job-related questions.
      </p>

      {/* Feature Cards */}
 <div className="mt-6 grid grid-cols-2 gap-3">

        <div className="rounded-2xl border border-blue-100
          bg-white/90 p-3.5 shadow-sm backdrop-blur-sm
          transition hover:-translate-y-0.5 hover:shadow-md
          sm:p-4">
          <div className="flex h-10 w-10 items-center
            justify-center rounded-xl bg-blue-50 text-xl">
            📄
          </div>
          <h4 className="mt-3 text-sm font-bold text-slate-900
            sm:text-base">
            Resume Analysis
          </h4>
          <p className="mt-1 text-xs leading-5 text-slate-500">
            Find strengths, missing skills and improve your resume.
          </p>
        </div>

        <div className="rounded-2xl border border-pink-100
          bg-white/90 p-3.5 shadow-sm backdrop-blur-sm
          transition hover:-translate-y-0.5 hover:shadow-md
          sm:p-4">
          <div className="flex h-10 w-10 items-center
            justify-center rounded-xl bg-pink-50 text-xl">
            🎯
          </div>
          <h4 className="mt-3 text-sm font-bold text-slate-900
            sm:text-base">
            Career Insights
          </h4>
          <p className="mt-1 text-xs leading-5 text-slate-500">
            Get personalized career and skill recommendations.
          </p>
        </div>

        <div className="rounded-2xl border border-emerald-100
          bg-white/90 p-3.5 shadow-sm backdrop-blur-sm
          transition hover:-translate-y-0.5 hover:shadow-md
          sm:p-4">
          <div className="flex h-10 w-10 items-center
            justify-center rounded-xl bg-emerald-50 text-xl">
            💬
          </div>
          <h4 className="mt-3 text-sm font-bold text-slate-900
            sm:text-base">
            Ask Momo Anything
          </h4>
          <p className="mt-1 text-xs leading-5 text-slate-500">
            Jobs, interviews, skills, career and more.
          </p>
        </div>

        <div className="rounded-2xl border border-orange-100
          bg-white/90 p-3.5 shadow-sm backdrop-blur-sm
          transition hover:-translate-y-0.5 hover:shadow-md
          sm:p-4">
          <div className="flex h-10 w-10 items-center
            justify-center rounded-xl bg-orange-50 text-xl">
            📈
          </div>
          <h4 className="mt-3 text-sm font-bold text-slate-900
            sm:text-base">
            Job Match Insights
          </h4>
          <p className="mt-1 text-xs leading-5 text-slate-500">
            See how well your profile matches opportunities.
          </p>
        </div>

      </div>

      {/* CTA */}
      <div className="mt-4">
        <button
          disabled
          className="inline-flex cursor-not-allowed
            items-center gap-2 rounded-full
            bg-gradient-to-r from-blue-600 to-purple-600
            px-6 py-3 text-sm font-bold text-white
            shadow-lg shadow-blue-500/20 opacity-95
            sm:px-7 sm:py-3.5 sm:text-base"
        >
          🚀 Coming Soon
        </button>
      </div>
    </div>

    {/* RIGHT SIDE: Background image already contains Momo */}
    <div className="hidden lg:block" />

  </div>
</section>

 <section className="relative isolate overflow-hidden bg-gradient-to-b from-slate-50 via-white to-blue-50/60 px-4 py-16 sm:px-6 sm:py-20 lg:px-8">

      {/* BACKGROUND DECORATIONS */}
      <div className="pointer-events-none absolute -left-24 top-40 -z-10 h-72 w-72 rounded-full bg-blue-200/30 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 top-72 -z-10 h-80 w-80 rounded-full bg-purple-200/30 blur-3xl" />

      <div className="mx-auto max-w-7xl">

        {/* SECTION HEADER */}
        <div className="mx-auto mb-12 max-w-3xl text-center sm:mb-14">

          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/90 px-4 py-2 text-xs font-bold tracking-wide text-blue-700 shadow-sm sm:text-sm">
            <Sparkles size={16} />
            BUILT FOR YOUR CAREER GROWTH
            <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
          </div>

          <h2 className="mt-6 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
            Why choose{" "}
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              JobHub?
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base lg:text-lg">
            Everything you need to search, apply and grow
            in your career — all in one place.
          </p>

          <div className="mx-auto mt-6 h-1 w-20 rounded-full bg-gradient-to-r from-blue-500 to-purple-500" />
        </div>

        {/* MAIN FEATURE PANEL */}
        <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[28px] border border-blue-200/80 bg-white/85 p-5 shadow-[0_16px_60px_-35px_rgba(37,99,235,0.35)] backdrop-blur-xl transition duration-300 hover:border-blue-300 hover:shadow-[0_24px_70px_-35px_rgba(79,70,229,0.3)] sm:p-8 lg:p-10">

          {/* Soft panel glow */}
          <div className="pointer-events-none absolute -right-20 -top-24 h-60 w-60 rounded-full bg-purple-100/60 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-20 h-60 w-60 rounded-full bg-blue-100/60 blur-3xl" />

          <div className="relative grid gap-x-8 gap-y-7 md:grid-cols-2 md:gap-x-10 lg:gap-x-14">

            {/* FEATURE 1 */}
            <div className="group flex gap-4 rounded-2xl border border-transparent p-3 transition duration-300 hover:border-blue-100 hover:bg-blue-50/60 sm:p-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-blue-100/80 text-blue-600 shadow-sm transition duration-300 group-hover:-translate-y-1 group-hover:scale-105 group-hover:shadow-md">
                <Search size={27} />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-slate-900 transition group-hover:text-blue-700 sm:text-lg">
                  Smart Job Search
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Find relevant jobs by title, skills, location
                  or company in just a few clicks.
                </p>
              </div>
            </div>

            {/* FEATURE 2 */}
            <div className="group flex gap-4 rounded-2xl border border-transparent p-3 transition duration-300 hover:border-pink-100 hover:bg-pink-50/50 sm:p-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-pink-100 bg-gradient-to-br from-pink-50 to-rose-100/80 text-pink-600 shadow-sm transition duration-300 group-hover:-translate-y-1 group-hover:scale-105 group-hover:shadow-md">
                <Target size={27} />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-slate-900 transition group-hover:text-pink-700 sm:text-lg">
                  Personalized Career Insights
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Discover relevant opportunities and build skills
                  that align with your career goals.
                </p>
              </div>
            </div>

            {/* FEATURE 3 */}
            <div className="group flex gap-4 rounded-2xl border border-transparent p-3 transition duration-300 hover:border-purple-100 hover:bg-purple-50/50 sm:p-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-purple-100 bg-gradient-to-br from-purple-50 to-violet-100/80 text-purple-600 shadow-sm transition duration-300 group-hover:-translate-y-1 group-hover:scale-105 group-hover:shadow-md">
                <Building2 size={27} />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-slate-900 transition group-hover:text-purple-700 sm:text-lg">
                  Explore Top Companies
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Explore company profiles, learn about employers
                  and discover career opportunities.
                </p>
              </div>
            </div>

            {/* FEATURE 4 */}
            <div className="group flex gap-4 rounded-2xl border border-transparent p-3 transition duration-300 hover:border-orange-100 hover:bg-orange-50/50 sm:p-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-orange-100 bg-gradient-to-br from-orange-50 to-amber-100/80 text-orange-600 shadow-sm transition duration-300 group-hover:-translate-y-1 group-hover:scale-105 group-hover:shadow-md">
                <BellRing size={27} />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-slate-900 transition group-hover:text-orange-700 sm:text-lg">
                  Real-time Job Notifications
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Stay informed about application status updates
                  and new job opportunities.
                </p>
              </div>
            </div>

            {/* FEATURE 5 */}
            <div className="group flex gap-4 rounded-2xl border border-transparent p-3 transition duration-300 hover:border-emerald-100 hover:bg-emerald-50/50 sm:p-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-emerald-100 bg-gradient-to-br from-emerald-50 to-green-100/80 text-emerald-600 shadow-sm transition duration-300 group-hover:-translate-y-1 group-hover:scale-105 group-hover:shadow-md">
                <FileText size={27} />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-slate-900 transition group-hover:text-emerald-700 sm:text-lg">
                  Build a Strong Profile
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Showcase your skills, experience and professional
                  details to potential employers.
                </p>
              </div>
            </div>

            {/* FEATURE 6 */}
            <div className="group flex gap-4 rounded-2xl border border-transparent p-3 transition duration-300 hover:border-indigo-100 hover:bg-indigo-50/50 sm:p-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-indigo-100 bg-gradient-to-br from-indigo-50 to-blue-100/80 text-indigo-600 shadow-sm transition duration-300 group-hover:-translate-y-1 group-hover:scale-105 group-hover:shadow-md">
                <ShieldCheck size={27} />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-slate-900 transition group-hover:text-indigo-700 sm:text-lg">
                  Secure &amp; Safe
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Role-based access and secure authentication
                  help protect your account.
                </p>
              </div>
            </div>

          </div>

          {/* BOTTOM PANEL FOOTER */}
          <div className="relative mt-7 flex flex-col gap-3 border-t border-slate-200/80 pt-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2 text-sm font-medium text-slate-600">
              <CheckCircle2 size={18} className="text-emerald-500" />
              <span>One platform for your career journey</span>
            </div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-blue-700">
              <Sparkles size={15} />
              YOUR NEXT MOVE STARTS HERE
            </div>
          </div>
        </div>

        {/* BOTTOM FOUR CARDS */}
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

          {/* CARD 1 */}
          <div className="group relative overflow-hidden rounded-2xl border border-blue-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-400 hover:shadow-xl hover:shadow-blue-100/70">
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-500 to-cyan-400" />
            <div className="flex items-center justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white">
                <Search size={24} />
              </div>
              <ArrowUpRight size={21} className="text-slate-400 transition group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-blue-600" />
            </div>
            <h3 className="mt-5 font-extrabold text-slate-900 group-hover:text-blue-700">
              Easy Job Search
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Search jobs by title, skills, location and company.
            </p>
            <div className="mt-4 rounded-xl border border-blue-100 bg-blue-50/70 px-3 py-2 text-xs font-bold text-blue-700">
              FIND YOUR FIT <span className="float-right">→</span>
            </div>
          </div>

          {/* CARD 2 */}
          <div className="group relative overflow-hidden rounded-2xl border border-purple-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-purple-400 hover:shadow-xl hover:shadow-purple-100/70">
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-purple-500 to-fuchsia-400" />
            <div className="flex items-center justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-50 text-purple-600 transition group-hover:bg-purple-600 group-hover:text-white">
                <Building2 size={24} />
              </div>
              <ArrowUpRight size={21} className="text-slate-400 transition group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-purple-600" />
            </div>
            <h3 className="mt-5 font-extrabold text-slate-900 group-hover:text-purple-700">
              Discover Companies
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Explore employers, company profiles and open roles.
            </p>
            <div className="mt-4 rounded-xl border border-purple-100 bg-purple-50/70 px-3 py-2 text-xs font-bold text-purple-700">
              EXPLORE COMPANIES <span className="float-right">→</span>
            </div>
          </div>

          {/* CARD 3 */}
          <div className="group relative overflow-hidden rounded-2xl border border-emerald-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-emerald-400 hover:shadow-xl hover:shadow-emerald-100/70">
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-400" />
            <div className="flex items-center justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 transition group-hover:bg-emerald-600 group-hover:text-white">
                <TrendingUp size={24} />
              </div>
              <ArrowUpRight size={21} className="text-slate-400 transition group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-emerald-600" />
            </div>
            <h3 className="mt-5 font-extrabold text-slate-900 group-hover:text-emerald-700">
              Career Growth
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Manage your profile and identify your next career step.
            </p>
            <div className="mt-4 rounded-xl border border-emerald-100 bg-emerald-50/70 px-3 py-2 text-xs font-bold text-emerald-700">
              GROW YOUR CAREER <span className="float-right">→</span>
            </div>
          </div>

          {/* CARD 4 */}
          <div className="group relative overflow-hidden rounded-2xl border border-orange-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-orange-400 hover:shadow-xl hover:shadow-orange-100/70">
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-orange-500 to-amber-400" />
            <div className="flex items-center justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-50 text-orange-600 transition group-hover:bg-orange-500 group-hover:text-white">
                <BellRing size={24} />
              </div>
              <ArrowUpRight size={21} className="text-slate-400 transition group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-orange-600" />
            </div>
            <h3 className="mt-5 font-extrabold text-slate-900 group-hover:text-orange-700">
              Stay Updated
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Keep track of application updates and notifications.
            </p>
            <div className="mt-4 rounded-xl border border-orange-100 bg-orange-50/70 px-3 py-2 text-xs font-bold text-orange-700">
              STAY INFORMED <span className="float-right">→</span>
            </div>
          </div>

        </div>

      </div>
    </section>
      {/* ======================================================
          CTA
      ====================================================== */}

 <section className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50 to-blue-50/60 px-5 py-20 sm:px-8 lg:px-10">

      {/* Background glow */}
      <div className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-blue-200/30 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-10 h-80 w-80 rounded-full bg-purple-200/30 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">

        {/* HEADER */}
        <div className="mx-auto mb-12 max-w-3xl text-center">

          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-4 py-2 text-sm font-semibold text-blue-700 shadow-sm">
            <MessageSquareQuote size={17} />
            COMMUNITY FEEDBACK
          </div>

          <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
            Voices of Our{" "}
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Community
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
            Every career journey is different. Here's what
            job seekers and employers can share about their
            JobHub experience.
          </p>

          <div className="mx-auto mt-6 h-1 w-20 rounded-full bg-gradient-to-r from-blue-500 to-purple-500" />
        </div>

        {/* REVIEW CARDS */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">

          {/* REVIEW 1 */}
          <article className="group relative overflow-hidden rounded-3xl border border-blue-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-blue-400 hover:shadow-xl hover:shadow-blue-100/70 sm:p-7">

            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-500 to-cyan-400" />

            <div className="flex items-center justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-blue-100 bg-blue-50 text-blue-600 transition group-hover:scale-110">
                <Quote size={23} />
              </div>

              <span className="rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
                Job Seeker
              </span>
            </div>

            <div className="mt-6 flex gap-1 text-amber-400">
              <Star size={17} fill="currentColor" />
              <Star size={17} fill="currentColor" />
              <Star size={17} fill="currentColor" />
              <Star size={17} fill="currentColor" />
              <Star size={17} fill="currentColor" />
            </div>

            <h3 className="mt-4 text-lg font-extrabold text-slate-900">
              A simpler way to explore jobs
            </h3>

            <p className="mt-3 text-sm leading-7 text-slate-600">
              “Finding relevant opportunities and keeping
              track of applications in one place makes the
              job search process easier to manage.”
            </p>

            <div className="mt-6 flex items-center gap-3 border-t border-blue-100 pt-5">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-sm font-extrabold text-white">
                JS
              </div>

              <div>
                <p className="text-sm font-bold text-slate-900">
                  Job Seeker
                </p>
                <p className="mt-0.5 text-xs text-slate-500">
                  Community member
                </p>
              </div>
            </div>
          </article>

          {/* REVIEW 2 */}
          <article className="group relative overflow-hidden rounded-3xl border border-purple-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-purple-400 hover:shadow-xl hover:shadow-purple-100/70 sm:p-7">

            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-purple-500 to-fuchsia-400" />

            <div className="flex items-center justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-purple-100 bg-purple-50 text-purple-600 transition group-hover:scale-110">
                <Sparkles size={23} />
              </div>

              <span className="rounded-full border border-purple-100 bg-purple-50 px-3 py-1 text-xs font-bold text-purple-700">
                Candidate
              </span>
            </div>

            <div className="mt-6 flex gap-1 text-amber-400">
              <Star size={17} fill="currentColor" />
              <Star size={17} fill="currentColor" />
              <Star size={17} fill="currentColor" />
              <Star size={17} fill="currentColor" />
              <Star size={17} fill="currentColor" />
            </div>

            <h3 className="mt-4 text-lg font-extrabold text-slate-900">
              Everything in one place
            </h3>

            <p className="mt-3 text-sm leading-7 text-slate-600">
              “A well-organized profile, saved jobs and
              application updates can make it easier to
              stay organized during a job hunt.”
            </p>

            <div className="mt-6 flex items-center gap-3 border-t border-purple-100 pt-5">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-sm font-extrabold text-white">
                JC
              </div>

              <div>
                <p className="text-sm font-bold text-slate-900">
                  Candidate
                </p>
                <p className="mt-0.5 text-xs text-slate-500">
                  Community member
                </p>
              </div>
            </div>
          </article>

          {/* REVIEW 3 */}
          <article className="group relative overflow-hidden rounded-3xl border border-emerald-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-emerald-400 hover:shadow-xl hover:shadow-emerald-100/70 sm:p-7">

            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-400" />

            <div className="flex items-center justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-emerald-100 bg-emerald-50 text-emerald-600 transition group-hover:scale-110">
                <ShieldCheck size={23} />
              </div>

              <span className="rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
                Employer
              </span>
            </div>

            <div className="mt-6 flex gap-1 text-amber-400">
              <Star size={17} fill="currentColor" />
              <Star size={17} fill="currentColor" />
              <Star size={17} fill="currentColor" />
              <Star size={17} fill="currentColor" />
              <Star size={17} fill="currentColor" />
            </div>

            <h3 className="mt-4 text-lg font-extrabold text-slate-900">
              A focused hiring workflow
            </h3>

            <p className="mt-3 text-sm leading-7 text-slate-600">
              “Keeping job listings and incoming applications
              organized can help employers manage their
              recruitment workflow more efficiently.”
            </p>

            <div className="mt-6 flex items-center gap-3 border-t border-emerald-100 pt-5">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 text-sm font-extrabold text-white">
                EM
              </div>

              <div>
                <p className="text-sm font-bold text-slate-900">
                  Employer
                </p>
                <p className="mt-0.5 text-xs text-slate-500">
                  Community member
                </p>
              </div>
            </div>
          </article>

        </div>

        {/* BOTTOM CTA */}
        <div className="mt-10 rounded-3xl border border-blue-200 bg-gradient-to-r from-blue-50 via-white to-purple-50 p-6 sm:p-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-blue-200 bg-white text-blue-600 shadow-sm">
                <MessageSquareQuote size={23} />
              </div>

              <div>
                <h3 className="text-lg font-extrabold text-slate-900">
                  Share your JobHub experience
                </h3>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  Your feedback can help us build a better
                  career platform.
                </p>
              </div>
            </div>

            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-md shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-200"
            >
              Share Feedback
              <ArrowRight size={17} />
            </button>

          </div>
        </div>

      </div>
    </section>

      {/* ======================================================
          FOOTER
      ====================================================== */}

      <Footer />
    </div>
  );
};

export default Home;