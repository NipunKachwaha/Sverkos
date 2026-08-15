'use client';

import React from 'react';
import { motion } from 'framer-motion';
import NotificationItem from './NotificationItem';

const LatestNewsTab: React.FC = () => {
    const news = [
        {
            id: 1,
            type: 'news' as const,
            title: 'Fable 5 returns to Sverkos',
            description: 'Anthropic\'s Mythos-class model Claude Fable 5 is back on Sverkos. Great for long, complex jobs and multi-step tasks. Try it from the model selector.',
            time: '6 days ago',
            image: '📊',
            brand: 'Claude Fable 5',
        },
        {
            id: 2,
            type: 'video' as const,
            title: 'Watch your users in action →',
            description: 'See exactly where people click, get stuck, or drop off, and use Summarize with AI to pull the key moments...',
            time: '12 days ago',
            thumbnail: '🎬',
            videoDuration: '2:40',
            subtitle: 'NATURALLY FERMENTED',
        },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
            className="space-y-3"
        >
            {news.map((item, index) => (
                <NotificationItem key={item.id} item={item} index={index} />
            ))}
        </motion.div>
    );
};

export default LatestNewsTab;