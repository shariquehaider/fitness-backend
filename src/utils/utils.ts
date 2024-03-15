import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


export async function handleHash(password: string): Promise<string> {
    try {
        const salt: string = await bcrypt.genSalt(10);
        console.log(salt)
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    } catch (err) {
        throw new Error("Error hashing password");
    }
}


export function generateToken (email: string, secretKey: string): string {
    const token = jwt.sign(email, secretKey, { expiresIn: '1d' });
    return token;
}