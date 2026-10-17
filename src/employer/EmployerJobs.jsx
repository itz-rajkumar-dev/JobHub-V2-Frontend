import React from "react";
import { useState,useEffect } from "react";
import api from "../Service/Api";
import {
  Search,
  Plus,
  Users,
  Eye,
  MoreHorizontal,
  BriefcaseBusiness,
  MapPin,
  ChevronDown,
} from "lucide-react";
import { Link } from "react-router-dom";
import NavBar from "../component/NavBar";
import toast from "react-hot-toast";

const EmployerJobs = () => {

  
    const[job,setJob]=useState([]);
  
    const [page, setPage] = useState(0);
const [totalPages, setTotalPages] = useState(0);
const [pageSize] = useState(10);
const [openCount, setOpenCount] = useState(0);
const [draftCount, setDraftCount] = useState(0);
const [closedCount, setClosedCount] = useState(0);
const [expiredCount, setExpiredCount] = useState(0);
   useEffect(() => {
  fetchJobs(0);
}, []);

const fetchJobs = async (pageNumber) => {
  try {
    const response = await api.get("/jobs/my", {
      params: {
        page: pageNumber,
        size: pageSize,
        search:search.trim()||undefined
      },
    });

    console.log("MY JOBS:", response.data);

    setJob(response.data.content);
    setPage(response.data.page);
    setTotalPages(response.data.totalPages);
    setOpenCount(response.data.openCount);
setDraftCount(response.data.draftCount);
setClosedCount(response.data.closedCount);
setExpiredCount(response.data.expiredCount);

  } catch (error) {
    console.log("API ERROR", error);
  }
};

const handlePageChange = (newPage) => {
  if (newPage < 0 || newPage >= totalPages) return;

  fetchJobs(newPage);
};

    const [open,setOpen]=useState(false);
    const [draft, setDraft] = useState(false);

    const[closed,setClosed]=useState(false);
    const[expired,setExpired]=useState(false);


    const filteredJobs = job.filter((jobs) => {
  if (open) {
    return jobs.status === "OPEN";
  }

  if (draft) {
    return jobs.status === "DRAFT";
  }

  if (closed) {
    return jobs.status === "CLOSED";
  }

  if (expired) {
    return jobs.status === "EXPIRED";
  }

  return true;
});
const[viewJob,setViewJob]=useState(false);
const[edit,setEdit]=useState(false);
const [selectedJob, setSelectedJob] = useState(null);


const updateJob = async () => {
  try {

    const response = await api.put(
      `/jobs/update/${selectedJob.jobId}`,
      selectedJob
    );

    console.log("Job Updated:", response.data);
    toast.success("Update Successfully")

    setEdit(false);
    setSelectedJob(null);

    // updated jobs dobara fetch
    fetchJobs(page);

  } catch (error) {

    console.log("UPDATE ERROR:", error);

  }
};

const [menuOpen,setMenuOpen]=useState(false);
const [search, setSearch] = useState("");

const [deleteJob ,setDeleteJob]=useState();

const handleDelete = async (jobId) => {
  try {
    const response = await api.delete(`/jobs/delete/${jobId}`);

    console.log(response.data);

    toast.success("Delete Successfully");

    setMenuOpen(false);

    fetchJobs(page);

  } catch (error) {
    console.log("API ERROR", error);
    toast.error("Delete Failed");
  }
};


  return (
    <div className="min-h-screen bg-[#f3f2ef] text-[#191919]">

      <NavBar />

      {/* Main */}
      <main className="pt-[72px]">

        <div className="max-w-6xl mx-auto px-5 py-7">

          {/* ================================================= */}
          {/* HEADER */}
          {/* ================================================= */}

          <div className="flex items-start justify-between mb-5">

            <div>
              <h1 className="text-[26px] font-semibold text-[#191919]">
                My Jobs
              </h1>

              <p className="text-[14px] text-[#666666] mt-1">
                Manage and track all your job postings.
              </p>
            </div>

            <Link
              to="/employer/jobs/create"
              className="
                flex items-center gap-2
                rounded-full
                bg-[#0a66c2]
                px-5 py-2.5
                text-[13px] font-semibold
                text-white
                hover:bg-[#004182]
                transition
              "
            >
              <Plus size={17} />
              Post a Job
            </Link>

          </div>


          {/* ================================================= */}
          {/* JOBS CARD */}
          {/* ================================================= */}

          <div className="bg-white border border-[#dfe3e8] rounded-lg overflow-hidden">

            {/* ================================================= */}
            {/* FILTER HEADER */}
            {/* ================================================= */}

            <div className="px-5 py-4 border-b border-[#e0e0e0]">

              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

                {/* Tabs */}
                <div className="flex items-center gap-2">

                  {/* All */}
                        <button
 onClick={() => {
  setOpen(false);
  setDraft(false);
  setClosed(false);
  setExpired(false);
}}

  
  className={`
    rounded-full
    px-4 py-2
    text-[13px]
    font-semibold
    transition
    ${
      !open
        ? "bg-[#e8f3ff] text-[#0a66c2]"
        : "border border-[#dfe3e8] bg-white text-[#444444] hover:bg-[#f3f6f8]"
    }
  `}
>
  All
  <span className="ml-1.5 text-[#777777]">
    {openCount + draftCount + closedCount + expiredCount}
  </span>
</button>

                  {/* Open */}
                         <button
                       onClick={() => setOpen(true)}
                   className={`  rounded-full px-4 py-2 text-[13px] font-semibold transition${ open
                   ? "bg-[#e8f3ff] text-[#0a66c2]"
                   : "border border-[#dfe3e8] bg-white text-[#444444] hover:bg-[#f3f6f8]" }`}>
                   Open
                     <span className="ml-1.5 text-[#777777]">
                   {openCount}
                      </span>
                  </button>

                  {/* Draft */}
                         
<button
  onClick={() => {
    setDraft(true);
    setOpen(false);
  }}
  className={`
    rounded-full
    px-4 py-2
    text-[13px]
    font-semibold
    transition
    ${
      draft
        ? "bg-[#e8f3ff] text-[#0a66c2]"
        : "border border-[#dfe3e8] bg-white text-[#444444] hover:bg-[#f3f6f8]"
    }
  `}
>
  Draft
  <span className="ml-1.5 text-[#777777]">
   {draftCount}
  </span>
</button>

                  {/* Closed */}
                 {/* Closed */}
<button
  onClick={() => {
    setClosed(true);
    setOpen(false);
    setDraft(false);
    setExpired(false);
  }}
  className={`
    rounded-full
    px-4 py-2
    text-[13px]
    font-semibold
    transition
    ${
      closed
        ? "bg-[#e8f3ff] text-[#0a66c2]"
        : "border border-[#dfe3e8] bg-white text-[#444444] hover:bg-[#f3f6f8]"
    }
  `}
>
  Closed
  <span className="ml-1.5 text-[#777777]">
   {closedCount}
  </span>
</button>



                 {/* Expired */}
<button
  onClick={() => {
    setExpired(true);
    setOpen(false);
    setDraft(false);
    setClosed(false);
  }}
  className={`
    rounded-full
    px-4 py-2
    text-[13px]
    font-semibold
    transition
    ${
      expired
        ? "bg-[#e8f3ff] text-[#0a66c2]"
        : "border border-[#dfe3e8] bg-white text-[#444444] hover:bg-[#f3f6f8]"
    }
  `}
>
  Expired
  <span className="ml-1.5 text-[#777777]">
    {expiredCount}
  </span>
</button>

                </div>


                {/* Search */}
                <div className="relative w-full lg:w-[290px]">

                  <Search
                    size={17}
                    className="
                      absolute
                      left-3
                      top-1/2
                      -translate-y-1/2
                      text-[#777777]
                    "
                  />

                   <input
  value={search}
  onChange={(e) => {
    setSearch(e.target.value);
    setPage(0);
  }}
  onKeyDown={(e) => {
    if (e.key === "Enter") {
      fetchJobs(0);
    }
  }}
  type="text"
  placeholder="Search jobs by title, location..."
  className="
    w-full
    h-10
    rounded-md
    border border-[#cfd5dc]
    bg-white
    pl-10 pr-3
    text-[13px]
    text-[#191919]
    outline-none
    placeholder:text-[#888888]
    focus:border-[#0a66c2]
    focus:ring-1
    focus:ring-[#0a66c2]
  "
/>

                </div>

              </div>

            </div>


            {/* ================================================= */}
            {/* JOB 1 */}
            {/* ================================================= */}

<div className="px-5 py-5 ">

  {filteredJobs.length === 0 ? (
  <div className="py-12 text-center text-[#666666]">

    <BriefcaseBusiness
      size={40}
      className="mx-auto mb-3 text-[#999999]"
    />

    <p className="text-[15px] font-semibold text-[#191919]">
      {job.length === 0
        ? "You haven't posted any jobs yet."
        : open
        ? "You haven't posted any open jobs yet."
        : draft
        ? "You don't have any draft jobs."
        : closed
        ? "You don't have any closed jobs."
        : expired
        ? "You don't have any expired jobs."
        : "No jobs found."
      }
    </p>

    <p className="text-[13px] mt-1">
      {job.length === 0
        ? "Post your first job to get started."
        : "Try selecting another job status."
      }
    </p>

  </div>
  ) : (
  filteredJobs.map((jobs) => (
    <div
  key={jobs.jobId}
  className="
    flex flex-col lg:flex-row lg:items-center
    justify-between gap-5
    px-5 py-5
    mb-2
    bg-white
    border border-[#dfe3e8]
    rounded-lg
    hover:border-[#c8d0d8]
    hover:shadow-sm
    transition-all duration-200
  "
>

        {/* Left */}
        <div className="flex items-start gap-4 min-w-0">

         <div 
  className="
    w-21 h-21 
    rounded-lg 
    border border-[#dfe3e8] 
    flex items-center justify-center 
    shrink-0 
    overflow-hidden
  "
>
  {jobs.companyLogo ? (
    <img
      src={jobs.companyLogo}
      alt={jobs.companyName}
      className="w-full h-full object-contain p-1"
    />
  ) : (
    <Building2Placeholder />
  )}
</div>

          {/* Job Info */}
          <div className="min-w-0">

            <div className="flex items-center gap-3 flex-wrap">

              <h2 className="
                text-[17px]
                font-semibold
                text-[#191919]
              ">
                {jobs.title}
              </h2>

              {/* Status */}
              <span className="
                inline-flex
                items-center
                gap-1.5
                rounded-full
                bg-[#e8f6ef]
                px-3 py-1
                text-[12px]
                font-semibold
                text-[#057642]
              ">
                <span className="w-1.5 h-1.5 rounded-full bg-[#057642]" />
                {jobs.status}
              </span>

            </div>

            <p className="
              flex flex-wrap
              items-center
              gap-2
              text-[13px]
              text-[#666666]
              mt-1.5
            ">
              <span>{jobs.companyName}</span>

              <span className="text-[#b0b0b0]">•</span>

              <span>{jobs.location}</span>

              <span className="text-[#b0b0b0]">•</span>

              <span>{jobs.jobType}</span>
            </p>

            {/* Stats */}
            <div className="
              flex items-center
              gap-4
              mt-3
              text-[13px]
              text-[#666666]
            ">

              <span className="flex items-center gap-1.5">
                <Users size={15} />

                <strong className="text-[#191919]">
                  {jobs.applicationsCount}
                </strong>

                Applications
              </span>

              <span className="text-[#c5c5c5]">
                •
              </span>

              <span className="flex items-center gap-1.5">
                <Eye size={15} />

                <strong className="text-[#191919]">
                  {jobs.viewsCount}
                </strong>

                Views
              </span>

            </div>

          </div>
        </div>

        {/* Right */}
        <div className="
          flex items-center
          justify-between
          lg:justify-end
          gap-3
        ">

          <span className="
            hidden md:block
            text-[13px]
            text-[#777777]
            whitespace-nowrap
          ">
            {jobs.createdAt
              ? new Date(jobs.createdAt).toLocaleDateString()
              : "—"}
          </span>

          <button
  onClick={() => {
    setSelectedJob(jobs);
    setViewJob(true);
  }}
  className="
    rounded-full
    border border-[#0a66c2]
    px-4 py-2
    text-[13px]
    font-semibold
    text-[#0a66c2]
    hover:bg-[#e8f3ff]
    transition
  "
>
  View Job
</button>

                  <button
  onClick={() => {
    setSelectedJob(jobs);
    setEdit(true);
  }}
            className="
              rounded-full
              border border-[#cfd5dc]
              bg-white
              px-4 py-2
              text-[13px]
              font-semibold
              text-[#444444]
              hover:bg-[#f3f6f8]
            "
          >
            Edit
          </button>

      <div className="relative">

  <button
    onClick={() => {
      setSelectedJob(jobs);

      setMenuOpen(
        menuOpen && selectedJob?.jobId === jobs.jobId
          ? false
          : true
      );
    }}
    className="
      w-9 h-9
      rounded-full
      border border-[#dfe3e8]
      flex items-center justify-center
      text-[#555555]
      hover:bg-[#f3f6f8]
    "
  >
    <MoreHorizontal size={18} />
  </button>

  {menuOpen && selectedJob?.jobId === jobs.jobId && (
    <div
      className="
        absolute
        right-0
        top-11
        z-50
        w-52
        rounded-xl
        border border-[#e1e5e9]
        bg-white
        shadow-xl
        py-2
      "
    >

      <button
        onClick={() => {
          setMenuOpen(false);
        }}
        className="
          w-full px-4 py-2.5
          text-left text-[13px]
          text-[#333]
          hover:bg-[#f3f6f8]
        "
      >
        View applications
      </button>

      <div className="my-1 border-t border-[#eeeeee]" />

<button
  onClick={() => {
    handleDelete(jobs.jobId);
  }}
  className="
    w-full px-4 py-2.5
    text-left text-[13px]
    text-red-600
    hover:bg-red-50
  "
>
  Delete job
</button>

    </div>
  )}

</div>


  

        </div>


        

      </div>
      
    ))
  )}
</div>




      

           

          </div>

          

          {/* Pagination */}

{totalPages > 1 && (
  <div className="flex items-center justify-center gap-2 mt-6">

    <button
      onClick={() => handlePageChange(page - 1)}
      disabled={page === 0}
      className="px-4 py-2 rounded-full border border-[#dfe3e8] text-[13px] font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#f3f6f8]"
    >
      Previous
    </button>

    {Array.from({ length: totalPages }, (_, index) => (
      <button
        key={index}
        onClick={() => handlePageChange(index)}
        className={`w-9 h-9 rounded-full text-[13px] font-semibold ${
          page === index
            ? "bg-[#0a66c2] text-white"
            : "border border-[#dfe3e8] bg-white text-[#444444] hover:bg-[#f3f6f8]"
        }`}
      >
        {index + 1}
      </button>
    ))}

    <button
      onClick={() => handlePageChange(page + 1)}
      disabled={page === totalPages - 1}
      className="px-4 py-2 rounded-full border border-[#dfe3e8] text-[13px] font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#f3f6f8]"
    >
      Next
    </button>

  </div>
)}



        </div>
{viewJob && selectedJob && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">

    <div className="w-full max-w-4xl max-h-[100vh] overflow-hidden rounded-2xl bg-white shadow-2xl">

      {/* ================= HEADER ================= */}

      <div className="flex items-start justify-between border-b border-[#e5e7eb] px-7 py-6">

        <div className="flex items-start gap-4">

          {/* Company Logo */}
          <div className="w-25 h-25 rounded-xl border border-[#dfe3e8] flex items-center justify-center overflow-hidden shrink-0">

            {selectedJob.companyLogo ? (
              <img
                src={selectedJob.companyLogo}
                alt={selectedJob.companyName}
                className="w-full h-full object-contain p-2"
              />
            ) : (
              <Building2Placeholder />
            )}

          </div>

          {/* Job Title */}
          <div>

            <h2 className="text-[24px] font-semibold text-[#191919]">
              {selectedJob.title}
            </h2>

            <p className="mt-1 text-[14px] text-[#666]">
              {selectedJob.companyName}
            </p>

            <div className="flex flex-wrap items-center gap-2 mt-3">

              <span className="text-[12px] px-3 py-1 rounded-full bg-[#e8f3ff] text-[#0a66c2] font-semibold">
                {selectedJob.status}
              </span>

              <span className="text-[12px] text-[#666]">
                Posted {selectedJob.createdAt
                  ? new Date(selectedJob.createdAt).toLocaleDateString()
                  : "—"}
              </span>

            </div>

          </div>

        </div>

        {/* Close */}

        <button
          onClick={() => {
            setViewJob(false);
            setSelectedJob(null);
          }}
          className="w-9 h-9 rounded-full flex items-center justify-center text-[#555] hover:bg-[#f3f3f3]"
        >
          ✕
        </button>

      </div>


      {/* ================= CONTENT ================= */}

      <div className="max-h-[calc(90vh-105px)] overflow-y-auto px-7 py-6">

        {/* ================= BASIC INFO ================= */}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">

          <div className="rounded-xl border border-[#e5e7eb] p-4">
            <p className="text-[12px] text-[#777]">Location</p>
            <p className="mt-1 text-[14px] font-semibold text-[#191919]">
              {selectedJob.location || "—"}
            </p>
          </div>

          <div className="rounded-xl border border-[#e5e7eb] p-4">
            <p className="text-[12px] text-[#777]">Job Type</p>
            <p className="mt-1 text-[14px] font-semibold text-[#191919]">
              {selectedJob.jobType || "—"}
            </p>
          </div>

          <div className="rounded-xl border border-[#e5e7eb] p-4">
            <p className="text-[12px] text-[#777]">Work Mode</p>
            <p className="mt-1 text-[14px] font-semibold text-[#191919]">
              {selectedJob.workMode || "—"}
            </p>
          </div>

          <div className="rounded-xl border border-[#e5e7eb] p-4">
            <p className="text-[12px] text-[#777]">Category</p>
            <p className="mt-1 text-[14px] font-semibold text-[#191919]">
              {selectedJob.categoryName || "—"}
            </p>
          </div>

        </div>


        {/* ================= SALARY / EXPERIENCE ================= */}

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-3">

          <div className="rounded-xl bg-[#f8fafc] p-4">
            <p className="text-[12px] text-[#777]">
              Salary
            </p>

            <p className="mt-1 text-[15px] font-semibold text-[#191919]">
              {selectedJob.salaryMin || selectedJob.salaryMax
                ? `${selectedJob.salaryCurrency || "INR"} ${
                    selectedJob.salaryMin || 0
                  } - ${
                    selectedJob.salaryMax || 0
                  }`
                : "Not specified"}
            </p>
          </div>


          <div className="rounded-xl bg-[#f8fafc] p-4">
            <p className="text-[12px] text-[#777]">
              Experience
            </p>

            <p className="mt-1 text-[15px] font-semibold text-[#191919]">
              {selectedJob.experienceMin != null ||
              selectedJob.experienceMax != null
                ? `${selectedJob.experienceMin || 0} - ${
                    selectedJob.experienceMax || 0
                  } years`
                : "Not specified"}
            </p>
          </div>


          <div className="rounded-xl bg-[#f8fafc] p-4">
            <p className="text-[12px] text-[#777]">
              Vacancies
            </p>

            <p className="mt-1 text-[15px] font-semibold text-[#191919]">
              {selectedJob.vacancies || 0}
            </p>
          </div>

        </div>


        {/* ================= DESCRIPTION ================= */}

        <div className="mt-7">

          <h3 className="text-[18px] font-semibold text-[#191919]">
            Job Description
          </h3>

          <p className="mt-2 text-[14px] leading-7 text-[#555] whitespace-pre-line">
            {selectedJob.description || "No description provided."}
          </p>

        </div>


        {/* ================= RESPONSIBILITIES ================= */}

        <div className="mt-7">

          <h3 className="text-[18px] font-semibold text-[#191919]">
            Responsibilities
          </h3>

          <p className="mt-2 text-[14px] leading-7 text-[#555] whitespace-pre-line">
            {selectedJob.responsibilities || "No responsibilities provided."}
          </p>

        </div>


        {/* ================= REQUIREMENTS ================= */}

        <div className="mt-7">

          <h3 className="text-[18px] font-semibold text-[#191919]">
            Requirements
          </h3>

          <p className="mt-2 text-[14px] leading-7 text-[#555] whitespace-pre-line">
            {selectedJob.requirements || "No requirements provided."}
          </p>

        </div>


        {/* ================= QUALIFICATIONS ================= */}

        <div className="mt-7">

          <h3 className="text-[18px] font-semibold text-[#191919]">
            Qualifications
          </h3>

          <p className="mt-2 text-[14px] leading-7 text-[#555] whitespace-pre-line">
            {selectedJob.qualifications || "No qualifications provided."}
          </p>

        </div>


        {/* ================= BENEFITS ================= */}

        <div className="mt-7">

          <h3 className="text-[18px] font-semibold text-[#191919]">
            Benefits
          </h3>

          <p className="mt-2 text-[14px] leading-7 text-[#555] whitespace-pre-line">
            {selectedJob.benefits || "No benefits provided."}
          </p>

        </div>


        {/* ================= SKILLS ================= */}

        <div className="mt-7">

          <h3 className="text-[18px] font-semibold text-[#191919]">
            Skills
          </h3>

          <div className="flex flex-wrap gap-2 mt-3">

            {selectedJob.skills?.length > 0 ? (
              selectedJob.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1.5 rounded-full bg-[#e8f3ff] text-[#0a66c2] text-[12px] font-semibold"
                >
                  {skill}
                </span>
              ))
            ) : (
              <span className="text-[13px] text-[#777]">
                No skills specified.
              </span>
            )}

          </div>

        </div>


        {/* ================= JOB STATS ================= */}

        <div className="mt-7 grid grid-cols-2 md:grid-cols-4 gap-3">

          <div className="border border-[#e5e7eb] rounded-xl p-4">
            <p className="text-[12px] text-[#777]">
              Applications
            </p>

            <p className="mt-1 text-xl font-semibold text-[#191919]">
              {selectedJob.applicationsCount || 0}
            </p>
          </div>


          <div className="border border-[#e5e7eb] rounded-xl p-4">
            <p className="text-[12px] text-[#777]">
              Views
            </p>

            <p className="mt-1 text-xl font-semibold text-[#191919]">
              {selectedJob.viewsCount || 0}
            </p>
          </div>


          <div className="border border-[#e5e7eb] rounded-xl p-4">
            <p className="text-[12px] text-[#777]">
              Deadline
            </p>

            <p className="mt-1 text-[14px] font-semibold text-[#191919]">
              {selectedJob.deadline
                ? new Date(selectedJob.deadline).toLocaleDateString()
                : "—"}
            </p>
          </div>


          <div className="border border-[#e5e7eb] rounded-xl p-4">
            <p className="text-[12px] text-[#777]">
              Featured
            </p>

            <p className="mt-1 text-[14px] font-semibold text-[#191919]">
              {selectedJob.featured ? "Yes" : "No"}
            </p>
          </div>

        </div>

      </div>

    </div>

  </div>
)}
        
       {edit && selectedJob && (

  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">

    <div className="w-full max-w-4xl max-h-[100vh] overflow-hidden rounded-2xl bg-white shadow-2xl border">

      {/* ================= HEADER ================= */}

      <div className="flex items-center justify-between px-7 py-5 border-b border-[#e5e7eb]">

        <div>
          <h2 className="text-[22px] font-semibold text-[#191919]">
            Edit Job
          </h2>

          <p className="text-[13px] text-[#777777] mt-1">
            Update your job posting details
          </p>
        </div>

        <button
          onClick={() => {
            setEdit(false);
            setSelectedJob(null);
          }}
          className="w-9 h-9 rounded-full flex items-center justify-center text-[#555] hover:bg-[#f3f3f3]"
        >
          ✕
        </button>

      </div>


      {/* ================= FORM ================= */}

      <div className="max-h-[calc(90vh-150px)] overflow-y-auto px-7 py-6">

        {/* Job Title */}

        <div className="mb-5">

          <label className="block text-[13px] font-semibold text-[#333] mb-2">
            Job Title
          </label>

          <input
            type="text"
            value={selectedJob.title || ""}
            onChange={(e) =>
              setSelectedJob({
                ...selectedJob,
                title: e.target.value
              })
            }
            className="w-full h-11 rounded-lg border border-[#cfd5dc] px-4 text-[14px] outline-none focus:border-[#0a66c2] focus:ring-1 focus:ring-[#0a66c2]"
          />

        </div>


        {/* Company + Category */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">

          <div>

            <label className="block text-[13px] font-semibold text-[#333] mb-2">
              Company
            </label>

            <input
              type="text"
              value={selectedJob.companyName || ""}
              disabled
              className="w-full h-11 rounded-lg border border-[#e0e0e0] bg-[#f5f5f5] px-4 text-[14px] text-[#777]"
            />

          </div>


          <div>

            <label className="block text-[13px] font-semibold text-[#333] mb-2">
              Category
            </label>

            <input
              type="text"
              value={selectedJob.categoryName || ""}
              disabled
              className="w-full h-11 rounded-lg border border-[#e0e0e0] bg-[#f5f5f5] px-4 text-[14px] text-[#777]"
            />

          </div>

        </div>


        {/* Location + Job Type */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">

          <div>

            <label className="block text-[13px] font-semibold text-[#333] mb-2">
              Location
            </label>

            <input
              type="text"
              value={selectedJob.location || ""}
              onChange={(e) =>
                setSelectedJob({
                  ...selectedJob,
                  location: e.target.value
                })
              }
              className="w-full h-11 rounded-lg border border-[#cfd5dc] px-4 text-[14px] outline-none focus:border-[#0a66c2]"
            />

          </div>


          <div>

            <label className="block text-[13px] font-semibold text-[#333] mb-2">
              Job Type
            </label>

            <select
              value={selectedJob.jobType || ""}
              onChange={(e) =>
                setSelectedJob({
                  ...selectedJob,
                  jobType: e.target.value
                })
              }
              className="w-full h-11 rounded-lg border border-[#cfd5dc] bg-white px-4 text-[14px] outline-none focus:border-[#0a66c2]"
            >
              <option value="">Select Job Type</option>
              <option value="FULL_TIME">Full Time</option>
              <option value="PART_TIME">Part Time</option>
              <option value="CONTRACT">Contract</option>
              <option value="INTERNSHIP">Internship</option>
              <option value="FREELANCE">Freelance</option>
            </select>

          </div>

        </div>


        {/* Work Mode + Vacancies */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">

          <div>

            <label className="block text-[13px] font-semibold text-[#333] mb-2">
              Work Mode
            </label>

            <select
              value={selectedJob.workMode || ""}
              onChange={(e) =>
                setSelectedJob({
                  ...selectedJob,
                  workMode: e.target.value
                })
              }
              className="w-full h-11 rounded-lg border border-[#cfd5dc] bg-white px-4 text-[14px] outline-none focus:border-[#0a66c2]"
            >
              <option value="">Select Work Mode</option>
              <option value="REMOTE">Remote</option>
              <option value="ONSITE">Onsite</option>
              <option value="HYBRID">Hybrid</option>
            </select>

          </div>


          <div>

            <label className="block text-[13px] font-semibold text-[#333] mb-2">
              Vacancies
            </label>

            <input
              type="number"
              min="1"
              value={selectedJob.vacancies || ""}
              onChange={(e) =>
                setSelectedJob({
                  ...selectedJob,
                  vacancies: Number(e.target.value)
                })
              }
              className="w-full h-11 rounded-lg border border-[#cfd5dc] px-4 text-[14px] outline-none focus:border-[#0a66c2]"
            />

          </div>

        </div>


        {/* Salary */}

        <div className="mb-5">

          <label className="block text-[13px] font-semibold text-[#333] mb-2">
            Salary
          </label>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">

            <input
              type="number"
              placeholder="Minimum"
              value={selectedJob.salaryMin ?? ""}
              onChange={(e) =>
                setSelectedJob({
                  ...selectedJob,
                  salaryMin: e.target.value
                    ? Number(e.target.value)
                    : null
                })
              }
              className="h-11 rounded-lg border border-[#cfd5dc] px-4 text-[14px] outline-none focus:border-[#0a66c2]"
            />

            <input
              type="number"
              placeholder="Maximum"
              value={selectedJob.salaryMax ?? ""}
              onChange={(e) =>
                setSelectedJob({
                  ...selectedJob,
                  salaryMax: e.target.value
                    ? Number(e.target.value)
                    : null
                })
              }
              className="h-11 rounded-lg border border-[#cfd5dc] px-4 text-[14px] outline-none focus:border-[#0a66c2]"
            />

            <select
              value={selectedJob.salaryCurrency || "INR"}
              onChange={(e) =>
                setSelectedJob({
                  ...selectedJob,
                  salaryCurrency: e.target.value
                })
              }
              className="h-11 rounded-lg border border-[#cfd5dc] bg-white px-4 text-[14px] outline-none focus:border-[#0a66c2]"
            >
              <option value="INR">INR</option>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
            </select>

          </div>

        </div>


        {/* Experience */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">

          <div>

            <label className="block text-[13px] font-semibold text-[#333] mb-2">
              Minimum Experience
            </label>

            <input
              type="number"
              min="0"
              value={selectedJob.experienceMin ?? ""}
              onChange={(e) =>
                setSelectedJob({
                  ...selectedJob,
                  experienceMin: e.target.value
                    ? Number(e.target.value)
                    : null
                })
              }
              className="w-full h-11 rounded-lg border border-[#cfd5dc] px-4 text-[14px] outline-none focus:border-[#0a66c2]"
            />

          </div>


          <div>

            <label className="block text-[13px] font-semibold text-[#333] mb-2">
              Maximum Experience
            </label>

            <input
              type="number"
              min="0"
              value={selectedJob.experienceMax ?? ""}
              onChange={(e) =>
                setSelectedJob({
                  ...selectedJob,
                  experienceMax: e.target.value
                    ? Number(e.target.value)
                    : null
                })
              }
              className="w-full h-11 rounded-lg border border-[#cfd5dc] px-4 text-[14px] outline-none focus:border-[#0a66c2]"
            />

          </div>

        </div>


        {/* Deadline */}

        <div className="mb-5">

          <label className="block text-[13px] font-semibold text-[#333] mb-2">
            Application Deadline
          </label>

          <input
            type="date"
            value={selectedJob.deadline || ""}
            onChange={(e) =>
              setSelectedJob({
                ...selectedJob,
                deadline: e.target.value
              })
            }
            className="w-full h-11 rounded-lg border border-[#cfd5dc] px-4 text-[14px] outline-none focus:border-[#0a66c2]"
          />

        </div>


        {/* Description */}

        <div className="mb-5">

          <label className="block text-[13px] font-semibold text-[#333] mb-2">
            Job Description
          </label>

          <textarea
            rows="5"
            value={selectedJob.description || ""}
            onChange={(e) =>
              setSelectedJob({
                ...selectedJob,
                description: e.target.value
              })
            }
            className="w-full rounded-lg border border-[#cfd5dc] px-4 py-3 text-[14px] outline-none resize-none focus:border-[#0a66c2]"
          />

        </div>


        {/* Responsibilities */}

        <div className="mb-5">

          <label className="block text-[13px] font-semibold text-[#333] mb-2">
            Responsibilities
          </label>

          <textarea
            rows="5"
            value={selectedJob.responsibilities || ""}
            onChange={(e) =>
              setSelectedJob({
                ...selectedJob,
                responsibilities: e.target.value
              })
            }
            className="w-full rounded-lg border border-[#cfd5dc] px-4 py-3 text-[14px] outline-none resize-none focus:border-[#0a66c2]"
          />

        </div>


        {/* Requirements */}

        <div className="mb-5">

          <label className="block text-[13px] font-semibold text-[#333] mb-2">
            Requirements
          </label>

          <textarea
            rows="5"
            value={selectedJob.requirements || ""}
            onChange={(e) =>
              setSelectedJob({
                ...selectedJob,
                requirements: e.target.value
              })
            }
            className="w-full rounded-lg border border-[#cfd5dc] px-4 py-3 text-[14px] outline-none resize-none focus:border-[#0a66c2]"
          />

        </div>


        {/* Qualifications */}

        <div className="mb-5">

          <label className="block text-[13px] font-semibold text-[#333] mb-2">
            Qualifications
          </label>

          <textarea
            rows="4"
            value={selectedJob.qualifications || ""}
            onChange={(e) =>
              setSelectedJob({
                ...selectedJob,
                qualifications: e.target.value
              })
            }
            className="w-full rounded-lg border border-[#cfd5dc] px-4 py-3 text-[14px] outline-none resize-none focus:border-[#0a66c2]"
          />

        </div>


        {/* Benefits */}

        <div className="mb-5">

          <label className="block text-[13px] font-semibold text-[#333] mb-2">
            Benefits
          </label>

          <textarea
            rows="4"
            value={selectedJob.benefits || ""}
            onChange={(e) =>
              setSelectedJob({
                ...selectedJob,
                benefits: e.target.value
              })
            }
            className="w-full rounded-lg border border-[#cfd5dc] px-4 py-3 text-[14px] outline-none resize-none focus:border-[#0a66c2]"
          />

        </div>


        {/* Skills */}

        <div className="mb-5">

          <label className="block text-[13px] font-semibold text-[#333] mb-2">
            Skills
          </label>

          <div className="flex flex-wrap gap-2 mb-3">

            {selectedJob.skills?.map((skill, index) => (

              <span
                key={index}
                className="flex items-center gap-2 rounded-full bg-[#e8f3ff] text-[#0a66c2] px-3 py-1.5 text-[12px] font-semibold"
              >
                {skill}

                <button
                  type="button"
                  onClick={() => {
                    const updatedSkills = selectedJob.skills.filter(
                      (_, i) => i !== index
                    );

                    setSelectedJob({
                      ...selectedJob,
                      skills: updatedSkills
                    });
                  }}
                  className="text-[#0a66c2] hover:text-red-500"
                >
                  ×
                </button>

              </span>

            ))}

          </div>

          <input
            type="text"
            placeholder="Edit skills manually e.g. Java, Spring Boot"
            value={selectedJob.skills?.join(", ") || ""}
            onChange={(e) =>
              setSelectedJob({
                ...selectedJob,
                skills: e.target.value
                  .split(",")
                  .map(skill => skill.trim())
                  .filter(Boolean)
              })
            }
            className="w-full h-11 rounded-lg border border-[#cfd5dc] px-4 text-[14px] outline-none focus:border-[#0a66c2]"
          />

          <p className="text-[12px] text-[#888] mt-1.5">
            Separate skills with commas.
          </p>

        </div>

      </div>


      {/* ================= FOOTER ================= */}

      <div className="flex items-center justify-end gap-3 px-7 py-4 border-t border-[#e5e7eb] bg-white">

        <button
          type="button"
          onClick={() => {
            setEdit(false);
            setSelectedJob(null);
          }}
          className="rounded-full border border-[#cfd5dc] px-5 py-2.5 text-[13px] font-semibold text-[#444] hover:bg-[#f3f6f8]"
        >
          Cancel
        </button>

        <button
        onClick={updateJob}
          type="button"
          className="rounded-full bg-[#0a66c2] px-6 py-2.5 text-[13px] font-semibold text-white hover:bg-[#004182]"
        >
          Save Changes
        </button>

      </div>

    </div>

  </div>

)}



      </main>


    </div>
  );

  
};




/* Simple Amazon-style placeholder */
const Building2Placeholder = () => {
  return (
    <div className="text-[#191919] font-bold text-[28px]">
      a
    </div>
  );
};

export default EmployerJobs;