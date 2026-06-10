import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  FiSearch, FiDownload, FiExternalLink, FiBookOpen,
  FiFilter, FiGithub, FiFileText, FiChevronDown, FiChevronUp, FiRefreshCw,
} from "react-icons/fi";
import staticData from "../data/researchData.json";
import useCardAnimation from "../hooks/useCardAnimation";
import { API, warmup } from "../utils/api";

/* ─── Hero ───────────────────────────────────────────── */
function Hero({ pubRef }) {
  const h = staticData.hero;
  return (
    <section className="relative py-14 sm:py-20 md:py-24 lg:py-28 overflow-hidden">
      <img src="https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=1600&auto=format&fit=crop&q=80" alt="" className="absolute inset-0 w-full h-full object-cover pointer-events-none" aria-hidden="true"/>
      <div className="absolute inset-0 bg-[#04021a]/80 pointer-events-none"/>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <span className="bg-indigo-500/20 border border-indigo-400/30 px-4 py-1.5 rounded-full text-xs text-indigo-200 inline-block">{h.badge}</span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mt-5 leading-tight max-w-3xl">
          {h.title}<br/>
          <span className="text-violet-300 italic">{h.highlight}</span>{" "}
          <span className="text-white">{h.subtitle}</span>
        </h1>
        <p className="text-gray-400 mt-5 max-w-xl text-sm sm:text-base md:text-lg leading-relaxed">{h.paragraph}</p>
        <div className="flex flex-col sm:flex-row gap-3 mt-8">
          <a href={h.paperUrl} target="_blank" rel="noreferrer"
            className="bg-indigo-400 hover:bg-indigo-300 transition-colors text-black px-6 py-3 rounded-xl font-medium inline-flex items-center justify-center gap-2 text-sm sm:text-base">
            {h.primaryBtn}
          </a>
          <button onClick={() => pubRef.current?.scrollIntoView({ behavior: "smooth" })}
            className="border border-indigo-400/25 text-indigo-100 hover:border-indigo-400/50 transition-colors px-6 py-3 rounded-xl text-sm sm:text-base">
            {h.secondaryBtn}
          </button>
        </div>
      </div>
    </section>
  );
}

/* ─── Featured ───────────────────────────────────────── */
function Featured({ item, loading }) {
  const f   = staticData.featured;
  const ref = useCardAnimation();

  const title  = item?.title  || f.title;
  const desc   = item?.desc   || f.desc;
  const image  = item?.image  || f.image;
  const author = item?.author || f.collaborator.name;
  const stack  = item?.stack?.length ? item.stack : f.stack;

  return (
    <section ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-24">
      <div className="mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold">{f.heading}</h2>
        <p className="text-gray-400 mt-1 text-sm sm:text-base">{f.subheading}</p>
        <div className="w-10 h-0.5 bg-purple-400 mt-4"/>
      </div>
      <div className={`grid grid-cols-1 lg:grid-cols-2 bg-[#17131f] border border-white/5 rounded-2xl lg:rounded-3xl overflow-hidden card-animate card-interactive transition-opacity duration-300 ${loading ? "opacity-40 pointer-events-none" : "opacity-100"}`}>
        <div className="p-6 sm:p-8 lg:p-10 order-2 lg:order-1">
          <div className="flex gap-2 flex-wrap mb-6">
            {f.badges.map((b, i) => (
              <span key={b} className={`${i === 0 ? "bg-orange-200 text-black" : "bg-white/5 text-white"} px-3 py-1 rounded-full text-xs font-medium`}>{b}</span>
            ))}
          </div>
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold leading-snug">{title}</h3>
          <p className="text-gray-400 mt-5 leading-7 text-sm sm:text-base">{desc}</p>
          <div className="grid grid-cols-2 gap-6 mt-8 border-t border-white/5 pt-8">
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider">Key Collaborators</p>
              <p className="mt-2 text-sm sm:text-base font-medium">{author}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider">Tech Stack</p>
              <div className="flex gap-1.5 mt-2 flex-wrap">
                {stack.map(s => <span key={s} className="bg-white/5 border border-white/10 px-2.5 py-1 rounded-lg text-xs">{s}</span>)}
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 mt-8">
            <a href="/preprint.pdf" download className="bg-purple-400 hover:bg-purple-300 transition-colors text-black px-5 py-2.5 rounded-xl flex items-center justify-center gap-2 text-sm font-medium">
              <FiDownload size={15}/>{f.primaryBtn}
            </a>
            <button className="border border-white/15 hover:border-white/30 transition-colors px-5 py-2.5 rounded-xl text-sm">{f.secondaryBtn}</button>
          </div>
        </div>
        <div className="order-1 lg:order-2">
          <img src={image} className="h-56 sm:h-72 lg:h-full w-full object-cover" alt="Featured research"/>
        </div>
      </div>
    </section>
  );
}

