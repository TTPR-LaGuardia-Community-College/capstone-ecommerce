import React, { useState, useEffect } from "react";

function Messages() {
  const [inbox, setInbox] = useState([]);
  const [sent, setSent] = useState([]);

  useEffect(() => {
    async function fetchMsgs() {
      try {
        const [inRes, sentRes] = await Promise.all([
          fetch(`${import.meta.env.VITE_API_URL}/messages/inbox`, {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          }),
          fetch(`${import.meta.env.VITE_API_URL}/messages/sent`, {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          }),
        ]);
        setInbox(await inRes.json());
        setSent(await sentRes.json());
      } catch (err) {
        console.error(err);
      }
    }
    fetchMsgs();
  }, []);

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Inbox</h1>
      {inbox.map((m) => (
        <div key={m.id} style={{ borderBottom: "1px solid #ddd", margin: "1rem 0" }}>
          <strong>From:</strong> {m.sender.username}<br/>
          <em>{new Date(m.createdAt).toLocaleString()}</em>
          <p>{m.content}</p>
        </div>
      ))}

      <h1>Sent</h1>
      {sent.map((m) => (
        <div key={m.id} style={{ borderBottom: "1px solid #ddd", margin: "1rem 0" }}>
          <strong>To:</strong> {m.receiver.username}<br/>
          <em>{new Date(m.createdAt).toLocaleString()}</em>
          <p>{m.content}</p>
        </div>
      ))}
    </div>
  );
}

export default Messages;
