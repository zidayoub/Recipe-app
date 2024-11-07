import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Recipe } from "@/types";
import { Globe2, Heart, Tags, Video } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

interface RecipeModalProps {
    recipe: Recipe | null;
    isOpen: boolean;
    onClose: () => void;
}

export function RecipeModal({ recipe, isOpen, onClose }: RecipeModalProps) {
    const [isLiked, setIsLiked] = useState(false);

    useEffect(() => {
        if (recipe) {
            // Check if recipe is in favorites when recipe changes
            const storedFavorites = localStorage.getItem('favorites');
            if (storedFavorites) {
                const favorites = JSON.parse(storedFavorites);
                setIsLiked(favorites.some((fav: Recipe) => fav.id === recipe.id));
            }
        }
    }, [recipe]);

    const toggleFavorite = () => {
        if (!recipe) return;

        const storedFavorites = localStorage.getItem('favorites');
        let favorites: Recipe[] = storedFavorites ? JSON.parse(storedFavorites) : [];

        if (isLiked) {
            // Remove from favorites
            favorites = favorites.filter((fav) => fav.id !== recipe.id);
        } else {
            // Add to favorites
            favorites.push(recipe);
        }

        localStorage.setItem('favorites', JSON.stringify(favorites));
        setIsLiked(!isLiked);
    };

    if (!recipe) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-5xl h-auto max-h-[90vh] overflow-y-auto p-4 sm:p-6" aria-describedby={undefined}>
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                    <div className="w-full sm:w-[40%]">
                        <div className="relative aspect-video sm:aspect-square rounded-lg overflow-hidden">
                            <Image
                                src={recipe.image}
                                alt={recipe.title}
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>

                    <div className="flex-1 flex sm:block">
                        <div className="flex-1 text-left">
                            <div className="flex items-start justify-between mb-3">
                                <DialogTitle className="text-xl sm:text-2xl font-bold">
                                    {recipe.title}
                                </DialogTitle>
                                <div className="hidden sm:block">
                                    <button
                                        onClick={toggleFavorite}
                                        className="w-10 h-10 flex items-center justify-center rounded-full transition-all hover:scale-105 active:scale-95"
                                        aria-label={isLiked ? "Unlike recipe" : "Like recipe"}
                                    >
                                        <Heart
                                            className={`w-6 h-6 transition-colors ${isLiked
                                                ? "fill-red-500 stroke-red-500"
                                                : "stroke-gray-600"
                                                }`}
                                        />
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <Globe2 className="w-4 h-4 flex-shrink-0" />
                                    <span>Cuisine: {recipe.area}</span>
                                </div>

                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <Tags className="w-4 h-4 flex-shrink-0" />
                                    <span>Category: {recipe.category}</span>
                                </div>

                                {recipe.youtube && (
                                    <a
                                        href={recipe.youtube}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 text-sm text-primary hover:underline mt-2"
                                    >
                                        <Video className="w-4 h-4" />
                                        Watch Video Tutorial
                                    </a>
                                )}
                            </div>
                        </div>

                        <div className="ml-4 sm:hidden flex items-center pr-2">
                            <button
                                onClick={toggleFavorite}
                                className="w-10 flex items-center justify-center rounded-full transition-all hover:scale-105 active:scale-95"
                                aria-label={isLiked ? "Unlike recipe" : "Like recipe"}
                            >
                                <Heart
                                    className={`w-full h-full transition-colors ${isLiked
                                        ? "fill-red-500 stroke-red-500"
                                        : "stroke-gray-600"
                                        }`}
                                />
                            </button>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
} 