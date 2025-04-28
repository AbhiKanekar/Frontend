import mongoose from 'mongoose';
import { unique } from 'next/dist/build/utils';

const fromSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
}, { timestamps: true });

export default mongoose.models.Form || mongoose.model("Form", fromSchema);