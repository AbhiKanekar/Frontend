// src/app/api/cart/route.js
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import Cart from '@/models/Cart';
import { cookies } from 'next/headers';

export async function POST(request) {
    try {
        const cookie = cookies().get('token')?.value;

        if (!cookie) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        const decoded = jwt.verify(cookie, process.env.JWT_SECRET);
        const { product } = await request.json();

        await Cart.addToCart(decoded.userId, product);

        return NextResponse.json({ message: 'Product added to cart' }, { status: 200 });
    } catch (error) {
        console.error('Add to cart error:', error);
        return NextResponse.json({ message: 'Server error' }, { status: 500 });
    }
}

export async function GET() {
    try {
        const cookie = cookies().get('token')?.value;

        if (!cookie) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        const decoded = jwt.verify(cookie, process.env.JWT_SECRET);
        const cart = await Cart.getCart(decoded.userId);

        return NextResponse.json({ cart }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Server error' }, { status: 500 });
    }
}
