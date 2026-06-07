import { useState, useEffect, useCallback } from "react";
import { FiEdit2, FiTrash2, FiPlus, FiX, FiLogOut, FiRefreshCw, FiBookOpen, FiFileText } from "react-icons/fi";

const API = "http://localhost:5000/api";

const inp  = "w-full bg-[#0e0a15] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-purple-400 transition-colors";
const btnP = "bg-purple-500 hover:bg-purple-600 text-white font-medium py-2.5 px-5 rounded-xl text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed";
const btnG = "bg-white/10 hover:bg-white/15 text-white font-medium py-2.5 px-5 rounded-xl text-sm transition-colors";

const BLOG_CATS     = ["Research Logs", "Academic Life", "Tutorials", "SpaceNews"];
const RESEARCH_TYPES = ["Preprint", "Journal Article", "Conference Paper", "Working Paper"];

const hdr = (token) => ({ "Content-Type": "application/json", Authorization: `Bearer ${token}` });

/* ─── Login ─────────────────────────────────────────── */
function Login({ onLogin }) {
  const [form, setForm]   = useState({ email: "", password: "" });
  const [err, setErr]     = useState("");
  const [busy, setBusy]   = useState(false);

  async function submit(e) {
    e.preventDefault();
    setErr(""); setBusy(true);
    try {
      const r = await fetch(`${API}/admin/login`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      const d = await r.json();
      if (!r.ok) return setErr(d.message);
      onLogin(d.token);
    } catch { setErr("Cannot reach server. Make sure the backend is running on port 5000."); }
    finally  { setBusy(false); }
  }

  return (
    <div className="min-h-screen bg-[#0e0a15] flex items-center justify-center px-4">
      <form onSubmit={submit} className="bg-[#17131f] border border-white/10 rounded-2xl p-8 w-full max-w-sm space-y-4">
        <div className="text-center mb-2">
          <p className="text-2xl font-bold">⭐ StarLabs</p>
          <p className="text-gray-400 text-sm mt-1">Admin Panel</p>
        </div>
        {err && <p className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-xl px-4 py-3">{err}</p>}
        <input className={inp} type="email"    placeholder="Email"    value={form.email}    onChange={e => setForm(f => ({ ...f, email:    e.target.value }))} required />
        <input className={inp} type="password" placeholder="Password" value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} required />
        <button className={`${btnP} w-full`} disabled={busy}>{busy ? "Logging in…" : "Login"}</button>
      </form>
    </div>
  );
}

/* ─── Stat Cards ─────────────────────────────────────── */
function Stats({ blogs, research }) {
  return (
    <div className="grid grid-cols-2 gap-4 mb-6">
      {[{ icon: <FiBookOpen size={18}/>, label: "Blog Posts",      val: blogs    },
        { icon: <FiFileText size={18}/>, label: "Research Items",  val: research }].map(s => (
        <div key={s.label} className="bg-[#17131f] border border-white/10 rounded-2xl p-5 flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-purple-500/15 flex items-center justify-center text-purple-300">{s.icon}</div>
          <div>
            <p className="text-2xl font-bold text-white">{s.val ?? "—"}</p>
            <p className="text-gray-400 text-xs mt-0.5">{s.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─── Seed Banner ────────────────────────────────────── */
function SeedBanner({ token, onDone }) {
  const [msg,  setMsg]  = useState("");
  const [busy, setBusy] = useState(false);

  async function seed() {
    if (!window.confirm("This will REPLACE all blog & research data with the original JSON seed data. Continue?")) return;
    setBusy(true); setMsg("");
    try {
      const r = await fetch(`${API}/seed`, { method: "POST", headers: hdr(token) });
      const d = await r.json();
      setMsg(d.message);
      onDone();
    } catch { setMsg("Seed failed — check backend."); }
    finally  { setBusy(false); }
  }

  return (
    <div className="bg-[#17131f] border border-white/10 rounded-2xl px-5 py-4 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
      <div>
        <p className="font-semibold text-sm flex items-center gap-2"><FiRefreshCw size={14}/> Seed Database</p>
        <p className="text-gray-500 text-xs mt-0.5">Reset & populate DB from the original JSON data files.</p>
        {msg && <p className="text-green-400 text-xs mt-1">{msg}</p>}
      </div>
      <button onClick={seed} disabled={busy} className={`${btnP} shrink-0 text-xs py-2 px-4`}>{busy ? "Seeding…" : "Run Seed"}</button>
    </div>
  );
}

/* ─── Blog Form Modal ────────────────────────────────── */
const emptyBlog = { slug: "", title: "", category: "Research Logs", excerpt: "", content: "", image: "", tags: "", readTime: "5 min read", date: "" };

function BlogForm({ token, editData, onClose, onSaved }) {
  const [form, setForm] = useState(() =>
    editData ? { ...editData, tags: editData.tags.join(", ") } : emptyBlog
  );
  const [msg,  setMsg]  = useState({ text: "", ok: true });
  const [busy, setBusy] = useState(false);

  const fld = (k) => (e) => setForm(p => ({ ...p, [k]: e.target.value }));

  async function save(e) {
    e.preventDefault();
    setBusy(true); setMsg({ text: "", ok: true });
    const body   = { ...form, tags: form.tags.split(",").map(t => t.trim()).filter(Boolean) };
    const url    = editData ? `${API}/blogs/${editData._id}` : `${API}/blogs`;
    const method = editData ? "PUT" : "POST";
    try {
      const r = await fetch(url, { method, headers: hdr(token), body: JSON.stringify(body) });
      const d = await r.json();
      if (!r.ok) return setMsg({ text: d.message, ok: false });
      onSaved();
      onClose();
    } catch { setMsg({ text: "Server error", ok: false }); }
    finally  { setBusy(false); }
  }

  return (
    <Modal title={editData ? "Edit Blog Post" : "New Blog Post"} onClose={onClose}>
      <form onSubmit={save} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Slug *">
          <input className={inp} placeholder="my-post-slug" value={form.slug} onChange={fld("slug")} required />
        </Field>
        <Field label="Title *">
          <input className={inp} placeholder="Post title" value={form.title} onChange={fld("title")} required />
        </Field>
        <Field label="Category *">
          <select className={inp} value={form.category} onChange={fld("category")}>
            {BLOG_CATS.map(c => <option key={c}>{c}</option>)}
          </select>
        </Field>
        <Field label="Read Time">
          <input className={inp} placeholder="8 min read" value={form.readTime} onChange={fld("readTime")} />
        </Field>
        <Field label="Date">
          <input className={inp} placeholder="October 14, 2023" value={form.date} onChange={fld("date")} />
        </Field>
        <Field label="Image URL">
          <input className={inp} placeholder="https://images.unsplash.com/..." value={form.image} onChange={fld("image")} />
        </Field>
        <Field label="Tags (comma separated)" full>
          <input className={inp} placeholder="DARKMATTER, PYTHON, COSMOLOGY" value={form.tags} onChange={fld("tags")} />
        </Field>
        <Field label="Excerpt *" full>
          <textarea className={`${inp} h-20 resize-none`} placeholder="Short summary shown in blog list…" value={form.excerpt} onChange={fld("excerpt")} required />
        </Field>
        <Field label="Content *" full>
          <textarea className={`${inp} h-44 resize-none`} placeholder="Full article content. Separate paragraphs with a blank line." value={form.content} onChange={fld("content")} required />
        </Field>
        <FormFooter msg={msg} busy={busy} label={editData ? "Update Post" : "Create Post"} onCancel={onClose} />
      </form>
    </Modal>
  );
}

/* ─── Research Form Modal ────────────────────────────── */
const emptyResearch = { title: "", desc: "", image: "", tags: "", author: "", doi: "", type: "Preprint", stack: "", featured: false };

function ResearchForm({ token, editData, onClose, onSaved }) {
  const [form, setForm] = useState(() =>
    editData
      ? { ...editData, tags: editData.tags.join(", "), stack: (editData.stack || []).join(", ") }
      : emptyResearch
  );
  const [msg,  setMsg]  = useState({ text: "", ok: true });
  const [busy, setBusy] = useState(false);

  const fld = (k) => (e) => setForm(p => ({ ...p, [k]: e.target.value }));

  async function save(e) {
    e.preventDefault();
    setBusy(true); setMsg({ text: "", ok: true });
    const body   = { ...form, tags: form.tags.split(",").map(t => t.trim()).filter(Boolean), stack: form.stack.split(",").map(t => t.trim()).filter(Boolean) };
    const url    = editData ? `${API}/research/${editData._id}` : `${API}/research`;
    const method = editData ? "PUT" : "POST";
    try {
      const r = await fetch(url, { method, headers: hdr(token), body: JSON.stringify(body) });
      const d = await r.json();
      if (!r.ok) return setMsg({ text: d.message, ok: false });
      onSaved();
      onClose();
    } catch { setMsg({ text: "Server error", ok: false }); }
    finally  { setBusy(false); }
  }

  return (
    <Modal title={editData ? "Edit Research" : "New Research Item"} onClose={onClose}>
      <form onSubmit={save} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Title *" full>
          <input className={inp} placeholder="Research title" value={form.title} onChange={fld("title")} required />
        </Field>
        <Field label="Author / Collaborator">
          <input className={inp} placeholder="Dr. Sarah Jenkins" value={form.author} onChange={fld("author")} />
        </Field>
        <Field label="Type">
          <select className={inp} value={form.type} onChange={fld("type")}>
            {RESEARCH_TYPES.map(t => <option key={t}>{t}</option>)}
          </select>
        </Field>
        <Field label="DOI">
          <input className={inp} placeholder="10.3847/2041-8213/acb123" value={form.doi} onChange={fld("doi")} />
        </Field>
        <Field label="Image URL">
          <input className={inp} placeholder="https://images.unsplash.com/..." value={form.image} onChange={fld("image")} />
        </Field>
        <Field label="Tags (comma separated)">
          <input className={inp} placeholder="Machine Learning, Cosmology" value={form.tags} onChange={fld("tags")} />
        </Field>
        <Field label="Tech Stack (comma separated)" full>
          <input className={inp} placeholder="Python, PyTorch, C++" value={form.stack} onChange={fld("stack")} />
        </Field>
        <Field label="Description *" full>
          <textarea className={`${inp} h-28 resize-none`} placeholder="Detailed description of this research…" value={form.desc} onChange={fld("desc")} required />
        </Field>
        <div className="sm:col-span-2 flex items-center gap-3">
          <input type="checkbox" id="feat" checked={form.featured} onChange={e => setForm(p => ({ ...p, featured: e.target.checked }))} className="w-4 h-4 accent-purple-500" />
          <label htmlFor="feat" className="text-sm text-gray-300 cursor-pointer">Mark as Featured <span className="text-gray-500 text-xs">(shown in Research hero section)</span></label>
        </div>
        <FormFooter msg={msg} busy={busy} label={editData ? "Update Research" : "Create Research"} onCancel={onClose} />
      </form>
    </Modal>
  );
}

/* ─── Blog Panel ─────────────────────────────────────── */
function BlogPanel({ token, onCountChange }) {
  const [posts,   setPosts]   = useState([]);
  const [form,    setForm]    = useState(null); // null = closed, {} = new, {...post} = edit
  const [delId,   setDelId]   = useState(null);

  const load = useCallback(async () => {
    try {
      const r = await fetch(`${API}/blogs?limit=200`);
      const d = await r.json();
      const list = d.posts || [];
      setPosts(list);
      onCountChange(list.length);
    } catch {}
  }, [onCountChange]);

  useEffect(() => { load(); }, [load]);

  async function del(p) {
    if (!window.confirm(`Delete "${p.title}"?`)) return;
    setDelId(p._id);
    await fetch(`${API}/blogs/${p._id}`, { method: "DELETE", headers: hdr(token) });
    setDelId(null);
    load();
  }

  return (
    <section>
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-xl font-bold">Blog Posts</h2>
          <p className="text-gray-500 text-xs mt-0.5">{posts.length} posts in database</p>
        </div>
        <button onClick={() => setForm({})} className={`${btnP} flex items-center gap-2`}><FiPlus size={13}/> New Post</button>
      </div>

      {form !== null && (
        <BlogForm
          token={token}
          editData={Object.keys(form).length ? form : null}
          onClose={() => setForm(null)}
          onSaved={load}
        />
      )}

      <div className="space-y-2.5">
        {posts.length === 0 && (
          <div className="text-center py-16 text-gray-500 bg-[#17131f] border border-white/5 rounded-2xl">
            <p className="text-3xl mb-3">📝</p>
            <p className="text-sm">No blog posts yet.</p>
            <p className="text-xs mt-1">Use "Run Seed" above to load all JSON data, or click "New Post".</p>
          </div>
        )}
        {posts.map(p => (
          <div key={p._id} className="flex items-center gap-3 bg-[#17131f] border border-white/10 rounded-xl px-4 py-3.5 hover:border-white/20 transition-colors">
            {p.image && <img src={p.image} alt="" className="w-12 h-12 rounded-xl object-cover shrink-0 hidden sm:block" onError={e => e.target.style.display = "none"} />}
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm truncate">{p.title}</p>
              <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                <span className="text-xs bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded-full">{p.category}</span>
                <span className="text-xs text-gray-500">{p.date}</span>
                <span className="text-xs text-gray-600">{p.readTime}</span>
                <span className="text-xs text-gray-600 truncate max-w-[200px]">/blog/{p.slug}</span>
              </div>
              <p className="text-xs text-gray-500 mt-0.5 truncate">{p.excerpt}</p>
            </div>
            <div className="flex gap-1.5 shrink-0">
              <button onClick={() => setForm(p)} className="p-2 rounded-xl border border-white/10 hover:border-purple-400 text-gray-400 hover:text-purple-300 transition-colors"><FiEdit2 size={13}/></button>
              <button onClick={() => del(p)} disabled={delId === p._id} className="p-2 rounded-xl border border-red-500/20 text-red-400 hover:bg-red-500/10 transition-colors disabled:opacity-40"><FiTrash2 size={13}/></button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── Research Panel ─────────────────────────────────── */
function ResearchPanel({ token, onCountChange }) {
  const [items,  setItems]  = useState([]);
  const [form,   setForm]   = useState(null);
  const [delId,  setDelId]  = useState(null);

  const load = useCallback(async () => {
    try {
      const r = await fetch(`${API}/research`);
      const d = await r.json();
      const list = Array.isArray(d) ? d : [];
      setItems(list);
      onCountChange(list.length);
    } catch {}
  }, [onCountChange]);

  useEffect(() => { load(); }, [load]);

  async function del(item) {
    if (!window.confirm(`Delete "${item.title}"?`)) return;
    setDelId(item._id);
    await fetch(`${API}/research/${item._id}`, { method: "DELETE", headers: hdr(token) });
    setDelId(null);
    load();
  }

  return (
    <section>
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-xl font-bold">Research Items</h2>
          <p className="text-gray-500 text-xs mt-0.5">{items.length} items in database</p>
        </div>
        <button onClick={() => setForm({})} className={`${btnP} flex items-center gap-2`}><FiPlus size={13}/> New Research</button>
      </div>

      {form !== null && (
        <ResearchForm
          token={token}
          editData={Object.keys(form).length ? form : null}
          onClose={() => setForm(null)}
          onSaved={load}
        />
      )}

      <div className="space-y-2.5">
        {items.length === 0 && (
          <div className="text-center py-16 text-gray-500 bg-[#17131f] border border-white/5 rounded-2xl">
            <p className="text-3xl mb-3">🔭</p>
            <p className="text-sm">No research items yet.</p>
            <p className="text-xs mt-1">Use "Run Seed" above to load all JSON data, or click "New Research".</p>
          </div>
        )}
        {items.map(item => (
          <div key={item._id} className="flex items-center gap-3 bg-[#17131f] border border-white/10 rounded-xl px-4 py-3.5 hover:border-white/20 transition-colors">
            {item.image && <img src={item.image} alt="" className="w-12 h-12 rounded-xl object-cover shrink-0 hidden sm:block" onError={e => e.target.style.display = "none"} />}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <p className="font-semibold text-sm">{item.title}</p>
                {item.featured && <span className="text-xs bg-orange-500/20 text-orange-300 px-2 py-0.5 rounded-full">★ Featured</span>}
              </div>
              <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                <span className="text-xs bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded-full">{item.type}</span>
                {item.author && <span className="text-xs text-gray-500">{item.author}</span>}
                {item.doi    && <span className="text-xs text-purple-400">DOI: {item.doi}</span>}
              </div>
              <div className="flex gap-1 mt-1 flex-wrap">
                {item.tags.slice(0, 4).map(t => <span key={t} className="text-xs bg-white/5 text-gray-400 px-2 py-0.5 rounded-full">{t}</span>)}
              </div>
            </div>
            <div className="flex gap-1.5 shrink-0">
              <button onClick={() => setForm(item)} className="p-2 rounded-xl border border-white/10 hover:border-purple-400 text-gray-400 hover:text-purple-300 transition-colors"><FiEdit2 size={13}/></button>
              <button onClick={() => del(item)} disabled={delId === item._id} className="p-2 rounded-xl border border-red-500/20 text-red-400 hover:bg-red-500/10 transition-colors disabled:opacity-40"><FiTrash2 size={13}/></button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── Shared helpers ─────────────────────────────────── */
function Modal({ title, onClose, children }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-start justify-center overflow-y-auto py-8 px-4" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="bg-[#17131f] border border-white/10 rounded-2xl w-full max-w-2xl">
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
          <h3 className="font-bold">{title}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors"><FiX size={18}/></button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

function Field({ label, full, children }) {
  return (
    <div className={`flex flex-col gap-1 ${full ? "sm:col-span-2" : ""}`}>
      <label className="text-xs text-gray-400">{label}</label>
      {children}
    </div>
  );
}

function FormFooter({ msg, busy, label, onCancel }) {
  return (
    <>
      {msg.text && (
        <p className={`sm:col-span-2 text-sm px-4 py-2.5 rounded-xl border ${msg.ok ? "bg-green-500/10 text-green-400 border-green-500/20" : "bg-red-500/10 text-red-400 border-red-500/20"}`}>
          {msg.text}
        </p>
      )}
      <div className="sm:col-span-2 flex gap-3">
        <button type="submit" disabled={busy} className={`${btnP} flex-1`}>{busy ? "Saving…" : label}</button>
        <button type="button" onClick={onCancel} className={btnG}>Cancel</button>
      </div>
    </>
  );
}

/* ─── Token hook ─────────────────────────────────────── */
function useToken() {
  const [token, setToken] = useState(() => localStorage.getItem("sl_admin") || "");
  return {
    token,
    save:  t  => { localStorage.setItem("sl_admin", t);  setToken(t); },
    clear: () => { localStorage.removeItem("sl_admin");  setToken(""); },
  };
}

/* ─── Admin Page ─────────────────────────────────────── */
export default function AdminPanel() {
  const { token, save, clear } = useToken();
  const [tab,       setTab]       = useState("blog");
  const [blogCount, setBlogCount] = useState(null);
  const [resCount,  setResCount]  = useState(null);
  const [reloadKey, setReloadKey] = useState(0);

  // Auto-seed check on first load
  useEffect(() => {
    if (!token) return;
    fetch(`${API}/seed/check`)
      .then(r => r.json())
      .then(d => { if (d.seeded) setReloadKey(k => k + 1); })
      .catch(() => {});
  }, [token]);

  if (!token) return <Login onLogin={save} />;

  return (
    <div className="min-h-screen bg-[#0e0a15] text-white">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#0e0a15]/90 backdrop-blur border-b border-white/10 px-6 py-4 flex items-center justify-between">
        <p className="font-bold text-lg">⭐ StarLabs Admin</p>
        <div className="flex items-center gap-2">
          {["blog", "research"].map(t => (
            <button key={t} onClick={() => setTab(t)} className={`text-sm px-4 py-1.5 rounded-full capitalize transition-colors ${tab === t ? "bg-purple-500 text-white" : "border border-white/10 hover:border-purple-400 text-gray-300"}`}>{t}</button>
          ))}
          <button onClick={clear} className="ml-3 text-gray-400 hover:text-red-400 transition-colors flex items-center gap-1.5 text-sm"><FiLogOut size={13}/> Logout</button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <Stats blogs={blogCount} research={resCount} />
        <SeedBanner token={token} onDone={() => setReloadKey(k => k + 1)} />

        {tab === "blog" && (
          <BlogPanel key={`blog-${reloadKey}`} token={token} onCountChange={setBlogCount} />
        )}
        {tab === "research" && (
          <ResearchPanel key={`res-${reloadKey}`} token={token} onCountChange={setResCount} />
        )}
      </main>
    </div>
  );
}
