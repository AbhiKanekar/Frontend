import { NextResponse } from "next/server";
import User from "@/models/User";

export async function GET(req, { params }) {
    const { email } = params;

    try {
        const user = await User.findByEmail(email);
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        return NextResponse.json(user, { status: 200 });
    } catch (error) {
        console.error("Failed to fetch user:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
