import mongoose from "mongoose";

const adminSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        unique: [true, "Username already taken"]
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    }
}, {
    collection: 'admins'
});

const Admin = mongoose.models.Admin || mongoose.model('Admin', adminSchema);
export default Admin;