import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/mongodb';
import Form from '../../../models/Form';
import bcrypt from 'bcryptjs';

export async function POST(req) {
    try {
        await dbConnect();

        const body = await req.json();
        const { name, email, password } = body;

        const hashedPassword = await bcrypt.hash(password, 10);
        console.log("Request body:", body);

        await Form.create({
            name, email, password: hashedPassword
        })
        return NextResponse.json({ message: 'Form submitted successfully!' }, { status: 200 });

    } catch (error) {
        console.error("POST API Error:", error);
        return NextResponse.json({ message: 'Error submitting form', error: error.message }, { status: 500 });
    }
}


export async function GET() {
    try {
        await dbConnect();
        const forms = await Form.find({});
        return NextResponse.json({ data: forms }, { status: 200 });
    } catch (error) {
        console.error("GET API Error:", error);
        return NextResponse.json({ message: 'Error fetching data' }, { status: 500 });
    }
}

export async function DELETE(request) {
    try {
        await dbConnect();
        const body = await request.json();
        const { id } = body;

        const deleted = await Form.findByIdAndDelete(id);

        if (!deleted) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'User deleted successfully' }, { status: 200 });
    } catch (error) {
        console.error("DELETE API Error:", error);
        return NextResponse.json({ message: 'Error deleting user', error: error.message }, { status: 500 });
    }
}
