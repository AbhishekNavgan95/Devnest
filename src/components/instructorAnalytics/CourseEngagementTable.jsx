import React from 'react'
import { MdCurrencyRupee } from "react-icons/md";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

const CourseEngagementTable = ({
    data
}) => {
    return (
        <div className="flex p-6 overflow-hidden flex-col gap-y-4 items-center justify-between border border-dark-600 rounded-xl bg-white shadow-sm shadow-dark-400 w-full">
            <div className='flex items-center justify-between w-full'>
                <p className='text-xl font-semibold text-start'>Course Engagement</p>
            </div>
            <Table>
                {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-full text-start font-semibold  text-base">Title</TableHead>
                        <TableHead className='min-w-[180px] text-start font-semibold  text-base'>Students Enrolled</TableHead>
                        <TableHead className='min-w-[140px] text-start font-semibold  text-base'>Rating</TableHead>
                        <TableHead className="min-w-[120px] text-start font-semibold flex items-center gap-x-1 text-base"> <MdCurrencyRupee />Revenue</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.map((course) => (
                        <TableRow key={course?.courseId}>
                            <TableCell className="font-start font-normal text-nowrap text-base">{course?.title}</TableCell>
                            <TableCell className='text-start font-normal text-nowrap  text-base'>{course?.enrollments}</TableCell>
                            <TableCell className='text-start font-normal text-nowrap  text-base'>{course?.avgRating} ({course?.reviews})</TableCell>
                            <TableCell className="text-start font-normal text-nowrap flex items-center gap-x-1 text-base"> <MdCurrencyRupee /> {(course?.revenue / 100).toFixed(2)}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

export default CourseEngagementTable