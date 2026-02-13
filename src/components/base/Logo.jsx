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
                className="shrink-0 rounded-xl overflow-hidden shadow-sm"
            >
                <rect width="512" height="512" fill="#2563EB" />
                <path d="M160 140H352V195H225V235H332V290H225V330H352V385H160V140Z" fill="white" />
            </svg>
            {showText && (
                <span className="text-2xl font-extrabold tracking-tight bg-gradient-to-br from-blue-700 to-blue-900 bg-clip-text text-transparent">
                    EMS
                </span>
            )}
        </div>
    );
}
