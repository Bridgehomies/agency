"use client";

import { useState, useRef, useEffect, useCallback } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
  id: string;
}

const CACHE_KEY = "bh_chat_history";
const GREETED_KEY = "bh_greeted";
const MAX_CACHED = 40;

const OPENING_MESSAGE: Message = {
  role: "assistant",
  content:
    "Hey 👋 I'm Zara from Bridge Homies. What are you trying to build? I'm here to help you figure out the best path — from idea to launch.",
  id: "welcome",
};

// Helper: Generate robust unique IDs to prevent React key collisions
const generateId = () => 
  typeof crypto !== "undefined" && crypto.randomUUID
    ? crypto.randomUUID()
    : Date.now().toString(36) + Math.random().toString(36).substring(2);

function loadFromCache(): Message[] {
  if (typeof window === "undefined") return [OPENING_MESSAGE];
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return [OPENING_MESSAGE];
    const parsed: Message[] = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : [OPENING_MESSAGE];
  } catch {
    console.warn("Failed to load chat history, resetting to default.");
    return [OPENING_MESSAGE];
  }
}

function saveToCache(msgs: Message[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(msgs.slice(-MAX_CACHED)));
  } catch (err) {
    console.error("Failed to save chat history", err);
  }
}

function TypingIndicator() {
  return (
    <div className="bh-msg bh-msg--bot">
      <div className="bh-avatar-sm" aria-hidden="true">Z</div>
      <div className="bh-bubble bh-bubble--bot bh-typing">
        <span /><span /><span />
      </div>
    </div>
  );
}

function ChatMessage({ msg }: { msg: Message }) {
  const isBot = msg.role === "assistant";
  return (
    <div className={`bh-msg ${isBot ? "bh-msg--bot" : "bh-msg--user"}`}>
      {isBot && <div className="bh-avatar-sm" aria-hidden="true">Z</div>}
      <div className={`bh-bubble ${isBot ? "bh-bubble--bot" : "bh-bubble--user"}`}>
        {msg.content}
      </div>
    </div>
  );
}

