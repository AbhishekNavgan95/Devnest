import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api, BASE_API_URL } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { BiLoaderCircle } from "react-icons/bi";

const RoomList = ({ currentChatRoom, setCurrentChatRoom }) => {

    const { data: rooms, isPending } = useQuery({
        queryKey: ["rooms"],
        queryFn: async () => {
            const response = await api.get(`${BASE_API_URL}/chat/rooms`)
            return response.data
        }
    })

    return (
        <div className="flex flex-col w-[480px] bg-white border border-dark-500 rounded-md">
            <h4 className="text-xl p-4 border-b border-dark-500 font-medium text-center">Community channels</h4>
            {
                isPending ? (
                    <div className="flex flex-col gap-y-1 p-2">
                        {
                            Array.from({ length: 7 }).map((_, i) => (
                                <div key={i} className="flex animate-pulse rounded-md items-center gap-2 p-4 bg-dark-50">
                                    <div className="w-10 h-2 rounded-full bg-richblack-200 animate-pulse"></div>
                                    <div className="w-32 h-4 rounded-full bg-richblack-200 animate-pulse"></div>
                                </div>
                            ))
                        }
                    </div>
                ) : (
                    <ul className="flex flex-col gap-y-1 p-2">
                        {
                            rooms.length > 0 ? rooms.map((Room) => (
                                <span
                                    key={Room?._id}
                                    onClick={() => setCurrentChatRoom(Room)} className={`${currentChatRoom?.name === Room.name ? "bg-main-400 text-dark-50 rounded-md text-richblack-900" : ""} py-2 px-4 cursor-pointer flex items-center gap-2 text-nowrap`}
                                >
                                    {Room.name}
                                </span>
                            )) : (
                                <div className="text-center text-sm h-[200px] flex items-center justify-center text-richblack-500">
                                    <p>
                                        No rooms available
                                    </p>
                                </div>
                            )
                        }
                    </ul>
                )
            }
        </div>
    );
};

export default RoomList;