import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { MobileBottomNav } from "./MobileBottomNav";
import { cn } from "@/lib/utils";

export function MainLayout() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
    const closeSidebar = () => setIsSidebarOpen(false);

    return (
        <div className="flex h-screen w-full relative bg-gray-50/30">
            {/* Sidebar with desktop-only logic handled in Sidebar component */}
            <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />

            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                <Header onMenuClick={toggleSidebar} />
                <main className="flex-1 overflow-auto pb-24 md:pb-0">
                    <div className="p-4 md:p-8">
                        <Outlet />
                    </div>
                </main>
            </div>

            {/* Premium Mobile Bottom Nav */}
            <MobileBottomNav />

            {/* Backdrop for mobile */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 md:hidden transition-all duration-300"
                    onClick={closeSidebar}
                />
            )}
        </div>
    );
}
