import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const blogsDirectory = path.join(process.cwd(), 'content/blogs');

export interface BlogPost {
    slug: string;
    title: string;
    excerpt: string;
    date: string;
    readTime: string;
    category: string;
    image: string;
    content: string;
}

export function getAllBlogs(): BlogPost[] {
    console.log("=== BLOG DEBUG START ===");

    console.log("👉 Main folder path (cwd):", process.cwd());
    console.log("👉 Looking in folder:", blogsDirectory);

    if (!fs.existsSync(blogsDirectory)) {
        console.log("❌ ERROR: Folder not found! Please check the path.");
        console.log("=== BLOG DEBUG END ===");
        return [];
    }

    const fileNames = fs.readdirSync(blogsDirectory);

    console.log("✅ Folder found. Files inside:", fileNames);

    const allBlogs = fileNames
        .filter((fileName) => {
            const isMd = fileName.endsWith('.md');
            if (!isMd) console.log(`⚠️ Skipped: ${fileName} (Not a .md file)`);
            return isMd;
        })
        .map((fileName) => {
            const slug = fileName.replace(/\.md$/, '');
            const fullPath = path.join(blogsDirectory, fileName);
            const fileContents = fs.readFileSync(fullPath, 'utf8');

            const { data, content } = matter(fileContents);

            return {
                slug,
                title: data.title || "No Title",
                excerpt: data.excerpt || "No Excerpt",
                date: data.date || "No Date",
                readTime: data.readTime || "5 min read",
                category: data.category || "Uncategorized",
                image: data.image || "",
                content,
            };
        });

    console.log("✅ Total blogs to render:", allBlogs.length);
    console.log("=== BLOG DEBUG END ===");

    return allBlogs.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getBlogBySlug(slug: string): BlogPost | null {
    const fullPath = path.join(blogsDirectory, `${slug}.md`);
    if (!fs.existsSync(fullPath)) return null;

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
        slug,
        title: data.title,
        excerpt: data.excerpt,
        date: data.date,
        readTime: data.readTime,
        category: data.category,
        image: data.image,
        content,
    };
}