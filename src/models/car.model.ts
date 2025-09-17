import { Schema, model } from 'mongoose';

const CarSchema = new Schema({
	// Basic details
	brand: { type: String, required: true },
	model: { type: String, required: true },
	variant: { type: String, required: true },
	year: { type: Number, required: true },
	color: { type: String, required: true },
	condition: { type: String, enum: ['new', 'used'], required: true },

	// Listing info
	price: { type: Number, required: true },
	mileage: { type: Number, default: 0 },
	warranty: { type: Boolean, default: false },
	sellerId: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // relation

	// Specifications
	fuel: { type: String, enum: ['petrol', 'diesel', 'hybrid', 'electric'], required: true },
	drivetrain: { type: String, enum: ['FWD', 'RWD', 'AWD', '4WD'], required: true },
	seats: { type: Number },
	bodyType: {
		type: String,
		enum: ['sedan', 'hatchback', 'SUV', 'wagon', 'coupe', 'pickup', 'van']
	},
	transmission: { type: String, enum: ['manual', 'automatic', 'CVT', 'DCT'] },
	engine: {
		displacement: { type: Number }, // cc (ICE only)
		power: { type: Number }, // hp
		torque: { type: Number }, // Nm
		batteryCapacity: { type: Number }, // kWh (EV only)
		range: { type: Number } // km (EV only)
	},
	wheelSize: { type: Number },

	// Features
	features: [{ type: String }],

	// Media
	images: [{ type: String }],

	// Timestamps
	createdAt: { type: Date, default: Date.now },
	updatedAt: { type: Date, default: Date.now }
});

export default model('Car', CarSchema);
