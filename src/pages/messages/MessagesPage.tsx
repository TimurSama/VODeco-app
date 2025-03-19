import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChatIcon,
  UserGroupIcon,
  QuestionMarkCircleIcon,
  PaperAirplaneIcon,
  UserCircleIcon,
  XIcon,
} from '@heroicons/react/outline';
import { User } from '../../types/user';

interface Message {
  id: string;
  text: string;
  sender: string;
  timestamp: string;
  isOwn: boolean;
}

interface Chat {
  id: string;
  type: 'personal' | 'group' | 'support';
  name: string;
  avatar: string;
  lastMessage?: string;
  unread: number;
  messages: Message[];
}

const demoChats: Chat[] = [
  {
    id: '1',
    type: 'personal',
    name: 'Александр',
    avatar: '👨‍💼',
    lastMessage: 'Отличный проект!',
    unread: 2,
    messages: [
      {
        id: '1',
        text: 'Привет! Как дела с проектом?',
        sender: 'Александр',
        timestamp: '2024-03-10T10:00:00',
        isOwn: false,
      },
      {
        id: '2',
        text: 'Здравствуйте! Все идет по плану',
        sender: 'Вы',
        timestamp: '2024-03-10T10:01:00',
        isOwn: true,
      },
      {
        id: '3',
        text: 'Отличный проект!',
        sender: 'Александр',
        timestamp: '2024-03-10T10:02:00',
        isOwn: false,
      },
    ],
  },
  {
    id: '2',
    type: 'group',
    name: 'Команда VODeco',
    avatar: '👥',
    lastMessage: 'Новые обновления системы',
    unread: 5,
    messages: [
      {
        id: '1',
        text: 'Всем привет! У нас есть важные обновления',
        sender: 'Администратор',
        timestamp: '2024-03-10T09:00:00',
        isOwn: false,
      },
      {
        id: '2',
        text: 'Новые функции уже доступны',
        sender: 'Модератор',
        timestamp: '2024-03-10T09:01:00',
        isOwn: false,
      },
    ],
  },
  {
    id: '3',
    type: 'support',
    name: 'Поддержка',
    avatar: '🎯',
    lastMessage: 'Чем можем помочь?',
    unread: 0,
    messages: [
      {
        id: '1',
        text: 'Здравствуйте! Чем можем помочь?',
        sender: 'Поддержка',
        timestamp: '2024-03-10T08:00:00',
        isOwn: false,
      },
    ],
  },
];

const MessagesPage: React.FC = () => {
  const [chats] = useState<Chat[]>(demoChats);
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('current_user');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
  }, []);

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedChat) {
      const newMsg: Message = {
        id: Date.now().toString(),
        text: newMessage.trim(),
        sender: 'Вы',
        timestamp: new Date().toISOString(),
        isOwn: true,
      };

      selectedChat.messages.push(newMsg);
      selectedChat.lastMessage = newMessage.trim();
      setNewMessage('');
    }
  };

  const getChatIcon = (type: string) => {
    switch (type) {
      case 'personal':
        return <UserCircleIcon className="w-6 h-6" />;
      case 'group':
        return <UserGroupIcon className="w-6 h-6" />;
      case 'support':
        return <QuestionMarkCircleIcon className="w-6 h-6" />;
      default:
        return <ChatIcon className="w-6 h-6" />;
    }
  };

  return (
    <div className="h-full flex">
      {/* Список чатов */}
      <div className="w-1/3 border-r border-white/10">
        <div className="p-4 border-b border-white/10">
          <h2 className="text-xl font-semibold text-white">Сообщения</h2>
        </div>
        <div className="overflow-y-auto h-[calc(100vh-10rem)]">
          {chats.map((chat) => (
            <motion.div
              key={chat.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedChat(chat)}
              className={`p-4 cursor-pointer transition-colors ${
                selectedChat?.id === chat.id
                  ? 'bg-blue-500/20'
                  : 'hover:bg-white/5'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-2xl">
                  {chat.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="text-white font-medium truncate">{chat.name}</h3>
                    {chat.unread > 0 && (
                      <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                        {chat.unread}
                      </span>
                    )}
                  </div>
                  {chat.lastMessage && (
                    <p className="text-gray-400 text-sm truncate">
                      {chat.lastMessage}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Область чата */}
      <div className="flex-1 flex flex-col">
        {selectedChat ? (
          <>
            {/* Заголовок чата */}
            <div className="p-4 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-xl">
                  {selectedChat.avatar}
                </div>
                <div>
                  <h3 className="text-white font-medium">{selectedChat.name}</h3>
                  <p className="text-gray-400 text-sm">
                    {selectedChat.type === 'group' ? 'Групповой чат' : 
                     selectedChat.type === 'support' ? 'Техподдержка' : 
                     'Личные сообщения'}
                  </p>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setSelectedChat(null)}
                className="p-2 rounded-full hover:bg-white/10"
              >
                <XIcon className="w-6 h-6 text-gray-400" />
              </motion.button>
            </div>

            {/* Сообщения */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {selectedChat.messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[70%] rounded-xl p-3 ${
                      message.isOwn
                        ? 'bg-blue-500 text-white'
                        : 'bg-white/10 text-white'
                    }`}
                  >
                    <div className="text-sm mb-1">{message.sender}</div>
                    <div>{message.text}</div>
                    <div className="text-xs opacity-70 text-right mt-1">
                      {new Date(message.timestamp).toLocaleTimeString()}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Ввод сообщения */}
            <div className="p-4 border-t border-white/10">
              <div className="flex space-x-4">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Введите сообщение..."
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                  className="bg-blue-500 hover:bg-blue-600 disabled:opacity-50 text-white p-2 rounded-xl"
                >
                  <PaperAirplaneIcon className="w-6 h-6" />
                </motion.button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-400">
            <div className="text-center">
              <ChatIcon className="w-16 h-16 mx-auto mb-4 text-gray-600" />
              <p>Выберите чат для начала общения</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagesPage; 