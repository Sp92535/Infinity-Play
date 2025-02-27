import { useState } from "react";
import "./DeleteGame.css";
import SearchResults from "../SearchResults/SearchResults";
import axios from "axios";
import Confirmation from "../Confirmation/Confirmation";

const DeleteGame = () => {
    const [query, setQuery] = useState("");
    const [confirmGame, setConfirmGame] = useState(null)

    const deleteGame = async () => {
        try {
            if (!confirmGame) return;
            const res = await axios.delete(`/api/delete_game/${confirmGame}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                },
            })
            alert("DELETED")
        } catch (error) {
            alert("ERROR")
        } finally {
            setConfirmGame(null)
        }
    }

    return (
        <div className="delete-game-container">
            <input
                type="text"
                className="search-bar"
                placeholder="Search games..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <div className="search-results-container">
                <SearchResults query={query} handleClick={setConfirmGame} />
            </div>

            {confirmGame && <Confirmation handleDelete={deleteGame} setConfirm={setConfirmGame}/>}

        </div>
    );
};

export default DeleteGame;
