'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface NotificationItemProps {
    item: {
        id: number;
        type: 'terms' | 'news' | 'video';
        title: string;
        description: string;
        time: string;
        hasReadMore?: boolean;
        image?: string;
        brand?: string;
        thumbnail?: string;
        videoDuration?: string;
        subtitle?: string;
    };
    index: number;
}

const NotificationItem: React.FC<NotificationItemProps> = ({ item, index }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);

    const getIcon = () => {
        switch (item.type) {
            case 'terms':
                return '📋';
            case 'news':
                return item.image || '📰';
            case 'video':
                return item.thumbnail || '🎬';
            default:
                return '🔔';
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => item.hasReadMore && setIsExpanded(!isExpanded)}
            className="group relative p-4 rounded-2xl cursor-pointer transition-all duration-500"
            style={{
                background: isHovered
                    ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.08) 100%)'
                    : 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)',
                border: isHovered
                    ? '1px solid rgba(255, 255, 255, 0.25)'
                    : '1px solid rgba(255, 255, 255, 0.1)',
                transform: isHovered ? 'scale(1.02)' : 'scale(1)',
                boxShadow: isHovered
                    ? '0 8px 24px rgba(0, 0, 0, 0.2), inset 0 0 0 0.5px rgba(255, 255, 255, 0.1)'
                    : 'none',
            }}
        >
            {/* Shimmer Effect */}
            {isHovered && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 rounded-2xl overflow-hidden"
                >
                    <div
                        className="absolute inset-0"
                        style={{
                            background: 'linear-gradient(105deg, transparent 40%, rgba(255, 255, 255, 0.1) 45%, rgba(255, 255, 255, 0.05) 50%, transparent 54%)',
                            backgroundSize: '200% 100%',
                            animation: 'shimmer 2s infinite',
                        }}
                    />
                </motion.div>
            )}

            <div className="relative z-10">
                {/* Video Preview */}
                {item.type === 'video' && (
                    <div
                        className="mb-3 rounded-xl overflow-hidden relative h-40"
                        style={{
                            background: 'linear-gradient(135deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.3) 100%)',
                        }}
                    >
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center">
                                <div className="text-4xl mb-2">{getIcon()}</div>
                                <div className="text-white text-xs font-bold tracking-wider">{item.subtitle}</div>
                            </div>
                        </div>
                        {/* Play Button */}
                        <motion.div
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="absolute inset-0 flex items-center justify-center"
                        >
                            <div
                                className="w-12 h-12 rounded-full flex items-center justify-center"
                                style={{
                                    background: 'rgba(255, 255, 255, 0.2)',
                                    backdropFilter: 'blur(10px)',
                                    border: '2px solid rgba(255, 255, 255, 0.3)',
                                }}
                            >
                                <svg className="w-5 h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M8 5v14l11-7z" />
                                </svg>
                            </div>
                        </motion.div>
                        {/* Duration Badge */}
                        <div
                            className="absolute bottom-2 right-2 px-2 py-1 rounded-md text-xs font-medium text-white"
                            style={{
                                background: 'rgba(0, 0, 0, 0.6)',
                                backdropFilter: 'blur(4px)',
                            }}
                        >
                            {item.videoDuration}
                        </div>
                    </div>
                )}

                {/* News Image */}
                {item.type === 'news' && item.brand && (
                    <div className="mb-3 flex items-center gap-2">
                        <div
                            className="px-3 py-1.5 rounded-lg text-sm font-medium"
                            style={{
                                background: 'linear-gradient(135deg, rgba(255, 165, 0, 0.2) 0%, rgba(255, 140, 0, 0.1) 100%)',
                                border: '1px solid rgba(255, 165, 0, 0.3)',
                                color: '#FFA500',
                            }}
                        >
                            {item.brand}
                        </div>
                        <span className="text-gray-500 text-xs">←</span>
                        <div
                            className="px-3 py-1.5 rounded-lg text-sm font-medium text-white"
                            style={{
                                background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(99, 102, 241, 0.1) 100%)',
                                border: '1px solid rgba(99, 102, 241, 0.3)',
                            }}
                        >
                            Sverkos
                        </div>
                    </div>
                )}

                {/* Content */}
                <div className="flex gap-3">
                    {!item.type.includes('video') && (
                        <div
                            className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                            style={{
                                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
                                border: '1px solid rgba(255, 255, 255, 0.15)',
                            }}
                        >
                            {getIcon()}
                        </div>
                    )}
                    <div className="flex-1 min-w-0">
                        <h4 className="text-white text-sm font-semibold mb-1 group-hover:text-blue-300 transition-colors duration-300">
                            {item.title}
                        </h4>
                        <p className={`text-gray-400 text-xs leading-relaxed ${isExpanded ? '' : 'line-clamp-2'}`}>
                            {item.description}
                        </p>
                        {item.hasReadMore && (
                            <motion.button
                                initial={{ opacity: 0 }}
                                animate={{ opacity: isHovered ? 1 : 0.6 }}
                                className="mt-2 text-xs font-medium text-blue-400 hover:text-blue-300 transition-colors duration-300"
                            >
                                Read more →
                            </motion.button>
                        )}
                    </div>
                </div>

                {/* Time */}
                <div className="mt-3 flex items-center justify-between">
                    <span className="text-gray-500 text-xs">{item.time}</span>
                    {item.type === 'video' && (
                        <div className="flex items-center gap-1 text-gray-500">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="text-xs">Snowflake</span>
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default NotificationItem;