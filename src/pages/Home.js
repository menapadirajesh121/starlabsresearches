import React from "react";
import { useNavigate } from "react-router-dom";
import { FiCpu, FiGlobe, FiTarget, FiArrowRight } from "react-icons/fi";
import d from "../data/homeData.json";

const iconMap = { FiCpu, FiGlobe };

/* ================= HERO ================= */
function Hero() {
  const navigate = useNavigate();
  return (
    <section className="relative min-h-screen flex items-center justify-center text-center px-4 sm:px-6 lg:px-8 overflow-hidden pt-8 sm:pt-0">
      {/* background glow */}
      <div className="absolute w-[300px] sm:w-[480px] h-[300px] sm:h-[480px] rounded-full bg-purple-500/20 blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-3xl w-full mx-auto py-20 sm:py-28 lg:py-32">
        <span className="px-4 py-1.5 border border-white/10 rounded-full text-xs sm:text-sm">
          {d.hero.badge}
        </span>

        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mt-6 leading-tight">
          {d.hero.title}
          <br />
          <span className="bg-gradient-to-r from-white to-orange-300 bg-clip-text text-transparent">
            {d.hero.highlight}
          </span>
        </h1>

        <p className="mt-6 text-gray-400 text-base sm:text-lg leading-relaxed max-w-xl mx-auto">
          {d.hero.paragraph}
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mt-8">
          <button
            onClick={() => navigate("/research")}
            className="px-7 py-3 rounded-full bg-gradient-to-r from-purple-500 to-purple-400 font-medium text-sm sm:text-base"
          >
            {d.hero.primaryBtn}
          </button>
          <button
            onClick={() => navigate("/about")}
            className="px-7 py-3 rounded-full border border-white/10 bg-white/5 font-medium text-sm sm:text-base"
          >
            {d.hero.secondaryBtn}
          </button>
        </div>
      </div>
    </section>
  );
}

