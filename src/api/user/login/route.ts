import { NextResponse } from "next/server";
import mongoose from "mongoose";
import User from "../../../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const MONGODB_URI = process.env.MONGODB_URI;
const JWT_SECRET = process.env.JWT_SECRET || "Saket@1977"; 

export async function POST(request) {
  const body = await request.json();
  const { usernameOrEmail, password, role } = body;

  if (!usernameOrEmail || !password || !role) {
    return NextResponse.json({ success: false, message: "Missing fields" }, { status: 400 });
  }

  try {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(MONGODB_URI);
    }

    // Find user by email or username
    const user = await User.findOne({
      $or: [{ email: usernameOrEmail }, { username: usernameOrEmail }]
    });

    if (!user) {
      return NextResponse.json({ success: false, message: "User not found" }, { status: 401 });
    }

    // Check password based on role
   const passwordHash = role === "admin" ? user.adminPassword : user.kitchenPassword;
    const isMatch = await bcrypt.compare(password, passwordHash);

    if (!isMatch) {
      return NextResponse.json({ success: false, message: "Invalid password" }, { status: 401 });
    }

    // Generate JWT
    const token = jwt.sign(
      {
        userId: user._id,
        username: user.username,
        email: user.email,
        role: role
      },
      JWT_SECRET,
      { expiresIn: "2h" }
    );

    return NextResponse.json({
      success: true,
      message: "Login successful",
      username: user.username,
      email: user.email,
      role,
      token
    });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}