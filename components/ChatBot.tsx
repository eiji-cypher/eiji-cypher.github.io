"use client";

import { useState, useRef, useEffect } from "react";
import {
  Bot,
  Sparkles,
  X,
  Send,
  ArrowRight,
  RefreshCw,
} from "lucide-react";

interface Message {
  id: string;
  sender: "bot" | "user";
  text: string;
  options?: { label: string; action: string }[];
  time: string;
}

const FAQ_KNOWLEDGE_BASE = [
  {
    keywords: ["sec", "bir", "register", "registration", "start business", "new business", "single proprietor", "corporation"],
    question: "How do I register a new business with SEC & BIR?",
    answer: "We handle complete end-to-end SEC and BIR registration! The process includes business name verification, preparation of Articles of Incorporation/Securities papers, BIR TIN & Certificate of Registration (COR) filing, and Mayor's permit assistance. Standard turnaround is 1–2 weeks.",
    ctaLabel: "Inquire Registration",
    ctaLink: "#contact",
  },
  {
    keywords: ["accounts", "monitoring", "bookkeeping", "reconciliation", "monthly", "financial", "accounting"],
    question: "What is included in Accounts Monitoring?",
    answer: "Our Accounts Monitoring service covers monthly bank and book reconciliation, BIR tax return compliance, preparation of financial statements, cash flow tracking, and quarterly financial health reviews for your business.",
    ctaLabel: "View Rates",
    ctaLink: "#rates",
  },
  {
    keywords: ["ipo", "trademark", "patent", "copyright", "intellectual property", "logo"],
    question: "How long does IPO trademark registration take?",
    answer: "Trademark filing with IPOPHL takes approximately 3 to 6 months for official examination and publication. Our team handles patent searches, classification, filing, and monitoring to protect your brand identity.",
    ctaLabel: "Inquire IP Protection",
    ctaLink: "#contact",
  },
  {
    keywords: ["rates", "price", "pricing", "cost", "fee", "how much", "starter", "professional", "enterprise"],
    question: "What are your service fees and payment terms?",
    answer: "Our Starter Package is ₱5,000 (one-time) for new business registration. The Professional Package is ₱12,000/year for full compliance & monitoring. Individual À La Carte services start at ₱1,500. We accept online bank transfers, GCash, and cash at our Dipolog office.",
    ctaLabel: "View Detailed Rates",
    ctaLink: "#rates",
  },
  {
    keywords: ["location", "address", "where", "office", "dipolog", "hours", "time", "open"],
    question: "Where is your office located and what are your hours?",
    answer: "Our office is located at Calibo St., Corner General Luna, Central Barangay, Dipolog City, Zamboanga Del Norte, Philippines. Hours: Monday – Friday: 8:00 AM – 5:00 PM | Saturday: 8:00 AM – 12:00 PM.",
    ctaLabel: "Get Map Directions",
    ctaLink: "#location",
  },
  {
    keywords: ["developer", "eiji", "eijidev", "who made", "creator", "web developer"],
    question: "Who developed this website & EIJI AI?",
    answer: "This website and EIJI AI assistant were custom engineered by EijiDev! EijiDev specializes in high-performance web applications, modern UI design, and AI integration.",
    ctaLabel: "View EijiDev QR Code",
    ctaLink: "#footer",
  },
];

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const initialMessage: Message = {
    id: "1",
    sender: "bot",
    text: "Hello! 👋 I'm EIJI AI, your Double V assistant. How can I help your business today? Choose a popular question below or type your inquiry:",
    time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    options: FAQ_KNOWLEDGE_BASE.map((faq) => ({
      label: faq.question,
      action: faq.question,
    })),
  };

  const [messages, setMessages] = useState<Message[]>([initialMessage]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const getTime = () => new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  const handleSendQuery = (userQuery: string) => {
    if (!userQuery.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: userQuery,
      time: getTime(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const lowerQuery = userQuery.toLowerCase();
      const matchedFaq = FAQ_KNOWLEDGE_BASE.find(
        (faq) =>
          faq.question.toLowerCase() === lowerQuery ||
          faq.keywords.some((kw) => lowerQuery.includes(kw))
      );

      let botResponseText = "";
      let ctaLabel = "";
      let ctaLink = "";

      if (matchedFaq) {
        botResponseText = matchedFaq.answer;
        ctaLabel = matchedFaq.ctaLabel;
        ctaLink = matchedFaq.ctaLink;
      } else {
        botResponseText =
          "Thank you for your question! For specific or custom requirements regarding business compliance in Dipolog City, our Senior Consultants are ready to assist you directly.";
        ctaLabel = "Inquire via Contact Form";
        ctaLink = "#contact";
      }

      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: "bot",
        text: botResponseText,
        time: getTime(),
        options: ctaLabel ? [{ label: ctaLabel, action: ctaLink }] : undefined,
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 600);
  };

  const handleOptionClick = (option: { label: string; action: string }) => {
    if (option.action.startsWith("#")) {
      const element = document.querySelector(option.action);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        setIsOpen(false);
      }
    } else {
      handleSendQuery(option.action);
    }
  };

  const handleResetChat = () => {
    setMessages([initialMessage]);
  };

  return (
    <>
      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-50">
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="group relative flex items-center gap-3 bg-gradient-to-r from-brand-navy via-brand-royal to-blue-600 hover:from-brand-royal hover:to-blue-500 text-white p-4 rounded-full shadow-2xl shadow-brand-royal/50 border border-white/20 transition-all duration-300 hover:scale-110 active:scale-95"
            aria-label="Open EIJI AI Chat"
          >
            <div className="relative">
              <Bot size={26} className="text-white" />
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
              </span>
            </div>
            <span className="hidden sm:inline font-montserrat text-xs font-bold tracking-wide pr-1">
              EIJI AI Support
            </span>
          </button>
        )}
      </div>

      {/* Chat Window Modal */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[92vw] sm:w-[400px] h-[550px] max-h-[85vh] bg-[#060728] border border-brand-royal/40 rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-fade-up">
          {/* Header */}
          <div className="bg-gradient-to-r from-brand-navy via-brand-royal to-brand-navy p-4 flex items-center justify-between border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
                <Bot size={22} className="text-white" />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-brand-navy" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-bebas text-white text-lg tracking-wider">EIJI AI</h3>
                  <Sparkles size={14} className="text-amber-400 animate-pulse" />
                </div>
                <p className="text-[10px] text-brand-silver/80 font-light">
                  Double V Assistant & Support
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleResetChat}
                title="Reset Conversation"
                className="p-2 text-brand-silver/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              >
                <RefreshCw size={16} />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                title="Close Chat"
                className="p-2 text-brand-silver/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Messages Body */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-gradient-to-b from-[#060728] to-[#0A1040] scrollbar-thin">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 text-xs sm:text-sm leading-relaxed ${
                    msg.sender === "user"
                      ? "bg-brand-royal text-white rounded-br-none shadow-md"
                      : "bg-white/10 text-white border border-white/10 rounded-bl-none backdrop-blur-md"
                  }`}
                >
                  <p>{msg.text}</p>

                  {/* CTA or Action Buttons inside Bot Message */}
                  {msg.options && (
                    <div className="mt-3 space-y-2 pt-2 border-t border-white/10">
                      {msg.options.map((opt) => (
                        <button
                          key={opt.label}
                          onClick={() => handleOptionClick(opt)}
                          className="w-full text-left text-xs bg-white/10 hover:bg-brand-royal hover:text-white text-brand-silver border border-white/10 rounded-xl px-3 py-2 transition-all flex items-center justify-between group font-medium"
                        >
                          <span className="line-clamp-2">{opt.label}</span>
                          <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform flex-shrink-0 ml-1 text-brand-royal group-hover:text-white" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <span className="text-[9px] text-brand-silver/50 mt-1 px-1">{msg.time}</span>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2 bg-white/10 border border-white/10 text-brand-silver text-xs rounded-2xl rounded-bl-none px-4 py-3 max-w-[120px]">
                <Bot size={14} className="text-brand-royal animate-spin" />
                <span>Thinking…</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Footer */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendQuery(input);
            }}
            className="p-3 bg-[#060728] border-t border-white/10 flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask EIJI AI a question…"
              className="flex-1 bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder:text-brand-silver/40 focus:outline-none focus:border-brand-royal focus:ring-1 focus:ring-brand-royal"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="w-10 h-10 rounded-xl bg-brand-royal hover:bg-blue-600 disabled:opacity-40 text-white flex items-center justify-center transition-all flex-shrink-0"
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
