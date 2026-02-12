"use client";

import React, { useState } from "react";
import { NavItem } from "./NavItem";
import { NAV_ITEMS } from "@/lib/constants";
import { getIcon } from "@/lib/icon-map";
import {
    ArrowLeft01Icon,
    ArrowRight01Icon,
    Logout01Icon,
    Settings01Icon,
} from "hugeicons-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { Logo } from "@/components/base/Logo";

export function Sidebar({ collapsed: initialCollapsed = false, onToggle }) {
    const [collapsed, setCollapsed] = useState(initialCollapsed);
    const navigate = useNavigate();

    // Mocked user since authStore is not installed yet
    const user = {
        name: "Shabbir",
        email: "shabbir@example.com",
    };

    const handleToggle = () => {
        const newState = !collapsed;
        setCollapsed(newState);
        if (onToggle) onToggle(newState);
    };

    const handleLogout = () => {
        console.log("Logging out...");
        navigate("/login");
    };

    return (
        <aside
            className={cn(
                "flex flex-col h-screen relative",
                collapsed ? "w-[72px]" : "w-[180px]",
                "relative transition-all duration-300 ease-in-out z-40",
                "bg-white border-r border-gray-200"
            )}
        >
            {/* HEADER */}
            <div className={cn(
                "flex items-center h-[64px] px-6 border-b border-transparent",
                collapsed ? "justify-center" : "justify-between"
            )}>
                {!collapsed ? (
                    <Logo />
                ) : (
                    <div className="w-8 h-8 bg-[#00A3FF] rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold italic">Q</span>
                    </div>
                )}
            </div>

            {/* COLLAPSE TOGGLE */}
            <button
                onClick={handleToggle}
                className={cn(
                    "absolute -right-3 top-[20px] z-50",
                    "flex items-center justify-center w-6 h-6",
                    "bg-white border border-gray-200 rounded-full",
                    "text-gray-500 hover:text-gray-800 hover:bg-gray-50 hover:scale-105",
                    "transition-all duration-200 ease-in-out cursor-pointer shadow-sm"
                )}
            >
                {collapsed ? (
                    <ArrowRight01Icon size={14} strokeWidth={2} />
                ) : (
                    <ArrowLeft01Icon size={14} strokeWidth={2} />
                )}
            </button>

            {/* NAVIGATION */}
            <div className="flex-1 overflow-y-auto py-8 px-4">
                <nav className="flex flex-col gap-2">
                    {NAV_ITEMS.map((item) => {
                        const Icon = getIcon(item.icon);
                        return (
                            <NavItem
                                key={item.href}
                                href={item.href}
                                icon={Icon}
                                label={item.label}
                                collapsed={collapsed}
                            />
                        );
                    })}
                </nav>
            </div>

            {/* PROFILE BUTTON */}
            <div className="p-4 border-t border-gray-100 mb-4">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button className={cn(
                            "flex items-center gap-3 w-full p-2.5 rounded-xl transition-all duration-200",
                            "bg-gray-100 border border-transparent hover:bg-gray-200",
                            collapsed && "justify-center"
                        )}>
                            <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center shrink-0 border border-gray-100 shadow-sm">
                                <span className="text-[#00A3FF] font-bold text-sm">
                                    {user?.name?.charAt(0).toUpperCase() || "U"}
                                </span>
                            </div>
                            {!collapsed && (
                                <div className="flex flex-col items-start text-left overflow-hidden">
                                    <span className="text-sm font-semibold text-gray-900 truncate w-full">
                                        {user?.name || "User"}
                                    </span>
                                    <span className="text-[11px] text-[#00A3FF] truncate w-full font-medium">
                                        {user?.email || "user@example.com"}
                                    </span>
                                </div>
                            )}
                        </button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end" className="w-[172px] p-1.5 rounded-xl border-gray-200 bg-white shadow-lg">
                        <DropdownMenuLabel className="text-xs text-[#00A3FF] font-medium px-2 py-1.5 uppercase tracking-wider">
                            My Account
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator className="bg-gray-100" />
                        <DropdownMenuItem
                            onClick={() => navigate("/settings")}
                            className="rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 py-2 cursor-pointer"
                        >
                            <Settings01Icon className="mr-2 h-4 w-4" />
                            Settings
                        </DropdownMenuItem>

                        <DropdownMenuSeparator className="bg-gray-100" />
                        <DropdownMenuItem
                            onClick={handleLogout}
                            className="rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 py-2 cursor-pointer"
                        >
                            <Logout01Icon className="mr-2 h-4 w-4" />
                            Logout
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </aside>
    );
}
