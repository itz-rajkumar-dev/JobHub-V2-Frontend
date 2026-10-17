import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../Service/Api";
import {
  BadgeCheck,
  MapPin,
  Users,
  CalendarDays,
  Globe2,
  ExternalLink,
  BriefcaseBusiness,
  Building2,
  Heart,
  ArrowRight,
  ChevronRight,
  MoreHorizontal,
  GraduationCap,
  TrendingUp,
  UserRound,
  Camera,
  Clock3,
  Bookmark,
  Lightbulb,
  Briefcase,
  ThumbsUp,
  MessageCircle,
  Share2,
  Combine,
  Blend
} from "lucide-react";
import NavBar from "../component/NavBar";
import Footer from "../component/Footer";
import toast from "react-hot-toast";


const CompanyDetails = () => {

    const [company, setCompany] = useState(null);
    const [job, setJob] = useState([]);
    const[companiess,setCompaniess]=useState([]);
    const[activeTab,setActiveTab]=useState("Home");

    const navigate = useNavigate();

    const { companyId } = useParams();

    console.log("Company ID:", companyId);

    // Company API
    useEffect(() => {

        api.get(`/company/${companyId}`)
            .then((response) => {

                console.log(response.data);
                setCompany(response.data);

            })
            .catch((error) => {

                console.log("API ERROR", error);

            });

    }, [companyId]);

// All Company Api 
useEffect(()=>{


  api.get("/company")
  .then((response)=>{

      console.log("All Companies:", response.data);
    setCompaniess(response.data);
  }).catch((error)=>{

    console.log("API ERROR",error)
  })

  
},[]);
    // Jobs API
    useEffect(() => {

        api.get("/jobs")
            .then((response) => {

                console.log(response.data);
                setJob(response.data);

            })
            .catch((error) => {

                console.log("API ERROR", error);

            });

    }, []);

   const[savedJob,setSavedJob]=useState(0);

localStorage.getItem("userId");

const handleSaveJob = (jobId) => {

    api.post("/saved-job", {
        jobId: jobId
    })
    .then((response) => {

        console.log("Saved-Job", response.data);

        setSavedJob(response.data);

        toast.success("Job saved successfully!");

        if(savedJob){

          toast.success("You Already Saved this Job");
        }

    })
    .catch((error) => {

        console.log("API Error", error);

        if (error.response?.data?.message) {

            toast.error(error.response.data.message);

        } else {

            toast.error("Unable to save this job.");

        }

    });

};

const [dayAgo, setDayAgo] = useState(0);

useEffect(() => {

    if (job.length === 0) return;

    const days = {};

    job.forEach((jobs) => {

        const createdDate = new Date(jobs.createdAt);
        const currentDate = new Date();

        const difference =
            currentDate.getTime() - createdDate.getTime();

        const oneDay = 24 * 60 * 60 * 1000;

        const calculatedDays = Math.floor(difference / oneDay);

        days[jobs.jobId] = calculatedDays;

    });

    setDayAgo(days);

}, [job]);
const [companyPost, setCompanyPost] = useState([]);
const [postLoading, setPostLoading] = useState(true);

useEffect(() => {

    if (!companyId) return;

    setPostLoading(true);

    api.get("/company-posts")
        .then((response) => {

            console.log("API POSTS:", response.data);
            console.log("Company ID:", companyId);

            const posts = response.data.filter(
                post => Number(post.companyId) === Number(companyId)
            );

            console.log("FILTERED POSTS:", posts);

            setCompanyPost(posts);

        })
        .catch((error) => {

            console.log("POST API ERROR:", error);

        })
        .finally(() => {
            setPostLoading(false);
        });

}, [companyId]);
const [menuOpen, setMenuOpen] = useState(null);

const handleDeletePost = async (postId) => {

   const token = localStorage.getItem("token");

    try {

        const response = await api.delete(`/company-posts/${postId}`);

        console.log(response.data);

        setCompanyPost(prev =>
            prev.filter(post => post.postId !== postId)
        );

        setMenuOpen(false);

    } catch (error) {

        console.log("API ERROR:", error);

    }
};

const[companyJobs,setCompanyJobs]=useState([]);

useEffect(() => {
  if (!job || !company?.companyId) return;

  const filteredJobs = job.filter(
    (jobs) => Number(jobs.companyId) === Number(company.companyId)
  );

  console.log("Company ID:", company.companyId);
  console.log("Company Jobs:", filteredJobs);

  setCompanyJobs(filteredJobs);
}, [job, company]);

const [like, setLike] = useState({});
const [liked, setLiked] = useState({});
const handleSetLike = async (postId) => {
  try {
    const response = await api.post("/likes", {
      targetId: postId,
      targetType: "POST"
    });

    setLiked(prev => ({
      ...prev,
      [postId]: response.data.liked
    }));

    if (response.data.liked) {
      toast.success(response.data.message);
    } else {
      toast.success(response.data.message);
    }

    getLikeCount(postId);

  } catch (error) {
    console.log("API ERROR", error);
  }
};
const getLikeCount = async (postId) => {
  try {

    const response = await api.get(
      `/likes?targetId=${postId}&targetType=POST`
    );

    setLike(prev => ({
      ...prev,
      [postId]: response.data.length
    }));

  } catch (error) {
    console.log("LIKE COUNT ERROR", error);
  }
};
useEffect(() => {

  if (companyPost.length === 0) return;

  companyPost.forEach((post) => {
    getLikeCount(post.postId);
  });

}, [companyPost]);



const [following, setFollowing] = useState(false);

const updateFollow = async () => {
  try {
    const response = await api.post("/follows", {
      companyId: Number(companyId)
    });

    console.log(response.data);

    setFollowing(response.data.following);

  } catch (error) {
    console.log("API ERROR:", error);
  }
};
const [companyLife,setCompanyLife]=useState([]);


useEffect(() => {
    api.get(`/company/${companyId}/life`)
        .then((response) => {
            setCompanyLife(response.data);
        })
        .catch((error) => {
            console.log("Company Life API Error:", error);
        });
}, [companyId]);



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


    // Loading
    if (!company) {
        return (
            <div className="min-h-screen bg-[#f3f2ef]">

                <NavBar />

                <div className="flex min-h-[60vh] items-center justify-center">
                    <p className="text-slate-500">
                        Loading company...
                    </p>
                </div>

                <Footer />

            </div>
        );
    }


    return (
        <div className="min-h-screen bg-[#f3f2ef] text-slate-900">

      {/* NAVBAR */}
      <NavBar />

      {/* MAIN CONTAINER */}
      <main className="mx-auto w-full max-w-[1180px] px-4 py-6 sm:px-6 lg:px-0">

        {/* ===================================================== */}
        {/* COMPANY HERO */}
        {/* ===================================================== */}

        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">


          {/* COVER IMAGE */}
       {/* COVER IMAGE */}
<div className="relative h-[290px] w-full overflow-hidden bg-slate-200">

  {company?.coverUrl ? (
    <img
      src={company.coverUrl}
      alt={`${company.companyName} cover`}
      className="h-full w-full object-cover"
    />
  ) : (
    <div className="h-full w-full bg-gradient-to-r from-slate-900 via-slate-800 to-blue-900">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute -left-20 -top-32 h-[350px] w-[700px] rounded-full border-[35px] border-white/20"></div>

        <div className="absolute -right-20 -top-32 h-[350px] w-[700px] rounded-full border-[35px] border-blue-300/20"></div>
      </div>

      <div className="absolute bottom-5 left-6 rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-md">
        Build your future with us
      </div>
    </div>
  )}

</div>

          {/* COMPANY HEADER */}
          <div className="relative px-6 pb-6">

            {/* LOGO */}
            <div className="-mt-16 flex h-32 w-32 items-center justify-center rounded-2xl border-4 border-white bg-white text-5xl font-black shadow-lg">
               <img
                            src={company.logoUrl || "/default-company.png"}
                            alt={company.companyName}    
                                
                                className="
                                    h-full w-full
                                    object-contain p-3
                                    transition-transform
                                    duration-300
                                    group-hover:scale-105
                                "
                            />
            </div>

            {/* HEADER CONTENT */}
            <div className="mt-4 flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">

              <div>

                <div className="flex items-center gap-2">
                  <h1 className="text-3xl font-bold tracking-tight text-slate-950">
                    {company.companyName}
                  </h1>

                  <BadgeCheck
                    size={24}
                    className="fill-blue-600 text-white"
                  />
                </div>

                <p className="mt-1 text-base text-slate-600">
                  Build for everyone
                </p>

                {/* META */}
                <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-slate-600">

                  <span className="flex items-center gap-1.5">
                    <Building2 size={16} />
                   {company.industry}
                  </span>

                  <span className="flex items-center gap-1.5">
                    <MapPin size={16} />
                  {company.location}
                  </span>

                  <span className="flex items-center gap-1.5">
                    <Users size={16} />
                    {formatCompanySize(company.companySize)}
                  </span>

                  <span className="flex items-center gap-1.5">
                    <CalendarDays size={16} />
                   { company.foundedYear}
                  </span>

                </div>
              </div>

              {/* ACTIONS */}
              <div className="flex items-center gap-3">

   <button
  onClick={updateFollow}
  className={`flex h-12 w-32 items-center justify-center gap-2 rounded-lg font-medium transition ${
    following
      ? "border border-blue-200 bg-blue-50"
      : "border border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
  }`}
>
  <Blend
    size={18}
    className={following ? "" : ""}
  />
  

  {following ? "Following" : "Follow"}
</button>

                <button

                onClick={() => navigate(`/job/${job.jobId}`)}
                  className="
                    inline-flex items-center gap-2
                    rounded-lg
                    bg-blue-600
                    px-5 py-2.5
                    text-sm font-semibold
                    text-white
                    shadow-sm
                    transition
                    hover:bg-blue-700
                  "
                >
                  View Jobs
                  <ArrowRight size={17} />
                </button>

              </div>

            </div>
          </div>

          {/* COMPANY TABS */}
  {/* COMPANY TABS */}
<div className="flex gap-8 border-t border-slate-200 px-6">

  <button
    onClick={() => setActiveTab("Home")}
    className={`py-4 text-sm font-semibold ${
      activeTab === "Home"
        ? "border-b-2 border-blue-600 text-blue-600"
        : "text-slate-700"
    }`}
  >
    Home
  </button>

  <button
    onClick={() => setActiveTab("About")}
    className={`py-4 text-sm font-semibold ${
      activeTab === "About"
        ? "border-b-2 border-blue-600 text-blue-600"
        : "text-slate-700"
    }`}
  >
    About
  </button>

  <button
    onClick={() => setActiveTab("Post")}
    className={`py-4 text-sm font-semibold ${
      activeTab === "Jobs"
        ? "border-b-2 border-blue-600 text-blue-600"
        : "text-slate-700"
    }`}
  >
    Post
  </button>

  <button
    onClick={() => setActiveTab("People")}
    className={`py-4 text-sm font-semibold ${
      activeTab === "People"
        ? "border-b-2 border-blue-600 text-blue-600"
        : "text-slate-700"
    }`}
  >
    People
  </button>

</div>



      


        {/* ===================================================== */}
        {/* CONTENT GRID */}
      {/* ===================================================== */}

  </section>


<div className="mt-5 grid grid-cols-3 gap-5 lg:grid-cols-[minmax(0,1fr)_340px]">

  {/* LEFT SIDE */}
  <div className="min-w-0">
  
{activeTab === "Home" && (
  <>
{/* ================= HOME TAB ================= */}



    {/* ===================================================== */}
    {/* CONTENT GRID */}
    {/* ===================================================== */}

   


      {/* ================================================= */}
      {/* LEFT COLUMN */}
      {/* ================================================= */}

      

        {/* ================= OVERVIEW ================= */}

        <section className="overflow-hidden rounded-2xl   bg-white shadow-sm mt-3">




          <div className="p-6">

            <h2 className="text-[22px] font-bold text-slate-950">
              Overview
            </h2>

            <p className="mt-5 text-[15px] leading-7 text-slate-600">
              {company.description}
            </p>

          </div>

          <button
            className="
              flex w-full items-center justify-center gap-2
              border-t border-slate-200
              px-6 py-4
              text-sm font-semibold
              text-slate-700
              transition
              hover:bg-slate-50
              hover:text-blue-600
            "
          >
            Show all details
            <ArrowRight size={17} />
          </button>

        </section>


        {/* ================= RECENT JOBS ================= */}
{/* ================= RECENT JOBS ================= */}

<section className="mt-3 overflow-hidden rounded-2xl bg-white shadow-sm">

  <div className="flex items-center justify-between px-6 py-5">

    <h2 className="text-[22px] font-bold text-slate-950">
      Recent job openings
    </h2>

  </div>

  <div className="border-t border-slate-200 px-6 py-5">

    {companyJobs.length === 0 ? (

      /* NO JOBS */
      <div className="flex flex-col items-center justify-center py-10 text-center">

        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-slate-100">
          <i className="fa-solid fa-briefcase text-xl text-slate-400"></i>
        </div>

        <h3 className="text-base font-semibold text-slate-800">
          No job openings yet
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          {company.companyName} hasn't posted any jobs yet.
        </p>

      </div>

    ) : (

      <div className="flex gap-4 overflow-x-auto pb-2">

        {companyJobs.slice(0, 3).map((job) => (

          <div
            key={job.jobId}
            className="
              min-w-[320px] shrink-0
              rounded-xl
              border border-slate-200
              bg-white
              p-5
              transition
              hover:-translate-y-1
              hover:border-blue-200
              hover:shadow-md
            "
          >

            {/* TOP */}

            <div className="flex items-start justify-between gap-3">

              {/* Company Logo */}

              <div
                className="
                  flex h-14 w-14 shrink-0
                  items-center justify-center
                  overflow-hidden
                  rounded-xl
                  border border-slate-200
                  bg-white
                "
              >

                {company.logoUrl ? (
                  <img
                    src={company.logoUrl}
                    alt={company.companyName}
                    className="h-full w-full object-contain p-2"
                  />
                ) : (
                  <span className="text-lg font-bold text-slate-700">
                    {company.companyName?.charAt(0)}
                  </span>
                )}

              </div>


              {/* Bookmark */}

              <button
                type="button"
                onClick={() => handleSaveJob(job.jobId)}
                className="text-slate-600 transition hover:text-blue-600"
              >
                <Bookmark size={20} />
              </button>

            </div>


            {/* JOB INFO */}

            <div className="mt-4">

              <h3 className="truncate text-base font-semibold text-slate-900">
                {job.title}
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                {company.companyName}
              </p>


              {/* Location + Job Type */}

              <div className="mt-3 flex flex-wrap gap-2">

                {job.location && (
                  <span
                    className="
                      rounded-full
                      bg-slate-50
                      px-3 py-1
                      text-xs font-medium
                      text-slate-700
                    "
                  >
                    📍 {job.location}
                  </span>
                )}

                {job.jobType && (
                  <span
                    className="
                      rounded-full
                      bg-blue-50
                      px-3 py-1
                      text-xs font-medium
                      text-blue-700
                    "
                  >
                    {job.jobType}
                  </span>
                )}

              </div>

            </div>


            {/* BOTTOM */}

            <div className="mt-5 flex items-center justify-between">

              <span className="text-xs text-slate-500">

                {dayAgo[job.jobId] === 0
                  ? "Today"
                  : dayAgo[job.jobId] === 1
                    ? "1 day ago"
                    : `${dayAgo[job.jobId]} days ago`
                }

              </span>


              <button
                type="button"
                onClick={() => navigate(`/jobs?companyId=${company.companyId}`)}
                className="
                  rounded-lg
                  border border-blue-600
                  px-4 py-2
                  text-sm font-semibold
                  text-blue-600
                  transition
                  hover:bg-blue-600
                  hover:text-white
                "
              >
                View Job
              </button>

            </div>

          </div>

        ))}

      </div>

    )}

  </div>


  {/* SHOW ALL */}

  {companyJobs.length > 0 && (
    <button
      type="button"
      onClick={() => navigate(`/jobs?companyId=${company.companyId}`)}
      className="
        flex w-full items-center justify-center gap-2
        border-t border-slate-200
        px-6 py-4
        text-sm font-semibold
        text-slate-700
        transition
        hover:bg-slate-50
        hover:text-blue-600
      "
    >
      Show all jobs
      <ArrowRight size={17} />
    </button>
  )}

</section>

{/* ================= LIFE AT COMPANY ================= */}

<section className="mt-3 overflow-hidden rounded-2xl bg-white shadow-sm">

  <div className="px-6 pt-6">

    <h2 className="text-[22px] font-bold text-slate-950">
      Life at {company.companyName}
    </h2>

    <p className="mt-2 text-sm leading-6 text-slate-600">
      Explore the people, culture and environment that make{" "}
      {company.companyName} a unique place to work.
    </p>

  </div>

  {/* IMAGE GRID */}

  <div className="mt-5 grid grid-cols-2 gap-1 overflow-hidden px-1 pb-1 sm:grid-cols-4">

    {companyLife.map((lifeCompany) => (
      <div
        key={lifeCompany.lifeId}
        className="group relative h-44 overflow-hidden bg-slate-100"
      >

        <img
          src={lifeCompany.imageUrl}
          alt={lifeCompany.title || "Life at company"}
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
        />

        {/* Overlay */}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4 opacity-0 transition group-hover:opacity-100">
          <h3 className="text-sm font-semibold text-white">
            {lifeCompany.title}
          </h3>

          {lifeCompany.description && (
            <p className="mt-1 line-clamp-2 text-xs text-white/90">
              {lifeCompany.description}
            </p>
          )}
        </div>

      </div>
    ))}

  </div>

</section>

        {/* ================= PEOPLE HIGHLIGHTS ================= */}

        <section className="overflow-hidden rounded-2xl mt-3 bg-white shadow-sm">

          <div className="p-6">

            <h2 className="text-[22px] font-bold text-slate-950">
              People highlights
            </h2>


            <div className="mt-6 grid grid-cols-1 gap-8 md:grid-cols-2">


              {/* PEOPLE CARD 1 */}

              <div>

                <h3 className="text-[16px] font-semibold text-slate-900">
                  74 employees work in India
                </h3>


                <div className="mt-4 flex items-center">

                  <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-slate-200 text-sm font-bold">
                    A
                  </div>

                  <div className="-ml-2 flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-blue-100 text-sm font-bold text-blue-700">
                    R
                  </div>

                  <div className="-ml-2 flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-green-100 text-sm font-bold text-green-700">
                    S
                  </div>

                  <div className="-ml-2 flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-purple-100 text-sm font-bold text-purple-700">
                    P
                  </div>

                  <div className="-ml-2 flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-white text-xs font-semibold shadow-sm">
                    +70
                  </div>

                </div>


                <p className="mt-3 text-sm text-slate-500">
                  Employees from different backgrounds and locations
                  work together here.
                </p>

              </div>


              {/* PEOPLE CARD 2 */}

              <div>

                <h3 className="text-[16px] font-semibold text-slate-900">
                  Employees from top universities
                </h3>


                <div className="mt-4 flex items-center">

                  <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-orange-100 text-sm font-bold text-orange-700">
                    N
                  </div>

                  <div className="-ml-2 flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-blue-100 text-sm font-bold text-blue-700">
                    A
                  </div>

                  <div className="-ml-2 flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-pink-100 text-sm font-bold text-pink-700">
                    M
                  </div>

                  <div className="-ml-2 flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-slate-100 text-sm font-bold">
                    K
                  </div>

                  <div className="-ml-2 flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-white text-xs font-semibold shadow-sm">
                    +12
                  </div>

                </div>


                <p className="mt-3 text-sm text-slate-500">
                  People from leading universities and institutions
                  are part of the team.
                </p>

              </div>

            </div>

          </div>


          <button
            className="
              flex w-full items-center justify-center gap-2
              border-t border-slate-200
              px-6 py-4
              text-sm font-semibold
              text-slate-700
              transition
              hover:bg-slate-50
              hover:text-blue-600
            "
          >
            Show all people highlights
            <ArrowRight size={17} />
          </button>

        </section>


        {/* ================= INSIGHTS ================= */}

        <section className="overflow-hidden rounded-2xl mt-3 bg-white shadow-sm">

          <div className="p-6">

            <h2 className="text-[22px] font-bold text-slate-950">
              Company insights
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Get a quick overview of company activity.
            </p>


            <div className="mt-7 grid grid-cols-1 gap-6 md:grid-cols-3">


              {/* INSIGHT 1 */}

              <div>

                <p className="text-sm font-semibold text-slate-900">
                  Latest hiring trends
                </p>


                <div className="mt-6 flex h-28 items-end gap-2">

                  <div className="h-10 w-full rounded-t bg-blue-100"></div>
                  <div className="h-14 w-full rounded-t bg-blue-200"></div>
                  <div className="h-16 w-full rounded-t bg-blue-300"></div>
                  <div className="h-20 w-full rounded-t bg-blue-400"></div>
                  <div className="h-24 w-full rounded-t bg-blue-500"></div>

                </div>


                <p className="mt-3 text-xs text-slate-500">
                  Hiring activity over recent months
                </p>

              </div>


              {/* INSIGHT 2 */}

              <div>

                <p className="text-sm font-semibold text-slate-900">
                  Growth trends
                </p>


                <div className="mt-6 flex items-center gap-3">

                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-50">

                    <TrendingUp
                      size={24}
                      className="text-green-600"
                    />

                  </div>


                  <div>

                    <p className="text-3xl font-bold text-slate-900">
                      24%
                    </p>

                    <p className="text-sm text-slate-500">
                      Employee growth
                    </p>

                  </div>

                </div>

              </div>


              {/* INSIGHT 3 */}

              <div>

                <p className="text-sm font-semibold text-slate-900">
                  Recent hires
                </p>


                <div className="mt-6 flex items-center">

                  <div className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-white bg-blue-100 text-sm font-bold">
                    R
                  </div>

                  <div className="-ml-3 flex h-11 w-11 items-center justify-center rounded-full border-2 border-white bg-orange-100 text-sm font-bold">
                    A
                  </div>

                  <div className="-ml-3 flex h-11 w-11 items-center justify-center rounded-full border-2 border-white bg-purple-100 text-sm font-bold">
                    S
                  </div>

                </div>


                <p className="mt-3 text-sm text-slate-500">
                  Recent team members
                </p>

              </div>

            </div>

          </div>
    </section>

     
 
        </>
)}
   
{activeTab === "About" && (
  <div className="space-y-5">

    {/* ================================================= */}
    {/* ABOUT COMPANY */}
    {/* ================================================= */}

    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

      <div className="p-7">

        <h2 className="text-[24px] font-bold text-slate-950">
          About {company?.companyName}
        </h2>

        <p className="mt-5 text-[16px] leading-8 text-slate-600">
          {company?.description ||
            `${company?.companyName} is a company focused on building great products,
            creating meaningful opportunities, and delivering value to its customers.`}
        </p>

      </div>

    </section>


    


    {/* ================================================= */}
    {/* COMPANY DETAILS */}
    {/* ================================================= */}

    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

      <div className="border-b border-slate-200 px-7 py-6">

        <h2 className="text-[24px] font-bold text-slate-950">
          Company details
        </h2>

      </div>


      <div className="grid grid-cols-1 gap-x-10 gap-y-7 p-7 sm:grid-cols-2">


        {/* INDUSTRY */}

        <div>

          <p className="text-sm font-medium text-slate-500">
            Industry
          </p>

          <p className="mt-2 text-[16px] font-semibold text-slate-900">
            {company?.industry || "Technology"}
          </p>

        </div>


        {/* LOCATION */}

        <div>

          <p className="text-sm font-medium text-slate-500">
            Headquarters
          </p>

          <p className="mt-2 text-[16px] font-semibold text-slate-900">
            {company?.location || "Not specified"}
          </p>

        </div>


        {/* COMPANY SIZE */}

        <div>

          <p className="text-sm font-medium text-slate-500">
            Company size
          </p>

          <p className="mt-2 text-[16px] font-semibold text-slate-900">
            {company?.companySize || "Not specified"}
          </p>

        </div>


        {/* FOUNDED */}

        <div>

          <p className="text-sm font-medium text-slate-500">
            Founded
          </p>

          <p className="mt-2 text-[16px] font-semibold text-slate-900">
            {company?.foundedYear || "Not specified"}
          </p>

        </div>


        {/* WEBSITE */}

        <div>

          <p className="text-sm font-medium text-slate-500">
            Website
          </p>

          {company?.website ? (

            <a
              href={company.website}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 block text-[16px] font-semibold text-blue-600 hover:underline"
            >
              Visit website
            </a>

          ) : (

            <p className="mt-2 text-[16px] font-semibold text-slate-900">
              Not specified
            </p>

          )}

        </div>


        {/* COMPANY TYPE */}

        <div>

          <p className="text-sm font-medium text-slate-500">
            Company type
          </p>

          <p className="mt-2 text-[16px] font-semibold text-slate-900">
            Private
          </p>

        </div>

      </div>

    </section>


    {/* ================================================= */}
    {/* WHAT WE DO */}
    {/* ================================================= */}

    <section className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">

      <h2 className="text-[24px] font-bold text-slate-950">
        What we do
      </h2>

      <p className="mt-5 text-[16px] leading-8 text-slate-600">
        {company?.description ||
          "We build innovative products and services while creating an environment where talented people can learn, collaborate and grow."}
      </p>


      {/* INDUSTRY TAGS */}

      <div className="mt-6 flex flex-wrap gap-3">

        <span className="rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700">
          {company?.industry || "Technology"}
        </span>

        <span className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700">
          Innovation
        </span>

        <span className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700">
          Technology
        </span>

        <span className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700">
          Career Opportunities
        </span>

      </div>

    </section>


    {/* ================================================= */}
    {/* WHY JOIN US */}
    {/* ================================================= */}

    <section className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">

      <h2 className="text-[24px] font-bold text-slate-950">
        Why join {company?.companyName}?
      </h2>


      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">


        {/* CARD 1 */}

        <div className="rounded-xl border border-slate-200 p-5">

          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50">
            <GraduationCap
              size={20}
              className="text-blue-600"
            />
          </div>

          <h3 className="mt-4 font-semibold text-slate-900">
            Learning opportunities
          </h3>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Work on challenging projects and continuously develop your
            technical and professional skills.
          </p>

        </div>


        {/* CARD 2 */}

        <div className="rounded-xl border border-slate-200 p-5">

          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-50">
            <Users
              size={20}
              className="text-green-600"
            />
          </div>

          <h3 className="mt-4 font-semibold text-slate-900">
            Great people
          </h3>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Collaborate with talented people and teams from different
            backgrounds and experiences.
          </p>

        </div>


        {/* CARD 3 */}

        <div className="rounded-xl border border-slate-200 p-5">

          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-50">
            <Lightbulb
              size={20}
              className="text-purple-600"
            />
          </div>

          <h3 className="mt-4 font-semibold text-slate-900">
            Innovation
          </h3>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Solve meaningful problems and contribute to products that
            make a real difference.
          </p>

        </div>


        {/* CARD 4 */}

        <div className="rounded-xl border border-slate-200 p-5">

          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-50">
            <Briefcase
              size={20}
              className="text-orange-600"
            />
          </div>

          <h3 className="mt-4 font-semibold text-slate-900">
            Career growth
          </h3>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Build your career through new responsibilities, learning
            opportunities and real-world experience.
          </p>

        </div>

      </div>

    </section>

  </div>
)}
     
{activeTab === "Post" && (
  <div className="space-y-6">

    {/* ================================================= */}
    {/* POST HEADER */}
    {/* ================================================= */}

   

    {/* ================================================= */}
    {/* LOADING */}
    {/* ================================================= */}

    {postLoading && (

      <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">

        <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600"></div>

        <p className="mt-4 text-sm font-medium text-slate-500">
          Loading posts...
        </p>

      </div>

    )}


    {/* ================================================= */}
    {/* NO POSTS */}
    {/* ================================================= */}

    {!postLoading && companyPost.length === 0 && (

      <section className="rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-sm">

        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">

          <Briefcase
            size={28}
            className="text-slate-400"
          />

        </div>

        <h3 className="mt-5 text-xl font-bold text-slate-900">
          No posts yet
        </h3>

        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
          {company?.companyName} hasn't published any posts yet.
          Check back later for updates and opportunities.
        </p>

      </section>

    )}


    {/* ================================================= */}
    {/* POSTS */}
    {/* ================================================= */}

{!postLoading && companyPost.length > 0 && (
  <div className="space-y-5">

    {companyPost.map((post) => (

      <section
        key={post.postId}
        className="relative rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden"
      >

        {/* ================= HEADER ================= */}

        <div className="flex items-center justify-between px-6 py-5">

        <div className="flex items-center gap-3">
  <img
    src={company?.logoUrl}
    alt={company?.companyName}
    className="h-16 w-16 object-contain"
  />

  <div>
    <div className="flex items-center gap-1">
      <h3 className="font-semibold text-slate-900">
        {company?.companyName}
      </h3>

      <span className="text-blue-600">✓</span>
    </div>

    <p className="mt-2 text-sm text-slate-500">
      {post.postType}
    </p>
  </div>
</div>


          {/* ================= MORE ================= */}

          <div className="relative">

            <button
              onClick={() =>
                setMenuOpen(
                  menuOpen === post.postId
                    ? null
                    : post.postId
                )
              }
              className="flex h-9 w-9 items-center justify-center rounded-full text-xl text-slate-500 hover:bg-slate-100"
            >
              ⋯
            </button>


            {/* DELETE MENU */}

            {menuOpen === post.postId && (

              <div className="absolute right-0 top-11 z-50 w-32 rounded-xl border border-slate-200 bg-white p-1 shadow-lg">

                <button
                  onClick={() => handleDeletePost(post.postId)}
                  className="w-full rounded-lg px-3 py-2 text-left text-sm font-medium text-red-600 hover:bg-red-50"
                >
                  Delete
                </button>

              </div>

            )}

          </div>

        </div>


        {/* ================= CONTENT ================= */}

        <div className="px-6 pb-5">

          <h2 className="text-xl  text-slate-900">
            {post.title}
          </h2>

          <p className="mt-3 text-slate-600">
            {post.content}
          </p>

        </div>


        {/* ================= IMAGE ================= */}

        {post.imageUrl && (
          <img
            src={post.imageUrl}
            alt={post.title}
            className="h-auto max-h-[600px] w-full object-cover"
          />
        )}


        {/* ================= ACTIONS ================= */}

      <div className="flex items-center justify-between border-b border-slate-200 px-6 py-3 text-sm text-slate-500">

<button
  onClick={() => handleSetLike(post.postId)}
  className={`transition ${
    liked[post.postId]
      ? "text-blue-600 font-semibold"
      : "text-slate-500"
  }`}
>
  {liked[post.postId] ? "💙" : "♡"} {like[post.postId] || 0}
</button>

  <div className="flex gap-4">
    <span>8 comments</span>
    <span>3 shares</span>
  </div>

</div>


       <div className="grid grid-cols-4  px-2 py-2">

 <button
  onClick={() => handleSetLike(post.postId)}
  className={`flex items-center justify-center gap-2 rounded-lg py-2.5
             text-sm font-medium transition-all duration-200
             ${
               liked[post.postId]
                 ? "bg-blue-50 text-blue-600"
                 : "text-slate-600 hover:bg-slate-100 hover:text-blue-600"
             }`}
>
  <ThumbsUp
    size={18}
    strokeWidth={liked[post.postId] ? 2.5 : 1.8}
    fill={liked[post.postId] ? "currentColor" : "none"}
  />

  <span>
    {liked[post.postId] ? "Liked" : "Like"}
  </span>
</button>

  <button
    className="flex items-center justify-center gap-2 rounded-lg py-2.5
               text-sm font-medium text-slate-600
               transition-all duration-200
               hover:bg-slate-100 hover:text-blue-600"
  >
    <MessageCircle size={18} strokeWidth={1.8} />
    <span>Comment</span>
  </button>

  <button
    className="flex items-center justify-center gap-2 rounded-lg py-2.5
               text-sm font-medium text-slate-600
               transition-all duration-200
               hover:bg-slate-100 hover:text-blue-600"
  >
    <Share2 size={18} strokeWidth={1.8} />
    <span>Share</span>
  </button>

  <button
    className="flex items-center justify-center gap-2 rounded-lg py-2.5
               text-sm font-medium text-slate-600
               transition-all duration-200
               hover:bg-slate-100 hover:text-blue-600"
  >
    <Bookmark size={18} strokeWidth={1.8} />
    <span>Save</span>
  </button>

</div>

      </section>

    ))}

  </div>
)}

  </div>
)}
</div>
 {/* ================================================= */}
      {/* RIGHT SIDEBAR */}
      {/* ================================================= */}

      <aside className="space-y-5 ">


        {/* PEOPLE ALSO VIEWED */}

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

          <h2 className="text-[20px] font-bold text-slate-950">
            People also viewed
          </h2>


          <div className="mt-6 space-y-5">

            {companiess
              .filter(
                (company) =>
                  Number(company.companyId) !== Number(companyId)
              )
              .slice(0, 3)
              .map((company) => (

                <div
                  key={company.companyId}
                  className="flex gap-4"
                >

                  {/* Company Logo */}

                  <div
                    className="
                      flex h-20 w-20 shrink-0
                      items-center justify-center
                      overflow-hidden rounded-xl
                      border border-slate-200
                    "
                  >

                    <img
                     
                     
                      src={company.logoUrl}
                       alt={company.companyName}
                      className="h-full w-full object-contain p-1"
                    />

                  </div>


                  {/* Company Info */}

                  <div className="flex-1">

                    <h3 className="font-semibold text-slate-900">
                      {company.companyName}
                    </h3>

                    <p className="text-sm text-slate-500">
                      {company.industry}
                    </p>


                    <button
                      className="
                        mt-2 rounded-full
                        border border-slate-400
                        px-4 py-1
                        text-sm font-semibold
                        text-slate-700
                        hover:border-blue-600
                        hover:text-blue-600
                      "
                    >
                      Follow
                    </button>

                  </div>

                </div>

              ))}

          </div>


          {/* SHOW ALL */}

          <button
            onClick={() => navigate("/companies")}
            className="
              mt-6
              flex w-full
              items-center
              justify-center
              gap-2
              border-t border-slate-200
              pt-5
              text-sm font-semibold
              text-slate-700
              hover:text-blue-600
            "
          >
            Show all
            <ArrowRight size={16} />
          </button>

        </section>


        {/* QUICK FACTS */}

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

          <h2 className="text-[20px] font-bold text-slate-950">
            Why work here?
          </h2>


          <div className="mt-5 space-y-4">


            {/* LEARNING */}

            <div className="flex gap-3">

              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-green-50">

                <GraduationCap
                  size={18}
                  className="text-green-600"
                />

              </div>


              <div>

                <p className="text-sm font-semibold">
                  Learning opportunities
                </p>

                <p className="mt-1 text-xs leading-5 text-slate-500">
                  Grow your skills through challenging projects.
                </p>

              </div>

            </div>


            {/* GREAT PEOPLE */}

            <div className="flex gap-3">

              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-50">

                <UserRound
                  size={18}
                  className="text-blue-600"
                />

              </div>


              <div>

                <p className="text-sm font-semibold">
                  Great people
                </p>

                <p className="mt-1 text-xs leading-5 text-slate-500">
                  Work with talented teams from around the world.
                </p>

              </div>

            </div>


            {/* FLEXIBLE ENVIRONMENT */}

            <div className="flex gap-3">

              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-purple-50">

                <Clock3
                  size={18}
                  className="text-purple-600"
                />

              </div>


              <div>

                <p className="text-sm font-semibold">
                  Flexible environment
                </p>

                <p className="mt-1 text-xs leading-5 text-slate-500">
                  Modern ways of working and collaboration.
                </p>

              </div>

            </div>

          </div>

 
        </section>


      </aside>
          </div>



    

  
 
      </main>




      {/* FOOTER */}
      <Footer />

    </div>
    );
};

export default CompanyDetails;