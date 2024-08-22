
const mongoose = require("mongoose");
const shortid=require("shortid")

// Define the schema for the URL shortener
const UrlSchema = new mongoose.Schema({
    originalUrl: {
        type: String,
        required: true,
        // unique:true,
    },
    shortUrl: {
        type: String,
        // default:shortid.generate,
        required: true,
        unique: true,
    },
    // userId: {
    //     type: mongoose.Schema.Types.ObjectId,  // Reference to the User model
    //     ref: 'User',  // This tells Mongoose to expect an ObjectId that refers to the User model
    //     required: true
    // },
    clicks: {
        type: Number,
        default: 0,
    },
    urlCode: {
        type: String,
        required: true,
        unique: true,
    },
    dateCreated: {
        type: Date,
        default: Date.now,
    },

},{timestamps:true});

// Create a model from the schema
const UrlModel = mongoose.model("Url", UrlSchema);

module.exports = UrlModel;

