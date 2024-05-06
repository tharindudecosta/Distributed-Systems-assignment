const mongoose = require('mongoose')

const Schema = mongoose.Schema

const paymentSchema = new Schema({
    amount: {
        type: Number,
        required: true
    },
    course:{
        type: Schema.Types.ObjectId,
        ref: 'Course'
    },
    student:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    status: {
        type: String,
        required: true,
    },
}, {timestamps: true});

module.exports = mongoose.model('Payment', paymentSchema)