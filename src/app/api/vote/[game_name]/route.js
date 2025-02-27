import { connectDB } from "@/lib/db";
import Game from "@/lib/models/Game";
import { NextResponse } from "next/server";


export const PATCH = async (req, { params }) => {
    try {
        await connectDB();

        const gameName = (await params).game_name;
        const { searchParams } = new URL(req.url);
        const voteType = searchParams.get("like");
        
        let game = await Game.findOne({ gameName: gameName });

        if (!game) {
            return NextResponse.json({
                success: false,
                error: 'Game Not Found'
            }, { status: 404 }
            );
        }

        game.noOfVotes += 1
        game.noOfLikes += voteType == 1 ? 1 : 0;
        await game.save();

        return NextResponse.json({
            success: true,
            message: "Vote registered successfully"
        }, { status: 200 });

    } catch (e) {
        return NextResponse.json({
            success: false,
            error: 'Internal Server Error'
        }, { status: 500 }
        );
    }
}