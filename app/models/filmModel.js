const mongoose = require("mongoose");

const filmSchema = mongoose.Schema(
    {
        title: {
            type: String,
            unique: true,
            minLength: 2,
            maxLength: 40,
            trim: true,
            required: true,
        }, 
        type: {
            type: String,
            enum: ['film'], //['series', 'film']
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        country: {
            type : String,
            minLength: 2,
            maxLength: 20,
            trim: true,
            required: true
        },
        genres: {
            type: Array,
            required: true 
        },
        releaseYear: {
            type: Number,
            required: true
        },
        duration: {
            type: Number,
            required: true
        },
        rating: {
            type: Number,
            required: true
        },
        posterSrc:{
            type: String,
            required: true
        },
        bgSrc:{
            type: String,
            required: true
        },
        trailerID:{
            type: String,
            required: true
        },
        director:{
            type: String,
            required: true
        }
    },
    {timestamps: true}
);

module.exports = mongoose.model("film", filmSchema);