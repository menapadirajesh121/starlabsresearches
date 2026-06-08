import { useNavigate } from "react-router-dom";
import {
  FiArrowRight,
  FiDatabase,
  FiCpu,
  FiRadio,
} from "react-icons/fi";
import researchers from "../data/researchersData.json";

export default function ResearchTeam() {
  const navigate = useNavigate();
  return (
    <div className="text-white">
      {/* HERO */}
      <section
        className="relative py-32 overflow-hidden"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1800')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* dark overlay */}
        <div className="absolute inset-0 bg-[#0f0c16]/80" />
        <div className="relative max-w-5xl mx-auto text-center px-6">
          <span className="inline-block px-4 py-2 rounded-full bg-[#342047] text-xs tracking-wider text-purple-200">
            Meet our Team
          </span>

          <h1 className="text-6xl md:text-7xl font-bold mt-8 leading-tight">
            Deciphering the
            <span className="text-[#b58be8]"> Cosmic</span>
            <br />
            <span className="text-[#b58be8]">Symphony</span>
          </h1>

          <p className="max-w-3xl mx-auto text-gray-300 text-xl mt-8 leading-9">
            We are a dedicated collective of researchers and data scientists
            pushing the boundaries of computational astrophysics.
          </p>

          <div className="flex justify-center gap-16 mt-14 flex-wrap">
            <div className="text-center">
              <FiRadio className="mx-auto text-[#b58be8]" size={24} />
              <p className="text-sm text-gray-400 mt-3">Observational Data</p>
            </div>
            <div className="text-center">
              <FiCpu className="mx-auto text-[#b58be8]" size={24} />
              <p className="text-sm text-gray-400 mt-3">Quantum Modeling</p>
            </div>
            <div className="text-center">
              <FiDatabase className="mx-auto text-[#b58be8]" size={24} />
              <p className="text-sm text-gray-400 mt-3">Big Data Analysis</p>
            </div>
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center">
          <h2 className="text-5xl font-bold">Meet Our Researchers</h2>
          <div className="w-20 h-1 bg-[#b58be8] mx-auto mt-6"></div>
          <p className="max-w-3xl mx-auto text-gray-400 mt-8 text-lg">
            Our diverse team brings together expertise from multiple disciplines
            to tackle the most complex questions of the universe.
          </p>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8 mt-20">
          {researchers.map((member) => (
            <div
              key={member.name}
              className="bg-[#17131f] border border-white/5 rounded-3xl p-8 text-center hover:border-[#b58be8]/40 transition"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-[#2f2140]"
              />
              <h3 className="text-3xl font-bold mt-8">{member.name}</h3>
              <p className="text-[#b58be8] text-sm mt-3 font-medium">{member.role}</p>
              <p className="text-gray-400 mt-6 leading-7 min-h-[80px]">{member.desc}</p>
              <button
                onClick={() => navigate(`/profile/${member.id}`)}
                className="w-full mt-8 bg-[#1f1a2b] py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-[#2a203a]"
              >
                View Profile
                <FiArrowRight />
              </button>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-24 bg-[#17131f] border border-white/5 rounded-[32px] py-20 px-8 text-center">
          <h2 className="text-4xl font-bold">Looking to collaborate?</h2>
          <p className="max-w-2xl mx-auto text-gray-400 mt-6 text-lg">
            We are always open to academic partnerships, guest lectures, and
            collaborative PhD research projects.
          </p>
          <button onClick={() => navigate("/contact")} className="mt-10 px-8 py-4 rounded-xl border border-[#b58be8] text-[#b58be8] hover:bg-[#b58be8] hover:text-black transition">
            Contact Our Lab
          </button>
        </div>
      </section>
    </div>
  );
}
