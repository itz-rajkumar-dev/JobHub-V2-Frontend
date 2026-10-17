import React, { useEffect, useState } from "react";
import NavBar from "../component/NavBar";
import Footer from "../component/Footer";
import { useNavigate } from "react-router-dom";
import api from "../Service/Api";
import {
    Search,
    MapPin,
    Building2,
    Users,
    BriefcaseBusiness,
    ArrowRight,
    ChevronDown,
    TrendingUp,
    ShieldCheck,
    Star,
    Globe,
    Code2,
    Palette,
    BarChart3,
    Megaphone,
    WalletCards,
    Heart,
    ChevronLeft,
    ChevronRight,
    Sparkles,
    UserGroup,
    MapPinHouse
} from "lucide-react";
import toast from "react-hot-toast";


// ======================================================
// COMPANY DATA
// ======================================================


// ======================================================
// COMPANY CATEGORIES
// ======================================================

const categories = [
    {
        name: "Technology",
        jobs: "3,200+ Jobs",
        icon: Code2,
        style: "bg-blue-50 text-blue-600",
    },
    {
        name: "Design",
        jobs: "820+ Jobs",
        icon: Palette,
        style: "bg-purple-50 text-purple-600",
    },
    {
        name: "Data & Analytics",
        jobs: "760+ Jobs",
        icon: BarChart3,
        style: "bg-emerald-50 text-emerald-600",
    },
    {
        name: "Marketing",
        jobs: "540+ Jobs",
        icon: Megaphone,
        style: "bg-pink-50 text-pink-600",
    },
    {
        name: "Finance",
        jobs: "480+ Jobs",
        icon: WalletCards,
        style: "bg-amber-50 text-amber-600",
    },
    {
        name: "Consulting",
        jobs: "420+ Jobs",
        icon: TrendingUp,
        style: "bg-indigo-50 text-indigo-600",
    },
];


// ======================================================
// LOCATIONS
// ======================================================


// ======================================================
// COMPANY LOGO
// ======================================================



// ======================================================
// COMPANY CARD
// ======================================================



