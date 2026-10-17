import React from "react";
import {
  ArrowUpRight,
  Search,
  Building2,
  BriefcaseBusiness,
  Mail,

} from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#071614] text-white border-t border-white/10">

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Brand */}
          <div className="lg:col-span-1">

            <Link to="/" className="flex items-center gap-3 w-fit">

              <div className="w-10 h-10 rounded-xl bg-white text-[#0b0d0f] flex items-center justify-center font-black text-lg">
                J
              </div>

              <div>
                <h2 className="text-xl font-bold">
                  Job<span className="text-gray-400">Hub</span>
                </h2>

                <p className="text-[9px] uppercase tracking-[0.25em] text-gray-500">
                  Find your next move
                </p>
              </div>

            </Link>

            <p className="mt-6 text-sm leading-6 text-gray-400 max-w-xs">
              Discover meaningful opportunities, connect with great companies,
              and take the next step in your career.
            </p>

      <div className="flex gap-3 mt-7">
  {/* Instagram */}
  <a
    href="#"
    className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition"
    aria-label="Instagram"
  >
    <span className="text-sm font-semibold">◎</span>
  </a>

  {/* X / Twitter */}
  <a
    href="#"
    className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition"
    aria-label="X"
  >
    <span className="text-sm font-semibold">𝕏</span>
  </a>

  {/* YouTube */}
  <a
    href="#"
    className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition"
    aria-label="YouTube"
  >
    <span className="text-xs font-bold">▶</span>
  </a>

  {/* Email */}
  <a
    href="#"
    className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition"
    aria-label="Email"
  >
    <Mail size={16} />
  </a>
</div>

</div>


          {/* For Job Seekers */}
          <div>

            <h3 className="text-sm font-semibold mb-6">
              For Job Seekers
            </h3>

            <div className="space-y-4">

              <Link
                to="/jobs"
                className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition"
              >
                <Search size={15} />
                Find Jobs
              </Link>

              <Link
                to="/saved-jobs"
                className="text-sm text-gray-400 hover:text-white transition block"
              >
                Saved Jobs
              </Link>

              <Link
                to="/applications"
                className="text-sm text-gray-400 hover:text-white transition block"
              >
                My Applications
              </Link>

              <Link
                to="/profile"
                className="text-sm text-gray-400 hover:text-white transition block"
              >
                My Profile
              </Link>

            </div>

          </div>


          {/* For Employers */}
          <div>

            <h3 className="text-sm font-semibold mb-6">
              For Employers
            </h3>

            <div className="space-y-4">

              <Link
                to="/employer"
                className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition"
              >
                <BriefcaseBusiness size={15} />
                Employer Dashboard
              </Link>

              <Link
                to="/post-job"
                className="text-sm text-gray-400 hover:text-white transition block"
              >
                Post a Job
              </Link>

              <Link
                to="/my-jobs"
                className="text-sm text-gray-400 hover:text-white transition block"
              >
                Manage Jobs
              </Link>

              <Link
                to="/applicants"
                className="text-sm text-gray-400 hover:text-white transition block"
              >
                View Applicants
              </Link>

            </div>

          </div>


          {/* Explore */}
          <div>

            <h3 className="text-sm font-semibold mb-6">
              Explore JobHub
            </h3>

            <div className="space-y-4">

              <Link
                to="/companies"
                className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition"
              >
                <Building2 size={15} />
                Companies
              </Link>

              <Link
                to="/career-resources"
                className="text-sm text-gray-400 hover:text-white transition block"
              >
                Career Resources
              </Link>

              <Link
                to="/about"
                className="text-sm text-gray-400 hover:text-white transition block"
              >
                About JobHub
              </Link>

              <Link
                to="/contact"
                className="text-sm text-gray-400 hover:text-white transition block"
              >
                Contact Us
              </Link>

            </div>

          </div>

        </div>


        {/* CTA */}
        <div className="mt-16 rounded-2xl border border-white/10 bg-white/[0.03] p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">

          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-2">
              Your next opportunity
            </p>

            <h3 className="text-2xl font-semibold">
              Ready to find your next move?
            </h3>
          </div>

          <Link
            to="/jobs"
            className="group flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full text-sm font-semibold hover:bg-gray-200 transition"
          >
            Explore Jobs

            <ArrowUpRight
              size={16}
              className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
            />
          </Link>

        </div>

      </div>


      {/* Bottom Bar */}
      <div className="border-t border-white/10">

        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4">

          <p className="text-xs text-gray-500">
            © 2026 JobHub. All rights reserved.
          </p>

          <div className="flex items-center gap-6">

            <Link
              to="/privacy"
              className="text-xs text-gray-500 hover:text-white transition"
            >
              Privacy Policy
            </Link>

            <Link
              to="/terms"
              className="text-xs text-gray-500 hover:text-white transition"
            >
              Terms of Service
            </Link>

          </div>

        </div>

      </div>

    </footer>
  );
};

export default Footer;