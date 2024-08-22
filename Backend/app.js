const express = require('express');
const dotenv = require("dotenv");
const routes=require("./routes");
const mongoose = require("mongoose");
const cors=require('cors')
const app = express(); 
app.use(cors());

app.use(express.json()); 


const UrlModel=require('./database_model/url_model')
const UserModel=require('./database_model/user_model')

// ............................
dotenv.config();
// ............................
mongoose.connect(process.env.URI,{
    dbName: 'userurls',
    serverSelectionTimeoutMS: 30000
}).then(()=>
{
    console.log("connected to Database successfully")

}).catch((error)=>{
    console.log("error occur while connecting to database : ",error)
})

// ............................
const PORT = process.env.PORT || 3000;
app.listen(PORT, (error) => {
    if (error) {
        console.log("Error occurred while starting the server:", error);
    } else {
        console.log("Server is running at port:", PORT);
    }
});
// .............................
app.use('/',routes)