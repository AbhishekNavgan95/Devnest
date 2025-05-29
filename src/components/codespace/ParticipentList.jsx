import React, { useState } from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Switch } from '@/components/ui/switch'
import ConfirmationModal from '../common/ConfirmationModal'
import { Label } from '../ui/label'
import { getCloudinaryUrl } from '@/lib/utils'

const ParticipentList = ({
    participants,
    handleAllowEditChange,
    isInstructor,
    kickUser
}) => {

    // Handle null/undefined participants
    if (!participants || participants.length === 0) {
        return (
            <div className='rounded-md border-dark-600 h-full bg-dark-700'>
                <div className='flex flex-col h-full items-center px-4 justify-center w-full'>
                    <h4 className='text-base text-dark-100 text-center'>No Participants yet</h4>
                </div>
            </div>
        );
    }

    return (
        <div className='rounded-md border-dark-600 h-full bg-dark-700'>
            <div className='p-4 h-full'>
                <div className='grid grid-cols-1 xl:grid-cols-2 place-items-center gap-3'>
                    {participants.map((participant, index) => {
                        // Ensure participant and user data exists
                        if (!participant || !participant.user) {
                            console.warn("Invalid participant data:", participant);
                            return null;
                        }

                        return (
                            <UserCard
                                key={participant.user._id || index}
                                kickUser={kickUser}
                                isInstructor={isInstructor}
                                handleAllowEditChange={handleAllowEditChange}
                                participant={participant}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    )
}

const UserCard = ({
    participant,
    handleAllowEditChange,
    isInstructor,
    kickUser
}) => {
    const [modal, setModal] = useState(null);

    // Ensure we have valid user data
    if (!participant || !participant.user) {
        console.warn("UserCard received invalid participant data:", participant);
        return null;
    }

    // Handle both populated and unpopulated user objects
    const user = participant.user;
    const userId = user._id ? user._id : user; // Handle both populated and reference IDs
    const firstName = user.firstName || 'Unknown';
    const imageUrl = getCloudinaryUrl(user.image?.url, { width: 140, height: 140 }) || '/default-avatar.png'; // Use a default image if none exists

    const openModal = () => {
        setModal({
            heading: "Kick out user?",
            subheading: "Are you sure you want to kick out this user?",
            onConfirm: () => {
                kickUser(userId);
                setModal(null);
            },
            onClose: () => {
                setModal(null);
            }
        });
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div className={`select-none flex border px-4 aspect-square cursor-pointer p-2 rounded-md bg-dark-400 hover:bg-dark-500 transition-all duration-300 flex-col items-center justify-center w-full gap-x-2`}>
                    <img
                        className={`w-12 h-12 rounded-full border-4 ${participant.role === "editor" ? "border-red-500" : "border-yellow-200"}`}
                        src={imageUrl}
                        alt={firstName}
                        onError={(e) => {
                            // Fallback if image fails to load
                            e.target.src = '/default-avatar.png';
                        }}
                    />
                    <p className='text-xs mt-2'>{firstName}</p>
                </div>
            </DropdownMenuTrigger>

            {isInstructor && !modal && (
                <DropdownMenuContent className="p-2 z-[9] flex flex-col gap-y-2">
                    <div className='flex gap-x-2 items-center'>
                        <Switch
                            id={`editAllowed-${userId}`}
                            checked={participant.role === "editor"}
                            onCheckedChange={() => {
                                handleAllowEditChange(
                                    participant.role === "editor" ? "viewer" : "editor",
                                    userId
                                );
                            }}
                        />
                        <Label htmlFor={`editAllowed-${userId}`}>
                            Allow edit
                        </Label>
                    </div>
                    <button
                        onClick={openModal}
                        className="text-red-500 hover:text-red-600 font-medium"
                    >
                        Kick out
                    </button>
                </DropdownMenuContent>
            )}

            {modal && <ConfirmationModal {...modal} />}
        </DropdownMenu>
    );
};

export default ParticipentList;