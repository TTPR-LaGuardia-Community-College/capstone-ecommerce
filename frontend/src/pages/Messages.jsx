import React, { useEffect, useState } from 'react';
import api from '../api';

export default function Messages() {
  const [inbox, setInbox] = useState([]);
  const [sent, setSent] = useState([]);

  useEffect(() => {
    api.get('/messages/inbox').then(res => setInbox(res.data));
    api.get('/messages/sent').then(res => setSent(res.data));
  }, []);

  return (
    <div className="p-4 space-y-8">
      <section>
        <h2 className="text-xl font-bold mb-2">Inbox</h2>
        {inbox.map(m => (
          <div key={m.id} className="border-b py-2">
            <p><strong>From:</strong> {m.sender.username}</p>
            <p>{m.content}</p>
          </div>
        ))}
      </section>
      <section>
        <h2 className="text-xl font-bold mb-2">Sent</h2>
        {sent.map(m => (
          <div key={m.id} className="border-b py-2">
            <p><strong>To:</strong> {m.receiver.username}</p>
            <p>{m.content}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
