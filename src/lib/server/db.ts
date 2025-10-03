// src/lib/server/db.ts
import { MongoClient } from "mongodb";
import { env } from "$env/dynamic/private";
import type { CarSpec } from "$lib/types/car";

const uri = env.MONGODB_URI!;
let client = new MongoClient(uri);
let clientPromise = client.connect();

export async function getCars(): Promise<(CarSpec & { _id: string })[]> {
  const conn = await clientPromise;
  const db = conn.db("car-lists");
  const cars = await db.collection<CarSpec>("cars").find().toArray();

  return cars.map((car) => ({
    ...car,
    _id: car._id.toString(),
  }));
}
