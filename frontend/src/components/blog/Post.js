import { Link } from "react-router-dom";
import { format } from "date-fns";

export default function Post({
  _id,
  title,
  summary,
  cover,
  content,
  createdAt,
  author,
}) {
  const createdAtDate = createdAt ? new Date(createdAt) : new Date();
  return (
    <div className="post">
      <div className="image">
        <Link to={`/post/${_id}`}>
          <img src={"http://localhost:4000/" + cover} alt="" />
        </Link>
      </div>
      <div className="blog">
        <Link to={`/post/${_id}`}>
          <h2>{title}</h2>
        </Link>

        <p className="info">
          <span className="author">{author.username}</span>
          <time>{format(new Date(createdAtDate), "MMM d, yyyy HH:mm")}</time>
        </p>
        <p className="sum">{summary}</p>
      </div>
    </div>
  );
}