/* ================= ABOUT SNIPPET ================= */
function AboutSnippet() {
  return (
    <section className="bg-[#0f0c16] py-14 sm:py-16 md:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">

          {/* LEFT */}
          <div>
            <span className="text-[#9d6bff] uppercase tracking-widest text-xs sm:text-sm font-semibold">
              {d.about.eyebrow}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-4 text-white leading-tight">
              {d.about.title}
            </h2>
            <div className="mt-6 space-y-5">
              {d.about.paragraphs.map((p, i) => (
                <p key={i} className="text-[#b8b5c3] text-base sm:text-lg leading-7 sm:leading-8">{p}</p>
              ))}
            </div>
            <div className="flex flex-wrap gap-2 mt-8">
              {d.about.tags.map((tag) => (
                <span key={tag} className="px-3 py-1.5 rounded-full bg-[#211a2d] border border-white/5 text-xs sm:text-sm text-white">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* RIGHT — Current Focus card */}
          <div className="bg-[#1a1423] rounded-2xl lg:rounded-3xl overflow-hidden border border-white/5">
            <div className="p-6 sm:p-8">
              <div className="w-12 h-12 rounded-xl bg-[#2d2140] flex items-center justify-center">
                <FiTarget size={20} className="text-[#b889ff]" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold mt-6 text-white">Current Focus</h3>
            </div>
            {d.about.focusItems.map((item, i) => {
              const Icon = iconMap[item.icon] || FiCpu;
              return (
                <div key={i} className="border-t border-white/5 p-6 sm:p-8">
                  <div className="flex gap-4 items-start">
                    <div className={`w-11 h-11 rounded-full ${item.color} flex items-center justify-center flex-shrink-0`}>
                      <Icon size={18} className={item.iconColor} />
                    </div>
                    <div>
                      <h4 className="text-base sm:text-lg font-semibold text-white">{item.title}</h4>
                      <p className="text-[#b8b5c3] mt-1.5 leading-6 text-sm sm:text-base">{item.desc}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}

/* ================= BLOG PREVIEW ================= */
function BlogPreview() {
  const navigate = useNavigate();
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-18 lg:py-20">
      {/* section header — left label, right link */}
      <div className="flex items-end justify-between mb-10 sm:mb-12">
        <div>
          <p className="text-purple-300 uppercase tracking-widest text-xs sm:text-sm font-semibold mb-2">Blog</p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">Featured Insights</h2>
        </div>
        <button onClick={() => navigate("/blog")} className="text-purple-300 text-sm sm:text-base whitespace-nowrap flex items-center gap-1">
          View All <FiArrowRight size={14} />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        {d.posts.map((post, i) => (
          <div key={i} className="bg-[#17121f] border border-white/10 rounded-2xl overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
            <div className="overflow-hidden">
              <img src={post.image} alt={post.title} className="h-44 sm:h-48 lg:h-52 w-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="p-5 sm:p-6">
              <span className="px-2.5 py-1 text-xs rounded-full bg-orange-200 text-black font-medium">{post.tag}</span>
              <h3 className="text-base sm:text-lg font-semibold mt-3 leading-snug">{post.title}</h3>
              <button onClick={() => navigate("/blog")} className="mt-4 text-purple-300 text-sm flex items-center gap-1">
                Read Insight <FiArrowRight size={13} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ================= PROMO CARDS ================= */
function PromoCards() {
  const navigate = useNavigate();
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16 md:pb-18 lg:pb-20">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
        {d.cards.map((card, i) => (
          <div key={i} className={`rounded-2xl lg:rounded-3xl ${card.bg} p-7 sm:p-8 lg:p-10 flex flex-col`}>
            <h3 className="text-2xl sm:text-3xl font-bold">{card.title}</h3>
            <p className="text-gray-300 mt-4 text-sm sm:text-base flex-1">{card.desc}</p>
            <div className="mt-8">
              <button
                onClick={() => navigate(card.link)}
                className={`px-6 py-2.5 rounded-full text-sm sm:text-base font-medium ${card.btnClass}`}
              >
                {card.btn}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ================= OPEN FOR COLLABORATION CTA ================= */
function CollabCTA() {
  const navigate = useNavigate();
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16 md:pb-20 lg:pb-24">
      <div className="relative rounded-2xl lg:rounded-[40px] bg-gradient-to-br from-[#2b1343] via-[#261040] to-[#1a0d2e] overflow-hidden">
        {/* decorative blobs */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/20 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-800/20 rounded-full blur-[60px] pointer-events-none" />

        <div className="relative z-10 px-6 sm:px-10 lg:px-16 py-12 sm:py-14 lg:py-16">
          {/* two-column layout: text left, buttons right on desktop */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 lg:gap-12">

            <div className="max-w-xl">
              <span className="inline-block px-4 py-1.5 rounded-full bg-purple-500/30 border border-purple-400/30 text-purple-300 text-xs font-semibold uppercase tracking-widest mb-4">
                Open for Collaboration
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                {d.cta.title}
              </h2>
              <p className="text-gray-400 mt-4 text-sm sm:text-base leading-relaxed">
                {d.cta.desc}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-3 lg:shrink-0">
              <button
                onClick={() => navigate("/contact")}
                className="px-7 py-3 rounded-full bg-purple-500 hover:bg-purple-400 transition-colors font-medium text-sm sm:text-base text-center"
              >
                {d.cta.primaryBtn}
              </button>
              <a
                href="/cv.pdf"
                download
                className="px-7 py-3 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 transition-colors font-medium text-sm sm:text-base text-center"
              >
                {d.cta.secondaryBtn}
              </a>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

/* ================= PAGE ================= */
export default function Home() {
  return (
    <main className="bg-[#0d0a14] text-white">
      <Hero />
      <AboutSnippet />
      <BlogPreview />
      <PromoCards />
      <CollabCTA />
    </main>
  );
}
