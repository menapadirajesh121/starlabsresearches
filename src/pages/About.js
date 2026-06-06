import React from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowRight, FiDownload, FiAward } from "react-icons/fi";
import { FaAtom } from "react-icons/fa";
import d from "../data/aboutData.json";

/* ================= HERO ================= */
function Hero() {
  const navigate = useNavigate();
  return (
    <section className="bg-gradient-to-br from-[#2a163d] via-[#221236] to-[#1a0d2a] py-14 sm:py-20 md:py-24 lg:py-28">
      <div className="max-w-4xl mx-auto text-center px-4 sm:px-6">
        <img
          src={d.hero.img}
          alt="Alex"
          className="w-24 sm:w-32 md:w-36 h-24 sm:h-32 md:h-36 rounded-full object-cover border-4 border-purple-400 mx-auto shadow-lg shadow-purple-900/40"
        />
        <div className="mt-5 inline-block bg-[#3d274d] text-purple-300 px-4 py-1.5 rounded-full text-xs font-medium">
          {d.hero.badge}
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mt-6 leading-tight">
          {d.hero.title}{" "}
          <span className="text-purple-300 italic">{d.hero.highlight}</span>
          <br />{d.hero.subtitle}
        </h1>
        <p className="text-gray-300 mt-5 max-w-2xl mx-auto text-sm sm:text-base md:text-lg leading-relaxed">
          {d.hero.paragraph}
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-3 mt-8">
          <button
            onClick={() => navigate("/contact")}
            className="bg-purple-400 text-black px-7 py-3 rounded-full flex items-center justify-center gap-2 font-semibold text-sm sm:text-base"
          >
            {d.hero.primaryBtn} <FiArrowRight />
          </button>
          <a
            href="/cv.pdf"
            download
            className="border border-white/20 px-7 py-3 rounded-full flex items-center justify-center gap-2 text-sm sm:text-base hover:bg-white/5 transition-colors"
          >
            <FiDownload /> {d.hero.secondaryBtn}
          </a>
        </div>
      </div>
    </section>
  );
}

