import React, { useEffect, useState } from "react";
import NavBar from "../component/NavBar";
import Footer from "../component/Footer";
import { toast } from "react-hot-toast";
import api from "../Service/Api";
import {
    Search,
    MapPin,
    BriefcaseBusiness,
    Users,
    Bookmark,
    ChevronDown,
    SlidersHorizontal,
    Monitor,
    IndianRupee,
    Building2,
    Sparkles,
    ArrowRight,
    ChevronLeft,
    ChevronRight,
    Clock3,
    CalendarDays,
    ExternalLink,
    CheckCircle2,
    UserRound,
    Mail,
    Phone,
    BarChart3,
    FileCheck2,
    Bell,
    CalendarCheck2,
    ArrowLeft,
    Link
} from "lucide-react";
import { useNavigate } from "react-router-dom";




function Jobs() {
        
 const [searchText, setSearchText] = useState("");
const [location, setLocation] = useState("");
const [experience, setExperience] = useState("");
const [selected, setSelected] = useState(null);
const [jobs, setJobs] = useState([]);
const [page,setPage] = useState(0);
const [totalPages,setTotalPages]=useState(0);

const [isEditOpen,setIsEditOpen]=useState(false);
const [editForm,setEditForm]= useState({});
const [step, setStep] = useState(1);
const[resume,setResume]=useState();
const[additionalDocuments,setAdditionalDocuments]=useState([]);
const[coverLetter,setCoverLetter]=useState();
const[expectedSalary ,setExpectedSalary]= useState("");
const[salaryCurrency,setSalaryCurrency]=useState("");
const[openToRemote ,setOpenToRemote]=useState("");
const[workAuthorized,setWorkAuthorized]=useState("");
const[requiresSponsorship,setRequiresSponsorship]=useState("");
const[availableFrom,setAvailableFrom]=useState("");

const [whyInterested, setWhyInterested] = useState("");
const [fullName, setFullName] = useState("");
const [email, setEmail] = useState("");
const [phone, setPhone] = useState("");
const[linkdin,setlinkedinUrl]=useState("");
const[experienceYears,setExperienceYears]=useState("");
const [currentJobTitle, setCurrentJobTitle] = useState("");
 const navigate=useNavigate();
    useEffect(() => {

        api.get("/search", {
            params: {
                page: 0,
                size: 6,
                sortBy: "createdAt",
                sortDirection: "desc"
            }
        })
            .then((response) => {

                console.log("Search Jobs:", response.data);

                setJobs(response.data.content);
                setPage(response.data.page);
                setTotalPages(response.data.totalPages);

               if (response.data.content.length > 0) {
               setSelected(response.data.content[0]);
                }

            })
            .catch((error) => {

                console.log("Search Jobs Error:", error);

            });

    }, []);
    
const handleSearch = async () => {

    try {

        const params = {
            keyword: searchText || undefined,
            location: location || undefined,
            page: 0,
            size: 6,
            sortBy: sortBy,
            sortDirection: sortDirection
        };

        // Fresher
        if (experience === "0") {

            params.minExperience = 0;
            params.maxExperience = 0;

        }

        // Other experience levels
        else if (experience) {

            params.minExperience = Number(experience);

        }

        const response = await api.get("/search", {
            params: params
        });

        console.log("Search Result:", response.data);

        setJobs(response.data.content);
        setPage(response.data.page);
         setTotalPages(response.data.totalPages);

        if (response.data.content.length > 0) {

            setSelected(response.data.content[0]);

        } else {

            setSelected(null);

        }

    } catch (error) {

        console.log("Search Error:", error);

    }
};

const [remoteSelected, setRemoteSelected] = useState(false);

const handleRemote = async () => {

    try {

        const response = await api.get("/search", {
            params: {
                workMode: "REMOTE",
                page: 0,
                size: 6,
                sortBy: "createdAt",
                sortDirection: "desc"
            }
        });

        console.log("Remote Jobs:", response.data);

        setJobs(response.data.content);

        if (response.data.content.length > 0) {
            setSelected(response.data.content[0]);
        } else {
            setSelected(null);
        }

        setRemoteSelected(true);

    } catch (error) {

        console.log("Remote Search Error:", error);

    }
};

const handlePageChange = async (newPage) => {

    try {

        const params = {
            keyword: searchText || undefined,
            location: location || undefined,
            page: newPage,
            size: 6,
            sortBy: sortBy,
            sortDirection: sortDirection
        };

        if (experience === "0") {

            params.minExperience = 0;
            params.maxExperience = 0;

        } else if (experience) {

            params.minExperience = Number(experience);

        }

        if (remoteSelected) {

            params.workMode = "REMOTE";

        }

        const response = await api.get("/search", {
            params: params
        });

        console.log("Page:", response.data.page);
        console.log("Jobs:", response.data.content);

        setJobs(response.data.content);

        setPage(response.data.page);
        setTotalPages(response.data.totalPages);

        if (response.data.content.length > 0) {

            setSelected(response.data.content[0]);

        } else {

            setSelected(null);

        }

    } catch (error) {

        console.log("Pagination Error:", error);

    }
};

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

const [sortBy, setSortBy] = useState("createdAt");
const [sortDirection, setSortDirection] = useState("desc");

const handleSort = (value) => {

    const [field, direction] = value.split("-");

    setSortBy(field);
    setSortDirection(direction);
    setPage(0);

    const params = {
        keyword: searchText || undefined,
        location: location || undefined,
        page: 0,
        size: 6,
        sortBy: field,
        sortDirection: direction
    };

    if (experience) {
        const [minExp, maxExp] = experience.split("-");

        params.minExperience = minExp;

        if (maxExp) {
            params.maxExperience = maxExp;
        }
    }

    if (remoteSelected) {
        params.workMode = "REMOTE";
    }

    api.get("/search", {
        params: params
    })
        .then((response) => {

            console.log("Sorted Jobs:", response.data);

            setJobs(response.data.content || []);
            setPage(response.data.page || 0);
            setTotalPages(response.data.totalPages || 0);

            if (response.data.content?.length > 0) {
                setSelected(response.data.content[0]);
            } else {
                setSelected(null);
            }
        })
        .catch((error) => {
            console.log("Sort API Error:", error);
            toast.error("Unable to sort jobs.");
        });
};


const handleSubmitApplication = async () => {

    try {

        // Resume mandatory hai
        if (!resume) {
            toast.error("Please upload your resume.");
            setStep(2);
            return;
        }

        // Job select hona chahiye
        if (!selected?.jobId) {
            toast.error("Job information is missing.");
            return;
        }

        // FormData create
        const formData = new FormData();

        // =========================
        // BASIC APPLICATION DETAILS
        // =========================

        formData.append("jobId", selected.jobId);

        formData.append("resume", resume);

        // =========================
        // ADDITIONAL DOCUMENTS
        // =========================

        additionalDocuments.forEach((file) => {
            formData.append("additionalDocuments", file);
        });

        // =========================
        // APPLICATION QUESTIONS
        // =========================

        formData.append("coverLetter", coverLetter || "");

        formData.append("whyInterested", whyInterested || "");

        formData.append(
            "experienceYears",
            experienceYears || 0
        );

        formData.append(
            "expectedSalary",
            expectedSalary || 0
        );

        formData.append(
            "salaryCurrency",
            salaryCurrency || "INR"
        );

        // =========================
        // LOCATION
        // =========================

        formData.append(
            "applicantLocation",
            location || ""
        );

        // =========================
        // REMOTE
        // =========================

        formData.append(
            "openToRemote",
            openToRemote ? "true" : "false"
        );

        // =========================
        // WORK AUTHORIZATION
        // =========================

        formData.append(
            "workAuthorized",
            workAuthorized ? "true" : "false"
        );

        // =========================
        // SPONSORSHIP
        // =========================

        formData.append(
            "requiresSponsorship",
            requiresSponsorship ? "true" : "false"
        );

        // =========================
        // AVAILABLE FROM
        // =========================

        if (availableFrom) {
            formData.append(
                "availableFrom",
                availableFrom
            );
        }

        // =========================
        // API CALL
        // =========================

        const response = await api.post(
            "/applications",
            formData
        );

        console.log(
            "Application Submitted:",
            response.data
        );

        toast.success(
            "Application submitted successfully!"
        );

        // Modal close
        setIsEditOpen(false);

        // Step reset
        setStep(1);

    } catch (error) {

        console.log(
            "Application Submit Error:",
            error
        );

        if (error.response?.data?.message) {

            toast.error(
                error.response.data.message
            );

        } else {

            toast.error(
                "Unable to submit application."
            );
        }
    }
};
    return (
        <div className="min-h-screen bg-slate-50">

            <NavBar />


            <main className="mx-auto max-w-[1500px] px-6 py-8">


                {/* ================================================= */}
                {/* SEARCH SECTION */}
                {/* ================================================= */}

                <section>

                    <div
                        className="
                            rounded-3xl
                            border
                            border-slate-200
                            bg-white
                            p-5
                            shadow-sm
                        "
                    >

                        <div
                            className="
                                grid
                                grid-cols-1
                                gap-3
                                lg:grid-cols-[1.5fr_1fr_1fr_auto]
                            "
                        >

                            {/* Keyword */}

                            <div
                                className="
                                    flex
                                    h-14
                                    items-center
                                    gap-3
                                    rounded-xl
                                    border
                                    border-slate-200
                                    bg-white
                                    px-4
                                "
                            >

                                <Search
                                    size={19}
                                    className="text-slate-400"
                                />

                                <input
                                    type="text"
                                    value={(searchText)}
                                    onChange={(e)=>setSearchText(e.target.value)}
                                    placeholder="Job title, keywords, or company"
                                    className="
                                        w-full
                                        bg-transparent
                                        text-[14px]
                                        text-slate-700
                                        outline-none
                                        placeholder:text-slate-400
                                    "
                                />

                            </div>


                            {/* Location */}

                            <div
                                className="
                                    flex
                                    h-14
                                    items-center
                                    gap-3
                                    rounded-xl
                                    border
                                    border-slate-200
                                    bg-white
                                    px-4
                                "
                            >

                                <MapPin
                                    size={19}
                                    className="text-slate-400"
                                />

                                <input
                                    type="text"
                                    value={location}
                                    onChange={(e)=>setLocation(e.target.value)}
                                    placeholder="Location"
                                    className="
                                        w-full
                                        bg-transparent
                                        text-[14px]
                                        text-slate-700
                                        outline-none
                                        placeholder:text-slate-400
                                    "
                                />

                                <ChevronDown
                                    size={16}
                                    className="text-slate-400"
                                />

                            </div>


                            {/* Experience */}

                            <div
                                className="
                                    flex
                                    h-14
                                    items-center
                                    gap-3
                                    rounded-xl
                                    border
                                    border-slate-200
                                    bg-white
                                    px-4
                                "
                            >

                                <BriefcaseBusiness
                                    size={19}
                                    className="text-slate-400"
                                />

                                <span
                                    className="
                                        flex-1
                                        text-[14px]
                                        text-slate-500
                                    "
                                >
                                    
                                </span>

                                     <select
    value={experience}
    onChange={(e) => setExperience(e.target.value)}
    className="
        flex-1
        bg-transparent
        text-[14px]
        text-slate-500
        outline-none
    "
>
  
    <option value="">
         Experience level
    </option>
    <option value="0">
        Fresher
    </option>

    <option value="1">
        1+ Years
    </option>

    <option value="2">
        2+ Years
    </option>

    <option value="3">
        3+ Years
    </option>

    <option value="5">
        5+ Years
    </option>
</select>
                            </div>


                            {/* Search Button */}

                            <button
    onClick={handleSearch}
    className="
        flex
        h-14
        items-center
        justify-center
        gap-2
        rounded-xl
        bg-blue-600
        px-7
        text-[14px]
        font-extrabold
        text-white
        shadow-lg
        shadow-blue-600/20
        transition
        hover:bg-blue-700
    "
>
    Search Jobs

    <ArrowRight size={17} />
</button>

                        </div>


                        {/* Filter Row */}

                        <div
                            className="
                                mt-4
                                flex
                                flex-wrap
                                gap-2
                            "
                        >

                          

                            <button
                                className="
                                    flex
                                    items-center
                                    gap-2
                                    rounded-full
                                    border
                                    border-slate-200
                                    bg-white
                                    px-4
                                    py-2.5
                                    text-[13px]
                                    font-semibold
                                    text-slate-700
                                    shadow-sm
                                    transition
                                    hover:border-blue-300
                                    hover:bg-blue-50
                                    hover:text-blue-600
                                "
                            >

                                <CheckCircle2 size={15} />

                                Easy Apply

                            </button>

                                   
                                   <button
    onClick={handleRemote}
    className={`
        flex
        items-center
        gap-2
        rounded-full
        border
        px-4
        py-2.5
        text-[13px]
        font-semibold
        shadow-sm
        transition

        ${
            remoteSelected
                ? "border-blue-300 bg-blue-50 text-blue-600"
                : "border-slate-200 bg-white text-slate-700 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600"
        }
    `}
>
    <Monitor size={15} />

    Remote
</button>


                            <button
                                className="
                                    flex
                                    items-center
                                    gap-2
                                    rounded-full
                                    border
                                    border-blue-200
                                   
                                    px-4
                                    py-2.5
                                    text-[13px]
                                    font-bold
                                    text-blue-600
                                "
                            >

                                <SlidersHorizontal size={15} />

                                All Filters

                            </button>

                        </div>

                    </div>

                </section>



                {/* ================================================= */}
                {/* FEATURED OPPORTUNITIES */}
                {/* ================================================= */}

                <section className="mt-5">

                    <div
                        className="
                            rounded-3xl
                            border
                            border-blue-100
                            bg-gradient-to-r
                            from-blue-50
                            via-white
                            to-blue-50
                            p-4
                        "
                    >

                        <div
                            className="
                                flex
                                flex-col
                                gap-4
                                xl:flex-row
                                xl:items-center
                            "
                        >

                            <div
                                className="
                                    flex
                                    shrink-0
                                    items-center
                                    gap-3
                                    xl:w-[245px]
                                "
                            >

                                <div
                                    className="
                                        flex
                                        h-11
                                        w-11
                                        items-center
                                        justify-center
                                        rounded-xl
                                        bg-white
                                        text-blue-600
                                        shadow-sm
                                    "
                                >
                                    <Sparkles size={20} />
                                </div>

                                <div>

                                    <h2
                                        className="
                                            text-[15px]
                                            font-black
                                            text-slate-900
                                        "
                                    >
                                        Featured Opportunities
                                    </h2>

                                    <p
                                        className="
                                            mt-0.5
                                            text-[11px]
                                            font-medium
                                            text-slate-500
                                        "
                                    >
                                        Handpicked jobs from top companies
                                    </p>

                                </div>

                            </div>


                    <div
    className="
        flex
        min-w-0
        flex-1
        gap-3
        overflow-hidden
    "
>

    {jobs.map((job) => (

        <div
            key={job.jobId}
            onClick={() => setSelected(job)}
            className="
                flex
                min-w-[220px]
                cursor-pointer
                items-center
                gap-3
                rounded-1xl
                p-3
                shadow-sm
                transition
                hover:-translate-y-0.5
                hover:shadow-md
            "
        >

            <div
                className="
                    flex
                    h-22
                    w-22
                    shrink-0
                    items-center
                    justify-center
                    overflow-hidden
                    rounded-xl
                   
                "
            >

                <img
                    src={job.companyLogo}
                    alt={job.companyName}
                    className="h-full w-full object-contain p-2"
                />

            </div>

            <div className="min-w-0">

                <p
                    className="
                        truncate
                        text-[13px]
                        font-bold
                        text-slate-900
                    "
                >
                    {job.title}
                </p>

                <p
                    className="
                        mt-1
                        truncate
                        text-[11px]
                        font-medium
                        text-slate-500
                    "
                >
                    {job.companyName}
                </p>

                <p
                    className="
                        mt-1
                        text-[10px]
                        font-medium
                        text-slate-400
                    "
                >
                    {job.location}
                </p>

            </div>

        </div>

    ))}

</div>

</div>
                    </div>

                </section>



                {/* ================================================= */}
                {/* JOB RESULTS + DETAILS */}
                {/* ================================================= */}
                      

                      <section
    className="
        mt-7
        grid
        grid-cols-1
        items-start
        gap-5
        lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]
    "
>


                    {/* ================================================= */}
                    {/* LEFT SIDE - JOB LIST */}
                    {/* ================================================= */}

                    <div>

                        {/* Results Header */}

                        <div
                            className="
                                mb-4
                                flex
                                flex-wrap
                                items-end
                                justify-between
                                gap-3
                            "
                        >

                            <div>

                                <h1
                                    className="
                                        text-[24px]
                                        font-black
                                        tracking-tight
                                        text-slate-900
                                    "
                                >
                                   {jobs.length}Jobs Found
                                </h1>

                                <p
                                    className="
                                        mt-1
                                        text-[13px]
                                        font-medium
                                        text-slate-500
                                    "
                                >
                                    Showing 1–{jobs.length} jobs
                                </p>

                            </div>


                            <div
                                className="
                                    flex
                                    items-center
                                    gap-2
                                "
                            >
                                <select
 onChange={(e) => handleSort(e.target.value)}
    className="
        rounded-xl
        border
        border-slate-200
        bg-white
        px-4
        py-2.5
        text-[12px]
        font-semibold
        text-slate-600
        outline-none
        cursor-pointer
    "
>
    <option value="createdAt-desc">
        Most Recent
    </option>

    <option value="createdAt-asc">
        Oldest
    </option>

    <option value="salaryMax-desc">
        Salary: High to Low
    </option>

    <option value="salaryMin-asc">
        Salary: Low to High
    </option>
</select>

                            </div>

                        </div>


                        {/* Job 1 */}

  <div className="w-190 h-150 overflow-y-auto ">

                    <div className="space-y-3">

    {jobs.map((job) => (

        <div
            key={job.jobId}
            onClick={() => setSelected(job)}
            className="
                cursor-pointer
                rounded-1xl
               
                p-5
                shadow-sm
                transition
                hover:-translate-y-0.5
                hover:shadow-md
            "
        >

            <div className="flex gap-4">

                {/* Company Logo / Initial */}
                <div
                    className="
                        flex
                        h-25
                        w-25
                        shrink-0
                        items-center
                        justify-center
                        rounded-2xl
                        border
                        border-slate-100
                       
                        text-xl
                        font-black
                        text-slate-800
                    "
                >
                           <img
    src={job.companyLogo}
    alt={job.companyName}
    className="h-full w-full object-contain p-2"
/>
                </div>


                {/* Job Information */}
                <div className="min-w-0 flex-1">

                    <div className="flex items-start justify-between gap-3">

                        <div>

                            <h2
                                className="
                                    text-[17px]
                                    text-2xl
                                    text-slate-900
                                "
                            >
                                {job.title}
                            </h2>

                            <p
                                className="
                                    mt-1
                                    text-[13px]
                                    font-semibold
                                    text-slate-700
                                "
                            >
                                {job.companyName}
                            </p>

                        </div>


                       <button
    onClick={() => handleSaveJob(job.jobId)}
    className="
        flex
        h-8
        w-8
        items-center
        justify-center
        rounded-lg
        text-slate-500
        transition
        hover:text-blue-600
    "
>
    <Bookmark size={17} />
</button>

                    </div>


                    {/* Job Meta */}
                    <div
                        className="
                            mt-2
                            flex
                            flex-wrap
                            items-center
                            gap-3
                            text-xs
                            text-slate-500
                        "
                    >

                        <span className="flex items-center gap-1">
                            <MapPin size={13} />
                            {job.location}
                        </span>


                        <span className="flex items-center gap-1">
                            <BriefcaseBusiness size={13} />
                            {job.jobType?.replace("_", " ")}
                        </span>


                        <span>
                            • {job.workMode}
                        </span>


                        <span className="flex items-center gap-1">
                            <Users size={13} />
                            {job.experienceMin}–{job.experienceMax} Years
                        </span>

                    </div>


                    {/* Salary */}
                    <div
                        className="
                            mt-2
                            text-[14px]
                          
                           text-2xl
                            text-slate-800
                        "
                    >
                        ₹{job.salaryMin} – ₹{job.salaryMax}
                    </div>


                    {/* Skills */}
                    <div className="mt-3 flex flex-wrap gap-1.5">

                        {(job.skills || []).map((skill) => (

                            <span
                                key={skill}
                                className="
                                    rounded-md
                                    bg-blue-50
                                    px-2.5
                                    py-1
                                    text-[11px]
                                    font-bold
                                    text-blue-600
                                "
                            >
                                {skill}
                            </span>

                        ))}

                    </div>

                </div>


                {/* Arrow */}
                <div
                    className="
                        flex
                        h-8
                        w-8
                        shrink-0
                        items-center
                        justify-center
                        self-center
                        rounded-full
                        border
                        border-slate-200
                    "
                >
                    <ArrowRight size={15} />
                </div>

            </div>

        </div>

    ))}

</div>




  </div>

                       


                        {/* Job 4 */}

                     


                        {/* Pagination */}

                        <div
                            className="
                                mt-5
                                flex
                                flex-wrap
                                items-center
                                justify-between
                                gap-4
                            "
                        >

                          <div
    className="
        flex
        items-center
        gap-1.5
    "
>

    {/* Previous Page */}

    <button
        onClick={() => handlePageChange(page - 1)}
        disabled={page === 0}
        className={`
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-full
            border
            ${
                page === 0
                    ? "cursor-not-allowed border-slate-200 bg-white text-slate-300"
                    : "border-slate-200 bg-white text-slate-600 hover:border-blue-300 hover:text-blue-600"
            }
        `}
    >
        <ChevronLeft size={16} />
    </button>


    {/* Page Numbers */}

    {Array.from({ length: totalPages }, (_, index) => (

        <button
            key={index}
            onClick={() => handlePageChange(index)}
            className={`
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-full
                text-[12px]
                font-semibold

                ${
                    page === index
                        ? "bg-blue-600 text-white"
                        : "border border-slate-200 bg-white text-slate-700 hover:border-blue-300 hover:text-blue-600"
                }
            `}
        >
            {index + 1}
        </button>

    ))}


    {/* Next Page */}

    <button
        onClick={() => handlePageChange(page + 1)}
        disabled={page === totalPages - 1 || totalPages === 0}
        className={`
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-full
            border
            ${
                page === totalPages - 1 || totalPages === 0
                    ? "cursor-not-allowed border-slate-200 bg-white text-slate-300"
                    : "border-slate-200 bg-white text-slate-600 hover:border-blue-300 hover:text-blue-600"
            }
        `}
    >
        <ChevronRight size={16} />
    </button>

</div>
                        </div>

                    </div>



                    {/* ================================================= */}
                    {/* RIGHT SIDE - JOB DETAILS */}
                    {/* ================================================= */}

                   

                          {/* ================================================= */}
{/* RIGHT SIDE - JOB DETAILS */}
{/* ================================================= */}

{selected && (

       <div
    className="
        sticky
        top-24
        min-w-0
        w-full
       
        rounded-1xl
       overflow-y-auto
        p-5
        shadow-sm
    "
>
   

        {/* ========================================= */}
        {/* HEADER */}
        {/* ========================================= */}

        <div className="flex items-start justify-between gap-4">

            <div className="flex items-center gap-4 overflow-y-auto">

                {/* Company Logo */}
                <div
                    className="
                        flex
                        h-25
                        w-25
                        shrink-0
                        items-center
                        justify-center
                        overflow-hidden
                        rounded-xl
                      
                        border-slate-100
                        bg-white
                    "
                >

                    {selected.companyLogo ? (

                     <img
    src={selected.companyLogo}
    alt={selected.companyName}
     className="h-full w-full object-contain p-1"
/>

                    ) : (

                        <span
                            className="
                                text-2xl
                                font-black
                                text-slate-900
                            "
                        >
                            {selected.companyName?.charAt(0)}
                        </span>

                    )}

                </div>


                {/* Title + Company */}
                <div>

                    <h2
                        className="
                            text-[23px]
                            text-2xl
                            tracking-tight
                            text-slate-900
                        "
                    >
                        {selected.title}
                    </h2>

                    <div className="mt-1 flex items-center gap-2">

                        <p
                            className="
                                text-[13px]
                                text-2xl
                                text-slate-700
                            "
                        >
                            {selected.companyName}
                        </p>

                        <button
                            className="
                                text-[13px]
                                font-semibold
                                text-blue-600
                                hover:text-blue-700
                            "
                        >
                            View Company →
                        </button>

                    </div>

                </div>

            </div>


            {/* Bookmark + Apply */}
            <div className="flex items-center gap-2">

                <button

              onClick={() => handleSaveJob(selected.jobId)}
               
                    className="
                        flex
                        h-11
                        w-11
                        items-center
                        justify-center
                        rounded-xl
                        border
                        border-slate-200
                        bg-white
                        text-slate-600
                        transition
                        hover:border-blue-300
                        hover:text-blue-600
                    "
                >
                    <Bookmark size={18} />
                </button>


                <button

                  onClick={()=>setIsEditOpen(true)}
                    className="
                        flex
                        h-11
                        items-center
                        gap-2
                        rounded-xl
                        bg-blue-600
                        px-5
                        text-[13px]
                        font-extrabold
                        text-white
                        shadow-lg
                        shadow-blue-600/20
                        transition
                        hover:bg-blue-700
                    "
                >
                    Apply Now

                    <ExternalLink size={15} />

                </button>

            </div>

        </div>


        {/* ========================================= */}
        {/* JOB META */}
        {/* ========================================= */}

        <div
            className="
                mt-7
                flex
                flex-wrap
                items-center
                gap-x-5
                gap-y-3
                text-[13px]
                font-medium
                text-slate-600
            "
        >

            <span className="flex items-center gap-2">

                <MapPin
                    size={17}
                    className="text-slate-500"
                />

                {selected.location}

            </span>


            <span className="flex items-center gap-2">

                <BriefcaseBusiness
                    size={17}
                    className="text-slate-500"
                />

                {selected.jobType?.replace("_", " ")}

            </span>


            <span className="flex items-center gap-2">

                <Monitor
                    size={17}
                    className="text-slate-500"
                />

                {selected.workMode}

            </span>


            <span className="flex items-center gap-2">

                <Users
                    size={17}
                    className="text-slate-500"
                />

                {selected.experienceMin}–{selected.experienceMax} Years

            </span>

        </div>


        {/* ========================================= */}
        {/* SALARY */}
        {/* ========================================= */}

        <div
            className="
                mt-5
                flex
                items-center
                gap-2
                text-[14px]
                text-2xl
                text-slate-800
            "
        >

            <IndianRupee size={17} />

            ₹{selected.salaryMin} – ₹{selected.salaryMax}

            <span className="font-medium text-slate-500">
                per year
            </span>

        </div>


        {/* ========================================= */}
        {/* SKILLS */}
        {/* ========================================= */}

        <div className="mt-6 flex flex-wrap gap-2">

            {(selected.skills || []).map((skill) => (

                <span
                    key={skill}
                    className="
                        rounded-lg
                        bg-blue-50
                        px-3
                        py-2
                        text-[11px]
                        font-bold
                        text-blue-600
                    "
                >
                    {skill}
                </span>

            ))}

        </div>


        {/* ========================================= */}
        {/* JOB DESCRIPTION */}
        {/* ========================================= */}

        <div className="mt-7">

            <h3
                className="
                    text-[17px]
                    text-2xl
                    text-slate-900
                "
            >
                Job Description
            </h3>


            <p
                className="
                    mt-3
                    text-[13px]
                    leading-6
                    text-slate-600
                "
            >
                {selected.description}
            </p>


            <button
                className="
                    mt-3
                    text-[13px]
                    font-bold
                    text-blue-600
                    hover:text-blue-700
                "
            >
                Show More ↓
            </button>

        </div>


        {/* ========================================= */}
        {/* DIVIDER */}
        {/* ========================================= */}

        <div className="my-6 border-t border-slate-200" />


        {/* ========================================= */}
        {/* JOB INFORMATION */}
        {/* ========================================= */}

        <div className="grid grid-cols-2">

            {/* LEFT COLUMN */}
            <div className="space-y-6 pr-6">

                {/* Posted */}
                <div className="flex items-start gap-3">

                    <CalendarDays
                        size={17}
                        className="mt-0.5 shrink-0 text-slate-500"
                    />

                    <div>

                        <p className="text-[12px] text-slate-500">
                            Posted
                        </p>

                        <p className="mt-1 text-[13px] font-semibold text-slate-700">
                            {selected.createdAt
                                ? new Date(
                                      selected.createdAt
                                  ).toLocaleDateString("en-IN")
                                : "N/A"
                            }
                        </p>

                    </div>

                </div>


                {/* Job ID */}
                <div className="flex items-start gap-3">

                    <Building2
                        size={17}
                        className="mt-0.5 shrink-0 text-slate-500"
                    />

                    <div>

                        <p className="text-[12px] text-slate-500">
                            Job ID
                        </p>

                        <p className="mt-1 text-[13px] font-semibold text-slate-700">
                            {selected.jobId}
                        </p>

                    </div>

                </div>


                {/* Category */}
                <div className="flex items-start gap-3">

                    <BriefcaseBusiness
                        size={17}
                        className="mt-0.5 shrink-0 text-slate-500"
                    />

                    <div>

                        <p className="text-[12px] text-slate-500">
                            Category
                        </p>

                        <p className="mt-1 text-[13px] font-semibold text-slate-700">
                            {selected.categoryName || "N/A"}
                        </p>

                    </div>

                </div>

            </div>


            {/* RIGHT COLUMN */}
            <div className="space-y-6 border-l border-slate-200 pl-6">

                {/* Applicants */}
                <div className="flex items-start gap-3">

                    <Users
                        size={17}
                        className="mt-0.5 shrink-0 text-slate-500"
                    />

                    <div>

                        <p className="text-[12px] text-slate-500">
                            Applicants
                        </p>

                        <p className="mt-1 text-[13px] font-semibold text-slate-700">
                            {selected.applicationsCount || 0} applicants
                        </p>

                    </div>

                </div>


                {/* Vacancies */}
                <div className="flex items-start gap-3">

                    <Users
                        size={17}
                        className="mt-0.5 shrink-0 text-slate-500"
                    />

                    <div>

                        <p className="text-[12px] text-slate-500">
                            Vacancies
                        </p>

                        <p className="mt-1 text-[13px] font-semibold text-slate-700">
                            {selected.vacancies}
                        </p>

                    </div>

                </div>


                {/* Deadline */}
                <div className="flex items-start gap-3">

                    <CalendarDays
                        size={17}
                        className="mt-0.5 shrink-0 text-slate-500"
                    />

                    <div>

                        <p className="text-[12px] text-slate-500">
                            Application Deadline
                        </p>

                        <p className="mt-1 text-[13px] font-semibold text-slate-700">
                            {selected.deadline || "N/A"}
                        </p>

                    </div>

                </div>

            </div>

        </div>

    </div>

)}        

                {isEditOpen && (
    <div
        className="
            fixed
            inset-0
            z-[100]
            flex
            items-center
            justify-center
            bg-slate-950/60
            p-4
           
        "
    >
        <div
            className="
                relative
                flex
                max-h-[92vh]
                w-full
                max-w-[1100px]
                flex-col
                overflow-hidden
                rounded-3xl
                border
                border-white/20
                bg-white
                shadow-2xl
            "
        >

            {/* ================= MODAL HEADER ================= */}

            <div
                className="
                    flex
                    items-center
                    justify-between
                    border-b
                    border-slate-200
                    bg-white
                    px-6
                    py-4
                "
            >

                <div>

                    <p className="text-[12px] font-semibold text-slate-500">
                        Apply for
                    </p>

                    <h2 className="text-[20px] font-black text-slate-900">
                        {selected?.title}
                    </h2>

                    <p className="mt-0.5 text-sm text-slate-500">
                        {selected?.companyName}
                    </p>

                </div>


                <button
                    type="button"
                    onClick={() => {
                        setIsEditOpen(false);
                        setStep(1);
                    }}
                    className="
                        flex
                        h-10
                        w-10
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-slate-200
                        text-xl
                        text-slate-500
                        transition
                        hover:border-red-200
                        hover:bg-red-50
                        hover:text-red-500
                    "
                >
                    ×
                </button>

            </div>


            {/* ================= STEP PROGRESS ================= */}

            <div className="border-b border-slate-200 bg-slate-50 px-8 py-5">

                <div className="flex items-center justify-between">

                    {/* STEP 1 */}

                    <div className="flex items-center gap-3">

                        <div
                            className={`
                                flex
                                h-9
                                w-9
                                items-center
                                justify-center
                                rounded-full
                                text-sm
                                font-bold
                                ${
                                    step >= 1
                                        ? "bg-[#00634b] text-white"
                                        : "bg-slate-200 text-slate-500"
                                }
                            `}
                        >
                            1
                        </div>

                        <div className="hidden sm:block">

                            <p
                                className={`
                                    text-sm
                                    font-bold
                                    ${
                                        step >= 1
                                            ? "text-[#00634b]"
                                            : "text-slate-500"
                                    }
                                `}
                            >
                                Personal
                            </p>

                            <p className="text-[11px] text-slate-400">
                                Your details
                            </p>

                        </div>

                    </div>


                    <div className="mx-3 h-px flex-1 bg-slate-200" />


                    {/* STEP 2 */}

                    <div className="flex items-center gap-3">

                        <div
                            className={`
                                flex
                                h-9
                                w-9
                                items-center
                                justify-center
                                rounded-full
                                text-sm
                                font-bold
                                ${
                                    step >= 2
                                        ? "bg-[#00634b] text-white"
                                        : "bg-slate-200 text-slate-500"
                                }
                            `}
                        >
                            2
                        </div>

                        <div className="hidden sm:block">

                            <p
                                className={`
                                    text-sm
                                    font-bold
                                    ${
                                        step >= 2
                                            ? "text-[#00634b]"
                                            : "text-slate-500"
                                    }
                                `}
                            >
                                Resume
                            </p>

                            <p className="text-[11px] text-slate-400">
                                Documents
                            </p>

                        </div>

                    </div>


                    <div className="mx-3 h-px flex-1 bg-slate-200" />


                    {/* STEP 3 */}

                    <div className="flex items-center gap-3">

                        <div
                            className={`
                                flex
                                h-9
                                w-9
                                items-center
                                justify-center
                                rounded-full
                                text-sm
                                font-bold
                                ${
                                    step >= 3
                                        ? "bg-[#00634b] text-white"
                                        : "bg-slate-200 text-slate-500"
                                }
                            `}
                        >
                            3
                        </div>

                        <div className="hidden sm:block">

                            <p
                                className={`
                                    text-sm
                                    font-bold
                                    ${
                                        step >= 3
                                            ? "text-[#00634b]"
                                            : "text-slate-500"
                                    }
                                `}
                            >
                                Questions
                            </p>

                            <p className="text-[11px] text-slate-400">
                                Additional details
                            </p>

                        </div>

                    </div>


                    <div className="mx-3 h-px flex-1 bg-slate-200" />


                    {/* STEP 4 */}

                    <div className="flex items-center gap-3">

                        <div
                            className={`
                                flex
                                h-9
                                w-9
                                items-center
                                justify-center
                                rounded-full
                                text-sm
                                font-bold
                                ${
                                    step >= 4
                                        ? "bg-[#00634b] text-white"
                                        : "bg-slate-200 text-slate-500"
                                }
                            `}
                        >
                            4
                        </div>

                        <div className="hidden sm:block">

                            <p
                                className={`
                                    text-sm
                                    font-bold
                                    ${
                                        step >= 4
                                            ? "text-[#00634b]"
                                            : "text-slate-500"
                                    }
                                `}
                            >
                                Review
                            </p>

                            <p className="text-[11px] text-slate-400">
                                Submit application
                            </p>

                        </div>

                    </div>

                </div>

            </div>


            {/* ================= APPLICATION CONTENT ================= */}

            <div className="min-h-0 flex-1 overflow-y-auto">

                {/* ================================================= */}
                {/* STEP 1 - PERSONAL INFORMATION */}
                {/* ================================================= */}

                {step === 1 && (

                    <div className="px-10 pb-8 pt-7">

                        <div className="mb-7">

                            <h3 className="text-xl font-bold text-slate-900">
                                Personal Information
                            </h3>

                            <p className="mt-1 text-sm text-slate-500">
                                Please provide your contact information for this
                                application.
                            </p>

                        </div>


                        {/* Full Name */}

                        <div className="mb-5">

                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                Full Name
                            </label>

                            <input
                                type="text"
                                placeholder="Enter your full name"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                className="
                                    h-11
                                    w-full
                                    rounded-xl
                                    border
                                    border-slate-300
                                    px-4
                                    text-sm
                                    outline-none
                                    transition
                                    focus:border-[#00634b]
                                    focus:ring-2
                                    focus:ring-[#00634b]/10
                                "
                            />

                        </div>


                        {/* Email + Phone */}

                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                            <div>

                                <label className="mb-2 block text-sm font-semibold text-slate-700">
                                    Email Address
                                </label>

                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="
                                        h-11
                                        w-full
                                        rounded-xl
                                        border
                                        border-slate-300
                                        px-4
                                        text-sm
                                        outline-none
                                        transition
                                        focus:border-[#00634b]
                                        focus:ring-2
                                        focus:ring-[#00634b]/10
                                    "
                                />

                            </div>


                            <div>

                                <label className="mb-2 block text-sm font-semibold text-slate-700">
                                    Phone Number
                                </label>

                                <input
                                    type="tel"
                                    placeholder="Enter your phone number"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="
                                        h-11
                                        w-full
                                        rounded-xl
                                        border
                                        border-slate-300
                                        px-4
                                        text-sm
                                        outline-none
                                        transition
                                        focus:border-[#00634b]
                                        focus:ring-2
                                        focus:ring-[#00634b]/10
                                    "
                                />

                            </div>

                        </div>


                        {/* Location + Current Job */}

                        <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">

                            <div>

                                <label className="mb-2 block text-sm font-semibold text-slate-700">
                                    Location
                                </label>

                                <input
                                    type="text"
                                    placeholder="e.g. Delhi, India"
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                    className="
                                        h-11
                                        w-full
                                        rounded-xl
                                        border
                                        border-slate-300
                                        px-4
                                        text-sm
                                        outline-none
                                        transition
                                        focus:border-[#00634b]
                                        focus:ring-2
                                        focus:ring-[#00634b]/10
                                    "
                                />

                            </div>


                            <div>

                                <label className="mb-2 block text-sm font-semibold text-slate-700">
                                    Current Job Title
                                </label>

                                <input
                                    type="text"
                                    placeholder="e.g. Java Developer"
                                    value={currentJobTitle}
                                    onChange={(e) =>
                                        setCurrentJobTitle(e.target.value)
                                    }
                                    className="
                                        h-11
                                        w-full
                                        rounded-xl
                                        border
                                        border-slate-300
                                        px-4
                                        text-sm
                                        outline-none
                                        transition
                                        focus:border-[#00634b]
                                        focus:ring-2
                                        focus:ring-[#00634b]/10
                                    "
                                />

                            </div>

                        </div>


                        {/* Experience + LinkedIn */}

                        <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">

                            <div>

                                <label className="mb-2 block text-sm font-semibold text-slate-700">
                                    Years of Experience
                                </label>

                                <input
                                    type="number"
                                    min="0"
                                    placeholder="e.g. 2"
                                    value={experienceYears}
                                    onChange={(e) =>
                                        setExperienceYears(e.target.value)
                                    }
                                    className="
                                        h-11
                                        w-full
                                        rounded-xl
                                        border
                                        border-slate-300
                                        px-4
                                        text-sm
                                        outline-none
                                        transition
                                        focus:border-[#00634b]
                                        focus:ring-2
                                        focus:ring-[#00634b]/10
                                    "
                                />

                            </div>


                            <div>

                                <label className="mb-2 block text-sm font-semibold text-slate-700">
                                    LinkedIn Profile
                                </label>

                                <input
                                    type="url"
                                    placeholder="https://linkedin.com/in/yourname"
                                    value={linkdin}
                                    onChange={(e) =>
                                        setlinkedinUrl(e.target.value)
                                    }
                                    className="
                                        h-11
                                        w-full
                                        rounded-xl
                                        border
                                        border-slate-300
                                        px-4
                                        text-sm
                                        outline-none
                                        transition
                                        focus:border-[#00634b]
                                        focus:ring-2
                                        focus:ring-[#00634b]/10
                                    "
                                />

                            </div>

                        </div>


                        {/* Buttons */}

                        <div className="mt-8 flex items-center justify-between border-t border-slate-200 pt-5">

                            <button
                                type="button"
                                onClick={() => setIsEditOpen(false)}
                                className="
                                    rounded-xl
                                    border
                                    border-slate-300
                                    bg-white
                                    px-6
                                    py-3
                                    text-sm
                                    font-semibold
                                    text-slate-700
                                    transition
                                    hover:bg-slate-50
                                "
                            >
                                Cancel
                            </button>


                            <button
                                type="button"
                                onClick={() => setStep(2)}
                                className="
                                    flex
                                    items-center
                                    gap-2
                                    rounded-xl
                                    bg-[#00634b]
                                    px-8
                                    py-3
                                    text-sm
                                    font-bold
                                    text-white
                                    shadow-[0_8px_20px_rgba(0,90,65,0.18)]
                                    transition
                                    hover:-translate-y-0.5
                                    hover:bg-[#074b3b]
                                "
                            >
                                Next
                                <ArrowRight size={17} />
                            </button>

                        </div>

                    </div>

                )}


                {/* ================================================= */}
                {/* STEP 2 - RESUME & DOCUMENTS */}
                {/* ================================================= */}

                {step === 2 && (

                    <div className="px-10 pb-8 pt-7">

                        <div className="mb-7">

                            <h3 className="text-xl font-bold text-slate-900">
                                Resume & Documents
                            </h3>

                            <p className="mt-1 text-sm text-slate-500">
                                Upload your resume and any additional documents.
                            </p>

                        </div>


                        {/* Resume */}

                        <div>

                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                Resume
                            </label>

                            <div
                                className="
                                    rounded-2xl
                                    border-2
                                    border-dashed
                                    border-slate-300
                                    bg-slate-50
                                    p-8
                                    text-center
                                    transition
                                    hover:border-[#00634b]
                                "
                            >

                                <FileCheck2
                                    size={38}
                                    className="mx-auto text-[#00634b]"
                                />

                                <p className="mt-3 text-sm font-bold text-slate-800">
                                    Upload your resume
                                </p>

                                <p className="mt-1 text-xs text-slate-500">
                                    PDF, DOC or DOCX
                                </p>

                                <input
                                    type="file"
                                    accept=".pdf,.doc,.docx"
                                    onChange={(e) =>
                                        setResume(e.target.files[0] || null)
                                    }
                                    className="mx-auto mt-5 block text-sm "
                                />

                                {resume && (
                                    <p className="mt-3 text-sm font-semibold text-[#00634b]">
                                        Selected: {resume.name}
                                    </p>
                                )}

                            </div>

                        </div>


                        {/* Additional Documents */}

                        <div className="mt-7">

                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                Additional Documents
                                <span className="ml-2 font-normal text-slate-400">
                                    Optional
                                </span>
                            </label>

                            <input
                                type="file"
                                multiple
                                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                                onChange={(e) =>
                                    setAdditionalDocuments(
                                        Array.from(e.target.files)
                                    )
                                }
                                className="
                                    block
                                    w-full
                                    rounded-xl
                                    border
                                    border-slate-300
                                    bg-white
                                    p-3
                                    text-sm
                                "
                            />

                            {additionalDocuments.length > 0 && (

                                <div className="mt-4 space-y-2">

                                    {additionalDocuments.map(
                                        (file, index) => (

                                            <div
                                                key={index}
                                                className="
                                                    flex
                                                    items-center
                                                    justify-between
                                                    rounded-xl
                                                    bg-slate-50
                                                    px-4
                                                    py-3
                                                "
                                            >
                                                <span className="text-sm text-slate-700">
                                                    {file.name}
                                                </span>
                                            </div>

                                        )
                                    )}

                                </div>

                            )}

                        </div>


                        {/* Buttons */}

                        <div className="mt-8 flex items-center justify-between border-t border-slate-200 pt-5">

                            <button
                                type="button"
                                onClick={() => setStep(1)}
                                className="
                                    flex
                                    items-center
                                    gap-2
                                    rounded-xl
                                    border
                                    border-slate-300
                                    bg-white
                                    px-6
                                    py-3
                                    text-sm
                                    font-semibold
                                    text-slate-700
                                    transition
                                    hover:bg-slate-50
                                "
                            >
                                <ArrowLeft size={17} />
                                Back
                            </button>


                            <button
                                type="button"
                                onClick={() => setStep(3)}
                                className="
                                    flex
                                    items-center
                                    gap-2
                                    rounded-xl
                                    bg-[#00634b]
                                    px-8
                                    py-3
                                    text-sm
                                    font-bold
                                    text-white
                                    transition
                                    hover:bg-[#074b3b]
                                "
                            >
                                Next
                                <ArrowRight size={17} />
                            </button>

                        </div>

                    </div>

                )}


                {/* ================================================= */}
                {/* STEP 3 - ADDITIONAL QUESTIONS */}
                {/* ================================================= */}

                {step === 3 && (

                    <div className="px-10 pb-8 pt-7">

                        <div className="mb-7">

                            <h3 className="text-xl font-bold text-slate-900">
                                Additional Questions
                            </h3>

                            <p className="mt-1 text-sm text-slate-500">
                                Tell the employer a little more about yourself.
                            </p>

                        </div>


                        {/* Cover Letter */}

                        <div>

                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                Cover Letter
                            </label>

                            <textarea
                                rows="5"
                                maxLength="5000"
                                placeholder="Write your cover letter..."
                                value={coverLetter}
                                onChange={(e) =>
                                    setCoverLetter(e.target.value)
                                }
                                className="
                                    w-full
                                    resize-none
                                    rounded-xl
                                    border
                                    border-slate-300
                                    px-4
                                    py-3
                                    text-sm
                                    outline-none
                                    transition
                                    focus:border-[#00634b]
                                    focus:ring-2
                                    focus:ring-[#00634b]/10
                                "
                            />

                        </div>


                        {/* Why Interested */}

                        <div className="mt-5">

                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                Why are you interested in this job?
                            </label>

                            <textarea
                                rows="5"
                                maxLength="5000"
                                placeholder="Tell us why you are interested..."
                                value={whyInterested}
                                onChange={(e) =>
                                    setWhyInterested(e.target.value)
                                }
                                className="
                                    w-full
                                    resize-none
                                    rounded-xl
                                    border
                                    border-slate-300
                                    px-4
                                    py-3
                                    text-sm
                                    outline-none
                                    transition
                                    focus:border-[#00634b]
                                    focus:ring-2
                                    focus:ring-[#00634b]/10
                                "
                            />

                        </div>


                        {/* Salary + Currency */}

                        <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">

                            <div>

                                <label className="mb-2 block text-sm font-semibold text-slate-700">
                                    Expected Salary
                                </label>

                                <input
                                    type="number"
                                    min="0"
                                    placeholder="e.g. 800000"
                                    value={expectedSalary}
                                    onChange={(e) =>
                                        setExpectedSalary(e.target.value)
                                    }
                                    className="
                                        h-11
                                        w-full
                                        rounded-xl
                                        border
                                        border-slate-300
                                        px-4
                                        text-sm
                                        outline-none
                                        focus:border-[#00634b]
                                        focus:ring-2
                                        focus:ring-[#00634b]/10
                                    "
                                />

                            </div>


                            <div>

                                <label className="mb-2 block text-sm font-semibold text-slate-700">
                                    Salary Currency
                                </label>

                                <select
                                    value={salaryCurrency}
                                    onChange={(e) =>
                                        setSalaryCurrency(e.target.value)
                                    }
                                    className="
                                        h-11
                                        w-full
                                        rounded-xl
                                        border
                                        border-slate-300
                                        bg-white
                                        px-4
                                        text-sm
                                        outline-none
                                        focus:border-[#00634b]
                                    "
                                >
                                    <option value="INR">
                                        INR - Indian Rupee
                                    </option>

                                    <option value="USD">
                                        USD - US Dollar
                                    </option>

                                    <option value="EUR">
                                        EUR - Euro
                                    </option>

                                </select>

                            </div>

                        </div>


                        {/* Remote */}

                        <div className="mt-6 rounded-xl border border-slate-200 p-4">

                            <label className="flex cursor-pointer items-center gap-3">

                                <input
                                    type="checkbox"
                                    checked={openToRemote}
                                    onChange={(e) =>
                                        setOpenToRemote(e.target.checked)
                                    }
                                    className="h-4 w-4 accent-[#00634b]"
                                />

                                <span className="text-sm font-semibold text-slate-700">
                                    I am open to remote work
                                </span>

                            </label>

                        </div>


                        {/* Work Authorization */}

                        <div className="mt-4 rounded-xl border border-slate-200 p-4">

                            <label className="flex cursor-pointer items-center gap-3">

                                <input
                                    type="checkbox"
                                    checked={workAuthorized}
                                    onChange={(e) =>
                                        setWorkAuthorized(e.target.checked)
                                    }
                                    className="h-4 w-4 accent-[#00634b]"
                                />

                                <span className="text-sm font-semibold text-slate-700">
                                    I am authorized to work in this location
                                </span>

                            </label>

                        </div>


                        {/* Sponsorship */}

                        <div className="mt-4 rounded-xl border border-slate-200 p-4">

                            <label className="flex cursor-pointer items-center gap-3">

                                <input
                                    type="checkbox"
                                    checked={requiresSponsorship}
                                    onChange={(e) =>
                                        setRequiresSponsorship(e.target.checked)
                                    }
                                    className="h-4 w-4 accent-[#00634b]"
                                />

                                <span className="text-sm font-semibold text-slate-700">
                                    I require sponsorship
                                </span>

                            </label>

                        </div>


                        {/* Available From */}

                        <div className="mt-5">

                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                Available From
                            </label>

                            <input
                                type="date"
                                value={availableFrom}
                                onChange={(e) =>
                                    setAvailableFrom(e.target.value)
                                }
                                className="
                                    h-11
                                    w-full
                                    rounded-xl
                                    border
                                    border-slate-300
                                    px-4
                                    text-sm
                                    outline-none
                                    focus:border-[#00634b]
                                "
                            />

                        </div>


                        {/* Buttons */}

                        <div className="mt-8 flex items-center justify-between border-t border-slate-200 pt-5">

                            <button
                                type="button"
                                onClick={() => setStep(2)}
                                className="
                                    flex
                                    items-center
                                    gap-2
                                    rounded-xl
                                    border
                                    border-slate-300
                                    bg-white
                                    px-6
                                    py-3
                                    text-sm
                                    font-semibold
                                    text-slate-700
                                    transition
                                    hover:bg-slate-50
                                "
                            >
                                <ArrowLeft size={17} />
                                Back
                            </button>


                            <button
                                type="button"
                                onClick={() => setStep(4)}
                                className="
                                    flex
                                    items-center
                                    gap-2
                                    rounded-xl
                                    bg-[#00634b]
                                    px-8
                                    py-3
                                    text-sm
                                    font-bold
                                    text-white
                                    transition
                                    hover:bg-[#074b3b]
                                "
                            >
                                Review Application
                                <ArrowRight size={17} />
                            </button>

                        </div>

                    </div>

                )}


                {/* ================================================= */}
                {/* STEP 4 - REVIEW & SUBMIT */}
                {/* ================================================= */}

                {step === 4 && (

                    <div className="px-10 pb-8 pt-7">

                        <div className="mb-7">

                            <h3 className="text-xl font-bold text-slate-900">
                                Review & Submit
                            </h3>

                            <p className="mt-1 text-sm text-slate-500">
                                Please review your application before submitting.
                            </p>

                        </div>


                        {/* Personal Information */}

                        <div className="rounded-2xl border border-slate-200 p-5">

                            <div className="flex items-center justify-between">

                                <h4 className="font-bold text-slate-900">
                                    Personal Information
                                </h4>

                                <button
                                    type="button"
                                    onClick={() => setStep(1)}
                                    className="text-sm font-semibold text-[#00634b]"
                                >
                                    Edit
                                </button>

                            </div>

                            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">

                                <div>
                                    <p className="text-xs text-slate-400">
                                        Full Name
                                    </p>

                                    <p className="mt-1 text-sm font-semibold text-slate-800">
                                        {fullName || "Not provided"}
                                    </p>
                                </div>


                                <div>
                                    <p className="text-xs text-slate-400">
                                        Email
                                    </p>

                                    <p className="mt-1 text-sm font-semibold text-slate-800">
                                        {email || "Not provided"}
                                    </p>
                                </div>


                                <div>
                                    <p className="text-xs text-slate-400">
                                        Phone
                                    </p>

                                    <p className="mt-1 text-sm font-semibold text-slate-800">
                                        {phone || "Not provided"}
                                    </p>
                                </div>


                                <div>
                                    <p className="text-xs text-slate-400">
                                        Location
                                    </p>

                                    <p className="mt-1 text-sm font-semibold text-slate-800">
                                        {location || "Not provided"}
                                    </p>
                                </div>


                                <div>
                                    <p className="text-xs text-slate-400">
                                        Experience
                                    </p>

                                    <p className="mt-1 text-sm font-semibold text-slate-800">
                                        {experienceYears
                                            ? `${experienceYears} years`
                                            : "Not provided"}
                                    </p>
                                </div>


                                <div>
                                    <p className="text-xs text-slate-400">
                                        LinkedIn
                                    </p>

                                    <p className="mt-1 break-all text-sm font-semibold text-slate-800">
                                        {linkdin || "Not provided"}
                                    </p>
                                </div>

                            </div>

                        </div>


                        {/* Resume */}

                        <div className="mt-5 rounded-2xl border border-slate-200 p-5">

                            <div className="flex items-center justify-between">

                                <h4 className="font-bold text-slate-900">
                                    Resume & Documents
                                </h4>

                                <button
                                    type="button"
                                    onClick={() => setStep(2)}
                                    className="text-sm font-semibold text-[#00634b]"
                                >
                                    Edit
                                </button>

                            </div>

                            <div className="mt-4">

                                <p className="text-xs text-slate-400">
                                    Resume
                                </p>

                                <p className="mt-1 text-sm font-semibold text-slate-800">
                                    {resume
                                        ? resume.name
                                        : "No resume selected"}
                                </p>

                            </div>

                        </div>


                        {/* Additional Questions */}

                        <div className="mt-5 rounded-2xl border border-slate-200 p-5">

                            <div className="flex items-center justify-between">

                                <h4 className="font-bold text-slate-900">
                                    Additional Questions
                                </h4>

                                <button
                                    type="button"
                                    onClick={() => setStep(3)}
                                    className="text-sm font-semibold text-[#00634b]"
                                >
                                    Edit
                                </button>

                            </div>

                            <div className="mt-4 space-y-4">

                                <div>

                                    <p className="text-xs text-slate-400">
                                        Expected Salary
                                    </p>

                                    <p className="mt-1 text-sm font-semibold text-slate-800">
                                        {expectedSalary
                                            ? `${salaryCurrency} ${expectedSalary}`
                                            : "Not provided"}
                                    </p>

                                </div>


                                <div>

                                    <p className="text-xs text-slate-400">
                                        Remote Work
                                    </p>

                                    <p className="mt-1 text-sm font-semibold text-slate-800">
                                        {openToRemote ? "Yes" : "No"}
                                    </p>

                                </div>


                                <div>

                                    <p className="text-xs text-slate-400">
                                        Work Authorization
                                    </p>

                                    <p className="mt-1 text-sm font-semibold text-slate-800">
                                        {workAuthorized ? "Yes" : "No"}
                                    </p>

                                </div>


                                <div>

                                    <p className="text-xs text-slate-400">
                                        Sponsorship Required
                                    </p>

                                    <p className="mt-1 text-sm font-semibold text-slate-800">
                                        {requiresSponsorship ? "Yes" : "No"}
                                    </p>

                                </div>

                            </div>

                        </div>


                        {/* Submit */}

                        <div className="mt-8 flex items-center justify-between border-t border-slate-200 pt-5">

                            <button
                                type="button"
                                onClick={() => setStep(3)}
                                className="
                                    flex
                                    items-center
                                    gap-2
                                    rounded-xl
                                    border
                                    border-slate-300
                                    bg-white
                                    px-6
                                    py-3
                                    text-sm
                                    font-semibold
                                    text-slate-700
                                    transition
                                    hover:bg-slate-50
                                "
                            >
                                <ArrowLeft size={17} />
                                Back
                            </button>


                            <button
                                type="button"
                              onClick={handleSubmitApplication}
                                className="
                                    flex
                                    items-center
                                    gap-2
                                    rounded-xl
                                    bg-[#00634b]
                                    px-8
                                    py-3
                                    text-sm
                                    font-bold
                                    text-white
                                    shadow-[0_8px_20px_rgba(0,90,65,0.18)]
                                    transition
                                    hover:-translate-y-0.5
                                    hover:bg-[#074b3b]
                                "
                            >
                                Submit Application
                                <CheckCircle2 size={18} />
                            </button>

                        </div>

                    </div>

                )}

            </div>

        </div>
    </div>
)}        

                </section>

            </main>


            <Footer />

        </div>
    );

}

export default Jobs;