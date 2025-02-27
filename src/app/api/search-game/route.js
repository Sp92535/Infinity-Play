import { getImagesWithName } from "@/lib/images";
import { connectDB } from "@/lib/db"
import Game from "@/lib/models/Game";
import { NextResponse } from "next/server";

export const GET = async (req) => {
    try {
        await connectDB();

        const { searchParams } = new URL(req.url);
        const u = searchParams.get("q");

        const games = await Game.find({
            $or: [
                { gameName: { $regex: u, $options: "i" } },
                { gameKeywords: { $regex: u, $options: "i" } },
            ]
        }).select('gameName image');

        const gamesData = await getImagesWithName(games);
        return NextResponse.json({
            success: true,
            games: gamesData
        }, { status: 200 });

    } catch (error) {
        return NextResponse.json({
            success: false,
            error: 'Internal Server Error'
        }, { status: 500 });
    }
}