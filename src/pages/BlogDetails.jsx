import { Link, useParams } from "react-router-dom";
import { getPostBySlug, formatDate, posts } from "../data/api.js";
import NotFound from "./NotFound.jsx";

export default function BlogDetails() {
  const { slug } = useParams();
  const post = getPostBySlug(slug);
  if (!post) return <NotFound />;

  const related = posts.filter((p) => p.category === post.category && p.id !== post.id).slice(0, 3);

  return (
    <article className="container article">
      <Link to="/blog" className="back">→ العودة للمدونة</Link>
      <span className="badge">{post.category}</span>
      <h1>{post.title}</h1>
      <div className="author">
        <img src={post.author.avatar} alt={post.author.name} />
        <div>
          <strong>{post.author.name}</strong> <small>({post.author.role})</small>
          <div className="meta"><span>{formatDate(post.date)}</span><span>{post.readTime}</span></div>
        </div>
      </div>
      <img className="cover" src={post.image} alt={post.title} />

      <div className="content">
        {post.content.split("\n\n").map((block, i) =>
          block.startsWith("## ") ? <h2 key={i}>{block.slice(3)}</h2> : <p key={i}>{block}</p>
        )}
      </div>

      <div className="chips">
        {post.tags.map((t) => (
          <Link key={t} className="chip" to={`/blog?q=${encodeURIComponent(t)}`}>#{t}</Link>
        ))}
      </div>

      {related.length > 0 && (
        <>
          <h2 className="title">مقالات ذات صلة</h2>
          <ul className="related">
            {related.map((p) => <li key={p.id}><Link to={`/blog/${p.slug}`}>{p.title}</Link></li>)}
          </ul>
        </>
      )}
    </article>
  );
}
