"use client"
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import "./Carousel.css"
import axios from "axios";
import GameCard from "../GameCard/GameCard";

const Carousel = ({ category }) => {

    const router = useRouter();
    const [currGames, setCurrGames] = useState([]);

    const fetchGameData = async () => {
        try {
            if (!category) throw new Error("No Category");

            const res = await axios.get("/api/category-latest/" + category);
            setCurrGames(res.data.games);
        } catch (error) {
            console.error('Error fetching game data:', error);
        }
    };


    useEffect(() => {
        fetchGameData();
    }, [category]);

    const capitalize = (name) => {
        return name
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(' ');
    };


    const goToGame = (gameName) => {
        router.push(`/game/${gameName}`); // Navigate to GamePage
    };

    const settings = {
        dots: false,
        infinite: false,
        speed: 400,
        slidesToShow: 7,
        slidesToScroll: 2
    };


    return (
        <div className="game-section">
            <h2>{capitalize(category)} Games</h2>
            <Slider {...settings}>
                {currGames.map((game) => (
                    <GameCard key={game.name} game={game} handleClick={goToGame} />
                ))}
            </Slider >
        </div>
    );
}

export default Carousel;