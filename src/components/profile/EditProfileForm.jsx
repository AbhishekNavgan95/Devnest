import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { z } from 'zod'
import { Label } from '../ui/label'
import InputField from '../common/InputField'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { api } from '@/lib/utils'
import { useToast } from '@/hooks/use-toast'
import { MdOutlineDateRange } from "react-icons/md";
import { RiContactsBook3Line } from "react-icons/ri";
import { MdOutlineTextFormat } from "react-icons/md";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import TextAreaField from '../common/TextAreaField '
import { SiHyperskill } from "react-icons/si";
import { MdOutlineShortText } from "react-icons/md";
import { useUserStore } from '@/stores/useUserStore'
import { IoMdClose } from "react-icons/io";

// dateOfBirth, about, contactNumber, gender, niche, experience
const formSchema = z.object({
    dateOfBirth: z.string().optional(),
    about: z.string().optional(),
    contactNumber: z.string().optional(),
    gender: z.string().optional(),
    niche: z.array(z.string()).optional(),
    experience: z.string().max(100).optional(),
})

const updateUserAdditionalDetails = async (data) => {
    const response = await api.put('/profile/updateProfile', data)
    return response.data
}

const EditProfileForm = ({
    user,
    topics
}) => {
    const [formOpen, setFormOpen] = useState(false)
    const [matchingTopics, setMatchingTopics] = useState([]);
    const [nicheInput, setNicheInput] = useState("");
    const [niche, setNiche] = useState([]);
    const { toast } = useToast();
    const { setUser } = useUserStore();

    useEffect(() => {
        if (user?.niche) {
            setNiche(user?.niche);
        }
    }, [user])

    const { mutate: updateUserDetails, isPending, isError } = useMutation({
        mutationFn: updateUserAdditionalDetails,
        onSuccess: (data) => {
            // console.log("data : ", data)
            if (data?.success) {
                toast({
                    title: "Success",
                    description: "Profile updated successfully",
                });
                reset();
                setFormOpen(false);
                setUser(data?.data);
            } else {
                throw new Error(data?.message || "Something went wrong");
            }
        },
        onError: (error) => {
            console.log(error)
            toast({
                title: "Error",
                description: error.response?.data?.message || "Something went wrong",
                variant: "destructive"
            });
        }
    })

    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues,
        setValue,
        reset,
        watch
    } = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            niche: user?.niche || [],
            dateOfBirth: user?.DOB || '',
            about: user?.about || '',
            contactNumber: user?.contactNumber || '',
            gender: user?.gender || '',
            experience: user?.experience || '',
        }
    })

    const handleMatchTopics = (e) => {
        const value = e.target.value;
        setNicheInput(value);

        if (!value.trim()) {
            setMatchingTopics([]);
            return;
        }

        const filteredTopics = topics.filter((topic) =>
            topic.name.toLowerCase().includes(value.toLowerCase())
        );
        setMatchingTopics(filteredTopics);
    };

    const handleAddTopic = (topicName) => {
        if (!niche.includes(topicName)) {
            const updated = [...niche, topicName];
            setNiche(updated);
            setValue("niche", updated); // set to form field
        }
        setNicheInput(""); // clear input
        setMatchingTopics([]); // hide dropdown
    };

    const handleRemoveTopic = (topicName) => {
        const updated = niche.filter((item) => item !== topicName);
        setNiche(updated);
        setValue("niche", updated);
    };

    const submitHandler = (data) => {
        const finalData = {
            ...data,
            niche: niche
        };
        // console.log("Final data:", finalData);
        updateUserDetails(finalData);
    }

    const gender = watch('gender')

    return (
        <>
            <Button onClick={() => setFormOpen(true)} size='lg'>
                Edit Profile
            </Button>
            {
                formOpen && (
                    <div onClick={() => setFormOpen(false)} className='fixed z-[10] inset-0 w-full h-screen bg-black/40 backdrop-blur-sm flex justify-center items-center'>
                        <div onClick={(e) => e.stopPropagation()} className='flex flex-col w-[640px] items-start p-8 bg-dark-50 rounded-md'>
                            <div className='flex items-start mb-4 w-full justify-between'>
                                <h4 className='text-2xl font-medium'>Update Profile Details</h4>
                                <button onClick={() => setFormOpen(false)} className='text-2xl'><IoMdClose /></button>
                            </div>

                            <form onSubmit={handleSubmit(submitHandler)} className='w-full flex flex-col gap-y-4'>
                                <div className='flex items-center gap-x-4 w-full'>
                                    <div className='space-y-1 w-full'>
                                        <Label htmlFor='dateOfBirth'>Date or Birth</Label>
                                        <InputField
                                            type='date'
                                            name='dateOfBirth'
                                            id={'dateOfBirth'}
                                            className='w-full'
                                            {
                                            ...register('dateOfBirth')
                                            }
                                            icon={<MdOutlineDateRange />}
                                        />
                                    </div>

                                    <div className='space-y-1 w-full'>
                                        <Label htmlFor='contactNumber'>Contact Number</Label>
                                        <InputField
                                            type='number'
                                            placeholder='Enter your contact number'
                                            name='contactNumber'
                                            id={'contactNumber'}
                                            {
                                            ...register('contactNumber')
                                            }
                                            icon={<RiContactsBook3Line />}
                                        />
                                    </div>
                                </div>

                                <div className='flex items-center gap-x-4 w-full'>
                                    <div className='space-y-1 w-full'>
                                        <Label htmlFor='gender'>Gender</Label>
                                        <Select value={gender} onValueChange={(val) => setValue('gender', val)}>
                                            <SelectTrigger className="w-full border bg-white border-dark-700">
                                                <SelectValue placeholder="Select a gender" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>Gender</SelectLabel>
                                                    <SelectItem value="male">Male</SelectItem>
                                                    <SelectItem value="female">Female</SelectItem>
                                                    <SelectItem value="other">Other</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className='space-y-1 w-full'>
                                        <Label htmlFor='experience'>Bio</Label>
                                        <InputField
                                            type='text'
                                            name='experience'
                                            placeholder={'Enter your bio'}
                                            id={'experience'}
                                            className='w-full'
                                            {
                                            ...register('experience')
                                            }
                                            icon={<MdOutlineTextFormat />}
                                        />
                                        {
                                            errors.experience && (
                                                <p className='text-red-500 text-xs'>{errors.experience.message}</p>
                                            )
                                        }
                                    </div>
                                </div>

                                <div className='flex items-center gap-x-4 w-full'>
                                    <div className='space-y-1 w-full'>
                                        <Label htmlFor='about'>About</Label>
                                        <TextAreaField
                                            type='text'
                                            name='about'
                                            placeholder={'Write something about yourself'}
                                            id={'about'}
                                            className='w-full'
                                            {
                                            ...register('about')
                                            }
                                            icon={<MdOutlineShortText />}
                                        />
                                    </div>
                                </div>

                                <div className='w-full'>
                                    <div className='space-y-1'>
                                        <Label htmlFor='niche'>Interests</Label>

                                        {/* Selected topics shown above input */}
                                        {niche.length > 0 && (
                                            <div className="flex flex-wrap gap-2 pb-2">
                                                {niche.map((topic, index) => (
                                                    <div
                                                        key={index}
                                                        className="bg-main-400  text-white px-3 py-1 rounded-full text-sm flex items-center gap-x-1"
                                                    >
                                                        <span>{topic}</span>
                                                        <button
                                                            type="button"
                                                            onClick={() => handleRemoveTopic(topic)}
                                                            className="text-xs ml-1"
                                                        >
                                                            ×
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        {/* Input field */}
                                        <InputField
                                            type="text"
                                            id="niche"
                                            name="niche"
                                            value={nicheInput}
                                            onChange={handleMatchTopics}
                                            placeholder="Search for your interests"
                                            icon={<SiHyperskill className="text-sm" />}
                                        />

                                        {/* Suggestions */}
                                        {matchingTopics.length > 0 && (
                                            <div className="flex flex-wrap gap-2 pt-2">
                                                {matchingTopics.map((topic, index) => (
                                                    <div
                                                        key={index}
                                                        className="bg-dark-300 px-3 py-1 rounded-full text-sm cursor-pointer hover:bg-dark-400"
                                                        onClick={() => handleAddTopic(topic.name)}
                                                    >
                                                        {topic.name}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <Button disabled={isPending} className=''>
                                    {
                                        isPending ? 'Submitting...' : "Submit"
                                    }
                                </Button>
                            </form >
                        </div >
                    </div >
                )
            }
        </>
    )
}

export default EditProfileForm