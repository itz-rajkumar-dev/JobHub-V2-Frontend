
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import boy from "../assets/boy.png";
import google1 from "../assets/google1.png";
import microsoft from "../assets/microsoft.png";
import Navbar from "../component/NavBar";
import Footer from "../component/Footer";
import toast, { Toaster } from "react-hot-toast";
import api from "../Service/Api";




const Login = () => {

    const[email,setEmail]=useState("");
    const[password,setPassword]=useState("");
    const navigate=useNavigate();

    const [showPassword, setShowPassword] = useState(false);

     const handleLogin = async () => {


        if(!email||!password){

            toast.error("Please Enter Email and Password");

            return;
        }
    try {

        const response = await api.post("/auth/login", {
            email: email,
            password: password
        });

        localStorage.setItem("token",response.data.token);
        localStorage.setItem("userId", response.data.userId);
        localStorage.setItem("role", response.data.role);

        console.log("Login Successful");

        console.log(response.data);

        toast.success("Login Successful");

        navigate("/");

    } catch (error) {

        console.log(error);

        if(error.response?.status===401){

            toast.error("Invaild email or password");
            return;
        }else{

        toast.error("Something went wrong. Please try again.");
        }

    }
};


       

   
 
    return (

       <>

       <Navbar/>
       


      


  

                {/* ================= RIGHT SIDE ================= */}

{/* ======================================================
    PREMIUM JOBHUB LOGIN — REGISTER THEME
====================================================== */}

<div className="min-h-screen bg-[#10231f] px-4 py-6 sm:px-6 lg:px-10">
  <div className="mx-auto flex min-h-[calc(100vh-48px)] max-w-[1440px] overflow-hidden rounded-[32px] bg-[#f7f8f5] shadow-2xl shadow-black/20">


    {/* ================================================
        LEFT BRAND PANEL
    ================================================ */}

    <div className="relative hidden w-1/2 flex-col justify-between
      overflow-hidden bg-[#10231f] p-10 text-white
      md:flex lg:p-14">

      {/* Background Decoration */}
      <div className="pointer-events-none absolute -right-32 -top-32
        h-96 w-96 rounded-full border border-white/10" />

      <div className="pointer-events-none absolute -right-20 -top-20
        h-72 w-72 rounded-full border border-white/10" />

      <div className="pointer-events-none absolute -bottom-32 -left-24
        h-80 w-80 rounded-full bg-emerald-400/10 blur-3xl" />

      {/* Brand */}
      <Link to="/" className="relative z-10 flex items-center gap-3">

        <div className="flex h-12 w-12 items-center justify-center
          rounded-2xl bg-white text-xl font-black text-[#10231f]
          shadow-lg">
          J
        </div>

        <div>
          <h2 className="text-xl font-extrabold tracking-tight">
            JobHub
          </h2>

          <p className="mt-0.5 text-[9px] font-semibold
            uppercase tracking-[0.28em] text-white/50">
            Find your next move
          </p>
        </div>

      </Link>


      {/* Main Content */}
      <div className="relative z-10 my-12 max-w-xl">

        <span className="inline-flex items-center gap-2
          rounded-full border border-lime-300/20
          bg-lime-300/10 px-4 py-2 text-[11px]
          font-bold uppercase tracking-[0.18em] text-lime-300">

          <span className="h-1.5 w-1.5 rounded-full bg-lime-300" />
          Your next chapter starts here

        </span>

        <h1 className="mt-8 text-4xl font-bold leading-[1.2]
          tracking-tight lg:text-5xl xl:text-[58px]">

          Welcome back.

          <span className="mt-2 block italic text-white/40">
            Your next move
            <br />
            starts here.
          </span>

        </h1>

        <p className="mt-6 max-w-md text-sm leading-7
          text-white/60 lg:text-base">
          Sign in to discover exciting opportunities, connect
          with leading companies and continue building your
          career with JobHub.
        </p>


        {/* Feature Cards */}
        <div className="mt-10 grid grid-cols-2 gap-3">

          <div className="rounded-2xl border border-white/10
            bg-white/[0.04] p-4 backdrop-blur-sm">

            <div className="flex h-10 w-10 items-center
              justify-center rounded-xl bg-lime-300/10
              text-lime-300">
              <i className="fa-solid fa-briefcase text-lg" />
            </div>

            <p className="mt-4 text-sm font-bold text-white">
              Find opportunities
            </p>

            <p className="mt-1 text-xs leading-5 text-white/45">
              Explore jobs that fit your goals.
            </p>

          </div>


          <div className="rounded-2xl border border-white/10
            bg-white/[0.04] p-4 backdrop-blur-sm">

            <div className="flex h-10 w-10 items-center
              justify-center rounded-xl bg-lime-300/10
              text-lime-300">
              <i className="fa-solid fa-chart-line text-lg" />
            </div>

            <p className="mt-4 text-sm font-bold text-white">
              Grow your career
            </p>

            <p className="mt-1 text-xs leading-5 text-white/45">
              Take the next step with confidence.
            </p>

          </div>

        </div>

      </div>


      {/* Footer */}
      <div className="relative z-10 flex items-center
        justify-between border-t border-white/10 pt-6">

        <p className="text-xs text-white/40">
          Your career. Your next move.
        </p>

        <div className="flex items-center gap-2 text-xs
          font-semibold text-white/60">

          <i className="fa-solid fa-shield-halved text-lime-300" />
          Secure sign in

        </div>

      </div>

    </div>


    {/* ================================================
        RIGHT LOGIN FORM
    ================================================ */}

    <div className="flex w-full items-center justify-center
      bg-[#f7f8f5] px-5 py-10 sm:px-10 md:w-1/2
      md:px-10 lg:px-16 xl:px-20">

      <div className="w-full max-w-[460px] animate-fade-up">

        {/* Mobile Brand */}
        <Link to="/" className="mb-10 flex items-center
          justify-center gap-3 md:hidden">

          <div className="flex h-11 w-11 items-center
            justify-center rounded-2xl bg-[#10231f]
            text-lg font-black text-white">
            J
          </div>

          <div>
            <p className="text-xl font-extrabold text-[#10231f]">
              JobHub
            </p>

            <p className="text-[9px] font-semibold
              uppercase tracking-[0.22em] text-slate-400">
              Find your next move
            </p>
          </div>

        </Link>


        {/* Form Heading */}
        <div className="mb-9">

          <p className="text-[10px] font-bold uppercase
            tracking-[0.25em] text-[#75867b]">
            Welcome back
          </p>

          <h2 className="mt-3 text-3xl font-bold
            tracking-tight text-[#15211d] sm:text-4xl">
            Sign in to JobHub
          </h2>

          <p className="mt-3 text-sm leading-6 text-[#7a827d]">
            Enter your details to continue your journey.
          </p>

        </div>


        {/* Email */}
        <div>

          <label className="mb-2 block text-xs font-bold
            text-[#26332d]">
            Email address
          </label>

          <div className="group relative">

            <i className="fa-regular fa-envelope absolute
              left-4 top-1/2 -translate-y-1/2
              text-[#98a29b] transition-colors
              group-focus-within:text-[#365f49]" />

            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-[54px] w-full rounded-xl
                border border-[#e0e5df] bg-white
                pl-11 pr-4 text-sm text-[#18241e]
                outline-none transition-all
                placeholder:text-[#a1aaa3]
                hover:border-[#c5d2c7]
                focus:border-[#466d54]
                focus:ring-4 focus:ring-[#466d54]/10"
            />

          </div>

        </div>


        {/* Password */}
        <div className="mt-5">

          <label className="mb-2 block text-xs font-bold
            text-[#26332d]">
            Password
          </label>

          <div className="group relative">

            <i className="fa-solid fa-lock absolute
              left-4 top-1/2 -translate-y-1/2
              text-[#98a29b] transition-colors
              group-focus-within:text-[#365f49]" />

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-[54px] w-full rounded-xl
                border border-[#e0e5df] bg-white
                pl-11 pr-12 text-sm text-[#18241e]
                outline-none transition-all
                placeholder:text-[#a1aaa3]
                hover:border-[#c5d2c7]
                focus:border-[#466d54]
                focus:ring-4 focus:ring-[#466d54]/10"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute right-4 top-1/2
                -translate-y-1/2 text-[#98a29b]
                transition hover:text-[#263b2e]"
            >
              <i className={
                showPassword
                  ? "fa-solid fa-eye"
                  : "fa-solid fa-eye-slash"
              } />
            </button>

          </div>

        </div>


        {/* Forgot Password */}
        <div className="mt-4 flex justify-end">

          <Link
            to="/forgot-password"
            className="text-xs font-bold text-[#365f49]
              transition hover:text-[#1e3d2b] hover:underline"
          >
            Forgot password?
          </Link>

        </div>


        {/* Login Button */}
        <button
          type="button"
          onClick={handleLogin}
          className="mt-7 flex h-[54px] w-full
            items-center justify-center gap-2
            rounded-xl bg-[#18372a] text-sm
            font-bold text-white shadow-lg
            shadow-[#18372a]/15 transition-all
            duration-300 hover:-translate-y-0.5
            hover:bg-[#244b38] hover:shadow-xl
            active:translate-y-0"
        >

          Sign in to your account

          <i className="fa-solid fa-arrow-right text-xs" />

        </button>


        {/* Divider */}
        <div className="my-7 flex items-center gap-4">

          <div className="h-px flex-1 bg-[#e1e5df]" />

          <span className="text-[11px] font-medium text-[#969e97]">
            OR CONTINUE WITH
          </span>

          <div className="h-px flex-1 bg-[#e1e5df]" />

        </div>


        {/* Social Login */}
        <div className="grid grid-cols-2 gap-3">

          <button
            type="button"
            className="flex h-[50px] items-center
              justify-center gap-2.5 rounded-xl
              border border-[#e0e5df] bg-white
              text-sm font-semibold text-[#26332d]
              transition hover:border-[#c5d2c7]
              hover:bg-[#f0f3ee]"
          >

            <img
              src={google1}
              alt="Google"
              className="h-5 w-5 object-contain"
            />

            Google

          </button>


          <button
            type="button"
            className="flex h-[50px] items-center
              justify-center gap-2.5 rounded-xl
              border border-[#e0e5df] bg-white
              text-sm font-semibold text-[#26332d]
              transition hover:border-[#c5d2c7]
              hover:bg-[#f0f3ee]"
          >

            <img
              src={microsoft}
              alt="Microsoft"
              className="h-5 w-5 object-contain"
            />

            Microsoft

          </button>

        </div>


        {/* Register Link */}
        <p className="mt-8 text-center text-sm text-[#858e87]">

          Don't have an account?

          <Link
            to="/register"
            className="ml-1.5 font-bold text-[#294e38]
              transition hover:text-[#142f20] hover:underline"
          >
            Create account
          </Link>

        </p>


        {/* Trust Note */}
        <div className="mt-8 flex items-center justify-center
          gap-2 text-[10px] text-[#9ba39c]">

          <i className="fa-solid fa-lock" />

          Your information stays protected.

        </div>

      </div>

    </div>

  </div>

</div>


           
  <Footer/>
        </>
    );
};



export default Login;