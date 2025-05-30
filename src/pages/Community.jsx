import React, { useEffect, useRef, useState } from "react";
import { IoSendSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useSocket } from "@/contexts/SocketContext";
import RoomList from "@/components/community/RoomList";
import { useUserStore } from "@/stores/useUserStore";
import { useToast } from "@/hooks/use-toast";
import { api, BASE_API_URL, getCloudinaryUrl } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";

const fetchMessageHistory = async (id) => {
  const response = await api.get(`${BASE_API_URL}/chat/messages/${id}`);
  return response?.data?.reverse();
};

const Community = () => {
  const { socket } = useSocket();
  const { user } = useUserStore();
  const { toast } = useToast();
  const [currentChatRoom, setCurrentChatRoom] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const chatScrollRef = useRef(null);
  const containerRef = useRef(null);
  const navigate = useNavigate();

  const { data, isPending } = useQuery({
    queryKey: ["messages", currentChatRoom?._id],
    queryFn: () => fetchMessageHistory(currentChatRoom?._id),
    enabled: !!currentChatRoom,
  });

  useEffect(() => {
    if (data) {
      setMessages(data);
    }
  }, [isPending, data]);

  // Auto scroll to latest message
  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (!socket) return;
    socket.connect();

    if (currentChatRoom) {
      socket.emit("joinGroup", currentChatRoom._id);

      const handleMessageReceive = (message) => {
        setMessages((prev) => [...prev, message]);
      };

      socket.on("receiveMessage", handleMessageReceive);
      return () => {
        socket.off("receiveMessage", handleMessageReceive);
      };
    }
  }, [socket, currentChatRoom]);

  const sendMessage = (e) => {
    e.preventDefault();

    if (!user) {
      navigate("/login");
      toast.error("Please login to send messages.");
      return;
    }

    if (!newMessage.trim()) return;

    const messageData = {
      sender: user._id,
      content: newMessage.trim(),
      roomId: currentChatRoom._id,
    };

    socket.emit("sendMessage", messageData);
    setNewMessage("");
  };

  return (
    <section
      ref={containerRef}
      className="flex gap-x-4 h-full"
    >
      <RoomList
        currentChatRoom={currentChatRoom}
        setCurrentChatRoom={setCurrentChatRoom}
      />


      <div className="w-full overflow-hidden">
        {
          currentChatRoom ? (
            <div className="flex flex-col h-[87vh] w-full border border-dark-500 bg-white rounded-md overflow-hidden overflow-y-auto">
              {/* Header */}
              <div className="px-4 py-2 border-b border-dark-500 bg-white flex-shrink-0">
                <h2 className="text-lg py-2 px-2 font-semibold">
                  {currentChatRoom?.name || "Room Name"}
                </h2>
              </div>

              {/* Scrollable Chat Area */}
              <div
                ref={chatScrollRef}
                className="overflow-y-auto flex-1 px-4 py-2 space-y-2 bg-gray-50"
              >
                {messages?.length > 0 ? messages.map((msg, i) => (
                  <Message key={i} message={msg} user={user} />
                )) : (
                  <div className="flex items-center justify-center h-full">
                    <p className="text-center text-gray-500">No messages yet.</p>
                  </div>
                )}
              </div>

              {/* Input Area */}
              <div className="border-t px-4 py-3 bg-white flex-shrink-0">
                <form onSubmit={sendMessage} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="flex-1 border px-3 py-2 rounded outline-none"
                    placeholder="Type your message..."
                  />
                  <button
                    type="submit"
                    className="bg-yellow-400 text-white p-2 rounded"
                  >
                    <IoSendSharp size={20} />
                  </button>
                </form>
              </div>
            </div>
          ) : (
            <div className="flex flex-col h-full w-full bg-white rounded-md border border-dark-500">
              <h4 className="py-4 px-4 font-medium text-lg border-b border-dark-500 w-full">
                Community Chat Guidelines
              </h4>
              <ul className="p-4 px-8 text-base space-y-2 list-inside list-disc">
                <li>Be respectful and polite to everyone in the community.</li>
                <li>Stay on topic — post in the appropriate channel.</li>
                <li>Avoid spamming or repetitive messages.</li>
                <li>Do not share personal or sensitive information.</li>
                <li>Use inclusive and professional language.</li>
                <li>Help others constructively — no mocking or belittling.</li>
                <li>Avoid off-topic promotions or self-advertisements.</li>
                <li>Report inappropriate behavior to moderators.</li>
                <li>Keep discussions healthy and educational.</li>
                <li>Follow DevNest's terms of use and community standards.</li>
              </ul>
            </div>
          )
        }
      </div>
    </section>
  );
};

const Message = ({ message, user }) => {
  const isOwnMessage = user?._id === message?.sender?._id;
  const time = new Date(message?.timestamp).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div
      className={`flex justify-start items-start gap-x-2 ${isOwnMessage ? "flex-row-reverse" : "flex-row justify-start"
        }`}
    >
      {/* {!isOwnMessage && ( */}
        <img
          src={getCloudinaryUrl(message?.sender?.image?.url, { width: 60, height: 60 })}
          alt="user"
          className="w-6 h-6 rounded-full border border-gray-600"
        />
      {/* )} */}

      <div className="bg-dark-100 max-w-sm px-4 py-1 rounded-lg text-dark-900 border border-dark-600">
        <p className="text-[8px] md:text-xs font-thin text-dark-800">
          {message?.sender?.firstName} {message?.sender?.lastName}
        </p>
        <p style={{ wordWrap: 'break-word', whiteSpace: 'pre-wrap' }} className="text-sm md:text-base my-1 font-medium">
          {message.content}
        </p>
        <p className="text-[10px] md:text-xs text-right text-dark-700">
          {time}
        </p>
      </div>
    </div>
  );
};

export default Community;