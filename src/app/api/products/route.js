import dbConnect from '../../../lib/mongodb';
import Product from '@/models/product';

export async function GET() {
    await dbConnect();

    try {
        const products = await Product.find();
        return Response.json(products);
    } catch (error) {
        return new Response("Failed to fetch products", { status: 500 });
    }
}

export async function POST(req) {
    await dbConnect();

    try {
        const body = await req.json();
        const product = await Product.create(body);

        return NextResponse.json({ success: true, product }, { status: 201 });
    } catch (error) {
        console.error("Error creating product:", error);
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}