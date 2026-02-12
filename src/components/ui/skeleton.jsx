import { cn } from "@/lib/utils"

function Skeleton({
    className,
    variant = "pulse", // "pulse" or "shimmer"
    ...props
}) {
    return (
        <div
            className={cn(
                "rounded-md bg-slate-100",
                variant === "pulse" ? "animate-pulse" : "animate-shimmer",
                className
            )}
            {...props}
        />
    )
}

export { Skeleton }
