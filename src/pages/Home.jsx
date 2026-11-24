import { Link } from "react-router-dom";
import { posts, siteInfo, getCategories } from "../data/api.js";
import PostCard from "../components/PostCard.jsx";

export default function Home() {
  const featured = posts.filter((p) => p.featured);
  const latest = posts.slice(0, 3);

  return (
    <>
      <section className="hero">
        <div className="container">
          <h1>{siteInfo.name}</h1>
          <h2>{siteInfo.tagline}</h2>
          <p>{siteInfo.description}</p>
          <Link to="/blog" className="btn">تصفح المدونة</Link>
        </div>
      </section>

      <section className="container section">
        <h2 className="title">مقالات مميزة</h2>
        <div className="grid">{featured.map((p) => <PostCard key={p.id} post={p} />)}</div>
      </section>

      <section className="container section">
        <h2 className="title">التصنيفات</h2>
        <div className="chips">
          {getCategories().map((c) => (
            <Link key={c.name} className="chip" to={`/blog?category=${encodeURIComponent(c.name)}`}>
              {c.name} ({c.count})
            </Link>
          ))}
        </div>
      </section>

      <section className="container section">
        <h2 className="title">أحدث المقالات</h2>
        <div className="grid">{latest.map((p) => <PostCard key={p.id} post={p} />)}</div>
      </section>
    </>
  );
}
