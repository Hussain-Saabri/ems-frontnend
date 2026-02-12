"use client";

import React from "react";
import { useLocation } from "react-router-dom";
import { NAV_ITEMS } from "@/lib/constants";

export function Header() {
    const location = useLocation();

    // Find current label from constants or fallback
    const currentItem = NAV_ITEMS.find(item =>
        location.pathname === item.href || (item.href !== "/" && location.pathname.startsWith(item.href))
    );

    const title = currentItem ? currentItem.label : "Dashboard";

    return (
        <header className="h-[64px] flex items-center px-8 bg-white border-b border-gray-100">
            <h1 className="text-[20px] font-bold text-gray-900 tracking-tight">
                {title}
            </h1>
        </header>
    );
}
