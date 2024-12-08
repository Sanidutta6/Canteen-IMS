"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { FileDown } from 'lucide-react'
import { format, subDays, eachDayOfInterval, addDays } from 'date-fns'

const generateMockData = (startDate, endDate) => {
    const days = eachDayOfInterval({ start: startDate, end: endDate })
    return days.map(day => ({
        date: format(day, 'yyyy-MM-dd'),
        sales: Math.floor(Math.random() * 1000) + 500,
        stock: Math.floor(Math.random() * 200) + 100
    }))
}

export default function Reports() {
    const [reportType, setReportType] = useState('sales')
    const [startDate, setStartDate] = useState(format(subDays(new Date(), 30), 'yyyy-MM-dd'))
    const [endDate, setEndDate] = useState(format(new Date(), 'yyyy-MM-dd'))
    const [data, setData] = useState(generateMockData(new Date(startDate), new Date(endDate)))

    const handleDateChange = () => {
        const newData = generateMockData(new Date(startDate), new Date(endDate))
        setData(newData)
    }

    const handleDownload = (format) => {
        // In a real application, this would trigger a backend request to generate the file
        console.log(`Downloading ${reportType} report in ${format} format`)
    }

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Reports</h1>
                <Select onValueChange={(value) => setReportType(value)}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select report type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="sales">Sales Report</SelectItem>
                        <SelectItem value="inventory">Inventory Report</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>{reportType === 'sales' ? 'Sales Report' : 'Inventory Report'}</CardTitle>
                    <CardDescription>Select date range and download options</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex space-x-4 mb-4">
                        <div className="grid w-full max-w-sm items-center gap-1.5">
                            <Label htmlFor="startDate">Start Date</Label>
                            <Input
                                type="date"
                                id="startDate"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                            />
                        </div>
                        <div className="grid w-full max-w-sm items-center gap-1.5">
                            <Label htmlFor="endDate">End Date</Label>
                            <Input
                                type="date"
                                id="endDate"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                            />
                        </div>
                        <Button onClick={handleDateChange} className="mt-auto">Update</Button>
                    </div>

                    <ChartContainer config={{
                        [reportType]: {
                            label: reportType === 'sales' ? 'Sales' : 'Stock',
                            color: "hsl(var(--chart-1))",
                        },
                    }} className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={data}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" />
                                <YAxis />
                                <ChartTooltip content={<ChartTooltipContent />} />
                                <Legend />
                                <Line type="monotone" dataKey={reportType} stroke="var(--color-chart-1)" name={reportType === 'sales' ? 'Sales' : 'Stock'} />
                            </LineChart>
                        </ResponsiveContainer>
                    </ChartContainer>

                    <div className="flex justify-end space-x-2 mt-4">
                        <Button onClick={() => handleDownload('csv')} variant="outline">
                            <FileDown className="mr-2 h-4 w-4" /> CSV
                        </Button>
                        <Button onClick={() => handleDownload('excel')} variant="outline">
                            <FileDown className="mr-2 h-4 w-4" /> Excel
                        </Button>
                        <Button onClick={() => handleDownload('pdf')} variant="outline">
                            <FileDown className="mr-2 h-4 w-4" /> PDF
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}