export default function BridgeHomiesChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([OPENING_MESSAGE]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasNewMsg, setHasNewMsg] = useState(false);
  const [showGreeting, setShowGreeting] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // 1. Hydrate safely (prevents Next.js hydration mismatch errors)
  useEffect(() => {
    setMessages(loadFromCache());
    setHydrated(true);
  }, []);

  // 2. Greeting Logic
  useEffect(() => {
    if (!hydrated || open) return; // Don't greet if already open
    const alreadyGreeted = localStorage.getItem(GREETED_KEY);
    
    if (!alreadyGreeted) {
      const t = setTimeout(() => {
        setShowGreeting(true);
        setHasNewMsg(true);
        localStorage.setItem(GREETED_KEY, "1");
      }, 2500);
      return () => clearTimeout(t); // Cleanup memory leak
    }
  }, [hydrated, open]);

  // 3. Auto-hide greeting
  useEffect(() => {
    if (!showGreeting) return;
    const t = setTimeout(() => setShowGreeting(false), 6000);
    return () => clearTimeout(t);
  }, [showGreeting]);

  // 4. Auto-scroll to bottom
  useEffect(() => {
    if (open) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [messages, loading, open]);

  // 5. Focus management & greeting dismissal
  useEffect(() => {
    let focusTimeout: NodeJS.Timeout;
    if (open) {
      setHasNewMsg(false);
      setShowGreeting(false);
      // Ensure focus runs after rendering
      focusTimeout = setTimeout(() => inputRef.current?.focus(), 150);
    }
    return () => clearTimeout(focusTimeout);
  }, [open]);

  // 6. Return focus to input when loading finishes
  useEffect(() => {
    if (!loading && open) {
      inputRef.current?.focus();
    }
  }, [loading, open]);

  // 7. Persist to cache automatically
  useEffect(() => {
    if (hydrated) saveToCache(messages);
  }, [messages, hydrated]);

  const clearHistory = useCallback(() => {
    setMessages([OPENING_MESSAGE]);
    // Cache updates automatically via effect #7
  }, []);

  const send = useCallback(async () => {
    const text = input.trim();
    if (!text || loading) return;

    const userMsg: Message = {
      role: "user",
      content: text,
      id: generateId(),
    };

    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updatedMessages
            .filter((m) => m.id !== "welcome")
            .map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      if (!res.ok) throw new Error("API responded with an error");
      
      const data = await res.json();
      const botMsg: Message = {
        role: "assistant",
        content: data.message || "Something went wrong — please try again.",
        id: generateId(),
      };
      
      setMessages((prev) => [...prev, botMsg]);
      if (!open) setHasNewMsg(true);
      
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Network issue — give it another try.",
          id: generateId(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  }, [input, loading, messages, open]);

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  // Prevent UI rendering during SSR to avoid Next.js hydration errors entirely
  if (!hydrated) return null;

  return (
    <>
      <style>{`
        /* Styles remain completely unchanged to preserve your exact design */
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap');

        .bh-root {
          position: fixed;
          bottom: 28px;
          right: 28px;
          z-index: 9999;
          font-family: 'Space Grotesk', -apple-system, sans-serif;
        }

        .bh-fab {
          width: 60px;
          height: 60px;
          background: #7c3aed;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.15s, background 0.15s;
          position: relative;
          clip-path: polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px));
        }
        .bh-fab:hover { background: #6d28d9; transform: scale(1.06); }
        .bh-fab svg { width: 26px; height: 26px; color: #ffffff; }

        .bh-fab-face { display: flex; flex-direction: column; align-items: center; }
        .bh-fab-eyes { display: flex; gap: 7px; margin-bottom: 3px; }
        .bh-fab-eye {
          width: 7px; height: 7px;
          background: #ffffff; border-radius: 50%;
          transition: transform 0.25s;
        }
        .bh-fab:hover .bh-fab-eye { transform: scaleY(0.45); }
        .bh-fab-smile {
          width: 17px; height: 7px;
          border: 2.5px solid #ffffff;
          border-top: none;
          border-radius: 0 0 12px 12px;
        }

        .bh-badge {
          position: absolute;
          top: -5px; right: -5px;
          width: 18px; height: 18px;
          background: #f43f5e;
          clip-path: polygon(0 0, calc(100% - 4px) 0, 100% 4px, 100% 100%, 4px 100%, 0 calc(100% - 4px));
          display: flex; align-items: center; justify-content: center;
          font-size: 9px; font-weight: 700; color: white;
          font-family: 'Space Grotesk', sans-serif;
        }

        .bh-greeting {
          position: absolute;
          bottom: 74px; right: 0;
          background: #1c1a2e;
          border: 1px solid #2e2b4a;
          border-left: 3px solid #7c3aed;
          padding: 11px 14px;
          width: 226px;
          font-size: 13px;
          color: #e2e0f0;
          line-height: 1.45;
          animation: bhSlideUp 0.3s ease;
        }
        .bh-greeting strong { color: #a78bfa; }
        .bh-greeting::after {
          content: '';
          position: absolute;
          bottom: -7px; right: 18px;
          width: 10px; height: 10px;
          background: #1c1a2e;
          border-right: 1px solid #2e2b4a;
          border-bottom: 1px solid #2e2b4a;
          transform: rotate(45deg);
        }

        .bh-window {
          position: absolute;
          bottom: 78px; right: 0;
          width: 372px;
          height: 562px;
          background: #13111f;
          border: 1px solid #2e2b4a;
          border-bottom: 3px solid #7c3aed;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          transform-origin: bottom right;
          animation: bhPop 0.22s cubic-bezier(0.34,1.4,0.64,1);
          clip-path: polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0 calc(100% - 14px));
        }

        @keyframes bhPop {
          from { opacity: 0; transform: scale(0.88) translateY(10px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes bhSlideUp {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .bh-header {
          background: #1c1a2e;
          border-bottom: 1px solid #2e2b4a;
          padding: 13px 16px;
          display: flex;
          align-items: center;
          gap: 11px;
          flex-shrink: 0;
        }
        .bh-hav {
          width: 40px; height: 40px;
          background: #7c3aed;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          clip-path: polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px));
        }
        .bh-hav-face { display: flex; flex-direction: column; align-items: center; }
        .bh-hav-eyes { display: flex; gap: 5px; margin-bottom: 2px; }
        .bh-hav-eye { width: 5px; height: 5px; background: #ffffff; border-radius: 50%; }
        .bh-hav-smile {
          width: 13px; height: 6px;
          border: 2px solid #ffffff;
          border-top: none;
          border-radius: 0 0 8px 8px;
        }

        .bh-hinfo { flex: 1; min-width: 0; }
        .bh-hname {
          font-size: 12px; font-weight: 700;
          color: #ffffff;
          text-transform: uppercase; letter-spacing: 0.08em;
        }
        .bh-hsub {
          font-size: 11px; color: #6b6890;
          display: flex; align-items: center; gap: 5px;
          margin-top: 1px;
        }
        .bh-sdot {
          width: 6px; height: 6px;
          background: #a78bfa; border-radius: 50%;
          animation: bhPulse 2s infinite;
        }
        @keyframes bhPulse {
          0%,100% { opacity: 1; } 50% { opacity: 0.3; }
        }

        .bh-hbtns { display: flex; gap: 2px; }
        .bh-ibtn {
          background: none; border: 1px solid transparent;
          cursor: pointer; padding: 5px;
          color: #6b6890; transition: color 0.15s, border-color 0.15s;
          display: flex; align-items: center;
        }
        .bh-ibtn:hover { color: #a78bfa; border-color: #2e2b4a; }
        .bh-ibtn svg { width: 14px; height: 14px; }

        .bh-hbar {
          display: flex; align-items: center; justify-content: space-between;
          padding: 5px 14px;
          background: #100e1c;
          border-bottom: 1px solid #201d35;
          flex-shrink: 0;
        }
        .bh-hbar-txt {
          font-size: 10px; color: #4a4768;
          text-transform: uppercase; letter-spacing: 0.06em;
        }
        .bh-hbar-txt b { color: #a78bfa; font-weight: 600; }
        .bh-clrbtn {
          font-size: 10px; color: #4a4768;
          background: none; border: none; cursor: pointer;
          font-family: 'Space Grotesk', sans-serif;
          text-transform: uppercase; letter-spacing: 0.05em;
          transition: color 0.15s;
        }
        .bh-clrbtn:hover { color: #f43f5e; }

        .bh-msgs {
          flex: 1; overflow-y: auto;
          padding: 16px 14px;
          display: flex; flex-direction: column; gap: 12px;
          background: #13111f; min-height: 0;
        }
        .bh-msgs::-webkit-scrollbar { width: 3px; }
        .bh-msgs::-webkit-scrollbar-track { background: transparent; }
        .bh-msgs::-webkit-scrollbar-thumb { background: #2e2b4a; }

        .bh-msg { display: flex; align-items: flex-end; gap: 8px; }
        .bh-msg--user { justify-content: flex-end; }
        .bh-msg--bot  { justify-content: flex-start; }

        .bh-avatar-sm {
          width: 26px; height: 26px;
          background: #7c3aed; color: #ffffff;
          font-size: 10px; font-weight: 800;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; margin-bottom: 2px;
          clip-path: polygon(0 0, calc(100% - 5px) 0, 100% 5px, 100% 100%, 5px 100%, 0 calc(100% - 5px));
        }

        .bh-bubble {
          max-width: 78%; padding: 10px 13px;
          font-size: 13.5px; line-height: 1.6;
          word-break: break-word;
        }
        .bh-bubble--bot {
          background: #1c1a2e; color: #e2e0f0;
          border: 1px solid #2e2b4a;
          border-left: 2px solid #7c3aed;
          border-radius: 0 10px 10px 0;
        }
        .bh-bubble--user {
          background: #7c3aed; color: #ffffff;
          font-weight: 500;
          border-radius: 10px 0 0 10px;
          border-right: 2px solid #5b21b6;
        }

        .bh-typing {
          display: flex; align-items: center; gap: 5px;
          padding: 13px 14px; min-width: 58px;
        }
        .bh-typing span {
          width: 5px; height: 5px;
          background: #a78bfa;
          animation: bhDot 1.2s infinite ease-in-out;
        }
        .bh-typing span:nth-child(2) { animation-delay: 0.2s; }
        .bh-typing span:nth-child(3) { animation-delay: 0.4s; }
        @keyframes bhDot {
          0%,60%,100% { transform: scaleY(1); opacity: 0.4; }
          30% { transform: scaleY(2.2); opacity: 1; }
        }

        .bh-footer {
          padding: 11px 14px;
          background: #1c1a2e;
          border-top: 1px solid #2e2b4a;
          display: flex; gap: 8px; align-items: center;
          flex-shrink: 0;
        }
        .bh-input {
          flex: 1; background: #13111f;
          border: 1px solid #2e2b4a;
          padding: 9px 12px;
          font-size: 13px; outline: none;
          color: #e2e0f0;
          transition: border-color 0.15s;
          font-family: 'Space Grotesk', sans-serif;
          border-radius: 0;
        }
        .bh-input::placeholder { color: #4a4768; }
        .bh-input:focus { border-color: #7c3aed; }

        .bh-send {
          width: 40px; height: 40px;
          background: #7c3aed; border: none; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: background 0.15s, transform 0.1s;
          flex-shrink: 0;
          clip-path: polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px));
        }
        .bh-send:hover:not(:disabled) { background: #6d28d9; }
        .bh-send:active:not(:disabled) { transform: scale(0.91); }
        .bh-send:disabled { opacity: 0.25; cursor: not-allowed; }
        .bh-send svg { color: #ffffff; width: 16px; height: 16px; }

        .bh-powered {
          text-align: center; font-size: 10px;
          color: white; padding: 5px 0 7px;
          background: #1c1a2e; flex-shrink: 0;
          text-transform: uppercase; letter-spacing: 0.07em;
        }
        .bh-powered em { color: #a78bfa; font-style: normal; }

        @media (max-width: 420px) {
          .bh-window { width: calc(100vw - 24px); right: -4px; height: 510px; }
          .bh-root { bottom: 16px; right: 16px; }
        }
      `}</style>

      <div className="bh-root">
        {showGreeting && !open && (
          <div className="bh-greeting" role="status">
            <strong>Hey there 👋</strong><br />
            Got a project in mind? I'm Zara — let's figure out what you need to build.
          </div>
        )}

        {open && (
          <div className="bh-window" role="dialog" aria-label="Chat with Bridge Homies">
            <div className="bh-header">
              <div className="bh-hav" aria-hidden="true">
                <div className="bh-hav-face">
                  <div className="bh-hav-eyes">
                    <div className="bh-hav-eye" />
                    <div className="bh-hav-eye" />
                  </div>
                  <div className="bh-hav-smile" />
                </div>
              </div>
              <div className="bh-hinfo">
                <div className="bh-hname">Zara / Bridge Homies</div>
                <div className="bh-hsub">
                  <span className="bh-sdot" />
                  Online · Replies instantly
                </div>
              </div>
              <div className="bh-hbtns">
                <button className="bh-ibtn" onClick={clearHistory} title="New conversation" aria-label="Clear chat history">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="1 4 1 10 7 10" />
                    <path d="M3.51 15a9 9 0 1 0 .49-3.5" />
                  </svg>
                </button>
                <button className="bh-ibtn" onClick={() => setOpen(false)} aria-label="Close chat">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
            </div>

            {messages.length > 1 && (
              <div className="bh-hbar">
                <span className="bh-hbar-txt"><b>{messages.length - 1}</b> messages · saved locally</span>
                <button className="bh-clrbtn" onClick={clearHistory}>Clear ×</button>
              </div>
            )}

            <div className="bh-msgs" aria-live="polite" aria-label="Chat messages">
              {messages.map((msg) => (
                <ChatMessage key={msg.id} msg={msg} />
              ))}
              {loading && <TypingIndicator />}
              <div ref={bottomRef} />
            </div>

            <div className="bh-footer">
              <input
                ref={inputRef}
                className="bh-input"
                type="text"
                placeholder="Describe your project..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKey}
                disabled={loading}
                aria-label="Type your message"
                maxLength={1000}
              />
              <button
                className="bh-send"
                onClick={send}
                disabled={loading || !input.trim()}
                aria-label="Send message"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </button>
            </div>

            <div className="bh-powered">Powered by <em>Bridge Homies AI</em></div>
          </div>
        )}

        <button
          className="bh-fab"
          onClick={() => setOpen((p) => !p)}
          aria-label={open ? "Close chat" : "Chat with Zara"}
        >
          {open ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <div className="bh-fab-face" aria-hidden="true">
              <div className="bh-fab-eyes">
                <div className="bh-fab-eye" />
                <div className="bh-fab-eye" />
              </div>
              <div className="bh-fab-smile" />
            </div>
          )}
          {hasNewMsg && !open && (
            <span className="bh-badge" aria-label="New message">1</span>
          )}
        </button>
      </div>
    </>
  );
}