import * as React from "react"
import { ArrowRight, BarChart2, ChevronRight, CookingPot, Home, Package, Settings, ShoppingCart, Users } from "lucide-react"
import { Link, useLocation } from "react-router-dom"

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem, SidebarRail } from "@/components/ui/sidebar"
import { useAuth } from "@/contexts/AuthContext"

const data = {
    groups: [
        {
            label: "",
            allowedRole: [""],
            items: [
                { title: 'Dashboard', icon: Home, url: '/' },
                { title: 'Inventory', icon: Package, url: '/inventory' },
                { title: 'Orders', icon: ShoppingCart, url: '/orders' },
                { title: 'Suppliers', icon: Users, url: '/suppliers' },
                { title: 'Reports', icon: BarChart2, url: '/reports' },
                { title: 'Settings', icon: Settings, url: '/settings' },
            ]
        },
    ],
}

export default function SideBar() {
    const [isMobile, setIsMobile] = React.useState(false)
    const location = useLocation()
    const { user } = useAuth()
    // check with user.user_category for allowedRole

    React.useEffect(() => {
        const checkIsMobile = () => {
            setIsMobile(window.innerWidth < 768)
        }

        checkIsMobile()
        window.addEventListener('resize', checkIsMobile)

        return () => window.removeEventListener('resize', checkIsMobile)
    }, [])

    const isActive = (url) => {
        return location.pathname === url
    }

    const isActiveParent = (items) => {
        return items.some(item => isActive(item.url))
    }

    // Fallback for unauthenticated users
    const userCategory = user?.user_category || "";

    return (
        <Sidebar collapsible="icon" className="bg-background/80">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton>
                            <div className="flex items-center">
                                <CookingPot className="h-6 w-6 object-contain" />
                                <h1 className="ml-2 text-2xl font-bold">CanteenIMS</h1>
                            </div>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                {/* Made changes here for allowed role */}
                {data.groups.filter(group => group.allowedRole.includes(userCategory)).map((group, groupIndex) => (
                    <SidebarGroup key={groupIndex} className={groupIndex === 1 ? "group-data-[collapsible=icon]:hidden" : ""}>
                        <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
                        <SidebarMenu>
                            {group.items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    {item.items ? (
                                        <Collapsible defaultOpen={isActiveParent(item.items)} className="group/collapsible">
                                            <CollapsibleTrigger asChild>
                                                <SidebarMenuButton
                                                    tooltip={item.title}
                                                    className={isActiveParent(item.items) ? "bg-ternary-background text-primary font-medium" : ""}
                                                >
                                                    {item.icon && <item.icon className="size-4" />}
                                                    <span>{item.title}</span>
                                                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                                                </SidebarMenuButton>
                                            </CollapsibleTrigger>
                                            <CollapsibleContent>
                                                <SidebarMenuSub>
                                                    {item.items?.map((subItem) => (
                                                        <SidebarMenuSubItem key={subItem.title}>
                                                            <SidebarMenuSubButton className={isActive(subItem.url) ? "bg-ternary-background text-primary font-medium [&_svg]:text-primary" : ""} asChild>
                                                                <Link
                                                                    to={subItem.url}
                                                                >
                                                                    <ArrowRight />
                                                                    <span>{subItem.title}</span>
                                                                </Link>
                                                            </SidebarMenuSubButton>
                                                        </SidebarMenuSubItem>
                                                    ))}
                                                </SidebarMenuSub>
                                            </CollapsibleContent>
                                        </Collapsible>
                                    ) : (
                                        <SidebarMenuButton
                                            tooltip={item.title}
                                            asChild
                                            className={isActive(item.url) ? "bg-ternary-background text-primary font-medium" : ""}
                                        >
                                            <Link to={item.url}>
                                                {item.icon && <item.icon className="size-4" />}
                                                <span>{item.title}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    )}
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroup>
                ))}
            </SidebarContent>
            <SidebarRail />
        </Sidebar>
    )
}