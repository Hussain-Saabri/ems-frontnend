"use client";

import React from "react";
import { useLocation } from "react-router-dom";
import { NAV_ITEMS } from "@/lib/constants";
import { Menu01Icon } from "hugeicons-react";

export function Header({ onMenuClick }) {
    const location = useLocation();

    // Find current label from constants or fallback
    // Sort NAV_ITEMS by href length descending to match most specific route first
    const currentItem = [...NAV_ITEMS]
        .sort((a, b) => b.href.length - a.href.length)
        .find(item =>
            location.pathname === item.href || (item.href !== "/" && location.pathname.startsWith(item.href))
        );

    const title = currentItem ? currentItem.label : "Dashboard";

    return (
        <header className="h-[64px] flex items-center px-4 md:px-8 bg-white border-b border-gray-100 gap-4">
            <button
                onClick={onMenuClick}
                className="p-2 -ml-2 text-gray-500 hover:text-gray-900 md:hidden transition-colors"
                aria-label="Toggle menu"
            >
                <Menu01Icon size={24} />
            </button>
            <h1 className="text-[18px] md:text-[20px] font-bold text-gray-900 tracking-tight">
                {title}
            </h1>
        </header>
    );
}
