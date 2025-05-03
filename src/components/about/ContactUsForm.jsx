import React from 'react'
import { Label } from '../ui/label'
import InputField from '../common/InputField'
import { MdOutlineDriveFileRenameOutline, MdOutlineAlternateEmail, MdOutlineMessage } from "react-icons/md";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import TextAreaField from '@/components/common/TextAreaField ';
import { Checkbox } from '../ui/checkbox';
import { Button } from '../ui/button';
import { phoneCodes, queryTypes } from '@/lib/data';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { BASE_URL } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email"),
    phone: z.string().min(10, "Phone number is required"),
    queryType: z.string().min(1, "Query type is required"),
    countryCode: z.string().min(1, "Country code is required"),
    message: z.string().min(1, "Message is required"),
    terms: z.boolean().refine((v) => v === true, "Terms must be accepted")
});

const sendResponseToServer = async (data) => {
    const response = await axios.post(BASE_URL + '/api/v1/contact', data);
    return response.data;
}

const ContactUsForm = () => {

    const { toast } = useToast();

    const { mutate: sendResponse, isPending, isError } = useMutation({
        mutationFn: sendResponseToServer,
        onSuccess: (data) => {
            // console.log("Response sent successfully: ", data);
            if (data?.success) {
                toast({
                    title: data?.message || '',
                    description: 'Your query have been submitted successfully',
                })
                reset()
                setValue('terms', false)
                setValue('queryType', '')
            } else {
                toast({
                    title: data?.message || '',
                    description: 'Please try again later',
                    variant: 'destructive'
                })
            }
        },
        onError: (error) => {
            // console.error("Error sending response: ", error);
            toast({
                title: "Something went wrong",
                description: 'Please try again later',
                variant: 'destructive'
            })
        }
    })

    const {
        register,
        setValue,
        watch,
        getValues,
        reset,
        setError,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            countryCode: "+91",
            email: "",
            phone: "",
            queryType: "",
            message: "",
            terms: false,
        },
    });

    const submitHandler = async (data) => {
        await sendResponse(data)
    };

    return (
        <form onSubmit={handleSubmit(submitHandler)} className='border p-8 border-dark-700 w-full bg-white rounded-xl'>
            {/* Name & Email */}
            <div className='flex gap-x-4 w-full'>
                <div className='space-y-1 w-full'>
                    <Label htmlFor='name'>Name</Label>
                    <InputField
                        icon={<MdOutlineDriveFileRenameOutline />}
                        type="text"
                        placeholder="Your name"
                        {...register("name")}
                    />
                    {errors.name && <p className='text-red-500 text-sm'>{errors.name.message}</p>}
                </div>
                <div className='space-y-1 w-full'>
                    <Label htmlFor='email'>Email</Label>
                    <InputField
                        icon={<MdOutlineAlternateEmail />}
                        type="email"
                        placeholder="Your email"
                        {...register("email")}
                    />
                    {errors.email && <p className='text-red-500 text-sm'>{errors.email.message}</p>}
                </div>
            </div>

            {/* Phone & Query Type */}
            <div className='flex gap-x-4 mt-4 w-full'>
                <div className='space-y-1 w-full'>
                    <Label htmlFor='phone'>Phone</Label>
                    <div className='flex items-center gap-x-4'>
                        <Select onValueChange={(val) => setValue('countryCode', val)} defaultValue='+91'>
                            <SelectTrigger className="w-[70px] h-10 border-dark-700">
                                <SelectValue placeholder="+91" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {phoneCodes.map((c, i) => (
                                        <SelectItem key={i} value={c}>{c}</SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <InputField
                            type="text"
                            placeholder="Phone number"
                            className='w-full'
                            {...register("phone")}
                        />
                    </div>
                    {errors.phone && <p className='text-red-500 text-sm'>{errors.phone.message}</p>}
                </div>

                <div className='space-y-1 w-full'>
                    <Label htmlFor='queryType'>Query Type</Label>
                    <Select value={getValues('queryType')} onValueChange={(val) => {
                        setValue("queryType", val)
                        setError("queryType", undefined)
                    }}>
                        <SelectTrigger className="w-full h-10 border-dark-700">
                            <SelectValue placeholder="Feedback & Suggestions" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {queryTypes.map((q, i) => (
                                    <SelectItem key={i} value={q}>{q}</SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    {errors.queryType && <p className='text-red-500 text-sm'>{errors.queryType.message}</p>}
                </div>
            </div>

            {/* Message */}
            <div className='mt-4 w-full space-y-1'>
                <Label htmlFor='message'>Message</Label>
                <TextAreaField
                    icon={<MdOutlineMessage />}
                    rows={5}
                    placeholder="Write your message..."
                    {...register("message")}
                />
                {errors.message && <p className='text-red-500 text-sm'>{errors.message.message}</p>}
            </div>

            {/* Terms */}
            <div className='flex items-center gap-x-2 mt-4'>
                <Checkbox id="terms" onCheckedChange={(v) => setValue("terms", v)} />
                <Label htmlFor="terms" className='text-sm'>I agree to the terms and conditions</Label>
                {errors.terms && <p className='text-red-500 text-sm'>{errors.terms.message}</p>}
            </div>

            {/* Submit */}
            <Button type="submit" disabled={isPending} className="mt-6 w-full">
                {
                    isPending ? 'Submitting...' : 'Submit'
                }
            </Button>
        </form>
    );
};

export default ContactUsForm;
