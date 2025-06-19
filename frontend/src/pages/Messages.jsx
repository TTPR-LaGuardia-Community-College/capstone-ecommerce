import React, { useState, useEffect } from "react";
import api from "../api.js";
import "./Messages.css";

export default function Messages() {
  const [inbox, setInbox] = useState([]);
  const [sent, setSent]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState("");

  useEffect(() => {
    (async () => {
      try {
        const [inRes, sentRes] = await Promise.all([
          api.get("/messages/inbox"),
          api.get("/messages/sent"),
        ]);
        setInbox(inRes.data);
        setSent(sentRes.data);
      } catch (err) {
        setError("Failed to load messages");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <p>Loading messages…</p>;
  if (error)   return <p className="error">{error}</p>;

  return (
    <div className="messages-page">
      <section>
        <h2>Inbox</h2>
        {inbox.length === 0 && <p>No messages.</p>}
        {inbox.map((m) => (
          <article key={m.id} className="message-card">
            <header>
              From: <strong>{m.sender.username}</strong>
              <time>{new Date(m.createdAt).toLocaleString()}</time>
            </header>
            <p>{m.content}</p>
          </article>
        ))}
      </section>

      <section>
        <h2>Sent</h2>
        {sent.length === 0 && <p>You haven’t sent any.</p>}
        {sent.map((m) => (
          <article key={m.id} className="message-card">
            <header>
              To: <strong>{m.receiver.username}</strong>
              <time>{new Date(m.createdAt).toLocaleString()}</time>
            </header>
            <p>{m.content}</p>
          </article>
        ))}
      </section>
    </div>
  );
}
