"use client";

import { useTransition, useState } from "react";
import { toggleFavorite } from "../actions/favorites";

export default function FavoriteButton({
    routineId,
    initialIsFavorite,
}: {
    routineId: string;
    initialIsFavorite: boolean;
}) {
    const [isPending, startTransition] = useTransition();
    const [isFavorite, setIsFavorite] = useState(initialIsFavorite);

    const handleToggle = (e: React.MouseEvent) => {
        e.preventDefault(); // Prevent link navigation
        e.stopPropagation();

        setIsFavorite((prev) => !prev); // Optimistic update

        startTransition(async () => {
            try {
                await toggleFavorite(routineId);
            } catch (error) {
                // Revert on error
                setIsFavorite((prev) => !prev);
                console.error("Failed to toggle favorite:", error);
            }
        });
    };

    return (
        <button
            onClick={handleToggle}
            disabled={isPending}
            className="ml-2 p-1 hover:scale-110 transition-transform focus:outline-none"
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
            {isFavorite ? (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6 text-red-500"
                >
                    <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-9.006-8.913c-1.1-2.903-.79-6.075 1.705-8.245 2.505-2.176 6.326-1.571 8.24 1.393 1.916-2.964 5.736-3.568 8.241-1.393 2.494 2.17 2.805 5.342 1.704 8.245a15.242 15.242 0 01-9.006 8.913l-.022.012-.007.003L12 21l-.355-.09z" />
                </svg>
            ) : (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 text-gray-400 hover:text-red-400"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                    />
                </svg>
            )}
        </button>
    );
}
