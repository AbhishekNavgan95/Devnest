import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import botLogo from "../../assets/images/chatbotlogo.png";
import ReactMarkdown from "react-markdown";
import { useAuthStore } from "@/stores/useAuthStore";
import { BASE_API_URL } from "@/lib/utils";

const allQuestions = [
    "What courses can I explore?",
    "Where's my progress tracked?",
    "How do I buy a course?",
    "What's Devnest all about?",
    "Where are my enrolled courses?",
    "Need help contacting support?",
    "How to reach my instructor?",
    "Is Devnest free to use?",
    "How to update my profile?",
    "Forgot password. What now?",
    "Can I rate a course?",
    "What are code spaces?",
    "How to join chat forums?",
    "What's new on Devnest?",
];

const ChatBot = () => {
    const [chatBotModalOpen, setChatBotModalOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [streaming, setStreaming] = useState(false);
    const [streamedResponse, setStreamedResponse] = useState("");
    const [randomQuestions, setRandomQuestions] = useState([]);
    const { token } = useAuthStore();

    useEffect(() => {
        shuffleQuestions();
    }, []);

    useEffect(() => {
        if (chatBotModalOpen) {
            document.body.classList.add("no-scroll");
        } else {
            document.body.classList.remove("no-scroll");
        }
    }, [chatBotModalOpen])

    const shuffleQuestions = () => {
        const shuffled = [...allQuestions].sort(() => 0.5 - Math.random());
        setRandomQuestions(shuffled.slice(0, 6)); // Show 4 random
    };

    useEffect(() => {
        if (chatBotModalOpen) {
            document.body.classList.add("no-scroll");
        } else {
            document.body.classList.remove("no-scroll");
        }

        // Clean up on unmount
        return () => document.body.classList.remove("no-scroll");
    }, [chatBotModalOpen]);

    const chatEndRef = useRef(null);
    const inputRef = useRef(null);

    useEffect(() => {
        if (chatBotModalOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [chatBotModalOpen]);

    useEffect(() => {
        if (chatEndRef.current) {
            chatEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages, streamedResponse]);

    const handleSend = async () => {
        if (!input.trim()) return;

        setMessages((prev) => [...prev, { role: "user", text: input }]);
        setStreamedResponse("");
        setStreaming(true);

        try {
            const response = await fetch(`${BASE_API_URL}/generate`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ message: input }),
            });

            const reader = response.body.getReader();
            const decoder = new TextDecoder("utf-8");

            let fullResponse = "";
            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                const chunk = decoder.decode(value);
                fullResponse += chunk;
                setStreamedResponse((prev) => prev + chunk);
            }

            setMessages((prev) => [...prev, { role: "bot", text: fullResponse }]);
        } catch (error) {
            console.error("Streaming error:", error);
            setMessages((prev) => [
                ...prev,
                { role: "bot", text: "Oops! Something went wrong. Please try again later." },
            ]);
        } finally {
            setStreaming(false);
            setInput("");
        }
    };

    const handleInputKeyDown = (e) => {
        if (e.key === "Enter") handleSend();
    };

    return (
        <>
            {/* Chatbot Toggle Button */}
            <button
                onClick={() => setChatBotModalOpen((prev) => !prev)}
                className="fixed rounded-full bg-dark-50 border-[6px] border-main-400 bottom-5 right-5 md:bottom-10 md:right-10 hover:scale-110 transition-all duration-100 z-[11]"
            >
                <img className="w-8 h-8 md:w-14 md:h-14 rounded-full" src={botLogo} alt="Chatbot" />
            </button>

            {/* Animated Chat Modal */}
            {chatBotModalOpen && (
                <div onClick={(e) => setChatBotModalOpen(false)} className='fixed inset-0 bg-black/40 backdrop-blur-sm z-[10]'>
                    <AnimatePresence>
                        <motion.div
                            onClick={(e) => e.stopPropagation()}
                            key="chatbot-modal"
                            initial={{ opacity: 0, y: 100, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, x: 350, y: 400, scale: 0 }}
                            transition={{ duration: 0.1, ease: "easeInOut" }}
                            className="w-full fixed bottom-20 right-6 md:bottom-32 md:right-12 z-40 max-w-[320px] md:max-w-[440px] lg:max-w-[600px] mx-auto p-2 md:p-4 bg-dark-50 border border-richblack-600 rounded-md shadow-xl"
                        >
                            {/* Chat history */}
                            <div className="bg-gray-100 p-4 rounded-md h-[450px] md:h-[500px] xl:h-[550px] space-y-2 overflow-y-auto mb-4">
                                {messages.length === 0 && (
                                    <div className="text-center h-full text-gray-500 flex items-center justify-center">
                                        <div className="flex items-center justify-center flex-col gap-y-4">

                                            <img src={botLogo} className="border border-dark-600 rounded-full w-12 h-12 sm:w-20 sm:h-20 md:w-32 md:h-32" alt="" />

                                            <div>
                                                <h4 className="text-2xl lg:text-4xl mb-4 font-semibold text-dark-900">Hello 👋,</h4>
                                                <h4 className="text-xl md:text-2xl font-medium text-dark-900"><span className="text-main-400">Nestor</span> in the Nest!</h4>
                                                <p className="text-base mt-2 text-center mx-auto text-dark-700">
                                                    Your go-to guide for exploring Devnest.
                                                </p>
                                            </div>

                                            <div className="grid md:grid-cols-2 gap-2">
                                                {randomQuestions.map((question, index) => (
                                                    <button
                                                        key={index}
                                                        className="bg-white border border-dark-600 text-black px-3 py-1 rounded-full hover:bg-main-400 hover:text-dark-50 text-xs transition"
                                                        onClick={() => setInput(question)}
                                                    >
                                                        {question}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {messages.map((msg, idx) => (
                                    <div key={idx} className={msg.role === "user" ? "text-right" : "text-left"}>
                                        <span
                                            className={`inline-block text-sm md:text-lg leading-6 md:leading-8 max-w-[500px] whitespace-pre-wrap px-3 py-1 md:py-2 rounded ${msg.role === "user"
                                                ? "bg-dark-300 text-dark-900"
                                                : "bg-dark-300 text-black"
                                                }`}
                                        >
                                            <ReactMarkdown
                                                components={{
                                                    a: ({ node, ...props }) => (
                                                        <a
                                                            {...props}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-main-400 underline break-all hover:text-main-700"
                                                        />
                                                    ),
                                                    code: ({ node, inline, className, children, ...props }) => {
                                                        return inline ? (
                                                            <code className="bg-dark-900 text-dark-100 px-1 py-0.5 rounded break-all">
                                                                {children}
                                                            </code>
                                                        ) : (
                                                            <pre className="bg-dark-900 text-dark-100 p-3 rounded-md overflow-auto text-sm whitespace-pre-wrap break-words">
                                                                <code {...props}>{children}</code>
                                                            </pre>
                                                        );
                                                    },
                                                    p: ({ node, ...props }) => (
                                                        <p className="break-words whitespace-pre-wrap">{props.children}</p>
                                                    ),
                                                }}
                                            >
                                                {msg.text}
                                            </ReactMarkdown>
                                        </span>
                                    </div>
                                ))}

                                {streaming && (
                                    <div className="text-left">
                                        <span className="inline-block text-sm md:text-lg leading-6 md:leading-8 whitespace-pre-wrap px-3 py-1 max-w-[500px] bg-white text-black rounded">
                                            <ReactMarkdown>{streamedResponse}</ReactMarkdown>
                                        </span>
                                    </div>
                                )}

                                {/* Scroll Anchor */}
                                <div ref={chatEndRef} />
                            </div>

                            {/* Input area */}
                            <div className="flex items-center gap-2">
                                <input
                                    type="text"
                                    value={input}
                                    ref={inputRef}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={handleInputKeyDown}
                                    placeholder="Test out what Nestor can do!"
                                    className="flex-1 p-2 border rounded"
                                />
                                <button
                                    onClick={handleSend}
                                    disabled={streaming}
                                    className="bg-main-400 text-dark-50 px-4 py-2 rounded disabled:opacity-50"
                                >
                                    Send
                                </button>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            )}
        </>
    );
};

export default ChatBot;