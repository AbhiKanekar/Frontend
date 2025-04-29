import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

class Cart {
    static async addToCart(userId, product) {
        const client = await clientPromise;
        const db = client.db();
        return db.collection('carts').updateOne(
            { userId: new ObjectId(userId) },
            { $push: { items: product } },
            { upsert: true }
        );
    }

    static async getCart(userId) {
        const client = await clientPromise;
        const db = client.db();
        return db.collection('carts').findOne({ userId: new ObjectId(userId) });
    }

    static async removeFromCart(userId, productId) {
        const client = await clientPromise;
        const db = client.db();
        return db.collection('carts').updateOne(
            { userId: new ObjectId(userId) },
            { $pull: { items: { _id: new ObjectId(productId) } } }
        );
    }
}

export default Cart;
