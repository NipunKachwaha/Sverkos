import React from "react";
import { Search, MessageSquare, Contact } from "lucide-react";
import { Sidebar } from "@/components/Sidebar/sidebar";

export default function MessagesPage() {
    return (
        <div className="flex h-screen bg-white">

            {/* Left Sidebar */}
            <Sidebar />

            {/* Main Content Column */}
            <div className="flex flex-col flex-1 overflow-hidden">

                {/* Header */}
                <div className="w-full px-8 py-6 border-b border-neutral-200 bg-[#fafafa]">
                    <h1 className="text-3xl font-semibold text-black tracking-tight">Messages</h1>
                </div>

                {/* Main Content Area (Chat + List) */}
                <div className="flex flex-1 overflow-hidden">

                    {/* Left Panel (DM List & Search) */}
                    <div className="w-[320px] lg:w-[380px] border-r border-neutral-200 flex flex-col bg-white shrink-0">
                        <div className="p-4 border-b border-neutral-100">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                                <input
                                    type="text"
                                    placeholder="Search direct messages"
                                    className="w-full pl-9 pr-4 py-2.5 text-sm border border-neutral-200 rounded-md focus:outline-none focus:ring-1 focus:ring-neutral-300 placeholder:text-neutral-400 transition-shadow"
                                    suppressHydrationWarning
                                />
                            </div>
                        </div>

                        {/* Left Column Empty State */}
                        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
                            <div className="w-12 h-12 bg-neutral-100 rounded-xl flex items-center justify-center mb-4">
                                <Contact className="w-5 h-5 text-neutral-600" />
                            </div>
                            <h3 className="text-sm font-semibold text-black mb-1.5">No DMs yet</h3>
                            <p className="text-sm text-neutral-500 max-w-[220px] leading-relaxed">
                                Your direct conversations with partners will appear here.
                            </p>
                        </div>
                    </div>

                    {/* Right Area (Chat View) */}
                    <div className="flex-1 bg-white flex flex-col items-center justify-center text-center">
                        <div className="w-12 h-12 bg-neutral-100 rounded-xl flex items-center justify-center mb-4">
                            <MessageSquare className="w-5 h-5 text-neutral-600" />
                        </div>
                        <h3 className="text-base font-semibold text-black mb-1.5">Select a direct message</h3>
                        <p className="text-sm text-neutral-500">
                            Pick a partner from the list to open the DM.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}