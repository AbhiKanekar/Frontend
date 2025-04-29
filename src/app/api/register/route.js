import { MongoClient } from 'mongodb';
import bcrypt from 'bcryptjs';

export async function POST(request) {
    try {
        const { name, email, password } = await request.json();

        if (!name || !email || !password) {
            return new Response(
                JSON.stringify({ message: 'All fields are required' }),
                { status: 400 }
            );
        }

        const client = await MongoClient.connect(process.env.MONGODB_URI);
        const db = client.db();

        const existingUser = await db.collection('users').findOne({ email });
        if (existingUser) {
            client.close();
            return new Response(
                JSON.stringify({ message: 'User already exists' }),
                { status: 409 }
            );
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const newUser = {
            name,
            email,
            password: hashedPassword,
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        const result = await db.collection('users').insertOne(newUser);
        client.close();

        return new Response(
            JSON.stringify({
                message: 'User created successfully',
                userId: result.insertedId
            }),
            { status: 201 }
        );

    } catch (error) {
        console.error('Registration error:', error);
        return new Response(
            JSON.stringify({ message: 'Internal server error' }),
            { status: 500 }
        );
    }
}