import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import { Link } from "react-router-dom";
import api from "../Service/Api";
import {
  ArrowLeft,
  Building2,
  MapPin,
  Users,
  CalendarDays,
  Globe,
  Pencil,
  Trash2,
  Plus,
  BriefcaseBusiness,
  Image,
  MoreHorizontal,
  ExternalLink,
  Eye,
  Settings,
  ShieldCheck,
  Mail,
  Phone,
 Link as LinkIcon,
  X,
  ImageIcon
} from "lucide-react";
import NavBar from "../component/NavBar";
import toast from "react-hot-toast";

const EmployerCompanyDetails = () => {

  // =========================
  // STATIC COMPANY DATA
  // =========================

 
  // =========================
  // STATIC COMPANY LIFE
  // =========================

 

  // =========================
  // STATIC JOBS
  // =========================


const { companyId } = useParams();
const navigate = useNavigate();
const[company,setCompany]=useState(null);

useEffect(() => {
  api.get("/company/my")
    .then((response) => {
      console.log("MY COMPANY:", response.data);
      setCompany(response.data[0] || null);
    })
    .catch((error) => {
      console.log("COMPANY API ERROR:", error);
    });
}, []);

const [companySizeValue, setCompanySizeValue] = useState("");
const companySize = (size) => {

  const companySizes = {
    MICRO_1_10: "1-100 employees",
    SMALL_11_49: "100-500 employees",
    MEDIUM_50_249: "500-2500 employees",
    LARGE_250_PLUS: "5000+ employees"
  };

  return companySizes[size] || "Not specified";
};
const[editCompany,setEditCompany]=useState(false);

const handleUpdateCompany = async (companyId, formData) => {

  if (!companyId) {
    toast.error("Company not found");
    return;
  }

  try {

    const response = await api.put(
      `/company/update/${companyId}`,
      formData
    );

    console.log("COMPANY UPDATED:", response.data);

    setCompany(response.data);

    setEditCompany(false);
    setCompanyInfo(false);
    toast.success("Company Updated Successfully");

  } catch (error) {

    console.log("API ERROR:", error);

    toast.error(
      error.response?.data?.message ||
      "Company update failed"
    );
  }
};

const handleSubmitCompanyUpdate = async (e) => {

  e.preventDefault();

  const formData = new FormData(e.currentTarget);

  await handleUpdateCompany( company.companyId, formData);
};

const[companyInfo ,setCompanyInfo]=useState(false);
const [createPostOpen, setCreatePostOpen] = useState(false);
const[companyPost,setCompanyPost]=useState([]);
const [postType, setPostType] = useState("");
const [image, setImage] = useState(null);
const [imagePreview, setImagePreview] = useState("");


const handleCreatePost = async (formData) => {

  try {

    const response = await api.post(
      "/company-posts",
      formData
    );


    console.log("POST CREATED:", response.data);

     setCompanyPost(
    Array.isArray(response.data) ? response.data : []
  );

    toast.success("Post Created Successfully");

    setCreatePostOpen(false);

  } catch (error) {

    console.log("POST CREATE ERROR:", error);

    toast.error(
      error.response?.data?.message ||
      "Post creation failed"
    );
  }
};

const handleSubmitPost = async (e) => {

  e.preventDefault();

  const formData = new FormData(e.currentTarget);

  if(editCompanyPostOpen && selectedPostId){

    await updateCompanyPost(selectedPostId,formData)
  }else{

    formData.append("companyId", company.companyId);
      await handleCreatePost(formData);
  }


};

useEffect(() => {
  if (!company?.companyId) return;

  api.get(`/company-posts/company/${company.companyId}`)
    .then((response) => {
      console.log("COMPANY POSTS:", response.data);

      setCompanyPost(
        Array.isArray(response.data) ? response.data : []
      );
    })
    .catch((error) => {
      console.log("API ERROR:", error);

      toast.error(
        error.response?.data?.message ||
        "Failed to load company posts"
      );
    });
}, [company?.companyId]);

const dateAgo = (date) => {

  const now = new Date();
  const postDate = new Date(date);

  const diff = Math.floor((now - postDate) / 1000);

  if (diff < 60) {
    return "Just now";
  }

  const minutes = Math.floor(diff / 60);

  if (minutes < 60) {
    return `${minutes} min ago`;
  }

  const hours = Math.floor(minutes / 60);

  if (hours < 24) {
    return `${hours} hours ago`;
  }

  const days = Math.floor(hours / 24);

  if (days < 30) {
    return `${days} days ago`;
  }

  const months = Math.floor(days / 30);

  if (months < 12) {
    return `${months} months ago`;
  }

  const years = Math.floor(months / 12);

  return `${years} years ago`;
};

const [lifePost,setLifePost]=useState([]);
const[lifePostOpen,setLifePostOpen]=useState(false);



const postLifeCompany = async (formData) => {

  if (!company?.companyId) {
    toast.error("Company not found");
    return;
  }

  try {

    const response = await api.post(
      `/company/${company.companyId}/life`,
      formData
    );

    console.log("LIFE CREATED:", response.data);

    toast.success("Company Life Added Successfully");

    setLifePost((prev) => [...prev, response.data]);

    setLifePostOpen(false);

    setImage(null);
    setImagePreview("");

  } catch (error) {

    console.log("API ERROR:", error);

    toast.error(
      error.response?.data?.message ||
      "Company Life creation failed"
    );
  }
};
const handleSubmitCompanyLifePost = async (e) => {

  e.preventDefault();

  const formData = new FormData(e.currentTarget);

  if (editCompanyLifeOpen && selectedLifeId) {

    await updateCompanyLifePost(
      selectedLifeId,
      formData
    );

  } else {

    await postLifeCompany(formData);

  }
};

useEffect(()=>{

   if (!company?.companyId) {
    return;
  }

  api.get(`/company/${company.companyId}/life`)
  .then((response)=>{

    console.log(response.data);
    setLifePost(response.data);
  }).catch((error)=>{

    console.log("API ERROR", error);

      toast.error( error.response?.data?.message || "Company Life creation failed");
  })
},[company])

const [deletes, setDeleteOpen] = useState(false);
const [selectedLifeId, setSelectedLifeId] = useState(null);

const deleteLifePost = async (companyId, lifeId) => {

  if (!companyId || !lifeId) {
    toast.error("Company or Life Post not found");
    return;
  }

  try {

    const response = await api.delete(
      `/company/${companyId}/life/${lifeId}`
    );

    console.log(response.data);

    // UI se deleted post hata do
    setLifePost((prev) =>
      prev.filter((life) => life.lifeId !== lifeId)
    );

    setDeleteOpen(false);
    setSelectedLifeId(null);

    toast.success("Company Life Deleted Successfully");

  } catch (error) {

    console.log("API ERROR:", error);

    toast.error(
      error.response?.data?.message ||
      "Company Life deletion failed"
    );
  }
};

const [selectedPostId, setSelectedPostId] = useState(null);
const [deleteType, setDeleteType] = useState("");

const deleteCompanyPost = async (postId) => {

  if (!postId) {
    toast.error("Post not found");
    return;
  }

  try {

    const response = await api.delete(
      `/company-posts/${postId}`
    );

    console.log(response.data);

    // UI se deleted post remove
    setCompanyPost((prev) =>
      prev.filter((post) => post.postId !== postId)
    );

    setDeleteOpen(false);
    setSelectedPostId(null);

    toast.success("Company Post Deleted Successfully");

  } catch (error) {

    console.log("API ERROR:", error);

    toast.error(
      error.response?.data?.message ||
      "Company Post deletion failed"
    );
  }
};

const [companyJobs, setCompanyJobs] = useState([]);
const[selectedJob,setSelectedJob]=useState(null);

useEffect(() => {

  api.get("/jobs/my")
    .then((response) => {

      console.log("MY JOBS:", response.data);

      setCompanyJobs(response.data.content || []);

    })
    .catch((error) => {

      console.log("API ERROR:", error);

      toast.error(
        error.response?.data?.message ||
        "Failed to load company jobs"
      );
    });

}, []);
const deleteJob = async (jobId) => {

  if (!jobId) {
    toast.error("Job not found");
    return;
  }

  try {

    const response = await api.delete(
      `/jobs/delete/${jobId}`
    );

    console.log(response.data);

    // UI se deleted job remove karo
    setCompanyJobs((prev) =>
      prev.filter((job) => job.jobId !== jobId)
    );

    toast.success("Job Deleted Successfully");

  } catch (error) {

    console.log("API ERROR:", error);

    toast.error(
      error.response?.data?.message ||
      "Failed to delete company job"
    );
  }
};

const coverInputRef = useRef(null);

const editCover = async (file) => {

  if (!company?.companyId || !file) {
    toast.error("Company or cover image not found");
    return;
  }

  try {

    const formData = new FormData();
    formData.append("cover", file);

    const response = await api.put(
      `/company/update/${company.companyId}`,
      formData
    );

    console.log("COVER UPDATED:", response.data);

    setCompany(response.data);

    toast.success("Cover Updated Successfully");

  } catch (error) {

    console.log("API ERROR:", error);

    toast.error(
      error.response?.data?.message ||
      "Failed to update cover"
    );
  }
};

const logoInputRef=useRef(null);

const editLogo = async (file) => {

  if (!company?.companyId || !file) {
    toast.error("Company or cover image not found");
    return;
  }

  try {

    const formData = new FormData();
    formData.append("logo", file);

    const response = await api.put(
      `/company/update/${company.companyId}`,
      formData
    );

    console.log("Logo UPDATED:", response.data);

    setCompany(response.data);

    toast.success("Logo Updated Successfully");

  } catch (error) {

    console.log("API ERROR:", error);

    toast.error(  error.response?.data?.message ||  "Failed to update cover");
  }
};

const[editJob,setEditJob]=useState(false);


const updateJob = async (jobId, data) => {

  if (!jobId) {
    toast.error("Job not found");
    return;
  }

  try {

    const response = await api.put(
      `/jobs/update/${jobId}`,
      data
    );

    console.log("JOB UPDATED:", response.data);

    setEditJob(false);
    setSelectedJob(null);

    const jobsResponse = await api.get("/jobs/my");

    setCompanyJobs(jobsResponse.data.content || []);

    toast.success("Job Updated Successfully");

  } catch (error) {

    console.log("API ERROR:", error);

    toast.error(
      error.response?.data?.message ||
      "Failed to update Job"
    );
  }
};


const handleSubmitJobUpdate = async (e) => {

  e.preventDefault();

  const formData = new FormData(e.currentTarget);

  const data = {
    title: formData.get("title"),
    description: formData.get("description"),
    responsibilities: formData.get("responsibilities"),
    requirements: formData.get("requirements"),
    qualifications: formData.get("qualifications"),
    benefits: formData.get("benefits"),

    categoryId: Number(formData.get("categoryId")),

    salaryMin: Number(formData.get("salaryMin")),
    salaryMax: Number(formData.get("salaryMax")),
    salaryCurrency: formData.get("salaryCurrency"),

    experienceMin: Number(formData.get("experienceMin")),
    experienceMax: Number(formData.get("experienceMax")),

    jobType: formData.get("jobType"),
    workMode: formData.get("workMode"),
    location: formData.get("location"),

    skills: formData.get("skills")
      .split(",")
      .map(skill => skill.trim())
      .filter(Boolean),

    vacancies: Number(formData.get("vacancies")),
    deadline: formData.get("deadline")
  };

  await updateJob(selectedJob.jobId, data);
};

const [editCompanyLifeOpen,setEditCompanyLifeOpen]=useState(false);
const [selectedLife, setSelectedLife] = useState(null);
const updateCompanyLifePost = async (lifeId, formData) => {

  if (!lifeId || !company?.companyId) {
    toast.error("Company Life not found");
    return;
  }

  try {

    const response = await api.put(
      `/company/${company.companyId}/life/${lifeId}`,
      formData
    );

    console.log("LIFE UPDATED:", response.data);

    const lifeResponse = await api.get(
      `/company/${company.companyId}/life`
    );

    setLifePost(lifeResponse.data);

    setEditCompanyLifeOpen(false);
    setSelectedLifeId(null);

    toast.success("Life Post Updated Successfully");

  } catch (error) {

    console.log("API ERROR:", error);

    toast.error(
      error.response?.data?.message ||
      "Failed to update Life Post"
    );
  }
};



const [editCompanyPostOpen,setEditCompanyPostOpen]=useState(false);
const [selectedPost, setSelectedPost] = useState(null);


const updateCompanyPost = async (postId, formData) => {

  if (!postId || !company?.companyId) {
    toast.error("Company post not found");
    return;
  }

  try {

    const response = await api.put(
      `/company-posts/update/${postId}`,
      formData
    );

    console.log("POST UPDATED:", response.data);

    setCompanyPost((prev) =>
      prev.map((post) =>
        post.postId === postId
          ? response.data
          : post
      )
    );

    setEditCompanyPostOpen(false);
    setSelectedPostId(null);
    setSelectedPost(null);

    toast.success("Company Post Updated Successfully");

  } catch (error) {

    console.log("API ERROR:", error);

    toast.error(
      error.response?.data?.message ||
      "Failed to update Company Post"
    );
  }
};



const [deleteCompanyZone, setDeleteCompanyZone] = useState(false);
const [continueDeleteZone, setContinueDeleteZone] = useState(false);

const [deleteCheck, setDeleteCheck] = useState(null);
const [deleteCheckLoading, setDeleteCheckLoading] = useState(false);

const handleDeleteCompanyClick = async () => {

  if (!company?.companyId) {
    toast.error("Company not found");
    return;
  }

  try {

    setDeleteCheckLoading(true);

    const response = await api.get(
      `/company/${company.companyId}/delete-check`
    );

    console.log("DELETE CHECK:", response.data);

    setDeleteCheck(response.data);

    setDeleteCompanyZone(true);

  } catch (error) {

    console.log("DELETE CHECK ERROR:", error);

    toast.error(
      error.response?.data?.message ||
      "Unable to check company deletion"
    );

  } finally {

    setDeleteCheckLoading(false);

  }
};
  return (

    <div className="min-h-screen bg-[#f4f2ee]">

      {/* =====================================================
          TOP NAVBAR
      ====================================================== */}
      <NavBar/>

      <div className="sticky top-0 z-40 border-b border-[#d9d9d9] bg-white">

        <div className="mx-auto flex max-w-[1180px] items-center justify-between px-6 py-3">

          <div className="flex items-center gap-3">

            <button
            onClick={()=>navigate("/employer/profile")}
              className="
                flex h-9 w-9 items-center justify-center
                rounded-full
                border border-[#d8dce0]
                text-[#555]
                hover:bg-[#f3f6f8]
              "
            >
              <ArrowLeft size={18} />
            </button>

            <div>
              <p className="text-[14px] font-semibold text-[#191919]">
                Company Management
              </p>

              <p className="text-[11px] text-[#6b7280]">
                Manage your company presence
              </p>
            </div>

          </div>

          <div className="flex items-center gap-2">

            <button
              className="
                flex items-center gap-2
                rounded-full
                border border-[#0a66c2]
                px-4 py-2
                text-[13px]
                font-semibold
                text-[#0a66c2]
                hover:bg-[#e8f3ff]
              "
            >
              <Eye size={16} />
              View Public Profile
            </button>

            <button
              className="
                flex items-center gap-2
                rounded-full
                bg-[#0a66c2]
                px-4 py-2
                text-[13px]
                font-semibold
                text-white
                hover:bg-[#004182]
              "
            >
              <Settings size={16} />
              Company Settings
            </button>

          </div>

        </div>

      </div>

      <main className="mx-auto max-w-[1180px] px-6 py-7">

        {/* =====================================================
            COMPANY HEADER
        ====================================================== */}

        <section className="overflow-hidden rounded-xl border border-[#d9d9d9] bg-white">

        
          {/* Cover */}
<div className="relative h-[270px] overflow-hidden">

  <img
    src={company?.coverUrl}
    alt="Company cover"
    className="h-full w-full object-cover"
  />

  <div className="absolute inset-0 bg-black/10" />

  {/* Edit Cover */}
  <button
    type="button"
    onClick={() => coverInputRef.current?.click()}
    className="
      absolute right-5 top-5
      flex items-center gap-2
      rounded-full
      bg-white
      px-4 py-2
      text-[12px]
      font-semibold
      text-[#333]
      shadow-sm
      hover:bg-[#f5f5f5]
      transition
    "
  >
    <Pencil size={14} />
    Edit Cover
  </button>

  {/* Hidden Input */}
  <input
    type="file"
    accept="image/*"
    ref={coverInputRef}
    className="hidden"
    onChange={(e) => {

      const file = e.target.files[0];

      if (file) {
        editCover(file);
      }

    }}
  />

</div>

          {/* Company Info */}
          <div className="relative px-7 pb-7">

            {/* Logo */}
            <button
            
              onClick={()=> logoInputRef.current?.click()}
              className="-mt-[65px] relative z-10 flex h-[130px] w-[130px] items-center justify-center overflow-hidden rounded-xl border-4 border-white bg-white shadow-md">

              <img
                src={company?.logoUrl}
                alt={company?.companyName}
                className="h-full w-full object-contain p-5"
              />

              <input 
              
              type="file"
              accept="image/*"
              ref={logoInputRef}
              className="hidden" 
              onChange={(e)=>{

                const file=e.target.files[0]
                if(file){
                  editLogo(file);
                }
              }}
              
              />

            </button>

            <div className="mt-5 flex items-start justify-between gap-8">

              <div>

                <div className="flex items-center gap-2">

                  <h1 className="text-[30px] font-bold text-[#191919]">
                    {company?.companyName}
                  </h1>

                  {company?.isVerified && (
                    <ShieldCheck
                      size={22}
                      className="fill-[#0a66c2] text-white"
                    />
                  )}

                </div>

                <p className="mt-1 text-[16px] text-[#555]">
                  {company?.about}
                </p>

                <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px] text-[#555]">

                  <span className="flex items-center gap-1.5">
                    <Building2 size={16} />
                    {company?.industry}
                  </span>

                  <span className="flex items-center gap-1.5">
                    <MapPin size={16} />
                    {company?.location}
                  </span>

                  <span className="flex items-center gap-1.5">
                    <Users size={16} />
                   {companySize(company?.companySize)}
                  </span>

                  <span className="flex items-center gap-1.5">
                    <CalendarDays size={16} />
                    Founded {company?.foundedYear}
                  </span>

                </div>

              </div>

              <button

              onClick={()=>setEditCompany(true)}
                className="
                  flex shrink-0 items-center gap-2
                  rounded-full
                  border border-[#0a66c2]
                  px-5 py-2.5
                  text-[13px]
                  font-semibold
                  text-[#0a66c2]
                  hover:bg-[#e8f3ff]
                "
              >
                <Pencil size={15} />
                Edit Company
              </button>

            </div>

          </div>

        </section>


        {/* =====================================================
            MAIN GRID
        ====================================================== */}

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_330px]">

          {/* =================================================
              LEFT
          ================================================== */}

          <div className="space-y-6">

            {/* =================================================
                COMPANY INFORMATION
            ================================================== */}

            <section className="rounded-xl border border-[#d9d9d9] bg-white">

              <div className="flex items-center justify-between border-b border-[#e5e7eb] px-6 py-5">

                <div>
                  <h2 className="text-[20px] font-semibold text-[#191919]">
                    Company Information
                  </h2>

                  <p className="mt-1 text-[12px] text-[#666]">
                    Manage the information candidates see about your company.
                  </p>
                </div>

                <button
                 type="button"
                onClick={()=>setCompanyInfo(true)}
                  className="
                    flex items-center gap-1.5
                    rounded-full
                    border border-[#0a66c2]
                    px-4 py-2
                    text-[12px]
                    font-semibold
                    text-[#0a66c2]
                    hover:bg-[#e8f3ff]
                  "
                >
                  <Pencil size={14} />
                  Edit
                </button>

              </div>

              <div className="grid grid-cols-1 gap-x-8 gap-y-6 px-6 py-6 sm:grid-cols-2">

                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-[#777]">
                    Company Name
                  </p>
                  <p className="mt-1 text-[14px] font-medium text-[#222]">
                    {company?.companyName}
                  </p>
                </div>

                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-[#777]">
                    Industry
                  </p>
                  <p className="mt-1 text-[14px] font-medium text-[#222]">
                    {company?.industry}
                  </p>
                </div>

                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-[#777]">
                    Location
                  </p>
                  <p className="mt-1 text-[14px] font-medium text-[#222]">
                    {company?.location}
                  </p>
                </div>

                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-[#777]">
                    Company Size
                  </p>
                  <p className="mt-1 text-[14px] font-medium text-[#222]">
                    {company?.companySize}
                  </p>
                </div>

                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-[#777]">
                    Founded
                  </p>
                  <p className="mt-1 text-[14px] font-medium text-[#222]">
                    {company?.foundedYear}
                  </p>
                </div>

                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-[#777]">
                    Contact Email
                  </p>
                  <p className="mt-1 text-[14px] font-medium text-[#222]">
                    {company?.contactEmail}
                  </p>
                </div>

                <div className="sm:col-span-2">

                  <p className="text-[11px] font-semibold uppercase tracking-wide text-[#777]">
                    About Company
                  </p>

                  <p className="mt-2 text-[14px] leading-6 text-[#444]">
                    {company?.about}
                  </p>

                </div>

              </div>

            </section>


            {/* =================================================
                COMPANY POSTS
            ================================================== */}

            <section className="rounded-xl border border-[#d9d9d9] bg-white">

              <div className="flex items-center justify-between border-b border-[#e5e7eb] px-6 py-5">

                <div>

                  <h2 className="text-[20px] font-semibold text-[#191919]">
                    Company Posts
                  </h2>

                  <p className="mt-1 text-[12px] text-[#666]">
                    Share announcements, updates and opportunities.
                  </p>

                </div>

                <button
                onClick={() => setCreatePostOpen(true)}
                  className="
                    flex items-center gap-1.5
                    rounded-full
                    bg-[#0a66c2]
                    px-4 py-2
                    text-[12px]
                    font-semibold
                    text-white
                    hover:bg-[#004182]
                  "
                >
                  <Plus size={15} />
                  Create Post
                </button>

              </div>


              <div className="divide-y divide-[#e5e7eb]">

                {companyPost.map((post) => (

                  <div
                    key={post.postId}
                    className="p-6"
                  >

                    <div className="flex items-start justify-between gap-4">

                      <div className="flex items-center gap-3">

                        <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#e0e0e0] bg-[#fafafa]">
                          <Building2 size={19} className="text-[#555]" />
                        </div>

                        <div>

                          <p className="text-[14px] font-semibold text-[#222]">
                            {company?.companyName}
                          </p>

                          <p className="text-[11px] text-[#777]">
                              {dateAgo(post.createdAt)}
                          </p>

                        </div>

                      </div>

                      <div className="flex items-center gap-1">

                        <button

                         onClick={() => {
    setSelectedPost(post);
    setSelectedPostId(post.postId);
    setEditCompanyPostOpen(true);
  }}
                          className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-[#f3f6f8]"
                        >
                          <Pencil size={15} className="text-[#555]" />
                        </button>

                        <button

                          onClick={() => {  setSelectedPostId(post.postId);  setDeleteType("post");  setDeleteOpen(true);}}
                          className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-red-50"
                        >
                          <Trash2 size={15} className="text-red-500" />
                        </button>

                        <button
                          className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-[#f3f6f8]"
                        >
                          <MoreHorizontal size={17} />
                        </button>

                      </div>

                    </div>


                    <div className="mt-4">

                      <div className="flex items-center gap-2">

                        <h3 className="text-[17px] font-semibold text-[#191919]">
                          {post.title}
                        </h3>

                        <span className="rounded-full bg-[#e8f3ff] px-2.5 py-1 text-[10px] font-semibold text-[#0a66c2]">
                          {post.postType}
                        </span>

                      </div>

                      <p className="mt-2 text-[14px] leading-6 text-[#444]">
                        {post.content}
                      </p>

                    </div>


                    <img
                      src={post.imageUrl}
                      alt={post.title}
                      className="mt-4 max-h-[320px] w-full rounded-xl border border-[#e2e5e8] object-cover"
                    />

                  </div>

                ))}

              </div>

            </section>


            {/* =================================================
                COMPANY LIFE
            ================================================== */}

            <section className="rounded-xl border border-[#d9d9d9] bg-white">

              <div className="flex items-center justify-between border-b border-[#e5e7eb] px-6 py-5">

                <div>

                  <h2 className="text-[20px] font-semibold text-[#191919]">
                    Company Life
                  </h2>

                  <p className="mt-1 text-[12px] text-[#666]">
                    Showcase your culture, workplace and team.
                  </p>

                </div>

                <button

                onClick={()=>setLifePostOpen(true)}
                  className="
                    flex items-center gap-1.5
                    rounded-full
                    bg-[#0a66c2]
                    px-4 py-2
                    text-[12px]
                    font-semibold
                    text-white
                    hover:bg-[#004182]
                  "
                >
                  <Plus size={15} />
                  Add Company Life
                </button>

              </div>


              <div className="grid grid-cols-1 gap-5 p-6 sm:grid-cols-2">


         {lifePost.length === 0 ? (

  <div className="flex min-h-[300px] w-full items-center justify-center px-6 py-12 ml-46">

    <div className="flex max-w-md flex-col items-center text-center ">

      <div className="mb-4 flex h-16 w-16 items-center
        justify-center rounded-2xl bg-blue-50 text-blue-600
        ring-8 ring-blue-50/50">
        <ImageIcon size={28} />
      </div>

      <h3 className="text-base font-bold text-slate-800">
        No company life posts yet
      </h3>

      <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
        Showcase your workplace, team and company culture by
        adding your first company life post.
      </p>

    </div>

  </div>

) : (

  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">

    {lifePost.map((life) => (

      <div
        key={life.lifeId}
        className="overflow-hidden rounded-xl border
          border-[#dfe3e8] bg-white transition
          hover:-translate-y-0.5 hover:shadow-md"
      >

        <div className="relative h-[180px]">

          <img
            src={life.imageUrl}
            alt={life.title}
            className="h-full w-full object-cover"
          />

          {/* Edit & Delete */}
          <div className="absolute right-3 top-3 flex gap-1">

            <button
              onClick={() => {
                setSelectedLifeId(life.lifeId);
                setSelectedLife(life);
                setEditCompanyLifeOpen(true);
              }}
              className="flex h-8 w-8 items-center justify-center
                rounded-full bg-white/95 shadow-sm hover:bg-white"
            >
              <Pencil size={14} />
            </button>

            <button
              onClick={() => {
                setSelectedLifeId(life.lifeId);
                setDeleteType("life");
                setDeleteOpen(true);
              }}
              className="flex h-8 w-8 items-center justify-center
                rounded-full bg-white/95 shadow-sm hover:bg-red-50"
            >
              <Trash2 size={14} className="text-red-500" />
            </button>

          </div>
        </div>

        <div className="p-4">

          <div className="flex items-center justify-between gap-3">
            <h3 className="text-[15px] font-semibold text-[#222]">
              {life.title}
            </h3>

            <span className="text-[10px] text-[#777]">
              #{life.displayOrder}
            </span>
          </div>

          <p className="mt-2 text-[12px] leading-5 text-[#666]">
            {life.description}
          </p>

        </div>

      </div>

    ))}

  </div>

)}
              </div>

            </section>


            {/* =================================================
                JOBS
            ================================================== */}

            <section className="rounded-xl border border-[#d9d9d9] bg-white">

              <div className="flex items-center justify-between border-b border-[#e5e7eb] px-6 py-5">

                <div>

                  <h2 className="text-[20px] font-semibold text-[#191919]">
                    Company Jobs
                  </h2>

                  <p className="mt-1 text-[12px] text-[#666]">
                    Manage the jobs published by your company.
                  </p>

                </div>

                <button

                 onClick={() => navigate("/employer/jobs/create")}
                  className="
                  
                    flex items-center gap-1.5
                    rounded-full
                    bg-[#0a66c2]
                    px-4 py-2
                    text-[12px]
                    font-semibold
                    text-white
                    hover:bg-[#004182]
                  "
                >
                  <Plus size={15} />
                  Post a Job
                </button>

              </div>


              <div className="divide-y divide-[#e5e7eb]">

                {companyJobs.slice(0,5).map((job) => (

                  <div
                    key={job.jobId}
                    className="flex items-center justify-between gap-5 px-6 py-5"
                  >

                    <div className="flex items-start gap-4">

                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-[#dfe3e8] bg-[#f7f9fa]">
                        <BriefcaseBusiness
                          size={20}
                          className="text-[#0a66c2]"
                        />
                      </div>

                      <div>

                        <h3 className="text-[15px] font-semibold text-[#222]">
                          {job.title}
                        </h3>

                        <div className="mt-1 flex flex-wrap items-center gap-3 text-[11px] text-[#666]">

                          <span className="flex items-center gap-1">
                            <MapPin size={13} />
                            {job.location}
                          </span>

                          <span>{job.jobType}</span>

                          <span>{job.experience}</span>

                          <span>
                          {job.applicationsCount} applicants
                          </span>

                        </div>

                       

                      </div>

                      

                    </div>

                    

                    <div className="flex items-center gap-1">

                      <button
                        className="
                          flex h-9 w-9 items-center justify-center
                          rounded-full
                          hover:bg-[#f3f6f8]
                        "
                      >
                        <Eye size={16} />
                      </button>

                      <button

                       onClick={()=>{

                        setSelectedJob(job);
                        setEditJob(true);
                       }}

                        className="
                          flex h-9 w-9 items-center justify-center
                          rounded-full
                          hover:bg-[#f3f6f8]
                        "
                      >
                        <Pencil size={16} />
                      </button>

                      <button

                      onClick={() => {
    setSelectedJob(job.jobId);
    setDeleteType("job");
    setDeleteOpen(true);
  }}
                        className="
                          flex h-9 w-9 items-center justify-center
                          rounded-full
                          hover:bg-red-50
                        "
                      >
                        <Trash2
                          size={16}
                          className="text-red-500"
                        />
                      </button>

                    </div>

                  </div>

                ))}

             
              </div>
                
                <hr className="border-[#e5e7eb]" />

<div className="px-6 py-4">
  <button
    type="button"
    onClick={() => navigate("/employer/jobs")}
    className="
      w-full
      rounded-lg
      border border-[#d9d9d9]
      bg-white
      py-2.5
      text-sm
      font-semibold
      text-[#0a66c2]
      transition
      hover:border-[#0a66c2]
      hover:bg-[#f3f6f8]
    "
  >
    Show More Jobs
  </button>
</div>

            </section>

          </div>


{editCompany && (
  <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-4">

    <div className="w-full max-w-[720px] max-h-[90vh] overflow-y-auto rounded-xl border border-[#d9d9d9] bg-white shadow-2xl">

      {/* Header */}
        <form onSubmit={handleSubmitCompanyUpdate}>

      <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[#e5e7eb] bg-white px-6 py-4">

        <div>
          <h2 className="text-[20px] font-semibold text-[#191919]">
            Edit Company
          </h2>

          <p className="mt-1 text-[12px] text-[#666]">
            Update your company information and public profile.
          </p>
        </div>

        <button
          onClick={() => setEditCompany(false)}
          className="
            flex h-9 w-9 items-center justify-center
            rounded-full
            text-[#666]
            hover:bg-[#f3f6f8]
          "
        >
          <X size={19} />
        </button>

      </div>


      {/* Form */}
      <div className="space-y-6 px-6 py-6">

        {/* Company Information */}
        <section>

          <div className="mb-4">
            <h3 className="text-[15px] font-semibold text-[#191919]">
              Company Information
            </h3>

            <p className="mt-1 text-[12px] text-[#777]">
              Basic information about your company.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

            {/* Company Name */}
            <div>
              <label className="mb-1.5 block text-[12px] font-semibold text-[#444]">
                Company Name
              </label>

              <input
                type="text"
                name="companyName"
                defaultValue={company?.companyName || ""}
                placeholder="Company name"
                className="
                  w-full rounded-lg
                  border border-[#d9dfe5]
                  px-3 py-2.5
                  text-[13px]
                  outline-none
                  focus:border-[#0a66c2]
                  focus:ring-1 focus:ring-[#0a66c2]
                "
              />
            </div>


            {/* Industry */}
            <div>
              <label className="mb-1.5 block text-[12px] font-semibold text-[#444]">
                Industry
              </label>

              <input
                type="text"
                  name="industry"
                defaultValue={company?.industry || ""}
                placeholder="e.g. Software, E-Commerce"
                className="
                  w-full rounded-lg
                  border border-[#d9dfe5]
                  px-3 py-2.5
                  text-[13px]
                  outline-none
                  focus:border-[#0a66c2]
                  focus:ring-1 focus:ring-[#0a66c2]
                "
              />
            </div>


            {/* Location */}
            <div>
              <label className="mb-1.5 block text-[12px] font-semibold text-[#444]">
                Location
              </label>

              <input
                type="text"
                name="location"
                defaultValue={company?.location || ""}
                placeholder="e.g. Delhi, India"
                className="
                  w-full rounded-lg
                  border border-[#d9dfe5]
                  px-3 py-2.5
                  text-[13px]
                  outline-none
                  focus:border-[#0a66c2]
                  focus:ring-1 focus:ring-[#0a66c2]
                "
              />
            </div>


            {/* Company Size */}
            <div>
              <label className="mb-1.5 block text-[12px] font-semibold text-[#444]">
                Company Size
              </label>

              <select
                
                name="companySize"
                defaultValue={company?.companySize || ""}
                className="
                  w-full rounded-lg
                  border border-[#d9dfe5]
                  bg-white
                  px-3 py-2.5
                  text-[13px]
                  outline-none
                  focus:border-[#0a66c2]
                  focus:ring-1 focus:ring-[#0a66c2]
                "
              >
                <option value="">Select company size</option>
                <option value="MICRO_1_10">1-100 employees</option>
                <option value="SMALL_11_49">100-500 employees</option>
                <option value="MEDIUM_50_249">500-2500 employees</option>
                <option value="LARGE_250_PLUS">5000+ employees</option>
              </select>
            </div>


            {/* Founded Year */}
            <div>
              <label className="mb-1.5 block text-[12px] font-semibold text-[#444]">
                Founded Year
              </label>

              <input
                type="number"
                name="foundedYear"
                defaultValue={company?.foundedYear || ""}
                placeholder="e.g. 1994"
                className="
                  w-full rounded-lg
                  border border-[#d9dfe5]
                  px-3 py-2.5
                  text-[13px]
                  outline-none
                  focus:border-[#0a66c2]
                  focus:ring-1 focus:ring-[#0a66c2]
                "
              />
            </div>


            {/* Registration Number */}
            <div>
              <label className="mb-1.5 block text-[12px] font-semibold text-[#444]">
                Registration Number
              </label>

              <input
                type="text"
                name="registrationNumber"
                defaultValue={company?.registrationNumber || ""}
                placeholder="Registration number"
                className="
                  w-full rounded-lg
                  border border-[#d9dfe5]
                  px-3 py-2.5
                  text-[13px]
                  outline-none
                  focus:border-[#0a66c2]
                  focus:ring-1 focus:ring-[#0a66c2]
                "
              />
            </div>

          </div>

        </section>


        {/* Description */}
        <section className="border-t border-[#e5e7eb] pt-6">

          <h3 className="mb-4 text-[15px] font-semibold text-[#191919]">
            About Company
          </h3>

          <textarea
            rows={4}
            name="about"
            defaultValue={company?.about || ""}
            placeholder="Tell candidates about your company..."
            className="
              w-full resize-none rounded-lg
              border border-[#d9dfe5]
              px-3 py-2.5
              text-[13px]
              outline-none
              focus:border-[#0a66c2]
              focus:ring-1 focus:ring-[#0a66c2]
            "
          />

        </section>


        {/* Contact */}
        <section className="border-t border-[#e5e7eb] pt-6">

          <h3 className="mb-4 text-[15px] font-semibold text-[#191919]">
            Contact Information
          </h3>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

            <div>
              <label className="mb-1.5 block text-[12px] font-semibold text-[#444]">
                Contact Email
              </label>

              <input
                type="email"
                name="contactEmail"
                defaultValue={company?.contactEmail || ""}
                placeholder="company@example.com"
                className="
                  w-full rounded-lg
                  border border-[#d9dfe5]
                  px-3 py-2.5
                  text-[13px]
                  outline-none
                  focus:border-[#0a66c2]
                  focus:ring-1 focus:ring-[#0a66c2]
                "
              />
            </div>


            <div>
              <label className="mb-1.5 block text-[12px] font-semibold text-[#444]">
                Contact Phone
              </label>

              <input
                type="text"
                name="contactPhone"
                defaultValue={company?.contactPhone || ""}
                placeholder="Phone number"
                className="
                  w-full rounded-lg
                  border border-[#d9dfe5]
                  px-3 py-2.5
                  text-[13px]
                  outline-none
                  focus:border-[#0a66c2]
                  focus:ring-1 focus:ring-[#0a66c2]
                "
              />
            </div>

          </div>

        </section>


        {/* Links */}
        <section className="border-t border-[#e5e7eb] pt-6">

          <h3 className="mb-4 text-[15px] font-semibold text-[#191919]">
            Company Links
          </h3>

          <div className="space-y-4">

            <div>
              <label className="mb-1.5 block text-[12px] font-semibold text-[#444]">
                Website
              </label>

              <input
            
                type="url"
                name="website"
                defaultValue={company?.website || ""}
                placeholder="https://example.com"
                className="
                  w-full rounded-lg
                  border border-[#d9dfe5]
                  px-3 py-2.5
                  text-[13px]
                  outline-none
                  focus:border-[#0a66c2]
                  focus:ring-1 focus:ring-[#0a66c2]
                "
              />
            </div>


            <div>
              <label className="mb-1.5 block text-[12px] font-semibold text-[#444]">
                LinkedIn
              </label>

              <input
                type="url"
                name="linkedinUrl"
                defaultValue={company?.linkedinUrl || ""}
                placeholder="https://linkedin.com/company/..."
                className="
                  w-full rounded-lg
                  border border-[#d9dfe5]
                  px-3 py-2.5
                  text-[13px]
                  outline-none
                  focus:border-[#0a66c2]
                  focus:ring-1 focus:ring-[#0a66c2]
                "
              />
            </div>

          </div>

        </section>


        {/* Images */}
        <section className="border-t border-[#e5e7eb] pt-6">

          <h3 className="mb-1 text-[15px] font-semibold text-[#191919]">
            Company Images
          </h3>

          <p className="mb-4 text-[12px] text-[#777]">
            Update your company logo and cover image.
          </p>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

            {/* Logo */}
            <div className="rounded-lg border border-[#e0e4e8] p-4">

              <p className="mb-3 text-[12px] font-semibold text-[#444]">
                Company Logo
              </p>

               <div className="flex items-center gap-4">

  {/* Logo */}
  <button
    type="button"
    onClick={() => logoInputRef.current?.click()}
    className="
      flex h-16 w-16
      items-center justify-center
      overflow-hidden
      rounded-lg
      border border-[#d9dfe5]
      bg-white
      hover:border-[#0a66c2]
      transition
    "
  >

    {company?.logoUrl ? (
      <img
        src={company.logoUrl}
        alt="Company logo"
        className="h-full w-full object-contain p-2"
      />
    ) : (
      <Building2
        size={25}
        className="text-[#777]"
      />
    )}

  </button>


  {/* Change Logo */}
  <button
    type="button"
    onClick={() => logoInputRef.current?.click()}
    className="
      rounded-lg
      border border-[#0a66c2]
      px-3 py-2
      text-[12px]
      font-semibold
      text-[#0a66c2]
      hover:bg-[#e8f3ff]
      transition
    "
  >
    Change Logo
  </button>


 
  <input
    type="file"
    accept="image/*"
    ref={logoInputRef}
    className="hidden"
    onChange={(e) => {

      const file = e.target.files?.[0];

      if (file) {
        editLogo(file);
      }
      e.target.value = "";

    }}
  />

</div>
            </div>


            {/* Cover */}
            <div className="rounded-lg border border-[#e0e4e8] p-4">

              <p className="mb-3 text-[12px] font-semibold text-[#444]">
                Cover Image
              </p>

                  {/* Cover */}

<button
  type="button"
  onClick={() => coverInputRef.current?.click()}
  className="
    relative
    h-20
    w-40
    overflow-hidden
    rounded-lg
    border border-[#d9dfe5]
    hover:border-[#0a66c2]
    transition
  "
>
  {company?.coverUrl ? (
    <img
      src={company.coverUrl}
      alt="Company cover"
      className="h-full w-full object-cover"
    />
  ) : (
    <div className="flex h-full items-center justify-center bg-[#f3f6f8] text-[11px] text-[#777]">
      No cover image
    </div>
  )}
</button>


{/* Change Cover */}

<button
  type="button"
  onClick={() => coverInputRef.current?.click()}
  className="
    ml-3
    mt-5
    rounded-lg
    border border-[#0a66c2]
    px-3 py-2
    text-[12px]
    font-semibold
    text-[#0a66c2]
    hover:bg-[#e8f3ff]
    transition
  "
>
  Change Cover
</button>


{/* Hidden File Input */}

<input
  type="file"
  accept="image/*"
  ref={coverInputRef}
  className="hidden"
  onChange={(e) => {

    const file = e.target.files?.[0];

    if (file) {
      editCover(file);
    }

    // Same image dobara select karne ke liye
    e.target.value = "";

  }}
/>

            </div>

          </div>

        </section>

      </div>


      {/* Footer */}
      <div className="sticky bottom-0 flex items-center justify-end gap-3 border-t border-[#e5e7eb] bg-white px-6 py-4">

        <button
          onClick={() => setEditCompany(false)}
          className="
            rounded-full
            border border-[#d0d5d9]
            bg-white
            px-5 py-2.5
            text-[13px]
            font-semibold
            text-[#333]
            hover:bg-[#f3f6f8]
          "
        >
          Cancel
        </button>

        <button
        type="submit"
          className="
            rounded-full
            bg-[#0a66c2]
            px-6 py-2.5
            text-[13px]
            font-semibold
            text-white
            hover:bg-[#004182]
          "
        >
          Save Changes
        </button>

        

      </div>
 </form>
    </div>

  </div>
)}

{companyInfo && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">

    <div className="w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl border border-gray-200 bg-white shadow-2xl">

      {/* Header */}
      <form  onSubmit={handleSubmitCompanyUpdate}>
      <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-200 bg-white px-6 py-5">

        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            Company Information
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Update the information candidates see about your company.
          </p>
        </div>

        <button
          onClick={() => setCompanyInfo(false)}
          className="flex h-9 w-9 items-center justify-center rounded-full
                     border border-gray-200 text-gray-500
                     hover:bg-gray-100 hover:text-gray-900 transition"
        >
          ✕
        </button>

      </div>


      {/* Body */}
      <div className="space-y-7 px-6 py-6">

        {/* Basic Information */}
        <section>

          <h3 className="mb-4 text-base font-semibold text-gray-900">
            Basic Information
          </h3>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

            {/* Company Name */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Company Name
              </label>

              <input
                type="text"
                name="companyName"
                defaultValue={company?.companyName || ""}
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5
                           text-sm outline-none
                           focus:border-[#0a66c2]
                           focus:ring-2 focus:ring-[#0a66c2]/10"
              />
            </div>


            {/* Industry */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Industry
              </label>

              <input
                type="text"
                name="industry"
                defaultValue={company?.industry || ""}
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5
                           text-sm outline-none
                           focus:border-[#0a66c2]
                           focus:ring-2 focus:ring-[#0a66c2]/10"
              />
            </div>


            {/* Location */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Location
              </label>

              <input
                type="text"
                name="location"
                defaultValue={company?.location || ""}
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5
                           text-sm outline-none
                           focus:border-[#0a66c2]
                           focus:ring-2 focus:ring-[#0a66c2]/10"
              />
            </div>


            {/* Company Size */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Company Size
              </label>

              <select
               name="companySize"
                defaultValue={company?.companySize || ""}
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5
                           text-sm outline-none bg-white
                           focus:border-[#0a66c2]
                           focus:ring-2 focus:ring-[#0a66c2]/10"
              >
                <option value="">Select company size</option>
                <option value="MICRO_1_10">1-100 employees</option>
                <option value="SMALL_11_49">100-500 employees</option>
                <option value="MEDIUM_50_249">500-2500 employees</option>
                <option value="LARGE_250_PLUS">5000+ employees</option>
              </select>
            </div>


            {/* Founded */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Founded Year
              </label>

              <input
                type="number"
                name="foundedYear"
                defaultValue={company?.foundedYear || ""}
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5
                           text-sm outline-none
                           focus:border-[#0a66c2]
                           focus:ring-2 focus:ring-[#0a66c2]/10"
              />
            </div>


            {/* Registration */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Registration Number
              </label>

              <input
                type="text"
                name="registrationNumber"
                defaultValue={company?.registrationNumber || ""}
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5
                           text-sm outline-none
                           focus:border-[#0a66c2]
                           focus:ring-2 focus:ring-[#0a66c2]/10"
              />
            </div>

          </div>

        </section>


        {/* Divider */}
        <div className="border-t border-gray-200" />


        {/* About */}
        <section>

          <h3 className="mb-4 text-base font-semibold text-gray-900">
            About Company
          </h3>

          <textarea
            rows={5}
            name="about"
            defaultValue={company?.about || ""}
            placeholder="Tell candidates about your company..."
            className="w-full resize-none rounded-lg border border-gray-300 px-3 py-3
                       text-sm outline-none
                       focus:border-[#0a66c2]
                       focus:ring-2 focus:ring-[#0a66c2]/10"
          />

        </section>


        {/* Divider */}
        <div className="border-t border-gray-200" />


        {/* Contact */}
        <section>

          <h3 className="mb-4 text-base font-semibold text-gray-900">
            Contact Information
          </h3>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Contact Email
              </label>

              <input
                type="email"
                name="contactEmail"
                defaultValue={company?.contactEmail || ""}
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5
                           text-sm outline-none
                           focus:border-[#0a66c2]
                           focus:ring-2 focus:ring-[#0a66c2]/10"
              />
            </div>


            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Contact Phone
              </label>

              <input
                type="text"
                name="contactPhone"
                defaultValue={company?.contactPhone || ""}
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5
                           text-sm outline-none
                           focus:border-[#0a66c2]
                           focus:ring-2 focus:ring-[#0a66c2]/10"
              />
            </div>

          </div>

        </section>


        {/* Divider */}
        <div className="border-t border-gray-200" />


        {/* Links */}
        <section>

          <h3 className="mb-4 text-base font-semibold text-gray-900">
            Company Links
          </h3>

          <div className="space-y-5">

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Website
              </label>

              <input
                type="url"
                name="website"
                defaultValue={company?.website || ""}
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5
                           text-sm outline-none
                           focus:border-[#0a66c2]
                           focus:ring-2 focus:ring-[#0a66c2]/10"
              />
            </div>


            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                LinkedIn
              </label>

              <input
                type="url"
                name="linkedinUrl"
                defaultValue={company?.linkedinUrl || ""}
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5
                           text-sm outline-none
                           focus:border-[#0a66c2]
                           focus:ring-2 focus:ring-[#0a66c2]/10"
              />
            </div>

          </div>

        </section>

      </div>


      {/* Footer */}
      <div className="sticky bottom-0 flex items-center justify-end gap-3
                      border-t border-gray-200 bg-white px-6 py-4">

        <button
          onClick={() => setCompanyInfo(false)}
          className="rounded-lg border border-gray-300 bg-white px-5 py-2.5
                     text-sm font-semibold text-gray-700
                     hover:bg-gray-50 transition"
        >
          Cancel
        </button>

        <button
        type="submit"
          className="rounded-lg bg-[#0a66c2] px-5 py-2.5
                     text-sm font-semibold text-white
                     hover:bg-[#004182] transition"
        >
          Save Changes
        </button>

      </div>

      </form>

    </div>
  </div>
)}
{createPostOpen && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4 py-6">

    <div className="w-full max-w-2xl max-h-[90vh] rounded-2xl border border-gray-200 bg-white shadow-2xl flex flex-col overflow-hidden">

      {/* ================= HEADER ================= */}
      <div className="flex items-center justify-between border-b border-gray-200 px-6 py-5 shrink-0">

        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            Create Post
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Share an update, announcement or opportunity.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setCreatePostOpen(false)}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-gray-500 transition hover:bg-gray-100 hover:text-gray-800"
        >
          ✕
        </button>

      </div>


      {/* ================= FORM ================= */}
      <form
        onSubmit={handleSubmitPost}
        className="flex flex-col flex-1 min-h-0"
      >

        {/* ================= SCROLLABLE BODY ================= */}
        <div className="flex-1 min-h-0 overflow-y-auto px-6 py-6">

          <div className="space-y-6">

            {/* ================= TITLE ================= */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Post Title
              </label>

              <input
                type="text"
                name="title"
                placeholder="e.g. We're Hiring Backend Developers 🚀"
                className="w-full rounded-lg border border-gray-300 px-3 py-3 outline-none transition focus:border-[#0a66c2] focus:ring-1 focus:ring-[#0a66c2]"
              />
            </div>


            {/* ================= CONTENT ================= */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Content
              </label>

              <textarea
                name="content"
                rows="5"
                placeholder="What do you want to share?"
                className="w-full resize-none rounded-lg border border-gray-300 px-3 py-3 outline-none transition focus:border-[#0a66c2] focus:ring-1 focus:ring-[#0a66c2]"
              />
            </div>


            {/* ================= POST TYPE ================= */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Post Type
              </label>

              <select
                name="postType"
                value={postType}
                onChange={(e) => setPostType(e.target.value)}
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-3 outline-none transition focus:border-[#0a66c2] focus:ring-1 focus:ring-[#0a66c2]"
              >
                <option value="">
                  Select Post Type
                </option>

                <option value="JOB">
                  Job
                </option>

                <option value="ANNOUNCEMENT">
                  Announcement
                </option>

                <option value="COMPANY_UPDATE">
                  Company Update
                </option>

                <option value="ADVERTISEMENT">
                  Advertisement
                </option>
              </select>


              {/* ================= JOB ID ================= */}
              {postType === "JOB" && (
                <div className="mt-3">

                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Job ID
                  </label>

                  <input
                    type="number"
                    name="jobId"
                    placeholder="Enter Job ID"
                    className="w-full rounded-lg border border-gray-300 px-3 py-3 outline-none transition focus:border-[#0a66c2] focus:ring-1 focus:ring-[#0a66c2]"
                  />

                </div>
              )}

            </div>


            {/* ================= IMAGE ================= */}
            <div>

              <label className="mb-2 block text-sm font-medium text-gray-700">
                Image
              </label>

              <input
                type="file"
                name="image"
                accept="image/*"
                className="
                  w-full
                  rounded-lg
                  border
                  border-gray-200
                  bg-gray-50
                  p-2
                  text-sm
                  text-gray-500
                  cursor-pointer

                  file:mr-4
                  file:rounded-lg
                  file:border-0
                  file:bg-gray-200
                  file:px-4
                  file:py-2
                  file:text-sm
                  file:font-medium
                  file:text-gray-700

                  hover:file:bg-gray-300
                "
                onChange={(e) => {

                  const file = e.target.files[0];

                  if (file) {
                    setImage(file);
                    setImagePreview(
                      URL.createObjectURL(file)
                    );
                  }

                }}
              />


              {/* ================= IMAGE PREVIEW ================= */}
              {imagePreview && (
                <div className="mt-4 w-full overflow-hidden rounded-xl border border-gray-200 bg-gray-100">

                  <img
                    src={imagePreview}
                    alt="Post preview"
                    className="block max-h-64 w-full object-contain"
                  />

                </div>
              )}

            </div>

          </div>

        </div>


        {/* ================= FOOTER ================= */}
        <div className="flex shrink-0 justify-end gap-3 border-t border-gray-200 bg-white px-6 py-4">

          <button
            type="button"
            onClick={() => setCreatePostOpen(false)}
            className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
          >
            Cancel
          </button>


          <button
            type="submit"
            className="rounded-lg bg-[#0a66c2] px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-[#004182]"
          >
            Post
          </button>

        </div>

      </form>

    </div>

  </div>
)}    

{lifePostOpen && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">

    <div className="w-full max-w-2xl max-h-[90vh] rounded-2xl border border-[#d9d9d9] bg-white shadow-2xl flex flex-col overflow-hidden">

      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#e5e7eb] px-6 py-5">

        <div>
          <h2 className="text-xl font-semibold text-[#191919]">
            Add Company Life
          </h2>

          <p className="mt-1 text-sm text-[#666]">
            Share your company culture, workplace and life.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setLifePostOpen(false)}
          className="
            flex h-9 w-9 items-center justify-center
            rounded-full
            border border-[#d9d9d9]
            text-[#666]
            hover:bg-[#f3f6f8]
            hover:text-[#191919]
          "
        >
          ✕
        </button>

      </div>


      {/* Form */}
      <form
        onSubmit={handleSubmitCompanyLifePost}
        className="flex min-h-0 flex-1 flex-col"
      >

        {/* Scrollable Body */}
        <div className="flex-1 space-y-5 overflow-y-auto px-6 py-6">

          {/* Title */}
          <div>

            <label className="mb-2 block text-sm font-medium text-[#333]">
              Title
            </label>

            <input
              type="text"
              name="title"
              placeholder="e.g. Life at Amazon"
              className="
                w-full
                rounded-lg
                border border-[#d9d9d9]
                px-3 py-2.5
                text-sm
                text-[#191919]
                outline-none
                transition
                focus:border-[#0a66c2]
                focus:ring-1
                focus:ring-[#0a66c2]
              "
             
            />
           

          </div>


          {/* Description */}
          <div>

            <label className="mb-2 block text-sm font-medium text-[#333]">
              Description
            </label>

            <textarea
              name="description"
              rows="5"
              placeholder="Tell candidates about your company culture, workplace or employee experience..."
              className="
                w-full
                resize-none
                rounded-lg
                border border-[#d9d9d9]
                px-3 py-3
                text-sm
                text-[#191919]
                outline-none
                transition
                focus:border-[#0a66c2]
                focus:ring-1
                focus:ring-[#0a66c2]
              "
            />

          </div>


          {/* Display Order */}
          <div>

            <label className="mb-2 block text-sm font-medium text-[#333]">
              Display Order
            </label>

            <input
              type="number"
              name="displayOrder"
              min="0"
              placeholder="e.g. 1"
              className="
                w-full
                rounded-lg
                border border-[#d9d9d9]
                px-3 py-2.5
                text-sm
                text-[#191919]
                outline-none
                focus:border-[#0a66c2]
                focus:ring-1
                focus:ring-[#0a66c2]
              "
            />

            <p className="mt-1.5 text-xs text-[#777]">
              Lower numbers will appear first.
            </p>

          </div>


          {/* Image */}
          <div>

            <label className="mb-2 block text-sm font-medium text-[#333]">
              Company Life Image
            </label>

            <input
              type="file"
              name="image"
              accept="image/*"
              className="
                w-full
                rounded-lg
                border border-[#d9d9d9]
                bg-white
                px-3 py-2
                text-sm
                text-[#666]
                file:mr-4
                file:rounded-lg
                file:border-0
                file:bg-[#f3f6f8]
                file:px-4
                file:py-2
                file:text-sm
                file:font-medium
                file:text-[#333]
                hover:file:bg-[#e8eef3]
              "

               onChange={(e)=>{

                const file= e.target.files[0];

                if(file){

                  setImage(file);
                  setImagePreview(URL.createObjectURL(file))
                }
              }}
            />

            {imagePreview && (
  <div className="mt-4 overflow-hidden rounded-xl border border-[#e2e5e8] bg-[#f8f9fa]">
    <img
      src={imagePreview}
      alt="Company life preview"
      className="h-48 w-full object-cover"
    />
  </div>
)}

            <p className="mt-1.5 text-xs text-[#777]">
              Upload an image showing your workplace or company culture.
            </p>

          </div>

        </div>


        {/* Footer */}
        <div className="flex justify-end gap-3 border-t border-[#e5e7eb] bg-white px-6 py-4">

          <button
            type="button"
            onClick={() => setLifePostOpen(false)}
            className="
              rounded-lg
              border border-[#d9d9d9]
              px-5 py-2.5
              text-sm
              font-semibold
              text-[#555]
              hover:bg-[#f3f6f8]
            "
          >
            Cancel
          </button>

          <button
            type="submit"
            className="
              rounded-lg
              bg-[#0a66c2]
              px-5 py-2.5
              text-sm
              font-semibold
              text-white
              hover:bg-[#004182]
            "
          >
            Add Life
          </button>

        </div>

      </form>

    </div>

  </div>
)}


{deletes && (
  <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">

    <div className="w-full max-w-md rounded-2xl border border-[#e5e7eb] bg-white shadow-2xl">

      {/* Header */}
      <div className="border-b border-[#e5e7eb] px-6 py-5">

     <h2 className="text-lg font-semibold text-[#191919]">
  Delete Company{" "}
  {deleteType === "post"
    ? "Post"
    : deleteType === "life"
    ? "Life"
    : "Job"}?
</h2>

<p className="mt-1 text-sm text-[#666]">
  Are you sure you want to delete this company{" "}
  {deleteType === "post"
    ? "post"
    : deleteType === "life"
    ? "life post"
    : "job"}?
  This action cannot be undone.
</p>

      </div>

      {/* Footer */}
      <div className="flex justify-end gap-3 px-6 py-4">

        {/* No */}
        <button
          type="button"
          onClick={() => {
            setDeleteOpen(false);
            setSelectedLifeId(null);
            setSelectedJob(null);
             setDeleteType("");
             setSelectedPostId(null);
          }}
          className="
            rounded-lg
            border border-[#d9d9d9]
            px-5 py-2.5
            text-sm font-semibold
            text-[#555]
            hover:bg-[#f3f6f8]
          "
        >
          No
        </button>

        {/* Yes */}
        <button
          type="button"
         onClick={() => {

    if (deleteType === "post") {
      deleteCompanyPost(selectedPostId);
    }

    if (deleteType === "life") {
      deleteLifePost(
        company.companyId,
        selectedLifeId
      );
    }

    if(deleteType==="job"){
      deleteJob(selectedJob);
    }

  }}
          className="
            rounded-lg
            bg-red-500
            px-5 py-2.5
            text-sm font-semibold
            text-white
            hover:bg-red-600
          "
        >
          Yes, Delete
        </button>

      </div>

    </div>

  </div>
)}

{editJob && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">

    <div className="w-full max-w-3xl max-h-[90vh] overflow-hidden rounded-2xl border border-[#d9d9d9] bg-white shadow-2xl">

      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#e5e7eb] px-6 py-5">

        <div>
          <h2 className="text-xl font-semibold text-[#191919]">
            Edit Job
          </h2>

          <p className="mt-1 text-sm text-[#666]">
            Update your job details and requirements.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setEditJob(false);
            setSelectedJob(null);
          }}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-[#d9d9d9] text-[#666] hover:bg-[#f3f6f8]"
        >
          ✕
        </button>

      </div>


      <form
        onSubmit={handleSubmitJobUpdate}
        className="flex max-h-[calc(90vh-80px)] flex-col"
      >

        <div className="flex-1 space-y-5 overflow-y-auto px-6 py-6">

          {/* Title */}
          <div>
            <label className="mb-2 block text-sm font-medium text-[#333]">
              Job Title
            </label>

            <input
              type="text"
              name="title"
             defaultValue={selectedJob?.title || ""}
              className="w-full rounded-lg border border-[#d9d9d9] px-3 py-2.5 outline-none focus:border-[#0a66c2]"
            />
          </div>


          {/* Description */}
          <div>
            <label className="mb-2 block text-sm font-medium text-[#333]">
              Description
            </label>

            <textarea
              name="description"
              rows="5"
            defaultValue={selectedJob?.description || ""}
              className="w-full resize-none rounded-lg border border-[#d9d9d9] px-3 py-3 outline-none focus:border-[#0a66c2]"
            />
          </div>


          {/* Responsibilities */}
          <div>
            <label className="mb-2 block text-sm font-medium text-[#333]">
              Responsibilities
            </label>

            <textarea
              name="responsibilities"
              rows="4"
            defaultValue={selectedJob?.responsibilities}
              className="w-full resize-none rounded-lg border border-[#d9d9d9] px-3 py-3 outline-none focus:border-[#0a66c2]"
            />
          </div>


          {/* Requirements */}
          <div>
            <label className="mb-2 block text-sm font-medium text-[#333]">
              Requirements
            </label>

            <textarea
              name="requirements"
              rows="4"
              defaultValue={selectedJob?.requirements}
              className="w-full resize-none rounded-lg border border-[#d9d9d9] px-3 py-3 outline-none focus:border-[#0a66c2]"
            />
          </div>


          {/* Qualifications */}
          <div>
            <label className="mb-2 block text-sm font-medium text-[#333]">
              Qualifications
            </label>

            <textarea
              name="qualifications"
              rows="3"
             defaultValue={selectedJob?.qualifications}
              className="w-full resize-none rounded-lg border border-[#d9d9d9] px-3 py-3 outline-none focus:border-[#0a66c2]"
            />
          </div>


          {/* Benefits */}
          <div>
            <label className="mb-2 block text-sm font-medium text-[#333]">
              Benefits
            </label>

            <textarea
              name="benefits"
              rows="3"
             defaultValue={selectedJob?.benefits}
              className="w-full resize-none rounded-lg border border-[#d9d9d9] px-3 py-3 outline-none focus:border-[#0a66c2]"
            />
          </div>


          {/* Category */}
          <div>
            <label className="mb-2 block text-sm font-medium text-[#333]">
              Category
            </label>

            <input
              type="number"
              name="categoryId"
              defaultValue={selectedJob.categoryId}
              className="w-full rounded-lg border border-[#d9d9d9] px-3 py-2.5 outline-none focus:border-[#0a66c2]"
            />
          </div>


          {/* Location */}
          <div>
            <label className="mb-2 block text-sm font-medium text-[#333]">
              Location
            </label>

            <input
              type="text"
              name="location"
            defaultValue={selectedJob?.ocation}
              className="w-full rounded-lg border border-[#d9d9d9] px-3 py-2.5 outline-none focus:border-[#0a66c2]"
            />
          </div>


          {/* Job Type + Work Mode */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

            <div>
              <label className="mb-2 block text-sm font-medium text-[#333]">
                Job Type
              </label>

              <select
                name="jobType"
               defaultValue={selectedJob?.jobType}
                className="w-full rounded-lg border border-[#d9d9d9] bg-white px-3 py-2.5 outline-none focus:border-[#0a66c2]"
              >
                <option value="">Select Job Type</option>
                <option value="FULL_TIME">Full Time</option>
                <option value="PART_TIME">Part Time</option>
                <option value="CONTRACT">Contract</option>
                <option value="INTERNSHIP">Internship</option>
              </select>
            </div>


            <div>
              <label className="mb-2 block text-sm font-medium text-[#333]">
                Work Mode
              </label>

              <select
                name="workMode"
              defaultValue={selectedJob?.workMode}
                className="w-full rounded-lg border border-[#d9d9d9] bg-white px-3 py-2.5 outline-none focus:border-[#0a66c2]"
              >
                <option value="">Select Work Mode</option>
                <option value="ONSITE">Onsite</option>
                <option value="REMOTE">Remote</option>
                <option value="HYBRID">Hybrid</option>
              </select>
            </div>

          </div>


          {/* Salary */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

            <div>
              <label className="mb-2 block text-sm font-medium text-[#333]">
                Minimum Salary
              </label>

              <input
                type="number"
                name="salaryMin"
                defaultValue={selectedJob?.salaryMin}
                className="w-full rounded-lg border border-[#d9d9d9] px-3 py-2.5 outline-none focus:border-[#0a66c2]"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-[#333]">
                Maximum Salary
              </label>

              <input
                type="number"
                name="salaryMax"
               defaultValue={selectedJob?.salaryMax}
                className="w-full rounded-lg border border-[#d9d9d9] px-3 py-2.5 outline-none focus:border-[#0a66c2]"
              />
            </div>

          </div>


          {/* Currency */}
          <div>
            <label className="mb-2 block text-sm font-medium text-[#333]">
              Salary Currency
            </label>

            <input
              type="text"
              name="salaryCurrency"
              defaultValue={selectedJob?.salaryCurrency}
              placeholder="e.g. INR"
              className="w-full rounded-lg border border-[#d9d9d9] px-3 py-2.5 outline-none focus:border-[#0a66c2]"
            />
          </div>


          {/* Experience */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

            <div>
              <label className="mb-2 block text-sm font-medium text-[#333]">
                Minimum Experience
              </label>

              <input
                type="number"
                name="experienceMin"
                min="0"
                defaultValue={selectedJob?.experienceMin}
                className="w-full rounded-lg border border-[#d9d9d9] px-3 py-2.5 outline-none focus:border-[#0a66c2]"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-[#333]">
                Maximum Experience
              </label>

              <input
                type="number"
                name="experienceMax"
                min="0"
                 defaultValue={selectedJob?.experienceMax}
                className="w-full rounded-lg border border-[#d9d9d9] px-3 py-2.5 outline-none focus:border-[#0a66c2]"
              />
            </div>

          </div>


          {/* Skills */}
          <div>
            <label className="mb-2 block text-sm font-medium text-[#333]">
              Skills
            </label>

            <input
              type="text"
              name="skills"
              defaultValue={selectedJob?.skills?.join(", ") || ""}
              placeholder="Java, Spring Boot, Docker, Kafka"
              className="w-full rounded-lg border border-[#d9d9d9] px-3 py-2.5 outline-none focus:border-[#0a66c2]"
            />

            <p className="mt-1 text-xs text-[#777]">
              Separate skills using commas.
            </p>
          </div>


          {/* Vacancies */}
          <div>
            <label className="mb-2 block text-sm font-medium text-[#333]">
              Vacancies
            </label>

            <input
              type="number"
              name="vacancies"
              min="1"
             defaultValue={selectedJob?.vacancies}
              className="w-full rounded-lg border border-[#d9d9d9] px-3 py-2.5 outline-none focus:border-[#0a66c2]"
            />
          </div>


          {/* Deadline */}
          <div>
            <label className="mb-2 block text-sm font-medium text-[#333]">
              Application Deadline
            </label>

            <input
              type="date"
              name="deadline"
              defaultValue={selectedJob?.deadline}
              className="w-full rounded-lg border border-[#d9d9d9] px-3 py-2.5 outline-none focus:border-[#0a66c2]"
            />
          </div>

        </div>


        {/* Footer */}
        <div className="flex justify-end gap-3 border-t border-[#e5e7eb] bg-white px-6 py-4">

          <button
            type="button"
            onClick={() => {
              setEditJob(false);
              setSelectedJob(null);
            }}
            className="rounded-lg border border-[#d9d9d9] px-5 py-2.5 text-sm font-semibold text-[#555] hover:bg-[#f3f6f8]"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="rounded-lg bg-[#0a66c2] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#004182]"
          >
            Save Changes
          </button>

        </div>

      </form>

    </div>
  </div>
)}


{editCompanyLifeOpen && selectedLifeId && (

  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">

    <div className="
      w-full max-w-2xl
      max-h-[90vh]
      overflow-hidden
      rounded-2xl
      border border-[#d9dfe5]
      bg-white
      shadow-2xl
      flex flex-col
    ">

      {/* Header */}
      <div className="
        flex items-center justify-between
        border-b border-[#e5e7eb]
        px-6 py-5
      ">

        <div>
          <h2 className="text-xl font-semibold text-[#191919]">
            Edit Company Life
          </h2>

          <p className="mt-1 text-sm text-[#666]">
            Update your company culture and workplace information.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setEditCompanyLifeOpen(false);
            setSelectedLifeId(null);
          }}
          className="
            flex h-9 w-9 items-center justify-center
            rounded-full
            border border-[#d9dfe5]
            text-[#666]
            hover:bg-[#f3f6f8]
            hover:text-[#191919]
          "
        >
          ✕
        </button>

      </div>


      {/* Form */}
      <form
        onSubmit={handleSubmitCompanyLifePost}
        className="flex min-h-0 flex-1 flex-col"
      >

        {/* Body */}
        <div className="flex-1 space-y-5 overflow-y-auto px-6 py-6">

          {/* Title */}
          <div>

            <label className="mb-2 block text-sm font-medium text-[#333]">
              Title
            </label>

            <input
              type="text"
              name="title"
              defaultValue={selectedLife?.title || ""}
              placeholder="e.g. Life at Amazon"
              className="
                w-full
                rounded-lg
                border border-[#d9dfe5]
                px-3 py-2.5
                text-sm
                text-[#191919]
                outline-none
                transition
                focus:border-[#0a66c2]
                focus:ring-1
                focus:ring-[#0a66c2]
              "
            />

          </div>


          {/* Description */}
          <div>

            <label className="mb-2 block text-sm font-medium text-[#333]">
              Description
            </label>

            <textarea
              name="description"
              rows="5"
              defaultValue={selectedLife?.description || ""}
              placeholder="Tell candidates about your company culture..."
              className="
                w-full
                resize-none
                rounded-lg
                border border-[#d9dfe5]
                px-3 py-3
                text-sm
                text-[#191919]
                outline-none
                transition
                focus:border-[#0a66c2]
                focus:ring-1
                focus:ring-[#0a66c2]
              "
            />

          </div>


          {/* Display Order */}
          <div>

            <label className="mb-2 block text-sm font-medium text-[#333]">
              Display Order
            </label>

            <input
              type="number"
              name="displayOrder"
              min="0"
              defaultValue={selectedLife?.displayOrder ?? 0}
              className="
                w-full
                rounded-lg
                border border-[#d9dfe5]
                px-3 py-2.5
                text-sm
                text-[#191919]
                outline-none
                focus:border-[#0a66c2]
                focus:ring-1
                focus:ring-[#0a66c2]
              "
            />

            <p className="mt-1.5 text-xs text-[#777]">
              Lower numbers will appear first.
            </p>

          </div>


          {/* Image */}
          <div>

            <label className="mb-2 block text-sm font-medium text-[#333]">
              Company Life Image
            </label>

            <input
              type="file"
              name="image"
              accept="image/*"
              className="
                w-full
                rounded-lg
                border border-[#d9dfe5]
                bg-white
                px-3 py-2
                text-sm
                text-[#666]
                file:mr-4
                file:rounded-lg
                file:border-0
                file:bg-[#f3f6f8]
                file:px-4
                file:py-2
                file:text-sm
                file:font-medium
                file:text-[#333]
                hover:file:bg-[#e8eef3]
              "

                 onChange={(e)=>{

                const file= e.target.files[0];

                if(file){

                  setImage(file);
                  setImagePreview(URL.createObjectURL(file))
                }
              }}
            />

 {imagePreview && (
  <div className="mt-4 overflow-hidden rounded-xl border border-[#e2e5e8] bg-[#f8f9fa]">
    <img
      src={imagePreview}
      alt="Company life preview"
      className="h-48 w-full object-cover"
    />
  </div>
)}
            

            <p className="mt-1.5 text-xs text-[#777]">
              Leave empty to keep the existing image.
            </p>

          </div>

        </div>


        {/* Footer */}
        <div className="
          flex justify-end gap-3
          border-t border-[#e5e7eb]
          bg-white
          px-6 py-4
        ">

          <button
            type="button"
            onClick={() => {
              setEditCompanyLifeOpen(false);
              setSelectedLifeId(null);
            }}
            className="
              rounded-lg
              border border-[#d9dfe5]
              px-5 py-2.5
              text-sm font-semibold
              text-[#555]
              hover:bg-[#f3f6f8]
            "
          >
            Cancel
          </button>

          <button
            type="submit"
            className="
              rounded-lg
              bg-[#0a66c2]
              px-5 py-2.5
              text-sm font-semibold
              text-white
              hover:bg-[#004182]
            "
          >
            Save Changes
          </button>

        </div>

      </form>

    </div>

  </div>
)}

{editCompanyPostOpen && selectedPostId && (

  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">

    <div className="
      w-full max-w-2xl
      max-h-[90vh]
      overflow-hidden
      rounded-2xl
      border border-[#d9dfe5]
      bg-white
      shadow-2xl
      flex flex-col
    ">

      {/* Header */}
      <div className="
        flex items-center justify-between
        border-b border-[#e5e7eb]
        px-6 py-5
      ">

        <div>
          <h2 className="text-xl font-semibold text-[#191919]">
            Edit Company Post
          </h2>

          <p className="mt-1 text-sm text-[#666]">
            Update your company announcement or opportunity.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setEditCompanyPostOpen(false);
            setSelectedPostId(null);
            setSelectedPost(null);
          }}
          className="
            flex h-9 w-9 items-center justify-center
            rounded-full
            border border-[#d9dfe5]
            text-[#666]
            hover:bg-[#f3f6f8]
            hover:text-[#191919]
          "
        >
          ✕
        </button>

      </div>


      {/* Form */}
      <form
        onSubmit={handleSubmitPost}
        className="flex min-h-0 flex-1 flex-col"
      >

        {/* Body */}
        <div className="
          flex-1
          space-y-5
          overflow-y-auto
          px-6 py-6
        ">

          {/* Title */}
          <div>

            <label className="mb-2 block text-sm font-medium text-[#333]">
              Post Title
            </label>

            <input
              type="text"
              name="title"
              defaultValue={selectedPost?.title || ""}
              placeholder="e.g. We're Hiring Backend Developers"
              className="
                w-full
                rounded-lg
                border border-[#d9dfe5]
                px-3 py-2.5
                text-sm
                text-[#191919]
                outline-none
                transition
                focus:border-[#0a66c2]
                focus:ring-1
                focus:ring-[#0a66c2]
              "
            />

          </div>


          {/* Content */}
          <div>

            <label className="mb-2 block text-sm font-medium text-[#333]">
              Content
            </label>

            <textarea
              name="content"
              rows="6"
              defaultValue={selectedPost?.content || ""}
              placeholder="Write something about your company..."
              className="
                w-full
                resize-none
                rounded-lg
                border border-[#d9dfe5]
                px-3 py-3
                text-sm
                leading-6
                text-[#191919]
                outline-none
                transition
                focus:border-[#0a66c2]
                focus:ring-1
                focus:ring-[#0a66c2]
              "
            />

          </div>


          {/* Post Type */}
          <div>

            <label className="mb-2 block text-sm font-medium text-[#333]">
              Post Type
            </label>

            <select
              name="postType"
              defaultValue={selectedPost?.postType || ""}
              className="
                w-full
                rounded-lg
                border border-[#d9dfe5]
                bg-white
                px-3 py-2.5
                text-sm
                text-[#191919]
                outline-none
                focus:border-[#0a66c2]
                focus:ring-1
                focus:ring-[#0a66c2]
              "
            >

              <option value="" disabled>
                Select post type
              </option>

              <option value="ANNOUNCEMENT">
                Announcement
              </option>

              <option value="COMPANY_UPDATE">
                Company Update
              </option>

              <option value="HIRING">
                Hiring
              </option>

              <option value="EVENT">
                Event
              </option>

              <option value="ACHIEVEMENT">
                Achievement
              </option>

            </select>

          </div>


          {/* Job ID */}
          <div>

            <label className="mb-2 block text-sm font-medium text-[#333]">
              Job ID
              <span className="ml-1 text-xs font-normal text-[#777]">
                (Optional)
              </span>
            </label>

            <input
              type="number"
              name="jobId"
              defaultValue={selectedPost?.jobId || ""}
              placeholder="Enter job ID if this post is related to a job"
              className="
                w-full
                rounded-lg
                border border-[#d9dfe5]
                px-3 py-2.5
                text-sm
                text-[#191919]
                outline-none
                focus:border-[#0a66c2]
                focus:ring-1
                focus:ring-[#0a66c2]
              "
            />

          </div>


          {/* Image */}
          <div>

            <label className="mb-2 block text-sm font-medium text-[#333]">
              Post Image
            </label>

            {selectedPost?.imageUrl && (

              <div className="
                mb-3
                overflow-hidden
                rounded-xl
                border border-[#d9dfe5]
              ">

                <img
                  src={selectedPost.imageUrl}
                  alt="Current post"
                  className="max-h-[220px] w-full object-cover"
                />

              </div>

            )}

              <label className="mb-2 block text-sm font-medium text-[#333]">
              Update Post Image
            </label>

            <input
              type="file"
              name="image"
              accept="image/*"
              className="
                w-full
                rounded-lg
                border border-[#d9dfe5]
                bg-white
                px-3 py-2
                text-sm
                text-[#666]
                file:mr-4
                file:rounded-lg
                file:border-0
                file:bg-[#f3f6f8]
                file:px-4
                file:py-2
                file:text-sm
                file:font-medium
                file:text-[#333]
                hover:file:bg-[#e8eef3]
              "
              onChange={(e)=>{

                const file= e.target.files[0];

                if(file){

                  setImage(file);
                  setImagePreview(URL.createObjectURL(file))
                }
              }}
            />

 {imagePreview && (
  <div className="mt-4 overflow-hidden rounded-xl border border-[#e2e5e8] bg-[#f8f9fa]">
    <img
      src={imagePreview}
      alt="Company life preview"
      className="h-48 w-full object-cover"
    />
  </div>
)}
            <p className="mt-1.5 text-xs text-[#777]">
              Leave empty to keep the existing image.
            </p>

          </div>

        </div>


        {/* Footer */}
        <div className="
          flex justify-end gap-3
          border-t border-[#e5e7eb]
          bg-white
          px-6 py-4
        ">

          <button
            type="button"
            onClick={() => {
              setEditCompanyPostOpen(false);
              setSelectedPostId(null);
              setSelectedPost(null);
            }}
            className="
              rounded-lg
              border border-[#d9dfe5]
              px-5 py-2.5
              text-sm
              font-semibold
              text-[#555]
              hover:bg-[#f3f6f8]
            "
          >
            Cancel
          </button>

          <button
            type="submit"
            className="
              rounded-lg
              bg-[#0a66c2]
              px-5 py-2.5
              text-sm
              font-semibold
              text-white
              hover:bg-[#004182]
            "
          >
            Save Changes
          </button>

        </div>

      </form>

    </div>

  </div>
)}



{deleteCompanyZone && (

  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">

    <div className="
      w-full max-w-md
      rounded-2xl
      border border-[#d9dfe5]
      bg-white
      shadow-2xl
    ">

      <div className="border-b border-[#e5e7eb] px-6 py-5">

        <h2 className="text-lg font-semibold text-[#191919]">
          Delete Company?
        </h2>

        <p className="mt-1 text-sm text-[#666]">
          Are you sure you want to delete{" "}
          <span className="font-semibold text-[#191919]">
            {company?.companyName}
          </span>
          ?
        </p>

      </div>

      <div className="px-6 py-5">

        <p className="text-sm leading-6 text-[#555]">
          Deleting your company may affect jobs,
          applications, posts and company information.
        </p>

        <p className="mt-3 text-sm font-medium text-red-600">
          This action cannot be undone.
        </p>

      </div>

      <div className="
        flex justify-end gap-3
        border-t border-[#e5e7eb]
        px-6 py-4
      ">

        <button
          type="button"
          onClick={() => setDeleteCompanyZone(false)}
          className="
            rounded-lg
            border border-[#d9dfe5]
            px-5 py-2.5
            text-sm font-semibold
            text-[#555]
            hover:bg-[#f3f6f8]
          "
        >
          Cancel
        </button>

        <button
          type="button"
         onClick={() => {

  if (!deleteCheck) {
    return;
  }

  if (deleteCheck.canDelete) {

    // Abhi actual delete baad mein
    setDeleteCompanyZone(false);

    toast.success("Company can be deleted");

  } else {

    setDeleteCompanyZone(false);
    setContinueDeleteZone(true);

  }

}}
          className="
            rounded-lg
            bg-red-500
            px-5 py-2.5
            text-sm font-semibold
            text-white
            hover:bg-red-600
          "
        >
          Continue
        </button>

      </div>

    </div>

  </div>
)}


{continueDeleteZone && (

  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">

    <div className="
      w-full max-w-md
      rounded-2xl
      border border-[#f1b5b5]
      bg-white
      shadow-2xl
    ">

      <div className="border-b border-[#f1d1d1] px-6 py-5">

        <h2 className="text-lg font-semibold text-red-600">
          Company Cannot Be Deleted
        </h2>

        <p className="mt-1 text-sm text-[#666]">
          This company has associated data:
        </p>

      </div>

      <div className="space-y-3 px-6 py-5">

        <div className="flex items-center justify-between rounded-lg bg-[#f8f9fa] px-4 py-3">
          <span className="text-sm text-[#555]">
            Jobs
          </span>

          <span className="font-semibold text-[#191919]">
            {deleteCheck?.jobs}
          </span>
        </div>

        <div className="flex items-center justify-between rounded-lg bg-[#f8f9fa] px-4 py-3">
          <span className="text-sm text-[#555]">
            Applications
          </span>

          <span className="font-semibold text-[#191919]">
          {deleteCheck?.applications}
          </span>
        </div>

        <div className="flex items-center justify-between rounded-lg bg-[#f8f9fa] px-4 py-3">
          <span className="text-sm text-[#555]">
            Company Posts
          </span>

          <span className="font-semibold text-[#191919]">
          {deleteCheck?.posts}
          </span>
        </div>

        <div className="flex items-center justify-between rounded-lg bg-[#f8f9fa] px-4 py-3">
          <span className="text-sm text-[#555]">
            Company Life Posts
          </span>

          <span className="font-semibold text-[#191919]">
           {deleteCheck?.companyLifePosts}
          </span>
        </div>

        <div className="flex items-center justify-between rounded-lg bg-[#f8f9fa] px-4 py-3">
  <span className="text-sm text-[#555]">
    Saved Jobs
  </span>

  <span className="font-semibold text-[#191919]">
    {deleteCheck?.savedJobs}
  </span>
</div>

<div className="flex items-center justify-between rounded-lg bg-[#f8f9fa] px-4 py-3">
  <span className="text-sm text-[#555]">
    Followers
  </span>

  <span className="font-semibold text-[#191919]">
    {deleteCheck?.followers}
  </span>
</div>

        <p className="pt-2 text-sm leading-6 text-[#555]">
          You must resolve these dependencies before
          permanently deleting the company.
        </p>

      </div>

      <div className="
        flex justify-end
        border-t border-[#e5e7eb]
        px-6 py-4
      ">

        <button
          type="button"
          onClick={() => setContinueDeleteZone(false)}
          className="
            rounded-lg
            bg-[#0a66c2]
            px-5 py-2.5
            text-sm font-semibold
            text-white
            hover:bg-[#004182]
          "
        >
          Close
        </button>

      </div>

    </div>

  </div>
)}
         {/* =================================================
              RIGHT SIDEBAR
          ================================================== */}

          <aside className="space-y-6">

            {/* Company Links */}

            <section className="rounded-xl border border-[#d9d9d9] bg-white">

              <div className="border-b border-[#e5e7eb] px-5 py-4">

                <h2 className="text-[16px] font-semibold text-[#191919]">
                  Company Links
                </h2>

              </div>

              <div className="space-y-1 p-3">

                <a
                  href={company?.website}
                  className="
                    flex items-center gap-3
                    rounded-lg
                    px-3 py-3
                    text-[13px]
                    text-[#333]
                    hover:bg-[#f3f6f8]
                  "
                >
                  <Globe
                    size={18}
                    className="text-[#666]"
                  />

                  <span className="flex-1">
                    Website
                  </span>

                  <ExternalLink size={14} />
                </a>

               <a
  href={company?.linkedinUrl}
  target="_blank"
  rel="noopener noreferrer"
  className="flex items-center gap-2 ml-4 "
>
  <span className="flex-1">LinkedIn</span>
  <ExternalLink size={14} />
</a>
              </div>

            </section>


            {/* Contact */}

            <section className="rounded-xl border border-[#d9d9d9] bg-white">

              <div className="border-b border-[#e5e7eb] px-5 py-4">

                <h2 className="text-[16px] font-semibold text-[#191919]">
                  Contact Information
                </h2>

              </div>

              <div className="space-y-4 p-5">

                <div className="flex gap-3">

                  <Mail
                    size={17}
                    className="mt-0.5 text-[#666]"
                  />

                  <div>
                    <p className="text-[11px] text-[#777]">
                      Email
                    </p>

                    <p className="mt-0.5 text-[13px] text-[#333]">
                      {company?.contactEmail}
                    </p>
                  </div>

                </div>

                <div className="flex gap-3">

                  <Phone
                    size={17}
                    className="mt-0.5 text-[#666]"
                  />

                  <div>
                    <p className="text-[11px] text-[#777]">
                      Phone
                    </p>

                    <p className="mt-0.5 text-[13px] text-[#333]">
                      {company?.contactPhone}
                    </p>
                  </div>

                </div>

              </div>

            </section>


            {/* Quick Actions */}

            <section className="rounded-xl border border-[#d9d9d9] bg-white">

              <div className="border-b border-[#e5e7eb] px-5 py-4">

                <h2 className="text-[16px] font-semibold text-[#191919]">
                  Quick Actions
                </h2>

              </div>

              <div className="p-3">

                <button
                  className="
                    flex w-full items-center gap-3
                    rounded-lg
                    px-3 py-3
                    text-left
                    text-[13px]
                    text-[#333]
                    hover:bg-[#f3f6f8]
                  "
                >
                  <Image size={17} />
                  Manage Company Images
                </button>

                <button
                  className="
                    flex w-full items-center gap-3
                    rounded-lg
                    px-3 py-3
                    text-left
                    text-[13px]
                    text-[#333]
                    hover:bg-[#f3f6f8]
                  "
                >
                  <LinkIcon size={17} />
                  Manage Company Links
                </button>

                <button
                  className="
                    flex w-full items-center gap-3
                    rounded-lg
                    px-3 py-3
                    text-left
                    text-[13px]
                    text-[#333]
                    hover:bg-[#f3f6f8]
                  "
                >
                  <BriefcaseBusiness size={17} />
                  Manage Jobs
                </button>

              </div>

            </section>


            {/* Danger Zone */}

            <section className="rounded-xl border border-red-200 bg-white">

              <div className="border-b border-red-100 px-5 py-4">

                <h2 className="text-[16px] font-semibold text-red-600">
                  Danger Zone
                </h2>

              </div>

              <div className="p-5">

                <p className="text-[12px] leading-5 text-[#666]">
                  Deleting your company is permanent. All associated
                  company information may become unavailable.
                </p>

                <button
                  onClick={handleDeleteCompanyClick}
                  className="
                    mt-4
                    flex w-full items-center justify-center gap-2
                    rounded-lg
                    border border-red-300
                    bg-white
                    px-4 py-2.5
                    text-[12px]
                    font-semibold
                    text-red-600
                    hover:bg-red-50
                  "
                >
                  <Trash2 size={15} />
                  Delete Company
                </button>

              </div>

            </section>

          </aside>

        </div>

      </main>

    </div>
  );
};

export default EmployerCompanyDetails;