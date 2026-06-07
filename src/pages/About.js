import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FiStar,
  FiSearch,
  FiShield,
  FiUsers,
  FiZap,
  FiBookOpen,
  FiArrowRight,
  FiTwitter,
  FiGithub,
  FiLinkedin,
  FiMapPin,
} from "react-icons/fi";
import d from "../data/aboutData.json";

const iconMap = { FiSearch, FiShield, FiUsers, FiZap, FiBookOpen };

export default function About() {
  const navigate = useNavigate();
  return (
    <div className="bg-[#0f0c16] text-white min-h-screen">

      {/* =========================
          HERO
      ========================== */}

      <section className="bg-gradient-to-r from-[#040a22] via-[#05072d] to-[#11103b] py-28">

        <div className="max-w-7xl mx-auto px-6">

          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* LEFT */}

            <div>

              <span className="inline-block px-4 py-2 rounded-full bg-[#1a1731] border border-white/10 text-xs text-purple-200">
                {d.hero.badge}
              </span>

              <h1 className="text-6xl lg:text-7xl font-bold mt-8 leading-tight">
                {d.hero.title}
                <br />
                <span className="text-[#b58be8]">{d.hero.highlight}</span>
              </h1>

              {/* MISSION */}

              <div className="mt-12 border-l-4 border-[#b58be8] pl-6">

                <p className="text-sm uppercase tracking-wider text-[#b58be8]">
                  {d.hero.mission.label}
                </p>

                <p className="mt-4 text-xl text-gray-300 leading-9">
                  {d.hero.mission.text}
                </p>

              </div>

              {/* VISION */}

              <div className="mt-10 border-l-4 border-cyan-400 pl-6">

                <p className="text-sm uppercase tracking-wider text-cyan-400">
                  {d.hero.vision.label}
                </p>

                <p className="mt-4 text-gray-400 italic leading-8">
                  {d.hero.vision.text}
                </p>

              </div>

              <div className="flex gap-4 mt-12 flex-wrap">

                <button onClick={() => navigate("/research")} className="bg-[#b58be8] text-black px-7 py-4 rounded-full font-medium">
                  {d.hero.primaryBtn}
                </button>

                <button onClick={() => navigate("/research")} className="bg-[#1d1727] border border-white/10 px-7 py-4 rounded-full">
                  {d.hero.secondaryBtn}
                </button>

              </div>

            </div>

            {/* RIGHT IMAGE */}

            <div className="relative">

              <div className="absolute right-0 bottom-0 w-[80%] h-[80%] rounded-3xl bg-[#14204b] opacity-40" />

              <img
                src={d.hero.image}
                alt=""
                className="relative rounded-3xl border border-white/10 shadow-2xl"
              />

            </div>

          </div>

        </div>

      </section>

      {/* =========================
          CORE VALUES
      ========================== */}

      <section className="py-24">

        <div className="max-w-6xl mx-auto px-6 text-center">

          <h2 className="text-5xl font-bold">{d.values.title}</h2>

          <p className="text-gray-400 mt-6 max-w-3xl mx-auto">
            {d.values.subtitle}
          </p>

        </div>

        <div className="max-w-6xl mx-auto px-6 mt-20">

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

            {d.values.items.map((item) => {
              const Icon = iconMap[item.icon];
              return (
                <ValueCard
                  key={item.title}
                  icon={<Icon />}
                  title={item.title}
                  text={item.text}
                />
              );
            })}

          </div>

        </div>

      </section>

      {/* =========================
          OUR EVOLUTION
      ========================== */}

      <section className="py-24 bg-[#12101d]">

        <div className="max-w-7xl mx-auto px-6">

          <div className="grid lg:grid-cols-[380px_1fr] gap-16">

            {/* LEFT */}

            <div>

              <h2 className="text-5xl font-bold">{d.evolution.title}</h2>

              <p className="text-gray-400 mt-8 leading-8">
                {d.evolution.subtitle}
              </p>

              <img
                src={d.evolution.image}
                alt=""
                className="mt-10 rounded-3xl border border-white/5"
              />

            </div>

            {/* TIMELINE */}

            <div className="space-y-14">

              {d.evolution.timeline.map((item) => (
                <TimelineItem
                  key={item.year}
                  year={item.year}
                  title={item.title}
                  description={item.description}
                />
              ))}

            </div>

          </div>

        </div>

      </section>

      {/* =========================
          CTA SECTION
      ========================== */}

      <section
        className="relative py-24 overflow-hidden"
        style={{
          backgroundImage: `url('${d.cta.bgImage}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* purple overlay */}
        <div className="absolute inset-0 bg-[#b58be8]/85" />

        <div className="relative max-w-5xl mx-auto text-center px-6">

          <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto">
            <FiArrowRight className="text-black" size={28} />
          </div>

          <h2 className="text-5xl font-bold text-black mt-8">{d.cta.title}</h2>

          <p className="text-black/70 text-xl mt-8 max-w-3xl mx-auto leading-9">
            {d.cta.subtitle}
          </p>

          <div className="flex justify-center gap-4 mt-12 flex-wrap">

            <button onClick={() => navigate("/contact")} className="bg-black text-white px-8 py-4 rounded-full font-medium">
              {d.cta.primaryBtn}
            </button>

            <button onClick={() => navigate("/contact")} className="border border-black/20 px-8 py-4 rounded-full text-black">
              {d.cta.secondaryBtn}
            </button>

          </div>

        </div>

      </section>

      

    </div>
  );
}

/* =========================
   VALUE CARD
========================= */

function ValueCard({ icon, title, text }) {
  return (
    <div className="bg-[#17131f] border border-white/5 rounded-3xl p-8 text-left">

      <div className="w-12 h-12 rounded-xl bg-[#211a2d] flex items-center justify-center text-[#b58be8] text-xl">
        {icon}
      </div>

      <h3 className="text-2xl font-bold mt-6">{title}</h3>

      <p className="text-gray-400 mt-4 leading-8">{text}</p>

    </div>
  );
}

/* =========================
   TIMELINE ITEM
========================= */

function TimelineItem({ year, title, description }) {
  return (
    <div className="relative pl-10">

      <div className="absolute left-0 top-2 w-4 h-4 rounded-full bg-[#b58be8]" />

      <div className="absolute left-[7px] top-6 bottom-[-60px] w-[2px] bg-[#3c2c54]" />

      <p className="text-[#b58be8] font-medium">{year}</p>

      <h3 className="text-3xl font-bold mt-3">{title}</h3>

      <p className="text-gray-400 mt-4 leading-8">{description}</p>

    </div>
  );
}
