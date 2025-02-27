import { connectDB } from "@/lib/db";
import { NextResponse } from "next/server";

export const POST = async (req) => {
    try {
        await connectDB();
        
        const body = await req.json();

        console.log(body);
        // Decision pending of mail 

        return NextResponse.json({
            success: true,
            message: 'Reported'
        }, { status: 200 }
        );
    } catch (e) {
        return NextResponse.json({
            success: false,
            error: 'Internal Server Error'
        }, { status: 500 }
        );
    }
}