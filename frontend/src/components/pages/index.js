import { useState, useEffect } from "react";
import Post from "../blog/Post";

export default function Index() {
  const [posts, setPosts] = useState("");
  useEffect(() => {
    fetch("http://localhost:4000/post").then((response) => {
      response.json().then((posts) => {
        setPosts(posts);
      });
    });
  }, []);
  //prettier-ignore
  return (
  <>
    {posts.length > 0 && posts.map(post => (
      <Post {...post}/>
      ))};
  </>
  )
}
