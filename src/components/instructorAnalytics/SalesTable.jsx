import React from 'react'
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
import { MdCurrencyRupee } from 'react-icons/md';

const SalesTable = ({
    data
}) => {

    return (
        <div className="flex p-6 overflow-hidden flex-col gap-y-4 items-center justify-between border border-dark-600 rounded-xl bg-white shadow-sm shadow-dark-400 w-full">
            <div className='flex flex-col items-start gap-y-4 justify-between w-full'>
                <p className='text-xl font-semibold text-start'>Sales report</p>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="min-w-[140px] text-start font-semibold  text-sm">Student Name</TableHead>
                            <TableHead className="min-w-[140px] text-start font-semibold  text-sm">Email</TableHead>
                            <TableHead className='min-w-[140px] text-start font-semibold  text-sm'>Course Name</TableHead>
                            <TableHead className="min-w-[120px] text-start font-semibold flex items-center gap-x-1 text-sm"> <MdCurrencyRupee /> Amount</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.map((sale) => (
                            <TableRow key={sale?._id}>
                                <TableCell className="font-start font-normal text-nowrap text-sm">{sale?.student?.firstName} {sale?.student?.lastName}</TableCell>
                                <TableCell className='text-start font-normal text-nowrap  text-sm'>{sale?.student?.email}</TableCell>
                                <TableCell className='text-start font-normal text-nowrap  text-sm'>{sale?.course?.title}</TableCell>
                                <TableCell className="text-start font-normal text-nowrap flex items-center gap-x-1 text-sm"> <MdCurrencyRupee /> {(sale?.amount / 100).toFixed(2)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

export default SalesTable