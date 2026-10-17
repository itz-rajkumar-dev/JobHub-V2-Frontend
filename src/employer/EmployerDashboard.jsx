import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../Service/Api";
import {
  LayoutDashboard,
  Building2,
  BriefcaseBusiness,
  Users,
  FileText,
  Image,
  BarChart3,
  Bell,
  UserRound,
  Settings,
  LogOut,
  Plus,
  ArrowRight,
  MapPin,
  Eye,
  TrendingUp,
  ChevronDown,
  CheckCircle2,
} from "lucide-react";
import NavBar from "../component/NavBar";
import toast from "react-hot-toast";

const EmployerDashboard = () => {

     const [dashboard, setDashboard] = useState({
  totalCompanies: 0,
  activeJobs: 0,
  totalApplications: 0,
  profileViews: 0,
});
   const navigate = useNavigate();
useEffect(() => {
  api.get("/dashboard/employer")
    .then((response) => {
      console.log(response.data);
      setDashboard(response.data);
    })
    .catch((error) => {
      console.log("API ERROR", error);
      toast.error(
        error.response?.data?.message || "Failed to load dashboard"
      );
    });
}, []);

const [application,setApplication]=useState([]);

useEffect(()=>{

    api.get("/applications/my")
    .then((response)=>{

        console.log(response.data);
        setApplication(response.data.content|| []);
    }).catch((error)=>{

        console.log("API ERROR",error);

         toast.error( error.response?.data?.message || "Failed to load Application");
    })
},[]);

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


const [jobCount, setJobCount] = useState(0);
const [applicationCount, setApplicationCount] = useState(0);

useEffect(() => {
  if (!company?.companyId) return;

  Promise.all([
    api.get(`/jobs/internal/company/${company.companyId}/count`),
    api.get(`/applications/internal/company/${company.companyId}/count`)
  ])
    .then(([jobsResponse, applicationsResponse]) => {
      setJobCount(jobsResponse.data);
      setApplicationCount(applicationsResponse.data);
    })
    .catch((error) => {
      console.error("Company counts API error:", error);
    });
}, [company?.companyId]);

const [profile, setProfile] = useState(null);

useEffect(() => {
  api.get("/employer-profile/me")
    .then((response) => {
      console.log("EMPLOYER PROFILE:", response.data);
      setProfile(response.data);
    })
    .catch((error) => {
      console.log("API ERROR", error);
      toast.error("Failed to load employer profile");
    });
}, []);

  return (
    <div className="min-h-screen bg-[#f6f8fc] text-slate-900">

      {/* ================================================= */}
      {/* TOP HEADER */}
      {/* ================================================= */}

     <NavBar/>

      {/* ================================================= */}
      {/* SIDEBAR */}
      {/* ================================================= */}

     


      {/* ================================================= */}
      {/* MAIN CONTENT */}
      {/* ================================================= */}

      <main className="pt-[72px] lg:pl-[265px]">

        <div className="mx-auto max-w-[1400px] px-5 py-7 sm:px-7 lg:px-9 mr-40">


          {/* ================================================= */}
          {/* WELCOME */}
          {/* ================================================= */}

          <section className="mb-6 flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">

          <div className="flex items-center gap-3">

    {/* Profile Image */}
    <div className="w-12 h-12 rounded-full overflow-hidden border border-[#d9d9d9] bg-[#f3f2ef] shrink-0">
        <img
            src={profile?.profileImage}
            alt={profile?.profileImage}
            className="w-full h-full object-cover"
        />
    </div>

    <div>
        <div className="flex items-center gap-2">
            <h1 className="text-[22px] font-semibold text-[#191919]">
               {profile?.fullName}
            </h1>

            <span className="text-[20px]">
                👋
            </span>
        </div>

        <p className="text-[13px] text-[#666666] mt-0.5">
            Employer · JobHub
        </p>
    </div>

</div>
        {/* Post Job CTA */}
<div className="flex items-center justify-between rounded-lg border border-[#e0e0e0] bg-white px-5 py-4">

  {/* Left */}
  <div className="flex items-center gap-4">

    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#e8f3ff] text-[#0a66c2]">
      <Building2 size={22} />
    </div>

    <div>
      <h3 className="text-[15px] font-semibold text-[#191919]">
        Ready to hire?
      </h3>

      <p className="mt-1 text-[13px] text-[#666666]">
        Post a job and find the right candidates for your team.
      </p>
    </div>

  </div>

  {/* Button */}
 <Link
  to="/employer/jobs/create"
  className="flex shrink-0 items-center gap-2 rounded-full 
             border border-[#0a66c2] 
             bg-[#0a66c2] 
             px-4 py-2 
             text-[13px] font-semibold text-white 
             transition hover:bg-[#004182]"
>
  <Plus size={17} />
  Post a job
</Link>

</div>
          </section>


          {/* ================================================= */}
          {/* STATS */}
          {/* ================================================= */}

<div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">

    {/* Total Companies */}
    <div className="bg-white border border-[#e0e0e0] rounded-lg px-4 py-4">
        <div className="flex items-center gap-2 mb-3">
            <div className="w-9 h-9 rounded-lg bg-[#eef6ff] flex items-center justify-center">
                <Building2 className="w-5 h-5 text-[#0a66c2]" />
            </div>
        </div>

        <p className="text-[13px] text-[#666666]">
            Total Companies
        </p>

        <div className="flex items-center gap-2 mt-1">
            <span className="text-[25px] font-semibold text-[#191919]">
               {dashboard.totalCompanies}
            </span>

            <span className="text-[12px] font-semibold text-[#057642]">
                ↗ +100%
            </span>
        </div>

        <p className="text-[12px] text-[#8a8a8a] mt-0.5">
            from last month
        </p>
    </div>


    {/* Active Jobs */}
    <div className="bg-white border border-[#e0e0e0] rounded-lg px-4 py-4">
        <div className="flex items-center gap-2 mb-3">
            <div className="w-9 h-9 rounded-lg bg-[#e9f9f2] flex items-center justify-center">
                <BriefcaseBusiness className="w-5 h-5 text-[#057642]" />
            </div>
        </div>

        <p className="text-[13px] text-[#666666]">
            Active Jobs
        </p>

        <div className="flex items-center gap-2 mt-1">
            <span className="text-[25px] font-semibold text-[#191919]">
              {dashboard.activeJobs}
            </span>

            <span className="text-[12px] font-semibold text-[#057642]">
                ↗ +50%
            </span>
        </div>

        <p className="text-[12px] text-[#8a8a8a] mt-0.5">
            from last month
        </p>
    </div>


    {/* Applications */}
    <div className="bg-white border border-[#e0e0e0] rounded-lg px-4 py-4">
        <div className="flex items-center gap-2 mb-3">
            <div className="w-9 h-9 rounded-lg bg-[#f5edff] flex items-center justify-center">
                <Users className="w-5 h-5 text-[#7c3aed]" />
            </div>
        </div>

        <p className="text-[13px] text-[#666666]">
            Total Applications
        </p>

        <div className="flex items-center gap-2 mt-1">
            <span className="text-[25px] font-semibold text-[#191919]">
               {dashboard.totalApplications}
            </span>

            <span className="text-[12px] font-semibold text-[#057642]">
                ↗ +60%
            </span>
        </div>

        <p className="text-[12px] text-[#8a8a8a] mt-0.5">
            from last month
        </p>
    </div>


    {/* Profile Views */}
    <div className="bg-white border border-[#e0e0e0] rounded-lg px-4 py-4">
        <div className="flex items-center gap-2 mb-3">
            <div className="w-9 h-9 rounded-lg bg-[#fff5e8] flex items-center justify-center">
                <Eye className="w-5 h-5 text-[#f56600]" />
            </div>
        </div>

        <p className="text-[13px] text-[#666666]">
            Profile Views
        </p>

        <div className="flex items-center gap-2 mt-1">
            <span className="text-[25px] font-semibold text-[#191919]">
               {dashboard. profileViews}
            </span>

            <span className="text-[12px] font-semibold text-[#057642]">
                ↗ +40%
            </span>
        </div>

        <p className="text-[12px] text-[#8a8a8a] mt-0.5">
            from last month
        </p>
    </div>

</div>

          {/* ================================================= */}
          {/* MAIN GRID */}
          {/* ================================================= */}

       {/* Recent Applications */}
<div className="bg-white border border-[#dfe3e8] rounded-xl overflow-hidden">

    {/* Header */}
    <div className="flex items-center justify-between px-6 py-5 border-b border-[#e8eaed]">
        <div>
            <h2 className="text-[20px] font-semibold text-[#191919]">
                Recent Applications
            </h2>
            <p className="text-[14px] text-[#6b7280] mt-1">
                Latest candidates who applied to your jobs
            </p>
        </div>

        <button
        
        onClick={()=>navigate("/employer/applications")}
          className="text-[#0a66c2] text-[14px] font-semibold hover:underline">
            View All →
        </button>
    </div>

    {/* Applications */}
    
<div>
  {application.length > 0 ? (
    application.slice(0, 4).map((applications) => (
      <div
        key={applications.applicationId}
        className="flex items-center justify-between px-6 py-4 border-b border-[#e8eaed] hover:bg-[#f8f9fa] transition"
      >
        <div className="flex items-center gap-4 min-w-0">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-semibold text-lg shrink-0 overflow-hidden">
            {applications.profileImage ? (
              <img
                src={applications.profileImage}
                alt={applications.applicantName || "Applicant"}
                className="w-full h-full object-cover"
              />
            ) : (
              applications.applicantName?.charAt(0) || "U"
            )}
          </div>

          <div className="min-w-0">
            <h3 className="text-[15px] font-semibold text-[#191919]">
              {applications.applicantName || "Applicant"}
            </h3>

            <p className="text-[13px] text-[#666666] mt-1">
              {applications.jobTitle || "Job"}
              <span className="mx-2 text-[#b0b0b0]">•</span>
              {applications.companyName || "Company"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-5">
          <span className="text-[13px] text-[#8a8a8a]">
           
{applications.appliedAt
  ? new Date(applications.appliedAt).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
  : ""}

          </span>

          <span className="px-3 py-1.5 rounded-full bg-[#eef6ff] text-[#0a66c2] text-[12px] font-semibold">
            {applications.status || "Pending"}
          </span>
        </div>
      </div>
    ))
  ) : (
    <p className="px-6 py-8 text-center text-slate-500">
      No applications found.
    </p>
  )}
</div>

       </div>


          {/* ================================================= */}
          {/* YOUR COMPANIES */}
          {/* ================================================= */}


{/* Your Company */}
<div className="mt-5 bg-white border border-[#dfe3e8] rounded-lg overflow-hidden">

  {/* Header */}
  <div className="px-5 py-4 border-b border-[#e0e0e0]">
    <h2 className="text-[18px] font-semibold text-[#191919]">
      Your Company
    </h2>

    <p className="text-[13px] text-[#666666] mt-1">
      Your company and job postings
    </p>
  </div>

  {/* Company */}
  {company ? (
    <div className="flex items-center justify-between px-5 py-5">

      {/* Company Info */}
      <div className="flex items-center gap-4">

        {/* Logo */}
        <div className="w-22 h-22 rounded-lg border border-[#dfe3e8] bg-white flex items-center justify-center overflow-hidden shrink-0">
          <img
            src={company.logoUrl}
            alt={company.companyName || "Company logo"}
            className="w-full h-full object-contain p-2"
          />
        </div>

        {/* Details */}
        <div>
          <div className="flex items-center gap-3">
            <h3 className="text-[17px] font-semibold text-[#191919]">
              {company.companyName}
            </h3>

            <span className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-[#057642]">
              <span className="w-2 h-2 rounded-full bg-[#057642]"></span>
              Active
            </span>
          </div>

          <p className="text-[13px] text-[#666666] mt-1">
            {company.industry}
          </p>

          <p className="text-[13px] text-[#8a8a8a] mt-1">
            {company.location}
          </p>

          {/* Stats */}
          <div className="flex items-center gap-3 mt-3 text-[13px] text-[#666666]">
            <span>
              <strong className="font-semibold text-[#191919]">   {jobCount}</strong>{" "}
              Jobs
            </span>

            <span className="text-[#b0b0b0]">•</span>

            <span>
              <strong className="font-semibold text-[#191919]">  {applicationCount}</strong>{" "}
              Applications
            </span>
          </div>
        </div>
      </div>

      {/* Manage */}
      <button
        onClick={() => navigate("/employer/company/manage")}
        className="flex items-center gap-2 rounded-full border border-[#0a66c2] px-4 py-2 text-[13px] font-semibold text-[#0a66c2] hover:bg-[#e8f3ff] transition"
      >
        Manage
        <span className="text-[17px]">→</span>
      </button>

    </div>
  ) : (
    <div className="px-5 py-8 text-center text-sm text-slate-500">
      No company found.
    </div>
  )}

</div>



</div>
      </main>

    </div>
  );
};

export default EmployerDashboard;