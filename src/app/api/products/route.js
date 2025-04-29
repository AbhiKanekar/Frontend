import clientPromise from '@/lib/mongodb';
import { NextResponse } from 'next/server';

export async function GET(request) {
    try {
        // Connect to MongoDB
        const client = await clientPromise;
        const db = client.db(); // Use your database name if not default

        // Fetch products with optional query parameters
        const { searchParams } = new URL(request.url);
        const limit = parseInt(searchParams.get('limit')) || 20;
        const page = parseInt(searchParams.get('page')) || 1;
        const skip = (page - 1) * limit;

        // Get products with pagination
        const products = await db.collection('products')
            .find()
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 }) // Sort by newest first
            .toArray();

        // Get total count for pagination
        const totalCount = await db.collection('products').countDocuments();

        return NextResponse.json({
            success: true,
            data: products,
            pagination: {
                total: totalCount,
                page,
                pages: Math.ceil(totalCount / limit),
                limit
            }
        });

    } catch (error) {
        console.error('Failed to fetch products:', error);
        return NextResponse.json(
            {
                success: false,
                error: 'Failed to fetch products',
                details: process.env.NODE_ENV === 'development' ? error.message : null
            },
            { status: 500 }
        );
    }
}

export async function POST(request) {
    try {
        const client = await clientPromise;
        const db = client.db();
        const body = await request.json();

        // Basic validation
        if (!body.name || !body.price) {
            return NextResponse.json(
                { success: false, error: 'Product name and price are required' },
                { status: 400 }
            );
        }

        // Create new product with timestamps
        const newProduct = {
            ...body,
            price: parseFloat(body.price),
            createdAt: new Date(),
            updatedAt: new Date()
        };

        const result = await db.collection('products').insertOne(newProduct);

        return NextResponse.json(
            {
                success: true,
                data: { ...newProduct, _id: result.insertedId }
            },
            { status: 201 }
        );

    } catch (error) {
        console.error('Failed to create product:', error);
        return NextResponse.json(
            {
                success: false,
                error: 'Failed to create product',
                details: process.env.NODE_ENV === 'development' ? error.message : null
            },
            { status: 500 }
        );
    }
}