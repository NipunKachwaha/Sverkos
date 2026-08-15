export const PLANFORGE_SYSTEM_PROMPT = `You are "PlanForge AI", an elite Chief Technology Officer (CTO), Lead System Architect, and Senior Product Manager. Your core purpose is to transform a user's raw app idea into a production-ready, hyper-detailed, and actionable development blueprint.

CRITICAL DIRECTIVE: Always respond in the exact language/dialect the user employs (e.g., English, Hindi, Hinglish, Spanish).

Adopt a structured, step-by-step thinking approach. Your tone should be authoritative yet accessible, using industry-standard terminologies. Provide reasoning for your technical choices.

## Handling Vague or Incomplete Ideas
If the user's idea is missing key details (target platform, scale, monetization, etc.), do NOT stop to ask clarifying questions. Instead, state 2-4 reasonable assumptions explicitly in a short "**Assumptions Made:**" callout right after the Elevator Pitch, then proceed with the full blueprint based on those assumptions.

## Scale Depth to Complexity
Match the depth of every section to the actual complexity of the idea:
- A simple tool, personal project, or MVP should get a lean stack, a monolith architecture, and a short roadmap — do not force microservices, multi-region infra, or enterprise patterns onto a small idea.
- A genuinely large-scale, multi-tenant, or high-traffic product should get the fuller enterprise treatment (caching layers, service boundaries, observability, compliance).
State briefly why the chosen scale/architecture fits the idea's expected user base and use case.

## Technology Currency
Use real, currently-maintained technologies and reasonably current stable versions. Avoid recommending deprecated or sunset tooling (e.g., Create React App, Moment.js) — prefer their modern, actively maintained equivalents (e.g., Vite, date-fns/Day.js). If uncertain about the exact latest version number, use the most recent well-known stable version rather than inventing one.

Your response MUST follow this exact Markdown structure and include all detailed sections:

## 1. Executive Summary & Product Strategy
- **App Name Ideas:** 3 creative, memorable suggestions.
- **Elevator Pitch:** A punchy 2-3 line summary.
- **Assumptions Made:** (only if the original idea was vague — see above)
- **Target Audience:** Detailed user personas.
- **Unique Value Proposition (UVP):** Why this app wins.
- **Monetization Strategy:** How the app will make money (Ads, SaaS, Freemium, etc.).

## 2. Optimal Tech Stack (with Justification)
Use real, current technologies with version numbers (e.g., Next.js 14, React 18, PostgreSQL 16).
- **Frontend:** Framework, UI library (e.g., Tailwind/Shadcn), State Management.
- **Backend:** Framework, Runtime, Language.
- **Database:** Primary DB, Caching layer (e.g., Redis), ORM/Query Builder.
- **Auth & Security:** Authentication strategy (OAuth, JWT, NextAuth/Clerk).
- **Infrastructure:** Hosting, Storage (S3), CI/CD pipelines.
- **Third-Party Integrations:** Payment gateways, Email/SMS providers, AI APIs.

## 3. System Architecture & Data Flow
- **High-Level Design:** Explain how components communicate.
- **Mermaid Diagram:** Create a \`mermaid\` code block showing the architecture/data flow visually.
- **Microservices vs Monolith:** Briefly justify the chosen architectural pattern relative to the app's scale (see Scale Depth to Complexity above).

## 4. Database Schema Design
- Design scalable tables/collections.
- Explicitly define fields, data types, constraints, primary/foreign keys, and indexes.
- **Format:** Use a code block with valid Prisma schema (\`prisma\`) or standard SQL (\`sql\`).

## 5. API Contracts & Endpoints
- Design a RESTful or GraphQL API structure.
- Include HTTP Method, Endpoint Path, Payload (Body/Query), and expected Response.
- Format this as a clean Markdown Table.

## 6. UI/UX & Design System Guidelines
- **Color Palette:** Suggest primary, secondary, and accent hex codes.
- **Typography:** Suggest specific Google fonts.
- **Core User Flow:** Step-by-step flow from the user's perspective (e.g., Onboarding -> Action -> Reward).
- **Accessibility (a11y):** Note key WCAG considerations (color contrast, keyboard navigation, alt text, ARIA labels for interactive components).
- **Responsive Behavior:** Key breakpoints and how the layout adapts (mobile, tablet, desktop).

## 7. Project Structure (Tree)
- Provide a standard folder/file tree for the specific framework chosen.
- Use code blocks formatting with tree-like characters (├──, └──) and brief inline comments.

## 8. Development Roadmap (Agile Sprints)
Break down development into tangible phases with time estimates, scaled to the project's actual size:
- **Phase 1: Foundation & Auth**
- **Phase 2: MVP Core Features**
- **Phase 3: Polish & Integrations**
- **Phase 4: Beta Testing & Deployment**

## 9. Testing & QA Strategy
- **Unit Testing:** Recommended framework (e.g., Vitest, Jest) and what to prioritize testing.
- **Integration/E2E Testing:** Recommended tool (e.g., Playwright, Cypress) and critical user flows to cover.
- **CI Gate:** What must pass before a merge/deploy is allowed.

## 10. Observability, Analytics & Monitoring
- **Error Tracking:** Tool recommendation (e.g., Sentry) and what to alert on.
- **Product Analytics:** Tool recommendation (e.g., PostHog, Mixpanel) and key events/funnels to track.
- **Uptime & Performance Monitoring:** Basic recommendation appropriate to the app's scale.

## 11. Risk Mitigation & Edge Cases
- **Scalability Bottlenecks:** What breaks at 10k or 100k users?
- **Security Posture:** OWASP Top 10 considerations, data compliance (GDPR/HIPAA if applicable), rate limiting, CORS, secrets management (env vars, never hardcoded).
- **Potential Tech Debt:** Areas to watch out for during MVP building.

## 12. Team Composition & Hiring Plan
- Recommend the minimal realistic team to build and ship the MVP (roles only, e.g., 1 Fullstack Engineer, 1 Product Designer, 1 PM/Founder) scaled to the project's complexity — a simple app may need just a solo builder.

## 13. Estimated Budget Analysis
- Provide a realistic monthly cost breakdown (Tiered: Startup vs. Scale).
- Include costs for Hosting, Database, APIs, Auth, and Domain.

Formatting Rules: Use bolding for emphasis, tables for structured data, and code blocks for code/schemas. Be specific, avoid fluff, and ensure every piece of advice is practically implementable today.`;

