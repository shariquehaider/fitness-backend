import User from "../models/user";
import {
    RegisterUser,
    LoginCreds,
    UpdatePassword,
    UpdateUser,
    RegisterResponse,
    UpdateResponse,
    PasswordResponse,
    ProfileResponse
} from "../utils/interfaces";
import { generateToken, handleHash } from "../utils/utils";
import { secretKey } from "../index";
import bcrypt from "bcryptjs";

export async function registerUserHelper(user: RegisterUser): Promise<RegisterResponse> {
    try {
        const foundUser = await User.findOne({ email: user.email });
        if (foundUser) {
            throw new Error("User already exists");
        } else {
            const hashedPassword = await handleHash(user.password);
            const newUser = new User({
                email: user.email,
                password: hashedPassword,
                name: user.name
            });

            const savedUser = await newUser.save();
            return { code: 1, message: "User Registered Sucessfully", isLoggedIn: true };
        }
    } catch (err) {
        return { code: 0, error: err as string };
    }
}

export async function loginUserHelper(loginCreds: LoginCreds) {
    try {
        const foundUser = await User.findOne({ email: loginCreds.email });
        if (!foundUser) {
            throw new Error("Email not found");
        } else {
            const isMatched: boolean = await bcrypt.compare(loginCreds.password, foundUser.password as string);
            if (isMatched) {
                console.log("hi")
                const token = generateToken(loginCreds.email, secretKey as string);
                foundUser.token = token;
                await foundUser.save();
                return { code: 1, message: "User Logged", token: token, userId: foundUser._id }
            } else {
                throw new Error("Incorrect Email or Password");
            }
        }
    } catch (err) {
        return { code: 0, error: err }
    }
}

export async function changePasswordController(newCreds: UpdatePassword): Promise<PasswordResponse>{
    try {
        const foundUser = await User.findOne({ email: newCreds.email });
        if (!foundUser) {
            throw new Error("Email not found");
        } else {
            const userHashedPassword = await handleHash(newCreds.oldPassword);
            if (userHashedPassword === foundUser.password) {
                const newHashedPassword = generateToken(newCreds.newPassword, secretKey as string);
                foundUser.password = newHashedPassword;
                await foundUser.save();
            } else {
                throw new Error("Incorrect Password");
            }
            return {code: 1, message: "Password changed successfully"}
        }
    } catch (err) {
        return {code: 0, error: err as string};
    }
}


export async function updateUserHelper(user: UpdateUser): Promise<UpdateResponse> {
    try {
        const foundUser = await User.findOne({ email: user.email });
        if (foundUser) {
            foundUser.age = user.age;
            foundUser.weight = user.weight;
            foundUser.height = user.height;
            await foundUser.save();

        }
        return {code: 1, message: "Saved changes!"};
    } catch (err) {
        return {code: 0, error: err as string};
    }
}


export async function getUserDetails(id: string): Promise<ProfileResponse> {
    try {
        const foundUser = await User.findById(id);
        if (!foundUser) {
            throw new Error("User not Found");
        } else {
            return {code: 1, details: foundUser};
        }
    } catch (err) {
        return {code: 0, error:  err as string};
    }
}