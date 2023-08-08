import { React, useState } from "react";
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
    data.set("files", files[0]);
    ev.preventDefault();
    const response = await fetch("http://localhost:4000/post", {
      method: "POST",
      body: data,
      credentials: "include",
    });
    if (response.ok) {
      setRedirect(true);
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
        className="file"
        type="file"
        // value={files}
        onChange={(ev) => setFiles(ev.target.files)}
      />

      <Editor onChange={setContent} value={content} />

      <button>Create Post</button>
    </form>
  );
}
