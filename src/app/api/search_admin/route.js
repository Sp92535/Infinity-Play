import { verifyToken } from "@/lib/auth";
import { connectDB } from "@/lib/db"
import Admin from "@/lib/models/Admin";
import { NextResponse } from "next/server";

export const GET = async (req) => {
    try {
        await connectDB();

        const { searchParams } = new URL(req.url);
        const u = searchParams.get("q");
        const token = req.headers.get('authorization').split(' ')[1];

        const decoded = verifyToken(token);

        if (!decoded || !decoded.vip) {
            return NextResponse.json({
                success: false,
                message: "Invalid Credentials"
            }, { status: 401 });
        }

        const admins = await Admin.find({ username: { $regex: u, $options: "i" } }).select('username');

        return NextResponse.json({
            success: true,
            admins
        }, { status: 200 });

    } catch (error) {
        return NextResponse.json({
            success: false,
            error: 'Internal Server Error'
        }, { status: 500 });
    }
}