export default async function LoadingFavorites() {
    return (
        <div className="container px-4 py-6">
            <div className="h-8 w-48 bg-gray-200 rounded mb-6 animate-pulse" />

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                {/* Generate 10 skeleton cards */}
                {[...Array(10)].map((_, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                        {/* Skeleton image */}
                        <div className="w-full h-48 bg-gray-200 animate-pulse" />

                        {/* Skeleton content */}
                        <div className="p-4">
                            {/* Title skeleton */}
                            <div className="h-6 bg-gray-200 rounded w-3/4 mb-2 animate-pulse" />

                            {/* Description skeleton */}
                            <div className="space-y-2">
                                <div className="h-4 bg-gray-200 rounded w-full animate-pulse" />
                                <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse" />
                            </div>

                            {/* Button skeleton */}
                            <div className="mt-4 h-8 bg-gray-200 rounded w-full animate-pulse" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
