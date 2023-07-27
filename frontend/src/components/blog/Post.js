import { format } from "date-fns";
import preview from "../images/base.jpg";

export default function Post({ title, summary, cover, content, createdAt }) {
  return (
    <div className="post">
      <div className="image">
        <img src={preview} alt="" />
      </div>
      <div className="blog">
        <h2>{title}</h2>
        <p className="info">
          <span className="author">{}/span>
          <time>{format(new Date(createdAt), "MMM d, yyyy HH:mm")}</time>
        </p>
        <p className="sum">{summary}</p>
      </div>
    </div>
  );
}
