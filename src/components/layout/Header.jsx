"use client";

import React from "react";
import { useLocation } from "react-router-dom";
import { NAV_ITEMS } from "@/lib/constants";
import { Menu01Icon } from "hugeicons-react";

export function Header({ onMenuClick }) {
    const location = useLocation();

    // Find current label from constants or fallback
    const currentItem = [...NAV_ITEMS]
        .sort((a, b) => b.href.length - a.href.length)
        .find(item =>
            location.pathname === item.href || (item.href !== "/" && location.pathname.startsWith(item.href))
        );

    const title = currentItem ? currentItem.label : "Dashboard";

    return (
        <header className="sticky top-0 z-40 h-[64px] flex items-center px-4 md:px-8 bg-white/90 backdrop-blur-lg border-b border-gray-100 rounded-b-[24px] md:rounded-none shadow-sm md:shadow-none relative outline-none transition-all duration-300">
            {/* Desktop Title */}
            <h1 className="hidden md:block text-[20px] font-bold text-gray-900 tracking-tight">
                {title}
            </h1>

            {/* Mobile Centered Branding */}
            <div className="md:hidden absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="flex items-center justify-center">
                    <span className="text-3xl font-[1000] tracking-tighter text-blue-600 drop-shadow-sm">
                        EMS
                    </span>
                </div>
            </div>

            {/* Empty spacer for flex alignment continuity on desktop */}
            <div className="flex-1 md:hidden" />
        </header>
    );
}
