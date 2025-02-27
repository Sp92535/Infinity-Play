import "./GameCard.css"
const GameCard = ({ game, handleClick }) => {
    const capitalize = (name) => {
        return name
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(' ');
    };
    return (
        <div className="game-card" onClick={() => handleClick(game.name)}>
            <img src={game.img} alt={game.name} />
            <p>{capitalize(game.name)}</p>
        </div>
    );
}

export default GameCard;