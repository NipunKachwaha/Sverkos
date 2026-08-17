import Link from 'next/link';

export default function BlogSidebar({ currentCategory }: { currentCategory: string }) {
    const categories = [
        "All",
        "App Building 101",
        "AI Insights",
        "Website Creation",
        "Announcements",
        "Backend",
        "Inside Sverkos",
        "Case Studies",
        "Vibe Coding 101",
        "Reports",
        "Stories",
        "Tutorials",
        "Changelog",
    ];

    return (
        <aside className="w-full md:w-64 shrink-0 pr-8">
            <ul className="flex flex-col gap-4 sticky top-24 text-sm font-medium">
                {categories.map((cat, i) => {
                    const isActive = currentCategory === cat;
                    const href = cat === "All" ? "/resources/blog" : `/resources/blog?category=${encodeURIComponent(cat)}`;

                    return (
                        <li key={i}>
                            <Link
                                href={href}
                                className={`block transition-colors ${isActive ? 'text-white' : 'text-white/40 hover:text-white'}`}
                            >
                                {isActive ? `[ ${cat} ]` : cat}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </aside>
    );
}