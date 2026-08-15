// app/api/deploy/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { files, projectName, vercelToken } = await req.json();

        if (!files || files.length === 0) {
            return NextResponse.json({ error: "No files to deploy" }, { status: 400 });
        }

        if (!vercelToken) {
            return NextResponse.json({ error: "vercel Token is required" }, { status: 400 });
        }

        const safeProjectName = projectName
            .toLowerCase()
            .replace(/[^a-z0-9-]/g, "-")
            .replace(/^-+|-+$/g, "") || "ai-generated-app";

        const vercelFiles = files.map((file: any) => ({
            file: file.path,
            data: typeof file.content === "string" ? file.content : JSON.stringify(file.content, null, 2),
            encoding: "utf8" as const,
        }));

        // Check if package.json exists
        const hasPackageJson = files.some((f: any) => f.path === "package.json" || f.path === "./package.json");
        if (!hasPackageJson) {
            return NextResponse.json({ error: "package.json is missing. Cannot deploy." }, { status: 400 });
        }

        console.log(`Deploying ${safeProjectName} to Vercel with ${vercelFiles.length} files...`);

        // Vercel API Call
        const response = await fetch("https://api.vercel.com/v13/deployments", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${vercelToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: safeProjectName,
                files: vercelFiles,
                projectSettings: {
                    framework: "nextjs",
                },
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            console.error("Vercel API Error:", data);
            const errorMsg = data.error?.message || "Failed to deploy to Vercel";
            throw new Error(errorMsg);
        }

        const deployUrl = data.url || `https://${safeProjectName}.vercel.app`;

        return NextResponse.json({
            success: true,
            url: deployUrl,
            deploymentId: data.id,
        });
    } catch (error: any) {
        console.error("Deploy Error:", error);
        return NextResponse.json(
            { error: error.message || "Deployment failed" },
            { status: 500 }
        );
    }
}