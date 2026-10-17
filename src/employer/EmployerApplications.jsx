import React, { useEffect, useState } from "react";
import {
  Search,
  MoreHorizontal,
  CalendarDays,
  Users,
  BriefcaseBusiness,
  CheckCircle2,
  XCircle,

} from "lucide-react";
import { Link } from "react-router-dom";
import NavBar from "../component/NavBar";
import api from "../Service/Api";
import toast from "react-hot-toast";

const EmployerApplications = () => {


  const[application ,setApplication]=useState([]);
const [search,setSearch]=useState("");
    const [page, setPage] = useState(0);
const [totalPages, setTotalPages] = useState(0);
const [pageSize] = useState(10);
  const[appliedCount,setAppliedCount]=useState(0);
const [underReviewCount, setUnderReviewCount] = useState(0);
const [shortlistedCount, setShortlistedCount] = useState(0);
const [interviewScheduledCount, setInterviewScheduledCount] = useState(0);
const [totalApplications, setTotalApplications] = useState(0);


useEffect(() => {
    fetchApplication(0);
}, []);

const fetchApplication = async (pageNumber) => {
    try {
        const response = await api.get("/applications/my", {
            params: {
                page: pageNumber,
                size: pageSize,
                search: search.trim() || undefined
            }
        });

        console.log("APPLICATION RESPONSE:", response.data);

        setApplication(response.data.content);
        setTotalPages(response.data.totalPages);
        setTotalApplications(response.data.totalElements);
        setAppliedCount(response.data.appliedCount);
        setUnderReviewCount(response.data.underReviewCount);
        setShortlistedCount(response.data.shortlistedCount);
        setInterviewScheduledCount( response.data.interviewScheduledCount );
  

    } catch (error) {
        console.log("API ERROR", error);
    }
};

const handlePageChange = (newPage) => {
    if (newPage < 0 || newPage >= totalPages) return;

    setPage(newPage);
    fetchApplication(newPage);
};
   
const [menuOpen, setMenuOpen] = useState(false);
const [profile, setProfile] = useState(null);
const [user,setUser]=useState(null);

const viewProfile = async (profileId) => {
    try {

        const response = await api.get(`/profile/user/${profileId}`);
        const userResponse = await api.get( `/users/internal/${profileId}`);
           
        console.log("PROFILE:", response.data);

        setProfile(response.data);
        setUser(userResponse.data);
        setMenuOpen(true);

    } catch (error) {
        console.log("API ERROR", error);
    }
};

const[selectedApplication,setSelectedApplication]=useState(null);
const [moreOpen, setMoreOpen] = useState(false)
const updateApplicationStatus = async (applicationId, status) => {
    try {

        await api.put(
            `/applications/status/${applicationId}`,
            { status }
        );

        toast.success("Status updated successfully");

        fetchApplication(page);

    } catch (error) {
        console.log("STATUS UPDATE ERROR", error);

        toast.error("Failed to update application status");
    }
};

       const [newApplication, setNewApplication] = useState(false);
const [reviewing, setReviewing] = useState(false);
const [shortlisted, setShortlisted] = useState(false);
const [interview, setInterview] = useState(false);

const filterApplication = application.filter((applications) => {

    if (newApplication) {
        return applications.status === "APPLIED";
    }

    if (reviewing) {
        return applications.status === "UNDER_REVIEW";
    }

    if (shortlisted) {
        return applications.status === "SHORTLISTED";
    }

    if (interview) {
        return applications.status === "INTERVIEW_SCHEDULED";
    }

    return true; 
});

 
  return (
    <div className="min-h-screen bg-[#f3f2ef] text-[#191919]">

      <NavBar />

      <main className="pt-[72px]">

        <div className="max-w-6xl mx-auto px-5 py-7">

          {/* ================= HEADER ================= */}

          <div className="flex items-start justify-between mb-5">

            <div>
              <h1 className="text-[26px] font-semibold text-[#191919]">
                Applications
              </h1>

              <p className="text-[14px] text-[#666666] mt-1">
                Manage and review candidates who applied to your jobs.
              </p>
            </div>

          </div>


          {/* ================= MAIN CARD ================= */}

          <div className="bg-white border border-[#dfe3e8] rounded-lg ">

            {/* ================= FILTER BAR ================= */}

            <div className="px-5 py-4 border-b border-[#e0e0e0]">

              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

                {/* Tabs */}

                <div className="flex items-center gap-2 flex-wrap">

                  {/* All */}

                  <button

                  onClick={()=>{

                    setNewApplication(false);
                    setReviewing(false);
                    setInterview(false);
                    setShortlisted(false);
                  }}
                    className="
                      rounded-full
                      bg-[#e8f3ff]
                      px-4 py-2
                      text-[13px]
                      font-semibold
                      text-[#0a66c2]
                    "
                  >
                    All
                    <span className="ml-1.5 text-[#0a66c2]">
                     {totalApplications}
                    </span>
                  </button>


                  {/* New */}

                  <button

                  onClick={()=>{

                    setNewApplication(true);
    setReviewing(false);
    setShortlisted(false);
    setInterview(false);
                  }}
                    className={`
    rounded-full
    px-4 py-2
    text-[13px]
    font-semibold
    transition
    ${
     newApplication
        ? "bg-[#e8f3ff] text-[#0a66c2]"
        : "border border-[#dfe3e8] bg-white text-[#444444] hover:bg-[#f3f6f8]"
    }
  `}
                  >
                    New
                    <span className="ml-1.5 text-[#777777]">
                    {appliedCount}
                    </span>
                  </button>


                  {/* Reviewing */}

                  <button

                  onClick={()=>{
                    setNewApplication(false);
    setReviewing(true);
    setShortlisted(false);
    setInterview(false);
                  }}
                     className={`
    rounded-full
    px-4 py-2
    text-[13px]
    font-semibold
    transition
    ${
       reviewing
        ? "bg-[#e8f3ff] text-[#0a66c2]"
        : "border border-[#dfe3e8] bg-white text-[#444444] hover:bg-[#f3f6f8]"
    }
  `}
                  >
                    Reviewing
                    <span className="ml-1.5 text-[#777777]">
                    {underReviewCount}
                    </span>
                  </button>


                  {/* Shortlisted */}

                  <button
                   
                   onClick={()=>{

                        setNewApplication(false);
    setReviewing(false);
    setShortlisted(true);
    setInterview(false);
                   }}
                    className={`
    rounded-full
    px-4 py-2
    text-[13px]
    font-semibold
    transition
    ${
      shortlisted
        ? "bg-[#e8f3ff] text-[#0a66c2]"
        : "border border-[#dfe3e8] bg-white text-[#444444] hover:bg-[#f3f6f8]"
    }
  `}
                  >
                    Shortlisted
                    <span className="ml-1.5 text-[#777777]">
                      {shortlistedCount}
                    </span>
                  </button>


                  {/* Interview */}

                  <button

                     onClick={()=>{

                        setNewApplication(false);
    setReviewing(false);
    setShortlisted(false);
    setInterview(true);
                     }}
                     className={`
    rounded-full
    px-4 py-2
    text-[13px]
    font-semibold
    transition
    ${
      interview
        ? "bg-[#e8f3ff] text-[#0a66c2]"
        : "border border-[#dfe3e8] bg-white text-[#444444] hover:bg-[#f3f6f8]"
    }
  `}
                  >
                    Interview
                    <span className="ml-1.5 text-[#777777]">
                    {interviewScheduledCount}
                    </span>
                  </button>

                </div>
  </div>

                {/* Search */}
{/* ================= SEARCH ================= */}

<div className="mt-4 flex justify-end">
    <div className="relative w-full max-w-md">

        <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#777]"
        />

        <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
                if (e.key === "Enter") {
                    setPage(0);
                    fetchApplication(0, search);
                }
            }}
            placeholder="Search by name or email..."
            className="
                w-full
                h-10
                pl-10
                pr-4
                rounded-full
                border border-[#dfe3e8]
                bg-white
                text-[13px]
                text-[#333]
                outline-none
                focus:border-[#0a66c2]
                focus:ring-1
                focus:ring-[#0a66c2]
            "
        />

    </div>
</div>

</div>


{/* ================= APPLICATION CONTENT ================= */}

{filterApplication.length === 0 ? (

    /* ================= NO APPLICATIONS ================= */

    <div className="flex flex-col items-center justify-center py-16 px-5">

        <div
            className="
                w-14 h-14
                rounded-full
                bg-[#f3f6f8]
                flex
                items-center
                justify-center
                text-[#777]
            "
        >
            <Search size={24} />
        </div>

        <h3 className="mt-4 text-[16px] font-semibold text-[#191919]">
            No applications found
        </h3>

        <p className="mt-1 text-[13px] text-[#777] text-center">
            {search
                ? `We couldn't find any applications matching "${search}".`
                : "There are no applications to display."
            }
        </p>

        {search && (
            <button
                onClick={() => {
                    setSearch("");
                    setPage(0);
                    fetchApplication(0, "");
                }}
                className="
                    mt-4
                    px-4 py-2
                    rounded-full
                    border border-[#0a66c2]
                    text-[#0a66c2]
                    text-[13px]
                    font-semibold
                    hover:bg-[#e8f3ff]
                    transition
                "
            >
                Clear Search
            </button>
        )}

    </div>

) : (

    <>

        {/* ================= APPLICATIONS ================= */}

        {filterApplication.map((applications) => (

            <div
                key={applications.applicationId}
                className="
                    px-5 py-5
                    border-b border-[#e0e0e0]
                    hover:bg-[#fafafa]
                    transition
                "
            >

                <div
                    className="
                        flex
                        flex-col
                        xl:flex-row
                        xl:items-center
                        justify-between
                        gap-5
                    "
                >

                    {/* ================= CANDIDATE ================= */}

                    <div className="flex items-start gap-4 min-w-0">

                        {/* Avatar */}

                        <div
                            className="
                                w-14 h-14
                                rounded-full
                                overflow-hidden
                                bg-[#c83bdc]
                                flex
                                items-center
                                justify-center
                                text-white
                                text-[17px]
                                font-semibold
                                shrink-0
                            "
                        >

                            {applications.profileImage ? (

                                <img
                                    src={applications.profileImage}
                                    alt={applications.applicantName}
                                    className="w-full h-full object-cover"
                                />

                            ) : (

                                applications.applicantName
                                    ? applications.applicantName
                                        .split(" ")
                                        .map((name) => name[0])
                                        .join("")
                                        .slice(0, 2)
                                        .toUpperCase()
                                    : "?"

                            )}

                        </div>


                        {/* Candidate Info */}

                        <div className="min-w-0">

                            <h2
                                className="
                                    text-[17px]
                                    font-semibold
                                    text-[#191919]
                                "
                            >
                                {applications.applicantName}
                            </h2>

                            <p
                                className="
                                    flex
                                    items-center
                                    gap-2
                                    text-[13px]
                                    text-[#666666]
                                    mt-1
                                "
                            >

                                <span>
                                    {applications.jobTitle}
                                </span>

                                <span className="text-[#b0b0b0]">
                                    •
                                </span>

                                <span>
                                    {applications.companyName}
                                </span>

                            </p>

                            <p
                                className="
                                    flex
                                    items-center
                                    gap-1.5
                                    text-[12px]
                                    text-[#888888]
                                    mt-2
                                "
                            >

                                <CalendarDays size={14} />

                                {new Date(
                                    applications.appliedAt
                                ).toLocaleDateString("en-IN", {
                                    day: "2-digit",
                                    month: "short",
                                    year: "numeric"
                                })}

                            </p>

                        </div>

                    </div>


                    {/* ================= STATUS + ACTIONS ================= */}

                    <div
                        className="
                            flex
                            flex-wrap
                            items-center
                            justify-start
                            xl:justify-end
                            gap-2
                            shrink-0
                        "
                    >

                        {/* Status */}

                        <span
                            className="
                                inline-flex
                                items-center
                                gap-1.5
                                rounded-full
                                bg-[#e8f3ff]
                                px-3
                                py-1.5
                                text-[12px]
                                font-semibold
                                text-[#0a66c2]
                                mr-2
                            "
                        >

                            <span
                                className="
                                    w-1.5
                                    h-1.5
                                    rounded-full
                                    bg-[#0a66c2]
                                "
                            />

                            {applications.status === "APPLIED"
                                ? "New"
                                : applications.status
                            }

                        </span>


                        {/* View Profile */}

                        <button
                            onClick={() =>
                                viewProfile(applications.applicantId)
                            }
                            className="
                                rounded-full
                                border border-[#0a66c2]
                                bg-white
                                px-4 py-2
                                text-[13px]
                                font-semibold
                                text-[#0a66c2]
                                hover:bg-[#e8f3ff]
                                transition
                            "
                        >
                            View Profile
                        </button>


                        {/* Shortlist */}

                        <button
                            onClick={() =>
                                updateApplicationStatus(
                                    applications.applicationId,
                                    "SHORTLISTED"
                                )
                            }
                            className="
                                rounded-full
                                border border-[#b7e3ce]
                                bg-[#f0faf5]
                                px-4 py-2
                                text-[13px]
                                font-semibold
                                text-[#057642]
                                hover:bg-[#e3f6ec]
                                transition
                            "
                        >
                            Shortlist
                        </button>


                        {/* Reject */}

                        <button
                            onClick={() =>
                                updateApplicationStatus(
                                    applications.applicationId,
                                    "REJECTED"
                                )
                            }
                            className="
                                rounded-full
                                border border-[#f1c4c4]
                                bg-[#fff5f5]
                                px-4 py-2
                                text-[13px]
                                font-semibold
                                text-[#cc1016]
                                hover:bg-[#ffebeb]
                                transition
                            "
                        >
                            Reject
                        </button>


                        {/* ================= MORE ================= */}

                        <div className="relative">

                            <button
                                onClick={() => {

                                    if (
                                        moreOpen &&
                                        selectedApplication?.applicationId ===
                                        applications.applicationId
                                    ) {
                                        setMoreOpen(false);
                                        setSelectedApplication(null);
                                    } else {
                                        setSelectedApplication(applications);
                                        setMoreOpen(true);
                                    }

                                }}
                                className="
                                    w-9 h-9
                                    rounded-full
                                    border border-[#dfe3e8]
                                    bg-white
                                    flex
                                    items-center
                                    justify-center
                                    text-[#555555]
                                    hover:bg-[#f3f6f8]
                                    transition
                                "
                            >
                                <MoreHorizontal size={18} />
                            </button>


                            {/* More Menu */}

                            {moreOpen &&
                                selectedApplication?.applicationId ===
                                applications.applicationId && (

                                    <div
                                        className="
                                            absolute
                                            right-0
                                            top-11
                                            z-50
                                            w-52
                                            bg-white
                                            border border-[#dfe3e8]
                                            rounded-lg
                                            shadow-lg
                                            py-1
                                        "
                                    >

                                        {/* Under Review */}

                                        <button
                                            onClick={() => {
                                                updateApplicationStatus(
                                                    applications.applicationId,
                                                    "UNDER_REVIEW"
                                                );
                                                setMoreOpen(false);
                                                setSelectedApplication(null);
                                            }}
                                            className="
                                                w-full
                                                text-left
                                                px-4 py-2.5
                                                text-[13px]
                                                text-[#333]
                                                hover:bg-[#f3f6f8]
                                            "
                                        >
                                            Mark as Under Review
                                        </button>


                                        {/* Schedule Interview */}

                                        <button
                                            onClick={() => {
                                                updateApplicationStatus(
                                                    applications.applicationId,
                                                    "INTERVIEW_SCHEDULED"
                                                );
                                                setMoreOpen(false);
                                                setSelectedApplication(null);
                                            }}
                                            className="
                                                w-full
                                                text-left
                                                px-4 py-2.5
                                                text-[13px]
                                                text-[#333]
                                                hover:bg-[#f3f6f8]
                                            "
                                        >
                                            Schedule Interview
                                        </button>


                                        {/* Complete Interview */}

                                        <button
                                            onClick={() => {
                                                updateApplicationStatus(
                                                    applications.applicationId,
                                                    "INTERVIEW_COMPLETED"
                                                );
                                                setMoreOpen(false);
                                                setSelectedApplication(null);
                                            }}
                                            className="
                                                w-full
                                                text-left
                                                px-4 py-2.5
                                                text-[13px]
                                                text-[#333]
                                                hover:bg-[#f3f6f8]
                                            "
                                        >
                                            Complete Interview
                                        </button>


                                        {/* Make Offer */}

                                        <button
                                            onClick={() => {
                                                updateApplicationStatus(
                                                    applications.applicationId,
                                                    "OFFERED"
                                                );
                                                setMoreOpen(false);
                                                setSelectedApplication(null);
                                            }}
                                            className="
                                                w-full
                                                text-left
                                                px-4 py-2.5
                                                text-[13px]
                                                text-[#333]
                                                hover:bg-[#f3f6f8]
                                            "
                                        >
                                            Make Offer
                                        </button>


                                        {/* Mark Hired */}

                                        <button
                                            onClick={() => {
                                                updateApplicationStatus(
                                                    applications.applicationId,
                                                    "HIRED"
                                                );
                                                setMoreOpen(false);
                                                setSelectedApplication(null);
                                            }}
                                            className="
                                                w-full
                                                text-left
                                                px-4 py-2.5
                                                text-[13px]
                                                text-[#057642]
                                                font-medium
                                                hover:bg-[#f0faf5]
                                            "
                                        >
                                            Mark as Hired
                                        </button>

                                    </div>

                                )}

                        </div>

                    </div>

                </div>

            </div>

        ))}


        {/* ================= PAGINATION ================= */}

        {totalPages > 1 && (

            <div
                className="
                    flex
                    items-center
                    justify-between
                    px-5
                    py-4
                    border-t
                    border-[#e0e0e0]
                "
            >

                {/* Previous */}

                <button
                    onClick={() => handlePageChange(page - 1)}
                    disabled={page === 0}
                    className="
                        px-4 py-2
                        rounded-md
                        border border-[#dfe3e8]
                        bg-white
                        text-[13px]
                        font-medium
                        text-[#444]
                        disabled:opacity-40
                        disabled:cursor-not-allowed
                        hover:bg-[#f3f6f8]
                    "
                >
                    Previous
                </button>


                {/* Page */}

                <div className="text-[13px] text-[#666]">

                    Page{" "}

                    <span className="font-semibold text-[#191919]">
                        {page + 1}
                    </span>

                    {" "}of{" "}

                    <span className="font-semibold text-[#191919]">
                        {totalPages}
                    </span>

                </div>


                {/* Next */}

                <button
                    onClick={() => handlePageChange(page + 1)}
                    disabled={page === totalPages - 1}
                    className="
                        px-4 py-2
                        rounded-md
                        border border-[#dfe3e8]
                        bg-white
                        text-[13px]
                        font-medium
                        text-[#444]
                        disabled:opacity-40
                        disabled:cursor-not-allowed
                        hover:bg-[#f3f6f8]
                    "
                >
                    Next
                </button>

            </div>

        )}

    </>

)}


{menuOpen && (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">

        <div className="w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-white rounded-xl shadow-2xl border border-[#dfe3e8]">

            {/* ================= COVER ================= */}
            <div className="relative">

                {/* Cover Image */}
                <div className="h-44 bg-gradient-to-r from-[#0a66c2] to-[#70b7ff] overflow-hidden">
                    {profile?.coverImage && (
                        <img
                            src={profile.coverImage}
                            alt="Cover"
                            className="w-full h-full object-cover"
                        />
                    )}
                </div>

                {/* Close */}
                <button
                    onClick={() => setMenuOpen(false)}
                    className="
                        absolute
                        top-4
                        right-4
                        w-9
                        h-9
                        rounded-full
                        bg-white/95
                        border
                        border-[#dfe3e8]
                        text-[#555]
                        text-xl
                        flex
                        items-center
                        justify-center
                        hover:bg-white
                        hover:text-black
                        transition
                    "
                >
                    ×
                </button>

                {/* Profile Header */}
                <div className="px-7 pb-6">

                    <div className="flex flex-col sm:flex-row sm:items-end gap-5 -mt-14 relative">

                        {/* Profile Image */}
                        <div className="
                            w-28
                            h-28
                            rounded-full
                            border-4
                            border-white
                            bg-[#eef3f8]
                            overflow-hidden
                            shrink-0
                            shadow-sm
                        ">
                            {user?.profileImage ? (
                                <img
                                    src={user.profileImage}
                                    alt={user?.fullname}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="
                                    w-full
                                    h-full
                                    flex
                                    items-center
                                    justify-center
                                    bg-[#0a66c2]
                                    text-white
                                    text-3xl
                                    font-semibold
                                ">
                                    {user?.fullname
                                        ?.split(" ")
                                        .map(name => name[0])
                                        .join("")
                                        .slice(0, 2)
                                        .toUpperCase()
                                    }
                                </div>
                            )}
                        </div>

                        {/* Basic Info */}
                        <div className="pb-1 flex-1">

                            <h2 className="text-2xl font-semibold text-[#191919] mt-20">
                                {user?.fullname}
                            </h2>

                            <p className="text-[15px] text-[#555] mt-1">
                                {profile?.headline || "Candidate"}
                            </p>

                            <p className="text-[13px] text-[#777] mt-2">
                                {user?.location || "Location not provided"}
                            </p>

                        </div>

                    </div>

                    {/* Social Links */}
                    <div className="flex flex-wrap gap-2 mt-5">

                        {profile?.linkedinUrl && (
                            <a
                                href={profile.linkedinUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="
                                    px-4 py-2
                                    rounded-full
                                    bg-[#0a66c2]
                                    text-white
                                    text-[13px]
                                    font-semibold
                                    hover:bg-[#004182]
                                    transition
                                "
                            >
                                LinkedIn
                            </a>
                        )}

                        {profile?.githubUrl && (
                            <a
                                href={profile.githubUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="
                                    px-4 py-2
                                    rounded-full
                                    border
                                    border-[#0a66c2]
                                    text-[#0a66c2]
                                    text-[13px]
                                    font-semibold
                                    hover:bg-[#e8f3ff]
                                    transition
                                "
                            >
                                GitHub
                            </a>
                        )}

                        {profile?.portfolioUrl && (
                            <a
                                href={profile.portfolioUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="
                                    px-4 py-2
                                    rounded-full
                                    border
                                    border-[#d0d7de]
                                    text-[#444]
                                    text-[13px]
                                    font-semibold
                                    hover:bg-[#f3f6f8]
                                    transition
                                "
                            >
                                Portfolio
                            </a>
                        )}

                    </div>

                </div>
            </div>


            {/* ================= ABOUT ================= */}
            {profile?.summary && (
                <div className="px-7 py-6 border-t border-[#e0e0e0]">

                    <h3 className="text-[18px] font-semibold text-[#191919]">
                        About
                    </h3>

                    <p className="text-[14px] text-[#555] leading-6 mt-3">
                        {profile.summary}
                    </p>

                </div>
            )}


            {/* ================= SKILLS ================= */}
            {profile?.skills?.length > 0 && (
                <div className="px-7 py-6 border-t border-[#e0e0e0]">

                    <h3 className="text-[18px] font-semibold text-[#191919]">
                        Skills
                    </h3>

                    <div className="flex flex-wrap gap-2 mt-4">

                        {profile.skills.map((skill, index) => (
                            <span
                                key={index}
                                className="
                                    px-3
                                    py-1.5
                                    rounded-full
                                    bg-[#eef3f8]
                                    border
                                    border-[#d6e0ea]
                                    text-[#334155]
                                    text-[13px]
                                    font-medium
                                "
                            >
                                {skill}
                            </span>
                        ))}

                    </div>

                </div>
            )}


            {/* ================= EXPERIENCE ================= */}
            {(profile?.currentJobTitle ||
                profile?.currentCompany ||
                profile?.totalExperienceYears !== null) && (

                <div className="px-7 py-6 border-t border-[#e0e0e0]">

                    <h3 className="text-[18px] font-semibold text-[#191919]">
                        Experience
                    </h3>

                    <div className="mt-4">

                        <h4 className="text-[15px] font-semibold text-[#191919]">
                            {profile?.currentJobTitle || "Not specified"}
                        </h4>

                        <p className="text-[14px] text-[#555] mt-1">
                            {profile?.currentCompany || "Company not specified"}
                        </p>

                        {profile?.totalExperienceYears !== null && (
                            <p className="text-[13px] text-[#777] mt-2">
                                {profile.totalExperienceYears}{" "}
                                {profile.totalExperienceYears === 1
                                    ? "Year"
                                    : "Years"}{" "}
                                experience
                            </p>
                        )}

                    </div>

                </div>
            )}


            {/* ================= EDUCATION ================= */}
            {(profile?.highestEducation ||
                profile?.university ||
                profile?.fieldOfStudy) && (

                <div className="px-7 py-6 border-t border-[#e0e0e0]">

                    <h3 className="text-[18px] font-semibold text-[#191919]">
                        Education
                    </h3>

                    <div className="mt-4">

                        <h4 className="text-[15px] font-semibold text-[#191919]">
                            {profile?.highestEducation}
                        </h4>

                        <p className="text-[14px] text-[#555] mt-1">
                            {profile?.university}
                        </p>

                        {profile?.fieldOfStudy && (
                            <p className="text-[13px] text-[#777] mt-1">
                                {profile.fieldOfStudy}
                            </p>
                        )}

                        <div className="flex flex-wrap gap-4 mt-3 text-[13px] text-[#666]">

                            {profile?.graduationYear && (
                                <span>
                                    Graduation: {profile.graduationYear}
                                </span>
                            )}

                            {profile?.cgpa && (
                                <span>
                                    CGPA: {profile.cgpa}
                                </span>
                            )}

                            {profile?.collegeLocation && (
                                <span>
                                    {profile.collegeLocation}
                                </span>
                            )}

                        </div>

                    </div>

                </div>
            )}


            {/* ================= PROJECT ================= */}
            {profile?.projectName && (
                <div className="px-7 py-6 border-t border-[#e0e0e0]">

                    <h3 className="text-[18px] font-semibold text-[#191919]">
                        Projects
                    </h3>

                    <div className="mt-4">

                        <h4 className="text-[15px] font-semibold text-[#191919]">
                            {profile.projectName}
                        </h4>

                        {profile?.projectDescription && (
                            <p className="text-[14px] text-[#555] leading-6 mt-2">
                                {profile.projectDescription}
                            </p>
                        )}

                        {profile?.projectStartDate && (
                            <p className="text-[13px] text-[#777] mt-2">
                                Started: {profile.projectStartDate}
                            </p>
                        )}

                        {profile?.currentlyWorkingOnProject && (
                            <span className="
                                inline-flex
                                mt-3
                                px-3
                                py-1
                                rounded-full
                                bg-[#e7f7ef]
                                text-[#057642]
                                text-[12px]
                                font-semibold
                            ">
                                Currently working
                            </span>
                        )}

                    </div>

                </div>
            )}


            {/* ================= JOB PREFERENCES ================= */}
            <div className="px-7 py-6 border-t border-[#e0e0e0]">

                <h3 className="text-[18px] font-semibold text-[#191919]">
                    Job Preferences
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-4">

                    <div>
                        <p className="text-[12px] text-[#777]">
                            Preferred Role
                        </p>

                        <p className="text-[14px] font-medium text-[#333] mt-1">
                            {profile?.preferredJobTitle || "Not specified"}
                        </p>
                    </div>

                    <div>
                        <p className="text-[12px] text-[#777]">
                            Work Preference
                        </p>

                        <p className="text-[14px] font-medium text-[#333] mt-1">
                            {profile?.workPreference || "Not specified"}
                        </p>
                    </div>

                    <div>
                        <p className="text-[12px] text-[#777]">
                            Availability
                        </p>

                        <p className="text-[14px] font-medium text-[#333] mt-1">
                            {profile?.availabilityStatus || "Not specified"}
                        </p>
                    </div>

                    <div>
                        <p className="text-[12px] text-[#777]">
                            Experience Level
                        </p>

                        <p className="text-[14px] font-medium text-[#333] mt-1">
                            {profile?.experienceLevel || "Not specified"}
                        </p>
                    </div>

                </div>

            </div>


            {/* ================= CONTACT ================= */}
            {(user?.email || user?.phone) && (
                <div className="px-7 py-6 border-t border-[#e0e0e0]">

                    <h3 className="text-[18px] font-semibold text-[#191919]">
                        Contact
                    </h3>

                    <div className="mt-4 space-y-2 text-[14px]">

                        {user?.email && (
                            <p className="text-[#555]">
                                <span className="font-medium text-[#333]">
                                    Email:
                                </span>{" "}
                                {user.email}
                            </p>
                        )}

                        {user?.phone && (
                            <p className="text-[#555]">
                                <span className="font-medium text-[#333]">
                                    Phone:
                                </span>{" "}
                                {user.phone}
                            </p>
                        )}

                    </div>

                </div>
            )}


            {/* ================= RESUME ================= */}
            {profile?.resumeUrl && (
                <div className="px-7 py-6 border-t border-[#e0e0e0]">

                    <h3 className="text-[18px] font-semibold text-[#191919]">
                        Resume
                    </h3>

                    <a
                        href={profile.resumeUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="
                            inline-flex
                            items-center
                            mt-4
                            px-5
                            py-2.5
                            rounded-full
                            bg-[#0a66c2]
                            text-white
                            text-[13px]
                            font-semibold
                            hover:bg-[#004182]
                            transition
                        "
                    >
                        View Resume
                    </a>

                </div>
            )}

        </div>
    </div>
)}

         

           

          </div>
          

        </div>

      </main>

    </div>
  );
};

export default EmployerApplications;