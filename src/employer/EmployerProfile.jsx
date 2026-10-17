import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import api from "../Service/Api";
import {
  MapPin,
  Mail,
  Phone,
PencilSparkles ,
  Globe,
  Pencil,
  ExternalLink,
  Building2,
  Camera,
  BriefcaseBusiness,

 
} from "lucide-react";
import { Link } from "react-router-dom";
import NavBar from "../component/NavBar";
import toast from "react-hot-toast";


const EmployerProfile = () => {

   const [profile, setProfile] = useState(null);
const [user, setUser] = useState(null);
const fileInputRef = useRef(null);
const coverInputRef=useRef(null);
const navigate=useNavigate();
useEffect(() => {

    api.get("/employer-profile/me")
        .then((response) => {

            console.log("EMPLOYER PROFILE:", response.data);

            setProfile(response.data);

            const userId = response.data.userId;

            return api.get(`/users/${userId}`);
        })
        .then((response) => {

            console.log("USER DATA:", response.data);

            setUser(response.data);
        })
        .catch((error) => {

            console.log("API ERROR:", error);
        });

}, []);

const handleUploadProfile = async (userId, file) => {

    if (!userId || !file) {
        return;
    }

    try {

        const formData = new FormData();

        formData.append("profileImage", file);

        const response = await api.put(
            `/employer-profile/${userId}/profile-image`,
            formData
        );

        console.log(response.data);

        toast.success("Profile Image Upload Successfully");

    } catch (error) {

        console.log("API ERROR", error);
    }
};


const handleUploadCoverImage = async (userId, file) => {

    if (!userId || !file) {
        return;
    }

    try {

        const formData = new FormData();

        formData.append("coverImage", file);

        const response = await api.put(
            `/employer-profile/${userId}/cover-image`,
            formData
        );

        console.log(response.data);

        toast.success("Cover Image Upload Successfully");

    } catch (error) {

        console.log("API ERROR", error);
    }
};

const[editOpen,setEditOpen]= useState(false);

const handleEditProfile = async (userId, formData) => {

  if (!userId || !formData) {
    return;
  }

 

  try {

    const response = await api.put(
      `/employer-profile/update/${userId}`,
      formData
    );

    console.log(response.data);

    setProfile(response.data);

    setEditOpen(false);

    toast.success("Profile Updated Successfully");

  } catch (error) {

    console.log("API ERROR", error);

        toast.error(
      error.response?.data?.message ||
      "Profile update failed"
    );

  }
};
const[about,setAbout]=useState(false);
const[contact,setContact]=useState(false);
const[link,setLink]=useState(false);

const[company,setCompany]=useState(null);

useEffect(() => {
  api.get("/company/my")
    .then((response) => {
      console.log("MY COMPANY:", response.data);
      setCompany(response.data[0]|| null);
    })
    .catch((error) => {
      console.log("COMPANY API ERROR:", error);
    });
}, []);

const companySize = (size) => {

  const companySizes = {
    MICRO_1_10: "1-100 employees",
    SMALL_11_49: "100-500 employees",
    MEDIUM_50_249: "500-2500 employees",
    LARGE_250_PLUS: "5000+ employees"
  };

  return companySizes[size] || "Not specified";
};

const[manageCompany,setManageCompany]=useState(false);


const[companyPosts,setCompanyPosts]=useState([]);
const [createPostOpen, setCreatePostOpen] = useState(false);
const [title, setTitle] = useState("");
const [content, setContent] = useState("");
const [postType, setPostType] = useState("");
const [jobId, setJobId] = useState("");
const [image, setImage] = useState(null);
const [imagePreview, setImagePreview] = useState(null);

const handleCreatePost = async ({
  title,
  content,
  postType,
  jobId,
  image
}) => {

  try {

    if (!company?.companyId) {
      toast.error("Company not found");
      return;
    }

    const formData = new FormData();

    formData.append("companyId", company.companyId);
    formData.append("title", title);
    formData.append("content", content);
    formData.append("postType", postType);
    

    if (jobId) {
      formData.append("jobId", jobId);
    }

    if (image) {
      formData.append("image", image);
    }

    const response = await api.post(    "/company-posts",   formData  );

    console.log("POST CREATED:", response.data);

    setCompanyPosts((prev) => [
      ...prev,
      response.data
    ]);

    toast.success("Post Created Successfully");

  } catch (error) {

    console.log("POST CREATE ERROR:", error);

    toast.error(
      error.response?.data?.message ||
      "Post creation failed"
    );
  }
};

const handleSubmitPost = async () => {

  if (!title.trim() || !content.trim() || !postType) {
    toast.error("Please fill all required fields");
    return;
  }

  await handleCreatePost({
    title,
    content,
    postType,
    jobId,
    image
  });

  setCreatePostOpen(false);

  setTitle("");
  setContent("");
  setPostType("");
  setJobId("");
  setImage(null);
};

const [companyLifePost, setCompanyLifePost] = useState([]);

const [description, setDescription] = useState("");
const [displayOrder, setDisplayOrder] = useState("");

const [lifePost, setLifePost] = useState(false);

const handlePostLifeCompany = async ({
  title,
  description,
  displayOrder,
  image
}) => {

  try {

    if (!company?.companyId) {
      toast.error("Company not found");
      return;
    }

    const formData = new FormData();

    formData.append("title", title);
    formData.append("description", description);

    if (displayOrder !== "") {
      formData.append("displayOrder", displayOrder);
    }

    if (image) {
      formData.append("image", image);
    }

    const response = await api.post(  `/company/${company.companyId}/life`,  formData);

    console.log("COMPANY LIFE CREATED:", response.data);

    setCompanyLifePost((prev) => [
      ...prev,
      response.data
    ]);

    toast.success("Company Life Added Successfully");

  } catch (error) {

    console.log("COMPANY LIFE ERROR:", error);

    toast.error( error.response?.data?.message || "Company Life creation failed" );
  }
};


const handleSubmitLifePost = async () => {

  if (!title.trim() || !description.trim()) {
    toast.error("Please fill all required fields");
    return;
  }

  await handlePostLifeCompany({
    title,
    description,
    displayOrder,
    image
  });

  setLifePost(false);

  setTitle("");
  setDescription("");
  setDisplayOrder("");
  setImage(null);
  setImagePreview(null);
};

  return (
    <div className="min-h-screen bg-[#f3f2ef] text-[#191919]">

      {/* Navbar */}
      <NavBar />

      {/* Main */}
      <main className="pt-[72px]">

        <div className="max-w-[1100px] mx-auto px-5 py-7">

          {/* ========================================= */}
          {/* PAGE TITLE */}
          {/* ========================================= */}

          <div className="mb-5">

            <h1 className="text-[26px] font-semibold text-[#191919]">
              My Profile
            </h1>

            <p className="mt-1 text-[14px] text-[#666666]">
              Manage your professional profile and account information.
            </p>

          </div>


          {/* ========================================= */}
          {/* PROFILE HEADER */}
          {/* ========================================= */}

          <div className="bg-white border border-[#dfe3e8] rounded-lg overflow-hidden">

          
          {/* Cover */}
<div className="h-[275px] relative overflow-hidden">

  {profile?.coverImage ? (

    // Uploaded cover image
    <img
      src={profile.coverImage}
      alt="Cover"
      className="w-full h-full object-cover"
    />

  ) : (

    // Default cover
    <div className="absolute inset-0 bg-gradient-to-r from-[#dcecff] via-[#eef5fb] to-[#d9e8f7]">

      {/* simple skyline */}
      <div className="absolute bottom-0 left-0 right-0 flex items-end justify-center gap-2 opacity-50">

        <div className="w-10 h-20 bg-[#b7cee4]" />
        <div className="w-14 h-32 bg-[#abc4dc]" />
        <div className="w-8 h-24 bg-[#c0d4e7]" />
        <div className="w-16 h-40 bg-[#a6bfd8]" />
        <div className="w-10 h-28 bg-[#b8cfe2]" />
        <div className="w-20 h-48 bg-[#9eb9d2]" />
        <div className="w-12 h-32 bg-[#b4cbe0]" />
        <div className="w-16 h-44 bg-[#a8c2da]" />
        <div className="w-9 h-24 bg-[#c1d5e7]" />
        <div className="w-14 h-36 bg-[#aac5dc]" />

      </div>

    </div>

  )}

  {/* Cover edit button */}
  <button
    onClick={() => coverInputRef.current.click()}
    className="
      absolute
      bottom-3
      right-3
      w-9 h-9
      rounded-full
      bg-white
      border border-[#dfe3e8]
      flex items-center justify-center
      text-[#0a66c2]
      hover:bg-[#f3f6f8]
      shadow-sm
    "
  >
    <PencilSparkles size={18} />
  </button>

  {/* Hidden cover input */}
  <input
    type="file"
    accept="image/*"
    ref={coverInputRef}
    className="hidden"
    onChange={(e) => {
      const file = e.target.files[0];

      if (file) {
        const userId = localStorage.getItem("userId");
        handleUploadCoverImage(userId, file);
      }
    }}
  />

</div>

            {/* Profile content */}
            <div className="px-7 pb-6">

              <div className="flex flex-col sm:flex-row sm:items-end gap-5">

                {/* Avatar */}
                <div className="relative -mt-[58px] shrink-0">

                  <div className="
                    w-[112px] h-[112px]
                    rounded-full
                    border-[5px]
                    border-white
                    bg-[#e8f3ff]
                    flex items-center justify-center
                    text-[#0a66c2]
                    text-[34px]
                    font-semibold
                    shadow-sm
                  ">
                    {user?.profileImage ? (
    <img
        src={profile.profileImage}
        alt={profile.fullname}
        className="w-[90px] h-[90px] rounded-full object-cover"
    />
) : (
    <div className="w-[90px] h-[90px] rounded-full ...">
        {user?.fullname?.charAt(0)}
    </div>
)}
                  </div>

                  {/* Camera */}
               
<button
  onClick={() => fileInputRef.current.click()}
  className="
    absolute
    bottom-1
    right-0
    w-8 h-8
    rounded-full
    bg-white
    border border-[#dfe3e8]
    flex items-center justify-center
    text-[#0a66c2]
    hover:bg-[#f3f6f8]
  "
>
  <Camera size={15} />
</button>

<input
  type="file"
  accept="image/*"
  ref={fileInputRef}
  className="hidden"
  onChange={(e) => {
    const file = e.target.files[0];

    if (file) {
      const userId = localStorage.getItem("userId");
      handleUploadProfile(userId, file);
    }
  }}
/>

                </div>


                {/* Basic information */}
                <div className="flex-1 pb-1">

                  <h2 className="text-[25px] font-semibold text-[#191919]">
                  {profile?.fullName}
                  </h2>

                  <p className="text-[15px] text-[#555555] mt-1">
                    Recruiter · Amazon
                  </p>

                  <div className="flex items-center gap-1.5 mt-2 text-[13px] text-[#666666]">
                    <MapPin size={15} />
                    {user?.location}
                  </div>

                </div>


                {/* Actions */}
                <div className="flex items-center gap-2 pb-1">

                  <button
                     onClick={() => setEditOpen(true)}
                    className="
                      flex items-center gap-2
                      rounded-full
                      bg-[#0a66c2]
                      px-5 py-2.5
                      text-[13px]
                      font-semibold
                      text-white
                      hover:bg-[#004182]
                      transition
                    "
                  >
                    <Pencil size={15} />
                    Edit Profile
                  </button>

                  <button
                    className="
                      hidden sm:flex
                      items-center gap-2
                      rounded-full
                      border border-[#0a66c2]
                      bg-white
                      px-5 py-2.5
                      text-[13px]
                      font-semibold
                      text-[#0a66c2]
                      hover:bg-[#e8f3ff]
                      transition
                    "
                  >
                    <ExternalLink size={15} />
                    View Public Profile
                  </button>

                </div>

              </div>

            </div>

          </div>


          {/* ========================================= */}
          {/* ABOUT */}
          {/* ========================================= */}

          <div className="
            mt-4
            bg-white
            border border-[#dfe3e8]
            rounded-lg
            px-6 py-5
          ">

            <div className="flex items-center justify-between">

              <h2 className="text-[20px] font-semibold text-[#191919]">
                About
              </h2>

              <button
              onClick={()=>setAbout(true)}
                className="
                  flex items-center gap-1.5
                  rounded-md
                  border border-[#dfe3e8]
                  bg-white
                  px-3 py-1.5
                  text-[12px]
                  font-semibold
                  text-[#444444]
                  hover:bg-[#f3f6f8]
                "
              >
                <Pencil size={14} />
                Edit
              </button>

            </div>

            <p className="
              mt-3
              max-w-4xl
              text-[14px]
              leading-6
              text-[#555555]
            ">
             {profile?.about}
            </p>

          </div>


          {/* ========================================= */}
          {/* CONTACT + LINKS */}
          {/* ========================================= */}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">

            {/* Contact */}
            <div className="
              bg-white
              border border-[#dfe3e8]
              rounded-lg
              px-6 py-5
            ">

              <div className="flex items-center justify-between">

                <h2 className="text-[20px] font-semibold">
                  Contact Information
                </h2>

                <button
                onClick={()=>setContact(true)}
                  className="
                    flex items-center gap-1.5
                    rounded-md
                    border border-[#dfe3e8]
                    px-3 py-1.5
                    text-[12px]
                    font-semibold
                    text-[#444444]
                    hover:bg-[#f3f6f8]
                  "
                >
                  <Pencil size={14} />
                  Edit
                </button>

              </div>


              <div className="mt-5 space-y-4">

                <div className="flex items-center gap-3">

                  <Mail
                    size={18}
                    className="text-[#666666]"
                  />

                  <span className="text-[14px] text-[#555555]">
                  {user?.email}
                  </span>

                </div>


                <div className="flex items-center gap-3">

                  <Phone
                    size={18}
                    className="text-[#666666]"
                  />

                  <span className="text-[14px] text-[#555555]">
                     {user?.phone} 
                  </span>

                </div>


                <div className="flex items-center gap-3">

                  <MapPin
                    size={18}
                    className="text-[#666666]"
                  />

                  <span className="text-[14px] text-[#555555]">
                    {user?.location}
                  </span>

                </div>

              </div>

            </div>


            {/* Professional Links */}
            <div className="
              bg-white
              border border-[#dfe3e8]
              rounded-lg
              px-6 py-5
            ">

              <div className="flex items-center justify-between">

                <h2 className="text-[20px] font-semibold">
                  Professional Links
                </h2>

                <button
                onClick={()=> setLink(true)}
                  className="
                    flex items-center gap-1.5
                    rounded-md
                    border border-[#dfe3e8]
                    px-3 py-1.5
                    text-[12px]
                    font-semibold
                    text-[#444444]
                    hover:bg-[#f3f6f8]
                  "
                >
                  <Pencil size={14} />
                  Edit
                </button>

              </div>


              <div className="mt-5 space-y-4">

                <a
                  href="#"
                  className="
                    flex items-center justify-between
                    group
                  "
                >

                  <div className="flex items-center gap-3">

                    <div className="
                      w-8 h-8
                      rounded-md
                      bg-[#0a66c2]
                      flex items-center justify-center
                      text-white
                    ">
                   
                    </div>

                    <span className="
                      text-[14px]
                      text-[#0a66c2]
                      group-hover:underline
                    ">
                     {profile?.linkedinUrl}
                    </span>

                  </div>

                  <ExternalLink
                    size={15}
                    className="text-[#777777]"
                  />

                </a>


                <a
                  href="#"
                  className="flex items-center justify-between group"
                >

                  <div className="flex items-center gap-3">

                    <div className="
                      w-8 h-8
                      rounded-md
                      border border-[#dfe3e8]
                      flex items-center justify-center
                      text-[#555555]
                    ">
                      <Globe size={17} />
                    </div>

                    <span className="
                      text-[14px]
                      text-[#0a66c2]
                      group-hover:underline
                    ">
                      https://www.amazon.com
                    </span>

                  </div>

                  <ExternalLink
                    size={15}
                    className="text-[#777777]"
                  />

                </a>

              </div>

            </div>

          </div>


          {/* ========================================= */}
          {/* COMPANY */}
          {/* ========================================= */}

          <div className="
            mt-4
            bg-white
            border border-[#dfe3e8]
            rounded-lg
            px-6 py-5
          ">

            <h2 className="text-[20px] font-semibold text-[#191919]">
              Company
            </h2>


            <div className="
              mt-5
              flex flex-col md:flex-row
              md:items-center
              gap-5
            ">

              {/* Logo */}
              <div className="
                w-[92px] h-[92px]
                rounded-lg
                border border-[#dfe3e8]
                bg-white
                flex items-center justify-center
                shrink-0
              ">

                 {company?.logoUrl ? (
                    <img
                      src={company?.logoUrl}
                      alt={company?.companyName}
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <span className="text-[28px] font-semibold text-[#191919]">
                      {company?.companyName?.charAt(0)}
                    </span>
                  )}

              </div>


              {/* Company details */}
              <div className="flex-1">

                <div className="flex items-center gap-3 flex-wrap">

                  <h3 className="
                    text-[20px]
                    font-semibold
                    text-[#191919]
                  ">
                   {company?.companyName}
                  </h3>

                <span
  className="
    inline-flex
    items-center gap-1.5
    rounded-full
    bg-[#e8f6ef]
    px-2.5 py-1
    text-[11px]
    font-semibold
    text-[#057642]
  "
>
  <span className="w-1.5 h-1.5 rounded-full bg-[#057642]" />
  Active
</span>

                </div>


                <p className="text-[13px] text-[#666666] mt-1.5">
                  {company?.industry}
                  <span className="mx-2 text-[#b0b0b0]">•</span>
                 {companySize(company?.companySize)}
                  <span className="mx-2 text-[#b0b0b0]">•</span>
                 {company?.location}
                </p>


                <p className="
                  max-w-2xl
                  text-[13px]
                  leading-5
                  text-[#666666]
                  mt-2
                ">
                 {company?.about}
                </p>

              </div>


              {/* Company actions */}
              <div className="
                flex
                flex-row md:flex-col
                gap-2
                shrink-0
              ">

                <button
                 
                 onClick={() => navigate("/employer/company/manage")}
                  className="
                    flex items-center justify-center gap-2
                    rounded-full
                    border border-[#0a66c2]
                    bg-white
                    px-5 py-2.5
                    text-[13px]
                    font-semibold
                    text-[#0a66c2]
                    hover:bg-[#e8f3ff]
                    transition
                  "
                >
                  View Company
                  <ExternalLink size={14} />
                </button>


                <button
                    onClick={()=>setManageCompany(true)}
                  className="
                    flex items-center justify-center gap-2
                    rounded-full
                    border border-[#cfd5dc]
                    bg-white
                    px-5 py-2.5
                    text-[13px]
                    font-semibold
                    text-[#444444]
                    hover:bg-[#f3f6f8]
                    transition
                  "
                >
                  <Building2 size={15} />
                  Manage Company
                </button>

              </div>

            </div>

          </div>

{editOpen && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#000000]/55 backdrop-blur-[2px] px-4">

    <div className="
      w-full
      max-w-[560px]
      max-h-[90vh]
      overflow-y-auto
      rounded-2xl
      bg-white
      border border-[#d8e2ec]
      shadow-[0_20px_60px_rgba(0,0,0,0.20)]
    ">

      {/* ================= HEADER ================= */}
      <div className="
        sticky
        top-0
        z-10
        flex
        items-center
        justify-between
        px-7
        py-5
        bg-white
        border-b
        border-[#e5eaf0]
      ">

        <div>
          <h2 className="text-[21px] font-semibold text-[#191919]">
            Edit Profile
          </h2>

          <p className="mt-1 text-[12px] text-[#667085]">
            Update your professional information
          </p>
        </div>

        <button
          onClick={() => setEditOpen(false)}
          className="
            w-9
            h-9
            rounded-full
            flex
            items-center
            justify-center
            text-[#666]
            border
            border-[#e1e6eb]
            hover:bg-[#f3f6f8]
            hover:text-[#191919]
            transition
          "
        >
          <span className="text-[20px] leading-none">
            ×
          </span>
        </button>

      </div>


      {/* ================= FORM ================= */}
      <div className="px-7 py-6">

        {/* FULL NAME */}
        <div className="mb-5">

          <label className="
            block
            text-[13px]
            font-semibold
            text-[#191919]
            mb-2
          ">
            Full Name
          </label>

          <input
            type="text"
            value={profile?.fullName || ""}
            onChange={(e) =>
              setProfile({
                ...profile,
                fullName: e.target.value
              })
            }
            placeholder="Enter your full name"
            className="
              w-full
              rounded-lg
              border
              border-[#cfd8e3]
              bg-white
              px-4
              py-3
              text-[14px]
              text-[#191919]
              placeholder:text-[#98a2b3]
              outline-none
              transition-all
              duration-200
              hover:border-[#0a66c2]
              focus:border-[#0a66c2]
              focus:ring-2
              focus:ring-[#0a66c2]/10
            "
          />

        </div>


        {/* HEADLINE */}
        <div className="mb-5">

          <label className="
            block
            text-[13px]
            font-semibold
            text-[#191919]
            mb-2
          ">
            Headline
          </label>

          <input
            type="text"
            value={profile?.headline || ""}
            onChange={(e) =>
              setProfile({
                ...profile,
                headline: e.target.value
              })
            }
            placeholder="e.g. Founder & Software Engineer"
            className="
              w-full
              rounded-lg
              border
              border-[#cfd8e3]
              bg-white
              px-4
              py-3
              text-[14px]
              text-[#191919]
              placeholder:text-[#98a2b3]
              outline-none
              transition-all
              duration-200
              hover:border-[#0a66c2]
              focus:border-[#0a66c2]
              focus:ring-2
              focus:ring-[#0a66c2]/10
            "
          />

        </div>


        {/* ABOUT */}
        <div className="mb-5">

          <label className="
            block
            text-[13px]
            font-semibold
            text-[#191919]
            mb-2
          ">
            About
          </label>

          <textarea
            rows="4"
            value={profile?.about || ""}
            onChange={(e) =>
              setProfile({
                ...profile,
                about: e.target.value
              })
            }
            placeholder="Tell people about yourself..."
            className="
              w-full
              resize-none
              rounded-lg
              border
              border-[#cfd8e3]
              bg-white
              px-4
              py-3
              text-[14px]
              leading-6
              text-[#191919]
              placeholder:text-[#98a2b3]
              outline-none
              transition-all
              duration-200
              hover:border-[#0a66c2]
              focus:border-[#0a66c2]
              focus:ring-2
              focus:ring-[#0a66c2]/10
            "
          />

          <p className="mt-1.5 text-[11px] text-[#7a8694]">
            Share your professional background and experience.
          </p>

        </div>


        {/* PHONE */}
        <div className="mb-5">

          <label className="
            block
            text-[13px]
            font-semibold
            text-[#191919]
            mb-2
          ">
            Phone
          </label>

          <input
            type="text"
            value={profile?.phone || ""}
            onChange={(e) =>
              setProfile({
                ...profile,
                phone: e.target.value
              })
            }
            placeholder="10-digit mobile number"
            className="
              w-full
              rounded-lg
              border
              border-[#cfd8e3]
              bg-white
              px-4
              py-3
              text-[14px]
              text-[#191919]
              placeholder:text-[#98a2b3]
              outline-none
              transition-all
              duration-200
              hover:border-[#0a66c2]
              focus:border-[#0a66c2]
              focus:ring-2
              focus:ring-[#0a66c2]/10
            "
          />

        </div>


        {/* LOCATION */}
        <div className="mb-5">

          <label className="
            block
            text-[13px]
            font-semibold
            text-[#191919]
            mb-2
          ">
            Location
          </label>

          <input
            type="text"
            value={profile?.location || ""}
            onChange={(e) =>
              setProfile({
                ...profile,
                location: e.target.value
              })
            }
            placeholder="e.g. Delhi NCR"
            className="
              w-full
              rounded-lg
              border
              border-[#cfd8e3]
              bg-white
              px-4
              py-3
              text-[14px]
              text-[#191919]
              placeholder:text-[#98a2b3]
              outline-none
              transition-all
              duration-200
              hover:border-[#0a66c2]
              focus:border-[#0a66c2]
              focus:ring-2
              focus:ring-[#0a66c2]/10
            "
          />

        </div>


        {/* LINKEDIN */}
        <div className="mb-2">

          <label className="
            block
            text-[13px]
            font-semibold
            text-[#191919]
            mb-2
          ">
            LinkedIn URL
          </label>

          <div className="
            relative
            rounded-lg
            border
            border-[#0a66c2]
            bg-[#f7fbff]
            transition-all
            duration-200
            hover:bg-[#f2f8fd]
            focus-within:ring-2
            focus-within:ring-[#0a66c2]/15
          ">

            {/* LinkedIn Icon */}
            <div className="
              absolute
              left-3
              top-1/2
              -translate-y-1/2
              w-8
              h-8
              rounded-md
              bg-[#0a66c2]
              flex
              items-center
              justify-center
              text-white
              shadow-sm
            ">
              in
            </div>

            <input
              type="text"
              value={profile?.linkedinUrl || ""}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  linkedinUrl: e.target.value
                })
              }
              placeholder="https://www.linkedin.com/in/your-profile"
              className="
                w-full
                rounded-lg
                bg-transparent
                pl-14
                pr-4
                py-3
                text-[14px]
                font-medium
                text-[#191919]
                placeholder:text-[#8a98a8]
                outline-none
              "
            />

          </div>

          <div className="flex items-center gap-1.5 mt-2">

         

            <p className="text-[11px] text-[#6b7280]">
              Add your professional LinkedIn profile
            </p>

          </div>

        </div>

      </div>


      {/* ================= FOOTER ================= */}
      <div className="
        sticky
        bottom-0
        flex
        items-center
        justify-end
        gap-3
        px-7
        py-4
        bg-white
        border-t
        border-[#e5eaf0]
      ">

        {/* Cancel */}
        <button
          onClick={() => setEditOpen(false)}
          className="
            rounded-full
            border
            border-[#b7c3cf]
            bg-white
            px-5
            py-2.5
            text-[13px]
            font-semibold
            text-[#444]
            hover:bg-[#f3f6f8]
            hover:border-[#8c9aaa]
            transition
          "
        >
          Cancel
        </button>


        {/* Save */}
        <button
          onClick={() => {

            const userId = localStorage.getItem("userId");

            handleEditProfile(userId, {
              fullName: profile?.fullName,
              headline: profile?.headline,
              about: profile?.about,
              phone: profile?.phone,
              location: profile?.location,
              linkedinUrl: profile?.linkedinUrl
            });

          }}
          className="
            rounded-full
            bg-[#0a66c2]
            px-6
            py-2.5
            text-[13px]
            font-semibold
            text-white
            shadow-sm
            hover:bg-[#004182]
            hover:shadow-md
            active:scale-[0.98]
            transition-all
            duration-200
          "
        >
          Save Changes
        </button>

      </div>

    </div>

  </div>
)}

{about && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 backdrop-blur-[2px] px-4">

    <div className="
      w-full
      max-w-[520px]
      rounded-2xl
      bg-white
      border border-[#d8e2ec]
      shadow-[0_20px_60px_rgba(0,0,0,0.20)]
    ">

      {/* Header */}
      <div className="
        flex items-center justify-between
        px-6 py-5
        border-b border-[#e5eaf0]
      ">

        <div>
          <h2 className="text-[20px] font-semibold text-[#191919]">
            Edit About
          </h2>

          <p className="mt-1 text-[12px] text-[#667085]">
            Tell people about your professional background
          </p>
        </div>

        <button
          onClick={() => setAbout(false)}
          className="
            w-9 h-9
            rounded-full
            border border-[#dfe3e8]
            flex items-center justify-center
            text-[#666]
            hover:bg-[#f3f6f8]
            transition
          "
        >
          ×
        </button>

      </div>

      {/* Body */}
      <div className="px-6 py-6">

        <label className="
          block
          text-[13px]
          font-semibold
          text-[#191919]
          mb-2
        ">
          About
        </label>

        <textarea
          rows="7"
          value={profile?.about || ""}
          onChange={(e) =>
            setProfile({
              ...profile,
              about: e.target.value
            })
          }
          placeholder="Tell people about yourself..."
          className="
            w-full
            resize-none
            rounded-lg
            border border-[#cfd8e3]
            bg-white
            px-4 py-3
            text-[14px]
            leading-6
            text-[#191919]
            placeholder:text-[#98a2b3]
            outline-none
            transition-all
            duration-200
            hover:border-[#0a66c2]
            focus:border-[#0a66c2]
            focus:ring-2
            focus:ring-[#0a66c2]/10
          "
        />

        <p className="mt-2 text-[11px] text-[#7a8694]">
          Share your experience, background and professional interests.
        </p>

      </div>

      {/* Footer */}
      <div className="
        flex justify-end gap-3
        px-6 py-4
        border-t border-[#e5eaf0]
      ">

        <button
          onClick={() => setAbout(false)}
          className="
            rounded-full
            border border-[#b7c3cf]
            px-5 py-2.5
            text-[13px]
            font-semibold
            text-[#444]
            hover:bg-[#f3f6f8]
          "
        >
          Cancel
        </button>

        <button
          onClick={async () => {

            const userId = localStorage.getItem("userId");

            await handleEditProfile(userId, {
              about: profile?.about
            });

            setAbout(false);

          }}
          className="
            rounded-full
            bg-[#0a66c2]
            px-6 py-2.5
            text-[13px]
            font-semibold
            text-white
            hover:bg-[#004182]
            shadow-sm
            transition
          "
        >
          Save Changes
        </button>

      </div>

    </div>

  </div>
)}

{contact && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 backdrop-blur-[2px] px-4">

    <div className="
      w-full
      max-w-[520px]
      rounded-2xl
      bg-white
      border border-[#d8e2ec]
      shadow-[0_20px_60px_rgba(0,0,0,0.20)]
    ">

      {/* Header */}
      <div className="
        flex items-center justify-between
        px-6 py-5
        border-b border-[#e5eaf0]
      ">
        <div>
          <h2 className="text-[20px] font-semibold text-[#191919]">
            Edit Contact Information
          </h2>

          <p className="mt-1 text-[12px] text-[#667085]">
            Update your contact details
          </p>
        </div>

        <button
          onClick={() => setContact(false)}
          className="
            w-9 h-9 rounded-full
            border border-[#dfe3e8]
            flex items-center justify-center
            text-[#666]
            hover:bg-[#f3f6f8]
          "
        >
          ×
        </button>
      </div>

      {/* Body */}
      <div className="px-6 py-6 space-y-5">


        {/* Email */}
<div>
  <label className="block text-[13px] font-semibold mb-2">
    Email
  </label>

  <input
    type="email"
    value={user?.email || ""}
    disabled
    className="
      w-full
      rounded-lg
      border border-[#cfd8e3]
      bg-[#f5f7fa]
      px-4 py-3
      text-[14px]
      text-[#667085]
      outline-none
      cursor-not-allowed
    "
  />

  <p className="mt-2 text-[11px] text-[#7a8694]">
    Email is managed from your account settings.
  </p>
</div>

        {/* Phone */}
        <div>
          <label className="block text-[13px] font-semibold mb-2">
            Phone
          </label>

          <input
            type="text"
            value={profile?.phone || ""}
            onChange={(e) =>
              setProfile({
                ...profile,
                phone: e.target.value
              })
            }
            placeholder="10-digit mobile number"
            className="
              w-full
              rounded-lg
              border border-[#cfd8e3]
              px-4 py-3
              text-[14px]
              outline-none
              hover:border-[#0a66c2]
              focus:border-[#0a66c2]
              focus:ring-2
              focus:ring-[#0a66c2]/10
            "
          />
        </div>

        {/* Location */}
        <div>
          <label className="block text-[13px] font-semibold mb-2">
            Location
          </label>

          <input
            type="text"
            value={profile?.location || ""}
            onChange={(e) =>
              setProfile({
                ...profile,
                location: e.target.value
              })
            }
            placeholder="e.g. Delhi NCR"
            className="
              w-full
              rounded-lg
              border border-[#cfd8e3]
              px-4 py-3
              text-[14px]
              outline-none
              hover:border-[#0a66c2]
              focus:border-[#0a66c2]
              focus:ring-2
              focus:ring-[#0a66c2]/10
            "
          />
        </div>

      </div>

      {/* Footer */}
      <div className="
        flex justify-end gap-3
        px-6 py-4
        border-t border-[#e5eaf0]
      ">

        <button
          onClick={() => setContact(false)}
          className="
            rounded-full
            border border-[#b7c3cf]
            px-5 py-2.5
            text-[13px]
            font-semibold
            hover:bg-[#f3f6f8]
          "
        >
          Cancel
        </button>

        <button
          onClick={async () => {

            const userId = localStorage.getItem("userId");

            await handleEditProfile(userId, {
              phone: profile?.phone,
              location: profile?.location
            });

            setContact(false);

          }}
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

    </div>

  </div>
)}

{link && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 backdrop-blur-[2px] px-4">

    <div className="
      w-full
      max-w-[520px]
      rounded-2xl
      bg-white
      border border-[#d8e2ec]
      shadow-[0_20px_60px_rgba(0,0,0,0.20)]
    ">

      {/* Header */}
      <div className="
        flex items-center justify-between
        px-6 py-5
        border-b border-[#e5eaf0]
      ">

        <div>
          <h2 className="text-[20px] font-semibold text-[#191919]">
            Edit Professional Links
          </h2>

          <p className="mt-1 text-[12px] text-[#667085]">
            Add or update your professional profile
          </p>
        </div>

        <button
          onClick={() => setLink(false)}
          className="
            w-9 h-9 rounded-full
            border border-[#dfe3e8]
            flex items-center justify-center
            text-[#666]
            hover:bg-[#f3f6f8]
          "
        >
          ×
        </button>

      </div>

      {/* Body */}
      <div className="px-6 py-6">

        <label className="
          block
          text-[13px]
          font-semibold
          text-[#191919]
          mb-2
        ">
          LinkedIn URL
        </label>

        <div className="
          relative
          rounded-lg
          border border-[#0a66c2]
          bg-[#f7fbff]
          focus-within:ring-2
          focus-within:ring-[#0a66c2]/15
        ">

          <div className="
            absolute
            left-3
            top-1/2
            -translate-y-1/2
            w-8 h-8
            rounded-md
            bg-[#0a66c2]
            text-white
            flex items-center justify-center
            text-[14px]
            font-bold
          ">
            in
          </div>

          <input
            type="text"
            value={profile?.linkedinUrl || ""}
            onChange={(e) =>
              setProfile({
                ...profile,
                linkedinUrl: e.target.value
              })
            }
            placeholder="https://www.linkedin.com/in/your-profile"
            className="
              w-full
              rounded-lg
              bg-transparent
              pl-14 pr-4
              py-3
              text-[14px]
              font-medium
              text-[#191919]
              placeholder:text-[#8a98a8]
              outline-none
            "
          />

        </div>

        <p className="mt-2 text-[11px] text-[#6b7280]">
          Your professional LinkedIn profile URL
        </p>

      </div>

      {/* Footer */}
      <div className="
        flex justify-end gap-3
        px-6 py-4
        border-t border-[#e5eaf0]
      ">

        <button
          onClick={() => setLink(false)}
          className="
            rounded-full
            border border-[#b7c3cf]
            px-5 py-2.5
            text-[13px]
            font-semibold
            hover:bg-[#f3f6f8]
          "
        >
          Cancel
        </button>

        <button
          onClick={async () => {

            const userId = localStorage.getItem("userId");

            await handleEditProfile(userId, {
              linkedinUrl: profile?.linkedinUrl
            });

            setLink(false);

          }}
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

    </div>

  </div>
)}


{manageCompany && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 backdrop-blur-[2px] px-4">

    <div
      className="
        w-full
        max-w-[650px]
        max-h-[90vh]
        overflow-y-auto
        rounded-2xl
        bg-white
        border border-[#d8e2ec]
        shadow-[0_20px_60px_rgba(0,0,0,0.20)]
      "
    >

      {/* ================= HEADER ================= */}

      <div
        className="
          sticky top-0 z-10
          flex items-center justify-between
          px-6 py-5
          bg-white
          border-b border-[#e5eaf0]
        "
      >

        <div>
          <h2 className="text-[21px] font-semibold text-[#191919]">
            Manage Company
          </h2>

          <p className="mt-1 text-[12px] text-[#667085]">
            Manage your company profile, posts and company life
          </p>
        </div>

        <button
          onClick={() => setManageCompany(false)}
          className="
            w-9 h-9
            rounded-full
            border border-[#dfe3e8]
            flex items-center justify-center
            text-[#666666]
            hover:bg-[#f3f6f8]
            hover:text-[#191919]
            transition
          "
        >
          <span className="text-[20px] leading-none">
            ×
          </span>
        </button>

      </div>


      {/* ================= COMPANY INFORMATION ================= */}

      <div className="px-6 py-5">

        <div
          className="
            rounded-xl
            border border-[#dfe3e8]
            bg-white
            p-5
            hover:border-[#b8c7d6]
            transition
          "
        >

          <div className="flex items-start justify-between">

            <div className="flex items-center gap-3">

              <div
                className="
                  w-10 h-10
                  rounded-lg
                  bg-[#e8f3ff]
                  text-[#0a66c2]
                  flex items-center justify-center
                "
              >
                <Building2 size={19} />
              </div>

              <div>
                <h3 className="text-[16px] font-semibold text-[#191919]">
                  Company Information
                </h3>

                <p className="text-[12px] text-[#667085] mt-0.5">
                  Manage your company details and branding
                </p>
              </div>

            </div>

            <button
              className="
                flex items-center gap-1.5
                rounded-md
                border border-[#dfe3e8]
                bg-white
                px-3 py-1.5
                text-[12px]
                font-semibold
                text-[#444444]
                hover:bg-[#f3f6f8]
                hover:border-[#c7d1dc]
                transition
              "
            >
              <Pencil size={13} />
              Edit
            </button>

          </div>


          {/* Company Preview */}

          {company && (
            <div
              className="
                mt-5
                rounded-lg
                border border-[#e5eaf0]
                bg-[#f8fafc]
                p-4
              "
            >

              <div className="flex items-center gap-4">

                {/* Logo */}

                <div
                  className="
                    w-[64px] h-[64px]
                    rounded-lg
                    border border-[#dfe3e8]
                    bg-white
                    overflow-hidden
                    flex items-center justify-center
                    shrink-0
                  "
                >

                  {company.logoUrl ? (
                    <img
                      src={company.logoUrl}
                      alt={company.companyName}
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <span className="text-[28px] font-semibold text-[#191919]">
                      {company.companyName?.charAt(0)}
                    </span>
                  )}

                </div>


                {/* Details */}

                <div className="min-w-0">

                  <h3 className="text-[17px] font-semibold text-[#191919]">
                    {company.companyName}
                  </h3>

                  <p className="text-[12px] text-[#667085] mt-1">
                    {company.industry}
                    <span className="mx-2">•</span>
                    {company.location}
                  </p>

                  <p className="text-[12px] text-[#667085] mt-1">
                    {companySize(company.companySize)}
                  </p>

                </div>

              </div>

            </div>
          )}

        </div>


        {/* ================= COMPANY POSTS ================= */}

        <div
          className="
            mt-4
            rounded-xl
            border border-[#dfe3e8]
            bg-white
            p-5
            hover:border-[#b8c7d6]
            transition
          "
        >

          <div className="flex items-center justify-between">

            <div className="flex items-center gap-3">

              <div
                className="
                  w-10 h-10
                  rounded-lg
                  bg-[#eef6ff]
                  text-[#0a66c2]
                  flex items-center justify-center
                  text-[17px]
                  font-semibold
                "
              >
                ✎
              </div>

              <div>

                <h3 className="text-[16px] font-semibold text-[#191919]">
                  Company Posts
                </h3>

                <p className="text-[12px] text-[#667085] mt-0.5">
                  Create and manage your company posts
                </p>

              </div>

            </div>

            <button
              onClick={() => setCreatePostOpen(true)}
              className="
                flex items-center gap-1.5
                rounded-md
                border border-[#0a66c2]
                bg-white
                px-3 py-1.5
                text-[12px]
                font-semibold
                text-[#0a66c2]
                hover:bg-[#e8f3ff]
                transition
              "
            >
              + Create Post
            </button>

          </div>


          <div
            className="
              mt-4
              rounded-lg
              border border-dashed border-[#cfd8e3]
              bg-[#fafbfc]
              px-4 py-6
              text-center
            "
          >

            <p className="text-[13px] font-medium text-[#555555]">
              Manage your company posts
            </p>

            <p className="mt-1 text-[11px] text-[#8893a0]">
              Share updates, hiring announcements and company news.
            </p>

          </div>

        </div>


        {/* ================= COMPANY LIFE ================= */}

        <div
          className="
            mt-4
            rounded-xl
            border border-[#dfe3e8]
            bg-white
            p-5
            hover:border-[#b8c7d6]
            transition
          "
        >

          <div className="flex items-center justify-between">

            <div className="flex items-center gap-3">

              <div
                className="
                  w-10 h-10
                  rounded-lg
                  bg-[#eef6ff]
                  text-[#0a66c2]
                  flex items-center justify-center
                  text-[18px]
                "
              >
                ✦
              </div>

              <div>

                <h3 className="text-[16px] font-semibold text-[#191919]">
                  Company Life
                </h3>

                <p className="text-[12px] text-[#667085] mt-0.5">
                  Showcase your workplace and company culture
                </p>

              </div>

            </div>

            <button
            onClick={()=>setLifePost(true)}
              className="
                flex items-center gap-1.5
                rounded-md
                border border-[#0a66c2]
                bg-white
                px-3 py-1.5
                text-[12px]
                font-semibold
                text-[#0a66c2]
                hover:bg-[#e8f3ff]
                transition
              "
            >
              + Add
            </button>

          </div>


          <div
            className="
              mt-4
              rounded-lg
              border border-dashed border-[#cfd8e3]
              bg-[#fafbfc]
              px-4 py-6
              text-center
            "
          >

            <p className="text-[13px] font-medium text-[#555555]">
              Show what makes your company special
            </p>

            <p className="mt-1 text-[11px] text-[#8893a0]">
              Add workplace photos, culture and employee experiences.
            </p>

          </div>

        </div>


        {/* ================= DANGER ZONE ================= */}

        <div
          className="
            mt-4
            rounded-xl
            border border-[#f0caca]
            bg-[#fffafa]
            p-5
          "
        >

          <h3 className="text-[15px] font-semibold text-[#b42318]">
            Danger Zone
          </h3>

          <p className="mt-1 text-[12px] text-[#8a4b47]">
            Deleting your company is permanent and cannot be undone.
          </p>

          <button
            className="
              mt-4
              rounded-full
              border border-[#d92d20]
              bg-white
              px-5 py-2
              text-[12px]
              font-semibold
              text-[#d92d20]
              hover:bg-[#fff1f0]
              transition
            "
          >
            Delete Company
          </button>

        </div>

      </div>


      {/* ================= FOOTER ================= */}

      <div
        className="
          flex justify-end
          px-6 py-4
          border-t border-[#e5eaf0]
          bg-white
        "
      >

        <button
          onClick={() => setManageCompany(false)}
          className="
            rounded-full
            border border-[#b7c3cf]
            bg-white
            px-5 py-2.5
            text-[13px]
            font-semibold
            text-[#444444]
            hover:bg-[#f3f6f8]
            transition
          "
        >
          Close
        </button>

      </div>

    </div>

  </div>
)}

{createPostOpen && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur">

    <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl">

      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-lg font-semibold">
          Create Post
        </h2>

        <button
          onClick={() => setCreatePostOpen(false)}
          className="text-gray-500 hover:text-black"
        >
          ✕
        </button>
      </div>

      {/* Title */}
      <input
      value={title}
      onChange={(e)=>setTitle(e.target.value)}
        type="text"
        placeholder="Post title"
        className="w-full rounded-lg border px-3 py-2 mb-3"
      />

      {/* Content */}
      <textarea
      value={content}
      onChange={(e)=>setContent(e.target.value)}
        placeholder="What do you want to share?"
        rows="5"
        className="w-full rounded-lg border px-3 py-2 mb-3"
      />

      {/* Post Type */}
      <select
        value={postType}
        onChange={(e) => setPostType(e.target.value)}
        className="w-full rounded-lg border px-3 py-2 mb-3"
      >
        <option value="">Select Post Type</option>
        <option value="JOB">Job</option>
        <option value="ANNOUNCEMENT">Announcement</option>
        <option value="COMPANY_UPDATE">Company Update</option>
        <option value="ADVERTISEMENT">Advertisement</option>
      </select>

      {/* JOB ke liye extra field */}
      {postType === "JOB" && (
        <input
          type="number"
          placeholder="Job ID"
          className="w-full rounded-lg border px-3 py-2 mb-3"
        />
      )}

      {/* Image */}
   
<input
  type="file"
  accept="image/*"
  className="
    w-full
    mb-4
    text-sm
    text-gray-500
    file:mr-4
    file:rounded-lg
    file:border-0
    file:bg-gray-100
    file:px-4
    file:py-2
    file:text-sm
    file:font-medium
    file:text-gray-600
    hover:file:bg-gray-200
    cursor-pointer
  "
  onChange={(e) => {
    const file = e.target.files[0];

    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  }}
/>

   {imagePreview && (
  <div className="w-full h-48 bg-gray-100 border border-gray-200 rounded-xl overflow-hidden mb-4">

    <img
      src={imagePreview}
      alt="Post preview"
      className="w-full h-full object-cover"
    />

  </div>
)}

      {/* Buttons */}
      <div className="flex justify-end gap-2 mt-3">

        <button
          onClick={() => setCreatePostOpen(false)}
          className="rounded-lg border px-4 py-2"
        >
          Cancel
        </button>

        <button
          onClick={handleSubmitPost}
          className="rounded-lg bg-[#0a66c2] px-4 py-2 text-white"
        >
          Post
        </button>

      </div>

    </div>

  </div>
)}


{lifePost && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 backdrop-blur-[2px] px-4">

    <div className="w-full max-w-[560px] max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-[0_20px_60px_rgba(0,0,0,0.20)]">

      {/* Header */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-[#e5eaf0]">

        <div>
          <h2 className="text-[20px] font-semibold text-[#191919]">
            Add Company Life
          </h2>

          <p className="mt-1 text-[12px] text-[#667085]">
            Share your company culture and workplace experience
          </p>
        </div>

        <button
          onClick={() => setLifePost(false)}
          className="w-9 h-9 rounded-full border border-[#dfe3e8] flex items-center justify-center text-[#666] hover:bg-[#f3f6f8]"
        >
          ×
        </button>

      </div>

      {/* Body */}
      <div className="px-6 py-6">

        {/* Title */}
        <div className="mb-5">

          <label className="block text-[13px] font-semibold mb-2">
            Title
          </label>

          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Life at our company"
            className="w-full rounded-lg border border-[#cfd8e3] px-4 py-3 text-[14px] outline-none focus:border-[#0a66c2] focus:ring-2 focus:ring-[#0a66c2]/10"
          />

        </div>

        {/* Description */}
        <div className="mb-5">

          <label className="block text-[13px] font-semibold mb-2">
            Description
          </label>

          <textarea
            rows="5"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Tell people about your company culture..."
            className="w-full resize-none rounded-lg border border-[#cfd8e3] px-4 py-3 text-[14px] leading-6 outline-none focus:border-[#0a66c2] focus:ring-2 focus:ring-[#0a66c2]/10"
          />

        </div>

        {/* Display Order */}
        <div className="mb-5">

          <label className="block text-[13px] font-semibold mb-2">
            Display Order
          </label>

          <input
            type="number"
            value={displayOrder}
            onChange={(e) => setDisplayOrder(e.target.value)}
            placeholder="e.g. 1"
            className="w-full rounded-lg border border-[#cfd8e3] px-4 py-3 text-[14px] outline-none focus:border-[#0a66c2]"
          />

        </div>

        {/* Image */}
        <div className="mb-5">

          <label className="block text-[13px] font-semibold mb-2">
            Company Life Image
          </label>

          <input
            type="file"
            accept="image/*"
            className="
              w-full
              text-sm
              text-gray-500
              file:mr-4
              file:rounded-lg
              file:border-0
              file:bg-gray-100
              file:px-4
              file:py-2
              file:text-sm
              file:font-medium
              file:text-gray-600
              hover:file:bg-gray-200
              cursor-pointer
            "
            onChange={(e) => {

              const file = e.target.files[0];

              if (file) {
                setImage(file);
                setImagePreview(URL.createObjectURL(file));
              }

            }}
          />

        </div>

        {/* Image Preview */}
        {imagePreview && (
          <div className="w-full h-52 rounded-xl overflow-hidden border border-[#dfe3e8] bg-gray-100 mb-5">

            <img
              src={imagePreview}
              alt="Company life preview"
              className="w-full h-full object-cover"
            />

          </div>
        )}

      </div>

      {/* Footer */}
      <div className="flex justify-end gap-3 px-6 py-4 border-t border-[#e5eaf0]">

        <button
          onClick={() => setLifePost(false)}
          className="rounded-full border border-[#b7c3cf] bg-white px-5 py-2.5 text-[13px] font-semibold text-[#444] hover:bg-[#f3f6f8]"
        >
          Cancel
        </button>

        <button
          onClick={handleSubmitLifePost}
          className="rounded-full bg-[#0a66c2] px-6 py-2.5 text-[13px] font-semibold text-white hover:bg-[#004182]"
        >
          Add Company Life
        </button>

      </div>

    </div>

  </div>
)}
          {/* ========================================= */}
          {/* PROFESSIONAL SUMMARY */}
          {/* ========================================= */}

          <div className="
            mt-4
            mb-8
            bg-white
            border border-[#dfe3e8]
            rounded-lg
            px-6 py-5
          ">

            <div className="flex items-start gap-3">

              <div className="
                w-9 h-9
                rounded-lg
                bg-[#e8f3ff]
                flex items-center justify-center
                text-[#0a66c2]
                shrink-0
              ">
                <BriefcaseBusiness size={18} />
              </div>

              <div>

                <h2 className="text-[16px] font-semibold">
                  Recruiter Profile
                </h2>

                <p className="
                  mt-1
                  text-[13px]
                  leading-5
                  text-[#666666]
                ">
                  Your employer profile helps candidates understand who is
                  behind the hiring process and which company you represent.
                </p>

              </div>

            </div>

          </div>

        </div>

      </main>

    </div>
  );
};

export default EmployerProfile;