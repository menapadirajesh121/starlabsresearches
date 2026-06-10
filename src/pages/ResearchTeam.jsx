import { useNavigate } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import researchers from "../data/researchersData.json";
import d from "../data/researchTeamData.json";

export default function ResearchTeam() {
  const navigate = useNavigate();
  return (
    <div className="text-white">
      {/* HERO */}
      <section
        className="relative py-32 overflow-hidden"
        style={{
          backgroundImage: `url('${d.hero.bgImage}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* dark overlay */}
        <div className="absolute inset-0 bg-[#0f0c16]/80" />
        <div className="relative max-w-5xl mx-auto text-center px-6">
          <span className="inline-block px-4 py-2 rounded-full bg-[#342047] text-xs tracking-wider text-purple-200">
            {d.hero.badge}
          </span>

          <h1 className="text-6xl md:text-7xl font-bold mt-8 leading-tight">
            {d.hero.titleStart}
            <span className="text-[#b58be8]"> {d.hero.titleHighlight.split(' ')[0]}</span>
            <br />
            <span className="text-[#b58be8]">{d.hero.titleHighlight.split(' ')[1]}</span>
          </h1>

          <p className="max-w-3xl mx-auto text-gray-300 text-xl mt-8 leading-9">
            {d.hero.paragraph}
          </p>

          <div className="flex justify-center gap-16 mt-14 flex-wrap">
            {d.hero.stats.map(({ emoji, label }) => (
                <div key={label} className="text-center">
                  <span className="text-3xl">{emoji}</span>
                  <p className="text-sm text-gray-400 mt-3">{label}</p>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center">
          <h2 className="text-5xl font-bold">{d.section.title}</h2>
          <div className="w-20 h-1 bg-[#b58be8] mx-auto mt-6"></div>
          <p className="max-w-3xl mx-auto text-gray-400 mt-8 text-lg">
            {d.section.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-20">
          {researchers.map((member) => (
            <div
              key={member.name}
              className="bg-[#17131f] border border-white/5 rounded-2xl p-6 flex flex-col items-center text-center hover:border-[#b58be8]/40 transition"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-24 h-24 rounded-full object-cover border-4 border-[#2f2140]"
              />
              <h3 className="text-lg font-bold mt-5 leading-tight">{member.name}</h3>
              <p className="text-[#b58be8] text-xs mt-2 font-medium uppercase tracking-wide">{member.role}</p>
              <p className="text-gray-400 mt-4 leading-6 text-sm flex-1">{member.desc}</p>
              <button
                onClick={() => navigate(`/profile/${member.id}`)}
                className="w-full mt-6 bg-[#1f1a2b] py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-[#2a203a] text-sm transition"
              >
                View Profile
                <FiArrowRight size={14} />
              </button>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-24 bg-[#17131f] border border-white/5 rounded-[32px] py-20 px-8 text-center">
          <h2 className="text-4xl font-bold">{d.cta.title}</h2>
          <p className="max-w-2xl mx-auto text-gray-400 mt-6 text-lg">{d.cta.desc}</p>
          <button onClick={() => navigate(d.cta.link)} className="mt-10 px-8 py-4 rounded-xl border border-[#b58be8] text-[#b58be8] hover:bg-[#b58be8] hover:text-black transition">
            {d.cta.btn}
          </button>
        </div>
      </section>
    </div>
  );
}
