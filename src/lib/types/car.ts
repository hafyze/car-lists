export interface CarSpec {
  _id: string;

  brand: string;
  model: string;
  variant: string;
  year: number;
  color: string;
  condition: 'new' | 'used' | 'recon';

  price: number;
  mileage: string;
  warranty: boolean;
  sellerId: string;

  fuel: 'petrol' | 'diesel' | 'hybrid' | 'electric';
  drivetrain: 'fwd' | 'rwd' | 'awd' | '4wd';
  seats?: number;
  bodyType?: 'sedan' | 'hatchback' | 'suv' | 'wagon' | 'coupe' | 'pickup' | 'van';
  transmission?: 'manual' | 'automatic' | 'cvt' | 'dct';
  engine?: {
    displacement?: number;
    power?: number;
    torque?: number;
    batteryCapacity?: number;
    range?: number;
  };
  wheelSize?: number;

  features: string[];
  images: string[];

  createdAt: string;
  updatedAt: string;

  // UI only
  img?: string;
  link?: string;
  fuel_consumption?: string;
}