/* ─── Sidebar ────────────────────────────────────────── */
function SidebarContent({ search, setSearch, activeTopic, setActiveTopic, topics }) {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-wider text-gray-400 mb-3">Search</p>
        <div className="relative">
          <FiSearch className="absolute left-3.5 top-3.5 text-gray-500" size={14}/>
          <input placeholder="Keyword search..." value={search} onChange={e => setSearch(e.target.value)}
            className="w-full bg-[#17131f] border border-white/10 rounded-xl pl-10 pr-4 py-3 outline-none text-sm focus:border-purple-400 transition-colors"/>
        </div>
      </div>
      <div>
        <p className="text-xs uppercase tracking-wider text-gray-400 mb-3">Topics</p>
        <div className="space-y-1.5">
          {topics.map(t => (
            <button key={t} onClick={() => setActiveTopic(t)}
              className={`w-full text-left px-4 py-2.5 rounded-xl text-sm transition-colors ${activeTopic === t ? "bg-purple-400 text-black font-medium" : "bg-[#17131f] hover:bg-white/5 text-gray-300"}`}>
              {t}
            </button>
          ))}
        </div>
      </div>
      <div className="bg-[#2b1840] rounded-2xl p-5">
        <FiBookOpen size={22} className="text-purple-300"/>
        <h3 className="font-bold text-base mt-4">Technical CV</h3>
        <p className="text-gray-300 text-xs mt-2 leading-5">Full academic CV with skills and experience.</p>
        <a href="/cv.pdf" download className="w-full mt-4 bg-purple-300 hover:bg-purple-200 transition-colors text-black py-2.5 rounded-xl block text-center text-sm font-medium">Download PDF</a>
      </div>
    </div>
  );
}

