import mongoose, { Schema } from "mongoose";



const userSchema: Schema = new Schema ({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    weight: { type: Number },
    height: { type: Number },
    age: { type: Number },
    token: { type: String },
    refresh_token: { type: String },
    created_at: { type: Date, default: Date.now() },
    expired_at: { type: Date }
})

const User = mongoose.model('User', userSchema);

export default User;