import { useParams, useNavigate } from "react-router-dom";
import {
  FiMail, FiGithub, FiLinkedin,
  FiDownload, FiFileText, FiStar, FiArrowRight, FiBriefcase,
} from "react-icons/fi";
import researchers from "../data/researchersData.json";

export default function Profile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const person = researchers.find((r) => r.id === id);

  if (!person) {
    return (
      <div className="text-white min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-2xl">Researcher not found.</p>
        <button onClick={() => navigate("/team")} className="text-[#b58be8] flex items-center gap-2">
          ← Back to Team
        </button>
      </div>
    );
  }

  return (
    <div className="text-white">

      {/* HERO */}
      <section className="bg-gradient-to-r from-[#28163b] to-[#20142c] py-14 sm:py-18 md:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button onClick={() => navigate("/team")} className="text-[#b58be8] flex items-center gap-2 mb-7 sm:mb-10 hover:opacity-80 text-sm sm:text-base">
            ← Back to Team
          </button>
          <div className="grid lg:grid-cols-[260px_1fr] xl:grid-cols-[320px_1fr] gap-10 lg:gap-16 items-center">

            <div className="relative flex justify-center lg:justify-start">
              <div className="absolute inset-0 border border-[#3d2d55] rounded-full scale-110" />
              <div className="absolute inset-0 border border-[#2f2143] rounded-full scale-[1.2]" />
              <img
                src={person.image}
                alt={person.name}
                className="w-48 h-48 sm:w-64 sm:h-64 lg:w-[280px] lg:h-[280px] rounded-full object-cover mx-auto border-4 border-[#2c213d] relative"
              />
            </div>

            <div className="mt-4 lg:mt-0">
              <span className="inline-block px-4 py-2 rounded-full bg-[#2e2140] text-xs text-purple-200">
                {person.badge}
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mt-4 sm:mt-6">{person.name}</h1>
              <h2 className="text-xl sm:text-2xl lg:text-3xl text-gray-300 mt-3 sm:mt-4">{person.title}</h2>
              <p className="text-gray-400 text-sm sm:text-base lg:text-lg mt-5 sm:mt-8 leading-7 sm:leading-9 max-w-4xl">{person.desc}</p>
              <div className="flex gap-3 sm:gap-4 mt-7 sm:mt-10 flex-wrap">
                <a href={`mailto:${person.email}`} className="bg-[#1d1727] border border-white/10 px-5 sm:px-6 py-3 sm:py-4 rounded-xl flex items-center gap-2 sm:gap-3 text-sm sm:text-base">
                  <FiMail /> Reach Out
                </a>
                <a href={`https://github.com/${person.github}`} target="_blank" rel="noreferrer" className="w-11 h-11 sm:w-14 sm:h-14 rounded-full border border-white/10 flex items-center justify-center hover:border-white/30 transition"><FiGithub /></a>
                {person.linkedin && (
                  <a href={`https://${person.linkedin}`} target="_blank" rel="noreferrer" className="w-11 h-11 sm:w-14 sm:h-14 rounded-full border border-white/10 flex items-center justify-center hover:border-white/30 transition"><FiLinkedin /></a>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-18 md:py-20 lg:py-24">
        <div className="grid lg:grid-cols-[1fr_300px] xl:grid-cols-[1fr_320px] gap-10 lg:gap-12">

          {/* LEFT */}
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold border-l-4 border-[#b58be8] pl-4">Professional Journey</h2>
            <div className="mt-7 sm:mt-10 space-y-6 sm:space-y-8 text-gray-300 leading-7 sm:leading-9 text-base sm:text-lg">
              {person.bio.map((p, i) => {
                if (p.startsWith("Core Skills")) {
                  const [label, skills] = p.split("\n\n");
                  return (
                    <div key={i}>
                      <p className="text-white font-bold text-xl sm:text-2xl mb-3">{label}</p>
                      <p>{skills}</p>
                    </div>
                  );
                }
                return <p key={i}>{p}</p>;
              })}
            </div>
            <button onClick={() => navigate("/about")} className="mt-6 sm:mt-8 text-[#b58be8] flex items-center gap-2 text-sm sm:text-base">
              Read More About My Story <FiArrowRight />
            </button>

            <div className="mt-14 sm:mt-20 lg:mt-24 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold border-l-4 border-[#b58be8] pl-4">
                {person.projects ? "Featured Projects" : "Selected Publications"}
              </h2>
              {!person.projects && (
                <a href="https://scholar.google.com" target="_blank" rel="noreferrer" className="bg-[#1d1727] border border-white/10 px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl flex items-center gap-2 text-sm shrink-0">
                  <FiFileText /> View All Papers
                </a>
              )}
            </div>

            {person.projects ? (
              <div className="mt-6 sm:mt-8">
                {person.projectsIntro && (
                  <p className="text-gray-400 text-sm sm:text-base leading-7 mb-8">{person.projectsIntro}</p>
                )}
                <div className="bg-[#17131f] border border-white/5 rounded-2xl lg:rounded-3xl overflow-hidden">
                  {person.projects.map((proj, index) => (
                    <div key={index} className={`p-5 sm:p-8 ${index !== person.projects.length - 1 ? "border-b border-white/5" : ""}`}>
                      <h3 className="text-lg sm:text-xl lg:text-2xl font-bold">{proj.emoji} {proj.title}</h3>
                      <p className="text-gray-300 mt-3 leading-7 text-sm sm:text-base">{proj.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="mt-6 sm:mt-8 bg-[#17131f] border border-white/5 rounded-2xl lg:rounded-3xl overflow-hidden">
                {person.publications.length > 0 ? person.publications.map((pub, index) => (
                  <div key={index} className={`p-5 sm:p-8 ${index !== person.publications.length - 1 ? "border-b border-white/5" : ""}`}>
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 sm:gap-6">
                      <div className="min-w-0">
                        {pub.type && <span className="text-xs uppercase tracking-widest text-[#b58be8] mb-2 block">{pub.type}</span>}
                        <h3 className="text-lg sm:text-xl lg:text-2xl font-bold leading-tight">{pub.title}</h3>
                        {pub.authors && <p className="text-xs sm:text-sm text-gray-400 mt-2">{pub.authors}</p>}
                        <div className="flex flex-wrap gap-2 sm:gap-4 mt-3 text-xs sm:text-sm text-gray-400">
                          <span>{pub.journal}</span><span>•</span><span>{pub.year}</span>
                        </div>
                        {pub.contribution && (
                          <p className="text-xs sm:text-sm text-gray-300 mt-3 sm:mt-4 leading-6"><span className="text-[#b58be8] font-medium">Contribution: </span>{pub.contribution}</p>
                        )}
                      </div>
                      <div className="flex gap-2 sm:gap-3 shrink-0">
                        <button onClick={() => navigator.clipboard?.writeText(`@article{${pub.title}}`)} className="px-3 sm:px-4 py-2 rounded-lg bg-[#211a2d] border border-white/5 text-xs sm:text-sm">BibTeX</button>
                        <a href="/preprint.pdf" download className="px-3 sm:px-4 py-2 rounded-lg bg-[#211a2d] border border-white/5 flex items-center gap-2 text-xs sm:text-sm">
                          <FiDownload /> PDF
                        </a>
                      </div>
                    </div>
                    {pub.abstract && (
                      <div className="mt-5 sm:mt-8 bg-[#23202e] rounded-xl sm:rounded-2xl p-4 sm:p-6">
                        <p className="text-xs uppercase tracking-wider text-[#b58be8]">Abstract</p>
                        <p className="text-gray-300 italic mt-3 sm:mt-4 leading-7 sm:leading-8 text-sm sm:text-base">"{pub.abstract}"</p>
                      </div>
                    )}
                  </div>
                )) : (
                  <div className="p-6 sm:p-8 text-gray-400 text-center text-sm">No publications yet.</div>
                )}
              </div>
            )}
          </div>

          {/* RIGHT SIDEBAR */}
          <div className="space-y-5 sm:space-y-8 mt-8 lg:mt-0">

            <div className="bg-[#17131f] border border-white/5 rounded-2xl lg:rounded-3xl p-5 sm:p-8">
              <h3 className="text-lg sm:text-2xl font-bold flex items-center gap-3">
                <FiStar className="text-[#b58be8]" /> Research Focus
              </h3>
              <div className="flex flex-wrap gap-2 sm:gap-3 mt-5 sm:mt-8">
                {person.focus.map((item) => (
                  <span key={item} className="bg-[#211a2d] border border-white/5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm">{item}</span>
                ))}
              </div>
            </div>

            <div className="bg-[#17131f] border border-white/5 rounded-2xl lg:rounded-3xl p-5 sm:p-8">
              <h3 className="text-lg sm:text-2xl font-bold flex items-center gap-3">
                <FiBriefcase className="text-[#b58be8]" /> Current Engagement
              </h3>
              <div className="space-y-4 sm:space-y-6 mt-5 sm:mt-8">
                {person.engagements.map((e) => (
                  <div key={e.org}>
                    <p className="font-semibold text-sm sm:text-base">{e.org}</p>
                    <p className="text-xs sm:text-sm text-gray-400 mt-1">{e.role}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#3b2057] to-[#2a173d] rounded-2xl lg:rounded-3xl p-5 sm:p-8">
              <h3 className="text-lg sm:text-2xl font-bold">Connect Directly</h3>
              <p className="text-gray-300 mt-3 sm:mt-4 leading-6 sm:leading-7 text-sm sm:text-base">Open for research collaborations, dataset sharing, or guest lectures.</p>
              <div className="space-y-3 sm:space-y-4 mt-5 sm:mt-8">
                <div className="flex items-center gap-3"><FiMail /><span className="text-xs sm:text-sm break-all">{person.email}</span></div>
                <a href={`https://github.com/${person.github}`} target="_blank" rel="noreferrer" className="flex items-center gap-3 hover:text-white transition-colors">
                  <FiGithub /><span className="text-xs sm:text-sm">github.com/{person.github}</span>
                </a>
                {person.linkedin && (
                  <a href={`https://${person.linkedin}`} target="_blank" rel="noreferrer" className="flex items-center gap-3 hover:text-white transition-colors">
                    <FiLinkedin /><span className="text-xs sm:text-sm">{person.linkedin}</span>
                  </a>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14 sm:pb-18 md:pb-20 lg:pb-24">
        <div className="rounded-[24px] sm:rounded-[32px] lg:rounded-[40px] bg-gradient-to-r from-[#44255f] to-[#5a347a] py-14 sm:py-16 lg:py-20 px-6 sm:px-10 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold">Let's Explore the Universe Together</h2>
          <p className="max-w-3xl mx-auto mt-5 sm:mt-8 text-gray-200 text-sm sm:text-base lg:text-lg leading-7 sm:leading-8">
            Always open to collaborative research projects, postdoctoral opportunities, and large-scale cosmic simulations.
          </p>
          <div className="flex justify-center gap-3 sm:gap-4 mt-8 sm:mt-10 flex-wrap">
            <button onClick={() => navigate("/contact")} className="bg-[#211a2d] px-6 sm:px-8 py-3 sm:py-4 rounded-xl text-sm sm:text-base">Collaborate with Me</button>
            <a href="/cv.pdf" download className="bg-white/20 px-6 sm:px-8 py-3 sm:py-4 rounded-xl flex items-center gap-2 text-sm sm:text-base"><FiDownload /> Download CV</a>
          </div>
        </div>
      </section>

    </div>
  );
}
