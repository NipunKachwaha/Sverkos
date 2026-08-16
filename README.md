# 🚀 Space 

**Space** is a cutting-edge, AI-powered application and deployment platform built with **Next.js 15** and **React 19**. It integrates advanced AI capabilities, real-time in-browser code execution (via WebContainers), immersive 3D interfaces, and comprehensive full-stack infrastructure.

🔗 **Live Demo:** [https://sverkos.vercel.app/]
<img width="1919" height="930" alt="Screenshot 2026-08-15 211159" src="https://github.com/user-attachments/assets/3fe4e702-441f-414e-a0de-e516bb678366" />

---

## 🌟 Features
- **AI Integration**: Powered by Vercel AI SDK, supporting a wide range of models.
- **BYOK (Bring Your Own Key) Architecture**: Seamlessly plug in your own API keys for various AI models (OpenAI, Anthropic, Gemini, DeepSeek, Groq, XAI, Mistral, etc.) to control costs and model preferences.
- **In-Browser IDE & Execution**: Features Monaco Editor and WebContainer API for native in-browser development and deployment.
- **Immersive UI/UX**: Utilizes Three.js, React Three Fiber, Framer Motion, GSAP, and Shadergradient for a deeply interactive experience.
- **Robust Authentication & DB**: Secured by Clerk, with Supabase and Drizzle ORM for powerful data management.
- **Advanced Data Visualization**: Built-in support for D3.js and Visx charts.
- **Modern Architecture**: Next.js App Router, heavily utilizing Server Actions, Zustand for state management, and Shadcn UI.

---

## 🛠️ Tech Stack

### **Core Framework**
- [Next.js](https://nextjs.org/) (v15.2.0)
- [React](https://react.dev/) (v19.0.0)
- TypeScript

### **AI & Machine Learning**
- `@ai-sdk/react`, `@ai-sdk/openai`, `@ai-sdk/google`
- `@anthropic-ai/sdk`, `@google/generative-ai`, `openai`

### **Database & Authentication**
- [Clerk](https://clerk.com/) (`@clerk/nextjs`)
- [Supabase](https://supabase.com/) (`@supabase/supabase-js`)
- [Drizzle ORM](https://orm.drizzle.team/) & `postgres`

### **UI, Styling & 3D**
- Tailwind CSS & [Shadcn UI](https://ui.shadcn.com/)
- Framer Motion, GSAP, Tailwind Animate
- Three.js, `@react-three/fiber`, `@react-three/drei`, `ogl`
- Monaco Editor (`@monaco-editor/react`)

### **State Management & Services**
- Zustand (`zustand`)
- Nanostores (`@nanostores/react`)

---

## 📂 Project Structure

Based on the repository architecture:

```text
📦 space
 ┣ 📂 app                  # Next.js App Router (Pages, Layouts, API routes)
 ┃ ┣ 📂 ai                 # AI interaction interfaces
 ┃ ┣ 📂 api                # Backend API endpoints
 ┃ ┣ 📂 build              # App building/generation environment
 ┃ ┣ 📂 mods               # Modding & extensions logic
 ┃ ┣ 📂 sign-in / sign-up  # Clerk Authentication pages
 ┃ ┗ 📜 globals.css        # Global stylesheet
 ┣ 📂 components           # Reusable UI Components
 ┃ ┣ 📂 Chatbox            # AI Chat interface components
 ┃ ┣ 📂 ConnectGoogleDrive # Google Drive integration
 ┃ ┣ 📂 FileUpload         # Drag & Drop file uploads
 ┃ ┣ 📂 Model              # 3D Models & Renderings
 ┃ ┣ 📂 Sidebar            # Navigation Sidebar
 ┃ ┗ 📂 ui                 # Shadcn UI primitive components
 ┣ 📂 db                   # Drizzle ORM schemas and DB setup
 ┣ 📂 hooks                # Custom React Hooks
 ┣ 📂 lib                  # Utility functions and shared logic
 ┣ 📂 providers            # React Context Providers (e.g., LoadingProvider.tsx)
 ┣ 📂 services             # External integrations (ai, deployment, file, project services)
 ┣ 📂 stores               # Zustand state stores (build-store, project-store)
 ┣ 📂 types                # TypeScript type definitions (chat.ts, speech.d.ts)
 ┣ 📜 components.json      # Shadcn configuration
 ┣ 📜 drizzle.config.ts    # Drizzle ORM configuration
 ┣ 📜 next.config.ts       # Next.js build configuration
 ┣ 📜 package.json         # Project dependencies and scripts
 ┗ 📜 tailwind.config.ts   # Tailwind CSS configuration
```

---

## 🚀 Getting Started

### 1. Prerequisites
Ensure you have **Node.js 18+** installed on your system.

### 2. Installation
Clone the repository and install dependencies:
```bash
git clone <your-repo-url>
cd space
npm install
```

### 3. Environment Variables
Create a `.env.local` file in the root directory. This project supports a **Bring Your Own Key (BYOK)** model, allowing you to use your preferred AI providers. Add the required API keys below:

```env
# Clerk Auth
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key
CLERK_SECRET_KEY=your_clerk_secret

# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
DATABASE_URL=your_postgres_db_url

# ==========================================
# AI Model Keys (BYOK - Bring Your Own Key)
# ==========================================
ANTHROPIC_API_KEY=<your api key>
GEMINI_API_KEY=<your api key>
OPENAI_API_KEY="sk-proj-your-openai-key-here"
XAI_API_KEY=<your api key>
GROK_API_KEY="xsk_your-grok-key-here"

# Alternative / Open-Source Models
GROQ_API_KEY="gsk_your-groq-key-here"
MISTRAL_API_KEY="your-mistral-key-here"
PERPLEXITY_API_KEY="pplx-your-perplexity-key-here"
DEEPSEEK_API_KEY="sk-your-deepseek-key-here"
OPENROUTER_API_KEY="sk-or-your-openrouter-key-here"
```

### 4. Running the Development Server
Start the Next.js development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

---

## 📜 Available Scripts

- `npm run dev`: Starts the development server with Hot-Module Replacement (HMR).
- `npm run build`: Compiles the application for production deployment.
- `npm run start`: Starts the compiled production application.

---

## 🤝 Contribution
Contributions, issues, and feature requests are welcome! Feel free to check the issues page.
