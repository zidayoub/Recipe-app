'use client';

import Link from 'next/link';
import { useEffect } from 'react';

interface ErrorProps {
    error: Error;
    reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
    useEffect(() => {
        console.error('Error:', error);
    }, [error]);

    return (
        <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4">
            <div className="text-center space-y-6">
                <div className="space-y-2">
                    <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                        Oops! Something went wrong
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400">
                        {error.message || 'An unexpected error occurred'}
                    </p>
                </div>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <button
                        onClick={reset}
                        className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
                    >
                        Try again
                    </button>
                    <Link
                        href="/"
                        className="inline-flex h-10 items-center justify-center rounded-md border border-primary px-8 text-sm font-medium shadow-sm transition-colors hover:bg-primary hover:text-primary-foreground"
                    >
                        Go back home
                    </Link>
                </div>
            </div>
        </div>
    );
}
