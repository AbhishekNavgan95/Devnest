import CourseEngagementTable from '@/components/instructorAnalytics/CourseEngagementTable';
import CourseStatusChart from '@/components/instructorAnalytics/CourseStatusChart';
import RatingChart from '@/components/instructorAnalytics/RatingChart';
import { RevenueChart } from '@/components/instructorAnalytics/RevenueChart';
import SalesTable from '@/components/instructorAnalytics/SalesTable';
import StatsCards from '@/components/instructorAnalytics/StatsCards';
import StudentsProgress from '@/components/instructorAnalytics/StudentsProgress';
import TopReviews from '@/components/instructorAnalytics/TopReviews';
import { api } from '@/lib/utils'
import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'

const fetchInstructorDashboardData = async () => {
  const response = await api.get('/course/InstructorDashboardData');
  return response?.data;
}

const InstructorAnalytics = () => {

  const [currentTab, setCurrentTab] = useState('performance') // performance / sales

  const { data, isPending } = useQuery({
    queryKey: ['instructorDashboardData'],
    queryFn: fetchInstructorDashboardData
  })

  if (isPending) {
    return (
      <div className='w-full'>
        <div className='h-12 rounded-md mb-4 bg-dark-300 animate-pulse w-full'></div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-4'>
          {
            Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className='w-full aspect-video bg-dark-300 rounded-md animate-pulse'></div>
            ))
          }
        </div>
      </div>
    )
  }

  const topReviews = data?.data?.reviews?.sort((a, b) => a.rating - b.rating).reverse().slice(0, 5);

  const groupedDataObject = data?.data?.dropOff?.reduce((acc, entry) => {
    const { courseId, course, student, progressPercent } = entry;

    if (!acc[courseId]) {
      acc[courseId] = {
        courseId,
        course,
        students: [],
      };
    }

    acc[courseId].students.push({ student, progressPercent });
    return acc;
  }, {});

  const groupedData = Object.values(groupedDataObject);

  return (
    <div>
      <div className='flex border-b pb-4 border-dark-600 gap-x-4'>
        <button onClick={() => setCurrentTab('performance')} className={`px-4 py-1 rounded-md ${currentTab === 'performance' ? "bg-main-400 text-dark-50" : "bg-transparent"}`}>
          Performance
        </button>
        <button onClick={() => setCurrentTab('sales')} className={`px-4 py-1 rounded-md ${currentTab === 'sales' ? "bg-main-400 text-dark-50" : "bg-transparent"}`}>
          Sales
        </button>
      </div>

      {
        currentTab === 'performance' && (
          <div className='flex flex-col gap-y-6'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-4'>
              <StatsCards data={data?.data?.summary} />

              <RatingChart avgRating={data?.data?.summary?.averageRating} data={data?.data?.starBreakdown} />

              <CourseStatusChart courseStatus={data?.data?.courseStatus} />

              <TopReviews data={topReviews} />
            </div>

            <CourseEngagementTable data={data?.data?.courseEngagement} />

            <StudentsProgress data={groupedData} />

          </div>
        )
      }

      {
        currentTab === 'sales' && (
          <div className='flex flex-col gap-y-6 mt-4'>

            <RevenueChart data={data?.data?.revenueAnalytics} />

            <SalesTable data={data?.data?.sales} />

          </div>
        )
      }

    </div>
  )
}

export default InstructorAnalytics