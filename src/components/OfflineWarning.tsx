"use client";
import { useOnlineStatus } from '@/hooks/useOnlineStatus';
import { useEffect, useState } from 'react';

export default function OfflineWarning() {
    const isOnline = useOnlineStatus();

    if (isOnline) {
        return null;
    }

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-red-500 text-white p-4 text-center">
            You are currently offline. Some features may not be available.
        </div>
    );
}
