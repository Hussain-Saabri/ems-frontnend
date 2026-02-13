import React from 'react';

const Shimmer = ({ className, delay = 0 }) => (
    <div
        className={`animate-shimmer rounded-md ${className}`}
        style={{ animationDelay: `${delay}ms` }}
    />
);

export const ProfileSkeleton = () => {
    return (
        <div className="space-y-6 max-w-7xl mx-auto animate-pulse">
            {/* Header Skeleton */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <Shimmer className="h-10 w-10 rounded-full" />
                    <Shimmer className="h-8 w-48" delay={100} />
                </div>
                <div className="flex items-center gap-3">
                    <Shimmer className="h-10 w-32 rounded-lg" delay={200} />
                    <Shimmer className="h-10 w-24 rounded-lg" delay={300} />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Card Skeleton */}
                <div className="lg:col-span-1">
                    <div className="bg-white border border-gray-100 rounded-2xl p-8 flex flex-col items-center text-center shadow-sm">
                        <div className="relative">
                            <Shimmer className="w-32 h-32 rounded-full border-4 border-white shadow-md" delay={150} />
                            <div className="absolute bottom-1 right-1 w-6 h-6 rounded-full border-4 border-white bg-gray-100" />
                        </div>

                        <div className="mt-6 space-y-3 w-full flex flex-col items-center">
                            <Shimmer className="h-6 w-3/4 rounded-lg" delay={250} />
                            <Shimmer className="h-4 w-1/2 rounded-lg" delay={350} />
                        </div>

                        <div className="mt-6 w-full pt-6 border-t border-gray-50 flex justify-center">
                            <Shimmer className="h-8 w-24 rounded-full" delay={450} />
                        </div>
                    </div>
                </div>

                {/* Right Card Skeleton */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
                        <div className="px-8 py-6 border-b border-gray-50">
                            <Shimmer className="h-6 w-40" delay={200} />
                        </div>

                        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <div key={i} className="space-y-3">
                                    <div className="flex items-center gap-2">
                                        <Shimmer className="h-4 w-4 rounded-full" delay={300 + i * 100} />
                                        <Shimmer className="h-3 w-20" delay={350 + i * 100} />
                                    </div>
                                    <Shimmer className="h-5 w-3/4" delay={400 + i * 100} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
