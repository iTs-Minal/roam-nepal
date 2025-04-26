import clientPromise from "./mongodb";

export async function getUserByEmail(email: string) {
  const client = await clientPromise;
  const db = client.db("authdb"); // Replace with your DB name
  return await db.collection("users").findOne({ email });
}
