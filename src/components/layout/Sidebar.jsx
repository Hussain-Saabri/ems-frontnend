"use client";

import React, { useState } from "react";
import { NavItem } from "./NavItem";
import { NAV_ITEMS } from "@/lib/constants";
import { getIcon } from "@/lib/icon-map";
import {
    ArrowLeft01Icon,
    ArrowRight01Icon,
    Logout01Icon,
    Cancel01Icon,
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


import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";

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
                "fixed inset-y-0 left-0 z-50 flex flex-col h-screen bg-white border-r border-gray-200 transition-all duration-300 ease-in-out md:sticky md:top-0 md:left-0",
                collapsed ? "w-[72px]" : "w-[170px]",
                isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
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
                    <Cancel01Icon size={20} />
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

            {/* PROFILE SECTION */}
            <div className={cn(
                "mt-auto border-t border-gray-100 transition-all duration-300",
                collapsed ? "p-2 mb-6" : "p-4 mb-10"
            )}>
                <div className={cn(
                    "flex items-center gap-3 transition-all duration-300",
                    collapsed ? "flex-col" : "bg-gray-50/50 p-2.5 rounded-2xl border border-gray-100"
                )}>
                    {/* Avatar - Only show when collapsed */}
                    {collapsed && (
                        <div className="h-10 w-10 rounded-xl bg-white flex items-center justify-center shrink-0 border border-gray-100 shadow-sm mx-auto">
                            <span className="text-[#00A3FF] font-bold text-base">
                                {user?.name?.charAt(0).toUpperCase() || "U"}
                            </span>
                        </div>
                    )}

                    {/* User Info - Show when expanded */}
                    {!collapsed && (
                        <div className="flex-1 min-w-0 ml-1">
                            <p className="text-sm font-semibold text-gray-900 truncate">
                                {user?.name || "User"}
                            </p>
                            <p className="text-[11px] text-[#00A3FF] truncate font-medium">
                                {user?.email_id || "user@example.com"}
                            </p>
                        </div>
                    )}

                    {/* Logout Button with Tooltip */}
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <button
                                onClick={handleLogout}
                                className={cn(
                                    "flex items-center justify-center transition-all duration-200 shrink-0",
                                    collapsed
                                        ? "h-9 w-9 mt-2 rounded-xl text-gray-400 hover:text-red-600 hover:bg-red-50"
                                        : "h-9 w-9 rounded-xl text-gray-400 hover:text-red-600 hover:bg-white shadow-sm border border-transparent hover:border-red-100"
                                )}
                            >
                                <Logout01Icon size={18} />
                            </button>
                        </TooltipTrigger>
                        <TooltipContent side={collapsed ? "right" : "top"} sideOffset={10}>
                            <p>Logout</p>
                        </TooltipContent>
                    </Tooltip>
                </div>
            </div>
        </aside>
    );
}
