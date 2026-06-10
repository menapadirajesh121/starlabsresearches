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
        className="relative py-20 sm:py-24 md:py-28 lg:py-32 overflow-hidden"
        style={{
          backgroundImage: `url('${d.hero.bgImage}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* dark overlay */}
        <div className="absolute inset-0 bg-[#0f0c16]/80" />
        <div className="relative max-w-5xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <span className="inline-block px-4 py-2 rounded-full bg-[#342047] text-xs tracking-wider text-purple-200">
            {d.hero.badge}
          </span>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mt-6 sm:mt-8 leading-tight">
            {d.hero.titleStart}
            <span className="text-[#b58be8]"> {d.hero.titleHighlight.split(' ')[0]}</span>
            <br />
            <span className="text-[#b58be8]">{d.hero.titleHighlight.split(' ')[1]}</span>
          </h1>

          <p className="max-w-3xl mx-auto text-gray-300 text-base sm:text-lg lg:text-xl mt-5 sm:mt-8 leading-7 sm:leading-9">
            {d.hero.paragraph}
          </p>

          <div className="flex justify-center gap-8 sm:gap-12 lg:gap-16 mt-10 sm:mt-14 flex-wrap">
            {d.hero.stats.map(({ emoji, label }) => (
                <div key={label} className="text-center">
                  <span className="text-2xl sm:text-3xl">{emoji}</span>
                  <p className="text-xs sm:text-sm text-gray-400 mt-2 sm:mt-3">{label}</p>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-24 lg:py-28">
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">{d.section.title}</h2>
          <div className="w-16 sm:w-20 h-1 bg-[#b58be8] mx-auto mt-5"></div>
          <p className="max-w-3xl mx-auto text-gray-400 mt-6 text-sm sm:text-base lg:text-lg">
            {d.section.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-14 sm:mt-16">
          {researchers.map((member) => (
            <div
              key={member.name}
              className="bg-[#17131f] border border-white/5 rounded-2xl p-6 flex flex-col items-center text-center hover:border-[#b58be8]/40 transition"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-4 border-[#2f2140]"
              />
              <h3 className="text-base sm:text-lg font-bold mt-5 leading-tight">{member.name}</h3>
              <p className="text-[#b58be8] text-xs mt-2 font-medium uppercase tracking-wide">{member.role}</p>
              <p className="text-gray-400 mt-4 leading-6 text-xs sm:text-sm flex-1">{member.desc}</p>
              <button
                onClick={() => navigate(`/profile/${member.id}`)}
                className="w-full mt-6 bg-[#1f1a2b] py-2.5 rounded-xl flex items-center justify-center gap-2 hover:bg-[#2a203a] text-xs sm:text-sm transition"
              >
                View Profile
                <FiArrowRight size={14} />
              </button>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 sm:mt-20 bg-[#17131f] border border-white/5 rounded-[24px] sm:rounded-[32px] py-16 sm:py-20 px-6 sm:px-12 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">{d.cta.title}</h2>
          <p className="max-w-2xl mx-auto text-gray-400 mt-5 text-sm sm:text-base lg:text-lg">{d.cta.desc}</p>
          <button onClick={() => navigate(d.cta.link)} className="mt-8 sm:mt-10 px-7 sm:px-8 py-3 sm:py-4 rounded-xl border border-[#b58be8] text-[#b58be8] hover:bg-[#b58be8] hover:text-black transition text-sm sm:text-base">
            {d.cta.btn}
          </button>
        </div>
      </section>
    </div>
  );
}
