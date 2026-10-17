import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../Service/Api";
import NavBar from "../../component/NavBar";
import {
  BriefcaseBusiness, CalendarDays, MapPin, Building2, Clock3,
  ChevronRight, Search, SlidersHorizontal, FileText, CheckCircle2,
  Eye, ArrowUpRight, Bookmark, Bell,IndianRupee
} from "lucide-react";



const StatusBadge = ({ status, className }) => (
  <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold ${className}`}>
    <span className="h-1.5 w-1.5 rounded-full bg-current" />
    {status}
  </span>
);

const MyApplications = () => {

 const [applications, setApplications] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState("");

useEffect(() => {
  const fetchApplications = async () => {
    try {
      const response = await api.get("/applications");

      console.log("APPLICATION DATA:", response.data);

      setApplications(
        Array.isArray(response.data) ? response.data : []
      );
    } catch (error) {
      console.error("API ERROR:", error);
      setError("Failed to load applications");
    } finally {
      setLoading(false);
    }
  };

  fetchApplications();
}, []);

const getStatusClass = (status) => {
  switch (String(status || "").toUpperCase()) {
    case "REJECTED":
      return "border-rose-200 bg-rose-50 text-rose-700";

    case "SHORTLISTED":
    case "INTERVIEW":
      return "border-violet-200 bg-violet-50 text-violet-700";

    case "HIRED":
    case "OFFERED":
      return "border-emerald-200 bg-emerald-50 text-emerald-700";

    case "UNDER_REVIEW":
      return "border-blue-200 bg-blue-50 text-blue-700";

    default:
      return "border-amber-200 bg-amber-50 text-amber-700";
  }
};

const [searchTerm, setSearchTerm] = useState("");
const [activeTab, setActiveTab] = useState("All applications");
const filteredByTab = applications.filter((application) => {
  const status = String(application.status || "").toUpperCase();
  const query = searchTerm.trim().toLowerCase();

  const matchesSearch =
    (application.jobTitle || "").toLowerCase().includes(query) ||
    (application.companyName || "").toLowerCase().includes(query) ||
    status.toLowerCase().includes(query);

  let matchesTab = true;

  switch (activeTab) {
    case "In progress":
      matchesTab = ["SUBMITTED", "UNDER_REVIEW"].includes(status);
      break;

    case "Interview":
      matchesTab = [
        "SHORTLISTED",
        "INTERVIEW",
        "INTERVIEW_SCHEDULED",
        "INTERVIEW_COMPLETED",
      ].includes(status);
      break;

    case "Archived":
      matchesTab = ["REJECTED", "WITHDRAWN"].includes(status);
      break;
  }

  return matchesTab && matchesSearch;
});

const totalApplications = applications.length;
const inProgressCount = applications.filter((application) =>
  ["SUBMITTED", "UNDER_REVIEW"].includes(
    String(application.status || "").toUpperCase()
  )
).length;


const interviewCount = applications.filter((application) =>
  ["INTERVIEW", "INTERVIEW_SCHEDULED", "INTERVIEW_COMPLETED","SHORTLISTED"].includes(
    String(application.status || "").toUpperCase()
  )
).length;

const offerCount = applications.filter((application) =>
  ["OFFERED", "HIRED"].includes(
    String(application.status || "").toUpperCase()
  )
).length;

const archivedCount = applications.filter((application) =>
  ["REJECTED", "WITHDRAWN"].includes(
    String(application.status || "").toUpperCase()
  )
).length;



const[selected,setSelected]=useState(null);

const[viewJob, setViewJob]=useState(false);

const[job,setJob]=useState([]);

useEffect(()=>{

  api.get("/jobs")
  .then((response)=>{

    console.log(response.data);
    setJob(response.data);
  }).catch((error)=>{

    console.log("API ERROR", error);
  })
},[]);

    
       return(
  <div className="min-h-screen bg-[#f3f2ef] text-[#191919]">
    <NavBar />

    <main className="mx-auto max-w-[1128px] px-3 py-6 sm:px-5">
      <div className="mb-5 flex flex-wrap items-center gap-2 text-sm text-[#666666]">
        <Link to="/" className="hover:text-[#0a66c2] hover:underline">Home</Link>
        <ChevronRight size={15} />
        <Link to="/profile" className="hover:text-[#0a66c2] hover:underline">Profile</Link>
        <ChevronRight size={15} />
        <span className="font-semibold text-[#191919]">My Applications</span>
      </div>

      <section className="mb-5 flex flex-col justify-between gap-4 rounded-xl border border-[#d6d6d6] bg-white p-5 sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-2 text-sm font-semibold text-[#0a66c2]">
            <BriefcaseBusiness size={17} /> YOUR JOB SEARCH
          </div>
          <h1 className="mt-2 text-3xl font-bold tracking-tight">My Applications</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-[#666666]">
            Keep track of your applications, hiring progress and next steps.
          </p>
        </div>
        <Link to="/jobs" className="inline-flex items-center justify-center gap-2 rounded-full border border-[#0a66c2] px-5 py-2.5 text-sm font-semibold text-[#0a66c2] transition hover:bg-[#eaf4ff]">
          <Search size={16} /> Find more jobs
        </Link>
      </section>
<section className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">

  <div className="rounded-xl border border-[#d6d6d6] bg-white p-4 shadow-sm">
    <p className="text-sm text-[#666666]">Total applications</p>
    <p className="mt-1 text-2xl font-semibold">
      {String(totalApplications).padStart(2, "0")}
    </p>
    <p className="mt-3 text-xs text-[#666666]">Across all companies</p>
  </div>

  <div className="rounded-xl border border-[#d6d6d6] bg-white p-4 shadow-sm">
    <p className="text-sm text-[#666666]">In progress</p>
    <p className="mt-1 text-2xl font-semibold">
      {String(inProgressCount).padStart(2, "0")}
    </p>
    <p className="mt-3 text-xs text-[#666666]">Waiting for the next update</p>
  </div>

  <div className="rounded-xl border border-[#d6d6d6] bg-white p-4 shadow-sm">
    <p className="text-sm text-[#666666]">Interviews</p>
    <p className="mt-1 text-2xl font-semibold">
      {String(interviewCount).padStart(2, "0")}
    </p>
    <p className="mt-3 text-xs text-[#666666]">Prepare for your next step</p>
  </div>

  <div className="rounded-xl border border-[#d6d6d6] bg-white p-4 shadow-sm">
    <p className="text-sm text-[#666666]">Offers</p>
    <p className="mt-1 text-2xl font-semibold">
      {String(offerCount).padStart(2, "0")}
    </p>
    <p className="mt-3 text-xs text-[#666666]">Your next opportunity could be here</p>
  </div>

</section>

<section className="overflow-hidden rounded-xl border border-[#d6d6d6] bg-white shadow-sm">
  <div className="border-b border-[#d6d6d6] px-4 pt-2 sm:px-5">
    <div className="flex flex-wrap gap-1">

      {[
        { label: "All applications", count: totalApplications },
        { label: "In progress", count: inProgressCount },
        { label: "Interview", count: interviewCount },
        { label: "Archived", count: archivedCount },
      ].map((tab) => (
        <button
          key={tab.label}
          type="button"
          onClick={() => setActiveTab(tab.label)}
          className={`border-b-2 px-3 py-4 text-sm font-semibold transition sm:px-4 ${
            activeTab === tab.label
              ? "border-[#0a66c2] text-[#0a66c2]"
              : "border-transparent text-[#666666] hover:border-[#c6c6c6] hover:text-[#191919]"
          }`}
        >
          {tab.label}
          <span className="ml-2 rounded-full bg-[#f3f2ef] px-2 py-0.5 text-xs">
            {tab.count}
          </span>
        </button>
      ))}

    </div>
  </div>


        <div className="flex flex-col gap-3 border-b border-[#e8e8e8] bg-[#fafafa] px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-5">
          <div className="relative w-full sm:max-w-xs">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#666666]" />
            <input
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)}
            aria-label="Search applications" placeholder="Search by job or company" className="w-full rounded-full border border-[#bfbfbf] bg-white py-2 pl-9 pr-3 text-sm outline-none transition placeholder:text-[#777777] focus:border-[#0a66c2] focus:ring-2 focus:ring-blue-100" />
          </div>
          <button type="button" className="inline-flex items-center justify-center gap-2 self-start rounded-full border border-[#8c8c8c] bg-white px-4 py-2 text-sm font-semibold text-[#404040] hover:border-[#191919] sm:self-auto">
            <SlidersHorizontal size={15} /> Filters
          </button>
        </div>

      {loading && (
  <p className="p-5 text-sm text-slate-500">
    Loading applications...
  </p>
)}

{error && (
  <p className="p-5 text-sm text-red-600">
    {error}
  </p>
)}

{!loading && !error && applications.length === 0 && (
  <div className="p-10 text-center">
    <h2 className="text-lg font-semibold">
      No applications yet
    </h2>

    <p className="mt-2 text-sm text-slate-500">
      Apply for jobs to track them here.
    </p>

    <Link
      to="/jobs"
      className="mt-4 inline-block text-sm font-semibold text-blue-600"
    >
      Explore jobs
    </Link>
  </div>
)}

{!loading && !error && filteredByTab.map((application) => {
  const companyLabel =
    application.companyName ||
    `Company #${application.companyName}`;

  return (
    <article
      key={application.applicationId}
      className="border-b border-[#e8e8e8] p-4 transition-colors hover:bg-[#f8fbff] sm:p-5"
    >
      <div className="flex gap-3 sm:gap-4">

        <div className="flex h-25 w-25 shrink-0 items-center justify-center rounded-lg border border-[#e0e0e0]">
         
         {application.companyLogo ? (
  <img
    src={application.companyLogo}
    alt={application.companyName || "Company"}
    className="h-full w-full rounded-lg object-contain p-2"
  />
) : (
  <span className="text-xl font-bold text-blue-700">
    {(application.companyName || "C").charAt(0)}
  </span>
)}
        </div>

        <div className="min-w-0 flex-1">

          <div className="flex flex-col justify-between gap-3 sm:flex-row">

            <div>
              <h2 className="text-base font-semibold leading-6">
                {application.jobTitle}
              </h2>

              <p className="mt-1 text-sm font-medium text-[#404040]">
                {companyLabel}
              </p>
            </div>

            <div className="shrink-0 sm:text-right">
              <StatusBadge
                status={application.status || "SUBMITTED"}
                className={getStatusClass(application.status)}
              />
            </div>

          </div>

          <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs text-[#666666]">

            <span>
              Job ID: {application.jobId}
            </span>

            <span>
              Application ID: {application.applicantName}
            </span>

            <span>
              Applied{" "}
              {application.appliedAt
                ? new Date(application.appliedAt).toLocaleDateString()
                : "Date unavailable"}
            </span>

          </div>

          {application.resumeFileName && (
            <p className="mt-3 text-sm text-[#666666]">
              Resume: {application.resumeFileName}
            </p>
          )}

          <div className="mt-4 flex justify-end border-t border-[#eeeeee] pt-3">

           <button
  type="button"
  onClick={() => {
    setSelected(application.jobId);
    setViewJob(true);
  }}
  className="rounded-full border border-[#0a66c2] px-3.5 py-1.5 text-sm font-semibold text-[#0a66c2] hover:bg-[#eaf4ff]"
>
  View Job →
</button>

          </div>

        </div>
      </div>
    </article>
  );
})}

