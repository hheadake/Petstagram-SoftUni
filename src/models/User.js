const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required!'],
        minLength: [2, 'Username must be more than 2 characters!']

    },
    password: {
        type: String,
        required: true,
        minLength: [4, 'Password must be more than 4 characters!']
    },
    email: {
        type: String,
        minLength: [5, 'Email should be at least 5 characters!'],
        required: true
    }
});

userSchema.virtual('repeatPassword').set(function(value){
if(this.password !== value) {
throw new Error ('Password dont match');
}
});

userSchema.pre('save', async function() {
    const hash = await bcrypt.hash(this.password, 10)
    this.password = hash;
});




const User = mongoose.model('User', userSchema);
module.exports = User;