// ======================================================
// MAIN COMPONENT
// ======================================================
const CompanyHeroCarousel = () => {

  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      eyebrow: "5000+ VERIFIED COMPANIES",
      title: "Discover Companies",
      highlight: "That Build The Future",
      description:
        "Explore innovative companies, understand their culture, discover open positions and find where your career belongs.",

      company: "Google",
      logo: "G",
      logoBg: "bg-white",
      logoColor: "text-blue-600",

      location: "Bangalore, India",
      jobs: "1,240+ Jobs",
      employees: "100K+ Employees",

      tags: ["Technology", "AI & Cloud", "Global Company"],

      badge: "Top Hiring Company",
      badgeColor: "bg-blue-600",

      gradient:
        "from-blue-600 via-indigo-600 to-violet-600",
    },

    {
      eyebrow: "TOP COMPANIES HIRING NOW",
      title: "Find Your Next",
      highlight: "Career Opportunity",
      description:
        "Connect with leading companies and explore roles that match your skills, interests and career goals.",

      company: "Microsoft",
      logo: "M",
      logoBg: "bg-white",
      logoColor: "text-blue-600",

      location: "Hyderabad, India",
      jobs: "980+ Jobs",
      employees: "220K+ Employees",

      tags: ["Software", "Cloud", "Data & AI"],

      badge: "Actively Hiring",
      badgeColor: "bg-emerald-500",

      gradient:
        "from-indigo-600 via-blue-600 to-cyan-500",
    },

    {
      eyebrow: "BUILD YOUR CAREER",
      title: "Work With",
      highlight: "Great Companies",
      description:
        "Discover workplaces where you can learn, grow and make an impact while building your future.",

      company: "Amazon",
      logo: "a",
      logoBg: "bg-white",
      logoColor: "text-slate-900",

      location: "Delhi NCR, India",
      jobs: "860+ Jobs",
      employees: "1M+ Employees",

      tags: ["E-commerce", "Cloud", "Operations"],

      badge: "Popular Employer",
      badgeColor: "bg-orange-500",

      gradient:
        "from-slate-900 via-indigo-900 to-blue-700",
    },
  ];

  // Auto slide
  useEffect(() => {

    const timer = setInterval(() => {

      setCurrentSlide((prev) =>
        (prev + 1) % slides.length
      );

    }, 5000);

    return () => clearInterval(timer);

  }, [slides.length]);


  const slide = slides[currentSlide];


  const nextSlide = () => {

    setCurrentSlide(
      (prev) => (prev + 1) % slides.length
    );

  };


  const prevSlide = () => {

    setCurrentSlide(
      (prev) =>
        (prev - 1 + slides.length) % slides.length
    );

  };


  return (

    <section className="relative overflow-hidden bg-slate-50">

      {/* HERO */}

      <div
        className={`
          relative min-h-[570px]
          bg-gradient-to-br ${slide.gradient}
          transition-all duration-700
        `}
      >

        {/* Background glow */}

        <div className="absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full bg-white/10 blur-3xl" />

        <div className="absolute -bottom-40 left-1/3 h-[450px] w-[450px] rounded-full bg-white/10 blur-3xl" />


        {/* Decorative circles */}

        <div className="absolute right-[25%] top-20 h-24 w-24 rounded-full border border-white/10" />

        <div className="absolute right-[15%] bottom-20 h-40 w-40 rounded-full border border-white/10" />


        <div className="relative mx-auto grid min-h-[570px] max-w-[1250px] items-center gap-12 px-6 py-20 lg:grid-cols-2 lg:px-10">


          {/* LEFT CONTENT */}

          <div
            key={`content-${currentSlide}`}
            className="animate-[fadeIn_.6s_ease]"
          >

            {/* Eyebrow */}

            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[11px] font-bold tracking-wide text-white backdrop-blur-md">

              <span className="h-2 w-2 rounded-full bg-emerald-400" />

              {slide.eyebrow}

            </div>


            {/* Heading */}

            <h1 className="max-w-[650px] text-[48px] font-extrabold leading-[1.05] tracking-[-0.035em] text-white md:text-[58px]">

              {slide.title}

              <span className="block text-blue-100">

                {slide.highlight}

              </span>

            </h1>


            {/* Description */}

            <p className="mt-6 max-w-[570px] text-[16px] leading-7 text-white/80">

              {slide.description}

            </p>


            {/* Search */}



            {/* Trust */}

            <div className="mt-6 flex items-center gap-3 text-[12px] text-white/80">

              <div className="flex -space-x-2">

                <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white/30 bg-white text-[10px] font-bold text-blue-600">
                  A
                </div>

                <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white/30 bg-white text-[10px] font-bold text-purple-600">
                  R
                </div>

                <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white/30 bg-white text-[10px] font-bold text-pink-600">
                  P
                </div>

              </div>

              <span className="font-semibold">
                4.9/5
              </span>

              <span>
                Trusted by 10,000+ job seekers
              </span>

            </div>

          </div>


          {/* RIGHT COMPANY CARD */}

          <div
            key={`card-${currentSlide}`}
            className="relative flex justify-center lg:justify-end animate-[slideUp_.7s_ease]"
          >

            {/* Main card */}

            <div className="relative w-full max-w-[470px]">

              {/* Floating badge */}

              <div className="absolute -left-5 top-10 z-20 hidden rounded-2xl border border-white/40 bg-white px-5 py-4 shadow-2xl md:block">

                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">

                    <Building2 size={20} />

                  </div>

                  <div>

                    <p className="text-[10px] text-slate-400">
                      Open Positions
                    </p>

                    <p className="text-[17px] font-extrabold text-slate-900">
                      {slide.jobs}
                    </p>

                  </div>

                </div>

              </div>


              {/* Company card */}

              <div className="relative overflow-hidden rounded-[28px] border border-white/30 bg-white/95 p-7 shadow-[0_30px_80px_rgba(0,0,0,0.25)] backdrop-blur-xl">

                {/* Top badge */}

                <div className="flex items-center justify-between">

                  <span
                    className={`
                      rounded-full px-3 py-1.5
                      text-[10px] font-bold text-white
                      ${slide.badgeColor}
                    `}
                  >

                    {slide.badge}

                  </span>


                  <Sparkles
                    size={20}
                    className="text-blue-500"
                  />

                </div>


                {/* Company */}

                <div className="mt-8 flex items-center gap-5">

                  <div
                    className={`
                      flex h-20 w-20 items-center justify-center
                      rounded-2xl shadow-md
                      ${slide.logoBg}
                      ${slide.logoColor}
                    `}
                  >

                    <span className="text-[38px] font-black">
                      {slide.logo}
                    </span>

                  </div>


                  <div>

                    <h2 className="text-[27px] font-extrabold tracking-[-0.02em] text-slate-900">

                      {slide.company}

                    </h2>

                    <div className="mt-1 flex items-center gap-2 text-[12px] text-slate-500">

                      <MapPin size={14} />

                      {slide.location}

                    </div>

                  </div>

                </div>


                {/* Stats */}

                <div className="mt-8 grid grid-cols-2 gap-3">

                  <div className="rounded-2xl bg-slate-50 p-4">

                    <div className="flex items-center gap-2 text-blue-600">

                      <BriefcaseBusiness size={17} />

                      <span className="text-[11px] font-semibold">
                        Open Jobs
                      </span>

                    </div>

                    <p className="mt-2 text-[18px] font-extrabold text-slate-900">
                      {slide.jobs}
                    </p>

                  </div>


                  <div className="rounded-2xl bg-slate-50 p-4">

                    <div className="flex items-center gap-2 text-purple-600">

                      <Users size={17} />

                      <span className="text-[11px] font-semibold">
                        Employees
                      </span>

                    </div>

                    <p className="mt-2 text-[18px] font-extrabold text-slate-900">
                      {slide.employees}
                    </p>

                  </div>

                </div>


                {/* Tags */}

                <div className="mt-6 flex flex-wrap gap-2">

                  {slide.tags.map((tag) => (

                    <span
                      key={tag}
                      className="rounded-lg bg-blue-50 px-3 py-2 text-[10px] font-bold text-blue-600"
                    >

                      {tag}

                    </span>

                  ))}

                </div>


                {/* Bottom */}

                <div className="mt-7 flex items-center justify-between border-t border-slate-100 pt-5">

                  <div className="flex items-center gap-1.5">

                    <Star
                      size={15}
                      className="fill-yellow-400 text-yellow-400"
                    />

                    <span className="text-[12px] font-bold text-slate-700">
                      4.9
                    </span>

                    <span className="text-[11px] text-slate-400">
                      Company Rating
                    </span>

                  </div>


                  <button className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-[11px] font-bold text-white transition hover:bg-blue-700">

                    View Company

                    <ArrowRight size={14} />

                  </button>

                </div>

              </div>


              {/* Bottom floating card */}

              <div className="absolute -bottom-5 -right-4 z-20 hidden rounded-2xl border border-white/50 bg-white px-5 py-4 shadow-xl md:block">

                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">

                    <Star size={18} />

                  </div>

                  <div>

                    <p className="text-[10px] text-slate-400">
                      Company Rating
                    </p>

                    <p className="text-[15px] font-extrabold text-slate-900">
                      4.9 / 5.0
                    </p>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>


        {/* PREVIOUS */}

        <button
          onClick={prevSlide}
          className="absolute left-5 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition hover:bg-white hover:text-blue-600 lg:flex"
        >

          <ChevronLeft size={20} />

        </button>


        {/* NEXT */}

        <button
          onClick={nextSlide}
          className="absolute right-5 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition hover:bg-white hover:text-blue-600 lg:flex"
        >

          <ChevronRight size={20} />

        </button>


        {/* DOTS */}

        <div className="absolute bottom-7 left-1/2 flex -translate-x-1/2 items-center gap-2">

          {slides.map((_, index) => (

            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`
                h-2 rounded-full transition-all duration-300
                ${
                  currentSlide === index
                    ? "w-8 bg-white"
                    : "w-2 bg-white/40"
                }
              `}
            />

          ))}

        </div>

      </div>


      {/* Animation */}

      <style>
        {`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(12px);
            }

            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes slideUp {
            from {
              opacity: 0;
              transform: translateY(20px) scale(.98);
            }

            to {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }
        `}
      </style>

    </section>

  );
};

