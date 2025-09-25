import React, { useState, useEffect, useRef } from 'react';
import { FaPaperPlane, FaPaperclip } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const MessageBox = () => {
  const { t } = useTranslation();
  const messagesEndRef = useRef(null);

  // Messages de test
  const [messages, setMessages] = useState([
    { sender: 'producteur', content: "Bonjour, comment puis-je vous aider ?", type: 'text' },
    { sender: 'client', content: "Bonjour, j’ai une question sur votre produit.", type: 'text' }
  ]);

  const [newMessage, setNewMessage] = useState('');
  const [attachments, setAttachments] = useState([]);

  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      setMessages(prev => [...prev, { sender: 'client', content: newMessage, type: 'text' }]);
      setNewMessage('');
    }
  };

  const handleAttachmentChange = (e) => {
    const files = Array.from(e.target.files);
    files.forEach(file => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = () => {
          setMessages(prev => [...prev, { sender: 'client', content: reader.result, type: 'image' }]);
        };
        reader.readAsDataURL(file);
      } else {
        setAttachments(prev => [...prev, file]);
      }
    });
  };

  const renderMessageContent = (msg) => {
    if (msg.type === 'image') {
      return (
        <img
          src={msg.content}
          alt={t('messageBox.attachmentAlt')}
          className="max-w-xs rounded cursor-pointer hover:scale-105 transition-transform duration-200"
        />
      );
    }
    return <span>{msg.content}</span>;
  };

  // Scroll auto en bas
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col h-screen w-full bg-white fixed top-[100px] left-64  overflow-y-auto">
      
      {/* Zone messages */}
      <div className="flex-1 bg-gray-50 p-4 pt-20 overflow-y-auto">
        <div className="space-y-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.sender === 'client' ? 'justify-end pr-80' : 'justify-start pl-4'}`}
            >
              <div
                className={`p-3 rounded-lg max-w-[70%] break-words shadow-sm ${
                  msg.sender === 'client'
                    ? 'bg-orange-100 text-gray-800 rounded-br-none'
                    : 'bg-white text-gray-900 rounded-bl-none'
                }`}
              >
                {renderMessageContent(msg)}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Zone pièces jointes */}
      {attachments.length > 0 && (
        <div className="fixed bottom-16 left-64 right-4 px-4 py-2 text-sm text-gray-700 bg-white border-t shadow-lg z-20">
          {t('messageBox.attachmentsLabel')} {attachments.map((file, idx) => (
            <span key={idx}>
              {file.name}
              {idx < attachments.length - 1 ? ', ' : ''}
            </span>
          ))}
        </div>
      )}

      {/* Zone saisie */}
      <div className="fixed bottom-0 left-64 right-4 bg-white p-3 flex items-center gap-2 border-t shadow-lg z-30">
        <label className="cursor-pointer text-gray-500 hover:text-orange-500">
          <FaPaperclip className="text-xl" />
          <input
            type="file"
            multiple
            className="hidden"
            onChange={handleAttachmentChange}
          />
        </label>
        <input
          type="text"
          className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-orange-500"
          placeholder={t('messageBox.inputPlaceholder')}
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
        />
        <button
          onClick={handleSendMessage}
          className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
        >
          <FaPaperPlane />
        </button>
      </div>
    </div>
  );
};

export default MessageBox;
