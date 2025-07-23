import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
        },
        riotId: {
            type: Number,
            required: true,
        },
        password: {
            type: String,
            required: true,
            minlength: 7,
        },
    }, { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;