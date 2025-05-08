import ConfirmationModal from '@/components/common/ConfirmationModal';
import BannerUpdateForm from '@/components/profile/BannerUpdateForm';
import EditProfileForm from '@/components/profile/EditProfileForm';
import ProfilePictureUpdateForm from '@/components/profile/ProfilePictureUpdateForm';
import UpdatePasswordForm from '@/components/profile/UpdatePasswordForm';
import { Button } from '@/components/ui/button';
import { api } from '@/lib/utils';
import { useUserStore } from '@/stores/useUserStore'
import { useMutation, useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react'
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { useTopicsStore } from '@/stores/useTopicsStore';

const deleteUserAccountfn = async () => {
  const response = await api.delete('/profile/deleteAccount');
  return response.data
}

const fetchAllTopics = async () => {
  const response = await api.get('/course/getAllTopics');
  return response.data
}

const Profile = () => {

  const { user } = useUserStore();
  const { toast } = useToast();
  const [deleteAccountModal, setDeleteAccountModal] = useState(false)
  const { logout } = useUserStore()
  const { setTopics } = useTopicsStore();
  const navigate = useNavigate();


  const { mutate: deleteAccount, isPending: deleteAccountPending } = useMutation({
    mutationFn: deleteUserAccountfn,
    onSuccess: () => {
      toast({
        title: 'Account deleted successfully',
        description: 'Your account has been deleted successfully. We hope to see you again soon.',
      })
      setDeleteAccountModal(false)
      logout();
      navigate('/login')
    },
    onError: (error) => {
      toast.error(error.response.data.message)
      toast({
        title: 'Error',
        description: error.response.data.message,
      })
    }
  })

  const { data: topics, isPending: topicsPending, isError: topicsError } = useQuery({
    queryFn: fetchAllTopics,
    queryKey: ['topics'],
    enabled: !!user, // only fetch when user is truthy
  })

  useEffect(() => {
    if (!topicsPending) {
      setTopics(topics.data)
    }
  }, [topics, topicsPending])

  return (
    <div className='w-full'>
      {/* <h4 className='text-xl md:text-3xl font-medium mb-4 md:mb-8'>Profile</h4> */}
      <div className='w-full relative'>
        {
          !user?.banner?.url ? (
            <div className='w-full grid place-items-center object-cover h-[120px] md:h-[160px] bg-dark-200 rounded-md'>
              <p className='text-dark-500 text-2xl'>Add a banner</p>
            </div>
          ) : (
            <img src={user?.banner?.url} className='w-full object-cover h-[120px] md:h-[160px] rounded-md' alt="" />
          )
        }
        <BannerUpdateForm userProfilePicture={user?.banner?.url || 'https://placehold.co/1600x160'} />
      </div>

      <div className='flex flex-col md:flex-row gap-y-4 items-start gap-x-12 px-4 md:px-8 mt-4 md:mt-12'>

        <div className='relative w-[100px] md:w-[140px] border border-dark-600 rounded-full'>
          <img className='w-full aspect-square object-cover rounded-full' src={user?.image?.url || `https://ui-avatars.com/api/?name=${user?.firstName}+${user?.lastName}`} alt="" />
          <ProfilePictureUpdateForm userProfilePicture={user?.image?.url || `https://ui-avatars.com/api/?name=${user?.firstName}+${user?.lastName}`} />
        </div>

        {/* // I want all the childs arrange in a single column */}
        <div className='grid grid-cols-2 gap-y-8 md:gap-10 w-full'>
          <div className='col-span-2'>
            <h4 className='text-sm font-medium'>Name</h4>
            <h2 className='text-xl md:text-2xl font-medium mt-1'>{user?.firstName} {user?.lastName}</h2>
          </div>

          <div className='col-span-2'>
            <h4 className='text-sm font-medium'>Bio</h4>
            <h2 className='text-base font-normal mt-1'>{user?.additionalDetails?.experience || 'you have not added any details yet'}</h2>
          </div>

          <div className='col-span-2 md:col-span-1'>
            <h4 className='text-sm font-medium'>Role</h4>
            <h2 className='text-base font-normal mt-1'>{user?.accountType}</h2>
          </div>

          <div className='col-span-2 md:col-span-1'>
            <h4 className='text-sm font-medium'>Email</h4>
            <h2 className='text-base font-normal mt-1'>{user?.email}</h2>
          </div>

          <div className='col-span-2 md:col-span-1'>
            <h4 className='text-sm font-medium'>Contact</h4>
            <h2 className='text-base font-normal mt-1'>{user?.additionalDetails?.contactNumber || 'you have not added any details yet'}</h2>
          </div>

          <div className='col-span-2 md:col-span-1'>
            <h4 className='text-sm font-medium'>Date of Birth</h4>
            <h2 className='text-base font-normal mt-1'>{user?.additionalDetails?.DOB || 'you have not added any details yet'}</h2>
          </div>

          <div className='col-span-2'>
            <h4 className='text-sm font-medium'>Gender</h4>
            <h2 className='text-base font-normal mt-1'>{user?.additionalDetails?.gender || 'you have not added any details yet'}</h2>
          </div>

          <div className='col-span-2'>
            <h4 className='text-sm font-medium'>About</h4>
            <h2 className='text-base font-normal mt-1'>{user?.additionalDetails?.about || 'you have not added any details yet'}</h2>
          </div>

          <div className='col-span-2'>
            <h4 className='text-sm mb-2 font-medium'>Expertise & Interests</h4>
            <div className='text-base flex flex-wrap gap-2 font-normal mt-1'>{user?.additionalDetails?.niche?.length > 0 ? user?.additionalDetails?.niche?.map((topic, index) => (
              <span className='bg-dark-200 px-4 py-1 rounded-full text-sm ' key={index}>
                {topic}
              </span>
            )) : 'you have not added any details yet'}</div>
          </div>

          <div className='flex gap-x-4 items-center'>
            <EditProfileForm topics={topics?.data} user={user?.additionalDetails} />

            <UpdatePasswordForm />
          </div>
        </div>
      </div>


      <div className='w-full h-[1px] bg-dark-400 my-12'></div>

      <div className='flex flex-col items-start gap-y-4 md:gap-y-8 max-w-[800px]'>

        <h2 className='text-2xl font-medium'>Delete My Account</h2>

        <div className='space-y-4'>
          <p className='text-wrap'>Once you delete your account, all your data—including your profile, enrolled courses, saved progress, and community activity—will be permanently erased. This action cannot be undone, and we won’t be able to recover any of your information later.</p>
          <p className='text-wrap'>Before proceeding, make sure you’ve backed up anything important. If you're facing issues or need a break, consider reaching out to our <span className='underline cursor-pointer text-main-400'>support team</span> — we’re always here to help!</p>
        </div>

        <Button disabled={deleteAccountPending} onClick={() => setDeleteAccountModal(true)} size='lg'>
          Delete My Account
        </Button>
      </div>

      {
        deleteAccountModal && (
          <ConfirmationModal
            onClose={() => setDeleteAccountModal(false)}
            onConfirm={deleteAccount}
            heading='Are you sure you want to delete your account?'
            subheading="Before proceeding, make sure you’ve backed up anything important. If you're facing issues or need a break, consider reaching out to our support team — we’re always here to help!"
          />
        )
      }
    </div >
  )
}

export default Profile