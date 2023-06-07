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
            minLength: 2,
            maxLength: 4000,
            trim: true,
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
            minLength: 2,
            maxLength: 20,
            required: true 
        },
        releaseYear: {
            type: Number,
            min: 1895,
            max: 2100,
            required: true
        },
        duration: {
            type: Number,
            required: true
        },
        rating: {
            type: Number,
            min: 0.01,
            max: 10,
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
            minLength: 2,
            maxLength: 20,
            required: true
        }
    },
    {timestamps: true}
);

module.exports = mongoose.model("film", filmSchema);