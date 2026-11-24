import { Link } from "react-router-dom";
import { formatDate } from "../data/api.js";

export default function PostCard({ post, view = "grid" }) {
  return (
    <article className={`card ${view}`}>
      <Link to={`/blog/${post.slug}`} className="card-img">
        <img src={post.image} alt={post.title} loading="lazy" />
      </Link>
      <div className="card-body">
        <span className="badge">{post.category}</span>
        <h3><Link to={`/blog/${post.slug}`}>{post.title}</Link></h3>
        <p>{post.excerpt}</p>
        <div className="meta">
          <span>{post.author.name}</span>
          <span>{formatDate(post.date)}</span>
          <span>{post.readTime}</span>
        </div>
      </div>
    </article>
  );
}
