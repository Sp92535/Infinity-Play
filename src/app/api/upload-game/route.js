import { verifyToken } from "@/lib/auth";
import getBucket from "@/lib/getBucket";
import Game from "@/lib/models/Game";
import { NextResponse } from "next/server";
const { connectDB } = require("@/lib/db");
import crypto from "crypto"

export const POST = async (req) => {

    try {
        await connectDB();
        const formData = await req.formData()   // use .get() to access fields
        const token = req.headers.get('authorization').split(' ')[1];

        const decoded = verifyToken(token);
        if (!decoded) {
            return NextResponse.json({
                success: false,
                message: "Unautorized to upload."
            }, { status: 401 });
        }

        const game = new Game({
            gameName: formData.get("gameName"),
            gameDescription: formData.get("gameDescription"),
            gameCategory: formData.get("gameCategory"),
            gameKeywords: formData.get("gameKeywords"),
            isFlash: formData.get("isFlash"),
            releasedBy: decoded.username
        })

        // ----- Upload Block -----
        const isFlash = formData.get("isFlash")

        const bucket = getBucket();

        const image = formData.get("image")
        const imageBuffer = Buffer.from(await image.arrayBuffer());
        const imageUploadStream = bucket.openUploadStream(image.name, { contentType: image.type })
        imageUploadStream.end(imageBuffer)
        game.image = imageUploadStream.id

        if (isFlash) {
            const swfFile = formData.get("swfFile")
            const gameBuffer = Buffer.from(await swfFile.arrayBuffer());

            const hash = crypto.createHash("sha256").update(gameBuffer).digest("hex");

            const exist = await Game.findOne({ fileHash: hash });

            if (exist) {
                return NextResponse.json({
                    success: false,
                    Message: 'Game already exists'
                }, { status: 403 });
            }

            const gameUploadStream = bucket.openUploadStream(swfFile.name, { contentType: swfFile.type })
            gameUploadStream.end(gameBuffer)
            game.gamePath = gameUploadStream.id
            game.fileHash = hash;
            await game.save()
        } else {
            // game.htmlLink = formData.get("htmlLink")
        }


        return NextResponse.json({
            success: true,
            message: "Game Uploaded Successfully."
        }, { status: 200 });

    } catch (error) {

        return NextResponse.json({
            success: false,
            error: 'Internal Server Error'
        }, { status: 500 });
    }

}