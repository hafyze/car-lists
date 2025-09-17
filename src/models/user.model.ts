import { Schema, model } from 'mongoose';

const UserSchema = new Schema({
	name: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	passwordHash: { type: String, required: true },
	role: { type: String, enum: ['buyer', 'seller', 'admin'], default: 'buyer' },
	savedCars: [{ type: Schema.Types.ObjectId, ref: 'Car' }],
	createdAt: { type: Date, default: Date.now }
});
