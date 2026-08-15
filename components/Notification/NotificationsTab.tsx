'use client';

import React from 'react';
import { motion } from 'framer-motion';
import NotificationItem from './NotificationItem';

const NotificationsTab: React.FC = () => {
    const notifications = [
        {
            id: 1,
            type: 'terms' as const,
            title: 'Terms of Service Update',
            description: 'Our Terms of Service will be updated on June 21, 2026. Please review the changes.',
            time: '15 days ago',
            hasReadMore: true,
        },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
        >
            {notifications.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
                        className="w-20 h-20 rounded-full flex items-center justify-center mb-4"
                        style={{
                            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
                            border: '1px solid rgba(255, 255, 255, 0.15)',
                        }}
                    >
                        <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                        </svg>
                    </motion.div>
                    <p className="text-gray-400 text-sm font-medium">No notifications yet</p>
                    <p className="text-gray-500 text-xs mt-1">We'll let you know when something arrives</p>
                </div>
            ) : (
                <div className="space-y-3">
                    {notifications.map((notification, index) => (
                        <NotificationItem key={notification.id} item={notification} index={index} />
                    ))}
                </div>
            )}
        </motion.div>
    );
};

export default NotificationsTab;