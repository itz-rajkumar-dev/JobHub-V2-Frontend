import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Jobs from "./pages/Jobs";
import JobDetails from "./pages/JobDetails";
import Companies from "./pages/Companies";
import Profile from "./pages/Profile/Profile";
import CompanyDetails from "./pages/CompanyDetails";
import SavedJobs from "./pages/Profile/SavedJobs";
import MyApplications from "./pages/Profile/MyApplications";
import Notifications from "./pages/Profile/Notifications";
import Resume from "./pages/Profile/Resume";
import MyJobs from "./pages/Profile/MyJobs";

import EmployerDashboard from "./employer/EmployerDashBoard";
import PostJob from "./employer/PostJob";
import EmployerJobs from "./employer/EmployerJobs";
import EmployerApplications from "./employer/EmployerApplications";
import EmployerProfile from "./employer/EmployerProfile";
import EmployerCompanyDetails from "./employer/EmployerCompanyDetails";
import ApplicationForm from "./pages/ApplyJob/ApplicationForm";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/jobs" element={<Jobs />} />
      <Route path="/jobs/:jobId" element={<JobDetails />} />
      <Route path="/companies" element={<Companies />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/profile/:userId" element={<Profile />} />
      <Route path="/companies/:companyId" element={<CompanyDetails />} />
      <Route path="/applications" element={<MyApplications />} />
       <Route path="/profile/applications" element={<MyApplications />}/>
       
       <Route path="/employer/dashboard" element={<EmployerDashboard />} />
       <Route path="/employer/jobs/create" element={<PostJob />} />
        <Route path="/employer/jobs/" element={<EmployerJobs />} />
        <Route path="/employer/applications"element={<EmployerApplications />}/>
        <Route path="/employer/profile" element={<EmployerProfile />}/>
        <Route path="/employer/company/manage" element={<EmployerCompanyDetails />}/>
     <Route  path="/apply-job/:jobId" element={<ApplicationForm />}/>
              


    <Route path="/saved-jobs" element={<SavedJobs />} />
     <Route path="/profile/saved-jobs" element={<SavedJobs />} />
    <Route path="/notifications" element={<Notifications />} />
     <Route path="/profile/notifications" element={<Notifications />} />
     <Route path="/profile/resume" element={<Resume />} />
     <Route path="/profile/my-jobs" element={<MyJobs />} />
    </Routes>
  );
}

export default App;