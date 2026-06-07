import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FiArrowLeft, FiCalendar, FiClock } from "react-icons/fi";
import d from "../data/blogData.json";

const API = "http://localhost:5000/api";

export default function BlogPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const r = await fetch(`${API}/blogs/${id}`);
        if (r.ok) { setPost(await r.json()); }
        else      { setPost(d.posts.find(p => p.slug === id) || null); }
      } catch {
        setPost(d.posts.find(p => p.slug === id) || null);
      } finally { setLoading(false); }
    }
    load();
  }, [id]);

  if (loading) return (
    <div className="bg-[#0f0c16] text-white min-h-screen flex items-center justify-center text-gray-500">Loading…</div>
  );

  if (!post) return (
    <div className="bg-[#0f0c16] text-white min-h-screen flex flex-col items-center justify-center gap-4">
      <p className="text-4xl">🔭</p>
      <p className="text-xl font-semibold">Post not found</p>
      <button onClick={() => navigate("/blog")} className="text-purple-300 flex items-center gap-1 text-sm">
        <FiArrowLeft size={14}/> Back to Blog
      </button>
    </div>
  );

  return (
    <div className="bg-[#0f0c16] text-white min-h-screen">
      <div className="relative h-64 sm:h-80 md:h-96 overflow-hidden">
        <img src={post.image} alt={post.title} className="w-full h-full object-cover"/>
        <div className="absolute inset-0 bg-[#0f0c16]/70"/>
      </div>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <button onClick={() => navigate("/blog")} className="flex items-center gap-1.5 text-purple-300 text-sm mb-8 hover:gap-3 transition-all">
          <FiArrowLeft size={14}/> Back to Blog
        </button>
        <div className="flex items-center gap-3 flex-wrap mb-4">
          <span className="px-3 py-1 rounded-full bg-purple-300 text-black text-xs font-medium">{post.category}</span>
          <span className="flex items-center gap-1.5 text-xs text-gray-400"><FiCalendar size={11}/><time dateTime={post.date}>{post.date}</time></span>
          <span className="flex items-center gap-1.5 text-xs text-gray-400"><FiClock size={11}/>{post.readTime}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-snug">{post.title}</h1>
        <div className="flex gap-2 flex-wrap mt-4 mb-8">
          {post.tags.map(tag => <span key={tag} className="text-xs text-gray-500">#{tag}</span>)}
        </div>
        <div className="space-y-5 text-gray-300 text-base sm:text-lg leading-8">
          {post.content.split("\n\n").map((para, i) => <p key={i}>{para}</p>)}
        </div>
      </div>
    </div>
  );
}
