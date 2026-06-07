export const API = "https://starlabsresearches.onrender.com/api";

let warmed = false;
export async function warmup() {
  if (warmed) return;
  try { await fetch(`${API}/ping`); warmed = true; } catch { /* ignore */ }
}
