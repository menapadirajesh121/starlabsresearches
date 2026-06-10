import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FiSearch,
  FiShield,
  FiUsers,
  FiZap,
  FiBookOpen,
  FiArrowRight,
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

      <section className="bg-gradient-to-r from-[#040a22] via-[#05072d] to-[#11103b] py-16 sm:py-20 md:py-24 lg:py-28">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

            {/* LEFT */}

            <div>

              <span className="inline-block px-4 py-2 rounded-full bg-[#1a1731] border border-white/10 text-xs text-purple-200">
                {d.hero.badge}
              </span>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mt-6 sm:mt-8 leading-tight">
                {d.hero.title}
                <br />
                <span className="text-[#b58be8]">{d.hero.highlight}</span>
              </h1>

              {/* MISSION */}

              <div className="mt-8 sm:mt-12 border-l-4 border-[#b58be8] pl-5 sm:pl-6">

                <p className="text-sm uppercase tracking-wider text-[#b58be8]">
                  {d.hero.mission.label}
                </p>

                <p className="mt-3 sm:mt-4 text-base sm:text-lg lg:text-xl text-gray-300 leading-7 sm:leading-9">
                  {d.hero.mission.text}
                </p>

              </div>

              {/* VISION */}

              <div className="mt-7 sm:mt-10 border-l-4 border-cyan-400 pl-5 sm:pl-6">

                <p className="text-sm uppercase tracking-wider text-cyan-400">
                  {d.hero.vision.label}
                </p>

                <p className="mt-3 sm:mt-4 text-sm sm:text-base text-gray-400 italic leading-7 sm:leading-8">
                  {d.hero.vision.text}
                </p>

              </div>

              <div className="flex gap-4 mt-8 sm:mt-12 flex-wrap">

                <button onClick={() => navigate("/research")} className="bg-[#b58be8] text-black px-6 sm:px-7 py-3 sm:py-4 rounded-full font-medium text-sm sm:text-base">
                  {d.hero.primaryBtn}
                </button>


              </div>

            </div>

            {/* RIGHT IMAGE */}

            <div className="relative mt-8 lg:mt-0">

              <div className="absolute right-0 bottom-0 w-[80%] h-[80%] rounded-3xl bg-[#14204b] opacity-40" />

              <img
                src={d.hero.image}
                alt=""
                className="relative rounded-2xl lg:rounded-3xl border border-white/10 shadow-2xl w-full"
              />

            </div>

          </div>

        </div>

      </section>

      {/* =========================
          CORE VALUES
      ========================== */}

      <section className="py-16 sm:py-20 md:py-24 lg:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">{d.values.title}</h2>

          <p className="text-gray-400 mt-4 sm:mt-6 max-w-3xl mx-auto text-sm sm:text-base">
            {d.values.subtitle}
          </p>

        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 sm:mt-16">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">

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

      <section className="py-16 sm:py-20 md:py-24 lg:py-28 bg-[#12101d]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[320px_1fr] xl:grid-cols-[380px_1fr] gap-12 lg:gap-20">

            {/* LEFT */}

            <div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">{d.evolution.title}</h2>

              <p className="text-gray-400 mt-5 sm:mt-8 leading-7 sm:leading-8 text-sm sm:text-base">
                {d.evolution.subtitle}
              </p>

              <img
                src={d.evolution.image}
                alt=""
                className="mt-8 sm:mt-10 rounded-2xl lg:rounded-3xl border border-white/5 w-full"
              />

            </div>

            {/* TIMELINE */}

            <div className="space-y-10 sm:space-y-12 lg:space-y-14 mt-8 lg:mt-0">

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
        className="relative py-20 sm:py-24 md:py-28 overflow-hidden"
        style={{
          backgroundImage: `url('${d.cta.bgImage}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* purple overlay */}
        <div className="absolute inset-0 bg-[#b58be8]/85" />

        <div className="relative max-w-5xl mx-auto text-center px-4 sm:px-6 lg:px-8">

          <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto">
            <FiArrowRight className="text-black" size={24} />
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black mt-6 sm:mt-8">{d.cta.title}</h2>

          <p className="text-black/70 text-base sm:text-lg lg:text-xl mt-5 sm:mt-8 max-w-3xl mx-auto leading-7 sm:leading-9">
            {d.cta.subtitle}
          </p>

          <div className="flex justify-center gap-3 sm:gap-4 mt-8 sm:mt-12 flex-wrap">

            <button onClick={() => navigate("/contact")} className="bg-black text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-medium text-sm sm:text-base">
              {d.cta.primaryBtn}
            </button>

            <button onClick={() => navigate("/contact")} className="border border-black/20 px-6 sm:px-8 py-3 sm:py-4 rounded-full text-black text-sm sm:text-base">
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
    <div className="bg-[#17131f] border border-white/5 rounded-2xl lg:rounded-3xl p-6 sm:p-8 text-left">

      <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[#211a2d] flex items-center justify-center text-[#b58be8] text-xl">
        {icon}
      </div>

      <h3 className="text-xl sm:text-2xl font-bold mt-4 sm:mt-6">{title}</h3>

      <p className="text-gray-400 mt-3 sm:mt-4 leading-7 sm:leading-8 text-sm sm:text-base">{text}</p>

    </div>
  );
}

/* =========================
   TIMELINE ITEM
========================= */

function TimelineItem({ year, title, description }) {
  return (
    <div className="relative pl-8 sm:pl-10">

      <div className="absolute left-0 top-2 w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-[#b58be8]" />

      <div className="absolute left-[6px] sm:left-[7px] top-6 bottom-[-40px] sm:bottom-[-60px] w-[2px] bg-[#3c2c54]" />

      <p className="text-[#b58be8] font-medium text-sm sm:text-base">{year}</p>

      <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mt-2 sm:mt-3">{title}</h3>

      <p className="text-gray-400 mt-3 sm:mt-4 leading-7 sm:leading-8 text-sm sm:text-base">{description}</p>

    </div>
  );
}
