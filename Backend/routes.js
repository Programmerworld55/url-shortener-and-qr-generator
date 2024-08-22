const express = require("express");
const UrlModel = require("./database_model/url_model");
const mongoose = require("mongoose");
const shortid = require("shortid");
const qrcode=require("qrcode")
const UserModel=require('./database_model/user_model')


const router = express.Router();

// Route for home page
router.get("/", (req, res) => {
  console.log("hello");
  res.send("You are on the home page");
});

// Route for creating a shortened URL
router.post('/shorturl', async (req, res) => {
    const { originalUrl } = req.body;
    const urlCode = shortid.generate();  // Generate a unique short URL code

    try {
        // Check if the URL already exists
        let url = await UrlModel.findOne({ originalUrl });

        if (url) {
            res.status(200).json({
                message: "URL already exists!",
                data: url
            });
        } else {
            // If not, create a new shortened URL
            console.log(`Protocol: ${req.protocol}`);
            console.log(`Host: ${req.get('host')}`);
console.log(`URL Code: ${urlCode}`);

            const shortUrl = `${req.protocol}://${req.get('host')}/${urlCode}`;

            url = new UrlModel({
                originalUrl,
                shortUrl,
                urlCode,
                clicks: 0
            });

            await url.save();

            res.status(201).json({
                message: "URL shortened successfully!",
                data: url
            });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

// Route for redirecting to the original URL
router.get('/:urlCode', async (req, res) => {
    const { urlCode } = req.params;  // Use urlCode from request parameters
    try {
        const url = await UrlModel.findOne({ urlCode });  // Find URL by urlCode

        if (url) {
            url.clicks += 1;  // Increment the click count
            await url.save();  // Save the updated URL document
            res.redirect(url.originalUrl);  // Redirect to the original URL
        } else {
            res.status(404).json({
                error: "URL not found"
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
});



router.get('/qrcode/:urlCode', async (req, res) => {
    const { urlCode } = req.params;
    try {
        const url = await UrlModel.findOne({ urlCode });  // Find URL by urlCode

        if (url) {
            const qrCodeData = await qrcode.toDataURL(url.shortUrl);  // Generate QR code as a data URL
            res.status(200).json({
                message: "QR code generated successfully!",
                qrCode: qrCodeData
            });
        } else {
            res.status(404).json({
                error: "URL not found"
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
});


module.exports = router;
