import { Schema, model } from 'mongoose';

const CarSchema = new Schema(
  {
    // Basic details
    brand: { type: String, required: true },
    model: { type: String, required: true },
    variant: { type: String, required: true },
    year: { type: Number, required: true },
    color: { type: String, required: true },
    condition: { type: String, enum: ['new', 'used', 'recon'], required: true },

    // Listing info
    price: { type: Number, required: true, min: 0 },
    mileage: { type: String, default: 0, min: 0 }, // km
    warranty: { type: Boolean, default: false },
    sellerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },

    // Specifications
    fuel: { type: String, enum: ['petrol', 'diesel', 'hybrid', 'electric'], required: true },
    drivetrain: { type: String, enum: ['fwd', 'rwd', 'awd', '4wd'], required: true },
    seats: { type: Number },
    bodyType: {
      type: String,
      enum: ['sedan', 'hatchback', 'suv', 'wagon', 'coupe', 'pickup', 'van']
    },
    transmission: { type: String, enum: ['manual', 'automatic', 'cvt', 'dct'] },
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
    images: {
      type: [String],
      validate: (v: any) => Array.isArray(v) && v.length > 0
    }
  },
  { timestamps: true }
);

// Indexes for faster search
CarSchema.index({ brand: 1, model: 1, year: -1 });
CarSchema.index({ price: 1 });
CarSchema.index({ condition: 1 });

export default model('Car', CarSchema);
