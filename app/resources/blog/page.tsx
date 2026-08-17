import SmoothScrolling from '@/components/ui/SmoothScrolling';
import { getAllBlogs } from '@/lib/blogs';
import BlogCard from '@/components/pages/resources/blog/BlogCard';
import BlogSidebar from '@/components/pages/resources/blog/BlogSidebar';
import FAQWrapper from '@/components/pages/FAQWrapper';

export default function BlogPage({ searchParams }: { searchParams: { category?: string } }) {
    const blogs = getAllBlogs();

    const currentCategory = searchParams.category || "All";

    const filteredBlogs = currentCategory === "All"
        ? blogs
        : blogs.filter(blog => blog.category === currentCategory);

    return (
        <SmoothScrolling>
            <FAQWrapper>
                <div className="blog-wrapper-override w-full min-h-screen bg-black text-white relative z-10 flex flex-col items-center">

                    <style dangerouslySetInnerHTML={{
                        __html: `
                            div.sticky.h-screen:has(> .blog-wrapper-override) {
                            height: auto !important;
                            min-height: 100vh !important;
                            position: relative !important;
                        }
                    `}} />

                    <div className="w-full max-w-7xl px-4 sm:px-8 py-24">

                        {/* DYNAMIC Breadcrumb */}
                        <div className="text-sm text-white/40 mb-12">
                            Home / Blog / <span className="text-white">{currentCategory}</span>
                        </div>

                        <div className="flex flex-col md:flex-row gap-12 border-t border-white/10 pt-12">
                            <BlogSidebar currentCategory={currentCategory} />

                            <main className="flex-1 border-l border-white/10 pl-0 md:pl-12">
                                {/* DYNAMIC Header */}
                                <div className="mb-16 max-w-2xl">
                                    <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-6">
                                        {currentCategory === "All" ? "All about Sverkos" : currentCategory}
                                    </h1>
                                    <p className="text-xl text-white/60">
                                        {currentCategory === "All"
                                            ? "Catch up on the latest from Sverkos: what we're interested in, excited about, and working on next."
                                            : `Explore the latest articles and updates in ${currentCategory}.`
                                        }
                                    </p>
                                </div>

                                {/* DYNAMIC Blog Grid */}
                                {filteredBlogs.length > 0 ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16">
                                        {filteredBlogs.map((blog) => (
                                            <BlogCard key={blog.slug} blog={blog} />
                                        ))}
                                    </div>
                                ) : (
                                    <div className="py-24 text-center border border-white/10 rounded-2xl bg-white/5">
                                        <p className="text-white/60 text-lg">No posts found in {currentCategory} yet.</p>
                                    </div>
                                )}
                            </main>
                        </div>

                    </div>
                </div>
            </FAQWrapper>
        </SmoothScrolling>
    );
}