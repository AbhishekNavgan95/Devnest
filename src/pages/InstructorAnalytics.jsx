import { api } from '@/lib/utils'
import { useQuery } from '@tanstack/react-query'
import React from 'react'

const fetchInstructorDashboardData = async () => {
  const response = await api.get('/course/InstructorDashboardData');
  return response?.data;
}

const InstructorAnalytics = () => {

  const { data, isPending } = useQuery({
    queryKey: ['instructorDashboardData'],
    queryFn: fetchInstructorDashboardData
  })

  if (isPending) {
    return <div>
      Loading...
    </div>
  }

  console.log("data : ", data)

  return (
    <div>InstructorAnalytics</div>
  )
}

export default InstructorAnalytics