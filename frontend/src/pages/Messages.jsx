import React, { useState, useEffect } from "react";
import api from "../api.js";

function Messages() {
  const [inbox, setInbox] = useState([]);
  const [sent, setSent]   = useState([]);

  useEffect(() => {
    async function load() {
      try {
        const [inRes, sentRes] = await Promise.all([
          api.get("/messages/inbox"),
          api.get("/messages/sent"),
        ]);
        setInbox(inRes.data);
        setSent(sentRes.data);
      } catch (err) {
        console.error("Messages load failed", err);
      }
    }
    load();
  }, []);

  return (
    <div className="messages-page">
      <h1>Inbox</h1>
      {inbox.map((m) => (
        <div key={m.id} className="message-card">
          <strong>From:</strong> {m.sender.username}<br/>
          <em>{new Date(m.createdAt).toLocaleString()}</em>
          <p>{m.content}</p>
        </div>
      ))}

      <h1>Sent</h1>
      {sent.map((m) => (
        <div key={m.id} className="message-card">
          <strong>To:</strong> {m.receiver.username}<br/>
          <em>{new Date(m.createdAt).toLocaleString()}</em>
          <p>{m.content}</p>
        </div>
      ))}
    </div>
  );
}

export default Messages;
