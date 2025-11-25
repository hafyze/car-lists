// src/lib/server/db.ts
import { MongoClient } from 'mongodb';
import { env } from '$env/dynamic/private';
import type { CarSpec } from '$lib/types/car';

const uri = env.MONGODB_URI;
if (!uri) {
	throw new Error('❌ Please define MONGODB_URI in your .env file');
}

// Configure MongoClient with TLS options for Atlas
const client = new MongoClient(uri, {
	tls: true,
	tlsAllowInvalidCertificates: false
});

// Extend globalThis to include _mongoClientPromise
declare global {
	// eslint-disable-next-line no-var
	var _mongoClientPromise: Promise<MongoClient> | undefined;
}

// Reuse client promise in dev mode to avoid multiple connections
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
	// @ts-ignore - attach to globalThis for persistence across hot reloads
	if (!globalThis._mongoClientPromise) {
		globalThis._mongoClientPromise = client.connect();
	}
	clientPromise = globalThis._mongoClientPromise;
} else {
	clientPromise = client.connect();
}

export async function getCars(): Promise<(CarSpec & { _id: string })[]> {
	const conn = await clientPromise;
	const db = conn.db('car-lists');
	const cars = await db.collection<CarSpec>('cars').find().toArray();

	return cars.map((car) => ({
		...car,
		_id: car._id.toString()
	}));
}
