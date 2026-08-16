import { getAllBlogs } from '@/lib/blogs';
import BlogCard from '@/components/pages/resources/blog/BlogCard';
import BlogSidebar from '@/components/pages/resources/blog/BlogSidebar';
import FAQWrapper from '@/components/pages/FAQWrapper';
import SmoothScrolling from '@/components/ui/SmoothScrolling';
import Navbar from '@/components/navigation/Navbar';
import BackgroundEffects from '@/components/pages/home/BackgroundEffects';
import { PageLoadTrigger } from '@/components/LoadingScreen/PageLoadTrigger';

export default function BlogPage() {
    const blogs = getAllBlogs();

    return (
        <SmoothScrolling>
            <FAQWrapper>
                <div className="blog-wrapper-override w-full min-h-screen text-white relative z-10 flex flex-col items-center">
                    <style dangerouslySetInnerHTML={{
                        __html: `
                            div.sticky.h-screen:has(> .blog-wrapper-override) {
                            height: auto !important;
                            min-height: 100vh !important;
                            position: relative !important;
                        }
                    `}} />
                    
                    {/* Background Effects */}
                    <BackgroundEffects />
                    
                    {/* Navigation */}
                    <Navbar />

                    {/* PageLoad Trigger */}
                    <PageLoadTrigger />
                    
                    <div className="w-full max-w-7xl px-4 sm:px-8 py-24">

                        {/* Breadcrumb */}
                        <div className="text-sm text-white/40 mb-12">
                            Home / Blog / <span className="text-white">Backend</span>
                        </div>

                        <div className="flex flex-col md:flex-row gap-12 border-t border-white/10 pt-12">
                            <BlogSidebar />

                            <main className="flex-1 border-l border-white/10 pl-0 md:pl-12">
                                {/* Header */}
                                <div className="mb-16 max-w-2xl">
                                    <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-6">Backend</h1>
                                    <p className="text-xl text-white/60">
                                        Guides for the data, functions, and logic that power your app behind the scenes.
                                    </p>
                                </div>

                                {/* Blog Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16">
                                    {blogs.map((blog) => (
                                        <BlogCard key={blog.slug} blog={blog} />
                                    ))}
                                </div>
                            </main>
                        </div>

                    </div>
                </div>
            </FAQWrapper>
        </SmoothScrolling>
    );
}