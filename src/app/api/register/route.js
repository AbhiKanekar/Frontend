import dbConnect from "@/lib/mongodb";
import Form from "@/models/Form";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req) {
    try {
        await dbConnect();
        const { name, email, password } = await req.json();

        const hashedPassword = await bcrypt.hash(password, 10);

        await Form.create({
            name,
            email,
            password: hashedPassword,
        });
        console.log("Request body:", { name, email, password });

        return NextResponse.json({ message: "User Created Successfully" });
    } catch (error) {
        console.error("POST API Error:", error);
        return NextResponse.json({ message: 'Error checking user existence', error: error.message }, { status: 500 });
    }
}