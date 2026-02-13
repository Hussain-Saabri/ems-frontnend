"use client"

import * as React from "react"
import { format } from "date-fns"
import { Calendar01Icon } from "hugeicons-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

export function DatePicker({ date, setDate, placeholder = "Pick a date", className }) {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    className={cn(
                        "w-full h-11 justify-start text-left font-normal rounded-[10px] border-gray-200 hover:bg-gray-50 transition-all",
                        !date && "text-gray-400",
                        className
                    )}
                >
                    <Calendar01Icon className="mr-2 h-4 w-4 text-blue-500" />
                    {date ? format(new Date(date), "PPP") : <span>{placeholder}</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 border-0 overflow-hidden" align="start">
                <Calendar
                    mode="single"
                    selected={date ? new Date(date) : undefined}
                    onSelect={(selectedDate) => {
                        if (selectedDate) {
                            // Backend expects YYYY-MM-DD
                            const formattedDate = selectedDate.toISOString().split('T')[0];
                            setDate(formattedDate);
                        } else {
                            setDate("");
                        }
                    }}
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    )
}

export default DatePicker;