const Companies = () => {

    const [company,setCompany]=useState([]);

    useEffect(()=>{


        api.get("/company")
        .then((response)=>{

            console.log(response.data);
            setCompany(response.data);
        }).catch((error)=>{

            console.log("API ERROR",error);
        })
    },[]);


    const locationData = Object.entries(
    company.reduce((acc, companies) => {

        const city = companies.location;

        if (!city) return acc;

        acc[city] = (acc[city] || 0) + 1;

        return acc;

    }, {})
).map(([city, companies]) => ({
    city,
    companies
}));
const [search, setSearch] = useState("");
const [location, setLocation] = useState("");
const [industry,setIndustry]=useState("");
const navigate = useNavigate();

const filteredCompanies = company.filter((companies) => {

    const companyMatch =
        companies.companyName
            ?.toLowerCase()
            .includes(search.toLowerCase());

    const locationMatch =
        companies.location
            ?.toLowerCase()
            .includes(location.toLowerCase());

   const industryMatch =
        companies.industry
            ?.toLowerCase()
            .includes(industry.toLowerCase());

    return companyMatch && locationMatch  && industryMatch;
});

const[job ,setJob]=useState([]);

useEffect(()=>{


    api.get("/jobs")
    .then((response)=>{

        console.log(response.data);
        setJob(response.data);
    }).catch((error)=>{

        console.log("API ERROR", error);
        toast.error("Something worng");
    })

},[])

const formatCompanySize = (size) => {
  const sizes = {
    SMALL: "1–50 employees",
    MEDIUM: "51–250 employees",
    LARGE: "251–1,000 employees",
    VERY_LARGE: "1,001–10,000 employees",
    ENTERPRISE: "10,000+ employees",
    LARGE_250_PLUS: "10,000+ employees"
  };

  return sizes[size] || size;
};

    return (
        <div className="min-h-screen bg-slate-50">

            <NavBar />

            <CompanyHeroCarousel />

            {/* ==================================================
                FILTER BAR
            ================================================== */}
<section className="mx-auto max-w-[1450px] px-5 pt-10 lg:px-10">

    <div
        className="
           
           
            p-4
            
        "
    >

        <div className="grid gap-3 md:grid-cols-3">

            {/* Company Search */}
            <div
                className="
                    flex h-12 items-center gap-3
                    rounded-xl
                    border border-slate-200
                    bg-slate-50
                    px-4
                    transition
                    focus-within:border-blue-400
                    focus-within:bg-white
                    focus-within:ring-2
                    focus-within:ring-blue-100
                "
            >

                <Search
                    size={18}
                    className="shrink-0 text-slate-400"
                />

                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search companies..."
                    className="
                        w-full
                        bg-transparent
                        text-sm
                        text-slate-800
                        outline-none
                        placeholder:text-slate-400
                    "
                />

            </div>


            {/* Location */}
            <button
                className="
                    flex h-12 items-center
                    justify-between
                    rounded-xl
                    border border-slate-200
                    bg-slate-50
                    px-4
                    text-sm
                    text-slate-500
                    transition
                    hover:border-blue-200
                    hover:bg-white
                "
            >

                <span className="flex items-center gap-2">

                    <MapPin
                        size={17}
                        className="text-slate-400"
                    />

                    

                </span>

                 <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Search Location..."
                    className="
                        w-full
                        bg-transparent
                        text-sm
                        text-slate-800
                        outline-none
                        placeholder:text-slate-400
                        ml-2
                    "
                />

                <ChevronDown
                    size={16}
                    className="text-slate-400"
                />

            </button>


            {/* Industry */}
          <div
    className="
        flex h-12 items-center
        rounded-xl
        border border-slate-200
        bg-slate-50
        px-4
        text-sm
        text-slate-500
        transition
        hover:border-blue-200
        hover:bg-white
    "
>
    <Building2
        size={17}
        className="mr-2 shrink-0 text-slate-400"
    />

    <select
        value={industry}
        onChange={(e) => setIndustry(e.target.value)}
        className="
            w-full
            bg-transparent
            text-[14px]
            text-slate-600
            outline-none
            cursor-pointer
        "
    >
        <option value="">All Industries</option>
        <option value="Technology">Technology</option>
        <option value="E-Commerce & Technology">
            E-Commerce & Technology
        </option>
        <option value="Software">Software</option>
        <option value="Finance">Finance</option>
        <option value="Healthcare">Healthcare</option>
    </select>
</div>

        </div>

    </div>

</section>

            {/* ==================================================
                TOP COMPANIES
            ================================================== */}

            <section
                id="companies"
                className="mx-auto max-w-[1450px] px-5 pt-12 lg:px-10"
            >

                <div className="mb-6 flex items-end justify-between">

                    <div>

                        <div className="flex items-center gap-2">

                            <TrendingUp
                                size={22}
                                className="text-blue-600"
                            />

                            <h2 className="text-[22px] font-extrabold">
                                Top Hiring Companies
                            </h2>

                        </div>

                        <p className="mt-1 pl-7 text-[13px] text-slate-500">
                            Explore companies with exciting career opportunities
                        </p>

                    </div>


                    <button
                        className="
                            hidden items-center gap-1
                            text-[13px] font-bold
                            text-blue-600 sm:flex
                        "
                    >
                        View All Companies

                        <ArrowRight size={14} />

                    </button>

                </div>


 
<div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">

    {filteredCompanies.length > 0 ? (

        filteredCompanies.map((companies) => (

            <div
                key={companies.companyId}
                className="
                    group
                    relative
                    overflow-hidden
                    rounded-3xl
                    border border-slate-200
                    bg-white
                    p-6
                    shadow-sm
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:border-blue-200
                    hover:shadow-xl
                "
            >

                {/* Top Gradient */}
                <div
                    className="
                        pointer-events-none
                        absolute
                        inset-x-0
                        top-0
                        h-1
                        bg-gradient-to-r
                        from-blue-600
                        via-indigo-500
                        to-violet-500
                        opacity-0
                        transition
                        group-hover:opacity-100
                    "
                />

                {/* Header */}
                <div className="flex items-start justify-between">

                    {/* Logo */}
                  {/* Logo */}
<div
  className="
    flex h-22 w-22 shrink-0
    items-center justify-center
    overflow-hidden
    rounded-2xl
    border border-slate-200
    bg-slate-50
    shadow-sm
  "
>
  {companies?.logoUrl ? (
    <img
      src={companies.logoUrl}
      alt={companies.companyName}
      className="h-full w-full object-contain p-2"
    />
  ) : (
    <span className="text-2xl font-black text-blue-600">
      {companies.companyName?.charAt(0)}
    </span>
  )}
</div>

                    {/* Verified */}
                    {companies.isVerified && (
                        <div
                            className="
                                flex items-center gap-1
                                rounded-full
                                bg-blue-50
                                px-3 py-1.5
                                text-xs font-bold
                                text-blue-600
                            "
                        >
                            <span>✓</span>
                            Verified
                        </div>
                    )}

                </div>

                {/* Company Name */}
                <div className="mt-5">

                    <h3
                        className="
                            text-xl font-extrabold
                            tracking-tight
                            text-slate-900
                            transition-colors
                            group-hover:text-blue-600
                        "
                    >
                        {companies.companyName}
                    </h3>

                    <p className="mt-1 text-sm font-medium text-blue-600">
                        {companies.industry}
                    </p>

                </div>

                {/* Description */}
                <p
                    className="
                        mt-4
                        line-clamp-3
                        text-sm
                        leading-6
                        text-slate-500
                    "
                >
                    {companies.description}
                </p>

                {/* Company Info */}
                <div className="mt-5 space-y-3">

                    {/* Location */}
                    <div className="flex items-center gap-3 text-sm text-slate-600">

                        <div
                            className="
                                flex h-5 w-5
                                items-center justify-center
                                rounded-lg
                               
                            "
                        >
                            <MapPinHouse size={25}/>
                        </div>

                        <span>
                            {companies.location}
                        </span>

                    </div>

                    {/* Company Size */}
                    <div className="flex items-center gap-3 text-sm text-slate-600">

                        <div
                            className="
                                flex h-5 w-5
                                items-center justify-center
                                rounded-lg
                               
                            "
                        >
                          <UserGroup  size={25}/>
                        </div>

                        <span>
                            
                             {formatCompanySize(companies.companySize)}
                        </span>

                    </div>

                </div>

                {/* Divider */}
                <div className="my-5 border-t border-slate-100" />

                {/* Footer */}
                <div className="flex items-center justify-between">

                    {/* Jobs */}
                    <div>
                        <p className="text-xs font-medium text-slate-400">
                            Open Positions
                        </p>

                        <p className="mt-1 text-sm font-bold text-slate-800">
                           {job.filter(
        jobs => Number(jobs.companyId) === Number(companies.companyId)
    ).length}+ Jobs
                        </p>
                    </div>

                    {/* View Company */}
                    <button
                     onClick={() => navigate(`/companies/${companies.companyId}`)}
                        className="
                            flex items-center gap-2
                            rounded-xl
                            bg-slate-900
                            px-4 py-2.5
                            text-sm font-bold
                            text-white
                            transition-all
                            duration-200
                            hover:bg-blue-600
                            hover:shadow-lg
                        "
                    >
                        View Company

                        <span
                            className="
                                transition-transform
                                duration-200
                                group-hover:translate-x-1
                            "
                        >
                            →
                        </span>

                    </button>

                </div>

            </div>

        ))

    ) : (

        /* No Companies */
        <div className="col-span-full py-20 text-center">

            <div
                className="
                    mx-auto
                    flex h-16 w-16
                    items-center justify-center
                    rounded-full
                    bg-slate-100
                "
            >
                <Building2
                    size={28}
                    className="text-slate-400"
                />
            </div>

            <h3 className="mt-5 text-lg font-extrabold text-slate-900">
                No companies found
            </h3>

            <p className="mt-2 text-sm text-slate-500">
                Try searching with a different company name.
            </p>

        </div>

    )}


</div>



            </section>


            {/* ==================================================
                LOCATIONS
            ================================================== */}

            <section className="mx-auto max-w-[1450px] px-5 pt-12 lg:px-10">

                <div className="mb-5">

                    <div className="flex items-center gap-2">

                        <MapPin
                            size={22}
                            className="text-pink-500"
                        />

                        <h2 className="text-[22px] font-extrabold">
                            Companies by Location
                        </h2>

                    </div>

                    <p className="mt-1 pl-7 text-[13px] text-slate-500">
                        Discover companies hiring across major cities
                    </p>

                </div>


             <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">

    {locationData.map((location) => (

        <button
            key={location.city}
            onClick={() => {
                console.log("Selected location:", location.city);
            }}
            className="
                rounded-xl
                border border-slate-200
                bg-white
                p-5
                text-left
                shadow-sm
                transition
                hover:-translate-y-1
                hover:border-blue-200
                hover:shadow-md
            "
        >

            

            <p className="mt-3 text-[15px] font-extrabold text-slate-900">
                {location.city}
            </p>

            <p className="mt-1 text-[12px] text-slate-500">
                {location.companies} {location.companies === 1 ? "Company" : "Companies"}
            </p>

        </button>

    ))}

</div>

            </section>


            {/* ==================================================
                WHY JOBHUB
            ================================================== */}

            <section className="mx-auto max-w-[1450px] px-5 pt-12 lg:px-10">

                <div className="mb-5 flex items-center gap-2">

                    <span className="text-[22px]">
                        ⭐
                    </span>

                    <div>

                        <h2 className="text-[22px] font-extrabold">
                            Why Explore Companies on JobHub?
                        </h2>

                        <p className="text-[13px] text-slate-500">
                            Everything you need before applying
                        </p>

                    </div>

                </div>


                <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">

                    {[
                        {
                            icon: ShieldCheck,
                            title: "Verified Companies",
                            text: "Discover trusted companies and genuine job opportunities.",
                            style: "bg-emerald-50 text-emerald-600",
                        },
                        {
                            icon: BriefcaseBusiness,
                            title: "Thousands of Jobs",
                            text: "Find open positions across different industries and roles.",
                            style: "bg-blue-50 text-blue-600",
                        },
                        {
                            icon: Users,
                            title: "Company Culture",
                            text: "Learn about companies before making your career decision.",
                            style: "bg-purple-50 text-purple-600",
                        },
                        {
                            icon: TrendingUp,
                            title: "Career Growth",
                            text: "Explore organizations offering opportunities to grow.",
                            style: "bg-amber-50 text-amber-600",
                        },
                    ].map((item) => {

                        const Icon = item.icon;

                        return (

                            <div
                                key={item.title}
                                className="
                                    rounded-xl border
                                    border-slate-200 bg-white
                                    p-5 shadow-sm
                                "
                            >

                                <div className="flex gap-3">

                                    <span
                                        className={`
                                            flex h-11 w-11
                                            shrink-0
                                            items-center
                                            justify-center
                                            rounded-full
                                            ${item.style}
                                        `}
                                    >
                                        <Icon size={19} />
                                    </span>


                                    <div>

                                        <h3 className="text-[15px] font-extrabold">
                                            {item.title}
                                        </h3>

                                        <p className="mt-1 text-[12px] leading-5 text-slate-500">
                                            {item.text}
                                        </p>

                                    </div>

                                </div>

                            </div>

                        );

                    })}

                </div>

            </section>


            {/* ==================================================
                CTA
            ================================================== */}

            <section className="mx-auto max-w-[1450px] px-5 py-12 lg:px-10">

                <div
                    className="
                        relative overflow-hidden
                        rounded-2xl
                        bg-gradient-to-r
                        from-[#101452]
                        via-[#26136c]
                        to-[#5b1e91]
                        px-7 py-9
                        text-white shadow-xl
                    "
                >

                    <div
                        className="
                            absolute -right-20 -top-24
                            h-64 w-64 rounded-full
                            bg-fuchsia-500/20 blur-3xl
                        "
                    />


                    <div
                        className="
                            relative flex flex-col
                            justify-between gap-6
                            lg:flex-row lg:items-center
                        "
                    >

                        <div>

                            <p className="text-[11px] font-bold uppercase tracking-wider text-cyan-300">
                                Find your next opportunity
                            </p>

                            <h2 className="mt-2 text-[25px] font-black">
                                Ready to discover your next company?
                            </h2>

                            <p className="mt-2 max-w-[600px] text-[13px] leading-5 text-slate-300">
                                Explore companies, compare opportunities,
                                and find the right place to build your career.
                            </p>

                        </div>


                        <button
                            className="
                                flex shrink-0 items-center
                                gap-2 rounded-lg
                                bg-white px-5 py-3
                                text-[13px]
                                font-extrabold
                                text-blue-700
                            "
                        >
                            Explore Jobs

                            <ArrowRight size={15} />

                        </button>

                    </div>

                </div>

            </section>


            {/* ==================================================
                FOOTER
            ================================================== */}

            <Footer />

        </div>
    );
};


export default Companies;