export const filters = {
    'new': '-releasedOn',
    'trending': '-avgRating',
    'popular': '-noOfVotes'
}

export const getImagesWithName = async (games) => {
    const gamesData = [];
    for (let game of games) {
        gamesData.push({
            name: game.gameName,
            img: `/api/game-img/${game.image}`
        });
    }
    return gamesData;
}