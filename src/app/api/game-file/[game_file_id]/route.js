import { connectDB } from "@/lib/db";
import getBucket from "@/lib/getBucket";
import { NextResponse } from "next/server";
import { ObjectId } from 'mongodb';

export const GET = async (req, { params }) => {
    try {
        await connectDB();

        const gameFileId = (await params).game_file_id;

        if (!gameFileId)
            return null;

        const id = new ObjectId(gameFileId)

        const bucket = getBucket();

        const stream = bucket.openDownloadStream(id);

        return new NextResponse(stream, {
            headers: {
                'Content-Type': 'application/x-shockwave-flash',
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
