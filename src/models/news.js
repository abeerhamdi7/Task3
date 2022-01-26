const mongoose = require('mongoose')

const newsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    reporter: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Reporter'
    }

}, {
    timestamps: {
        currentTime: () =>
            Math.floor(new Date().setHours(new Date().getHours() + 2))
    }
})

const News = mongoose.model('News', newsSchema)
module.exports = News