import Container from '@/components/common/Container';
import { Button } from '@/components/ui/button';
import { api, getCloudinaryUrl } from '@/lib/utils';
import { useMutation, useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { IoShareSocialSharp } from "react-icons/io5";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import CourseCard from '@/components/courses/CourseCard';
import { useTopicsStore } from '@/stores/useTopicsStore';
import { IoIosClose } from "react-icons/io";
import { useToast } from '@/hooks/use-toast';
import { useUserStore } from '@/stores/useUserStore';

const InstructorProfile = () => {
    const { id } = useParams();
    const { user } = useUserStore();
    const { topics } = useTopicsStore();
    const [selectedTopic, setSelectedTopic] = useState("");
    const { toast } = useToast()

    // const { mutate: followUser, isPending: followPending } = useMutation({
    //     mutationFn: async () => {
    //         const response = await api.post('/profile/followUser/' + id)
    //         return response.data
    //     },
    //     onSuccess: (data) => {
    //         toast({
    //             title: data?.message || "Followed Successfully",
    //             description: 'You are now following this user'
    //         })
    //     },
    //     onError: (error) => {
    //         toast({
    //             title: error?.response?.data?.message || "Something went wrong",
    //             description: 'Please try again later',
    //             variant: 'destructive'
    //         })
    //     }
    // })

    const { data, isPending } = useQuery({
        queryKey: ['instructor', id],
        queryFn: async () => {
            const res = await api.get('/course/instructorDetails/' + id);
            return res.data;
        }
    });

    // skeleton
    if (isPending) {
        return (
            <div className='py-8'>
                <Container>
                    <div className='flex flex-col gap-y-8'>
                        <div className='h-24 md:h-44 rounded-md bg-dark-200 animate-pulse'></div>

                        <div className='flex flex-col md:flex-row md:items-center self-start gap-4'>
                            <div className='w-[100px] md:w-[160px] aspect-square rounded-full bg-dark-200 animate-pulse'></div>
                            <div className='space-y-2'>
                                <div className='w-[200px] bg-dark-200 animate-pulse h-6'></div>
                                <div className='w-[350px] bg-dark-200 animate-pulse h-4'></div>
                                <div className='w-[100px] bg-dark-200 animate-pulse h-6'></div>
                                <div className='flex gap-x-2'>
                                    <div className='w-[100px] bg-dark-200 animate-pulse h-6'></div>
                                    <div className='w-[100px] bg-dark-200 animate-pulse h-6'></div>
                                </div>
                            </div>
                        </div>

                        <div className='space-y-4'>
                            <div className='w-[100px] bg-dark-200 animate-pulse h-8'></div>
                            <div className='w-full bg-dark-200 animate-pulse h-4'></div>
                            <div className='w-[60%] bg-dark-200 animate-pulse h-4'></div>
                        </div>

                        <div className='space-y-4 mt-8'>
                            <div className='w-[100px] bg-dark-200 animate-pulse h-8'></div>
                            <div className='w-full bg-dark-200 animate-pulse h-4'></div>
                            <div className='w-[60%] bg-dark-200 animate-pulse h-4'></div>
                        </div>

                        <div className='space-y-4 mt-8'>
                            <div className='w-[100px] bg-dark-200 animate-pulse h-8'></div>
                            <div className='w-full bg-dark-200 animate-pulse h-4'></div>
                            <div className='w-[60%] bg-dark-200 animate-pulse h-4'></div>
                        </div>

                    </div>
                </Container>
            </div>
        )
    }

    const { instructor, courses } = data.data;
    const filteredCourses = selectedTopic
        ? courses.filter(course => course.category === selectedTopic)
        : courses;
    // const isFollowing = Array.isArray(instructor?.additionalDetails?.followers) && instructor?.additionalDetails?.followers?.includes(user?._id)

    return (
        <div className='py-8 mb-24'>
            <Container>
                <div>
                    {
                        instructor?.banner?.url
                            ? <img src={getCloudinaryUrl(instructor?.banner?.url, { width: 1200, height: 300 })} className='h-24 md:h-44 w-full rounded-md object-cover' alt="" />
                            : <div className='w-full h-24 md:h-44 text-dark-700 bg-dark-200 rounded-md flex items-center justify-center'>
                                No banner added
                            </div>
                    }

                    <div className='my-4 md:my-12 md:px-8 flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6'>
                        <img src={getCloudinaryUrl(instructor?.image?.url, { width: 120, height: 120 })} className='w-[100px] md:w-[160px] bg-dark-200 rounded-full border border-dark-600' alt="banner" />
                        <div>
                            <h2 className='text-2xl font-medium'>{instructor?.firstName} {instructor?.lastName}</h2>
                            <p className='text-xs mt-1 text-dark-800'>{instructor?.additionalDetails?.experience}</p>
                            {/* <p className='mt-1 text-sm text-dark-900 font-medium'>{instructor?.additionalDetails?.followers} Followers</p> */}
                            <p className='mt-1 text-sm text-dark-900 font-medium'>{courses?.length} Courses</p>
                            <div className='mt-2 flex items-center gap-x-4'>
                                {/* {
                                    !isFollowing &&
                                    <Button onClick={followUser} disabled={followPending} size='lg'>
                                        {
                                            followPending ? "Following..." : "Follow"
                                        }
                                    </Button>
                                } */}
                                <button onClick={() => {
                                    navigator.clipboard.writeText(window.location.href);
                                    toast({
                                        title: "Link copied to clipboard"
                                    })
                                }} className='text-2xl mt-2'><IoShareSocialSharp /></button>
                            </div>
                        </div>
                    </div>

                    {
                        instructor?.additionalDetails?.about &&
                        <div>
                            <h4 className='text-xl font-medium'>About</h4>
                            <p className='text-xs mt-2 leading-relaxed text-dark-900'>{instructor?.additionalDetails?.about}</p>
                        </div>
                    }

                    {
                        instructor?.additionalDetails?.niche?.length > 0 &&
                        <div className='mt-8'>
                            <h4 className='text-xl font-medium'>Niche</h4>
                            <div className='flex gap-x-4 mt-2 flex-wrap'>
                                {instructor?.additionalDetails?.niche?.map((niche, index) => (
                                    <p key={index} className='text-xs px-4 py-1 border border-dark-700 rounded-md mt-2 leading-relaxed text-dark-900 font-medium'>
                                        {niche}
                                    </p>
                                ))}
                            </div>
                        </div>
                    }

                    <div className='mt-8'>
                        <div className='flex justify-between items-center'>
                            <h4 className='text-xl font-medium'>Courses</h4>
                            <div className='flex items-center gap-x-2'>
                                <Select value={selectedTopic} onValueChange={(val) => setSelectedTopic(val)}>
                                    <SelectTrigger className="w-[240px] border border-dark-600">
                                        <SelectValue placeholder="Filter by Topic" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Topics</SelectLabel>
                                            {topics?.map(topic => (
                                                <SelectItem key={topic._id} value={topic._id}>
                                                    {topic.name}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                                {selectedTopic && (
                                    <button onClick={() => setSelectedTopic("")} className='text-xl'>
                                        <IoIosClose />
                                    </button>
                                )}
                            </div>
                        </div>

                        <div>
                            {filteredCourses.length > 0 ? (
                                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 mt-4'>
                                    {
                                        filteredCourses.map((course, index) => (
                                            <CourseCard key={course._id || index} course={course} />
                                        ))
                                    }
                                </div>
                            ) : (
                                <div className='flex items-center justify-center h-44'>
                                    <p className='text-sm text-dark-700 mt-4'>No courses found for selected topic.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div >
            </Container >
        </div >
    );
};

export default InstructorProfile;
