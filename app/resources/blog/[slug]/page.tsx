import { getBlogBySlug, getAllBlogs } from '@/lib/blogs';
import ReactMarkdown from 'react-markdown';
import { notFound } from 'next/navigation';

// Next.js ko pehle se pata chal jayega ki kitne blogs hain (For fast static generation)
export async function generateStaticParams() {
    const blogs = getAllBlogs();
    return blogs.map((blog) => ({
        slug: blog.slug,
    }));
}

export default function BlogPost({ params }: { params: { slug: string } }) {
    const blog = getBlogBySlug(params.slug);

    if (!blog) {
        notFound();
    }

    return (
        <article className="min-h-screen bg-transparent text-white max-w-3xl mx-auto px-4 py-24">
            <header className="mb-12">
                <div className="text-sm text-white/50 mb-6 font-medium">
                    Published {blog.date} • {blog.readTime}
                </div>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 leading-tight">
                    {blog.title}
                </h1>
                <span className="text-xs font-medium px-3 py-1.5 rounded-md bg-white/10 text-white/80 border border-white/10">
                    {blog.category}
                </span>
            </header>

            {/* Markdown Content Styling */}
            <div className="prose prose-invert prose-lg max-w-none text-white/80">
                <ReactMarkdown>{blog.content}</ReactMarkdown>
            </div>
        </article>
    );
}