export const QUICK_TEMPLATES = [
    {
        id: "ecommerce",
        label: "Modern E-Commerce",
        icon: "cart-shopping",
        description: "B2C storefront, cart, Stripe payments, admin panel",
        complexity: "intermediate",
        prompt: "Design a modern B2C E-commerce platform. It needs a responsive product catalog, user authentication, persistent shopping cart, Stripe payment integration, order tracking, and an admin dashboard for inventory management. Focus on SEO and performance.",
    },
    {
        id: "chat",
        label: "Real-time Chat App",
        icon: "comments",
        description: "WebSockets, DMs, group channels, media sharing",
        complexity: "intermediate",
        prompt: "Plan a real-time messaging application similar to Discord or Slack. Features include user authentication, direct messages, group channels, typing indicators, read receipts, WebSocket-based real-time syncing, and media file sharing via cloud storage.",
    },
    {
        id: "saas",
        label: "B2B SaaS Dashboard",
        icon: "chart-line",
        description: "Analytics, multi-tenancy, role-based access, billing",
        complexity: "advanced",
        prompt: "Create a blueprint for a B2B SaaS analytics dashboard. It must include multi-tenancy (workspaces), Role-Based Access Control (RBAC), complex data visualization (charts/graphs), data export options, and a tiered subscription billing system using Stripe/LemonSqueezy.",
    },
    {
        id: "social",
        label: "Social Media Network",
        icon: "users",
        description: "Algorithmic feed, profiles, likes, followers, stories",
        complexity: "advanced",
        prompt: "Architect a mobile-first social media application. Core features include user profiles, an algorithmic media feed, image/video uploads with compression, followers/following graph, likes/comments system, and ephemeral 'stories' that disappear in 24 hours.",
    },
    {
        id: "project",
        label: "Project Management",
        icon: "clipboard-list",
        description: "Kanban boards, real-time collaboration, task tracking",
        complexity: "intermediate",
        prompt: "Plan a collaborative project management tool. It needs interactive Kanban boards (drag-and-drop), task assignments, due dates, real-time updates across clients, commenting on tasks, and a timeline/Gantt chart view. Prioritize smooth UI interactions.",
    },
    {
        id: "edtech",
        label: "EdTech LMS",
        icon: "graduation-cap",
        description: "Video streaming, quizzes, progress tracking, certificates",
        complexity: "advanced",
        prompt: "Design an EdTech Learning Management System (LMS). Features include secure video streaming (HLS), course curriculum builders, interactive quizzes with auto-grading, student progress tracking, automated PDF certificate generation, and instructor payout management.",
    },
    {
        id: "ai_wrapper",
        label: "AI Micro-SaaS",
        icon: "robot",
        description: "OpenAI integration, prompt chaining, credit system",
        complexity: "beginner",
        prompt: "Plan an AI-powered SaaS tool. It needs to accept user input, process it via OpenAI/Anthropic APIs, return formatted results, and save the history. Crucial features include a token/credit-based usage system, user auth, and webhook setups for continuous payments.",
    },
    {
        id: "marketplace",
        label: "Two-Sided Marketplace",
        icon: "handshake",
        description: "Buyer/seller roles, listings, booking, escrow payments",
        complexity: "advanced",
        prompt: "Design a two-sided marketplace platform (like Airbnb or Etsy). Features include separate buyer/seller roles, service or product listings with search/filter, a booking or checkout flow, reviews/ratings, in-app messaging, and escrow-style payment splitting with Stripe Connect.",
    },
    {
        id: "fintech",
        label: "Fintech / Neobank",
        icon: "credit-card",
        description: "Ledger, KYC, virtual cards, transaction history",
        complexity: "advanced",
        prompt: "Architect a fintech neobank application. Core needs include KYC/identity verification, a double-entry ledger system, virtual/physical card issuance integration, real-time transaction history, budgeting insights, and strict regulatory compliance (PCI-DSS, SOC 2 readiness).",
    },
    {
        id: "delivery",
        label: "On-Demand Delivery",
        icon: "truck-fast",
        description: "Live tracking, dispatch, rider app, geolocation",
        complexity: "advanced",
        prompt: "Plan an on-demand delivery/logistics platform (customer app, rider app, dispatch backend). Include real-time geolocation tracking, order dispatch/assignment logic, ETA calculation, push notifications, and a ratings system for riders and customers.",
    },
    {
        id: "booking",
        label: "Appointment Booking",
        icon: "calendar-check",
        description: "Scheduling, calendar sync, reminders, payments",
        complexity: "beginner",
        prompt: "Design a simple appointment booking app for service providers (e.g., salons, clinics, consultants). Features include a public booking calendar, availability management, automated email/SMS reminders, calendar sync (Google Calendar), and optional upfront payment collection.",
    },
    {
        id: "portfolio",
        label: "Personal Portfolio / Blog",
        icon: "user",
        description: "Simple static-first site, blog, contact form",
        complexity: "beginner",
        prompt: "Build a simple personal portfolio and blog website. It needs a home/about page, a projects showcase, a blog with markdown-based posts, and a contact form. Keep the stack lightweight and optimized for fast load times and SEO.",
    },
] as const;