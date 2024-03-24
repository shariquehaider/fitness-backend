import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


export async function handleHash(password: string): Promise<string> {
    try {
        const hashedPassword = await bcrypt.hash(password, 12);
        return hashedPassword;
    } catch (err) {
        throw new Error("Error hashing password");
    }
}


export function generateToken (userId: string, secretKey: string): string {
    const token = jwt.sign(userId, secretKey);
    console.log(token)
    return token;
}