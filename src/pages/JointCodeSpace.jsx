import { useLocation, useNavigate, useParams } from 'react-router-dom';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useSocket } from '@/contexts/SocketContext';
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useUserStore } from '@/stores/useUserStore';
import { api } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import EditorComponent from '@/components/codespace/Editor';
import ParticipentList from '@/components/codespace/ParticipentList';
import Chatbox from '@/components/codespace/ChatBox';

const languages = ['javascript', 'python', 'html', 'css', 'json', 'typescript'];

const JoinCodeSpace = () => {
    const [codeSpace, setCodeSpace] = useState(null);
    const [chatModalOpen, setChatModalOpen] = useState(false);
    const [editAllowed, setEditAllowed] = useState(false);

    const { codeSpaceId } = useParams();
    const { socket } = useSocket();
    const { toast } = useToast();
    const { user } = useUserStore();

    const navigate = useNavigate();
    const location = useLocation();
    const { access } = location.state || {};

    // edit status
    useEffect(() => {
        if (codeSpace?.participants) {
            const isEditor = codeSpace?.participants?.filter(p => p.user?._id === user?._id)[0]?.role === 'editor';
            const isInstructor = codeSpace?.instructor === user?._id

            setEditAllowed(isEditor || isInstructor)
        }

        const isKicked = codeSpace?.kickList?.filter(u => u.user === user?._id)
        if (isKicked?.length > 0) {
            toast({
                title: "You have been kicked from the code space",
                description: "You will be redirected to the codespace page",
                variant: "destructive"
            })
            navigate(-1);
        }

    }, [codeSpace])

    // auth 
    useEffect(() => {
        if (!user) {
            return navigate('/login')
        }
    }, [user])

    // prevent direct join without auth
    useEffect(() => {
        if (!access) {
            return navigate('/dashboard/codespace')
        }
    }, [access])

    // fetch data from api
    useEffect(() => {
        const fetchCodeSpaceDetails = async () => {
            const response = await api.get(`/codespace/get/${codeSpaceId}`)
            if (!response?.data?.success) {
                navigate(-1);
            }

            setCodeSpace(response?.data?.data)
        };
        fetchCodeSpaceDetails()
    }, [])

    // socket events 
    useEffect(() => {
        if (!socket || !user || !codeSpaceId) return;

        // join codespace
        socket.emit("joinCodingRoom", {
            roomId: codeSpaceId,
            userId: user._id,
        });

        // get participents update
        socket.on("participentsListUpdated", (participants) => {
            setCodeSpace((prev) => ({ ...prev, participants: participants }));
        });

        // get language update
        socket.on('languageChanged', (data) => {
            setCodeSpace((prev) => ({ ...prev, language: data?.language }))
        })

        // get editor type
        socket.on('editorTypeChanged', (data) => {
            setCodeSpace((prev) => ({ ...prev, editorType: data?.editorType }))
        })

        // get latest messages
        socket.on('receiveMessage', (data) => {
            setCodeSpace((prev) => ({ ...prev, chatMessages: [...prev.chatMessages, data] }))
        })

        // get code update
        socket.on("codeUpdated", (data) => {
            // don't update the local code to the writers editor
            if (data?.userId === user?._id) return;
            setCodeSpace((prev) => ({ ...prev, code: data.code }))
        })

        // get permissions update 
        socket.on('editStatusChanged', (data) => {
            setCodeSpace((prev) => ({ ...prev, participants: data }))
        })

        // get kicklist update
        socket.on('kickListUpdated', (data) => {
            setCodeSpace(prev => ({ ...prev, kickList: data }))
        })

        // Cleanup on unmount
        return () => {
            if (user?._id) {
                socket.emit("leaveCodingRoom", {
                    roomId: codeSpaceId,
                    userId: user._id,
                });
            }
            socket.off("participentsListUpdated");
            socket.off("languageChanged");
            socket.off("editorTypeChanged");
            socket.off("receiveMessage");
            socket.off("codeUpdated");
            socket.off("editStatusChanged");
            socket.off("kickListUpdated");
        };
    }, [socket, user?._id, codeSpaceId]);

    const changeLanguage = (language) => {
        socket.emit("changeLanguage", {
            roomId: codeSpaceId,
            userId: user._id,
            language,
        });
    }

    const handleEditorTypeChanged = (editorType) => {
        socket.emit("changeEditorType", {
            roomId: codeSpaceId,
            userId: user._id,
            editorType,
        });
    }

    const sendMessage = (message) => {
        socket.emit("sendMessageToCodingRoom", {
            roomId: codeSpaceId,
            userId: user._id,
            message,
        });
    }

    const handleCodeChange = (code) => {
        if(!editAllowed) return;

        socket.emit("updateCode", {
            roomId: codeSpaceId,
            userId: user._id,
            code,
        });
    }

    const handleAllowEditChange = (role, userId) => {
        socket.emit("toggleAllowEdit", {
            roomId: codeSpace?._id,
            status: role,
            userId,
            instructorId: user?._id
        });
    }

    const handleKickUser = (userId) => {
        socket.emit("kickUser", {
            roomId: codeSpace?._id,
            userId,
            instructorId: user?._id
        });
    }

    return (
        <div className='px-4 min-h-screen'>
            <div className='text-white min-h-screen flex flex-col pb-4'>
                <div className='flex justify-between items-center'>
                    <button
                        onClick={() => {
                            navigate(-1)
                        }}
                        className='text-dark-900 capitalize flex font-semibold text-xl items-center px-2 py-2 gap-x-3'
                    >
                        <MdOutlineKeyboardArrowLeft /> {codeSpace?.name || "CodeSpace"}
                    </button>

                    <div className='flex items-center gap-x-4'>

                        <Chatbox
                            codeSpaceMessages={codeSpace?.chatMessages}
                            sendMessage={sendMessage}
                            chatModalOpen={chatModalOpen}
                            setChatModalOpen={setChatModalOpen}
                        />

                        {/* editor type */}
                        <Select
                            disabled={!editAllowed}
                            value={codeSpace?.editorType}
                            onValueChange={(val) => handleEditorTypeChanged(val)}
                        >
                            <SelectTrigger className="w-[180px] my-4 border border-dark-600 text-dark-900">
                                <SelectValue placeholder="editorType" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value='simple'>Simple</SelectItem>
                                    <SelectItem value='diff'>Difference</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>

                        {/* language */}
                        <Select
                            disabled={!editAllowed}
                            value={codeSpace?.language}
                            onValueChange={(val) => changeLanguage(val)}
                        >
                            <SelectTrigger className="w-[180px] my-4 border border-dark-600 text-dark-900">
                                <SelectValue placeholder="Language" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {languages.map((lang, index) => (
                                        <SelectItem key={index} value={lang}>{lang}</SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className='grid grid-cols-12 place-items-stretch gap-x-5 flex-1'>
                    <EditorComponent
                        language={codeSpace?.language}
                        code={codeSpace?.code}
                        editorType={codeSpace?.editorType}
                        onChange={handleCodeChange}
                        readOnly={!editAllowed}
                    />

                    <div className='col-span-2'>
                        <ParticipentList
                            kickUser={handleKickUser}
                            isInstructor={codeSpace?.instructor?.toString() === user?._id}
                            handleAllowEditChange={handleAllowEditChange}
                            participants={codeSpace?.participants}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JoinCodeSpace;