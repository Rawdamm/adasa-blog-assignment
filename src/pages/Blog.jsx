import { useSearchParams } from "react-router-dom";
import { posts, getCategories } from "../data/api.js";
import PostCard from "../components/PostCard.jsx";

const PER_PAGE = 6;

export default function Blog() {
  const [params, setParams] = useSearchParams();
  const q = params.get("q") || "";
  const category = params.get("category") || "الكل";
  const view = params.get("view") === "list" ? "list" : "grid";

  const setParam = (key, value, def = "") => {
    const next = new URLSearchParams(params);
    value && value !== def ? next.set(key, value) : next.delete(key);
    if (key !== "page") next.delete("page");
    setParams(next, { replace: true });
  };

  const term = q.trim().toLowerCase();
  const filtered = posts.filter(
    (p) =>
      (category === "الكل" || p.category === category) &&
      (!term ||
        p.title.toLowerCase().includes(term) ||
        p.excerpt.toLowerCase().includes(term) ||
        p.tags.some((t) => t.toLowerCase().includes(term)))
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const page = Math.min(Math.max(parseInt(params.get("page"), 10) || 1, 1), totalPages);
  const visible = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const goToPage = (n) => {
    setParam("page", n === 1 ? "" : String(n));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="container section">
      <h1 className="title">المدونة</h1>

      <div className="toolbar">
        <input
          type="search"
          placeholder="ابحث عن تدوينة..."
          value={q}
          onChange={(e) => setParam("q", e.target.value)}
        />
        
        <select value={category} onChange={(e) => setParam("category", e.target.value, "الكل")}>
          <option value="الكل">كل التصنيفات</option>
          {getCategories().map((c) => (
            <option key={c.name} value={c.name}>{c.name} ({c.count})</option>
          ))}
        </select>
        <div className="views">
          <button className={view === "grid" ? "on" : ""} onClick={() => setParam("view", "grid", "grid")}>▦ شبكة</button>
          <button className={view === "list" ? "on" : ""} onClick={() => setParam("view", "list")}>☰ قائمة</button>
        </div>
      </div>

      <p className="count">{filtered.length} تدوينة</p>

      {filtered.length ? (
        <div className={view === "grid" ? "grid" : "list"}>
          {visible.map((p) => <PostCard key={p.id} post={p} view={view} />)}
        </div>
      ) : (
        <p className="empty">لا توجد نتائج مطابقة لبحثك.</p>
      )}

      {totalPages > 1 && (
        <div className="pagination" aria-label="pagination">
          <button disabled={page === 1} onClick={() => goToPage(page - 1)}>السابق</button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
            <button key={n} className={n === page ? "on" : ""} onClick={() => goToPage(n)}>
              {n}
            </button>
          ))}
          <button disabled={page === totalPages} onClick={() => goToPage(page + 1)}>التالي</button>
        </div>
      )}
    </div>
  );
}
