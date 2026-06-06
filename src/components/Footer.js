import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0d0a14] border-t border-white/10 py-12 sm:py-14 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10">

        <div className="col-span-2 sm:col-span-2 md:col-span-1">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-[#b58be8] flex items-center justify-center">
              <Sparkles size={20} strokeWidth={2.5} className="text-[#1a1224]" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[#b58be8]">AstroJourney</h3>
          </div>
          <p className="text-gray-400 text-sm mt-3 leading-6 max-w-xs">
            Research Student exploring the cosmos through computation and observation.
          </p>
        </div>

        <div>
          <h4 className="font-semibold text-white mb-4 text-sm sm:text-base">Navigation</h4>
          <div className="space-y-2 sm:space-y-3">
            {["/", "/about", "/research", "/blog", "/contact"].map((to, i) => (
              <Link
                key={to}
                to={to}
                className="block text-gray-400 hover:text-purple-300 transition-colors text-sm"
              >
                {["Home", "About", "Research", "Blog", "Contact"][i]}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-white mb-4 text-sm sm:text-base">Resources</h4>
          <div className="space-y-2 sm:space-y-3">
            {["Google Scholar", "ORCID", "Arxiv", "GitHub"].map((item) => (
              <button key={item} type="button" className="block text-gray-400 hover:text-purple-300 transition-colors text-sm text-left">
                {item}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-white mb-4 text-sm sm:text-base">Institution</h4>
          <p className="text-gray-400 text-sm leading-6">
            Department of Physics & Astronomy
            <br />Global Space University
            <br />Stardust City, SC 90210
          </p>
        </div>

      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 pt-6 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-3">
        <p className="text-gray-500 text-xs sm:text-sm">© 2024 AstroJourney. All rights reserved.</p>
        <p className="text-gray-500 text-xs sm:text-sm">Built with ❤️ for the cosmos</p>
      </div>
    </footer>
  );
}
