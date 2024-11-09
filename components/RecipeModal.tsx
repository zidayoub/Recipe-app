import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { getRecipeById } from "@/lib/api";
import { RecipeDetails } from "@/types";
import { Globe2, Heart, Link2, Loader2, Tags, UtensilsCrossed, Video } from "lucide-react";
import Image from "next/image";
import { useEffect, useState, useTransition } from "react";

interface RecipeModalProps {
    recipeId?: string;
    isOpen: boolean;
    onClose: () => void;
    isLiked?: boolean;
}

export function RecipeModal({ recipeId, isOpen, onClose, isLiked }: RecipeModalProps) {
    const [liked, setLiked] = useState(isLiked);
    const [recipe, setRecipe] = useState<RecipeDetails | null>(null);
    const [isPending, startTransition] = useTransition();

    useEffect(() => {
        startTransition(async () => {
            const fetchRecipe = async () => {
                if (recipeId) {
                    const recipe = await getRecipeById(recipeId);
                    setRecipe(recipe);
                }
            }
            await fetchRecipe();
        });
    }, [recipeId]);

    const toggleFavorite = async (e: React.MouseEvent) => {
        e.stopPropagation();
        if (liked) {
            await fetch(`/api/favorites?id=${recipe?.idMeal}`, {
                method: 'DELETE',
            });
            console.log('deleted')
        } else {
            await fetch('/api/favorites', {
                method: 'POST',
                body: JSON.stringify(recipe),
            });
            console.log('added')
        }

        setLiked(!liked);
    };

    if (!recipe) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-5xl h-auto max-h-[90vh] overflow-y-auto p-4 sm:p-6" aria-describedby={undefined}>
                {isPending && <div className="flex justify-center items-center h-full"><Loader2 className="w-10 h-10 animate-spin" /></div>}
                {!isPending && (
                    <div className="flex flex-col gap-6">
                        {/* Image and Basic Info Section */}
                        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                            <div className="w-full sm:w-[40%]">
                                <div className="relative aspect-video sm:aspect-square rounded-lg overflow-hidden">
                                    <Image
                                        src={recipe.strMealThumb}
                                        alt={recipe.strMeal}
                                        width={100}
                                        height={100}
                                        className="object-cover w-full h-full"
                                    />
                                    <div className="absolute bottom-0 right-0 flex justify-center p-2 bg-gradient-to-t from-black/50 to-transparent">
                                        <button
                                            onClick={toggleFavorite}
                                            className="w-10 h-10 flex items-center justify-center rounded-full bg-white/80 backdrop-blur-sm transition-all hover:scale-105 active:scale-95"
                                            aria-label={liked ? "Unlike recipe" : "Like recipe"}
                                        >
                                            <Heart
                                                className={`w-6 h-6 transition-colors ${liked
                                                    ? "fill-red-500 stroke-red-500"
                                                    : "stroke-gray-600"
                                                    }`}
                                            />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="flex-1">
                                <DialogTitle className="text-xl sm:text-2xl font-bold mb-3">
                                    {recipe.strMeal}
                                </DialogTitle>

                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-sm text-gray-700">
                                        <Globe2 className="w-4 h-4 flex-shrink-0" />
                                        <span>Cuisine: {recipe.strArea}</span>
                                    </div>

                                    <div className="flex items-center gap-2 text-sm text-gray-700">
                                        <Tags className="w-4 h-4 flex-shrink-0" />
                                        <span>Category: {recipe.strCategory}</span>
                                    </div>

                                    {recipe.strTags && (
                                        <div className="flex flex-wrap gap-2 mt-2">
                                            {recipe.strTags.split(',').map((tag) => (
                                                <span
                                                    key={tag}
                                                    className="px-2 py-1 bg-gray-200 rounded-full text-xs text-gray-800"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    )}

                                    <div className="flex flex-wrap gap-3 mt-3">
                                        {recipe.strYoutube && (
                                            <a
                                                href={recipe.strYoutube}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
                                            >
                                                <Video className="w-4 h-4" />
                                                Watch Video
                                            </a>
                                        )}
                                        {recipe.strSource && (
                                            <a
                                                href={recipe.strSource}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
                                            >
                                                <Link2 className="w-4 h-4" />
                                                Source
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Ingredients Section */}
                        <div className="mt-6">
                            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                                <UtensilsCrossed className="w-5 h-5" />
                                Ingredients
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {recipe.ingredients.map(({ ingredient, measure }, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center gap-2 p-2 bg-gray-100 rounded-md"
                                    >
                                        <div className="relative w-10 h-10 rounded-md overflow-hidden">
                                            <Image
                                                src={`https://www.themealdb.com/images/ingredients/${ingredient}-Small.png`}
                                                alt={ingredient}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <span className="text-sm">
                                            <span className="font-medium">{measure}</span> {ingredient}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Instructions Section */}
                        <div className="mt-6">
                            <h3 className="text-lg font-semibold mb-3">Instructions</h3>
                            <div className="space-y-4">
                                {recipe.strInstructions.split('\n').map((instruction, index) => (
                                    instruction.trim() && (
                                        <p key={index} className="text-gray-700">
                                            {instruction.trim()}
                                        </p>
                                    )
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
} 