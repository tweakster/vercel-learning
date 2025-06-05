'use client'

import { useEffect, useState } from 'react';

export default function Home() {
  const [message, setMessage] = useState("Loading...");
  const messageApiUrl = process.env.NEXT_PUBLIC_MESSAGE_API_URL!;

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const res = await fetch(messageApiUrl);
        if (!res.ok) {
          setMessage('Fetch it yourself you lazy.....');
        }
        const data = await res.json();
        setMessage(data.message);
      } catch (error) {
        if (error instanceof Error) {
          setMessage(`Cannot fetch: ${error.message}`);
        } else {
          setMessage('That was weird');
        }
      }
    };

    fetchMessage();
  }, []);

  return (
      <div style={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center' }}>
        <h2>{message}</h2>
      </div>
  );
}
