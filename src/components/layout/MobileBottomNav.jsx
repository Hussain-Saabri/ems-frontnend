import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import {
    UserGroupIcon,
    UserAdd01Icon,
    Logout01Icon,
} from 'hugeicons-react';
import useAuthStore from '@/store/authStore';

export function MobileBottomNav() {
    const location = useLocation();
    const navigate = useNavigate();
    const user = useAuthStore((state) => state.user);
    const logout = useAuthStore((state) => state.logout);

    const handleLogout = () => {
        logout(navigate);
    };

    const navItems = [
        {
            label: "Employees",
            href: "/employees",
            icon: UserGroupIcon
        },
        {
            label: "Add New",
            href: "/employees/add",
            icon: UserAdd01Icon
        },
        {
            label: "Logout",
            onClick: handleLogout,
            icon: Logout01Icon,
            isAction: true,
            color: "text-rose-500"
        },
    ];

    return (
        <div className="fixed bottom-4 left-0 right-0 z-50 px-4 md:hidden pointer-events-none">
            <nav className="mx-auto max-w-[400px] pointer-events-auto bg-white/70 backdrop-blur-2xl border border-white/40 shadow-[0_12px_40px_-12px_rgba(0,0,0,0.15)] rounded-[24px] h-[72px] flex items-center justify-between px-2 overflow-hidden relative">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    // For employees list, match exactly or with subroutes (like profile)
                    // but "Add New" should be its own thing.
                    const isActive = !item.isAction && (
                        location.pathname === item.href ||
                        (item.href === '/employees' && location.pathname.startsWith('/employees/'))
                    ) && !(item.href === '/employees' && location.pathname === '/employees/add');

                    // Specific check for "Add New"
                    const isAddActive = !item.isAction && item.href === '/employees/add' && location.pathname === '/employees/add';

                    const activeMatch = item.href === '/employees/add' ? isAddActive : isActive;

                    return (
                        <div key={item.label || item.href} className="flex-1 h-full relative flex items-center justify-center">
                            {/* Animated Background Pill */}
                            {activeMatch && (
                                <motion.div
                                    layoutId="activePill"
                                    className="absolute inset-x-1 inset-y-2 bg-blue-600/10 rounded-2xl z-0"
                                    transition={{ duration: 0.2 }}
                                />
                            )}

                            {item.isAction ? (
                                <button
                                    onClick={item.onClick}
                                    className="relative z-10 flex flex-col items-center justify-center w-full h-full text-gray-400 active:scale-90 transition-transform duration-200 gap-1.5"
                                >
                                    <div className="p-1 rounded-xl transition-colors duration-300">
                                        <Icon size={22} variant="linear" className="group-active:text-rose-600" />
                                    </div>
                                    <span className="text-[10px] font-bold tracking-tight opacity-60">
                                        {item.label}
                                    </span>
                                </button>
                            ) : (
                                <NavLink
                                    to={item.href}
                                    className={cn(
                                        "relative z-10 flex flex-col items-center justify-center w-full h-full transition-all duration-300 gap-1.5",
                                        activeMatch ? "text-blue-600" : "text-gray-400"
                                    )}
                                >
                                    <motion.div
                                        animate={{ scale: activeMatch ? 1.1 : 1 }}
                                        className={cn(
                                            "transition-colors duration-300",
                                        )}
                                    >
                                        <Icon
                                            size={22}
                                            variant={activeMatch ? "solid" : "linear"}
                                            className={cn(activeMatch ? "text-blue-600" : "text-gray-400")}
                                        />
                                    </motion.div>

                                    <motion.span
                                        animate={{
                                            opacity: activeMatch ? 1 : 0.6,
                                            y: activeMatch ? 0 : 2
                                        }}
                                        className={cn(
                                            "text-[10px] font-bold tracking-tight transition-colors duration-300",
                                            activeMatch ? "text-blue-600" : "text-gray-400"
                                        )}
                                    >
                                        {item.label}
                                    </motion.span>
                                </NavLink>
                            )}
                        </div>
                    );
                })}
            </nav>
        </div>
    );
}
