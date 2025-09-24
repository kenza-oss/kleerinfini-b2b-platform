// src/components/Messages.jsx
import React, { useState } from "react";

const Messages = ({ messages, setMessages }) => {
  const [selectedClient, setSelectedClient] = useState(null);
  const [input, setInput] = useState("");
  const [file, setFile] = useState(null);

  // Group by client
  const clients = [...new Set(messages.map((msg) => msg.sender))];

  const lastMessageForClient = (client) => {
    const msgs = messages.filter((m) => m.sender === client || m.sender === "Vous");
    return msgs[msgs.length - 1];
  };

  const unreadCount = (client) =>
    messages.filter((msg) => msg.sender === client && !msg.read).length;

  const sendMessage = (e) => {
    e.preventDefault();
    if (!input && !file) return;

    const newMsg = {
      id: Date.now(),
      sender: "Vous",
      message: input,
      file: file ? file.name : null,
      time: "À l’instant",
      read: true,
    };

    setMessages((prev) => [...prev, newMsg]);
    setInput("");
    setFile(null);
  };

  return (
    <div className="bg-image-light-beige rounded-2xl p-6 shadow-lg relative">
      <h2 className="text-xl font-bold mb-4">Inbox</h2>

      {clients.length === 0 ? (
        <p className="text-gray-500">Aucun message pour le moment.</p>
      ) : (
        <div className="space-y-2">
          {clients.map((client) => {
            const lastMsg = lastMessageForClient(client);
            return (
              <div
                key={client}
                className={`flex items-center justify-between p-4 rounded-xl cursor-pointer transition ${
                  unreadCount(client) > 0
                    ? "bg-white shadow-md border-l-4 border-image-orange"
                    : "bg-white hover:bg-gray-50"
                }`}
                onClick={() => setSelectedClient(client)}
              >
                {/* Avatar */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-image-orange text-white flex items-center justify-center font-bold">
                    {client.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-semibold text-image-dark-text">
                      {client}
                    </p>
                    <p className="text-sm text-gray-500 truncate max-w-[200px]">
                      {lastMsg?.message || "Nouveau message..."}
                    </p>
                  </div>
                </div>

                {/* Right side */}
                <div className="text-right">
                  <p className="text-xs text-gray-400">{lastMsg?.time}</p>
                  {unreadCount(client) > 0 && (
                    <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                      {unreadCount(client)}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ✅ Modal integrated */}
      {selectedClient && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl h-[80vh] flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="font-bold text-lg">{selectedClient}</h3>
              <button
                onClick={() => setSelectedClient(null)}
                className="text-gray-500 hover:text-image-orange"
              >
                ✖
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages
                .filter(
                  (msg) =>
                    msg.sender === selectedClient || msg.sender === "Vous"
                )
                .map((msg) => (
                  <div
                    key={msg.id}
                    className={`p-3 rounded-lg max-w-[70%] ${
                      msg.sender === "Vous"
                        ? "ml-auto bg-image-orange text-white"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    <p>{msg.message}</p>
                    {msg.file && (
                      <a href="#" className="text-xs underline block mt-1">
                        📎 {msg.file}
                      </a>
                    )}
                    <span className="block text-xs opacity-70 mt-1">
                      {msg.time}
                    </span>
                  </div>
                ))}
            </div>

            {/* Input */}
            <form
              onSubmit={sendMessage}
              className="flex items-center gap-2 p-4 border-t"
            >
              <input
                type="text"
                placeholder="Écrire un message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 border rounded-lg px-3 py-2"
              />
              <input
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
                className="hidden"
                id="fileUpload"
              />
              <label
                htmlFor="fileUpload"
                className="cursor-pointer px-3 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
              >
                📎
              </label>
              <button
                type="submit"
                className="px-4 py-2 bg-image-orange text-white rounded-lg hover:bg-image-dark-orange"
              >
                Envoyer
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Messages;
