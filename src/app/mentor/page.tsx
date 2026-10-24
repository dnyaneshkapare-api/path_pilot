"use client";

import React, { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { MentorMessage } from "@/types";
import {
  MessageSquareQuote,
  Send,
  ShieldCheck,
  Sparkles,
  Bot,
  User,
  AlertCircle
} from "lucide-react";

function MentorChatContent() {
  const searchParams = useSearchParams();
  const contextCareer = searchParams.get("career");
  const { user } = useApp();

  const [messages, setMessages] = useState<MentorMessage[]>([
    {
      id: "m-01",
      sender: "mentor",
      content: "Hello! I am your AI Career Mentor. I provide evidence-grounded education guidance strictly derived from verified records and official government datasets. I never hallucinate statistics and never push expensive commercial courses. How can I help you explore your studies or careers today?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userText = input.trim();
    setInput("");

    const newMsg: MentorMessage = {
      id: `msg-${Date.now()}`,
      sender: "user",
      content: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, newMsg]);

    try {
      setLoading(true);
      const res = await fetch("/api/v1/mentor/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userText,
          contextCareerId: contextCareer
        })
      });

      const data = await res.json();
      if (data.reply) {
        setMessages(prev => [
          ...prev,
          {
            id: `msg-reply-${Date.now()}`,
            sender: "mentor",
            content: data.reply,
            groundedCareers: data.groundedCareers,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
      }
    } catch (err) {
      console.error("Mentor chat error", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
            <MessageSquareQuote className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">
              AI Career Mentor
            </h1>
            <p className="text-xs text-slate-500">
              Grounded exclusively in verified government career records • Rate limited for quality
            </p>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40">
          <ShieldCheck className="w-4 h-4" />
          <span>No Commercial Ads</span>
        </div>
      </div>

      {/* Chat Messages Log */}
      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm min-h-[480px] max-h-[580px] overflow-y-auto flex flex-col space-y-4">
        {messages.map((m) => {
          const isUser = m.sender === "user";
          return (
            <div
              key={m.id}
              className={`flex items-start gap-3 max-w-[85%] ${
                isUser ? "self-end flex-row-reverse" : "self-start"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                  isUser
                    ? "bg-indigo-600 text-white"
                    : "bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300"
                }`}
              >
                {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div
                className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                  isUser
                    ? "bg-indigo-600 text-white"
                    : "bg-slate-50 dark:bg-slate-800/80 text-slate-800 dark:text-slate-200 border border-slate-100 dark:border-slate-800"
                }`}
              >
                <div className="whitespace-pre-wrap">{m.content}</div>
                <div className={`text-[10px] mt-2 ${isUser ? "text-indigo-200 text-right" : "text-slate-400"}`}>
                  {m.timestamp}
                </div>
              </div>
            </div>
          );
        })}

        {loading && (
          <div className="self-start flex items-center gap-2 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 text-xs text-slate-500">
            <Sparkles className="w-4 h-4 animate-spin text-indigo-500" />
            <span>Consulting verified knowledge repository...</span>
          </div>
        )}
      </div>

      {/* Chat Input */}
      <form onSubmit={handleSend} className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a question (e.g. What is the verified salary range and eligibility for Data Scientists?)"
          className="flex-1 px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="px-5 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-1.5 transition-colors disabled:opacity-50"
        >
          <Send className="w-4 h-4" />
          <span>Send</span>
        </button>
      </form>
    </div>
  );
}

export default function MentorPage() {
  return (
    <Suspense fallback={<div className="py-24 text-center text-sm text-slate-500">Loading AI Mentor...</div>}>
      <MentorChatContent />
    </Suspense>
  );
}
