import axios from "axios";
import { useState, useEffect } from "react";
import "./SearchResults.css";
import GameCard from "@/components/GameCard/GameCard";

const SearchResults = ({ query, handleClick }) => {
    const [games, setGames] = useState([]);

    useEffect(() => {
        const fetchGames = async () => {
            if (!query) return; // Avoid API call if query is empty

            try {
                const res = await axios.get(`/api/search_game?q=${query}`);
                setGames(res.data.games);
            } catch (error) {
                console.error("Error fetching games:", error);
            }
        };

        fetchGames();
    }, [query]);

    return (
        <div className="game-search-container">
            <div className="game-grid">
                {games.map((game) => (
                    <GameCard key={game.name} game={game} handleClick={handleClick} />
                ))}
            </div>
        </div>
    );
};

export default SearchResults;
