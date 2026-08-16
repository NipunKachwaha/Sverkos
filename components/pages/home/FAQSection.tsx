"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SlicedRollingText } from "@/components/ui/SlicedRollingText";
import FadingVideo from '@/components/ui/FadingVideo'

interface FAQItem {
    question: string;
    answer: string;
}

const faqs: FAQItem[] = [
    {
        question: "What is Sverkos?",
        answer: `Sverkos is an advanced AI-powered no-code platform designed to empower anyone to build fully functional apps, websites, and AI-driven agents without writing a single line of code. At its core, Sverkos revolutionizes the traditional development process: instead of manually handling design, structure, and logic, users simply describe their idea—no matter how detailed or abstract—and the platform’s intelligent system brings it to life. This includes designing user interfaces, generating backend logic, managing data models, and even setting up authentication, all completely behind the scenes.

But Sverkos goes far beyond static website builders or basic no-code tools. One of its most distinguishing features is access to Superagents—sophisticated AI assistants capable of automating workflows, integrating with external tools (like Google Calendar or Slack), and performing complex tasks automatically. Whether you’re building a simple website, a business portal, or a data-driven SaaS product, Sverkos is designed for anyone: entrepreneurs, creators, or enterprises.

By lifting the burden of technical implementation, Sverkos enables creators to focus entirely on vision, user experience, and growth—while the AI handles infrastructure, deployment, hosting, and seamless scaling as your app evolves. In summary, Sverkos democratizes software development, making powerful, production-grade apps accessible to everyone, regardless of technical background.`,
    },
    {
        question: "How does Sverkos work?",
        answer: `Sverkos makes app building as intuitive as a conversation. To get started, you simply describe your idea—whether you have a complete vision or just a loose concept. The platform’s AI analyzes your input to clarify features, user needs, and desired outcomes. Next, it automatically generates the entire project structure: this includes clean, maintainable code, a tailored UI, workflow logic, data handling, and any backend services needed.

From this baseline, you can chat back and forth with the AI to further refine or evolve your project. Want to add new features, change layouts, or integrate third-party services? Just describe what you want—the AI interprets your instructions and updates the app accordingly, handling everything from permissions to design changes to deploying them live. No manual coding, configuration, or frustrating setup is required; the focus is on seamless iteration, empowering constant improvement as you build toward your ideal application.`,
    },
    {
        question: "How much does it cost?",
        answer: `Sverkos offers a generous free plan to help you get started, requiring no credit card and including a set number of monthly AI credits for building, generating, and refining your projects. This allows you to experiment, test various ideas, and even launch simple apps without spending anything. For users or teams who need more power—whether for larger projects, more frequent generation, or advanced collaboration—paid plans start at $16/month (billed annually). Higher plans unlock features like increased AI credit limits, advanced integrations, team collaboration tools, priority support, and more. All pricing details and plan comparisons are fully transparent on our website, so you can pick the subscription that scales with your needs.`,
    },
    {
        question: "Do I need coding experience?",
        answer: `No coding experience is required to use Sverkos! The platform is built from the ground up so anyone—especially founders, business owners, or creators with no technical expertise—can turn their ideas into real, production-ready software. All the complexity of programming, server setup, deployment, and security is handled automatically by the system, letting you focus exclusively on your product’s functionality and business goals. Whether you’re a tech veteran or stepping into app creation for the first time, Sverkos makes the process straightforward and accessible.`,
    },
    {
        question: "Which AI no-code platform is best to build an app?",
        answer: `When looking for the best AI no-code platform to build a complete app, several crucial factors should be at the top of your list:

- **Full-stack generation:** Does the AI handle both the backend (databases, logic, authentication, APIs) and frontend UI, or does it only create static pages?
- **True no-code flexibility:** Can you modify or iterate on your app simply by describing changes—no navigating cryptic settings or add-ons?
- **Instant hosting and deployment:** Are your creations automatically published live and ready to use without manual setup?
- **Powerful integrations:** Can your app connect seamlessly to tools like Slack, Google Calendar, Notion, Salesforce, or even custom APIs?
- **Scalability and robustness:** Will the app you build perform well for a handful of users—or for your whole business as it grows?
- **Security and data ownership:** Does the platform keep your data locked in, or is it secure and exportable?

Sverkos stands out by offering all of the above. Whether you’re building a simple landing page, a business management portal, or an entire SaaS product, Sverkos’s AI can generate backend and frontend logic, automate hosting, integrate with nearly any third-party service, and instantly scale as your requirements grow. The result? Instead of relying on limited templates or patching together complex workflows, you just state your goals in plain language—and Sverkos’s AI assembles everything you need, saving you time, frustration, and resources.`,
    },
    {
        question: "Can I build a complete website with AI using Sverkos?",
        answer: `Absolutely. Sverkos can generate a fully functional, production-ready website of almost any type, driven only by your written description. There’s no need for coding, design expertise, or configuration. Here’s how Sverkos can support a variety of website needs:

- **Business websites & landing pages:** Promote brands, launch marketing campaigns, or establish your company’s online presence with beautiful, responsive pages.
- **Portfolios or personal sites:** Showcase your work, skills, and achievements with automatically generated galleries, testimonials, and easy-to-update content.
- **Online stores:** Build e-commerce platforms complete with product catalogs, shopping cart functionality, payment processing, and customer management.
- **Internal tools and dashboards:** Create portals for your team, manage company data, visualize KPIs, or automate workflows—all in one unified interface.

With Sverkos, publishing is instant. As soon as you’re happy with your site, you can launch it live—with built-in hosting, SSL, and support for custom domains. Updating your content, design, or features is as simple as chatting with the AI—eliminating the need for WordPress plugins, drag-and-drop editors, or external hosting services. You maintain complete control and can iterate rapidly based on feedback or business needs.`,
    },
    {
        question: "What kinds of apps can I build?",
        answer: `Sverkos is incredibly flexible and supports the creation of a wide range of applications. Users have successfully launched:

- **Internal dashboards** for managing operations or tracking business metrics.
- **Productivity tools** tailored to specific processes or workflows.
- **Client and customer portals** providing access to secure services, content, or support.
- **Education and e-learning platforms** featuring interactive lessons, quizzes, and data analytics.
- **Health trackers** for personal use or patient monitoring.
- **Customer relationship management (CRM) tools** that help organize leads, communications, and follow-ups.
- **E-commerce solutions** and marketplace platforms.
- **Custom data apps** for visualization or reporting.
- And so much more.

If you can describe it in words, there’s a strong chance Sverkos can help you build it. For inspiration and real-life examples, check out our Use Cases library showcasing what others have built across various industries and needs.`,
    },
    {
        question: "What integrations does Sverkos support?",
        answer: `Sverkos integrates natively with a wide variety of popular tools and platforms—including Google Calendar, Gmail, Slack, Notion, HubSpot, Salesforce, Trello, and many more—so your apps can interact seamlessly with the services you already use. In addition, you can connect your app to almost any external API, opening the door to limitless automation and customization.

Built-in modules are available for data management, sending notifications, performing background tasks, scheduling events, and even generating content with AI. This means your Sverkos-generated app can both automate internal operations and synchronize with external systems, maximizing your workflow efficiency without any manual scripting or plugin headaches.`,
    },
    {
        question: "How do credits work?",
        answer: `Credits are Sverkos’s unit for tracking how much AI-powered generation, modification, or refinement you consume. Each time you ask the AI to create a project, make dramatic changes, or add major new features, credits are used. Free plans include a base monthly allowance, allowing for meaningful experimentation and smaller projects at no cost. Upgrading to higher plans increases your credit balance for more ambitious builds or more frequent requests.

Complex actions (like generating large, multi-feature apps) may use more credits than simple tweaks (such as changing a button label). The system is transparent about your credit balance, which you can always monitor in your account dashboard, so you can plan your development activity confidently.`,
    },
    {
        question: "How are Sverkos apps deployed?",
        answer: `Sverkos automates the entire deployment and hosting process—no technical expertise or external services required. Under the hood, the system leverages reliable infrastructure (including Vercel) to ensure every app you build is deployed securely, efficiently, and with high performance.

The moment you’re ready, your app is published live to a secure, scalable environment—complete with custom domains, SSL encryption, and instant CDN distribution. There’s no need to tinker with DNS settings, manage servers, or handle manual updates. Share your app with a single link and trust that it’s built for both immediate use and long-term growth.`,
    },
    {
        question: "What is a Superagent?",
        answer: `A Superagent in Sverkos is an AI-powered assistant that acts as an extension of your app or workflow. Unlike simple bots, Superagents can connect to your emails, calendars, documents, CRM systems, and much more to automate complex tasks, manage information, interact with users, and perform multi-step workflows on your behalf. Imagine a smart teammate—always available, always working—who can handle everything from sending personalized reminders to aggregating data across platforms, or even responding to customer queries automatically. With Superagents, you unlock next-level automation, efficiency, and insight, all deeply integrated into your app’s core workflow.`,
    },
    {
        question: "Is my data secure?",
        answer: `Yes—Sverkos places the utmost priority on user data security, privacy, and reliability. The platform uses industry standard encryption for all data transmissions and storage. Authentication is secure and robust, supporting both individual and team access levels. User management and permissions are granular, giving you control over who can access, edit, or publish your projects.

We are committed to best-in-class compliance, operate under strict security protocols, and offer regular security updates and audits. Your data is not sold or shared with third parties, and you retain ownership and export rights to your projects and information. With Sverkos, you can innovate and build confidently, knowing that your intellectual property and business data are safe at every step of the process.`,
    },
];

