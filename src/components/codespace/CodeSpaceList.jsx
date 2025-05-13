import { useNavigate } from "react-router-dom";
import CodeSpaceCard from "./CodeSpaceCard";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { api } from "@/lib/utils";


const CodeSpacesList = ({ user, data, loading }) => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { toast } = useToast()

    const { mutate, isPending } = useMutation({
        mutationFn: async (id) => {
            const response = await api.delete('/codespace/delete/' + id)
            return response?.data;
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries("codeSpaces")
        }
    })

    const deleteCodeSpace = async (id) => {
        mutate(id)
    }

    const joinCodeSpace = async (id, joiningToken) => {
        try {
            const response = await api.post('/codespace/join/' + id, { joiningToken })
            if (response?.data?.success) {
                navigate(`/code/${id}`, {
                    state: {
                        access: true,
                    }
                })
                toast({
                    title: "Joined code space",
                    description: "You have successfully joined the code space",
                })
            }
        } catch (error) {
            console.log("error joining room : ", error);
            toast({
                title: "Error joining code space",
                description: error?.response?.data?.message || "Something went wrong",
                variant: "destructive",
            })
        }
    }

    if (loading) {
        return (
            <div className='mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
                {
                    Array.from({ length: 8 }).map((_, i) => (
                        <div className="h-[120px] w-full bg-dark-200"></div>
                    ))
                }
            </div>
        )
    }

    if (!loading && data?.length === 0) {
        return (
            <div className='mt-8'>
                <p className='text-lg text-dark-800 text-center py-24'>No code spaces found</p>
            </div>
        )
    }

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 mt-4 w-full'>
            {
                data.map((codeSpace, index) => {
                    return (
                        <CodeSpaceCard joinCodeSpace={joinCodeSpace} deleteCodeSpace={deleteCodeSpace} key={codeSpace._id || index} isOwner={user?._id === codeSpace?.instructor?._id} data={codeSpace} />
                    )
                })
            }
        </div>
    )
}

export default CodeSpacesList