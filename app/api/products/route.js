// app/api/products/route.js

import clientPromise from "@/app/api/mongodb";

export async function GET() {
    const client = await clientPromise;
    const db = client.db("storeDB");
    const products = await db.collection("products").find().toArray();
    return Response.json(products);
}

export async function POST(request) {
    const client = await clientPromise;
    const db = client.db("storeDB");
    const body = await request.json();
    const newProduct = await db.collection("products").insertOne(body);
    return Response.json({ message: "Here is the new product you added", product: newProduct.insertedId });
}