export default function FAQSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 40, scale: 0.95 },
        show: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 20,
            },
        },
    };

    return (
        <section className="w-full pt-10 pb-24 px-6 md:px-12 lg:px-20 font-sans text-white relative">
            {/* <FadingVideo
                src="/videos/FloatingIslands.mp4"
                className="absolute left-1/2 top-0 -translate-x-1/2 object-cover object-top z-0"
                style={{ width: '120%', height: '120%', filter: "brightness(1.5) saturate(1.2)" }}
            /> */}
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24 relative items-start">
                
                {/* --- Left Column: Sticky Header --- */}
                <div className="w-full lg:w-4/12 lg:sticky lg:top-32 self-start h-auto flex flex-col gap-4 z-10">
                    <div className="w-full flex flex-col">
                        <SlicedRollingText
                            text="Frequently"
                            className="text-5xl md:text-6xl lg:text-7xl font-medium leading-tight tracking-tight normal-case"
                            staggerDelay={0.04}
                        />
                        <SlicedRollingText
                            text="asked"
                            className="text-5xl md:text-6xl lg:text-7xl font-medium leading-tight tracking-tight normal-case"
                            staggerDelay={0.04}
                        />
                        <SlicedRollingText
                            text="questions"
                            className="text-5xl md:text-6xl lg:text-7xl font-medium leading-tight tracking-tight normal-case"
                            staggerDelay={0.04}
                        />
                    </div>
                </div>

                {/* --- Right Column: FAQ Accordions --- */}
                <motion.div
                    className="w-full lg:w-8/12 flex flex-col gap-4"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.1 }}
                >
                    {faqs.map((faq, index) => {
                        const isOpen = openIndex === index;

                        return (
                            <motion.div
                                variants={itemVariants}
                                key={index}
                                className="liquid-glass rounded-2xl overflow-hidden transition-all duration-300 border border-white/5"
                            >
                                <button
                                    onClick={() => toggleFAQ(index)}
                                    className="w-full flex items-center justify-between p-6 md:p-8 text-left hover:bg-white/[0.02] transition-colors"
                                    aria-expanded={isOpen}
                                    aria-controls={`faq-answer-${index}`}
                                    id={`faq-question-${index}`}
                                    type="button"
                                >
                                    <h3 className="text-xl md:text-2xl font-medium text-gray-200 pr-8">
                                        {faq.question}
                                    </h3>
                                    <div
                                        className={`shrink-0 transition-transform duration-500 ${isOpen ? "rotate-180" : "rotate-0"}`}
                                    >
                                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gray-400">
                                            <circle cx="12" cy="12" r="10"></circle>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v8m0 0l-3-3m3 3l3-3"></path>
                                        </svg>
                                    </div>
                                </button>
                                <AnimatePresence initial={false}>
                                    {isOpen && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{
                                                duration: 0.4,
                                                ease: [0.04, 0.62, 0.23, 0.98],
                                            }}
                                            id={`faq-answer-${index}`}
                                            aria-labelledby={`faq-question-${index}`}
                                            role="region"
                                        >
                                            <div className="px-6 pb-6 md:px-8 md:pb-8 text-gray-400 text-sm md:text-base leading-relaxed border-t border-white/5 pt-6 whitespace-pre-wrap">
                                                {faq.answer}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}