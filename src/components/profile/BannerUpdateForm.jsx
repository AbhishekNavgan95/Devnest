import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { MdOutlineCreate } from "react-icons/md";
import axios from 'axios';
import { api, BASE_API_URL } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { useAuthStore } from '@/stores/useAuthStore';
import { useUserStore } from '@/stores/useUserStore';

const BannerUpdateForm = ({
    userProfilePicture,
}) => {

    const [formOpen, setFormOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [previewImage, setPreviewImage] = useState(null)
    const [image, setImage] = useState(null)
    const { toast } = useToast();
    const { token } = useAuthStore();
    const { setUser } = useUserStore();
    // console.log("token : ", token)

    const updateImage = async () => {
        if (!image) {
            toast({
                title: "Error",
                description: "Please select an image",
                variant: "destructive"
            });
            return;
        }
        try {
            setLoading(true);

            const formData = new FormData();
            formData.append('banner', image);

            const response = await api.put('/profile/updateProfilePicture', formData, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'multipart/form-data',
                    // 'authorization': `Bearer ${token}`
                },
            });

            if (response?.data?.success) {
                toast({
                    title: "Profile Picture Updated",
                    description: "Your profile picture has been updated successfully",
                });
                setUser(response?.data?.data)
            } else {
                toast({
                    title: "Error",
                    description: response?.data?.message || "Something went wrong",
                    variant: "destructive"
                });
            }
        } catch (error) {
            // console.log("Error updating profile picture:", error);
            toast({
                title: "Error",
                description: error.response?.data?.message || "Failed to update profile picture",
                variant: "destructive"
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (image) {
            setPreviewImage(URL.createObjectURL(image));
        }
    }, [image]);

    return (
        <>
            <Button onClick={() => setFormOpen(true)} size='icon' className='absolute w-9 rounded-full top-4 border-2 border-main-100 right-4'>
                <MdOutlineCreate />
            </Button >
            {
                formOpen && (
                    <div onClick={() => setFormOpen(false)} className='fixed z-[10] inset-0 w-full h-screen bg-black/40 backdrop-blur-sm flex justify-center items-center'>
                        <div onClick={(e) => e.stopPropagation()} className='flex flex-col items-center p-8 bg-dark-50 rounded-md'>
                            <h4 className='text-xl mb-4 font-medium'>Update Profile Banner</h4>
                            <input className='hidden' id='image' type="file" onChange={(e) => setImage(e.target.files[0])} />
                            <label htmlFor="image" className='flex mb-4 rounded-xl flex-col items-center '>
                                <img src={previewImage || userProfilePicture} className='h-[200px] rounded-md aspect-video w-full object-cover border' alt="" />
                                <p className='mt-2 text-sm'>Click to select</p>
                            </label>
                            <div className='flex gap-x-2'>
                                <Button disabled={loading} onClick={updateImage} size='lg'>
                                    {loading ? 'Updating...' : 'Update'}
                                </Button>
                                <Button size='lg' onClick={() => setFormOpen(false)} variant='outline' >
                                    cancel
                                </Button>
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default BannerUpdateForm