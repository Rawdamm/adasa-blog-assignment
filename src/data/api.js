import data from "./posts.json";

export const siteInfo = data.siteInfo;
export const posts = data.posts;

export const getPostBySlug = (slug) => posts.find((p) => p.slug === slug);

export const getCategories = () => {
  const map = {};
  posts.forEach((p) => (map[p.category] = (map[p.category] || 0) + 1));
  return Object.entries(map).map(([name, count]) => ({ name, count }));
};

export const formatDate = (iso) =>
  new Date(iso).toLocaleDateString("ar-EG", { year: "numeric", month: "long", day: "numeric" });
