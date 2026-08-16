export default function BlogSidebar() {
    const categories = [
        "All",
        "App Building 101",
        "AI Insights",
        "Website Creation",
        "Announcements",
        "Case Studies",
        "Vibe Coding 101"
    ];

    return (
        <aside className="w-full md:w-64 shrink-0 pr-8">
            <ul className="flex flex-col gap-4 sticky top-24 text-sm font-medium">
                {categories.map((cat, i) => (
                    <li key={i}>
                        <a
                            href="#"
                            className={`block transition-colors ${i === 0 ? 'text-white' : 'text-white/40 hover:text-white'}`}
                        >
                            {i === 0 ? `[ ${cat} ]` : cat}
                        </a>
                    </li>
                ))}
            </ul>
        </aside>
    );
}