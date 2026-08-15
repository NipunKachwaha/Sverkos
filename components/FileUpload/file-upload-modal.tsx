// @/components/FileUpload/file-upload-modal.tsx (Example)
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"; // Assuming you use shadcn/ui or similar
import { FileUploader, FileInput, FileUploaderContent, FileUploaderItem } from "./file-upload";
import { useState } from "react";

export function FileUploadModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
    const [files, setFiles] = useState<File[] | null>(null);

    const dropzone = {
        accept: { "image/*": [".jpg", ".jpeg", ".png"] },
        multiple: true,
        maxFiles: 4,
        maxSize: 1 * 1024 * 1024,
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Upload Files</DialogTitle>
                </DialogHeader>

                {/* Tumhare file-upload.tsx wale components */}
                <FileUploader
                    value={files}
                    onValueChange={setFiles}
                    dropzoneOptions={dropzone}
                >
                    <FileInput>
                        <div className="flex items-center justify-center h-32 border-2 border-dashed rounded-md">
                            <p>Drag & drop files here</p>
                        </div>
                    </FileInput>
                    <FileUploaderContent>
                        {files && files.map((file, i) => (
                            <FileUploaderItem key={i} index={i}>
                                {file.name}
                            </FileUploaderItem>
                        ))}
                    </FileUploaderContent>
                </FileUploader>

            </DialogContent>
        </Dialog>
    );
}