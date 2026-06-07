import { useNavigate } from "react-router-dom";
import { FiTwitter, FiGithub, FiLinkedin, FiMapPin } from "react-icons/fi";
import logo from "../images/starlabs_logo.png";
import d from "../data/aboutData.json";

export default function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="bg-[#16111d] py-20">

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12">

        {/* BRAND */}
        <div>
          <img src={logo} alt="StarLabs" className="w-40" style={{ height: "auto" }} />
          <p className="text-gray-400 mt-6 leading-8">
            {d.footer.brand.desc}
          </p>
          <div className="flex gap-4 mt-6 text-xl text-gray-400">
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors"><FiTwitter /></a>
            <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors"><FiGithub /></a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors"><FiLinkedin /></a>
          </div>
        </div>

        {/* NAVIGATION */}
        <div>
          <h4 className="font-semibold mb-5">Navigation</h4>
          <div className="space-y-3 text-gray-400">
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
        <div>
          <h4 className="font-semibold mb-5">Resources</h4>
          <div className="space-y-3 text-gray-400">
            {d.footer.resources.map((item) => (
              <button key={item} className="block hover:text-white transition-colors">{item}</button>
            ))}
          </div>
        </div>

        {/* AFFILIATION */}
        <div>
          <h4 className="font-semibold mb-5">Institutional Affiliation</h4>
          <div className="space-y-3 text-gray-400">
            <p className="flex items-center gap-2">
              <FiMapPin />
              {d.footer.affiliation.dept}
            </p>
            <p>{d.footer.affiliation.university}</p>
            <p>{d.footer.affiliation.location}</p>
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto px-6 border-t border-white/5 mt-14 pt-8 flex flex-col md:flex-row justify-between text-sm text-gray-500">
        <p>{d.footer.copyright}</p>
        <p>{d.footer.seo}</p>
      </div>

    </footer>
  );
}
