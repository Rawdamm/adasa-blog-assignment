import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="container notfound">
      <h1>404</h1>
      <h2>الصفحة غير موجودة</h2>
      <p>عذراً، الصفحة التي تبحث عنها غير موجودة أو تم نقلها.</p>
      <Link to="/" className="btn">العودة للرئيسية</Link>
    </div>
  );
}
