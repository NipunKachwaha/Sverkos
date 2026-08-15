'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import FadingVideo from './FadingVideo'

// Importing icons from the public folder
import enginen from '@/public/icons/engine.png'
import launchIcon from '@/public/icons/launch.png'
import insightIcon from '@/public/icons/insight.png'

const cards = [
  {
    id: "app-gen-engine",
    icon: enginen,
    title: <>App Generation<br />Engine</>,
    description: 'Transform your ideas into functional software using just plain text. Describe your vision, get an instant interactive prototype, and let the intelligent engine handle the underlying code.',
    tags: ['NoCode', 'GenAI', 'RapidPrototyping', 'SaaS'],
  },
  {
    id: "launch-distribution",
    icon: launchIcon,
    title: <>Launch &<br />Distribution</>,
    description: 'Analyzes your newly built application to automatically generate targeted landing pages, waitlist emails, and promotional copy \u2014 getting your product to market instantly.',
    tags: ['UserAcquisition', 'GrowthHacking', 'ProductLaunch', 'MarketReach'],
  },
  {
    id: "operations-analytics",
    icon: insightIcon,
    title: <>Action &<br />Insights</>,
    description: 'Track autonomous tasks, monitor decision pathways, and measure API usage. Customize your dashboard to optimize the efficiency, success rate, and cost of your automated workflows.',
    tags: ['TaskAutomation', 'DecisionLogs', 'PerformanceMetrics', 'WorkflowInsights'],
  },
]

export default function CapabilitiesSection() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden ">
      <FadingVideo
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260418_094631_d30ab262-45ee-4b7d-99f3-5d5848c8ef13.mp4"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />
      <div className="relative z-10 px-8 md:px-16 lg:px-20 pt-24 pb-10 flex flex-col min-h-screen">
        <motion.div
          initial={{ filter: 'blur(10px)', opacity: 0, y: 20 }}
          whileInView={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="mb-auto"
        >
          <h2 className="font-heading italic text-white text-6xl md:text-7xl lg:text-[6rem] leading-[0.9] tracking-[-3px]">
            Idea to<br />Reality
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          {cards.map((card, i) => {
            return (
              <motion.div
                key={card.id}
                initial={{ filter: 'blur(10px)', opacity: 0, y: 30 }}
                whileInView={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, delay: 0.15 * i, ease: 'easeOut' }}
                className="liquid-glass rounded-[1.25rem] p-6 min-h-[360px] flex flex-col"
              >
                {/* Top Section */}
                <div className="flex items-start justify-between gap-4">
                  <div className="w-11 h-11 liquid-glass flex items-center justify-center shrink-0" style={{ borderRadius: '0.75rem' }}>
                    <Image
                      src={card.icon}
                      alt={`${card.id} Icon`}
                      className="h-6 w-6 object-contain brightness-0 invert"
                    />
                  </div>
                  <div className="flex flex-wrap justify-end gap-1.5 max-w-[70%]">
                    {card.tags.map((tag) => (
                      <span key={tag} className="liquid-glass rounded-full px-3 py-1 text-[11px] text-white/90 font-body whitespace-nowrap">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Spacer */}
                <div className="flex-1" />

                {/* Bottom Section */}
                <div className="mt-6 flex items-end justify-between gap-4">
                  {/* Text Container */}
                  <div>
                    <h3 className="font-heading italic text-white text-3xl md:text-4xl tracking-[-1px] leading-none">{card.title}</h3>
                    <p className="mt-3 text-sm text-white/90 font-body font-light leading-snug max-w-[32ch]">{card.description}</p>
                  </div>

                  {/* Arrow Button as Button */}
                  <button
                    type="button"
                    className="w-11 h-11 liquid-glass flex items-center justify-center shrink-0 transition hover:scale-105 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
                    style={{ borderRadius: '0.75rem' }}
                    aria-label="View More"
                  >
                    <svg
                      width="28"
                      height="28"
                      viewBox="0 0 28 28"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-7 w-7 text-white"
                    >
                      <path
                        d="M8 14H20M20 14L15.5 9.5M20 14L15.5 18.5"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}