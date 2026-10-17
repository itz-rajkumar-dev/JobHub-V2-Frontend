import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../../Service/Api";
import { useNavigate } from "react-router-dom";
import {
  BriefcaseBusiness,
  Search,
  Bell,
  ChevronDown,
  UserRound,
  Briefcase,
  ClipboardCheck,
  Heart,
  FileText,
  Award,
  Video,
  Settings,
  BellRing,
  Pencil,
  MapPin,
  Plus,
  Eye,
  CalendarDays,
  GraduationCap,
  CheckCircle2,
  Circle,
  Rocket,
  Crown,
  ExternalLink,
  Upload,
  MoreHorizontal,
  Globe,
  Code2,
  Share2,
   Bookmark,
   X,
   Ellipsis,
   FlagOff,
   ShieldAlert,
   CopyCheck
   
} from "lucide-react";
import NavBar from "../../component/NavBar";
import toast from "react-hot-toast";

const Profile = () => {
  const [user, setUser] = useState({});
  const [profile, setProfile] = useState({});
  const [isEditOpen, setIsEditOpen] = useState(false);

const [editForm, setEditForm] = useState({});
const navigate = useNavigate();
const { userId: profileUserId } = useParams();
 

const loggedInUserId = localStorage.getItem("userId");

const userId=profileUserId|| loggedInUserId;

const isOwnProfile =Number(userId) === Number(loggedInUserId);

 useEffect(() => {

  if (!userId) {
    return;
  }

  const loadProfile = async () => {

    try {

      // ==========================================
      // USER DATA
      // ==========================================

      let userData;

      if (isOwnProfile) {

        // Apna profile -> secured endpoint
        const userResponse = await api.get(
          `/users/${userId}`
        );

        userData = userResponse.data;

      } else {

        // Kisi aur ka profile -> public discover endpoint
        const usersResponse = await api.get(
          "/users/discover"
        );

        userData = usersResponse.data.find(
          (u) => Number(u.userId) === Number(userId)
        );

        if (!userData) {
          throw new Error("User not found");
        }
      }

      setUser(userData);

      console.log("User Data:", userData);


      // ==========================================
      // PROFILE DATA
      // ==========================================

      const profileResponse = isOwnProfile
        ? await api.get("/profile/me")
        : await api.get(`/profile/user/${userId}`);

      setProfile(profileResponse.data);

      console.log("Profile Data:", profileResponse.data);

    } catch (error) {

      console.log("Profile API Error:", error);

    }

  };

  loadProfile();

}, [userId, isOwnProfile]);


 const handleProfileImageUpload = async (file) => {

  if (!file) {
    return;
  }

  try {

    const formData = new FormData();

    formData.append("profileImage", file);

    await api.put(
      `/users/${userId}/profile-image`,
      formData
    );

    const response = await api.get(`/users/${userId}`);

    setUser(response.data);

    window.dispatchEvent(new Event("profileUpdated"));

    console.log("Profile image uploaded successfully");

  } catch (error) {

    console.log("Profile Image Upload Error:", error);

  }
};

  const handleCoverImageUpload = async (file) => {

  if (!file) {
    return;
  }

  if (!profile.profileId) {
    console.log("Profile ID not found");
    return;
  }

  try {

    const formData = new FormData();

    formData.append("coverImage", file);

    await api.put(
      `/profile/${profile.profileId}/cover-image`,
      formData
    );

    // Get updated profile
    const response = await api.get("/profile/me");

    setProfile(response.data);

    console.log("Cover image uploaded successfully");

  } catch (error) {

    console.log("Cover Image Upload Error:", error);

  }
};

const handleEditChange = (e) => {

  const { name, value } = e.target;

  setEditForm((prev) => ({
    ...prev,
    [name]: value,
  }));

};

const handleProfileUpdate = async (e) => {

  e.preventDefault();

  if (!profile.profileId) {
    console.log("Profile ID not found");
    return;
  }

  try {

    await api.put(
      `/profile/update/${profile.profileId}`,
      editForm
    );

    // Updated profile data dobara fetch karo
    const response = await api.get("/profile/me");

    setProfile(response.data);

    setIsEditOpen(false);

    console.log("Profile Updated Successfully");

  } catch (error) {

    console.log("Profile Update Error:", error);

  }
};

const [applications,setApplications]=useState([]);

useEffect(() => {

  api.get("/applications")
    .then((response) => {

      console.log("Applications:", response.data);

      setApplications(response.data);

    })
    .catch((error) => {

      console.log("Applications API Error:", error);

    });

}, []);
const [savedJobs, setSavedJobs] = useState([]);

useEffect(() => {

  api.get("/saved-job")
    .then((response) => {
      console.log("Saved Jobs:", response.data);
      setSavedJobs(response.data);
    })
    .catch((error) => {
      console.log("Saved Jobs API Error:", error);
    });

}, []);

const [userss, setUserss] = useState([]);
const [profiles, setProfiles] = useState({});

useEffect(() => {

  api.get("/users/discover")
    .then(async (response) => {

     const users = response.data.filter(
  (user) => Number(user.userId) !== Number(loggedInUserId)
);

      const profileResponses = await Promise.all(
        users.map((user) =>
          api.get(`/profile/user/${user.userId}`)
            .then((res) => ({
              userId: user.userId,
              profile: res.data
            }))
            .catch(() => null)
        )
      );

      // Sirf jinke paas JobSeeker Profile hai
      const validProfiles = profileResponses.filter(Boolean);

      const profileMap = {};

      validProfiles.forEach((item) => {
        profileMap[item.userId] = item.profile;
      });

      setProfiles(profileMap);

      // Sirf JobSeeker users
      const jobSeekers = users.filter((user) =>
        validProfiles.some(
          (item) => item.userId === user.userId
        )
      );

      setUserss(jobSeekers);

    })
    .catch((error) => {
      console.log("API ERROR", error);
    });

}, []);

const [editingField, setEditingField] = useState(null);

const handleProjectUpdate = async (e) => {

    e.preventDefault();

    if (!profile?.profileId) {
        console.log("Profile ID not found");
        return;
    }

    try {

        await api.put(
            `/profile/update/${profile.profileId}`,
            profile
        );

        const response = await api.get("/profile/me");

        setProfile(response.data);

        setEditingField(null);

        toast.success("Project Updated Successfully");

        console.log("Project Update Successfully");

    } catch (error) {

        console.log("API ERROR", error);

    }
};
const updateExperienc = async (e) => {

  e.preventDefault();

  if (!profile?.profileId) {
    console.log("Profile Not Found");
    return;
  }

  try {

    const experienceData = {
      currentJobTitle: profile.currentJobTitle,
      currentCompany: profile.currentCompany,
      totalExperienceYears: profile.totalExperienceYears,
      experienceLevel: profile.experienceLevel,
      summary: profile.summary
    };

    await api.put( `/profile/update/${profile.profileId}`,experienceData);

    const response = await api.get("/profile/me");

    setProfile(response.data);

    setEditingField(null);

    toast.success("Experience Updated Successfully");

  } catch (error) {

    console.log("API ERROR", error);

  }
};
const [skillsInput, setSkillsInput] = useState("");
const updateAbout = async (e) => {
  e.preventDefault();

  if (!profile?.profileId) {
    console.log("Profile Not Found");
    return;
  }

  try {
    const skills = skillsInput
      .split(",")
      .map((skill) => skill.trim())
      .filter(Boolean);

    await api.put(`/profile/update/${profile.profileId}`, {
      summary: profile.summary,
      skills: skills
    });

    const response = await api.get("/profile/me");

    setProfile(response.data);
    setSkillsInput(response.data.skills?.join(", ") || "");

    setEditingField(null);

    toast.success("About Updated Successfully");

  } catch (error) {
    console.log("API ERROR", error);
  }
};

const updateEducation = async (e) => {

  e.preventDefault();

  if (!profile?.profileId) {
    console.log("Profile Not Found");
    return;
  }

  try {

    await api.put(
      `/profile/update/${profile.profileId}`,
      {
        highestEducation: profile.highestEducation,
        university: profile.university,
        fieldOfStudy: profile.fieldOfStudy,
        graduationYear: profile.graduationYear
      }
    );

    const response = await api.get("/profile/me");

    setProfile(response.data);

    setEditingField(null);

    toast.success("Education Updated Successfully");

    console.log("Education Updated Successfully");

  } catch (error) {

    console.log("API ERROR", error);

  }

};
const [optionMenu, setOptionMenu] = useState(false);

const [following, setFollowing] = useState(false);
const updateFollow = async () => {
  try {
    const response = await api.post("/follows", {
      followingUserId: user.userId
    });

    console.log("FOLLOW RESPONSE:", response.data);

    setFollowing(response.data.following);

 

  } catch (error) {
    console.log("FOLLOW API ERROR:", error);

    toast.error(
      error.response?.data?.message || "Something went wrong"
    );
  }
};

useEffect(() => {
  const checkFollowing = async () => {
    if (!user?.userId || isOwnProfile) return;

    try {
      const response = await api.get(
        `/follows/check/${user.userId}`
      );

      setFollowing(response.data.following);

    } catch (error) {
      console.log("FOLLOW CHECK ERROR:", error);
    }
  };

  checkFollowing();
}, [user?.userId, isOwnProfile]);


const[menuOpen,setMenuOpen]=useState(false);
  return (
    <>
      <style>{`
        @keyframes textShine {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        @keyframes floatText {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }

        .jobhub-text-shine {
          background: linear-gradient(90deg, #2563eb, #7c3aed, #2563eb, #06b6d4);
          background-size: 300% 100%;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: textShine 5s ease-in-out infinite;
        }

        .jobhub-floating-text {
          animation: floatText 3s ease-in-out infinite;
        }
      `}</style>
    <div className="min-h-screen bg-[#f7f9fc] font-sans text-[#17203c]">

      {/* =====================================================
          TOP NAVBAR
      ===================================================== */}

<NavBar/>


      {/* =====================================================
          MAIN LAYOUT
      ===================================================== */}

          <div className="mx-auto flex max-w-[1200px]">

        {/* ================= LEFT SIDEBAR ================= */}
    


        {/* =====================================================
            CONTENT
        ===================================================== */}

        <main className="min-w-0 flex-1 p-5 lg:p-7">


          {/* =====================================================
              PROFILE HEADER
          ===================================================== */}

          <section className=" rounded-xl border border-slate-200 bg-white ">

            {/* Cover */}

{/* Cover */}

<div className="relative h-[285px] overflow-hidden">

  {/* Cover Image */}

  {profile.coverImage ? (
    <img
      src={profile.coverImage}
      alt="Profile Cover"
      className="h-full w-full object-cover"
    />
  ) : (
    <img
      src="/profile-background.png"
      alt="Default Cover"
      className="h-full w-full object-cover"
    />
  )}


  {/* Gradient Overlay */}

  <div className="absolute inset-0 bg-gradient-to-r from-blue-700/60 via-purple-500/20 to-transparent" />




  {/* Edit Cover */}

{isOwnProfile && (
  <label
    htmlFor="coverImage"
    className="absolute right-5 top-4 flex cursor-pointer items-center gap-1.5 rounded-lg bg-white px-4 py-2 text-xs font-bold text-slate-700 shadow-md hover:bg-slate-50"
  >
    <Pencil size={13} />

    Edit Cover

    <input
      id="coverImage"
      type="file"
      accept="image/*"
      className="hidden"
      onChange={(e) => {
        const file = e.target.files?.[0];

        if (file) {
          handleCoverImageUpload(file);
        }
      }}
    />
  </label>
)}

</div>


         {/* Profile information */}

<div className="relative px-6 pb-5">

  {/* Avatar */}

  <div className="absolute -top-[72px] left-7">

    <div className="relative">

      {user.profileImage ? (
        <img
          src={user.profileImage}
          alt={user.fullname}
          className="h-[128px] w-[128px] rounded-full border-4 border-white object-cover shadow-lg"
        />
      ) : (
        <div className="flex h-[128px] w-[128px] items-center justify-center rounded-full border-4 border-white bg-blue-100 text-3xl font-black text-blue-600 shadow-lg">
          {user.fullname?.charAt(0)}
        </div>
      )}

      {/* Online */}

      <div className="absolute -bottom-1 left-2 flex items-center gap-1 rounded-full border border-white bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-600 shadow-sm">

        <span className="h-2 w-2 rounded-full bg-emerald-500" />

        Online

      </div>

      {/* Edit Profile Image */}

{isOwnProfile && (
  <label
    htmlFor="profileImage"
    className="absolute bottom-2 right-0 flex h-7 w-7 cursor-pointer items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-md hover:text-blue-600"
  >
    <input
      id="profileImage"
      type="file"
      accept="image/*"
      className="hidden"
      onChange={(e) => {
        const file = e.target.files?.[0];

        if (file) {
          handleProfileImageUpload(file);
        }
      }}
    />

    <Pencil size={12} />
  </label>
)}

    </div>

  </div>

  {/* Profile body */}

              <div className="ml-[165px] pt-5">

                <div className="flex flex-col justify-between gap-4 xl:flex-row">

                  <div>

                    <h1 className="jobhub-text-shine text-3xl font-extrabold tracking-tight">
                      {user.fullname}
                    </h1>

                  <div className="mt-1">

  {/* Skills */}
  {profile?.skills?.length > 0 && (
    <div className="flex flex-wrap items-center gap-2">
      {profile.skills.map((skill, index) => (
        <React.Fragment key={index}>
          <span className="text-sm font-medium text-slate-600">
            {skill}
          </span>

          {index < profile.skills.length - 1 && (
            <span className="text-slate-400">|</span>
          )}
        </React.Fragment>
      ))}
    </div>
  )}

  {/* Location + Open to */}
  <div className="mt-2 flex flex-wrap items-center gap-3">

    <span className="flex items-center gap-1 text-sm text-slate-500">
      <MapPin size={13} />
      {user.location || "Location not specified"}
    </span>

    <span className="flex items-center gap-1 text-sm font-semibold text-emerald-600">
      <BriefcaseBusiness size={13} />
      Open to Opportunities
    </span>

  </div>

{!isOwnProfile && (
  <div className="relative mt-4 flex items-center gap-3">

    {/* Follow */}
   <button
  onClick={updateFollow}
  className={`rounded-full px-6 py-2.5 text-sm font-semibold transition ${
    following
      ? "border border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
      : "bg-blue-600 text-white hover:bg-blue-700"
  }`}
>
  {following ? "Following" : "Follow"}
</button>

    {/* Message */}
    <button
      className="rounded-full border border-slate-300 bg-white px-6 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
    >
      Message
    </button>

    {/* Options */}
    <button
      onClick={() => setOptionMenu(!optionMenu)}
      className="flex items-center gap-1 text-sm font-semibold text-gray-500 hover:text-gray-800"
    >
      <Ellipsis size={25} />
    </button>


    {/* Option Menu */}
  {optionMenu && (
  <div className="absolute left-40 bottom-12 z-50 w-48 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl">

    <button
      onClick={() => {
        console.log("Report profile");
        setOptionMenu(false);
      }}
      className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm text-slate-700 hover:bg-slate-50"
    >
      <FlagOff size={18} />
      <span>Report</span>
    </button>

    <button
      onClick={() => {
        console.log("Block user");
        setOptionMenu(false);
      }}
      className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm text-slate-700 hover:bg-slate-50"
    >
      <ShieldAlert size={18} />
      <span>Block user</span>
    </button>

    <button
      onClick={() => {
        navigator.clipboard.writeText(
          `${window.location.origin}/profile/${user.userId}`
        );
        setOptionMenu(false);
      }}
      className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm text-slate-700 hover:bg-slate-50"
    >
      <CopyCheck size={20}/>
      <span>Copy profile link</span>
    </button>

  </div>
)}

  </div>
)}



</div>



                  </div>


                  {/* Social + edit */}

                  <div className="flex flex-col items-start gap-3 xl:items-end">

                    <div className="flex items-center gap-4 text-slate-500">

                      <a
  href={profile.linkedinUrl || "#"}
  className="transition hover:text-blue-600"
>
  <Globe size={17} />
</a>

<a
  href={profile.githubUrl || "#"}
  className="transition hover:text-blue-600"
>
  <Code2 size={17} />
</a>

<a
  href={profile.portfolioUrl || "#"}
  className="transition hover:text-blue-600"
>
  <Share2 size={17} />
</a>

<div className="relative">
  <button
    onClick={() => setMenuOpen((prev) => !prev)}
    className="transition hover:text-blue-600"
  >
    <MoreHorizontal size={17} />
  </button>

  {menuOpen && (
   <div className="absolute right-0 top-full z-50 mt-2 w-56
                rounded-xl border border-gray-200
                bg-white py-2 shadow-xl">
      <Link
        to="/applications"
        onClick={() => setMenuOpen(false)}
        className="block px-4 py-3 text-sm hover:bg-blue-50"
      >
        My Applications
      </Link>

      <Link
        to="/saved-jobs"
        onClick={() => setMenuOpen(false)}
        className="block px-4 py-3 text-sm hover:bg-blue-50"
      >
        Saved Jobs
      </Link>

      <Link
        to="/account-settings"
        onClick={() => setMenuOpen(false)}
        className="block px-4 py-3 text-sm hover:bg-blue-50"
      >
        Account Settings
      </Link>
    </div>
  )}
</div>

                    </div>


                  {isOwnProfile && (
  <button
    onClick={() => {
      setEditForm({ ...profile });
      setIsEditOpen(true);
    }}
    className="flex items-center gap-2 rounded-lg bg-blue-50 px-5 py-2.5 text-xs font-bold text-blue-600 transition hover:bg-blue-100"
  >
    <Pencil size={13} />
    Edit Profile
  </button>
)}

                  </div>

                </div>

              </div>

            </div>

          </section>

          


          {/* =====================================================
              PROFILE STATS
          ===================================================== */}

         {/* =====================================================
    PROFILE STATS
===================================================== */}


          {/* =====================================================
              MAIN TWO COLUMN
          ===================================================== */}

          <div className="mt-4 grid gap-4 xl:grid-cols-[minmax(0,1fr)_320px]">


            {/* =================================================
                LEFT
            ================================================= */}

            <div className="space-y-4">


              {/* ABOUT */}
             
             <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">


  {/* ABOUT */}
 <section className="lg:col-span-2 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

  {/* Header */}
  <div className="mb-6 flex items-center justify-between">

    <h2 className="text-2xl font-semibold text-slate-900">
      About
    </h2>

    {isOwnProfile && (
      <button
        onClick={() => {
  setSkillsInput(profile?.skills?.join(", ") || "");
  setEditingField("about");
}}
        className="text-blue-600 hover:text-blue-700"
      >
        <Pencil size={18} />
      </button>
    )}

  </div>


  {/* About Description */}
  <div>

    <p className="text-sm leading-7 text-slate-600">
      {profile?.summary ||
        "No professional summary added yet."}
    </p>

  </div>


  {/* Skills */}
  {profile?.skills?.length > 0 && (
    <div className="mt-6  rounded-xl border border-slate-300 p-2 ">

      <h3 className="mb-3 text-sm font-semibold text-slate-900  ">
        Skills
      </h3>

      <div className="flex flex-wrap items-center gap-2 text-sm text-slate-700">
    {profile?.skills?.slice(0, 6).map((skill, index) => (
      <span key={index}>
        {index > 0 && (
          <span className="mx-1 text-slate-400">--</span>
        )}
        {skill}
      </span>
    ))}
  </div>

    </div>
  )}

</section>



{editingField === "about" && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

    <div className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl">

      {/* Header */}
      <div className="flex items-center justify-between border-b px-6 py-5">

        <div>
          <h2 className="text-xl font-semibold text-slate-900">
            Edit About
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Update your professional summary and skills
          </p>
        </div>

        <button
          onClick={() => setEditingField(null)}
          className="text-slate-400 hover:text-slate-700"
        >
          <X size={22} />
        </button>

      </div>


      {/* Form */}
      <div className="max-h-[70vh] overflow-y-auto p-6">

        {/* Summary */}
        <div className="mb-6">

          <label className="mb-2 block text-sm font-medium text-slate-700">
            About
          </label>

          <textarea
            rows={6}
            value={profile?.summary || ""}
            onChange={(e) =>
              setProfile({
                ...profile,
                summary: e.target.value
              })
            }
            placeholder="Write something about yourself..."
            className="w-full resize-none rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
          />

        </div>


        {/* Skills */}
        <div>

  <label className="mb-2 block text-sm font-medium text-slate-700">
    Skills
  </label>

  <input
    type="text"
    value={skillsInput}
    onChange={(e) => setSkillsInput(e.target.value)}
    placeholder="Java, Spring Boot, React, Docker"
    className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
  />

  <p className="mt-2 text-xs text-slate-400">
    Separate skills using commas.
  </p>

</div>

      </div>


      {/* Footer */}
      <div className="flex justify-end gap-3 border-t px-6 py-4">

        <button
          type="button"
          onClick={() => setEditingField(null)}
          className="rounded-lg border border-slate-300 px-5 py-2.5 font-medium text-slate-700 hover:bg-slate-50"
        >
          Cancel
        </button>

        <button
          type="button"
          onClick={updateAbout}
          className="rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white hover:bg-blue-700"
        >
          Save
        </button>

      </div>

    </div>

  </div>
)}


{/* EDUCATION */}
<section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

  {/* Header */}
  <div className="mb-6 flex items-center justify-between">

    <h2 className="text-2xl font-semibold text-slate-900">
      Education
    </h2>

    {isOwnProfile && (
      <button
        onClick={() => setEditingField("education")}
        className="text-blue-600 hover:text-blue-700"
      >
        <Pencil size={18} />
      </button>
    )}

  </div>

  {/* Education Details */}
  {profile?.highestEducation ||
   profile?.fieldOfStudy ||
   profile?.university ||
   profile?.graduationYear ? (

    <div>
      <h3 className="text-lg font-semibold text-slate-900">
        {profile?.highestEducation || "Education"}
      </h3>

      {profile?.fieldOfStudy && (
        <p className="mt-2 text-sm text-slate-600">
          {profile.fieldOfStudy}
        </p>
      )}

      {profile?.university && (
        <p className="mt-1 text-sm text-slate-600">
          {profile.university}
        </p>
      )}

      {profile?.graduationYear && (
        <p className="mt-2 text-sm text-slate-400">
          Graduation: {profile.graduationYear}
        </p>
      )}
    </div>

  ) : (

    /* Empty State */
    <div className="rounded-xl border border-dashed border-slate-200 py-12 text-center">

      <GraduationCap
        size={28}
        className="mx-auto text-slate-400"
      />

      <p className="mt-4 font-semibold text-slate-700">
        No Education added yet
      </p>

      <p className="mt-1 text-sm text-slate-400">
        Add your educational background to complete your profile.
      </p>

      {isOwnProfile && (
        <button
          onClick={() => setEditingField("education")}
          className="mt-5 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          Add Education
        </button>
      )}

    </div>
  )}

</section>



{editingField === "education" && (

  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

    <div className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl">

      {/* Header */}
      <div className="flex items-center justify-between border-b px-6 py-5">

        <div>

          <h2 className="text-xl font-semibold text-slate-900">
            Edit Education
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Update your educational information
          </p>

        </div>

        <button
          type="button"
          onClick={() => setEditingField(null)}
          className="text-slate-400 hover:text-slate-700"
        >
          <X size={22} />
        </button>

      </div>


      {/* Form */}
      <div className="space-y-5 p-6">

        {/* Highest Education */}
        <div>

          <label className="mb-2 block text-sm font-medium text-slate-700">
            Highest Education
          </label>

          <input
            type="text"
            value={profile?.highestEducation || ""}
            onChange={(e) =>
              setProfile({
                ...profile,
                highestEducation: e.target.value
              })
            }
            placeholder="e.g. B.Tech, BCA, MCA"
            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
          />

        </div>


        {/* University */}
        <div>

          <label className="mb-2 block text-sm font-medium text-slate-700">
            University / College
          </label>

          <input
            type="text"
            value={profile?.university || ""}
            onChange={(e) =>
              setProfile({
                ...profile,
                university: e.target.value
              })
            }
            placeholder="e.g. AKTU University"
            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
          />

        </div>


        {/* Field of Study */}
        <div>

          <label className="mb-2 block text-sm font-medium text-slate-700">
            Field of Study
          </label>

          <input
            type="text"
            value={profile?.fieldOfStudy || ""}
            onChange={(e) =>
              setProfile({
                ...profile,
                fieldOfStudy: e.target.value
              })
            }
            placeholder="e.g. Computer Science and Engineering"
            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
          />

        </div>


        {/* Graduation Year */}
        <div>

          <label className="mb-2 block text-sm font-medium text-slate-700">
            Graduation Year
          </label>

          <input
            type="number"
            min="1900"
            max="2100"
            value={profile?.graduationYear || ""}
            onChange={(e) =>
              setProfile({
                ...profile,
                graduationYear:
                  e.target.value === ""
                    ? null
                    : Number(e.target.value)
              })
            }
            placeholder="e.g. 2028"
            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
          />

        </div>

      </div>


      {/* Footer */}
      <div className="flex justify-end gap-3 border-t px-6 py-4">

        <button
          type="button"
          onClick={() => setEditingField(null)}
          className="rounded-lg border border-slate-300 px-5 py-2.5 font-medium text-slate-700 hover:bg-slate-50"
        >
          Cancel
        </button>

        <button
          type="button"
          onClick={updateEducation}
          className="rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white hover:bg-blue-700"
        >
          Save
        </button>

      </div>

    </div>

  </div>

)}

</div>

              {/* EXPERIENCE */}

              {/* Experience */}

{/* EXPERIENCE SECTION */}
<section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

  {/* Header */}
  <div className="mb-6 flex items-center justify-between">

    <h2 className="text-2xl font-semibold text-slate-900">
      Experience
    </h2>

    {isOwnProfile && (
      <button
        onClick={() => setEditingField("experience")}
        className="text-blue-600 hover:text-blue-700"
      >
        <Pencil size={18} />
      </button>
    )}

  </div>


  {/* Experience Details */}
  {profile?.currentJobTitle || profile?.currentCompany ? (

    <div className="relative flex gap-5">

      {/* Timeline */}
      <div className="flex flex-col items-center">

       

        <div className="mt-2 h-full w-px bg-slate-200" />

      </div>


      {/* Details */}
      <div className="flex-1 pb-6">

        {/* Job + Experience */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">

          <div>

            <h3 className="text-xl font-semibold text-slate-900">
              {profile.currentJobTitle || "Job Title Not Specified"}
            </h3>

            <p className="mt-1 text-sm font-medium text-blue-600">
              {profile.currentCompany || "Company Not Specified"}
            </p>

          </div>


        

        </div>


        {/* Location + Experience Level */}
        <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-slate-500">

          <div className="flex items-center gap-2">
            <MapPin size={15} />

            <span>
              {user.location || "Location not specified"}
            </span>
          </div>

          {profile.experienceLevel && (
            <>
              <span className="text-slate-300">
                •
              </span>

              <span className="capitalize">
                {profile.experienceLevel
                  .replaceAll("_", " ")
                  .toLowerCase()}
              </span>
            </>
          )}

        </div>


        {/* Description */}
        <div className="mt-5">

          <p className="text-sm leading-7 text-slate-600">
            {profile.summary ||
              "No professional experience summary added yet."}
          </p>

        </div>

      </div>

    </div>

  ) : (

    <div className="rounded-xl border border-dashed border-slate-200 py-12 text-center">

      <BriefcaseBusiness
        size={22}
        className="mx-auto text-slate-400"
      />

      <p className="mt-4 font-semibold text-slate-700">
        No experience added yet
      </p>

      <p className="mt-1 text-sm text-slate-400">
        Add your current job or professional experience.
      </p>

    </div>

  )}

</section>


{editingField === "experience" && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

    <div className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl">

      {/* Header */}
      <div className="flex items-center justify-between border-b px-6 py-5">

        <div>
          <h2 className="text-xl font-semibold text-slate-900">
            Edit Experience
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Update your professional experience
          </p>
        </div>

        <button
          onClick={() => setEditingField(null)}
          className="text-slate-400 hover:text-slate-700"
        >
          <X size={22} />
        </button>

      </div>


      {/* Form */}
      <div className="max-h-[70vh] overflow-y-auto p-6">

        {/* Job Title */}
        <div className="mb-5">

          <label className="mb-2 block text-sm font-medium text-slate-700">
            Job Title
          </label>

          <input
            type="text"
            value={profile?.currentJobTitle || ""}
            onChange={(e) =>
              setProfile({
                ...profile,
                currentJobTitle: e.target.value
              })
            }
            placeholder="e.g. Backend Developer"
            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
          />

        </div>


        {/* Company */}
        <div className="mb-5">

          <label className="mb-2 block text-sm font-medium text-slate-700">
            Company
          </label>

          <input
            type="text"
            value={profile?.currentCompany || ""}
            onChange={(e) =>
              setProfile({
                ...profile,
                currentCompany: e.target.value
              })
            }
            placeholder="e.g. ABC Technologies"
            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
          />

        </div>


        {/* Experience + Level */}
        <div className="grid gap-5 sm:grid-cols-2">

          {/* Total Experience */}
          <div>

            <label className="mb-2 block text-sm font-medium text-slate-700">
              Total Experience (Years)
            </label>

            <input
              type="number"
              min="0"
              max="60"
              value={profile?.totalExperienceYears ?? ""}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  totalExperienceYears:
                    e.target.value === ""
                      ? null
                      : Number(e.target.value)
                })
              }
              className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
            />

          </div>


          {/* Experience Level */}
          <div>

            <label className="mb-2 block text-sm font-medium text-slate-700">
              Experience Level
            </label>

            <select
              value={profile?.experienceLevel || ""}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  experienceLevel: e.target.value
                })
              }
              className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
            >

              <option value="">
                Select experience level
              </option>

              <option value="FRESHER">
                Fresher
              </option>

              <option value="ONE_TO_THREE_YEARS">
                One To Three Years
              </option>

              <option value="THREE_TO_FIVE_YEARS">
                Three To Five Years
              </option>

              <option value="FIVE_PLUS_YEARS">
                Five Plus Years
              </option>

            </select>

          </div>

        </div>


        {/* Experience Description */}
        <div className="mt-5">

          <label className="mb-2 block text-sm font-medium text-slate-700">
            Experience Description
          </label>

          <textarea
            rows={5}
            value={profile?.summary || ""}
            onChange={(e) =>
              setProfile({
                ...profile,
                summary: e.target.value
              })
            }
            placeholder="Describe your professional experience..."
            className="w-full resize-none rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
          />

        </div>

      </div>


      {/* Footer */}
      <div className="flex justify-end gap-3 border-t px-6 py-4">

        <button
          type="button"
          onClick={() => setEditingField(null)}
          className="rounded-lg border border-slate-300 px-5 py-2.5 font-medium text-slate-700 hover:bg-slate-50"
        >
          Cancel
        </button>

        <button
          type="button"
          onClick={updateExperienc}
          className="rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white hover:bg-blue-700"
        >
          Save
        </button>

      </div>

    </div>

  </div>
)}





 


