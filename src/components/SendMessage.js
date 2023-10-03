import React, { useState } from "react";

const COHORT_NAME = "2302-ACC-PT-WEB-PT-B";
const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`;

function SendMessageForm({ postId, token }) {
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${BASE_URL}/posts/${postId}/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          message: {
            content: message,
          },
        }),
      });
      const result = await response.json();
      if (result.success) {
        alert("Message sent successfully!");
        setMessage("");
      } else {
        alert("Failed to send message: " + result.error.message);
      }
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea value={message} onChange={(e) => setMessage(e.target.value)} />
      <button type="submit">Send Message</button>
    </form>
  );
}

export default SendMessageForm;
