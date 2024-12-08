import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import { SidebarProvider } from '@/components/ui/sidebar'
import { Outlet } from 'react-router-dom'

export default function RootLayout() {
    return (
            <SidebarProvider>
                <div className="flex h-screen w-full">
                    <Sidebar />
                    <div className="flex-1 flex flex-col overflow-hidden">
                        <Header />
                        <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
                            <Outlet />
                        </main>
                    </div>
                </div>
            </SidebarProvider>
    )
}