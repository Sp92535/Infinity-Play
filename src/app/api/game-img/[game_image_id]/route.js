import { connectDB } from "@/lib/db";
import getBucket from "@/lib/getBucket";
import { NextResponse } from "next/server";
import { ObjectId } from 'mongodb';

export const GET = async (req, { params }) => {
    try {
        await connectDB();

        const gameImageId = (await params).game_image_id;

        if (!gameImageId)
            return "";

        

        const id = new ObjectId(gameImageId)

        const bucket = getBucket();

        const stream = bucket.openDownloadStream(id);

        return new NextResponse(stream, {
            headers: {
                "Content-Type": "image/jpeg", // Change based on your stored image type
                // "Cache-Control": "public, max-age=31536000", // Optional: Cache for performance
            },
        });

    } catch (error) {
        return NextResponse.json({
            success: false,
            error: 'Internal Server Error'
        }, { status: 500 }
        );
    }
};
