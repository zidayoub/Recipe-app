import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Recipe } from "@/types";
import { Globe2, Heart, Tags, Video, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface RecipeModalProps {
    recipe: Recipe | null;
    isOpen: boolean;
    onClose: () => void;
}

export function RecipeModal({ recipe, isOpen, onClose }: RecipeModalProps) {
    const [isLiked, setIsLiked] = useState(false);

    if (!recipe) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-5xl h-auto max-h-[90vh] overflow-y-auto p-4 sm:p-6">
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 z-10 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
                >
                    <X className="h-4 w-4" />
                    <span className="sr-only">Close</span>
                </button>

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
                            <h2 className="text-xl sm:text-2xl font-bold mb-3">{recipe.title}</h2>

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

                        <div className="ml-4 sm:hidden flex items-center">
                            <button
                                onClick={() => setIsLiked(!isLiked)}
                                className="w-14 h-full min-h-[5rem] flex items-center justify-center rounded-xl bg-white/80 backdrop-blur-sm shadow-lg transition-all hover:scale-105 active:scale-95"
                                aria-label={isLiked ? "Unlike recipe" : "Like recipe"}
                            >
                                <Heart
                                    className={`w-8 h-8 transition-colors ${isLiked
                                        ? "fill-red-500 stroke-red-500"
                                        : "stroke-gray-600"
                                        }`}
                                />
                            </button>
                        </div>

                        {/* Desktop like button */}
                        <div className="hidden sm:block absolute top-6 right-6">
                            <button
                                onClick={() => setIsLiked(!isLiked)}
                                className="w-14 h-14 flex items-center justify-center rounded-full bg-white/80 backdrop-blur-sm shadow-lg transition-all hover:scale-105 active:scale-95"
                                aria-label={isLiked ? "Unlike recipe" : "Like recipe"}
                            >
                                <Heart
                                    className={`w-8 h-8 transition-colors ${isLiked
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