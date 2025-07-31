// filepath: c:\Users\Mayank Modi\OneDrive\Desktop\qr-brs\app\api\user\register\route.js
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import User from "@/models/User";
import bcrypt from "bcryptjs"

const MONGODB_URI = process.env.MONGODB_URI;

export async function POST(request) {
  const body = await request.json();
  const { username, email, adminPassword, kitchenPassword } = body;

  if (!username || !email || !adminPassword || !kitchenPassword) {
    return NextResponse.json({ success: false, message: "Missing fields" }, { status: 400 });
  }

  try {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(MONGODB_URI);
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return NextResponse.json({ success: false, message: "Email already registered" }, { status: 409 });
    }

    // Hash both passwords
    const adminHash = await bcrypt.hash(adminPassword, 10);
    const kitchenHash = await bcrypt.hash(kitchenPassword, 10);

    await User.create({ username, email, adminPassword: adminHash, kitchenPassword: kitchenHash });

    return NextResponse.json({ success: true, message: "User registered!" });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}