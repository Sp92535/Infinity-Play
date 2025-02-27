import { connectDB } from "@/lib/db";
import getBucket from "@/lib/getBucket";
import Game from "@/lib/models/Game";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { verifyToken } from "@/lib/auth";

export const DELETE = async (req, { params }) => {
    try {
        await connectDB();

        const token = req.headers.get('authorization').split(' ')[1];

        const decoded = verifyToken(token);

        if (!decoded || !decoded.vip) {
            return NextResponse.json({
                success: false,
                message: "Invalid Credentials"
            }, { status: 401 });
        }


        const gameName = (await params).game_name;

        const game = await Game.findOne({ gameName: gameName });


        if (!game) {
            return NextResponse.json({
                success: false,
                message: "Game not found"
            }, { status: 404 });
        }

        const bucket = getBucket();

        if (game.image) {
            await bucket.delete(new ObjectId(game.image));
        }
        if (game.gamePath) {
            await bucket.delete(new ObjectId(game.gamePath));
        }

        await Game.deleteOne({ gameName: gameName });

        return NextResponse.json({
            success: true,
            message: "Game Deleted sucessfully"
        }, { status: 200 });

    } catch (error) {
        console.log(error);

        return NextResponse.json({
            success: false,
            error: 'Internal Server Error'
        }, { status: 500 }
        );
    }
};
