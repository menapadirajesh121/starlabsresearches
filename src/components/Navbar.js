import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { Sparkles } from "lucide-react";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/research", label: "Research" },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="sticky top-0 z-50 bg-[#16111d]/95 backdrop-blur border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 md:h-20 flex items-center justify-between">

        {/* LEFT — Logo */}
        <NavLink to="/" className="flex items-center gap-2.5 shrink-0">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#b58be8] flex items-center justify-center">
            <Sparkles size={16} strokeWidth={2.5} className="text-[#1a1224]" />
          </div>
          <span className="font-bold text-lg sm:text-xl tracking-tight text-[#b58be8]">
            AstroJourney
          </span>
        </NavLink>

        {/* RIGHT — Nav links + Connect button (desktop) */}
        <div className="hidden lg:flex items-center gap-6 xl:gap-8">
          {links.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end
              className={({ isActive }) =>
                `text-sm transition-colors ${
                  isActive
                    ? "text-[#b58be8] font-semibold"
                    : "text-gray-300 hover:text-[#b58be8]"
                }`
              }
            >
              {label}
            </NavLink>
          ))}

          <button
            onClick={() => navigate("/contact")}
            className="ml-2 bg-[#b58be8] hover:bg-[#c9a8f0] transition-colors text-[#1a1224] px-5 py-2 rounded-xl font-semibold text-sm shrink-0"
          >
            Connect
          </button>
        </div>

        {/* RIGHT — Hamburger (mobile/tablet) */}
        <button
          className="lg:hidden text-white p-1"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <FiX size={22} /> : <FiMenu size={22} />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="lg:hidden bg-[#16111d] border-t border-white/5 px-4 sm:px-6 py-5 flex flex-col gap-3">
          {links.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `py-2 text-base font-medium ${isActive ? "text-[#b58be8]" : "text-gray-300"}`
              }
            >
              {label}
            </NavLink>
          ))}
          <button
            className="mt-2 bg-[#b58be8] hover:bg-[#c9a8f0] transition-colors text-[#1a1224] px-5 py-2.5 rounded-xl font-semibold w-full"
            onClick={() => { navigate("/contact"); setOpen(false); }}
          >
            Connect
          </button>
        </div>
      )}
    </nav>
  );
}
