import { useNavigate } from "react-router-dom";
import { FiGithub, FiLinkedin } from "react-icons/fi";
import logo from "../images/starlabs_logo.png";
import d from "../data/aboutData.json";

export default function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="bg-[#16111d] border-t border-white/5 py-12 sm:py-14 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 items-start">
        {/* BRAND */}
        <div className="sm:col-span-2 lg:col-span-1 space-y-4">
          <img src={logo} alt="StarLabs" className="w-32" style={{ height: "auto" }} />
          <p className="text-gray-400 text-sm leading-7">
            {d.footer.brand.desc}
          </p>
          <div className="flex gap-4 text-lg text-gray-400">
            <a href=" https://github.com/spaceyg-blip" target="_blank" rel="noreferrer" className="hover:text-white transition-colors"><FiGithub /></a>
            <a href="www.linkedin.com/in/grace-bhavani" target="_blank" rel="noreferrer" className="hover:text-white transition-colors"><FiLinkedin /></a>
          </div>
        </div>

        {/* NAVIGATION */}
        <div className="space-y-4">
          <h4 className="text-white font-semibold text-sm uppercase tracking-widest">Navigation</h4>
          <div className="space-y-3 text-gray-400 text-sm">
            {d.footer.navigation.map((item) => (
              <p
                key={item}
                className="cursor-pointer hover:text-white transition-colors"
                onClick={() => navigate(item === "Home" ? "/" : `/${item.toLowerCase()}`)}
              >
                {item}
              </p>
            ))}
          </div>
        </div>

        {/* RESOURCES */}
        <div className="space-y-4">
          <h4 className="text-white font-semibold text-sm uppercase tracking-widest">Resources</h4>
          <div className="space-y-3 text-gray-400 text-sm">
            {d.footer.resources.map((item) => (
              <button key={item} className="block hover:text-white transition-colors">{item}</button>
            ))}
          </div>
        </div>

        {/* NEWSLETTER */}
        <div className="space-y-4">
          <h4 className="text-white font-semibold text-sm uppercase tracking-widest">Stay Updated</h4>
          <p className="text-gray-400 text-sm mb-4 leading-6">Get the latest research and discoveries from Star Labs.</p>
          <div className="flex flex-col gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2.5 rounded-full bg-[#211a2d] border border-white/10 text-sm text-white placeholder-gray-500 outline-none focus:border-purple-500/50"
            />
            <button className="w-full px-6 py-2.5 rounded-full bg-purple-500 hover:bg-purple-400 transition-colors text-sm font-medium text-white">
              Subscribe
            </button>
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-white/5 mt-12 pt-8 flex flex-col md:flex-row justify-center items-center gap-2 text-sm text-gray-500">
        <p>{d.footer.copyright}</p>
      </div>

    </footer>
  );
}
