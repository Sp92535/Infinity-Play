import { connectDB } from "@/lib/db";
import Admin from "@/lib/models/Admin";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs"
import { generateToken } from "@/lib/auth";

const superUsername = process.env.SUPER_USERNAME;
const superPassword = process.env.SUPER_PASSWORD;

export const POST = async (req) => {
    try {
        await connectDB();
        const { username, password } = await req.json();

        if (username == superUsername && password == superPassword) {
            return NextResponse.json({
                success: true,
                access_token: generateToken({ username, vip: true }),
                vip: true
            }, { status: 200 });
        }

        const admin = await Admin.findOne({ username: username });

        if (!admin) {
            return NextResponse.json({
                success: false,
                message: "Admin Not found"
            }, { status: 404 });
        }

        const isValid = await bcrypt.compare(password, admin.password); // ORDER MATTERS

        if (!isValid) {
            return NextResponse.json({
                success: false,
                message: "Invalid Credentials"
            }, { status: 401 });
        }

        return NextResponse.json({
            success: true,
            access_token: generateToken({ username, vip: false }),
            vip: false
        }, { status: 200 });


    } catch (error) {
        console.log();

        return NextResponse.json({
            success: false,
            error: 'Internal Server Error'
        }, { status: 500 });
    }
}