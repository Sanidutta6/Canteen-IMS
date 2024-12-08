"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/hooks/use-toast"

export default function Settings() {
    const [settings, setSettings] = useState({
        canteenName: 'My Canteen',
        lowStockThreshold: 10,
        enableNotifications: true,
        enableAutoReorder: false,
    })
    const { toast } = useToast()

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target
        setSettings(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        // Here you would typically send the settings to your backend
        console.log('Settings saved:', settings)
        toast({
            title: "Success",
            description: "Settings updated successfully.",
        })
    }

    return (
        <div className="space-y-4">
            <h1 className="text-2xl font-bold">Settings</h1>
            <form onSubmit={handleSubmit}>
                <Card>
                    <CardHeader>
                        <CardTitle>General Settings</CardTitle>
                        <CardDescription>Manage your canteen's general settings</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-1">
                            <Label htmlFor="canteenName">Canteen Name</Label>
                            <Input
                                id="canteenName"
                                name="canteenName"
                                value={settings.canteenName}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="lowStockThreshold">Low Stock Threshold</Label>
                            <Input
                                id="lowStockThreshold"
                                name="lowStockThreshold"
                                type="number"
                                value={settings.lowStockThreshold}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="flex items-center space-x-2">
                            <Switch
                                id="enableNotifications"
                                name="enableNotifications"
                                checked={settings.enableNotifications}
                                onCheckedChange={(checked) => setSettings(prev => ({ ...prev, enableNotifications: checked }))}
                            />
                            <Label htmlFor="enableNotifications">Enable Notifications</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Switch
                                id="enableAutoReorder"
                                name="enableAutoReorder"
                                checked={settings.enableAutoReorder}
                                onCheckedChange={(checked) => setSettings(prev => ({ ...prev, enableAutoReorder: checked }))}
                            />
                            <Label htmlFor="enableAutoReorder">Enable Auto Reorder</Label>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button type="submit">Save Settings</Button>
                    </CardFooter>
                </Card>
            </form>
        </div>
    )
}