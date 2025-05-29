import React from 'react'
import { Star } from "lucide-react"
import { Label, Pie, PieChart } from "recharts"

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

const colorPalette = [
    "#949FE5",
    "#7482DD",  
    "#5768D6",
    "#364ACE",
    "#2B3DB0",
]

const RatingChart = ({ avgRating, data }) => {
    const chartData = data?.map((item, index) => ({
        label: `${item?._id} Star${item?._id > 1 ? 's' : ''}`,
        value: item?.count,
        fill: colorPalette[(item._id - 1) % colorPalette.length], // Assign color based on _id (1 to 5)
    })) || []

    const totalRatings = data?.reduce((sum, item) => sum + item.count, 0) || 0

    return (
        <Card className="flex flex-col border border-dark-600">
            <CardHeader className="items-center pb-0">
                <CardTitle>Ratings Overview</CardTitle>
                <CardDescription>From enrolled students</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer config={{}} className="mx-auto aspect-square max-h-[250px]">
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
                        >
                            <Label
                                content={({ viewBox }) => {
                                    if (!viewBox || !("cx" in viewBox)) return null
                                    return (
                                        <text
                                            x={viewBox.cx}
                                            y={viewBox.cy}
                                            textAnchor="middle"
                                            dominantBaseline="middle"
                                        >
                                            <tspan
                                                x={viewBox.cx}
                                                y={viewBox.cy}
                                                className="fill-main-400 text-3xl font-bold"
                                            >
                                                {Number(avgRating)?.toFixed(1) || "0.0"}
                                            </tspan>
                                            <tspan
                                                x={viewBox.cx}
                                                y={(viewBox.cy || 0) + 24}
                                                className="fill-muted-foreground text-sm"
                                            >
                                                Avg. Rating
                                            </tspan>
                                        </text>
                                    )
                                }}
                            />
                        </Pie>
                    </PieChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col gap-2 text-sm">
                <div className="flex items-center gap-2 font-medium leading-none">
                    {totalRatings} total ratings <Star className="h-4 w-4 text-main-400" />
                </div>
                <div className="leading-none text-muted-foreground">
                    Distribution by star level
                </div>
            </CardFooter>
        </Card>
    )
}

export default RatingChart
