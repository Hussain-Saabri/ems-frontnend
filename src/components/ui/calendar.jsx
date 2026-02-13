"use client"

import * as React from "react"
import { DayPicker } from "react-day-picker"
import { ArrowLeft01Icon, ArrowRight01Icon } from "hugeicons-react"

import { cn } from "@/lib/utils"
// Note: react-day-picker styles are typically imported in index.css or here
import "react-day-picker/dist/style.css"

function Calendar({
    className,
    classNames,
    showOutsideDays = true,
    ...props
}) {
    return (
        <DayPicker
            showOutsideDays={showOutsideDays}
            className={cn("p-3", className)}
            classNames={{
                months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
                month: "space-y-4",
                caption: "flex justify-between pt-1 relative items-center px-10",
                caption_label: "text-sm font-bold text-gray-900",
                nav: "space-x-1 flex items-center",
                nav_button: cn(
                    "h-8 w-8 bg-transparent p-0 opacity-50 hover:opacity-100 transition-opacity"
                ),
                nav_button_previous: "absolute left-2",
                nav_button_next: "absolute right-2",
                table: "w-full border-collapse space-y-1",
                head_row: "flex",
                head_cell: "text-gray-400 rounded-md w-9 font-medium text-[12px]",
                row: "flex w-full mt-2",
                cell: cn(
                    "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-transparent",
                    props.mode === "range"
                        ? "[&:has(>.day-range-end)]:animate-shimmer [&:has(>.day-range-start)]:animate-shimmer"
                        : ""
                ),
                day: cn(
                    "h-9 w-9 p-0 font-normal aria-selected:opacity-100 hover:bg-gray-50 rounded-lg transition-all"
                ),
                day_selected: "bg-blue-600 text-white hover:bg-blue-700 hover:text-white focus:bg-blue-600 focus:text-white rounded-lg shadow-md shadow-blue-200",
                day_today: "bg-gray-50 text-blue-600 font-bold border border-blue-100",
                day_outside: "text-gray-300 opacity-50 pointer-events-none",
                day_disabled: "text-gray-300 opacity-50",
                day_range_middle: "aria-selected:bg-blue-50 aria-selected:text-blue-600",
                day_hidden: "invisible",
                ...classNames,
            }}
            components={{
                IconLeft: ({ ...props }) => <ArrowLeft01Icon className="h-4 w-4" />,
                IconRight: ({ ...props }) => <ArrowRight01Icon className="h-4 w-4" />,
            }}
            {...props}
        />
    )
}
Calendar.displayName = "Calendar"

export { Calendar }
