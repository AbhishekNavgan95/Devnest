import { useNavigate } from 'react-router-dom';
import React from 'react'
import { Button } from '../ui/button'
import { useCourseFormStore } from '@/stores/useCourseFormStore';
import { Label } from '../ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { api } from '@/lib/utils';

const formSchema = z.object({
  status: z.string().min(1, { message: 'Status is required' }),
  courseId: z.string().min(1, { message: 'Course id is required' })
})

const updateCourseStatusFn = async (data) => {
  const response = await api.post(`/course/editStatus`, data);
  return response.data;
};

const CourseStatusForm = () => {

  const { setStep, step, course, reset } = useCourseFormStore();
  const navigate = useNavigate();
  const { toast } = useToast();

  const { setValue, handleSubmit, reset: resetForm, watch } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      status: 'Draft',
      courseId: course?._id
    }
  })

  const { mutate: updateStatus, isPending } = useMutation({
    mutationFn: updateCourseStatusFn,
    onSuccess: (data) => {
      finishFormSteps()
      resetForm();
      toast({
        title: "Course status updated successfully",
        description: "Course status updated successfully",
      })
    },
    onError: (error) => {
      // console.log("error : ", error)
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive"
      })
    }
  })

  const courseStatus = watch('status');

  const finishFormSteps = () => {
    reset();
    navigate('/dashboard/courses')
  }

  const submitHandler = (data) => {
    updateStatus(data);
  }

  return (
    <>
      <div className='w-full py-4 px-4 md:px-8 bg-white border rounded-md border-dark-600'>
        <h4 className='text-xl font-medium'>Course Status</h4>
        <div className='text-sm mt-4 space-y-2'>
          <p>
            In this final step, choose the visibility status for your course.
          </p>
          <p> You can either keep it in Draft mode to continue editing later, or make it Public so students can discover and enroll in it right away.</p>
          <p>
            If you skip this step, your course will automatically remain in Draft status and won’t be visible to others.
          </p>
          <p> Use the dropdown below to update the course status when you're ready to publish.</p>
        </div>

        <form onSubmit={handleSubmit(submitHandler)} className='mt-4'>
          <div className='space-y-1'>
            <Label htmlFor='status'>
              Course Status
            </Label>
            <Select onValueChange={(val) => setValue('status', val)} value={courseStatus}>
              <SelectTrigger className="w-full text-sm border border-dark-700">
                <SelectValue placeholder="Select course status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Status</SelectLabel>
                  <SelectItem value="Draft">Draft</SelectItem>
                  <SelectItem value="Published">Published</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className='flex justify-end mt-4'>
            <Button type='submit' disabled={isPending}>
              {
                isPending ? "Submitting..." : "Submit"
              }
            </Button>
          </div>
        </form>
      </div>

      <div div className='my-4 flex w-full justify-between'>
        <Button onClick={() => setStep(step - 1)}>Previous</Button>
        <Button onClick={finishFormSteps}>Skip and Finish</Button>
      </div>
    </>
  )
}

export default CourseStatusForm