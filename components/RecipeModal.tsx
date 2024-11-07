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
            favorites = favorites.filter((fav) => fav.id !== recipe.id);
        } else {
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
                            <button
                                onClick={toggleFavorite}
                                className="absolute top-2 right-2 w-10 h-10 flex items-center justify-center rounded-full bg-white/80 backdrop-blur-sm transition-all hover:scale-105 active:scale-95"
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

                    <div className="flex-1">
                        <div className="text-left">
                            <DialogTitle className="text-xl sm:text-2xl font-bold mb-3">
                                {recipe.title}
                            </DialogTitle>

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
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
} 