import React, { useState } from "react";
import { Link } from "react-router-dom";
import api from "../Service/Api";
import {
  ArrowLeft,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  ChevronDown,
  FileText,
  Image as ImageIcon,
  MapPin,
  Plus,
  X,
  CheckCircle2,
} from "lucide-react";

import NavBar from "../component/NavBar";
import toast from "react-hot-toast";

const PostJob = () => {

    const [job, setJob] = useState({
  title: "",
  description: "",
  responsibilities: "",
  requirements: "",
  qualifications: "",
  benefits: "",
  companyId: "",
  categoryId: "",
  jobType: "",
  workMode: "",
  location: "",
  experienceMin: "",
  experienceMax: "",
  salaryMin: "",
  salaryMax: "",
  salaryCurrency: "INR",
  skills: [],
  vacancies: 1,
  deadline: "",
  featured: false,
});

const postJob = async (e) => {
  e.preventDefault();

  try {
    const response = await api.post("/jobs", job);

    console.log("Job Created:", response.data);

    toast.success("Job created successfully!");

  } catch (error) {
    console.log("API ERROR:", error);

    toast.error(
      error.response?.data?.message || "Failed to create job"
    );
  }
};
  return (
    <div className="min-h-screen bg-[#f3f2ef] text-[#191919]">

      {/* Navbar */}
      <NavBar />

      {/* Main */}
      <main className="pt-[72px]">

        <div className="mx-auto max-w-[1180px] px-5 py-7">

          {/* ================================================= */}
          {/* PAGE HEADER */}
          {/* ================================================= */}

          <div className="flex items-center justify-between mb-5">

            <div>
              <div className="flex items-center gap-2 mb-1">
                <Link
                  to="/employer/dashboard"
                  className="flex items-center gap-1.5 text-[13px] font-medium text-[#666666] hover:text-[#0a66c2]"
                >
                  <ArrowLeft size={15} />
                  Dashboard
                </Link>

                <span className="text-[#b0b0b0]">/</span>

                <span className="text-[13px] text-[#666666]">
                  Post a Job
                </span>
              </div>

              <h1 className="text-[26px] font-semibold text-[#191919]">
                Post a New Job
              </h1>

              <p className="text-[14px] text-[#666666] mt-1">
                Create a job posting and find the right talent for your team.
              </p>
            </div>

            <Link
              to="/employer/dashboard"
              className="
                hidden sm:flex items-center gap-2
                rounded-full
                border border-[#d0d7de]
                bg-white
                px-4 py-2
                text-[13px] font-semibold
                text-[#444444]
                hover:bg-[#f8f9fa]
                transition
              "
            >
              <ArrowLeft size={16} />
              Back to Dashboard
            </Link>

          </div>


          {/* ================================================= */}
          {/* CONTENT GRID */}
          {/* ================================================= */}

          <div className="grid grid-cols-1 lg:grid-cols-[1.8fr_1fr] gap-5">


            {/* ================================================= */}
            {/* LEFT - JOB FORM */}
            {/* ================================================= */}

            <div className="bg-white border border-[#dfe3e8] rounded-lg overflow-hidden">

              {/* Header */}
              <div className="px-6 py-5 border-b border-[#e0e0e0]">

                <div className="flex items-center gap-3">

                  <div className="w-10 h-10 rounded-lg bg-[#e8f3ff] flex items-center justify-center text-[#0a66c2]">
                    <BriefcaseBusiness size={21} />
                  </div>

                  <div>
                    <h2 className="text-[18px] font-semibold text-[#191919]">
                      Job Details
                    </h2>

                    <p className="text-[13px] text-[#666666] mt-0.5">
                      Provide the information candidates need.
                    </p>
                  </div>

                </div>

              </div>


              {/* Form */}
              <div className="p-6">

                 <form onSubmit={postJob}>

                {/* Job Title */}
                <div className="mb-5">

                  <label className="block text-[13px] font-semibold text-[#191919] mb-2">
                    Job Title <span className="text-[#d11124]">*</span>
                  </label>

                  <input
                  value={job.title}
                  onChange={(e)=>setJob({

                    ...job,
                    title: e.target.value
                  })}
                    type="text"
                    placeholder="e.g. Senior Java Developer"
                    className="
                      w-full h-11 rounded-md
                      border border-[#cfd5dc]
                      bg-white
                      px-3.5
                      text-[14px] text-[#191919]
                      outline-none
                      placeholder:text-[#8a8a8a]
                      focus:border-[#0a66c2]
                      focus:ring-1 focus:ring-[#0a66c2]
                    "
                  />

                </div>


                {/* Category + Company */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">

                  {/* Category */}
                  <div>

                    <label className="block text-[13px] font-semibold text-[#191919] mb-2">
                      Category <span className="text-[#d11124]">*</span>
                    </label>

                    <div className="relative">

                      <select
                      value={job.categoryId}
                      onChange={(e)=>setJob({

                        ...job,
                        categoryId:Number(e.target.value)
                      })}
                        className="
                          appearance-none
                          w-full h-11 rounded-md
                          border border-[#cfd5dc]
                          bg-white
                          px-3.5 pr-10
                          text-[14px] text-[#444444]
                          outline-none
                          focus:border-[#0a66c2]
                          focus:ring-1 focus:ring-[#0a66c2]
                        "
                      >
                        <option value="">
                          Select category
                        </option>
                        <option value="2">Software Development</option>
                        <option value="3">Data Science</option>
                        <option value="4">Design</option>
                        <option value="5">Marketing</option>
                        <option value="6">Finance</option>
                        <option value="7">Human Resources</option>
                      </select>

                      <ChevronDown
                        size={17}
                        className="absolute right-3 top-3 pointer-events-none text-[#666666]"
                      />

                    </div>

                  </div>


                  {/* Company */}
                  <div>

                    <label className="block text-[13px] font-semibold text-[#191919] mb-2">
                      Company <span className="text-[#d11124]">*</span>
                    </label>

                    <div className="relative">

                      <select

                          value={job.companyId}
                         onChange={(e) =>
                                 setJob({
                              ...job,
                              companyId: Number(e.target.value)
                             })}
                        className="
                          appearance-none
                          w-full h-11 rounded-md
                          border border-[#cfd5dc]
                          bg-white
                          px-3.5 pr-10
                          text-[14px] text-[#444444]
                          outline-none
                          focus:border-[#0a66c2]
                          focus:ring-1 focus:ring-[#0a66c2]
                        "
                      >
                        <option value="">
                          Select company
                        </option>
                        <option value="2">Amazon</option>
                        <option value="3">Microsoft</option>
                      </select>

                      <ChevronDown
                        size={17}
                        className="absolute right-3 top-3 pointer-events-none text-[#666666]"
                      />

                    </div>

                  </div>

                </div>


                {/* Job Type + Work Mode */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">

                  {/* Job Type */}
                  <div>

                    <label className="block text-[13px] font-semibold text-[#191919] mb-2">
                      Job Type <span className="text-[#d11124]">*</span>
                    </label>

                    <div className="relative">

                      <select

                       value={job.jobType}
                         onChange={(e) =>
                              setJob({
                          ...job,
                     jobType: e.target.value
                     }) }
                        className="
                          appearance-none
                          w-full h-11 rounded-md
                          border border-[#cfd5dc]
                          bg-white
                          px-3.5 pr-10
                          text-[14px] text-[#444444]
                          outline-none
                          focus:border-[#0a66c2]
                          focus:ring-1 focus:ring-[#0a66c2]
                        "
                      >
                        <option value="">
                          Select job type
                        </option>
                        <option>FULL_TIME</option>
                        <option>PART_TIME</option>
                        <option>CONTRACT</option>
                        <option>INTERNSHIP</option>
                        <option>FREELANCE</option>
                      </select>

                      <ChevronDown
                        size={17}
                        className="absolute right-3 top-3 pointer-events-none text-[#666666]"
                      />

                    </div>

                  </div>


                  {/* Work Mode */}
                  <div>

                    <label className="block text-[13px] font-semibold text-[#191919] mb-2">
                      Work Mode <span className="text-[#d11124]">*</span>
                    </label>

                    <div className="relative">

                      <select

                          value={job.workMode}
                    onChange={(e) =>
                    setJob({
                  ...job,
                     workMode: e.target.value
                     })}
                        className="
                          appearance-none
                          w-full h-11 rounded-md
                          border border-[#cfd5dc]
                          bg-white
                          px-3.5 pr-10
                          text-[14px] text-[#444444]
                          outline-none
                          focus:border-[#0a66c2]
                          focus:ring-1 focus:ring-[#0a66c2]
                        "
                      >
                        <option value="">
                          Select work mode
                        </option>
                        <option>ONSITE</option>
                        <option>REMOTE</option>
                        <option>HYBRID</option>
                      </select>

                      <ChevronDown
                        size={17}
                        className="absolute right-3 top-3 pointer-events-none text-[#666666]"
                      />

                    </div>

                  </div>

                </div>


                {/* Location */}
                <div className="mb-5">

                  <label className="block text-[13px] font-semibold text-[#191919] mb-2">
                    Location <span className="text-[#d11124]">*</span>
                  </label>

                  <div className="relative">

                    <MapPin
                      size={17}
                      className="absolute left-3 top-3 text-[#777777]"
                    />

                    <input
                    onChange={(e)=>setJob({
                     ...job,
                     location: e.target.value,
                    })}
                      type="text"
                      placeholder="e.g. Bangalore, India"
                      className="
                        w-full h-11 rounded-md
                        border border-[#cfd5dc]
                        bg-white
                        pl-10 pr-3.5
                        text-[14px]
                        outline-none
                        placeholder:text-[#8a8a8a]
                        focus:border-[#0a66c2]
                        focus:ring-1 focus:ring-[#0a66c2]
                      "
                    />

                  </div>

                </div>


                {/* Salary */}
                <div className="mb-5">

                  <label className="block text-[13px] font-semibold text-[#191919] mb-2">
                    Salary Range
                  </label>

                  <div className="grid grid-cols-1 sm:grid-cols-[100px_1fr_1fr] gap-3">

                    <select

                     value={job.salaryCurrency}
                  onChange={(e) =>
                 setJob({
                   ...job,
                salaryCurrency: e.target.value
                  })}
                      className="
                        h-11 rounded-md
                        border border-[#cfd5dc]
                        bg-white px-3
                        text-[14px]
                        outline-none
                        focus:border-[#0a66c2]
                      "
                    >
                      <option>INR</option>
                      <option>USD</option>
                      <option>EUR</option>
                    </select>

                    <input
                    value={job.salaryMin}
                    onChange={(e)=>setJob({

                        ...job,
                        salaryMin:e.target.value,
                    })}
                      type="number"
                      placeholder="Minimum salary"
                      className="
                        h-11 rounded-md
                        border border-[#cfd5dc]
                        px-3.5 text-[14px]
                        outline-none
                        focus:border-[#0a66c2]
                      "
                    />

                    <input
                       value={job.salaryMax}
                    onChange={(e)=>setJob({

                        ...job,
                        salaryMax:e.target.value,
                    })}
                      type="number"
                      placeholder="Maximum salary"
                      className="
                        h-11 rounded-md
                        border border-[#cfd5dc]
                        px-3.5 text-[14px]
                        outline-none
                        focus:border-[#0a66c2]
                      "
                    />

                  </div>

                </div>


                {/* Experience */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">

                  <div>

                    <label className="block text-[13px] font-semibold text-[#191919] mb-2">
                      Minimum Experience
                    </label>

                    <input
                    value={job.experienceMin}
                    onChange={(e) =>
                    setJob({
                      ...job,
                        experienceMin: e.target.value
                     })
                                }
                      type="number"
                      min="0"
                      placeholder="e.g. 2 years"
                      className="
                        w-full h-11 rounded-md
                        border border-[#cfd5dc]
                        px-3.5 text-[14px]
                        outline-none
                        focus:border-[#0a66c2]
                      "
                    />

                  </div>


                  <div>

                    <label className="block text-[13px] font-semibold text-[#191919] mb-2">
                      Maximum Experience
                    </label>

                    <input

                      value={job.experienceMax}
                    onChange={(e)=>setJob({

                        ...job,
                        experienceMax:e.target.value
                    })}
                      type="number"
                      min="0"
                      placeholder="e.g. 5 years"
                      className="
                        w-full h-11 rounded-md
                        border border-[#cfd5dc]
                        px-3.5 text-[14px]
                        outline-none
                        focus:border-[#0a66c2]
                      "
                    />

                  </div>

                </div>


                {/* Description */}
                <div className="mb-5">

                  <label className="block text-[13px] font-semibold text-[#191919] mb-2">
                    Job Description <span className="text-[#d11124]">*</span>
                  </label>

                  <textarea
                  value={job.description}
                  onChange={(e)=>setJob({

                    ...job,
                    description:e.target.value,
                  })}
                    rows="6"
                    placeholder="Describe the role, responsibilities, and what you are looking for..."
                    className="
                      w-full rounded-md
                      border border-[#cfd5dc]
                      px-3.5 py-3
                      text-[14px]
                      resize-none
                      outline-none
                      placeholder:text-[#8a8a8a]
                      focus:border-[#0a66c2]
                      focus:ring-1 focus:ring-[#0a66c2]
                    "
                  />

                  <p className="text-right text-[11px] text-[#8a8a8a] mt-1">
                    Maximum 2000 characters
                  </p>

                </div>


                {/* Responsibilities */}
                <div className="mb-5">

                  <label className="block text-[13px] font-semibold text-[#191919] mb-2">
                    Responsibilities
                  </label>

                  <textarea
                    value={job.responsibilities}
                  onChange={(e)=>setJob({

                    ...job,
                    responsibilities:e.target.value,
                  })}
                    rows="5"
                    placeholder="List the key responsibilities for this role..."
                    className="
                      w-full rounded-md
                      border border-[#cfd5dc]
                      px-3.5 py-3
                      text-[14px]
                      resize-none
                      outline-none
                      placeholder:text-[#8a8a8a]
                      focus:border-[#0a66c2]
                    "
                  />

                </div>


                {/* Requirements + Qualifications */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">

                  <div>

                    <label className="block text-[13px] font-semibold text-[#191919] mb-2">
                      Requirements
                    </label>

                    <textarea
                      value={job.requirements}
                  onChange={(e)=>setJob({

                    ...job,
                    requirements:e.target.value,
                  })}
                      rows="5"
                      placeholder="Required skills, experience and technical knowledge..."
                      className="
                        w-full rounded-md
                        border border-[#cfd5dc]
                        px-3.5 py-3
                        text-[14px]
                        resize-none
                        outline-none
                        placeholder:text-[#8a8a8a]
                        focus:border-[#0a66c2]
                      "
                    />

                  </div>


                  <div>

                    <label className="block text-[13px] font-semibold text-[#191919] mb-2">
                      Qualifications
                    </label>

                    <textarea
                      value={job.qualifications}
                  onChange={(e)=>setJob({

                    ...job,
                    qualifications:e.target.value,
                  })}
                      rows="5"
                      placeholder="Education, certifications or other qualifications..."
                      className="
                        w-full rounded-md
                        border border-[#cfd5dc]
                        px-3.5 py-3
                        text-[14px]
                        resize-none
                        outline-none
                        placeholder:text-[#8a8a8a]
                        focus:border-[#0a66c2]
                      "
                    />

                  </div>

                </div>


                {/* Benefits */}
                <div className="mb-5">

                  <label className="block text-[13px] font-semibold text-[#191919] mb-2">
                    Benefits
                  </label>

                  <textarea
                    value={job.benefits}
                  onChange={(e)=>setJob({

                    ...job,
                    benefits:e.target.value,
                  })}
                    rows="4"
                    placeholder="Health insurance, flexible work hours, learning opportunities..."
                    className="
                      w-full rounded-md
                      border border-[#cfd5dc]
                      px-3.5 py-3
                      text-[14px]
                      resize-none
                      outline-none
                      placeholder:text-[#8a8a8a]
                      focus:border-[#0a66c2]
                    "
                  />

                </div>


                {/* Skills */}
                <div className="mb-5">

                  <label className="block text-[13px] font-semibold text-[#191919] mb-2">
                    Skills
                  </label>

                  <input  
                       
                       value={job.skills.join(", ")}
                        onChange={(e) =>
                     setJob({
                     ...job,
                     skills: e.target.value
                    .split(",")
                    .map(skill => skill.trim())
                    .filter(skill => skill !== "")
                     })}
                    type="text"
                    placeholder="Add skills e.g. Java, Spring Boot, React"
                    className="
                      w-full h-11 rounded-md
                      border border-[#cfd5dc]
                      px-3.5 text-[14px]
                      outline-none
                      placeholder:text-[#8a8a8a]
                      focus:border-[#0a66c2]
                    "
                  />

                  <div className="flex flex-wrap gap-2 mt-2">

                    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#eef3f8] px-3 py-1.5 text-[12px] font-medium text-[#444444]">
                      Java
                      <X size={13} />
                    </span>

                    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#eef3f8] px-3 py-1.5 text-[12px] font-medium text-[#444444]">
                      Spring Boot
                      <X size={13} />
                    </span>

                    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#eef3f8] px-3 py-1.5 text-[12px] font-medium text-[#444444]">
                      React
                      <X size={13} />
                    </span>

                  </div>

                </div>


                {/* Vacancies + Deadline */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">

                  <div>

                    <label className="block text-[13px] font-semibold text-[#191919] mb-2">
                      Number of Vacancies
                    </label>

                    <input
                      value={job.vacancies}
                  onChange={(e)=>setJob({

                    ...job,
                    vacancies:e.target.value,
                  })}
                      type="number"
                      min="1"
                      placeholder="e.g. 5"
                      className="
                        w-full h-11 rounded-md
                        border border-[#cfd5dc]
                        px-3.5 text-[14px]
                        outline-none
                        focus:border-[#0a66c2]
                      "
                    />

                  </div>


                  <div>

                    <label className="block text-[13px] font-semibold text-[#191919] mb-2">
                      Application Deadline
                    </label>

                    <div className="relative">

                      <CalendarDays
                        size={17}
                        className="absolute left-3 top-3 text-[#777777]"
                      />

                      <input
                        value={job.deadline}
                  onChange={(e)=>setJob({

                    ...job,
                    deadline:e.target.value,
                  })}
                        type="date"
                        className="
                          w-full h-11 rounded-md
                          border border-[#cfd5dc]
                          pl-10 pr-3
                          text-[14px]
                          outline-none
                          focus:border-[#0a66c2]
                        "
                      />

                    </div>

                  </div>

                </div>


                {/* Featured */}
                <div className="flex items-center justify-between border border-[#e0e0e0] rounded-lg px-4 py-3 mb-6">

                  <div className="flex items-center gap-3">

                    <div className="w-9 h-9 rounded-lg bg-[#fff8e6] flex items-center justify-center text-[#b77900]">
                      <CheckCircle2 size={18} />
                    </div>

                    <div>
                      <p className="text-[13px] font-semibold text-[#191919]">
                        Featured Job
                      </p>

                      <p className="text-[12px] text-[#777777]">
                        Highlight this job to reach more candidates.
                      </p>
                    </div>

                  </div>

                  <input
                    type="checkbox"
                    className="w-4 h-4 accent-[#0a66c2]"
                  />

                </div>


                {/* Bottom Actions */}
                <div className="flex items-center justify-end gap-3 pt-5 border-t border-[#e0e0e0]">

                  <Link
                    to="/employer/dashboard"
                    className="
                      rounded-full
                      border border-[#cfd5dc]
                      bg-white
                      px-5 py-2.5
                      text-[13px] font-semibold
                      text-[#444444]
                      hover:bg-[#f8f9fa]
                    "
                  >
                    Cancel
                  </Link>

                  <button
                    type="submit"
                    className="
                      flex items-center gap-2
                      rounded-full
                      bg-[#0a66c2]
                      px-6 py-2.5
                      text-[13px] font-semibold
                      text-white
                      hover:bg-[#004182]
                      transition
                    "
                  >
                    <Plus size={17} />
                    Post Job
                  </button>

                </div>

                </form>

              </div>

            </div>


            {/* ================================================= */}
            {/* RIGHT SIDEBAR */}
            {/* ================================================= */}

            <div className="space-y-5">


              {/* Company & Media */}
              <div className="bg-white border border-[#dfe3e8] rounded-lg overflow-hidden">

                <div className="px-5 py-4 border-b border-[#e0e0e0]">

                  <h2 className="text-[17px] font-semibold text-[#191919]">
                    Company & Media
                  </h2>

                  <p className="text-[12px] text-[#666666] mt-1">
                    Select your company and add a job image.
                  </p>

                </div>


                <div className="p-5">

                  {/* Company */}
                  <label className="block text-[13px] font-semibold text-[#191919] mb-2">
                    Select Company
                  </label>

                  <div className="relative mb-5">

                    <select
                      className="
                        appearance-none
                        w-full h-11
                        rounded-md
                        border border-[#cfd5dc]
                        bg-white
                        px-3.5 pr-10
                        text-[14px]
                        outline-none
                        focus:border-[#0a66c2]
                      "
                    >
                      <option>Amazon</option>
                      <option>Microsoft</option>
                    </select>

                    <ChevronDown
                      size={17}
                      className="absolute right-3 top-3 pointer-events-none text-[#666666]"
                    />

                  </div>


                  {/* Image Upload */}
                  <label className="block text-[13px] font-semibold text-[#191919] mb-2">
                    Job Image
                    <span className="font-normal text-[#888888]">
                      {" "} (Optional)
                    </span>
                  </label>

                  <label
                    className="
                      flex flex-col items-center justify-center
                      h-36
                      rounded-lg
                      border border-dashed border-[#cfd5dc]
                      bg-[#fafbfc]
                      cursor-pointer
                      hover:bg-[#f5f8fa]
                      transition
                    "
                  >

                    <ImageIcon
                      size={28}
                      className="text-[#7a8694] mb-2"
                    />

                    <span className="text-[13px] font-semibold text-[#444444]">
                      Upload a job image
                    </span>

                    <span className="text-[11px] text-[#888888] mt-1">
                      PNG, JPG, WEBP
                    </span>

                    <span className="mt-2 rounded-full border border-[#0a66c2] px-3 py-1 text-[12px] font-semibold text-[#0a66c2]">
                      Choose File
                    </span>

                    <input
                      type="file"
                      accept="image/png,image/jpeg,image/webp"
                      className="hidden"
                    />

                  </label>


                  {/* Info */}
                  <div className="mt-3 rounded-lg bg-[#eef6ff] px-3 py-3">

                    <div className="flex gap-2">

                      <FileText
                        size={16}
                        className="text-[#0a66c2] shrink-0 mt-0.5"
                      />

                      <p className="text-[11px] leading-4 text-[#0a66c2]">
                        A clear job image can make your posting more
                        attractive to candidates.
                      </p>

                    </div>

                  </div>

                </div>

              </div>


              {/* Job Preview */}
              <div className="bg-white border border-[#dfe3e8] rounded-lg overflow-hidden">

                <div className="px-5 py-4 border-b border-[#e0e0e0]">

                  <h2 className="text-[17px] font-semibold text-[#191919]">
                    Job Preview
                  </h2>

                  <p className="text-[12px] text-[#666666] mt-1">
                    Preview how your job will appear to candidates.
                  </p>

                </div>


                <div className="p-5">

                  <div className="border border-[#dfe3e8] rounded-lg p-4">

                    {/* Company */}
                    <div className="flex items-start gap-3">

                      <div className="w-11 h-11 rounded-lg border border-[#dfe3e8] flex items-center justify-center bg-white overflow-hidden shrink-0">

                        <Building2
                          size={22}
                          className="text-[#666666]"
                        />

                      </div>

                      <div className="min-w-0">

                        <h3 className="text-[15px] font-semibold text-[#191919]">
                          Senior Java Developer
                        </h3>

                        <p className="text-[12px] text-[#666666] mt-1">
                          Amazon · Bangalore, India
                        </p>

                      </div>

                    </div>


                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mt-4">

                      <span className="rounded-full bg-[#eaf8f0] px-2.5 py-1 text-[11px] font-semibold text-[#057642]">
                        Full Time
                      </span>

                      <span className="rounded-full bg-[#eef6ff] px-2.5 py-1 text-[11px] font-semibold text-[#0a66c2]">
                        Mid Level
                      </span>

                      <span className="rounded-full bg-[#f3f2ef] px-2.5 py-1 text-[11px] font-semibold text-[#666666]">
                        Hybrid
                      </span>

                    </div>


                    {/* Description */}
                    <p className="text-[12px] leading-5 text-[#666666] mt-4">
                      We are looking for a skilled developer to join our
                      engineering team and build scalable applications...
                    </p>


                    {/* Preview footer */}
                    <div className="flex items-center justify-between mt-4 pt-3 border-t border-[#e8eaed]">

                      <span className="text-[11px] text-[#888888]">
                        Posted just now
                      </span>

                      <span className="text-[12px] font-semibold text-[#0a66c2]">
                        View Job →
                      </span>

                    </div>

                  </div>

                </div>

              </div>


              {/* Tips */}
              <div className="bg-[#eef6ff] border border-[#cfe5ff] rounded-lg p-4">

                <div className="flex gap-3">

                  <div className="w-8 h-8 rounded-full bg-[#dceeff] flex items-center justify-center shrink-0">
                    <BriefcaseBusiness
                      size={16}
                      className="text-[#0a66c2]"
                    />
                  </div>

                  <div>

                    <h3 className="text-[13px] font-semibold text-[#191919]">
                      Hiring tip
                    </h3>

                    <p className="text-[12px] leading-5 text-[#666666] mt-1">
                      Clear requirements and responsibilities help attract
                      more relevant candidates.
                    </p>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </main>

    </div>
  );
};

export default PostJob;