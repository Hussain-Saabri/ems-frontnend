import React from "react";

export function Logo({ width = 32, height = 32, className = "", showText = true }) {
    return (
        <div className={`flex items-center gap-3 ${className}`}>
            <svg
                width={width}
                height={height}
                viewBox="0 0 512 512"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="rounded-xl shadow-lg shadow-blue-100"
            >
                <defs>
                    <linearGradient id="ems-gradient" x1="0" y1="0" x2="512" y2="512" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#2563EB" />
                        <stop offset="1" stop-color="#1D4ED8" />
                    </linearGradient>
                </defs>
                <rect width="512" height="512" rx="120" fill="url(#ems-gradient)" />
                <path d="M160 140H352V195H225V235H332V290H225V330H352V385H160V140Z" fill="white" />
                <rect x="0" y="440" width="512" height="72" fill="white" fill-opacity="0.05" />
            </svg>
            {showText && (
                <span className="text-2xl font-extrabold tracking-tight bg-gradient-to-br from-blue-700 to-blue-900 bg-clip-text text-transparent">
                    EMS
                </span>
            )}
        </div>
    );
}
