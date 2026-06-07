import React, { useState, useMemo, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiSearch, FiClock, FiCalendar, FiChevronRight,
  FiChevronLeft, FiMail, FiArrowRight, FiFilter, FiX,
} from "react-icons/fi";
import staticData from "../data/blogData.json";
import { API, warmup } from "../utils/api";
const POSTS_PER_PAGE = 3;

function isValidEmail(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()); }

/* ─── Hero ───────────────────────────────────────────── */
function Hero() {
  const h = staticData.hero;
  return (
    <section className="relative py-14 sm:py-20 md:py-24 overflow-hidden">
      <img src="https://images.unsplash.com/photo-1456518563096-0ff5ee08204e?w=1600&auto=format&fit=crop&q=80" alt="" className="absolute inset-0 w-full h-full object-cover pointer-events-none" aria-hidden="true"/>
      <div className="absolute inset-0 bg-[#120a02]/82 pointer-events-none"/>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <span className="inline-block px-4 py-1.5 rounded-full border border-amber-400/30 bg-amber-500/10 text-xs sm:text-sm text-amber-200 mb-5">{h.badge}</span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight max-w-3xl">
          {h.title} <span className="text-amber-300">{h.highlight}</span>
        </h1>
        <p className="max-w-xl text-gray-300 text-sm sm:text-base md:text-lg mt-5 leading-7">{h.paragraph}</p>
      </div>
    </section>
  );
}

