import React from 'react';
import { motion } from 'framer-motion';
import { Logo } from '@/components/base/Logo';

const LoginTransition = ({ message = "Welcome back" }) => {
    return (
        <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white"
        >
            <div className="flex flex-col items-center gap-8">
                {/* Logo with Scale-in and Fade-in */}
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                        duration: 0.8,
                        ease: [0, 0.71, 0.2, 1.01],
                        scale: {
                            type: "spring",
                            damping: 12,
                            stiffness: 100,
                            restDelta: 0.001
                        }
                    }}
                >
                    <Logo width={100} height={100} showText={false} className="shadow-2xl shadow-blue-500/10" />
                </motion.div>

                {/* Welcome Message */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className="text-center space-y-2"
                >
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-500 bg-clip-text text-transparent">
                        {message}
                    </h2>

                </motion.div>

                {/* Modern SaaS Loader */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="relative pt-4"
                >
                    <div className="flex gap-2.5">
                        {[0, 1, 2].map((i) => (
                            <motion.div
                                key={i}
                                animate={{
                                    scale: [1, 1.5, 1],
                                    opacity: [0.3, 1, 0.3]
                                }}
                                transition={{
                                    duration: 1,
                                    repeat: Infinity,
                                    delay: i * 0.2,
                                    ease: "easeInOut"
                                }}
                                className="w-2.5 h-2.5 rounded-full bg-blue-600 shadow-[0_0_10px_rgba(37,99,235,0.3)]"
                            />
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Subtle background gradient */}
            <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
                <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-blue-50/50 rounded-full blur-[120px]" />
                <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-blue-50/50 rounded-full blur-[120px]" />
            </div>
        </motion.div>
    );
};

export default LoginTransition;
