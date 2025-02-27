import mongoose from 'mongoose';

const gameSchema = new mongoose.Schema({
    gameName: {
        type: String,
        required: [true, 'Game name is required'],
        unique: [true, 'Game not available']
    },
    gameDescription: {
        type: String,
        required: [true, 'Game description is required']
    },
    gameCategory: [String],
    fileHash: {
        type: String,
        required: [true, 'Game hash is required'],
        unique: [true, 'Duplicate file detected']
    },
    gameKeywords: [String],
    noOfLikes: {
        type: Number,
        default: 0,
        min: 0
    },
    noOfVotes: {
        type: Number,
        default: 0,
        min: 0
    },
    avgRating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
    },
    image: mongoose.Schema.Types.ObjectId,
    gamePath: mongoose.Schema.Types.ObjectId, // Corresponds to "gamePath"
    isFLash: Boolean,
    htmlLink: String,
    releasedOn: {
        type: Date,
        default: Date.now
    },
    releasedBy: {
        type: String,
        required: [true, 'Uploader username is required']
    }
}, {
    collection: 'games'
});

// Pre-save processing
gameSchema.pre('save', function (next) {
    this.gameName = this.gameName.toLowerCase();
    this.gameKeywords = this.gameKeywords.map(keyword => keyword.toLowerCase());
    this.gameCategory = this.gameCategory.map(category => category.toLowerCase());
    if (this.noOfVotes > 0) {
        this.avgRating = Math.round(5 * (this.noOfLikes / this.noOfVotes), 1);
    } else {
        this.avgRating = 0;
    }
    next();
});

const Game = mongoose.models.Game || mongoose.model('Game', gameSchema);

export default Game;
