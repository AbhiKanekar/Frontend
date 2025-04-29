import clientPromise from '@/lib/mongodb';

class User {
    static async create(userData) {
        const client = await clientPromise;
        const db = client.db();
        return db.collection('users').insertOne(userData);
    }

    static async findByEmail(email) {
        const client = await clientPromise;
        const db = client.db();
        return db.collection('users').findOne({ email });
    }

    static async updateLoginTime(userId) {
        const client = await clientPromise;
        const db = client.db();
        return db.collection('users').updateOne(
            { _id: userId },
            { $set: { lastLogin: new Date() } }
        );
    }
}

export default User;