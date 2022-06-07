import mongoose from 'mongoose';

const user = new mongoose.Schema({
    id: String, // mongoose is retarded and won't accept numbers in search for no reason.
    icon: String,
    username: String,
    password: String,
});

const User = mongoose.model('user', user);
export default User;