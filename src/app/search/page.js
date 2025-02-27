"use client";
import { useRouter, useSearchParams } from "next/navigation";
import "./search.css";
import SearchResults from "@/components/SearchResults/SearchResults";

const GameSearch = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const query = searchParams.get("query") || ""; // Get query from URL

    const goToGame = (gameName) => {
        router.push(`/game/${gameName}`); // Navigate to GamePage
    };
    return (
        <div className="search-page">
            <h2>Search Results for "{query}"</h2>
            <SearchResults query={query} handleClick={goToGame} />
        </div>
    );
};

export default GameSearch;
