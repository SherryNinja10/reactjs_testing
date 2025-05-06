'use server';

import clientPromise from '@/app/api/mongodb';
import { ObjectId } from 'mongodb';

export async function createProduct(formData) {
    const name = formData.get('name');
    const price = parseFloat(formData.get('price'));
    const category = formData.get('category');
    const stock = parseInt(formData.get('stock'));

    const client = await clientPromise;
    const db = client.db("storeDB");
    const collection = db.collection("products");

    const result = collection.insertOne({
      name,
      price,
      category,
      stock
    });

    console.log("Product Id: ", result.insertedId);
}

export async function deleteProduct(id) {
  const client = await clientPromise;
  const result = client.db('storeDB').collection('products').deleteOne({ _id: new ObjectId(id)});

  console.log("Product was deleted");
}