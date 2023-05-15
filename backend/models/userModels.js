const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');


const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,

    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        
    },
    password: {
        type: String,
        required: true
    },
    following: {
        type: Array,
    }
}, {timestamps: true});

// static signup method

userSchema.statics.signup = async function(username, email, password, following) {

    const hashedPassword = await bcrypt.hash(password,10)   // saltRounds = 10

    const user = await this.create({username, email, password: hashedPassword,following})

    return user
}

// static login method

userSchema.statics.login = async function(email, password) {

    const user = await this.findOne({email})

    if(!user) {
        throw Error('Incorrect email')
    }

    const match = await bcrypt.compare(password, user.password)

    if(!match){
        throw Error('Incorrect password') 
    }

    return user
}

const User = mongoose.model('User',userSchema);

module.exports = User;