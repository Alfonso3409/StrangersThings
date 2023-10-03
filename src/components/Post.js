import React, { useState, useEffect } from "react";
import SendMessageForm from "./SendMessage";
import PostForm from "./PostForm";

const COHORT_NAME = "2302-ACC-PT-WEB-PT-B";
const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`;

async function fetchPosts(token) {
  const headers = token ? { Authorization: `Bearer ${token}` } : {};

  const response = await fetch(`${BASE_URL}/posts`, { headers });
  const data = await response.json();
  console.log("API Response:", data);
  return data.data.posts || [];
}

async function deletePost(postId, token) {
  const response = await fetch(`${BASE_URL}/posts/${postId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return data;
}

function Posts({ token }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function loadData() {
      try {
        const fetchedPosts = await fetchPosts(token);
        setPosts(fetchedPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    }
    loadData();
  }, [token]);

  function handleDelete(postId) {
    async function performDelete() {
      try {
        await deletePost(postId, token);
        setPosts(posts.filter((post) => post._id !== postId));
      } catch (error) {
        console.error("Error deleting post:", error);
      }
    }
    performDelete();
  }

  function handleNewPost(newPost) {
    setPosts((prevPosts) => [newPost, ...prevPosts]);
  }

  return (
    <div>
      <PostForm onPostCreate={handleNewPost} />
      {posts.map((post) => (
        <div key={post._id}>
          <h2>{post.title}</h2>
          <p>{post.description}</p>
          {post.isAuthor && token && (
            <button onClick={() => handleDelete(post._id)}>Delete Post</button>
          )}
          {token && <SendMessageForm postId={post._id} token={token} />}
        </div>
      ))}
    </div>
  );
}
export default Posts;
