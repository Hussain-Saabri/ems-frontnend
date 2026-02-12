import React from "react";

export function Logo({ width = 110, height = 30, className = "" }) {
    return (
        <div className={`flex items-center gap-2 ${className}`}>
            <div
                className="bg-[#00A3FF] rounded-lg flex items-center justify-center"
                style={{ width: 32, height: 32 }}
            >
                <span className="text-white font-bold text-xl italic">Q</span>
            </div>
            <span className="text-2xl font-bold tracking-tight text-[#00A3FF]">
                Quap
            </span>
        </div>
    );
}
