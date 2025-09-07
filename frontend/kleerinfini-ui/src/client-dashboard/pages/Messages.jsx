import React, { useState, useEffect } from 'react';
import MessageBox from '../components/MessageBox';
import axios from 'axios';

// Icône Message
const MessageCircle = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
  </svg>
);

const ConversationCard = ({ conversation, onClick, isSelected }) => {
  return (
    <div 
      onClick={() => onClick(conversation)}
      className={`p-4 border-b border-gray-200 hover:bg-[#f5f2eb] cursor-pointer transition-colors duration-200 ${
        isSelected ? 'bg-[#f5f2eb] border-orange-400' : ''
      }`}
    >
      <div className="flex items-start gap-3">
        {/* Avatar */}
        <div className="w-12 h-12 rounded-full overflow-hidden bg-orange-100 flex items-center justify-center">
          <span className="text-lg font-bold text-orange-600">
            {conversation.name?.charAt(0) || "?"}
          </span>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-sm font-semibold text-gray-900 truncate">
              {conversation.name || "Utilisateur"}
            </h3>
            {conversation.unread > 0 && (
              <div className="bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                {conversation.unread > 9 ? "9+" : conversation.unread}
              </div>
            )}
          </div>
          <p className="text-sm text-gray-600 truncate pr-2">
            {conversation.lastMessage || "Dernier message..."}
          </p>
        </div>
      </div>
    </div>
  );
};

const Messages = () => {
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [showChat, setShowChat] = useState(false);

  // Charger conversations
  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/api/messages/");
        const formatted = res.data.map(msg => ({
          id: msg.id,
          name: msg.receiver?.email || "Utilisateur",
          lastMessage: msg.content,
          unread: msg.is_read ? 0 : 1,
          fullData: msg,
        }));
        setConversations(formatted);
      } catch (error) {
        console.error("Erreur chargement conversations", error);
      }
    };
    fetchConversations();
  }, []);

  const handleConversationClick = (conversation) => {
    setSelectedConversation(conversation);
    setShowChat(true);
  };

  const handleBackToList = () => {
    setShowChat(false);
    setSelectedConversation(null);
  };

  // Quand on est en mode chat → afficher MessageBox
  if (showChat) {
    return (
      <MessageBox
        conversation={selectedConversation}
        onBack={handleBackToList}
      />
    );
  }

  return (
    <div className="fixed top-[100px] left-64 right-0 bottom-0 bg-[#f5f2eb] overflow-y-auto">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <MessageCircle className="w-8 h-8 text-orange-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Messagerie</h1>
              <p className="text-gray-600">Discutez avec vos producteurs</p>
            </div>
          </div>

          {/* Bouton nouveau message */}
          <button
            onClick={() => {
              setSelectedConversation(null); // pas de conversation choisie
              setShowChat(true); // ouvrir MessageBox
            }}
            className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
          >
            + Nouveau message
          </button>
        </div>
      </div>

      {/* Liste conversations */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <div className="divide-y divide-gray-200 max-h-[600px] overflow-y-auto">
            {conversations.map((conversation) => (
              <ConversationCard
                key={conversation.id}
                conversation={conversation}
                onClick={handleConversationClick}
                isSelected={selectedConversation?.id === conversation.id}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
