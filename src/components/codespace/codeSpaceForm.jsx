import { useForm } from 'react-hook-form';
import React, { useState } from 'react';
import { FaCopy } from "react-icons/fa6";
import { MdOutlineClose } from "react-icons/md";
import { set, z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { Button } from '../ui/button';
import InputField from '../common/InputField';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Label } from '@radix-ui/react-label';
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";

const formSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    visibility: z.string().min(1, { message: "Visibility is required" }),
});

const CreateCodeSpaceForm = ({ setFormOpen }) => {
    const queryClient = useQueryClient();
    const { toast } = useToast();

    const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            visibility: 'public',
        }
    });

    const [inviteLink, setInviteLink] = useState(null);

    const { mutate, isLoading } = useMutation({
        mutationFn: async (data) => {
            const response = await api.post('/codespace/create', data)
            return response.data
        },
        onSuccess: (data) => {
            setInviteLink(data);
            reset();
            queryClient.invalidateQueries(['codeSpaces']);
        },
        onError: (error) => {
            console.error(error);
            toast.error("Something went wrong");
        },
    });

    return (
        <section onClick={() => setFormOpen(false)} className='fixed inset-0 bg-black/40 backdrop-blur-sm z-[10] grid place-items-center'>
            <div onClick={(e) => e.stopPropagation()} className='bg-white border border-dark-600 p-5 rounded-lg w-[480px]'>
                <div className='flex items-center justify-between'>
                    <h4 className='font-semibold text-lg'>Create a new code space.</h4>
                    <button onClick={() => setFormOpen(false)} className='text-2xl'><MdOutlineClose /></button>
                </div>
                <p className='opacity-70 text-sm'>Start by creating a new code space and setting the visibility</p>

                <form onSubmit={handleSubmit(mutate)} className='space-y-3 pt-3'>
                    <div>
                        <Label className='mb-1 text-sm' htmlFor="name">Name</Label>
                        <InputField
                            type="text"
                            icon={<MdOutlineDriveFileRenameOutline />}
                            id="name"
                            {...register("name")}
                            className='w-full'
                            placeholder='Enter name of the code space'
                        />
                        {errors.name && <p className='text-red-600 text-sm mt-1'>{errors.name.message}</p>}
                    </div>

                    <div>
                        <Label className='mb-1 text-sm' htmlFor="visibility">Visibility</Label>
                        <Select
                            defaultValue='public'
                            onValueChange={(val) => setValue('visibility', val)}
                            id='visibility'
                        >
                            <SelectTrigger className="w-full border border-dark-600 ">
                                <SelectValue placeholder="Visibility" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="public">Public</SelectItem>
                                    <SelectItem value="private">Private</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        {errors.visibility && <p className='text-red-500 text-sm mt-1'>{errors.visibility.message}</p>}
                    </div>

                    <Button type="submit" className="w-full" disabled={isLoading || inviteLink?.data?.inviteLink}>
                        {isLoading ? "Creating..." : "Create"}
                    </Button>
                </form>

                {
                    inviteLink?.data?.inviteLink &&
                    <>
                        <p className='mb-1 mt-4 '>Invite link</p>
                        <div className='w-full py-2 px-2 flex items-center justify-between gap-x-3 border border-dark-600 rounded-md'>
                            <p className='line-clamp-1'>{inviteLink.data.inviteLink}</p>
                            <button className='mr-2' onClick={() => {
                                navigator.clipboard.writeText(inviteLink.data.inviteLink);
                                toast({
                                    title: "Copied to clipboard",
                                    description: "Invite link copied to clipboard"
                                })
                            }}>
                                <FaCopy />
                            </button>
                        </div>
                    </>
                }
            </div>
        </section>
    );
};

export default CreateCodeSpaceForm;