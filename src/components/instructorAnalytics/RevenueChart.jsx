import { TrendingUp } from "lucide-react"
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"


export function RevenueChart({ data }) {

    const chartData = Array.from({ length: 31 }, (_, index) => {
        const day = index + 1

        const entry = data.find(
            (item) =>
                item._id.day === day &&
                item._id.month === 5 &&
                item._id.year === 2025
        )

        const label = `${day} ${new Date(2025, 4).toLocaleString('default', { month: 'short' })}`

        return {
            date: label,
            revenue: entry ? entry.total / 100 : 0,
        }
    })

    return (
        <Card className='border border-dark-600'>
            <CardHeader>
                <CardTitle className='text-xl font-semibold text-start'>Revenue Analytics</CardTitle>
                <CardDescription>
                    Showing revenue for the last month
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={280}>
                    <ChartContainer config={{}}>
                        <AreaChart
                            accessibilityLayer
                            data={chartData}
                            height={200} // Set your desired height here
                            margin={{
                                left: 12,
                                right: 12,
                            }}
                        >
                            <CartesianGrid vertical={false} />
                            <XAxis
                                dataKey="date"
                                tickLine={false}
                                axisLine={false}
                                tickMargin={8}
                            />
                            <YAxis
                                tickFormatter={(value) => `₹${value}`}
                                tickLine={false}
                                axisLine={false}
                                width={40}
                            />
                            <ChartTooltip
                                cursor={false}
                                content={({ payload }) => {
                                    if (!payload || !payload.length) return null
                                    const { value, name } = payload[0]
                                    return (
                                        <ChartTooltipContent
                                            title={name}
                                            value={`₹${value.toLocaleString()}`}
                                            indicator="line"
                                        />
                                    )
                                }}
                            />
                            <Area
                                dataKey="revenue"
                                type="monotone"
                                fill="#23328F"
                                fillOpacity={0.4}
                                stroke="#364ACE"
                            />
                        </AreaChart>
                    </ChartContainer>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    )
}
