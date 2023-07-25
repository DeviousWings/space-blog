import React from "react";

export default function CreatePost() {
  return (
    <form>
      <input type="title" placeholder={"Title"} />
      <input type="summary" placeholder={"Summary"} />
      <input type="file" />
      <textarea name="" id="" cols="30" rows="10"></textarea>
    </form>
  );
}
