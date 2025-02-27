import { connectDB } from "@/lib/db";
import Game from "@/lib/models/Game";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
    try {
        await connectDB();

        const gameName = (await params).game_name;

        const game = await Game.findOne({ gameName: gameName });

        if(!game){
            return NextResponse.json({
                success: false,
                message: "Game not found"
            }, { status: 404 });            
        }

        return NextResponse.json({
            success: true,
            game: game
        }, { status: 200 });

    } catch (error) {
        return NextResponse.json({
            success: false,
            error: 'Internal Server Error'
        }, { status: 500 }
        );
    }
};
