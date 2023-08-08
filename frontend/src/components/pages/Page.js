import { useParams, Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { format } from "date-fns";
import { UserContext } from "../navigation/UserContext";
// import { Link } from "react-router-dom";

export default function Page() {
  const [postInfo, setPostInfo] = useState(null);
  const { userInfo } = useContext(UserContext);
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:4000/post/${id}`).then((response) => {
      response.json().then((postInfo) => {
        setPostInfo(postInfo);
      });
    });
  }, [id]);
  // if (!response.ok) {
  //   throw new Error("Failed to fetch post data");
  // }

  //     .then((posts) => {
  //       // Assuming the first post in the array is the most recent one
  //       if (posts.length > 0) {
  //         const mostRecentPost = posts[0];
  //         setPostInfo(mostRecentPost);
  //       } else {
  //         setPostInfo(null);
  //       }
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //       setPostInfo(null);
  //     });
  // }, [id]);
  // if (!postInfo) return "null";

  if (!postInfo) return "";

  const createdAtDate = postInfo.createdAt
    ? new Date(postInfo.createdAt)
    : new Date();

  return (
    <div className="center-content">
      <div className="posted">
        <h1 className="post-title">{postInfo.title}</h1>
        <span className="author">by @{postInfo.author.username} </span>
        <div className="time-wrapper">
          <time>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
              />
            </svg>
            {format(createdAtDate, "MMM d, yyyy HH:mm")}
          </time>
        </div>
        {userInfo.id === postInfo.author._id && (
          <div className="edit-row">
            <Link className="edit-btn" to={`/edit/${postInfo._id}`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                />
              </svg>
              Edit This Post
            </Link>
          </div>
        )}
        <div className="cover">
          <img src={`http://localhost:4000/${postInfo.cover}`} alt="" />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postInfo.content }} />
      </div>
    </div>
  );
}
