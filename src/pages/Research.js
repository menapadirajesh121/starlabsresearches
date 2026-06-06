import React, { useState, useRef } from "react";
import {
  FiSearch, FiDownload, FiExternalLink, FiBookOpen,
  FiFilter, FiGithub, FiFileText, FiChevronDown, FiChevronUp,
} from "react-icons/fi";
import d from "../data/researchData.json";

/* ================= HERO ================= */
function Hero({ pubRef }) {
  return (
    <section className="bg-gradient-to-br from-[#1e0d30] via-[#180b28] to-[#130920] py-14 sm:py-20 md:py-24 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <span className="bg-purple-500/20 border border-purple-500/30 px-4 py-1.5 rounded-full text-xs text-purple-300 inline-block">
          {d.hero.badge}
        </span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mt-5 leading-tight max-w-3xl">
          {d.hero.title}
          <br />
          <span className="text-orange-300 italic">{d.hero.highlight}</span>{" "}
          <span className="text-white">{d.hero.subtitle}</span>
        </h1>
        <p className="text-gray-400 mt-5 max-w-xl text-sm sm:text-base md:text-lg leading-relaxed">
          {d.hero.paragraph}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 mt-8">
          <a
            href={d.hero.paperUrl}
            target="_blank"
            rel="noreferrer"
            className="bg-purple-400 hover:bg-purple-300 transition-colors text-black px-6 py-3 rounded-xl font-medium inline-flex items-center justify-center gap-2 text-sm sm:text-base"
          >
            {d.hero.primaryBtn}
          </a>
          <button
            onClick={() => pubRef.current?.scrollIntoView({ behavior: "smooth" })}
            className="border border-white/15 hover:border-white/30 transition-colors px-6 py-3 rounded-xl text-sm sm:text-base"
          >
            {d.hero.secondaryBtn}
          </button>
        </div>
      </div>
    </section>
  );
}

