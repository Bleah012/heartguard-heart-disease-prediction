import {
  ClipboardPlus,
  FileText,
  HeartPulse,
  History,
  LayoutDashboard,
  LogOut,
  UserRound,
} from "lucide-react";
import { NavLink, Outlet } from "react-router-dom";

const navigation = [
  { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { label: "New Prediction", path: "/predict", icon: ClipboardPlus },
  { label: "History", path: "/history", icon: History },
  { label: "Reports", path: "/reports", icon: FileText },
  { label: "Profile", path: "/profile", icon: UserRound },
];

function navLinkClass({ isActive }: { isActive: boolean }) {
  return [
    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition",
    isActive
      ? "bg-rose-50 text-rose-700"
      : "text-slate-600 hover:bg-slate-100 hover:text-slate-950",
  ].join(" ");
}

export function AppLayout() {
  return (
    <div className="min-h-screen bg-[#f7faf9] text-slate-950 lg:grid lg:grid-cols-[280px_1fr]">
      <aside className="border-b border-slate-200 bg-white lg:min-h-screen lg:border-b-0 lg:border-r">
        <div className="flex h-full flex-col gap-6 p-4 lg:p-6">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-md bg-rose-600 text-white">
              <HeartPulse size={22} />
            </div>
            <div>
              <p className="text-base font-bold">HeartGuard</p>
              <p className="text-xs text-slate-500">Prediction System</p>
            </div>
          </div>

          <nav className="flex gap-2 overflow-x-auto lg:flex-col lg:overflow-visible">
            {navigation.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={navLinkClass}
                >
                  <Icon size={18} />
                  <span className="whitespace-nowrap">{item.label}</span>
                </NavLink>
              );
            })}
          </nav>

          <button className="mt-auto hidden items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-950 lg:flex">
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      <main className="min-w-0 p-4 sm:p-6 lg:p-8">
        <Outlet />
      </main>
    </div>
  );
}
