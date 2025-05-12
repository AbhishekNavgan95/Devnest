import { useCourseFormStore } from '@/stores/useCourseFormStore';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Label } from '../ui/label';
import InputField from '../common/InputField';
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";
import { Button } from '../ui/button';
import { useMutation } from '@tanstack/react-query';
import { api } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { MdOutlineDeleteOutline } from "react-icons/md";
import CreateSubSectionForm from './CreateSubSectionForm';
import EditSubSectionForm from './EditSubSectionForm';
import ConfirmationModal from '../common/ConfirmationModal';

const formSchema = z.object({
  sectionName: z.string().min(1, { message: 'Section name is required' }),
  courseId: z.string().min(1, { message: 'Course id is required' }),
  sectionId: z.string().optional(),
})

const addSectionfn = async (data) => {
  const response = await api.post('/course/addSection', data)
  // console.log("response : ", response);
  return response.data
}

const updateSectionfn = async (data) => {
  const response = await api.put('/course/updateSection', data)
  // console.log("update section response : ", response);
  return response.data
}

const deleteSectionfn = async (data) => {
  const response = await api.post(`/course/deleteSection`, data)
  return response.data
}

const deleteSubSectionfn = async (data) => {
  const response = await api.post('/course/deleteSubSection', data)
  return response.data
}

