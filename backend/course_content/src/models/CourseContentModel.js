const mongoose = require('mongoose')

const Schema = mongoose.Schema

const courseContentSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    file: {
        type: String,
        required: [true, 'Provide content'],
    },
    course:{
        type: Schema.Types.ObjectId,
        ref: 'Course'
    }
}, {timestamps: true});

module.exports = mongoose.model('CourseContent', courseContentSchema)