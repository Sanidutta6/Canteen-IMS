"use client"

import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const mockDemandData = [
    { date: '2023-01', demand: 100 },
    { date: '2023-02', demand: 120 },
    { date: '2023-03', demand: 110 },
    { date: '2023-04', demand: 130 },
    { date: '2023-05', demand: 140 },
    { date: '2023-06', demand: 135 },
]

export default function InventoryItem() {
    const params = useParams()
    const { toast } = useToast()
    const [item, setItem] = useState(null)
    const [demandData, setDemandData] = useState(mockDemandData)

    useEffect(() => {
        // In a real application, you would fetch the item data from an API
        // For this example, we'll use mock data
        const mockItem = {
            id: Number(params.id),
            name: 'Sample Product',
            quantity: 50,
            unit: 'units',
            threshold: 10,
        }
        setItem(mockItem)
    }, [params.id])

    const handleUpdate = (e) => {
        e.preventDefault()
        // In a real application, you would send an API request to update the item
        toast({
            title: "Success",
            description: "Product updated successfully.",
        })
    }

    if (!item) {
        return <div>Loading...</div>
    }

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">{item.name} Details</h1>
            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Product Information</CardTitle>
                        <CardDescription>Update product details</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleUpdate} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    value={item.name}
                                    onChange={(e) => setItem({ ...item, name: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="quantity">Quantity</Label>
                                <Input
                                    id="quantity"
                                    type="number"
                                    value={item.quantity}
                                    onChange={(e) => setItem({ ...item, quantity: Number(e.target.value) })}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="unit">Unit</Label>
                                <Input
                                    id="unit"
                                    value={item.unit}
                                    onChange={(e) => setItem({ ...item, unit: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="threshold">Threshold</Label>
                                <Input
                                    id="threshold"
                                    type="number"
                                    value={item.threshold}
                                    onChange={(e) => setItem({ ...item, threshold: Number(e.target.value) })}
                                />
                            </div>
                            <Button type="submit">Update Product</Button>
                        </form>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Demand Trend</CardTitle>
                        <CardDescription>Monthly demand for the past 6 months</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer config={{
                            demand: {
                                label: "Demand",
                                color: "hsl(var(--chart-1))",
                            },
                        }} className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={demandData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="date" />
                                    <YAxis />
                                    <ChartTooltip content={<ChartTooltipContent />} />
                                    <Legend />
                                    <Line type="monotone" dataKey="demand" stroke="var(--color-demand)" name="Demand" />
                                </LineChart>
                            </ResponsiveContainer>
                        </ChartContainer>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}