import { Schema, model } from 'mongoose';

const SellerSchema = new Schema({
	userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
	businessName: { type: String }, // optional (for dealerships)
	contactNumber: { type: String, required: true },
	location: { type: String }, // e.g., Bayan Lepas, Penang
	cars: [{ type: Schema.Types.ObjectId, ref: 'Car' }], // cars listed by seller
	rating: { type: Number, default: 0 },
	verified: { type: Boolean },
	createdAt: { type: Date, default: Date.now }
});