<section className="lg:col-span-2 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

 <div className="flex items-center justify-between">

  <h2 className="text-2xl font-semibold text-slate-900">
    Projects
  </h2>

  {isOwnProfile && (
    <button
      onClick={() => setEditingField("project")}
      className="text-blue-600 hover:text-blue-700"
    >
      <Pencil size={18} />
    </button>
  )}

</div>

  <div className="mt-5">

    {profile?.projectName ? (
      <>
        <h3 className="text-lg font-semibold">
          {profile.projectName}
        </h3>

        <p className="mt-2 text-sm text-slate-600">
          {profile.projectDescription}
        </p>

        <p className="mt-3 text-sm text-slate-500">
          {profile.projectStartDate} —{" "}
          {profile.currentlyWorkingOnProject
            ? "Present"
            : profile.projectEndDate}
        </p>
      </>
    ) : (
      <p>No project added</p>
    )}

  </div>

</section>


{editingField === "project" && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

    <div className="w-full max-w-2xl rounded-2xl bg-white shadow-xl">

      {/* Header */}

      <div className="flex items-center justify-between border-b px-6 py-5">

        <div>
          <h2 className="text-xl font-semibold text-slate-900">
            Edit Project
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Update your project information
          </p>
        </div>

        <button
          onClick={() => setEditingField(null)}
          className="text-slate-500 hover:text-slate-800"
        >
          <X size={22} />
        </button>

      </div>


      {/* Form */}

      <div className="space-y-5 px-6 py-6">

        {/* Project Name */}

        <div>
          <label className="mb-2 block text-sm font-medium">
            Project Name
          </label>

          <input
            type="text"
            value={profile?.projectName || ""}
            onChange={(e) =>
              setProfile({
                ...profile,
                projectName: e.target.value
              })
            }
            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
          />
        </div>


        {/* Description */}

        <div>
          <label className="mb-2 block text-sm font-medium">
            Description
          </label>

          <textarea
            rows={5}
            value={profile?.projectDescription || ""}
            onChange={(e) =>
              setProfile({
                ...profile,
                projectDescription: e.target.value
              })
            }
            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
          />
        </div>


        {/* Dates */}

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

          <div>
            <label className="mb-2 block text-sm font-medium">
              Start Date
            </label>

            <input
              type="date"
              value={profile?.projectStartDate || ""}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  projectStartDate: e.target.value
                })
              }
              className="w-full rounded-lg border border-slate-300 px-4 py-3"
            />
          </div>


          {!profile?.currentlyWorkingOnProject && (
            <div>
              <label className="mb-2 block text-sm font-medium">
                End Date
              </label>

              <input
                type="date"
                value={profile?.projectEndDate || ""}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    projectEndDate: e.target.value
                  })
                }
                className="w-full rounded-lg border border-slate-300 px-4 py-3"
              />
            </div>
          )}

        </div>


        {/* Currently Working */}

        <label className="flex items-center gap-2 text-sm">

          <input
            type="checkbox"
            checked={profile?.currentlyWorkingOnProject || false}
            onChange={(e) =>
              setProfile({
                ...profile,
                currentlyWorkingOnProject: e.target.checked,
                projectEndDate: e.target.checked
                  ? null
                  : profile?.projectEndDate
              })
            }
            className="h-4 w-4"
          />

          I am currently working on this project

        </label>

      </div>


      {/* Footer */}

      <div className="flex justify-end gap-3 border-t px-6 py-4">

        <button
          onClick={() => setEditingField(null)}
          className="rounded-lg border border-slate-300 px-5 py-2"
        >
          Cancel
        </button>

        <button
          onClick={handleProjectUpdate}
          className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
        >
          Save
        </button>

      </div>

    </div>

  </div>
)}
              {/* EDUCATION */}



              {/* SKILLS */}

           
            </div>


            {/* =================================================
                RIGHT SIDEBAR
            ================================================= */}

            <div className="space-y-4">


              {/* RESUME */}

             


              {/* PROFILE COMPLETION */}

           


              {/* CAREER PREFERENCES */}

             
              {/* PREMIUM CTA */}
