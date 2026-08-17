import Link from 'next/link';
import { BlogPost } from '@/lib/blogs';

export default function BlogCard({ blog }: { blog: BlogPost }) {
    return (
        <Link href={`/resources/blog/${blog.slug}`} className="group flex flex-col gap-4">
            {/* Image Container */}
            <div className="w-full aspect-[4/3] rounded-xl overflow-hidden bg-white/5 border border-white/10">
                <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
            </div>

            {/* Meta Info */}
            <div className="text-xs text-white/50 flex items-center gap-2 font-medium">
                <span>Published {blog.date}</span>
                <span>•</span>
                <span>{blog.readTime}</span>
            </div>

            {/* Content */}
            <div className="flex flex-col gap-2">
                <h3 className="text-2xl font-semibold text-white tracking-tight leading-snug">
                    <span className="inline bg-gradient-to-r from-white to-white bg-no-repeat bg-left-bottom [background-size:0%_2px] group-hover:[background-size:100%_2px] transition-[background-size] duration-500 pb-1">
                        {blog.title}
                    </span>
                </h3>
                <p className="text-white/60 text-sm leading-relaxed line-clamp-3 mt-1">
                    {blog.excerpt}
                </p>
            </div>

            {/* Category Tag */}
            <div className="mt-2">
                <span className="text-xs font-medium px-3 py-1.5 rounded-md bg-white/10 text-white/80 border border-white/10">
                    {blog.category}
                </span>
            </div>
        </Link>
    );
}