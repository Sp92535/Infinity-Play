"use client";
import { useRouter, useSearchParams } from "next/navigation";
import "./search.css";
import SearchResults from "@/components/SearchResults/SearchResults";
import { Suspense } from "react";

const SearchQuery = () => {
    const searchParams = useSearchParams();
    return searchParams.get("query") || "";
};

const GameSearch = () => {
    const router = useRouter();

    const goToGame = (gameName) => {
        router.push(`/game/${gameName}`);
    };

    return (
        <div className="search-page">
            <h2>
                Search Results for "<Suspense fallback="..."><SearchQuery /></Suspense>"
            </h2>
            <Suspense fallback={<p>Loading results...</p>}>
                <SearchResults query={<SearchQuery />} handleClick={goToGame} />
            </Suspense>
        </div>
    );
};

export default GameSearch;
