"use server";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { getUserByLogin } from "./server/users";

const secretKey = "secret";
const key = new TextEncoder().encode(secretKey);

const expiresInMs = 1000 * 60 * 60 * 24 * 7; // 1 week

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1 week from now")
    .sign(key);
}

export async function decrypt(input: string): Promise<any> {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  });
  return payload;
}

export async function login(email: string, password: string) {
  "use server";
  // Verify credentials && get the user
  const user = await getUserByLogin({ email, password });
  if (!user) return null;

  // Create the session
  const expires = new Date(Date.now() + expiresInMs); // 1 week
  const session = await encrypt({ user, expires });

  // Save the session in a cookie
  cookies().set("session", session, { expires, httpOnly: true });
  return true;
}

export async function logout() {
  // Destroy the session
  cookies().set("session", "", { expires: new Date(0) });
}

export async function getSession() {
  "use server";
  const session = cookies().get("session")?.value;
  if (!session) return null;
  return await decrypt(session);
}

export async function updateSession(request: NextRequest) {
  const session = request.cookies.get("session")?.value;
  if (!session) return;

  // Refresh the session so it doesn't expire
  const parsed = await decrypt(session);
  parsed.expires = new Date(Date.now() + expiresInMs);
  const res = NextResponse.next();
  res.cookies.set({
    name: "session",
    value: await encrypt(parsed),
    httpOnly: true,
    expires: parsed.expires,
  });
  return res;
}

// // Function to generate a JWT token
// function generateToken(
//   payload: any,
//   secret: string,
//   expiresIn: string
// ): string {
//   return jwt.sign(payload, secret, { expiresIn });
// }

// // Function to verify a JWT token
// function verifyToken(token: string, secret: string): any {
//   try {
//     return jwt.verify(token, secret);
//   } catch (error) {
//     throw new Error("Invalid token");
//   }
// }

// // Function to extract the payload from a JWT token
// function extractPayload(token: string): any {
//   try {
//     const decodedToken = jwt.decode(token);
//     return decodedToken;
//   } catch (error) {
//     throw new Error("Invalid token");
//   }
// }

// export { generateToken, verifyToken, extractPayload };
