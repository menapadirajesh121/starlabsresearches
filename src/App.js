import { BrowserRouter, Routes, Route, useLocation, useRouteError, Link } from "react-router-dom";
import { useEffect, Suspense, lazy } from "react";
import Layout from "./components/Layout";

const Home         = lazy(() => import("./pages/Home"));
const About        = lazy(() => import("./pages/About"));
const Research     = lazy(() => import("./pages/Research"));
const Blog         = lazy(() => import("./pages/Blog"));
const BlogPost     = lazy(() => import("./pages/BlogPost"));
const Contact      = lazy(() => import("./pages/Contact"));
const AdminPanel   = lazy(() => import("./pages/AdminPanel"));
const ResearchTeam = lazy(() => import("./pages/ResearchTeam"));
const Profile      = lazy(() => import("./pages/Profile"));

function PageLoader() {
  return (
    <div className="min-h-screen bg-[#0d0a14] flex flex-col items-center justify-center relative overflow-hidden">
      {/* star dots */}
      {[...Array(30)].map((_, i) => (
        <span key={i} className="absolute rounded-full bg-white/20 animate-pulse"
          style={{
            width:  Math.random() * 2 + 1 + "px",
            height: Math.random() * 2 + 1 + "px",
            top:    Math.random() * 100 + "%",
            left:   Math.random() * 100 + "%",
            animationDelay: Math.random() * 3 + "s",
            animationDuration: Math.random() * 2 + 2 + "s",
          }}
        />
      ))}

      {/* glow */}
      <div className="absolute w-72 h-72 rounded-full bg-purple-600/15 blur-[100px] pointer-events-none" />

      {/* logo + ring */}
      <div className="relative flex items-center justify-center mb-8">
        <span className="absolute w-20 h-20 rounded-full border-2 border-purple-400/20 border-t-purple-400 animate-spin" />
        <span className="absolute w-28 h-28 rounded-full border border-purple-400/10 border-b-purple-300/40 animate-spin" style={{ animationDuration: "2s", animationDirection: "reverse" }} />
        <img src="/faviion_logo.png" alt="StarLabs" className="w-10 h-10 object-contain" />
      </div>

      <p className="text-white font-bold text-lg tracking-wide">StarLabs</p>
      <p className="text-gray-500 text-xs mt-1 tracking-widest uppercase">Loading…</p>

      {/* progress bar */}
      <div className="mt-8 w-40 h-0.5 bg-white/5 rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-purple-500 to-cyan-400 rounded-full animate-[loading_1.6s_ease-in-out_infinite]" />
      </div>
    </div>
  );
}

function ErrorPage() {
  const error = useRouteError();
  const msg = error?.statusText || error?.message || "Something went wrong";
  return (
    <div className="min-h-screen bg-[#0d0a14] text-white flex flex-col items-center justify-center px-4 text-center">
      <p className="text-6xl mb-6">🌌</p>
      <h1 className="text-4xl font-bold mb-2">{error?.status === 404 ? "404" : "Oops"}</h1>
      <p className="text-gray-400 text-lg mb-8 max-w-md">
        {error?.status === 404 ? "This page drifted into the void." : msg}
      </p>
      <Link to="/" className="px-6 py-3 rounded-full bg-purple-500 hover:bg-purple-400 transition-colors font-medium text-sm">
        Back to Home
      </Link>
    </div>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route element={<Layout />} errorElement={<ErrorPage />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/research" element={<Research />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogPost />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/team" element={<ResearchTeam />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="*" element={<ErrorPage />} />
          </Route>
          <Route path="/admin" element={<AdminPanel />} errorElement={<ErrorPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
