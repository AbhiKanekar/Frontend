import dbConnect from "@/lib/mongodb";
import Form from "@/models/Form";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        await dbConnect();

        const { email } = await req.json();
        console.log("Request body:", { email });

        if (!email) {
            return NextResponse.json(
                { message: "Email is required" },
                { status: 400 }
            );
        }

        const user = await Form.findOne({ email }).select("_id");
        const userExists = !!user; // true if user exists

        return NextResponse.json({ userExists }, { status: 200 });
    } catch (error) {
        console.error("POST API Error:", error);
        return NextResponse.json(
            { message: "Error checking user existence", error: error.message },
            { status: 500 }
        );
    }
}
