import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function middleware(request) {
    const token = request.cookies.get('token')?.value;

    if (!token) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const response = NextResponse.next();
        return response;
    } catch (error) {
        console.error('JWT verification failed:', error);
        const response = NextResponse.redirect(new URL('/login', request.url));
        response.cookies.delete('token');
        return response;
    }
}

export const config = {
    matcher: ['/dashboard/:path*', '/profile/:path*'], // Protect these routes
};