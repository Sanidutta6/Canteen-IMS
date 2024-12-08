import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import { SidebarProvider } from '@/components/ui/sidebar'
import { Toaster } from "@/components/ui/toaster"
import { AuthProvider } from '@/contexts/AuthContext'
import { Outlet } from 'react-router-dom'

export default function RootLayout() {
    return (
        <AuthProvider>
            <SidebarProvider>
                <div className="flex h-screen w-full bg-gray-100">
                    <Sidebar />
                    <div className="flex-1 flex flex-col overflow-hidden">
                        <Header />
                        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200 p-6">
                            <Outlet />
                        </main>
                    </div>
                </div>
            </SidebarProvider>
            <Toaster />
        </AuthProvider>
    )
}