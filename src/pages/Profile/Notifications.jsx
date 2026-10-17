import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "../../component/NavBar";
import api from "../../Service/Api";
import {
  Bell,
  BriefcaseBusiness,
  CalendarDays,
  Building2,
  ChevronRight,
  Ellipsis,
  ArrowRight,
  MailX,
} from "lucide-react";
import toast from "react-hot-toast";

const Notifications = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [openMenu, setOpenMenu] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await api.get("/notification/me");
        setNotifications(Array.isArray(response.data) ? response.data : []);
      } catch (fetchError) {
        console.error("Notification Fetch Error:", fetchError);
        setError("Failed to load notifications");
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  const handleDelete = async (notificationId) => {
    try {
      await api.delete(`/notification/${notificationId}`);
      setNotifications((prev) =>
        prev.filter((notification) => notification.notificationId !== notificationId)
      );
      setOpenMenu(null);
      toast.success("Notification deleted");
    } catch (deleteError) {
      console.error("Delete notification failed:", deleteError);
      toast.error("Failed to delete notification");
    }
  };

  const applicationCount = notifications.filter(
    (n) =>
      n.type === "APPLICATION_SUBMITTED" ||
      n.type === "APPLICATION_STATUS_CHANGED"
  ).length;

  const jobCount = notifications.filter((n) => n.type === "JOB_LOCATION").length;

  const interviewCount = notifications.filter((n) =>
    [
      "APPLICATION_SHORTLISTED",
      "APPLICATION_HIRED",
      "APPLICATION_OFFERED",
      "APPLICATION_UNDER_REVIEW",
      "INTERVIEW_SCHEDULED",
      "APPLICATION_REJECTED",
    ].includes(String(n.type || "").trim().toUpperCase())
  ).length;

  const filteredNotifications =
    activeTab === "all"
      ? notifications
      : activeTab === "applications"
      ? notifications.filter(
          (n) =>
            n.type === "APPLICATION_SUBMITTED" ||
            n.type === "APPLICATION_STATUS_CHANGED"
        )
      : activeTab === "jobs"
      ? notifications.filter((n) => n.type === "JOB_LOCATION")
      : activeTab === "interview"
      ? notifications.filter((n) =>
          [
            "APPLICATION_SHORTLISTED",
            "APPLICATION_HIRED",
            "APPLICATION_OFFERED",
            "APPLICATION_UNDER_REVIEW",
            "INTERVIEW_SCHEDULED",
            "APPLICATION_REJECTED",
          ].includes(String(n.type || "").trim().toUpperCase())
        )
      : activeTab === "messages"
      ? notifications.filter((n) => String(n.type || "").toUpperCase().includes("MESSAGE"))
      : activeTab === "system"
      ? notifications.filter((n) => {
          const type = String(n.type || "").toUpperCase();
          return type.includes("SYSTEM") || type.includes("SECURITY");
        })
      : notifications;

  const getBadge = (notification) => {
    const type = String(notification.type || "").trim().toUpperCase();
    if (type === "JOB_LOCATION") {
      return { label: "JOB ALERT", style: "border-emerald-200 bg-emerald-50 text-emerald-700" };
    }
    if (type.includes("INTERVIEW") || type.includes("SHORTLISTED") || type.includes("HIRED") || type.includes("OFFERED")) {
      return { label: "INTERVIEW", style: "border-violet-200 bg-violet-50 text-violet-700" };
    }
    if (type.includes("MESSAGE")) {
      return { label: "MESSAGE", style: "border-amber-200 bg-amber-50 text-amber-700" };
    }
    if (type.includes("SYSTEM") || type.includes("SECURITY")) {
      return { label: "SYSTEM", style: "border-slate-200 bg-slate-100 text-slate-700" };
    }
    if (type.startsWith("APPLICATION")) {
      return { label: "APPLICATION", style: "border-blue-200 bg-blue-50 text-blue-700" };
    }
    return { label: "UPDATE", style: "border-sky-200 bg-sky-50 text-sky-700" };
  };

  const formatDate = (value) => {
    if (!value) return "Recently";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "Recently";
    return date.toLocaleString([], {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  const tabs = [
    { id: "all", label: "All", count: notifications.length },
    { id: "applications", label: "Applications", count: applicationCount },
    { id: "jobs", label: "Jobs", count: jobCount },
    { id: "interview", label: "Interview", count: interviewCount },
    {
      id: "messages",
      label: "Messages",
      count: notifications.filter((n) => String(n.type || "").toUpperCase().includes("MESSAGE")).length,
    },
    {
      id: "system",
      label: "System",
      count: notifications.filter((n) => {
        const type = String(n.type || "").toUpperCase();
        return type.includes("SYSTEM") || type.includes("SECURITY");
      }).length,
    },
  ];

  return (
    <div className="min-h-screen bg-[#f3f2ef] text-[#191919]">
      <NavBar />

      <main className="mx-auto w-full max-w-[760px] px-3 py-6 sm:px-5">
        <div className="mb-4">
          <div className="mb-2 flex items-center gap-2 text-sm text-[#666666]">
            <Link to="/" className="hover:text-[#0a66c2] hover:underline">Home</Link>
            <ChevronRight size={14} />
            <span>Profile</span>
            <ChevronRight size={14} />
            <span className="text-[#191919]">Notifications</span>
          </div>
          <h1 className="text-2xl font-semibold tracking-tight sm:text-[28px]">Notifications</h1>
          <p className="mt-1 text-sm text-[#666666]">
            Stay updated with the latest activities, job updates and opportunities.
          </p>
        </div>

        {/* LinkedIn-inspired centered filter bar */}
        <div className="mb-3 rounded-lg border border-[#d6d6d6] bg-white p-4">
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors duration-150 ${
                  activeTab === tab.id
                    ? "border-[#057642] bg-[#057642] text-white"
                    : "border-[#8c8c8c] bg-white text-[#404040] hover:border-[#191919] hover:bg-[#f3f2ef]"
                }`}
              >
                {tab.label} <span className={activeTab === tab.id ? "text-white/90" : "text-[#666666]"}>({tab.count})</span>
              </button>
            ))}
          </div>
        </div>

        <section className="overflow-hidden rounded-lg border border-[#d6d6d6] bg-white">
          {loading && (
            <p className="p-6 text-sm text-[#666666]">Loading notifications...</p>
          )}

          {error && !loading && (
            <p className="p-6 text-sm text-red-600">{error}</p>
          )}

          {!loading && !error && filteredNotifications.length === 0 && (
            <div className="px-5 py-14 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#f3f2ef] text-[#666666]">
                <MailX size={24} />
              </div>
              <h3 className="mt-4 text-lg font-semibold">No notifications</h3>
              <p className="mt-1 text-sm text-[#666666]">You don't have any notifications yet.</p>
            </div>
          )}

          {!loading && !error && filteredNotifications.map((notification) => {
            const badge = getBadge(notification);
            return (
              <article
                key={notification.notificationId}
                className={`group relative border-b border-[#d6d6d6] transition-colors duration-150 last:border-b-0 hover:bg-[#f8fbff] ${
                  notification.isRead ? "bg-white" : "bg-[#eaf4ff]"
                }`}
              >
                <div className={`flex items-start gap-3 border-l-4 p-4 sm:gap-4 sm:p-5 ${
                  notification.isRead ? "border-l-transparent" : "border-l-[#0a66c2]"
                }`}>
                  {!notification.isRead && (
                    <span className="absolute left-1.5 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-[#0a66c2]" />
                  )}

                  <div className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-md border border-[#e5e5e5] bg-white text-[#0a66c2]">
                    {notification.companyLogo ? (
                      <img
                        src={notification.companyLogo}
                        alt={notification.companyName || "Company"}
                        className="h-full w-full object-contain p-1"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                    ) : (
                      <Building2 size={23} />
                    )}
                    <span className="absolute -bottom-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-[#0a66c2] text-white">
                      <Bell size={10} />
                    </span>
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-sm font-semibold leading-5 text-[#191919] sm:text-[15px]">
                            {notification.title}
                          </h3>
                          <span className={`rounded-md border px-2 py-0.5 text-[10px] font-bold tracking-wide ${badge.style}`}>
                            {badge.label}
                          </span>
                        </div>
                        {notification.companyName && (
                          <p className="mt-1 text-sm text-[#404040]">{notification.companyName}</p>
                        )}
                      </div>

                      <div className="relative flex shrink-0 items-center gap-1">
                        <span className="whitespace-nowrap text-xs text-[#666666]">
                          {notification.createdAt
                            ? new Date(notification.createdAt).toLocaleDateString([], { month: "short", day: "numeric" })
                            : "Recently"}
                        </span>
                        <button
                          type="button"
                          aria-label="Notification options"
                          onClick={() => setOpenMenu(openMenu === notification.notificationId ? null : notification.notificationId)}
                          className="flex h-8 w-8 items-center justify-center rounded-full text-[#666666] hover:bg-[#e8e8e8] hover:text-[#191919]"
                        >
                          <Ellipsis size={20} />
                        </button>
                        {openMenu === notification.notificationId && (
                          <div className="absolute right-0 top-9 z-20 w-32 rounded-md border border-[#d6d6d6] bg-white p-1 shadow-lg">
                            <button
                              type="button"
                              onClick={() => handleDelete(notification.notificationId)}
                              className="w-full rounded px-3 py-2 text-left text-sm font-semibold text-red-600 hover:bg-[#f3f2ef]"
                            >
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    <p className="mt-1 text-sm leading-5 text-[#404040]">{notification.message}</p>

                    {(notification.jobTitle || notification.companyName) && (
                      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-[#666666]">
                        {notification.jobTitle && (
                          <span className="inline-flex items-center gap-1.5">
                            <BriefcaseBusiness size={13} /> {notification.jobTitle}
                          </span>
                        )}
                        {notification.companyName && (
                          <span className="inline-flex items-center gap-1.5">
                            <Building2 size={13} /> {notification.companyName}
                          </span>
                        )}
                      </div>
                    )}

                    <div className="mt-3 flex items-center justify-between gap-3">
                      <span className="text-xs text-[#666666]">{formatDate(notification.createdAt)}</span>
                      {notification.relatedEntityType === "JOB" && notification.relatedEntityId && (
                        <button
                          type="button"
                          onClick={() => navigate(`/jobs/${notification.relatedEntityId}`)}
                          className="inline-flex items-center gap-1 text-sm font-semibold text-[#0a66c2] hover:underline"
                        >
                          View <ArrowRight size={14} />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </section>
      </main>
    </div>
  );
};

export default Notifications;