/* ================= FEATURED ================= */
function Featured() {
  const f = d.featured;
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20">
      {/* section label */}
      <div className="mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold">{f.heading}</h2>
        <p className="text-gray-400 mt-1 text-sm sm:text-base">{f.subheading}</p>
        <div className="w-10 h-0.5 bg-purple-400 mt-4" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 bg-[#17131f] border border-white/5 rounded-2xl lg:rounded-3xl overflow-hidden">
        {/* content — left on desktop, bottom on mobile */}
        <div className="p-6 sm:p-8 lg:p-10 order-2 lg:order-1">
          <div className="flex gap-2 flex-wrap mb-6">
            {f.badges.map((b, i) => (
              <span key={b} className={`${i === 0 ? "bg-orange-200 text-black" : "bg-white/5 text-white"} px-3 py-1 rounded-full text-xs font-medium`}>
                {b}
              </span>
            ))}
          </div>

          <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold leading-snug">{f.title}</h3>
          <p className="text-gray-400 mt-5 leading-7 text-sm sm:text-base">{f.desc}</p>

          <div className="grid grid-cols-2 gap-6 mt-8 border-t border-white/5 pt-8">
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider">Key Collaborators</p>
              <p className="mt-2 text-sm sm:text-base font-medium">{f.collaborator.name}</p>
              <p className="text-gray-400 text-xs sm:text-sm">{f.collaborator.org}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider">Tech Stack</p>
              <div className="flex gap-1.5 mt-2 flex-wrap">
                {f.stack.map((s) => (
                  <span key={s} className="bg-white/5 border border-white/10 px-2.5 py-1 rounded-lg text-xs">{s}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mt-8">
            <a href="/preprint.pdf" download className="bg-purple-400 hover:bg-purple-300 transition-colors text-black px-5 py-2.5 rounded-xl flex items-center justify-center gap-2 text-sm font-medium">
              <FiDownload size={15} /> {f.primaryBtn}
            </a>
            <button className="border border-white/15 hover:border-white/30 transition-colors px-5 py-2.5 rounded-xl text-sm">
              {f.secondaryBtn}
            </button>
          </div>
        </div>

        {/* image — top on mobile, right on desktop */}
        <div className="order-1 lg:order-2">
          <img src={f.image} className="h-56 sm:h-72 lg:h-full w-full object-cover" alt="Featured research" />
        </div>
      </div>
    </section>
  );
}

/* ================= PROJECTS ================= */
function Projects() {
  const [activeTopic, setActiveTopic] = useState("All Projects");
  const [search, setSearch] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);

  const filtered = d.projects.filter((p) => {
    const matchTopic = activeTopic === "All Projects" || p.tags.includes(activeTopic);
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase());
    return matchTopic && matchSearch;
  });

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16 md:pb-20 lg:pb-24">
      <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-8">

        {/* SIDEBAR */}
        <div>
          {/* Mobile: collapsible filter panel */}
          <div className="lg:hidden">
            <button
              onClick={() => setFilterOpen(!filterOpen)}
              className="w-full flex items-center justify-between bg-[#17131f] border border-white/10 rounded-xl px-4 py-3 text-sm mb-3"
            >
              <span className="flex items-center gap-2"><FiFilter size={15} /> Filter & Search</span>
              {filterOpen ? <FiChevronUp size={15} /> : <FiChevronDown size={15} />}
            </button>
            {filterOpen && <SidebarContent search={search} setSearch={setSearch} activeTopic={activeTopic} setActiveTopic={setActiveTopic} />}
          </div>

          {/* Desktop: always visible */}
          <div className="hidden lg:block">
            <SidebarContent search={search} setSearch={setSearch} activeTopic={activeTopic} setActiveTopic={setActiveTopic} />
          </div>
        </div>

        {/* PROJECT GRID */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold">All Projects <span className="text-purple-300">({filtered.length})</span></h2>
              <p className="text-gray-400 mt-1 text-xs sm:text-sm">Detailed project breakdown.</p>
            </div>
            <div className="hidden sm:flex gap-4 text-sm text-gray-400">
              <button className="hover:text-white transition-colors">Sort by Date</button>
              <button className="hover:text-white transition-colors">Sort by Impact</button>
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-16 text-gray-400">
              <p className="text-lg">No projects match your search.</p>
              <button onClick={() => { setSearch(""); setActiveTopic("All Projects"); }} className="mt-4 text-purple-300 text-sm">Clear filters</button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
              {filtered.map((project, i) => (
                <div key={i} className="bg-[#17131f] rounded-2xl border border-white/5 overflow-hidden group">
                  <div className="overflow-hidden">
                    <img src={project.image} alt="" className="h-44 sm:h-48 w-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-5 sm:p-6">
                    <div className="flex gap-1.5 mb-3 flex-wrap">
                      {project.tags.map((tag) => (
                        <span key={tag} className="bg-white/5 border border-white/10 px-2.5 py-1 rounded-full text-xs">{tag}</span>
                      ))}
                    </div>
                    <h3 className="text-base sm:text-lg font-bold leading-snug">{project.title}</h3>
                    <p className="text-gray-400 mt-2 text-xs sm:text-sm leading-5">
                      Implementing advanced techniques for large-scale cosmological analysis.
                    </p>
                    <div className="flex justify-between items-center mt-5 pt-4 border-t border-white/5">
                      <span className="text-xs sm:text-sm text-gray-500">{project.author}</span>
                      <div className="flex gap-3 text-gray-400">
                        <FiGithub className="cursor-pointer hover:text-white transition-colors" />
                        <FiFileText className="cursor-pointer hover:text-white transition-colors" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </section>
  );
}

function SidebarContent({ search, setSearch, activeTopic, setActiveTopic }) {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-wider text-gray-400 mb-3">Search</p>
        <div className="relative">
          <FiSearch className="absolute left-3.5 top-3.5 text-gray-500" size={14} />
          <input
            placeholder="Keyword search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#17131f] border border-white/10 rounded-xl pl-10 pr-4 py-3 outline-none text-sm"
          />
        </div>
      </div>

      <div>
        <p className="text-xs uppercase tracking-wider text-gray-400 mb-3">Topics</p>
        <div className="space-y-1.5">
          {d.topics.map((item) => (
            <button
              key={item}
              onClick={() => setActiveTopic(item)}
              className={`w-full text-left px-4 py-2.5 rounded-xl text-sm transition-colors ${activeTopic === item ? "bg-purple-400 text-black font-medium" : "bg-[#17131f] hover:bg-white/5 text-gray-300"}`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-[#2b1840] rounded-2xl p-5">
        <FiBookOpen size={22} className="text-purple-300" />
        <h3 className="font-bold text-base mt-4">Technical CV</h3>
        <p className="text-gray-300 text-xs mt-2 leading-5">Full academic CV with skills and experience.</p>
        <a href="/cv.pdf" download className="w-full mt-4 bg-purple-300 hover:bg-purple-200 transition-colors text-black py-2.5 rounded-xl block text-center text-sm font-medium">
          Download PDF
        </a>
      </div>
    </div>
  );
}

/* ================= PUBLICATIONS ================= */
function Publications({ pubRef }) {
  return (
    <section ref={pubRef} className="border-t border-white/5 py-12 sm:py-16 md:py-20 lg:py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* left-aligned heading */}
        <div className="mb-10 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">Peer-Reviewed Publications</h2>
          <p className="text-gray-400 mt-2 text-sm sm:text-base">Published works in high-impact journals.</p>
        </div>

        <div className="space-y-4 sm:space-y-5">
          {d.publications.map((pub, i) => (
            <div key={i} className="bg-[#17131f] border border-white/5 rounded-xl sm:rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-start justify-between gap-5">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <span className="bg-white/5 border border-white/10 px-3 py-1 rounded-full text-xs">{pub.type}</span>
                  <span className="text-purple-300 text-xs">DOI: {pub.doi}</span>
                </div>
                <h3 className="text-base sm:text-lg font-semibold leading-snug">{pub.title}</h3>
              </div>
              <a
                href={`https://doi.org/${pub.doi}`}
                target="_blank"
                rel="noreferrer"
                className="border border-white/15 hover:border-purple-400 transition-colors px-4 sm:px-5 py-2.5 rounded-xl flex items-center gap-2 text-sm shrink-0 whitespace-nowrap"
              >
                <FiExternalLink size={14} /> View
              </a>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <a
            href="https://scholar.google.com"
            target="_blank"
            rel="noreferrer"
            className="border border-white/15 hover:border-purple-400 transition-colors px-7 py-3 rounded-full inline-flex items-center gap-2 text-sm sm:text-base"
          >
            Visit Google Scholar Profile <FiExternalLink size={14} />
          </a>
        </div>
      </div>
    </section>
  );
}

/* ================= PAGE ================= */
export default function Research() {
  const pubRef = useRef(null);
  return (
    <div className="bg-[#0f0c16] text-white min-h-screen">
      <Hero pubRef={pubRef} />
      <Featured />
      <Projects />
      <Publications pubRef={pubRef} />
    </div>
  );
}
