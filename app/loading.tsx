'use client'

export default function Loading() {
    return (
        <div className="container px-4 py-6">
            <div className="flex gap-4 overflow-x-auto pb-4">
                {[1, 2, 3, 4, 5].map((i) => (
                    <div
                        key={i}
                        className="h-10 w-20 animate-pulse rounded-full bg-gray-200"
                    />
                ))}
            </div>
            <div className="grid grid-cols-1 gap-6 pt-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
                    <div key={i} className="space-y-2">
                        <div className="aspect-square animate-pulse rounded-[60px] bg-gray-200" />
                        <div className="h-4 w-2/3 mt-4 animate-pulse rounded bg-gray-200" />
                        <div className="h-4 w-1/3 animate-pulse rounded bg-gray-200" />
                    </div>
                ))}
            </div>
        </div>
    )
} 