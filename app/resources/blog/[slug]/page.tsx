import type { Metadata } from 'next';
import SmoothScrolling from '@/components/ui/SmoothScrolling';
import Navbar from '@/components/navigation/Navbar';
import Link from 'next/link';
import { getBlogBySlug, getAllBlogs } from '@/lib/blogs';
import ReactMarkdown from 'react-markdown';
import { notFound } from 'next/navigation';
import rehypeRaw from 'rehype-raw';
import FAQWrapper from '@/components/pages/FAQWrapper';

export const metadata: Metadata = {
    title: 'Blogs',
  };

export async function generateStaticParams() {
    const blogs = await getAllBlogs();
    return blogs.map((blog) => ({
        slug: blog.slug,
    }));
}

export default function BlogPost({ params }: { params: { slug: string } }) {
    const blog = getBlogBySlug(params.slug);

    if (!blog) {
        // Return notFound for better SSR support (throws to Next.js handler)
        return notFound();
    }

    return (
        <SmoothScrolling>
            <Navbar />
            <FAQWrapper>
                {/* Scroll fix identifier */}
                <div className="blog-wrapper-override w-full min-h-screen bg-black text-white relative z-10 flex flex-col items-center">
                    {/* FAQWrapper Scroll Override */}
                    <style
                        dangerouslySetInnerHTML={{
                            __html: `
                                div.sticky.h-screen:has(> .blog-wrapper-override) {
                                  height: auto !important;
                                  min-height: 100vh !important;
                                  position: relative !important;
                                }
                            `,
                        }}
                    />

                    <main className="w-full max-w-3xl px-4 sm:px-8 py-24 mx-auto font-sans">
                        {/* Back Button */}
                        <Link
                            href="/resources/blog"
                            className="inline-flex items-center text-white/60 hover:text-white mb-12 transition-colors text-sm font-medium"
                        >
                            <span className="mr-2">←</span> Back
                        </Link>

                        {/* Title */}
                        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8 leading-[1.2] text-white">
                            <span className="inline bg-gradient-to-r from-white to-white bg-no-repeat bg-left-bottom [background-size:0%_4px] hover:[background-size:100%_4px] transition-[background-size] duration-500 pb-2 cursor-default">
                                {blog.title}
                            </span>
                        </h1>

                        {/* Meta Info */}
                        {blog.date && blog.readTime && (
                            <div className="text-white/50 text-base mb-8 font-medium">
                                Published {blog.date} • {blog.readTime}
                            </div>
                        )}

                        {/* Excerpt / Intro Text */}
                        {blog.excerpt && (
                            <p className="text-xl md:text-2xl text-white/80 leading-relaxed mb-10">
                                {blog.excerpt}
                            </p>
                        )}

                        {/* Custom CTA matching screenshot */}
                        <div className="font-semibold text-lg mb-12">
                            Ready to see what Sverkos can do for you?{' '}
                            <a href="#" className="underline underline-offset-4 hover:text-white/70 transition-colors">
                                Get started →
                            </a>
                        </div>

                        {/* Hero Image */}
                        {blog.image && (
                            <div className="w-full rounded-2xl overflow-hidden mb-16 border border-white/10">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={blog.image}
                                    alt={blog.title}
                                    className="w-full h-auto object-cover"
                                />
                            </div>
                        )}

                        <div className="
            w-full max-w-none text-lg text-white/80 leading-[1.8]
            
            /* Paragraph Spacing */
            [&>p]:mb-8
            
            /* Headings Styling */
            [&>h2]:text-3xl md:[&>h2]:text-4xl [&>h2]:font-bold [&>h2]:text-white [&>h2]:mt-16 [&>h2]:mb-6 [&>h2]:tracking-tight
            [&>h3]:text-2xl [&>h3]:font-bold [&>h3]:text-white [&>h3]:mt-12 [&>h3]:mb-4
            
            /* Lists Styling */
            [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:mb-8 [&>ul>li]:mb-3 [&>ul>li>strong]:text-white
            [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:mb-8 [&>ol>li]:mb-3
            
            /* Blockquote Styling */
            [&>blockquote]:border-l-4 [&>blockquote]:border-orange-500 [&>blockquote]:bg-white/5 [&>blockquote]:py-5 [&>blockquote]:px-6 [&>blockquote]:my-10 [&>blockquote]:rounded-r-lg [&>blockquote]:text-white/90 [&>blockquote>p]:mb-0
            
            /* Links Styling */
            [&>a]:text-white [&>a]:underline [&>a]:underline-offset-4 hover:[&>a]:text-white/70
            
            /* Bold Text */
            [&>strong]:text-white

            [&>details]:border-b [&>details]:border-white/20 [&>details]:py-6
            first-of-type:[&>details]:border-t
            [&>details>summary]:list-none [&>details>summary::-webkit-details-marker]:hidden
            [&>details>summary]:text-2xl md:[&>details>summary]:text-3xl [&>details>summary]:font-medium [&>details>summary]:text-white [&>details>summary]:cursor-pointer [&>details>summary]:flex [&>details>summary]:justify-between [&>details>summary]:items-center
            [&>details>summary]:after:content-['↓'] [&>details>summary]:after:flex [&>details>summary]:after:items-center [&>details>summary]:after:justify-center [&>details>summary]:after:w-10 [&>details>summary]:after:h-10 [&>details>summary]:after:rounded-full [&>details>summary]:after:border-2 [&>details>summary]:after:border-white [&>details>summary]:after:text-white [&>details>summary]:after:text-xl [&>details>summary]:after:font-light [&>details>summary]:after:transition-transform [&>details>summary]:after:duration-300
            [&>details[open]>summary]:after:rotate-180
            [&>details>div]:mt-6 [&>details>div]:text-white/70 [&>details>div]:text-lg
          ">
                            <ReactMarkdown rehypePlugins={[rehypeRaw]}>
                                {blog.content}
                            </ReactMarkdown>
                        </div>
                    </main>
                </div>
            </FAQWrapper>
        </SmoothScrolling>
    );
}