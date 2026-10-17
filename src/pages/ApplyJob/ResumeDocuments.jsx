import { Link ,useParams} from "react-router-dom";
import { useEffect, useState } from "react";
import { useApplication } from "../../context/ApplicationContext";
import api from "../../Service/Api";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Bell,
  BriefcaseBusiness,
  CalendarCheck2,
  Check,
  ChevronRight,
  Download,
  FileCheck2,
  FileText,
  Lightbulb,
  MapPin,
  ShieldCheck,
  Trash2,
  BarChart3,
  Upload,
  UserRound,
} from "lucide-react";
import NavBar from "../../component/NavBar";

function ResumeDocuments() {

  
   const { jobId } = useParams();
 const [job, setJob] = useState(null);
 const [user, setUser] = useState(null);
   const { applicationData, setApplicationData } = useApplication();
const [coverLetter, setCoverLetter] = useState(  applicationData.coverLetter || "");
const[profile ,setProfile]=useState(null);
const [resume, setResume] = useState( applicationData.resume || null);

const [additionalDocuments, setAdditionalDocuments] = useState([]);

   useEffect(() => {

    api.get(`/search/jobs/${jobId}`)
        .then((response) => {

            console.log("Job Details:S", response.data);

            setJob(response.data);

        })
        .catch((error) => {

            console.log("API ERROR", error);

        });

}, [jobId]);

useEffect(()=>{

  const userId=localStorage.getItem("userId");

  api.get(`/users/${userId}`)
  .then((response)=>{

    console.log(response.data);
    setUser(response.data);
  }).catch((error)=>{

    console.log("API ERROR", error);
  })

  api.get("/profile/me")
  .then((response)=>{

    console.log(response.data);
    setProfile(response.data);
   
  }).catch((error)=>{

    console.log("API ERROR ", error);
  })
},[]);

const handleResumeChange = (event) => {

    const file = event.target.files[0];

    if (!file) {
        return;
    }

    setResume(file);

    setApplicationData((previousData) => ({
        ...previousData,
        resume: file
    }));
};

const handleAdditionalDocumentChange = (event) => {

    const files = Array.from(event.target.files);

    if (files.length === 0) {
        return;
    }

    setAdditionalDocuments((previousDocuments) => [
        ...previousDocuments,
        ...files
    ]);

    setApplicationData((previousData) => ({
        ...previousData,
        additionalDocuments: [
            ...(previousData.additionalDocuments || []),
            ...files
        ]
    }));
};
const handleRemoveResume = () => {

    setResume(null);

    setApplicationData((previousData) => ({
        ...previousData,
        resume: null
    }));
};
  
const handleRemoveAdditionalDocument = (index) => {

    setAdditionalDocuments((previousDocuments) =>
        previousDocuments.filter((_, documentIndex) => documentIndex !== index)
    );

    setApplicationData((previousData) => ({
        ...previousData,
        additionalDocuments: previousData.additionalDocuments.filter(
            (_, documentIndex) => documentIndex !== index
        )
    }));
};


if (!job) {
    return (
        <div className="flex min-h-screen items-center justify-center bg-[#f7faf8]">
            <p className="text-[15px] font-semibold text-[#08704b]">
                Loading job details...
            </p>
        </div>
    );
}

  return (

    <>
    <div className="min-h-screen bg-[#f7faf8] text-[#101b2e]">

      {/* =====================================================
          ANIMATION
      ===================================================== */}

      <style>{`
        @keyframes resumeAppear {
          0% {
            opacity: 0;
            transform: translateY(25px);
          }

          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes resumeScale {
          0% {
            opacity: 0;
            transform: scale(.97);
          }

          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        .resume-appear {
          opacity: 0;
          animation: resumeAppear .8s cubic-bezier(.22,1,.36,1) forwards;
        }

        .resume-scale {
          opacity: 0;
          animation: resumeScale .8s cubic-bezier(.22,1,.36,1) forwards;
        }

        .resume-delay-1 {
          animation-delay: .25s;
        }

        .resume-delay-2 {
          animation-delay: .5s;
        }

        .resume-delay-3 {
          animation-delay: .8s;
        }

        .resume-delay-4 {
          animation-delay: 1.1s;
        }

        .resume-delay-5 {
          animation-delay: 1.4s;
        }

        .resume-drop:hover {
          border-color: #08704b;
          background: #f8fcf9;
        }

        @media (prefers-reduced-motion: reduce) {
          .resume-appear,
          .resume-scale {
            animation: none;
            opacity: 1;
            transform: none;
          }
        }
      `}</style>


      {/* =====================================================
          NAVBAR
      ===================================================== */}

<NavBar/>



      {/* =====================================================
          BREADCRUMB
      ===================================================== */}

      <div className="jobhub-appear delay-1 mx-auto flex w-[94%] max-w-[1450px] items-center gap-2 overflow-hidden whitespace-nowrap py-4 text-[12px] text-[#68746f]">

        <Link
          to="/"
          className="text-inherit no-underline"
        >
          Home
        </Link>

        <ChevronRight size={14} />

        <Link
          to="/jobs"
          className="text-inherit no-underline"
        >
          Jobs
        </Link>

        <ChevronRight size={14} />

        <span>
          {job.slug}
        </span>

        <ChevronRight size={14} />

        <span>
          {job.title}
        </span>

        <ChevronRight size={14} />

        <span className="font-semibold text-[#17241f]">
          Apply
        </span>

      </div>


      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <main className="mx-auto grid w-[94%] max-w-[1450px] grid-cols-1 gap-4 pb-8 lg:grid-cols-[380px_minmax(0,1fr)]">


        {/* ===================================================
            LEFT SIDEBAR
        =================================================== */}

        <aside className="space-y-4">


          {/* =================================================
              JOB CARD
          ================================================= */}

           
          <section className="jobhub-appear delay-1 rounded-[15px] border border-[#e1e8e4] bg-white p-5 shadow-[0_5px_25px_rgba(20,60,40,0.025)]">


            <div className="flex items-center gap-4">


              {/* COMPANY LOGO */}

              <div className="flex h-[70px] w-[70px] shrink-0 items-center justify-center rounded-[13px] border border-[#e0e7e3] bg-white text-[43px] font-bold shadow-sm">

                 <img
                    src={`http://localhost:8083/company-logos/${job.companyLogo}`}
                    alt={job.companyName}
                    className="h-full w-full object-contain p-2"
                />


              </div>


              <div className="min-w-0">

                <div className="flex flex-wrap items-center gap-2">

                  <h2 className="text-[19px] font-bold">
                    {job.companyName}
                  </h2>


                  <span className="flex items-center gap-1 rounded-full bg-[#e2f7e8] px-2.5 py-1 text-[10px] font-semibold text-[#197343]">

                    <Check size={11} />

                    Verified Employer

                  </span>

                </div>


                <p className="mt-2 text-[13px] leading-[1.45] text-[#6d7975]">
                 {job.description}
                </p>

              </div>

            </div>



            {/* JOB TITLE */}

            <h1 className="mt-5 text-[28px] font-bold leading-[1.08] tracking-[-1.3px]">

             {job.title}

            </h1>



            {/* JOB INFO */}

            <div className="mt-5 space-y-3 text-[13px] text-[#66736e]">


              <div className="flex items-center gap-3">

                <MapPin
                  size={18}
                  className="text-[#08704b]"
                />

               {job.location}

              </div>


              <div className="flex items-center gap-3">

                <BriefcaseBusiness
                  size={18}
                  className="text-[#08704b]"
                />

               {job.jobType}

              </div>


              <div className="flex items-center gap-3">

                <span className="h-4 w-4 rounded-[3px] border-2 border-[#08704b]" />

              {job.workMode}

              </div>


              <div className="flex items-center gap-3">

                <BarChart3
                  size={18}
                  className="text-[#08704b]"
                />

                Senior Level

              </div>

            </div>



            {/* SALARY */}

            <div className="mt-5 flex flex-wrap items-center gap-3 border-b border-[#e5eae7] pb-5">

              <span className="text-[15px] font-bold">
               ₹{job.salaryMin} – ₹{job.salaryMax} per annum
              </span>


              <span className="rounded-full bg-[#ddf6df] px-3 py-1.5 text-[10px] font-semibold text-[#287443]">

                ↗ Market Range

              </span>

            </div>



            {/* SKILLS */}

            <h3 className="mt-4 text-[15px] font-bold">
              Skills Required
            </h3>


            <div className="mt-3 flex flex-wrap gap-2">
             
             {(job.skills || []).map((skill) => {

    return (
        <span
            key={skill}
            className="rounded-full bg-[#f0f3f2] px-3.5 py-1.5 text-[11px]"
        >
            {skill}
        </span>
    );

})}

            </div>

          </section>





          {/* =================================================
              OPPORTUNITY CARD
          ================================================= */}

          <section className="resume-appear resume-delay-2 rounded-[15px] bg-gradient-to-br from-[#effced] to-[#e2f8e6] p-5">


            <div className="flex items-center gap-4">


              <div className="flex h-[82px] w-[82px] shrink-0 items-center justify-center rounded-full bg-white/70">

                <div className="relative flex h-14 w-14 items-center justify-center rounded-[11px] bg-[#08704b] text-white">

                  <FileCheck2 size={28} />

                  <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-[#b8f27b] text-[#0d553d]">

                    <Check size={14} />

                  </span>

                </div>

              </div>


              <div>

                <h3 className="text-[16px] font-bold leading-[1.35] text-[#086344]">

                  You're one step closer to an amazing opportunity!

                </h3>


                <p className="mt-2 text-[13px] leading-[1.45] text-[#60716a]">

                  Join Google and be part of a team that builds for everyone.

                </p>

              </div>

            </div>

          </section>



          {/* =================================================
              APPLICATION PROCESS
          ================================================= */}

          <section className="resume-appear resume-delay-3 rounded-[15px] border border-[#e1e8e4] bg-white p-5">


            <h2 className="text-[16px] font-bold">
              Application Process
            </h2>


            <div className="mt-5 space-y-5">


              {/* STEP 1 */}

              <div className="flex gap-4">

                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#08704b] text-[13px] font-bold text-white">
                  1
                </div>


                <div>

                  <h3 className="text-[13px] font-bold text-[#08704b]">
                    Submit Application
                  </h3>

                  <p className="mt-1 text-[11px] leading-[1.45] text-[#7a8581]">
                    Fill in your details and upload your resume
                  </p>

                </div>

              </div>



              {/* STEP 2 */}

              <div className="flex gap-4">

                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#08704b] text-[13px] font-bold text-white">
                  2
                </div>


                <div>

                  <h3 className="text-[13px] font-bold text-[#08704b]">
                    Application Review
                  </h3>

                  <p className="mt-1 text-[11px] leading-[1.45] text-[#7a8581]">
                    Our team will review your application
                  </p>

                </div>

              </div>



              {/* STEP 3 */}

              <div className="flex gap-4">

                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#edf1ef] text-[13px] font-bold text-[#45534e]">
                  3
                </div>


                <div>

                  <h3 className="text-[13px] font-bold text-[#47544f]">
                    Interview Process
                  </h3>

                  <p className="mt-1 text-[11px] leading-[1.45] text-[#7a8581]">
                    If shortlisted, you'll be invited for an interview
                  </p>

                </div>

              </div>



              {/* STEP 4 */}

              <div className="flex gap-4">

                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#edf1ef] text-[13px] font-bold text-[#45534e]">
                  4
                </div>


                <div>

                  <h3 className="text-[13px] font-bold text-[#47544f]">
                    Final Decision
                  </h3>

                  <p className="mt-1 text-[11px] leading-[1.45] text-[#7a8581]">
                    We'll notify you of the final status
                  </p>

                </div>

              </div>

            </div>

          </section>

        </aside>



        {/* ===================================================
            RIGHT SIDE
        =================================================== */}

        <section className="min-w-0">


          {/* =================================================
              PROGRESS STEPPER
          ================================================= */}

          <div className="resume-scale resume-delay-2 rounded-[15px] border border-[#e1e8e4] bg-white px-7 py-6">


            <div className="grid grid-cols-4">


              {/* STEP 1 */}

              <div className="relative flex flex-col items-center text-center">

                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#08704b] text-white shadow-[0_0_0_5px_#e8f5eb]">

                  <Check size={17} />

                </div>


                <span className="mt-3 text-[12px] font-bold text-[#08704b]">
                  Personal Info
                </span>

              </div>



              {/* STEP 2 */}

              <div className="relative flex flex-col items-center text-center">

                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#08704b] text-[13px] font-bold text-white shadow-[0_0_0_5px_#e8f5eb]">

                  2

                </div>


                <span className="mt-3 text-[12px] font-bold text-[#08704b]">
                  Resume & Documents
                </span>

              </div>



              {/* STEP 3 */}

              <div className="relative flex flex-col items-center text-center">

                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#edf1ef] text-[13px] font-bold text-[#45534e]">

                  3

                </div>


                <span className="mt-3 text-[12px] text-[#697570]">
                  Additional Details
                </span>

              </div>



              {/* STEP 4 */}

              <div className="relative flex flex-col items-center text-center">

                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#edf1ef] text-[13px] font-bold text-[#45534e]">

                  4

                </div>


                <span className="mt-3 text-[12px] text-[#697570]">
                  Review & Submit
                </span>

              </div>

            </div>

          </div>



          {/* =================================================
              RESUME MAIN CARD
          ================================================= */}

          <section className="resume-appear resume-delay-3 mt-3 overflow-hidden rounded-[15px] border border-[#e1e8e4] bg-white">


            {/* HEADER */}

            <div className="flex items-start justify-between gap-6 px-7 pt-7 sm:px-8">


              <div className="flex items-start gap-4">


                <div className="flex h-[58px] w-[58px] shrink-0 items-center justify-center rounded-[14px] bg-[#eaf8e9] text-[#08704b]">

                  <FileText size={29} />

                </div>


                <div>

                  <p className="text-[13px] text-[#68746f]">
                    Step 2 of 4
                  </p>


                  <h2 className="text-[28px] font-bold tracking-[-1.1px]">
                    Resume & Documents
                  </h2>


                  <p className="mt-1 text-[14px] text-[#6f7b77]">
                    Upload your resume and any supporting documents.
                  </p>

                </div>

              </div>

            </div>



            {/* CONTENT */}

            <div className="px-7 pb-7 pt-6 sm:px-8">


              {/* =================================================
                  RESUME LABEL
              ================================================= */}

              <div className="mb-2 flex items-center gap-1">

                <label className="text-[14px] font-bold">
                  Resume
                </label>

                <span className="text-red-500">
                  *
                </span>

              </div>



              {/* =================================================
                  UPLOAD AREA + TIPS
              ================================================= */}

              <div className="grid grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1fr)_380px]">


                {/* UPLOAD BOX */}

                <div className="resume-drop flex min-h-[184px] flex-col items-center justify-center rounded-[10px] border border-dashed border-[#bdcfc6] bg-[#fbfdfc] p-6 text-center transition duration-300">


                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#14243a] shadow-sm">

                    <Upload size={27} />

                  </div>


                  <h3 className="mt-3 text-[14px] font-bold text-[#18243a]">

                    Drag & drop your resume here

                  </h3>


                  <p className="mt-1 text-[13px] font-semibold text-[#08704b]">

                    or click to browse

                  </p>


                  <p className="mt-2 text-[12px] text-[#68746f]">

                    Supported formats: PDF, DOC, DOCX (Max 5MB)

                  </p>

                      <label
    htmlFor="resume-upload"
    className="mt-3 flex cursor-pointer items-center gap-2 rounded-[9px] bg-[#08704b] px-5 py-2.5 text-[12px] font-bold text-white shadow-[0_7px_18px_rgba(0,90,65,.15)]"
>
    <Upload size={16} />

    Browse Files
</label>

<input
    id="resume-upload"
    type="file"
    accept=".pdf,.doc,.docx"
    className="hidden"
    onChange={handleResumeChange}
/>

                </div>



                {/* TIPS */}

                <div className="rounded-[12px] bg-gradient-to-br from-[#effaf0] to-[#f5fcf2] p-5">


                  <div className="flex items-start gap-4">


                    <div className="hidden h-[75px] w-[75px] shrink-0 items-center justify-center rounded-full bg-white/70 sm:flex">

                      <div className="relative flex h-12 w-12 items-center justify-center rounded-[9px] bg-[#e6f6e8] text-[#08704b]">

                        <FileCheck2 size={25} />

                        <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#08704b] text-white">

                          <Check size={11} />

                        </span>

                      </div>

                    </div>


                    <div>

                      <div className="flex items-center gap-2">

                        <Lightbulb
                          size={18}
                          className="text-[#08704b]"
                        />

                        <h3 className="text-[14px] font-bold text-[#09613f]">
                          Tips for a better application
                        </h3>

                      </div>


                      <div className="mt-3 space-y-2">


                        <Tip text="Use a clean and updated resume" />

                        <Tip text="Highlight relevant skills and experience" />

                        <Tip text="Keep the file size under 5MB" />

                        <Tip text="Use PDF format for best results" />

                      </div>

                    </div>

                  </div>

                </div>

              </div>



              {/* =================================================
                  UPLOADED RESUME
              ================================================= */}

              <div className="mt-5">

                <h3 className="mb-2 text-[14px] font-bold">
                  Uploaded Resume
                </h3>


                <div className="flex flex-col gap-4 rounded-[10px] border border-[#dbe3df] bg-white p-3 sm:flex-row sm:items-center sm:justify-between">


                  {/* FILE */}
<div className="flex items-center gap-3">

    <div className="flex h-10 w-10 items-center justify-center rounded-[7px] bg-[#ef3939] text-white">
        <FileText size={21} />
    </div>

    <div>

        <h4 className="text-[13px] font-bold text-[#17243a]">
            {resume
                ? resume.name
                : profile?.resumeUrl
                    ? `${profile.resumeUrl}.pdf`
                    : "No resume uploaded"
            }
        </h4>

        <p className="mt-1 text-[11px] text-[#75807c]">
            {resume
                ? `${(resume.size / (1024 * 1024)).toFixed(2)} MB • Selected just now`
                : "Existing profile resume"
            }
        </p>

    </div>

</div>

                  {/* ACTIONS */}

                  <div className="flex items-center gap-3">


                    <span className="flex items-center gap-1 rounded-full bg-[#ddf6df] px-3 py-1.5 text-[10px] font-semibold text-[#197343]">

                      <Check size={12} />

                      Uploaded

                    </span>


                    <button
                      type="button"
                      className="flex h-9 w-9 items-center justify-center rounded-[8px] border border-[#dce4e0] bg-white text-[#26332f]"
                    >

                      <Download size={17} />

                    </button>


                    <button
                      type="button"
                       onClick={handleRemoveResume}
                      className="flex h-9 w-9 items-center justify-center rounded-[8px] border border-[#dce4e0] bg-white text-[#e43b3b]"
                    >

                      <Trash2 size={17} />

                    </button>

                  </div>

                </div>

              </div>



              {/* =================================================
                  COVER LETTER
              ================================================= */}

              <div className="mt-5">

                <label className="mb-2 block text-[14px] font-bold">

                  Cover Letter

                  <span className="font-normal text-[#737e7a]">
                    {" "} (Optional)
                  </span>

                </label>


                <div className="relative">

                  <input
                  value={coverLetter}
                  maxLength={1000}
                 onChange={(e) => {
    const value = e.target.value;

    setCoverLetter(value);

    setApplicationData((previousData) => ({
        ...previousData,
        coverLetter: value
    }));
}}
                    className="h-[96px] w-full resize-none rounded-[10px] border border-[#dbe3df] bg-white p-3.5 text-[13px] text-[#45534e] outline-none placeholder:text-[#929c98] focus:border-[#08704b]"
                    placeholder="Tell the employer why you're a great fit for this role..."
                  />


                  <span className="absolute bottom-2.5 right-3 text-[10px] text-[#7c8783]">
                    {coverLetter.length}/1000
                  </span>

                </div>

              </div>



              {/* =================================================
                  ADDITIONAL DOCUMENTS
              ================================================= */}

              <div className="mt-5">


                <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-end">

                  <div>

                    <h3 className="text-[14px] font-bold">

                      Additional Documents

                      <span className="font-normal text-[#737e7a]">
                        {" "} (Optional)
                      </span>

                    </h3>


                    <p className="mt-1 text-[12px] text-[#74807b]">

                      You can upload certificates, portfolio, or any other relevant documents.

                    </p>

                  </div>


                  <span className="text-[11px] text-[#6f7c77]">
                    Accepted formats: PDF, DOC, DOCX, JPG, PNG (Max 5MB)
                  </span>

                </div>



                {/* ADD DOCUMENT */}
                     
                            <label
    htmlFor="additional-document-upload"
    className="mt-3 flex h-20 cursor-pointer items-center gap-2 rounded-[9px] bg-amber-400 px-5 py-2.5 text-center text-[12px] font-bold text-white shadow-[0_7px_18px_rgba(0,90,65,.15)]"
>
    <Upload size={16} />

    Additional document
</label>

<input
    id="additional-document-upload"
    type="file"
    multiple
    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
    className="hidden"
    onChange={handleAdditionalDocumentChange}
/>

              </div>

            </div>


            {additionalDocuments.length > 0 && (
    <div className="mt-3 space-y-2">

        {additionalDocuments.map((file, index) => (
            <div
                key={`${file.name}-${index}`}
                className="flex items-center justify-between rounded-[10px] border border-[#dbe3df] bg-white p-3"
            >

                <div className="flex items-center gap-3">

                    <div className="flex h-10 w-10 items-center justify-center rounded-[7px] bg-[#eef7f1] text-[#08704b]">
                        <FileText size={20} />
                    </div>

                    <div>
                        <p className="text-[13px] font-semibold text-[#17243a]">
                            {file.name}
                        </p>

                        <p className="mt-1 text-[11px] text-[#75807c]">
                            {(file.size / (1024 * 1024)).toFixed(2)} MB
                        </p>
                    </div>

                </div>

                <button
                    type="button"
                     onClick={() => handleRemoveAdditionalDocument(index)}
                    className="flex h-8 w-8 items-center justify-center rounded-[7px] border border-[#dce4e0] bg-white text-[#e43b3b]"
                >
                    <Trash2 size={16} />
                </button>

            </div>
        ))}

    </div>
)}



            {/* =================================================
                FOOTER BUTTONS
            ================================================= */}

            <div className="flex flex-col-reverse justify-between gap-4 border-t border-[#e5eae8] px-7 py-5 sm:flex-row sm:items-center sm:px-8">


              <Link
                 to={`/jobs/${jobId}/apply`}
                className="flex w-fit items-center gap-2 rounded-[9px] border border-[#d2dcd7] bg-white px-5 py-3 text-[14px] font-semibold text-[#27342f] no-underline transition duration-300 hover:bg-[#f3f7f5]"
              >

                <ArrowLeft size={18} />

                Back

              </Link>



              <Link
                 to={`/jobs/${jobId}/apply/additional`}
                className="flex items-center justify-center gap-3 rounded-[9px] bg-[#00634b] px-7 py-3.5 text-[14px] font-bold text-white no-underline shadow-[0_8px_20px_rgba(0,90,65,0.18)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#074b3b]"
              >

                Save & Continue

                <ArrowRight size={18} />

              </Link>

            </div>

          </section>

        </section>

      </main>

    </div>

    </>
  );
}


/* ============================================================
   SMALL COMPONENTS
============================================================ */

function Tip({ text }) {
  return (
    <div className="flex items-start gap-2">

      <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#18824f] text-white">

        <Check size={10} />

      </span>

      <span className="text-[11px] leading-[1.4] text-[#56665f]">
        {text}
      </span>

    </div>
  );
}


function BarChart3Icon() {
  return (
    <BarChart3
      size={18}
      className="text-[#08704b]"
    />
  );
}


export default ResumeDocuments;