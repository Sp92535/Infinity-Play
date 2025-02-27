import { filters, getImagesWithName } from "@/lib/images";
import { connectDB } from "@/lib/db";
import Game from "@/lib/models/Game";
import { NextResponse } from "next/server";


export const GET = async (req, { params }) => {
    try {
        await connectDB();

        const filterType = (await params).category;

        console.log(filterType);

        let games
        if (filters[filterType]) {

            games = await Game.find()
                .sort(filters[filterType])
                .select('gameName image');

        } else {

            games = await Game.find({ gameCategory: { $in: [filterType] } })
                .sort('-releasedOn')
                .select('gameName image');

        }

        const gamesData = await getImagesWithName(games);
        return NextResponse.json({
            success: true,
            games: gamesData
        }, { status: 200 });


    } catch (error) {
        return NextResponse.json({
            success: false,
            error: 'Internal Server Error'
        }, { status: 500 }
        );
    }
};
