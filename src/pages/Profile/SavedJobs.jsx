
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NavBar from "../../component/NavBar";
import api from "../../Service/Api";

import {
  Bookmark,
  BriefcaseBusiness,
  MapPin,
  Building2,
  CalendarDays,
  ChevronRight,
  Search,
  SlidersHorizontal,
  ArrowUpRight,
  Bell,
  Clock3,
  Trash2,
  IndianRupee,
  Sparkles,
} from "lucide-react";
import toast from "react-hot-toast/headless";
import { useNavigate } from "react-router-dom";



const SavedJobs = () => {
  const navigate = useNavigate();
const [savedJob, setSavedJob] = useState([]);
const [jobs, setJobs] = useState([]);
const [loading, setLoading] = useState(true);

const [searchTerm, setSearchTerm] = useState("");



useEffect(() => {
  const fetchSavedJobs = async () => {
    try {
      const [savedResponse, jobsResponse] = await Promise.all([
        api.get("/saved-job"), api.get("/jobs"),  ]);

      console.log("SAVED JOB DATA:", savedResponse.data);
      console.log("ALL JOBS DATA:", jobsResponse.data);

      setSavedJob( Array.isArray(savedResponse.data) ? savedResponse.data : [] );

      setJobs(Array.isArray(jobsResponse.data) ? jobsResponse.data : []);
    } catch (error) {
      console.error("API ERROR:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchSavedJobs();
}, []);

const filteredSavedJobs = savedJob.filter((saved) => {
  const jobDetails = jobs.find(
    (item) => Number(item.jobId) === Number(saved.jobId)
  );

  const query = searchTerm.toLowerCase().trim();

  return (
    (jobDetails?.title || "").toLowerCase().includes(query) ||
    (jobDetails?.companyName || "").toLowerCase().includes(query) ||
    (jobDetails?.location || "").toLowerCase().includes(query)
  );
});

const deleteSavedJob = async (savedJobId) => {
  if (!savedJobId) {
    return;
  }

  try {
    const response = await api.delete(
      `/saved-job/delete/${savedJobId}`
    );

    console.log("DELETE RESPONSE:", response.data);

    setSavedJob((prev) =>
      prev.filter((saved) => saved.savedJobId !== savedJobId)
    );

    toast.success("Saved job removed successfully");
  } catch (error) {
    console.error("API ERROR:", error);

    toast.error(
      error.response?.data?.message ||
      "Failed to remove saved job"
    );
  }
};
const[viewJob, setViewJob]=useState(false);

const [selected,setSelected]=useState(null);

const [applyNow, setApplyNow] = useState(false);



  return (
    <div className="min-h-screen bg-[#f3f2ef] text-[#191919]">
      <NavBar />

      <main className="mx-auto max-w-[1128px] px-3 py-6 sm:px-5">

        {/* BREADCRUMB */}
        <div className="mb-5 flex flex-wrap items-center gap-2 text-sm text-[#666666]">
          <Link
            to="/"
            className="transition hover:text-[#0a66c2] hover:underline"
          >
            Home
          </Link>

          <ChevronRight size={15} />

          <Link
            to="/profile"
            className="transition hover:text-[#0a66c2] hover:underline"
          >
            Profile
          </Link>

          <ChevronRight size={15} />

          <span className="font-semibold text-[#191919]">
            Saved Jobs
          </span>
        </div>

        {/* PAGE HEADER */}
        <section className="mb-5 flex flex-col justify-between gap-5 rounded-xl border border-[#d6d6d6] bg-white p-5 sm:flex-row sm:items-center sm:p-6">

          <div>
            <div className="flex items-center gap-2 text-sm font-semibold text-[#0a66c2]">
              <Bookmark size={18} />
              YOUR CAREER SHORTLIST
            </div>

            <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#191919]">
              Saved Jobs
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#666666]">
              Keep promising opportunities in one place and come back when
              you are ready to apply.
            </p>
          </div>

          <Link
            to="/jobs"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full border border-[#0a66c2] px-5 py-2.5 text-sm font-semibold text-[#0a66c2] transition hover:bg-[#eaf4ff]"
          >
            <Search size={16} />
            Explore jobs
          </Link>

        </section>

        {/* SUMMARY CARDS */}
        <section className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-3">

          {/* SAVED JOBS */}
          <div className="rounded-xl border border-[#d6d6d6] bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm text-[#666666]">
                  Saved jobs
                </p>

                <p className="mt-1 text-2xl font-semibold tracking-tight">
                 {savedJob.length}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-blue-200 bg-blue-50 text-blue-700">
                <Bookmark size={20} />
              </div>
            </div>

            <p className="mt-3 text-xs text-[#666666]">
              Opportunities on your shortlist
            </p>
          </div>

          {/* CLOSING SOON */}
          <div className="rounded-xl border border-[#d6d6d6] bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm text-[#666666]">
                  Closing soon
                </p>

                <p className="mt-1 text-2xl font-semibold tracking-tight">
                  02
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-amber-200 bg-amber-50 text-amber-700">
                <Clock3 size={20} />
              </div>
            </div>

            <p className="mt-3 text-xs text-[#666666]">
              Review deadlines before applying
            </p>
          </div>

          {/* INTERNSHIPS */}
          <div className="rounded-xl border border-[#d6d6d6] bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm text-[#666666]">
                  Internships
                </p>

                <p className="mt-1 text-2xl font-semibold tracking-tight">
                  02
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-violet-200 bg-violet-50 text-violet-700">
                <BriefcaseBusiness size={20} />
              </div>
            </div>

            <p className="mt-3 text-xs text-[#666666]">
              Early-career opportunities
            </p>
          </div>

        </section>

        {/* SAVED JOBS LIST */}
        <section className="overflow-hidden rounded-xl border border-[#d6d6d6] bg-white shadow-sm">

          {/* LIST HEADER */}
          <div className="flex flex-col gap-4 border-b border-[#d6d6d6] bg-white px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">

            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-semibold text-[#191919]">
                  Your shortlist
                </h2>

                <span className="rounded-full bg-[#eaf4ff] px-2.5 py-1 text-xs font-semibold text-[#0a66c2]">
                  {savedJob.length}
                </span>
              </div>

              <p className="mt-1 text-sm text-[#666666]">
                Opportunities you want to explore
              </p>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row">

              <div className="relative">
                <Search
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#666666]"
                />

                <input
                  type="text"
                   value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
                  aria-label="Search saved jobs"
                  placeholder="Search saved jobs"
                  className="w-full rounded-full border border-[#bfbfbf] bg-white py-2 pl-9 pr-3 text-sm outline-none transition placeholder:text-[#777777] focus:border-[#0a66c2] focus:ring-2 focus:ring-blue-100 sm:w-56"
                />
              </div>

              <button
                type="button"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[#8c8c8c] bg-white px-4 py-2 text-sm font-semibold text-[#404040] transition hover:border-[#191919] hover:bg-[#f8f8f8]"
              >
                <SlidersHorizontal size={15} />
                Filters
              </button>

            </div>
          </div>

          {/* JOB 1 */}
          {loading && (
  <p className="p-5 text-sm text-[#666666]">
    Loading saved jobs...
  </p>
)}

{!loading && filteredSavedJobs.length === 0 && (
  <div className="p-10 text-center">
    <Bookmark size={32} className="mx-auto text-[#666666]" />

    <h3 className="mt-3 text-lg font-semibold">
      No saved jobs yet
    </h3>

    <p className="mt-2 text-sm text-[#666666]">
      Save jobs you like to find them here later.
    </p>

    <Link
      to="/jobs"
      className="mt-4 inline-flex rounded-full bg-[#0a66c2] px-5 py-2 text-sm font-semibold text-white hover:bg-[#004182]"
    >
      Explore jobs
    </Link>
  </div>
)}

{!loading && filteredSavedJobs.map((saved) => {
  const jobDetails = jobs.find(
    (item) => Number(item.jobId) === Number(saved.jobId)
  );

  if (!jobDetails) {
    return (
      <article
        key={saved.savedJobId}
        className="border-b border-[#e8e8e8] p-5"
      >
        <p className="text-sm text-[#666666]">
          Job details unavailable for Job ID: {saved.jobId}
        </p>
      </article>
    );
  }

  return (
    <article
      key={saved.savedJobId}
      className="border-b border-[#e8e8e8] p-4 transition-colors hover:bg-[#f8fbff] sm:p-5"
    >
      <div className="flex gap-3 sm:gap-4">

        {/* COMPANY LOGO */}
        <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-[#e0e0e0] bg-white sm:h-16 sm:w-16">
          {jobDetails.companyLogo ? (
            <img
              src={jobDetails.companyLogo}
              alt={jobDetails.companyName || "Company"}
              className="h-full w-full object-contain p-2"
            />
          ) : (
            <span className="text-xl font-bold text-[#0a66c2]">
              {(jobDetails.companyName || "C").charAt(0)}
            </span>
          )}
        </div>

        <div className="min-w-0 flex-1">

          {/* JOB TITLE AND COMPANY */}
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">

              <h3 className="text-base font-semibold leading-6 text-[#0a66c2]">
                {jobDetails.title}
              </h3>

              <p className="mt-1 text-sm font-medium text-[#404040]">
                {jobDetails.companyName || "Company"}
              </p>

            </div>

            <button
              type="button"
            onClick={() => deleteSavedJob(saved.savedJobId)}
                aria-label={`Remove ${jobDetails.title} from saved jobs`}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#d6d6d6] text-[#666666] transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
            >
              <Trash2 size={16} />
            </button>
          </div>

          {/* DESCRIPTION */}
          <p className="mt-2 text-sm leading-6 text-[#666666]">
            {jobDetails.description || "No description available."}
          </p>

          {/* JOB DETAILS */}
          <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs text-[#666666]">

            {jobDetails.location && (
              <span className="inline-flex items-center gap-1.5">
                <MapPin size={14} />
                {jobDetails.location}
              </span>
            )}

            {jobDetails.workMode && (
              <span className="inline-flex items-center gap-1.5">
                <BriefcaseBusiness size={14} />
                {jobDetails.workMode}
              </span>
            )}

            {jobDetails.jobType && (
              <span className="inline-flex items-center gap-1.5">
                <Building2 size={14} />
                {jobDetails.jobType}
              </span>
            )}

            <span className="inline-flex items-center gap-1.5">
              <CalendarDays size={14} />
              Saved{" "}
              {saved.savedAt
                ? new Date(saved.savedAt).toLocaleDateString("en-IN")
                : "Date unavailable"}
            </span>

          </div>

          {/* SALARY AND ACTIONS */}
          <div className="mt-4 flex flex-col justify-between gap-3 border-t border-[#eeeeee] pt-3 sm:flex-row sm:items-center">

            <div>
              <p className="flex items-center gap-1 text-sm font-semibold text-[#191919]">
                <IndianRupee size={15} />

                {jobDetails.salaryMin != null
                  ? Number(jobDetails.salaryMin).toLocaleString("en-IN")
                  : "—"}

                {" – "}

                {jobDetails.salaryMax != null
                  ? Number(jobDetails.salaryMax).toLocaleString("en-IN")
                  : "—"}

                {jobDetails.salaryCurrency
                  ? ` ${jobDetails.salaryCurrency}`
                  : ""}
              </p>

              {jobDetails.deadline && (
                <p className="mt-1 text-xs text-[#777777]">
                  Application deadline: {jobDetails.deadline}
                </p>
              )}
            </div>

            <div className="flex flex-wrap gap-2">

              <button
                
                onClick={()=>{
                  
                  setSelected(jobDetails.jobId);

                  setViewJob(true);



                }}

                className="inline-flex items-center justify-center gap-1.5 rounded-full border border-[#0a66c2] px-4 py-2 text-sm font-semibold text-[#0a66c2] transition hover:bg-[#eaf4ff]"
              >
                View job
                <ArrowUpRight size={15} />
              </button>

              <button
               
                 onClick={() => {
    setSelected(jobDetails.jobId);
    setApplyNow(true);
  }}
                className="inline-flex items-center justify-center rounded-full bg-[#0a66c2] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[#004182]"
              >
                Apply now
              </button>

            </div>
          </div>

        </div>
      </div>
    </article>
  );
})}

{viewJob && selected !== null && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

    <div className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-xl border border-[#d6d6d6] bg-white p-6 shadow-xl">

      {(() => {
        const selectedJob = jobs.find(
          (item) => Number(item.jobId) === Number(selected)
        );

        if (!selectedJob) {
          return (
            <div>
              <h2 className="text-xl font-semibold text-[#191919]">
                Job details unavailable
              </h2>

              <p className="mt-2 text-sm text-[#666666]">
                Is job ki details nahi milin.
              </p>
            </div>
          );
        }

        return (
          <>
                     {/* HEADER */}
                     <div className="flex items-start justify-between gap-4 border-b border-[#e8e8e8] p-5 sm:p-6">
                       <div className="flex min-w-0 items-start gap-4">
                         <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl border border-[#d6d6d6] bg-white p-2">
                           {selectedJob.companyLogo ? (
                             <img
                               src={selectedJob.companyLogo}
                               alt={selectedJob.companyName || "Company"}
                               className="h-full w-full object-contain"
                             />
                           ) : (
                             <Building2 size={28} className="text-[#666666]" />
                           )}
                         </div>
         
                         <div className="min-w-0">
                           <h2 className="text-xl font-bold leading-7 text-[#191919] sm:text-2xl">
                             {selectedJob.title}
                           </h2>
         
                           <p className="mt-1 text-sm font-semibold text-[#404040]">
                             {selectedJob.companyName || "Company"}
                           </p>
         
                           {selectedJob.location && (
                             <p className="mt-2 flex items-center gap-1.5 text-sm text-[#666666]">
                               <MapPin size={15} />
                               {selectedJob.location}
                             </p>
                           )}
                         </div>
                       </div>
         
                       <button
                         type="button"
                         aria-label="Close job details"
                         onClick={() => {
                           setViewJob(false);
                           setSelected(null);
                         }}
                         className="shrink-0 rounded-full p-2 text-[#666666] transition hover:bg-[#f3f2ef] hover:text-[#191919]"
                       >
                         ✕
                       </button>
                     </div>
         
                     {/* SCROLLABLE CONTENT */}
                     <div className="overflow-y-auto p-5 sm:p-6">
                       {/* JOB TAGS */}
                       <div className="flex flex-wrap gap-2">
                         {selectedJob.workMode && (
                           <span className="rounded-full border border-[#c6dff7] bg-[#eaf4ff] px-3 py-1.5 text-xs font-semibold text-[#0a66c2]">
                             {selectedJob.workMode}
                           </span>
                         )}
         
                         {selectedJob.jobType && (
                           <span className="rounded-full border border-[#e2d5ff] bg-[#f5f0ff] px-3 py-1.5 text-xs font-semibold text-[#6941c6]">
                             {selectedJob.jobType}
                           </span>
                         )}
         
                         {selectedJob.experienceMin != null &&
                           selectedJob.experienceMax != null && (
                             <span className="rounded-full border border-[#b7e4ce] bg-[#eafaf1] px-3 py-1.5 text-xs font-semibold text-[#087443]">
                               {selectedJob.experienceMin}–{selectedJob.experienceMax} years
                             </span>
                           )}
                       </div>
         
                       {/* SALARY */}
                       {(selectedJob.salaryMin != null ||
                         selectedJob.salaryMax != null) && (
                         <div className="mt-5 rounded-xl border border-[#e0e0e0] bg-[#f8f9fa] p-4">
                           <p className="text-sm text-[#666666]">Salary range</p>
         
                          <p className="mt-1 flex flex-wrap items-center gap-1 text-lg font-bold text-[#191919]">
           <IndianRupee size={18} />
         
           {selectedJob.salaryMin != null
             ? Number(selectedJob.salaryMin).toLocaleString("en-IN")
             : "—"}
         
           <span className="mx-1">–</span>
         
           <IndianRupee size={18} />
         
           {selectedJob.salaryMax != null
             ? Number(selectedJob.salaryMax).toLocaleString("en-IN")
             : "—"}
         </p>
                         </div>
                       )}
         
                       {/* DESCRIPTION */}
                       <div className="mt-6">
                         <h3 className="text-base font-bold text-[#191919]">
                           Job Description
                         </h3>
         
                         <p className="mt-2 whitespace-pre-line text-sm leading-6 text-[#555555]">
                           {selectedJob.description || "No description available."}
                         </p>
                       </div>
         
                       {/* REQUIREMENTS */}
                       <div className="mt-6">
                         <h3 className="text-base font-bold text-[#191919]">
                           Requirements
                         </h3>
         
                         <p className="mt-2 whitespace-pre-line text-sm leading-6 text-[#555555]">
                           {selectedJob.requirements || "No requirements provided."}
                         </p>
                       </div>
         
                       {/* QUALIFICATIONS */}
                       <div className="mt-6">
                         <h3 className="text-base font-bold text-[#191919]">
                           Qualifications
                         </h3>
         
                         <p className="mt-2 whitespace-pre-line text-sm leading-6 text-[#555555]">
                           {selectedJob.qualifications || "Not specified"}
                         </p>
                       </div>
         
                       {/* SKILLS */}
                       <div className="mt-6">
                         <h3 className="text-base font-bold text-[#191919]">
                           Skills
                         </h3>
         
                         <div className="mt-3 flex flex-wrap gap-2">
                           {(selectedJob.skills || []).map((skill, index) => (
                             <span
                               key={index}
                               className="rounded-lg border border-[#d6d6d6] bg-white px-3 py-2 text-sm text-[#404040] transition hover:border-[#0a66c2] hover:bg-[#f8fbff]"
                             >
                               {skill}
                             </span>
                           ))}
                         </div>
                       </div>
         
                       {/* ADDITIONAL DETAILS */}
                       <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                         {selectedJob.deadline && (
                           <div className="rounded-xl border border-[#e0e0e0] p-4">
                             <p className="text-xs text-[#666666]">Application deadline</p>
                             <p className="mt-1 text-sm font-semibold text-[#191919]">
                               {selectedJob.deadline}
                             </p>
                           </div>
                         )}
         
                         {selectedJob.vacancies != null && (
                           <div className="rounded-xl border border-[#e0e0e0] p-4">
                             <p className="text-xs text-[#666666]">Open positions</p>
                             <p className="mt-1 text-sm font-semibold text-[#191919]">
                               {selectedJob.vacancies}
                             </p>
                           </div>
                         )}
                       </div>
                     </div>
         
                    
                   </>
        );
      })()}

      <div className="mt-6 flex justify-end">
        <button
          type="button"
          onClick={() => {
            setViewJob(false);
            setSelected(null);
          }}
          className="rounded-full bg-[#0a66c2] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[#004182]"
        >
          Close
        </button>
      </div>

    </div>
  </div>
)}



{applyNow && selected !== null && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

    <div className="w-full max-w-lg rounded-xl border border-[#d6d6d6] bg-white p-6 shadow-xl">

      {(() => {
        const selectedJob = jobs.find(
          (item) => Number(item.jobId) === Number(selected)
        );

        if (!selectedJob) {
          return (
            <div>
              <h2 className="text-xl font-bold text-[#191919]">
                Job details unavailable
              </h2>

              <p className="mt-2 text-sm text-[#666666]">
                Is job ki details nahi milin.
              </p>
            </div>
          );
        }

        return (
          <>
            <h2 className="text-xl font-bold text-[#191919]">
              Apply for this job?
            </h2>

            <p className="mt-2 text-sm text-[#666666]">
              You are applying for the following position.
            </p>

            <div className="mt-5 rounded-xl border border-[#e8e8e8] p-4">
              <h3 className="font-semibold text-[#0a66c2]">
                {selectedJob.title}
              </h3>

              <p className="mt-1 text-sm text-[#404040]">
                {selectedJob.companyName || "Company"}
              </p>

              <p className="mt-2 text-sm text-[#666666]">
                {selectedJob.location}
              </p>
            </div>

            <p className="mt-4 text-sm text-[#666666]">
              Continue to the application form to submit your application.
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  setApplyNow(false);
                  setSelected(null);
                }}
                className="rounded-full border border-[#d6d6d6] px-5 py-2 text-sm font-semibold text-[#404040] hover:bg-[#f3f2ef]"
              >
                Cancel
              </button>

              <button
                type="button"
                 onClick={() => {
    setApplyNow(false);
    navigate(`/apply-job/${selectedJob.jobId}`);
  }}
                className="rounded-full bg-[#0a66c2] px-5 py-2 text-sm font-semibold text-white hover:bg-[#004182]"
              >
                Continue to apply
              </button>
            </div>
          </>
        );
      })()}

    </div>
  </div>
)}

         

          {/* LIST FOOTER */}
          <div className="border-t border-[#d6d6d6] bg-[#fafafa] px-5 py-3 text-center text-xs text-[#666666]">
           Showing {filteredSavedJobs.length} of {savedJob.length} saved jobs
          </div>

        </section>

        {/* CAREER SUGGESTION */}
        <section className="mt-5 rounded-xl border border-[#c6dff7] bg-[#eaf4ff] p-4 sm:p-5">

          <div className="flex items-start gap-3">

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#c6dff7] bg-white text-[#0a66c2]">
              <Sparkles size={19} />
            </div>

            <div className="flex-1">
              <h2 className="text-sm font-semibold text-[#191919]">
                Find your next opportunity
              </h2>

              <p className="mt-1 text-sm leading-5 text-[#555555]">
                Explore more openings and save the ones that match your
                skills and career goals.
              </p>

              <Link
                to="/jobs"
                className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-[#0a66c2] hover:underline"
              >
                Browse jobs
                <ArrowUpRight size={15} />
              </Link>
            </div>

          </div>
        </section>

      </main>
    </div>
  );
};

export default SavedJobs;
