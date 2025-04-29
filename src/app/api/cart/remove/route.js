import { MongoClient, ObjectId } from "mongodb";
import jwt from "jsonwebtoken";

export async function POST(request) {
    try {
        const token = request.headers.get("cookie")?.split('token=')[1]?.split(';')[0];

        if (!token) {
            return new Response(JSON.stringify({ message: "Unauthorized" }), { status: 401 });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.userId;

        const { productId } = await request.json();
        if (!productId) {
            return new Response(JSON.stringify({ message: "Product ID required" }), { status: 400 });
        }

        const client = await MongoClient.connect(process.env.MONGODB_URI);
        const db = client.db();

        await db.collection("carts").updateOne(
            { userId: new ObjectId(userId) },
            { $pull: { items: { _id: new ObjectId(productId) } } }
        );

        client.close();

        return new Response(JSON.stringify({ message: "Item removed" }), { status: 200 });
    } catch (error) {
        console.error("Remove from cart error:", error);
        return new Response(JSON.stringify({ message: "Server error" }), { status: 500 });
    }
}
    