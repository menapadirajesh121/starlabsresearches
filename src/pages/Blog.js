import React, { useState, useMemo } from "react";
import {
  FiSearch, FiClock, FiCalendar, FiChevronRight,
  FiChevronLeft, FiMail, FiArrowRight, FiFilter, FiX,
} from "react-icons/fi";
import d from "../data/blogData.json";

const POSTS_PER_PAGE = 4;

/* ─── helpers ─────────────────────────────────────────── */
function isValidEmail(v) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
}

/* ================= HERO ================= */
function Hero() {
  return (
    <section className="bg-gradient-to-br from-[#2b173e] via-[#221232] to-[#1a0d28] py-14 sm:py-20 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <span className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs sm:text-sm text-purple-200 mb-5">
          {d.hero.badge}
        </span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight max-w-3xl">
          {d.hero.title}{" "}
          <span className="text-purple-300">{d.hero.highlight}</span>
        </h1>
        <p className="max-w-xl text-gray-300 text-sm sm:text-base md:text-lg mt-5 leading-7">
          {d.hero.paragraph}
        </p>
      </div>
    </section>
  );
}

/* ================= NEWSLETTER BOX ================= */
function NewsletterBox() {
  const [email, setEmail]       = useState("");
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  function validate() {
    const v = email.trim();
    if (!v)              return "Email is required.";
    if (v.length > 254)  return "Email address is too long.";
    if (!isValidEmail(v)) return "Enter a valid email address.";
    return "";
  }

  async function handleSubscribe() {
    const err = validate();
    if (err) { setError(err); return; }

    setLoading(true);
    // Simulated async submit — replace with real API call
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    setSubscribed(true);
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") handleSubscribe();
  }

  function handleChange(e) {
    setEmail(e.target.value);
    if (error) setError(""); // clear error on typing
  }

  return (
    <div className="bg-gradient-to-br from-[#321b49] to-[#281540] rounded-2xl p-6 border border-purple-500/20">
      <div className="w-11 h-11 rounded-full bg-purple-500/20 flex items-center justify-center mb-4">
        <FiMail size={20} className="text-purple-300" />
      </div>
      <h3 className="text-lg font-bold">{d.newsletter.title}</h3>
      <p className="text-gray-400 mt-2 text-sm leading-5">{d.newsletter.desc}</p>

      {subscribed ? (
        <p className="text-purple-300 mt-4 font-medium text-sm">{d.newsletter.successMsg}</p>
      ) : (
        <div className="mt-4">
          <label htmlFor="newsletter-email" className="sr-only">Email address</label>
          <input
            id="newsletter-email"
            type="email"
            placeholder={d.newsletter.placeholder}
            value={email}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            disabled={loading}
            maxLength={254}
            autoComplete="email"
            aria-invalid={!!error}
            aria-describedby={error ? "newsletter-error" : undefined}
            className={`w-full rounded-xl bg-white/10 px-4 py-2.5 outline-none text-sm disabled:opacity-60
              ${error ? "border border-red-400" : "border border-white/10 focus:border-purple-400"} transition-colors`}
          />
          {error && (
            <p id="newsletter-error" role="alert" className="text-red-400 text-xs mt-1.5 flex items-center gap-1">
              <FiX size={11} /> {error}
            </p>
          )}
          <button
            onClick={handleSubscribe}
            disabled={loading}
            className="w-full mt-3 bg-purple-400 hover:bg-purple-300 disabled:opacity-60 disabled:cursor-not-allowed transition-colors text-black py-2.5 rounded-xl font-medium text-sm flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                Subscribing…
              </>
            ) : d.newsletter.btn}
          </button>
        </div>
      )}
    </div>
  );
}

