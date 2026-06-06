import React, { useState } from "react";
import {
  FiMail, FiMapPin, FiSend, FiDownload,
  FiBook, FiGithub, FiLinkedin, FiClock, FiAward,
} from "react-icons/fi";
import d from "../data/contactData.json";

const iconMap = { FiBook, FiAward, FiGithub, FiLinkedin, FiClock, FiMail };

/* ================= HERO ================= */
function Hero() {
  return (
    <section className="bg-gradient-to-br from-[#26143a] via-[#1f1030] to-[#180c26] py-14 sm:py-20 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* left-aligned */}
        <span className="inline-block px-4 py-1.5 rounded-full bg-purple-500/15 border border-purple-500/25 text-xs sm:text-sm text-purple-300 mb-5">
          {d.hero.badge}
        </span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight max-w-3xl">
          {d.hero.title}{" "}
          <span className="text-purple-300">{d.hero.highlight}</span>
          {" "}{d.hero.suffix}
        </h1>
        <p className="max-w-xl mt-5 text-sm sm:text-base md:text-lg text-gray-300 leading-7">
          {d.hero.paragraph}
        </p>
      </div>
    </section>
  );
}

/* ================= CONTACT FORM ================= */
function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [inquiry, setInquiry] = useState("");
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  function validate() {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required.";
    if (!form.email.trim()) e.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email.";
    if (!inquiry) e.inquiry = "Please select an inquiry type.";
    if (!form.message.trim()) e.message = "Message is required.";
    else if (form.message.trim().length < 20) e.message = "Message must be at least 20 characters.";
    return e;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    setSubmitted(true);
  }

  function field(name) {
    return {
      value: form[name],
      onChange: (e) => {
        setForm((f) => ({ ...f, [name]: e.target.value }));
        setErrors((er) => ({ ...er, [name]: "" }));
      },
    };
  }

  if (submitted) {
    return (
      <div className="bg-[#17131f] border border-white/5 rounded-2xl p-8 sm:p-10 mt-8 text-center">
        <p className="text-5xl mb-4">🚀</p>
        <h4 className="text-xl sm:text-2xl font-bold text-purple-300">{d.form.successTitle}</h4>
        <p className="text-gray-400 mt-2 text-sm sm:text-base">{d.form.successDesc}</p>
        <button
          onClick={() => { setSubmitted(false); setForm({ name: "", email: "", message: "" }); setInquiry(""); }}
          className="mt-6 border border-white/15 hover:border-white/30 transition-colors px-6 py-2.5 rounded-xl text-sm"
        >
          {d.form.resetBtn}
        </button>
      </div>
    );
  }

  return (
    <div className="bg-[#17131f] border border-white/5 rounded-2xl p-6 sm:p-8 mt-8">
      <h3 className="text-xl sm:text-2xl font-bold">{d.form.cardTitle}</h3>
      <p className="text-gray-400 mt-2 text-sm">{d.form.cardDesc}</p>

      <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-5">
        {/* Name + Email row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs sm:text-sm text-gray-300 mb-2">Name</label>
            <input
              type="text"
              placeholder="Carl Sagan"
              {...field("name")}
              className={`w-full bg-[#100d17] border rounded-xl px-4 py-3 outline-none text-sm transition-colors ${errors.name ? "border-red-400" : "border-white/10 focus:border-purple-400"}`}
            />
            {errors.name && <p className="text-red-400 text-xs mt-1.5">{errors.name}</p>}
          </div>
          <div>
            <label className="block text-xs sm:text-sm text-gray-300 mb-2">Email</label>
            <input
              type="email"
              placeholder="carl@cosmos.edu"
              {...field("email")}
              className={`w-full bg-[#100d17] border rounded-xl px-4 py-3 outline-none text-sm transition-colors ${errors.email ? "border-red-400" : "border-white/10 focus:border-purple-400"}`}
            />
            {errors.email && <p className="text-red-400 text-xs mt-1.5">{errors.email}</p>}
          </div>
        </div>

        {/* Inquiry Type */}
        <div>
          <label className="block text-xs sm:text-sm text-gray-300 mb-3">Inquiry Type</label>
          <div className="flex flex-wrap gap-2">
            {d.form.inquiryTypes.map((item) => (
              <button
                type="button"
                key={item}
                onClick={() => { setInquiry(item); setErrors((e) => ({ ...e, inquiry: "" })); }}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm border transition-colors ${inquiry === item ? "bg-purple-400 text-black border-purple-400 font-medium" : "border-white/10 hover:border-purple-400 hover:text-purple-300"}`}
              >
                {item}
              </button>
            ))}
          </div>
          {errors.inquiry && <p className="text-red-400 text-xs mt-1.5">{errors.inquiry}</p>}
        </div>

        {/* Message */}
        <div>
          <label className="block text-xs sm:text-sm text-gray-300 mb-2">Message</label>
          <textarea
            rows={5}
            placeholder="Tell me about your research goals or questions..."
            {...field("message")}
            className={`w-full bg-[#100d17] border rounded-xl px-4 py-3 outline-none resize-none text-sm transition-colors ${errors.message ? "border-red-400" : "border-white/10 focus:border-purple-400"}`}
          />
          {errors.message && <p className="text-red-400 text-xs mt-1.5">{errors.message}</p>}
        </div>

        <button type="submit" className="w-full bg-purple-400 hover:bg-purple-300 transition-colors text-black py-3 rounded-xl font-semibold flex items-center justify-center gap-2 text-sm sm:text-base">
          {d.form.submitBtn} <FiSend size={15} />
        </button>
      </form>
    </div>
  );
}

/* ================= INFO CARDS ================= */
function InfoCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
      {d.infoCards.map((card, i) => {
        const Icon = iconMap[card.icon] || FiAward;
        return (
          <div key={i} className="bg-[#17131f] border border-white/5 rounded-xl p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-lg bg-purple-500/10 flex items-center justify-center">
                <Icon className="text-purple-300" size={17} />
              </div>
              <h4 className="font-semibold text-sm sm:text-base">{card.title}</h4>
            </div>
            <p className="text-gray-400 text-xs sm:text-sm leading-5">{card.desc}</p>
          </div>
        );
      })}
    </div>
  );
}

/* ================= RIGHT SIDEBAR ================= */
function ContactSidebar() {
  return (
    <div className="space-y-5">

      {/* Academic footprint label */}
      <h3 className="uppercase tracking-widest text-xs text-gray-400">{d.footprint.label}</h3>

      {/* Links */}
      <div className="space-y-3">
        {d.footprint.links.map((link, i) => {
          const Icon = iconMap[link.icon] || FiBook;
          return (
            <div key={i} className="bg-[#17131f] border border-white/5 rounded-xl p-4 flex items-center gap-3 hover:border-white/15 transition-colors cursor-pointer">
              <div className="w-10 h-10 rounded-xl bg-[#241a32] flex items-center justify-center text-purple-300 shrink-0">
                <Icon size={15} />
              </div>
              <div className="min-w-0">
                <h4 className="font-medium text-sm">{link.title}</h4>
                <p className="text-xs text-gray-400 mt-0.5 truncate">{link.subtitle}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Current Station */}
      <div className="bg-[#2a173e] rounded-2xl p-6 border border-white/5">
        <div className="flex items-center gap-2.5 mb-5">
          <FiMapPin className="text-purple-300 shrink-0" size={17} />
          <h3 className="font-semibold text-base">{d.station.title}</h3>
        </div>
        <div className="space-y-1.5 text-sm text-gray-300">
          {d.station.lines.map((line, i) => (
            <p key={i} className={i === 0 ? "font-semibold text-white" : ""}>{line}</p>
          ))}
        </div>
        <div className="border-t border-white/10 mt-5 pt-5">
          <p className="text-xs uppercase tracking-wider text-gray-400 mb-3">{d.station.emailLabel}</p>
          <div className="flex items-center gap-2.5">
            <FiMail className="text-purple-300 shrink-0" size={15} />
            <span className="text-xs sm:text-sm break-all text-gray-200">{d.station.email}</span>
          </div>
        </div>
      </div>

      {/* CV card */}
      <div className="bg-purple-300 rounded-2xl p-5 text-black">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h3 className="font-bold text-lg sm:text-xl">{d.cv.title}</h3>
            <p className="text-xs mt-1 text-black/70">{d.cv.updated}</p>
          </div>
          <a
            href="/cv.pdf"
            download
            className="bg-[#17131f] text-white px-4 py-2.5 rounded-xl flex items-center gap-1.5 text-xs sm:text-sm shrink-0 hover:bg-[#251e35] transition-colors"
          >
            <FiDownload size={14} /> {d.cv.btn}
          </a>
        </div>
      </div>

    </div>
  );
}

/* ================= COMMUNITY BANNER ================= */
function Banner() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 sm:pb-14 md:pb-16 lg:pb-20">
      <div className="relative rounded-2xl lg:rounded-[32px] overflow-hidden h-[200px] sm:h-[260px] md:h-[320px]">
        <img src={d.banner.image} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8 md:p-10">
          <p className="uppercase tracking-widest text-xs text-gray-300 mb-2">{d.banner.eyebrow}</p>
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold max-w-lg leading-snug">{d.banner.title}</h2>
        </div>
      </div>
    </section>
  );
}

/* ================= PAGE ================= */
export default function Contact() {
  return (
    <div className="bg-[#0f0c16] text-white min-h-screen">
      <Hero />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 md:py-16 lg:py-20">
        {/* section intro — left aligned */}
        <div className="mb-10">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">{d.form.title}</h2>
          <p className="text-gray-400 mt-3 text-sm sm:text-base max-w-xl leading-7">{d.form.desc}</p>
        </div>

        {/* two-col grid: form left, sidebar right */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8 lg:gap-12 items-start">
          <div>
            <ContactForm />
            <InfoCards />
          </div>
          <div className="lg:sticky lg:top-24">
            <ContactSidebar />
          </div>
        </div>
      </section>

      <Banner />
    </div>
  );
}
