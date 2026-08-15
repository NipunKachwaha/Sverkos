import ApiSettingsCard from "@/components/Model/ApiSettingsCard";
import { Sidebar } from "@/components/Sidebar/sidebar";
import {
    Cpu,
    ShieldCheck,
    Zap,
    Coins,
    KeyRound,
    Lock,
    Sparkles,
    HelpCircle,
    ArrowRight,
    CheckCircle2,
    Ghost,
    Radio,
    Eye,
    Globe,
    Terminal,
    Activity,
    Bot,
    Code2,
    Wand2
} from "lucide-react";
import { ReactLenis } from "lenis/react";
import { ScrollButtons } from "@/components/ui/scroll-buttons";

export default function ApiSettingsPage() {
    return (
        <div className="flex h-screen bg-gray-50 overflow-hidden text-gray-900 selection:bg-emerald-200">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto custom-scrollbar relative">
                
                {/* Global Background Grid Mesh */}
                <div 
                    className="fixed inset-0 z-0 pointer-events-none"
                    style={{
                        zIndex: 0,
                        width: "100vw",
                        height: "100vh",
                        left: 0,
                        top: 0,
                        backgroundImage: `
                            linear-gradient(to right, #80808022 1.5px, transparent 2px),
                            linear-gradient(to bottom, #80808022 1.5px, transparent 2px)
                        `,
                        backgroundSize: "20px 20px", 
                        maskImage: "radial-gradient(ellipse 120% 75% at 50% 40%, #000 90%, transparent 130%)",
                        WebkitMaskImage: "radial-gradient(ellipse 120% 75% at 50% 40%, #000 90%, transparent 130%)",
                        opacity: 0.15 
                    }}
                ></div>

                <ReactLenis
                    className="relative z-10 flex-1 overflow-y-auto w-full h-full flex flex-col"
                    options={{ lerp: 0.04, smoothWheel: true }}
                >
                    {/* =========================================
                        ENHANCED ANIMATED HERO SECTION 
                    ========================================= */}
                    <section className="max-w-6xl mx-auto px-8 pt-24 pb-16 flex flex-col items-center text-center relative">
                        
                        {/* Animated Glowing Aurora Blobs */}
                        <div className="absolute top-10 left-1/4 w-96 h-96 bg-emerald-300/30 rounded-full mix-blend-multiply filter blur-[100px] opacity-60 animate-[pulse_6s_infinite]"></div>
                        <div className="absolute top-20 right-1/4 w-96 h-96 bg-blue-300/30 rounded-full mix-blend-multiply filter blur-[100px] opacity-60 animate-[pulse_7s_infinite]" style={{ animationDelay: '2s' }}></div>
                        <div className="absolute top-40 left-1/2 -translate-x-1/2 w-96 h-96 bg-purple-300/20 rounded-full mix-blend-multiply filter blur-[100px] opacity-60 animate-[pulse_8s_infinite]" style={{ animationDelay: '4s' }}></div>

                        {/* Animated Cartoon Mascot & Orbiting Elements */}
                        <div className="relative w-40 h-40 mb-10 mt-4 group z-20 cursor-grab active:cursor-grabbing">
                            {/* Glowing backdrop for Mascot */}
                            <div className="absolute inset-0 bg-emerald-400 rounded-[2.5rem] blur-2xl opacity-20 group-hover:opacity-50 transition-opacity duration-500 animate-pulse"></div>
                            
                            {/* The Robot Mascot Body */}
                            <div className="relative w-full h-full bg-white/90 backdrop-blur-xl border-4 border-gray-100 rounded-[2.5rem] shadow-2xl flex items-center justify-center animate-[bounce_4s_ease-in-out_infinite] group-hover:rotate-12 transition-transform duration-500 overflow-visible">
                                <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 to-blue-50/50 rounded-[2.2rem]"></div>
                                
                                {/* Antenna */}
                                <div className="absolute -top-8 left-1/2 -translate-x-1/2 flex flex-col items-center">
                                    <div className="w-4 h-4 bg-emerald-500 rounded-full animate-ping absolute opacity-75"></div>
                                    <div className="w-4 h-4 bg-emerald-500 rounded-full relative shadow-[0_0_15px_rgba(16,185,129,0.8)]"></div>
                                    <div className="w-1.5 h-6 bg-gray-300 rounded-t-sm"></div>
                                </div>

                                {/* Cute CSS Face */}
                                <div className="relative flex flex-col items-center justify-center w-full h-full z-10">
                                    <div className="flex gap-6 mb-3 relative">
                                        {/* Left Eye */}
                                        <div className="w-5 h-8 bg-gray-800 rounded-full group-hover:h-2 group-hover:mt-3 transition-all duration-200 shadow-inner"></div>
                                        {/* Right Eye */}
                                        <div className="w-5 h-8 bg-gray-800 rounded-full group-hover:h-2 group-hover:mt-3 transition-all duration-200 shadow-inner"></div>
                                    </div>
                                    {/* Smile */}
                                    <div className="w-12 h-5 border-b-4 border-gray-800 rounded-b-full group-hover:scale-110 transition-transform"></div>
                                    
                                    {/* Blushing cheeks */}
                                    <div className="absolute top-1/2 left-3 w-4 h-2 bg-pink-300 rounded-full blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    <div className="absolute top-1/2 right-3 w-4 h-2 bg-pink-300 rounded-full blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                </div>
                            </div>

                            {/* Orbiting Element 1 */}
                            <div className="absolute -left-12 -top-4 bg-white p-3 rounded-2xl shadow-xl animate-[bounce_3s_ease-in-out_infinite] border border-gray-100 rotate-[-12deg] z-30" style={{ animationDelay: '1s' }}>
                                <Wand2 className="w-6 h-6 text-purple-500" />
                            </div>
                            {/* Orbiting Element 2 */}
                            <div className="absolute -right-14 top-10 bg-white p-3 rounded-2xl shadow-xl animate-[bounce_3.5s_ease-in-out_infinite] border border-gray-100 rotate-[15deg] z-30" style={{ animationDelay: '0.5s' }}>
                                <Bot className="w-6 h-6 text-blue-500" />
                            </div>
                            {/* Orbiting Element 3 */}
                            <div className="absolute left-4 -bottom-10 bg-white p-3 rounded-2xl shadow-xl animate-[bounce_4.5s_ease-in-out_infinite] border border-gray-100 rotate-[5deg] z-30" style={{ animationDelay: '1.5s' }}>
                                <Code2 className="w-6 h-6 text-emerald-500" />
                            </div>
                        </div>

                        {/* Hero Typography & Badges */}
                        <div className="relative z-20 flex flex-col items-center">
                            <span className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-emerald-700 bg-white/80 backdrop-blur-md border border-emerald-200 px-5 py-2 rounded-full mb-6 shadow-sm hover:scale-105 hover:bg-emerald-50 transition-all cursor-default">
                                Bring Your Own Key
                            </span>

                            <h1 className="text-6xl md:text-7xl font-black mb-6 tracking-tighter drop-shadow-sm text-gray-900 leading-[1.1]">
                                Power Your <br className="hidden md:block"/>
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 via-teal-500 to-blue-600 animate-gradient-x">
                                    AI Experience
                                </span>
                            </h1>

                            <p className="text-xl text-gray-600 max-w-2xl mb-4 leading-relaxed font-medium">
                                Connect your own API key to unlock the full potential of our platform. Choose from
                                top-tier models and <strong className="text-gray-900 border-b-2 border-emerald-200">pay only for what you use</strong> directly to the provider.
                            </p>

                            <p className="text-base text-gray-500 max-w-2xl mb-12 leading-relaxed">
                                No subscriptions. No seat limits. The moment your key is saved, every model you're entitled to becomes available in this workspace — with absolutely zero markup.
                            </p>
                        </div>

                        {/* Glassmorphism Stats Grid */}
                        <div className="relative z-20 grid grid-cols-1 md:grid-cols-4 gap-5 w-full max-w-5xl">
                            <div className="group bg-white/60 backdrop-blur-xl border border-white rounded-3xl py-6 px-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(16,185,129,0.15)] hover:-translate-y-2 transition-all duration-300">
                                <div className="bg-emerald-100 w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 group-hover:rotate-6 transition-transform">
                                    <Coins className="w-6 h-6 text-emerald-600" />
                                </div>
                                <p className="text-3xl font-black text-gray-900">0%</p>
                                <p className="text-sm font-bold text-gray-500 uppercase tracking-wide mt-1">Markup</p>
                            </div>
                            
                            <div className="group bg-white/60 backdrop-blur-xl border border-white rounded-3xl py-6 px-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(59,130,246,0.15)] hover:-translate-y-2 transition-all duration-300">
                                <div className="bg-blue-100 w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 group-hover:-rotate-6 transition-transform">
                                    <Globe className="w-6 h-6 text-blue-600" />
                                </div>
                                <p className="text-3xl font-black text-gray-900">12+</p>
                                <p className="text-sm font-bold text-gray-500 uppercase tracking-wide mt-1">Providers</p>
                            </div>

                            <div className="group bg-white/60 backdrop-blur-xl border border-white rounded-3xl py-6 px-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(168,85,247,0.15)] hover:-translate-y-2 transition-all duration-300">
                                <div className="bg-purple-100 w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 group-hover:rotate-12 transition-transform">
                                    <Zap className="w-6 h-6 text-purple-600" />
                                </div>
                                <p className="text-3xl font-black text-gray-900">&lt;60s</p>
                                <p className="text-sm font-bold text-gray-500 uppercase tracking-wide mt-1">Setup Time</p>
                            </div>

                            <div className="group bg-white/60 backdrop-blur-xl border border-white rounded-3xl py-6 px-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(244,63,94,0.15)] hover:-translate-y-2 transition-all duration-300">
                                <div className="bg-rose-100 w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 group-hover:-rotate-12 transition-transform">
                                    <Lock className="w-6 h-6 text-rose-600" />
                                </div>
                                <p className="text-3xl font-black text-gray-900">100%</p>
                                <p className="text-sm font-bold text-gray-500 uppercase tracking-wide mt-1">Local Only</p>
                            </div>
                        </div>
                    </section>
                    {/* =========================================
                        END OF ENHANCED HERO SECTION 
                    ========================================= */}

                    {/* Interactive Banner image */}
                    <section className="max-w-5xl mx-auto px-8 pb-12">
                        <div className="group w-full h-72 rounded-3xl overflow-hidden relative border border-gray-200 shadow-xl cursor-crosshair">
                            <img
                                src="https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1600&auto=format&fit=crop"
                                alt="Server room powering API requests"
                                className="w-full h-full object-cover transform group-hover:scale-110 group-hover:rotate-1 transition-all duration-700 ease-in-out"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent group-hover:opacity-90 transition-opacity duration-500"></div>

                            {/* Animated scanner line effect */}
                            <div className="absolute top-0 left-0 w-full h-1 bg-emerald-400/50 shadow-[0_0_15px_rgba(52,211,153,0.8)] animate-[ping_3s_ease-in-out_infinite] group-hover:animate-none"></div>

                            <div className="absolute left-8 bottom-8 text-white transform group-hover:translate-x-4 transition-transform duration-500">
                                <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest opacity-90 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-lg mb-3">
                                    <Activity className="w-4 h-4 animate-pulse" /> Direct Connection Active
                                </span>
                                <h2 className="text-3xl font-black tracking-tight drop-shadow-lg">Your Key, Your Provider, Your Data.</h2>
                                <p className="text-gray-300 mt-2 max-w-md text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                                    Experience zero latency overhead. Requests go straight from your local client to the AI provider's edge network.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Columns */}
                    <section className="max-w-5xl mx-auto px-8 pb-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                        {/* Left: API Settings & Content */}
                        <div className="w-full space-y-10">

                            {/* Hoverable Card Wrapper */}
                            <div className="hover:shadow-2xl transition-shadow duration-500 rounded-2xl z-20 relative">
                                <ApiSettingsCard />
                            </div>

                            {/* How it works */}
                            <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 group/card">
                                <div className="w-full h-40 relative overflow-hidden">
                                    <img
                                        src="https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=1200&auto=format&fit=crop"
                                        alt="Developer generating an API key"
                                        className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent"></div>
                                    <h4 className="absolute bottom-4 left-6 font-bold text-xl text-white flex items-center gap-2">
                                        <Terminal className="w-5 h-5" /> How it works
                                    </h4>
                                </div>
                                <div className="p-8">
                                    <ol className="space-y-6">
                                        <li className="flex gap-4 group cursor-default">
                                            <span className="shrink-0 w-8 h-8 rounded-full bg-gray-100 group-hover:bg-emerald-500 group-hover:text-white group-hover:shadow-[0_0_15px_rgba(16,185,129,0.4)] text-gray-900 text-sm font-bold flex items-center justify-center transition-all duration-300 transform group-hover:scale-110">1</span>
                                            <div>
                                                <h5 className="font-semibold text-gray-900 group-hover:text-emerald-600 transition-colors">Generate your Key</h5>
                                                <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                                                    Create a key on your provider's developer portal — it takes less than a minute and usually starts with a generous free trial credit.
                                                </p>
                                            </div>
                                        </li>
                                        <li className="flex gap-4 group cursor-default">
                                            <span className="shrink-0 w-8 h-8 rounded-full bg-gray-100 group-hover:bg-blue-500 group-hover:text-white group-hover:shadow-[0_0_15px_rgba(59,130,246,0.4)] text-gray-900 text-sm font-bold flex items-center justify-center transition-all duration-300 transform group-hover:scale-110">2</span>
                                            <div>
                                                <h5 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">Connect Locally</h5>
                                                <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                                                    Paste it into the secure field. We validate it instantly. It never leaves your browser and is completely isolated from our backend.
                                                </p>
                                            </div>
                                        </li>
                                        <li className="flex gap-4 group cursor-default">
                                            <span className="shrink-0 w-8 h-8 rounded-full bg-gray-100 group-hover:bg-purple-500 group-hover:text-white group-hover:shadow-[0_0_15px_rgba(168,85,247,0.4)] text-gray-900 text-sm font-bold flex items-center justify-center transition-all duration-300 transform group-hover:scale-110">3</span>
                                            <div>
                                                <h5 className="font-semibold text-gray-900 group-hover:text-purple-600 transition-colors">Start Building</h5>
                                                <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                                                    Pick a model from the dynamic switcher and start chatting. Track your precise usage directly on your provider's billing dashboard.
                                                </p>
                                            </div>
                                        </li>
                                    </ol>
                                </div>
                            </div>

                            {/* FAQ */}
                            <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm hover:shadow-lg transition-shadow duration-300">
                                <h4 className="font-bold text-xl mb-6 flex items-center gap-2 text-gray-900 border-b pb-4">
                                    <HelpCircle className="w-6 h-6 text-emerald-500 animate-bounce" style={{ animationDuration: '3s' }} />
                                    Frequently Asked Questions
                                </h4>
                                <div className="space-y-6">
                                    <div className="group hover:bg-gray-50 p-4 rounded-xl -mx-4 transition-colors">
                                        <p className="font-semibold text-gray-900 flex items-center gap-2">
                                            <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all" />
                                            Will this cost more than a normal subscription?
                                        </p>
                                        <p className="text-sm text-gray-600 mt-2 pl-6 leading-relaxed">
                                            Usually significantly less, especially for light or bursty usage. You pay strictly per token at your provider's published base rate instead of a flat $20+ monthly fee.
                                        </p>
                                    </div>
                                    <div className="group hover:bg-gray-50 p-4 rounded-xl -mx-4 transition-colors">
                                        <p className="font-semibold text-gray-900 flex items-center gap-2">
                                            <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
                                            Can I use more than one provider at once?
                                        </p>
                                        <p className="text-sm text-gray-600 mt-2 pl-6 leading-relaxed">
                                            Absolutely. Add a key for each provider you want and switch models per conversation seamlessly without needing to reconfigure anything.
                                        </p>
                                    </div>
                                    <div className="group hover:bg-gray-50 p-4 rounded-xl -mx-4 transition-colors">
                                        <p className="font-semibold text-gray-900 flex items-center gap-2">
                                            <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-rose-500 group-hover:translate-x-1 transition-all" />
                                            What happens if I remove my key?
                                        </p>
                                        <p className="text-sm text-gray-600 mt-2 pl-6 leading-relaxed">
                                            That provider's models become unavailable immediately. Nothing is deleted from your actual provider account, and you can re-authenticate at any time.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right: Features/Info & Paranormal */}
                        <div className="w-full space-y-10 pt-2">

                            {/* NEW: Paranormal Activity Module */}
                            <div className="group bg-gray-950 border border-purple-500/30 rounded-3xl p-8 hover:shadow-[0_0_40px_rgba(168,85,247,0.3)] transition-all duration-500 overflow-hidden relative cursor-crosshair">
                                {/* Spooky background effect */}
                                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1620503374956-c942862f0372?q=80&w=800&auto=format&fit=crop')] opacity-20 group-hover:opacity-40 group-hover:scale-125 group-hover:rotate-3 transition-all duration-1000 mix-blend-color-dodge"></div>
                                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-900/50 to-black/80 z-0"></div>

                                <div className="relative z-10">
                                    <div className="flex justify-between items-start mb-4">
                                        <h4 className="font-black text-2xl flex items-center gap-3 text-purple-100 tracking-tight">
                                            <Ghost className="w-7 h-7 animate-[bounce_4s_infinite] text-purple-400 drop-shadow-[0_0_10px_rgba(192,132,252,0.8)]" />
                                            Paranormal Activity
                                        </h4>
                                        <Radio className="w-6 h-6 text-purple-500/50 animate-pulse" />
                                    </div>

                                    <p className="text-sm text-purple-200/80 mb-5 leading-relaxed font-medium">
                                        Are your API responses feeling a bit... haunted? We've integrated experimental EMF and EVP protocols directly into the WebSocket layer.
                                        Monitor for sudden temperature drops, anomalous token generation, and spectral entities lurking in the latent space.
                                    </p>

                                    <div className="bg-black/50 border border-purple-500/30 rounded-xl p-4 backdrop-blur-sm">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-xs font-mono text-purple-300 flex items-center gap-2">
                                                <Eye className="w-4 h-4 text-purple-400 group-hover:animate-ping" />
                                                ENTITY TRACKER
                                            </span>
                                            <span className="flex h-3 w-3 relative">
                                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                                                <span className="relative inline-flex rounded-full h-3 w-3 bg-purple-500"></span>
                                            </span>
                                        </div>
                                        <div className="w-full bg-purple-950/50 rounded-full h-1.5 mb-1 overflow-hidden">
                                            <div className="bg-purple-500 h-1.5 rounded-full w-[15%] group-hover:w-[85%] transition-all duration-1000 ease-in-out relative">
                                                <div className="absolute top-0 right-0 bottom-0 w-4 bg-white/50 blur-[2px] animate-pulse"></div>
                                            </div>
                                        </div>
                                        <p className="text-[10px] font-mono text-purple-400 text-right mt-1">Ectoplasm levels: <span className="text-white group-hover:text-red-400 transition-colors">NOMINAL</span></p>
                                    </div>
                                </div>
                            </div>

                            {/* Features */}
                            <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-sm">
                                <h3 className="text-2xl font-bold mb-6 text-gray-900 border-b pb-4">Core Advantages</h3>
                                <ul className="space-y-6">
                                    <li className="flex gap-4 group cursor-default p-3 -mx-3 rounded-xl hover:bg-blue-50 transition-colors">
                                        <span className="shrink-0 mt-1 bg-blue-100 p-2.5 rounded-xl group-hover:scale-110 group-hover:rotate-6 transition-transform">
                                            <ShieldCheck className="w-6 h-6 text-blue-600" />
                                        </span>
                                        <div>
                                            <h4 className="font-bold text-gray-900 text-lg">100% Secure & Private</h4>
                                            <p className="text-sm text-gray-600 mt-1 leading-relaxed">Your API keys are stored exclusively in your browser's LocalStorage. They are strictly never sent to our database or any third-party servers.</p>
                                        </div>
                                    </li>
                                    <li className="flex gap-4 group cursor-default p-3 -mx-3 rounded-xl hover:bg-amber-50 transition-colors">
                                        <span className="shrink-0 mt-1 bg-amber-100 p-2.5 rounded-xl group-hover:scale-110 group-hover:-rotate-6 transition-transform">
                                            <Coins className="w-6 h-6 text-amber-600" />
                                        </span>
                                        <div>
                                            <h4 className="font-bold text-gray-900 text-lg">Save on Costs</h4>
                                            <p className="text-sm text-gray-600 mt-1 leading-relaxed">By bypassing middleman markups, you pay standard wholesale API rates directly to your chosen AI provider. Massive savings for heavy users.</p>
                                        </div>
                                    </li>
                                    <li className="flex gap-4 group cursor-default p-3 -mx-3 rounded-xl hover:bg-emerald-50 transition-colors">
                                        <span className="shrink-0 mt-1 bg-emerald-100 p-2.5 rounded-xl group-hover:scale-110 group-hover:rotate-6 transition-transform">
                                            <Zap className="w-6 h-6 text-emerald-600" />
                                        </span>
                                        <div>
                                            <h4 className="font-bold text-gray-900 text-lg">Instant Switching</h4>
                                            <p className="text-sm text-gray-600 mt-1 leading-relaxed">Easily swap between OpenAI, Anthropic, or Google models with absolute zero downtime depending on your specific task's requirements.</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>

                            {/* Provider cards with MERGED Links */}
                            <div>
                                <div className="mb-5">
                                    <h4 className="font-bold text-xl text-gray-900 flex items-center gap-2">Supported Ecosystems</h4>
                                    <p className="text-sm text-gray-500 mt-1 flex items-center gap-1.5">
                                        <KeyRound className="w-4 h-4 text-emerald-500" /> Need a key? Click any provider to visit their dev portal.
                                    </p>
                                </div>
                                
                                <div className="grid grid-cols-3 gap-4">
                                    <a href="https://platform.openai.com" target="_blank" rel="noreferrer" className="group bg-white border border-gray-200 rounded-2xl p-5 flex flex-col items-center text-center gap-3 hover:border-[#10A37F] hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer relative overflow-hidden">
                                        <div className="w-14 h-14 bg-gray-50 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                                            <img src="/icons/openai-icon.svg" alt="OpenAI Logo" className="w-8 h-8 opacity-80 group-hover:opacity-100" />
                                        </div>
                                        <div className="flex-1 flex flex-col">
                                            <p className="text-sm font-bold text-gray-900">OpenAI</p>
                                        </div>
                                        <div className="mt-auto w-full border-t border-gray-100 pt-3 flex items-center justify-center gap-1 text-[11px] font-bold uppercase tracking-wide text-gray-400 group-hover:text-[#10A37F] transition-colors">
                                            Get Key <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </a>

                                    <a href="https://console.anthropic.com" target="_blank" rel="noreferrer" className="group bg-white border border-gray-200 rounded-2xl p-5 flex flex-col items-center text-center gap-3 hover:border-[#D97757] hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer relative overflow-hidden">
                                        <div className="w-14 h-14 bg-gray-50 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                                            <img src="/icons/Claude_AI_symbol.svg" alt="Claude Logo" className="w-8 h-8 opacity-80 group-hover:opacity-100" />
                                        </div>
                                        <div className="flex-1 flex flex-col">
                                            <p className="text-sm font-bold text-gray-900">Anthropic</p>
                                        </div>
                                        <div className="mt-auto w-full border-t border-gray-100 pt-3 flex items-center justify-center gap-1 text-[11px] font-bold uppercase tracking-wide text-gray-400 group-hover:text-[#D97757] transition-colors">
                                            Get Key <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </a>

                                    <a href="https://aistudio.google.com" target="_blank" rel="noreferrer" className="group bg-white border border-gray-200 rounded-2xl p-5 flex flex-col items-center text-center gap-3 hover:border-[#1A73E8] hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer relative overflow-hidden">
                                        <div className="w-14 h-14 bg-gray-50 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                                            <img src="/icons/google-gemini-icon.svg" alt="Google Logo" className="w-8 h-8 opacity-80 group-hover:opacity-100" />
                                        </div>
                                        <div className="flex-1 flex flex-col">
                                            <p className="text-sm font-bold text-gray-900">Google</p>
                                        </div>
                                        <div className="mt-auto w-full border-t border-gray-100 pt-3 flex items-center justify-center gap-1 text-[11px] font-bold uppercase tracking-wide text-gray-400 group-hover:text-[#1A73E8] transition-colors">
                                            Get Key <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </a>

                                    <a href="https://console.groq.com" target="_blank" rel="noreferrer" className="group bg-white border border-gray-200 rounded-2xl p-5 flex flex-col items-center text-center gap-3 hover:border-[#F55036] hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer relative overflow-hidden">
                                        <div className="w-14 h-14 bg-gray-50 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                                            <img src="/icons/groq.png" alt="Groq Logo" className="w-8 h-8 opacity-80 group-hover:opacity-100" />
                                        </div>
                                        <div className="flex-1 flex flex-col">
                                            <p className="text-sm font-bold text-gray-900">Groq</p>
                                        </div>
                                        <div className="mt-auto w-full border-t border-gray-100 pt-3 flex items-center justify-center gap-1 text-[11px] font-bold uppercase tracking-wide text-gray-400 group-hover:text-[#F55036] transition-colors">
                                            Get Key <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </a>

                                    <a href="https://console.x.ai" target="_blank" rel="noreferrer" className="group bg-white border border-gray-200 rounded-2xl p-5 flex flex-col items-center text-center gap-3 hover:border-[#000000] hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer relative overflow-hidden">
                                        <div className="w-14 h-14 bg-gray-50 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                                            <img src="/icons/grok-ai-icon.svg" alt="Grok Logo" className="w-8 h-8 opacity-80 group-hover:opacity-100" style={{ filter: "brightness(0)" }} />
                                        </div>
                                        <div className="flex-1 flex flex-col">
                                            <p className="text-sm font-bold text-gray-900">X AI</p>
                                        </div>
                                        <div className="mt-auto w-full border-t border-gray-100 pt-3 flex items-center justify-center gap-1 text-[11px] font-bold uppercase tracking-wide text-gray-400 group-hover:text-[#000000] transition-colors">
                                            Get Key <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </a>

                                    <a href="https://console.mistral.ai" target="_blank" rel="noreferrer" className="group bg-white border border-gray-200 rounded-2xl p-5 flex flex-col items-center text-center gap-3 hover:border-[#F26E24] hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer relative overflow-hidden">
                                        <div className="w-14 h-14 bg-gray-50 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                                            <img src="/icons/mistral.png" alt="Mistral Logo" className="w-8 h-8 opacity-80 group-hover:opacity-100" style={{ filter: "brightness(0)" }} />
                                        </div>
                                        <div className="flex-1 flex flex-col">
                                            <p className="text-sm font-bold text-gray-900">Mistral</p>
                                        </div>
                                        <div className="mt-auto w-full border-t border-gray-100 pt-3 flex items-center justify-center gap-1 text-[11px] font-bold uppercase tracking-wide text-gray-400 group-hover:text-[#F26E24] transition-colors">
                                            Get Key <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </a>

                                    <a href="https://docs.cohere.com/reference/check-api-key" target="_blank" rel="noreferrer" className="group bg-white border border-gray-200 rounded-2xl p-5 flex flex-col items-center text-center gap-3 hover:border-[#39594D] hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer relative overflow-hidden">
                                        <div className="w-14 h-14 bg-gray-50 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                                            <img src="/icons/cohere-color.svg" alt="Cohere Logo" className="w-8 h-8 opacity-80 group-hover:opacity-100" />
                                        </div>
                                        <div className="flex-1 flex flex-col">
                                            <p className="text-sm font-bold text-gray-900">Cohere</p>
                                        </div>
                                        <div className="mt-auto w-full border-t border-gray-100 pt-3 flex items-center justify-center gap-1 text-[11px] font-bold uppercase tracking-wide text-gray-400 group-hover:text-[#39594D] transition-colors">
                                            Get Key <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </a>

                                    <a href="https://www.perplexity.ai/api-platform" target="_blank" rel="noreferrer" className="group bg-white border border-gray-200 rounded-2xl p-5 flex flex-col items-center text-center gap-3 hover:border-[#22B8CD] hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer relative overflow-hidden">
                                        <div className="w-14 h-14 bg-gray-50 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                                            <img src="/icons/perplexity.webp" alt="Perplexity Logo" className="w-8 h-8 opacity-80 group-hover:opacity-100" />
                                        </div>
                                        <div className="flex-1 flex flex-col">
                                            <p className="text-sm font-bold text-gray-900">Perplexity</p>
                                        </div>
                                        <div className="mt-auto w-full border-t border-gray-100 pt-3 flex items-center justify-center gap-1 text-[11px] font-bold uppercase tracking-wide text-gray-400 group-hover:text-[#22B8CD] transition-colors">
                                            Get Key <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </a>

                                    <a href="https://platform.deepseek.com/" target="_blank" rel="noreferrer" className="group bg-white border border-gray-200 rounded-2xl p-5 flex flex-col items-center text-center gap-3 hover:border-[#4D6BFE] hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer relative overflow-hidden">
                                        <div className="w-14 h-14 bg-gray-50 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                                            <img src="/icons/deepseek-color.svg" alt="DeepSeek Logo" className="w-8 h-8 opacity-80 group-hover:opacity-100" />
                                        </div>
                                        <div className="flex-1 flex flex-col">
                                            <p className="text-sm font-bold text-gray-900">DeepSeek</p>
                                        </div>
                                        <div className="mt-auto w-full border-t border-gray-100 pt-3 flex items-center justify-center gap-1 text-[11px] font-bold uppercase tracking-wide text-gray-400 group-hover:text-[#4D6BFE] transition-colors">
                                            Get Key <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </a>

                                    <a href="https://openrouter.ai/" target="_blank" rel="noreferrer" className="group bg-white border border-gray-200 rounded-2xl p-5 flex flex-col items-center text-center gap-3 hover:border-[#B0E101] hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer relative overflow-hidden">
                                        <div className="w-14 h-14 bg-gray-50 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                                            <img src="/icons/openrouter-color.svg" alt="OpenRouter Logo" className="w-8 h-8 opacity-80 group-hover:opacity-100" />
                                        </div>
                                        <div className="flex-1 flex flex-col">
                                            <p className="text-sm font-bold text-gray-900">OpenRouter</p>
                                        </div>
                                        <div className="mt-auto w-full border-t border-gray-100 pt-3 flex items-center justify-center gap-1 text-[11px] font-bold uppercase tracking-wide text-gray-400 transition-colors group-hover:text-[#B0E101]">
                                            Get Key <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </a>

                                    <a href="https://huggingface.co/settings/tokens" target="_blank" rel="noreferrer" className="group bg-white border border-gray-200 rounded-2xl p-5 flex flex-col items-center text-center gap-3 hover:border-[#FFD21E] hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer relative overflow-hidden">
                                        <div className="w-14 h-14 bg-gray-50 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                                            <img src="/icons/hf-logo.png" alt="HF Logo" className="w-12 h-12 opacity-80 group-hover:opacity-100" />
                                        </div>
                                        <div className="flex-1 flex flex-col">
                                            <p className="text-sm font-bold text-gray-900">Hugging Face</p>
                                        </div>
                                        <div className="mt-auto w-full border-t border-gray-100 pt-3 flex items-center justify-center gap-1 text-[11px] font-bold uppercase tracking-wide text-gray-400 group-hover:text-[#FFD21E] transition-colors">
                                            Get Key <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </a>

                                    <a href="https://replicate.com/account/api-tokens" target="_blank" rel="noreferrer" className="group bg-white border border-gray-200 rounded-2xl p-5 flex flex-col items-center text-center gap-3 hover:border-[#111111] hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer relative overflow-hidden">
                                        <div className="w-14 h-14 bg-gray-50 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                                            <img src="/icons/replicate-icon.svg" alt="Replicate Logo" className="w-8 h-8 opacity-80 group-hover:opacity-100" />
                                        </div>
                                        <div className="flex-1 flex flex-col">
                                            <p className="text-sm font-bold text-gray-900">Replicate</p>
                                        </div>
                                        <div className="mt-auto w-full border-t border-gray-100 pt-3 flex items-center justify-center gap-1 text-[11px] font-bold uppercase tracking-wide text-gray-400 group-hover:text-[#111111] transition-colors">
                                            Get Key <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </a>
                                </div>
                            </div>

                            {/* Security deep dive image block */}
                            <div className="bg-gray-900 border border-gray-800 rounded-3xl overflow-hidden group shadow-xl">
                                <div className="w-full h-36 relative overflow-hidden">
                                    <img
                                        src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200&auto=format&fit=crop"
                                        alt="Encrypted data storage"
                                        className="w-full h-full object-cover group-hover:scale-110 group-hover:rotate-1 transition-all duration-700 opacity-60 mix-blend-luminosity group-hover:mix-blend-normal"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
                                </div>
                                <div className="p-8 flex gap-5 relative z-10 -mt-8">
                                    <span className="shrink-0 bg-gray-800 p-3 rounded-xl border border-gray-700 shadow-lg h-fit group-hover:bg-emerald-500 group-hover:border-emerald-400 transition-colors duration-300">
                                        <Lock className="w-6 h-6 text-gray-300 group-hover:text-white" />
                                    </span>
                                    <div>
                                        <h4 className="font-bold text-white text-lg mb-2">Where your key actually lives</h4>
                                        <p className="text-sm text-gray-400 leading-relaxed">
                                            When you paste a key into the field on the left, it's written straight to
                                            your browser's LocalStorage and used only to sign requests that leave
                                            directly from your device to your provider's API. It never touches our
                                            servers, our logs, or our database — clearing your browser data removes it
                                            completely, and that's by design.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Trust checklist */}
                            <ul className="space-y-3 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                                <li className="flex items-center gap-3 text-sm text-gray-700 font-medium group">
                                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 group-hover:scale-125 transition-transform" />
                                    No credit card required to add a key
                                </li>
                                <li className="flex items-center gap-3 text-sm text-gray-700 font-medium group">
                                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 group-hover:scale-125 transition-transform" />
                                    Keys can be removed securely at any time
                                </li>
                                <li className="flex items-center gap-3 text-sm text-gray-700 font-medium group">
                                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 group-hover:scale-125 transition-transform" />
                                    Works across every device natively (key is per-browser)
                                </li>
                            </ul>
                        </div>
                    </section>
                </ReactLenis>
            </main>
            <ScrollButtons />
        </div>
    );
}