/* ─── Newsletter ─────────────────────────────────────── */
function NewsletterBox() {
  const n = staticData.newsletter;
  const [email, setEmail]     = useState("");
  const [error, setError]     = useState("");
  const [busy,  setBusy]      = useState(false);
  const [done,  setDone]      = useState(false);

  async function subscribe() {
    const v = email.trim();
    if (!v)               return setError("Email is required.");
    if (!isValidEmail(v)) return setError("Enter a valid email address.");
    setBusy(true);
    await new Promise(r => setTimeout(r, 800));
    setBusy(false); setDone(true);
  }

  return (
    <div className="bg-gradient-to-br from-[#321b49] to-[#281540] rounded-2xl p-6 border border-purple-500/20">
      <div className="w-11 h-11 rounded-full bg-purple-500/20 flex items-center justify-center mb-4">
        <FiMail size={20} className="text-purple-300"/>
      </div>
      <h3 className="text-lg font-bold">{n.title}</h3>
      <p className="text-gray-400 mt-2 text-sm leading-5">{n.desc}</p>
      {done ? (
        <p className="text-purple-300 mt-4 font-medium text-sm">{n.successMsg}</p>
      ) : (
        <div className="mt-4">
          <input type="email" placeholder={n.placeholder} value={email}
            onChange={e => { setEmail(e.target.value); setError(""); }}
            onKeyDown={e => e.key === "Enter" && subscribe()} disabled={busy} maxLength={254}
            className={`w-full rounded-xl bg-white/10 px-4 py-2.5 outline-none text-sm ${error ? "border border-red-400" : "border border-white/10 focus:border-purple-400"} transition-colors`}
          />
          {error && <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1"><FiX size={11}/>{error}</p>}
          <button onClick={subscribe} disabled={busy}
            className="w-full mt-3 bg-purple-400 hover:bg-purple-300 disabled:opacity-60 transition-colors text-black py-2.5 rounded-xl font-medium text-sm flex items-center justify-center gap-2">
            {busy ? <><span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin"/>Subscribing…</> : n.btn}
          </button>
        </div>
      )}
    </div>
  );
}

/* ─── Sidebar ────────────────────────────────────────── */
function Sidebar({ activeCategory, setActiveCategory, search, setSearch, setPage, categories }) {
  return (
    <aside className="space-y-8" aria-label="Blog filters">
      {/* Search */}
      <div>
        <label htmlFor="blog-search" className="uppercase tracking-wider text-xs text-gray-400 mb-3 block">Search</label>
        <div className="relative">
          <FiSearch className="absolute left-3.5 top-3.5 text-gray-500 pointer-events-none" size={14}/>
          <input id="blog-search" type="search" placeholder="Keywords, topics…" value={search} maxLength={100} autoComplete="off" spellCheck={false}
            onChange={e => { if (e.target.value.length <= 100) { setSearch(e.target.value); setPage(1); } }}
            className="w-full bg-[#17131f] border border-white/10 focus:border-purple-400 rounded-xl py-3 pl-10 pr-9 outline-none text-sm transition-colors"
          />
          {search && (
            <button onClick={() => { setSearch(""); setPage(1); }} className="absolute right-3.5 top-3.5 text-gray-500 hover:text-white transition-colors">
              <FiX size={14}/>
            </button>
          )}
        </div>
      </div>

      {/* Categories */}
      <div>
        <h4 className="uppercase tracking-wider text-xs text-gray-400 mb-3">Categories</h4>
        <div className="space-y-1.5">
          {categories.map(cat => (
            <button key={cat.name} onClick={() => { setActiveCategory(cat.name); setPage(1); }}
              className={`w-full flex justify-between items-center px-4 py-2.5 rounded-xl text-sm transition-colors ${activeCategory === cat.name ? "bg-purple-300 text-black font-medium" : "hover:bg-white/5 text-gray-300"}`}>
              <span>{cat.name}</span>
              <span className={`text-xs px-2 py-0.5 rounded-full ${activeCategory === cat.name ? "bg-black/20" : "bg-white/5"}`}>{cat.count}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Popular Tags */}
      <div>
        <h4 className="uppercase tracking-wider text-xs text-gray-400 mb-3">Popular Tags</h4>
        <div className="flex flex-wrap gap-2">
          {staticData.popularTags.map(tag => (
            <button key={tag} onClick={() => { setSearch(tag.replace("#", "")); setPage(1); }}
              className="px-3 py-1.5 rounded-lg bg-[#17131f] border border-white/5 text-xs hover:border-purple-400 hover:text-purple-300 transition-colors">
              {tag}
            </button>
          ))}
        </div>
      </div>

      <NewsletterBox/>
    </aside>
  );
}

/* ─── Post Card ──────────────────────────────────────── */
function PostCard({ post }) {
  const navigate = useNavigate();
  const [imgErr, setImgErr] = useState(false);

  return (
    <article className="flex flex-col sm:flex-row bg-[#17131f] border border-white/5 rounded-2xl overflow-hidden group" aria-label={post.title}>
      <div className="sm:w-56 lg:w-64 shrink-0 overflow-hidden bg-[#211a2d] min-h-[180px] sm:min-h-0">
        {imgErr ? (
          <div className="w-full h-48 sm:h-full flex items-center justify-center text-gray-600 text-xs">No image</div>
        ) : (
          <img src={post.image} alt={post.title} onError={() => setImgErr(true)} loading="lazy"
            className="w-full h-48 sm:h-full object-cover group-hover:scale-105 transition-transform duration-500"/>
        )}
      </div>
      <div className="p-5 sm:p-6 flex flex-col min-w-0">
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          <span className="px-3 py-1 rounded-full bg-purple-300 text-black text-xs font-medium shrink-0">{post.category}</span>
          <span className="flex items-center gap-1.5 text-xs text-gray-400"><FiCalendar size={11}/><time dateTime={post.date}>{post.date}</time></span>
          <span className="flex items-center gap-1.5 text-xs text-gray-400"><FiClock size={11}/>{post.readTime}</span>
        </div>
        <h3 className="text-lg sm:text-xl font-bold mt-4 leading-snug">{post.title}</h3>
        <p className="text-gray-400 mt-3 text-sm leading-6 flex-1 line-clamp-3">{post.excerpt}</p>
        <div className="flex items-center justify-between mt-5 pt-4 border-t border-white/5">
          <div className="flex gap-2 flex-wrap">
            {post.tags.slice(0, 2).map(tag => <span key={tag} className="text-xs text-gray-500">#{tag}</span>)}
          </div>
          <button onClick={() => navigate(`/blog/${post.slug}`)}
            className="flex items-center gap-1.5 text-purple-300 text-sm font-medium hover:gap-2.5 transition-all shrink-0 ml-3">
            Read <FiArrowRight size={13}/>
          </button>
        </div>
      </div>
    </article>
  );
}

/* ─── Post List ──────────────────────────────────────── */
function PostList({ posts, page, setPage, activeCategory, onClearFilters }) {
  const totalPages  = Math.max(1, Math.ceil(posts.length / POSTS_PER_PAGE));
  const currentPage = Math.min(page, totalPages);
  const paginated   = posts.slice((currentPage - 1) * POSTS_PER_PAGE, currentPage * POSTS_PER_PAGE);
  const topRef      = useRef(null);
  const didPage     = useRef(false);

  useEffect(() => {
    if (!didPage.current) return;
    didPage.current = false;
    if (topRef.current) window.scrollTo({ top: topRef.current.getBoundingClientRect().top + window.scrollY - 90, behavior: "smooth" });
  }, [page]);

  const pageNums = useMemo(() => {
    if (totalPages <= 5) return Array.from({ length: totalPages }, (_, i) => i + 1);
    if (currentPage <= 3) return [1, 2, 3, 4, 5];
    if (currentPage >= totalPages - 2) return [totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    return [currentPage - 2, currentPage - 1, currentPage, currentPage + 1, currentPage + 2];
  }, [totalPages, currentPage]);

  function go(n) { didPage.current = true; setPage(n); }

  return (
    <div ref={topRef}>
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <h2 className="text-xl sm:text-2xl font-bold">Latest Explorations</h2>
          <span className="px-2.5 py-1 bg-purple-500/10 border border-purple-500/20 rounded-full text-xs text-purple-300">{activeCategory}</span>
        </div>
        <span className="text-xs sm:text-sm text-gray-400">{posts.length} post{posts.length !== 1 ? "s" : ""}</span>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-16 border border-white/5 rounded-2xl bg-[#17131f]">
          <p className="text-4xl mb-4">🔭</p>
          <p className="text-gray-300 font-medium">No posts found</p>
          <p className="text-gray-500 text-sm mt-2">Try different keywords or a different category.</p>
          <button onClick={onClearFilters} className="mt-5 px-5 py-2 rounded-full border border-white/10 hover:border-purple-400 text-sm transition-colors">Clear filters</button>
        </div>
      ) : (
        <>
          <div className="space-y-5">{paginated.map(p => <PostCard key={p._id || p.id} post={p}/>)}</div>
          {totalPages > 1 && (
            <nav className="flex items-center justify-between mt-12 pt-8 border-t border-white/5">
              <button onClick={() => go(Math.max(1, currentPage - 1))} disabled={currentPage === 1}
                className="flex items-center gap-2 text-sm text-gray-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
                <FiChevronLeft size={16}/> Newer
              </button>
              <div className="flex gap-2">
                {pageNums.map(n => (
                  <button key={n} onClick={() => go(n)}
                    className={`w-9 h-9 rounded-lg text-sm font-medium transition-colors ${currentPage === n ? "bg-purple-300 text-black" : "border border-white/10 hover:border-white/30"}`}>
                    {n}
                  </button>
                ))}
              </div>
              <button onClick={() => go(Math.min(totalPages, currentPage + 1))} disabled={currentPage === totalPages}
                className="flex items-center gap-2 text-sm border border-white/10 hover:border-white/30 disabled:opacity-30 disabled:cursor-not-allowed transition-colors px-4 py-2 rounded-xl">
                Older <FiChevronRight size={16}/>
              </button>
            </nav>
          )}
        </>
      )}
    </div>
  );
}

/* ─── Page ───────────────────────────────────────────── */
export default function Blog() {
  const [allPosts,      setAllPosts]      = useState([]);
  const [activeCategory, setActiveCategory] = useState("All Topics");
  const [search,        setSearch]        = useState("");
  const [page,          setPage]          = useState(1);
  const [showSidebar,   setShowSidebar]   = useState(false);
  const [loading,       setLoading]       = useState(true);
  const [error,         setError]         = useState(false);

  const load = useCallback(async () => {
    setLoading(true); setError(false);
    try {
      await warmup();
      const r = await fetch(`${API}/blogs?limit=200`);
      if (!r.ok) throw new Error();
      const d = await r.json();
      setAllPosts(d.posts || []);
    } catch {
      setAllPosts(staticData.posts);
      setError(true);
    } finally { setLoading(false); }
  }, []);

  useEffect(() => { load(); }, [load]);

  // Build live categories from fetched posts
  const categories = useMemo(() => {
    const counts = {};
    allPosts.forEach(p => { counts[p.category] = (counts[p.category] || 0) + 1; });
    return [
      { name: "All Topics", count: allPosts.length },
      ...Object.entries(counts).map(([name, count]) => ({ name, count })),
    ];
  }, [allPosts]);

  // Filter posts
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return allPosts.filter(p => {
      const matchCat    = activeCategory === "All Topics" || p.category === activeCategory;
      const matchSearch = !q || p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q) || p.tags.some(t => t.toLowerCase().includes(q));
      return matchCat && matchSearch;
    });
  }, [allPosts, activeCategory, search]);

  function clearFilters() { setSearch(""); setActiveCategory("All Topics"); setPage(1); }

  return (
    <div className="bg-[#0f0c16] text-white min-h-screen">
      <Hero/>
      {error && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
          <p className="text-xs text-amber-400 bg-amber-500/10 border border-amber-500/20 rounded-xl px-4 py-2.5">
            ⚠️ Backend offline — showing static data. Start the backend on port 5000 for live data.
          </p>
        </div>
      )}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 md:py-16 lg:py-20">
        <button onClick={() => setShowSidebar(!showSidebar)} className="lg:hidden flex items-center gap-2 mb-6 border border-white/10 hover:border-white/25 transition-colors px-4 py-2.5 rounded-xl text-sm">
          <FiFilter size={14}/> {showSidebar ? "Hide Filters" : "Filters & Search"}
        </button>
        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-8 lg:gap-12">
          <div className={`${showSidebar ? "block" : "hidden"} lg:block`}>
            <Sidebar activeCategory={activeCategory} setActiveCategory={v => { setActiveCategory(v); setPage(1); }}
              search={search} setSearch={v => { setSearch(v); setPage(1); }} setPage={setPage} categories={categories}/>
          </div>
          {loading ? (
            <div className="flex items-center justify-center py-24">
              <span className="w-8 h-8 border-2 border-purple-400/30 border-t-purple-400 rounded-full animate-spin"/>
            </div>
          ) : (
            <PostList posts={filtered} page={page} setPage={setPage} activeCategory={activeCategory} onClearFilters={clearFilters}/>
          )}
        </div>
      </section>
    </div>
  );
}