const CourseContentForm = () => {

  const [editSection, setEditSection] = useState(false)
  const [confirmationModal, setConfirmationModal] = useState(false)
  const { course, step, setCourse, setStep } = useCourseFormStore();
  const { toast } = useToast();

  const { mutate: addSection, isPending } = useMutation({
    mutationFn: addSectionfn,
    onSuccess: (data) => {
      const updatedCourse = { ...course, courseContent: [...course.courseContent, data.data] }
      setCourse(updatedCourse);
      reset({
        sectionName: '',
        courseId: course?._id,
      })
      toast({
        title: "Module added successfully",
        description: "Module added successfully",
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

  const { mutate: updateSection, isPending: isUpdating } = useMutation({
    mutationFn: updateSectionfn,
    onSuccess: (data) => {
      setEditSection(false)
      const updatedContent = course?.courseContent?.map(section =>
        section._id === data.data._id ? data.data : section
      );
      const updatedCourse = { ...course, courseContent: updatedContent };
      setCourse(updatedCourse);
      reset({
        sectionName: '',
        courseId: course?._id,
      })
      toast({
        title: "Module added successfully",
        description: "Module added successfully",
      })
    },
    onError: (error) => {
      setEditSection(false)
      // console.log("error : ", error)
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive"
      })
    }
  })

  const { mutate: deleteSection, isPending: isDeleting } = useMutation({
    mutationFn: deleteSectionfn,
    onSuccess: (data) => {
      const updatedContent = course?.courseContent?.filter(section => section._id !== data.data._id);
      const updatedCourse = { ...course, courseContent: updatedContent };
      setCourse(updatedCourse);
      setConfirmationModal(null)
      toast({
        title: "Module deleted successfully",
        description: "Module deleted successfully",
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

  const { mutate: deleteSubSection, isPending: isDeletingSubSection } = useMutation({
    mutationFn: deleteSubSectionfn,
    onSuccess: (data) => {
      const updatedContent = course?.courseContent?.map(section =>
        section._id === data.data._id ? data.data : section
      );
      const updatedCourse = { ...course, courseContent: updatedContent };
      setCourse(updatedCourse);
      setConfirmationModal(null);
      toast({
        title: "Lecture deleted successfully",
        description: "Lecture deleted successfully",
      });
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

  const {
    register,
    getValues,
    setValue,
    watch,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
    clearErrors
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      sectionName: '',
      courseId: course?._id,
    }
  })

  const submitHandler = (data) => {
    if (!editSection) {
      addSection(data)
    } else {
      updateSection(data)
    }
  }

  const handleEditSection = (section) => {
    setEditSection(true)
    setValue('sectionName', section.sectionName)
    setValue('sectionId', section._id)
  }

  return (
    <>
      <div className='w-full py-4 px-4 md:px-8 mb-4 bg-white min-h-[200px] rounded-md border border-dark-600' >
        <h4 className='text-xl font-medium'>Create module</h4>
        <form onSubmit={handleSubmit(submitHandler)} className='flex flex-col mt-4 gap-y-4'>
          <div className='space-y-1'>
            <Label>
              Module name
            </Label>
            <InputField
              placeholder={'Module name'}
              type='text'
              {...register('sectionName')}
              name='sectionName'
              id='sectionName'
              icon={<MdOutlineDriveFileRenameOutline />}
            />
          </div>

          <div className='flex self-end gap-x-2'>
            {
              editSection && (
                <Button type='button' onClick={() => {
                  setEditSection(false)
                  reset({
                    sectionName: '',
                    courseId: course?._id,
                  })
                }} variant='outline' className=''>
                  Cancel
                </Button>
              )
            }
            <Button className=''>
              {
                editSection ? "Update Module" : "Add Module"
              }
            </Button>
          </div>
        </form>
      </div>

      <div className='w-full py-4 px-4 md:px-8 bg-white border rounded-md border-dark-600'>
        <h4 className='text-xl font-medium'>Modules</h4>
        <div className='flex flex-col mt-4 gap-y-2'>
          {
            course?.courseContent?.length > 0 ? (
              course?.courseContent.map((section) => (
                <div key={section._id} className='w-full p-2 px-4 bg-dark-50 border border-dark-700 rounded-md'>
                  <div className='flex items-center justify-between'>
                    <h4 className='text-lg font-medium line-clamp-1'>{section.sectionName}</h4>

                    <div className='space-x-2'>
                      <Button onClick={() => handleEditSection(section)} variant='ghost' size='icon'>
                        <MdOutlineDriveFileRenameOutline />
                      </Button>
                      <Button onClick={() => {
                        setConfirmationModal({
                          onClose: () => setConfirmationModal(null),
                          onConfirm: () => deleteSection({ sectionId: section._id, courseId: course?._id }),
                          heading: "Delete Lecture",
                          subheading: "Are you sure you want to delete this lecture?"
                        })
                      }} variant='ghost' size='icon'>
                        <MdOutlineDeleteOutline />
                      </Button>
                    </div>
                  </div>

                  {
                    section?.subSection?.length > 0 && (
                      <div className='flex flex-col my-2 gap-y-2'>
                        {
                          section.subSection.map((subSection, index) => (
                            <div key={subSection?._id + index} className='flex items-center px-4 rounded-md justify-between bg-dark-200'>
                              <div className='flex gap-x-2 items-center'>
                                <h4 className='text-base font-normal line-clamp-1'>{subSection.title}</h4>
                                {
                                  subSection?.isPreviewable && <span className='text-main-400 font-medium text-xs'>
                                    Preview
                                  </span>
                                }
                              </div>
                              <div className='space-x-1'>
                                <EditSubSectionForm
                                  sectionId={section._id}
                                  subSectionId={subSection._id}
                                  title={subSection.title}
                                  description={subSection.description}
                                  isPreviewable={subSection.isPreviewable}
                                  video={subSection.video}
                                />

                                <Button onClick={() => {
                                  setConfirmationModal({
                                    onClose: () => setConfirmationModal(null),
                                    onConfirm: () => deleteSubSection({ sectionId: section?._id, subSectionId: subSection?._id }),
                                    heading: "Delete Lecture",
                                    subheading: "Are you sure you want to delete this lecture?"
                                  })
                                }}
                                  className='hover:bg-transparent' variant='ghost' size='icon'>
                                  <MdOutlineDeleteOutline />
                                </Button>
                              </div>
                            </div>
                          ))
                        }
                      </div>
                    )
                  }

                  <CreateSubSectionForm
                    sectionId={section._id}
                  />
                </div>
              ))
            ) : (
              <div className='flex w-full text-dark-700 justify-center items-center h-full min-h-[200px]'>
                No modules added yet
              </div>
            )
          }
        </div>


        {
          confirmationModal && <ConfirmationModal
            {...confirmationModal}
          />
        }

      </div>

      <div div className='my-4 flex w-full justify-between'>
        <Button onClick={() => setStep(step - 1)}>Previous</Button>
        <Button onClick={() => setStep(step + 1)}>Next</Button>
      </div>
    </>
  )
}

export default CourseContentForm