import React, { useEffect } from "react";
import api from "../Service/Api";
import {
  Search,
  BriefcaseBusiness,
  Building2,
  ChevronDown,
  ArrowUpRight,
  Menu,
  X,
  Bell,
} from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

    const NavBar = () => {
   const [mobileOpen, setMobileOpen] = useState(false);
   const navigate=useNavigate();
   const [isLoggedIn, setIsLoggedIn]=useState(false);
   const [notificationCount, setNotificationCount] = useState(0);
   useEffect(()=>{

    const token =localStorage.getItem("token");

    setIsLoggedIn(!!token);
   },[]);


   const handleLogout=()=>{
    
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("role");
  

    setIsLoggedIn(false);

     navigate("/login")

   };
   const userId = localStorage.getItem("userId");

   const [user,setUser]=useState({});
  const [role, setRole] = useState( localStorage.getItem("role") || "");
  const [employerProfile, setEmployerProfile] = useState({});

  useEffect(() => {

  if (!userId) {
    return;
  }

 const fetchUser = () => {

  api.get(`/users/${userId}`)
    .then((response) => {

      console.log("========== USER API ==========");
      console.log("USER ID:", userId);
      console.log("USER DATA:", response.data);
      console.log("USER ROLE:", response.data.role);
      console.log("==============================");

      const userData = response.data;

      setUser(userData);

    })
    .catch((error) => {
      console.log("User API Error:", error);
    });

};

  fetchUser();

  window.addEventListener("profileUpdated", fetchUser);

  return () => {
    window.removeEventListener("profileUpdated", fetchUser);
  };

}, [userId]);
    
useEffect(() => {

  if (!isLoggedIn) return;

  const fetchNotificationCount = async () => {
    try {

      const response = await api.get("/notification/unread-count");

      console.log("Unread Count:", response.data);

      setNotificationCount(response.data);

    } catch (error) {

      console.log("Notification Count API Error:", error);

    }
  };

  fetchNotificationCount();

}, [isLoggedIn]);

const handleNotificationClick = async () => {
  try {
    await api.put("/notification/read-all");
    setNotificationCount(0);
  } catch (error) {
    console.log("Mark all read error:", error);
  }
};

useEffect(() => {

  if (role !== "EMPLOYER") {
    return;
  }

  api.get("/employer-profile/me")
    .then((response) => {

      console.log("EMPLOYER NAV PROFILE:", response.data);

      setEmployerProfile(response.data);

    })
    .catch((error) => {

      console.log("Employer Profile API Error:", error);

    });

}, [role]);

  return (
    <header className="w-full bg-[#000000] text-white border-b border-white/10">

      {/* Top Navbar */}
      <nav className="max-w-7xl mx-auto px-6 lg:px-8">

        <div className="h-20 flex items-center justify-between">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">

            <div className="w-10 h-10 rounded-xl bg-white text-[#0b0d0f] flex items-center justify-center font-black text-lg group-hover:rotate-6 transition-transform">
              J
            </div>

            <div>
              <h1 className="text-xl font-bold tracking-tight">
                Job<span className="text-gray-400">Hub</span>
              </h1>

              <p className="text-[9px] uppercase tracking-[0.25em] text-gray-500">
                Find your next move
              </p>
            </div>

          </Link>


          {/* Desktop Navigation */}
  {/* Desktop Navigation + Right Section */}
<div className="hidden lg:flex flex-1 items-center">

  {/* Center Navigation */}
  <div className="flex-1 flex justify-center">
   {role === "EMPLOYER" ? (
  <div className="flex items-center gap-8">

    {/* Dashboard */}
    <Link
      to="/employer/dashboard"
      className="text-sm text-gray-300 hover:text-white transition"
    >
      Employer Dashboard
    </Link>

    {/* Post a Job */}
    <Link
      to="/employer/jobs/create"
      className="text-sm text-gray-300 hover:text-white transition"
    >
      Post a Job
    </Link>

     {/* Post a Job */}
    <Link
       to="/employer/jobs"
      className="text-sm text-gray-300 hover:text-white transition"
    >
      My Jobs
    </Link>

       <Link
  to="/employer/applications"
  className="text-sm text-gray-300 hover:text-white transition"
>
  Applications
</Link>

  </div>
) : (
      <div className="flex items-center gap-8">

        <Link
          to="/jobs"
          className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition"
        >
          <Search size={16} />
          Find Jobs
        </Link>

        <Link
          to="/companies"
          className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition"
        >
          <Building2 size={16} />
          Companies
        </Link>

        <Link
          to="/career-resources"
          className="text-sm text-gray-300 hover:text-white transition"
        >
          Career Resources
        </Link>

      </div>
    )}
  </div>


  {/* Right Section */}
  <div className="flex items-center gap-6">

    {isLoggedIn ? (
      <>
        {/* Notification */}
        <Link
          to="/profile/notifications"
          onClick={handleNotificationClick}
          className="relative rounded-xl p-2 hover:bg-white/10"
        >
          <Bell size={20} />

          {notificationCount > 0 && (
            <span className="absolute -right-1 -top-1 min-w-5 h-5 px-1 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center border-2 border-black">
              {notificationCount > 99 ? "99+" : notificationCount}
            </span>
          )}
        </Link>


        {/* Profile */}
        <div className="flex items-center gap-3">

          <Link
            to={role === "EMPLOYER" ? "/employer/profile" : "/profile"}
            className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-slate-100 font-bold text-slate-800"
          >
            {role === "EMPLOYER" ? (
  employerProfile?.profileImage ? (
    <img
      src={employerProfile.profileImage}
      alt={employerProfile.fullName || "Employer"}
      className="h-full w-full object-cover"
    />
  ) : (
    employerProfile?.fullName?.charAt(0) || "E"
  )
) : (
  user?.profileImage ? (
    <img
      src={user.profileImage}
      alt={user.fullname || "Profile"}
      className="h-full w-full object-cover"
    />
  ) : (
    user?.fullname?.charAt(0) || "U"
  )
)}
          </Link>

          <Link
            to={role === "EMPLOYER" ? "/employer/profile" : "/profile"}
            className="text-sm font-bold"
          >
            {user.fullname}
          </Link>

          <ChevronDown size={16} />

        </div>


        {/* Logout */}
        <button
          onClick={handleLogout}
          className="text-sm font-semibold text-slate-300 hover:text-white transition"
        >
          Logout
        </button>

      </>
    ) : (
      <>
        <Link
          to="/login"
          className="px-5 py-2.5 text-sm font-medium text-gray-200 hover:text-white transition"
        >
          Log in
        </Link>

        <Link
          to="/register"
          className="group flex items-center gap-2 bg-white text-black px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-gray-200 transition"
        >
          Get Started

          <ArrowUpRight
            size={15}
            className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
          />
        </Link>
      </>
    )}

  </div>

</div>



          {/* Mobile Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden w-10 h-10 rounded-full border border-white/15 flex items-center justify-center hover:bg-white/10 transition"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

        </div>


        {/* Mobile Navigation */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-white/10 py-6 space-y-2">

            <Link
              to="/jobs"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-300 hover:bg-white/10 hover:text-white"
            >
              <Search size={18} />
              Find Jobs
            </Link>

            <Link
              to="/companies"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-300 hover:bg-white/10 hover:text-white"
            >
              <Building2 size={18} />
              Companies
            </Link>

            <Link
              to="/career-resources"
              onClick={() => setMobileOpen(false)}
              className="block px-4 py-3 rounded-xl text-gray-300 hover:bg-white/10 hover:text-white"
            >
              Career Resources
            </Link>

          <div className="pt-4 border-t border-white/10 mt-4">

  {isLoggedIn ? (
    <>
      {role === "EMPLOYER" && (
        <Link
          to="/employer/dashboard"
          onClick={() => setMobileOpen(false)}
          className="flex items-center gap-3 px-4 py-3 text-gray-300"
        >
          <BriefcaseBusiness size={18} />
          Employer Dashboard
        </Link>
      )}

      <Link
        to="/profile"
        onClick={() => setMobileOpen(false)}
        className="flex items-center gap-3 px-4 py-3 text-gray-300"
      >
        Profile
      </Link>

      <button
        onClick={() => {
          handleLogout();
          setMobileOpen(false);
        }}
        className="block w-full text-left px-4 py-3 text-gray-300"
      >
        Logout
      </button>
    </>
  ) : (
    <>
      <Link
        to="/employer"
        onClick={() => setMobileOpen(false)}
        className="flex items-center gap-3 px-4 py-3 text-gray-300"
      >
        <BriefcaseBusiness size={18} />
        For Employers
      </Link>

      <Link
        to="/login"
        onClick={() => setMobileOpen(false)}
        className="block px-4 py-3 text-gray-300"
      >
        Log in
      </Link>

      <Link
        to="/register"
        onClick={() => setMobileOpen(false)}
        className="block mt-2 bg-white text-black text-center rounded-full py-3 font-semibold"
      >
        Get Started
      </Link>
    </>
  )}

</div>
          </div>
        )}

      </nav>
    </header>
  );
};

export default NavBar;