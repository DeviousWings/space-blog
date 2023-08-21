import React, { useState } from "react";
import { Navigate } from "react-router-dom";

import "react-quill/dist/quill.snow.css";
import Editor from "../blog/editor";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const [redirect, setRedirect] = useState(false);

  async function createNewPost(ev) {
    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("file", files);
    ev.preventDefault();
    try {
      const response = await fetch("http://localhost:4000/post", {
        method: "POST",
        body: data,
        credentials: "include",
      });

      if (!response.ok) {
        console.error("Response not OK:", response.status, response.statusText);
      } else {
        console.log("Post created successfully");
        setRedirect(true);
      }
    } catch (error) {
      console.error("Fetch Error:", error);
    }
  }

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <form onSubmit={createNewPost}>
      <div className="create-title">
        <h1>Create a post</h1>
      </div>

      <input
        className="title"
        type="title"
        placeholder={"Title"}
        value={title}
        onChange={(ev) => setTitle(ev.target.value)}
      />
      <input
        className="summary"
        type="summary"
        placeholder={"Summary"}
        value={summary}
        onChange={(ev) => setSummary(ev.target.value)}
      />
      <input
        type="file"
        className="file"
        name="file"
        onChange={(ev) => setFiles(ev.target.files[0])}
      />

      <Editor onChange={setContent} value={content} />

      <button>Create Post</button>
    </form>
  );
}
