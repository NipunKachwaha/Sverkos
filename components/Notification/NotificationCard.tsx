'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import NotificationsTab from './NotificationsTab';
import LatestNewsTab from './LatestNewsTab';

interface NotificationCardProps {
    isOpen: boolean;
    onClose: () => void;
}

const NotificationCard: React.FC<NotificationCardProps> = ({ isOpen, onClose }) => {
    const [activeTab, setActiveTab] = useState<'notifications' | 'latestNews'>('notifications');

    const tabs = [
        { id: 'notifications' as const, label: 'Notifications' },
        { id: 'latestNews' as const, label: 'Latest news' },
    ];

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                    transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                    className="w-[420px] z-50"
                    style={{
                        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
                        backdropFilter: 'blur(20px) saturate(180%)',
                        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                        border: '1px solid rgba(255, 255, 255, 0.18)',
                        borderRadius: '20px',
                        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37), inset 0 0 0 0.5px rgba(255, 255, 255, 0.1)',
                    }}
                >
                    {/* Header with Tabs */}
                    <div className="p-4 pb-0">
                        <div
                            className="flex gap-1 p-1 rounded-xl"
                            style={{
                                background: 'rgba(255, 255, 255, 0.08)',
                                backdropFilter: 'blur(10px)',
                            }}
                        >
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`relative flex-1 py-2.5 px-4 text-sm font-medium rounded-lg transition-all duration-300 ${activeTab === tab.id
                                            ? 'text-white'
                                            : 'text-gray-400 hover:text-gray-300'
                                        }`}
                                >
                                    {activeTab === tab.id && (
                                        <motion.div
                                            layoutId="activeTab"
                                            className="absolute inset-0 rounded-lg"
                                            style={{
                                                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.1) 100%)',
                                                border: '1px solid rgba(255, 255, 255, 0.2)',
                                                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                                            }}
                                            transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                                        />
                                    )}
                                    <span className="relative z-10">{tab.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Content Area */}
                    <div className="p-4 max-h-[500px] overflow-y-auto custom-scrollbar">
                        <AnimatePresence mode="wait">
                            {activeTab === 'notifications' ? (
                                <NotificationsTab key="notifications" />
                            ) : (
                                <LatestNewsTab key="latestNews" />
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Footer Tags */}
                    <div className="px-4 pb-4 pt-2 border-t border-white/10">
                        <div className="flex flex-wrap gap-2">
                            {['Recent apps', 'Community templates', 'Sverkos'].map((tag) => (
                                <span
                                    key={tag}
                                    className="px-3 py-1.5 text-xs font-medium text-gray-300 rounded-full cursor-pointer transition-all duration-300 hover:scale-105"
                                    style={{
                                        background: 'rgba(255, 255, 255, 0.08)',
                                        border: '1px solid rgba(255, 255, 255, 0.12)',
                                    }}
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute -top-2 -right-2 w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:text-white transition-all duration-300 hover:scale-110"
                        style={{
                            background: 'rgba(255, 255, 255, 0.15)',
                            backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                        }}
                    >
                        ✕
                    </button>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default NotificationCard;