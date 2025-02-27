import axios from "axios";
import { useState, useEffect } from "react";
import "./CategoryAll.css";
import GameCard from "@/components/GameCard/GameCard";
import { useRouter } from "next/navigation";

const CategoryAll = ({ category }) => {
    const [games, setGames] = useState([]);

    const router = useRouter();

    useEffect(() => {
        const fetchGames = async () => {
            if (!category) return; // Avoid API call if query is empty

            try {
                const res = await axios.get(`/api/category-all/${category}`);
                setGames(res.data.games);
            } catch (error) {
                console.error("Error fetching games:", error);
            }
        };

        fetchGames();
    }, [category]);

    const goToGame = (gameName) => {
        router.push(`/game/${gameName}`); // Navigate to GamePage
    };
    const capitalize = (name) => {
        return name
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(' ');
    };
    return (
        <div className="game-category-container">
            <h2>All {capitalize(category)} Games</h2>
            <div className="game-grid">
                {games.map((game) => (
                    <GameCard key={game.name} game={game} handleClick={goToGame} />
                ))}
            </div>
        </div>
    );
};

export default CategoryAll;
