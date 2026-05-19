import { Link, NavLink, useLocation } from "react-router-dom";
import {
  faArrowRight,
  faBoxesStacked,
  faCircleQuestion,
  faGaugeHigh,
  faRightToBracket,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Header = () => {
  const { pathname } = useLocation();
  const isDashboard = pathname.startsWith("/dashboard");

  return (
    <header className={isDashboard ? "dashboard-topbar" : "public-topbar"}>
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
        <Link to="/" className="flex items-center gap-3 text-slate-950">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-950 text-white shadow-sm">
            <FontAwesomeIcon icon={faBoxesStacked} />
          </span>
          <span className="text-left">
            <span className="block text-lg font-semibold leading-5">NST Shop</span>
            <span className="hidden text-xs font-medium uppercase tracking-wide text-slate-500 sm:block">
              Inventory Suite
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 rounded-lg border border-slate-200 bg-white/80 p-1 text-sm font-medium shadow-sm md:flex">
          <NavLink
            className={({ isActive }) =>
              `rounded-md px-3 py-2 transition ${isActive ? "bg-slate-950 text-white" : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"}`
            }
            to="/dashboard"
          >
            <FontAwesomeIcon className="mr-2" icon={faGaugeHigh} />
            Dashboard
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `rounded-md px-3 py-2 transition ${isActive ? "bg-slate-950 text-white" : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"}`
            }
            to="/about"
          >
            <FontAwesomeIcon className="mr-2" icon={faCircleQuestion} />
            About
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `rounded-md px-3 py-2 transition ${isActive ? "bg-slate-950 text-white" : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"}`
            }
            to="/contact"
          >
            Contact
          </NavLink>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to="/dashboard"
            className="inline-flex items-center rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700"
          >
            <FontAwesomeIcon className="mr-2" icon={isDashboard ? faArrowRight : faRightToBracket} />
            Open App
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
