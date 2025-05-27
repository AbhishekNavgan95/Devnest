import { useUserStore } from "@/stores/useUserStore";
import { useState } from "react";
import { MdLockOutline } from "react-icons/md";
import { Button } from "../ui/button";
import { GoPeople } from "react-icons/go";
import { MdArrowRight, MdOutlineDelete } from "react-icons/md";
import ConfirmationModal from "../common/ConfirmationModal";
import InputField from "../common/InputField";
import { MdPassword } from "react-icons/md";
import { useToast } from "@/hooks/use-toast";

const CodeSpaceCard = ({ deleteCodeSpace, joinCodeSpace, data, isOwner }) => {

    const [modalData, setModalData] = useState(null)
    const [keyModal, setKeyModal] = useState(false);
    const [joiningToken, setJoiningToken] = useState("");

    const { user } = useUserStore();
    const { toast } = useToast();

    const isKicked = data?.kickList?.some((u) => u?.user?.toString() === user?._id)
    const isPrivate = data?.visibility === "private";

    const openKeyModal = () => {
        setKeyModal(true)
    }

    return (
        <div className='bg-white border border-dark-600 rounded-md p-4 mt-3'>
            <div className='flex flex-col items-start justify-between overflow-hidden gap-y-4 relative'>
                <span className='flex items-start justify-between w-full gap-x-4 relative'>
                    <p className='text-sm font-medium text-dark-900 capitalize line-clamp-2'>{data?.name}  </p>
                    {
                        isPrivate && (
                            <div className='text-sm mt-1 text-green-500  rounded-full'>
                                <MdLockOutline />
                            </div>
                        )
                    }
                </span>
                <div className='flex justify-between w-full gap-x-5 items-center text-lg'>
                    {
                        isOwner && (
                            <button className="text-base text-dark-900" onClick={() => setModalData({
                                heading: "Delete code space",
                                subheading: "Are you sure you want to delete this code space?",
                                onConfirm: () => {
                                    deleteCodeSpace(data?._id)
                                    setModalData(null)
                                },
                                onClose: () => setModalData(null)
                            })}>
                                <MdOutlineDelete />
                            </button>
                        )
                    }
                    <span className='flex items-center gap-x-1'>
                        <p className='flex gap-x-2 text-sm text-main-400 items-center font-medium'><span className='text-sm'>{data?.participants?.length || 0}</span> <GoPeople /></p>
                        {
                            isPrivate && !isOwner
                                ? <Button size='sm' variant='icon' className='text-xs font-medium text-main-400' onClick={openKeyModal} disabled={isKicked}>
                                    <span className='hidden md:block'>
                                        Join
                                    </span>
                                </Button>
                                : <Button size='sm' variant='icon' className='text-xs font-medium text-main-400' onClick={() => setModalData({
                                    heading: 'Join CodeSpace?',
                                    subheading: 'You will be redirected to another page',
                                    onConfirm: () => joinCodeSpace(data?._id),
                                    onClose: () => setModalData(null)
                                })} disabled={isKicked}>
                                    <span className='hidden md:block'>
                                        Join
                                    </span>
                                </Button>
                        }
                    </span>
                </div>
            </div>
            {
                modalData && <ConfirmationModal {...modalData} />
            }
            {
                keyModal && (
                    <div onClick={() => setKeyModal(false)} className="w-full h-full bg-black/40 backdrop-blur-sm fixed grid place-items-center top-0 left-0 z-[10]">
                        <div className="text-richblack-5 w-max bg-white border border-dark-600 min-w-[460px] rounded-lg" onClick={(e) => e.stopPropagation()}>
                            <form onSubmit={(e) => e.preventDefault()} className="flex flex-col py-8 px-8 items-center gap-y-7">
                                <div className="flex flex-col gap-2 items-start w-full">
                                    <h3 className="text-xl font-semibold text-start">Enter Invitation Token</h3>
                                    <p className="text-sm text-start">
                                        Enter Invitation token and submit to continue
                                    </p>
                                </div>
                                <div className='w-full'>
                                    <InputField
                                        type="text"
                                        icon={<MdPassword />}
                                        className='bg-richblack-700 w-full rounded-md p-2'
                                        placeholder='Enter security token'
                                        value={joiningToken}
                                        onChange={(e) => setJoiningToken(e.target.value)}
                                    />
                                </div>
                                <div className="flex justify-end w-full gap-x-4">
                                    <Button type='button' variant='outline' onClick={() => setKeyModal(false)}>Cancel</Button>
                                    <Button onClick={() => {
                                        if (!joiningToken) {
                                            toast({
                                                title: "Invalid token",
                                                description: "Please enter a valid token",
                                                variant: "destructive"
                                            })
                                        }
                                        joinCodeSpace(data?._id, joiningToken)
                                    }} >Submit</Button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
        </div >
    )
}

export default CodeSpaceCard