<section className="w-80 ml-5 mt-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

  {/* Header */}
  <div className="flex items-center justify-between">

    <h2 className="text-lg font-semibold text-slate-900">
      People you may know
    </h2>

    <button className="text-xs font-semibold text-blue-600 hover:text-blue-700">
      See all
    </button>

  </div>


  {/* People */}
  <div className="mt-5 space-y-5" >

    {userss.slice(0, 3).map((user) => {

      const profile = profiles[user.userId];

      return (

        <div key={user.userId}>

          {/* Person */}
          <div className="flex gap-3">

            {/* Profile Image */}
            <img
              src={user.profileImage}
              alt={user.fullname}
              className="h-12 w-12 shrink-0 rounded-full object-cover"

              
            />


            {/* User Info */}
            <div className="min-w-0 flex-1">

              <h3 className="text-sm font-semibold text-slate-900 truncate">
                {user.fullname}
              </h3>


            

              {/* Skills */}
              <div className="mt-1 text-xs text-slate-500 leading-5">

                {profile?.skills?.slice(0, 3).map((skill, index) => (
                  <span key={skill}>

                    {skill}

                    {index <
                      Math.min(profile.skills.length, 3) - 1 && (
                        <span className="mx-1">|</span>
                    )}

                  </span>
                ))}

              </div>

            </div>

          </div>



          {/* Follow */}
         <button
         onClick={()=> navigate(`/profile/${user.userId}`)}
                      className="
                        mt-2 rounded-full
                        border border-slate-400
                        px-4 py-1
                        text-sm font-semibold
                        text-slate-700
                        hover:border-blue-600
                        hover:text-blue-600
                      "
                    >
                      
                      Follow
                    </button>

                    <hr className="mt-2"></hr>

        </div>

      );

    })}

  </div>

