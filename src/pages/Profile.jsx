import { useParams, useNavigate } from "react-router-dom";
import {
  FiMail, FiGithub, FiLinkedin, FiTwitter,
  FiDownload, FiFileText, FiStar, FiArrowRight, FiBriefcase,
} from "react-icons/fi";
import researchers from "../data/researchersData";

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
      <section className="bg-gradient-to-r from-[#28163b] to-[#20142c] py-24">
        <div className="max-w-7xl mx-auto px-6">
          <button onClick={() => navigate("/team")} className="text-[#b58be8] flex items-center gap-2 mb-10 hover:opacity-80">
            ← Back to Team
          </button>
          <div className="grid lg:grid-cols-[320px_1fr] gap-16 items-center">

            <div className="relative">
              <div className="absolute inset-0 border border-[#3d2d55] rounded-full scale-110" />
              <div className="absolute inset-0 border border-[#2f2143] rounded-full scale-[1.2]" />
              <img
                src={person.image}
                alt={person.name}
                className="w-[280px] h-[280px] rounded-full object-cover mx-auto border-4 border-[#2c213d]"
              />
            </div>

            <div>
              <span className="inline-block px-4 py-2 rounded-full bg-[#2e2140] text-xs text-purple-200">
                {person.badge}
              </span>
              <h1 className="text-6xl font-bold mt-6">{person.name}</h1>
              <h2 className="text-3xl text-gray-300 mt-4">{person.title}</h2>
              <p className="text-gray-400 text-lg mt-8 leading-9 max-w-4xl">{person.desc}</p>
              <div className="flex gap-4 mt-10 flex-wrap">
                <a href={`mailto:${person.email}`} className="bg-[#1d1727] border border-white/10 px-6 py-4 rounded-xl flex items-center gap-3">
                  <FiMail /> Reach Out
                </a>
                <a href={`https://github.com/${person.github}`} target="_blank" rel="noreferrer" className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center"><FiGithub /></a>
                <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center"><FiLinkedin /></a>
                <a href={`https://twitter.com/${person.twitter}`} target="_blank" rel="noreferrer" className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center"><FiTwitter /></a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid lg:grid-cols-[1fr_320px] gap-12">

          {/* LEFT */}
          <div>
            <h2 className="text-5xl font-bold border-l-4 border-[#b58be8] pl-4">Academic Journey</h2>
            <div className="mt-10 space-y-8 text-gray-300 leading-9 text-lg">
              {person.bio.map((p, i) => <p key={i}>{p}</p>)}
            </div>
            <button onClick={() => navigate("/about")} className="mt-8 text-[#b58be8] flex items-center gap-2">
              Read More About My Story <FiArrowRight />
            </button>

            <div className="mt-24 flex items-center justify-between">
              <h2 className="text-5xl font-bold border-l-4 border-[#b58be8] pl-4">Selected Publications</h2>
              <a href="https://scholar.google.com" target="_blank" rel="noreferrer" className="bg-[#1d1727] border border-white/10 px-5 py-3 rounded-xl flex items-center gap-2">
                <FiFileText /> View All Papers
              </a>
            </div>

            <div className="mt-8 bg-[#17131f] border border-white/5 rounded-3xl overflow-hidden">
              {person.publications.map((pub, index) => (
                <div key={index} className={`p-8 ${index !== person.publications.length - 1 ? "border-b border-white/5" : ""}`}>
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                    <div>
                      <h3 className="text-2xl font-bold leading-tight">{pub.title}</h3>
                      <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-400">
                        <span>{pub.journal}</span><span>•</span><span>{pub.year}</span>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <button onClick={() => navigator.clipboard?.writeText(`@article{${pub.title}}`)} className="px-4 py-2 rounded-lg bg-[#211a2d] border border-white/5">BibTeX</button>
                      <a href="/preprint.pdf" download className="px-4 py-2 rounded-lg bg-[#211a2d] border border-white/5 flex items-center gap-2">
                        <FiDownload /> PDF
                      </a>
                    </div>
                  </div>

                  {index === 0 && pub.abstract && (
                    <div className="mt-8 bg-[#23202e] rounded-2xl p-6">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-xs uppercase tracking-wider text-[#b58be8]">Abstract</p>
                          <p className="text-gray-300 italic mt-4 leading-8">"{pub.abstract}"</p>
                        </div>
                        <span className="text-6xl text-gray-600">"</span>
                      </div>
                    </div>
                  )}

                  {pub.abstract && (
                    <button onClick={() => document.getElementById(`abstract-${index}`)?.scrollIntoView({ behavior: "smooth" })} className="mt-6 text-[#b58be8] text-sm flex items-center gap-2">
                      View Abstract <FiArrowRight size={14} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT SIDEBAR */}
          <div className="space-y-8">

            <div className="bg-[#17131f] border border-white/5 rounded-3xl p-8">
              <h3 className="text-2xl font-bold flex items-center gap-3">
                <FiStar className="text-[#b58be8]" /> Research Focus
              </h3>
              <div className="flex flex-wrap gap-3 mt-8">
                {person.focus.map((item) => (
                  <span key={item} className="bg-[#211a2d] border border-white/5 px-4 py-2 rounded-lg text-sm">{item}</span>
                ))}
              </div>
            </div>

            <div className="bg-[#17131f] border border-white/5 rounded-3xl p-8">
              <h3 className="text-2xl font-bold flex items-center gap-3">
                <FiBriefcase className="text-[#b58be8]" /> Current Engagement
              </h3>
              <div className="space-y-6 mt-8">
                {person.engagements.map((e) => (
                  <div key={e.org}>
                    <p className="font-semibold">{e.org}</p>
                    <p className="text-sm text-gray-400 mt-1">{e.role}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#3b2057] to-[#2a173d] rounded-3xl p-8">
              <h3 className="text-2xl font-bold">Connect Directly</h3>
              <p className="text-gray-300 mt-4 leading-7">Open for research collaborations, dataset sharing, or guest lectures.</p>
              <div className="space-y-4 mt-8">
                <div className="flex items-center gap-3"><FiMail /><span>{person.email}</span></div>
                <div className="flex items-center gap-3"><FiTwitter /><span>{person.twitter}</span></div>
                <div className="flex items-center gap-3"><FiGithub /><span>{person.github}</span></div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="rounded-[40px] bg-gradient-to-r from-[#44255f] to-[#5a347a] py-20 px-10 text-center">
          <h2 className="text-5xl font-bold">Let's Explore the Universe Together</h2>
          <p className="max-w-3xl mx-auto mt-8 text-gray-200 text-lg leading-8">
            Always open to collaborative research projects, postdoctoral opportunities, and large-scale cosmic simulations.
          </p>
          <div className="flex justify-center gap-4 mt-10 flex-wrap">
            <button onClick={() => navigate("/contact")} className="bg-[#211a2d] px-8 py-4 rounded-xl">Collaborate with Me</button>
            <a href="/cv.pdf" download className="bg-white/20 px-8 py-4 rounded-xl flex items-center gap-2"><FiDownload /> Download CV</a>
          </div>
        </div>
      </section>

    </div>
  );
}
