"use client";
import { useEffect, useState, useRef } from "react";
import io from "socket.io-client";

let socket: any;

export default function Messages() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [text, setText] = useState("");
  const [messages, setMessages] = useState<any[]>([]);
  const connectedRef = useRef(false);

  useEffect(() => {
    const SOCKET_URL = (process.env.NEXT_PUBLIC_SOCKET_URL as string) || "http://localhost:4000";
    socket = io(SOCKET_URL);

    socket.on("connect", () => {
      connectedRef.current = true;
      console.log("connected to socket", socket.id);
    });

    socket.on("message", (m: any) => {
      setMessages((prev) => [...prev, m]);
    });

    return () => {
      socket?.disconnect();
    };
  }, []);

  async function send() {
    if (connectedRef.current && socket) {
      socket.emit("message", { from, to, text });
    } else {
      await fetch("/api/messages/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ from, to, text })
      });
    }
    setText("");
  }

  async function loadConv() {
    const res = await fetch(`/api/messages/get?u1=${from}&u2=${to}`);
    const d = await res.json();
    setMessages(d.messages || []);
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Messages</h1>

      <input value={from} onChange={(e) => setFrom(e.target.value)} placeholder="You (user id)" className="border p-2 mb-2 w-full" />
      <input value={to} onChange={(e) => setTo(e.target.value)} placeholder="Other (user id)" className="border p-2 mb-2 w-full" />

      <div className="mb-2">
        <textarea value={text} onChange={(e) => setText(e.target.value)} className="border p-2 w-full mb-2" />
        <div className="flex gap-2">
          <button onClick={send} className="bg-blue-600 text-white p-2 rounded">Send</button>
          <button onClick={loadConv} className="bg-gray-200 p-2 rounded">Load</button>
        </div>
      </div>

      <div className="mt-4 space-y-2">
        {messages.map((m) => (
          <div key={m._id || Math.random()} className="p-3 bg-gray-100 rounded">
            <strong>{m.from}</strong> → <strong>{m.to}</strong>
            <div>{m.text}</div>
            <div className="text-xs text-gray-500">{new Date(m.createdAt).toLocaleString()}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
