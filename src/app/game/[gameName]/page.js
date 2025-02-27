"use client"
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import "./game.css";
import axios from "axios";
import Script from "next/script";
import ReportForm from "@/components/ReportForm/ReportForm";

const Game = () => {
    const router = useRouter();
    const params = useParams();
    const gameName = params.gameName;

    const [game, setGame] = useState(null);
    const [voteType, setVoteType] = useState(null);
    const [votes, setVotes] = useState(0);
    const [hasVoted, setHasVoted] = useState(false);
    const [isReported, setIsReported] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [isReportFormVisible, setIsReportFormVisible] = useState(false);

    const capitalize = (name) => {
        return name
            .split(" ")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(" ");
    };

    const handleVote = async (like) => {
        if (!game) return; // Prevents null access error

        try {
            const response = await axios.patch(
                `/api/vote/${game.gameName}?like=${like}`,
                {},
                { validateStatus: () => true } // Allows handling all response statuses
            );

            if (response.status >= 200 && response.status < 300) {
                setHasVoted(true);
                setVotes(votes + 1);
                const vote = like === 1 ? "like" : "dislike";
                setVoteType(vote);
                localStorage.setItem(`vote_${gameName}`, vote);
            } else {
                setError("Failed to vote. Try again later.");
            }
        } catch (error) {
            console.error("Error while voting:", error);
            setError("Error while voting. Please try again.");
        }
    };

    const handleFullScreen = () => {
        const objectElement = document.getElementById("gameObject");
        if (objectElement) {
            if (objectElement.requestFullscreen) {
                objectElement.requestFullscreen();
            } else if (objectElement.mozRequestFullScreen) {
                objectElement.mozRequestFullScreen();
            } else if (objectElement.webkitRequestFullscreen) {
                objectElement.webkitRequestFullscreen();
            } else if (objectElement.msRequestFullscreen) {
                objectElement.msRequestFullscreen();
            }
        }
    };

    useEffect(() => {
        const fetchGame = async () => {
            try {
                
                const response = await axios.get(`/api/game_data/${gameName}`, {
                    validateStatus: () => true, // Allows handling all response statuses
                });

                if (response.status === 404) {
                    router.push("/not-found");
                    return;
                }

                if (response.status >= 200 && response.status < 300) {
                    setGame(response.data.game);
                    setVotes(response.data.game.noOfVotes);

                    const savedVoteType = localStorage.getItem(`vote_${gameName}`);
                    if (savedVoteType) {
                        setVoteType(savedVoteType);
                        setHasVoted(true);
                    }

                    const savedReportStatus = localStorage.getItem(`reported_${gameName}`);
                    if (savedReportStatus) {
                        setIsReported(true);
                    }
                } else {
                    setError("Failed to fetch game data.");
                }
            } catch (error) {
                console.error("Error fetching game data:", error);
                setError("Unable to fetch game data. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchGame();
    }, [gameName]);

    if (loading) return <div>Loading....</div>;
    if (error) return <div className="error-message">{error}</div>;
    if (!game) return <div className="error-message">Game not found.</div>; // Ensures no null errors

    return (
        <div className="game-page">
            <Script src="https://unpkg.com/@ruffle-rs/ruffle" strategy="afterInteractive" />
            <div className={`game-container ${isReportFormVisible ? "blur" : ""}`}>
                <h1 className="game-title">{capitalize(game.gameName)}</h1>
                <object
                    id="gameObject"
                    data={`/api/game_file/${game.gamePath}`}
                    type="application/x-shockwave-flash"
                    width="800"
                    height="500"
                >
                    <param name="quality" value="high" />
                    <param name="allowScriptAccess" value="always" />
                    <param name="wmode" value="transparent" />
                    Wait a moment....
                </object>

                <div className="button-container">
                    <button className="like-btn" onClick={() => handleVote(1)} disabled={hasVoted}>
                        👍 Like
                    </button>
                    <button className="dislike-btn" onClick={() => handleVote(0)} disabled={hasVoted}>
                        👎 Dislike
                    </button>
                    <button
                        className="report-btn"
                        onClick={() => setIsReportFormVisible(true)}
                        disabled={isReported}
                    >
                        🚨 Report
                    </button>
                    <button onClick={handleFullScreen} className="fullscreen-btn">
                        ⛶ Full Screen
                    </button>
                </div>
                <p className="game-description">
                    <strong>Rating:</strong> {game.avgRating}/5 ({votes} votes)
                </p>
                <p className="game-description">
                    <strong>Description:</strong> {game.gameDescription}
                </p>
                <p className="game-category">
                    <strong>Category:</strong> {game.gameCategory.map(capitalize).join(", ")}
                </p>
            </div>
            {isReportFormVisible && (
                <ReportForm
                    gameName={capitalize(game.gameName)}
                    setIsReportFormVisible={setIsReportFormVisible}
                    setIsReported={setIsReported}
                />
            )}
        </div>
    );
};

export default Game;
