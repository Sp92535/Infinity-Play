import { verifyToken } from "@/lib/auth";
import { connectDB } from "@/lib/db"
import Admin from "@/lib/models/Admin";
import { NextResponse } from "next/server";

export const DELETE = async (req) => {
    try {
        await connectDB();

        const { username } = await req.json();
        const token = req.headers.get('authorization').split(' ')[1];

        const decoded = verifyToken(token);

        if (!decoded || !decoded.vip) {
            return NextResponse.json({
                success: false,
                message: "Invalid Credentials"
            }, { status: 401 });
        }

        await Admin.findOneAndDelete({ username });

        return NextResponse.json({
            success: true,
            message: "Admin Deleted Successfully"
        }, { status: 200 });

    } catch (error) {
        console.log(error);

        return NextResponse.json({
            success: false,
            error: 'Internal Server Error'
        }, { status: 500 });
    }
}