"use client";

import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

export function NavItem({
    href,
    icon: Icon,
    label,
    collapsed = false,
    className,
    onClick,
}) {
    const location = useLocation();
    const isActive = href === "/"
        ? location.pathname === "/"
        : (location.pathname === href || (href !== "/employees" && location.pathname.startsWith(href)));

    const buttonContent = (
        <Link
            to={href}
            onClick={onClick}
            className={cn(
                "group relative flex items-center gap-1.5 px-2 py-2.5 rounded-xl transition-all duration-200",
                collapsed ? "justify-center px-2" : "justify-start",

                // Default State (Inactive)
                "text-gray-600 hover:bg-gray-50 hover:text-gray-900",

                // Active State
                isActive &&
                `
          bg-gray-50 text-[#111] font-semibold
          border border-gray-200
        `,

                className
            )}
        >
            <Icon
                size={20}
                strokeWidth={isActive ? 2 : 1.5}
                className={cn(
                    "transition-colors duration-200",
                    isActive ? "text-[#00A3FF]" : "text-gray-400 group-hover:text-gray-600"
                )}
            />

            {!collapsed && (
                <span className="text-[14px] tracking-tight whitespace-nowrap overflow-hidden">
                    {label}
                </span>
            )}
        </Link>
    );

    if (collapsed) {
        return (
            <TooltipProvider disableHoverableContent>
                <Tooltip delayDuration={0}>
                    <TooltipTrigger asChild>{buttonContent}</TooltipTrigger>
                    <TooltipContent side="right" className="bg-gray-900 text-white border-none text-xs font-medium px-2.5 py-1.5 rounded-lg ml-2 shadow-xl">
                        {label}
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        );
    }

    return buttonContent;
}

export default NavItem;
