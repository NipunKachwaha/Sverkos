import React from 'react';
import { LoaderCore } from '@/components/LoadingScreen/LoaderCore'; // Adjust import path

export default function Loading() {
    // Uses the indeterminate state of LoaderCore
    return <LoaderCore />;
}