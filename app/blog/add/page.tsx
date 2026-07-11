"use client";

import { ChangeEvent, useState } from "react";

interface Blog {
  name: string;
  description: string;
}

export default function add() {
  let defaultBlog: Blog = { name: "", description: "" };
  let [blog, setBlog] = useState(defaultBlog);

  function onBlogChange(
    x: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ): void {
    setBlog((prevState) => {
      return {
        ...prevState,
        [x.target.name]: x.target.value,
      };
    });
  }

  function submit(): void {
    let blob_str: string | null = localStorage.getItem("blog");
    let localBlogs: Blog[] = blob_str ? JSON.parse(blob_str) : [];
    localBlogs.push(blog);
    localStorage.setItem("blog", JSON.stringify(localBlogs));

    cancel();
  }

  function cancel(): void {
    setBlog(defaultBlog);
  }

  return (
    <div style={{ textAlign: "center" }}>
      <label>Add Blog</label>
      <br />
      <br />
      <label>Name:</label> &nbsp;{" "}
      <input
        style={{ border: "1px solid black" }}
        name="name"
        type="text"
        value={blog.name}
        onChange={onBlogChange}
      />
      <br />
      <label>Description:</label> &nbsp;{" "}
      <textarea
        style={{ border: "1px solid black" }}
        value={blog.description}
        name="description"
        onChange={onBlogChange}
      />
      <br />
      <br />
      <button type="button" onClick={cancel}>
        Cancel
      </button>{" "}
      &nbsp;
      <button type="button" onClick={submit}>
        Submit
      </button>
    </div>
  );
}