/* ─── Projects ───────────────────────────────────────── */
function Projects({ projects, topics }) {
  const [activeTopic,  setActiveTopic]  = useState("All Projects");
  const [search,       setSearch]       = useState("");
  const [filterOpen,   setFilterOpen]   = useState(false);
  const filtered = projects.filter(p => {
    const matchTopic  = activeTopic === "All Projects" || (p.tags || []).map(t => t.trim()).includes(activeTopic);
    const matchSearch = search === "" || p.title.toLowerCase().includes(search.toLowerCase());
    return matchTopic && matchSearch;
  });

  const gridRef = useCardAnimation([filtered]);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20 md:pb-24 lg:pb-28">
      <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-10">
        {/* Sidebar */}
        <div>
          <div className="lg:hidden">
            <button onClick={() => setFilterOpen(!filterOpen)} className="w-full flex items-center justify-between bg-[#17131f] border border-white/10 rounded-xl px-4 py-3 text-sm mb-3">
              <span className="flex items-center gap-2"><FiFilter size={15}/> Filter & Search</span>
              {filterOpen ? <FiChevronUp size={15}/> : <FiChevronDown size={15}/>}
            </button>
            {filterOpen && <SidebarContent search={search} setSearch={setSearch} activeTopic={activeTopic} setActiveTopic={setActiveTopic} topics={topics}/>}
          </div>
          <div className="hidden lg:block">
            <SidebarContent search={search} setSearch={setSearch} activeTopic={activeTopic} setActiveTopic={setActiveTopic} topics={topics}/>
          </div>
        </div>

        {/* Grid */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold">All Projects <span className="text-purple-300">({filtered.length})</span></h2>
              <p className="text-gray-400 mt-1 text-xs sm:text-sm">Detailed project breakdown.</p>
            </div>
          </div>
          {filtered.length === 0 ? (
            <div className="text-center py-16 text-gray-400">
              <p className="text-lg">No projects match your search.</p>
              <button onClick={() => { setSearch(""); setActiveTopic("All Projects"); }} className="mt-4 text-purple-300 text-sm">Clear filters</button>
            </div>
          ) : (
            <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
              {filtered.map((p, i) => (
                <div key={p._id || i} className="card-animate card-interactive bg-[#17131f] rounded-2xl border border-white/5 overflow-hidden group">
                  <div className="overflow-hidden">
                    <img src={p.image} alt="" className="h-44 sm:h-48 w-full object-cover group-hover:scale-105 transition-transform duration-500"/>
                  </div>
                  <div className="p-5 sm:p-6">
                    <div className="flex gap-1.5 mb-3 flex-wrap">
                      {p.tags.map(tag => <span key={tag} className="bg-white/5 border border-white/10 px-2.5 py-1 rounded-full text-xs">{tag}</span>)}
                    </div>
                    <h3 className="text-base sm:text-lg font-bold leading-snug">{p.title}</h3>
                    <p className="text-gray-400 mt-2 text-xs sm:text-sm leading-5">{p.desc || "Implementing advanced techniques for large-scale cosmological analysis."}</p>
                    <div className="flex justify-between items-center mt-5 pt-4 border-t border-white/5">
                      <span className="text-xs sm:text-sm text-gray-500">{p.author}</span>
                      <div className="flex gap-3 text-gray-400">
                        <a href={`https://github.com/${p.github || ""}`} target="_blank" rel="noreferrer">
                          <FiGithub className="hover:text-white transition-colors"/>
                        </a>
                        {p.doi && (
                          <a href={`https://doi.org/${p.doi}`} target="_blank" rel="noreferrer">
                            <FiFileText className="hover:text-white transition-colors"/>
                          </a>
                        )}
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

/* ─── Publications ───────────────────────────────────── */
function Publications({ pubRef, publications }) {
  const animRef = useCardAnimation([publications]);
  return (
    <section ref={pubRef} className="border-t border-white/5 py-16 sm:py-20 md:py-24 lg:py-28">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">Peer-Reviewed Publications</h2>
          <p className="text-gray-400 mt-2 text-sm sm:text-base">Published works in high-impact journals.</p>
        </div>
        <div ref={animRef} className="space-y-4 sm:space-y-5">
          {publications.map((pub, i) => (
            <div key={pub._id || i} className="card-animate card-interactive bg-[#17131f] border border-white/5 rounded-xl sm:rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-3 flex-wrap">
                  <span className="bg-white/5 border border-white/10 px-3 py-1 rounded-full text-xs shrink-0">{pub.type}</span>
                  {pub.doi && <span className="text-purple-300 text-xs break-all">DOI: {pub.doi}</span>}
                </div>
                <h3 className="text-base sm:text-lg font-semibold leading-snug">{pub.title}</h3>
              </div>
              {pub.doi && (
                <a href={`https://doi.org/${pub.doi}`} target="_blank" rel="noreferrer"
                  className="border border-white/15 hover:border-purple-400 transition-colors px-4 sm:px-5 py-2.5 rounded-xl flex items-center gap-2 text-sm shrink-0">
                  <FiExternalLink size={14}/> View
                </a>
              )}
            </div>
          ))}
        </div>
        <div className="mt-10">
          <a href="https://scholar.google.com" target="_blank" rel="noreferrer"
            className="border border-white/15 hover:border-purple-400 transition-colors px-7 py-3 rounded-full inline-flex items-center gap-2 text-sm sm:text-base">
            Visit Google Scholar Profile <FiExternalLink size={14}/>
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─── Page ───────────────────────────────────────────── */
export default function Research() {
  const pubRef = useRef(null);
  const [projects,     setProjects]     = useState(staticData.projects);
  const [publications, setPublications] = useState(staticData.publications);
  const [featuredItem, setFeaturedItem] = useState(null);
  const [topics,       setTopics]       = useState(staticData.topics);
  const [loading,      setLoading]      = useState(true);
  const [error,        setError]        = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      await warmup();
      const r = await fetch(`${API}/research`);
      if (!r.ok) throw new Error();
      const items = await r.json();
      if (!Array.isArray(items) || items.length === 0) throw new Error();

      const normalized = items.map(i => ({ ...i, tags: (i.tags || []).map(t => t.trim()) }));
      setFeaturedItem(normalized.find(i => i.featured) || normalized[0]);
      setPublications(normalized.filter(i => i.doi).map(i => ({ _id: i._id, title: i.title, doi: i.doi, type: i.type || "Journal Article" })));
      setTopics(["All Projects", ...new Set(normalized.flatMap(i => i.tags))]);
      setProjects(normalized);
    } catch {
      setProjects(staticData.projects);
      setPublications(staticData.publications);
      setTopics(staticData.topics);
      setFeaturedItem(null);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  return (
    <div className="bg-[#0f0c16] text-white min-h-screen">
      <Hero pubRef={pubRef}/>
      <Featured item={featuredItem} loading={loading}/>

      {error && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-4">
          <div className="flex items-center justify-between bg-amber-500/10 border border-amber-500/20 rounded-xl px-4 py-2.5">
            <p className="text-xs text-amber-400">⚠️ Backend offline — showing static data.</p>
            <button onClick={load} className="flex items-center gap-1.5 text-xs text-amber-300 hover:text-amber-200 transition-colors">
              <FiRefreshCw size={11}/> Retry
            </button>
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-24">
          <span className="w-8 h-8 border-2 border-purple-400/30 border-t-purple-400 rounded-full animate-spin"/>
        </div>
      ) : (
        <Projects projects={projects} topics={topics}/>
      )}

      <Publications pubRef={pubRef} publications={publications}/>
    </div>
  );
}
