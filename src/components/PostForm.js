import React, { useState } from "react";
import { makeHeaders } from "../components/Login";

const COHORT_NAME = "2302-ACC-PT-WEB-PT-B";
const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`;

function PostForm({ onPostCreate }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`${BASE_URL}/posts`, {
      method: "POST",
      headers: {
        ...makeHeaders(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        post: {
          title: title,
          description: description,
        },
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          onPostCreate(data.data);
        } else {
          console.error("Post creation failed:", data.error.message);
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit">Create Post</button>
    </form>
  );
}

export default PostForm;
