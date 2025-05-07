import CourseContentForm from '@/components/createCourse/CourseContentForm'
import CourseFormStepper from '@/components/createCourse/CourseFormStepper'
import CourseStatusForm from '@/components/createCourse/CourseStatusForm'
import CreateCourseForm from '@/components/createCourse/CreateCourseForm'
import { Button } from '@/components/ui/button'
import { useCourseFormStore } from '@/stores/useCourseFormStore'
import { useTopicsStore } from '@/stores/useTopicsStore'
import React from 'react'

const CreateCourse = () => {

  const { step, setStep, edit } = useCourseFormStore();
  const { topics } = useTopicsStore();

  return (
    <div className='w-full'>
      <h4 className='text-xl xl:text-3xl font-medium mb-4 md:mb-8'>Create new Course</h4>
      <div className='max-w-[900px] mx-auto'>
        <div className='col-span-2'>
          <CourseFormStepper />
          {step === 1 && (
            <CreateCourseForm topics={topics} />
          )}
          {
            step === 2 && (
              <CourseContentForm />
            )
          }
          {
            step === 3 && (
              <CourseStatusForm />
            )
          }

        </div>
      </div>
    </div >
  )
}

export default CreateCourse