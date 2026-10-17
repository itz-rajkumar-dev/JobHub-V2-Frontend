
import {
  ArrowLeft,
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  CheckCircle2,
  FileText,
  Info,
  MapPin,
  ShieldCheck,
  Upload,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import api from "../../Service/Api";
import { Link, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import NavBar from "../../component/NavBar";

export default function ApplicationForm() {

const { jobId } = useParams();
const [application, setApplication] = useState(null);

const applyApplication = async (formData) => {
  try {
    const response = await api.post("/applications", formData);

    console.log("APPLICATION SUCCESS:", response.data);

    setApplication(response.data);

    toast.success("Application submitted successfully!");
     navigate("/applications");
  } catch (error) {
  const backendErrors = error.response?.data?.error;

  if (backendErrors) {
    setFieldErrors((prev) => ({
      ...prev,
      ...backendErrors
    }));
  }

  toast.error(
    error.response?.data?.message ||
    "Failed to submit application"
  );
}
};
  


const handleSubmit = async (e) => {
  e.preventDefault();

  const form = e.currentTarget;
  const formData = new FormData(form);

  formData.set("jobId", jobId);

  await applyApplication(formData);
};

const [selectedJob, setSelectedJob] = useState(null);
const[jobData,setJobData]=useState(null);
const [company, setCompany] = useState(null);
const [loadingJob, setLoadingJob] = useState(true);

useEffect(() => {
  const fetchJobDetails = async () => {
    try {
      const response = await api.get(`/jobs/${jobId}`);
      const jobData = response.data;

      setSelectedJob(jobData);

      const companyResponse = await api.get(
        `/company/${jobData.companyId}`
      );

      setCompany(companyResponse.data);
    } catch (error) {
      console.error("JOB DETAILS ERROR:", error);
      toast.error("Unable to load job details");
    } finally {
      setLoadingJob(false);
    }
  };

  if (jobId) {
    fetchJobDetails();
  }
}, [jobId]);
  const [resume, setResume] = useState(null);
const [additionalDocuments, setAdditionalDocuments] = useState([]);
const [applicantPhone, setApplicantPhone] = useState("");

const[reviewApplication ,setReviewApplication]=useState(false);
const [fieldErrors, setFieldErrors] = useState({});
  return (
    <div className="min-h-screen bg-[#f3f2ef] text-[#191919]">

      {/* TOP NAVIGATION */}
     <NavBar/>

      {/* PAGE CONTENT */}
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">

        {/* BREADCRUMB */}
        <div className="mb-5 flex flex-wrap items-center gap-2 text-sm text-[#666666]">
          <Link to="/" className="hover:text-[#0a66c2]">
            Home
          </Link>

          <span>/</span>

          <Link to="/saved-jobs" className="hover:text-[#0a66c2]">
            Saved Jobs
          </Link>

          <span>/</span>

          <span className="font-semibold text-[#191919]">
            Application Form
          </span>
        </div>

        {/* PAGE HEADING */}
        <section className="mb-6 rounded-xl border border-[#d6d6d6] bg-white p-5 sm:p-7">

          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

            <div>
              <div className="mb-3 inline-flex items-center gap-2 text-sm font-semibold text-[#0a66c2]">
                <FileText size={18} />
                YOUR NEXT CAREER OPPORTUNITY
              </div>

              <h2 className="text-2xl font-bold tracking-tight text-[#191919] sm:text-3xl">
                Complete your application
              </h2>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-[#666666]">
                Share your experience, upload your resume and submit your
                application to the hiring team.
              </p>
            </div>

            <div className="flex items-center gap-2 self-start rounded-full border border-[#badbcc] bg-[#f0fdf4] px-3 py-2 text-xs font-semibold text-[#137333] sm:self-center">
              <ShieldCheck size={16} />
              Secure application
            </div>

          </div>

          <div className="mt-6 h-1.5 overflow-hidden rounded-full bg-[#e8e8e8]">
            <div className="h-full w-1/2 rounded-full bg-[#0a66c2]" />
          </div>

          <div className="mt-2 flex justify-between text-xs text-[#666666]">
            <span>Application details</span>
            <span>Review before submitting</span>
          </div>

        </section>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-3">

          {/* LEFT APPLICATION FORM */}
          <div className="space-y-5 lg:col-span-2">

            {/* JOB DETAILS */}
            <section className="overflow-hidden rounded-xl border border-[#d6d6d6] bg-white">

              <div className="border-b border-[#e8e8e8] px-5 py-4 sm:px-6">
                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#eaf4ff] text-[#0a66c2]">
                    <BriefcaseBusiness size={20} />
                  </div>

                  <div>
                    <h3 className="font-semibold text-[#191919]">
                      Job information
                    </h3>

                    <p className="mt-1 text-xs text-[#666666]">
                      Confirm the position you want to apply for.
                    </p>
                  </div>

                </div>
              </div>

              <div className="p-5 sm:p-6">

              {loadingJob ? (
  <p className="p-5 text-sm text-[#666666]">
    Loading job details...
  </p>
) : selectedJob ? (
  <div className="flex items-start gap-4">
    <div className="flex h-25 w-25 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-[#d6d6d6] bg-white">
      {company?.logoUrl ? (
        <img
          src={company.logoUrl}
          alt={company.companyName || "Company"}
          className="h-full w-full object-contain p-2"
        />
      ) : (
        <span className="text-xl font-bold text-[#0a66c2]">
          {(company?.companyName || "J").charAt(0)}
        </span>
      )}
    </div>

    <div className="min-w-0 flex-1">
    <h4 className="text-sm font-semibold">
  {selectedJob?.title || "Loading job..."}
</h4>

<p className="mt-1 text-xs text-[#666666]">
  {company?.companyName || "Loading company..."}
</p>
      <span
        className={`mt-3 inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${
          selectedJob.status === "OPEN"
            ? "border-emerald-200 bg-emerald-50 text-emerald-700"
            : "border-gray-200 bg-gray-50 text-gray-600"
        }`}
      >
        {selectedJob.status || "Status unavailable"}
      </span>
    </div>
  </div>
) : (
  <p className="text-sm text-red-600">
    Job details could not be found.
  </p>
)}

                <div className="mt-4">
                  <label className="mb-2 block text-sm font-semibold">
                    Job ID <span className="text-red-600">*</span>
                  </label>

                  <input
                    type="number"
                    name="jobId"
                      value={jobId || ""}
                        readOnly
                    className="w-full rounded-lg border border-[#bfbfbf] bg-white px-3 py-2.5 text-sm outline-none transition placeholder:text-[#888888] focus:border-[#0a66c2] focus:ring-2 focus:ring-blue-100"
                  />
                </div>

              </div>
            </section>

     <form
  id="applicationForm"
  onSubmit={handleSubmit}
  encType="multipart/form-data"
  noValidate
>
            {/* RESUME */}
            <section className="overflow-hidden rounded-xl border border-[#d6d6d6] bg-white">

              <div className="border-b border-[#e8e8e8] px-5 py-4 sm:px-6">

                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#eaf4ff] text-[#0a66c2]">
                    <FileText size={20} />
                  </div>

                  <div>
                    <h3 className="font-semibold text-[#191919]">
                      Resume and documents
                    </h3>

                    <p className="mt-1 text-xs text-[#666666]">
                      Upload your resume and supporting documents.
                    </p>
                  </div>

                </div>

              </div>

              <div className="space-y-5 p-5 sm:p-6">

                <div>
                  <label className="mb-2 block text-sm font-semibold">
                    Resume <span className="text-red-600">*</span>
                  </label>

                  <label className="flex cursor-pointer flex-col items-center rounded-xl border-2 border-dashed border-[#bfbfbf] bg-[#fafafa] px-4 py-8 text-center transition hover:border-[#0a66c2] hover:bg-[#f5f9ff]">

                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#eaf4ff] text-[#0a66c2]">
                      <Upload size={23} />
                    </div>

                    <span className="mt-3 text-sm font-semibold text-[#0a66c2]">
                      Upload your resume
                    </span>

                    <span className="mt-1 text-xs text-[#666666]">
                      Click to browse files from your device
                    </span>

                    <span className="mt-2 text-xs text-[#888888]">
                      PDF, DOC or DOCX
                    </span>

                    <input
    id="resume"
    type="file"
    name="resume"
    accept=".pdf,.doc,.docx"
    required
        className={`w-full rounded-lg border px-3 py-2.5 pl-10 pr-3 text-sm outline-none transition read sr-only ${
    fieldErrors.resume
      ? "border-red-500 focus:ring-2 focus:ring-red-100"
      : "border-[#bfbfbf] focus:border-[#0a66c2] focus:ring-2 focus:ring-blue-100"
  }`}
    onChange={(e) => setResume(e.target.files[0] || null)}

    
  />

 {fieldErrors.resume && (
  <p className="mt-2 text-sm text-red-600">
    {fieldErrors.resume}
  </p>
)}

  {resume && (
    <div className="mt-4 flex items-center justify-between rounded-lg border border-[#d6d6d6] bg-white p-3 text-left">
      <div className="flex min-w-0 items-center gap-2">
        <FileText size={20} className="shrink-0 text-[#0a66c2]" />
        <span className="truncate text-sm font-medium">
          {resume.name}
        </span>
      </div>

      <button
        type="button"
        onClick={() => {
          setResume(null);
          document.getElementById("resume").value = "";
        }}
        className="ml-3 text-sm font-medium text-red-600 hover:underline"
      >
        Remove
      </button>
    </div>
  )}

                  </label>

                  <p className="mt-2 text-xs text-[#777777]">
                    A resume is required to submit your application.
                  </p>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold">
                    Additional documents
                    <span className="ml-1 font-normal text-[#777777]">
                      (Optional)
                    </span>
                  </label>

                  <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-[#d6d6d6] p-4 transition hover:border-[#0a66c2] hover:bg-[#f8fbff]">

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#f3f2ef] text-[#666666]">
                      <Upload size={19} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-[#191919]">
                        Upload supporting documents
                      </p>

                      <p className="mt-1 text-xs text-[#666666]">
                        Certificates, portfolio or other relevant files
                      </p>
                    </div>

                    <input
                      type="file"
                      name="additionalDocuments"
                     
                        onChange={(e) => {
    setAdditionalDocuments(Array.from(e.target.files));
  }}
                      multiple
                      className="sr-only"
                    />


  
                  </label>

                  {additionalDocuments.map((file, index) => (
  <div
    key={`${file.name}-${index}`}
    className="mt-2 flex items-center justify-between rounded-lg border border-[#d6d6d6]  p-3"
  >
    <span className="truncate text-sm">{file.name}</span>

    <button
      type="button"
      onClick={() => {
        setAdditionalDocuments((prev) =>
          prev.filter((_, i) => i !== index)
        );
      }}
      className="ml-3 text-sm text-red-600 hover:underline"
    >
      Remove
    </button>
  </div>
))}
                </div>

                

              </div>
            </section>

            {/* PROFESSIONAL DETAILS */}
            <section className="overflow-hidden rounded-xl border border-[#d6d6d6] bg-white">

              <div className="border-b border-[#e8e8e8] px-5 py-4 sm:px-6">

                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#eaf4ff] text-[#0a66c2]">
                    <BriefcaseBusiness size={20} />
                  </div>

                  <div>
                    <h3 className="font-semibold text-[#191919]">
                      Professional details
                    </h3>

                    <p className="mt-1 text-xs text-[#666666]">
                      Tell the employer about your experience and expectations.
                    </p>
                  </div>

                </div>

              </div>

              <div className="space-y-5 p-5 sm:p-6">

                <div>
                  <label className="mb-2 block text-sm font-semibold">
                    Years of experience
                  </label>

              <input
  type="number"
  name="experienceYears"
  defaultValue={application?.experienceYears ?? ""}
  min="0"
  placeholder="e.g. 2"
  className={`w-full rounded-lg border px-3 py-2.5 text-sm outline-none transition ${
    fieldErrors.experienceYears
      ? "border-red-500 focus:ring-2 focus:ring-red-100"
      : "border-[#bfbfbf] focus:border-[#0a66c2] focus:ring-2 focus:ring-blue-100"
  }`}
/>

{fieldErrors.experienceYears && (
  <p className="mt-1 text-sm text-red-600">
    {fieldErrors.experienceYears}
  </p>
)}

                  <p className="mt-1.5 text-xs text-[#777777]">
                    Enter 0 if you are a fresher.
                  </p>
                </div>




                
{/* APPLICANT PHONE */}
<div>
  <label className="mb-2 block text-sm font-semibold">
    Phone number <span className="text-red-600">*</span>
  </label>

 <input
  type="tel"
  name="applicantPhone"
  defaultValue={application?.applicantPhone ?? ""}
  placeholder="Enter your 10-digit mobile number"
  maxLength={10}
  required
  className={`w-full rounded-lg border px-3 py-2.5 text-sm outline-none transition ${
    fieldErrors.applicantPhone
      ? "border-red-500 focus:ring-2 focus:ring-red-100"
      : "border-[#bfbfbf] focus:border-[#0a66c2] focus:ring-2 focus:ring-blue-100"
  }`}
/>

{fieldErrors.applicantPhone && (
  <p className="mt-1 text-sm text-red-600">
    {fieldErrors.applicantPhone}
  </p>
)}

  <p className="mt-1.5 text-xs text-[#777777]">
    Employers may use this number to contact you about your application.
  </p>
</div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                  <div>
                    <label className="mb-2 block text-sm font-semibold">
                      Expected salary
                    </label>

                    <input
                      type="number"
                      name="expectedSalary"
                      defaultValue={application?.expectedSalary}
                      min="0"
                      placeholder="e.g. 600000"
                      className={`w-full rounded-lg border px-3 py-2.5 pl-10 pr-3 text-sm outline-none transition ${
    fieldErrors.expectedSalary
      ? "border-red-500 focus:ring-2 focus:ring-red-100"
      : "border-[#bfbfbf] focus:border-[#0a66c2] focus:ring-2 focus:ring-blue-100"
  }`}
                    />


                    {fieldErrors.expectedSalary && (
  <p className="mt-1 text-sm text-red-600">
    {fieldErrors.expectedSalary}
  </p>
)}
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold">
                      Salary currency
                    </label>

                    <select
                      name="salaryCurrency"
                      defaultValue={application?.salaryCurrency}
                      className="w-full rounded-lg border border-[#bfbfbf] bg-white px-3 py-2.5 text-sm outline-none transition focus:border-[#0a66c2] focus:ring-2 focus:ring-blue-100"
                    >
                      <option value="INR">INR - Indian Rupee</option>
                      <option value="USD">USD - US Dollar</option>
                      <option value="EUR">EUR - Euro</option>
                      <option value="GBP">GBP - British Pound</option>
                    </select>
                  </div>

                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold">
                    Your current location
                    <span className="text-red-600"> *</span>
                  </label>

                  <div className="relative">
                    <MapPin
                      size={17}
                      className="absolute left-3 top-1/3 -translate-y-1/2 text-[#777777] "
                    />

<input
  type="text"
  name="applicantLocation"
  defaultValue={application?.applicantLocation}
  required
  placeholder="City, state or country"
  className={`w-full rounded-lg border px-3 py-2.5 pl-10 pr-3 text-sm outline-none transition ${
    fieldErrors.applicantLocation
      ? "border-red-500 focus:ring-2 focus:ring-red-100"
      : "border-[#bfbfbf] focus:border-[#0a66c2] focus:ring-2 focus:ring-blue-100"
  }`}
/>

{fieldErrors.applicantLocation && (
  <p className="mt-1 text-sm text-red-600">
    {fieldErrors.applicantLocation}
  </p>
)}



                  </div>
                </div>




              

              </div>
            </section>

            {/* WORK PREFERENCES */}
            <section className="overflow-hidden rounded-xl border border-[#d6d6d6] bg-white">

              <div className="border-b border-[#e8e8e8] px-5 py-4 sm:px-6">

                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#eaf4ff] text-[#0a66c2]">
                    <ShieldCheck size={20} />
                  </div>

                  <div>
                    <h3 className="font-semibold text-[#191919]">
                      Work preferences and authorization
                    </h3>

                    <p className="mt-1 text-xs text-[#666666]">
                      Provide the information needed by the hiring team.
                    </p>
                  </div>

                </div>

              </div>

              <div className="space-y-6 p-5 sm:p-6">

                {/* REMOTE */}
                <div>
                  <p className="mb-3 text-sm font-semibold">
                    Are you open to remote work?
                  </p>

                  <div className="flex flex-wrap gap-3">

                    <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-[#d6d6d6] px-4 py-3 text-sm transition hover:border-[#0a66c2]">
                      <input
                        type="radio"
                        name="openToRemote"
                        defaultValue={application?.openToRemote}
                        value="true"
                        className="accent-[#0a66c2]"
                      />
                      Yes, I am
                    </label>

                    <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-[#d6d6d6] px-4 py-3 text-sm transition hover:border-[#0a66c2]">
                      <input
                        type="radio"
                        name="openToRemote"
                          defaultValue={application?.openToRemote}
                        value="false"
                        className="accent-[#0a66c2]"
                      />
                      No, I prefer on-site
                    </label>

                  </div>
                </div>

                <div className="border-t border-[#eeeeee]" />

                {/* AUTHORIZATION */}
                <div>
                  <p className="mb-1 text-sm font-semibold">
                    Are you legally authorized to work in the job's country?
                    <span className="text-red-600"> *</span>
                  </p>

                  <p className="mb-3 text-xs leading-5 text-[#777777]">
                    Select the answer that accurately reflects your current work authorization.
                  </p>

                  <div className="flex flex-wrap gap-3">

                    <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-[#d6d6d6] px-4 py-3 text-sm transition hover:border-[#0a66c2]">
                      <input
                        type="radio"
                        name="workAuthorized"
                         defaultValue={application?.workAuthorized}
                        value="true"
                        required
                        className="accent-[#0a66c2]"
                      />
                      Yes
                    </label>

                    <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-[#d6d6d6] px-4 py-3 text-sm transition hover:border-[#0a66c2]">
                      <input
                        type="radio"
                        name="workAuthorized"
                        defaultValue={application?.workAuthorized}
                        value="false"
                        required
                        className="accent-[#0a66c2]"
                      />
                      No
                    </label>

                  </div>
                </div>

                <div className="border-t border-[#eeeeee]" />

                {/* SPONSORSHIP */}
                <div>
                  <p className="mb-1 text-sm font-semibold">
                    Will you require visa or employment sponsorship?
                    <span className="text-red-600"> *</span>
                  </p>

                  <p className="mb-3 text-xs leading-5 text-[#777777]">
                    Let the employer know whether sponsorship is needed now or in the future.
                  </p>

                  <div className="flex flex-wrap gap-3">

                    <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-[#d6d6d6] px-4 py-3 text-sm transition hover:border-[#0a66c2]">
                      <input
                        type="radio"
                        name="requiresSponsorship"
                   
                        value="true"
                        required
                        className="accent-[#0a66c2]"
                      />
                      Yes
                    </label>

                    <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-[#d6d6d6] px-4 py-3 text-sm transition hover:border-[#0a66c2]">
                      <input
                        type="radio"
                        name="requiresSponsorship"
                      
                        value="false"
                        required
                        className="accent-[#0a66c2]"
                      />
                      No
                    </label>

                  </div>
                </div>

              </div>
            </section>

            {/* COVER LETTER */}
            <section className="overflow-hidden rounded-xl border border-[#d6d6d6] bg-white">

              <div className="border-b border-[#e8e8e8] px-5 py-4 sm:px-6">
                <h3 className="font-semibold text-[#191919]">
                  Cover letter
                </h3>

                <p className="mt-1 text-xs text-[#666666]">
                  Introduce yourself to the hiring team.
                </p>
              </div>

              <div className="p-5 sm:p-6">

                <label className="mb-2 block text-sm font-semibold">
                  Why should the employer consider you?
                </label>

                <textarea
                  rows={5}
                  maxLength={5000}
                  name="employerNotes"
                  defaultValue={application?.employerNotes}
                  placeholder="Briefly introduce yourself and explain how your experience and skills match this role..."
                  className="w-full resize-y rounded-lg border border-[#bfbfbf] px-3 py-3 text-sm leading-6 outline-none transition placeholder:text-[#888888] focus:border-[#0a66c2] focus:ring-2 focus:ring-blue-100"
                />

                <p className="mt-2 text-xs text-[#777777]">
                  Optional · Maximum 5000 characters
                </p>

                <div className="mt-5">
                  <label className="mb-2 block text-sm font-semibold">
                    Why are you interested in this position?
                  </label>

                  <textarea
                    rows={4}
                    maxLength={5000}
                    name="coverLetter"
                    defaultValue={application?.coverLetter}
                    placeholder="Tell us what interests you about this opportunity..."
                    className="w-full resize-y rounded-lg border border-[#bfbfbf] px-3 py-3 text-sm leading-6 outline-none transition placeholder:text-[#888888] focus:border-[#0a66c2] focus:ring-2 focus:ring-blue-100"
                  />

                  <p className="mt-2 text-xs text-[#777777]">
                    Optional · Maximum 5000 characters
                  </p>
                </div>

              </div>
            </section>

            {/* REVIEW NOTICE */}
            <section className="rounded-xl border border-[#c6ddf8] bg-[#eef6ff] p-4 sm:p-5 mt-1">

              <div className="flex items-start gap-3">

                <CheckCircle2
                  size={21}
                  className="mt-0.5 shrink-0 text-[#0a66c2]"
                />

                <div >
                  <h3 className="text-sm font-semibold text-[#191919]">
                    Review your information
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-[#555555]">
                    Before submitting, make sure your resume is up to date
                    and your contact and professional details are accurate.
                  </p>
                </div>

              </div>

            </section>

            {/* FORM ACTIONS - STATIC UI */}
            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">

              <Link
                to="/saved-jobs"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[#bfbfbf] bg-white px-5 py-2.5 text-sm font-semibold text-[#404040] transition hover:bg-[#f3f2ef]"
              >
                <ArrowLeft size={16} />
                Back to saved jobs
              </Link>

<button
  type="button"

    onClick={() => {
  const form = document.getElementById("applicationForm");
  if (!form) return;

  const data = new FormData(form);
  const errors = {};

  if (!resume) {
    errors.resume = "Resume is required";
  }

  if (!data.get("applicantLocation")?.trim()) {
    errors.applicantLocation = "Location is required";
  } else if (data.get("applicantLocation").length > 150) {
    errors.applicantLocation = "Location cannot exceed 150 characters";
  }

  if (!data.has("workAuthorized")) {
    errors.workAuthorized = "Please select work authorization";
  }

  if (!data.has("requiresSponsorship")) {
    errors.requiresSponsorship = "Please select sponsorship information";
  }
  const experience = data.get("experienceYears");

 
if (experience === null || experience.trim() === "") {
  errors.experienceYears = "Experience is required";
} else if (Number(experience) < 0) {
  errors.experienceYears = "Experience cannot be negative";
}

  const salary = data.get("expectedSalary");
 if (salary === null || salary.trim() === "") {
  errors.expectedSalary = "Expected salary is required";
} else if (Number(salary) < 0) {
  errors.expectedSalary = "Expected salary cannot be negative";
}

  if ((data.get("coverLetter") || "").length > 5000) {
    errors.coverLetter = "Cover letter cannot exceed 5000 characters";
  }

 const phone = data.get("applicantPhone")?.trim() || "";

if (!phone) {
  errors.applicantPhone = "Phone number is required";
} else if (!/^[6-9]\d{9}$/.test(phone)) {
  errors.applicantPhone = "Enter a valid 10-digit mobile number";
}
  setFieldErrors(errors);

  

  if (Object.keys(errors).length > 0) {
    toast.error("Please correct the highlighted fields");
    return;
  }

  setReviewApplication(true);
}}

  className="mt-3 inline-flex items-center justify-center gap-2 rounded-full bg-[#0a66c2] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#004182]"
>
  Review application
  <ArrowRight size={16} />
</button>


            </div>

            <p className="pb-4 text-center text-xs leading-5 text-[#777777]">
              By submitting your application, you agree that the employer may
              review the information and documents you provide.
            </p>

             </form>
          </div>

          

          {/* RIGHT SIDEBAR */}
          

{reviewApplication && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4 py-4">
  <div className="flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-[#d9d9d9] bg-white shadow-2xl">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#e5e7eb] px-6 py-5">

        <div >
          <h2 className="text-xl font-bold text-[#191919]">
            Review your application
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Check your details before submitting.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setReviewApplication(false)}
          className="rounded-full p-2 text-gray-500 hover:bg-gray-100"
        >
          <X size={20} />
        </button>
      </div>

      {/* Application Details */}
    <div className="min-h-0 flex-1 space-y-4 overflow-y-auto p-5 text-sm">

        <div className="rounded-xl bg-blue-50 p-4">
          <p className="font-semibold text-[#0a66c2]">
            {selectedJob?.title || "Selected job"}
          </p>
          <p className="mt-1 text-gray-600">
            {company?.companyName || "Company"}
          </p>
          <p className="mt-1 text-gray-500">
            Job ID: {jobId}
          </p>
        </div>

        <div>
          <p className="font-semibold">Resume</p>
          <p className="mt-1 text-gray-600">
            {resume?.name || "No resume selected"}
          </p>
        </div>

        <div>
          <p className="font-semibold">Additional documents</p>
          <p className="mt-1 text-gray-600">
            {additionalDocuments.map(file => file.name).join(", ") || "None"}
          </p>
        </div>

        <div>
          <p className="font-semibold">Experience</p>
          <p className="mt-1 text-gray-600">
            {document.querySelector('[name="experienceYears"]')?.value || "0"} years
          </p>
        </div>

        <div>
          <p className="font-semibold">Expected salary</p>
          <p className="mt-1 text-gray-600">
            {document.querySelector('[name="expectedSalary"]')?.value || "Not provided"}
          </p>
        </div>

        <div>
          <p className="font-semibold">Location</p>
          <p className="mt-1 text-gray-600">
            {document.querySelector('[name="applicantLocation"]')?.value || "Not provided"}
          </p>
        </div>

        <div>
          <p className="font-semibold">Cover letter</p>
          <p className="mt-1 whitespace-pre-wrap text-gray-600">
            {document.querySelector('[name="coverLetter"]')?.value || "Not provided"}
          </p>
        </div>

        <div>
          <p className="font-semibold">Why should the employer consider you?</p>
          <p className="mt-1 whitespace-pre-wrap text-gray-600">
            {document.querySelector('[name="employerNotes"]')?.value || "Not provided"}
          </p>
        </div>
      </div>

      {/* Footer Buttons */}
    <div className="min-h-0 flex-4 gap-6 space-y-4  p-5 text-sm">

        <button
          type="button"
          onClick={() => setReviewApplication(false)}
          className="rounded-full border border-gray-300 px-5 py-2.5 font-semibold hover:bg-gray-50"
        >
          Edit application
        </button>

       <button
  type="button"
  onClick={() => {
    document.getElementById("applicationForm")?.requestSubmit();
  }}
  className="rounded-full bg-[#0a66c2] px-5 py-2.5 font-semibold text-white hover:bg-[#004182]"
>
  Submit application
</button>

      </div>
    </div>
  </div>
)}



            {/* SELECTED JOB SUMMARY */}
          


        </div>

        {/* FOOTER */}
        <footer className="mt-8 border-t border-[#d6d6d6] py-6 text-center text-xs text-[#777777]">
          © 2026 JobHub · Find your next move
        </footer>

      </main>
    </div>
  );
}
