"use client";

import React, { useState } from "react";
import { NavItem } from "./NavItem";
import { NAV_ITEMS } from "@/lib/constants";
import { getIcon } from "@/lib/icon-map";
import {
    ArrowLeft01Icon,
    ArrowRight01Icon,
    Logout01Icon,
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
import useAuthStore from "@/store/authStore";


export function Sidebar({ collapsed: initialCollapsed = false, onToggle, isOpen, onClose }) {
    const [collapsed, setCollapsed] = useState(initialCollapsed);
    const navigate = useNavigate();
    const user = useAuthStore((state) => state.user);
    const logout = useAuthStore((state) => state.logout);

    const handleToggle = () => {
        const newState = !collapsed;
        setCollapsed(newState);
        if (onToggle) onToggle(newState);
    };

    const handleLogout = () => {
        logout(navigate);
    };

    const navItems = [
        { label: "Employees", href: "/employees", icon: "employees" },
        { label: "Add Employee", href: "/employees/add", icon: "add-employee" },
    ];

    return (
        <aside
            className={cn(
                "flex flex-col h-screen z-40 bg-white border-r border-gray-200 transition-all duration-300 ease-in-out",
                // Mobile Styles
                "fixed inset-y-0 left-0 transform",
                isOpen ? "translate-x-0" : "-translate-x-full",
                // Desktop Styles
                "md:relative md:translate-x-0",
                collapsed ? "md:w-[72px]" : "md:w-[170px]",
                "w-[240px]" // Width on mobile
            )}
        >
            {/* HEADER */}
            <div className={cn(
                "flex items-center h-[64px] border-b border-gray-100 transition-all duration-300",
                collapsed ? "justify-center px-0" : "justify-between px-6"
            )}>
                <Logo showText={!collapsed} />

                {/* Mobile Close Button */}
                <button
                    onClick={onClose}
                    className="md:hidden p-2 text-gray-500 hover:text-gray-900"
                >
                    <ArrowLeft01Icon size={20} />
                </button>
            </div>

            {/* COLLAPSE TOGGLE (Desktop Only) */}
            <button
                onClick={handleToggle}
                className={cn(
                    "absolute top-[20px] -right-3 z-50 hidden md:flex",
                    "items-center justify-center w-6 h-6",
                    "bg-white border border-gray-200 rounded-full shadow-sm",
                    "text-gray-500 hover:text-blue-600 hover:border-blue-200 hover:scale-110",
                    "transition-all duration-200 ease-in-out cursor-pointer"
                )}
            >
                {collapsed ? (
                    <ArrowRight01Icon size={14} strokeWidth={2.5} />
                ) : (
                    <ArrowLeft01Icon size={14} strokeWidth={2.5} />
                )}
            </button>

            {/* NAVIGATION */}
            <div className="flex-1 overflow-y-auto py-8 px-4">
                <nav className="flex flex-col gap-2">
                    {navItems.map((item) => {
                        const Icon = getIcon(item.icon);
                        return (
                            <NavItem
                                key={item.href}
                                href={item.href}
                                icon={Icon}
                                label={item.label}
                                collapsed={collapsed}
                                onClick={() => {
                                    if (window.innerWidth < 768) onClose();
                                }}
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
                            collapsed && "md:justify-center"
                        )}>
                            <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center shrink-0 border border-gray-100 shadow-sm">
                                <span className="text-[#00A3FF] font-bold text-sm">
                                    {user?.name?.charAt(0).toUpperCase() || "U"}
                                </span>
                            </div>
                            {(!collapsed || window.innerWidth < 768) && (
                                <div className="flex flex-col items-start text-left overflow-hidden">
                                    <span className="text-sm font-semibold text-gray-900 truncate w-full">
                                        {user?.name || "User"}
                                    </span>
                                    <span className="text-[11px] text-[#00A3FF] truncate w-full font-medium">
                                        {user?.email_id || "user@example.com"}
                                    </span>
                                </div>
                            )}
                        </button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end" className="w-[172px] p-1.5 rounded-xl border-gray-200 bg-white shadow-lg">
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