/* ================= SIDEBAR ================= */
function Sidebar({ activeCategory, setActiveCategory, search, setSearch, setPage }) {

  function handleSearchChange(e) {
    const val = e.target.value;
    // prevent pasting huge strings
    if (val.length > 100) return;
    setSearch(val);
    setPage(1);
  }

  function clearSearch() {
    setSearch("");
    setPage(1);
  }

  return (
    <aside className="space-y-8" aria-label="Blog filters">

      {/* Search */}
      <div>
        <label htmlFor="blog-search" className="uppercase tracking-wider text-xs text-gray-400 mb-3 block">
          Search
        </label>
        <div className="relative">
          <FiSearch className="absolute left-3.5 top-3.5 text-gray-500 pointer-events-none" size={14} />
          <input
            id="blog-search"
            type="search"
            placeholder="Keywords, topics…"
            value={search}
            onChange={handleSearchChange}
            maxLength={100}
            autoComplete="off"
            spellCheck={false}
            className="w-full bg-[#17131f] border border-white/10 focus:border-purple-400 rounded-xl py-3 pl-10 pr-9 outline-none text-sm transition-colors"
          />
          {search && (
            <button
              onClick={clearSearch}
              aria-label="Clear search"
              className="absolute right-3.5 top-3.5 text-gray-500 hover:text-white transition-colors"
            >
              <FiX size={14} />
            </button>
          )}
        </div>
      </div>

      {/* Categories */}
      <div>
        <h4 className="uppercase tracking-wider text-xs text-gray-400 mb-3">Categories</h4>
        <div className="space-y-1.5" role="list">
          {d.categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => { setActiveCategory(cat.name); setPage(1); }}
              aria-pressed={activeCategory === cat.name}
              className={`w-full flex justify-between items-center px-4 py-2.5 rounded-xl text-sm transition-colors
                ${activeCategory === cat.name ? "bg-purple-300 text-black font-medium" : "hover:bg-white/5 text-gray-300"}`}
            >
              <span>{cat.name}</span>
              <span className={`text-xs px-2 py-0.5 rounded-full ${activeCategory === cat.name ? "bg-black/20" : "bg-white/5"}`}>
                {cat.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Popular Tags */}
      <div>
        <h4 className="uppercase tracking-wider text-xs text-gray-400 mb-3">Popular Tags</h4>
        <div className="flex flex-wrap gap-2">
          {d.popularTags.map((tag) => (
            <button
              key={tag}
              onClick={() => { setSearch(tag.replace("#", "")); setPage(1); }}
              aria-label={`Search for ${tag}`}
              className="px-3 py-1.5 rounded-lg bg-[#17131f] border border-white/5 text-xs hover:border-purple-400 hover:text-purple-300 transition-colors"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Newsletter */}
      <NewsletterBox />

    </aside>
  );
}

/* ================= POST CARD ================= */
function PostCard({ post }) {
  const [imgError, setImgError] = useState(false);

  return (
    <article
      className="flex flex-col sm:flex-row bg-[#17131f] border border-white/5 rounded-2xl overflow-hidden group"
      aria-label={post.title}
    >
      {/* image */}
      <div className="sm:w-56 lg:w-64 shrink-0 overflow-hidden bg-[#211a2d]">
        {imgError ? (
          <div className="w-full h-48 sm:h-full flex items-center justify-center text-gray-600 text-xs">
            No image
          </div>
        ) : (
          <img
            src={post.image}
            alt={post.title}
            onError={() => setImgError(true)}
            loading="lazy"
            className="w-full h-48 sm:h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        )}
      </div>

      <div className="p-5 sm:p-6 flex flex-col min-w-0">
        {/* meta row */}
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          <span className="px-3 py-1 rounded-full bg-purple-300 text-black text-xs font-medium shrink-0">
            {post.category}
          </span>
          <span className="flex items-center gap-1.5 text-xs text-gray-400">
            <FiCalendar size={11} aria-hidden="true" />
            <time dateTime={post.date}>{post.date}</time>
          </span>
          <span className="flex items-center gap-1.5 text-xs text-gray-400">
            <FiClock size={11} aria-hidden="true" />
            {post.readTime}
          </span>
        </div>

        <h3 className="text-lg sm:text-xl font-bold mt-4 leading-snug">{post.title}</h3>
        <p className="text-gray-400 mt-3 text-sm leading-6 flex-1 line-clamp-3">{post.excerpt}</p>

        <div className="flex items-center justify-between mt-5 pt-4 border-t border-white/5">
          <div className="flex gap-2 flex-wrap">
            {post.tags.slice(0, 2).map((tag) => (
              <span key={tag} className="text-xs text-gray-500">#{tag}</span>
            ))}
          </div>
          <button
            aria-label={`Read full post: ${post.title}`}
            className="flex items-center gap-1.5 text-purple-300 text-sm font-medium hover:gap-2.5 transition-all shrink-0 ml-3"
          >
            Read <FiArrowRight size={13} aria-hidden="true" />
          </button>
        </div>
      </div>
    </article>
  );
}

/* ================= POST LIST ================= */
function PostList({ allFiltered, page, setPage, activeCategory, onClearFilters }) {
  const totalPages  = Math.max(1, Math.ceil(allFiltered.length / POSTS_PER_PAGE));
  const safePage    = Math.min(page, totalPages);
  const start       = (safePage - 1) * POSTS_PER_PAGE;
  const paginated   = allFiltered.slice(start, start + POSTS_PER_PAGE);

  // visible page numbers (max 4 shown)
  const pageNums = useMemo(() => {
    const nums = [];
    for (let i = 1; i <= totalPages && nums.length < 4; i++) nums.push(i);
    return nums;
  }, [totalPages]);

  return (
    <div>
      {/* header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <h2 className="text-xl sm:text-2xl font-bold">Latest Explorations</h2>
          <span className="px-2.5 py-1 bg-purple-500/10 border border-purple-500/20 rounded-full text-xs text-purple-300">
            {activeCategory}
          </span>
        </div>
        <span className="text-xs sm:text-sm text-gray-400">
          {allFiltered.length} post{allFiltered.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* empty state */}
      {allFiltered.length === 0 ? (
        <div className="text-center py-16 border border-white/5 rounded-2xl bg-[#17131f]">
          <p className="text-4xl mb-4">🔭</p>
          <p className="text-gray-300 font-medium">No posts found</p>
          <p className="text-gray-500 text-sm mt-2">Try different keywords or a different category.</p>
          <button
            onClick={onClearFilters}
            className="mt-5 px-5 py-2 rounded-full border border-white/10 hover:border-purple-400 text-sm transition-colors"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <>
          <div className="space-y-5">
            {paginated.map((post) => <PostCard key={post.id} post={post} />)}
          </div>

          {/* pagination — only shown when there are multiple pages */}
          {totalPages > 1 && (
            <nav aria-label="Blog pagination" className="flex items-center justify-between mt-12 pt-8 border-t border-white/5">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={safePage === 1}
                aria-label="Previous page"
                className="flex items-center gap-2 text-sm text-gray-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <FiChevronLeft size={16} /> Newer
              </button>

              <div className="flex gap-2">
                {pageNums.map((n) => (
                  <button
                    key={n}
                    onClick={() => setPage(n)}
                    aria-label={`Page ${n}`}
                    aria-current={safePage === n ? "page" : undefined}
                    className={`w-9 h-9 rounded-lg text-sm font-medium transition-colors
                      ${safePage === n ? "bg-purple-300 text-black" : "border border-white/10 hover:border-white/30"}`}
                  >
                    {n}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={safePage === totalPages}
                aria-label="Next page"
                className="flex items-center gap-2 text-sm border border-white/10 hover:border-white/30 disabled:opacity-30 disabled:cursor-not-allowed transition-colors px-4 py-2 rounded-xl"
              >
                Older <FiChevronRight size={16} />
              </button>
            </nav>
          )}
        </>
      )}
    </div>
  );
}

/* ================= PAGE ================= */
export default function Blog() {
  const [activeCategory, setActiveCategory] = useState("All Topics");
  const [search, setSearch]                 = useState("");
  const [page, setPage]                     = useState(1);
  const [showSidebar, setShowSidebar]       = useState(false);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return d.posts.filter((p) => {
      const matchCat    = activeCategory === "All Topics" || p.category === activeCategory;
      const matchSearch = !q ||
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q));
      return matchCat && matchSearch;
    });
  }, [activeCategory, search]);

  function clearFilters() {
    setSearch("");
    setActiveCategory("All Topics");
    setPage(1);
  }

  // reset to page 1 whenever filters change
  function handleSetSearch(v)   { setSearch(v);   setPage(1); }
  function handleSetCategory(v) { setActiveCategory(v); setPage(1); }

  return (
    <div className="bg-[#0f0c16] text-white min-h-screen">
      <Hero />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 md:py-16 lg:py-20">

        {/* Mobile filter toggle */}
        <button
          onClick={() => setShowSidebar(!showSidebar)}
          aria-expanded={showSidebar}
          aria-controls="blog-sidebar"
          className="lg:hidden flex items-center gap-2 mb-6 border border-white/10 hover:border-white/25 transition-colors px-4 py-2.5 rounded-xl text-sm"
        >
          <FiFilter size={14} />
          {showSidebar ? "Hide Filters" : "Filters & Search"}
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-8 lg:gap-12">

          {/* Sidebar */}
          <div
            id="blog-sidebar"
            className={`${showSidebar ? "block" : "hidden"} lg:block`}
          >
            <Sidebar
              activeCategory={activeCategory}
              setActiveCategory={handleSetCategory}
              search={search}
              setSearch={handleSetSearch}
              setPage={setPage}
            />
          </div>

          <PostList
            allFiltered={filtered}
            page={page}
            setPage={setPage}
            activeCategory={activeCategory}
            onClearFilters={clearFilters}
          />
        </div>
      </section>
    </div>
  );
}
