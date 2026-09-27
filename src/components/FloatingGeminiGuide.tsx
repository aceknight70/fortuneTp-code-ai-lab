import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  X,
  Send,
  Minimize2,
  Maximize2,
  Bot,
  User,
  HelpCircle,
  ShieldCheck,
  Code2,
  RefreshCw,
} from 'lucide-react';
import { CaiClass, CaiStudent } from '../types';

interface FloatingGeminiGuideProps {
  cls: CaiClass | null;
  student: CaiStudent | null;
  currentRoom: string;
}

interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: string;
}

export function FloatingGeminiGuide({ cls, student, currentRoom }: FloatingGeminiGuideProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    {
      id: 'init-1',
      role: 'model',
      content: `👋 Hello ${student?.full_name || 'there'}! I am Fortune's AI Guide, your digital coach at Fortune's Code & AI Lab (powered by FATap-CT). 

I'm here to help you understand ${
        cls?.programme === 'digital_technologies'
          ? 'JSS3 Digital Technologies (Cybersecurity, Secrets Lab ciphers, Networks & AI ethics)'
          : 'computational thinking, Python programming, and your weekly lab tasks'
      }. What can we explore together?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && !isMinimized) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isMinimized]);

  const isDT = cls?.programme === 'digital_technologies';

  const quickPrompts = isDT
    ? [
        'Explain the Caesar Cipher shift simply',
        'How does Phishing deceive people in Nigeria?',
        'Why is a 4-word passphrase stronger than password123?',
        'How does DNS find websites on the Internet?',
      ]
    : [
        'Explain variables in Python with an easy example',
        'What does an if/else condition do?',
        'Why is 4-space indentation required in Python?',
        'Give me a mini coding challenge to test my logic',
      ];

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query || loading) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      role: 'user',
      content: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const historyForApi = messages.slice(-5).map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const res = await fetch('/api/ai/guide', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          programme: cls?.programme || 'code_ai',
          tier: cls?.tier || 'jss',
          room: currentRoom,
          studentName: student?.full_name || 'Student',
          history: historyForApi,
        }),
      });

      if (!res.ok) throw new Error('Guide server error');
      const data = await res.json();

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        role: 'model',
        content: data.reply || "I'm right here with you! Let's break down this concept step-by-step.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch {
      const fallbackMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        role: 'model',
        content: isDT
          ? `In Digital Technologies, every concept connects to real life: whether it's shifting letters in the Secrets Lab, verifying HTTPS certificates, or stopping malware before it spreads. Head over to the Secrets Lab or Scheme of Work to explore further!`
          : `In Python, every command runs in sequential order from top to bottom. Remember to wrap text in quotes and indent code blocks with 4 spaces!`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleClearHistory = () => {
    setMessages([
      {
        id: `init-${Date.now()}`,
        role: 'model',
        content: `Chat history refreshed! How can I assist you with ${
          isDT ? 'Digital Technologies' : 'Python coding'
        } today?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-5 right-5 z-40">
        <button
          onClick={() => setIsOpen(true)}
          className="group flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#17182B] text-white shadow-xl hover:shadow-2xl border-2 border-[#F5A623] hover:scale-105 transition-all duration-200 cursor-pointer"
          aria-label="Open Fortune's AI Guide"
        >
          <div className="relative">
            <div className="w-7 h-7 rounded-full bg-[#F5A623] text-[#17182B] flex items-center justify-center font-bold">
              <Sparkles className="w-4 h-4 fill-current animate-pulse" />
            </div>
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-[#17182B]" />
          </div>
          <div className="text-left hidden sm:block">
            <div className="text-xs font-bold leading-tight flex items-center gap-1.5">
              <span>Fortune's AI Guide</span>
              <span className="text-[10px] px-1.5 py-0.2 bg-[#F5A623] text-[#17182B] font-black rounded">
                {isDT ? 'DT' : 'AI'}
              </span>
            </div>
            <div className="text-[10px] text-slate-300">Tap for instant tutor help</div>
          </div>
        </button>
      </div>
    );
  }

  return (
    <div
      className={`fixed bottom-4 right-4 z-50 transition-all duration-200 ${
        isMinimized ? 'w-72' : 'w-[92vw] sm:w-[380px] md:w-[410px]'
      }`}
    >
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-300 flex flex-col overflow-hidden max-h-[85vh]">
        {/* Header */}
        <div className="bg-[#17182B] text-white p-3.5 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-[#F5A623] text-[#17182B] flex items-center justify-center font-bold shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <div className="text-xs font-bold text-white flex items-center gap-1.5 truncate">
                <span>Fortune's AI Guide</span>
                <span className="text-[9px] px-1.5 py-0.2 bg-amber-400 text-slate-950 font-bold rounded-sm uppercase tracking-wider">
                  {isDT ? 'Digital Tech' : 'Code Lab'}
                </span>
              </div>
              <div className="text-[10px] text-slate-400 truncate">
                {cls ? `${cls.name} • ${currentRoom.toUpperCase()}` : 'Ready to help'}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1 shrink-0 text-slate-300">
            <button
              onClick={handleClearHistory}
              title="Reset conversation"
              className="p-1 hover:text-white hover:bg-white/10 rounded-md transition"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setIsMinimized((prev) => !prev)}
              className="p-1 hover:text-white hover:bg-white/10 rounded-md transition"
              aria-label={isMinimized ? 'Expand guide' : 'Minimize guide'}
            >
              {isMinimized ? <Maximize2 className="w-3.5 h-3.5" /> : <Minimize2 className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:text-white hover:bg-white/10 rounded-md transition"
              aria-label="Close guide"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        {!isMinimized && (
          <>
            {/* Quick Prompts Carousel */}
            <div className="p-2.5 bg-slate-50 border-b border-slate-200 overflow-x-auto flex gap-1.5 shrink-0">
              {quickPrompts.map((qp, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(qp)}
                  className="text-[11px] px-2.5 py-1 rounded-full bg-white border border-slate-200 hover:border-amber-400 hover:bg-amber-50 text-slate-700 whitespace-nowrap transition cursor-pointer font-medium"
                >
                  {qp}
                </button>
              ))}
            </div>

            {/* Message Stream */}
            <div className="flex-1 p-3.5 space-y-3 overflow-y-auto max-h-[360px] bg-slate-50/50">
              {messages.map((m) => {
                const isAI = m.role === 'model';
                return (
                  <div
                    key={m.id}
                    className={`flex items-start gap-2 ${isAI ? 'justify-start' : 'justify-end'}`}
                  >
                    {isAI && (
                      <div className="w-6 h-6 rounded-full bg-[#17182B] text-[#F5A623] flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                        <Bot className="w-3.5 h-3.5" />
                      </div>
                    )}
                    <div
                      className={`max-w-[85%] rounded-2xl p-3 text-xs leading-relaxed ${
                        isAI
                          ? 'bg-white text-slate-800 border border-slate-200 shadow-2xs rounded-tl-xs whitespace-pre-wrap font-sans'
                          : 'bg-[#17182B] text-white rounded-tr-xs font-sans'
                      }`}
                    >
                      {m.content}
                      <div
                        className={`text-[9px] mt-1.5 font-mono text-right ${
                          isAI ? 'text-slate-400' : 'text-slate-300'
                        }`}
                      >
                        {m.timestamp}
                      </div>
                    </div>
                    {!isAI && (
                      <div className="w-6 h-6 rounded-full bg-slate-300 text-slate-700 flex items-center justify-center shrink-0 mt-0.5">
                        <User className="w-3.5 h-3.5" />
                      </div>
                    )}
                  </div>
                );
              })}

              {loading && (
                <div className="flex items-center gap-2 text-slate-500 text-xs">
                  <div className="w-6 h-6 rounded-full bg-[#17182B] text-[#F5A623] flex items-center justify-center shrink-0">
                    <Sparkles className="w-3.5 h-3.5 animate-spin" />
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-slate-200 shadow-2xs flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#F5A623] animate-bounce" />
                    <span className="w-2 h-2 rounded-full bg-[#F5A623] animate-bounce [animation-delay:0.2s]" />
                    <span className="w-2 h-2 rounded-full bg-[#F5A623] animate-bounce [animation-delay:0.4s]" />
                    <span className="text-[11px] font-semibold text-slate-600 ml-1">
                      Fortune's AI is formulating guide notes...
                    </span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Bar */}
            <div className="p-3 border-t border-slate-200 bg-white">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={
                    isDT
                      ? 'Ask about ciphers, phishing, networks, passwords...'
                      : 'Ask about variables, conditionals, syntax...'
                  }
                  className="flex-1 text-xs p-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-[#F5A623] bg-slate-50 text-slate-800"
                />
                <button
                  onClick={() => handleSendMessage()}
                  disabled={!input.trim() || loading}
                  className="p-2.5 rounded-xl bg-[#17182B] hover:bg-slate-800 text-white disabled:opacity-40 transition shadow-xs cursor-pointer shrink-0"
                  aria-label="Send message"
                >
                  <Send className="w-3.5 h-3.5 text-[#F5A623]" />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
