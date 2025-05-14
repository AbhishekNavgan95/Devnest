import { TrendingUp } from "lucide-react"
import { Pie, PieChart } from "recharts"

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

// Hex color mapping for statuses
const statusColors = {
    Draft: "#7482DD",      // yellow-400
    Published: "#364ACE",  // green-400
}

export default function CourseStatusChart({
    courseStatus
}) {

    // Map data for chart
    const chartData = courseStatus.map(status => ({
        label: status._id,
        value: status.count,
        fill: statusColors[status._id] || "#D1D5DB", // fallback gray-300
    }))

    const totalCourses = courseStatus.reduce((sum, item) => sum + item.count, 0)

    return (
        <Card className="flex flex-col border border-dark-600">
            <CardHeader className="items-center pb-0">
                <CardTitle>Course Status</CardTitle>
                <CardDescription>Draft vs Published</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config={{}}
                    className="mx-auto aspect-square max-h-[250px]"
                >
                    <PieChart>
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Pie
                            data={chartData}
                            dataKey="value"
                            nameKey="label"
                            innerRadius={60}
                            strokeWidth={5}
                        />
                    </PieChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col gap-2 text-sm">
                <div className="flex items-center gap-2 font-medium leading-none">
                    {totalCourses} total courses <TrendingUp className="h-4 w-4" />
                </div>
                <div className="leading-none text-muted-foreground">
                    Showing course status distribution
                </div>
            </CardFooter>
        </Card>
    )
}