{viewJob && selected !== null && (
  <div
    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-[2px]"
    onClick={() => {
      setViewJob(false);
      setSelected(null);
    }}
  >
    <div
      className="flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-[#d6d6d6] bg-white shadow-2xl"
      onClick={(e) => e.stopPropagation()}
    >
      {(() => {
        const selectedJob = job.find(
          (item) => Number(item.jobId) === Number(selected)
        );

        if (!selectedJob) {
          return (
            <>
              <div className="border-b border-[#e8e8e8] p-6">
                <h2 className="text-xl font-bold text-[#191919]">
                  Job details unavailable
                </h2>
                <p className="mt-2 text-sm text-[#666666]">
                  Is Job ID ke liye details nahi mili.
                </p>
              </div>

              <div className="flex justify-end p-4">
                <button
                  type="button"
                  onClick={() => {
                    setViewJob(false);
                    setSelected(null);
                  }}
                  className="rounded-full border border-[#0a66c2] px-5 py-2 text-sm font-semibold text-[#0a66c2] transition hover:bg-[#eaf4ff]"
                >
                  Close
                </button>
              </div>
            </>
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

            {/* FOOTER */}
            <div className="flex justify-end border-t border-[#e8e8e8] bg-[#fafafa] p-4 sm:px-6">
              <button
                type="button"
                onClick={() => {
                  setViewJob(false);
                  setSelected(null);
                }}
                className="rounded-full border border-[#0a66c2] bg-white px-6 py-2.5 text-sm font-semibold text-[#0a66c2] transition hover:bg-[#eaf4ff]"
              >
                Close
              </button>
            </div>
          </>
        );
      })()}
    </div>
  </div>
)}

        
        <div className="border-t border-[#d6d6d6] bg-[#fafafa] px-5 py-3 text-center text-xs text-[#666666]">
        Showing {filteredByTab.length} applications
        </div>
      </section>

      <section className="mt-5 rounded-xl border border-[#c6dff7] bg-[#eaf4ff] p-4 sm:p-5">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#c6dff7] bg-white text-[#0a66c2]">
            <Bell size={19} />
          </div>
          <div className="flex-1">
            <h2 className="text-sm font-semibold">Stay ready for your next step</h2>
            <p className="mt-1 text-sm leading-5 text-[#555555]">
              Check your notifications regularly for application updates and interview information.
            </p>
            <Link to="/profile/notifications" className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-[#0a66c2] hover:underline">
              View notifications <ArrowUpRight size={15} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  </div>
  
);
};

export default MyApplications;
