import { MongoClient } from 'mongodb';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function POST(request) {
    try {
        const { email, password } = await request.json();

        if (!email || !password) {
            return new Response(
                JSON.stringify({ message: 'Email and password are required' }),
                { status: 400 }
            );
        }

        const client = await MongoClient.connect(process.env.MONGODB_URI);
        const db = client.db();

        const user = await db.collection('users').findOne({ email });
        client.close();

        if (!user) {
            return new Response(
                JSON.stringify({ message: 'Invalid credentials' }),
                { status: 401 }
            );
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return new Response(
                JSON.stringify({ message: 'Invalid credentials' }),
                { status: 401 }
            );
        }

        const token = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        return new Response(
            JSON.stringify({
                message: 'Login successful',
                token,
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email
                }
            }),
            {
                status: 200,
                headers: {
                    'Set-Cookie': `token=${token}; HttpOnly; Path=/; Max-Age=3600; SameSite=Strict${process.env.NODE_ENV === 'production' ? '; Secure' : ''}`
                }
            }
        );

    } catch (error) {
        console.error('Login error:', error);
        return new Response(
            JSON.stringify({ message: 'Internal server error' }),
            { status: 500 }
        );
    }
}