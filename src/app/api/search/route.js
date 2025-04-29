import { MongoClient } from "mongodb";

export async function GET(req) {
    const url = new URL(req.url);
    const query = url.searchParams.get("query");

    if (!query) {
        return new Response(JSON.stringify({ success: false, error: "Query required" }), {
            status: 400,
        });
    }

    const client = await MongoClient.connect(process.env.MONGODB_URI);
    const db = client.db();
    const products = await db
        .collection("products")
        .find({ name: { $regex: query, $options: "i" } })
        .toArray();

    client.close();

    return new Response(
        JSON.stringify({ success: true, data: products }),
        { status: 200 }
    );
}
