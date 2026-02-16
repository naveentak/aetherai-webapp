import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Sparkles, X, Bot, User } from 'lucide-react';
import { chatWithAether } from '../services/geminiService';
import { Message } from '../types';

export const CourseChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: "Hello. I'm Aether, your AI workshop assistant. Ask me anything about the AI Mastery for Financial Services course." }
  ]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    const response = await chatWithAether(messages, userMsg);

    setMessages(prev => [...prev, { role: 'model', text: response || "Error connecting." }]);
    setLoading(false);
  };

  return (
    <>
      {/* Floating Toggle */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-btn-primary-bg text-btn-primary-text shadow-glow-soft hover:bg-btn-primary-hover flex items-center justify-center"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {isOpen ? <X size={24} /> : <Sparkles size={24} />}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-24 right-6 z-50 w-full max-w-sm rounded-2xl glass-panel shadow-2xl overflow-hidden flex flex-col h-[500px]"
          >
            {/* Header */}
            <div className="p-4 border-b border-overlay-10 flex items-center justify-between surface-glass-20">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="font-medium text-sm text-primary">Aether Intelligence</span>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.role === 'model' && (
                    <div className="w-8 h-8 rounded-full overlay-10 flex items-center justify-center shrink-0">
                      <Bot size={14} className="text-primary" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] rounded-2xl p-3 text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-btn-primary-bg text-btn-primary-text rounded-tr-none'
                        : 'overlay-5 text-secondary border border-overlay-5 rounded-tl-none'
                    }`}
                  >
                    {msg.text}
                  </div>
                  {msg.role === 'user' && (
                    <div className="w-8 h-8 rounded-full bg-btn-primary-bg flex items-center justify-center shrink-0">
                      <User size={14} className="text-btn-primary-text" />
                    </div>
                  )}
                </motion.div>
              ))}
              {loading && (
                <div className="flex items-center gap-2 text-muted text-xs ml-11">
                  <span className="w-1.5 h-1.5 bg-muted rounded-full animate-bounce" />
                  <span className="w-1.5 h-1.5 bg-muted rounded-full animate-bounce delay-75" />
                  <span className="w-1.5 h-1.5 bg-muted rounded-full animate-bounce delay-150" />
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="p-4 border-t border-overlay-10 surface-glass-40">
              <div className="relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about the course..."
                  className="w-full overlay-5 border border-overlay-10 rounded-full py-3 pl-4 pr-12 text-sm text-primary focus:outline-none focus:border-overlay-30 transition-colors placeholder:text-muted"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || loading}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full overlay-10 hover:bg-btn-primary-bg text-btn-primary-text transition-all disabled:opacity-30 disabled:hover:overlay-10 disabled:cursor-not-allowed"
                >
                  <Send size={14} className={input.trim() ? "text-btn-primary-text" : "text-secondary"} />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