/* ================= MAIN CONTENT ================= */
function MainContent() {
  const navigate = useNavigate();
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 lg:py-24">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10 items-start">

        {/* LEFT — 2 cols wide: journey + timeline + goals */}
        <div className="lg:col-span-2 space-y-10">

          {/* Intro block */}
          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold flex items-center gap-3 mb-6">
              <FaAtom className="text-purple-300 shrink-0" />
              My Academic Journey
            </h2>
            <div className="bg-[#17131f] p-6 sm:p-8 rounded-2xl border border-white/5 space-y-4">
              {d.journey.intro.map((p, i) => (
                <p key={i} className="text-gray-300 leading-7 text-sm sm:text-base">{p}</p>
              ))}
            </div>
          </div>

          {/* Timeline */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-8">
              <h3 className="text-2xl sm:text-3xl font-bold">Education & Experience</h3>
              <a
                href="/cv.pdf"
                download
                className="self-start sm:self-auto bg-[#2a163d] hover:bg-[#361d4f] transition-colors px-4 py-2 rounded-full text-xs sm:text-sm flex items-center gap-2"
              >
                <FiDownload size={13} /> Curriculum Vitae
              </a>
            </div>
            <div className="relative pl-6 sm:pl-8 border-l-2 border-purple-400/25 space-y-8 sm:space-y-10">
              {d.journey.timeline.map((item, i) => (
                <TimelineItem key={i} {...item} />
              ))}
            </div>
          </div>

          {/* Goals card */}
          <div className="bg-[#1a1524] rounded-2xl p-6 sm:p-8 border border-white/5">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-purple-400 text-black p-3 rounded-xl shrink-0">
                <FiAward size={18} />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold">{d.goals.title}</h3>
            </div>
            <p className="text-gray-300 leading-7 text-sm sm:text-base">{d.goals.desc}</p>
            <button
              onClick={() => navigate("/research")}
              className="text-purple-300 mt-5 flex items-center gap-2 text-sm sm:text-base hover:gap-3 transition-all"
            >
              {d.goals.btn} <FiArrowRight />
            </button>
          </div>

        </div>

        {/* RIGHT — sidebar: snapshot + collab */}
        <div className="space-y-6">

          {/* Research snapshot */}
          <div className="bg-[#17131f] rounded-2xl p-6 sm:p-7 border border-white/5">
            <h3 className="font-bold text-lg mb-6">Research Snapshot</h3>
            <TagGroup title="INTERESTS" items={d.snapshot.interests} />
            <TagGroup title="TECHNICAL SKILLS" items={d.snapshot.skills} />
            <div className="mt-6">
              <h4 className="text-purple-300 mb-4 font-semibold text-xs sm:text-sm uppercase tracking-wider">Academic Honors</h4>
              <div className="space-y-3 text-sm text-gray-300">
                {d.snapshot.honors.map((h, i) => (
                  <div key={i} className="flex justify-between items-center border-b border-white/5 pb-2 last:border-0">
                    <span>{h.label}</span>
                    <span className="text-purple-300 font-medium ml-4 shrink-0">{h.year}</span>
                  </div>
                ))}
              </div>
            </div>
            <a
              href="/cv.pdf"
              download
              className="mt-7 w-full bg-purple-400 text-black py-3 rounded-xl font-semibold flex items-center justify-center gap-2 text-sm hover:bg-purple-300 transition-colors"
            >
              <FiDownload /> Download Full CV
            </a>
          </div>

          {/* Open for Collaboration */}
          <div className="bg-gradient-to-br from-[#241822] to-[#1e1520] border border-orange-500/20 rounded-2xl p-6 sm:p-7">
            <div className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center mb-4">
              <span className="text-orange-400 text-lg">🤝</span>
            </div>
            <h3 className="text-xl font-bold">Open for Collaboration</h3>
            <p className="text-gray-400 mt-3 text-sm leading-6">
              Actively seeking PhD supervisors and international research partners. Currently available for Fall 2025 positions.
            </p>
            <button
              onClick={() => navigate("/contact")}
              className="w-full mt-5 bg-orange-500/10 border border-orange-500/30 hover:bg-orange-500/20 transition-colors py-2.5 rounded-xl text-sm font-medium text-orange-300"
            >
              Connect with Alex
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}

/* ================= BOTTOM CTA ================= */
function BottomCTA() {
  const navigate = useNavigate();
  return (
    <section className="border-t border-white/5 py-10 sm:py-12 md:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold">{d.cta.title}</h2>
            <p className="text-gray-400 mt-2 text-sm sm:text-base max-w-lg">{d.cta.desc}</p>
          </div>
          <button
            onClick={() => navigate("/research")}
            className="bg-purple-400 hover:bg-purple-300 transition-colors text-black px-7 py-3 rounded-full flex items-center gap-2 text-sm sm:text-base font-medium shrink-0"
          >
            {d.cta.btn} <FiArrowRight />
          </button>
        </div>
      </div>
    </section>
  );
}

/* ================= PAGE ================= */
export default function About() {
  return (
    <div className="bg-[#0f0c16] text-white min-h-screen">
      <Hero />
      <MainContent />
      <BottomCTA />
    </div>
  );
}

/* ================= HELPERS ================= */
function TimelineItem({ year, title, school, desc }) {
  return (
    <div className="relative">
      {/* dot */}
      <div className="absolute -left-[25px] sm:-left-[33px] top-1.5 w-4 h-4 rounded-full bg-purple-400 border-4 border-[#0f0c16] shrink-0" />
      <p className="text-purple-300 text-xs font-semibold uppercase tracking-wider mb-1">{year}</p>
      <h4 className="text-base sm:text-lg font-bold">{title}</h4>
      <p className="text-gray-500 text-xs sm:text-sm mt-0.5">{school}</p>
      <p className="text-gray-300 mt-2 text-sm leading-6">{desc}</p>
    </div>
  );
}

function TagGroup({ title, items }) {
  return (
    <div className="mb-5">
      <h4 className="text-purple-300 font-semibold mb-3 text-xs uppercase tracking-wider">{title}</h4>
      <div className="flex flex-wrap gap-1.5">
        {items.map((item) => (
          <span key={item} className="bg-white/5 border border-white/10 px-2.5 py-1.5 rounded-lg text-xs">{item}</span>
        ))}
      </div>
    </div>
  );
}
