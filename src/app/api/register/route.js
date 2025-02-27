import { verifyToken } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import Admin from "@/lib/models/Admin";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs"

const salt = 10;

export const POST = async (req) => {
    try {
        await connectDB();

        const { username, password } = await req.json();
        const token = req.headers.get('authorization').split(' ')[1];

        const decoded = verifyToken(token);

        if (!decoded || !decoded.vip) {
            return NextResponse.json({
                success: false,
                message: "Invalid Credentials"
            }, { status: 401 });
        }

        const hashed = await bcrypt.hash(password, salt);

        const admin = new Admin({
            username,
            password: hashed
        });

        await admin.save();

        return NextResponse.json({
            success: true,
            message: "Admin Created Successfully"
        }, { status: 200 });

    } catch (error) {
        return NextResponse.json({
            success: false,
            error: 'Internal Server Error'
        }, { status: 500 });
    }
}