</section>
            </div>

          </div>

        </main>

      </div>


      {/* =====================================================
          MOBILE BOTTOM NAV
      ===================================================== */}

      <div className="fixed bottom-0 left-0 right-0 z-50 flex h-16 items-center justify-around border-t border-slate-200 bg-white/95 backdrop-blur-xl lg:hidden">

        <a
          href="#"
          className="flex flex-col items-center gap-1 text-blue-600"
        >
          <UserRound size={18} />
          <span className="text-[8px] font-semibold">Profile</span>
        </a>

        <a
          href="#"
          className="flex flex-col items-center gap-1 text-slate-500"
        >
          <Briefcase size={18} />
          <span className="text-[8px]">Jobs</span>
        </a>

        <a
          href="#"
          className="flex flex-col items-center gap-1 text-slate-500"
        >
          <ClipboardCheck size={18} />
          <span className="text-[8px]">Applications</span>
        </a>

        <a
          href="#"
          className="flex flex-col items-center gap-1 text-slate-500"
        >
          <Heart size={18} />
          <span className="text-[8px]">Saved</span>
        </a>

        <a
          href="#"
          className="flex flex-col items-center gap-1 text-slate-500"
        >
          <Settings size={18} />
          <span className="text-[8px]">Settings</span>
        </a>

      </div>



      {/* =====================================================
          EDIT PROFILE MODAL
      ===================================================== */}

      {isEditOpen && (

        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm">

          <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-2xl">

            {/* Header */}

            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">

              <div>

                <h2 className="text-xl font-black text-slate-900">
                  Edit Profile
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Update your professional profile information
                </p>

              </div>

              <button
                type="button"
                onClick={() => setIsEditOpen(false)}
                className="rounded-lg px-3 py-2 text-slate-500 hover:bg-slate-100"
              >
                ✕
              </button>

            </div>


            {/* Form */}

            <form
              onSubmit={handleProfileUpdate}
              className="space-y-5 p-6"
            >

              {/* Headline */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Headline
                </label>

                <input
                  type="text"
                  name="headline"
                  value={editForm.headline || ""}
                  onChange={handleEditChange}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500"
                />

              </div>


              {/* Summary */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  About / Summary
                </label>

                <textarea
                  name="summary"
                  value={editForm.summary || ""}
                  onChange={handleEditChange}
                  rows="4"
                  className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500"
                />

              </div>


              {/* Job */}

              <div className="grid gap-4 md:grid-cols-2">

                <div>

                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Current Job Title
                  </label>

                  <input
                    type="text"
                    name="currentJobTitle"
                    value={editForm.currentJobTitle || ""}
                    onChange={handleEditChange}
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500"
                  />

                </div>


                <div>

                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Current Company
                  </label>

                  <input
                    type="text"
                    name="currentCompany"
                    value={editForm.currentCompany || ""}
                    onChange={handleEditChange}
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500"
                  />

                </div>

              </div>


              {/* Experience */}

              <div className="grid gap-4 md:grid-cols-2">

                <div>

                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Total Experience (Years)
                  </label>

                  <input
                    type="number"
                    name="totalExperienceYears"
                    min="0"
                    max="60"
                    value={editForm.totalExperienceYears ?? ""}
                    onChange={handleEditChange}
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500"
                  />

                </div>


                <div>

                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Experience Level
                  </label>

                  <select
                    name="experienceLevel"
                    value={editForm.experienceLevel || ""}
                    onChange={handleEditChange}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500"
                  >

                    <option value="">
                      Select Experience Level
                    </option>

                    <option value="FRESHER">
                      Fresher
                    </option>

                    <option value="ONE_TO_THREE_YEARS">
                      1 - 3 Years
                    </option>

                    <option value="THREE_TO_FIVE_YEARS">
                      3 - 5 Years
                    </option>

                    <option value="FIVE_PLUS_YEARS">
                      5+ Years
                    </option>

                  </select>

                </div>

              </div>


              {/* Education */}

              <div className="grid gap-4 md:grid-cols-2">

                <div>

                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Highest Education
                  </label>

                  <input
                    type="text"
                    name="highestEducation"
                    value={editForm.highestEducation || ""}
                    onChange={handleEditChange}
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500"
                  />

                </div>


                <div>

                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    University / College
                  </label>

                  <input
                    type="text"
                    name="university"
                    value={editForm.university || ""}
                    onChange={handleEditChange}
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500"
                  />

                </div>


                <div>

                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Field of Study
                  </label>

                  <input
                    type="text"
                    name="fieldOfStudy"
                    value={editForm.fieldOfStudy || ""}
                    onChange={handleEditChange}
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500"
                  />

                </div>


                <div>

                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Graduation Year
                  </label>

                  <input
                    type="number"
                    name="graduationYear"
                    value={editForm.graduationYear ?? ""}
                    onChange={handleEditChange}
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500"
                  />

                </div>


                <div>

                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    CGPA
                  </label>

                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    max="10"
                    name="cgpa"
                    value={editForm.cgpa ?? ""}
                    onChange={handleEditChange}
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500"
                  />

                </div>


                <div>

                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    College Location
                  </label>

                  <input
                    type="text"
                    name="collegeLocation"
                    value={editForm.collegeLocation || ""}
                    onChange={handleEditChange}
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500"
                  />

                </div>

              </div>


              {/* Preferred Job */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Preferred Job Title
                </label>

                <input
                  type="text"
                  name="preferredJobTitle"
                  value={editForm.preferredJobTitle || ""}
                  onChange={handleEditChange}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500"
                />

              </div>


              {/* Social Links */}

              <div className="grid gap-4 md:grid-cols-3">

                <input
                  type="text"
                  name="linkedinUrl"
                  placeholder="LinkedIn URL"
                  value={editForm.linkedinUrl || ""}
                  onChange={handleEditChange}
                  className="rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500"
                />

                <input
                  type="text"
                  name="githubUrl"
                  placeholder="GitHub URL"
                  value={editForm.githubUrl || ""}
                  onChange={handleEditChange}
                  className="rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500"
                />

                <input
                  type="text"
                  name="portfolioUrl"
                  placeholder="Portfolio URL"
                  value={editForm.portfolioUrl || ""}
                  onChange={handleEditChange}
                  className="rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500"
                />

              </div>


              {/* Buttons */}

              <div className="flex justify-end gap-3 border-t border-slate-100 pt-5">

                <button
                  type="button"
                  onClick={() => setIsEditOpen(false)}
                  className="rounded-xl bg-slate-100 px-5 py-3 text-sm font-bold text-slate-600 hover:bg-slate-200"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-blue-200 hover:bg-blue-700"
                >
                  Save Changes
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>

    
    </>
  );
};

export default Profile;