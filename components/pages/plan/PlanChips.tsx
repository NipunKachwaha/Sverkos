"use client";

import { useState, forwardRef } from "react";
import { X, ArrowUpRight } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/Chatbox/dropdown-menu";
import { cn } from "@/lib/utils";
import { Liquid, type Colors } from "@/components/ui/liquid-gradient";

const COLORS: Colors = {
    color1: "#FFFFFF",
    color2: "#1E10C5",
    color3: "#9089E2",
    color4: "#FCFCFE",
    color5: "#F9F9FD",
    color6: "#B2B8E7",
    color7: "#0E2DCB",
    color8: "#0017E9",
    color9: "#4743EF",
    color10: "#7D7BF4",
    color11: "#0B06FC",
    color12: "#C5C1EA",
    color13: "#1403DE",
    color14: "#B6BAF6",
    color15: "#C1BEEB",
    color16: "#290ECB",
    color17: "#3F4CC0",
};

const mainChips = [
    "Tasks & Workflows",
    "CRM & Sales",
    "Content & Sites",
    "Finance",
    "Booking",
    "E-Commerce",
    "Projects",
    "Events & Community",
    "Wellness",
    "Operations",
];

const subChipsMap: Record<string, string[]> = {
    "Tasks & Workflows": [
        "To-do list",
        "Project board (Kanban)",
        "Time tracker",
        "Expense tracker",
        "Automation rules",
    ],
    "CRM & Sales": [
        "Contact management",
        "Deal pipeline",
        "Lead scoring",
        "Email sequences",
        "Follow-up reminders",
    ],
    "Content & Sites": [
        "Blog posts",
        "Landing pages",
        "SEO tools",
        "Media library",
        "Content calendar",
    ],
    Finance: [
        "Invoicing",
        "Budget planner",
        "Tax reports",
        "Revenue dashboard",
        "Recurring bills",
    ],
    Booking: [
        "Calendar sync",
        "Appointment slots",
        "Reminders",
        "Payment integration",
        "Waitlist",
    ],
    "E-Commerce": [
        "Product catalog",
        "Cart & checkout",
        "Order management",
        "Shipping",
        "Discount codes",
    ],
    Projects: [
        "Milestones",
        "Team assignments",
        "Gantt charts",
        "File sharing",
        "Time estimation",
    ],
    "Events & Community": [
        "Event calendar",
        "Ticketing",
        "Discussion forums",
        "Memberships",
        "Live streaming",
    ],
    Wellness: [
        "Session booking",
        "Client profiles",
        "Health records",
        "Notifications",
        "Progress tracking",
    ],
    Operations: [
        "Inventory",
        "Vendor management",
        "Quality control",
        "Reporting",
        "Workflow builder",
    ],
};

const VISIBLE_COUNT = 5;

/* ------------------------------------------------------------------ */
/*  Reusable Liquid Chip                                              */
/* ------------------------------------------------------------------ */
interface LiquidChipProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    size?: "md" | "sm";
}

