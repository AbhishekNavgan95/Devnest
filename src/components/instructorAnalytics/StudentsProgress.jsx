import React, { useEffect, useState } from 'react'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

const StudentsProgress = ({ data }) => {
    const [currentCourse, setCurrentCourse] = useState(null);

    useEffect(() => {
        if (data && data.length > 0) {
            setCurrentCourse(data[0]);
        }
    }, [data]);

    return (
        <div className="flex p-6 overflow-hidden flex-col gap-y-4 items-center justify-between border border-dark-600 rounded-xl bg-white shadow-sm shadow-dark-400 w-full">
            <div className='flex flex-col md:flex-row gap-y-2 items-center justify-between w-full'>
                <p className='text-xl font-semibold text-start'>Student Progress</p>
                <Select
                    onValueChange={(val) => {
                        const selected = data.find((course) => course.courseId === val);
                        setCurrentCourse(selected);
                    }}
                >
                    <SelectTrigger className="min-w-[280px] border border-dark-600">
                        <SelectValue placeholder="Select a course" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            {data.map((course) => (
                                <SelectItem key={course.courseId} value={course.courseId}>
                                    {course.course}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>

            {currentCourse && (
                <div className="w-full">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="text-start text-base font-semibold">Student</TableHead>
                                <TableHead className="text-start text-base font-semibold">Progress (%)</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {currentCourse.students.map((student, index) => (
                                <TableRow key={index}>
                                    <TableCell className="text-start text-base">{student.student}</TableCell>
                                    <TableCell className="text-start text-base">{student.progressPercent}%</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            )}
        </div>
    );
};

export default StudentsProgress;
