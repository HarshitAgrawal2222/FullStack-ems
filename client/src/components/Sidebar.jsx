import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { dummyProfileData } from "../assets/assets";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";
import { Calendar, DollarSignIcon, FileText, LayoutGrid, LogOutIcon, Menu, SettingsIcon, User, X } from "lucide-react";

const Sidebar = () => {
  const { pathname } = useLocation();
  const [userName, setUserName] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  const { user, loading, logout } = useAuth();

useEffect(() => {
  api.get("/profile").then(({ data }) => {
    if (data.firstName)
      setUserName(`${data.firstName} ${data.lastName || ""}`.trim());
  });
}, []);

// Close mobile sidebar on route change
useEffect(() => {
  setMobileOpen(false);
}, [pathname]);

const role = user?.role;

  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutGrid },

    role === "ADMIN"
      ? { name: "Employees", href: "/employees", icon: User }
      : { name: "Attendance", href: "/attendance", icon: Calendar },

    { name: "Leave", href: "/leave", icon: FileText },
    { name: "Payslips", href: "/payslips", icon:DollarSignIcon },

    { name: "Settings", href: "/settings", icon: SettingsIcon },
  ];

  const handleLogout = ()=>{
    logout()
    window.location.href = "/login"
  }

  const sidebarContent = (
    <>
      {/* Brand */}
      <div className="px-5 pt-6 pb-5 border-b border-white/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <User className="text-white w-6 h-6" />
            <div>
              <p className="font-semibold text-sm text-white">
                Employee MS
              </p>
              <p className="text-xs text-slate-400">
                Management System
              </p>
            </div>
          </div>

          <button
            onClick={() => setMobileOpen(false)}
            className="lg:hidden text-slate-400 hover:text-white transition"
          >
            <X size={20} />
          </button>
        </div>
      </div>

      {/* Profile */}
      <div className="flex items-center gap-3 px-5 py-4 border-b border-white/10">
        <div className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center ring-1 ring-white/10">
          <span className="text-slate-300 text-xs font-semibold">
            {userName?.charAt(0).toUpperCase()}
          </span>
        </div>

        <div className="min-w-0">
          <p className="text-sm text-slate-200 truncate">{userName}</p>
          <p className="text-xs text-slate-400">
            {role === "ADMIN" ? "Administrator" : "Employee"}
          </p>
        </div>
      </div>

      {/* Section label */}
      <div className="px-5 pt-5 pb-2">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
          Navigation
        </p>
      </div>

      {/* Navigation List */}
      <div className="flex-1 px-3 space-y-1 overflow-y-auto">
        {loading? (
          <div className='px-3 py-3 flex items-center gap-2 text-slate-500'> <Loader2 className="animate-spin w-4 h-4" />
      <span className="text-sm">Loading...</span></div>
        ): ( navItems.map((item) => {
          const isActive = pathname.startsWith(item.href);

          return (
            <Link
              key={item.name}
              to={item.href}
              className={`group relative flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-all ${
                isActive
                  ? "text-indigo-300 bg-white/5"
                  : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
              }`}
            >
              {/* Active indicator */}
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-indigo-500 rounded-r-full" />
              )}

              {/* Icon */}
              <item.icon
                className={`w-[18px] h-[18px] ${
                  isActive
                    ? "text-indigo-300"
                    : "text-slate-400 group-hover:text-slate-200"
                }`}
              />

              {/* Label */}
              <span className="truncate">{item.name}</span>
            </Link>
          );
        }))}
       
      </div>
     {/* Logout */}
<div className="p-3 border-t border-white/6">
  <button
    onClick={handleLogout}
    className="flex items-center gap-3 w-full px-3 py-2.5 rounded-md text-[13px] font-medium text-slate-400 hover:text-rose-400 hover:bg-rose-500/8 transition-all duration-150"
  >
    <LogOutIcon className="w-[17px] h-[17px]" />
    <span>Log out</span>
  </button>
</div>
    </>
  );

  return (
    <>
      {/* Hamburger */}
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-slate-900 text-white rounded-lg shadow-md border border-white/10 hover:bg-slate-800 transition"
      >
        <Menu size={20} />
      </button>

      {/* Overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col h-full w-64 bg-slate-900 text-white border-r border-white/10">
        {sidebarContent}
      </aside>

      {/* Mobile Sidebar */}
      <aside
        className={`lg:hidden fixed inset-y-0 left-0 w-72 bg-slate-900 text-white z-50 flex flex-col transform transition-transform duration-300 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {sidebarContent}
      </aside>
    </>
  );
};

export default Sidebar;