const LiquidChip = forwardRef<HTMLButtonElement, LiquidChipProps>(
    ({ children, className, size = "md", ...props }, ref) => {
        const [isHovered, setIsHovered] = useState(false);

        const sizeClasses =
            size === "sm"
                ? "px-4 py-2 text-[13.5px] gap-1.5"
                : "px-4 py-2.5 text-[15px] gap-2";

        return (
            <button
                ref={ref}
                className={cn(
                    "group relative inline-flex items-center rounded-lg whitespace-nowrap outline-none transition-transform hover:-translate-y-0.5",
                    sizeClasses,
                    className
                )}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                {...props}
            >
                {/* ── 1. Outer glow ── */}
                <div className="absolute w-[112.81%] h-[128.57%] top-[8.57%] left-1/2 -translate-x-1/2 filter blur-[19px] opacity-70 pointer-events-none">
                    <span className="absolute inset-0 rounded-lg bg-[#d9d9d9] filter blur-[6.5px]" />
                    <div className="relative w-full h-full overflow-hidden rounded-lg">
                        <Liquid isHovered={isHovered} colors={COLORS} />
                    </div>
                </div>

                {/* ── 2. Deep-navy drop shadow ── */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[40%] w-[92.23%] h-[112.85%] rounded-lg bg-[#010128] filter blur-[7.3px] pointer-events-none" />

                {/* ── 3. Stacked face layers ── */}
                <div className="absolute inset-0 overflow-hidden rounded-lg">
                    <span className="absolute inset-0 rounded-lg bg-[#d9d9d9]" />
                    <span className="absolute inset-0 rounded-lg bg-black" />
                    <Liquid isHovered={isHovered} colors={COLORS} />
                    <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[40%] w-[70.8%] h-[42.85%] rounded-lg filter blur-[15px] bg-[#006]" />
                </div>

                {/* ── 4. Text / content ── */}
                <span className="relative z-10 flex items-center text-white group-hover:text-black transition-colors">
                    {children}
                </span>
            </button>
        );
    }
);
LiquidChip.displayName = "LiquidChip";

/* ------------------------------------------------------------------ */
/*  Main PlanChips                                                     */
/* ------------------------------------------------------------------ */
export default function PlanChips() {
    const [selectedChip, setSelectedChip] = useState<string | null>(null);

    const visibleChips = mainChips.slice(0, VISIBLE_COUNT);
    const hiddenChips = mainChips.slice(VISIBLE_COUNT);

    const isHiddenSelected = selectedChip
        ? hiddenChips.includes(selectedChip)
        : false;

    const currentSubChips = selectedChip
        ? subChipsMap[selectedChip] || []
        : [];

    return (
        <div className="mt-5 flex flex-col items-center gap-3">
            {/* ── Main Chips Row ── */}
            <div className="flex flex-wrap items-center justify-center gap-2.5">
                {visibleChips.map((chip) => {
                    const isSelected = selectedChip === chip;

                    return (
                        <LiquidChip
                            key={chip}
                            onClick={() =>
                                setSelectedChip(isSelected ? null : chip)
                            }
                        >
                            {chip}
                            {isSelected && (
                                <span className="flex items-center justify-center rounded-full bg-white/20 p-0.5 ml-1">
                                    <X
                                        className="h-3.5 w-3.5 text-white"
                                        strokeWidth={2.5}
                                    />
                                </span>
                            )}
                        </LiquidChip>
                    );
                })}

                {/* ── …More Dropdown ── */}
                {hiddenChips.length > 0 && (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <LiquidChip>
                                {isHiddenSelected ? (
                                    <>
                                        {selectedChip}
                                        <span
                                            className="flex items-center justify-center rounded-full bg-white/20 p-0.5 ml-1"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setSelectedChip(null);
                                            }}
                                        >
                                            <X
                                                className="h-3.5 w-3.5 text-white"
                                                strokeWidth={2.5}
                                            />
                                        </span>
                                    </>
                                ) : (
                                    "... More"
                                )}
                            </LiquidChip>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent
                            align="center"
                            sideOffset={8}
                            className="w-60 p-2 rounded-xl bg-white border border-neutral-200 shadow-xl overflow-hidden"
                        >
                            {hiddenChips.map((chip) => (
                                <DropdownMenuItem
                                    key={chip}
                                    asChild
                                    onSelect={() => setSelectedChip(chip)}
                                    className="outline-none"
                                >
                                    <LiquidChip size="sm">
                                        {chip}
                                    </LiquidChip>
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                )}
            </div>

            {/* ── Sub-chips Row ── */}
            {currentSubChips.length > 0 && (
                <div className="flex flex-wrap items-center justify-center gap-2.5 animate-in fade-in-0 slide-in-from-top-2 duration-300">
                    {currentSubChips.map((subChip) => (
                        <LiquidChip key={subChip} size="sm">
                            {subChip}
                            <ArrowUpRight className="h-3 w-3 opacity-0 -translate-y-0.5 translate-x-0.5 transition-all group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0" />
                        </LiquidChip>
                    ))}
                </div>
            )}
        </div>
    );
}