"use client";

import { useState, useRef } from "react";
import { Paperclip, Upload, ArrowRightLeft, EarthIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "./dropdown-menu";
import { UrlModal } from "@/components/StartFromURL/url-modal";
import { ConnectGoogleDriveModal } from "@/components/ConnectGoogleDrive/connect-google-drive-modal";
import Image from "next/image";

// Google Drive SVG Icon
const GoogleDriveIcon = () => (
    <div className="relative w-4 h-4 flex items-center justify-center">
        <Image
            src="/icons/google-drive.svg"
            alt="Google Drive"
            width={16}
            height={16}
            className="object-contain"
            priority
        />
    </div>
);

// Figma SVG Icon
const FigmaIcon = () => (
    <div className="relative w-4 h-4 flex items-center justify-center">
        <Image
            src="/icons/figma.svg"
            alt="Figma Icon"
            width={16}
            height={16}
            className="object-contain"
            priority
        />
    </div>
);

interface FileAttachButtonProps {
    className?: string;
    onFilesSelected?: (files: File[]) => void;
}

export function FileAttachButton({ className, onFilesSelected }: FileAttachButtonProps) {
    const [isUrlModalOpen, setIsUrlModalOpen] = useState(false);
    const [isDriveModalOpen, setIsDriveModalOpen] = useState(false);
    
    // Hidden file input ke liye ref
    const hiddenFileInputRef = useRef<HTMLInputElement>(null);

    const handleAction = (label: string) => {
        switch (label) {
            case "Start from URL":
                setIsUrlModalOpen(true);
                break;
            case "Upload from Google Drive":
                setIsDriveModalOpen(true);
                break;
            case "Upload from computer":
                hiddenFileInputRef.current?.click();
                break;
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const selectedFiles = Array.from(e.target.files);
            onFilesSelected?.(selectedFiles);
        }
        e.target.value = ""; 
    };

    return (
        <>
            <input
                type="file"
                ref={hiddenFileInputRef}
                className="hidden"
                multiple
                onChange={handleFileChange}
            />

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <div
                        className={cn(
                            "flex items-center justify-center h-9 w-9 rounded-xl cursor-pointer transition-all duration-300",
                            "bg-white/30 dark:bg-black/30 backdrop-blur-xl backdrop-saturate-150 border border-white/40 dark:border-white/10",
                            "shadow-[inset_0_1px_1px_rgba(255,255,255,0.3)] hover:bg-white/40 dark:hover:bg-black/40 hover:scale-105 active:scale-95",
                            "text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white",
                            className
                        )}
                    >
                        <Paperclip className="w-4 h-4" />
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                    align="start"
                    sideOffset={10}
                    className={cn(
                        "w-[260px] p-2 rounded-2xl",
                        "bg-white/80 dark:bg-neutral-900/80 backdrop-blur-3xl backdrop-saturate-200",
                        "border border-white/50 dark:border-white/10 shadow-xl"
                    )}
                >
                    {[
                        { icon: <Upload className="w-4 h-4" />, label: "Upload from computer" },
                        { icon: <GoogleDriveIcon />, label: "Upload from Google Drive" },
                        { icon: <EarthIcon className="w-4 h-4" />, label: "Start from URL" },
                        { icon: <ArrowRightLeft className="w-4 h-4" />, label: "Migrate from another platform" },
                        { icon: <FigmaIcon />, label: "Import from Figma" },
                    ].map((item, idx) => (
                        <div key={idx}>
                            {idx === 2 && (
                                <div className="my-1 border-t border-white dark:border-white/20" />
                            )}
                            <DropdownMenuItem
                                onSelect={() => handleAction(item.label)}
                                className="flex items-center gap-3 h-10 px-3 rounded-xl cursor-pointer hover:bg-black/5 dark:hover:bg-white/10 text-sm font-medium"
                            >
                                {item.icon}
                                {item.label}
                            </DropdownMenuItem>
                        </div>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>

            {/* URL Modal */}
            <UrlModal
                isOpen={isUrlModalOpen}
                onClose={() => setIsUrlModalOpen(false)}
            />

            {/* Google Drive Modal */}
            <ConnectGoogleDriveModal
                isOpen={isDriveModalOpen}
                onClose={() => setIsDriveModalOpen(false)}
                onConnect={() => {
                    setIsDriveModalOpen(false);
                }}
            />
        </>
    );
}