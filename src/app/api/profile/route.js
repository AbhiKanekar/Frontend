import { MongoClient, ObjectId } from "mongodb";
import jwt from "jsonwebtoken";

export async function GET(request) {
    try {
        const cookieHeader = request.headers.get("cookie");

        if (!cookieHeader) {
            return new Response(JSON.stringify({ message: "No cookies found" }), {
                status: 401,
            });
        }

        // Extract the token from the 'token=' cookie
        const tokenMatch = cookieHeader.match(/token=([^;]+)/);
        const token = tokenMatch ? tokenMatch[1] : null;

        if (!token) {
            return new Response(JSON.stringify({ message: "Token missing" }), {
                status: 401,
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const client = await MongoClient.connect(process.env.MONGODB_URI);
        const db = client.db();

        const user = await db
            .collection("users")
            .findOne({ _id: new ObjectId(decoded.userId) });

        client.close();

        if (!user) {
            return new Response(JSON.stringify({ message: "User not found" }), {
                status: 404,
            });
        }

        return new Response(
            JSON.stringify({
                id: user._id,
                name: user.name,
                email: user.email,
                profileImage: user.profileImage || null,
            }),
            { status: 200 }
        );
    } catch (error) {
        console.error("Error verifying token:", error);
        return new Response(
            JSON.stringify({ message: "Authentication failed" }),
            { status: 403 }
        );
    }
}
